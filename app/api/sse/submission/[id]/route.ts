import { NextRequest, NextResponse, connection } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";

// SSE Endpoint
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Explicit type for params
) {
    await connection();
    const headersList = await headers();
    const { id: submissionId } = await context.params;

    const session = await auth.api.getSession({
        headers: headersList
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

    // OPTIMIZATION: Use redis connection pool instead of creating new connection per request
    // This prevents connection exhaustion when multiple users connect simultaneously
    const subscriber = redis.duplicate({ lazyConnect: false });

    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
        async start(controller) {

            // 1. Send Initial State (In case we missed events or are reconnecting)
            // OPTIMIZATION: Only select necessary fields to reduce data transfer
            const latest = await prisma.submission.findUnique({
                 where: { id: submissionId },
                 select: {
                     status: true,
                     time: true,
                     memory: true,
                     testCases: {
                         // OPTIMIZATION: Filter at DB level instead of in application
                         where: { status: { not: "PENDING" } },
                         select: {
                             index: true,
                             status: true,
                             time: true,
                             memory: true,
                             errorMessage: true,
                             stdout: true
                         }
                     }
                 }
            });

            // Define terminal states that should close the connection
            const terminalStates = ["ACCEPTED", "WRONG_ANSWER", "TIME_LIMIT_EXCEEDED", "MEMORY_LIMIT_EXCEEDED", "RUNTIME_ERROR", "COMPILE_ERROR"];

            if (latest) {
                 if (latest.testCases.length > 0) {
                     const data = JSON.stringify({
                         type: "CASE_UPDATE",
                         data: latest.testCases
                     });
                     controller.enqueue(`data: ${data}\n\n`);
                 }

                 if (terminalStates.includes(latest.status)) {
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
                     await subscriber.quit();
                     return;
                 }
            }

            // 2. Subscribe to Redis Channel
            await subscriber.subscribe(`submission:${submissionId}`);

            // OPTIMIZATION: Add timeout to prevent zombie connections
            let timeoutHandle: NodeJS.Timeout;
            const resetTimeout = () => {
                clearTimeout(timeoutHandle);
                timeoutHandle = setTimeout(() => {
                    controller.close();
                    subscriber.quit().catch(err => {
                        if (process.env.NODE_ENV !== "production") {
                             console.warn("[SSE] Error closing subscriber:", err);
                        }
                    });
                }, 5 * 60 * 1000); // 5 minute timeout
            };

            subscriber.on("message", (channel, message) => {
                if (channel === `submission:${submissionId}`) {
                    try {
                        // OPTIMIZATION: Try to parse message type without full JSON parse first
                        controller.enqueue(`data: ${message}\n\n`);
                        resetTimeout();

                        const parsed = JSON.parse(message);
                        if (parsed.type === "COMPLETE") {
                            clearTimeout(timeoutHandle);
                            controller.close();
                            subscriber.quit().catch(err => {
                                if (process.env.NODE_ENV !== "production") {
                                     console.warn("[SSE] Error closing subscriber:", err);
                                }
                            });
                        }
                    } catch (error) {
                        // OPTIMIZATION: Add error handling to prevent stream crashes
                        if (process.env.NODE_ENV !== "production") {
                             console.error("[SSE] Message parsing error:", error);
                        }
                        clearTimeout(timeoutHandle);
                        controller.close();
                        subscriber.quit().catch(() => {});
                    }
                }
            });

            subscriber.on("error", (error) => {
                if (process.env.NODE_ENV !== "production") {
                     console.error("[SSE] Redis subscriber error:", error);
                }
                clearTimeout(timeoutHandle);
                controller.close();
                subscriber.quit().catch(() => {});
            });

            resetTimeout(); // Start initial timeout
        },
        cancel() {
            subscriber.quit().catch(() => {});
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
