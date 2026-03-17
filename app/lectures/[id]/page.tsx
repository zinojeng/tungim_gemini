import type { Metadata, ResolvingMetadata } from 'next'
import { db } from '@/lib/db'
import { lectures, transcripts, summaries, slides } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { LectureClient } from './LectureClient'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLectureData(id: string) {
    try {
        const [lecture] = await db.select().from(lectures).where(eq(lectures.id, id))
        if (!lecture) return null

        const [transcript] = await db.select().from(transcripts).where(eq(transcripts.lectureId, id))
        const [summary] = await db.select().from(summaries).where(eq(summaries.lectureId, id))
        const slidesData = await db.select().from(slides).where(eq(slides.lectureId, id))

        // Sort slides by filename, ignoring the timestamp prefix added by Zeabur
        slidesData.sort((a, b) => {
            const getCleanName = (url: string | null) => {
                if (!url) return '';
                const filename = url.split('/').pop() || '';
                // Remove timestamp prefix (e.g., "1770133550887-")
                return filename.replace(/^\d+-/, '');
            }

            const nameA = getCleanName(a.imageUrl);
            const nameB = getCleanName(b.imageUrl);

            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });

        return { lecture, transcript, summary, slides: slidesData }
    } catch (error) {
        console.error('Error fetching lecture data:', error)
        return null
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params
    const data = await getLectureData(id)

    if (!data || !data.lecture) {
        return {
            title: 'Lecture Not Found',
        }
    }

    const { lecture, summary, slides } = data

    const title = lecture.title || 'Lecture'
    const description = summary?.executiveSummary || 'AI-powered medical lecture notes.'
    
    // Determine the best image for og:image.
    // 1. lecture.coverImage (if available)
    // 2. slides[0].imageUrl (if available)
    // Absolute URLs should be used. The Image URLs in DB are expected to be absolute (from cloud storage).
    const imageUrl = lecture.coverImage || (slides && slides.length > 0 ? slides[0].imageUrl : null)
    
    const previousImages = (await parent).openGraph?.images || []
    const images = imageUrl ? [imageUrl, ...previousImages] : previousImages

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images,
            type: 'article',
            publishedTime: lecture.publishDate ? new Date(lecture.publishDate).toISOString() : undefined,
            authors: lecture.provider ? [lecture.provider] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        }
    }
}

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await getLectureData(id)

    if (!data) {
        notFound()
    }

    return <LectureClient {...data} />
}
