"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import redis from "@/lib/redis";

export async function getFilteredUsers(params: {
    page: number;
    limit: number;
    search?: string;
    roles?: Role[];
    institutionId?: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const { page, limit, search, roles, institutionId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
        ];
    }

    if (roles && roles.length > 0) {
        where.role = { in: roles };
    }

    if (institutionId && institutionId !== "all") {
        if (institutionId === "none") {
            where.institutionId = null;
        } else {
            where.institutionId = institutionId;
        }
    }

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                institutionId: true,
                createdAt: true,
                banned: true,
            }
        }),
        prisma.user.count({ where })
    ]);

    return {
        users,
        total,
    };
}

export async function deleteUserAction(userId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role !== "ADMIN") {
        return { success: false, error: "Unauthorized" };
    }

    if (session.user.id === userId) {
        return { success: false, error: "You cannot delete yourself" };
    }

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Check for dependent classrooms
            const classrooms = await tx.classroom.count({ where: { teacherId: userId } });
            if (classrooms > 0) {
                // Option A: Hard delete classrooms (dangerous but fulfills "delete" request)
                await tx.classroom.deleteMany({ where: { teacherId: userId } });
            }

            // 2. Handle Problems (Nullable userId usually means we can keep the problem but orphan it)
            await tx.problem.updateMany({
                where: { userId: userId },
                data: { userId: null }
            });

            // 3. Contests have onDelete: Cascade for creatorId, but let's be safe
            // However, prisma might still need manual help if there are other relations

            // Final Delete
            await tx.user.delete({
                where: { id: userId }
            });
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete user:", error);
        return { success: false, error: error.message || "Failed to delete user" };
    }
}

export async function updateUserRoleAction(userId: string, role: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role !== "ADMIN") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: role as Role }
        });

        // Invalidate dashboard cache
        revalidateTag(`dashboard-${userId}`, "max");
        await redis.del(`dashboard:stats:${userId}`);

        return { success: true };
    } catch (error: any) {
        console.error("Failed to update role:", error);
        return { success: false, error: error.message || "Failed to update role" };
    }
}
