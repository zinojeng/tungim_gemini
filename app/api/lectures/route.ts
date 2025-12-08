import { db } from '@/lib/db';
import { lectures, transcripts, summaries } from '@/db/schema';
import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        const allLectures = await db.select().from(lectures).orderBy(desc(lectures.publishDate));
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
            subcategory, // Add subcategory
            tags, // Add tags
            provider,
            publishDate,
            coverImage, // Add coverImage
            isPublished, // Add isPublished
            // Manual import fields
            transcript,
            summary,
            keyTakeaways
        } = body;

        console.log('Received body:', body);

        // Allow creation if either URL is present OR it's a manual import with a title
        if (!url && !title) {
            return NextResponse.json({ error: 'URL or Title is required' }, { status: 400 });
        }

        console.log('Inserting lecture...');
        // 1. Create Lecture
        const newLecture = await db.insert(lectures).values({
            title: title || 'New Lecture',
            sourceUrl: url ? url : null, // Ensure empty string becomes null
            provider: provider || 'Manual Import',
            category: category || 'Uncategorized',
            subcategory: subcategory || null, // Add subcategory
            tags: tags || [], // Add tags
            coverImage: coverImage || null, // Add coverImage
            status: 'completed', // Manual import is immediately completed
            isPublished: isPublished !== undefined ? isPublished : true, // Default to true
            publishDate: publishDate ? new Date(publishDate) : new Date(),
        }).returning();

        console.log('Lecture created:', newLecture[0]);
        const lectureId = newLecture[0].id;

        // 2. Create Transcript if provided
        if (transcript) {
            console.log('Inserting transcript...');
            await db.insert(transcripts).values({
                lectureId,
                content: transcript,
                segments: [], // Empty segments for manual text
            });
        }

        // 3. Create Summary if provided
        if (summary) {
            console.log('Inserting summary...');
            await db.insert(summaries).values({
                lectureId,
                executiveSummary: null, // Don't duplicate content
                keyTakeaways: keyTakeaways ? JSON.parse(keyTakeaways) : [],
                fullMarkdownContent: summary, // Only save to fullMarkdownContent
                tags: [category || 'General'],
            });
        }

        console.log('Success!');
        return NextResponse.json(newLecture[0]);
    } catch (error: any) {
        console.error('Error creating lecture:', error);
        // Log the full error object to see stack trace in Zeabur logs
        console.error(JSON.stringify(error, null, 2));
        return NextResponse.json({ error: error.message || 'Failed to create lecture' }, { status: 500 });
    }
}
