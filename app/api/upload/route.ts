import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME, S3_PUBLIC_DOMAIN } from "@/lib/s3-client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY || !process.env.S3_BUCKET_NAME) {
        return NextResponse.json({ success: false, error: "S3 configuration missing" }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique key for the file
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const fileName = `${Date.now()}-${uniqueId}-${file.name.replace(/\s+/g, "_")}`;
    const key = `problems/images/${fileName}`;

    const contentType = file.type || "image/jpeg";

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      // If we want it to be public-read, we need to add ACL: 'public-read'
      // but only if the bucket allows it. For modern S3, usually it's public through policy.
      // ACL: 'public-read'
    });

    await s3Client.send(command);

    // Construct the URL
    let url = "";
    const bucketName = process.env.S3_BUCKET_NAME!;
    const region = process.env.S3_REGION || "us-east-1";

    if (S3_PUBLIC_DOMAIN) {
      // Ensure S3_PUBLIC_DOMAIN starts with http/https
      const domain = S3_PUBLIC_DOMAIN.startsWith("http") ? S3_PUBLIC_DOMAIN : `https://${S3_PUBLIC_DOMAIN}`;
      // Strip trailing slash if present
      const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;
      url = `${cleanDomain}/${key}`;
    } else if (process.env.S3_ENDPOINT) {
        // For custom endpoints (R2, MinIO, etc.)
        const endpoint = process.env.S3_ENDPOINT.endsWith("/") ? process.env.S3_ENDPOINT.slice(0, -1) : process.env.S3_ENDPOINT;
        url = `${endpoint}/${bucketName}/${key}`;
    } else {
        // Standard S3 URL
        url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    }

    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    console.error("Error uploading to S3:", err);
    return NextResponse.json({ success: false, error: err.message || "Upload failed" }, { status: 500 });
  }
}
