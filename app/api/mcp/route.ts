import { NextResponse } from 'next/server'
import { requireIngestAuth } from '@/lib/ingest-auth'
import {
    ATTD_2026_DAYS,
    ATTD_2026_META,
    ATTD_2026_SESSIONS,
    ATTD_2026_TRACKS,
    getSessionById,
    getTrackById,
} from '@/lib/attd2026-agenda'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries } from '@/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {
    approxBase64DecodedBytes,
    assertUnderLimit,
    getMaxUploadBytes,
} from '@/lib/ingest-limits'
import {
    appendSlides,
    replaceSlides,
    validateSlides,
} from '@/lib/ingest-slides'

export const dynamic = 'force-dynamic'

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://mednote.zeabur.app'

const PROTOCOL_VERSION = '2025-06-18'
const SERVER_NAME = 'mednote-attd-mcp'
const SERVER_VERSION = '0.1.0'

// ── Helpers ─────────────────────────────────────────────────────────────────

type Args = Record<string, unknown>

function asString(v: unknown): string | undefined {
    return typeof v === 'string' && v.length > 0 ? v : undefined
}
function asStringArray(v: unknown): string[] {
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

interface ToolDef {
    name: string
    description: string
    inputSchema: unknown
    handler: (args: Args) => Promise<unknown>
}

// ── Tool definitions ────────────────────────────────────────────────────────
const TOOLS: ToolDef[] = [
    {
        name: 'attd_get_meta',
        description:
            'Get ATTD 2026 conference metadata: dates, host city, venue, official URLs.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        handler: async () => ATTD_2026_META,
    },
    {
        name: 'attd_list_tracks',
        description:
            'List all thematic tracks for ATTD 2026 (CGM, AID, AI, T1D, T2D, etc.). Use the returned track id when creating a lecture.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        handler: async () =>
            ATTD_2026_TRACKS.map(({ id, name, shortName, description, featured }) => ({
                id,
                name,
                shortName,
                description,
                featured,
            })),
    },
    {
        name: 'attd_list_sessions',
        description:
            'List sessions of ATTD 2026, optionally filtered by trackId or day. Use the returned session id when attaching a transcript.',
        inputSchema: {
            type: 'object',
            properties: {
                trackId: { type: 'string', description: 'Filter by track id (e.g. "cgm").' },
                day: {
                    type: 'string',
                    description: 'Filter by day key (D1/D2/D3/D4) or ISO date (YYYY-MM-DD).',
                },
                query: {
                    type: 'string',
                    description: 'Free-text search in session title or id.',
                },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const trackId = asString(args.trackId)
            const day = asString(args.day)
            const query = asString(args.query)
            let arr = ATTD_2026_SESSIONS.slice()
            if (trackId) arr = arr.filter((s) => s.trackId === trackId)
            if (day) {
                const dayMatch = ATTD_2026_DAYS.find(
                    (d) => d.key === day || d.date === day,
                )
                if (dayMatch) arr = arr.filter((s) => s.date === dayMatch.date)
            }
            if (query) {
                const q = query.toLowerCase()
                arr = arr.filter(
                    (s) =>
                        s.title.toLowerCase().includes(q) ||
                        s.id.toLowerCase().includes(q),
                )
            }
            return arr
        },
    },
    {
        name: 'attd_create_lecture',
        description:
            'Create a lecture (transcript + summary) attached to an ATTD 2026 session. Returns the public URL. Use this after running attd_list_sessions to find the right sessionId.',
        inputSchema: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string', description: 'Lecture title.' },
                sessionId: {
                    type: 'string',
                    description:
                        'Session id (e.g. "PS07"). If provided, trackId and publishDate are auto-inferred.',
                },
                trackId: {
                    type: 'string',
                    description: 'Track id. Optional if sessionId is given.',
                },
                transcript: { type: 'string', description: 'Full transcript text (markdown ok).' },
                summary: { type: 'string', description: 'Markdown summary.' },
                keyTakeaways: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional bullet-point key takeaways.',
                },
                tags: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Free-text tags.',
                },
                coverImage: { type: 'string', description: 'Public URL of a cover image.' },
                pdfUrl: { type: 'string', description: 'Public URL of a slide deck PDF.' },
                sourceUrl: { type: 'string', description: 'Original source link if any.' },
                provider: { type: 'string', description: 'Origin label (e.g. "Claude MCP").' },
                isPublished: { type: 'boolean', description: 'Default true.' },
                slides: {
                    type: 'array',
                    description:
                        'Per-slide gallery rows shown on the lecture detail page. INDEPENDENT from inline body images. Use attd_upload_file first to get a public URL for each slide image, then pass them here.',
                    items: {
                        type: 'object',
                        required: ['imageUrl'],
                        properties: {
                            imageUrl: { type: 'string' },
                            timestampSeconds: { type: 'number' },
                            ocrText: { type: 'string' },
                            aiSummary: { type: 'string' },
                        },
                        additionalProperties: false,
                    },
                },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const title = asString(args.title)
            if (!title) throw new Error('Field `title` is required.')

            // Pre-validate slides BEFORE creating the lecture so a malformed
            // payload doesn't leave an orphaned half-created row.
            const slidesInput =
                args.slides !== undefined ? validateSlides(args.slides) : undefined

            const sessionId = asString(args.sessionId)
            let trackId = asString(args.trackId)
            let inferredDate: Date | undefined
            if (sessionId) {
                const session = getSessionById(sessionId)
                if (!session) throw new Error(`Unknown sessionId '${sessionId}'.`)
                if (trackId && trackId !== session.trackId) {
                    throw new Error(
                        `trackId '${trackId}' does not match session '${sessionId}' which belongs to track '${session.trackId}'.`,
                    )
                }
                trackId = trackId ?? session.trackId
                inferredDate = new Date(`${session.date}T${session.startTime}:00`)
            }
            if (trackId && !getTrackById(trackId))
                throw new Error(`Unknown trackId '${trackId}'.`)

            const tags = asStringArray(args.tags)
            const finalTags = sessionId
                ? [sessionId, ...tags.filter((t) => t !== sessionId)]
                : tags

            const isPublished =
                typeof args.isPublished === 'boolean' ? args.isPublished : true

            const transcript = asString(args.transcript)
            const summary = asString(args.summary)
            const keyTakeaways = asStringArray(args.keyTakeaways)

            // One transaction across lecture + slides + transcript + summary
            // so a downstream INSERT failure rolls back the lecture too,
            // never leaving an orphan row that the LLM thinks succeeded.
            let slidesInserted = 0
            const row = await db.transaction(async (tx) => {
                const [created] = await tx
                    .insert(lectures)
                    .values({
                        title,
                        sourceUrl: asString(args.sourceUrl) ?? null,
                        provider: asString(args.provider) ?? 'Claude MCP',
                        category: 'ATTD2026',
                        subcategory: trackId ?? null,
                        tags: finalTags,
                        coverImage: asString(args.coverImage) ?? null,
                        pdfUrl: asString(args.pdfUrl) ?? null,
                        status: 'completed',
                        isPublished,
                        publishDate: inferredDate ?? new Date(),
                    })
                    .returning()

                if (slidesInput && slidesInput.length > 0) {
                    slidesInserted = await replaceSlides(created.id, slidesInput, tx)
                }

                if (transcript) {
                    await tx.insert(transcripts).values({
                        lectureId: created.id,
                        content: transcript,
                        segments: [],
                    })
                }

                if (summary || keyTakeaways.length) {
                    await tx.insert(summaries).values({
                        lectureId: created.id,
                        executiveSummary: null,
                        keyTakeaways,
                        fullMarkdownContent: summary ?? null,
                        tags: ['ATTD2026'],
                    })
                }

                return created
            })

            return {
                id: row.id,
                url: `${SITE_URL}/lectures/${row.id}`,
                sessionUrl: sessionId
                    ? `${SITE_URL}/attd-2026#session-${sessionId}`
                    : `${SITE_URL}/attd-2026`,
                title: row.title,
                trackId: row.subcategory,
                sessionId: sessionId ?? null,
                slidesInserted,
            }
        },
    },
    {
        name: 'attd_attach_slides_to_lecture',
        description:
            'Append slide gallery rows to an EXISTING lecture. Use after attd_create_lecture if more slides arrive later, or to incrementally extend the gallery. Does NOT replace existing slides — to replace, use the REST PUT /api/ingest/lectures/[id] endpoint with a full slides[] array.',
        inputSchema: {
            type: 'object',
            required: ['lectureId', 'slides'],
            properties: {
                lectureId: { type: 'string', description: 'UUID returned by attd_create_lecture.' },
                slides: {
                    type: 'array',
                    minItems: 1,
                    items: {
                        type: 'object',
                        required: ['imageUrl'],
                        properties: {
                            imageUrl: { type: 'string' },
                            timestampSeconds: { type: 'number' },
                            ocrText: { type: 'string' },
                            aiSummary: { type: 'string' },
                        },
                        additionalProperties: false,
                    },
                },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const lectureId = asString(args.lectureId)
            if (!lectureId) throw new Error('Field `lectureId` is required.')
            const items = validateSlides(args.slides)
            if (items.length === 0) throw new Error('At least one slide is required.')
            // Confirm the lecture exists before inserting orphan slide rows.
            const [row] = await db.select().from(lectures).where(eq(lectures.id, lectureId))
            if (!row) throw new Error(`Lecture '${lectureId}' not found.`)
            const inserted = await appendSlides(lectureId, items)
            return {
                lectureId,
                appended: inserted,
                url: `${SITE_URL}/lectures/${lectureId}`,
            }
        },
    },
    {
        name: 'attd_attach_url_to_session',
        description:
            'Attach an external URL (e.g. a slide deck or paper) to an ATTD 2026 session as a lightweight reference card. No transcript required.',
        inputSchema: {
            type: 'object',
            required: ['title', 'sessionId', 'sourceUrl'],
            properties: {
                title: { type: 'string' },
                sessionId: { type: 'string' },
                sourceUrl: { type: 'string', description: 'External URL to link to.' },
                coverImage: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const title = asString(args.title)
            const sessionId = asString(args.sessionId)
            const sourceUrl = asString(args.sourceUrl)
            if (!title || !sessionId || !sourceUrl)
                throw new Error('Fields `title`, `sessionId`, `sourceUrl` are required.')
            const session = getSessionById(sessionId)
            if (!session) throw new Error(`Unknown sessionId '${sessionId}'.`)
            const tags = asStringArray(args.tags)
            const inserted = await db
                .insert(lectures)
                .values({
                    title,
                    sourceUrl,
                    provider: 'Claude MCP (link)',
                    category: 'ATTD2026',
                    subcategory: session.trackId,
                    tags: [sessionId, ...tags.filter((t) => t !== sessionId)],
                    coverImage: asString(args.coverImage) ?? null,
                    status: 'completed',
                    isPublished: true,
                    publishDate: new Date(`${session.date}T${session.startTime}:00`),
                })
                .returning()
            return {
                id: inserted[0].id,
                url: `${SITE_URL}/lectures/${inserted[0].id}`,
                sessionUrl: `${SITE_URL}/attd-2026#session-${sessionId}`,
            }
        },
    },
    {
        name: 'attd_upload_file',
        description:
            'Upload a file (image, PDF) to S3 and get a public URL back. Pass the URL to attd_create_lecture as coverImage or pdfUrl. Use base64 encoding.',
        inputSchema: {
            type: 'object',
            required: ['filename', 'base64'],
            properties: {
                filename: { type: 'string' },
                contentType: { type: 'string', description: 'MIME type.' },
                base64: { type: 'string', description: 'Base64-encoded file bytes.' },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const filename = asString(args.filename)
            const base64 = asString(args.base64)
            if (!filename || !base64)
                throw new Error('Fields `filename` and `base64` are required.')
            assertUnderLimit(approxBase64DecodedBytes(base64), getMaxUploadBytes())
            const bucketName = process.env.S3_BUCKET_NAME
            if (!bucketName) throw new Error('S3_BUCKET_NAME is not configured.')
            const s3 = new S3Client({
                region: process.env.S3_REGION || 'auto',
                endpoint: process.env.S3_ENDPOINT,
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
                },
                forcePathStyle: true,
            })
            const safeName = filename.replace(/[^a-zA-Z0-9._-]+/g, '-')
            const key = `${Date.now()}-${safeName}`
            const buf = Buffer.from(base64, 'base64')
            await s3.send(
                new PutObjectCommand({
                    Bucket: bucketName,
                    Key: key,
                    Body: buf,
                    ContentType: asString(args.contentType) ?? 'application/octet-stream',
                }),
            )
            let publicUrl: string
            if (process.env.S3_PUBLIC_URL) {
                publicUrl = `${process.env.S3_PUBLIC_URL.replace(/\/$/, '')}/${key}`
            } else {
                const ep = process.env.S3_ENDPOINT?.replace(/\/$/, '') || ''
                publicUrl = `${ep}/${bucketName}/${key}`
            }
            return { url: publicUrl, key, bytes: buf.length }
        },
    },
    {
        name: 'attd_list_lectures',
        description:
            'List lectures already attached to ATTD 2026, optionally filtered by trackId or sessionId.',
        inputSchema: {
            type: 'object',
            properties: {
                trackId: { type: 'string' },
                sessionId: { type: 'string' },
            },
            additionalProperties: false,
        },
        handler: async (args) => {
            const trackId = asString(args.trackId)
            const sessionId = asString(args.sessionId)
            const conditions = [eq(lectures.category, 'ATTD2026')]
            if (trackId) conditions.push(eq(lectures.subcategory, trackId))
            let rows = await db
                .select()
                .from(lectures)
                .where(and(...conditions))
                .orderBy(desc(lectures.publishDate))
            if (sessionId) {
                rows = rows.filter(
                    (r) => Array.isArray(r.tags) && r.tags[0] === sessionId,
                )
            }
            return rows.map((r) => ({
                id: r.id,
                title: r.title,
                trackId: r.subcategory,
                sessionId: Array.isArray(r.tags) ? r.tags[0] : null,
                tags: r.tags,
                publishDate: r.publishDate,
                url: `${SITE_URL}/lectures/${r.id}`,
            }))
        },
    },
]

// ── JSON-RPC handler ────────────────────────────────────────────────────────

interface JsonRpcRequest {
    jsonrpc: '2.0'
    id?: number | string | null
    method: string
    params?: unknown
}

interface JsonRpcResponse {
    jsonrpc: '2.0'
    id: number | string | null
    result?: unknown
    error?: { code: number; message: string; data?: unknown }
}

async function handleRpc(req: JsonRpcRequest): Promise<JsonRpcResponse | null> {
    const id = req.id ?? null

    if (req.method.startsWith('notifications/')) return null

    try {
        switch (req.method) {
            case 'initialize':
                return {
                    jsonrpc: '2.0',
                    id,
                    result: {
                        protocolVersion: PROTOCOL_VERSION,
                        capabilities: { tools: { listChanged: false } },
                        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
                        instructions:
                            'ATTD 2026 conference companion. Use attd_list_tracks and attd_list_sessions to discover the agenda, then attd_create_lecture to attach a transcript/summary to a specific session. Use attd_upload_file for cover images or PDFs.',
                    },
                }

            case 'ping':
                return { jsonrpc: '2.0', id, result: {} }

            case 'tools/list':
                return {
                    jsonrpc: '2.0',
                    id,
                    result: {
                        tools: TOOLS.map((t) => ({
                            name: t.name,
                            description: t.description,
                            inputSchema: t.inputSchema,
                        })),
                    },
                }

            case 'tools/call': {
                const params = (req.params ?? {}) as { name?: string; arguments?: Args }
                const name = params.name
                const args = params.arguments ?? {}
                const tool = TOOLS.find((t) => t.name === name)
                if (!tool) {
                    // "Unknown tool" is a protocol error per the MCP spec —
                    // the method itself failed, not the tool execution.
                    return {
                        jsonrpc: '2.0',
                        id,
                        error: { code: -32601, message: `Unknown tool '${name}'.` },
                    }
                }
                // Tool execution errors are returned as a successful JSON-RPC
                // response with `isError: true` in the result, per
                // https://modelcontextprotocol.io/spec — they're domain
                // failures the LLM should see and react to, not transport
                // failures the client should retry.
                try {
                    const result = await tool.handler(args)
                    return {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                            structuredContent: result,
                            isError: false,
                        },
                    }
                } catch (err: unknown) {
                    const msg = err instanceof Error ? err.message : 'Tool execution failed.'
                    return {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            content: [{ type: 'text', text: `Error: ${msg}` }],
                            isError: true,
                        },
                    }
                }
            }

            default:
                return {
                    jsonrpc: '2.0',
                    id,
                    error: { code: -32601, message: `Method not found: ${req.method}` },
                }
        }
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Internal error'
        return {
            jsonrpc: '2.0',
            id,
            error: { code: -32000, message: msg },
        }
    }
}

export async function POST(req: Request) {
    const authError = requireIngestAuth(req)
    if (authError) return authError

    let body: JsonRpcRequest | JsonRpcRequest[]
    try {
        body = await req.json()
    } catch {
        return NextResponse.json(
            {
                jsonrpc: '2.0',
                id: null,
                error: { code: -32700, message: 'Parse error' },
            },
            { status: 400 },
        )
    }

    if (Array.isArray(body)) {
        const responses = (await Promise.all(body.map(handleRpc))).filter(
            (r): r is JsonRpcResponse => r !== null,
        )
        return NextResponse.json(responses, {
            headers: { 'mcp-protocol-version': PROTOCOL_VERSION },
        })
    }

    const resp = await handleRpc(body)
    if (resp === null) {
        return new NextResponse(null, {
            status: 202,
            headers: { 'mcp-protocol-version': PROTOCOL_VERSION },
        })
    }
    return NextResponse.json(resp, {
        headers: { 'mcp-protocol-version': PROTOCOL_VERSION },
    })
}

export async function GET() {
    return NextResponse.json({
        name: SERVER_NAME,
        version: SERVER_VERSION,
        protocolVersion: PROTOCOL_VERSION,
        transport: 'http',
        endpoint: '/api/mcp',
        auth: 'Bearer token (set INGEST_API_TOKEN on the server)',
        toolNames: TOOLS.map((t) => t.name),
        docs: '/docs/MCP-INGEST.md',
    })
}
