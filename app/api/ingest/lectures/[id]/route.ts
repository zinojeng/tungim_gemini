import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireIngestAuth } from '@/lib/ingest-auth'
import { getSessionById, getTrackById } from '@/lib/attd2026-agenda'

export const dynamic = 'force-dynamic'

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://mednote.zeabur.app'

interface UpdatePayload {
    title?: string
    trackId?: string | null
    sessionId?: string
    publishDate?: string
    tags?: string[]
    provider?: string
    transcript?: string
    summary?: string
    keyTakeaways?: string[]
    coverImage?: string | null
    pdfUrl?: string | null
    sourceUrl?: string | null
    isPublished?: boolean
}

/**
 * Token-gated update endpoint for the ingest path. Idempotent re-runs from
 * the batch script land here when an existing lecture matches by clientRef.
 * Only updates fields explicitly provided.
 *
 * Tag invariant: if tags are provided AND sessionId is present (either in
 * the body or in the existing row), tags[0] MUST equal sessionId. The
 * endpoint rejects payloads that violate this — never silently reorder.
 */
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const authError = requireIngestAuth(req)
    if (authError) return authError

    const { id } = await params

    let body: UpdatePayload
    try {
        body = (await req.json()) as UpdatePayload
    } catch {
        return NextResponse.json({ error: 'Body must be JSON.' }, { status: 400 })
    }

    const [existing] = await db
        .select()
        .from(lectures)
        .where(eq(lectures.id, id))
    if (!existing) {
        return NextResponse.json({ error: 'Lecture not found.' }, { status: 404 })
    }

    // Determine which session this row is or will be pinned to. Used by
    // BOTH (a) the trackId cross-check and (b) the tags[0] invariant check
    // so that updating `trackId` alone or `tags` alone can't silently move
    // a session-pinned lecture out of its track.
    const expectedSessionId =
        body.sessionId ??
        (Array.isArray(existing.tags) ? existing.tags[0] : undefined)

    if (expectedSessionId) {
        const session = getSessionById(expectedSessionId)
        if (!session) {
            return NextResponse.json(
                { error: `Unknown sessionId '${expectedSessionId}'.` },
                { status: 400 },
            )
        }
        if (body.trackId && body.trackId !== session.trackId) {
            return NextResponse.json(
                {
                    error: `trackId '${body.trackId}' does not match session '${expectedSessionId}' which belongs to track '${session.trackId}'.`,
                },
                { status: 400 },
            )
        }
    }
    if (body.trackId && !getTrackById(body.trackId)) {
        return NextResponse.json(
            { error: `Unknown trackId '${body.trackId}'.` },
            { status: 400 },
        )
    }

    if (body.tags && expectedSessionId && body.tags[0] !== expectedSessionId) {
        return NextResponse.json(
            {
                error: `Tag invariant violation: tags[0] must equal sessionId '${expectedSessionId}'. Got '${body.tags[0]}'.`,
            },
            { status: 400 },
        )
    }

    const lectureUpdate: Record<string, unknown> = {}
    if (body.title !== undefined) lectureUpdate.title = body.title
    if (body.trackId !== undefined) lectureUpdate.subcategory = body.trackId
    if (body.tags !== undefined) lectureUpdate.tags = body.tags
    if (body.provider !== undefined) lectureUpdate.provider = body.provider
    if (body.coverImage !== undefined) lectureUpdate.coverImage = body.coverImage
    if (body.pdfUrl !== undefined) lectureUpdate.pdfUrl = body.pdfUrl
    if (body.sourceUrl !== undefined) lectureUpdate.sourceUrl = body.sourceUrl
    if (body.isPublished !== undefined) lectureUpdate.isPublished = body.isPublished
    if (body.publishDate !== undefined) lectureUpdate.publishDate = new Date(body.publishDate)

    if (Object.keys(lectureUpdate).length > 0) {
        try {
            await db.update(lectures).set(lectureUpdate).where(eq(lectures.id, id))
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Update failed.'
            return NextResponse.json({ error: msg }, { status: 500 })
        }
    }

    if (body.transcript !== undefined) {
        const [existingTranscript] = await db
            .select()
            .from(transcripts)
            .where(eq(transcripts.lectureId, id))
        if (existingTranscript) {
            await db
                .update(transcripts)
                .set({ content: body.transcript })
                .where(eq(transcripts.lectureId, id))
        } else if (body.transcript) {
            await db.insert(transcripts).values({
                lectureId: id,
                content: body.transcript,
                segments: [],
            })
        }
    }

    if (body.summary !== undefined || body.keyTakeaways !== undefined) {
        const [existingSummary] = await db
            .select()
            .from(summaries)
            .where(eq(summaries.lectureId, id))
        if (existingSummary) {
            const summaryUpdate: Record<string, unknown> = {}
            if (body.summary !== undefined)
                summaryUpdate.fullMarkdownContent = body.summary
            if (body.keyTakeaways !== undefined)
                summaryUpdate.keyTakeaways = body.keyTakeaways
            if (Object.keys(summaryUpdate).length > 0) {
                await db
                    .update(summaries)
                    .set(summaryUpdate)
                    .where(eq(summaries.lectureId, id))
            }
        } else {
            await db.insert(summaries).values({
                lectureId: id,
                executiveSummary: null,
                fullMarkdownContent: body.summary ?? null,
                keyTakeaways: body.keyTakeaways ?? [],
                tags: [existing.category ?? 'General'],
            })
        }
    }

    return NextResponse.json({
        id,
        url: `${SITE_URL}/lectures/${id}`,
        updated: true,
        updatedFields: [
            ...Object.keys(lectureUpdate),
            ...(body.transcript !== undefined ? ['transcript'] : []),
            ...(body.summary !== undefined ? ['summary'] : []),
            ...(body.keyTakeaways !== undefined ? ['keyTakeaways'] : []),
        ],
    })
}
