'use client'

import { useMemo, useState } from 'react'
import { Lecture } from '@/types'
import { ADA_2026_THEMES, Ada2026Theme } from '@/lib/ada2026-themes'
import { Ada2026LectureCard } from './Ada2026LectureCard'
import { Search, X } from 'lucide-react'

interface Props {
    lectures: Lecture[]
}

function buildSearchBlob(l: Lecture): string {
    const parts: string[] = [l.title]
    if (l.tags?.length) parts.push(l.tags.join(' '))
    if (l.subcategory) parts.push(l.subcategory)
    return parts.join(' \n ').toLowerCase()
}

export function Ada2026Board({ lectures }: Props) {
    const [activeTheme, setActiveTheme] = useState<string | 'all'>('all')
    const [search, setSearch] = useState('')

    // Precompute search blob + theme bucketing once per lecture set.
    const { searchBlobs, lecturesByTheme, uncategorized } = useMemo(() => {
        const blobs: Record<string, string> = {}
        const byTheme: Record<string, Lecture[]> = {}
        const orphans: Lecture[] = []
        const themeIds = new Set(ADA_2026_THEMES.map((t) => t.id))
        for (const l of lectures) {
            blobs[l.id] = buildSearchBlob(l)
            const tid = l.subcategory ?? ''
            if (tid && themeIds.has(tid)) {
                ; (byTheme[tid] ??= []).push(l)
            } else {
                orphans.push(l)
            }
        }
        return { searchBlobs: blobs, lecturesByTheme: byTheme, uncategorized: orphans }
    }, [lectures])

    const themeCounts = useMemo(() => {
        const out: Record<string, number> = {}
        for (const t of ADA_2026_THEMES) out[t.id] = lecturesByTheme[t.id]?.length ?? 0
        return out
    }, [lecturesByTheme])

    const visibleThemes: Ada2026Theme[] = useMemo(() => {
        if (activeTheme === 'all') return ADA_2026_THEMES
        return ADA_2026_THEMES.filter((t) => t.id === activeTheme)
    }, [activeTheme])

    const filteredByTheme = useMemo(() => {
        const q = search.trim().toLowerCase()
        const out: Record<string, Lecture[]> = {}
        for (const t of visibleThemes) {
            const list = lecturesByTheme[t.id] ?? []
            out[t.id] = q ? list.filter((l) => searchBlobs[l.id]?.includes(q)) : list
        }
        return out
    }, [visibleThemes, lecturesByTheme, searchBlobs, search])

    const filteredUncategorized = useMemo(() => {
        if (activeTheme !== 'all') return []
        const q = search.trim().toLowerCase()
        return q ? uncategorized.filter((l) => searchBlobs[l.id]?.includes(q)) : uncategorized
    }, [activeTheme, uncategorized, searchBlobs, search])

    const totalShown =
        Object.values(filteredByTheme).reduce((a, b) => a + b.length, 0) + filteredUncategorized.length

    return (
        <div className="space-y-6">
            {/* Sticky filter rail */}
            <div className="sticky top-14 z-30 -mx-4 md:mx-0 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="px-4 md:px-0 py-3 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex-1 min-w-[180px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="搜尋演講標題、講者、tags…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border border-input bg-background pl-8 pr-8 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400/40"
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
                    </div>

                    <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                        <ThemeChip
                            active={activeTheme === 'all'}
                            onClick={() => setActiveTheme('all')}
                            label="All themes"
                            count={lectures.length}
                        />
                        {ADA_2026_THEMES.map((t) => (
                            <ThemeChip
                                key={t.id}
                                active={activeTheme === t.id}
                                onClick={() => setActiveTheme(t.id)}
                                label={t.shortName}
                                count={themeCounts[t.id]}
                                accent={activeTheme === t.id ? t.accent.chipActive : t.accent.chip}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Body */}
            {totalShown === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                    <p className="text-foreground/70">
                        {lectures.length === 0
                            ? '演講重點陸續整理中。會議於 2026 年 6 月 5–8 日於 New Orleans 舉行；只有具備 archive 錄影回播的場次會在此呈現。'
                            : '沒有符合篩選條件的演講。試試調整主題或搜尋字詞。'}
                    </p>
                </div>
            ) : (
                <div className="space-y-12">
                    {visibleThemes.map((theme) => {
                        const list = filteredByTheme[theme.id] ?? []
                        if (list.length === 0) return null
                        return (
                            <section
                                key={theme.id}
                                aria-labelledby={`theme-${theme.id}`}
                                className="scroll-mt-32"
                            >
                                <div className={`flex items-baseline gap-3 mb-4 pb-2 border-b ${theme.accent.border}`}>
                                    <span className={`inline-block h-2 w-2 rounded-full ${theme.accent.dot}`} />
                                    <h2
                                        id={`theme-${theme.id}`}
                                        className={`text-xl font-bold tracking-tight ${theme.accent.text}`}
                                    >
                                        {theme.name}
                                    </h2>
                                    <span className="text-xs text-foreground/50 tabular-nums">
                                        {list.length} talks
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/60 mb-4 max-w-2xl">{theme.description}</p>
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {list.map((lecture) => (
                                        <Ada2026LectureCard key={lecture.id} lecture={lecture} />
                                    ))}
                                </div>
                            </section>
                        )
                    })}

                    {filteredUncategorized.length > 0 && (
                        <section aria-labelledby="theme-uncategorized" className="scroll-mt-32">
                            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-slate-300">
                                <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                                <h2 id="theme-uncategorized" className="text-xl font-bold tracking-tight text-slate-700">
                                    Other
                                </h2>
                                <span className="text-xs text-foreground/50 tabular-nums">
                                    {filteredUncategorized.length} talks
                                </span>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredUncategorized.map((lecture) => (
                                    <Ada2026LectureCard key={lecture.id} lecture={lecture} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

function ThemeChip({
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
        (active ? 'bg-foreground text-background' : 'bg-muted text-foreground/70 hover:bg-muted/80')
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
