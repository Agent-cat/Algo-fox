"use server";

import { CategoryService } from "@/core/services/category.service";
import { ProblemDomain, Difficulty } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag, cacheTag, cacheLife } from "next/cache";

// GETTING ALL CATEGORIES

// CACHE TAGS
export async function getCategoriesTag(domain: ProblemDomain, courseId?: string, userId?: string) {
  return `categories-${domain}${courseId ? `-course-${courseId}` : ''}${userId ? `-user-${userId}` : ''}`;
};

// GETTING ALL CATEGORIES

export async function getCategories(domain: ProblemDomain = "DSA", courseId?: string) {
  "use cache: private"; // Must be at top - allows headers() inside
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  cacheTag(await getCategoriesTag(domain, courseId, userId), 'categories-list');

  return CategoryService.getCategories(domain, userId, courseId);
}

// GETTING A CATEGORY BY SLUG

export async function getCategory(slug: string) {
  "use cache";
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

  cacheTag(`category-${slug}`, 'categories-list');

  return CategoryService.getCategoryBySlug(slug);
}

// GETTING A CATEGORY BY ID --> NO CACHING

export async function getCategoryById(id: string) {
  return CategoryService.getCategoryById(id);
}

// GETTING CATEGORY PROBLEMS

export async function getCategoryProblems(
  categoryId: string,
  page: number = 1,
  pageSize: number = 10,
  cursor?: string
) {
  "use cache: private"; // Must be at top - allows headers() inside
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  const tagKey = `category-problems-${categoryId}${cursor ? `-cursor-${cursor}` : `-page-${page}`}${userId ? `-user-${userId}` : ''}`;
  cacheTag(tagKey, `category-${categoryId}`, 'categories-list');

  return CategoryService.getCategoryProblems(categoryId, page, pageSize, userId, cursor);
}


// CREATING A CATEGORY --> ADMIN ONLY

export async function createCategory(data: {
  name: string;
  description?: string;
  slug: string;
  order?: number;
  domain?: ProblemDomain;
  parentId?: string | null;
}) {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const result = await CategoryService.createCategory(data);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath("/admin/categories");
    revalidateTag('categories-list', 'max');
    if (data.domain) {
      revalidateTag(await getCategoriesTag(data.domain), 'max');
    }
  }

  return result;
}

// UPDATING A CATEGORY --> ADMIN ONLY

export async function updateCategory(id: string, data: { name?: string; description?: string; slug?: string; order?: number; domain?: ProblemDomain; parentId?: string | null; }) {

  const session = await auth.api.getSession({
    headers: await headers()
  });
  // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const result = await CategoryService.updateCategory(id, data);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath("/admin/categories");
    revalidateTag('categories-list', 'max');
    if (result.category?.domain) {
      revalidateTag(await getCategoriesTag(result.category.domain), 'max');
      if (result.category.courseId) {
        revalidateTag(await getCategoriesTag(result.category.domain, result.category.courseId), 'max');
      }
    }
    if (data.slug) {
      revalidateTag(`category-${data.slug}`, 'max');
    }
  }

  return result;
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

  const result = await CategoryService.deleteCategory(id);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath("/admin/categories");
    revalidateTag('categories-list', 'max');
    const category = result.category as any;
    if (category?.domain) {
      revalidateTag(await getCategoriesTag(category.domain), 'max');
      if (category.courseId) {
        revalidateTag(await getCategoriesTag(category.domain, category.courseId), 'max');
      }
    }
    if (result.slug) {
      revalidateTag(`category-${result.slug}`, 'max');
    }
  }

  return result;
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

  const result = await CategoryService.addProblemToCategory(categoryId, problemId, order);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath(`/admin/dsa/categories/${categoryId}`);
    revalidatePath(`/admin/sql/categories/${categoryId}`);
    revalidateTag(`category-${categoryId}`, 'max');
    revalidateTag('categories-list', 'max');
  }

  return result;
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

  const result = await CategoryService.removeProblemFromCategory(categoryId, problemId);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath(`/admin/categories/${categoryId}`);
  }

  return result;
}

// CREATING A PROBLEM AND ADDING IT TO A CATEGORY --> ADMIN ONLY

export async function createProblemAndAddToCategory(
  categoryId: string,
  data: {
    title: string;
    description: string;
    difficulty: Difficulty;
    slug: string;
    hidden: boolean;
    hiddenQuery?: string | null;
    testCases?: { input: string; output: string; hidden?: boolean }[];
    isMcq?: boolean;
    options?: string[];
    answer?: string | null;
    solution?: string | null;
  }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const result = await CategoryService.createProblemAndAddToCategory(categoryId, data);

  if (result.success) {
    revalidatePath("/problems/dsa");
    revalidatePath("/problems/sql");
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath(`/admin/dsa/categories/${categoryId}`);
    revalidatePath(`/admin/sql/categories/${categoryId}`);
    revalidatePath("/admin/problems");
    revalidatePath("/admin/dsa/problems");
    revalidatePath("/admin/sql/problems");
  }

  return result;
}
