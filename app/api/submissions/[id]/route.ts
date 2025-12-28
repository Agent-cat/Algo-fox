import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const submission = await prisma.submission.findUnique({
            where: { id },
            include: {
                testCases: {
                    orderBy: { index: 'asc' },
                    select: {
                        id: true,
                        status: true,
                        index: true,
                        time: true,
                        memory: true,
                        errorMessage: true, // Explicitly include errorMessage
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        });

        if (!submission) {
            return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        }

        return NextResponse.json({
            status: submission.status,
            time: submission.time,
            memory: submission.memory,
            testCases: submission.testCases
        });
    } catch (error) {
        console.error("Submission Poll Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
