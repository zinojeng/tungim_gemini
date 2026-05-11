import { Resend } from 'resend'

const FROM = process.env.EMAIL_FROM || 'MedNote AI <onboarding@resend.dev>'

function getResend(): Resend | null {
    const key = process.env.RESEND_API_KEY
    if (!key) return null
    return new Resend(key)
}

/**
 * Returns the public base URL used to build links inside auth emails.
 *
 * Security: this must NOT be derived from request headers (Origin/Host), or an
 * attacker could trigger a real password-reset token to be emailed to a victim
 * inside an attacker-controlled URL. In production we require an explicit env
 * var; the request origin is only used as a convenience in development.
 */
export function appBaseUrl(devOnlyReqOrigin?: string): string {
    const configured =
        process.env.AUTH_URL || process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL
    if (configured) return configured.replace(/\/$/, '')
    if (process.env.NODE_ENV === 'production') {
        throw new Error('AUTH_URL (or NEXT_PUBLIC_APP_URL) must be set in production to build auth email links.')
    }
    return (devOnlyReqOrigin || 'http://localhost:3000').replace(/\/$/, '')
}

async function send(to: string, subject: string, html: string) {
    const resend = getResend()
    if (!resend) {
        // Dev fallback: no email provider configured — log the link so the
        // flow is still testable locally.
        console.warn(`[email] RESEND_API_KEY not set. Would send to ${to}:\n${subject}\n${html}`)
        return
    }
    await resend.emails.send({ from: FROM, to, subject, html })
}

export async function sendVerificationEmail(to: string, verifyUrl: string) {
    await send(
        to,
        'Confirm your MedNote AI email',
        `<p>Welcome to MedNote AI.</p>
         <p>Please confirm your email address to activate your account:</p>
         <p><a href="${verifyUrl}">Confirm my email</a></p>
         <p>This link expires in 24 hours. If you didn't sign up, ignore this email.</p>`,
    )
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
    await send(
        to,
        'Reset your MedNote AI password',
        `<p>We received a request to reset your MedNote AI password.</p>
         <p><a href="${resetUrl}">Choose a new password</a></p>
         <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>`,
    )
}
