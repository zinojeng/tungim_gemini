import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, verificationTokens } from '@/db/schema'
import { sendVerificationEmail, appBaseUrl } from '@/lib/email'
import { generateToken, hashToken } from '@/lib/tokens'
import { safeCallbackPath } from '@/lib/safe-redirect'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returned for any well-formed submission, regardless of whether the email is
// new, unverified, or already a verified account — avoids account enumeration.
const neutralOk = () =>
    NextResponse.json({
        ok: true,
        message: 'Check your email — if you can create an account with that address, a confirmation link is on its way.',
    })

async function issueVerification(email: string, callbackUrl: string, reqOrigin?: string) {
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email))
    const rawToken = generateToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await db.insert(verificationTokens).values({ identifier: email, token: hashToken(rawToken), expires })

    const base = appBaseUrl(reqOrigin)
    const verifyUrl = `${base}/api/auth/verify-email?token=${rawToken}&email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`
    await sendVerificationEmail(email, verifyUrl)
}

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}))
        const name = typeof body.name === 'string' ? body.name.trim() : ''
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
        const password = typeof body.password === 'string' ? body.password : ''
        const callbackUrl = safeCallbackPath(typeof body.callbackUrl === 'string' ? body.callbackUrl : null)

        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
        }

        const origin = request.headers.get('origin') ?? undefined
        const [existing] = await db.select().from(users).where(eq(users.email, email))

        if (existing?.emailVerified) {
            // Account already active — say nothing that confirms it exists.
            return neutralOk()
        }

        const passwordHash = await bcrypt.hash(password, 12)
        if (existing) {
            await db
                .update(users)
                .set({ passwordHash, name: name || existing.name })
                .where(eq(users.id, existing.id))
        } else {
            await db.insert(users).values({ email, name: name || null, passwordHash, role: 'user' })
        }

        await issueVerification(email, callbackUrl, origin)
        return neutralOk()
    } catch (err) {
        console.error('register error', err)
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
}
