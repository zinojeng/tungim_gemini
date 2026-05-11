'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GoogleButton } from './GoogleButton'
import { safeCallbackPath } from '@/lib/safe-redirect'

export function LoginForm() {
    const router = useRouter()
    const params = useSearchParams()
    const callbackUrl = safeCallbackPath(params.get('callbackUrl'))
    const justVerified = params.get('verified') === '1'
    const tokenError = params.get('error')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const res = await signIn('credentials', { email, password, redirect: false })
        setLoading(false)
        if (res?.error) {
            setError('Invalid email or password — or your email isn’t confirmed yet.')
            return
        }
        router.push(callbackUrl)
        router.refresh()
    }

    return (
        <div className="space-y-4">
            {justVerified ? (
                <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                    Email confirmed. You can sign in now.
                </p>
            ) : null}
            {tokenError === 'expired_token' ? (
                <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
                    That confirmation link has expired. Sign up again to get a fresh one.
                </p>
            ) : null}
            {tokenError === 'invalid_token' ? (
                <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">That confirmation link is invalid.</p>
            ) : null}

            <GoogleButton callbackUrl={callbackUrl} />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in…' : 'Log in'}
                </Button>
            </form>
        </div>
    )
}
