# Generation Prompt Rules — ATTD 2026 talk markdown

This is the canonical contract any LLM (Gemini, OpenAI, Claude, …) must follow when producing markdown for the ATTD 2026 ingest pipeline. Same rules across providers means one ingest script handles all of them — no per-source mode.

If you are an LLM **reading this file as part of your prompt**, treat the rules in [§1](#1-paste-ready-system-prompt) as your hard contract. The rest of the document explains the reasoning so your output stays compliant when the input is unusual.

---

## 1. Paste-ready system prompt

Copy this verbatim into the system prompt of whichever model is doing the transcription / summarisation. Tested with Gemini 2.5, GPT-5, Claude Opus 4.7.

```text
You are processing recordings from the ATTD 2026 conference (Barcelona,
11–14 March 2026). Your output feeds a strict ingest pipeline. Follow
these rules without exception.

============================================================
  HARD RULES (violations will be rejected by the ingest)
============================================================

1. ONE TALK = ONE MARKDOWN FILE.
   - Never merge adjacent talks, even when they share a session.
   - Never include Q&A from a different talk in this talk's file.
   - If the source contains multiple talks, produce multiple
     separate output files.

2. Every file MUST start with this YAML frontmatter block:

   ---
   conference: ATTD2026         # required, literal string
   sessionId: <ID>              # required (PS01..PS35, OP01..OP13,
                                #            PL-*, IND-*, SYM-*, etc.)
   title: <full talk title>     # required, plain text, no markdown
   speaker: <speaker name>      # required when known; otherwise omit
   slideDir: <relative path>    # required IF slide image files exist
   cover: <filename>            # optional, must live in slideDir
   clientRef: <stable id>       # optional but RECOMMENDED — see rule 7
   trackId: <id>                # optional, derived from sessionId
   tags: [..., ...]             # optional, free-text
   ---

3. AUTHORITATIVE sessionId list lives at:
     GET https://mednote.zeabur.app/api/ingest/agenda?conference=ATTD2026
   Pull it once per session and pick from `sessions[].id`. Do NOT
   invent IDs (e.g. "PS07-part2"). Exact match only.

4. Inline images use RELATIVE PATHS only:
     ![alt](./slides/03.png)
   - No data: URIs (no base64 inline).
   - No remote URLs that depend on hosts the operator does not own.
   - The relative root is the directory containing the markdown file.

5. SLIDE GALLERY (the per-slide image list shown on the lecture page)
   is a separate concept from inline body images. Put gallery images
   in `slideDir/` and reference the directory in frontmatter; the
   ingest script enumerates and uploads them.

6. Q&A ATTRIBUTION:
   - Same-talk Q&A: include at the end of the body, under a `## Q&A`
     heading.
   - Panel / cross-talk Q&A: produce a SEPARATE markdown file with
     `sessionId` set to the session itself and `title` like
     "Panel discussion — <session title>". Do NOT bolt cross-talk Q&A
     onto an individual talk.

7. clientRef LOCKS IDEMPOTENCY against title edits.
   The ingest script computes a hash from sessionId+title by default.
   If you may revise the title later, declare an explicit clientRef
   (kebab-case, stable, unique within the session) and the script
   will treat all future runs with that clientRef as the same row:
     clientRef: ps07-closed-loop-pregnancy-zino-2026

8. NEVER use absolute paths in `cover:` or image references. Never
   reference paths outside the markdown file's directory tree.

9. Body language: match the source recording. Bilingual side-by-side
   is fine if explicitly requested by the operator; default to the
   source language only.

============================================================
  COMPLIANCE CHECKLIST — verify before returning output
============================================================

- [ ] Exactly one talk in this file
- [ ] Frontmatter present and parseable as YAML
- [ ] sessionId matches an entry from /api/ingest/agenda
- [ ] title is non-empty
- [ ] If slide files referenced, slideDir is set
- [ ] All ![]() image refs are relative paths, no base64, no remote
- [ ] Q&A in this file belongs to THIS talk only
```

---

## 2. Why each rule exists

**Rule 1 — one talk per file.**
The `OP02` incident (May 2026): two consecutive talks were merged into one markdown. The second talk's content silently rode into the first talk's lecture row. There is no automatic way to split mid-file content after the fact, and fuzzy matching on title can't disambiguate when both speakers' material is present. Hard guard.

**Rule 2 — frontmatter.**
The ingest script trusts frontmatter at confidence 1.0 and falls back to a 3-signal fuzzy matcher (title jaccard / speaker description hit / date hint) only when frontmatter is missing. Fuzzy is a fallback, not a feature. Always write frontmatter.

**Rule 3 — sessionId source of truth.**
The agenda endpoint is generated from `lib/attd2026-agenda.ts` which is the only authoritative list. New IDs invented by the LLM ("PS07-part2", "PS07-am") fail the agenda validation and the ingest rejects with HTTP 400.

**Rule 4 — relative inline image paths.**
The ingest script (`scripts/ingest-attd-gemini.ts`) detects relative paths, uploads each image to S3, and rewrites the markdown to use the public URL. Two consequences:

- Base64 data URIs would balloon the markdown content stored in Postgres and bypass S3 entirely (no CDN, no Drive backup).
- Absolute paths (e.g. `/Users/zino/...`) are rejected by the path-containment check (defence against `../../etc/passwd`-style escapes during automation).

**Rule 5 — gallery vs inline body.**
Two distinct features in the lecture detail page:

| Feature | Source | Rendered as |
|---|---|---|
| Inline body images | `summary` markdown body | Inline next to text |
| Slide gallery | `slides` table (per-slide rows) | Side panel with HoverCard previews and slide-by-slide nav |

The future `slides[]` ingest API (PR 2) consumes the `slideDir/` enumeration. Inline images are independent and stay in the markdown body.

**Rule 6 — Q&A attribution.**
A panel discussion's Q&A doesn't belong to any single speaker's lecture row. Mixing it in confuses the per-talk reader and pollutes the auto-generated title for that talk. Either independent file (preferred) or skip.

**Rule 7 — clientRef.**
Idempotency lives in the script: it computes `clientRef = sha256(sessionId|normalized_title)[0..16]` and embeds it in tags. If the operator later revises the title from "AID outcomes" to "AID outcomes — updated", the hash changes and the next run creates a duplicate row instead of updating. Declaring an explicit `clientRef` in frontmatter locks the key.

**Rule 8 — no absolute paths.**
Same containment story as rule 4 — defence against the script accidentally uploading sensitive files to a public bucket.

**Rule 9 — body language.**
Defaulting to the source language avoids the ambiguity of "should I translate?" or "which side goes first?". Operator can override per-job.

---

## 3. Worked example — correct output

Input recording: Kevin Kaiserman, ATTD 2026 Day 2 OP02, "Patients Knowledge and Barriers to Ketone Self-Monitoring".

```markdown
---
conference: ATTD2026
sessionId: OP02
trackId: insulin
title: Patients Knowledge and Barriers to Ketone Self-Monitoring — Results from a Prospective Survey
speaker: Kevin Kaiserman
slideDir: ./slides_left_16x9_dedup_mid/
cover: 03.png
clientRef: op02-kaiserman-ketone-monitoring-2026
tags: [ketone, self-monitoring, T1D, survey]
---

# Patients Knowledge and Barriers to Ketone Self-Monitoring

## Background

Diabetic ketoacidosis (DKA) remains a leading cause of hospitalisation
in type 1 diabetes. Despite the availability of capillary blood ketone
meters, real-world adoption is uneven.

![Survey methodology](./slides_left_16x9_dedup_mid/05.png)

## Methods

A prospective survey of 312 adults with T1D...

## Q&A

**Q (audience, France):** What was the response rate?
**A (Kaiserman):** 68% completion among invited respondents.
```

Notes:

- One talk, one file. Riveline's lecture (which shared the session in the source recording) lives in a separate file with its own frontmatter.
- `clientRef` is set so the operator can polish the title later without spawning duplicates.
- `slideDir` is set; gallery images will be picked up by the slides[] ingest path (PR 2).
- Inline image uses a relative path under the same directory as `slideDir`.
- Q&A is the speaker's own follow-up, included in the body.

---

## 4. Common mistakes to avoid

### ❌ Merging two talks

```markdown
---
conference: ATTD2026
sessionId: OP02
title: New Insulins and Insulin Delivery Systems
---

# 第一場 Kaiserman: Ketone monitoring
... 30 paragraphs ...

# 第二場 Riveline: Once-weekly insulin
... 30 more paragraphs ...
```

This is what produced the OP02 incident. Split into two files, each with its own frontmatter.

### ❌ Inventing a sessionId

```yaml
sessionId: PS07-am
```

There is no `PS07-am`. The agenda lists `PS07` only; sub-divisions don't exist. The ingest rejects with `Unknown sessionId 'PS07-am'`.

### ❌ Base64 inline image

```markdown
![chart](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...)
```

Bloats the markdown stored in Postgres, bypasses S3 / CDN / Drive backup. Save the PNG to `./slides/` and reference it relatively instead.

### ❌ Remote URL pointing at a host you don't own

```markdown
![chart](https://temporary-image-host.example.com/chart-123.png)
```

When the host disappears (or rate-limits, or rotates URLs), the lecture page breaks. The ingest only auto-rehosts **relative** paths — remote URLs are passed through verbatim.

### ❌ Cross-talk Q&A bolted onto one talk

```markdown
# Kaiserman's talk on ketone monitoring

... talk body ...

## Q&A

Q: (about Riveline's insulin trial) ...
Q: (about Kaiserman's survey) ...
Q: (general session question) ...
```

Q&A about Riveline's trial doesn't belong here. Either drop it or move to the panel file.

### ❌ Editing title without locking clientRef

Run 1:
```yaml
title: AID outcomes
# clientRef defaults to sha256(PS07|aid outcomes)[0..16]
```

Run 2 (operator polished the title):
```yaml
title: AID outcomes — pediatric subgroup
# clientRef now defaults to sha256(PS07|aid outcomes pediatric subgroup)
```

The hashes differ → ingest treats run 2 as a brand-new row → duplicate. Lock the key by setting `clientRef` explicitly in run 1.

---

## 5. ATTD 2026 reference

| | |
|---|---|
| Conference | 19th International Conference on Advanced Technologies & Treatments for Diabetes |
| Dates | 11 – 14 March 2026 |
| Host city | Barcelona, Spain |
| Venue | Fira Barcelona Gran Via |
| Days | D1 = Wed 11, D2 = Thu 12, D3 = Fri 13, D4 = Sat 14 |

| sessionId pattern | meaning | count |
|---|---|---|
| `PS01..PS35` | Parallel Scientific | 35 |
| `OP01..OP13` | Oral Presentations | 13 |
| `PL-*` | Scientific plenary | several |
| `IND-*` | Industry plenary / parallel | many |
| `SYM-*` | Symposium | 2 |
| `STARTUP1` / `OPEN1` / `CLOSE1` / `SOC*` / `CRS-*` | Misc | few |

Always pull the live list from `/api/ingest/agenda?conference=ATTD2026` rather than hardcoding. Static reference here is for quick orientation only.

---

## 6. Versioning

This doc is the contract. When it changes, everything generated against the old version stays valid (we only add fields, never remove). Breaking changes will bump the file's title to "Generation Prompt Rules v2" and ship alongside a migration note in `MCP-INGEST.md`.

Current version: **v1** — May 2026.
