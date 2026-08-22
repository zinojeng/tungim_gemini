import { createHash, randomBytes } from 'node:crypto'

/** Generate a high-entropy URL-safe token (the value emailed to the user). */
export function generateToken(): string {
    return randomBytes(32).toString('hex')
}

/**
 * Hash a token for at-rest storage. We only ever persist the digest; the raw
 * token lives only in the emailed link, so a DB/backup leak can't be used to
 * confirm an email or reset a password.
 */
export function hashToken(raw: string): string {
    return createHash('sha256').update(raw).digest('hex')
}
