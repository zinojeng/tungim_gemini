import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, buildAdminToken } from '@/lib/admin-auth';

const ADMIN_PASSWORD = process.env.PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = buildAdminToken();
        if (!token) {
            return NextResponse.json(
                { error: 'Admin sign-in is unavailable: AUTH_SECRET is not configured.' },
                { status: 503 },
            );
        }

        const res = NextResponse.json({ success: true });
        res.cookies.set(ADMIN_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: ADMIN_COOKIE_MAX_AGE,
        });
        return res;
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
