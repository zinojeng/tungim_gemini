import { db } from '@/lib/db'
import { lectures } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { LectureCard } from '@/components/LectureCard'
import { Lecture } from '@/types'
import type { Metadata } from 'next'
import { CalendarDays, MapPin, Sparkles } from 'lucide-react'

const SITE_URL = 'https://mednote.zeabur.app'

const ADA2026_META = {
    city: 'New Orleans',
    country: 'USA',
    venue: 'Ernest N. Morial Convention Center',
    eventUrl: 'https://events.diabetes.org/live/32/page/330',
}

export const metadata: Metadata = {
    title: 'ADA 2026 — Scientific Sessions Companion | MedNote AI',
    description:
        'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）演講重點整理。從各場次的逐字稿與投影片重點，快速掌握今年最重要的糖尿病臨床與研究進展。',
    openGraph: {
        title: 'ADA 2026 — Scientific Sessions Companion',
        description:
            'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）演講重點整理。',
        url: `${SITE_URL}/ada2026`,
        siteName: 'MedNote AI',
        locale: 'zh_TW',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ADA 2026 — Scientific Sessions Companion',
        description:
            'ADA 86th Scientific Sessions（New Orleans, 5–8 June 2026）演講重點整理。',
    },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAdaLectures(): Promise<Lecture[]> {
    try {
        const rows = await db
            .select()
            .from(lectures)
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, 'ADA2026'),
                ),
            )
            .orderBy(desc(lectures.publishDate))
        return rows as Lecture[]
    } catch (error) {
        console.error('Error fetching ADA 2026 lectures:', error)
        return []
    }
}

export default async function Ada2026Page() {
    const adaLectures = await getAdaLectures()

    return (
        <div className="container py-8 md:py-10 max-w-6xl space-y-8">
            <Ada2026Hero talksIndexed={adaLectures.length} />

            <section id="talks" className="space-y-6">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">演講重點整理</h2>
                    <span className="text-sm text-foreground/60 tabular-nums">
                        {adaLectures.length} talks
                    </span>
                </div>

                {adaLectures.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                        <p className="text-foreground/70">
                            演講重點陸續整理中。會議於 2026 年 6 月 5–8 日在 New Orleans 舉行，內容將在會議期間與會後陸續上線。
                        </p>
                        <a
                            href={ADA2026_META.eventUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center rounded-full ring-1 ring-border px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition"
                        >
                            前往大會官方頁面 ↗
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {adaLectures.map((lecture) => (
                            <LectureCard key={lecture.id} lecture={lecture} />
                        ))}
                    </div>
                )}
            </section>

            <footer className="pt-6 mt-12 border-t text-xs text-foreground/50">
                <p>
                    Session data referenced from the official{' '}
                    <a
                        href={ADA2026_META.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                    >
                        ADA Scientific Sessions site
                    </a>
                    . Lecture summaries are independent study notes and not affiliated with the ADA.
                </p>
            </footer>
        </div>
    )
}

function Ada2026Hero({ talksIndexed }: { talksIndexed: number }) {
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
                        {ADA2026_META.city}, {ADA2026_META.country} · {ADA2026_META.venue}
                    </span>
                </div>

                <p className="mt-6 max-w-3xl text-foreground/75 leading-relaxed">
                    今年 ADA 會議現場演講內容的重點整理。從各場次的逐字稿與投影片重點，幫你快速掌握 GLP-1、SGLT2、Tirzepatide、AID、Beta-cell、Stem cell 等熱門主題的最新進展。
                </p>
                <p className="mt-2 max-w-3xl text-sm text-foreground/60">
                    註：本頁與導覽列上的「2026 ADA」（學會年度治療指引）不同——這裡專注於 ADA 2026 大會現場的演講內容整理。
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href="#talks"
                        className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                    >
                        查看演講重點 ({talksIndexed})
                    </a>
                    <a
                        href={ADA2026_META.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full ring-1 ring-border px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition"
                    >
                        ADA 官方議程 ↗
                    </a>
                </div>
            </div>
        </section>
    )
}
