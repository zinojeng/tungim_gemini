import { db } from '@/lib/db'
import { siteSettings, lectures } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { LectureCard } from "@/components/LectureCard"
import { Lecture } from "@/types"
import type { Metadata } from 'next'

const SITE_URL = 'https://mednote.zeabur.app'

export const metadata: Metadata = {
    title: 'AOCE 2026 | MedNote AI',
    description: 'AOCE 2026 相關講座與資源。',
    openGraph: {
        title: 'AOCE 2026',
        description: 'AOCE 2026 相關講座與資源。',
        url: `${SITE_URL}/aoce-2026`,
        siteName: 'MedNote AI',
        locale: 'zh_TW',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AOCE 2026',
        description: 'AOCE 2026 相關講座與資源。',
    },
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAOCEContent() {
    try {
        const [setting] = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, 'aoce_2026_content'))

        return setting?.value || ""
    } catch (error) {
        console.error('Error fetching AOCE content:', error)
        return ""
    }
}

async function getAOCELectures(): Promise<Lecture[]> {
    try {
        const aoceLectures = await db
            .select()
            .from(lectures)
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, 'AOCE2026')
                )
            )
            .orderBy(desc(lectures.publishDate))

        return aoceLectures as Lecture[]
    } catch (error) {
        console.error('Error fetching AOCE lectures:', error)
        return []
    }
}

export default async function AOCEPage() {
    const content = await getAOCEContent()
    const aoceLectures = await getAOCELectures()

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
                {aoceLectures.length > 0 && (() => {
                    const recentLectures = aoceLectures.slice(0, 5)
                    const olderLectures = aoceLectures.slice(5)
                    return (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {recentLectures.map((lecture) => (
                                    <LectureCard key={lecture.id} lecture={lecture} />
                                ))}
                            </div>
                            {olderLectures.length > 0 && (
                                <>
                                    <hr className="my-8 border-border" />
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {olderLectures.map((lecture) => (
                                            <LectureCard key={lecture.id} lecture={lecture} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )
                })()}
            </div>
        </div>
    )
}
