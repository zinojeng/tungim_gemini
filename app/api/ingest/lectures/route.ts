import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries } from '@/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { requireIngestAuth } from '@/lib/ingest-auth'
import {
    replaceSlides,
    SlidesValidationError,
    validateSlides,
} from '@/lib/ingest-slides'
import {
    getSessionById,
    getTrackById,
    ATTD_2026_META,
} from '@/lib/attd2026-agenda'

export const dynamic = 'force-dynamic'

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://mednote.zeabur.app'

const KNOWN_CONFERENCES: Record<string, { category: string }> = {
    ATTD2026: { category: 'ATTD2026' },
    AOCE2026: { category: 'AOCE2026' },
    ADA2026: { category: '2026 ADA' },
    DIABETES_AI: { category: 'Diabetes AI' },
}

interface CreatePayload {
    /** required: short conference key, e.g. "ATTD2026" */
    conference: string
    /** required */
    title: string
    /** optional — when conference has structured tracks/sessions */
    trackId?: string
    sessionId?: string
    /** ISO date or datetime; defaults to now */
    publishDate?: string
    /** free-text tags. sessionId (if any) is auto-prepended. */
    tags?: string[]
    /** marker like "Manual Import", "Claude MCP", "Codex MCP", etc. */
    provider?: string
    /** content */
    transcript?: string
    summary?: string
    keyTakeaways?: unknown[] | string
    /** asset URLs (already uploaded to S3 elsewhere) */
    coverImage?: string
    pdfUrl?: string
    sourceUrl?: string
    /** per-slide gallery rows (independent of inline body images) */
    slides?: unknown
    isPublished?: boolean
}

export async function POST(req: Request) {
    const authError = requireIngestAuth(req)
    if (authError) return authError

    let body: CreatePayload
    try {
        body = (await req.json()) as CreatePayload
    } catch {
        return NextResponse.json({ error: 'Body must be JSON.' }, { status: 400 })
    }

    if (!body.title || typeof body.title !== 'string') {
        return NextResponse.json(
            { error: 'Field `title` is required.' },
            { status: 400 },
        )
    }
    if (!body.conference || typeof body.conference !== 'string') {
        return NextResponse.json(
            { error: 'Field `conference` is required (e.g. "ATTD2026").' },
            { status: 400 },
        )
    }

    const conferenceMap = KNOWN_CONFERENCES[body.conference]
    if (!conferenceMap) {
        return NextResponse.json(
            {
                error: `Unknown conference '${body.conference}'. Known: ${Object.keys(KNOWN_CONFERENCES).join(', ')}.`,
            },
            { status: 400 },
        )
    }

    // Validate trackId / sessionId for ATTD2026 (only conference with structured agenda for now)
    if (body.conference === 'ATTD2026') {
        if (body.trackId && !getTrackById(body.trackId)) {
            return NextResponse.json(
                { error: `Unknown trackId '${body.trackId}' for ATTD2026.` },
                { status: 400 },
            )
        }
        if (body.sessionId) {
            const session = getSessionById(body.sessionId)
            if (!session) {
                return NextResponse.json(
                    { error: `Unknown sessionId '${body.sessionId}' for ATTD2026.` },
                    { status: 400 },
                )
            }
            if (body.trackId && body.trackId !== session.trackId) {
                return NextResponse.json(
                    {
                        error: `trackId '${body.trackId}' does not match session '${body.sessionId}' which belongs to track '${session.trackId}'.`,
                    },
                    { status: 400 },
                )
            }
            // If trackId not provided, infer from session
            if (!body.trackId) body.trackId = session.trackId
        }
    }

    // Pre-validate slides BEFORE creating the lecture row so a malformed
    // payload doesn't leave an orphaned half-created lecture.
    let slidesInput: ReturnType<typeof validateSlides> | undefined
    if (body.slides !== undefined) {
        try {
            slidesInput = validateSlides(body.slides)
        } catch (err) {
            const msg = err instanceof SlidesValidationError ? err.message : 'Invalid slides.'
            return NextResponse.json({ error: msg }, { status: 400 })
        }
    }

    const tags = Array.isArray(body.tags) ? body.tags.filter(Boolean) : []
    const finalTags = body.sessionId
        ? [body.sessionId, ...tags.filter((t) => t !== body.sessionId)]
        : tags

    const publishDate = body.publishDate
        ? new Date(body.publishDate)
        : body.sessionId
            ? new Date(
                `${getSessionById(body.sessionId)!.date}T${getSessionById(body.sessionId)!.startTime}:00`,
            )
            : new Date()

    // Parse keyTakeaways before the transaction so a malformed string
    // doesn't waste a roundtrip.
    let parsedTakeaways: unknown[] | undefined
    if (body.summary || body.keyTakeaways) {
        parsedTakeaways = []
        if (Array.isArray(body.keyTakeaways)) {
            parsedTakeaways = body.keyTakeaways
        } else if (typeof body.keyTakeaways === 'string') {
            try {
                parsedTakeaways = JSON.parse(body.keyTakeaways)
            } catch {
                parsedTakeaways = body.keyTakeaways
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean)
            }
        }
    }

    // All writes go in one transaction so a failure anywhere — slides
    // insert, transcript insert, summary insert — rolls back the lecture
    // row too. Avoids orphan lectures with silently missing slides.
    let lectureRow: typeof lectures.$inferSelect
    let slidesInserted = 0
    try {
        lectureRow = await db.transaction(async (tx) => {
            const [created] = await tx
                .insert(lectures)
                .values({
                    title: body.title,
                    sourceUrl: body.sourceUrl || null,
                    provider: body.provider || 'Ingest API',
                    category: conferenceMap.category,
                    subcategory: body.trackId || null,
                    tags: finalTags,
                    coverImage: body.coverImage || null,
                    pdfUrl: body.pdfUrl || null,
                    status: 'completed',
                    isPublished:
                        body.isPublished === undefined ? true : Boolean(body.isPublished),
                    publishDate,
                })
                .returning()

            if (slidesInput && slidesInput.length > 0) {
                slidesInserted = await replaceSlides(created.id, slidesInput, tx)
            }

            if (body.transcript) {
                await tx.insert(transcripts).values({
                    lectureId: created.id,
                    content: body.transcript,
                    segments: [],
                })
            }

            if (parsedTakeaways !== undefined) {
                await tx.insert(summaries).values({
                    lectureId: created.id,
                    executiveSummary: null,
                    keyTakeaways: parsedTakeaways,
                    fullMarkdownContent: body.summary || null,
                    tags: [conferenceMap.category],
                })
            }

            return created
        })
    } catch (err: unknown) {
        console.error('Ingest create lecture transaction failed:', err)
        const msg = err instanceof Error ? err.message : 'Failed to create lecture.'
        return NextResponse.json({ error: msg }, { status: 500 })
    }

    return NextResponse.json({
        id: lectureRow.id,
        url: `${SITE_URL}/lectures/${lectureRow.id}`,
        conference: body.conference,
        trackId: body.trackId || null,
        sessionId: body.sessionId || null,
        title: lectureRow.title,
        publishDate: lectureRow.publishDate,
        slidesInserted,
        ingestedAt: new Date().toISOString(),
        agendaUrl:
            body.conference === 'ATTD2026'
                ? `${SITE_URL}/attd-2026#session-${body.sessionId ?? ''}`
                : null,
        meta: body.conference === 'ATTD2026' ? ATTD_2026_META : null,
    })
}

export async function GET(req: Request) {
    const authError = requireIngestAuth(req)
    if (authError) return authError

    const { searchParams } = new URL(req.url)
    const conference = searchParams.get('conference')
    const trackId = searchParams.get('trackId')
    const sessionId = searchParams.get('sessionId')

    const conditions = []
    if (conference) {
        const m = KNOWN_CONFERENCES[conference]
        if (!m) {
            return NextResponse.json(
                { error: `Unknown conference '${conference}'.` },
                { status: 400 },
            )
        }
        conditions.push(eq(lectures.category, m.category))
    }
    if (trackId) conditions.push(eq(lectures.subcategory, trackId))

    let rows = await db
        .select()
        .from(lectures)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(desc(lectures.publishDate))

    if (sessionId) {
        rows = rows.filter((r) => Array.isArray(r.tags) && r.tags[0] === sessionId)
    }

    return NextResponse.json({
        count: rows.length,
        items: rows.map((r) => ({
            id: r.id,
            title: r.title,
            conference: conference,
            trackId: r.subcategory,
            sessionId: Array.isArray(r.tags) ? r.tags[0] : null,
            tags: r.tags,
            publishDate: r.publishDate,
            url: `${SITE_URL}/lectures/${r.id}`,
            isPublished: r.isPublished,
        })),
    })
}
