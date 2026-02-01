
export interface Contest {
  id: string;
  name: string;
  url: string;
  start_time: string;
  end_time: string;
  duration: string;
  site: string;
  in_24_hours: string;
  status: string;
}

export type Platform = "LeetCode" | "CodeForces" | "CodeChef" | "AtCoder";

const CACHE_DURATION = 3600; // 1 hour

// Helper type for fetch options including Next.js extensions
type FetchOptions = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

// --- Fetchers ---

async function fetchCodeForces(options?: FetchOptions): Promise<Contest[]> {
    try {
        const res = await fetch("https://codeforces.com/api/contest.list?gym=false", {
            ...options,
            headers: {
                ...options?.headers,
                "User-Agent": "AlgoFox-Bot/1.0"
            }
        });
        if (!res.ok) throw new Error(`CodeForces API error: ${res.status}`);

        const data = await res.json();
        if (data.status !== "OK") throw new Error("CodeForces API returned non-OK status");

        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        const contests = data.result
            .filter((c: any) => {
                 const startTime = c.startTimeSeconds * 1000;
                 // Keep upcoming OR past contests within last 30 days
                 return c.phase === "BEFORE" || (c.phase === "FINISHED" && startTime > thirtyDaysAgo);
            })
            .map((c: any) => ({
                id: `codeforces-${c.id}`,
                name: c.name,
                url: `https://codeforces.com/contest/${c.id}`,
                start_time: new Date(c.startTimeSeconds * 1000).toISOString(),
                end_time: new Date((c.startTimeSeconds + c.durationSeconds) * 1000).toISOString(),
                duration: c.durationSeconds.toString(),
                site: "CodeForces",
                in_24_hours: (c.startTimeSeconds * 1000 - Date.now() < 86400000 && c.phase === "BEFORE") ? "Yes" : "No",
                status: c.phase === "BEFORE" ? "UPCOMING" : "FINISHED"
            }));

        return contests;
    } catch (e) {
        console.warn("CodeForces fetch failed:", e);
        return [];
    }
}

async function fetchLeetCode(options?: FetchOptions): Promise<Contest[]> {
    try {
        const query = `
            query upcomingContests {
                upcomingContests {
                    title
                    titleSlug
                    startTime
                    duration
                }
            }
        `;

        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com/contest/",
                "User-Agent": "AlgoFox-Bot/1.0",
                ...options?.headers
            },
            body: JSON.stringify({ query }),
            ...options,
        });

        if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`);
        const data = await res.json();

        if (data.errors) {
            throw new Error(`LeetCode GraphQL error: ${data.errors[0]?.message}`);
        }

        return data.data.upcomingContests.map((c: any) => {
            const start = new Date(c.startTime * 1000);
            const durationSeconds = c.duration;
            const end = new Date(c.startTime * 1000 + durationSeconds * 1000);

            return {
                id: `leetcode-${c.titleSlug}`,
                name: c.title,
                url: `https://leetcode.com/contest/${c.titleSlug}`,
                start_time: start.toISOString(),
                end_time: end.toISOString(),
                duration: durationSeconds.toString(),
                site: "LeetCode",
                in_24_hours: (start.getTime() - Date.now() < 86400000) ? "Yes" : "No",
                status: "UPCOMING"
            };
        });
    } catch (e) {
        console.warn("LeetCode fetch failed:", e);
        return [];
    }
}

async function fetchCodeChef(options?: FetchOptions): Promise<Contest[]> {
     try {
        // Using Direct CodeChef API
        const res = await fetch("https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all", {
            ...options,
             headers: {
                "User-Agent": "AlgoFox-Bot/1.0",
                ...options?.headers
            }
        });

        if (!res.ok) throw new Error(`CodeChef API error: ${res.status}`);
        const data = await res.json();

        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        // CodeChef returns { present_contests: [], future_contests: [], past_contests: [] }
        const future = data.future_contests || [];
        const past = (data.past_contests || []).filter((c: any) => {
             const start = new Date(c.contest_start_date_iso).getTime();
             return start > thirtyDaysAgo;
        });
        const present = data.present_contests || [];

        const all = [...present, ...future, ...past];

        return all.map((c: any) => {
             const status = present.some((p: any) => p.code === c.code) ? "ONGOING" : (future.some((f: any) => f.code === c.code) ? "UPCOMING" : "FINISHED");

             return {
                id: `codechef-${c.contest_code}`.toLowerCase(),
                name: c.contest_name,
                url: `https://www.codechef.com/${c.contest_code}`,
                start_time: c.contest_start_date_iso,
                end_time: c.contest_end_date_iso,
                duration: (parseInt(c.contest_duration) * 60).toString(),
                site: "CodeChef",
                in_24_hours: status === "ONGOING" || (status === "UPCOMING" && new Date(c.contest_start_date_iso).getTime() - Date.now() < 86400000) ? "Yes" : "No",
                status: status
            };
        });

    } catch (e) {
        console.warn("CodeChef fetch failed:", e);
        return [];
    }
}

// --- Main Aggregator ---

export async function fetchExternalContests(options?: FetchOptions) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second total timeout

    // Run all fetches in parallel
    const results = await Promise.allSettled([
        fetchCodeForces({ ...options, signal: controller.signal }),
        fetchLeetCode({ ...options, signal: controller.signal }),
        fetchCodeChef({ ...options, signal: controller.signal })
    ]);

    clearTimeout(timeoutId);

    const contests: Contest[] = [];

    results.forEach(result => {
        if (result.status === "fulfilled") {
            contests.push(...result.value);
        }
    });

    // Sort by start time
    contests.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    return contests;

  } catch (error) {
    console.error("Unexpected error in fetchExternalContests:", error);
    return [];
  }
}
