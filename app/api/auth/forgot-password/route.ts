import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, verificationTokens } from '@/db/schema'
import { sendPasswordResetEmail, appBaseUrl } from '@/lib/email'
import { generateToken, hashToken } from '@/lib/tokens'

export const runtime = 'nodejs'

const genericOk = () =>
    NextResponse.json({ ok: true, message: 'If that email has an account, a reset link is on its way.' })

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}))
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
        if (!email) return genericOk()

        const [user] = await db.select().from(users).where(eq(users.email, email))
        // Only password accounts can reset a password; pure-OAuth users can't.
        if (!user || !user.passwordHash) return genericOk()

        const identifier = `reset:${email}`
        await db.delete(verificationTokens).where(eq(verificationTokens.identifier, identifier))
        const rawToken = generateToken()
        const expires = new Date(Date.now() + 60 * 60 * 1000)
        await db.insert(verificationTokens).values({ identifier, token: hashToken(rawToken), expires })

        const base = appBaseUrl(request.headers.get('origin') ?? undefined)
        const resetUrl = `${base}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`
        await sendPasswordResetEmail(email, resetUrl)

        return genericOk()
    } catch (err) {
        console.error('forgot-password error', err)
        return genericOk()
    }
}
