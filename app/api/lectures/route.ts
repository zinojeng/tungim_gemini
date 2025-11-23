import { db } from '@/lib/db';
import { lectures } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const allLectures = await db.select().from(lectures);
        return NextResponse.json(allLectures);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch lectures' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, title } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const newLecture = await db.insert(lectures).values({
            title: title || 'New Lecture',
            sourceUrl: url,
            status: 'pending',
            publishDate: new Date(),
        }).returning();

        return NextResponse.json(newLecture[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create lecture' }, { status: 500 });
    }
}
