import { LectureCard } from "@/components/LectureCard"
import { Button } from "@/components/ui/button"
import { Lecture } from "@/types"
import Link from "next/link"
import { db } from '@/lib/db'
import { lectures } from '@/db/schema'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLectures(): Promise<Lecture[]> {
  try {
    const allLectures = await db.select().from(lectures)
    return allLectures as Lecture[]
  } catch (error) {
    console.error('Error fetching lectures:', error)
    return []
  }
}

export default async function Home() {
  const lectureList = await getLectures()

  return (
    <div className="container py-8 space-y-10">
      <section className="flex flex-col items-center text-center space-y-4 py-12 md:py-24 bg-gradient-to-b from-background to-muted/20 rounded-3xl border">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Master Medical Knowledge <br className="hidden sm:inline" /> in Minutes
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          AI-powered summaries, slides, and transcripts for busy medical professionals.
          Turn hour-long lectures into 5-minute high-yield notes.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/lectures">Browse Lectures</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/admin">Upload Lecture</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest Lectures</h2>
          <Button variant="link" asChild>
            <Link href="/lectures">View all</Link>
          </Button>
        </div>
        {lectureList.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No lectures found. Upload your first lecture from the Admin page!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lectureList.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
