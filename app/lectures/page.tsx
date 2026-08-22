import { LectureCard } from "@/components/LectureCard"
import { Lecture } from "@/types"
import { db } from '@/lib/db'
import { lectures } from '@/db/schema'

import { eq, desc, ilike, or, and } from 'drizzle-orm'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLectures(query?: string): Promise<Lecture[]> {
    try {
        let conditions = eq(lectures.isPublished, true);

        if (query) {
            const searchCondition = or(
                ilike(lectures.title, `%${query}%`),
                ilike(lectures.category, `%${query}%`),
                ilike(lectures.subcategory, `%${query}%`)
            );
            conditions = and(conditions, searchCondition)!;
        }

        const allLectures = await db.select()
            .from(lectures)
            .where(conditions)
            .orderBy(desc(lectures.publishDate))

        return allLectures as Lecture[]
    } catch (error) {
        console.error('Error fetching lectures:', error)
        return []
    }
}

export default async function LecturesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { search } = await searchParams
    const query = typeof search === 'string' ? search : undefined
    const lectureList = await getLectures(query)

    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    {query ? `Search Results for "${query}"` : 'All Lectures'}
                </h1>
                <p className="text-muted-foreground">
                    {query
                        ? `Found ${lectureList.length} lecture${lectureList.length === 1 ? '' : 's'}`
                        : 'Browse all available medical lectures'
                    }
                </p>
                {query && (
                    <a href="/lectures" className="text-sm text-primary hover:underline mt-2 inline-block">
                        Clear search
                    </a>
                )}
            </div>

            {lectureList.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No lectures found matching your criteria.</p>
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
