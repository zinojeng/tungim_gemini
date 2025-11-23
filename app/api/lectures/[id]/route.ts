import { db } from '@/lib/db';
import { lectures, transcripts, summaries, slides } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, category, provider, transcript, summary } = body;

        // Update lecture
        await db.update(lectures)
            .set({
                title,
                category,
                provider,
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
                        executiveSummary: summary,
                        fullMarkdownContent: summary,
                    })
                    .where(eq(summaries.lectureId, id));
            } else if (summary) {
                await db.insert(summaries).values({
                    lectureId: id,
                    executiveSummary: summary,
                    fullMarkdownContent: summary,
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
        await db.delete(slides).where(eq(slides.lectureId, id));

        // Delete the lecture
        await db.delete(lectures).where(eq(lectures.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting lecture:', error);
        return NextResponse.json({ error: error.message || 'Failed to delete lecture' }, { status: 500 });
    }
}
