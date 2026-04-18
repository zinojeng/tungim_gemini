import { google, drive_v3 } from 'googleapis'
import { createHash } from 'crypto'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries, slides, siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'

// --- Error Formatting ---

export function formatGDriveError(error: any): string {
    const raw = error?.response?.data?.error || error?.message || String(error)
    const text = typeof raw === 'string' ? raw : JSON.stringify(raw)

    if (text.includes('invalid_grant')) {
        return (
            'Google Drive 授權已失效（invalid_grant）。' +
            'Refresh token 可能已過期或被撤銷。' +
            '請前往 /api/admin/gdrive/auth 重新授權，' +
            '取得新的 GOOGLE_REFRESH_TOKEN 並更新環境變數後重新部署。' +
            '若 OAuth consent screen 處於 Testing 模式，token 每 7 天會失效一次，' +
            '建議在 Google Cloud Console 將應用發佈為 In Production 以避免重複發生。'
        )
    }

    return typeof error?.message === 'string' ? error.message : text
}

// --- Google Drive Client (OAuth 2.0) ---

export function getGDriveClient(): drive_v3.Drive {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error(
            'Google Drive OAuth not configured. Required env vars: ' +
            'GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN. ' +
            'Visit /api/admin/gdrive/auth to get your refresh token.'
        )
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret)
    oauth2Client.setCredentials({ refresh_token: refreshToken })

    return google.drive({ version: 'v3', auth: oauth2Client })
}

export function getRootFolderId(): string {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim()
    if (!folderId) {
        throw new Error(
            'GOOGLE_DRIVE_FOLDER_ID is not set. ' +
            'Get it from your Google Drive folder URL: https://drive.google.com/drive/folders/<FOLDER_ID>'
        )
    }
    return folderId
}

// --- OAuth Helper ---

export function getAuthUrl(redirectUri: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required')
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/drive.file'],
    })
}

export async function exchangeCodeForTokens(code: string, redirectUri: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required')
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
}

// --- Folder Operations ---

export async function findOrCreateFolder(
    drive: drive_v3.Drive,
    name: string,
    parentId: string
): Promise<string> {
    const res = await drive.files.list({
        q: `name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    })

    if (res.data.files && res.data.files.length > 0) {
        return res.data.files[0].id!
    }

    const folder = await drive.files.create({
        requestBody: {
            name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentId],
        },
        fields: 'id',
    })

    return folder.data.id!
}

// --- File Operations ---

export async function uploadFileToDrive(
    drive: drive_v3.Drive,
    fileName: string,
    content: Buffer | string,
    mimeType: string,
    folderId: string
): Promise<string> {
    const res = await drive.files.list({
        q: `name='${fileName.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    })

    const body = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content

    if (res.data.files && res.data.files.length > 0) {
        const fileId = res.data.files[0].id!
        await drive.files.update({
            fileId,
            media: {
                mimeType,
                body: bufferToReadable(body),
            },
        })
        return fileId
    }

    const file = await drive.files.create({
        requestBody: {
            name: fileName,
            parents: [folderId],
        },
        media: {
            mimeType,
            body: bufferToReadable(body),
        },
        fields: 'id',
    })

    return file.data.id!
}

function bufferToReadable(buffer: Buffer) {
    const { Readable } = require('stream')
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    return readable
}

// --- Download & Re-upload Image ---

export async function downloadAndUploadImage(
    drive: drive_v3.Drive,
    imageUrl: string,
    fileName: string,
    folderId: string
): Promise<{ success: boolean; fileId?: string; error?: string }> {
    try {
        const response = await fetch(imageUrl)
        if (!response.ok) {
            return { success: false, error: `Failed to download: ${response.status}` }
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg'
        const buffer = Buffer.from(await response.arrayBuffer())

        const fileId = await uploadFileToDrive(drive, fileName, buffer, contentType, folderId)
        return { success: true, fileId }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

// --- Rewrite inline images in markdown ---

export interface InlineImageRecord {
    originalUrl: string
    fileId: string
    driveName: string
}

export async function processInlineImages(
    drive: drive_v3.Drive,
    markdown: string,
    imagesFolderId: string
): Promise<{ rewritten: string; uploaded: number; errors: string[]; records: InlineImageRecord[] }> {
    const errors: string[] = []
    const urlToLocal = new Map<string, string>()
    const records: InlineImageRecord[] = []

    const imageRegex = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g
    const matches = [...markdown.matchAll(imageRegex)]
    const uniqueUrls = [...new Set(matches.map(m => m[1]))]

    for (const url of uniqueUrls) {
        const hash = createHash('sha1').update(url).digest('hex').slice(0, 8)
        const ext = getExtFromUrl(url)
        const fileName = `inline-${hash}.${ext}`
        const result = await downloadAndUploadImage(drive, url, fileName, imagesFolderId)
        if (result.success && result.fileId) {
            urlToLocal.set(url, `./images/${fileName}`)
            records.push({ originalUrl: url, fileId: result.fileId, driveName: fileName })
        } else {
            errors.push(`Inline image ${url}: ${result.error}`)
        }
    }

    let rewritten = markdown
    for (const [originalUrl, localPath] of urlToLocal) {
        rewritten = rewritten.split(originalUrl).join(localPath)
    }

    return { rewritten, uploaded: urlToLocal.size, errors, records }
}

// --- Slug Generation ---

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 100) || 'untitled'
}

// --- Extract file extension from URL ---

function getExtFromUrl(url: string): string {
    try {
        const pathname = new URL(url).pathname
        const ext = pathname.split('.').pop()?.toLowerCase()
        if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf'].includes(ext)) {
            return ext
        }
    } catch {}
    return 'jpg'
}

// --- Build Markdown ---

export function buildMarkdown(
    lecture: any,
    transcript: any,
    summary: any
): string {
    const publishDateStr = lecture.publishDate ? new Date(lecture.publishDate).toISOString().split('T')[0] : ''
    const isPublished = lecture.isPublished ?? true
    const frontmatter: Record<string, any> = {
        id: lecture.id || '',
        title: lecture.title,
        category: lecture.category || '',
        subcategory: lecture.subcategory || '',
        tags: lecture.tags || [],
        date: publishDateStr,
        publishDate: publishDateStr,
        draft: !isPublished,
        sourceUrl: lecture.sourceUrl || '',
        coverImage: lecture.coverImage ? './images/cover.' + getExtFromUrl(lecture.coverImage) : '',
        pdfUrl: lecture.pdfUrl ? './attachments/lecture.pdf' : '',
        provider: lecture.provider || '',
        isPublished,
        backupDate: new Date().toISOString(),
    }

    let md = '---\n'
    for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                md += `${key}: []\n`
            } else {
                md += `${key}:\n`
                for (const item of value) {
                    md += `  - ${JSON.stringify(String(item))}\n`
                }
            }
        } else if (typeof value === 'boolean') {
            md += `${key}: ${value}\n`
        } else {
            md += `${key}: "${String(value).replace(/"/g, '\\"')}"\n`
        }
    }
    md += '---\n\n'

    if (summary?.executiveSummary) {
        md += `## Executive Summary\n\n${summary.executiveSummary}\n\n`
    }

    if (summary?.keyTakeaways && Array.isArray(summary.keyTakeaways)) {
        md += `## Key Takeaways\n\n`
        for (const takeaway of summary.keyTakeaways) {
            md += `- ${takeaway}\n`
        }
        md += '\n'
    }

    if (summary?.fullMarkdownContent) {
        md += `## Full Content\n\n${summary.fullMarkdownContent}\n\n`
    }

    if (transcript?.content) {
        md += `## Transcript\n\n${transcript.content}\n\n`
    }

    return md
}

// --- Upload Single Lecture ---

export interface AttachmentRecord {
    originalUrl: string
    fileId: string
    driveName: string
}

export interface SlideAttachmentRecord extends AttachmentRecord {
    slideId: string
}

export interface LectureAttachments {
    coverImage: AttachmentRecord | null
    pdfUrl: AttachmentRecord | null
    slides: SlideAttachmentRecord[]
    inline: InlineImageRecord[]
}

export interface UploadResult {
    lectureId: string
    title: string
    success: boolean
    filesUploaded: number
    errors: string[]
    attachments?: LectureAttachments
}

export async function uploadLectureToDrive(
    lectureId: string
): Promise<UploadResult> {
    const drive = getGDriveClient()
    const rootFolderId = getRootFolderId()
    const errors: string[] = []
    let filesUploaded = 0

    const [lectureRows, transcriptRows, summaryRows, slideRows] = await Promise.all([
        db.select().from(lectures).where(eq(lectures.id, lectureId)),
        db.select().from(transcripts).where(eq(transcripts.lectureId, lectureId)),
        db.select().from(summaries).where(eq(summaries.lectureId, lectureId)),
        db.select().from(slides).where(eq(slides.lectureId, lectureId)),
    ])

    const lecture = lectureRows[0]
    if (!lecture) {
        return { lectureId, title: 'Unknown', success: false, filesUploaded: 0, errors: ['Lecture not found'] }
    }

    const transcript = transcriptRows[0] || null
    const summary = summaryRows[0] || null
    const lectureSlides = slideRows || []

    const slug = slugify(lecture.title)

    const lecturesFolderId = await findOrCreateFolder(drive, 'lectures', rootFolderId)
    const lectureFolderId = await findOrCreateFolder(drive, slug, lecturesFolderId)

    let cachedImagesFolderId: string | null = null
    const getImagesFolder = async () => {
        if (!cachedImagesFolderId) {
            cachedImagesFolderId = await findOrCreateFolder(drive, 'images', lectureFolderId)
        }
        return cachedImagesFolderId
    }

    const attachments: LectureAttachments = {
        coverImage: null,
        pdfUrl: null,
        slides: [],
        inline: [],
    }

    // Upload cover image
    if (lecture.coverImage) {
        const ext = getExtFromUrl(lecture.coverImage)
        const driveName = `cover.${ext}`
        const result = await downloadAndUploadImage(drive, lecture.coverImage, driveName, await getImagesFolder())
        if (result.success && result.fileId) {
            filesUploaded++
            attachments.coverImage = { originalUrl: lecture.coverImage, fileId: result.fileId, driveName }
        } else {
            errors.push(`Cover image: ${result.error}`)
        }
    }

    // Upload slides
    if (lectureSlides.length > 0) {
        const imagesFolderId = await getImagesFolder()
        for (let i = 0; i < lectureSlides.length; i++) {
            const slide = lectureSlides[i]
            if (slide.imageUrl) {
                const ext = getExtFromUrl(slide.imageUrl)
                const fileName = `slide-${String(i + 1).padStart(3, '0')}.${ext}`
                const result = await downloadAndUploadImage(drive, slide.imageUrl, fileName, imagesFolderId)
                if (result.success && result.fileId) {
                    filesUploaded++
                    attachments.slides.push({
                        slideId: slide.id,
                        originalUrl: slide.imageUrl,
                        fileId: result.fileId,
                        driveName: fileName,
                    })
                } else {
                    errors.push(`Slide ${i + 1}: ${result.error}`)
                }
            }
        }
    }

    // Upload Markdown (after processing inline images so references are local)
    try {
        let markdown = buildMarkdown(lecture, transcript, summary)
        if (/!\[[^\]]*\]\(https?:\/\//.test(markdown)) {
            const inline = await processInlineImages(drive, markdown, await getImagesFolder())
            markdown = inline.rewritten
            filesUploaded += inline.uploaded
            errors.push(...inline.errors)
            attachments.inline = inline.records
        }
        await uploadFileToDrive(drive, `${slug}.md`, markdown, 'text/markdown', lectureFolderId)
        filesUploaded++
    } catch (error: any) {
        errors.push(`Markdown: ${error.message}`)
    }

    // Upload PDF
    if (lecture.pdfUrl) {
        const attachmentsFolderId = await findOrCreateFolder(drive, 'attachments', lectureFolderId)
        const result = await downloadAndUploadImage(drive, lecture.pdfUrl, 'lecture.pdf', attachmentsFolderId)
        if (result.success && result.fileId) {
            filesUploaded++
            attachments.pdfUrl = { originalUrl: lecture.pdfUrl, fileId: result.fileId, driveName: 'lecture.pdf' }
        } else {
            errors.push(`PDF: ${result.error}`)
        }
    }

    return {
        lectureId,
        title: lecture.title,
        success: errors.length === 0,
        filesUploaded,
        errors,
        attachments,
    }
}

// --- Upload All Lectures ---

export async function uploadAllLecturesToDrive(): Promise<{
    total: number
    success: number
    failed: number
    results: UploadResult[]
}> {
    const allLectures = await db.select().from(lectures)
    const results: UploadResult[] = []

    for (const lecture of allLectures) {
        const result = await uploadLectureToDrive(lecture.id)
        results.push(result)
    }

    // Also backup site settings
    try {
        const drive = getGDriveClient()
        const rootFolderId = getRootFolderId()
        const settingsFolderId = await findOrCreateFolder(drive, 'site-settings', rootFolderId)
        const allSettings = await db.select().from(siteSettings)
        const settingsJson = JSON.stringify(
            Object.fromEntries(allSettings.map(s => [s.key, s.value])),
            null,
            2
        )
        await uploadFileToDrive(drive, 'settings.json', settingsJson, 'application/json', settingsFolderId)
    } catch (error: any) {
        console.error('Failed to backup site settings:', error.message)
    }

    // Canonical full-DB snapshot at root — includes per-lecture attachment map
    // so restore can re-upload Drive images to S3 and rewrite DB URLs.
    try {
        const drive = getGDriveClient()
        const rootFolderId = getRootFolderId()
        const [allTranscripts, allSlides, allSummaries, allSettings] = await Promise.all([
            db.select().from(transcripts),
            db.select().from(slides),
            db.select().from(summaries),
            db.select().from(siteSettings),
        ])
        const attachmentsByLecture: Record<string, LectureAttachments> = {}
        for (const r of results) {
            if (r.attachments) attachmentsByLecture[r.lectureId] = r.attachments
        }
        const snapshot = {
            timestamp: new Date().toISOString(),
            version: 2,
            tables: {
                lectures: allLectures,
                transcripts: allTranscripts,
                slides: allSlides,
                summaries: allSummaries,
                site_settings: allSettings,
            },
            attachments: attachmentsByLecture,
        }
        await uploadFileToDrive(
            drive,
            'database.json',
            JSON.stringify(snapshot, null, 2),
            'application/json',
            rootFolderId
        )
    } catch (error: any) {
        console.error('Failed to write database.json snapshot:', error.message)
    }

    return {
        total: allLectures.length,
        success: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
    }
}

// --- Download helpers (for restore) ---

export async function downloadFileFromDrive(
    drive: drive_v3.Drive,
    fileId: string
): Promise<{ buffer: Buffer; mimeType: string }> {
    const meta = await drive.files.get({ fileId, fields: 'mimeType' })
    const res = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'arraybuffer' }
    )
    return {
        buffer: Buffer.from(res.data as ArrayBuffer),
        mimeType: meta.data.mimeType || 'application/octet-stream',
    }
}

export async function findFileInFolder(
    drive: drive_v3.Drive,
    name: string,
    parentId: string
): Promise<string | null> {
    const res = await drive.files.list({
        q: `name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    })
    return res.data.files?.[0]?.id || null
}

export async function downloadDatabaseSnapshot(
    drive: drive_v3.Drive,
    rootFolderId: string
): Promise<any> {
    const fileId = await findFileInFolder(drive, 'database.json', rootFolderId)
    if (!fileId) {
        throw new Error('database.json not found in Drive root. Run "Upload All to Google Drive" first.')
    }
    const { buffer } = await downloadFileFromDrive(drive, fileId)
    return JSON.parse(buffer.toString('utf-8'))
}

// --- Check Connection Status ---

export async function checkGDriveStatus(): Promise<{
    connected: boolean
    folderName?: string
    error?: string
}> {
    try {
        const drive = getGDriveClient()
        const folderId = getRootFolderId()

        const res = await drive.files.get({
            fileId: folderId,
            fields: 'id, name',
        })

        return {
            connected: true,
            folderName: res.data.name || undefined,
        }
    } catch (error: any) {
        return {
            connected: false,
            error: formatGDriveError(error),
        }
    }
}
