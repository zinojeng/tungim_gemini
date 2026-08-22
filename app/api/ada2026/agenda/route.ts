import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lectures, summaries, slides } from '@/db/schema'
import { and, desc, eq, sql } from 'drizzle-orm'
import { ADA_2026_META, ADA_2026_THEMES } from '@/lib/ada2026-themes'
import {
    ADA_2026_DAYS,
    buildAgenda,
    type AgendaInputLecture,
} from '@/lib/ada2026-agenda'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Public, read-only ADA 2026 agenda — date → session → talk.
 *
 * Reconstructs the agenda from the flat one-row-per-talk lecture table using
 * the same `buildAgenda` transform the /ada2026 page renders, so the API and
 * the UI never drift. Grouping is driven by structural tag metadata
 * (archiveGroup / part / archiveTitle), NOT by the public topic chips.
 *
 * This is intentionally separate from GET /api/ingest/agenda, which is a
 * static uploader helper (theme list for choosing trackId) and must not
 * become a dynamic DB read.
 *
 * GET /api/ada2026/agenda
 *   → { conference, meta, days, tracks, sessionCount, talkCount, sessions: [...] }
 */
export async function GET() {
    try {
        const rows = await db
            .select({
                id: lectures.id,
                title: lectures.title,
                subcategory: lectures.subcategory,
                sourceUrl: lectures.sourceUrl,
                tags: lectures.tags,
                pdfUrl: lectures.pdfUrl,
                publishDate: lectures.publishDate,
                keyTakeaways: summaries.keyTakeaways,
            })
            .from(lectures)
            .leftJoin(summaries, eq(summaries.lectureId, lectures.id))
            .where(and(eq(lectures.isPublished, true), eq(lectures.category, 'ADA2026')))
            .orderBy(desc(lectures.publishDate))

        const slideRows = await db
            .select({ lectureId: slides.lectureId, count: sql<number>`count(*)` })
            .from(slides)
            .innerJoin(lectures, eq(slides.lectureId, lectures.id))
            .where(and(eq(lectures.isPublished, true), eq(lectures.category, 'ADA2026')))
            .groupBy(slides.lectureId)
        const slideCounts = new Map<string, number>()
        for (const r of slideRows) {
            if (r.lectureId) slideCounts.set(r.lectureId, Number(r.count) || 0)
        }

        // Collapse the summaries LEFT JOIN to one row per lecture; keep the
        // first non-null keyTakeaways for the preview line.
        const byId = new Map<string, AgendaInputLecture>()
        for (const r of rows) {
            const prev = byId.get(r.id)
            if (!prev) {
                byId.set(r.id, {
                    id: r.id,
                    title: r.title,
                    subcategory: r.subcategory,
                    sourceUrl: r.sourceUrl,
                    tags: r.tags,
                    publishDate: r.publishDate ? r.publishDate.toISOString() : null,
                    slideCount: slideCounts.get(r.id) ?? 0,
                    pdfUrl: r.pdfUrl,
                    keyTakeaways: r.keyTakeaways,
                })
            } else if (prev.keyTakeaways == null && r.keyTakeaways != null) {
                prev.keyTakeaways = r.keyTakeaways
            }
        }

        const sessions = buildAgenda([...byId.values()])
        const talkCount = sessions.reduce((acc, s) => acc + s.talks.length, 0)

        return NextResponse.json({
            conference: 'ADA2026',
            meta: ADA_2026_META,
            days: ADA_2026_DAYS,
            tracks: ADA_2026_THEMES.map(({ id, name, shortName, description }) => ({
                id,
                name,
                shortName,
                description,
            })),
            sessionCount: sessions.length,
            talkCount,
            sessions,
        })
    } catch (error) {
        console.error('Error building ADA 2026 agenda:', error)
        return NextResponse.json({ error: 'Failed to build agenda.' }, { status: 500 })
    }
}
