'use client'

import { useMemo, useState } from 'react'
import { Lecture } from '@/types'
import { ADA_2026_THEMES, Ada2026Theme } from '@/lib/ada2026-themes'
import { Ada2026LectureCard } from './Ada2026LectureCard'
import { Ada2026ArchiveGroup } from './Ada2026ArchiveGroup'
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

const ARCHIVE_GROUP_PREFIX = 'archiveGroup:'
const ARCHIVE_TITLE_PREFIX = 'archiveTitle:'
const PART_PREFIX = 'part:'

function tagValue(tags: string[] | null | undefined, prefix: string): string | null {
    if (!tags) return null
    const t = tags.find((x) => x.startsWith(prefix))
    return t ? t.slice(prefix.length) : null
}

function partOrder(l: Lecture): number {
    const raw = tagValue(l.tags, PART_PREFIX)
    if (!raw) return Number.MAX_SAFE_INTEGER
    const n = Number(raw)
    return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER
}

function pubTime(l: Lecture): number {
    return l.publishDate ? new Date(l.publishDate).getTime() : 0
}

type RenderItem =
    | { kind: 'solo'; lecture: Lecture }
    | {
          kind: 'group'
          id: string
          title: string | null
          sourceUrl: string | null
          parts: Lecture[]
          /** Most recent publishDate among parts — used for ordering against solos. */
          mostRecent: number
      }

/**
 * Split a theme's lecture list into mixed solo/group render items.
 *
 * Grouping is computed against `unfiltered` (the full theme list), but the
 * caller supplies `visibleIds` describing which lectures survived the current
 * search filter. A group renders in full whenever ANY of its parts is in
 * `visibleIds` — this keeps "Part N/M" badges and the group title accurate
 * even when the user's query only matches some parts of an 8-part archive.
 *
 * A group with only one part is demoted to a solo card — a "1 parts"
 * container with a duplicate CTA is worse than just showing the lecture.
 *
 * Groups and solos interleave by the parts' most-recent publishDate so a
 * freshly-uploaded archive doesn't sink under older solo cards.
 */
function buildRenderItems(unfiltered: Lecture[], visibleIds: Set<string> | null): RenderItem[] {
    const isVisible = (id: string) => visibleIds === null || visibleIds.has(id)
    const groupMap = new Map<string, Lecture[]>()
    const solos: Lecture[] = []
    for (const l of unfiltered) {
        const gid = tagValue(l.tags, ARCHIVE_GROUP_PREFIX)
        if (gid) {
            const arr = groupMap.get(gid) ?? []
            arr.push(l)
            groupMap.set(gid, arr)
        } else if (isVisible(l.id)) {
            solos.push(l)
        }
    }
    const items: RenderItem[] = []
    for (const [id, parts] of groupMap) {
        const anyVisible = parts.some((p) => isVisible(p.id))
        if (!anyVisible) continue
        // Single-part group → render as a plain solo so we don't show a
        // "1 parts" container and suppress the only useful CTA.
        if (parts.length < 2) {
            const lone = parts[0]
            if (isVisible(lone.id)) solos.push(lone)
            continue
        }
        parts.sort((a, b) => {
            const pa = partOrder(a)
            const pb = partOrder(b)
            if (pa !== pb) return pa - pb
            return pubTime(b) - pubTime(a)
        })
        const title = parts.map((p) => tagValue(p.tags, ARCHIVE_TITLE_PREFIX)).find(Boolean) ?? null
        const sourceUrl = parts.find((p) => p.sourceUrl)?.sourceUrl ?? null
        const mostRecent = parts.reduce((acc, p) => Math.max(acc, pubTime(p)), 0)
        items.push({ kind: 'group', id, title, sourceUrl, parts, mostRecent })
    }
    for (const s of solos) items.push({ kind: 'solo', lecture: s })
    items.sort((a, b) => {
        const at = a.kind === 'group' ? a.mostRecent : pubTime(a.lecture)
        const bt = b.kind === 'group' ? b.mostRecent : pubTime(b.lecture)
        if (at !== bt) return bt - at
        // Stable tiebreak: groups before solos at equal time, then by id/title
        // so the order is deterministic across renders.
        const aKey = a.kind === 'group' ? `g:${a.id}` : `s:${a.lecture.id}`
        const bKey = b.kind === 'group' ? `g:${b.id}` : `s:${b.lecture.id}`
        return aKey.localeCompare(bKey)
    })
    return items
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

    // Single source of truth for the active search filter. `null` = no filter.
    // Pre-grouping IDs only — group rendering then expands matching IDs back
    // to their full group (see buildRenderItems) so part numbering stays
    // honest even when only some parts of an 8-part archive match the query.
    const visibleIds = useMemo<Set<string> | null>(() => {
        const q = search.trim().toLowerCase()
        if (!q) return null
        return new Set(lectures.filter((l) => searchBlobs[l.id]?.includes(q)).map((l) => l.id))
    }, [lectures, searchBlobs, search])

    const themeBuckets = useMemo(() => {
        return visibleThemes.map((theme) => {
            const list = lecturesByTheme[theme.id] ?? []
            const items = buildRenderItems(list, visibleIds)
            const visibleCount = items.reduce(
                (acc, it) => acc + (it.kind === 'solo' ? 1 : it.parts.length),
                0,
            )
            return { theme, items, visibleCount }
        })
    }, [visibleThemes, lecturesByTheme, visibleIds])

    const uncategorizedBucket = useMemo(() => {
        if (activeTheme !== 'all') return { items: [] as RenderItem[], visibleCount: 0 }
        const items = buildRenderItems(uncategorized, visibleIds)
        const visibleCount = items.reduce(
            (acc, it) => acc + (it.kind === 'solo' ? 1 : it.parts.length),
            0,
        )
        return { items, visibleCount }
    }, [activeTheme, uncategorized, visibleIds])

    const totalShown =
        themeBuckets.reduce((a, b) => a + b.visibleCount, 0) + uncategorizedBucket.visibleCount

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
                    {themeBuckets.map(({ theme, items, visibleCount }) => {
                        if (items.length === 0) return null
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
                                        {visibleCount} talks
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/60 mb-4 max-w-2xl">{theme.description}</p>
                                <RenderList items={items} />
                            </section>
                        )
                    })}

                    {uncategorizedBucket.items.length > 0 && (
                        <section aria-labelledby="theme-uncategorized" className="scroll-mt-32">
                            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-slate-300">
                                <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                                <h2 id="theme-uncategorized" className="text-xl font-bold tracking-tight text-slate-700">
                                    Other
                                </h2>
                                <span className="text-xs text-foreground/50 tabular-nums">
                                    {uncategorizedBucket.visibleCount} talks
                                </span>
                            </div>
                            <RenderList items={uncategorizedBucket.items} />
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

/**
 * Renders a mixed list of solos (lecture cards) and archive groups (bordered
 * containers wrapping their part cards). Solos and groups interleave purely
 * by `mostRecent` publish time — see buildRenderItems above.
 *
 * Solo cards live in a 4-col grid; archive groups break out of the grid into
 * a full-width row so the group container reads as one unit. Adjacent solo
 * cards regroup into the next grid below.
 */
function RenderList({ items }: { items: RenderItem[] }) {
    // Collapse runs of solos into one grid; each group renders standalone.
    const blocks: Array<{ kind: 'solos'; lectures: Lecture[] } | { kind: 'group'; item: Extract<RenderItem, { kind: 'group' }> }> = []
    let buffer: Lecture[] = []
    const flush = () => {
        if (buffer.length) {
            blocks.push({ kind: 'solos', lectures: buffer })
            buffer = []
        }
    }
    for (const it of items) {
        if (it.kind === 'solo') buffer.push(it.lecture)
        else {
            flush()
            blocks.push({ kind: 'group', item: it })
        }
    }
    flush()

    return (
        <div className="space-y-5">
            {blocks.map((b, i) =>
                b.kind === 'solos' ? (
                    <div key={`solos-${i}`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {b.lectures.map((l) => (
                            <Ada2026LectureCard key={l.id} lecture={l} />
                        ))}
                    </div>
                ) : (
                    <Ada2026ArchiveGroup
                        key={b.item.id}
                        groupId={b.item.id}
                        title={b.item.title}
                        sourceUrl={b.item.sourceUrl}
                        parts={b.item.parts}
                    />
                ),
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
