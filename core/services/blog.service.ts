import { prisma } from "@/lib/prisma";

export class BlogService {
  /**
   * Helper to generate a unique slug from title
   */
  private static async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-"); // Replace multiple - with single -

    if (!baseSlug) {
      baseSlug = "untitled";
    }

    let slug = baseSlug;
    let count = 1;

    while (true) {
      const existing = await prisma.blogPost.findFirst({
        where: {
          slug,
          id: excludeId ? { not: excludeId } : undefined,
        },
      });

      if (!existing) {
        break;
      }

      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  }

  /**
   * Helper to calculate read time in minutes (200 words per minute)
   */
  private static calculateReadTime(content: string): number {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  /**
   * Get paginated and filtered blog posts
   */
  static async getBlogPosts(options: {
    page?: number;
    pageSize?: number;
    search?: string;
    keyword?: string;
    onlyPublished?: boolean;
  }) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (options.onlyPublished !== false) {
      where.isPublished = true;
    }

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: "insensitive" } },
        { description: { contains: options.search, mode: "insensitive" } },
        { content: { contains: options.search, mode: "insensitive" } },
      ];
    }

    if (options.keyword) {
      where.seoKeywords = { has: options.keyword };
    }

    const [total, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          isPublished: true,
          readTime: true,
          createdAt: true,
          updatedAt: true,
          publishedAt: true,
          upvotesCount: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
            },
          },
          seoKeywords: true,
          focusKeyword: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      posts,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Get all popular posts by upvote count
   */
  static async getPopularPosts(limit: number = 5) {
    return prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        readTime: true,
        publishedAt: true,
        upvotesCount: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        upvotesCount: "desc",
      },
      take: limit,
    });
  }

  /**
   * Get a blog post by its slug (useful for public article page)
   */
  static async getBlogPostBySlug(slug: string, userId?: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
    });

    if (!post) return null;

    let hasUpvoted = false;
    if (userId) {
      const upvote = await prisma.blogUpvote.findUnique({
        where: {
          userId_postId: {
            userId,
            postId: post.id,
          },
        },
      });
      hasUpvoted = !!upvote;
    }

    return {
      ...post,
      hasUpvoted,
    };
  }

  /**
   * Get a blog post by its ID (useful for editing)
   */
  static async getBlogPostById(id: string) {
    return prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }

  /**
   * Create a new blog post
   */
  static async createBlogPost(
    authorId: string,
    data: {
      title: string;
      content: string;
      description: string;
      coverImage?: string | null;
      isPublished?: boolean;
      seoKeywords?: string[];
      focusKeyword?: string | null;
    }
  ) {
    const slug = await this.generateUniqueSlug(data.title);
    const readTime = this.calculateReadTime(data.content);
    const isPublished = data.isPublished || false;

    return prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        description: data.description,
        coverImage: data.coverImage || null,
        isPublished,
        readTime,
        publishedAt: isPublished ? new Date() : null,
        authorId,
        seoKeywords: data.seoKeywords || [],
        focusKeyword: data.focusKeyword || null,
      },
    });
  }

  /**
   * Update an existing blog post
   */
  static async updateBlogPost(
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      throw new Error("Blog post not found");
    }

    const updateData: any = { ...data };

    if (data.title && data.title !== existing.title) {
      updateData.slug = await this.generateUniqueSlug(data.title, id);
    }

    if (data.content !== undefined) {
      updateData.readTime = this.calculateReadTime(data.content);
    }

    if (data.isPublished !== undefined && data.isPublished !== existing.isPublished) {
      updateData.publishedAt = data.isPublished ? new Date() : null;
    }

    return prisma.blogPost.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete a blog post
   */
  static async deleteBlogPost(id: string) {
    return prisma.blogPost.delete({ where: { id } });
  }

  /**
   * Toggle upvote status for a blog post
   */
  static async toggleUpvote(userId: string, postId: string) {
    const key = { userId_postId: { userId, postId } };

    const existing = await prisma.blogUpvote.findUnique({ where: key });

    if (existing) {
      // Remove upvote
      await prisma.$transaction([
        prisma.blogUpvote.delete({ where: key }),
        prisma.blogPost.update({
          where: { id: postId },
          data: { upvotesCount: { decrement: 1 } },
        }),
      ]);
      return { upvoted: false };
    } else {
      // Add upvote
      await prisma.$transaction([
        prisma.blogUpvote.create({ data: { userId, postId } }),
        prisma.blogPost.update({
          where: { id: postId },
          data: { upvotesCount: { increment: 1 } },
        }),
      ]);
      return { upvoted: true };
    }
  }
}
