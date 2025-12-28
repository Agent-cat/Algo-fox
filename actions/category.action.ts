"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import redis from "@/lib/redis";

const CACHE_TTL = 300; // 5 minutes

// Cache key helpers
const getCategoriesCacheKey = () => "categories:all";
const getCategoryCacheKey = (slug: string) => `category:${slug}`;
const getCategoryProblemsCacheKey = (categoryId: string, page: number) =>
  `category:${categoryId}:problems:page:${page}`;

export async function getCategories() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const userId = session?.user?.id;

    // We only cache the base categories structure, not user-specific solved counts
    // unless we want to cache per user (too expensive). 
    // Strategy: Cache base categories, then fetch solved count and merge.

    const cacheKey = getCategoriesCacheKey();
    let categories;

    // 1. Try cache for base categories
    const cached = await redis.get(cacheKey);
    if (cached) {
      categories = JSON.parse(cached).categories;
    } else {
      categories = await prisma.category.findMany({
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          order: true,
          _count: {
            select: { categoryProblems: true }
          }
        }
      });
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify({ categories }));
    }

    // 2. If user is logged in, calculate solved count per category
    if (userId) {
      // Use raw query for performance - 30x faster than fetching all rows
      const solvedCountsRaw = await prisma.$queryRaw<any[]>`
         SELECT
           cp."categoryId",
           CAST(COUNT(DISTINCT cp."problemId") AS INTEGER) as "count"
         FROM "CategoryProblem" cp
         JOIN "Submission" s ON cp."problemId" = s."problemId"
         WHERE s."userId" = ${userId} 
           AND s."status" = 'ACCEPTED'::"SubmissionResult"
           AND s."mode" = 'SUBMIT'::"SubmissionMode"
         GROUP BY cp."categoryId"
       `;

      const solvedMap = new Map<string, number>();
      solvedCountsRaw.forEach((row: any) => {
        solvedMap.set(row.categoryId, row.count);
      });

      // Merge into categories
      categories = categories.map((cat: any) => ({
        ...cat,
        solvedCount: solvedMap.get(cat.id) || 0
      }));
    } else {
      categories = categories.map((cat: any) => ({
        ...cat,
        solvedCount: 0
      }));
    }

    return { categories };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { categories: [] };
  }
}

export async function getCategory(slug: string) {
  try {
    const cacheKey = getCategoryCacheKey(slug);

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { categoryProblems: true }
        }
      }
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    const result = { success: true, category };

    // Cache result
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { categoryProblems: true }
        }
      }
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    return { success: true, category };
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function getCategoryProblems(
  categoryId: string,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const userId = session?.user?.id;

    const cacheKey = getCategoryProblemsCacheKey(categoryId, page);

    // Try cache first (only for non-authenticated or first page)
    if (!userId || page === 1) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        // If user is authenticated, we need to check solved status
        if (userId) {
          // Fetch solved status separately
          const problemIds = parsed.problems.map((p: any) => p.id);
          const solvedProblems = await prisma.submission.findMany({
            where: {
              userId,
              problemId: { in: problemIds },
              status: "ACCEPTED",
              mode: "SUBMIT"
            },
            select: { problemId: true },
            distinct: ["problemId"]
          });
          const solvedSet = new Set(solvedProblems.map(s => s.problemId));
          parsed.problems = parsed.problems.map((p: any) => ({
            ...p,
            isSolved: solvedSet.has(p.id)
          }));
        }
        return parsed;
      }
    }

    const skip = (page - 1) * pageSize;

    const [categoryProblems, total] = await Promise.all([
      prisma.categoryProblem.findMany({
        where: { categoryId },
        skip,
        take: pageSize,
        orderBy: { order: "asc" },
        include: {
          problem: {
            include: {
              _count: {
                select: { submissions: true }
              },
              ...(userId ? {
                submissions: {
                  where: {
                    userId: userId,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                  },
                  take: 1,
                  select: { id: true }
                }
              } : {})
            }
          }
        }
      }),
      prisma.categoryProblem.count({
        where: { categoryId }
      })
    ]);

    const problems = categoryProblems.map((cp) => {
      const p = cp.problem;
      const isSolved = (p as any).submissions?.length > 0;

      return {
        ...p,
        isSolved,
        acceptance: p._count.submissions > 0
          ? ((p.solved || 0) / p._count.submissions) * 100
          : 0,
        submissions: undefined
      };
    });

    const result = {
      problems,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page
    };

    // Cache result (only for first page and non-authenticated)
    if (!userId || page === 1) {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch category problems:", error);
    return { problems: [], totalPages: 0, currentPage: page };
  }
}

export async function createCategory(data: {
  name: string;
  description?: string;
  slug: string;
  order?: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        order: data.order ?? 0
      }
    });

    // Invalidate cache
    await redis.del(getCategoriesCacheKey());

    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    return { success: true, category };
  } catch (error: any) {
    console.error("Failed to create category:", error);
    return {
      success: false,
      error: error.code === "P2002" ? "Slug already exists" : "Failed to create category"
    };
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    description?: string;
    slug?: string;
    order?: number;
  }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data
    });

    // Invalidate cache
    await redis.del(getCategoriesCacheKey());
    await redis.del(getCategoryCacheKey(category.slug));

    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    return { success: true, category };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      select: { slug: true }
    });

    await prisma.category.delete({
      where: { id }
    });

    // Invalidate cache
    await redis.del(getCategoriesCacheKey());
    if (category) {
      await redis.del(getCategoryCacheKey(category.slug));
    }

    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

export async function addProblemToCategory(
  categoryId: string,
  problemId: string,
  order?: number
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // Ensure problem is of type LEARN
    await prisma.problem.update({
      where: { id: problemId },
      data: { type: "LEARN" }
    });

    const categoryProblem = await prisma.categoryProblem.create({
      data: {
        categoryId,
        problemId,
        order: order ?? 0
      },
      include: {
        problem: true,
        category: true
      }
    });

    // Invalidate cache
    const cachePattern = `category:${categoryId}:problems:*`;
    const keys = await redis.keys(cachePattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    await redis.del(getCategoryCacheKey(categoryProblem.category.slug));

    revalidatePath("/problems/dsa");
    revalidatePath(`/admin/categories/${categoryId}`);

    return { success: true, categoryProblem };
  } catch (error: any) {
    console.error("Failed to add problem to category:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Problem already in category" };
    }
    return { success: false, error: "Failed to add problem to category" };
  }
}

export async function removeProblemFromCategory(
  categoryId: string,
  problemId: string
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.categoryProblem.delete({
      where: {
        categoryId_problemId: {
          categoryId,
          problemId
        }
      }
    });

    // Invalidate cache
    const cachePattern = `category:${categoryId}:problems:*`;
    const keys = await redis.keys(cachePattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }

    revalidatePath("/problems/dsa");
    revalidatePath(`/admin/categories/${categoryId}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to remove problem from category:", error);
    return { success: false, error: "Failed to remove problem from category" };
  }
}

