'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GoogleButton } from './GoogleButton'
import { safeCallbackPath } from '@/lib/safe-redirect'

export function RegisterForm() {
    const params = useSearchParams()
    const callbackUrl = safeCallbackPath(params.get('callbackUrl'))

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, callbackUrl }),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setError(data.error || 'Could not create your account.')
                return
            }
            setDone(true)
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (done) {
        return (
            <p className="rounded-md bg-green-50 px-3 py-3 text-sm text-green-700">
                Almost there — we sent a confirmation link to <strong>{email}</strong>. Click it to activate your account,
                then come back and log in.
            </p>
        )
    }

    return (
        <div className="space-y-4">
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
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                </div>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                </Button>
            </form>
        </div>
    )
}
