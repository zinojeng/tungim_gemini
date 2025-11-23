import { AudioPlayer } from "@/components/AudioPlayer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from '@/lib/db'
import { lectures, transcripts, summaries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLectureData(id: string) {
    try {
        const [lecture] = await db.select().from(lectures).where(eq(lectures.id, id))
        if (!lecture) return null

        const [transcript] = await db.select().from(transcripts).where(eq(transcripts.lectureId, id))
        const [summary] = await db.select().from(summaries).where(eq(summaries.lectureId, id))

        return { lecture, transcript, summary }
    } catch (error) {
        console.error('Error fetching lecture data:', error)
        return null
    }
}

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await getLectureData(id)

    if (!data) {
        notFound()
    }

    const { lecture, transcript, summary } = data

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Sidebar / Outline */}
            <aside className="w-80 border-r bg-muted/10 hidden md:flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="font-semibold">Outline</h2>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                            <Button variant="ghost" className="w-full justify-start h-auto whitespace-normal text-left bg-accent">
                                Summary
                            </Button>
                            {transcript && (
                                <Button variant="ghost" className="w-full justify-start h-auto whitespace-normal text-left">
                                    Transcript
                                </Button>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-6 pb-24">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            {lecture.category && (
                                <Badge className="mb-2">{lecture.category}</Badge>
                            )}
                            <h1 className="text-3xl font-bold mb-2">{lecture.title}</h1>
                            <p className="text-muted-foreground">
                                {lecture.provider || 'Unknown'} • {lecture.publishDate ? new Date(lecture.publishDate).toLocaleDateString() : 'Unknown Date'}
                            </p>
                        </div>

                        <Tabs defaultValue="summary">
                            <TabsList>
                                <TabsTrigger value="summary">Summary</TabsTrigger>
                                {transcript && <TabsTrigger value="transcript">Transcript</TabsTrigger>}
                            </TabsList>

                            <TabsContent value="summary" className="mt-6">
                                {summary ? (
                                    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-li:text-base prose-ul:my-4 prose-ol:my-4 prose-li:my-1">
                                        {summary.executiveSummary && (
                                            <div>
                                                <h2>Executive Summary</h2>
                                                <ReactMarkdown>{summary.executiveSummary}</ReactMarkdown>
                                            </div>
                                        )}

                                        {summary.keyTakeaways && Array.isArray(summary.keyTakeaways) && summary.keyTakeaways.length > 0 ? (
                                            <div>
                                                <h2>Key Takeaways</h2>
                                                <ul>
                                                    {summary.keyTakeaways.map((item: any, idx: number) => (
                                                        <li key={idx}>{String(item)}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {summary.fullMarkdownContent && (
                                            <div>
                                                <Separator className="my-8" />
                                                <ReactMarkdown>{summary.fullMarkdownContent}</ReactMarkdown>
                                            </div>
                                        )}
                                    </article>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>No summary available for this lecture.</p>
                                    </div>
                                )}
                            </TabsContent>

                            {transcript && (
                                <TabsContent value="transcript" className="mt-6">
                                    <article className="prose prose-slate dark:prose-invert max-w-none">
                                        <div className="whitespace-pre-wrap leading-relaxed text-base">
                                            {transcript.content || 'No transcript available.'}
                                        </div>
                                    </article>
                                </TabsContent>
                            )}
                        </Tabs>
                    </div>
                </div>
            </main>

            <AudioPlayer />
        </div>
    )
}
