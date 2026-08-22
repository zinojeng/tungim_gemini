# MCP Ingest — Drop transcripts into ATTD 2026 from any AI client

This site exposes two parallel write paths for AI agents to upload conference content **without logging in to `/admin`**:

1. **REST ingest API** at `/api/ingest/*` — bearer-token-authenticated.
2. **MCP server** at `/api/mcp` — same auth, JSON-RPC over HTTP, usable from Claude Desktop / Cursor / Codex / any MCP-aware client.

Both layers share the same authentication and the same database writes.

---

## 1. Configure the token

Set **one** of these env vars on the server (Zeabur, local `.env.local`, etc.):

```env
INGEST_API_TOKEN=<long-random-string>
# or alternative name (either works)
MCP_INGEST_TOKEN=<same-string>
```

If neither is set, every write endpoint returns **503**. Reads of the agenda (`GET /api/ingest/agenda`) are public.

Generate a token:

```bash
openssl rand -hex 32
```

---

## 2. REST API

Public, read-only:

```bash
curl https://mednote.zeabur.app/api/ingest/agenda?conference=ATTD2026
```

Authenticated writes — every request needs `Authorization: Bearer <token>` (or `X-Ingest-Token: <token>`).

### Create a lecture attached to a session

```bash
curl -X POST https://mednote.zeabur.app/api/ingest/lectures \
  -H "Authorization: Bearer $INGEST_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conference": "ATTD2026",
    "sessionId": "PS07",
    "title": "Closed-Loop Systems — Where Are We Now? (transcript notes)",
    "transcript": "Full transcript text here...",
    "summary": "Markdown summary...",
    "keyTakeaways": ["MDI vs AID outcomes", "Adolescent adherence data"],
    "tags": ["closed-loop", "T1D"],
    "provider": "Claude Desktop MCP"
  }'
```

Response:

```json
{
  "id": "uuid",
  "url": "https://mednote.zeabur.app/lectures/<uuid>",
  "agendaUrl": "https://mednote.zeabur.app/attd-2026#session-PS07",
  ...
}
```

`sessionId` is optional — if omitted, the lecture lands in the track but isn't pinned to a specific session card.

**Slide gallery.** Attach a per-slide image gallery (separate from inline
body images) by passing a `slides` array on POST or PUT:

```json
"slides": [
  { "imageUrl": "https://.../01.png" },
  { "imageUrl": "https://.../02.png", "ocrText": "Methods", "timestampSeconds": 240 },
  { "imageUrl": "https://.../03.png" }
]
```

POST inserts the full set on creation. PUT *replaces* the entire gallery (pass
`[]` to clear). Hard cap: 500 slides per lecture. Each row needs `imageUrl`;
`timestampSeconds`, `ocrText`, `aiSummary` are optional.

### Upload a file

```bash
curl -X POST https://mednote.zeabur.app/api/ingest/upload \
  -H "Authorization: Bearer $INGEST_API_TOKEN" \
  -F file=@slides.pdf
```

Or JSON+base64:

```bash
curl -X POST https://mednote.zeabur.app/api/ingest/upload \
  -H "Authorization: Bearer $INGEST_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"filename\":\"cover.png\",\"contentType\":\"image/png\",\"base64\":\"$(base64 -w0 cover.png)\"}"
```

Response: `{ "urls": ["https://..."], "count": 1 }`.

### List existing lectures

```bash
curl "https://mednote.zeabur.app/api/ingest/lectures?conference=ATTD2026&trackId=cgm" \
  -H "Authorization: Bearer $INGEST_API_TOKEN"
```

---

## 3. MCP server

Endpoint: `https://mednote.zeabur.app/api/mcp`

Transport: **Streamable HTTP** (JSON-RPC 2.0 over `POST`).

### Tools

| Tool | Purpose |
|---|---|
| `attd_get_meta` | Conference dates, city, venue. |
| `attd_list_tracks` | The 12 thematic tracks. |
| `attd_list_sessions` | All sessions, filterable by `trackId` / `day` / `query`. |
| `attd_list_lectures` | What's already attached to ATTD 2026. |
| `attd_create_lecture` | Create a transcript/summary lecture, optionally pinned to a session. Accepts `slides[]` for the per-slide gallery. |
| `attd_attach_slides_to_lecture` | Append slide rows to an existing lecture (incremental gallery growth). |
| `attd_attach_url_to_session` | Attach an external URL to a session (no transcript needed). |
| `attd_upload_file` | Upload a base64-encoded asset to S3, get back a public URL. |

### Wire it up — Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "mednote-attd": {
      "url": "https://mednote.zeabur.app/api/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_INGEST_API_TOKEN"
      }
    }
  }
}
```

Restart Claude Desktop. The eight `attd_*` tools should appear in the tool drawer.

### Wire it up — Cursor / Codex / generic MCP client

Most clients accept the same shape — point them at `https://mednote.zeabur.app/api/mcp` with an `Authorization: Bearer ...` header. If the client only supports stdio, run a local proxy (e.g. [`mcp-remote`](https://github.com/geelen/mcp-remote)).

### Typical agent flow

```text
1. attd_list_tracks                 → pick "aid" (Automated Insulin Delivery)
2. attd_list_sessions { trackId: "aid" }   → see PS07, PS17, PS25, OP05, OP10
3. attd_upload_file × N            → upload cover + every gallery slide,
                                      collect their public URLs
4. attd_create_lecture {
     sessionId: "PS07",
     title: "...",
     transcript: "...",
     summary: "...",
     coverImage: "<cover url>",
     slides: [
       { imageUrl: "<slide-01 url>" },
       { imageUrl: "<slide-02 url>" },
       ...
     ]
   }
   → returns the public lecture URL + slidesInserted count
```

To extend an existing lecture's gallery later (e.g. you only had half the
slides at create time), use `attd_attach_slides_to_lecture { lectureId, slides[] }`.
That tool appends; to fully replace the gallery, use the REST PUT endpoint
with a complete `slides[]` array.

---

## 4. Idempotency model

**The API does not deduplicate.** `POST /api/ingest/lectures` always creates a new row, even when the same `(sessionId, title)` pair has already been ingested. This is intentional — server-side fuzzy upsert by title is risky because it can silently merge rows the operator meant to keep separate.

Idempotency lives **in the caller**:

- `scripts/ingest-attd-gemini.ts` computes a stable `clientRef = sha256(sessionId | normalized_title).slice(0,16)` (or honours one declared in the markdown frontmatter), embeds it in `tags` as `clientRef:<hash>`, then before each upload runs `GET /api/ingest/lectures?sessionId=…` and checks for an existing row with the same tag. Match → `PUT /api/ingest/lectures/[id]`. No match → POST.
- One-off MCP tool calls (`attd_create_lecture`) are NOT idempotent. They will create duplicates if invoked twice with the same arguments. For bulk operations always use the script.

To lock the idempotency key against future title edits, declare it explicitly in frontmatter:

```yaml
---
sessionId: PS07
clientRef: ps07-closed-loop-zino-2026
title: ...   # safe to edit; clientRef won't drift
---
```

The script honours frontmatter `clientRef` over the computed hash, and reviewed manifest entries carry their `clientRef` forward into subsequent runs.

---

## 5. Upload size limits

Per-file cap of **50 MB** by default. Override with the `INGEST_MAX_UPLOAD_MB` env var (any positive number, e.g. `100`).

- **JSON path** (`/api/ingest/upload` with `Content-Type: application/json`, or the MCP `attd_upload_file` tool): the cap applies to the decoded base64 size. The route also pre-checks the request `Content-Length` header and rejects with **413** before buffering.
- **Multipart path**: the cap applies **per file**, not to the request total. Five 8 MB files in one request is fine; one 60 MB file in any request is not.

Oversized requests return HTTP **413** with a JSON `{ error }` describing the limit.

---

## 6. Security notes

- The token gate is the only barrier; treat it like a database password.
- Rotate it by rotating `INGEST_API_TOKEN` on the server and re-distributing to clients.
- All writes are scoped to creating new rows — there is no MCP tool to delete or overwrite existing lectures yet, by design (use `/admin` for moderation).
- Reads are unauthenticated for the public agenda. The `attd_list_lectures` tool requires the bearer token because it can surface `isPublished=false` rows.

---

## 7. What's not in this version

- **No GitHub/Slack OAuth login.** Single shared bearer token only.
- **No lecture editing via MCP.** Only create + attach. Edits go through `/admin`.
- **No structured agenda for AOCE/ADA/Diabetes-AI yet.** Only ATTD 2026 has tracks/sessions wired up. The ingest endpoints accept other conferences (`AOCE2026`, `ADA2026`, `DIABETES_AI`) as a flat category — no track validation runs for those.
- **No SSE streaming.** The MCP server replies once per request; sufficient for tool calls.
