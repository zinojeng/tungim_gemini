import { LectureCard } from "@/components/LectureCard"
import { Button } from "@/components/ui/button"
import { Lecture } from "@/types"
import Link from "next/link"
import { db } from '@/lib/db'
import { siteSettings, lectures } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getData() {
  try {
    const allLectures = await db.select().from(lectures)
    const settings = await db.select().from(siteSettings)

    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string | null>)

    return {
      lectures: allLectures as Lecture[],
      settings: settingsMap
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { lectures: [], settings: {} }
  }
}

export default async function Home() {
  const { lectures: lectureList, settings } = await getData()

  const heroTitle = settings['hero_title'] || "Master Medical Knowledge in Minutes"
  const heroDescription = settings['hero_description'] || "AI-powered summaries, slides, and transcripts for busy medical professionals. Turn hour-long lectures into 5-minute high-yield notes."

  return (
    <div className="container py-8 space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-24">
        <div className="flex flex-col items-start text-left space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary whitespace-pre-line">
            {heroTitle}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl whitespace-pre-line">
            {heroDescription}
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/lectures">Browse Lectures</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <img
              src="/nanobanana.png"
              alt="Dr. Nanobanana"
              className="object-contain w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
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
