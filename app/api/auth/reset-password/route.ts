import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, verificationTokens } from '@/db/schema'
import { hashToken } from '@/lib/tokens'

export const runtime = 'nodejs'

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}))
        const token = typeof body.token === 'string' ? body.token : ''
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
        const password = typeof body.password === 'string' ? body.password : ''

        if (!token || !email) {
            return NextResponse.json({ error: 'Invalid or missing reset link.' }, { status: 400 })
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
        }

        const identifier = `reset:${email}`
        const tokenHash = hashToken(token)
        const [row] = await db
            .select()
            .from(verificationTokens)
            .where(and(eq(verificationTokens.identifier, identifier), eq(verificationTokens.token, tokenHash)))

        if (!row || row.expires.getTime() < Date.now()) {
            if (row) {
                await db
                    .delete(verificationTokens)
                    .where(and(eq(verificationTokens.identifier, identifier), eq(verificationTokens.token, tokenHash)))
            }
            return NextResponse.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        // Resetting the password also confirms the email (they proved control of it).
        await db
            .update(users)
            .set({ passwordHash, emailVerified: new Date() })
            .where(eq(users.email, email))
        await db.delete(verificationTokens).where(eq(verificationTokens.identifier, identifier))

        return NextResponse.json({ ok: true, message: 'Your password has been updated. You can now sign in.' })
    } catch (err) {
        console.error('reset-password error', err)
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
}
