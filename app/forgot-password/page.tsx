import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthCard'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = { title: 'Reset password — MedNote AI' }

export default function ForgotPasswordPage() {
    return (
        <AuthShell
            title="Forgot your password?"
            description="Enter your email and we’ll send you a link to choose a new one."
            footer={
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Back to log in
                </Link>
            }
        >
            <ForgotPasswordForm />
        </AuthShell>
    )
}
