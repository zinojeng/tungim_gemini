import { LectureCard } from "@/components/LectureCard"
import { Button } from "@/components/ui/button"
import { Lecture } from "@/types"

// Mock data
const lectures: Lecture[] = [
  {
    id: "1",
    title: "2024 Updates in Heart Failure Management",
    provider: "TSIM",
    publishDate: new Date("2024-03-15"),
    status: "completed",
    sourceUrl: "",
    videoFileUrl: "",
    audioFileUrl: "",
    category: "Cardiology",
  },
  {
    id: "2",
    title: "Diabetes Mellitus: New Therapeutic Targets",
    provider: "NEJM",
    publishDate: new Date("2024-02-20"),
    status: "completed",
    sourceUrl: "",
    videoFileUrl: "",
    audioFileUrl: "",
    category: "Endocrinology",
  },
  {
    id: "3",
    title: "Approach to Hyponatremia in Emergency Setting",
    provider: "RSROC",
    publishDate: new Date("2024-01-10"),
    status: "processing",
    sourceUrl: "",
    videoFileUrl: "",
    audioFileUrl: "",
    category: "Nephrology",
  },
]

export default function Home() {
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
          <Button size="lg">Browse Lectures</Button>
          <Button variant="outline" size="lg">Upload Lecture</Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest Lectures</h2>
          <Button variant="link">View all</Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </section>
    </div>
  )
}
