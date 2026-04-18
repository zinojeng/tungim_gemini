import { NextResponse } from 'next/server'
import {
    getGDriveClient,
    getRootFolderId,
    downloadDatabaseSnapshot,
    downloadFileFromDrive,
    formatGDriveError,
    type LectureAttachments,
} from '@/lib/gdrive'
import { uploadBufferToS3 } from '@/lib/s3'
import { sqlClient } from '@/lib/db'

export const maxDuration = 300

const TABLE_ORDER = ['lectures', 'transcripts', 'summaries', 'slides', 'site_settings'] as const

function camelToSnake(s: string): string {
    return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function rowToSnakeCase(row: Record<string, any>): Record<string, any> {
    const out: Record<string, any> = {}
    for (const [k, v] of Object.entries(row)) {
        out[camelToSnake(k)] = v
    }
    return out
}

function mimeExt(mimeType: string, fallback: string): string {
    const map: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
        'application/pdf': 'pdf',
    }
    return map[mimeType.toLowerCase()] || fallback
}

export async function POST() {
    try {
        const drive = getGDriveClient()
        const rootFolderId = getRootFolderId()

        const snapshot = await downloadDatabaseSnapshot(drive, rootFolderId)

        if (!snapshot.tables) {
            return NextResponse.json(
                { error: 'database.json is malformed: missing tables.' },
                { status: 400 }
            )
        }
        if ((snapshot.version ?? 0) < 2) {
            return NextResponse.json(
                { error: `database.json is version ${snapshot.version || 1}; need version 2+. Re-run "Upload All to Google Drive" first.` },
                { status: 400 }
            )
        }

        const attachmentsByLecture: Record<string, LectureAttachments> = snapshot.attachments || {}

        // Phase 1: re-upload every attachment to S3, build URL map
        const urlMap = new Map<string, string>() // originalUrl -> newS3Url
        const slideIdToNewUrl = new Map<string, string>()
        const rehostErrors: string[] = []
        let filesRehosted = 0

        for (const [lectureId, att] of Object.entries(attachmentsByLecture)) {
            const rehost = async (
                fileId: string,
                driveName: string,
                originalUrl: string
            ): Promise<string | null> => {
                try {
                    const { buffer, mimeType } = await downloadFileFromDrive(drive, fileId)
                    const ext = mimeExt(mimeType, driveName.split('.').pop() || 'bin')
                    const safe = driveName.replace(/\.[^.]+$/, '') + '.' + ext
                    const newUrl = await uploadBufferToS3(buffer, safe, mimeType)
                    filesRehosted++
                    return newUrl
                } catch (e: any) {
                    rehostErrors.push(`[${lectureId}] ${driveName}: ${e.message}`)
                    return null
                }
            }

            if (att.coverImage) {
                const newUrl = await rehost(att.coverImage.fileId, att.coverImage.driveName, att.coverImage.originalUrl)
                if (newUrl) urlMap.set(att.coverImage.originalUrl, newUrl)
            }
            if (att.pdfUrl) {
                const newUrl = await rehost(att.pdfUrl.fileId, att.pdfUrl.driveName, att.pdfUrl.originalUrl)
                if (newUrl) urlMap.set(att.pdfUrl.originalUrl, newUrl)
            }
            for (const s of att.slides || []) {
                const newUrl = await rehost(s.fileId, s.driveName, s.originalUrl)
                if (newUrl) {
                    urlMap.set(s.originalUrl, newUrl)
                    slideIdToNewUrl.set(s.slideId, newUrl)
                }
            }
            for (const i of att.inline || []) {
                const newUrl = await rehost(i.fileId, i.driveName, i.originalUrl)
                if (newUrl) urlMap.set(i.originalUrl, newUrl)
            }
        }

        // Phase 2: rewrite rows in-memory (camelCase keys, as drizzle returns)
        const tables = snapshot.tables

        if (Array.isArray(tables.lectures)) {
            for (const row of tables.lectures) {
                if (row.coverImage && urlMap.has(row.coverImage)) row.coverImage = urlMap.get(row.coverImage)
                if (row.pdfUrl && urlMap.has(row.pdfUrl)) row.pdfUrl = urlMap.get(row.pdfUrl)
            }
        }

        if (Array.isArray(tables.slides)) {
            for (const row of tables.slides) {
                const mapped = slideIdToNewUrl.get(row.id)
                if (mapped) {
                    row.imageUrl = mapped
                } else if (row.imageUrl && urlMap.has(row.imageUrl)) {
                    row.imageUrl = urlMap.get(row.imageUrl)
                }
            }
        }

        if (Array.isArray(tables.summaries)) {
            for (const row of tables.summaries) {
                for (const key of ['fullMarkdownContent', 'executiveSummary']) {
                    if (typeof row[key] === 'string') {
                        let content: string = row[key]
                        for (const [oldUrl, newUrl] of urlMap) {
                            if (content.includes(oldUrl)) content = content.split(oldUrl).join(newUrl)
                        }
                        row[key] = content
                    }
                }
            }
        }

        // Phase 3: transactional DELETE + INSERT (camelCase → snake_case at insert time)
        await sqlClient.begin(async (sql) => {
            const deleteOrder = ['transcripts', 'summaries', 'slides', 'lectures', 'site_settings']
            for (const t of deleteOrder) {
                await sql`DELETE FROM ${sql(t)}`
            }
            for (const t of TABLE_ORDER) {
                const rows = (tables as any)[t]
                if (Array.isArray(rows) && rows.length > 0) {
                    for (const row of rows) {
                        const snake = rowToSnakeCase(row)
                        await sql`INSERT INTO ${sql(t)} ${sql(snake)}`
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            filesRehosted,
            lecturesRestored: Array.isArray(tables.lectures) ? tables.lectures.length : 0,
            rehostErrors,
            snapshotTimestamp: snapshot.timestamp,
        })
    } catch (error: any) {
        console.error('Restore from Drive failed:', error)
        return NextResponse.json(
            { error: formatGDriveError(error) },
            { status: 500 }
        )
    }
}
