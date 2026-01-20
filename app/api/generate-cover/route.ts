import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GOOGLE_API_KEY is not configured' }, { status: 500 });
        }

        const { title, category, summary, transcript, promptTemplate = 'infographic', customPrompt } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        // Construct object description from available data
        let objectDescription = title;
        if (category) objectDescription += ` related to ${category}`;
        if (summary) {
            const summarySnippet = summary.slice(0, 150).trim();
            if (summarySnippet) objectDescription += `. Key concept: ${summarySnippet}`;
        }

        // Prompt templates
        const templates: Record<string, string> = {
            figurine: `Create a realistic medical concept figurine representing "${objectDescription}" with incredibly detailed textures. The figurine should capture the essence of the medical topic with symbolic elements. Place on a clean, professional base with subtle medical-themed elements (microscopic patterns, DNA helixes, or cellular structures). The figurine has a modern, collectible aesthetic. Studio lighting, high detail, professional photography. NO TEXT visible in the image.`,

            plush: `A soft, high-quality plush toy representing the medical concept "${objectDescription}", with an oversized head, small body, and stubby limbs. Made of fuzzy fabric with visible stitching and embroidered features symbolizing the medical topic. The plush is shown sitting against a clean white background. The expression is cute and approachable. Soft, even lighting with a realistic, collectible plush look. Colors appropriate to ${category || 'medical field'}. NO TEXT in the image.`,

            crochet: `A close-up, professionally composed photograph showing a handmade crocheted yarn creation representing "${objectDescription}" being gently held in both hands. The crocheted piece has a rounded, adorable chibi-style appearance with vivid medical-themed color contrasts (blues, whites, reds) and rich details. The hands appear natural and tender with clearly visible finger posture. Soft skin texture and light-shadow transitions. Background is slightly blurred, showing a clean medical office or study environment with natural light, creating a warm, professional atmosphere. NO TEXT visible.`,

            infographic: `Create a clean, modern educational illustration explaining the medical concept of "${objectDescription}". Visual Elements: Use symbolic icons, diagrams, and visual metaphors to represent key components of ${category || 'the medical topic'}. Style: Clean, flat vector illustration with a professional medical aesthetic. Use arrows and visual flow to show relationships and processes. Color palette: Professional medical blues, teals, whites, and appropriate accent colors. Modern, minimalist design suitable for medical education. Geometric shapes and clean lines. NO TEXT OR LABELS in the image - purely visual communication through symbols and icons.`,

            character: `Create a cute, friendly character mascot representing the medical concept "${objectDescription}". The character should embody the essence of ${category || 'medical care'} through visual symbolism - wearing appropriate medical attire or incorporating medical symbols into its design. Surrounded by relevant medical icons and elements that float around it. Warm, inviting lighting. Playful yet professional style. Clean background with subtle medical patterns. Family-friendly aesthetic. NO TEXT in the image.`,

            running_doctor: `Flat vector illustration of ${objectDescription}. Wide angle view, full width composition, cinematic shot, 16:9 aspect ratio. The scene features floating translucent interface screens, waveform charts, and motion lines to imply speed and advanced technology. Background is clean white with soft blue abstract geometric shapes. Art style: Minimalist corporate vector, dynamic composition, clean lines. Color Palette: Professional Blue, Cyan, Red accents, and White. High quality, clear focal point. --no text, no letters, no typography`,

            corporate_minimalist: `${objectDescription}, flat vector illustration, corporate minimalist style, clean lines, 2D, soft muted color palette, beige and cream background, navy blue and grey accents, professional and academic atmosphere, wide shot, Main subject fills approximately 80% of the frame, robust and full composition, high quality, unspalsh style --ar 16:9`,

            remote_laptop: `Flat vector illustration of ${objectDescription}. The atmosphere is friendly, warm, and casual. Surroundings include stylized floating icons (like hearts, chat bubbles, play buttons) and potted plants. Background features soft abstract gradients in purple or orange. Art style: Modern flat design, cozy aesthetic, vibrant yet soft colors. Color Palette: Orange, Purple, Blue accents, and White. --no text, no letters, no typography`,

            remote_laptop_v1: `Flat vector illustration of ${objectDescription}. Main subject fills approximately 80% of the frame, robust and full composition. The atmosphere is professional, focused, and calm. Surroundings include stylized floating technology icons (clouds, wifi, shield) and structured geometric elements. Background features soft abstract gradients in cool blues. Art style: Modern flat design, tech-focused but accessible. Color Palette: Professional Blue, Teal, White, and Silver accents. --no text, no letters, no typography`,

            remote_laptop_v2: `Flat vector illustration of ${objectDescription}. Main subject fills approximately 80% of the frame, robust and full composition. The atmosphere is energetic, creative, and inspiring. Surroundings include stylized floating ideation icons (lightbulbs, sparks, magnifying glasses) and fluid organic shapes. Background features soft abstract gradients in warm tones. Art style: Modern flat design, dynamic and engaging. Color Palette: Coral, Warm Orange, Soft Gold, and Cream. --no text, no letters, no typography`,

            remote_laptop_v3: `Flat vector illustration of ${objectDescription}. Main subject fills approximately 80% of the frame, robust and full composition. The atmosphere is balanced, grounded, and sustainable. Surroundings include stylized natural elements (leaves, water droplets, growth charts) and soft curves. Background features soft abstract gradients in earthy tones. Art style: Modern flat design, wellness-oriented and organic. Color Palette: Sage Green, Earthy Brown, Soft Beige, and White. --no text, no letters, no typography`,

            eco_growth: `Flat vector illustration of ${objectDescription}. The atmosphere is organic, fresh, and soothing. Surroundings include stylized botanical elements (leaves, sprouts, flowing curves) and soft daylight motifs. Background features soft abstract gradients in sage green or pale teal. Art style: Modern flat design, eco-friendly aesthetic, natural yet professional colors. Color Palette: Sage Green, Forest Green, Soft Cream, and White. --no text, no letters, no typography`,

            tech_innovation: `Flat vector illustration of ${objectDescription}. The atmosphere is innovative, clean, and forward-looking. Surroundings include stylized geometric shapes, data points, and connectivity networks. Background features soft abstract gradients in deep blue or bright cyan. Art style: Modern flat design, tech-focused aesthetic, crisp and electric colors. Color Palette: Electric Blue, Cyan, Silver, and White. --no text, no letters, no typography`,

            editorial_cutout: `${objectDescription}, flat vector editorial illustration, minimal facial features, rounded shapes, clean cutout style, muted earthy pastel palette, soft grainy paper texture, matte finish, gentle shadows, minimal shading, abstract organic background shapes, botanical accents, calm warm mood, no text, no watermark, high resolution`,

            custom: customPrompt || `Create a clean, modern educational illustration explaining the medical concept of "${objectDescription}". Visual Elements: Use symbolic icons, diagrams, and visual metaphors to represent key components of ${category || 'the medical topic'}. Style: Clean, flat vector illustration with a professional medical aesthetic. Use arrows and visual flow to show relationships and processes. Color palette: Professional medical blues, teals, whites, and appropriate accent colors. Modern, minimalist design suitable for medical education. Geometric shapes and clean lines. NO TEXT OR LABELS in the image - purely visual communication through symbols and icons.`
        };

        const prompt = templates[promptTemplate] || templates.infographic;

        console.log('Generating image with Google Gemini 3 Pro, prompt length:', prompt.length);

        // Call Google Gemini 3 Pro Image API via REST
        // Using gemini-3-pro-image-preview with generateContent method
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    imageConfig: {
                        aspectRatio: "16:9",
                        imageSize: "2K"
                    }
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google API Error:', response.status, errorText);
            throw new Error(`Google API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Extract image from response
        const imagePart = data.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData);
        const imageBase64 = imagePart?.inlineData?.data;

        if (!imageBase64) {
            console.error('No image in response:', JSON.stringify(data));
            throw new Error("No image generated by Google API");
        }

        // Return as data URI for serverless compatibility (Zeabur, Vercel, etc.)
        // This avoids file system write issues in read-only environments
        const imageUrl = `data:image/png;base64,${imageBase64}`;

        return NextResponse.json({ url: imageUrl });

    } catch (error: any) {
        console.error('Error generating image:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate image' }, { status: 500 });
    }
}
