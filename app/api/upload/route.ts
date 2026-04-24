import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME, S3_PUBLIC_DOMAIN } from "@/lib/s3-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { randomBytes } from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
    // Auth guard: only authenticated users may upload
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Only admins and teachers should be uploading problem images
    const sessionUser = session.user as any;
    if (!["ADMIN", "TEACHER", "INSTITUTION_MANAGER", "CONTEST_MANAGER"].includes(sessionUser.role)) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY || !process.env.S3_BUCKET_NAME) {
            return NextResponse.json({ success: false, error: "S3 configuration missing" }, { status: 500 });
        }

        // Validate MIME type against allowlist (do NOT trust client-provided value alone)
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
            return NextResponse.json(
                { success: false, error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." },
                { status: 415 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Enforce file size limit
        if (buffer.byteLength > MAX_FILE_SIZE) {
            return NextResponse.json(
                { success: false, error: "File too large. Maximum size is 5 MB." },
                { status: 413 }
            );
        }

        // Use cryptographically secure random ID
        const uniqueId = randomBytes(12).toString("hex");
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 80);
        const fileName = `${Date.now()}-${uniqueId}-${safeName}`;
        const key = `problems/images/${fileName}`;

        const command = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);

        // Construct the URL
        let url = "";
        const bucketName = process.env.S3_BUCKET_NAME!;
        const region = process.env.S3_REGION || "us-east-1";

        if (S3_PUBLIC_DOMAIN) {
            const domain = S3_PUBLIC_DOMAIN.startsWith("http") ? S3_PUBLIC_DOMAIN : `https://${S3_PUBLIC_DOMAIN}`;
            const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;
            url = `${cleanDomain}/${key}`;
        } else if (process.env.S3_ENDPOINT) {
            const endpoint = process.env.S3_ENDPOINT.endsWith("/")
                ? process.env.S3_ENDPOINT.slice(0, -1)
                : process.env.S3_ENDPOINT;
            url = `${endpoint}/${bucketName}/${key}`;
        } else {
            url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
        }

        return NextResponse.json({ success: true, url });
    } catch (err: any) {
        console.error("Error uploading to S3:", err);
        return NextResponse.json({ success: false, error: err.message || "Upload failed" }, { status: 500 });
    }
}
