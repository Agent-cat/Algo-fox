"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cacheKey, cachedFetch, CACHE_CONFIG } from "@/lib/cache-utils";

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

    // Invalidate caches
    revalidateTag(`institution-staff-${validatedData.institutionId}`, "max");
    revalidateTag(`institution-stats-${validatedData.institutionId}`, "max");
    revalidateTag(`user-${targetUser.id}`, "max");
    revalidatePath("/dashboard/institution");

    return { success: true, user: updatedUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Failed to add staff member:", error);
    return { success: false, error: "Failed to add staff member" };
  }
}

/**
 * Get institution staff members (CACHED)
 */
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

    const fetchStaff = unstable_cache(
      async () => {
        return await prisma.user.findMany({
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
      },
      [`institution-staff-${institutionId}`],
      { tags: [`institution-staff-${institutionId}`], revalidate: 120 }
    );

    const staff = await fetchStaff();
    return { success: true, staff };
  } catch (error) {
    console.error("Failed to fetch institution staff:", error);
    return { success: false, error: "Failed to fetch staff" };
  }
}

/**
 * Get institution statistics (CACHED with Redis for hot data)
 */
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

    // Use Redis cache for stats (frequently accessed, computed data)
    const statsCacheKey = cacheKey("institution-stats", institutionId);

    const stats = await cachedFetch(
      statsCacheKey,
      async () => {
        // Parallel queries for better performance
        const [roleCounts, classroomCount] = await Promise.all([
          prisma.user.groupBy({
            by: ['role'],
            where: { institutionId },
            _count: true,
          }),
          prisma.classroom.count({
            where: { institutionId },
          })
        ]);

        const roleCountsMap = roleCounts.reduce((acc, curr) => {
          acc[curr.role as string] = curr._count;
          return acc;
        }, {} as Record<string, number>);

        return {
          students: roleCountsMap["STUDENT"] || 0,
          teachers: roleCountsMap["TEACHER"] || 0,
          contestManagers: roleCountsMap["CONTEST_MANAGER"] || 0,
          classrooms: classroomCount,
        };
      },
      CACHE_CONFIG.LONG.ttl // 10 minutes
    );

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

    const institutionId = targetUser.institutionId;

    await prisma.user.update({
        where: { id: userId },
        data: {
            institutionId: null,
            role: "STUDENT"
        }
    });

    // Invalidate caches
    if (institutionId) {
      revalidateTag(`institution-staff-${institutionId}`, "max");
      revalidateTag(`institution-stats-${institutionId}`, "max");
    }
    revalidatePath("/dashboard/institution");

    return { success: true };
  } catch (error) {
    console.error("Failed to remove staff member:", error);
    return { success: false, error: "Failed to remove member" };
  }
}

/**
 * Get institution users with pagination (CACHED)
 */
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

      const fetchUsers = unstable_cache(
        async () => {
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

          return { users, total };
        },
        [`institution-users-${institutionId}-${role}-page-${page}`],
        { tags: [`institution-users-${institutionId}-${role}`], revalidate: 120 }
      );

      const { users, total } = await fetchUsers();

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
