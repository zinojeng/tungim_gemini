import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
