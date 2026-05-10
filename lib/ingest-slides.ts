/**
 * Shared validation + insert helpers for the per-slide gallery.
 *
 * The lecture detail page renders TWO independent image surfaces:
 *   1. inline body images — embedded in `summaries.fullMarkdownContent`
 *   2. slide gallery — one row per image in the `slides` table
 *
 * This module is the contract for surface (2) across both the REST ingest
 * path (POST/PUT /api/ingest/lectures*) and the MCP tools.
 */

import { db } from './db'
import { slides } from '@/db/schema'
import { eq } from 'drizzle-orm'

/**
 * Executor accepted by replace/append helpers — either the top-level `db`
 * handle or a transaction context from `db.transaction(async (tx) => ...)`.
 * Callers compose these helpers inside a larger transaction so that
 * lecture + slide writes commit atomically.
 */
export type DbExecutor =
    | typeof db
    | Parameters<Parameters<typeof db.transaction>[0]>[0]

export interface SlideInput {
    imageUrl: string
    timestampSeconds?: number
    ocrText?: string
    aiSummary?: string
}

/**
 * Hard cap on how many slides a single lecture can carry. Prevents
 * accidental bombs (e.g. an LLM looping a directory glob and producing
 * 10,000 entries). Generous enough for any real talk's slide deck.
 */
export const MAX_SLIDES_PER_LECTURE = 500

export class SlidesValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'SlidesValidationError'
    }
}

/**
 * Coerce arbitrary input into a clean SlideInput[] or throw.
 * Used at the boundary so downstream code can assume well-typed slides.
 */
export function validateSlides(input: unknown): SlideInput[] {
    if (!Array.isArray(input)) {
        throw new SlidesValidationError('`slides` must be an array.')
    }
    if (input.length > MAX_SLIDES_PER_LECTURE) {
        throw new SlidesValidationError(
            `slides[] length ${input.length} exceeds limit of ${MAX_SLIDES_PER_LECTURE}.`,
        )
    }
    return input.map((raw, i) => {
        if (typeof raw !== 'object' || raw === null) {
            throw new SlidesValidationError(`slides[${i}] must be an object.`)
        }
        const obj = raw as Record<string, unknown>
        const imageUrl = obj.imageUrl
        if (typeof imageUrl !== 'string' || imageUrl.length === 0) {
            throw new SlidesValidationError(
                `slides[${i}].imageUrl is required and must be a non-empty string.`,
            )
        }
        const timestampSeconds =
            typeof obj.timestampSeconds === 'number' && Number.isFinite(obj.timestampSeconds)
                ? obj.timestampSeconds
                : undefined
        const ocrText = typeof obj.ocrText === 'string' ? obj.ocrText : undefined
        const aiSummary = typeof obj.aiSummary === 'string' ? obj.aiSummary : undefined
        return { imageUrl, timestampSeconds, ocrText, aiSummary }
    })
}

/**
 * Replace ALL slides for a lecture. Used by POST (after lecture insert)
 * and PUT (replace semantics consistent with /admin's existing behaviour).
 *
 * Pass an empty array to clear; pass a non-empty array to swap.
 *
 * **Transactional contract.** This helper performs DELETE + INSERT in two
 * statements. Without a wrapping transaction, a failed INSERT permanently
 * destroys the existing slides — there is no rollback. Callers that
 * already mutate other rows in the same logical operation (lecture row,
 * transcript, summary) MUST pass a transaction `tx` so a failure rolls
 * the whole thing back. The `executor` parameter defaults to the
 * top-level `db` only for stand-alone admin tooling that has no other
 * mutations to compose with.
 */
export async function replaceSlides(
    lectureId: string,
    items: SlideInput[],
    executor: DbExecutor = db,
): Promise<number> {
    await executor.delete(slides).where(eq(slides.lectureId, lectureId))
    if (items.length === 0) return 0
    await executor.insert(slides).values(
        items.map((s) => ({
            lectureId,
            imageUrl: s.imageUrl,
            timestampSeconds: s.timestampSeconds ?? 0,
            ocrText: s.ocrText ?? null,
            aiSummary: s.aiSummary ?? null,
        })),
    )
    return items.length
}

/**
 * Append slides to a lecture without touching existing rows. Used by the
 * MCP `attd_attach_slides_to_lecture` tool when an agent wants to add
 * incrementally (e.g. uploading a second batch of slides found later).
 *
 * Single-statement, so safe outside a transaction; still accepts an
 * executor for callers that want to compose it with other writes.
 */
export async function appendSlides(
    lectureId: string,
    items: SlideInput[],
    executor: DbExecutor = db,
): Promise<number> {
    if (items.length === 0) return 0
    await executor.insert(slides).values(
        items.map((s) => ({
            lectureId,
            imageUrl: s.imageUrl,
            timestampSeconds: s.timestampSeconds ?? 0,
            ocrText: s.ocrText ?? null,
            aiSummary: s.aiSummary ?? null,
        })),
    )
    return items.length
}
