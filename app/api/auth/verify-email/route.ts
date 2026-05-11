import { NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, verificationTokens } from '@/db/schema'
import { appBaseUrl } from '@/lib/email'
import { hashToken } from '@/lib/tokens'
import { safeCallbackPath } from '@/lib/safe-redirect'

export const runtime = 'nodejs'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const rawToken = url.searchParams.get('token') ?? ''
    const email = (url.searchParams.get('email') ?? '').trim().toLowerCase()
    const callbackUrl = safeCallbackPath(url.searchParams.get('callbackUrl'))
    const base = appBaseUrl(url.origin)
    const loginUrl = (qs: string) => `${base}/login?${qs}`

    if (!rawToken || !email) {
        return NextResponse.redirect(loginUrl('error=invalid_token'))
    }

    const tokenHash = hashToken(rawToken)
    const [row] = await db
        .select()
        .from(verificationTokens)
        .where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, tokenHash)))

    if (!row || row.expires.getTime() < Date.now()) {
        if (row) {
            await db
                .delete(verificationTokens)
                .where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, tokenHash)))
        }
        return NextResponse.redirect(loginUrl('error=expired_token'))
    }

    await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, email))
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email))

    const params = new URLSearchParams({ verified: '1' })
    if (callbackUrl !== '/') params.set('callbackUrl', callbackUrl)
    return NextResponse.redirect(loginUrl(params.toString()))
}
