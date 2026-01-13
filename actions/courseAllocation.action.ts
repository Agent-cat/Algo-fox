"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ProblemDomain } from "@prisma/client";
import { revalidatePath, cacheTag, cacheLife } from "next/cache";

// Get all course allocations (cached)
export async function getCourseAllocations() {
  "use cache";
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes
  cacheTag("course-allocations");

  try {
    const allocations = await prisma.courseAllocation.findMany({
      orderBy: [{ year: "asc" }, { domain: "asc" }],
    });
    return { success: true, allocations };
  } catch (error) {
    console.error("Error fetching course allocations:", error);
    return { success: false, error: "Failed to fetch course allocations" };
  }
}

// Get courses allocated to a specific year
export async function getCoursesByYear(year: number) {
  "use cache";
  cacheLife({ stale: 900, revalidate: 900 });
  cacheTag("course-allocations", `course-year-${year}`);

  try {
    const allocations = await prisma.courseAllocation.findMany({
      where: { year },
      select: { domain: true },
    });
    return {
      success: true,
      domains: allocations.map((a) => a.domain),
    };
  } catch (error) {
    console.error("Error fetching courses by year:", error);
    return { success: false, error: "Failed to fetch courses", domains: [] };
  }
}

// Get user's allocated courses (based on their year)
export async function getUserAllocatedCourses() {
  "use cache: private";
  cacheLife({ stale: 900, revalidate: 900 });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized", domains: [] };
  }

  const userId = session.user.id;
  cacheTag(`user-courses-${userId}`);

  try {
    // Get user details with year
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { year: true, role: true },
    });

    if (!user) {
      return { success: false, error: "User not found", domains: [] };
    }

    // Admins, teachers, institution managers, and contest managers can see all courses
    const privilegedRoles = ["ADMIN", "TEACHER", "INSTITUTION_MANAGER", "CONTEST_MANAGER"];
    if (privilegedRoles.includes(user.role)) {
      return {
        success: true,
        domains: Object.values(ProblemDomain),
        isPrivileged: true,
      };
    }

    // If student doesn't have a year set, return empty (or all courses based on your preference)
    if (!user.year) {
      return {
        success: true,
        domains: [], // No courses until year is set
        isPrivileged: false,
      };
    }

    // Get courses allocated to user's year
    const allocations = await prisma.courseAllocation.findMany({
      where: { year: user.year },
      select: { domain: true },
    });

    return {
      success: true,
      domains: allocations.map((a) => a.domain),
      isPrivileged: false,
    };
  } catch (error) {
    console.error("Error fetching user allocated courses:", error);
    return { success: false, error: "Failed to fetch courses", domains: [] };
  }
}

// Allocate a course to a year (Admin/Institution Manager only)
export async function allocateCourse(year: number, domain: ProblemDomain) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const userRole = (session.user as any).role;
  if (!["ADMIN", "INSTITUTION_MANAGER"].includes(userRole)) {
    return { success: false, error: "Insufficient permissions" };
  }

  try {
    await prisma.courseAllocation.create({
      data: { year, domain },
    });

    revalidatePath("/admin/course-allocation");
    revalidatePath("/dashboard/institution/course-allocation");
    revalidatePath("/problems");

    return { success: true };
  } catch (error: any) {
    console.error("Error allocating course:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Course already allocated to this year" };
    }
    return { success: false, error: "Failed to allocate course" };
  }
}

// Remove course allocation (Admin/Institution Manager only)
export async function removeCourseAllocation(year: number, domain: ProblemDomain) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const userRole = (session.user as any).role;
  if (!["ADMIN", "INSTITUTION_MANAGER"].includes(userRole)) {
    return { success: false, error: "Insufficient permissions" };
  }

  try {
    await prisma.courseAllocation.delete({
      where: {
        year_domain: { year, domain },
      },
    });

    revalidatePath("/admin/course-allocation");
    revalidatePath("/dashboard/institution/course-allocation");
    revalidatePath("/problems");

    return { success: true };
  } catch (error) {
    console.error("Error removing course allocation:", error);
    return { success: false, error: "Failed to remove allocation" };
  }
}

// Bulk update allocations for a year
export async function updateYearAllocations(year: number, domains: ProblemDomain[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const userRole = (session.user as any).role;
  if (!["ADMIN", "INSTITUTION_MANAGER"].includes(userRole)) {
    return { success: false, error: "Insufficient permissions" };
  }

  try {
    // Delete existing allocations for this year
    await prisma.courseAllocation.deleteMany({
      where: { year },
    });

    // Create new allocations
    if (domains.length > 0) {
      await prisma.courseAllocation.createMany({
        data: domains.map((domain) => ({ year, domain })),
      });
    }

    revalidatePath("/admin/course-allocation");
    revalidatePath("/dashboard/institution/course-allocation");
    revalidatePath("/problems");

    return { success: true };
  } catch (error) {
    console.error("Error updating year allocations:", error);
    return { success: false, error: "Failed to update allocations" };
  }
}
