/**
 * CENTRALIZED CACHE CONFIGURATION
 *
 * This file defines all cache strategies for the application.
 * Previously scattered cache directives have been consolidated here
 * to prevent stale data and ensure consistency.
 *
 * SECURITY FIX: Prevents undefined cache behaviors that can cause stale data
 */

export const CACHE_CONFIG = {
  /**
   * Submission data - Critical, should be fresh
   * Never stale, but can be cached briefly for burst requests
   */
  submission: {
    staleTime: 0,           // Never serve stale
    revalidateTime: 5,      // Revalidate every 5 seconds
    maxAge: 60,             // Cache 1 minute max
    tags: ["submissions"],
    version: 1,
    description: "Submission results and status"
  },

  /**
   * Leaderboard - High priority, moderate freshness
   * Can tolerate slight staleness (10-15 sec) for performance
   */
  leaderboard: {
    staleTime: 10,          // 10 sec stale OK
    revalidateTime: 30,     // Revalidate every 30 sec
    maxAge: 300,            // Cache 5 min max
    tags: ["leaderboard", "submissions"],
    version: 1,
    description: "Contest leaderboards and rankings"
  },

  /**
   * Contest details - Should be fresh but contest details rarely change
   */
  contestDetail: {
    staleTime: 5,           // 5 sec stale OK
    revalidateTime: 15,     // Revalidate every 15 sec
    maxAge: 600,            // Cache 10 min max
    tags: ["contest-detail", "contests"],
    version: 1,
    description: "Individual contest details and problems"
  },

  /**
   * Contest list - Can tolerate more staleness
   */
  contests: {
    staleTime: 30,          // 30 sec stale OK
    revalidateTime: 60,     // Revalidate every 60 sec
    maxAge: 600,            // Cache 10 min max
    tags: ["contests"],
    version: 1,
    description: "Contest listings and pagination"
  },

  /**
   * Problems list - Moderate freshness
   */
  problems: {
    staleTime: 30,
    revalidateTime: 90,
    maxAge: 900,            // Cache 15 min max
    tags: ["problems"],
    version: 1,
    description: "Problem listings and pagination"
  },

  /**
   * Problem details - Less frequent changes
   */
  problemDetail: {
    staleTime: 60,
    revalidateTime: 120,
    maxAge: 1800,           // Cache 30 min max
    tags: ["problem-detail", "problems"],
    version: 1,
    description: "Individual problem details and test cases"
  },

  /**
   * User profile - Can be stale longer
   */
  userProfile: {
    staleTime: 60,
    revalidateTime: 180,
    maxAge: 1800,
    tags: ["user-profile", "users"],
    version: 1,
    description: "User profiles and stats"
  },

  /**
   * Classroom data - Moderate freshness
   */
  classroom: {
    staleTime: 15,
    revalidateTime: 30,
    maxAge: 600,
    tags: ["classrooms"],
    version: 1,
    description: "Classroom information and participant lists"
  },

  /**
   * Assignments - Moderate freshness
   */
  assignment: {
    staleTime: 15,
    revalidateTime: 30,
    maxAge: 600,
    tags: ["assignments"],
    version: 1,
    description: "Assignment details and submissions"
  },

  /**
   * Categories - Rarely changes
   */
  categories: {
    staleTime: 300,
    revalidateTime: 600,
    maxAge: 3600,           // Cache 1 hour
    tags: ["categories"],
    version: 1,
    description: "Problem categories and tags"
  },

  /**
   * Institution data - Rarely changes
   */
  institution: {
    staleTime: 300,
    revalidateTime: 600,
    maxAge: 3600,
    tags: ["institutions"],
    version: 1,
    description: "Institution information and stats"
  },

  /**
   * Analytics/Dashboard - Moderate freshness
   */
  analytics: {
    staleTime: 30,
    revalidateTime: 120,
    maxAge: 900,
    tags: ["analytics", "dashboard"],
    version: 1,
    description: "User analytics and dashboard data"
  }
};

/**
 * Get cache profile with fallback to sensible defaults
 */
export function getCacheProfile(key: keyof typeof CACHE_CONFIG) {
  return CACHE_CONFIG[key] || {
    staleTime: 30,
    revalidateTime: 60,
    maxAge: 300,
    tags: [key],
    version: 1
  };
}

/**
 * Convert seconds to milliseconds (helper)
 */
export function toMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Get cache duration object for cacheLife()
 * Returns: { stale, revalidate, expire } in seconds
 */
export function getCacheLifeConfig(key: keyof typeof CACHE_CONFIG) {
  const profile = getCacheProfile(key);
  return {
    stale: profile.staleTime,
    revalidate: profile.revalidateTime,
    expire: profile.maxAge
  };
}

/**
 * Get cache tags for revalidation
 */
export function getCacheTags(key: keyof typeof CACHE_CONFIG): string[] {
  const profile = getCacheProfile(key);
  return profile.tags;
}



/**
 * Example usage in Server Actions:
 *
 * import { getCacheLifeConfig, getCacheTags } from "@/lib/cache-config";
 *
 * export async function getLeaderboard(contestId: string) {
 *   "use cache";
 *
 *   const config = getCacheProfile("leaderboard");
 *   cacheLife(getCacheLifeConfig("leaderboard"));
 *   cacheTag(...getCacheTags("leaderboard"));
 *
 *   return fetchLeaderboardData(contestId);
 * }
 */
