import { NextResponse } from 'next/server'
import {
    ATTD_2026_DAYS,
    ATTD_2026_META,
    ATTD_2026_SESSIONS,
    ATTD_2026_TRACKS,
} from '@/lib/attd2026-agenda'
import { ADA_2026_META, ADA_2026_THEMES } from '@/lib/ada2026-themes'

export const dynamic = 'force-static'

const SUPPORTED = ['ATTD2026', 'ADA2026'] as const
type SupportedConference = (typeof SUPPORTED)[number]

/**
 * Public agenda / theme metadata for supported conferences.
 * Read-only, unauthenticated — useful for AI agents to look up the right
 * `trackId` (and `sessionId`, where applicable) before posting content.
 *
 * GET /api/ingest/agenda?conference=ATTD2026
 *   → { conference, meta, days, tracks: [...], sessions: [...] }
 *
 * GET /api/ingest/agenda?conference=ADA2026
 *   → { conference, meta, days: [], tracks: [...themes], sessions: [] }
 *     ADA 2026 is a curated archive page — no published session timetable.
 *     `tracks` carries the 6 official ADA themes; valid `trackId` values
 *     for ingest are taken verbatim from `tracks[*].id`. `days` and
 *     `sessions` are returned as empty arrays so consumers can share one
 *     code path across both conferences.
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const conference = (searchParams.get('conference') ?? 'ATTD2026') as SupportedConference

    if (!SUPPORTED.includes(conference)) {
        return NextResponse.json(
            { error: `Unknown conference '${conference}'. Supported: ${SUPPORTED.join(', ')}.` },
            { status: 404 },
        )
    }

    if (conference === 'ADA2026') {
        return NextResponse.json({
            conference,
            meta: ADA_2026_META,
            days: [],
            tracks: ADA_2026_THEMES.map(({ id, name, shortName, description }) => ({
                id,
                name,
                shortName,
                description,
                // No `featured` flag on ADA themes — they're all surfaced equally.
                featured: true,
            })),
            sessions: [],
        })
    }

    return NextResponse.json({
        conference,
        meta: ATTD_2026_META,
        days: ATTD_2026_DAYS,
        tracks: ATTD_2026_TRACKS.map(({ id, name, shortName, description, featured }) => ({
            id,
            name,
            shortName,
            description,
            featured,
        })),
        sessions: ATTD_2026_SESSIONS,
    })
}
