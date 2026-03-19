import { NextResponse } from 'next/server'
import { uploadAllLecturesToDrive } from '@/lib/gdrive'

export const maxDuration = 300 // 5 minutes for batch upload

export async function POST() {
    try {
        const result = await uploadAllLecturesToDrive()

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Google Drive batch upload error:', error)
        return NextResponse.json(
            { error: error.message || 'Batch upload to Google Drive failed' },
            { status: 500 }
        )
    }
}
