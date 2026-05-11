'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ResetPasswordForm() {
    const params = useSearchParams()
    const token = params.get('token') || ''
    const email = params.get('email') || ''

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    if (!token || !email) {
        return <p className="text-sm text-destructive">This reset link is missing information. Request a new one.</p>
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }
        setLoading(true)
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, email, password }),
        })
        const data = await res.json().catch(() => ({}))
        setLoading(false)
        if (!res.ok) {
            setError(data.error || 'Could not reset your password.')
            return
        }
        setDone(true)
    }

    if (done) {
        return (
            <p className="rounded-md bg-green-50 px-3 py-3 text-sm text-green-700">
                Password updated. <Link href="/login" className="underline">Log in</Link>.
            </p>
        )
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating…' : 'Update password'}
            </Button>
        </form>
    )
}
