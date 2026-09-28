import redis from '@algofox/db';
import { AnalyticsSection } from "@algofox/types";

const ANALYTICS_CACHE_TTL_SECONDS = 60;

/**
 * Formats a Redis cache key for a classroom analytics section.
 * Key format: classroom:{classroomId}:analytics:{section}
 */
export function analyticsKey(classroomId: string, section: AnalyticsSection): string {
  return `classroom:${classroomId}:analytics:${section}`;
}

/**
 * Retrieves cached analytics data by key. Returns null on miss or any error.
 */
export async function getAnalyticsCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[Analytics Cache] Failed to get key "${key}":`, error);
    return null;
  }
}

/**
 * Sets analytics data in cache with a 60-second TTL. Swallows errors silently with logging.
 */
export async function setAnalyticsCache<T>(key: string, data: T): Promise<void> {
  try {
    const payload = JSON.stringify(data);
    await redis.setex(key, ANALYTICS_CACHE_TTL_SECONDS, payload);
  } catch (error) {
    console.error(`[Analytics Cache] Failed to set key "${key}":`, error);
  }
}

/**
 * Invalidates specified analytics cache keys for a given classroom.
 * If sections array is omitted, invalidates all 6 analytics section keys.
 * Uses Promise.allSettled for atomic best-effort deletion.
 */
export async function invalidateAnalyticsCache(
  classroomId: string,
  sections?: AnalyticsSection[]
): Promise<void> {
  const targetSections: AnalyticsSection[] = sections ?? [
    'overview',
    'tag-mastery',
    'heatmap',
    'risk',
    'assignments',
    'contests',
  ];

  const keys = targetSections.map((sec) => analyticsKey(classroomId, sec));

  try {
    const results = await Promise.allSettled(keys.map((k) => redis.del(k)));
    results.forEach((res, idx) => {
      if (res.status === 'rejected') {
        console.error(
          `[Analytics Cache] Failed to invalidate key "${keys[idx]}":`,
          res.reason
        );
      }
    });
  } catch (error) {
    console.error(`[Analytics Cache] Error invalidating cache for classroom ${classroomId}:`, error);
  }
}
