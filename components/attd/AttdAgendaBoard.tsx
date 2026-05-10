'use client'

import { useMemo, useState } from 'react'
import {
    AttdSession,
    AttdTrack,
    ATTD_2026_DAYS,
    ATTD_2026_TRACKS,
    ATTD_2026_SESSIONS,
} from '@/lib/attd2026-agenda'
import { Lecture } from '@/types'
import { AttdTrackSection } from './AttdTrackSection'
import { Search, X } from 'lucide-react'

interface Props {
    lectures: Lecture[]
}

export function AttdAgendaBoard({ lectures }: Props) {
    const [activeTrack, setActiveTrack] = useState<string | 'all'>('all')
    const [activeDay, setActiveDay] = useState<string | 'all'>('all')
    const [showIndustry, setShowIndustry] = useState(false)
    const [search, setSearch] = useState('')

    // Index lectures by session id (tags[0]) and by track (subcategory)
    const { lecturesBySession, lecturesByTrack } = useMemo(() => {
        const bySession: Record<string, Lecture[]> = {}
        const byTrack: Record<string, Lecture[]> = {}
        for (const l of lectures) {
            const sessionId = l.tags?.[0]
            if (sessionId) {
                ; (bySession[sessionId] ??= []).push(l)
            }
            const trackId = l.subcategory
            if (trackId) {
                ; (byTrack[trackId] ??= []).push(l)
            }
        }
        return { lecturesBySession: bySession, lecturesByTrack: byTrack }
    }, [lectures])

    const trackCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const s of ATTD_2026_SESSIONS) {
            if (showIndustry || s.trackId !== 'industry') {
                counts[s.trackId] = (counts[s.trackId] ?? 0) + 1
            }
        }
        return counts
    }, [showIndustry])

    const filteredSessions = useMemo(() => {
        let arr: AttdSession[] = ATTD_2026_SESSIONS.slice()
        if (!showIndustry) arr = arr.filter((s) => s.trackId !== 'industry')
        if (activeTrack !== 'all') arr = arr.filter((s) => s.trackId === activeTrack)
        if (activeDay !== 'all') arr = arr.filter((s) => s.date === activeDay)
        if (search.trim()) {
            const q = search.toLowerCase()
            arr = arr.filter(
                (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.id.toLowerCase().includes(q) ||
                    s.room.toLowerCase().includes(q),
            )
        }
        return arr
    }, [activeTrack, activeDay, showIndustry, search])

    const tracksToShow: AttdTrack[] = useMemo(() => {
        let t = ATTD_2026_TRACKS.slice()
        if (!showIndustry) t = t.filter((x) => x.id !== 'industry')
        if (activeTrack !== 'all') t = t.filter((x) => x.id === activeTrack)
        return t
    }, [showIndustry, activeTrack])

    return (
        <div className="space-y-6">
            {/* Sticky filter rail */}
            <div className="sticky top-14 z-30 -mx-4 md:mx-0 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="px-4 md:px-0 py-3 space-y-3">
                    {/* Top row: search + industry toggle */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex-1 min-w-[180px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search session title, ID, or room..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border border-input bg-background pl-8 pr-8 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground/30"
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

                        <label className="inline-flex items-center gap-1.5 text-xs text-foreground/70 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={showIndustry}
                                onChange={(e) => setShowIndustry(e.target.checked)}
                                className="h-3.5 w-3.5 rounded border-input"
                            />
                            Show industry
                        </label>
                    </div>

                    {/* Day chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <DayChip
                            active={activeDay === 'all'}
                            onClick={() => setActiveDay('all')}
                            label="All days"
                        />
                        {ATTD_2026_DAYS.map((d) => (
                            <DayChip
                                key={d.key}
                                active={activeDay === d.date}
                                onClick={() => setActiveDay(d.date)}
                                label={d.label}
                                short={d.shortLabel}
                            />
                        ))}
                    </div>

                    {/* Track chips */}
                    <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                        <TrackChip
                            active={activeTrack === 'all'}
                            onClick={() => setActiveTrack('all')}
                            label="All tracks"
                            count={Object.values(trackCounts).reduce((a, b) => a + b, 0)}
                        />
                        {ATTD_2026_TRACKS.filter((t) => showIndustry || t.id !== 'industry').map(
                            (t) => (
                                <TrackChip
                                    key={t.id}
                                    active={activeTrack === t.id}
                                    onClick={() => setActiveTrack(t.id)}
                                    label={t.shortName}
                                    count={trackCounts[t.id] ?? 0}
                                    accent={activeTrack === t.id ? t.accent.chipActive : t.accent.chip}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>

            {/* Body */}
            {filteredSessions.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-sm">
                    No sessions match this filter.
                </div>
            ) : (
                <div id="tracks" className="space-y-12">
                    {tracksToShow.map((track) => {
                        const trackSessions = filteredSessions.filter(
                            (s) => s.trackId === track.id,
                        )
                        if (trackSessions.length === 0) return null
                        const trackLectures = lecturesByTrack[track.id] ?? []
                        const sessionIds = new Set(trackSessions.map((s) => s.id))
                        const looseLectures = trackLectures.filter(
                            (l) => !l.tags?.[0] || !sessionIds.has(l.tags[0]),
                        )
                        return (
                            <AttdTrackSection
                                key={track.id}
                                track={track}
                                sessions={trackSessions}
                                lecturesBySessionId={Object.fromEntries(
                                    trackSessions.map((s) => [
                                        s.id,
                                        lecturesBySession[s.id] ?? [],
                                    ]),
                                )}
                                looseLectures={looseLectures}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function DayChip({
    active,
    onClick,
    label,
    short,
}: {
    active: boolean
    onClick: () => void
    label: string
    short?: string
}) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${active
                    ? 'bg-foreground text-background ring-foreground'
                    : 'bg-background ring-border text-foreground/70 hover:bg-muted'
                }`}
        >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{short ?? label}</span>
        </button>
    )
}

function TrackChip({
    active,
    onClick,
    label,
    count,
    accent,
}: {
    active: boolean
    onClick: () => void
    label: string
    count: number
    accent?: string
}) {
    const base =
        accent ??
        (active
            ? 'bg-foreground text-background'
            : 'bg-muted text-foreground/70 hover:bg-muted/80')
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${base}`}
        >
            <span>{label}</span>
            <span className="tabular-nums opacity-70 text-[10px]">{count}</span>
        </button>
    )
}
