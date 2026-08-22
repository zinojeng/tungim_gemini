import { NextResponse } from 'next/server'
import { checkGDriveStatus } from '@/lib/gdrive'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const status = await checkGDriveStatus()
        return NextResponse.json(status)
    } catch (error: any) {
        return NextResponse.json(
            { connected: false, error: error.message },
            { status: 500 }
        )
    }
}
