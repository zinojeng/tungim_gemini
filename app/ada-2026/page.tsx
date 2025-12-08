import { db } from '@/lib/db'
import { siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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

export default async function ADAPage() {
    const content = await getADAContent()

    // Default content if DB is empty
    const displayContent = content || `
# 2026 ADA 糖尿病治療指引

目前尚未有內容。請至後台編輯。
`

    return (
        <div className="container py-10 max-w-4xl">
            <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {displayContent}
                </ReactMarkdown>
            </div>
        </div>
    )
}
