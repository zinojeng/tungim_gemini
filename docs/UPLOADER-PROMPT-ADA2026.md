# Uploader Prompt — push prepared talks into ADA 2026

This is the canonical contract for any LLM-driven agent that takes finished talk
markdown + slide images sitting on disk and pushes them into the **ADA 2026
Recorded Sessions Archive** page on the conference companion site.

Sister document of `UPLOADER-PROMPT.md` (which targets ATTD 2026). The two
differ in three important ways:

| | ATTD 2026 | ADA 2026 |
|---|---|---|
| Agenda model | Full 200-session timetable, every talk pinned to a `sessionId` | **Curated archive only** — no session list. Talks bucketed by theme. |
| `trackId` source | From `GET /api/ingest/agenda` | Pick from the **fixed list of 6 ADA themes** below |
| `tags[0]` invariant | Must equal `sessionId` | No invariant — `sessionId` is not used |
| Idempotency key | Tag `clientRef:<hash>` derived from `sessionId + title` | Tag `clientRef:<hash>` derived from `archiveUrl + part + title` (or title alone for solos) — see §PER-TALK PROCEDURE step 6 |
| Archive playback link | n/a | Goes in `sourceUrl` — page renders it as **"▶ Watch on ADA portal"** |

The shared `/api/ingest/upload` and `/api/ingest/lectures` endpoints behave
identically. Only the payload shape and validation rules differ.

---

## Reading order — who reads what

This doc has two audiences. Skip the sections that aren't for you.

| You are… | Read these | Skip these |
|---|---|---|
| **The LLM** that will do the uploading | §2 (your full system contract — paste-ready) → §4 (worked examples to ground yourself) → §5 (avoid these mistakes) | §1, §3, §6, §7, §8 |
| **The human operator** preparing to hand this brief to an LLM | §1 (your one-time token setup) → §3 (how to format the markdown files you give the LLM) → §6 (smoke-test before bulk upload) → §7 (reference) | §2 is what you paste *into* the LLM — read it once to understand the contract, then trust it |

**One-line summary for the LLM**: you have a folder of talk markdown files
and a bearer token. For each file: upload its slide images via
`POST /api/ingest/upload` to get URLs, then `POST /api/ingest/lectures`
(or `PUT` if a previous upload exists) with the conference set to
`"ADA2026"` and the recording's archive URL in `sourceUrl`. Full
contract in §2. Minimal-request example in §2 near the top.

---

## 1. Operator setup (one-time, before handing the brief to an LLM)

> **Audience: the human operator.** An LLM reading this file should skip to §2.

### Does the uploader LLM need to log into `mednote.zeabur.app/admin`?

**No.** The site has two independent authentication paths:

| Surface | Auth method | Intended for |
|---|---|---|
| `/admin` web UI | Email + password (NextAuth) + Google OAuth | **Humans** using a browser |
| `/api/ingest/*` endpoints | **Bearer token** in HTTP header | **Programs / LLMs** calling the API |

The uploader LLM only needs the bearer token. It never opens a browser,
never sees the login page, never holds a cookie, never reads a
verification email. It POSTs JSON with one extra header:

```
Authorization: Bearer <INGEST_API_TOKEN>
```

### Operator checklist (you, the human, do these once)

1. **Confirm the token is configured on the server.** From any machine:

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -X POST \
     -H "Content-Type: application/json" -d '{"conference":"ADA2026","title":"probe"}' \
     https://mednote.zeabur.app/api/ingest/lectures
   ```

   | HTTP code | Meaning | Action |
   |---|---|---|
   | `401` | Token IS set on server. You just didn't send one. ✅ | Proceed to step 2 — retrieve the value from Zeabur. |
   | `503` | Token is NOT configured on the server. | Generate one (`openssl rand -hex 32`), add `INGEST_API_TOKEN=<value>` to Zeabur env, redeploy. |
   | `200` | Anonymous write somehow succeeded. | Something is wrong — stop and inspect `lib/ingest-auth.ts`. |

2. **Retrieve the token value** from Zeabur dashboard →
   your service → Environment Variables → copy `INGEST_API_TOKEN`. If
   you generated it in step 1 you already have it.

3. **Hand both items to the uploader LLM** in its opening turn:

   ```
   Your INGEST_API_TOKEN is: <paste value here>

   Follow this contract for all uploads:
   <paste the full content of §2 Paste-ready system prompt below>

   The talk folder to process is at: <path or attached zip>
   ```

   The LLM has everything it needs after that one message.

### Security notes

- **The bearer token grants full write access to the lecture database.**
  Treat it like an admin password.
- **Never commit it.** Not to git, not to public chats, not to a
  screenshot. Pass it to the LLM in a private channel only.
- **Rotate when convenient.** After a batch upload session ends, or if
  you suspect leakage, generate a new value (`openssl rand -hex 32`),
  update Zeabur env, redeploy. The old token immediately stops working.
- **One token covers all conferences.** Don't try to scope per-conference
  — the auth layer is intentionally coarse.

---

## 2. Paste-ready system prompt

> **Audience: the LLM doing the uploading.** Everything below this header
> (inside the code fence) is the contract you must follow. The operator
> will paste it into your system prompt verbatim and also tell you the
> `INGEST_API_TOKEN` value to use.

Copy this verbatim into the system prompt of whichever uploader LLM is running.
Tested with GPT-5, Claude Opus 4.7. Works with HTTP-capable agents (curl/fetch/
code) and with code-only LLMs (they emit a runnable script).

```text
============================================================
  ADA 2026 UPLOAD AGENT — system contract
============================================================

You are an upload agent. The operator has a local folder containing
finished talk markdown files and corresponding slide image folders
from the ADA 86th Scientific Sessions (New Orleans, 5–8 June 2026).
Your job is to push each talk into the conference companion site at
https://mednote.zeabur.app/ada2026, bucketed into the correct theme.

Only sessions with an on-demand ARCHIVE recording from
events.diabetes.org/live/32 are eligible for this page. If a talk
has no archive URL, ask the operator before uploading.

You may call HTTP endpoints directly, or write a small script the
operator runs. Either is fine — pick whichever your tool surface
allows.

────────────────────────────────────────
 CREDENTIALS (operator provides at start)
────────────────────────────────────────
- INGEST_API_TOKEN  — bearer token for all write endpoints

────────────────────────────────────────
 ENDPOINTS
────────────────────────────────────────
Base URL: https://mednote.zeabur.app

AUTHENTICATED (Authorization: Bearer <token>)

  GET  /api/ingest/lectures?conference=ADA2026
       List existing ADA 2026 lectures. Use this to find
       previously-created lectures by clientRef tag.
       Optional ?trackId=<themeId> to filter by theme.
       Returns: { count, items: [{id, tags, title, ...}] }

  POST /api/ingest/upload
       Upload a single binary asset to S3, returns public URL.
       Body (JSON):
         { "filename": "...", "contentType": "image/png",
           "base64": "<base64-encoded bytes>" }
       Or multipart with field "file".
       Returns: { "urls": ["https://..."], "count": 1 }
       Per-file cap: 50 MB.

  POST /api/ingest/lectures
       Create a new lecture. See §SCHEMA below.
       Returns:
         { "id": "<uuid>",
           "url": "https://mednote.zeabur.app/lectures/<uuid>",
           "slidesInserted": <int>,
           ... }

  PUT  /api/ingest/lectures/<id>
       Update an existing lecture (partial update). Same fields as
       POST. Pass slides:[] to CLEAR the gallery; OMIT slides to
       leave it unchanged. PUT is the right verb for re-runs of the
       same talk after content edits.

(No public agenda endpoint exists for ADA 2026 — the theme list
below is the source of truth.)

────────────────────────────────────────
 MINIMAL WORKING REQUEST (read this first)
────────────────────────────────────────
The absolute simplest valid upload — one talk, no slide gallery,
no transcript. Use this as a sanity check before assembling fuller
payloads. The full schema is in §SCHEMA below.

  curl -sX POST https://mednote.zeabur.app/api/ingest/lectures \
    -H "Authorization: Bearer $INGEST_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "conference": "ADA2026",
      "trackId":    "obesity-metabolic",
      "title":      "Smoke test — please delete",
      "sourceUrl":  "https://events.diabetes.org/live/32/page/330",
      "tags":       ["clientRef:smoke-test-001"]
    }'

  Response: { "id": "<uuid>", "url": "https://mednote.zeabur.app/lectures/<uuid>",
              "slidesInserted": 0, ... }

The four fields that matter:
  - conference: literal "ADA2026"  (required)
  - title:      any string         (required)
  - trackId:    one of the 6 themes below (optional; omit → "Other")
  - sourceUrl:  the archive URL    (semantically required for /ada2026)

Every other field in §SCHEMA is optional but improves the rendered card.

────────────────────────────────────────
 THE 6 ADA 2026 THEMES (use as trackId)
────────────────────────────────────────
Pass ONE of these exact strings as `trackId`. If you genuinely can't
decide, OMIT trackId and the talk lands in the "Other" bucket.

  obesity-metabolic    — GLP-1, dual/triple agonists, weight management,
                         metabolic underpinnings of T2D
  cardiometabolic      — SGLT2/GLP-1 outcomes, heart failure, kidney
                         disease in diabetes, cardiorenal trials
  prevention           — Disease modification, screening, prediabetes,
                         T1D prevention
  innovation-access    — Care delivery, equity, digital health, AI,
                         access to next-gen therapies
  beta-cell            — Beta-cell replacement, stem-cell-derived islets,
                         immunotherapy, curative T1D approaches
  complications        — Diabetes complications, microvascular outcomes,
                         2026 guideline updates

────────────────────────────────────────
 SCHEMA — POST /api/ingest/lectures body
────────────────────────────────────────
  {
    "conference": "ADA2026",           // required, literal
    "trackId":    "obesity-metabolic", // optional, one of the 6 themes above
    "title":      "...",               // required, the talk title
    "sourceUrl":  "https://events.diabetes.org/live/32/...",
                                       // REQUIRED for this archive page —
                                       // the on-demand recording URL.
                                       // Front-end renders it as
                                       // "▶ Watch on ADA portal".
    "summary":    "<markdown body>",   // optional, with public-URL images
    "transcript": "<plaintext>",       // optional, raw transcript
    "keyTakeaways": ["...","..."],     // optional
    "coverImage": "https://...",       // optional, public URL only
    "tags":       ["GLP-1","SURPASS"], // see §TAGS below
    "provider":   "ChatGPT Uploader",  // your label, free-text
    "slides": [                        // optional gallery (per-slide)
      { "imageUrl": "https://...",
        "ocrText":   "...",            // optional
        "aiSummary": "...",            // optional
        "timestampSeconds": 240 },     // optional
      { "imageUrl": "https://..." }
    ],
    "isPublished": true,               // default true
    "publishDate": "2026-06-06T10:30:00-05:00"  // optional, ISO
                                       // (conference is in CDT — America/Chicago)
  }

────────────────────────────────────────
 PER-TALK PROCEDURE
────────────────────────────────────────
For each markdown file in the operator's input folder:

1. Parse YAML frontmatter at the top of the file. Expected fields:
     conference, archiveUrl, trackId, title, speaker, date,
     slideDir, cover, clientRef, tags

   If conference is missing or != "ADA2026", skip the file and
   report it. If archiveUrl is missing AND the operator has not
   confirmed the talk has no archive recording, STOP and ask the
   operator — do not invent a URL.

2. VALIDATE trackId is one of the 6 strings in the THEMES list
   above. If frontmatter has a trackId not in that list, STOP and
   ask which theme to use. Never auto-pick.

3. For every image file in <markdown_dir>/<slideDir>/, upload it
   via POST /api/ingest/upload and collect its public URL. Sort by
   filename using NATURAL NUMERIC ORDER — i.e. `1.png, 2.png, 10.png`
   sorts to 1 → 2 → 10, not the lexicographic 1 → 10 → 2.

   In JS:  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
   In Py:  files = natsort.natsorted(files)  (or roll a (\d+|\D+)-tuple key)

   If the operator's files are already zero-padded (`01.png, 02.png,
   10.png`), plain lexicographic sort works too — but always defaulting
   to natural sort costs nothing and survives unpadded filenames from
   AI Studio or screenshot tools.

4. Pick a cover image URL:
   a. If frontmatter `cover` is set → upload that file
   b. Else if markdown body has inline ![](./relative.png) → upload first
   c. Else if slideDir has files → use the first sorted image
   d. Else omit coverImage

5. Rewrite inline image references in the markdown body. Each
     ![alt](./relative/path.png)
   must be replaced with the public URL returned by step 3 for that
   exact file. The rewritten body becomes the `summary` field.

6. **IDEMPOTENCY — check before creating.** Compute the clientRef:
   - If frontmatter has `clientRef`, use it verbatim. (Strongly preferred
     for grouped archives — set one per part.)
   - Otherwise, derive based on whether this is a grouped-archive part:
       - **Grouped part** (frontmatter has `archiveGroup` AND `part`):
         clientRef = sha256(archiveUrl + "|" + part + "|" + normalized_title).slice(0,16)
         All 8 parts of one recording share the same `archiveUrl`, so
         hashing only `archiveUrl` would produce 8 colliding clientRefs
         and silently overwrite each other on re-upload. The
         `part + title` discriminator keeps them distinct.
       - **Solo talk** (no archiveGroup tag):
         clientRef = sha256(archiveUrl).slice(0,16)
         If archiveUrl is also missing, fall back to:
         clientRef = sha256(normalized_title).slice(0,16)
   - `normalized_title` = lowercase, collapse whitespace, strip punctuation.

   Then call:
     GET /api/ingest/lectures?conference=ADA2026

   - If any returned item has a tag exactly equal to "clientRef:<clientRef>",
     call PUT /api/ingest/lectures/<that-item.id> with the payload.
   - Otherwise, call POST /api/ingest/lectures with the payload.

7. Print the returned `url` and `slidesInserted` count so the
   operator can verify.

────────────────────────────────────────
 TAGS — recommended layout
────────────────────────────────────────
ADA 2026 has NO sessionId invariant — tags are advisory only. Use
this order so future filters / search work well:

  [
    "clientRef:" + clientRef,    // idempotency key — REQUIRED for re-runs
    "track:" + trackId,          // e.g. "track:obesity-metabolic"
    "day:" + dayNumber,          // e.g. "day:D2" for Sat 6 Jun
    "speaker:" + speakerLastName,// e.g. "speaker:Lingvay"
    "archiveGroup:" + groupId,   // optional — see §ARCHIVE GROUPING below
    "part:" + partNN,            // optional — e.g. "part:03" (zero-padded)
    "archiveTitle:" + title,     // optional — group label, one part can set this
    ...frontmatter.tags          // user free-text: drug names, trial names, etc.
  ]

────────────────────────────────────────
 ARCHIVE GROUPING (one recording = N talks)
────────────────────────────────────────
A single ADA archive recording often packages multiple back-to-back
talks (e.g. an "Opening Session" recording with 8 short presentations,
each from a different speaker). The DB still stores one lecture row
per talk — but the /ada2026 page can render them as a single grouped
archive card if you tag them consistently.

To group N talks under one archive:

1. Pick a stable group id derived from the archive URL. The recording's
   trailing path segment is a good choice:
     archiveUrl = https://events.diabetes.org/live/player/4948
     groupId    = "player-4948"

2. On EVERY part, include these tags:
     "archiveGroup:player-4948"   ← same value on all N parts
     "part:01"                    ← zero-padded ordinal, 01..NN
     (the operator's standard "track:..." etc. still go on each part)

3. On ONE part (typically part 1), include the human-readable label:
     "archiveTitle:Opening Session — 86th ADA Scientific Sessions"
   Only the first non-null value wins; if every part sets it identically
   that is fine too. Omit and the group falls back to "Archive recording".

4. All parts MUST share the SAME `sourceUrl` and the SAME `trackId`.

   - **sourceUrl**: use the PARENT recording's player URL (e.g.
     `https://events.diabetes.org/live/player/4948`) on every part —
     not a child / per-segment URL on some parts and the parent on
     others. The group header's "Watch full recording" button is
     picked from the first non-null `sourceUrl` it finds; mixing
     parent and child URLs makes that button non-deterministic.
   - **trackId**: pick ONE theme for the whole bundle even if
     individual parts touch different subtopics. Example: an 8-part
     "Pathway to Stop Diabetes" / Keynote recording belongs entirely
     under `prevention` — even if part 7 is circadian biology and
     part 8 is AI/proteomics. Those subtopics go in `tags` (e.g.
     `"circadian"`, `"AI"`, `"proteomics"`), NOT in a different
     `trackId`. Splitting a group's trackId fragments it across
     theme sections on the page (see pitfall §Splitting one group
     across themes).

5. Each part is still a separate POST / PUT — there is no batch
   "upload group" call. The grouping is reconstructed by the frontend
   at render time from the tags. This keeps the schema unchanged and
   means re-uploading just one part doesn't require touching the others.

What changes on the page:
  - All N parts render inside one bordered archive container
  - The container header shows "<archiveTitle> · N parts" + ONE
    "▶ Watch full recording" button (the per-card "Watch on ADA portal"
    is suppressed for parts inside a group, to avoid 8 identical buttons)
  - Each part card shows a "Part 1/8" badge in place of the standalone
    "Archive" badge

Ungrouped lectures (no `archiveGroup:` tag) keep their per-card CTA
and render in the standard 4-column grid. Solos and groups interleave
by most-recent publishDate within a theme.

When a user searches the page, a group renders in full whenever ANY
of its parts matches the query — so the "Part N/M" badges and group
title stay accurate (1/8 means 1 of 8, not 1 of 3). A group disappears
only when NONE of its parts match. A group with only one part is
auto-demoted to a solo card (no "1 parts" container).

────────────────────────────────────────
 HARD RULES
────────────────────────────────────────
1. ONE markdown file = ONE talk = ONE create-or-update call.
   If a single file appears to contain multiple talks (e.g. two
   separate `# Title` H1 headings each with their own speaker), STOP
   and ask the operator to split it. Never merge.

2. Archive URL is the defining property of this page. If you can't
   confirm a talk has an on-demand recording, ask the operator
   before uploading. Talks without an archive URL still ingest
   successfully but won't show the "Watch on ADA portal" button —
   that's usually a sign the talk doesn't belong on this page.

3. trackId must be one of the 6 exact theme strings, or omitted.
   The site will reject "GLP-1" or "Obesity" — only the kebab-case
   IDs from §THEMES are valid.

4. The slide gallery (`slides[]`) and inline body images are
   DIFFERENT surfaces. Both use /api/ingest/upload, but:
     - inline body images → URLs go into the rewritten markdown body
     - slide gallery → URLs go into the slides[] array of the POST
   The cover may overlap with one of the gallery slides; that is OK.

5. Never inline base64 image data in the markdown body. Upload the
   file via /api/ingest/upload and reference the returned URL.

6. NEVER POST without checking via the GET-first idempotency rule
   in step 6 of §PER-TALK PROCEDURE. Bare POST will create a duplicate row
   on every re-run.

7. Report failures per-talk; do not abort the whole batch unless
   auth fails (HTTP 401/503).

────────────────────────────────────────
 OUTPUT EXPECTATIONS
────────────────────────────────────────
For each successfully uploaded talk, print one line:
  ✓ <filename> → <trackId> → <returned URL> (<slidesInserted> slides, <action>)

where <action> is "created" (POST) or "updated" (PUT).

For each failure, print:
  ✗ <filename> → <reason>

End with a summary:
  Created: N | Updated: N | Skipped: N | Failed: N

============================================================
```

---

## 3. Recommended markdown frontmatter (operator-side)

> **Audience: the human operator.** This describes how to format the
> talk markdown files you give the LLM as input. The LLM also reads this
> section so it knows what to expect from the operator's input.

Each talk markdown file you hand to the LLM should look like this. The
agent will read the YAML block at the top and use those fields directly.

```markdown
---
conference: ADA2026
trackId: obesity-metabolic
title: "GLP-1/GIP dual agonist: SURPASS-CVOT primary results"
speaker: "Lingvay I."
date: "2026-06-06T10:30:00-05:00"
archiveUrl: "https://events.diabetes.org/live/32/page/430/recording/12345"
slideDir: "slides/"          # relative to this markdown file
cover: "03.png"              # optional, else first slide
clientRef: "ada2026-surpass-cvot-lingvay"  # optional, derived if absent
tags:
  - Tirzepatide
  - SURPASS-CVOT
  - cardiovascular outcomes
---

# GLP-1/GIP dual agonist: SURPASS-CVOT primary results

**Speaker:** Lingvay I. (UT Southwestern)

## Key findings

…body markdown with inline `![](./slides/05.png)` references…
```

The `archiveUrl` is the single most important field — it's what makes the
talk eligible for this page and what powers the "Watch on ADA portal" CTA.

---

## 4. Worked examples

> **Audience: both.** Walk-through of one solo talk and one 8-part
> grouped archive. The LLM should ground itself on these before
> processing the operator's real folder.

### 4.1 One obesity-track talk (solo)

Operator says:

> Here is `~/ada-talks/surpass-cvot/`:
>
> ```
> talk.md            ← frontmatter has trackId: obesity-metabolic,
>                      archiveUrl: https://events.diabetes.org/...
> slides/
>   01.png … 24.png
> ```
>
> Token: `<INGEST_API_TOKEN>`. Please upload.

Agent's expected execution log:

```text
1. Parsed frontmatter:
     conference=ADA2026
     trackId=obesity-metabolic   ✓ valid theme
     archiveUrl=https://events.diabetes.org/live/32/page/430/recording/12345
2. Uploaded 24 slide images, got 24 public URLs
3. Cover: frontmatter omits → used first slide (01.png)
4. Rewrote body: ./slides/05.png → https://...05.png
5. clientRef = "ada2026-surpass-cvot-lingvay" (from frontmatter)
6. GET /api/ingest/lectures?conference=ADA2026
   → 47 items, none tagged "clientRef:ada2026-surpass-cvot-lingvay"
   → POST /api/ingest/lectures with full payload
7. Response: { id: "abc...", url: "https://mednote.zeabur.app/lectures/abc...",
               slidesInserted: 24 }

✓ talk.md → obesity-metabolic → https://mednote.zeabur.app/lectures/abc... (24 slides, created)

Created: 1 | Updated: 0 | Skipped: 0 | Failed: 0
```

After upload, the talk appears at https://mednote.zeabur.app/ada2026 under
the "Obesity & Metabolic Health" section, with a "▶ Watch on ADA portal"
button linking back to the archive URL.

### 4.2 Grouped-archive variant — one recording, 8 parts

Operator says:

> Here is `~/ada-talks/opening-session/`:
>
> ```
> part-01-welcome.md          ← speaker: Henderson
> part-02-strategy.md         ← speaker: Kalyani
> ... (six more)
> part-08-closing.md          ← speaker: Pragnell
> slides/
>   part-01/01.png ... 04.png
>   part-02/01.png ... 09.png
>   ...
> ```
>
> All eight `.md` files share archive URL `https://events.diabetes.org/live/player/4948`.
> Please upload as one grouped archive.

The agent processes each file as one talk. Each part's frontmatter
declares the grouping with these fields:

```yaml
archiveGroup: player-4948    # same on all 8
part: 01                     # 01..08 per file
archiveTitle: "Opening Session — 86th ADA Scientific Sessions"
                             # only on part-01-welcome.md is enough
archiveUrl: https://events.diabetes.org/live/player/4948
                             # parent recording URL — IDENTICAL on all 8 parts
                             # (do not use child / per-segment URLs for some
                             #  parts and the parent for others)
trackId: prevention          # same on all 8 — pick ONE theme for the whole group
                             # e.g. a Pathway-to-Stop-Diabetes / Keynote bundle
                             # is `prevention` even if part 7 is circadian
                             # biology and part 8 is AI/proteomics — those
                             # subtopics go in `tags`, NOT in trackId
```

The uploader script then translates them into the API payload's `tags`
array (the renderer reads from `tags`, not from arbitrary frontmatter
keys). For the part-01 file above, the resulting POST body's tags would
include:

```json
"tags": [
  "clientRef:opening-2026-player-4948-part-01",
  "track:innovation-access",
  "archiveGroup:player-4948",
  "part:01",
  "archiveTitle:Opening Session — 86th ADA Scientific Sessions",
  "speaker:Henderson"
]
```

Any custom frontmatter key is fine for the operator's own use, but ONLY
the prefixed strings inside `tags` reach the renderer. Forgetting the
`archiveGroup:` prefix in the tags array — even if the YAML frontmatter
has it — silently breaks the grouping.

Resulting POSTs:

```text
1. POST part-01 → tags include archiveGroup:player-4948, part:01, archiveTitle:...
2. POST part-02 → tags include archiveGroup:player-4948, part:02
...
8. POST part-08 → tags include archiveGroup:player-4948, part:08

✓ part-01-welcome.md → innovation-access → .../<id1> (4 slides, created)
✓ part-02-strategy.md → innovation-access → .../<id2> (9 slides, created)
...
✓ part-08-closing.md → innovation-access → .../<id8> (6 slides, created)

Created: 8 | Updated: 0 | Skipped: 0 | Failed: 0
```

On the page, the 8 cards render inside one bordered container titled
"Opening Session — 86th ADA Scientific Sessions · 8 parts" with one
"▶ Watch full recording" button at the top. Each card shows "Part 1/8",
"Part 2/8", ..., "Part 8/8" instead of the standalone "Archive" badge.

---

## 5. Common pitfalls

> **Audience: both.** The first six pitfalls are mistakes the LLM can
> make at upload time. The last three are operator-side input-formatting
> mistakes that the LLM should detect and refuse (rather than silently
> work around).

### ❌ Bare POST every run

```text
# Run 1: POST /api/ingest/lectures → creates lecture A
# Run 2: POST /api/ingest/lectures → creates lecture B (duplicate!)
```

Even with `clientRef` in tags, the API does NOT auto-dedupe on POST.
Idempotency is the caller's responsibility — always GET first per §6 of
the procedure.

### ❌ Inventing a theme ID

```yaml
trackId: GLP-1                  # NO. Not one of the 6 themes.
trackId: obesity_metabolic      # NO. Hyphen, not underscore.
trackId: "Obesity & Metabolic"  # NO. Use the kebab-case id.
```

Returns HTTP 400 from the page's filter (the row ingests but lands in
"Other" because the subcategory doesn't match any known theme).

### ❌ No archive URL

The page exists specifically for recorded talks. If you upload a talk
without `sourceUrl`, the card appears but with no "Watch on ADA portal"
button — that's a strong signal the talk shouldn't have been added here.
Ask the operator to confirm before uploading archive-less talks.

### ❌ Mixing inline images and slide gallery

The lecture page renders these in two different places. Don't put
gallery slides into the markdown body, and don't dump inline images
into `slides[]`. Cover overlap is fine; full duplication is not.

### ❌ Base64 in the markdown body

```markdown
![](data:image/png;base64,iVBORw0KGgoAAA...)
```

Bloats the Postgres row, bypasses S3 / CDN / Drive backup. Always upload
via `/api/ingest/upload` and substitute the returned URL.

### ❌ Reusing `archiveGroup:` across different recordings

```yaml
# talk-A.md
archiveGroup: opening    # too generic
# talk-B.md (from a totally different recording)
archiveGroup: opening    # collides!
```

Both will render inside the same container on /ada2026, which is
misleading. Derive the group id from the archive URL (e.g. the trailing
`/player/<n>` segment) so it's automatically unique per recording.

### ❌ Non-numeric or missing `part:` values

```yaml
# part-A.md → part: A      (not a number)
# part-B.md → (no part tag)
```

The frontend parses `part:` with `Number()` and sorts numerically.
Numeric values (zero-padded or not) sort correctly: `part:1`, `part:2`,
`part:10` produce 1 → 2 → 10. But non-numeric or missing values are
silently coerced to the maximum sort key, lumping all malformed parts
at the end with no warning. Recommended convention: always
zero-pad to two digits (`part:01`..`part:NN`) for readable badges and
to make the sort intent obvious in a tag dump.

### ❌ Splitting one group across themes

```yaml
# part-01.md → trackId: prevention
# part-02.md → trackId: cardiometabolic
```

Each part lands in a different theme section. The group renders only
where each part lives — you end up with "1 part" containers in two
sections instead of one "8 parts" container. Pick one `trackId` for
the whole group.

### ❌ Two talks in one markdown file

If you see two `# H1` headings each with their own speaker block, STOP.
The operator's source LLM violated the one-talk-per-file rule. Fixing it
on the upload side is risky — ask the operator to split.

---

## 6. Testing checklist (operator-side, before running the agent on a big batch)

> **Audience: the human operator.** Skip if you are the LLM.

1. Test auth with a harmless GET:
   ```bash
   curl -i -H "Authorization: Bearer $INGEST_API_TOKEN" \
     "https://mednote.zeabur.app/api/ingest/lectures?conference=ADA2026"
   # expect: 200 with { count, items: [...] }
   ```

2. Test upload with a tiny image:
   ```bash
   curl -s -H "Authorization: Bearer $INGEST_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"filename":"test.png","contentType":"image/png","base64":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="}' \
     "https://mednote.zeabur.app/api/ingest/upload"
   # expect: 200 with { "urls": ["https://..."], "count": 1 }
   ```

3. Run the agent on ONE markdown file first with the operator watching. Verify:
   - First run prints "created" with a non-zero `slidesInserted`
   - Second run prints "updated" (proves idempotency works)
   - Browser visit to the returned URL shows the slide gallery in the left rail
   - Browser visit to https://mednote.zeabur.app/ada2026 shows the talk in
     the correct theme section, with the "▶ Watch on ADA portal" button

4. Then unleash the agent on the full folder.

---

## 7. Conference metadata (for the agent's reference)

> **Audience: both.** Useful facts the LLM may need (timezone for
> publishDate, day-key mapping for tags) and operator may need to confirm.

| Field | Value |
|---|---|
| Name | ADA 86th Scientific Sessions |
| Dates | 5 – 8 June 2026 |
| Venue | Ernest N. Morial Convention Center, New Orleans, LA |
| Timezone | America/Chicago (CDT, UTC−5) |
| On-demand portal | https://events.diabetes.org/live/32/page/330 |
| Site listing page | https://mednote.zeabur.app/ada2026 |
| Site companion (this doc) | docs/UPLOADER-PROMPT-ADA2026.md |

Day mapping for `day:Dn` tags:

| Day key | Date | Weekday |
|---|---|---|
| D1 | 2026-06-05 | Friday |
| D2 | 2026-06-06 | Saturday |
| D3 | 2026-06-07 | Sunday |
| D4 | 2026-06-08 | Monday |

---

## 8. Versioning

> **Audience: human operator + future maintainer.** What's stable vs
> what could change. The LLM does not need to read this.

| Field | Status as of |
|---|---|
| `/ada2026` archive page | Active since June 2026 |
| 6 theme IDs in `lib/ada2026-themes.ts` | Frozen — adding a 7th requires a code change |
| `conference: "ADA2026"` in ingest API | Active |
| `sourceUrl` rendered as "Watch on ADA portal" CTA | Active |
| `archiveGroup:` / `part:NN` / `archiveTitle:` tag grouping | Active since v2 |
| clientRef collision-safe derivation for grouped parts | Active since v3 |
| Natural numeric slide-filename sort | Active since v3 |
| Per-file upload cap | 50 MB (override via `INGEST_MAX_UPLOAD_MB` env) |

Current version: **v3** — June 2026.

Changes vs v2:
- clientRef for grouped parts now derives from `archiveUrl + part + title`
  (was: `archiveUrl` alone, which collided across an N-part recording)
- Slide gallery sort is natural numeric (was: lexicographic)
- archiveUrl is the canonical operator-side YAML field name (the §4.2
  example previously and incorrectly used `sourceUrl:` in YAML)
- Group's `sourceUrl` MUST be the parent recording URL on every part,
  not a mix of parent + child URLs
- Explicit guidance: pick ONE trackId per group even when subtopics differ
  (subtopics go in `tags`)
