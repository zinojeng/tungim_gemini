import { db } from '@/lib/db';
import { lectures, transcripts, summaries, slides } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

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
