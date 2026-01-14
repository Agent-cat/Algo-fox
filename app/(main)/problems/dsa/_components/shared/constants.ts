// Shared constants for DSA problems section
export const PROBLEMS_PAGE_SIZE = 10;
export const SEARCH_DEBOUNCE_DELAY = 300; // ms
export const CACHE_TTL = 300; // 5 minutes in seconds
export const INTERSECTION_THRESHOLD = 0.1;

// Difficulty colors
export const DIFFICULTY_COLORS = {
    EASY: "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10",
    MEDIUM: "text-amber-500 bg-amber-50/50 dark:bg-amber-500/10",
    HARD: "text-rose-500 bg-rose-50/50 dark:bg-rose-500/10",
    CONCEPT: "text-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10",
} as const;

// Animation configurations
export const ANIMATION_CONFIG = {
    spring: { type: "spring", stiffness: 400, damping: 25 },
    duration: { duration: 0.3 },
} as const;
