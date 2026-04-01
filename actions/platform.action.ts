"use server";

import { JSDOM } from "jsdom";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function checkCodeChefUser(handle: string, ignoreCache = false) {
    try {
        const fetchOptions = ignoreCache
            ? { cache: 'no-store' as RequestCache }
            : { next: { revalidate: 3600 } }; // Cache for 1 hour

        const resdata = await fetch(
            `https://www.codechef.com/users/${handle}`,
            fetchOptions
        );

        if (resdata.status == 200) {

            let d = await resdata.text();
            let data = { data: d };

            // Heatmap data extraction
            let heatMapDataCursour1 =
                data.data.search("var userDailySubmissionsStats =") +
                "var userDailySubmissionsStats =".length;
            let heatMapDataCursour2 = data.data.search("'#js-heatmap") - 34;
            let heatDataString = data.data.substring(
                heatMapDataCursour1,
                heatMapDataCursour2
            );

            let headMapData = null;
            try {
                 headMapData = JSON.parse(heatDataString);
            } catch (e) {
                console.log("Error parsing heatmap data", e);
            }

            // Rating data extraction
            let allRating =
                data.data.search("var all_rating = ") + "var all_rating = ".length;
            let allRating2 = data.data.search("var current_user_rating =") - 6;

            let ratingData = null;
            try {
                 ratingData = JSON.parse(data.data.substring(allRating, allRating2));
            } catch (e) {
                console.log("Error parsing rating data", e);
            }

            let dom = new JSDOM(data.data);
            let document = dom.window.document;

            const name = document.querySelector(".user-details-container")?.children[0]
                ?.children[1]?.textContent || "";

            // Safe extraction with optional chaining
            const profile = document.querySelector(".user-details-container")?.children[0]
                ?.children[0]?.getAttribute("src") || "";

            const currentRatingText = document.querySelector(".rating-number")?.textContent;
            const currentRating = currentRatingText ? parseInt(currentRatingText) : 0;

            const highestRatingText = document.querySelector(".rating-number")?.parentNode?.children[4]?.textContent?.split("Rating")[1];
            const highestRating = highestRatingText ? parseInt(highestRatingText) : 0;

            const countryFlag = document.querySelector(".user-country-flag")?.getAttribute("src") || "";
            const countryName = document.querySelector(".user-country-name")?.textContent || "";

            const globalRankText = document.querySelector(".rating-ranks")?.children[0]?.children[0]
                ?.children[0]?.children[0]?.innerHTML;
            const globalRank = globalRankText ? parseInt(globalRankText) : 0;

            const countryRankText = document.querySelector(".rating-ranks")?.children[0]?.children[1]
                ?.children[0]?.children[0]?.innerHTML;
            const countryRank = countryRankText ? parseInt(countryRankText) : 0;

            const stars = document.querySelector(".rating")?.textContent || "unrated";

            // Extract Fully Solved Count
            let fullySolvedCount = 0;
            const h5Elements = document.querySelectorAll("h5");
            for (const h5 of h5Elements) {
                if (h5.textContent?.includes("Fully Solved")) {
                    const match = h5.textContent.match(/\d+/);
                    if (match) {
                        fullySolvedCount = parseInt(match[0]);
                    }
                    break;
                }
            }

            return {
                success: true,
                status: resdata.status,
                profile,
                name,
                currentRating,
                highestRating,
                countryFlag,
                countryName,
                globalRank,
                countryRank,
                stars,
                heatMap: headMapData,
                ratingData,
                fullySolvedCount
            };
        }
        else {
            return { success: false, status: resdata.status }
        }
    } catch (e) {
        console.log(e)
        return { success: false, status: 404 }
    }
}

export async function verifyCodeChefOwnership(handle: string, verificationCode: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Fetch fresh profile page, bypassing all caches
        const resdata = await fetch(
            `https://www.codechef.com/users/${handle}`,
            { cache: 'no-store' }
        );

        if (resdata.status !== 200) {
            return { success: false, error: "Failed to fetch CodeChef profile. Please ensure the handle is correct." };
        }

        const html = await resdata.text();

        // The verification code is 8 random base-36 characters – it cannot
        // appear in the page by coincidence.  If it's there, the user pasted
        // it into an editable field (name / bio / etc.).
        // This approach is robust against CodeChef HTML-structure changes.
        if (!html.includes(verificationCode)) {
            return { success: false, error: "Verification code not found in CodeChef profile. Please ensure you have saved the code in your Name field." };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                codeChefVerified: true,
                codeChefHandle: handle
            }
        });
        revalidatePath("/dashboard/settings");
        revalidateTag(`user-${session.user.id}`, "max");
        return { success: true };
    } catch (error) {
        console.error("CodeChef verification error:", error);
        return { success: false, error: "Failed to verify CodeChef profile" };
    }
}
// ... (existing imports and functions)

export async function checkCodeforcesUser(handle: string, ignoreCache = false) {
    try {
        const fetchOptions = ignoreCache
            ? { cache: 'no-store' as RequestCache }
            : { next: { revalidate: 3600 } };

        const [userInfoRes, userStatusRes] = await Promise.all([
            fetch(`https://codeforces.com/api/user.info?handles=${handle}`, fetchOptions),
            fetch(`https://codeforces.com/api/user.status?handle=${handle}`, fetchOptions)
        ]);

        if (userInfoRes.ok && userStatusRes.ok) {
            const userData = await userInfoRes.json();
            const statusData = await userStatusRes.json();

            if (userData.status === "OK" && userData.result.length > 0) {
                const user = userData.result[0];

                // Calculate solved count and difficulty breakdown
                const uniqueSolved = new Set<string>();
                const solvedByDifficulty = {
                    EASY: 0,
                    MEDIUM: 0,
                    HARD: 0,
                    TOTAL: 0
                };

                if (statusData.status === "OK") {
                    for (const submission of statusData.result) {
                        if (submission.verdict === "OK") {
                            const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
                            if (!uniqueSolved.has(problemId)) {
                                uniqueSolved.add(problemId);
                                const rating = submission.problem.rating;
                                if (rating) {
                                    if (rating < 1200) solvedByDifficulty.EASY++;
                                    else if (rating < 1600) solvedByDifficulty.MEDIUM++; // Adjusted thresholds
                                    else solvedByDifficulty.HARD++;
                                } else {
                                    // Treat unrated as easy or ignore? Let's add to Easy for now or just Total
                                    // solvedByDifficulty.EASY++;
                                }
                            }
                        }
                    }
                    solvedByDifficulty.TOTAL = uniqueSolved.size;
                }

                return {
                    success: true,
                    status: 200,
                    firstName: user.firstName,
                    // Check other fields if needed for existence or display
                    rating: user.rating,
                    rank: user.rank,
                    maxRating: user.maxRating,
                    maxRank: user.maxRank,
                    avatar: user.titlePhoto || user.avatar,
                    solvedByDifficulty
                };
            }
        }
        return { success: false, status: userInfoRes.status };
    } catch (e) {
        console.error(e);
        return { success: false, status: 500 };
    }
}

export async function verifyCodeforcesOwnership(handle: string, verificationCode: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }

    // Bypass cache for verification
    const result = await checkCodeforcesUser(handle, true);

    if (result.success) {
        // Check if the verification code is present in the first name
        // Codeforces allows changing First Name in settings
        if (result.firstName && result.firstName.includes(verificationCode)) {
             try {
                await prisma.user.update({
                    where: { id: session.user.id },
                    data: {
                        codeforcesVerified: true,
                        // Ensure the verified handle is the one stored
                        codeforcesHandle: handle
                    }
                });
                revalidatePath("/dashboard/settings"); // Revalidate settings pages
                revalidateTag(`user-${session.user.id}`, "max"); // Invalidate user cache tag
                return { success: true };
            } catch (error) {
                console.error("Database update error:", error);
                return { success: false, error: "Failed to update verification status" };
            }
        } else {
             return { success: false, error: "Verification code not found in Codeforces First Name. Please ensure you have updated it in your profile settings." };
        }
    }

    return { success: false, error: "Failed to fetch Codeforces profile" };
}

// Check LeetCode User
export async function checkLeetCodeUser(handle: string, ignoreCache = false) {
    // LeetCode library doesn't expose easy fetch options for caching,
    // but the contest fetch we added uses fetch().
    // We can't easily cache the library call 'leetcode.user(handle)' unless we wrap it or if it caches internally.
    // However, for the graphql fetch we CAN control cache.

    try {
        const { LeetCode } = await import("leetcode-query");
        const leetcode = new LeetCode();
        // This part is using the library, hard to optimize without forking/replacing library usage.
        // Assuming library does standard fetch, maybe we can't touch it easily.
        // But for the contest part:
        const user = await leetcode.user(handle);

        // Fetch Contest Data manually via GraphQL
        const contestQuery = `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    attendedContestsCount
                    rating
                    globalRanking
                    topPercentage
                    badge {
                        name
                    }
                }
                userContestRankingHistory(username: $username) {
                    attended
                    rating
                    contest {
                        title
                        startTime
                    }
                }
            }
        `;

        const fetchOptions = ignoreCache
            ? { cache: 'no-store' as RequestCache }
            : { next: { revalidate: 3600 } };

        const contestRes = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: contestQuery,
                variables: { username: handle }
            }),
            ...fetchOptions
        });

        const contestData = await contestRes.json();
        const contestStats = contestData.data?.userContestRanking;
        const contestHistory = contestData.data?.userContestRankingHistory?.filter((c: any) => c.attended);


        if (user && user.matchedUser) {
            return {
                success: true,
                status: 200,
                name: user.matchedUser.profile.realName,
                avatar: user.matchedUser.profile.userAvatar,
                submitStats: user.matchedUser.submitStats,
                contestStats: contestStats || null,
                contestHistory: contestHistory || []
            };
        }
        return { success: false, status: 404 };
    } catch (e) {
        console.error("LeetCode check error:", e);
        return { success: false, status: 500 };
    }
}

// Verify LeetCode Ownership
export async function verifyLeetCodeOwnership(handle: string, verificationCode: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Bypass the leetcode-query library (which has internal caching) and
        // hit the GraphQL API directly with cache:'no-store' so we always get
        // the user's current realName, not a stale cached value.
        const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    profile {
                        realName
                    }
                }
            }
        `;

        const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({ query, variables: { username: handle } }),
            cache: 'no-store'
        });

        if (!res.ok) {
            return { success: false, error: "Failed to fetch LeetCode profile" };
        }

        const data = await res.json();
        const matchedUser = data?.data?.matchedUser;

        if (!matchedUser) {
            return { success: false, error: "LeetCode profile not found. Please check the handle." };
        }

        const realName: string | null = matchedUser.profile?.realName ?? null;

        if (!realName || !realName.includes(verificationCode)) {
            return {
                success: false,
                error: realName
                    ? "Verification code not found in LeetCode Name. Please ensure you have saved the code in your profile."
                    : "Your LeetCode profile has no Name set. Please add the verification code as your Name on LeetCode."
            };
        }

        // Code confirmed – save verification
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                leetCodeVerified: true,
                leetCodeHandle: handle
            }
        });
        revalidatePath("/dashboard/settings");
        revalidateTag(`user-${session.user.id}`, "max");
        return { success: true };
    } catch (error) {
        console.error("LeetCode verification error:", error);
        return { success: false, error: "Failed to verify LeetCode profile" };
    }
}

// Check GitHub User
export async function checkGitHubUser(handle: string) {
    try {
        const res = await fetch(`https://api.github.com/users/${handle}`, {
            headers: {
                "Accept" : "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            const data = await res.json();
            return {
                success: true,
                status: 200,
                name: data.name || data.login,
                avatar: data.avatar_url,
                bio: data.bio
            };
        }
        return { success: false, status: res.status };
    } catch (e) {
        return { success: false, status: 500 };
    }
}

// Verify Platform Handle Existence
export async function verifyPlatformHandle(platform: string, handle: string) {
    if (!handle.trim()) return { success: false, error: "Handle cannot be empty" };

    switch (platform) {
        case "leetCodeHandle":
            return await checkLeetCodeUser(handle);
        case "codeChefHandle":
            return await checkCodeChefUser(handle);
        case "codeforcesHandle":
            return await checkCodeforcesUser(handle);
        case "githubHandle":
            return await checkGitHubUser(handle);
        default:
            return { success: false, error: "Invalid platform" };
    }
}
