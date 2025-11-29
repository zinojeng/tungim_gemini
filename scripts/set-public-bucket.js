const { S3Client, PutBucketPolicyCommand } = require("@aws-sdk/client-s3");

// MinIO 配置
const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.S3_ENDPOINT, // 例如 https://minio-mednote.zeabur.app
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

const bucketName = process.env.S3_BUCKET_NAME || "zeabur";

// 公開讀取策略
const publicReadPolicy = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
    ],
};

async function setPublicPolicy() {
    try {
        console.log(`正在將 Bucket '${bucketName}' 設為公開...`);

        const command = new PutBucketPolicyCommand({
            Bucket: bucketName,
            Policy: JSON.stringify(publicReadPolicy),
        });

        await s3Client.send(command);
        console.log("✅ 成功！Bucket 現在已公開。");

    } catch (error) {
        console.error("❌ 失敗:", error);
    }
}

setPublicPolicy();
