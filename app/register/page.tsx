import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthCard'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = { title: 'Sign up — MedNote AI' }

export default function RegisterPage() {
    return (
        <AuthShell
            title="Create your account"
            description="Free to join. We’ll email you a link to confirm your address."
            footer={
                <>
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Log in
                    </Link>
                </>
            }
        >
            <Suspense fallback={<div className="h-40" />}>
                <RegisterForm />
            </Suspense>
        </AuthShell>
    )
}
