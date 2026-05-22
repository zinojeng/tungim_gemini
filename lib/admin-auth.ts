import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

// HMAC-signed cookie issued by /api/auth/login so the legacy
// password-only admin panel can authenticate against API routes that
// otherwise require a NextAuth session.

export const ADMIN_COOKIE_NAME = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 // 24h

function secret(): string {
    return (
        process.env.AUTH_SECRET ||
        process.env.NEXTAUTH_SECRET ||
        process.env.PASSWORD ||
        ''
    )
}

function sign(payload: string): string | null {
    const s = secret()
    if (!s) return null
    return createHmac('sha256', s).update(payload).digest('hex')
}

function safeEqualHex(a: string, b: string): boolean {
    if (!a || !b || a.length !== b.length) return false
    const ba = Buffer.from(a, 'hex')
    const bb = Buffer.from(b, 'hex')
    if (ba.length !== bb.length) return false
    return timingSafeEqual(ba, bb)
}

export function buildAdminToken(): string | null {
    const issued = String(Math.floor(Date.now() / 1000))
    const sig = sign(`admin:${issued}`)
    if (!sig) return null
    return `${issued}.${sig}`
}

export function verifyAdminToken(token: string | undefined | null): boolean {
    if (!token) return false
    const [issued, sig] = token.split('.')
    if (!issued || !sig) return false
    const issuedNum = Number(issued)
    if (!Number.isFinite(issuedNum)) return false
    const now = Math.floor(Date.now() / 1000)
    if (now - issuedNum > MAX_AGE_SECONDS) return false
    const expected = sign(`admin:${issued}`)
    if (!expected) return false
    return safeEqualHex(sig, expected)
}

export async function isAdminFromCookie(): Promise<boolean> {
    const jar = await cookies()
    const token = jar.get(ADMIN_COOKIE_NAME)?.value
    return verifyAdminToken(token)
}

export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS
