// Shared constants for DSA problems section
export const PROBLEMS_PAGE_SIZE = 10;
export const SEARCH_DEBOUNCE_DELAY = 300; // ms
const CACHE_TTL = 300; // 5 minutes in seconds
export const INTERSECTION_THRESHOLD = 0.1;

// Difficulty colors
export const DIFFICULTY_COLORS = {
    EASY: "text-emerald-500",
    MEDIUM: "text-amber-500",
    HARD: "text-rose-500",
    CONCEPT: "text-indigo-500",
} as const;

// Animation configurations
const ANIMATION_CONFIG = {
    spring: { type: "spring", stiffness: 400, damping: 25 },
    duration: { duration: 0.3 },
} as const;
