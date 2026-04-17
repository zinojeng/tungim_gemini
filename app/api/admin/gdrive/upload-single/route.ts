import { NextResponse } from 'next/server'
import { uploadLectureToDrive, formatGDriveError } from '@/lib/gdrive'

export async function POST(request: Request) {
    try {
        const { lectureId } = await request.json()

        if (!lectureId) {
            return NextResponse.json({ error: 'lectureId is required' }, { status: 400 })
        }

        const result = await uploadLectureToDrive(lectureId)

        return NextResponse.json(result, {
            status: result.success ? 200 : 207, // 207 Multi-Status if partial
        })
    } catch (error: any) {
        console.error('Google Drive upload error:', error)
        return NextResponse.json(
            { error: formatGDriveError(error) },
            { status: 500 }
        )
    }
}
