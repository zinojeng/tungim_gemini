import { db } from '@/lib/db'
import { lectures } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { Lecture } from '@/types'
import type { Metadata } from 'next'
import { AttdHero } from '@/components/attd/AttdHero'
import { AttdAgendaBoard } from '@/components/attd/AttdAgendaBoard'
import { ATTD_2026_META } from '@/lib/attd2026-agenda'

const SITE_URL = 'https://mednote.zeabur.app'

export const metadata: Metadata = {
    title: 'ATTD 2026 — Conference Companion | MedNote AI',
    description:
        'Topic-first companion to the 19th International ATTD Conference (Barcelona, 11–14 March 2026). Browse the agenda by track and read transcripts and slide notes attached to each session.',
    openGraph: {
        title: 'ATTD 2026 — Conference Companion',
        description:
            'Topic-first companion to the 19th International ATTD Conference (Barcelona, 11–14 March 2026).',
        url: `${SITE_URL}/attd-2026`,
        siteName: 'MedNote AI',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ATTD 2026 — Conference Companion',
        description:
            'Topic-first companion to the 19th International ATTD Conference (Barcelona, 11–14 March 2026).',
    },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAttdLectures(): Promise<Lecture[]> {
    try {
        const rows = await db
            .select()
            .from(lectures)
            .where(
                and(
                    eq(lectures.isPublished, true),
                    eq(lectures.category, 'ATTD2026'),
                ),
            )
            .orderBy(desc(lectures.publishDate))
        return rows as Lecture[]
    } catch (error) {
        console.error('Error fetching ATTD lectures:', error)
        return []
    }
}

export default async function AttdPage() {
    const attdLectures = await getAttdLectures()

    return (
        <div className="container py-8 md:py-10 max-w-6xl space-y-8">
            <AttdHero talksIndexed={attdLectures.length} />
            <AttdAgendaBoard lectures={attdLectures} />

            <footer className="pt-6 mt-12 border-t text-xs text-foreground/50">
                <p>
                    Agenda data parsed from the official ATTD 2026 timetable (
                    <a
                        href={ATTD_2026_META.timetablePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                    >
                        PDF
                    </a>
                    ). Session details and speakers update from{' '}
                    <a
                        href={ATTD_2026_META.agendaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                    >
                        cslide
                    </a>
                    .
                </p>
            </footer>
        </div>
    )
}
