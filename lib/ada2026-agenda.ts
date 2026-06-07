// ADA 2026 — Agenda model.
//
// The upload path is unchanged: one lecture row per talk, with grouping
// metadata carried in `tags` (see docs/UPLOADER-PROMPT-ADA2026.md). This
// module is a PURE, isomorphic transform that reconstructs an ADA-style
// agenda — date → session → talk — from those rows at read time. It is the
// single source of truth shared by the /ada2026 page (client) and the
// GET /api/ada2026/agenda endpoint (server).
//
// Grouping is driven by NON-PUBLIC structural metadata, never by the
// visible topic chips:
//   archiveGroup:<id>   → parentSessionId   (the session a talk belongs to)
//   archiveTitle:<text> → parent session title
//   part:<NN>           → agendaOrder within the session
//   speaker:<name>      → talk speaker
//   day:<Dn>            → conference day bucket
//   chair:<name>        → session chair (reserved; rarely present today)
//   room:<text>         → session room (reserved)
// Talks with no archiveGroup tag become their own single-talk session.

import { getTheme, ADA_2026_THEMES } from '@/lib/ada2026-themes'

/** Conference days — mirrors docs/UPLOADER-PROMPT-ADA2026.md §7. */
export const ADA_2026_DAYS: {
    key: string
    /** ISO date YYYY-MM-DD (conference-local, America/Chicago) */
    date: string
    label: string
    shortLabel: string
}[] = [
    { key: 'D1', date: '2026-06-05', label: 'Fri · 5 Jun', shortLabel: 'D1' },
    { key: 'D2', date: '2026-06-06', label: 'Sat · 6 Jun', shortLabel: 'D2' },
    { key: 'D3', date: '2026-06-07', label: 'Sun · 7 Jun', shortLabel: 'D3' },
    { key: 'D4', date: '2026-06-08', label: 'Mon · 8 Jun', shortLabel: 'D4' },
]

const DATE_TO_DAY = new Map(ADA_2026_DAYS.map((d) => [d.date, d.key]))

/** Bucket key used for talks whose day cannot be resolved. */
export const UNSCHEDULED_DAY = 'unscheduled'

/** Row shape this module consumes. JSON-safe (ISO strings), so the same
 *  transform runs in the browser and on the server. */
export interface AgendaInputLecture {
    id: string
    title: string
    /** lectures.subcategory — the ADA theme/track id */
    subcategory: string | null
    sourceUrl: string | null
    tags: string[] | null
    /** ISO datetime string, or null */
    publishDate: string | null
    /** number of gallery slides — drives the "Handouts" badge */
    slideCount?: number
    pdfUrl?: string | null
    /** summaries.keyTakeaways (jsonb) — used for a one-line talk preview */
    keyTakeaways?: unknown
}

export interface AdaTalk {
    lectureId: string
    title: string
    speaker: string | null
    /** lead topic — first topic chip, else the track short name */
    primaryTopic: string | null
    /** up to 3 additional topic chips */
    subtopics: string[]
    /** first key takeaway, trimmed for a preview line */
    keyTakeaway: string | null
    /** agendaOrder within the session (from part:NN), or null */
    part: number | null
    hasArchive: boolean
    hasHandouts: boolean
    /** ISO datetime or null */
    startTime: string | null
}

export interface AdaSession {
    /** archiveGroup id, or `solo:<lectureId>` for an ungrouped talk */
    id: string
    title: string
    /** ADA theme id (lectures.subcategory) */
    track: string | null
    chair: string | null
    room: string | null
    /** parent recording URL (group) or the talk's archive URL (solo) */
    sourceUrl: string | null
    /** D1..D4 or UNSCHEDULED_DAY */
    dayKey: string
    /** ISO datetime of the earliest talk with a usable time, or null */
    startTime: string | null
    /** ISO datetime of the latest talk with a usable time, or null */
    endTime: string | null
    talks: AdaTalk[]
    hasArchive: boolean
    /** any talk has slides/pdf */
    hasHandouts: boolean
    /** true when this is a single ungrouped talk (no archiveGroup) */
    isSolo: boolean
}

function tagValue(tags: string[] | null | undefined, prefix: string): string | null {
    if (!tags) return null
    const t = tags.find((x) => x.startsWith(prefix))
    return t ? t.slice(prefix.length) : null
}

const HIDDEN_TAG_PREFIXES = [
    'clientRef:',
    'archiveGroup:',
    'archiveTitle:',
    'track:',
    'part:',
    'speaker:',
    'day:',
    'chair:',
    'room:',
] as const

/** Promote `topic:foo` → `foo`, pass plain tags through, drop infra tags.
 *  Mirrors the card's chip logic so primaryTopic/subtopics stay consistent. */
function displayChips(tags: string[] | null | undefined): string[] {
    if (!tags) return []
    const out: string[] = []
    for (const t of tags) {
        if (HIDDEN_TAG_PREFIXES.some((p) => t.startsWith(p))) continue
        if (t.startsWith('topic:')) out.push(t.slice('topic:'.length))
        else if (!t.includes(':')) out.push(t)
    }
    return out
}

function firstTakeaway(value: unknown): string | null {
    if (value == null) return null
    let raw: unknown = value
    if (typeof raw === 'string') {
        const s = raw.trim()
        if (!s) return null
        // Sometimes stored as a JSON-encoded array string.
        if (s.startsWith('[')) {
            try {
                raw = JSON.parse(s)
            } catch {
                return s
            }
        } else {
            return s
        }
    }
    if (Array.isArray(raw)) {
        for (const item of raw) {
            if (typeof item === 'string' && item.trim()) return item.trim()
            if (item && typeof item === 'object') {
                const o = item as Record<string, unknown>
                const cand = o.text ?? o.takeaway ?? o.point ?? o.title
                if (typeof cand === 'string' && cand.trim()) return cand.trim()
            }
        }
        return null
    }
    return null
}

const CONFERENCE_START = Date.parse('2026-06-05T00:00:00-05:00')
const CONFERENCE_END = Date.parse('2026-06-09T00:00:00-05:00')

/** A publishDate is only treated as a real session time when it falls inside
 *  the conference window — otherwise it's almost certainly an upload
 *  timestamp and showing it as an agenda time would mislead. */
function conferenceTime(iso: string | null): string | null {
    if (!iso) return null
    const t = Date.parse(iso)
    if (Number.isNaN(t)) return null
    return t >= CONFERENCE_START && t < CONFERENCE_END ? iso : null
}

function dayKeyOf(l: AgendaInputLecture): string | null {
    const tag = tagValue(l.tags, 'day:')
    if (tag) {
        const norm = tag.toUpperCase()
        if (ADA_2026_DAYS.some((d) => d.key === norm)) return norm
    }
    const ct = conferenceTime(l.publishDate)
    if (ct) {
        // Derive the day key from the conference-local calendar date.
        const dateStr = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(ct))
        const key = DATE_TO_DAY.get(dateStr)
        if (key) return key
    }
    return null
}

function buildTalk(l: AgendaInputLecture): AdaTalk {
    // Drop generic conference/theme tokens ("ADA 2026", "Complications", …) so
    // the lead chip is a real topic (e.g. "oxidative stress", "DKD") rather
    // than the conference name. Falls back to the theme short name.
    const chips = displayChips(l.tags).filter((c) => !isGenericTitleTag(c))
    const theme = getTheme(l.subcategory)
    const primaryTopic = chips[0] ?? theme?.shortName ?? null
    const subtopics = chips.slice(1, 4)
    const partRaw = tagValue(l.tags, 'part:')
    const partNum = partRaw != null ? Number(partRaw) : NaN
    return {
        lectureId: l.id,
        title: l.title,
        speaker: tagValue(l.tags, 'speaker:'),
        primaryTopic,
        subtopics,
        keyTakeaway: firstTakeaway(l.keyTakeaways),
        part: Number.isFinite(partNum) ? partNum : null,
        hasArchive: Boolean(l.sourceUrl),
        hasHandouts: (l.slideCount ?? 0) > 0 || Boolean(l.pdfUrl),
        startTime: conferenceTime(l.publishDate),
    }
}

const PART_FALLBACK = Number.MAX_SAFE_INTEGER

/** A recording URL groups its parts into one session. The ADA on-demand
 *  portal uses `/live/player/<n>` (and sometimes `/recording/<n>`); the
 *  landing page `/live/32/page/330` is NOT a recording and must never become
 *  a group key, or unrelated solos would merge under it. */
function isRecordingUrl(url: string | null | undefined): boolean {
    return Boolean(url && /\/(player|recording)\//.test(url))
}

/**
 * The session a talk belongs to. Preference order:
 *   1. `archiveGroup:` tag  — explicit, structural (what the uploader sets)
 *   2. shared recording `sourceUrl` — structural fallback: every part of one
 *      ADA recording carries the same parent player URL, so talks that were
 *      uploaded without an archiveGroup tag still reconstruct into the right
 *      session. This is NOT a public topic tag — it's the recording identity.
 * Returns null for talks with neither signal (true solos).
 */
function sessionKey(l: AgendaInputLecture): { key: string; id: string } | null {
    const ag = tagValue(l.tags, 'archiveGroup:')
    if (ag) return { key: `ag:${ag}`, id: ag }
    if (isRecordingUrl(l.sourceUrl)) {
        const seg = l.sourceUrl!.replace(/\/+$/, '').split('/').slice(-2).join('-')
        return { key: `url:${l.sourceUrl}`, id: `rec:${seg}` }
    }
    return null
}

const GENERIC_TITLE_TAGS = new Set(['ada 2026', 'ada2026', 'ada', 'diabetes'])

function isGenericTitleTag(tag: string): boolean {
    const low = tag.toLowerCase()
    if (GENERIC_TITLE_TAGS.has(low)) return true
    return ADA_2026_THEMES.some(
        (th) => th.name.toLowerCase() === low || th.shortName.toLowerCase() === low,
    )
}

interface RecordingOverride {
    title: string
    room?: string
    /**
     * Official session block start/end (ISO, CDT = −05:00) from the program.
     * The session card shows this as the time range — the true session window,
     * not "first talk start → last talk start". Without these, the card shows
     * only the start time (we can't infer a real end from talk start times).
     */
    start?: string
    end?: string
    /**
     * Hours to shift every part's publishDate by, to correct a wrong upload
     * timestamp (applied for agenda display only — the lecture row is
     * untouched). Uniform across parts, so their order and spacing are
     * preserved. Remove once the source publishDate is fixed.
     */
    shiftHours?: number
}

function shiftIso(iso: string | null | undefined, hours: number): string | null {
    if (!iso) return null
    const t = Date.parse(iso)
    if (Number.isNaN(t)) return null
    return new Date(t + hours * 3_600_000).toISOString()
}

/**
 * Official ADA 2026 session names, keyed by the recording's parent player URL.
 * Source: the Scientific Sessions program (docs/SS26_Program_Digital_051326.pdf),
 * matched to each recording by day + time + topic.
 *
 * This is a TEMPORARY bridge so the page shows the official session name (and
 * room) before the uploader writes them into `archiveTitle:`. An `archiveTitle:`
 * tag, when present, still takes precedence — so once a recording is re-uploaded
 * with the official name, its entry here becomes dead and can be removed.
 *
 * Note: player/4738 (diabetic foot) is intentionally omitted — its content
 * matches the Fri "Beyond Conventional Care…Diabetic Foot Ulcer" oral session,
 * but the uploaded publishDate places it on Saturday, so the mapping is
 * unconfirmed. Add it here once verified.
 */
const RECORDING_OVERRIDES: Record<string, RecordingOverride> = {
    'https://events.diabetes.org/live/player/4948': {
        title:
            "Welcome to the 2026 ADA Scientific Sessions: Keynote Address by Jay Bhattacharya, MD, PhD & 'Pathway to Stop Diabetes' Symposium",
        room: 'Hall F (Level 1)',
        start: '2026-06-05T10:30:00-05:00',
        end: '2026-06-05T12:30:00-05:00',
    },
    'https://events.diabetes.org/live/player/4734': {
        title: 'Management of Diabetic Retinopathy—Clinical Perspective',
        room: 'Room 220 (Level 2)',
        start: '2026-06-05T12:45:00-05:00',
        end: '2026-06-05T13:45:00-05:00',
    },
    'https://events.diabetes.org/live/player/4728': {
        title: 'Top Research Abstracts: Mechanisms of Diabetic Kidney Disease',
        room: 'Hall E-2 (Level 1)',
        start: '2026-06-05T12:45:00-05:00',
        end: '2026-06-05T13:45:00-05:00',
    },
    // Diabetic-foot oral session. Content + program (the only foot-ulcer oral
    // session, and Saturday has no oral session at this hour) place it on
    // Friday 12:45 — but the upload stamped it Saturday 13:45Z, so shift −20h
    // back to Fri 17:45Z (= 12:45 CDT), matching its sibling 12:45 sessions.
    'https://events.diabetes.org/live/player/4738': {
        title: 'Beyond Conventional Care: Regenerative Medicine and Smart Dressings for Diabetic Foot Ulcer',
        room: 'Room 217 (Level 2)',
        start: '2026-06-05T12:45:00-05:00',
        end: '2026-06-05T13:45:00-05:00',
        shiftHours: -20,
    },
}

function recordingOverride(parts: AgendaInputLecture[]): RecordingOverride | undefined {
    for (const p of parts) {
        const key = p.sourceUrl?.replace(/\/+$/, '')
        if (key && RECORDING_OVERRIDES[key]) return RECORDING_OVERRIDES[key]
    }
    return undefined
}

/** When no archiveTitle tag exists, derive a session label from the most
 *  descriptive plain tag shared by ALL parts (e.g. "Pathway to Stop
 *  Diabetes"), skipping generic conference/theme tokens. Used for DISPLAY
 *  only — grouping is structural (see sessionKey). */
function derivedSessionTitle(parts: AgendaInputLecture[]): string | null {
    const lists = parts.map(
        (p) => new Set((p.tags ?? []).filter((t) => !t.includes(':'))),
    )
    if (lists.length === 0) return null
    let common = [...lists[0]]
    for (const s of lists.slice(1)) common = common.filter((t) => s.has(t))
    const specific = common.filter((t) => !isGenericTitleTag(t))
    specific.sort((a, b) => b.length - a.length)
    return specific[0] ?? null
}

/**
 * Reconstruct the ADA agenda from flat lecture rows — date → session → talk,
 * mirroring the on-demand portal's hierarchy (a session holds one or more
 * talks, not a flat list).
 *
 * Sessions are sorted within their day by start time (then title); the
 * caller groups them under day headers using `session.dayKey`. Talks inside
 * a session are ordered by `part:NN`, falling back to start time.
 */
export function buildAgenda(lectures: AgendaInputLecture[]): AdaSession[] {
    const groups = new Map<string, { id: string; parts: AgendaInputLecture[] }>()
    const solos: AgendaInputLecture[] = []

    for (const l of lectures) {
        const sk = sessionKey(l)
        if (sk) {
            const g = groups.get(sk.key) ?? { id: sk.id, parts: [] }
            g.parts.push(l)
            groups.set(sk.key, g)
        } else {
            solos.push(l)
        }
    }

    const sessions: AdaSession[] = []

    for (const { id, parts } of groups.values()) {
        // A session with a single part is just a solo — don't wrap one talk
        // in a multi-talk container.
        if (parts.length < 2) {
            sessions.push(makeSoloSession(parts[0]))
            continue
        }
        parts.sort((a, b) => {
            const pa = Number(tagValue(a.tags, 'part:') ?? NaN)
            const pb = Number(tagValue(b.tags, 'part:') ?? NaN)
            const na = Number.isFinite(pa) ? pa : PART_FALLBACK
            const nb = Number.isFinite(pb) ? pb : PART_FALLBACK
            if (na !== nb) return na - nb
            return startMs(a) - startMs(b)
        })
        const override = recordingOverride(parts)
        // Apply a publishDate correction (if any) before deriving talk times
        // and the day bucket, so a mis-stamped recording lands on the right day.
        const eff =
            override?.shiftHours != null
                ? parts.map((p) => ({ ...p, publishDate: shiftIso(p.publishDate, override.shiftHours!) }))
                : parts
        const talks = eff.map(buildTalk)
        const times = talks.map((t) => t.startTime).filter(Boolean) as string[]
        sessions.push({
            id,
            title:
                parts.map((p) => tagValue(p.tags, 'archiveTitle:')).find(Boolean) ??
                override?.title ??
                derivedSessionTitle(parts) ??
                'Archive recording',
            track: parts.map((p) => p.subcategory).find(Boolean) ?? null,
            chair: parts.map((p) => tagValue(p.tags, 'chair:')).find(Boolean) ?? null,
            room: parts.map((p) => tagValue(p.tags, 'room:')).find(Boolean) ?? override?.room ?? null,
            sourceUrl: parts.find((p) => p.sourceUrl)?.sourceUrl ?? null,
            dayKey: eff.map(dayKeyOf).find(Boolean) ?? UNSCHEDULED_DAY,
            // Prefer the official program window. Without it, fall back to the
            // earliest talk start for ordering, but leave endTime null — the
            // last talk's *start* is not the session end, so the card shows
            // just the start time rather than a misleading range.
            startTime: override?.start
                ? new Date(override.start).toISOString()
                : times.length
                    ? times.reduce((a, b) => (Date.parse(a) <= Date.parse(b) ? a : b))
                    : null,
            endTime: override?.end ? new Date(override.end).toISOString() : null,
            talks,
            hasArchive: talks.some((t) => t.hasArchive),
            hasHandouts: talks.some((t) => t.hasHandouts),
            isSolo: false,
        })
    }

    for (const l of solos) sessions.push(makeSoloSession(l))

    sessions.sort((a, b) => {
        const at = a.startTime ? Date.parse(a.startTime) : Number.MAX_SAFE_INTEGER
        const bt = b.startTime ? Date.parse(b.startTime) : Number.MAX_SAFE_INTEGER
        if (at !== bt) return at - bt
        return a.title.localeCompare(b.title)
    })

    return sessions
}

function makeSoloSession(l: AgendaInputLecture): AdaSession {
    const talk = buildTalk(l)
    return {
        id: `solo:${l.id}`,
        title: l.title,
        track: l.subcategory,
        chair: tagValue(l.tags, 'chair:'),
        room: tagValue(l.tags, 'room:'),
        sourceUrl: l.sourceUrl,
        dayKey: dayKeyOf(l) ?? UNSCHEDULED_DAY,
        startTime: talk.startTime,
        endTime: talk.startTime,
        talks: [talk],
        hasArchive: talk.hasArchive,
        hasHandouts: talk.hasHandouts,
        isSolo: true,
    }
}

function startMs(l: AgendaInputLecture): number {
    const ct = conferenceTime(l.publishDate)
    return ct ? Date.parse(ct) : Number.MAX_SAFE_INTEGER
}
