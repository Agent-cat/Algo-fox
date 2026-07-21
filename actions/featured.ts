"use server";

import { getSession } from "@/lib/auth-utils";
import { FeaturedService } from "@/core/services/featured.service";
import { revalidateTag, cacheLife, cacheTag } from "next/cache";

/**
 * Public Action: Get cached list of featured items
 */
export async function getFeaturedItemsAction() {
  return getCachedFeaturedItems();
}

async function getCachedFeaturedItems() {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });
  cacheTag("featured-items-list");

  return FeaturedService.getFeaturedItems();
}

/**
 * Admin Action: Create a new featured item
 */
export async function createFeaturedItemAction(data: {
  imageUrl: string;
  redirectUrl: string;
  order?: number;
}) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  if (!data.imageUrl.trim() || !data.redirectUrl.trim()) {
    return { success: false, error: "Image URL and Redirect URL are required" };
  }

  try {
    const item = await FeaturedService.createFeaturedItem(data);
    revalidateTag("featured-items-list", "max");
    return { success: true, item };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create featured item" };
  }
}

/**
 * Admin Action: Delete a featured item
 */
export async function deleteFeaturedItemAction(id: string) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await FeaturedService.deleteFeaturedItem(id);
    revalidateTag("featured-items-list", "max");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete featured item" };
  }
}

/**
 * Admin Action: Update an existing featured item
 */
export async function updateFeaturedItemAction(
  id: string,
  data: {
    imageUrl?: string;
    redirectUrl?: string;
    order?: number;
  }
) {
  const session = await getSession();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const item = await FeaturedService.updateFeaturedItem(id, data);
    revalidateTag("featured-items-list", "max");
    return { success: true, item };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update featured item" };
  }
}
