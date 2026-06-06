import { db } from '@/lib/db'
import { lectures, summaries, transcripts } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import type { Metadata } from 'next'
import { CalendarDays, MapPin, Sparkles, PlayCircle } from 'lucide-react'
import { ADA_2026_META, ADA_2026_THEMES } from '@/lib/ada2026-themes'
import { Ada2026Board, type Ada2026Lecture } from '@/components/ada2026/Ada2026Board'

const SITE_URL = 'https://mednote.zeabur.app'

function appendDistinctText(current: string | null | undefined, next: string | null | undefined) {
    if (!next) return current ?? null
    if (!current) return next
    if (current.includes(next)) return current
    if (next.includes(current)) return next
    return `${current}\n\n${next}`
}

function appendDistinctJson(current: unknown, next: unknown) {
    if (next == null) return current
    if (current == null) return next

    const values = [
        ...(Array.isArray(current) ? current : [current]),
        ...(Array.isArray(next) ? next : [next]),
    ]
    const seen = new Set<string>()
    const merged = values.filter((value) => {
        const key = JSON.stringify(value)
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
    return merged.length === 1 ? merged[0] : merged
}

export const metadata: Metadata = {
    title: 'ADA 2026 — Recorded Sessions Archive | MedNote AI',
    description:
        'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）精選有 archive 錄影回播的演講重點整理。GLP-1、SGLT2、Tirzepatide、AID、Beta cell、Stem cell 等熱門主題。',
    openGraph: {
        title: 'ADA 2026 — Recorded Sessions Archive',
        description:
            'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）精選有 archive 錄影回播的演講重點整理。',
        url: `${SITE_URL}/ada2026`,
        siteName: 'MedNote AI',
        locale: 'zh_TW',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ADA 2026 — Recorded Sessions Archive',
        description:
            'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）精選有 archive 錄影回播的演講重點整理。',
    },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAdaLectures(): Promise<Ada2026Lecture[]> {
    try {
        // LEFT JOIN summaries + transcripts so we can index their text in the
        // client-side search blob. Both tables may have >1 row per lecture
        // (no unique constraint on lecture_id), so we merge into one row per
        // lecture below.
        const rows = await db
            .select({
                id: lectures.id,
                title: lectures.title,
                sourceUrl: lectures.sourceUrl,
                videoFileUrl: lectures.videoFileUrl,
                audioFileUrl: lectures.audioFileUrl,
                provider: lectures.provider,
                category: lectures.category,
                subcategory: lectures.subcategory,
                tags: lectures.tags,
                coverImage: lectures.coverImage,
                publishDate: lectures.publishDate,
                status: lectures.status,
                isPublished: lectures.isPublished,
                executiveSummary: summaries.executiveSummary,
                fullMarkdownContent: summaries.fullMarkdownContent,
                keyTakeaways: summaries.keyTakeaways,
                transcriptContent: transcripts.content,
            })
            .from(lectures)
            .leftJoin(summaries, eq(summaries.lectureId, lectures.id))
            .leftJoin(transcripts, eq(transcripts.lectureId, lectures.id))
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, 'ADA2026'),
                ),
            )
            .orderBy(desc(lectures.publishDate))

        // Collapse duplicates from the join. Both joined tables can have many
        // rows per lecture, so a 2-summary x 3-transcript lecture returns 6
        // rows. Keep all distinct searchable content instead of only the first
        // non-null value encountered.
        const byId = new Map<string, Ada2026Lecture>()
        for (const r of rows) {
            const prev = byId.get(r.id)
            if (!prev) {
                byId.set(r.id, r as Ada2026Lecture)
                continue
            }
            byId.set(r.id, {
                ...prev,
                executiveSummary: appendDistinctText(prev.executiveSummary, r.executiveSummary),
                fullMarkdownContent: appendDistinctText(prev.fullMarkdownContent, r.fullMarkdownContent),
                keyTakeaways: appendDistinctJson(prev.keyTakeaways, r.keyTakeaways),
                transcriptContent: appendDistinctText(prev.transcriptContent, r.transcriptContent),
            })
        }
        return [...byId.values()]
    } catch (error) {
        console.error('Error fetching ADA 2026 lectures:', error)
        return []
    }
}

export default async function Ada2026Page() {
    const adaLectures = await getAdaLectures()
    const archiveCount = adaLectures.filter((l) => Boolean(l.sourceUrl)).length

    return (
        <div className="container py-8 md:py-10 max-w-6xl space-y-8">
            <Ada2026Hero talksIndexed={adaLectures.length} archiveCount={archiveCount} />

            <section id="talks" className="space-y-6">
                <Ada2026Board lectures={adaLectures} />
            </section>

            <footer className="pt-6 mt-12 border-t text-xs text-foreground/50">
                <p>
                    精選自{' '}
                    <a
                        href={ADA_2026_META.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                    >
                        ADA Scientific Sessions on-demand portal
                    </a>
                    。演講重點為獨立研讀整理，與美國糖尿病協會（ADA）並無從屬關係。
                </p>
            </footer>
        </div>
    )
}

function Ada2026Hero({
    talksIndexed,
    archiveCount,
}: {
    talksIndexed: number
    archiveCount: number
}) {
    return (
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 20% 0%, rgba(244,63,94,0.20), transparent 40%), radial-gradient(circle at 80% 100%, rgba(251,146,60,0.20), transparent 40%)',
                }}
            />
            <div className="relative px-6 py-10 md:px-12 md:py-14">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/30 px-3 py-1 text-xs font-semibold">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping motion-reduce:animate-none rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                        </span>
                        NEW · 新上線
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-white/10 px-3 py-1 text-xs font-medium text-foreground/70 ring-1 ring-border">
                        <Sparkles className="h-3 w-3" /> 86th Scientific Sessions
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 dark:bg-white/10 px-3 py-1 text-xs font-medium text-foreground/70 ring-1 ring-border">
                        <PlayCircle className="h-3 w-3" /> Recorded sessions only
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    ADA 2026
                </h1>
                <p className="mt-2 text-lg md:text-xl font-medium text-foreground/80 max-w-3xl">
                    American Diabetes Association · Scientific Sessions
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        5 – 8 June 2026
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {ADA_2026_META.city}, {ADA_2026_META.country} · {ADA_2026_META.venue}
                    </span>
                </div>

                <p className="mt-6 max-w-3xl text-foreground/75 leading-relaxed">
                    本頁是{' '}
                    <strong className="text-foreground/90">策展型 archive 重點整理</strong>
                    ：只收錄具有 on-demand 錄影回播的演講，附逐字稿、投影片重點與我整理的摘要。並非完整議程。
                </p>
                <p className="mt-2 max-w-3xl text-sm text-foreground/60">
                    註：與導覽列「2026 ADA」（學會年度治療指引）為不同頁面——此處專注於 ADA 2026 大會現場演講。
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
                    <StatTile label="Themes" value={ADA_2026_THEMES.length} />
                    <StatTile label="Talks indexed" value={talksIndexed} />
                    <StatTile label="With archive" value={archiveCount} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href="#talks"
                        className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                    >
                        瀏覽演講重點
                    </a>
                    <a
                        href={ADA_2026_META.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition"
                    >
                        ADA on-demand portal ↗
                    </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-1.5">
                    {ADA_2026_THEMES.map((t) => (
                        <span
                            key={t.id}
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${t.accent.chip}`}
                        >
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${t.accent.dot}`} />
                            {t.shortName}
                        </span>
                    ))}
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
