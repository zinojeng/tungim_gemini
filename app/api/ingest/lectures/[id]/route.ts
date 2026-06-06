import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireIngestAuth } from '@/lib/ingest-auth'
import {
    replaceSlides,
    SlidesValidationError,
    validateSlides,
} from '@/lib/ingest-slides'
import { getSessionById, getTrackById } from '@/lib/attd2026-agenda'
import { ADA_2026_THEMES } from '@/lib/ada2026-themes'

const ADA_2026_THEME_IDS = new Set(ADA_2026_THEMES.map((t) => t.id))

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
    /** Replace ALL slides for this lecture. Pass [] to clear. Omit to leave unchanged. */
    slides?: unknown
    isPublished?: boolean
}

/**
 * Token-gated update endpoint for the ingest path. Idempotent re-runs from
 * the batch script land here when an existing lecture matches by clientRef.
 * Only updates fields explicitly provided.
 *
 * Validation is conference-aware (driven by the existing row's `category`):
 *   - ATTD2026: trackId/sessionId validated against the structured agenda;
 *     tags[0] MUST equal sessionId when present (rejects, never reorders).
 *   - ADA2026:  trackId validated against the 6-theme allowlist; sessionId
 *     is meaningless here so tags[0] carries no special semantics.
 *   - Other categories: no trackId/tag validation.
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

    // Branch validation by the existing row's conference category. ADA 2026
    // has no sessionIds — its tags[0] is typically "clientRef:..." or
    // "archiveGroup:...", neither of which should ever be interpreted as a
    // sessionId. ATTD 2026 keeps its strict tags[0]==sessionId invariant.
    if (existing.category === 'ATTD2026') {
        // Determine which session this row is or will be pinned to. Used by
        // BOTH (a) the trackId cross-check and (b) the tags[0] invariant
        // check so that updating `trackId` alone or `tags` alone can't
        // silently move a session-pinned lecture out of its track.
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
    } else if (existing.category === 'ADA2026') {
        if (body.trackId && !ADA_2026_THEME_IDS.has(body.trackId)) {
            return NextResponse.json(
                {
                    error: `Unknown trackId '${body.trackId}' for ADA2026. Valid themes: ${[...ADA_2026_THEME_IDS].join(', ')}.`,
                },
                { status: 400 },
            )
        }
        // ADA has no sessionId / tags[0] invariant. body.sessionId is
        // accepted but stored only by mirroring into tags if the caller
        // also passes tags — we do not auto-prepend it.
    }
    // Other categories: no trackId/tag validation.

    // Pre-validate slides BEFORE any DB writes so a malformed payload
    // doesn't leave the row in a partially-mutated state.
    let slidesInput: ReturnType<typeof validateSlides> | undefined
    if (body.slides !== undefined) {
        try {
            slidesInput = validateSlides(body.slides)
        } catch (err) {
            const msg = err instanceof SlidesValidationError ? err.message : 'Invalid slides.'
            return NextResponse.json({ error: msg }, { status: 400 })
        }
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

    // All mutations go in one transaction so a failure (e.g. slide INSERT
    // hits a constraint) rolls back the lecture/transcript/summary updates
    // too. Without this, replaceSlides' DELETE could permanently destroy
    // the gallery while the rest of the response says "updated".
    let slidesReplaced: number | undefined
    try {
        await db.transaction(async (tx) => {
            if (Object.keys(lectureUpdate).length > 0) {
                await tx.update(lectures).set(lectureUpdate).where(eq(lectures.id, id))
            }

            if (body.transcript !== undefined) {
                const [existingTranscript] = await tx
                    .select()
                    .from(transcripts)
                    .where(eq(transcripts.lectureId, id))
                if (existingTranscript) {
                    await tx
                        .update(transcripts)
                        .set({ content: body.transcript })
                        .where(eq(transcripts.lectureId, id))
                } else if (body.transcript) {
                    await tx.insert(transcripts).values({
                        lectureId: id,
                        content: body.transcript,
                        segments: [],
                    })
                }
            }

            if (body.summary !== undefined || body.keyTakeaways !== undefined) {
                const [existingSummary] = await tx
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
                        await tx
                            .update(summaries)
                            .set(summaryUpdate)
                            .where(eq(summaries.lectureId, id))
                    }
                } else {
                    await tx.insert(summaries).values({
                        lectureId: id,
                        executiveSummary: null,
                        fullMarkdownContent: body.summary ?? null,
                        keyTakeaways: body.keyTakeaways ?? [],
                        tags: [existing.category ?? 'General'],
                    })
                }
            }

            if (slidesInput !== undefined) {
                // PUT semantics: replace ALL slides (consistent with
                // /admin's existing PUT). Empty array clears the gallery.
                slidesReplaced = await replaceSlides(id, slidesInput, tx)
            }
        })
    } catch (err: unknown) {
        console.error('Ingest update lecture transaction failed:', err)
        const msg = err instanceof Error ? err.message : 'Update failed.'
        return NextResponse.json({ error: msg }, { status: 500 })
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
            ...(slidesReplaced !== undefined ? [`slides (${slidesReplaced})`] : []),
        ],
        // Slide gallery state after this call:
        //   - field omitted from response  → request did not touch slides
        //     (`slides` was omitted from the body — gallery unchanged)
        //   - 0                            → gallery cleared (`slides: []`)
        //   - N (>0)                       → gallery REPLACED with N rows
        // The number is the count actually persisted, after slide-row
        // validation rejected any malformed entries.
        slidesReplaced: slidesReplaced ?? null,
    })
}
