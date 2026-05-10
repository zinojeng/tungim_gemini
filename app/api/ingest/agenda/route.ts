import { NextResponse } from 'next/server'
import {
    ATTD_2026_DAYS,
    ATTD_2026_META,
    ATTD_2026_SESSIONS,
    ATTD_2026_TRACKS,
} from '@/lib/attd2026-agenda'

export const dynamic = 'force-static'

/**
 * Public agenda metadata for ATTD 2026.
 * Read-only, unauthenticated — useful for AI agents to look up the right
 * trackId / sessionId before posting content.
 *
 * GET /api/ingest/agenda?conference=ATTD2026
 *   → { meta, days, tracks: [...], sessions: [...] }
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const conference = searchParams.get('conference') ?? 'ATTD2026'

    if (conference !== 'ATTD2026') {
        return NextResponse.json(
            { error: `Unknown conference '${conference}'. Supported: ATTD2026.` },
            { status: 404 },
        )
    }

    return NextResponse.json({
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
