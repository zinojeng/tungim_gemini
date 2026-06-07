// Regression guard for the ADA 2026 agenda grouping.
//
// Run: npx tsx scripts/check-ada-agenda.ts
//
// Asserts the date → session → talk hierarchy actually forms: talks that
// share a recording (archiveGroup tag OR a /player/ sourceUrl) must collapse
// into ONE multi-talk session — not N flat solos. The player/4948 "Pathway
// to Stop Diabetes" recording is the canonical case the UI must show as a
// single session card with 8 talk rows.

import { buildAgenda, type AgendaInputLecture } from '@/lib/ada2026-agenda'

let failures = 0
function check(name: string, cond: boolean, detail = '') {
    if (cond) {
        console.log(`  ✓ ${name}`)
    } else {
        failures++
        console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`)
    }
}

const PLAYER_4948 = 'https://events.diabetes.org/live/player/4948' // in RECORDING_OVERRIDES
const PLAYER_SYNTH = 'https://events.diabetes.org/live/player/9001' // not overridden — tests derived title
const PORTAL = 'https://events.diabetes.org/live/32/page/330'

function part(i: number, title: string, sourceUrl: string, extraTags: string[] = []): AgendaInputLecture {
    // 10:30 CDT + i*5min on conference day 1 (2026-06-05).
    const minute = 30 + i * 5
    const publishDate = `2026-06-05T${String(15).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`
    return {
        id: `lec-${title.replace(/\W+/g, '-').toLowerCase()}`,
        title,
        subcategory: 'prevention',
        sourceUrl,
        tags: ['ADA 2026', 'Prevention', 'Pathway to Stop Diabetes', ...extraTags],
        publishDate,
        slideCount: 0,
        pdfUrl: null,
        keyTakeaways: [`takeaway for ${title}`],
    }
}

// 8 talks sharing one recording, NO archiveGroup tag — the exact production
// shape today (grouping must fall back to sourceUrl). Uses a synthetic player
// URL that is NOT in RECORDING_OVERRIDES, so the session title exercises the
// derived-from-shared-tag path.
const pathway: AgendaInputLecture[] = [
    'Welcome to the 2026 ADA Scientific Sessions!',
    'Introduction',
    'Keynote Address: The Future of Diabetes',
    'Fireside Chat',
    "Introduction to 'Pathway to Stop Diabetes' Symposium",
    'Can we Stop Diabetes Before it Begins?',
    'When We Eat Matters',
    'Optimizing Diet for Global Diabetes Prevention',
].map((t, i) => part(i, t, PLAYER_SYNTH))

// A genuine solo: unique recording URL, only one talk.
const solo: AgendaInputLecture = {
    id: 'lec-solo',
    title: 'A standalone talk',
    subcategory: 'complications',
    sourceUrl: 'https://events.diabetes.org/live/player/9999',
    tags: ['ADA 2026', 'Complications'],
    publishDate: '2026-06-06T18:00:00.000Z',
    slideCount: 3,
    pdfUrl: null,
    keyTakeaways: [],
}

// Two unrelated talks that both point at the PORTAL landing page (not a
// recording). They must NOT merge into one session.
const portalA: AgendaInputLecture = { ...solo, id: 'lec-portalA', title: 'Portal A', sourceUrl: PORTAL }
const portalB: AgendaInputLecture = { ...solo, id: 'lec-portalB', title: 'Portal B', sourceUrl: PORTAL }

// Two parts at player/4948 — exercises the RECORDING_OVERRIDES official-name path.
const overridePair: AgendaInputLecture[] = [
    part(0, 'Welcome', PLAYER_4948),
    part(1, 'Keynote', PLAYER_4948),
]

const sessions = buildAgenda([...pathway, ...overridePair, solo, portalA, portalB])

console.log('ADA agenda grouping checks:')

const multi = sessions.filter((s) => s.talks.length > 1)
check('at least one multi-talk session exists', multi.length >= 1)

const recording = sessions.find((s) => s.id === 'rec:player-9001')
check('shared recording forms one session', Boolean(recording))
check('recording session has 8 talks', recording?.talks.length === 8, `got ${recording?.talks.length}`)
check(
    'recording talks are time-ordered',
    Boolean(
        recording &&
            recording.talks.every(
                (t, i) =>
                    i === 0 ||
                    !t.startTime ||
                    !recording.talks[i - 1].startTime ||
                    Date.parse(recording.talks[i - 1].startTime!) <= Date.parse(t.startTime!),
            ),
    ),
)
check(
    'derived session title skips generic tags',
    recording?.title === 'Pathway to Stop Diabetes',
    `got "${recording?.title}"`,
)

const overridden = sessions.find((s) => s.id === 'rec:player-4948')
check(
    'RECORDING_OVERRIDES supplies the official session name',
    overridden?.title ===
        "Welcome to the 2026 ADA Scientific Sessions: Keynote Address by Jay Bhattacharya, MD, PhD & 'Pathway to Stop Diabetes' Symposium",
    `got "${overridden?.title}"`,
)
check('overridden session carries the official room', overridden?.room === 'Hall F (Level 1)', `got "${overridden?.room}"`)
check(
    'unique-recording talk stays solo',
    Boolean(sessions.find((s) => s.isSolo && s.talks[0]?.lectureId === 'lec-solo')),
)
check(
    'portal landing page does NOT merge unrelated talks',
    sessions.filter((s) => s.talks.some((t) => ['lec-portalA', 'lec-portalB'].includes(t.lectureId))).length === 2,
)

if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`)
    process.exit(1)
}
console.log('\nAll agenda grouping checks passed.')
