import { db } from '@/lib/db'
import { siteSettings, lectures } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { LectureCard } from "@/components/LectureCard"
import { Lecture } from "@/types"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getDiabetesAIContent() {
    try {
        const [setting] = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, 'diabetes_ai_content'))

        return setting?.value || ""
    } catch (error) {
        console.error('Error fetching Diabetes AI content:', error)
        return ""
    }
}

async function getDiabetesAILectures(): Promise<Lecture[]> {
    try {
        const aiLectures = await db
            .select()
            .from(lectures)
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, 'Diabetes AI')
                )
            )
            .orderBy(desc(lectures.publishDate))

        return aiLectures as Lecture[]
    } catch (error) {
        console.error('Error fetching Diabetes AI lectures:', error)
        return []
    }
}

export default async function DiabetesAIPage() {
    const content = await getDiabetesAIContent()
    const aiLectures = await getDiabetesAILectures()

    // Default content if DB is empty
    const displayContent = content || ""

    return (
        <div className="container py-10 max-w-4xl">
            <div className="prose dark:prose-invert max-w-none mb-12">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {displayContent}
                </ReactMarkdown>
            </div>

            <div className="space-y-6">
                <div className="space-y-6">
                    {aiLectures.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {aiLectures.map((lecture) => (
                                <LectureCard key={lecture.id} lecture={lecture} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
