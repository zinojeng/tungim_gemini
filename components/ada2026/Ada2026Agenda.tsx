'use client'

import { useMemo, useState } from 'react'
import { Search, X, Clock4 } from 'lucide-react'
import { ADA_2026_THEMES } from '@/lib/ada2026-themes'
import {
    ADA_2026_DAYS,
    UNSCHEDULED_DAY,
    buildAgenda,
    type AdaSession,
    type AgendaInputLecture,
} from '@/lib/ada2026-agenda'
import { Ada2026SessionCard, type TimeZoneKey } from './Ada2026SessionCard'

/**
 * Agenda input row: the structural fields buildAgenda() needs, plus the
 * joined summary/transcript text columns used only for the in-page search
 * blob (never rendered directly).
 */
export interface Ada2026AgendaLecture extends AgendaInputLecture {
    executiveSummary?: string | null
    fullMarkdownContent?: string | null
    transcriptContent?: string | null
}

interface Props {
    lectures: Ada2026AgendaLecture[]
}

const TZ_OPTIONS: { key: TimeZoneKey; label: string }[] = [
    { key: 'America/Chicago', label: 'Chicago' },
    { key: 'Asia/Taipei', label: 'Taipei' },
]

const DAY_LABEL = new Map<string, string>([
    ...ADA_2026_DAYS.map((d) => [d.key, d.label] as [string, string]),
    [UNSCHEDULED_DAY, '時間待定 · Unscheduled'],
])

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function flattenTakeaways(value: unknown): string {
    if (value == null) return ''
    if (typeof value === 'string') return value
    if (Array.isArray(value)) {
        return value.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ')
    }
    return JSON.stringify(value)
}

/** Lowercased text blob across every searchable surface of a lecture. */
function buildSearchBlob(l: Ada2026AgendaLecture): string {
    const parts: string[] = [l.title]
    if (l.tags?.length) parts.push(l.tags.join(' '))
    if (l.subcategory) parts.push(l.subcategory)
    if (l.executiveSummary) parts.push(l.executiveSummary)
    if (l.fullMarkdownContent) parts.push(l.fullMarkdownContent)
    if (l.transcriptContent) parts.push(l.transcriptContent)
    const tk = flattenTakeaways(l.keyTakeaways)
    if (tk) parts.push(tk)
    return parts.join(' \n ').toLowerCase()
}

function matchesBlob(blob: string | undefined, rawQuery: string): boolean {
    if (!blob) return false
    const terms = rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return true
    const phrase = terms.map(escapeRegExp).join('\\s+')
    const pattern = new RegExp(`(?:^|[^\\p{L}\\p{N}_])${phrase}(?:$|[^\\p{L}\\p{N}_])`, 'u')
    return pattern.test(blob)
}

export function Ada2026Agenda({ lectures }: Props) {
    const [activeTrack, setActiveTrack] = useState<string | 'all'>('all')
    const [activeDay, setActiveDay] = useState<string | 'all'>('all')
    const [tz, setTz] = useState<TimeZoneKey>('America/Chicago')
    const [search, setSearch] = useState('')

    const sessions = useMemo(() => buildAgenda(lectures), [lectures])

    const searchBlobs = useMemo(() => {
        const map: Record<string, string> = {}
        for (const l of lectures) map[l.id] = buildSearchBlob(l)
        return map
    }, [lectures])

    // Talk ids surviving the search. null = not searching.
    const matchedIds = useMemo<Set<string> | null>(() => {
        const q = search.trim().toLowerCase()
        if (!q) return null
        return new Set(lectures.filter((l) => matchesBlob(searchBlobs[l.id], q)).map((l) => l.id))
    }, [lectures, searchBlobs, search])

    // Counts per track / per day across all sessions (pre-filter), for chips.
    const { trackCounts, dayCounts } = useMemo(() => {
        const tc: Record<string, number> = {}
        const dc: Record<string, number> = {}
        for (const s of sessions) {
            if (s.track) tc[s.track] = (tc[s.track] ?? 0) + 1
            dc[s.dayKey] = (dc[s.dayKey] ?? 0) + 1
        }
        return { trackCounts: tc, dayCounts: dc }
    }, [sessions])

    const visibleSessions = useMemo(() => {
        return sessions.filter((s) => {
            if (activeTrack !== 'all' && s.track !== activeTrack) return false
            if (activeDay !== 'all' && s.dayKey !== activeDay) return false
            if (matchedIds && !s.talks.some((t) => matchedIds.has(t.lectureId))) return false
            return true
        })
    }, [sessions, activeTrack, activeDay, matchedIds])

    // Group visible sessions under day headers, in canonical day order.
    const dayGroups = useMemo(() => {
        const order = [...ADA_2026_DAYS.map((d) => d.key), UNSCHEDULED_DAY]
        const byDay = new Map<string, AdaSession[]>()
        for (const s of visibleSessions) {
            const arr = byDay.get(s.dayKey) ?? []
            arr.push(s)
            byDay.set(s.dayKey, arr)
        }
        return order
            .filter((k) => byDay.has(k))
            .map((k) => ({ dayKey: k, label: DAY_LABEL.get(k) ?? k, sessions: byDay.get(k)! }))
    }, [visibleSessions])

    const totalTalks = visibleSessions.reduce((acc, s) => acc + s.talks.length, 0)
    const matchCount = matchedIds?.size ?? null

    return (
        <div className="space-y-6">
            {/* Sticky filter rail */}
            <div className="sticky top-14 z-30 -mx-4 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:mx-0">
                <div className="space-y-3 px-4 py-3 md:px-0">
                    {/* Search + timezone toggle */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative min-w-[180px] flex-1">
                            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="搜尋 speaker、talk title、主題、摘要、逐字稿…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border border-input bg-background py-1.5 pl-8 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400/40"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                        <div
                            className="inline-flex items-center rounded-full border border-input bg-background p-0.5"
                            role="group"
                            aria-label="Timezone"
                        >
                            <Clock4 className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-muted-foreground" />
                            {TZ_OPTIONS.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setTz(opt.key)}
                                    aria-pressed={tz === opt.key}
                                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                                        tz === opt.key
                                            ? 'bg-foreground text-background'
                                            : 'text-foreground/60 hover:text-foreground'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Track filter */}
                    <div className="-mx-1 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-thin">
                        <FilterChip
                            active={activeTrack === 'all'}
                            onClick={() => setActiveTrack('all')}
                            label="All tracks"
                            count={sessions.length}
                        />
                        {ADA_2026_THEMES.map((t) => {
                            const count = trackCounts[t.id] ?? 0
                            return (
                                <FilterChip
                                    key={t.id}
                                    active={activeTrack === t.id}
                                    onClick={() => setActiveTrack(t.id)}
                                    label={t.shortName}
                                    count={count}
                                    accent={activeTrack === t.id ? t.accent.chipActive : t.accent.chip}
                                    empty={count === 0}
                                />
                            )
                        })}
                    </div>

                    {/* Day filter */}
                    <div className="-mx-1 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-1 pb-0.5 scrollbar-thin">
                        <FilterChip
                            active={activeDay === 'all'}
                            onClick={() => setActiveDay('all')}
                            label="All days"
                            count={sessions.length}
                        />
                        {ADA_2026_DAYS.map((d) => {
                            const count = dayCounts[d.key] ?? 0
                            return (
                                <FilterChip
                                    key={d.key}
                                    active={activeDay === d.key}
                                    onClick={() => setActiveDay(d.key)}
                                    label={d.label}
                                    count={count}
                                    empty={count === 0}
                                />
                            )
                        })}
                        {(dayCounts[UNSCHEDULED_DAY] ?? 0) > 0 && (
                            <FilterChip
                                active={activeDay === UNSCHEDULED_DAY}
                                onClick={() => setActiveDay(UNSCHEDULED_DAY)}
                                label="待定"
                                count={dayCounts[UNSCHEDULED_DAY] ?? 0}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Body */}
            {visibleSessions.length === 0 ? (
                <EmptyState
                    hasLectures={lectures.length > 0}
                    searching={Boolean(search.trim())}
                    matchCount={matchCount}
                    onReset={() => {
                        setActiveTrack('all')
                        setActiveDay('all')
                        setSearch('')
                    }}
                />
            ) : (
                <div className="space-y-10">
                    <p className="text-xs text-foreground/50 tabular-nums">
                        {visibleSessions.length} sessions · {totalTalks} talks
                        {matchCount != null && ` · ${matchCount} match${matchCount === 1 ? '' : 'es'}`}
                    </p>
                    {dayGroups.map(({ dayKey, label, sessions: daySessions }) => (
                        <section key={dayKey} aria-label={label} className="scroll-mt-32 space-y-4">
                            <div className="flex items-baseline gap-3 border-b pb-2">
                                <h2 className="text-lg font-bold tracking-tight text-foreground">{label}</h2>
                                <span className="text-xs tabular-nums text-foreground/50">
                                    {daySessions.length} sessions
                                </span>
                            </div>
                            <div className="space-y-4">
                                {daySessions.map((s) => (
                                    <Ada2026SessionCard
                                        key={s.id}
                                        session={s}
                                        tz={tz}
                                        matchedIds={matchedIds}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    )
}

function EmptyState({
    hasLectures,
    searching,
    matchCount,
    onReset,
}: {
    hasLectures: boolean
    searching: boolean
    matchCount: number | null
    onReset: () => void
}) {
    return (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="text-foreground/70">
                {!hasLectures
                    ? '演講重點陸續整理中。會議於 2026 年 6 月 5–8 日於 New Orleans 舉行；只有具備 archive 錄影回播的場次會在此呈現。'
                    : searching && matchCount === 0
                        ? '沒有符合搜尋字詞的演講。試試其他關鍵字。'
                        : '目前的篩選條件下沒有議程。試試調整 track / day 或清除搜尋。'}
            </p>
            {hasLectures && (
                <button
                    onClick={onReset}
                    className="mt-4 inline-flex items-center rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90"
                >
                    清除篩選
                </button>
            )}
        </div>
    )
}

function FilterChip({
    active,
    onClick,
    label,
    count,
    accent,
    empty = false,
}: {
    active: boolean
    onClick: () => void
    label: string
    count: number
    accent?: string
    empty?: boolean
}) {
    const base =
        accent ??
        (active ? 'bg-foreground text-background' : 'bg-muted text-foreground/70 hover:bg-muted/80')
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${base} ${
                empty && !active ? 'opacity-40 hover:opacity-60' : ''
            }`}
        >
            <span>{label}</span>
            <span className="text-[10px] tabular-nums opacity-70">{count}</span>
        </button>
    )
}
