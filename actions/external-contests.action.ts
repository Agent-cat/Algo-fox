import { cacheLife, cacheTag } from "next/cache";
import { fetchExternalContests } from "@/lib/contest-fetcher";

async function fetchContestsInternal() {
    const contests = await fetchExternalContests({
        next: { revalidate: 3600, tags: ["external-contests"] }
    });
    return { success: true, contests };
}

async function getCachedUpcomingContests() {
    "use cache";
    cacheLife("contests");
    cacheTag("external-contests");
    return fetchContestsInternal();
}

export async function getUpcomingContests(ignoreCache = false) {
    if (ignoreCache) {
        return fetchContestsInternal();
    }
    return getCachedUpcomingContests();
}

