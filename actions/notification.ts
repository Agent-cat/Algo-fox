"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCachedNotifications, setCachedNotifications, invalidateNotificationCache } from "@/lib/notification-cache";
import { throwIfNextBailoutError } from "@/lib/auth-utils";

function hasPlacementDirectorRole(user: any): user is { role: string } {
    return user && typeof user === "object" && "role" in user && user.role === "PLACEMENT_DIRECTOR";
}

export async function getAvailableTags() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized", tags: [] };
        }

        const students = await prisma.user.findMany({
            where: {
                role: { in: ["USER", "STUDENT"] }
            },
            select: { tags: true }
        });

        const tagCounts: Record<string, number> = {};
        for (const student of students) {
            for (const tag of student.tags || []) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
        }

        const sortedTags = Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);

        return { success: true, tags: sortedTags };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to fetch available tags:", error);
        return { success: false, error: "Failed to fetch tags", tags: [] };
    }
}

export async function createNotification(data: {
    title: string;
    content: string;
    targetTags: string[];
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized" };
        }

        const notification = await prisma.notification.create({
            data: {
                title: data.title,
                content: data.content,
                authorId: session.user.id,
                targetTags: data.targetTags,
            },
            include: {
                author: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        revalidatePath("/placementdashboard/notifications");
        revalidatePath("/");
        await invalidateNotificationCache();
        return { success: true, notification };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to create notification:", error);
        return { success: false, error: "An error occurred while creating the notification." };
    }
}

export async function updateNotification(
    id: string,
    data: {
        title: string;
        content: string;
        targetTags: string[];
    }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized" };
        }

        const existing = await prisma.notification.findUnique({
            where: { id }
        });

        if (!existing) {
            return { success: false, error: "Notification not found" };
        }

        if (existing.authorId !== session.user.id) {
            return { success: false, error: "You can only edit your own notifications" };
        }

        const notification = await prisma.notification.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                targetTags: data.targetTags,
            },
            include: {
                author: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        revalidatePath("/placementdashboard/notifications");
        revalidatePath("/");
        await invalidateNotificationCache();
        return { success: true, notification };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to update notification:", error);
        return { success: false, error: "An error occurred while updating the notification." };
    }
}

export async function deleteNotification(id: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized" };
        }

        const existing = await prisma.notification.findUnique({
            where: { id }
        });

        if (!existing) {
            return { success: false, error: "Notification not found" };
        }

        if (existing.authorId !== session.user.id) {
            return { success: false, error: "You can only delete your own notifications" };
        }

        await prisma.notification.delete({ where: { id } });

        revalidatePath("/placementdashboard/notifications");
        revalidatePath("/");
        await invalidateNotificationCache();
        return { success: true };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to delete notification:", error);
        return { success: false, error: "An error occurred while deleting the notification." };
    }
}

export async function getNotifications(cursor?: string, limit: number = 20) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized", notifications: [], nextCursor: null };
        }

        const notifications = await prisma.notification.findMany({
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            include: {
                author: {
                    select: { id: true, name: true, image: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        let nextCursor: string | null = null;
        if (notifications.length > limit) {
            const nextItem = notifications.pop();
            nextCursor = nextItem?.id ?? null;
        }

        return { success: true, notifications, nextCursor };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to fetch notifications:", error);
        return { success: false, error: "An error occurred while fetching notifications.", notifications: [], nextCursor: null };
    }
}

export async function getNotificationById(id: string) {
    try {
        const notification = await prisma.notification.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        if (!notification) {
            return { success: false, error: "Notification not found" };
        }

        return { success: true, notification };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to fetch notification:", error);
        return { success: false, error: "An error occurred while fetching the notification." };
    }
}

export async function getStudentNotifications(limit: number = 5) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized", notifications: [] };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { tags: true }
        });

        if (!user) {
            return { success: false, error: "User not found", notifications: [] };
        }

        const userTags = user.tags || [];

        // Try cache first for better performance at scale
        let allNotifications = await getCachedNotifications();

        if (!allNotifications) {
            // Cache miss - fetch from DB and cache
            const dbNotifications = await prisma.notification.findMany({
                take: 20,
                include: {
                    author: {
                        select: { id: true, name: true, image: true }
                    }
                },
                orderBy: { createdAt: "desc" }
            });

            allNotifications = dbNotifications.map(n => ({
                ...n,
                createdAt: n.createdAt.toISOString(),
                updatedAt: n.updatedAt.toISOString(),
            }));

            await setCachedNotifications(allNotifications);
        }

        // Filter by user tags in memory (fast - small dataset)
        const filtered = allNotifications.filter(n => {
            if (!n.targetTags || n.targetTags.length === 0) return true; // Broadcast
            return n.targetTags.some(tag => userTags.includes(tag));
        }).slice(0, limit);

        return { success: true, notifications: filtered };
    } catch (error: any) {
        throwIfNextBailoutError(error);
        console.error("Failed to fetch student notifications:", error);
        return { success: false, error: "An error occurred while fetching notifications.", notifications: [] };
    }
}
