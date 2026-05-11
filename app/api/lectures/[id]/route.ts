import { db } from '@/lib/db';
import { lectures, transcripts, summaries, slides } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Full transcript/slides are members-only — mirror the page-level gate
        // in app/lectures/[id]/page.tsx so the API can't be used to bypass it.
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Sign in to view this lecture.' }, { status: 401 });
        }

        const { id } = await params;

        const [lecture] = await db.select().from(lectures).where(eq(lectures.id, id));

        // Unpublished lectures are admin-only — mirror the page loader, which
        // 404s them for everyone else.
        if (!lecture || (lecture.isPublished === false && session.user.role !== 'admin')) {
            return NextResponse.json({ error: 'Lecture not found' }, { status: 404 });
        }

        const [transcriptData] = await db.select().from(transcripts).where(eq(transcripts.lectureId, id));
        const [summaryData] = await db.select().from(summaries).where(eq(summaries.lectureId, id));
        const slidesData = await db.select().from(slides).where(eq(slides.lectureId, id));

        return NextResponse.json({
            ...lecture,
            transcript: transcriptData?.content || '',
            summary: summaryData?.fullMarkdownContent || '', // Use fullMarkdownContent as the main summary content
            coverImage: lecture.coverImage || '',
            slides: slidesData || [],
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
        const session = await auth();
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, category, subcategory, tags, provider, transcript, summary, coverImage, isPublished, pdfUrl, slides: newSlides } = body;

        // Update lecture
        await db.update(lectures)
            .set({
                title,
                category,
                subcategory,
                tags,
                provider,
                coverImage,
                isPublished,
                pdfUrl, // Add pdfUrl
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

        // Update slides if provided
        if (newSlides !== undefined && Array.isArray(newSlides)) {
            // Delete existing slides
            await db.delete(slides).where(eq(slides.lectureId, id));

            // Insert new slides
            if (newSlides.length > 0) {
                await db.insert(slides).values(
                    newSlides.map((slide: any) => ({
                        lectureId: id,
                        imageUrl: slide.imageUrl,
                        timestampSeconds: slide.timestampSeconds || 0,
                    }))
                );
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
        const session = await auth();
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
        }

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
