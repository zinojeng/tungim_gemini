import { NextResponse } from 'next/server';
import { aiPipeline } from '@/lib/ai-pipeline';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { lectureId } = body;

        if (!lectureId) {
            return NextResponse.json({ error: 'lectureId is required' }, { status: 400 });
        }

        // Trigger pipeline asynchronously (fire and forget)
        aiPipeline.processLecture(lectureId).catch(console.error);

        return NextResponse.json({ message: 'Processing started', lectureId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to trigger processing' }, { status: 500 });
    }
}
