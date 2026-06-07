'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, Layers, Mic, PlayCircle, FileText, ChevronRight, UserSquare } from 'lucide-react'
import { getTheme } from '@/lib/ada2026-themes'
import type { AdaSession, AdaTalk } from '@/lib/ada2026-agenda'

export type TimeZoneKey = 'America/Chicago' | 'Asia/Taipei'

const TZ_LABEL: Record<TimeZoneKey, string> = {
    'America/Chicago': 'CDT',
    'Asia/Taipei': 'GMT+8',
}

function formatTime(iso: string, tz: TimeZoneKey): string {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(iso))
}

function timeRange(session: AdaSession, tz: TimeZoneKey): string | null {
    if (!session.startTime) return null
    const start = formatTime(session.startTime, tz)
    if (!session.endTime || session.endTime === session.startTime) return start
    return `${start}–${formatTime(session.endTime, tz)}`
}

interface Props {
    session: AdaSession
    tz: TimeZoneKey
    /** Talk ids surviving the active search, or null when not searching. */
    matchedIds: Set<string> | null
}

export function Ada2026SessionCard({ session, tz, matchedIds }: Props) {
    const theme = getTheme(session.track)
    const time = timeRange(session, tz)
    const accentBorder = theme?.accent.border ?? 'border-slate-300'

    // Single ungrouped talk → render as one compact agenda row, not a
    // container wrapping a row that just repeats the header title.
    if (session.isSolo) {
        return (
            <SoloSession session={session} talk={session.talks[0]} tz={tz} time={time} />
        )
    }

    return (
        <section
            aria-label={session.title}
            className={`rounded-2xl border bg-card overflow-hidden ${accentBorder}`}
        >
            <header className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/30 px-4 py-3 md:px-5">
                <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/60">
                        {time && (
                            <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
                                <Clock className="h-3.5 w-3.5" />
                                {time}
                                <span className="text-foreground/40">{TZ_LABEL[tz]}</span>
                            </span>
                        )}
                        {theme && (
                            <span className={`inline-flex items-center gap-1.5 ${theme.accent.text}`}>
                                <span className={`inline-block h-1.5 w-1.5 rounded-full ${theme.accent.dot}`} />
                                {theme.name}
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1 tabular-nums">
                            <Layers className="h-3.5 w-3.5" />
                            {session.talks.length} talks
                        </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold leading-tight text-foreground break-words">
                        {session.title}
                    </h3>
                    {session.chair && (
                        <p className="inline-flex items-center gap-1 text-xs text-foreground/60">
                            <UserSquare className="h-3.5 w-3.5" />
                            Chair: <span className="font-medium text-foreground/75">{session.chair}</span>
                        </p>
                    )}
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {session.hasArchive && <ArchiveBadge />}
                        {session.hasHandouts && <HandoutsBadge />}
                    </div>
                    {session.sourceUrl && (
                        <a
                            href={session.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm transition hover:bg-rose-700"
                        >
                            <PlayCircle className="h-3 w-3" />
                            Watch full recording
                        </a>
                    )}
                </div>
            </header>

            <ol className="divide-y divide-border">
                {session.talks.map((talk, i) => (
                    <TalkRow
                        key={talk.lectureId}
                        talk={talk}
                        index={i + 1}
                        total={session.talks.length}
                        dimmed={matchedIds != null && !matchedIds.has(talk.lectureId)}
                    />
                ))}
            </ol>
        </section>
    )
}

function SoloSession({
    session,
    talk,
    tz,
    time,
}: {
    session: AdaSession
    talk: AdaTalk
    tz: TimeZoneKey
    time: string | null
}) {
    const theme = getTheme(session.track)
    return (
        <section className="rounded-2xl border bg-card p-4 md:p-5 transition hover:border-rose-300 hover:shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/60">
                        {time && (
                            <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
                                <Clock className="h-3.5 w-3.5" />
                                {time}
                                <span className="text-foreground/40">{TZ_LABEL[tz]}</span>
                            </span>
                        )}
                        {theme && (
                            <span className={`inline-flex items-center gap-1.5 ${theme.accent.text}`}>
                                <span className={`inline-block h-1.5 w-1.5 rounded-full ${theme.accent.dot}`} />
                                {theme.shortName}
                            </span>
                        )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold leading-tight break-words">
                        <Link href={`/lectures/${talk.lectureId}`} className="transition-colors hover:text-rose-700">
                            {session.title}
                        </Link>
                    </h3>
                    <TalkMeta talk={talk} />
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {talk.hasArchive && <ArchiveBadge />}
                        {talk.hasHandouts && <HandoutsBadge />}
                    </div>
                    {session.sourceUrl && (
                        <a
                            href={session.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-medium text-rose-700 transition hover:bg-rose-100"
                        >
                            <PlayCircle className="h-3 w-3" />
                            Watch on ADA portal
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}

function TalkRow({
    talk,
    index,
    total,
    dimmed,
}: {
    talk: AdaTalk
    index: number
    total: number
    dimmed: boolean
}) {
    return (
        <li className={dimmed ? 'opacity-45' : undefined}>
            <Link
                href={`/lectures/${talk.lectureId}`}
                className="group flex items-start gap-3 px-4 py-3 transition hover:bg-muted/40 md:px-5"
            >
                <span className="mt-0.5 inline-flex h-6 min-w-[2.75rem] flex-shrink-0 items-center justify-center rounded-full bg-rose-50 px-1.5 text-[10px] font-semibold tabular-nums text-rose-700">
                    {index}/{total}
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-rose-700 break-words">
                        {talk.title}
                    </p>
                    <TalkMeta talk={talk} />
                </div>
                <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-foreground/25 transition group-hover:translate-x-0.5 group-hover:text-rose-500" />
            </Link>
        </li>
    )
}

/** Shared meta block: speaker line, topic chips, takeaway preview. */
function TalkMeta({ talk }: { talk: AdaTalk }) {
    return (
        <>
            {talk.speaker && (
                <p className="inline-flex items-center gap-1 text-xs text-foreground/70">
                    <Mic className="h-3 w-3 text-rose-500/80" aria-hidden="true" />
                    <span className="font-medium">{talk.speaker}</span>
                </p>
            )}
            {(talk.primaryTopic || talk.subtopics.length > 0) && (
                <div className="flex flex-wrap items-center gap-1.5">
                    {talk.primaryTopic && (
                        <Badge
                            variant="secondary"
                            className="h-5 bg-amber-50 px-2 py-0 text-[10px] font-medium text-amber-800"
                        >
                            {talk.primaryTopic}
                        </Badge>
                    )}
                    {talk.subtopics.map((s, i) => (
                        <span key={i} className="text-[10px] text-foreground/45">
                            {s}
                        </span>
                    ))}
                </div>
            )}
            {talk.keyTakeaway && (
                <p className="line-clamp-1 text-xs leading-relaxed text-foreground/55">
                    {talk.keyTakeaway}
                </p>
            )}
        </>
    )
}

function ArchiveBadge() {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/90 px-2 py-0.5 text-[10px] font-semibold text-white">
            <PlayCircle className="h-3 w-3" />
            Archive
        </span>
    )
}

function HandoutsBadge() {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-500/30">
            <FileText className="h-3 w-3" />
            Handouts
        </span>
    )
}
