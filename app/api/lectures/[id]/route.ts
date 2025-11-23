import { db } from '@/lib/db';
import { lectures, transcripts, summaries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const [lecture] = await db.select().from(lectures).where(eq(lectures.id, id));

        if (!lecture) {
            return NextResponse.json({ error: 'Lecture not found' }, { status: 404 });
        }

        const [transcriptData] = await db.select().from(transcripts).where(eq(transcripts.lectureId, id));
        const [summaryData] = await db.select().from(summaries).where(eq(summaries.lectureId, id));

        return NextResponse.json({
            ...lecture,
            transcript: transcriptData?.content || '',
            summary: summaryData?.fullMarkdownContent || '', // Use fullMarkdownContent as the main summary content
            coverImage: lecture.coverImage || '',
        });
    } catch (error: any) {
        console.error('Error fetching lecture details:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch lecture' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, category, provider, transcript, summary, coverImage } = body;

        // Update lecture
        await db.update(lectures)
            .set({
                title,
                category,
                provider,
                coverImage,
            })
            .where(eq(lectures.id, id));

        // Update transcript if provided
        if (transcript !== undefined) {
            const [existingTranscript] = await db.select().from(transcripts).where(eq(transcripts.lectureId, id));

            if (existingTranscript) {
                await db.update(transcripts)
                    .set({ content: transcript })
                    .where(eq(transcripts.lectureId, id));
            } else if (transcript) {
                await db.insert(transcripts).values({
                    lectureId: id,
                    content: transcript,
                    segments: [],
                });
            }
        }

        // Update summary if provided
        if (summary !== undefined) {
            const [existingSummary] = await db.select().from(summaries).where(eq(summaries.lectureId, id));

            if (existingSummary) {
                await db.update(summaries)
                    .set({
                        fullMarkdownContent: summary, // Only save to fullMarkdownContent
                    })
                    .where(eq(summaries.lectureId, id));
            } else if (summary) {
                await db.insert(summaries).values({
                    lectureId: id,
                    executiveSummary: null, // Don't duplicate content
                    fullMarkdownContent: summary, // Only save to fullMarkdownContent
                    keyTakeaways: [],
                    tags: [category || 'General'],
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error updating lecture:', error);
        return NextResponse.json({ error: error.message || 'Failed to update lecture' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Delete related records first (foreign key constraints)
        await db.delete(transcripts).where(eq(transcripts.lectureId, id));
        await db.delete(summaries).where(eq(summaries.lectureId, id));

        // Delete the lecture
        await db.delete(lectures).where(eq(lectures.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting lecture:', error);
        return NextResponse.json({ error: error.message || 'Failed to delete lecture' }, { status: 500 });
    }
}
