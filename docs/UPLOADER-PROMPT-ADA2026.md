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
| Idempotency key | Tag `clientRef:<hash>` derived from `sessionId + title` | Tag `clientRef:<hash>` derived from `archiveUrl` (or title) |
| Archive playback link | n/a | Goes in `sourceUrl` — page renders it as **"▶ Watch on ADA portal"** |

The shared `/api/ingest/upload` and `/api/ingest/lectures` endpoints behave
identically. Only the payload shape and validation rules differ.

---

## 1. Operator setup (one-time, before handing the brief to an LLM)

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
   via POST /api/ingest/upload and collect its public URL. Sort
   by filename (lexicographic ascending) so order is deterministic.

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
   - If frontmatter has `clientRef`, use it verbatim.
   - Otherwise, derive: clientRef = sha256(archiveUrl).slice(0,16)
     If archiveUrl is also missing, fall back to:
     clientRef = sha256(normalized_title).slice(0,16)
     where normalized_title = lowercase, collapse whitespace,
     strip punctuation.

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
    ...frontmatter.tags          // user free-text: drug names, trial names, etc.
  ]

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
   in §6 of the procedure. Bare POST will create a duplicate row
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

## 4. Worked example — one obesity-track talk

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

---

## 5. Common pitfalls

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

### ❌ Two talks in one markdown file

If you see two `# H1` headings each with their own speaker block, STOP.
The operator's source LLM violated the one-talk-per-file rule. Fixing it
on the upload side is risky — ask the operator to split.

---

## 6. Testing checklist (operator-side, before running the agent on a big batch)

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

| Field | Status as of |
|---|---|
| `/ada2026` archive page | Active since June 2026 |
| 6 theme IDs in `lib/ada2026-themes.ts` | Frozen — adding a 7th requires a code change |
| `conference: "ADA2026"` in ingest API | Active |
| `sourceUrl` rendered as "Watch on ADA portal" CTA | Active |
| Per-file upload cap | 50 MB (override via `INGEST_MAX_UPLOAD_MB` env) |

Current version: **v1** — June 2026.
