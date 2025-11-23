import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { title, category } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        // Construct a prompt for a minimalist Nanobanana illustration
        const prompt = `A minimalist, flat design illustration of a cute banana character (Nanobanana) dressed as a doctor, representing the medical topic: "${title}". The style should be clean, modern, and minimalist with a solid or simple gradient background. No text in the image. High quality vector art style.`;

        console.log('Generating image with prompt:', prompt);

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "b64_json",
        });

        const imageBase64 = response.data?.[0]?.b64_json;
        if (!imageBase64) {
            throw new Error("No image generated");
        }

        // Ensure public/covers exists
        const coversDir = path.join(process.cwd(), 'public', 'covers');
        if (!fs.existsSync(coversDir)) {
            fs.mkdirSync(coversDir, { recursive: true });
        }

        const filename = `cover-${Date.now()}.png`;
        const filepath = path.join(coversDir, filename);

        // Save file
        const buffer = Buffer.from(imageBase64, 'base64');
        fs.writeFileSync(filepath, buffer);

        const imageUrl = `/covers/${filename}`;

        return NextResponse.json({ url: imageUrl });

    } catch (error: any) {
        console.error('Error generating image:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate image' }, { status: 500 });
    }
}
