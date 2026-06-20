"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getPlacementStudents() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
            return { success: false, error: "Unauthorized" };
        }

        const students = await prisma.user.findMany({
            where: {
                role: { in: ["USER", "STUDENT"] }
            },
            select: {
                id: true,
                name: true,
                email: true,
                collegeId: true,
                branch: true,
                year: true,
                tags: true,
                image: true,
            },
            orderBy: { name: "asc" }
        });

        return { success: true, students };
    } catch (error: any) {
        console.error("Failed to fetch placement students:", error);
        return { success: false, error: error.message, students: [] };
    }
}

export async function assignTagsToStudents(studentIds: string[], newTags: string[]) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
            return { success: false, error: "Unauthorized" };
        }

        if (!studentIds.length || !newTags.length) {
            return { success: false, error: "Invalid input" };
        }

        // We need to fetch existing tags, merge, and update.
        // Since Prisma doesn't have a direct 'array union' update for PostgreSQL string arrays in all versions easily,
        // we can fetch users, compute new tags, and update them. If it's a lot of users, this might be slow, but it's safe.
        // Alternatively, we can do it in a transaction.
        
        await prisma.$transaction(async (tx) => {
            const students = await tx.user.findMany({
                where: { id: { in: studentIds } },
                select: { id: true, tags: true }
            });

            for (const student of students) {
                const currentTags = student.tags || [];
                const mergedTags = Array.from(new Set([...currentTags, ...newTags]));
                
                await tx.user.update({
                    where: { id: student.id },
                    data: { tags: mergedTags }
                });
            }
        });

        revalidatePath("/placementdashboard/students");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to assign tags:", error);
        return { success: false, error: error.message };
    }
}

export async function getStudentTagCounts() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
            return { success: false, error: "Unauthorized" };
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
        console.error("Failed to fetch tag counts:", error);
        return { success: false, error: error.message, tags: [] };
    }
}
