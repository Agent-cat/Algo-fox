"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleBookmark(problemId: string, listId?: string | null) {
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
            if (existing.listId === listId || (listId === undefined && !existing.listId)) {
                // If the listId matches or both are null, remove it
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
                // Change the list it's in
                await prisma.bookmark.update({
                    where: {
                        userId_problemId: {
                            userId,
                            problemId
                        }
                    },
                    data: {
                        listId: listId || null
                    }
                });
                revalidatePath(`/problems`);
                return { success: true, isBookmarked: true, listId: listId || null };
            }
        } else {
            await prisma.bookmark.create({
                data: {
                    userId,
                    problemId,
                    listId: listId || null
                }
            });
            revalidatePath(`/problems`);
            return { success: true, isBookmarked: true, listId: listId || null };
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

        return { success: true, isBookmarked: !!existing, listId: existing?.listId || null };
    } catch (error) {
        console.error("Failed to check bookmark status:", error);
        return { success: false, error: "Failed to check status" };
    }
}

export async function getUserBookmarks(page: number = 1, limit: number = 20, listId?: string | null) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;
        const skip = (page - 1) * limit;

        const whereCondition: any = { userId };
        if (listId !== undefined) {
            whereCondition.listId = listId;
        }

        const [bookmarks, total] = await Promise.all([
            prisma.bookmark.findMany({
                where: whereCondition,
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
                where: whereCondition
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

export async function createBookmarkList(name: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;

        // Check if list with same name already exists
        const existing = await prisma.bookmarkList.findUnique({
            where: {
                userId_name: {
                    userId,
                    name
                }
            }
        });

        if (existing) {
            return { success: false, error: "A list with this name already exists" };
        }

        const list = await prisma.bookmarkList.create({
            data: {
                name,
                userId
            }
        });

        revalidatePath(`/bookmarks`);
        return { success: true, list };
    } catch (error) {
        console.error("Failed to create bookmark list:", error);
        return { success: false, error: "Failed to create bookmark list" };
    }
}

export async function getUserBookmarkLists() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;

        const lists = await prisma.bookmarkList.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { bookmarks: true }
                }
            }
        });

        return { success: true, lists };
    } catch (error) {
        console.error("Failed to get bookmark lists:", error);
        return { success: false, error: "Failed to load bookmark lists" };
    }
}

export async function deleteBookmarkList(listId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;

        const list = await prisma.bookmarkList.findUnique({
            where: { id: listId }
        });

        if (!list || list.userId !== userId) {
            return { success: false, error: "List not found or unauthorized" };
        }

        await prisma.bookmarkList.delete({
            where: { id: listId }
        });

        revalidatePath(`/bookmarks`);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete bookmark list:", error);
        return { success: false, error: "Failed to delete bookmark list" };
    }
}

