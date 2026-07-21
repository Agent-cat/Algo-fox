"use server";

import { getSession } from "@/lib/auth-utils";
import { BlogService } from "@/core/services/blog.service";
import { revalidateTag, cacheLife, cacheTag } from "next/cache";

/**
 * Public Action: Get paginated and filtered blog posts
 * Fully cached with Next.js Cache Components
 */
export async function getBlogPostsAction(options: {
  page?: number;
  pageSize?: number;
  search?: string;
  keyword?: string;
  onlyPublished?: boolean;
}) {
  if (options.onlyPublished === false) {
    const session = await getSession();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      throw new Error("Unauthorized");
    }
  }

  // Since we use caching, we separate into a cached sub-function
  return getCachedBlogPosts(options);
}

async function getCachedBlogPosts(options: {
  page?: number;
  pageSize?: number;
  search?: string;
  keyword?: string;
  onlyPublished?: boolean;
}) {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });
  
  // Custom tag based on parameters
  const tagKey = `blogs-list-${options.page || 1}-${options.pageSize || 10}-${options.search || ""}-${options.keyword || ""}-${options.onlyPublished !== false}`;
  cacheTag(tagKey, "blogs-list");

  return BlogService.getBlogPosts(options);
}

/**
 * Public Action: Get popular posts by upvote count
 */
export async function getPopularBlogPostsAction(limit: number = 5) {
  return getCachedPopularBlogPosts(limit);
}

async function getCachedPopularBlogPosts(limit: number) {
  "use cache";
  cacheLife({ stale: 60, revalidate: 120, expire: 1200 });
  cacheTag("blogs-popular", "blogs-list");

  return BlogService.getPopularPosts(limit);
}

/**
 * Public Action: Get a blog post by its slug
 */
export async function getBlogPostBySlugAction(slug: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  return getCachedBlogPostBySlug(slug, userId);
}

async function getCachedBlogPostBySlug(slug: string, userId?: string) {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });
  cacheTag(`blog-post-${slug}`, "blogs-list");

  return BlogService.getBlogPostBySlug(slug, userId);
}

/**
 * Admin Action: Get a blog post by ID (for edit view)
 */
export async function getBlogPostByIdAction(id: string) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return BlogService.getBlogPostById(id);
}

/**
 * Admin Action: Create a blog post
 */
export async function createBlogPostAction(data: {
  title: string;
  content: string;
  description: string;
  coverImage?: string | null;
  isPublished?: boolean;
  seoKeywords?: string[];
  focusKeyword?: string | null;
}) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const post = await BlogService.createBlogPost(session.user.id, data);

    // Revalidate public lists and detail
    revalidateTag("blogs-list", "max");
    
    return { success: true, post };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create blog post" };
  }
}

/**
 * Admin Action: Update an existing blog post
 */
export async function updateBlogPostAction(
  id: string,
  data: {
    title?: string;
    content?: string;
    description?: string;
    coverImage?: string | null;
    isPublished?: boolean;
    seoKeywords?: string[];
    focusKeyword?: string | null;
  }
) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const post = await BlogService.updateBlogPost(id, data);

    // Revalidate public cache tags
    revalidateTag("blogs-list", "max");
    revalidateTag(`blog-post-${post.slug}`, "max");
    
    return { success: true, post };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update blog post" };
  }
}

/**
 * Admin Action: Delete a blog post
 */
export async function deleteBlogPostAction(id: string) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const post = await BlogService.deleteBlogPost(id);

    // Revalidate public lists and this post's slug
    revalidateTag("blogs-list", "max");
    revalidateTag(`blog-post-${post.slug}`, "max");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete blog post" };
  }
}

/**
 * Public/User Action: Toggle upvote on a blog post
 */
export async function toggleBlogUpvoteAction(postId: string) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "You must be logged in to upvote" };
  }

  try {
    const res = await BlogService.toggleUpvote(session.user.id, postId);

    // Revalidate this post's detail caching
    const post = await BlogService.getBlogPostById(postId);
    if (post) {
      revalidateTag(`blog-post-${post.slug}`, "max");
      revalidateTag("blogs-list", "max");
    }

    return { success: true, upvoted: res.upvoted };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to upvote blog post" };
  }
}
