#!/usr/bin/env tsx
/**
 * scripts/ingest-attd-gemini.ts
 *
 * Batch-ingest Gemini-AI-Studio markdown + slide images into ATTD 2026.
 *
 * Pipeline:
 *   1. Walk --input for *.md files.
 *   2. Parse YAML frontmatter (string scalars + string arrays only).
 *   3. Validate sessionId / trackId via GET /api/ingest/agenda.
 *   4. For files missing sessionId, run 3-signal fuzzy match.
 *   5. Rewrite inline markdown images: upload local files, swap paths.
 *   6. Pick cover (frontmatter > first inline > slideDir > /api/generate-cover).
 *   7. Compute clientRef = sha256(sessionId + normalized title).
 *      GET /api/ingest/lectures?sessionId=… and PUT if same clientRef
 *      already exists, else POST.
 *   8. Auto-augment tags: [sessionId, day:Dn, room:…, track:…, clientRef:…, …user].
 *   9. Write attd_ingest_manifest.jsonl + IMPORT_REPORT.md.
 *
 * CLI:
 *   --input <dir>          (required) directory of markdown files
 *   --slides-root <dir>    base dir for relative slideDir / inline images
 *   --base-url <url>       default https://mednote.zeabur.app
 *   --token <token>        or read from env INGEST_API_TOKEN
 *   --dry-run              produce manifest only, no uploads
 *   --limit <n>            process only first N files
 *   --force                ignore confidence < 0.7 threshold
 *   --manifest <file>      use a reviewed manifest instead of recomputing
 *   --output <dir>         where to write manifest + report (default: cwd)
 *   --verbose              chatty logging
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { isAbsolute, join, dirname, relative, resolve, extname, basename, sep } from 'node:path'
import { createHash } from 'node:crypto'
import {
    ATTD_2026_DAYS,
    ATTD_2026_SESSIONS,
    ATTD_2026_TRACKS,
    type AttdSession,
} from '../lib/attd2026-agenda'

// ── CLI parsing ─────────────────────────────────────────────────────────────

interface Args {
    input?: string
    slidesRoot?: string
    baseUrl: string
    token?: string
    dryRun: boolean
    force: boolean
    limit?: number
    manifest?: string
    output: string
    verbose: boolean
}

function parseArgs(argv: string[]): Args {
    const args: Args = {
        baseUrl: 'https://mednote.zeabur.app',
        dryRun: false,
        force: false,
        output: process.cwd(),
        verbose: false,
        token: process.env.INGEST_API_TOKEN,
    }
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        const next = () => argv[++i]
        switch (a) {
            case '--input': args.input = next(); break
            case '--slides-root': args.slidesRoot = next(); break
            case '--base-url': args.baseUrl = next().replace(/\/$/, ''); break
            case '--token': args.token = next(); break
            case '--dry-run': args.dryRun = true; break
            case '--force': args.force = true; break
            case '--limit': args.limit = Number(next()); break
            case '--manifest': args.manifest = next(); break
            case '--output': args.output = resolve(next()); break
            case '--verbose': args.verbose = true; break
            case '-h':
            case '--help':
                printHelp(); process.exit(0)
            default:
                if (a.startsWith('--')) die(`Unknown flag '${a}'.`)
        }
    }
    return args
}

function printHelp() {
    console.log(`
Usage: tsx scripts/ingest-attd-gemini.ts --input <dir> [options]

Required:
  --input <dir>         Directory of markdown files (recursive).

Options:
  --slides-root <dir>   Base for relative slideDir / inline images.
  --base-url <url>      Default: https://mednote.zeabur.app
  --token <token>       Or set env INGEST_API_TOKEN
  --dry-run             Produce manifest only, no uploads.
  --limit <n>           Process only first N files.
  --force               Upload even when confidence < 0.7.
  --manifest <file>     Use a reviewed manifest instead of recomputing.
                        File overrides re-fuzzy: matchedSession is trusted.
  --output <dir>        Where to write manifest + report (default: cwd).
  --verbose             Chatty logging.
`)
}

function die(msg: string): never {
    console.error(`✗ ${msg}`)
    process.exit(1)
}

// ── Tiny YAML frontmatter parser ────────────────────────────────────────────
// Supports: scalar strings (quoted or bare), bare numbers/bools, and inline
// string arrays "[a, b, c]" or block "- item" lists. Enough for our header.

interface Frontmatter {
    raw: Record<string, unknown>
    body: string
}

function parseFrontmatter(content: string): Frontmatter {
    if (!content.startsWith('---')) return { raw: {}, body: content }
    const end = content.indexOf('\n---', 3)
    if (end === -1) return { raw: {}, body: content }
    const header = content.slice(3, end).trim()
    const body = content.slice(end + 4).replace(/^\r?\n/, '')
    const raw: Record<string, unknown> = {}

    const lines = header.split(/\r?\n/)
    let i = 0
    while (i < lines.length) {
        const line = lines[i]
        const m = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/.exec(line)
        if (!m) { i++; continue }
        const key = m[1]
        const value: string = m[2]?.trim() ?? ''
        if (value === '' || value === '|' || value === '>') {
            // Block list ahead?
            const items: string[] = []
            i++
            while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*-\s+/, '').trim().replace(/^["']|["']$/g, ''))
                i++
            }
            raw[key] = items
            continue
        }
        if (value.startsWith('[') && value.endsWith(']')) {
            const inner = value.slice(1, -1).trim()
            raw[key] = inner ? inner.split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')) : []
        } else if (/^["'].*["']$/.test(value)) {
            raw[key] = value.slice(1, -1)
        } else if (value === 'true' || value === 'false') {
            raw[key] = value === 'true'
        } else if (/^-?\d+(\.\d+)?$/.test(value)) {
            raw[key] = Number(value)
        } else {
            raw[key] = value
        }
        i++
    }
    return { raw, body }
}

function fmString(fm: Record<string, unknown>, key: string): string | undefined {
    const v = fm[key]
    return typeof v === 'string' && v.length > 0 ? v : undefined
}
function fmStringArray(fm: Record<string, unknown>, key: string): string[] {
    const v = fm[key]
    if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string')
    return []
}

// ── Fuzzy matching (3 signals) ──────────────────────────────────────────────

function normalize(s: string): string {
    return s
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function tokenJaccard(a: string, b: string): number {
    const ta = new Set(normalize(a).split(' ').filter((t) => t.length > 2))
    const tb = new Set(normalize(b).split(' ').filter((t) => t.length > 2))
    if (ta.size === 0 || tb.size === 0) return 0
    let inter = 0
    for (const t of ta) if (tb.has(t)) inter++
    return inter / (ta.size + tb.size - inter)
}

function dateHintFromFilename(name: string): string | undefined {
    const m = /(2026[-_]?03[-_]?(11|12|13|14))|(\bD[1-4]\b)/i.exec(name)
    if (!m) return undefined
    if (m[3]) {
        const d = ATTD_2026_DAYS.find((x) => x.key.toLowerCase() === m[3].toLowerCase())
        return d?.date
    }
    const dd = m[2]
    return dd ? `2026-03-${dd}` : undefined
}

interface MatchResult {
    sessionId: string
    trackId: string
    confidence: number
    reasons: string[]
}

function fuzzyMatch(opts: {
    title?: string
    speaker?: string
    filename: string
}): MatchResult | null {
    const { title, speaker, filename } = opts
    const dateHint = dateHintFromFilename(filename)

    let best: MatchResult | null = null
    for (const s of ATTD_2026_SESSIONS) {
        const reasons: string[] = []
        let score = 0

        if (title) {
            const j = tokenJaccard(title, s.title)
            if (j > 0) {
                score += j * 0.5
                if (j > 0.4) reasons.push(`title~"${s.title.slice(0, 40)}…" (j=${j.toFixed(2)})`)
            }
        }
        if (speaker && s.description?.toLowerCase().includes(speaker.toLowerCase())) {
            score += 0.3
            reasons.push(`speaker hit: ${speaker}`)
        }
        if (dateHint && s.date === dateHint) {
            score += 0.2
            reasons.push(`date matches ${dateHint}`)
        }
        if (score === 0) continue
        if (!best || score > best.confidence) {
            best = { sessionId: s.id, trackId: s.trackId, confidence: Math.min(1, score), reasons }
        }
    }
    return best
}

// ── File walking ────────────────────────────────────────────────────────────

// Files written by previous runs of this very script — skip on recursive walk
// so re-running with `--output` pointed at the input dir doesn't ingest them.
const SCRIPT_OUTPUT_BASENAMES = new Set(['IMPORT_REPORT.md', 'attd_ingest_manifest.jsonl'])

async function walkMarkdown(dir: string): Promise<string[]> {
    const out: string[] = []
    async function walk(d: string) {
        const entries = await readdir(d, { withFileTypes: true })
        for (const e of entries) {
            if (SCRIPT_OUTPUT_BASENAMES.has(e.name)) continue
            const p = join(d, e.name)
            if (e.isDirectory()) await walk(p)
            else if (e.isFile() && /\.mdx?$/i.test(e.name)) out.push(p)
        }
    }
    await walk(dir)
    return out.sort()
}

// ── HTTP helpers ────────────────────────────────────────────────────────────

interface IngestClient {
    baseUrl: string
    token: string
    verbose: boolean
}

async function getAgenda(c: IngestClient) {
    const r = await fetch(`${c.baseUrl}/api/ingest/agenda?conference=ATTD2026`)
    if (!r.ok) throw new Error(`GET agenda failed: ${r.status} ${await r.text()}`)
    return r.json()
}

async function listExisting(c: IngestClient, sessionId: string) {
    const r = await fetch(
        `${c.baseUrl}/api/ingest/lectures?conference=ATTD2026&sessionId=${encodeURIComponent(sessionId)}`,
        { headers: { Authorization: `Bearer ${c.token}` } },
    )
    if (!r.ok) throw new Error(`GET lectures failed: ${r.status} ${await r.text()}`)
    return r.json() as Promise<{
        count: number
        items: { id: string; tags: string[] | null; title: string }[]
    }>
}

async function uploadFile(c: IngestClient, filePath: string): Promise<string> {
    const buf = await readFile(filePath)
    const filename = basename(filePath)
    const contentType = mimeFromExt(extname(filename))
    const r = await fetch(`${c.baseUrl}/api/ingest/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${c.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filename,
            contentType,
            base64: buf.toString('base64'),
        }),
    })
    if (!r.ok) throw new Error(`Upload ${filename} failed: ${r.status} ${await r.text()}`)
    const json = (await r.json()) as { urls: string[] }
    if (!json.urls?.[0]) throw new Error(`Upload ${filename}: no URL returned`)
    return json.urls[0]
}

function mimeFromExt(ext: string): string {
    const e = ext.toLowerCase().replace(/^\./, '')
    if (e === 'png') return 'image/png'
    if (e === 'jpg' || e === 'jpeg') return 'image/jpeg'
    if (e === 'gif') return 'image/gif'
    if (e === 'webp') return 'image/webp'
    if (e === 'svg') return 'image/svg+xml'
    if (e === 'pdf') return 'application/pdf'
    return 'application/octet-stream'
}

async function postLecture(c: IngestClient, payload: any) {
    const r = await fetch(`${c.baseUrl}/api/ingest/lectures`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${c.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (!r.ok) throw new Error(`POST lecture failed: ${r.status} ${await r.text()}`)
    return r.json()
}

async function putLecture(c: IngestClient, id: string, payload: any) {
    const r = await fetch(`${c.baseUrl}/api/ingest/lectures/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${c.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (!r.ok) throw new Error(`PUT lecture failed: ${r.status} ${await r.text()}`)
    return r.json()
}

// ── Path containment ────────────────────────────────────────────────────────

/**
 * Resolve `relPath` against `root` and verify the result stays inside `root`.
 * Returns the absolute path on success, or null when:
 *   - relPath is absolute (frontmatter `cover: /etc/passwd` is rejected)
 *   - the resolved path escapes `root` (e.g. `../../.env`)
 *
 * The script runs locally so blast radius is the operator's own filesystem,
 * but accidentally uploading sensitive files to a public S3 bucket is bad
 * enough to fail closed.
 */
function safeResolve(root: string, relPath: string): string | null {
    if (isAbsolute(relPath)) return null
    const absRoot = resolve(root)
    const absPath = resolve(absRoot, relPath)
    const rel = relative(absRoot, absPath)
    if (rel === '' || rel.startsWith('..') || isAbsolute(rel) || rel.split(sep)[0] === '..') {
        return null
    }
    return absPath
}

/**
 * Try to find `relPath` within any of the allowed roots, in order.
 * Each root is checked with `safeResolve` so traversal escapes are rejected
 * even when the caller passes multiple candidates.
 */
function findInAllowedRoots(relPath: string, roots: (string | undefined)[]): string | null {
    for (const root of roots) {
        if (!root) continue
        const abs = safeResolve(root, relPath)
        if (abs && existsSync(abs)) return abs
    }
    return null
}

// ── Inline image rewrite ────────────────────────────────────────────────────

async function rewriteInlineImages(opts: {
    markdown: string
    mdDir: string
    slidesRoot?: string
    client: IngestClient
    dryRun: boolean
    cache: Map<string, string>
}): Promise<{ rewritten: string; uploaded: number; firstInlineLocalPath?: string; errors: string[] }> {
    const { markdown, mdDir, slidesRoot, client, dryRun, cache } = opts
    const errors: string[] = []
    let firstInlineLocalPath: string | undefined

    // Replacement spans collected during the first pass, applied in reverse
    // order so earlier indices stay valid. Avoids `split/join` which would
    // also rewrite identical substrings appearing as plain text elsewhere.
    interface ReplaceSpan { start: number; end: number; replacement: string }
    const spans: ReplaceSpan[] = []

    const re = /(!\[[^\]]*\]\()([^)\s]+)(\))/g
    let uploaded = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(markdown))) {
        const url = m[2]
        if (/^https?:\/\//i.test(url) || /^data:/.test(url)) continue
        const abs = findInAllowedRoots(url, [mdDir, slidesRoot])
        if (!abs) {
            // Either the path escapes the allowed roots, or the file simply
            // does not exist. We log both as "not found" — the operator's
            // recourse is the same in either case.
            errors.push(`inline image not found or outside allowed roots: ${url}`)
            continue
        }
        if (!firstInlineLocalPath) firstInlineLocalPath = abs

        let publicUrl = cache.get(abs)
        if (!publicUrl) {
            if (dryRun) {
                publicUrl = `dry-run://${abs}`
            } else {
                try {
                    publicUrl = await uploadFile(client, abs)
                    uploaded++
                } catch (err) {
                    errors.push(`${url}: ${(err as Error).message}`)
                    continue
                }
            }
            cache.set(abs, publicUrl)
        }

        // Replace ONLY this exact `(url)` span. The first capture group
        // `m[1]` is the literal `![alt](`, so its length is exactly the
        // offset from `m.index` to the start of the URL. Going via
        // `indexOf('(', m.index)` would catch a `(` inside alt text such
        // as `![foo (bar)](img.png)` and corrupt the rewrite.
        const urlStart = m.index + m[1].length
        const urlEnd = urlStart + url.length
        spans.push({
            start: urlStart,
            end: urlEnd,
            replacement: publicUrl,
        })
    }

    let rewritten = markdown
    for (const s of spans.sort((a, b) => b.start - a.start)) {
        rewritten = rewritten.slice(0, s.start) + s.replacement + rewritten.slice(s.end)
    }

    return { rewritten, uploaded, firstInlineLocalPath, errors }
}

// ── Cover selection ─────────────────────────────────────────────────────────

async function pickCoverImage(opts: {
    fm: Record<string, unknown>
    mdDir: string
    slidesRoot?: string
    firstInlineLocalPath?: string
    client: IngestClient
    dryRun: boolean
    cache: Map<string, string>
}): Promise<string | null> {
    const { fm, mdDir, slidesRoot, firstInlineLocalPath, client, dryRun, cache } = opts

    const cover = fmString(fm, 'cover')
    const slideDir = fmString(fm, 'slideDir')

    let chosen: string | undefined
    if (cover) {
        // Try cover relative to: md file dir, mdDir+slideDir, then slidesRoot.
        // safeResolve rejects absolute frontmatter paths and `..` traversal.
        const fromMd = safeResolve(mdDir, cover)
        const fromSlideDir = slideDir
            ? (() => {
                const resolvedSlideDir = safeResolve(mdDir, slideDir)
                return resolvedSlideDir ? safeResolve(resolvedSlideDir, cover) : null
            })()
            : null
        const fromSlidesRoot = slidesRoot ? safeResolve(slidesRoot, cover) : null
        chosen = [fromMd, fromSlideDir, fromSlidesRoot]
            .filter((p): p is string => p !== null)
            .find((p) => existsSync(p))
    }
    if (!chosen && firstInlineLocalPath) chosen = firstInlineLocalPath
    if (!chosen && slideDir) {
        const dirCandidates = [
            safeResolve(mdDir, slideDir),
            slidesRoot ? safeResolve(slidesRoot, slideDir) : null,
        ].filter((p): p is string => p !== null)
        for (const d of dirCandidates) {
            if (!existsSync(d)) continue
            try {
                const entries = await readdir(d)
                const img = entries
                    .filter((n) => /\.(png|jpe?g|webp|gif)$/i.test(n))
                    .sort()[0]
                if (img) { chosen = join(d, img); break }
            } catch { /* ignore */ }
        }
    }
    if (!chosen) return null
    if (dryRun) return `dry-run://${chosen}`
    const cached = cache.get(chosen)
    if (cached) return cached
    const url = await uploadFile(client, chosen)
    cache.set(chosen, url)
    return url
}

// ── Slide gallery scan ──────────────────────────────────────────────────────

interface SlideGalleryItem {
    imageUrl: string
}

const GALLERY_IMAGE_RE = /\.(png|jpe?g|webp|gif)$/i

/**
 * Walk a frontmatter `slideDir` and collect every image as a slide gallery
 * row. Each file is uploaded via /api/ingest/upload (or stubbed in dry-run)
 * and the resulting public URLs are returned in filename-sorted order — the
 * lecture detail page sorts on imageUrl basename, so insertion order does
 * not matter for display, but we keep it deterministic for testability.
 *
 * Returns null when no slideDir is declared. Otherwise returns
 *   { slides, scanned, uploaded, errors }
 * where `scanned` is the count of image files actually present on disk
 * and `slides.length` may be lower if some uploads failed.
 */
async function scanSlideGallery(opts: {
    fm: Record<string, unknown>
    mdDir: string
    slidesRoot?: string
    client: IngestClient
    dryRun: boolean
    cache: Map<string, string>
}): Promise<{ slides: SlideGalleryItem[]; scanned: number; uploaded: number; errors: string[] } | null> {
    const slideDir = fmString(opts.fm, 'slideDir')
    if (!slideDir) return null

    const dirCandidates = [
        safeResolve(opts.mdDir, slideDir),
        opts.slidesRoot ? safeResolve(opts.slidesRoot, slideDir) : null,
    ].filter((p): p is string => p !== null)

    const errors: string[] = []
    let chosenDir: string | undefined
    for (const d of dirCandidates) {
        if (existsSync(d)) { chosenDir = d; break }
    }
    if (!chosenDir) {
        errors.push(`slideDir '${slideDir}' not found in any allowed root.`)
        return { slides: [], scanned: 0, uploaded: 0, errors }
    }

    let entries: string[]
    try {
        entries = await readdir(chosenDir)
    } catch (err) {
        errors.push(`slideDir '${slideDir}' could not be read: ${(err as Error).message}`)
        return { slides: [], scanned: 0, uploaded: 0, errors }
    }

    const imageFiles = entries
        .filter((n) => GALLERY_IMAGE_RE.test(n))
        .sort()

    const slides: SlideGalleryItem[] = []
    let uploaded = 0
    for (const filename of imageFiles) {
        const abs = join(chosenDir, filename)
        let url = opts.cache.get(abs)
        if (!url) {
            if (opts.dryRun) {
                url = `dry-run://${abs}`
            } else {
                try {
                    url = await uploadFile(opts.client, abs)
                    uploaded++
                } catch (err) {
                    errors.push(`gallery slide ${filename}: ${(err as Error).message}`)
                    continue
                }
            }
            opts.cache.set(abs, url)
        }
        slides.push({ imageUrl: url })
    }
    // `scanned` is the count of image files actually present on disk.
    // `slides.length` excludes upload failures, so reporting `scanned`
    // separately keeps the manifest honest about the source-of-truth size.
    return { slides, scanned: imageFiles.length, uploaded, errors }
}

// ── Augment tags + clientRef ────────────────────────────────────────────────

function computeClientRef(sessionId: string, title: string): string {
    return createHash('sha256')
        .update(`${sessionId}|${normalize(title)}`)
        .digest('hex')
        .slice(0, 16)
}

function buildTags(opts: {
    sessionId: string
    session: AttdSession | undefined
    userTags: string[]
    clientRef: string
}): string[] {
    const { sessionId, session, userTags, clientRef } = opts
    const dayKey = session ? ATTD_2026_DAYS.find((d) => d.date === session.date)?.key : undefined
    const tags = [
        sessionId,
        ...(dayKey ? [`day:${dayKey}`] : []),
        ...(session ? [`room:${session.room}`, `track:${session.trackId}`] : []),
        `clientRef:${clientRef}`,
        ...userTags.filter((t) => t && t !== sessionId && !t.startsWith('clientRef:')),
    ]
    // Dedupe but keep tags[0] = sessionId
    const seen = new Set<string>()
    const out: string[] = []
    for (const t of tags) {
        if (seen.has(t)) continue
        seen.add(t)
        out.push(t)
    }
    if (out[0] !== sessionId) out.unshift(sessionId)
    return out
}

// ── Manifest types ──────────────────────────────────────────────────────────

interface ManifestRow {
    file: string
    title: string
    speaker: string | null
    sessionId: string | null
    trackId: string | null
    confidence: number
    confidenceReasons: string[]
    slideDir: string | null
    cover: string | null
    coverUrl: string | null
    clientRef: string | null
    tags: string[]
    publishDate: string | null
    status:
    | 'pending'
    | 'low-confidence'
    | 'uploaded'
    | 'updated'
    | 'skipped'
    | 'failed'
    | 'dry-run'
    error: string | null
    /** non-fatal errors during inline image rewrite (path traversal, missing files) */
    imageErrors: string[]
    /** how many slide gallery images were found in slideDir */
    slidesScanned: number
    /** how many were actually uploaded this run (excludes cache hits and dry-run stubs) */
    slidesUploaded: number
    /** non-fatal errors from slide-gallery scan */
    slideErrors: string[]
    lectureId: string | null
    lectureUrl: string | null
}

// ── Per-file processing ─────────────────────────────────────────────────────

async function processFile(opts: {
    filePath: string
    args: Args
    client: IngestClient
    cache: Map<string, string>
    reviewedRow?: ManifestRow
}): Promise<ManifestRow> {
    const { filePath, args, client, cache, reviewedRow } = opts
    const relFile = relative(args.input ?? process.cwd(), filePath)
    const row: ManifestRow = {
        file: relFile,
        title: '',
        speaker: null,
        sessionId: null,
        trackId: null,
        confidence: 0,
        confidenceReasons: [],
        slideDir: null,
        cover: null,
        coverUrl: null,
        clientRef: null,
        tags: [],
        publishDate: null,
        status: 'pending',
        error: null,
        imageErrors: [],
        slidesScanned: 0,
        slidesUploaded: 0,
        slideErrors: [],
        lectureId: null,
        lectureUrl: null,
    }

    try {
        const raw = await readFile(filePath, 'utf-8')
        const { raw: fm, body } = parseFrontmatter(raw)

        const titleFromFm = fmString(fm, 'title')
        const titleFromHeading = body.match(/^\s*#\s+(.+)/m)?.[1]?.trim()
        row.title = titleFromFm ?? titleFromHeading ?? basename(filePath, extname(filePath))
        row.speaker = fmString(fm, 'speaker') ?? null
        row.slideDir = fmString(fm, 'slideDir') ?? null
        row.cover = fmString(fm, 'cover') ?? null

        // Determine sessionId / trackId — manifest > frontmatter > fuzzy
        let sessionId: string | undefined
        let trackId: string | undefined
        let confidence = 0
        let reasons: string[] = []

        if (reviewedRow?.sessionId) {
            sessionId = reviewedRow.sessionId
            trackId = reviewedRow.trackId ?? undefined
            confidence = 1.0
            reasons = ['from reviewed manifest']
        } else {
            const fmSession = fmString(fm, 'sessionId')
            const fmTrack = fmString(fm, 'trackId')
            if (fmSession) {
                sessionId = fmSession
                trackId = fmTrack
                confidence = 1.0
                reasons = ['from frontmatter']
            } else {
                const m = fuzzyMatch({ title: row.title, speaker: row.speaker ?? undefined, filename: basename(filePath) })
                if (m) {
                    sessionId = m.sessionId
                    trackId = m.trackId
                    confidence = m.confidence
                    reasons = m.reasons
                }
            }
        }

        if (!sessionId) {
            row.status = 'failed'
            row.error = 'No sessionId from frontmatter, manifest, or fuzzy match.'
            return row
        }

        const session = ATTD_2026_SESSIONS.find((s) => s.id === sessionId)
        if (!session) {
            row.status = 'failed'
            row.error = `Unknown sessionId '${sessionId}'.`
            return row
        }
        if (!trackId) trackId = session.trackId
        if (!ATTD_2026_TRACKS.find((t) => t.id === trackId)) {
            row.status = 'failed'
            row.error = `Unknown trackId '${trackId}'.`
            return row
        }

        row.sessionId = sessionId
        row.trackId = trackId
        row.confidence = confidence
        row.confidenceReasons = reasons
        row.publishDate = `${session.date}T${session.startTime}:00`

        if (confidence < 0.7 && !args.force && !reviewedRow) {
            row.status = 'low-confidence'
            row.error = `Confidence ${confidence.toFixed(2)} < 0.7. Review manually or pass --force.`
            return row
        }

        // Frontmatter `clientRef` wins. The author can lock it once and
        // then edit the markdown title freely without spawning duplicates.
        // Reviewed manifest entries also carry it forward.
        const clientRefFromFm = fmString(fm, 'clientRef')
        const clientRefFromManifest = reviewedRow?.clientRef ?? undefined
        const clientRef =
            clientRefFromFm ?? clientRefFromManifest ?? computeClientRef(sessionId, row.title)
        row.clientRef = clientRef

        const userTags = fmStringArray(fm, 'tags')
        row.tags = buildTags({ sessionId, session, userTags, clientRef })

        // Inline image rewrite
        const mdDir = dirname(filePath)
        const inline = await rewriteInlineImages({
            markdown: body,
            mdDir,
            slidesRoot: args.slidesRoot,
            client,
            dryRun: args.dryRun,
            cache,
        })
        const summary = inline.rewritten
        if (inline.errors.length) row.imageErrors = inline.errors

        // Cover image
        const coverUrl = await pickCoverImage({
            fm,
            mdDir,
            slidesRoot: args.slidesRoot,
            firstInlineLocalPath: inline.firstInlineLocalPath,
            client,
            dryRun: args.dryRun,
            cache,
        })
        row.coverUrl = coverUrl

        // Slide gallery — INDEPENDENT from the cover and from inline body
        // images. When frontmatter declares `slideDir`, every image in that
        // directory is uploaded and attached as a per-slide row. The cover
        // is allowed to overlap (it's just one of the slides).
        const gallery = await scanSlideGallery({
            fm,
            mdDir,
            slidesRoot: args.slidesRoot,
            client,
            dryRun: args.dryRun,
            cache,
        })
        if (gallery) {
            row.slidesScanned = gallery.scanned
            row.slidesUploaded = gallery.uploaded
            if (gallery.errors.length) row.slideErrors = gallery.errors
        }

        if (args.dryRun) {
            row.status = 'dry-run'
            return row
        }

        // Idempotency: GET existing for this sessionId, find by clientRef tag
        const existing = await listExisting(client, sessionId)
        const match = existing.items.find(
            (it) => Array.isArray(it.tags) && it.tags.includes(`clientRef:${clientRef}`),
        )

        const slidesPayload =
            gallery && gallery.slides.length > 0 ? gallery.slides : undefined

        const payload = {
            conference: 'ATTD2026' as const,
            title: row.title,
            sessionId,
            trackId,
            tags: row.tags,
            transcript: '',
            summary,
            keyTakeaways: fmStringArray(fm, 'keyTakeaways'),
            coverImage: coverUrl ?? undefined,
            sourceUrl: fmString(fm, 'sourceUrl') ?? undefined,
            provider: fmString(fm, 'provider') ?? 'Gemini AI Studio',
            isPublished: typeof fm.isPublished === 'boolean' ? (fm.isPublished as boolean) : true,
            publishDate: row.publishDate,
            slides: slidesPayload,
        }

        if (match) {
            const updated = (await putLecture(client, match.id, {
                title: row.title,
                trackId,
                sessionId,
                tags: row.tags,
                summary,
                keyTakeaways: payload.keyTakeaways,
                coverImage: coverUrl ?? undefined,
                provider: payload.provider,
                isPublished: payload.isPublished,
                publishDate: payload.publishDate,
                // PUT slides only when the script actually scanned a gallery.
                // Omitting the field leaves existing slides intact; passing
                // an empty array would clear them. Passing a populated array
                // replaces (consistent with the API's PUT semantics).
                slides: slidesPayload,
            })) as { id: string; url: string }
            row.lectureId = updated.id
            row.lectureUrl = updated.url
            row.status = 'updated'
        } else {
            const created = (await postLecture(client, payload)) as { id: string; url: string }
            row.lectureId = created.id
            row.lectureUrl = created.url
            row.status = 'uploaded'
        }
    } catch (err) {
        row.status = 'failed'
        row.error = (err as Error).message
    }
    return row
}

// ── Manifest I/O ────────────────────────────────────────────────────────────

async function readManifest(file: string): Promise<Map<string, ManifestRow>> {
    const txt = await readFile(file, 'utf-8')
    const map = new Map<string, ManifestRow>()
    for (const line of txt.split(/\r?\n/)) {
        if (!line.trim()) continue
        try {
            const row = JSON.parse(line) as ManifestRow
            map.set(row.file, row)
        } catch { /* skip malformed */ }
    }
    return map
}

async function writeManifest(file: string, rows: ManifestRow[]) {
    const lines = rows.map((r) => JSON.stringify(r))
    await writeFile(file, lines.join('\n') + '\n', 'utf-8')
}

async function writeReport(file: string, rows: ManifestRow[], args: Args) {
    const counts: Record<ManifestRow['status'], number> = {
        pending: 0,
        'low-confidence': 0,
        uploaded: 0,
        updated: 0,
        skipped: 0,
        failed: 0,
        'dry-run': 0,
    }
    for (const r of rows) counts[r.status]++

    const lowConf = rows.filter((r) => r.status === 'low-confidence')
    const failed = rows.filter((r) => r.status === 'failed')

    const lines: string[] = []
    lines.push(`# ATTD 2026 import — ${new Date().toISOString()}`)
    lines.push('')
    lines.push(`Mode: ${args.dryRun ? 'dry-run' : args.manifest ? 'from-manifest' : 'auto'}`)
    lines.push(`Input: \`${args.input}\``)
    lines.push(`Base URL: ${args.baseUrl}`)
    lines.push('')
    lines.push('## Summary')
    lines.push('')
    lines.push(`- ✓ Uploaded     : ${counts.uploaded}`)
    lines.push(`- ↻ Updated      : ${counts.updated}`)
    lines.push(`- ⏸ Low confidence: ${counts['low-confidence']}`)
    lines.push(`- ✗ Failed       : ${counts.failed}`)
    lines.push(`- · Dry-run      : ${counts['dry-run']}`)
    lines.push(`- · Total        : ${rows.length}`)
    lines.push('')
    if (lowConf.length) {
        lines.push('## Low-confidence (need manual review)')
        lines.push('')
        lines.push('Edit the manifest, set the correct `sessionId` / `trackId`, then re-run with `--manifest <file>`.')
        lines.push('')
        for (const r of lowConf) {
            lines.push(`- \`${r.file}\` — best guess **${r.sessionId ?? 'none'}** conf=${r.confidence.toFixed(2)} (${r.confidenceReasons.join('; ')})`)
        }
        lines.push('')
    }
    if (failed.length) {
        lines.push('## Failed')
        lines.push('')
        for (const r of failed) {
            lines.push(`- \`${r.file}\` — ${r.error}`)
        }
        lines.push('')
    }
    const withImgErrors = rows.filter((r) => r.imageErrors.length)
    if (withImgErrors.length) {
        lines.push('## Inline image issues (non-fatal)')
        lines.push('')
        lines.push('Path traversal attempts and missing files are recorded here. The lecture itself was still processed; only the offending images were dropped.')
        lines.push('')
        for (const r of withImgErrors) {
            lines.push(`- \`${r.file}\``)
            for (const e of r.imageErrors) lines.push(`  - ${e}`)
        }
        lines.push('')
    }
    const totalSlidesScanned = rows.reduce((s, r) => s + r.slidesScanned, 0)
    const totalSlidesUploaded = rows.reduce((s, r) => s + r.slidesUploaded, 0)
    const withSlideErrors = rows.filter((r) => r.slideErrors.length)
    if (totalSlidesScanned > 0 || withSlideErrors.length) {
        lines.push('## Slide gallery')
        lines.push('')
        lines.push(`- Scanned: **${totalSlidesScanned}**`)
        lines.push(`- Uploaded this run: **${totalSlidesUploaded}**${args.dryRun ? ' (dry-run — nothing pushed to S3)' : ''}`)
        lines.push('')
        if (withSlideErrors.length) {
            lines.push('Issues:')
            for (const r of withSlideErrors) {
                lines.push(`- \`${r.file}\``)
                for (const e of r.slideErrors) lines.push(`  - ${e}`)
            }
            lines.push('')
        }
    }
    lines.push('## All rows')
    lines.push('')
    lines.push('| status | sessionId | confidence | title | url |')
    lines.push('|---|---|---|---|---|')
    for (const r of rows) {
        const status = r.status
        const url = r.lectureUrl ? `[link](${r.lectureUrl})` : '—'
        lines.push(`| ${status} | ${r.sessionId ?? '—'} | ${r.confidence.toFixed(2)} | ${escapePipe(r.title)} | ${url} |`)
    }
    await writeFile(file, lines.join('\n') + '\n', 'utf-8')
}

function escapePipe(s: string): string {
    return s.replace(/\|/g, '\\|').slice(0, 80)
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const args = parseArgs(process.argv.slice(2))
    if (!args.input) die('Missing --input <dir>.')
    if (!existsSync(args.input)) die(`Input dir does not exist: ${args.input}`)

    const needsToken = !args.dryRun
    if (needsToken && !args.token) die('Missing token. Pass --token or set INGEST_API_TOKEN.')

    const client: IngestClient = {
        baseUrl: args.baseUrl,
        token: args.token ?? '',
        verbose: args.verbose,
    }

    // Live runs: ping the agenda endpoint to make sure the deploy is up.
    // Dry-run skips the network — the agenda is already imported statically.
    if (!args.dryRun) {
        try {
            const meta = await getAgenda(client)
            if (args.verbose)
                console.log(`✓ Agenda: ${meta.tracks.length} tracks, ${meta.sessions.length} sessions`)
        } catch (err) {
            die(`Cannot reach agenda endpoint: ${(err as Error).message}`)
        }
    } else if (args.verbose) {
        console.log(`✓ Agenda (static): ${ATTD_2026_TRACKS.length} tracks, ${ATTD_2026_SESSIONS.length} sessions`)
    }

    const reviewed = args.manifest ? await readManifest(args.manifest) : new Map()

    const inputAbs = resolve(args.input)
    let files = await walkMarkdown(inputAbs)
    if (args.limit) files = files.slice(0, args.limit)
    console.log(`Processing ${files.length} markdown file(s)…`)

    const cache = new Map<string, string>()
    const rows: ManifestRow[] = []
    for (const f of files) {
        const relFile = relative(inputAbs, f)
        const reviewedRow = reviewed.get(relFile)
        const row = await processFile({ filePath: f, args, client, cache, reviewedRow })
        rows.push(row)
        const tag = row.status.toUpperCase().padEnd(15)
        console.log(`[${tag}] ${row.file} → ${row.sessionId ?? '—'} (${row.confidence.toFixed(2)})${row.error ? ' — ' + row.error : ''}`)
    }

    const manifestPath = join(args.output, 'attd_ingest_manifest.jsonl')
    const reportPath = join(args.output, 'IMPORT_REPORT.md')
    await writeManifest(manifestPath, rows)
    await writeReport(reportPath, rows, args)
    console.log('')
    console.log(`Manifest: ${manifestPath}`)
    console.log(`Report  : ${reportPath}`)

    const failed = rows.filter((r) => r.status === 'failed').length
    process.exit(failed > 0 ? 2 : 0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
