import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthCard'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = { title: 'Choose a new password — MedNote AI' }

export default function ResetPasswordPage() {
    return (
        <AuthShell title="Choose a new password">
            <Suspense fallback={<div className="h-40" />}>
                <ResetPasswordForm />
            </Suspense>
        </AuthShell>
    )
}
