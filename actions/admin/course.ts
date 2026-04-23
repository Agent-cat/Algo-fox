"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-utils";

export async function getAdminCourses() {
    await requireAdmin();
    return await prisma.course.findMany({
        include: {
            _count: {
                select: {
                    modules: true,
                    enrollments: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function createCourse(formData: FormData) {
    await requireAdmin();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const difficultyRaw = formData.get("difficulty")?.toString();
    const domainRaw = formData.get("domain")?.toString();
    const duration = formData.get("duration")?.toString().trim() || null;
    const image = formData.get("image")?.toString().trim() || null;
    const isPublished = formData.get("isPublished") === "on";

    if (!title || !description) {
        throw new Error("Title and description are required");
    }

    // Coerce with allowed values or fallbacks
    const difficulty = (difficultyRaw === "EASY" || difficultyRaw === "MEDIUM" || difficultyRaw === "HARD" ? difficultyRaw : "EASY");
    const domain = (domainRaw === "DSA" || domainRaw === "SQL" || domainRaw === "APTITUDE" || domainRaw === "CONCEPT" ? domainRaw : "DSA");

    const tagsRaw = formData.get("tags")?.toString();
    const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : [];

    // Generate unique slug
    let slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    let baseSlug = slug;
    let suffix = 1;

    while (true) {
        const existing = await prisma.course.findUnique({ where: { slug } });
        if (!existing) break;
        slug = `${baseSlug}-${suffix++}`;
    }

    await prisma.course.create({
        data: {
            title,
            slug,
            description,
            difficulty: difficulty as any,
            tags,
            duration,
            isPublished,
            domain: domain as any,
            image
        }
    });

    revalidateTag("courses-list",'max');
    revalidatePath("/courses");
    redirect("/admin/courses");
}

export async function updateCourse(id: string, formData: FormData) {
    await requireAdmin();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const difficultyRaw = formData.get("difficulty")?.toString();
    const domainRaw = formData.get("domain")?.toString();
    const duration = formData.get("duration")?.toString().trim() || null;
    const image = formData.get("image")?.toString().trim() || null;
    const isPublished = formData.get("isPublished") === "on";

    if (!title || !description) {
        throw new Error("Title and description are required");
    }

    const difficulty = (difficultyRaw === "EASY" || difficultyRaw === "MEDIUM" || difficultyRaw === "HARD" ? difficultyRaw : "EASY");
    const domain = (domainRaw === "DSA" || domainRaw === "SQL" || domainRaw === "APTITUDE" || domainRaw === "CONCEPT" ? domainRaw : "DSA");

    const tagsRaw = formData.get("tags")?.toString();
    const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : [];

    // Generate unique slug
    let slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const existing = await prisma.course.findFirst({
        where: { slug, NOT: { id } }
    });

    if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    try {
        const course = await prisma.course.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                difficulty: difficulty as any,
                tags,
                duration,
                isPublished,
                domain: domain as any,
                image
            }
        });

        revalidateTag("courses-list", 'max');
        revalidateTag(`course-${course.slug}`, 'max');
        revalidatePath("/courses");
    } catch (error: any) {
        console.error("Failed to update course:", error);
        throw new Error(error.message || "Failed to update course");
    }

    redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
    await requireAdmin();
    const { CourseService } = await import("@/core/services/course.service");

    const course = await CourseService.deleteCourse(id);

    revalidateTag("courses-list", 'max');
    if (course?.slug) {
        revalidateTag(`course-${course.slug}`, 'max');
    }
    revalidatePath("/courses");
}

export async function createModule(courseId: string, name: string, parentId?: string | null) {
    await requireAdmin();
    // Get course domain
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { domain: true, slug: true }
    });

    if (!course) throw new Error("Course not found");

    await prisma.$transaction(async (tx) => {
        // Get highest order for sibling modules
        const lastModule = await tx.category.findFirst({
            where: { courseId, parentId: parentId || null },
            orderBy: { order: "desc" }
        });

        const order = lastModule ? lastModule.order + 1 : 0;

        // Unique slug generation
        const baseSlug = `${courseId}-${parentId ? parentId.slice(-4) + '-' : ''}${name.toLowerCase().replace(/ /g, "-")}`;
        let slug = baseSlug;
        let suffix = 1;

        while (true) {
            const existing = await tx.category.findFirst({
                where: { courseId, parentId: parentId || null, slug }
            });
            if (!existing) break;
            slug = `${baseSlug}-${suffix++}`;
        }

        await tx.category.create({
            data: {
                name,
                courseId,
                parentId: parentId || null,
                order,
                domain: course.domain,
                slug
            }
        });
    });

    revalidateTag(`course-${course.slug}`,'max');
}

export async function addProblemToModule(moduleId: string, problemId: string) {
    await requireAdmin();
    // Check if already exists
    const existing = await prisma.categoryProblem.findUnique({
        where: {
            categoryId_problemId: {
                categoryId: moduleId,
                problemId: problemId
            }
        }
    });

    if (existing) return;

    const lastProblem = await prisma.categoryProblem.findFirst({
        where: { categoryId: moduleId },
        orderBy: { order: "desc" }
    });

    const order = lastProblem ? lastProblem.order + 1 : 0;

    await prisma.categoryProblem.create({
        data: {
            categoryId: moduleId,
            problemId: problemId,
            order
        }
    });

    const module = await prisma.category.findUnique({
        where: { id: moduleId },
        include: { course: true }
    });
    if (module?.course) revalidateTag(`course-${module.course.slug}`,'max');
}

export async function removeProblemFromModule(moduleId: string, problemId: string) {
    await requireAdmin();
    await prisma.categoryProblem.deleteMany({
        where: {
            categoryId: moduleId,
            problemId: problemId
        }
    });

    const module = await prisma.category.findUnique({
        where: { id: moduleId },
        include: { course: true }
    });
    if (module?.course) revalidateTag(`course-${module.course.slug}`,'max');
}

export async function createProblemAndAddToModule(moduleId: string, data: any) {
    await requireAdmin();
    const { ProblemService } = await import("@/core/services/problem.service");

    // Get the courseId for this module
    const module = await prisma.category.findUnique({
        where: { id: moduleId },
        select: { courseId: true }
    });

    if (!module?.courseId) throw new Error("Module not found or not part of a course");

    // 1. Create the problem
    const { categoryId, ...problemData } = data;
    const result = await ProblemService.createProblem({
        ...problemData,
        courseId: module.courseId, // Link problem to course for cleanup
        type: "LEARN" // Default to LEARN for courses
    });

    if (!result.success || !result.problem) {
        return result;
    }

    // 2. Add to module
    await addProblemToModule(moduleId, result.problem.id);

    // Revalidate paths
    revalidatePath(`/admin/courses/${module.courseId}/modules`);

    return result;
}

export async function updateModule(moduleId: string, name: string) {
    await requireAdmin();
    const updated = await prisma.category.update({
        where: { id: moduleId },
        data: { name },
        include: { course: true }
    });

    if (updated.course) {
        revalidateTag(`course-${updated.course.slug}`, 'max');
    }
    return updated;
}

export async function deleteModule(moduleId: string) {
    await requireAdmin();
    const deleted = await prisma.category.delete({
        where: { id: moduleId },
        include: { course: true }
    });

    if (deleted.course) {
        revalidateTag(`course-${deleted.course.slug}`, 'max');
    }
    return deleted;
}

