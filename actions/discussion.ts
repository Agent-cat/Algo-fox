"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";

// Type definitions
export type CommentWithUser = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    parentId: string | null;
    upvoteCount: number;
    isPinned: boolean;
    user: {
        id: string;
        name: string;
        image: string | null;
        role: string;
    };
    replies?: CommentWithUser[];
    userVote?: "UP" | "DOWN" | null;
};

/**
 * Fetch comments for a problem, organized as a tree.
 * Uses Next.js 16 cacheTag for on-demand revalidation.
 */
export async function getProblemComments(problemId: string, currentUserId?: string) {
    const fetchComments = unstable_cache(
        async () => {
            return await prisma.comment.findMany({
                where: { problemId },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            role: true,
                        }
                    },
                    votes: true // Fetch votes to calculate userVote manually if needed, or use separate query
                },
                orderBy: [
                    { isPinned: "desc" }, // Pinned first
                    { upvoteCount: "desc" }, // Then by votes
                    { createdAt: "desc" }
                ]
            });
        },
        [`problem-comments-${problemId}`],
        { tags: [`comments-${problemId}`] } // Cache tag for invalidation
    );

    const rawComments = await fetchComments();

    // Process comments to add userVote status and organize into tree
    const commentsWithVoteState = rawComments.map(comment => {
        let userVote: "UP" | "DOWN" | null = null;
        if (currentUserId) {
            const vote = comment.votes.find(v => v.userId === currentUserId);
            if (vote) userVote = vote.type;
        }

        // Remove votes array from result to reduce payload
        const { votes, ...rest } = comment;
        return { ...rest, userVote };
    });

    // Build Tree Structure
    const commentMap = new Map();
    const rootComments: any[] = [];

    // Initialize map
    commentsWithVoteState.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Link children to parents
    commentsWithVoteState.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies.push(commentMap.get(comment.id));
            }
        } else {
            rootComments.push(commentMap.get(comment.id));
        }
    });

    return rootComments as CommentWithUser[];
}

/**
 * Post a new comment or reply
 */
export async function postComment(problemId: string, content: string, parentId?: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.comment.create({
            data: {
                content,
                problemId,
                userId: session.user.id,
                parentId: parentId || null
            }
        });

        revalidateTag(`comments-${problemId}`, "max");
        return { success: true };
    } catch (error) {
        console.error("Failed to post comment:", error);
        return { success: false, error: "Failed to post comment" };
    }
}

/**
 * Toggle Vote (Upvote/Downvote)
 */
export async function voteComment(commentId: string, problemId: string, type: "UP" | "DOWN") {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        // Check existing vote
        const existingVote = await prisma.commentVote.findUnique({
            where: {
                userId_commentId: {
                    userId,
                    commentId
                }
            }
        });

        // Use transaction to update vote and count atomically
        await prisma.$transaction(async (tx) => {
            if (existingVote) {
                if (existingVote.type === type) {
                    // Remove vote (toggle off)
                    await tx.commentVote.delete({
                        where: { id: existingVote.id }
                    });

                    // Update count (reverse the vote)
                    await tx.comment.update({
                        where: { id: commentId },
                        data: {
                            upvoteCount: {
                                decrement: type === "UP" ? 1 : -1 // wait, actually upvoteCount logic usually just counts upvotes - downvotes
                                // Let's assume upvoteCount is a cache of "score"
                            }
                        }
                    });
                } else {
                    // Change vote
                    await tx.commentVote.update({
                        where: { id: existingVote.id },
                        data: { type }
                    });

                    // Update count (+2 or -2 because we are swinging from one side to other)
                    await tx.comment.update({
                        where: { id: commentId },
                        data: {
                            upvoteCount: {
                                increment: type === "UP" ? 2 : -2
                            }
                        }
                    });
                }
            } else {
                // New vote
                await tx.commentVote.create({
                    data: {
                        userId,
                        commentId,
                        type
                    }
                });

                await tx.comment.update({
                    where: { id: commentId },
                    data: {
                        upvoteCount: {
                            increment: type === "UP" ? 1 : -1
                        }
                    }
                });
            }
        });

        revalidateTag(`comments-${problemId}`, "max");
        return { success: true };
    } catch (error) {
        console.error("Failed to vote:", error);
        return { success: false, error: "Failed to vote" };
    }
}

/**
 * Pin a comment (Admin only)
 */
export async function pinComment(commentId: string, problemId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.role !== "ADMIN") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Toggle pin status
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment) return { success: false, error: "Comment not found" };

        await prisma.comment.update({
            where: { id: commentId },
            data: { isPinned: !comment.isPinned }
        });

        revalidateTag(`comments-${problemId}`, "max");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to pin comment" };
    }
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string, problemId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment) return { success: false, error: "Not found" };

        const canDelete = session.user.role === "ADMIN" || comment.userId === session.user.id;

        if (!canDelete) {
            return { success: false, error: "Unauthorized" };
        }

        await prisma.comment.delete({ where: { id: commentId } });
        revalidateTag(`comments-${problemId}`, "max");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}
