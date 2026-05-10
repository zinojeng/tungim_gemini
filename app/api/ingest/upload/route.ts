import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { requireIngestAuth } from '@/lib/ingest-auth'
import {
    approxBase64DecodedBytes,
    assertUnderLimit,
    getMaxUploadBytes,
    UploadTooLargeError,
} from '@/lib/ingest-limits'

export const dynamic = 'force-dynamic'

const getS3Client = () => {
    const s3Region = process.env.S3_REGION || 'auto'
    const s3Endpoint = process.env.S3_ENDPOINT
    if (s3Region === 'auto' && !s3Endpoint) {
        throw new Error(
            "S3_ENDPOINT is required when S3_REGION is 'auto'. Please check your .env file.",
        )
    }
    return new S3Client({
        region: s3Region,
        endpoint: s3Endpoint,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
    })
}

function publicUrlFor(fileName: string, bucketName: string): string {
    if (process.env.S3_PUBLIC_URL) {
        const baseUrl = process.env.S3_PUBLIC_URL.replace(/\/$/, '')
        return `${baseUrl}/${fileName}`
    }
    const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, '') || ''
    return `${endpoint}/${bucketName}/${fileName}`
}

const SAFE_NAME_RE = /[^a-zA-Z0-9._-]+/g

/**
 * Authenticated file upload — token-gated wrapper around the existing S3 logic.
 * Accepts EITHER multipart/form-data with `file` (or multiple `files`) fields,
 * OR JSON `{ filename, contentType, base64 }` for one-shot agent calls that
 * cannot easily build multipart bodies.
 *
 * Returns: { urls: string[] } (always an array, even for single uploads).
 */
export async function POST(req: Request) {
    const authError = requireIngestAuth(req)
    if (authError) return authError

    const bucketName = process.env.S3_BUCKET_NAME
    if (!bucketName) {
        return NextResponse.json(
            { error: 'S3_BUCKET_NAME is not configured.' },
            { status: 500 },
        )
    }

    const contentType = req.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const limit = getMaxUploadBytes()

    // The size cap applies PER FILE, not per request. For JSON (which is
    // exactly one file) we can pre-check Content-Length cheaply; the headers
    // are sized similarly to the base64 payload, so any overshoot already
    // signals the file itself is too big.
    //
    // For multipart we can't reject at the request level — five 8 MB files
    // legitimately make a 40 MB body. Per-file `assertUnderLimit(f.size, ...)`
    // catches the violation later, after `formData()` parses the boundaries.
    // Next.js does buffer the multipart body to parse it, but that's a global
    // platform-level concern (typically capped by the host); per-file is the
    // right semantic for this endpoint.
    if (isJson) {
        const declaredLength = Number(req.headers.get('content-length') ?? '0')
        if (declaredLength > 0 && declaredLength > limit) {
            return NextResponse.json(
                {
                    error: `Request body declares ${declaredLength} bytes which exceeds the ${limit}-byte per-file limit (set INGEST_MAX_UPLOAD_MB to raise).`,
                },
                { status: 413 },
            )
        }
    }

    const s3Client = getS3Client()
    const uploadedUrls: string[] = []

    try {
        if (isJson) {
            const body = (await req.json()) as {
                filename?: string
                contentType?: string
                base64?: string
            }
            if (!body.filename || !body.base64) {
                return NextResponse.json(
                    { error: 'JSON body must include `filename` and `base64`.' },
                    { status: 400 },
                )
            }
            // Pre-check size before allocating the decoded buffer.
            assertUnderLimit(approxBase64DecodedBytes(body.base64), limit)
            const safe = body.filename.replace(SAFE_NAME_RE, '-')
            const key = `${Date.now()}-${safe}`
            const buf = Buffer.from(body.base64, 'base64')
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucketName,
                    Key: key,
                    Body: buf,
                    ContentType: body.contentType || 'application/octet-stream',
                }),
            )
            uploadedUrls.push(publicUrlFor(key, bucketName))
        } else {
            const formData = await req.formData()
            const files: File[] = [
                ...formData.getAll('file'),
                ...formData.getAll('files'),
            ].filter((f): f is File => f instanceof File)

            if (files.length === 0) {
                return NextResponse.json({ error: 'No files in form data.' }, { status: 400 })
            }

            for (const f of files) {
                assertUnderLimit(f.size, limit)
                const buf = Buffer.from(await f.arrayBuffer())
                const key = `${Date.now()}-${f.name.replace(SAFE_NAME_RE, '-')}`
                await s3Client.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: key,
                        Body: buf,
                        ContentType: f.type || 'application/octet-stream',
                    }),
                )
                uploadedUrls.push(publicUrlFor(key, bucketName))
            }
        }

        return NextResponse.json({ urls: uploadedUrls, count: uploadedUrls.length })
    } catch (err: unknown) {
        if (err instanceof UploadTooLargeError) {
            return NextResponse.json({ error: err.message }, { status: 413 })
        }
        console.error('Ingest upload failed:', err)
        const msg = err instanceof Error ? err.message : 'Upload failed.'
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
