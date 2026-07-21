import { prisma } from "@/lib/prisma";

export class FeaturedService {
  /**
   * Get all featured items, ordered by their order field ascending, then by creation date descending
   */
  static async getFeaturedItems() {
    return prisma.featuredItem.findMany({
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ]
    });
  }

  /**
   * Create a new featured item
   */
  static async createFeaturedItem(data: { imageUrl: string; redirectUrl: string; order?: number }) {
    return prisma.featuredItem.create({
      data: {
        imageUrl: data.imageUrl,
        redirectUrl: data.redirectUrl,
        order: data.order ?? 0
      }
    });
  }

  /**
   * Delete a featured item
   */
  static async deleteFeaturedItem(id: string) {
    return prisma.featuredItem.delete({
      where: { id }
    });
  }

  /**
   * Update an existing featured item
   */
  static async updateFeaturedItem(id: string, data: { imageUrl?: string; redirectUrl?: string; order?: number }) {
    return prisma.featuredItem.update({
      where: { id },
      data: {
        imageUrl: data.imageUrl,
        redirectUrl: data.redirectUrl,
        order: data.order
      }
    });
  }
}
