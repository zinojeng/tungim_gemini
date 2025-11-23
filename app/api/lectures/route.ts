import { db } from '@/lib/db';
import { lectures, transcripts, summaries } from '@/db/schema';
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
        const {
            url,
            title,
            category,
            provider,
            publishDate,
            // Manual import fields
            transcript,
            summary,
            keyTakeaways
        } = body;

        // Allow creation if either URL is present OR it's a manual import with a title
        if (!url && !title) {
            return NextResponse.json({ error: 'URL or Title is required' }, { status: 400 });
        }

        // 1. Create Lecture
        const newLecture = await db.insert(lectures).values({
            title: title || 'New Lecture',
            sourceUrl: url || null,
            provider: provider || 'Manual Import',
            category: category || 'Uncategorized',
            status: 'completed', // Manual import is immediately completed
            publishDate: publishDate ? new Date(publishDate) : new Date(),
        }).returning();

        const lectureId = newLecture[0].id;

        // 2. Create Transcript if provided
        if (transcript) {
            await db.insert(transcripts).values({
                lectureId,
                content: transcript,
                segments: [], // Empty segments for manual text
            });
        }

        // 3. Create Summary if provided
        if (summary) {
            await db.insert(summaries).values({
                lectureId,
                executiveSummary: summary,
                keyTakeaways: keyTakeaways ? JSON.parse(keyTakeaways) : [],
                fullMarkdownContent: summary, // Use summary as full content for now
                tags: [category || 'General'],
            });
        }

        return NextResponse.json(newLecture[0]);
    } catch (error) {
        console.error('Error creating lecture:', error);
        return NextResponse.json({ error: 'Failed to create lecture' }, { status: 500 });
    }
}
