'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        }).catch(() => {})
        setLoading(false)
        setDone(true)
    }

    if (done) {
        return (
            <p className="rounded-md bg-green-50 px-3 py-3 text-sm text-green-700">
                If an account exists for that email, a password-reset link is on its way.
            </p>
        )
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
            </Button>
        </form>
    )
}
