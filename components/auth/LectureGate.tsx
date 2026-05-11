import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LectureGate({
    lectureId,
    title,
    executiveSummary,
    keyTakeaways,
}: {
    lectureId: string
    title: string
    executiveSummary?: string | null
    keyTakeaways?: unknown
}) {
    const callbackUrl = `/lectures/${lectureId}`
    const takeaways = Array.isArray(keyTakeaways) ? (keyTakeaways as unknown[]).slice(0, 3) : []

    return (
        <div className="container max-w-3xl py-10 md:py-14 space-y-8">
            <header className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
                {executiveSummary ? (
                    <p className="text-muted-foreground leading-relaxed">{executiveSummary}</p>
                ) : (
                    <p className="text-muted-foreground">A free account unlocks the transcript and slide notes for this talk.</p>
                )}
            </header>

            {takeaways.length > 0 ? (
                <ul className="space-y-2 text-sm">
                    {takeaways.map((t, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{String(t)}</span>
                        </li>
                    ))}
                </ul>
            ) : null}

            <div className="relative overflow-hidden rounded-lg border bg-muted/20 p-6">
                <div className="space-y-2 blur-sm select-none" aria-hidden="true">
                    <div className="h-3 w-11/12 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-10/12 rounded bg-muted" />
                    <div className="h-3 w-9/12 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-8/12 rounded bg-muted" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 text-center backdrop-blur-[1px]">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                    <p className="max-w-sm text-sm text-muted-foreground">
                        Full transcript, slide notes and figures are available to members. It’s free — just confirm your email.
                    </p>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Create free account</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Log in</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
