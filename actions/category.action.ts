"use server";

import { CategoryService } from "@/core/services/category.service";
import { ProblemDomain, Difficulty } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, updateTag, cacheTag, cacheLife } from "next/cache";

// GETTING ALL CATEGORIES

export async function getCategories(domain: ProblemDomain = "DSA") {
  "use cache: private"; // Must be at top - allows headers() inside
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  cacheTag(`categories-${domain}${userId ? `-user-${userId}` : ''}`, 'categories-list');

  return CategoryService.getCategories(domain, userId);
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
  pageSize: number = 10
) {
  "use cache: private"; // Must be at top - allows headers() inside
  cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  cacheTag(`category-problems-${categoryId}-page-${page}${userId ? `-user-${userId}` : ''}`, `category-${categoryId}`, 'categories-list');

  return CategoryService.getCategoryProblems(categoryId, page, pageSize, userId);
}


// CREATING A CATEGORY --> ADMIN ONLY

export async function createCategory(data: {
  name: string;
  description?: string;
  slug: string;
  order?: number;
  domain?: ProblemDomain;
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
    // REVALIDATING THE PATHS
    revalidatePath("/dsa");
    revalidatePath("/admin/categories");
    updateTag('categories-list');
  }

  return result;
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

  const result = await CategoryService.updateCategory(id, data);

  if (result.success) {
    // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES
    revalidatePath("/dsa");
    revalidatePath("/admin/categories");
    updateTag('categories-list');
    if (data.slug) {
      updateTag(`category-${data.slug}`);
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
    // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES
    revalidatePath("/dsa");
    revalidatePath("/admin/categories");
    updateTag('categories-list');
    if (result.slug) {
      updateTag(`category-${result.slug}`);
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
    revalidatePath("/dsa");
    revalidatePath("/sql");
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath(`/admin/dsa/categories/${categoryId}`);
    revalidatePath(`/admin/sql/categories/${categoryId}`);
    updateTag(`category-${categoryId}`);
    updateTag('categories-list');
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
    revalidatePath("/dsa");
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
    revalidatePath("/dsa");
    revalidatePath("/sql");
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath(`/admin/dsa/categories/${categoryId}`);
    revalidatePath(`/admin/sql/categories/${categoryId}`);
    revalidatePath("/admin/problems");
    revalidatePath("/admin/dsa/problems");
    revalidatePath("/admin/sql/problems");
  }

  return result;
}
