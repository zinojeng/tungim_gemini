import { NextResponse } from 'next/server'
import { uploadAllLecturesToDrive, formatGDriveError } from '@/lib/gdrive'

export const maxDuration = 300 // 5 minutes for batch upload

export async function POST() {
    try {
        const result = await uploadAllLecturesToDrive()

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Google Drive batch upload error:', error)
        return NextResponse.json(
            { error: formatGDriveError(error) },
            { status: 500 }
        )
    }
}
