import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export function getS3Client(): S3Client {
    const s3Region = process.env.S3_REGION || 'auto'
    const s3Endpoint = process.env.S3_ENDPOINT

    if (s3Region === 'auto' && !s3Endpoint) {
        throw new Error('S3_ENDPOINT is required when S3_REGION is "auto". Check your env vars.')
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

export function getS3BucketName(): string {
    const bucket = process.env.S3_BUCKET_NAME
    if (!bucket) throw new Error('S3_BUCKET_NAME is not set')
    return bucket
}

export function buildS3PublicUrl(fileName: string): string {
    const bucket = getS3BucketName()
    if (process.env.S3_PUBLIC_URL) {
        return `${process.env.S3_PUBLIC_URL.replace(/\/$/, '')}/${fileName}`
    }
    const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, '') || ''
    return `${endpoint}/${bucket}/${fileName}`
}

export async function uploadBufferToS3(
    buffer: Buffer,
    originalName: string,
    contentType: string
): Promise<string> {
    const client = getS3Client()
    const bucket = getS3BucketName()
    const safeName = originalName.replace(/\s+/g, '-')
    const fileName = `${Date.now()}-${safeName}`

    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: buffer,
        ContentType: contentType,
    }))

    return buildS3PublicUrl(fileName)
}
