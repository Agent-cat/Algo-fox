"use server";

import { InstitutionService } from "@/core/services/institution.service";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import redis from "@/lib/redis";

const institutionSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
    logo: z.string().url().optional().or(z.literal("")),
    domain: z.string().optional().or(z.literal("")),
});

const updateInstitutionSchema = institutionSchema.partial();

export async function getInstitutions() {
    try {
        const institutions = await InstitutionService.getInstitutions();
        return { success: true, institutions };
    } catch (error) {
        console.error("Failed to fetch institutions:", error);
        return { success: false, error: "Failed to fetch institutions" };
    }
}

export async function getInstitutionById(id: string) {
    try {
        const institution = await InstitutionService.getInstitutionById(id);
        if (!institution) return { success: false, error: "Institution not found" };
        return { success: true, institution };
    } catch (error) {
        console.error("Failed to fetch institution:", error);
        return { success: false, error: "Failed to fetch institution" };
    }
}


// Redefining create in Service for clarity
export async function createInstitutionAction(data: z.infer<typeof institutionSchema>) {
    try {
        const validatedData = institutionSchema.parse(data);
        // Directly use prisma for create if not in service yet
        const { prisma } = await import("@/lib/prisma");
        const institution = await prisma.institution.create({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                logo: validatedData.logo || null,
                domain: validatedData.domain || null,
            },
        });

        revalidatePath("/admin/institutions");
        return { success: true, data: institution };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        console.error("Failed to create institution:", error);
        return { success: false, error: "Failed to create institution" };
    }
}

export async function updateInstitutionAction(id: string, data: z.infer<typeof updateInstitutionSchema>) {
    try {
        const validatedData = updateInstitutionSchema.parse(data);
        const institution = await InstitutionService.updateInstitution(id, {
            ...validatedData,
            logo: validatedData.logo || undefined,
            domain: validatedData.domain || undefined,
        });

        revalidatePath("/admin/institutions");
        revalidatePath(`/admin/institutions/${id}`);
        return { success: true, data: institution };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        console.error("Failed to update institution:", error);
        return { success: false, error: "Failed to update institution" };
    }
}

export async function assignInstitutionManager(email: string, institutionId: string) {
    try {
        const { prisma } = await import("@/lib/prisma");
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                role: "INSTITUTION_MANAGER",
                institutionId: institutionId,
            },
        });

        revalidatePath("/admin/users");
        revalidatePath(`/admin/institutions/${institutionId}`);
        revalidateTag(`dashboard-${user.id}`, "max");
        await redis.del(`dashboard:stats:${user.id}`);

        return { success: true, data: updatedUser };
    } catch (error) {
        console.error("Failed to assign institution manager:", error);
        return { success: false, error: "Failed to assign institution manager" };
    }
}

export async function searchUsersByEmail(query: string) {
    try {
        const { prisma } = await import("@/lib/prisma");
        const users = await prisma.user.findMany({
            where: {
                email: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
            take: 5,
        });

        return { success: true, users };
    } catch (error) {
        console.error("Failed to search users:", error);
        return { success: false, error: "Failed to search users" };
    }
}

export async function removeInstitutionManager(userId: string, institutionId: string) {
    try {
        const { prisma } = await import("@/lib/prisma");

        // Downgrade to STUDENT and remove institution assignment
        await prisma.user.update({
            where: { id: userId },
            data: {
                role: "STUDENT",
                institutionId: null,
            },
        });

        revalidatePath(`/admin/institutions/${institutionId}`);
        revalidateTag(`dashboard-${userId}`, "max");
        await redis.del(`dashboard:stats:${userId}`);

        return { success: true };
    } catch (error) {
        console.error("Failed to remove manager:", error);
        return { success: false, error: "Failed to remove administrative access" };
    }
}

export async function deleteInstitutionAction(id: string) {
    try {
        // First disconnect all users from this institution
        const { prisma } = await import("@/lib/prisma");

        // This is a safety measure to avoid orphan institution IDs on users
        await prisma.user.updateMany({
            where: { institutionId: id },
            data: { institutionId: null },
        });

        await InstitutionService.deleteInstitution(id);

        revalidatePath("/admin/institutions");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete institution:", error);
        return { success: false, error: "Failed to delete institution. Ensure it has no active classrooms." };
    }
}

export async function getInstitutionUsers(institutionId: string, page: number = 1, searchQuery: string = "") {
    try {
        const { prisma } = await import("@/lib/prisma");
        const limit = 20;
        const skip = (page - 1) * limit;

        const where: any = {
            institutionId,
        };

        if (searchQuery) {
            where.OR = [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { email: { contains: searchQuery, mode: "insensitive" } },
            ];
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
                    createdAt: true,
                },
            }),
            prisma.user.count({ where }),
        ]);

        return { success: true, users, total };
    } catch (error) {
        console.error("Failed to fetch institution users:", error);
        return { success: false, error: "Failed to fetch institution users" };
    }
}

export async function removeUserFromInstitution(userId: string) {
    try {
        const { prisma } = await import("@/lib/prisma");

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                institutionId: null,
                // If they were a manager, teacher, etc. specifically for this institution,
                // we might want to downgrade them to STUDENT, but for now we'll just remove the link.
            },
        });

        revalidateTag(`user-${userId}`, "max");
        revalidateTag(`dashboard-${userId}`, "max");

        // Clear redis if it exists
        try {
            const redis = (await import("@/lib/redis")).default;
            await redis.del(`dashboard:stats:${userId}`);
        } catch (e) {}

        return { success: true };
    } catch (error) {
        console.error("Failed to remove user from institution:", error);
        return { success: false, error: "Failed to remove user from institution" };
    }
}
