import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lectures, transcripts, slides, summaries, siteSettings } from '@/db/schema'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const [
            allLectures,
            allTranscripts,
            allSlides,
            allSummaries,
            allSettings
        ] = await Promise.all([
            db.select().from(lectures),
            db.select().from(transcripts),
            db.select().from(slides),
            db.select().from(summaries),
            db.select().from(siteSettings)
        ])

        const exportData = {
            timestamp: new Date().toISOString(),
            lectures: allLectures,
            transcripts: allTranscripts,
            slides: allSlides,
            summaries: allSummaries,
            siteSettings: allSettings
        }

        return new NextResponse(JSON.stringify(exportData, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="imwebsite-backup-${new Date().toISOString().split('T')[0]}.json"`
            }
        })
    } catch (error) {
        console.error('Export failed:', error)
        return NextResponse.json(
            { error: 'Failed to export data' },
            { status: 500 }
        )
    }
}
