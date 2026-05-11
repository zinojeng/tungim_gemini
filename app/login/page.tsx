import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = { title: 'Log in — MedNote AI' }

export default function LoginPage() {
    return (
        <AuthShell
            title="Welcome back"
            description="Log in to read full transcripts, slide notes and conference content."
            footer={
                <>
                    New here?{' '}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                        Create an account
                    </Link>
                </>
            }
        >
            <Suspense fallback={<div className="h-40" />}>
                <LoginForm />
            </Suspense>
        </AuthShell>
    )
}
