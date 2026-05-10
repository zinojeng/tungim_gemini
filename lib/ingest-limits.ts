/**
 * Centralised upload-size guard for the ingest path.
 *
 * Set INGEST_MAX_UPLOAD_MB to override the default of 50 MB. The cap applies
 * per file (multipart) or per JSON body (base64). Hit before buffering,
 * since `Buffer.from(b64, 'base64')` will allocate the full size before we
 * can ever reject it.
 */

const DEFAULT_MAX_UPLOAD_MB = 50

export function getMaxUploadBytes(): number {
    const raw = process.env.INGEST_MAX_UPLOAD_MB
    const mb = raw ? Number(raw) : DEFAULT_MAX_UPLOAD_MB
    if (!Number.isFinite(mb) || mb <= 0) return DEFAULT_MAX_UPLOAD_MB * 1024 * 1024
    return Math.floor(mb * 1024 * 1024)
}

/**
 * Approximate decoded byte length of a base64 string without allocating.
 * Each 4 base64 chars -> 3 bytes, minus the padding `=`.
 */
export function approxBase64DecodedBytes(b64: string): number {
    const len = b64.length
    if (len === 0) return 0
    let pad = 0
    if (b64.charCodeAt(len - 1) === 0x3d /* '=' */) pad++
    if (len > 1 && b64.charCodeAt(len - 2) === 0x3d) pad++
    return Math.max(0, Math.floor((len * 3) / 4) - pad)
}

export class UploadTooLargeError extends Error {
    readonly limitBytes: number
    readonly actualBytes: number
    constructor(limitBytes: number, actualBytes: number) {
        super(
            `Upload exceeds limit: ${actualBytes} bytes > ${limitBytes} bytes (set INGEST_MAX_UPLOAD_MB to increase).`,
        )
        this.name = 'UploadTooLargeError'
        this.limitBytes = limitBytes
        this.actualBytes = actualBytes
    }
}

export function assertUnderLimit(bytes: number, limit = getMaxUploadBytes()): void {
    if (bytes > limit) throw new UploadTooLargeError(limit, bytes)
}
