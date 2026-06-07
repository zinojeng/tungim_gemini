# ADA 2026 Agenda — remaining work (TODO)

Status as of 2026-06-07. The `/ada2026` page is now an **Agenda browser**
(date → session → talk), shipped and live. This doc tracks the follow-up items
left for the next pass. None are blocking; the MVP is considered passed.

## How it works today (so you have context)

- **Upload path is unchanged**: still one `lectures` row per talk. Grouping is
  reconstructed at read time — nothing about ingest changed.
- **Grouping** (`lib/ada2026-agenda.ts`, `buildAgenda`): a session is keyed by
  `archiveGroup:` tag when present, else by the shared recording `sourceUrl`
  (`/player/<n>`). The portal landing page `/live/32/page/330` is excluded so
  unrelated solos never merge. Talks order by `part:` then `startTime`.
- **Session names, rooms, and the time window** currently come from
  `RECORDING_OVERRIDES` in `lib/ada2026-agenda.ts` — a **temporary bridge**
  matched against the official program (`docs/SS26_Program_Digital_051326.pdf`).
  An `archiveTitle:` tag, when present, takes precedence, so each override entry
  becomes dead once the uploader writes the official name in.
- **Session time window**: the card shows the official program block (e.g.
  12:45–13:45 CDT) from the override `start`/`end`. For a recording WITHOUT an
  override, `endTime` is left null and the card shows only the start time — the
  last talk's *start* is not the session end, so we don't fabricate a range.
- **Talk lead chip** (`primaryTopic`) filters out generic tokens ("ADA 2026",
  theme names) so it surfaces a real topic; it falls back to the theme short
  name when a talk has no topic tag.
- **Chinese title + core line**: a talk row shows `titleZh` (Chinese title,
  with the English title beneath in grey) and `summaryZh` (a one-line Chinese
  core point) as its secondary line. Priority: `titleZh:`/`summaryZh:` **tag
  metadata** from the uploader → a curated frontend bridge
  (`LECTURE_NOTES` in `lib/ada2026-agenda.ts`, currently the 8 player/4948
  talks) → English title / first keyTakeaway. The bridge is temporary; an
  uploaded tag makes its entry redundant.
- **Regression guard**: `npm run check:ada` (`scripts/check-ada-agenda.ts`).
- Key files: `lib/ada2026-agenda.ts`, `components/ada2026/Ada2026Agenda.tsx`,
  `components/ada2026/Ada2026SessionCard.tsx`, `app/ada2026/page.tsx`,
  `app/api/ada2026/agenda/route.ts`.

## Recording → official session name (current overrides)

| player | Official ADA session name | Room | Day/time | Notes |
|---|---|---|---|---|
| 4948 | Welcome to the 2026 ADA Scientific Sessions: Keynote Address by Jay Bhattacharya, MD, PhD & 'Pathway to Stop Diabetes' Symposium | Hall F (L1) | Fri 6/5 10:30 | |
| 4734 | Management of Diabetic Retinopathy—Clinical Perspective | Room 220 (L2) | Fri 6/5 12:45 | |
| 4728 | Top Research Abstracts: Mechanisms of Diabetic Kidney Disease | Hall E-2 (L1) | Fri 6/5 12:45 | |
| 4738 | Beyond Conventional Care: Regenerative Medicine and Smart Dressings for Diabetic Foot Ulcer | Room 217 (L2) | Fri 6/5 12:45 | publishDate mis-stamped Saturday; corrected in-code with `shiftHours: -20` |

## TODO

### 1. Fix player/4738 `publishDate` at source (then drop the `shiftHours` hack)

The 3 foot-ulcer talks were uploaded with a Saturday timestamp; the real
session is Friday 12:45. `buildAgenda` currently shifts them −20h for display
only — the lecture detail pages still show Saturday. Correct the source so the
agenda and detail page agree, then remove `shiftHours` from the 4738 entry in
`RECORDING_OVERRIDES`.

| lecture id | current publishDate | correct publishDate |
|---|---|---|
| `0a0229e8-bc08-420d-b57b-2e8a7b04b150` (Endothelial Metallothionein / VEGF) | 2026-06-06T13:45:00Z | **2026-06-05T17:45:00Z** |
| `72656fb7-cc47-4214-a31d-3024c5d41e04` (Topical Insulin vs. Saline Dressings) | 2026-06-06T14:00:00Z | **2026-06-05T18:00:00Z** |
| `80b4c260-8618-4f4d-abb7-aed838260699` (Bedside Blind Bone Biopsy) | 2026-06-06T14:15:00Z | **2026-06-05T18:15:00Z** |

Fix via the uploader (`PUT /api/ingest/lectures/<id>` with the bearer token) or
the admin UI. After fixing, update `scripts/check-ada-agenda.ts` (drop the
shift assertion) and `RECORDING_OVERRIDES`.

### 2. Uploader: add `archiveTitle:` + `speaker:` tags (then retire RECORDING_OVERRIDES)

- `archiveTitle:` — write the official session name (column "Official ADA
  session name" above) on each part of a recording. Once present it overrides
  the in-code map, so the corresponding `RECORDING_OVERRIDES` entry can be
  deleted. Also add `room:` if you want the room to survive without the map.
- `titleZh:` / `summaryZh:` — **the priority item.** The uploader should
  generate, from the full summary/transcript, a curated Chinese title and a
  one-line Chinese core point (no speaker/institution/date, not a bare
  translation) and write them as `titleZh:<…>` / `summaryZh:<…>` tags. The
  frontend already prefers these over the `LECTURE_NOTES` bridge and the
  English fallback; once supplied, delete the matching `LECTURE_NOTES` entry.
  See the contract in `docs/UPLOADER-PROMPT-ADA2026.md` §TAGS.
- `speaker:` — speakers currently live in the summary body, not in tags, so
  talk rows show no speaker line (the takeaway preview sometimes leaks a
  "講者: …" line, which is incidental). Add `speaker:<name>` per talk for a
  proper speaker line. This is more reliable than parsing the body.
- `topic:` — add a real topic per talk (e.g. `topic:VEGF therapy`,
  `topic:topical insulin dressings`) so the lead chip is descriptive instead of
  falling back to the theme name.
- Optionally backfill `archiveGroup:` + `part:` so grouping no longer depends
  on the `sourceUrl` fallback at all.

The 8 player/4948 talks are curated in `LECTURE_NOTES` as a demo. Extend to the
other 10 talks (or, better, have the uploader emit the tags) when ready.

When a future recording has no `RECORDING_OVERRIDES` entry, the card shows only
the session start time (no end). To show a real window, either add an override
`start`/`end` from the program, or give the uploader a way to record the
session block end.

### 3. Minor UI polish

- **Day-chip counts vs. track filter**: selecting a track does not re-count the
  day chips (they stay at global totals). Make `dayCounts` respect the active
  track in `components/ada2026/Ada2026Agenda.tsx`.
- **Taipei cross-midnight**: with the Taipei toggle, a Chicago-morning session
  shows e.g. `00:10 GMT+8` under a "Fri · 5 Jun" (Chicago-anchored) header.
  Consider a small `+1d` marker when the local date differs from the bucket day.

### 4. Dead code cleanup (separate pass, once stable)

`components/ada2026/Ada2026Board.tsx`, `Ada2026LectureCard.tsx`,
`Ada2026ArchiveGroup.tsx` are no longer imported (the page renders
`Ada2026Agenda`). Kept intentionally for easy rollback. Delete once the Agenda
UX is confirmed good.

### 5. Program PDF

`docs/SS26_Program_Digital_051326.pdf` (~15 MB) is **not** tracked in git
(large binary). It's the source for the official session names. Decide whether
to keep it local-only, add it to `.gitignore`, or store it via LFS / elsewhere.
