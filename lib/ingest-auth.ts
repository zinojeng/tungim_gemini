import { NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'node:crypto'

const TOKEN_ENV_KEYS = ['INGEST_API_TOKEN', 'MCP_INGEST_TOKEN'] as const

function getConfiguredToken(): string | null {
    for (const key of TOKEN_ENV_KEYS) {
        const v = process.env[key]
        if (v && v.trim()) return v.trim()
    }
    return null
}

/**
 * Verify the request carries a valid bearer token.
 * Returns null on success, or a NextResponse to short-circuit on failure.
 *
 * Token can be supplied via either:
 *   - `Authorization: Bearer <token>`
 *   - `X-Ingest-Token: <token>`     (convenience for tools that don't set Authorization)
 *
 * Configure the expected value by setting INGEST_API_TOKEN (preferred) or
 * MCP_INGEST_TOKEN. If no token is configured the endpoints reject all writes
 * — this is intentional, so a misconfigured deploy fails closed.
 */
export function requireIngestAuth(req: Request): NextResponse | null {
    const expected = getConfiguredToken()
    if (!expected) {
        return NextResponse.json(
            {
                error:
                    'Ingest API token is not configured on the server. Set INGEST_API_TOKEN.',
            },
            { status: 503 },
        )
    }

    const auth = req.headers.get('authorization') ?? ''
    const headerToken = req.headers.get('x-ingest-token') ?? ''
    const bearer = auth.toLowerCase().startsWith('bearer ')
        ? auth.slice(7).trim()
        : ''
    const provided = bearer || headerToken.trim()

    if (!provided) {
        return NextResponse.json(
            { error: 'Missing bearer token. Use Authorization: Bearer <token>.' },
            { status: 401 },
        )
    }

    if (!safeEqual(provided, expected)) {
        return NextResponse.json({ error: 'Invalid token.' }, { status: 401 })
    }

    return null
}

/**
 * Constant-time token comparison.
 *
 * `timingSafeEqual` requires equal-length buffers, otherwise it throws —
 * which itself would leak the length difference. Hashing both sides to
 * SHA-256 normalises them to the same 32 bytes before the compare, so the
 * timing of "wrong length" and "wrong contents" is identical.
 */
function safeEqual(a: string, b: string): boolean {
    const ha = createHash('sha256').update(a).digest()
    const hb = createHash('sha256').update(b).digest()
    return timingSafeEqual(ha, hb)
}
