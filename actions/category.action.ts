"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import redis from "@/lib/redis";

const CACHE_TTL = 300; // 5 minutes

// CACHE KEY HELPERS

const getCategoriesCacheKey = () => "categories:all";
const getCategoryCacheKey = (slug: string) => `category:${slug}`;
const getCategoryProblemsCacheKey = (categoryId: string, page: number) =>
  `category:${categoryId}:problems:page:${page}`;


// GETTING ALL CATEGORIES

export async function getCategories() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const userId = session?.user?.id;

    // ONLY CACHING THE BASE CATEGORIES STRUCTURE, NOT USER-SPECIFIC SOLVED COUNTS

    const cacheKey = getCategoriesCacheKey();
    let categories;

    // GETTING CACHE FOR BASE CATEGORIES

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

      // CACHING THE BASE CATEGORIES STRUCTURE IF NOT CACHED

      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify({ categories }));
    }

    // IF USER IS LOGGED IN, CALCULATING SOLVED COUNT PER CATEGORY

    if (userId) {

      // USING RAW QUERY FOR PERFORMANCE - 30X FASTER THAN FETCHING ALL ROWS

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

      // CREATING A MAP OF SOLVED COUNT PER CATEGORY

      const solvedMap = new Map<string, number>();
      solvedCountsRaw.forEach((row: any) => {
        solvedMap.set(row.categoryId, row.count);
      });

      // MERGING INTO CATEGORIES
      categories = categories.map((cat: any) => ({
        ...cat,
        solvedCount: solvedMap.get(cat.id) || 0
      }));
    } else {
      // IF USER IS NOT LOGGED IN, SETTING SOLVED COUNT TO 0

      categories = categories.map((cat: any) => ({
        ...cat,
        solvedCount: 0
      }));
    }

    // RETURNING THE CATEGORIES

    return { categories };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { categories: [] };
  }
}

// GETTING A CATEGORY BY SLUG

export async function getCategory(slug: string) {
  try {
    const cacheKey = getCategoryCacheKey(slug);

    // GETTING CACHE FOR CATEGORY

    const cached = await redis.get(cacheKey);
    if (cached) {

      // RETURNING THE CACHE IF CACHED

      return JSON.parse(cached);
    }

    // GETTING CATEGORY FROM DATABASE IF NOT CACHED

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { categoryProblems: true }
        }
      }
    });

    // IF CATEGORY IS NOT FOUND, RETURNING AN ERROR

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    // CACHING THE CATEGORY

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(category));

    return { success: true, category: category };
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return { success: false, error: "Failed to fetch category: " + error };
  }
}

// GETTING A CATEGORY BY ID --> NO CACHING

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

// GETTING CATEGORY PROBLEMS

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

    // GETTING CACHE FOR CATEGORY PROBLEMS IF NOT CACHED

    if (!userId || page === 1) {
      const cached = await redis.get(cacheKey);
      if (cached) {

        // RETURNING THE CACHE IF CACHED

        const parsed = JSON.parse(cached);

        // IF USER IS AUTHENTICATED, WE NEED TO CHECK SOLVED STATUS

        if (userId) {
          // FETCHING SOLVED STATUS SEPARATELY

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

          // CREATING A SET OF SOLVED PROBLEMS

          const solvedSet = new Set(solvedProblems.map(s => s.problemId));

          // UPDATING THE PROBLEMS WITH SOLVED STATUS

          parsed.problems = parsed.problems.map((p: any) => ({
            ...p,
            isSolved: solvedSet.has(p.id)
          }));
        }

        // RETURNING THE PROBLEMS

        return parsed;
      }
    }

    // SKIPPING THE PROBLEMS

    const skip = (page - 1) * pageSize;

    // FETCHING THE CATEGORY PROBLEMS

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


// CREATING A CATEGORY --> ADMIN ONLY

export async function createCategory(data: {
  name: string;
  description?: string;
  slug: string;
  order?: number;
}) {



  const session = await auth.api.getSession({
    headers: await headers()
  });

  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {

    // CREATING THE CATEGORY

    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        order: data.order ?? 0
      }
    });

    // INVALIDATING THE CACHE

    await redis.del(getCategoriesCacheKey());

    // REVALIDATING THE PATHS
    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    // RETURNING THE SUCCESS AND THE CATEGORY
    return { success: true, category: category };

  } catch (error: any) {
    console.error("Failed to create category:", error);
    return {
      success: false,
      error: error.code === "P2002" ? "Slug already exists" : "Failed to create category"
    };
  }
}

// UPDATING A CATEGORY --> ADMIN ONLY

export async function updateCategory(id: string, data: { name?: string; description?: string; slug?: string; order?: number; }) {


  const session = await auth.api.getSession({
    headers: await headers()
  });
  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data
    });

    // INVALIDATING THE CACHE

    await redis.del(getCategoriesCacheKey());
    await redis.del(getCategoryCacheKey(category.slug));

    // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES

    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    return { success: true, category };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

// DELETING A CATEGORY --> ADMIN ONLY

export async function deleteCategory(id: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

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

    // INVALIDATING THE CACHE

    await redis.del(getCategoriesCacheKey());
    // INVALIDATING THE CACHE FOR THE CATEGORY IF IT EXISTS
    if (category) {
      await redis.del(getCategoryCacheKey(category.slug));
    }

    // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES

    revalidatePath("/problems/dsa");
    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}


// ADDING A PROBLEM TO A CATEGORY --> ADMIN ONLY

export async function addProblemToCategory(
  categoryId: string,
  problemId: string,
  order?: number
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    
    // UPDATING THE PROBLEM TO BE OF TYPE LEARN

    await prisma.problem.update({
      where: { id: problemId },
      data: { type: "LEARN" }
    });

    // CREATING THE CATEGORY PROBLEM

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

    // INVALIDATING THE CACHE FOR THE CATEGORY PROBLEMS
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


// REMOVING A PROBLEM FROM A CATEGORY --> ADMIN ONLY

export async function removeProblemFromCategory(
  categoryId: string,
  problemId: string
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {

    // DELETING THE CATEGORY PROBLEM

    await prisma.categoryProblem.delete({
      where: {
        categoryId_problemId: {
          categoryId,
          problemId
        }
      }
    });

    // INVALIDATING THE CACHE FOR THE CATEGORY PROBLEMS

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

