"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleBookmark(problemId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;

        const existing = await prisma.bookmark.findUnique({
            where: {
                userId_problemId: {
                    userId,
                    problemId
                }
            }
        });

        if (existing) {
            await prisma.bookmark.delete({
                where: {
                    userId_problemId: {
                        userId,
                        problemId
                    }
                }
            });
            revalidatePath(`/problems`);
            return { success: true, isBookmarked: false };
        } else {
            await prisma.bookmark.create({
                data: {
                    userId,
                    problemId
                }
            });
            revalidatePath(`/problems`);
            return { success: true, isBookmarked: true };
        }
    } catch (error) {
        console.error("Failed to toggle bookmark:", error);
        return { success: false, error: "Failed to toggle bookmark" };
    }
}

export async function checkBookmarkStatus(problemId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: true, isBookmarked: false };
        }

        const userId = session.user.id;

        const existing = await prisma.bookmark.findUnique({
            where: {
                userId_problemId: {
                    userId,
                    problemId
                }
            }
        });

        return { success: true, isBookmarked: !!existing };
    } catch (error) {
        console.error("Failed to check bookmark status:", error);
        return { success: false, error: "Failed to check status" };
    }
}

export async function getUserBookmarks(page: number = 1, limit: number = 20) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;
        const skip = (page - 1) * limit;

        const [bookmarks, total] = await Promise.all([
            prisma.bookmark.findMany({
                where: { userId },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    problem: {
                        include: {
                            _count: {
                                select: { submissions: true }
                            }
                        }
                    }
                }
            }),
            prisma.bookmark.count({
                where: { userId }
            })
        ]);

        // Get solved problems for the user
        const solvedRecords = await prisma.userProblemSolved.findMany({
            where: { userId },
            select: { problemId: true }
        });
        const solvedIds = new Set(solvedRecords.map(r => r.problemId));

        // Format problems like the other queries
        const formattedProblems = bookmarks.map((b: any) => {
            const p = b.problem;
            return {
                id: p.id,
                title: p.title,
                slug: p.slug,
                difficulty: p.difficulty,
                type: p.type,
                domain: p.domain,
                score: p.score,
                createdAt: p.createdAt,
                companies: p.companies,
                isSolved: solvedIds.has(p.id),
                acceptance: p._count.submissions > 0
                    ? ((p.solved || 0) / p._count.submissions) * 100
                    : 0,
            };
        });

        return {
            success: true,
            bookmarks: formattedProblems,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        };

    } catch (error) {
        console.error("Failed to get bookmarks:", error);
        return { success: false, error: "Failed to load bookmarks" };
    }
}
