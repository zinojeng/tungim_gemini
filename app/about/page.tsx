import { db } from '@/lib/db'
import { siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAboutContent() {
    try {
        const [setting] = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, 'about_content'))

        return setting?.value || ""
    } catch (error) {
        console.error('Error fetching about content:', error)
        return ""
    }
}

export default async function AboutPage() {
    const content = await getAboutContent()

    // Default content if DB is empty
    const displayContent = content || `
# 關於 MedNote AI

**MedNote AI** 是一個專為忙碌的內科醫師與醫療專業人員設計的知識萃取平台。我們利用 AI 技術，將醫療演講影音自動轉換為結構化筆記、投影片重點分析與逐字稿，讓您能在 5 分鐘內掌握 1 小時演講的精華。

## 核心價值

*   **Time-Saving**: 1小時的演講濃縮為 5 分鐘的高品質閱讀體驗
*   **Accuracy**: 針對醫療專有名詞優化的轉錄
*   **Visual**: 投影片與文字內容的自動對應

## 技術架構

本平台採用 Next.js 14、PostgreSQL、Drizzle ORM 與 OpenAI API 構建，部署於 Zeabur 雲端平台，提供快速、穩定的服務。

## 聯絡我們

如有任何問題或建議，歡迎透過 GitHub 或 Email 與我們聯繫。
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
