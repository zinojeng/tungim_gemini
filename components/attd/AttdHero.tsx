import { ATTD_2026_META, ATTD_2026_TRACKS, ATTD_2026_SESSIONS, getConferenceLiveStatus } from '@/lib/attd2026-agenda'
import { CalendarDays, MapPin, Sparkles } from 'lucide-react'

interface AttdHeroProps {
    talksIndexed: number
}

export function AttdHero({ talksIndexed }: AttdHeroProps) {
    const liveStatus = getConferenceLiveStatus()
    const featuredTrackCount = ATTD_2026_TRACKS.filter((t) => t.featured).length
    const sessionCount = ATTD_2026_SESSIONS.length

    const statePillClass =
        liveStatus.state === 'live'
            ? 'bg-emerald-500/15 text-emerald-700 ring-emerald-500/30'
            : liveStatus.state === 'upcoming'
                ? 'bg-sky-500/15 text-sky-700 ring-sky-500/30'
                : 'bg-stone-500/10 text-stone-700 ring-stone-400/30'

    return (
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 20% 0%, rgba(20,184,166,0.18), transparent 40%), radial-gradient(circle at 80% 100%, rgba(56,189,248,0.18), transparent 40%)',
                }}
            />
            <div className="relative px-6 py-10 md:px-12 md:py-14">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${statePillClass}`}>
                        <span className="relative flex h-2 w-2">
                            {liveStatus.state === 'live' && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            )}
                            <span className={`relative inline-flex h-2 w-2 rounded-full ${liveStatus.state === 'live' ? 'bg-emerald-500' : liveStatus.state === 'upcoming' ? 'bg-sky-500' : 'bg-stone-500'}`} />
                        </span>
                        {liveStatus.label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-white/10 px-3 py-1 text-xs font-medium text-foreground/70 ring-1 ring-border">
                        <Sparkles className="h-3 w-3" /> 19th International Conference
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    ATTD 2026
                </h1>
                <p className="mt-2 text-lg md:text-xl font-medium text-foreground/80 max-w-3xl">
                    Advanced Technologies & Treatments for Diabetes
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        11 – 14 March 2026
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {ATTD_2026_META.city}, {ATTD_2026_META.country} · {ATTD_2026_META.venue}
                    </span>
                </div>

                <p className="mt-6 max-w-3xl text-foreground/75 leading-relaxed">
                    A topic-first companion to the ATTD program. Browse the four-day agenda by theme — CGM, AI &amp; digital health, closed-loop, T1D, T2D, pregnancy, pediatrics — and dive into the transcripts and slide notes attached to each session.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
                    <StatTile label="Tracks" value={featuredTrackCount} />
                    <StatTile label="Sessions" value={sessionCount} />
                    <StatTile label="Talks indexed" value={talksIndexed} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href="#tracks"
                        className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                    >
                        Browse by topic
                    </a>
                    <a
                        href={ATTD_2026_META.timetablePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition"
                    >
                        Official timetable PDF ↗
                    </a>
                </div>
            </div>
        </section>
    )
}

function StatTile({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl bg-white/70 dark:bg-white/5 ring-1 ring-border px-4 py-3">
            <div className="text-2xl font-bold tabular-nums text-foreground">{value}</div>
            <div className="text-xs uppercase tracking-wide text-foreground/60 mt-0.5">{label}</div>
        </div>
    )
}
