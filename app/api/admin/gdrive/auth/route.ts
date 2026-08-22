import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getAuthUrl, exchangeCodeForTokens } from '@/lib/gdrive'

export const dynamic = 'force-dynamic'

function getRedirectUri(request: Request): string {
    const headersList = Object.fromEntries(new Headers(request.headers))
    const host = headersList['x-forwarded-host'] || headersList['host'] || new URL(request.url).host
    const proto = headersList['x-forwarded-proto'] || 'https'
    return `${proto}://${host}/api/admin/gdrive/auth`
}

// GET: Show auth URL or handle OAuth callback
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const redirectUri = getRedirectUri(request)

    // Step 2: Google redirected back with the authorization code
    if (code) {
        try {
            const tokens = await exchangeCodeForTokens(code, redirectUri)
            return new NextResponse(
                `<!DOCTYPE html>
<html><head><title>Google Drive Auth - Success</title>
<style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:20px;line-height:1.6}
code{background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:14px}
.token{background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;border-radius:8px;word-break:break-all;font-family:monospace;font-size:13px;margin:12px 0}
.warn{background:#fef3c7;border:1px solid #fde68a;padding:12px;border-radius:8px;margin:12px 0}</style>
</head><body>
<h1>Auth Successful!</h1>
<p>Add this refresh token to your environment variables:</p>
<p><strong>GOOGLE_REFRESH_TOKEN</strong></p>
<div class="token">${tokens.refresh_token}</div>
<div class="warn">Copy this token now and add it to Zeabur environment variables. This page will not be shown again.</div>
<h3>Required env vars summary:</h3>
<ul>
<li><code>GOOGLE_CLIENT_ID</code> - already set</li>
<li><code>GOOGLE_CLIENT_SECRET</code> - already set</li>
<li><code>GOOGLE_REFRESH_TOKEN</code> - the value above</li>
<li><code>GOOGLE_DRIVE_FOLDER_ID</code> - already set</li>
</ul>
</body></html>`,
                { headers: { 'Content-Type': 'text/html' } }
            )
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
    }

    // Step 1: Show auth link (clicking it redirects to Google, which redirects back here with ?code=)
    try {
        const authUrl = getAuthUrl(redirectUri)
        return new NextResponse(
            `<!DOCTYPE html>
<html><head><title>Google Drive Auth Setup</title>
<style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:20px;line-height:1.6}
code{background:#f1f5f9;padding:2px 8px;border-radius:4px;font-size:14px}
.step{background:#f8fafc;border:1px solid #e2e8f0;padding:16px;border-radius:8px;margin:16px 0}
a{color:#2563eb}
.note{background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px;margin:12px 0;font-size:14px}</style>
</head><body>
<h1>Google Drive OAuth Setup</h1>
<div class="step">
<h3>Step 1: Configure Google Cloud Console</h3>
<p>Make sure this <strong>exact</strong> redirect URI is added in your Google Cloud Console → Credentials → OAuth 2.0 Client → Authorized redirect URIs:</p>
<div class="note"><code>${redirectUri}</code></div>
</div>
<div class="step">
<h3>Step 2: Authorize</h3>
<p>Click the link below to authorize with your Google account. You will be redirected back here automatically.</p>
<p><a href="${authUrl}">Authorize Google Drive Access</a></p>
</div>
</body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
        )
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
