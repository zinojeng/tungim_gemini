
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const getS3Client = () => {
    const s3Region = process.env.S3_REGION || "auto";
    const s3Endpoint = process.env.S3_ENDPOINT;

    if (s3Region === "auto" && !s3Endpoint) {
        throw new Error("S3_ENDPOINT is required when S3_REGION is 'auto'. Please check your .env file.");
    }

    return new S3Client({
        region: s3Region,
        endpoint: s3Endpoint,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        forcePathStyle: true, // Required for MinIO
    });
};

export async function POST(request: Request) {
    try {
        const s3Client = getS3Client();

        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const bucketName = process.env.S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("S3_BUCKET_NAME is not defined in .env");
        }

        const uploadedUrls: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()} -${file.name.replace(/\s+/g, "-")} `;

            // Upload to S3
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucketName,
                    Key: fileName,
                    Body: buffer,
                    ContentType: file.type,
                    // ACL: "public-read", // Uncomment if your bucket supports ACLs
                })
            );

            // Construct Public URL
            // If S3_PUBLIC_URL is set, use it. Otherwise, construct from endpoint/bucket (common for some providers)
            const publicUrl = process.env.S3_PUBLIC_URL
                ? `${process.env.S3_PUBLIC_URL}/${fileName}`
                : `${process.env.S3_ENDPOINT}/${bucketName}/${fileName}`;

            uploadedUrls.push(publicUrl);
        }

        return NextResponse.json({ urls: uploadedUrls });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}

