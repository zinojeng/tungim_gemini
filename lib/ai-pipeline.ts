import { db } from '@/lib/db';
import { lectures, transcripts, slides, summaries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export class AIPipeline {
    async processLecture(lectureId: string) {
        console.log(`[AI Pipeline] Starting processing for lecture ${lectureId}`);

        // 1. Update status to processing
        await db.update(lectures).set({ status: 'processing' }).where(eq(lectures.id, lectureId));

        try {
            // 2. Mock Whisper Transcription
            console.log(`[AI Pipeline] Transcribing audio...`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            await db.insert(transcripts).values({
                lectureId,
                content: "This is a mock transcript of the medical lecture...",
                segments: [{ start: 0, end: 10, text: "Welcome to the lecture." }]
            });

            // 3. Mock Slide Analysis (OCR + Vision)
            console.log(`[AI Pipeline] Analyzing slides...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await db.insert(slides).values({
                lectureId,
                timestampSeconds: 60,
                imageUrl: "https://example.com/slide1.jpg",
                ocrText: "Heart Failure Guidelines 2024",
                aiSummary: "Slide discusses new guidelines."
            });

            // 4. Mock Summarization (GPT-4o)
            console.log(`[AI Pipeline] Generating summary...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await db.insert(summaries).values({
                lectureId,
                executiveSummary: "This lecture covers the 2024 Heart Failure guidelines.",
                keyTakeaways: ["SGLT2i for HFpEF", "Rapid titration"],
                fullMarkdownContent: "# 2024 Updates\n\n## Introduction\n..."
            });

            // 5. Update status to completed
            await db.update(lectures).set({ status: 'completed' }).where(eq(lectures.id, lectureId));
            console.log(`[AI Pipeline] Processing complete for lecture ${lectureId}`);

        } catch (error) {
            console.error(`[AI Pipeline] Error processing lecture ${lectureId}:`, error);
            await db.update(lectures).set({ status: 'failed' }).where(eq(lectures.id, lectureId));
        }
    }
}

export const aiPipeline = new AIPipeline();
