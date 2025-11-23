import { LectureCard } from "@/components/LectureCard"
import { Lecture } from "@/types"
import { db } from '@/lib/db'
import { lectures } from '@/db/schema'

async function getLectures(): Promise<Lecture[]> {
    try {
        const allLectures = await db.select().from(lectures)
        return allLectures as Lecture[]
    } catch (error) {
        console.error('Error fetching lectures:', error)
        return []
    }
}

export default async function LecturesPage() {
    const lectureList = await getLectures()

    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">All Lectures</h1>
                <p className="text-muted-foreground">
                    Browse all available medical lectures
                </p>
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
        </div>
    )
}
