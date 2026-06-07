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

import { getTheme } from '@/lib/ada2026-themes'

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
    const chips = displayChips(l.tags)
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

/**
 * Reconstruct the ADA agenda from flat lecture rows.
 *
 * Sessions are sorted within their day by start time (then title); the
 * caller groups them under day headers using `session.dayKey`. Talks inside
 * a session are ordered by `part:NN`, falling back to start time.
 */
export function buildAgenda(lectures: AgendaInputLecture[]): AdaSession[] {
    const groups = new Map<string, AgendaInputLecture[]>()
    const solos: AgendaInputLecture[] = []

    for (const l of lectures) {
        const gid = tagValue(l.tags, 'archiveGroup:')
        if (gid) {
            const arr = groups.get(gid) ?? []
            arr.push(l)
            groups.set(gid, arr)
        } else {
            solos.push(l)
        }
    }

    const sessions: AdaSession[] = []

    for (const [gid, parts] of groups) {
        // A lone archiveGroup part is effectively a solo session.
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
        const talks = parts.map(buildTalk)
        const times = talks.map((t) => t.startTime).filter(Boolean) as string[]
        sessions.push({
            id: gid,
            title:
                parts.map((p) => tagValue(p.tags, 'archiveTitle:')).find(Boolean) ??
                'Archive recording',
            track: parts.map((p) => p.subcategory).find(Boolean) ?? null,
            chair: parts.map((p) => tagValue(p.tags, 'chair:')).find(Boolean) ?? null,
            room: parts.map((p) => tagValue(p.tags, 'room:')).find(Boolean) ?? null,
            sourceUrl: parts.find((p) => p.sourceUrl)?.sourceUrl ?? null,
            dayKey: parts.map(dayKeyOf).find(Boolean) ?? UNSCHEDULED_DAY,
            startTime: times.length ? times.reduce((a, b) => (Date.parse(a) <= Date.parse(b) ? a : b)) : null,
            endTime: times.length ? times.reduce((a, b) => (Date.parse(a) >= Date.parse(b) ? a : b)) : null,
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
