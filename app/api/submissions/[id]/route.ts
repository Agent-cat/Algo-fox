import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const submission = await prisma.submission.findUnique({
            where: { id },
            include: {
                testCases: {
                    orderBy: { index: "asc" },
                    select: {
                        id: true,
                        status: true,
                        index: true,
                        time: true,
                        memory: true,
                        errorMessage: true,
                        stdout: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        if (!submission) {
            return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        }

        // Only the submission owner or an admin can poll results
        const sessionUser = session.user as any;
        if (submission.userId !== session.user.id && sessionUser.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json({
            status: submission.status,
            time: submission.time,
            memory: submission.memory,
            testCases: submission.testCases,
        });
    } catch (error) {
        console.error("Submission Poll Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
