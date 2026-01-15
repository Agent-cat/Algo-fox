"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";

const staffSchema = z.object({
  email: z.email(),
  role: z.enum(["TEACHER", "CONTEST_MANAGER"]),
  institutionId: z.string(),
});

export async function addStaffMember(data: z.infer<typeof staffSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    // Security check: Only institution managers or admins can add staff
    if (currentUser.role !== "ADMIN") {
      if (
        currentUser.role !== "INSTITUTION_MANAGER" ||
        currentUser.institutionId !== data.institutionId
      ) {
        return { success: false, error: "Unauthorized" };
      }
    }

    const validatedData = staffSchema.parse(data);

    const targetUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!targetUser) {
      return {
        success: false,
        error: "User not found. They must sign up first.",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUser.id },
      data: {
        role: validatedData.role,
        institutionId: validatedData.institutionId,
      },
    });

    revalidatePath("/dashboard/institution");
    updateTag(`user-${targetUser.id}`);

    return { success: true, user: updatedUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Failed to add staff member:", error);
    return { success: false, error: "Failed to add staff member" };
  }
}

export async function getInstitutionStaff(institutionId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    // Security check
    if (currentUser.role !== "ADMIN") {
      if (
        currentUser.role !== "INSTITUTION_MANAGER" ||
        currentUser.institutionId !== institutionId
      ) {
        return { success: false, error: "Unauthorized" };
      }
    }

    const staff = await prisma.user.findMany({
      where: {
        institutionId,
        role: {
          in: ["TEACHER", "CONTEST_MANAGER"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, staff };
  } catch (error) {
    console.error("Failed to fetch institution staff:", error);
    return { success: false, error: "Failed to fetch staff" };
  }
}

export async function getInstitutionStatsAction(institutionId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    // Security check
    if (currentUser.role !== "ADMIN") {
      if (
        currentUser.role !== "INSTITUTION_MANAGER" ||
        currentUser.institutionId !== institutionId
      ) {
        return { success: false, error: "Unauthorized" };
      }
    }

    const { InstitutionService } = await import(
      "@/core/services/institution.service"
    );
    const stats = await InstitutionService.getInstitutionStats(institutionId);

    return { success: true, stats };
  } catch (error) {
    console.error("Failed to fetch institution stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

export async function deleteStaffMember(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;
    const targetUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!targetUser) return { success: false, error: "User not found" };

    // Security check
    if (currentUser.role !== "ADMIN") {
      if (
        currentUser.role !== "INSTITUTION_MANAGER" ||
        currentUser.institutionId !== targetUser.institutionId
      ) {
        return { success: false, error: "Unauthorized" };
      }
    }

    // Only allow removing form institution, not deleting user entirely?
    // User requested "delete", but usually we just remove from institution.
    // If we remove from institution, we set institutionId to null and role to STUDENT?

    await prisma.user.update({
        where: { id: userId },
        data: {
            institutionId: null,
            role: "STUDENT" // Reset to student
        }
    });

    revalidatePath("/dashboard/institution");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove staff member:", error);
    return { success: false, error: "Failed to remove member" };
  }
}


export async function getInstitutionUsers(
    institutionId: string,
    role: "TEACHER" | "CONTEST_MANAGER" | "STUDENT",
    page: number = 1,
    limit: number = 20
) {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) {
        return { success: false, error: "Unauthorized" };
      }

      const currentUser = session.user as any;

      if (currentUser.role !== "ADMIN") {
        if (
          currentUser.role !== "INSTITUTION_MANAGER" ||
          currentUser.institutionId !== institutionId
        ) {
          return { success: false, error: "Unauthorized" };
        }
      }

      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
          prisma.user.findMany({
            where: {
              institutionId,
              role: role,
            },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              image: true,
              createdAt: true,
              _count: {
                  select: {
                      taughtClassrooms: true
                  }
              }
            },
            orderBy: {
              createdAt: "desc",
            },
            skip,
            take: limit
          }),
          prisma.user.count({
              where: {
                  institutionId,
                  role: role
              }
          })
      ]);

      return {
          success: true,
          users,
          pagination: {
              total,
              pages: Math.ceil(total / limit),
              current: page,
              limit
          }
      };
    } catch (error) {
      console.error(`Failed to fetch institution ${role}s:`, error);
      return { success: false, error: "Failed to fetch users" };
    }
  }
