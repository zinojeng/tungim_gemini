# Authentication setup (Auth.js / NextAuth v5)

User accounts are powered by **Auth.js (NextAuth v5)** with the **Drizzle adapter** on
the existing Postgres database. Sign-in methods: **email + password** (bcrypt) and
**Google**. New email accounts must confirm their address via a link emailed by **Resend**
before they can sign in. Free visitors can browse conference agendas/outlines; reading a
talk's full transcript and slide notes requires a (free) signed-in account — see
`app/lectures/[id]/page.tsx` and `components/auth/LectureGate.tsx`.

## 1. Database

The schema in `db/schema.ts` adds `accounts`, `sessions`, `verification_tokens` and extra
columns on `users` (`name`, `email_verified`, `image`, `password_hash`, `created_at`).
Apply it the same way as the rest of the schema:

```bash
npm run db:push
```

This is additive — no existing columns or data are removed.

## 2. Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `AUTH_SECRET` | yes | `openssl rand -base64 33`. Used to sign session JWTs. |
| `AUTH_URL` | **yes in production** | Public origin, e.g. `https://mednote.zeabur.app`. Auth email links are built from this (or `NEXT_PUBLIC_APP_URL`) — never from request headers — so the email routes throw in production if neither is set. We also set `trustHost: true` for the OAuth callback host. |
| `AUTH_GOOGLE_ID` | for Google | OAuth client ID from Google Cloud Console. |
| `AUTH_GOOGLE_SECRET` | for Google | OAuth client secret. |
| `RESEND_API_KEY` | for email | From resend.com. Without it, verification/reset links are only logged to the server console (dev fallback). |
| `EMAIL_FROM` | for email | e.g. `MedNote AI <noreply@yourdomain>`. Defaults to `onboarding@resend.dev`. |
| `NEXT_PUBLIC_APP_URL` | optional | Fallback base URL for building email links if `AUTH_URL` is unset. |

`DATABASE_URL` is already configured for the app.

## 3. Google OAuth redirect URI

In Google Cloud Console → Credentials → your OAuth client, add:

```
https://YOUR_DOMAIN/api/auth/callback/google
http://localhost:3000/api/auth/callback/google   # for local dev
```

## 4. Flows

- **Register** — `POST /api/auth/register` (`{ name, email, password }`) creates the user
  (unverified) and emails a confirmation link to `/api/auth/verify-email?...`. Re-registering
  an unverified email just re-sends the link.
- **Confirm** — `GET /api/auth/verify-email?token=...&email=...` sets `email_verified` and
  redirects to `/login?verified=1`.
- **Login** — `/login` page → `signIn('credentials' | 'google')`. Credentials sign-in is
  rejected until the email is confirmed.
- **Forgot / reset password** — `/forgot-password` → `POST /api/auth/forgot-password` emails
  a link to `/reset-password?token=...&email=...` → `POST /api/auth/reset-password`.

## 5. Admin

Promote a user by setting `users.role = 'admin'`. The role is exposed on the session
(`session.user.role`) and surfaces an "Admin" link in the navbar dropdown. The legacy
shared-password screen at `app/admin/page.tsx` (`POST /api/auth/login`) is unchanged, **but
the lecture editing API it calls is now protected**: `GET /api/lectures/[id]` requires any
signed-in user, and `PUT`/`DELETE /api/lectures/[id]` require `role = 'admin'`. So an admin
now needs to (a) register + confirm email, (b) be promoted to `admin`, and (c) be signed in
via NextAuth — in addition to the existing admin password — to edit/delete lectures.

## 6. Known limitations / follow-ups

- **Sessions are JWT-based**, so changing a password (or `role`) does not revoke already-issued
  session cookies; they remain valid until expiry (default 30 days). If you need immediate
  revocation, add a `passwordChangedAt` column and compare it in the `jwt` callback (costs a
  DB read per request), or switch to database sessions.
- No rate limiting on `/api/auth/*` — add one (e.g. per-IP) before exposing this publicly to
  blunt credential stuffing and email-bombing.
- `AUTH_URL` (or `NEXT_PUBLIC_APP_URL`) **must** be set in production — auth email links
  intentionally refuse to use the request `Host`/`Origin` header.
