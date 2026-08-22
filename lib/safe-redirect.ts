function hasControlChar(value: string): boolean {
    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i)
        if (code < 0x20 || code === 0x7f) return true
    }
    return false
}

/**
 * Sanitise a user-supplied post-auth redirect target. Returns a same-origin
 * relative path (starts with a single "/", no scheme, no protocol-relative
 * "//", no backslashes, no control chars) or the given fallback. Safe for use
 * on the client and the server (no Node-only deps).
 */
export function safeCallbackPath(raw: string | null | undefined, fallback = '/'): string {
    if (!raw) return fallback
    let value = raw.trim()
    try {
        value = decodeURIComponent(value)
    } catch {
        return fallback
    }
    if (!value.startsWith('/')) return fallback
    if (value.startsWith('//')) return fallback
    if (value.includes('\\')) return fallback
    if (hasControlChar(value)) return fallback
    return value
}
