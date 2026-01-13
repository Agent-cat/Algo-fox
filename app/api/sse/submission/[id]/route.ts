import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import IORedis from "ioredis";

// SSE Endpoint
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Explicit type for params
) {
    const { id: submissionId } = await context.params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const submission = await prisma.submission.findUnique({
        where: { id: submissionId },
        select: { userId: true, status: true }
    });

    if (!submission) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (submission.userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Create a new Redis client for subscription
    const redis = new IORedis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        maxRetriesPerRequest: null,
        enableReadyCheck: false, // Prevent ioredis from trying to run INFO commands
    });

    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
        async start(controller) {

            // 1. Send Initial State (In case we missed events or are reconnecting)
            // Fetch latest from DB
            const latest = await prisma.submission.findUnique({
                 where: { id: submissionId },
                 include: { testCases: true }
            });

            if (latest) {
                 const completedCases = latest.testCases.filter(tc => tc.status !== "PENDING");
                 if (completedCases.length > 0) {
                     const data = JSON.stringify({
                         type: "CASE_UPDATE",
                         data: completedCases.map(tc => ({
                             index: tc.index,
                             status: tc.status,
                             time: tc.time,
                             memory: tc.memory,
                             errorMessage: tc.errorMessage,
                             stdout: tc.stdout
                         }))
                     });
                     controller.enqueue(`data: ${data}\n\n`);
                 }

                 if (latest.status !== "PENDING") {
                     const data = JSON.stringify({
                         type: "COMPLETE",
                         data: {
                             status: latest.status,
                             time: latest.time,
                             memory: latest.memory
                         }
                     });
                     controller.enqueue(`data: ${data}\n\n`);
                     // If already complete, we can close stream
                     controller.close();
                     redis.quit();
                     return;
                 }
            }

            // 2. Subscribe to Redis Channel
            await redis.subscribe(`submission:${submissionId}`);

            redis.on("message", (channel, message) => {
                if (channel === `submission:${submissionId}`) {
                    controller.enqueue(`data: ${message}\n\n`);

                    // If complete, close connection
                    const parsed = JSON.parse(message);
                    if (parsed.type === "COMPLETE") {
                        controller.close();
                        redis.quit();
                    }
                }
            });
        },
        cancel() {
            redis.quit();
        }
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}
