import redis from "@/lib/redis";

const CACHE_KEY = "algofox:notifications:recent";
const CACHE_TTL_SECONDS = 300; // 5 minutes

interface CachedNotification {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: {
        id: string;
        name: string;
        image?: string | null;
    };
    targetTags: string[];
    pinned: boolean;
    createdAt: string;
    updatedAt: string;
}

export async function getCachedNotifications(): Promise<CachedNotification[] | null> {
    try {
        const data = await redis.get(CACHE_KEY);
        if (!data) return null;
        return JSON.parse(data) as CachedNotification[];
    } catch {
        return null;
    }
}

export async function setCachedNotifications(notifications: CachedNotification[]): Promise<void> {
    try {
        await redis.setex(CACHE_KEY, CACHE_TTL_SECONDS, JSON.stringify(notifications));
    } catch {
        // Silently fail - cache miss is handled gracefully
    }
}

export async function invalidateNotificationCache(): Promise<void> {
    try {
        await redis.del(CACHE_KEY);
    } catch {
        // Silently fail
    }
}
