import { NextRequest, NextResponse } from "next/server";
import { SubmissionService } from "@/core/services/submission.service";
import { addSubmissionJob } from "@/core/queues/submission.queue";
import { authClient } from "@/lib/auth-client"; // Assuming auth helper exists or we use prisma session
import { prisma } from "@/lib/prisma"; // Direct access for session check if needed

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const problemId = searchParams.get("problemId");

    if (!userId || !problemId) {
        return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    try {
        const { prisma } = await import("@/lib/prisma");
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId,
                mode: "SUBMIT"
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
                language: true
            }
        });

        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, problemId, languageId, code, mode = "SUBMIT" } = body;

        if (!userId || !problemId || !languageId || !code) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // HANDLE RUN MODE (No DB Storage, Synchronous)
        if (mode === "RUN") {
            const problem = await prisma.problem.findUnique({
                where: { id: problemId },
                include: { testCases: true }
            });

            if (!problem) {
                return NextResponse.json({ error: "Problem not found" }, { status: 404 });
            }

            // Send to Judge0
            const tokens = await SubmissionService.sendToJudge0(
                languageId,
                code,
                problem.testCases.map(tc => ({ input: tc.input, output: tc.output }))
            );

            // Wait for results (poll Judge0 internally)
            let attempts = 0;
            const maxAttempts = 10; // 2 seconds total roughly (if 200ms delay)
            let results: any[] = [];

            // Simple internal polling since we need to return the response
            // For better performance/reliability, we might want to just wait a fixed time or use a smarter loop
            // Judge0 is usually fast for small inputs.

            while (attempts < maxAttempts) {
                const batchResults = await SubmissionService.getBatchResults(tokens.map(t => t.token));

                // Check if any vary still pending/processing
                const isPending = batchResults.some(r => r.status.id <= 2); // 1=In Queue, 2=Processing

                if (!isPending) {
                    results = batchResults;
                    break;
                }

                await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
                attempts++;
                results = batchResults; // Keep latest state
            }

            // Format results to match what frontend expects from polling
            // Frontend expects: { status: "ACCEPTED" | ..., testCases: [...] }

            const formattedTestCases = results.map((r, index) => {
                const statusMap: Record<number, string> = {
                    3: "ACCEPTED",
                    4: "WRONG_ANSWER",
                    5: "TIME_LIMIT_EXCEEDED",
                    6: "COMPILE_ERROR",
                    // Map others as needed
                };

                return {
                    index,
                    status: statusMap[r.status.id] || "RUNTIME_ERROR",
                    time: parseFloat(r.time || "0"),
                    memory: r.memory,
                    stdout: r.stdout,
                    errorMessage: r.stderr || r.compile_output
                };
            });

            const overrideStatus = formattedTestCases.find(tc => tc.status !== "ACCEPTED")?.status || "ACCEPTED";
            // Calculate totals
            const totalTime = formattedTestCases.reduce((acc, curr) => acc + (curr.time || 0), 0);
            const maxMemory = Math.max(...formattedTestCases.map(tc => tc.memory || 0));

            return NextResponse.json({
                status: overrideStatus,
                testCases: formattedTestCases,
                time: totalTime,
                memory: maxMemory
            });
        }

        // 1. Create Submission in DB (SUBMIT MODE)
        const submission = await SubmissionService.createSubmission(userId, problemId, languageId, code, mode);

        // 2. Add to Queue
        await addSubmissionJob(submission.id);

        return NextResponse.json({ submissionId: submission.id }, { status: 201 });

    } catch (error) {
        console.error("Submission API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
