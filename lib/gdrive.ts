import { google, drive_v3 } from 'googleapis'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries, slides, siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'

// --- Google Drive Client ---

export function getGDriveClient(): drive_v3.Drive {
    const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!keyJson) {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set')
    }

    const key = JSON.parse(keyJson)
    const auth = new google.auth.GoogleAuth({
        credentials: key,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    return google.drive({ version: 'v3', auth })
}

export function getRootFolderId(): string {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    if (!folderId) {
        throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set')
    }
    return folderId
}

// --- Folder Operations ---

export async function findOrCreateFolder(
    drive: drive_v3.Drive,
    name: string,
    parentId: string
): Promise<string> {
    // Search for existing folder
    const res = await drive.files.list({
        q: `name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    })

    if (res.data.files && res.data.files.length > 0) {
        return res.data.files[0].id!
    }

    // Create new folder
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
    // Check if file already exists
    const res = await drive.files.list({
        q: `name='${fileName.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    })

    const body = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content

    if (res.data.files && res.data.files.length > 0) {
        // Update existing file
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

    // Create new file
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

// --- Slug Generation ---

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff\u3400-\u4dbf-]/g, '') // keep CJK, letters, numbers, hyphens
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
    const frontmatter: Record<string, any> = {
        title: lecture.title,
        category: lecture.category || '',
        subcategory: lecture.subcategory || '',
        tags: lecture.tags || [],
        publishDate: lecture.publishDate ? new Date(lecture.publishDate).toISOString().split('T')[0] : '',
        sourceUrl: lecture.sourceUrl || '',
        coverImage: lecture.coverImage ? './images/cover.' + getExtFromUrl(lecture.coverImage) : '',
        pdfUrl: lecture.pdfUrl ? './attachments/lecture.pdf' : '',
        provider: lecture.provider || '',
        isPublished: lecture.isPublished ?? true,
        backupDate: new Date().toISOString(),
    }

    let md = '---\n'
    for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
            md += `${key}: ${JSON.stringify(value)}\n`
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

export interface UploadResult {
    lectureId: string
    title: string
    success: boolean
    filesUploaded: number
    errors: string[]
}

export async function uploadLectureToDrive(
    lectureId: string
): Promise<UploadResult> {
    const drive = getGDriveClient()
    const rootFolderId = getRootFolderId()
    const errors: string[] = []
    let filesUploaded = 0

    // Fetch data
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

    // Create folder structure: lectures/{slug}/
    const lecturesFolderId = await findOrCreateFolder(drive, 'lectures', rootFolderId)
    const lectureFolderId = await findOrCreateFolder(drive, slug, lecturesFolderId)

    // Upload Markdown
    try {
        const markdown = buildMarkdown(lecture, transcript, summary)
        await uploadFileToDrive(drive, 'article.md', markdown, 'text/markdown', lectureFolderId)
        filesUploaded++
    } catch (error: any) {
        errors.push(`Markdown: ${error.message}`)
    }

    // Upload cover image
    if (lecture.coverImage) {
        const imagesFolderId = await findOrCreateFolder(drive, 'images', lectureFolderId)
        const ext = getExtFromUrl(lecture.coverImage)
        const result = await downloadAndUploadImage(drive, lecture.coverImage, `cover.${ext}`, imagesFolderId)
        if (result.success) {
            filesUploaded++
        } else {
            errors.push(`Cover image: ${result.error}`)
        }
    }

    // Upload slides
    if (lectureSlides.length > 0) {
        const imagesFolderId = await findOrCreateFolder(drive, 'images', lectureFolderId)
        for (let i = 0; i < lectureSlides.length; i++) {
            const slide = lectureSlides[i]
            if (slide.imageUrl) {
                const ext = getExtFromUrl(slide.imageUrl)
                const fileName = `slide-${String(i + 1).padStart(3, '0')}.${ext}`
                const result = await downloadAndUploadImage(drive, slide.imageUrl, fileName, imagesFolderId)
                if (result.success) {
                    filesUploaded++
                } else {
                    errors.push(`Slide ${i + 1}: ${result.error}`)
                }
            }
        }
    }

    // Upload PDF
    if (lecture.pdfUrl) {
        const attachmentsFolderId = await findOrCreateFolder(drive, 'attachments', lectureFolderId)
        const result = await downloadAndUploadImage(drive, lecture.pdfUrl, 'lecture.pdf', attachmentsFolderId)
        if (result.success) {
            filesUploaded++
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

    return {
        total: allLectures.length,
        success: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
    }
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
            error: error.message,
        }
    }
}
