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
    title: '2026 ADA Standards of Care — 糖尿病治療指引 | MedNote AI',
    description: '2026 ADA 糖尿病照護標準完整解析，涵蓋血糖控制、藥物治療、併發症管理及特殊族群照護等章節。',
    openGraph: {
        title: '2026 ADA Standards of Care — 糖尿病治療指引',
        description: '2026 ADA 糖尿病照護標準完整解析，涵蓋血糖控制、藥物治療、併發症管理及特殊族群照護等章節。',
        url: `${SITE_URL}/ada-2026`,
        siteName: 'MedNote AI',
        images: [{
            url: `${SITE_URL}/og-ada-2026.png`,
            width: 2752,
            height: 1536,
            alt: '2026 ADA 糖尿病治療指引',
        }],
        locale: 'zh_TW',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 ADA Standards of Care — 糖尿病治療指引',
        description: '2026 ADA 糖尿病照護標準完整解析，涵蓋血糖控制、藥物治療、併發症管理及特殊族群照護等章節。',
        images: [`${SITE_URL}/og-ada-2026.png`],
    },
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getADAContent() {
    try {
        const [setting] = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, 'ada_2026_content'))

        return setting?.value || ""
    } catch (error) {
        console.error('Error fetching ADA content:', error)
        return ""
    }
}

async function getADALectures(): Promise<Lecture[]> {
    try {
        const adaLectures = await db
            .select()
            .from(lectures)
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, '2026 ADA')
                )
            )
            .orderBy(desc(lectures.publishDate))

        return adaLectures as Lecture[]
    } catch (error) {
        console.error('Error fetching ADA lectures:', error)
        return []
    }
}

export default async function ADAPage() {
    const content = await getADAContent()
    const adaLectures = await getADALectures()

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
                {adaLectures.length > 0 && (() => {
                    const recentLectures = adaLectures.slice(0, 5)
                    const olderLectures = adaLectures.slice(5)
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
