import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const allSettings = await db.select().from(siteSettings);
        const settingsMap = allSettings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string | null>);

        return NextResponse.json(settingsMap);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const settingsToUpdate = Object.entries(body);

        for (const [key, value] of settingsToUpdate) {
            await db
                .insert(siteSettings)
                .values({ key, value: value as string })
                .onConflictDoUpdate({
                    target: siteSettings.key,
                    set: { value: value as string },
                });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
