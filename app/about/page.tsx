export default function AboutPage() {
    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">關於 MediNote AI</h1>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">專案簡介</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        MediNote AI 是一個專為忙碌的內科醫師與醫療專業人員設計的知識萃取平台。
                        我們利用 AI 技術，將醫療演講影音自動轉換為結構化筆記、投影片重點分析與逐字稿，
                        讓您能在 5 分鐘內掌握 1 小時演講的精華。
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">核心價值</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Time-Saving</strong>: 1小時的演講濃縮為 5 分鐘的高品質閱讀體驗</li>
                        <li><strong>Accuracy</strong>: 針對醫療專有名詞優化的轉錄</li>
                        <li><strong>Visual</strong>: 投影片與文字內容的自動對應</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">技術架構</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        本平台採用 Next.js 14、PostgreSQL、Drizzle ORM 與 OpenAI API 構建，
                        部署於 Zeabur 雲端平台，提供快速、穩定的服務。
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">聯絡我們</h2>
                    <p className="text-muted-foreground">
                        如有任何問題或建議，歡迎透過 GitHub 或 Email 與我們聯繫。
                    </p>
                </section>
            </div>
        </div>
    )
}
