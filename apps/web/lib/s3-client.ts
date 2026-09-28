import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY || !process.env.S3_REGION || !process.env.S3_BUCKET_NAME) {
  // We'll throw an error only when the client is actually needed,
  // or handle it in the upload function to avoid breaking other parts if not configured.
}

export const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  // If use custom endpoint like R2/MinIO
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: !!process.env.S3_FORCE_PATH_STYLE,
});

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
export const S3_PUBLIC_DOMAIN = process.env.S3_PUBLIC_DOMAIN || "";
// If s3_public_domain is not set, we'll try to construct it.
