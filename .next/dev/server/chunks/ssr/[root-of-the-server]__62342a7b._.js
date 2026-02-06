module.exports = [
"[project]/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00424ba432501922f40bb512e30bdbd7d1847d3c3e":"checkSessionConflict","40acca00133b06cb19d5be722d10fe520a25103a8b":"resolveSessionConflict"},"",""] */ __turbopack_context__.s([
    "checkSessionConflict",
    ()=>checkSessionConflict,
    "resolveSessionConflict",
    ()=>resolveSessionConflict
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function checkSessionConflict() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session) {
        return {
            conflict: false
        };
    }
    const activeSessions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].session.findMany({
        where: {
            userId: session.user.id
        },
        select: {
            id: true,
            expiresAt: true,
            userAgent: true,
            ipAddress: true,
            token: true
        }
    });
    // Filter out expired sessions just in case, though better-auth likely handles cleanup or assumes valid if in DB
    const validSessions = activeSessions.filter((s)=>s.expiresAt > new Date());
    if (validSessions.length > 1) {
        return {
            conflict: true,
            currentSessionToken: session.session.token,
            sessions: validSessions.map((s)=>({
                    ...s,
                    isCurrent: s.token === session.session.token
                }))
        };
    }
    return {
        conflict: false
    };
}
async function resolveSessionConflict(action) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session) {
        throw new Error("No active session");
    }
    if (action === "LOGOUT_OTHERS") {
        // Delete all sessions for this user EXCEPT the current one
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].session.deleteMany({
            where: {
                userId: session.user.id,
                token: {
                    not: session.session.token
                }
            }
        });
        return {
            success: true,
            message: "Other sessions terminated"
        };
    } else if (action === "LOGOUT_CURRENT") {
        // Sign out the current session
        // We can use auth.api.signOut or just delete the session manually
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].session.delete({
            where: {
                token: session.session.token
            }
        });
        return {
            success: true,
            message: "Current session terminated"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkSessionConflict,
    resolveSessionConflict
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkSessionConflict, "00424ba432501922f40bb512e30bdbd7d1847d3c3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resolveSessionConflict, "40acca00133b06cb19d5be722d10fe520a25103a8b", null);
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[project]/lib/points.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPointsForDifficulty",
    ()=>getPointsForDifficulty,
    "getPointsLabel",
    ()=>getPointsLabel
]);
function getPointsForDifficulty(difficulty) {
    switch(difficulty){
        case "EASY":
            return 5;
        case "MEDIUM":
            return 10;
        case "HARD":
            return 15;
        case "CONCEPT":
            return 0;
        default:
            return 0;
    }
}
function getPointsLabel(difficulty) {
    const points = getPointsForDifficulty(difficulty);
    return `${points} pts`;
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[project]/lib/redis.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ioredis/built/index.js [app-rsc] (ecmascript)");
;
const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});
connection.on("error", (error)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        console.warn("[Redis] Connection error:", error);
    }
});
const __TURBOPACK__default__export__ = connection;
}),
"[project]/core/services/user.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserService",
    ()=>UserService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/points.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
;
;
const CACHE_TTL = 30; // 30 seconds
class UserService {
    /*
     * GETS USERS TOTAL SCORE (cached for 30 seconds)
     * CACHE IS INVALIDATD WHEN USER SOLVES A PROBLEM
    */ static async getUserScore(userId) {
        const cacheKey = `user-score-${userId}`;
        try {
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                return parseInt(cached, 10);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                totalScore: true
            }
        });
        const score = user?.totalScore || 0;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, score.toString());
        } catch (error) {
            console.error("Redis set error:", error);
        }
        return score;
    }
    /**
     * Recalculate user's total score based on their solved problems
     * This fixes any incorrect scores in the database
     */ static async recalculateUserScore(userId) {
        try {
            // Get all unique problems the user has solved (ACCEPTED SUBMIT mode only)
            const solvedSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: {
                    problemId: true,
                    problem: {
                        select: {
                            difficulty: true
                        }
                    }
                },
                distinct: [
                    "problemId"
                ]
            });
            // Calculate total score based on difficulty
            let totalScore = 0;
            for (const submission of solvedSubmissions){
                const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPointsForDifficulty"])(submission.problem.difficulty);
                totalScore += points;
            }
            // Update user's totalScore in the database
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
                where: {
                    id: userId
                },
                data: {
                    totalScore
                }
            });
            // Invalidate cache
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(`user-score-${userId}`);
            } catch (error) {
                console.error("Failed to invalidate user score cache:", error);
            }
            return {
                success: true,
                newScore: totalScore
            };
        } catch (error) {
            console.error("Failed to recalculate user score:", error);
            throw new Error("Failed to recalculate user score");
        }
    }
    /*
     * COMPLETE USER ONBOARDING PROCESS
     * UPDATES USER PROFILE INFORMATION AND MARKS ONBOARDING AS COMPLETED
    */ static async completeOnboarding(userId, data) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
                where: {
                    id: userId
                },
                data: {
                    name: data.name,
                    collegeId: data.collegeId || null,
                    year: data.year ? parseInt(data.year) : null,
                    bio: data.bio || null,
                    leetCodeHandle: data.leetCodeHandle || null,
                    codeChefHandle: data.codeChefHandle || null,
                    codeforcesHandle: data.codeforcesHandle || data.hackerrankHandle || null,
                    githubHandle: data.githubHandle || null,
                    onboardingCompleted: true
                }
            });
            // Invalidate dashboard cache
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(`dashboard:stats:${userId}`);
            } catch (error) {
                console.error("Failed to invalidate dashboard cache:", error);
            }
            return {
                success: true
            };
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
            return {
                success: false,
                error: "Failed to complete onboarding"
            };
        }
    }
}
}),
"[project]/actions/user.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09":"syncUserProfile","00e9b209cfe68ac6e4d35fe2efab442f9eef80456f":"recalculateUserScore","40598e77dede51564b9cd3f6bffab1603e69e4e3a7":"completeOnboarding","40dcf2b262cc87e0478a9f114239bdf2ac94b94b3c":"updateUserInfo","8097b0113e3823c68f1bc40837923497f2bf047c28":"$$RSC_SERVER_CACHE_0","80d16cb6014dbd852dbe811e3eb5e59785ed522fe2":"$$RSC_SERVER_CACHE_1"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "completeOnboarding",
    ()=>completeOnboarding,
    "getUserScore",
    ()=>getUserScore,
    "getUserSettings",
    ()=>getUserSettings,
    "recalculateUserScore",
    ()=>recalculateUserScore,
    "syncUserProfile",
    ()=>syncUserProfile,
    "updateUserInfo",
    ()=>updateUserInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$user$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/user.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
const $$RSC_SERVER_CACHE_0_INNER = async function getUserScore() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    }); // 5 minutes
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        return 0;
    }
    const userId = session.user.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`user-score-${userId}`, `user-${userId}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$user$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserService"].getUserScore(userId);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getUserScore() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "8097b0113e3823c68f1bc40837923497f2bf047c28", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "8097b0113e3823c68f1bc40837923497f2bf047c28", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getUserScore"
});
var getUserScore = $$RSC_SERVER_CACHE_0;
async function recalculateUserScore() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    const userId = session.user.id;
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$user$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserService"].recalculateUserScore(userId);
}
async function completeOnboarding(data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const userId = session.user.id;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$user$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserService"].completeOnboarding(userId, data);
    if (res.success) {
        // Invalidate Redis cache (redundant but good to have here too)
        try {
            const redis = (await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/lib/redis.ts [app-rsc] (ecmascript, async loader)"))).default;
            await redis.del(`dashboard:stats:${userId}`);
        } catch (error) {
            console.error("Failed to invalidate dashboard redis cache:", error);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`dashboard-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('dashboard-stats');
    }
    return res;
}
async function updateUserInfo(data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const userId = session.user.id;
    try {
        // Fetch current user to check for changes
        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                codeChefHandle: true,
                codeforcesHandle: true,
                leetCodeHandle: true
            }
        });
        const updateData = {
            name: data.name,
            bio: data.bio,
            leetCodeHandle: data.leetCodeHandle,
            codeChefHandle: data.codeChefHandle,
            codeforcesHandle: data.codeforcesHandle,
            githubHandle: data.githubHandle
        };
        // Reset verification if handle changed
        if (currentUser) {
            if (data.codeChefHandle !== undefined && data.codeChefHandle !== currentUser.codeChefHandle) {
                updateData.codeChefVerified = false;
            }
            if (data.codeforcesHandle !== undefined && data.codeforcesHandle !== currentUser.codeforcesHandle) {
                updateData.codeforcesVerified = false;
            }
            if (data.leetCodeHandle !== undefined && data.leetCodeHandle !== currentUser.leetCodeHandle) {
                updateData.leetCodeVerified = false;
            }
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id: userId
            },
            data: updateData
        });
        // Invalidate Redis cache
        try {
            const redis = (await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/lib/redis.ts [app-rsc] (ecmascript, async loader)"))).default;
            await redis.del(`dashboard:stats:${userId}`);
        } catch (error) {
            console.error("Failed to invalidate dashboard redis cache:", error);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/settings"); // Added to refresh settings page
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-score-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`dashboard-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('dashboard-stats');
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to update user info:", error);
        return {
            success: false,
            error: "Failed to update profile"
        };
    }
}
async function syncUserProfile() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const userId = session.user.id;
    try {
        // Invalidate Redis cache
        try {
            const redis = (await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/lib/redis.ts [app-rsc] (ecmascript, async loader)"))).default;
            await redis.del(`dashboard:stats:${userId}`);
            await redis.del(`user-score-${userId}`);
        } catch (error) {
            console.error("Failed to invalidate redis cache during sync:", error);
        }
        // Revalidate Next.js cache
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-score-${userId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('dashboard-stats');
        return {
            success: true
        };
    } catch (error) {
        console.error("Sync failed:", error);
        return {
            success: false,
            error: "Failed to sync profile"
        };
    }
}
const $$RSC_SERVER_CACHE_1_INNER = async function getUserSettings() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    });
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user?.id) {
        return null;
    }
    const userId = session.user.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`user-${userId}`);
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        include: {
            institution: true
        }
    });
    if (!user) return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        bio: user.bio,
        institutionName: user.institution?.name
    };
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getUserSettings() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "80d16cb6014dbd852dbe811e3eb5e59785ed522fe2", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "80d16cb6014dbd852dbe811e3eb5e59785ed522fe2", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getUserSettings"
});
var getUserSettings = $$RSC_SERVER_CACHE_1;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    recalculateUserScore,
    completeOnboarding,
    updateUserInfo,
    syncUserProfile
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recalculateUserScore, "00e9b209cfe68ac6e4d35fe2efab442f9eef80456f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(completeOnboarding, "40598e77dede51564b9cd3f6bffab1603e69e4e3a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserInfo, "40dcf2b262cc87e0478a9f114239bdf2ac94b94b3c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncUserProfile, "002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09", null);
}),
"[project]/lib/cache-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CACHE_CONFIG",
    ()=>CACHE_CONFIG,
    "cacheKey",
    ()=>cacheKey,
    "cachedFetch",
    ()=>cachedFetch,
    "deleteByPattern",
    ()=>deleteByPattern,
    "deleteFromCache",
    ()=>deleteFromCache,
    "getFromCache",
    ()=>getFromCache,
    "invalidateCache",
    ()=>invalidateCache,
    "setInCache",
    ()=>setInCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
const CACHE_CONFIG = {
    // Short-lived cache for frequently changing data
    SHORT: {
        ttl: 30,
        stale: 15
    },
    // Medium cache for moderately changing data
    MEDIUM: {
        ttl: 120,
        stale: 60
    },
    // Long cache for rarely changing data
    LONG: {
        ttl: 600,
        stale: 300
    },
    // Very long cache for static-ish data
    STATIC: {
        ttl: 3600,
        stale: 1800
    }
};
function cacheKey(prefix, ...parts) {
    return `algofox:${prefix}:${parts.join(":")}`;
}
async function getFromCache(key) {
    try {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(key);
        if (!data) return null;
        return JSON.parse(data);
    } catch (error) {
        console.error("[Cache] Get error:", error);
        return null;
    }
}
async function setInCache(key, data, ttlSeconds = CACHE_CONFIG.MEDIUM.ttl) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(key, ttlSeconds, JSON.stringify(data));
    } catch (error) {
        console.error("[Cache] Set error:", error);
    }
}
async function deleteFromCache(key) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(key);
    } catch (error) {
        console.error("[Cache] Delete error:", error);
    }
}
async function deleteByPattern(pattern) {
    try {
        const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(pattern);
        if (keys.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
        }
    } catch (error) {
        console.error("[Cache] Delete pattern error:", error);
    }
}
async function cachedFetch(key, fetcher, ttlSeconds = CACHE_CONFIG.MEDIUM.ttl) {
    // Try cache first
    const cached = await getFromCache(key);
    if (cached !== null) {
        return cached;
    }
    // Fetch fresh data
    const data = await fetcher();
    // Cache the result (don't await to not block response)
    setInCache(key, data, ttlSeconds).catch(()=>{});
    return data;
}
async function invalidateCache(prefix, ...ids) {
    const pattern = `algofox:${prefix}:${ids.length > 0 ? ids.join(":") : "*"}`;
    await deleteByPattern(pattern);
}
}),
"[project]/actions/classroom.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000ec191d293cb8cc90e57828e017864626cb92ee5":"getStudentClassrooms","00d1b81d9172745f1e621bc00389a4047839aa9a65":"getTeacherClassrooms","402b2dfd9102ab55714da1b45943219de73e571e8e":"joinClassroom","403750cd613b34ea87612c7694cf246e6b79128ea4":"createClassroom","4062742210455aba21be245a7b93cd6f55cbfccfbb":"getClassroomByCode","40cf2b7d8360449612784b56c4ebe4adc7f8e41e41":"getClassroomLiveTracking","60ba5514d1cabf3d740ffa8f4168ee127042974be0":"getInstitutionClassrooms","60edb317f160a76e4bb511111cff02ad646382fb68":"toggleClassroomTracking","60f68b6b6de74b348b326d1abc2051c2a16b2617c9":"removeStudentFromClassroom","7088643fe9948b5d44e935d70bd04124cc9fb572ff":"getClassroomWithStudents"},"",""] */ __turbopack_context__.s([
    "createClassroom",
    ()=>createClassroom,
    "getClassroomByCode",
    ()=>getClassroomByCode,
    "getClassroomLiveTracking",
    ()=>getClassroomLiveTracking,
    "getClassroomWithStudents",
    ()=>getClassroomWithStudents,
    "getInstitutionClassrooms",
    ()=>getInstitutionClassrooms,
    "getStudentClassrooms",
    ()=>getStudentClassrooms,
    "getTeacherClassrooms",
    ()=>getTeacherClassrooms,
    "joinClassroom",
    ()=>joinClassroom,
    "removeStudentFromClassroom",
    ()=>removeStudentFromClassroom,
    "toggleClassroomTracking",
    ()=>toggleClassroomTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cache-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const classroomSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Name must be at least 2 characters"),
    section: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    institutionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
function generateJoinCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for(let i = 0; i < 6; i++){
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
async function createClassroom(data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Security check
    if (![
        "ADMIN",
        "INSTITUTION_MANAGER",
        "TEACHER"
    ].includes(currentUser.role)) {
        return {
            success: false,
            error: "Unauthorized. Only teachers or managers can create classrooms."
        };
    }
    try {
        const validatedData = classroomSchema.parse(data);
        // Generate unique 6-character join code
        let joinCode = "";
        let isUnique = false;
        let attempts = 0;
        while(!isUnique && attempts < 10){
            joinCode = generateJoinCode();
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
                where: {
                    joinCode
                }
            });
            if (!existing) isUnique = true;
            attempts++;
        }
        if (!isUnique) {
            return {
                success: false,
                error: "Failed to generate a unique join code. Please try again."
            };
        }
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.create({
            data: {
                name: validatedData.name,
                section: validatedData.section || null,
                subject: validatedData.subject || null,
                joinCode,
                institutionId: validatedData.institutionId,
                teacherId: currentUser.id
            }
        });
        // Invalidate relevant caches
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`teacher-classrooms-${currentUser.id}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`institution-classrooms-${validatedData.institutionId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/institution/classrooms");
        return {
            success: true,
            data: classroom
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return {
                success: false,
                error: error.issues[0].message
            };
        }
        console.error("Failed to create classroom:", error);
        return {
            success: false,
            error: "Failed to create classroom"
        };
    }
}
async function joinClassroom(code) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    try {
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                joinCode: code.toUpperCase()
            },
            include: {
                students: {
                    where: {
                        id: currentUser.id
                    }
                }
            }
        });
        if (!classroom) {
            return {
                success: false,
                error: "Invalid join code."
            };
        }
        if (classroom.students.length > 0) {
            return {
                success: false,
                error: "You are already enrolled in this classroom."
            };
        }
        // Institution Check:
        // 1. If user belongs to an institution, they can only join classrooms from THAT institution.
        // 2. If user has NO institution, they are assigned to this classroom's institution.
        if (currentUser.institutionId && currentUser.institutionId !== classroom.institutionId) {
            return {
                success: false,
                error: "You cannot join this classroom because it belongs to a different institution."
            };
        }
        // Add student to classroom
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.update({
            where: {
                id: classroom.id
            },
            data: {
                students: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });
        // Onboard student to institution if null
        const updateData = {
            onboardingCompleted: true
        };
        if (!currentUser.institutionId) {
            updateData.institutionId = classroom.institutionId;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id: currentUser.id
            },
            data: updateData
        });
        // Redis Integration: Cache student IDs per classroom
        const redisKey = `classroom:students:${classroom.id}`;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].sadd(redisKey, currentUser.id);
        // Invalidate caches
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`student-classrooms-${currentUser.id}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`classroom-${classroom.id}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/classrooms");
        return {
            success: true,
            message: `Successfully joined ${classroom.name}`
        };
    } catch (error) {
        console.error("Failed to join classroom:", error);
        return {
            success: false,
            error: "Failed to join classroom"
        };
    }
}
async function getClassroomByCode(code) {
    try {
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                joinCode: code.toUpperCase()
            },
            select: {
                id: true,
                name: true,
                subject: true,
                section: true,
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                _count: {
                    select: {
                        students: true
                    }
                }
            }
        });
        if (!classroom) {
            return {
                success: false,
                error: "Classroom not found"
            };
        }
        const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
            headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
        });
        const isEnrolled = session?.user ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findFirst({
            where: {
                id: classroom.id,
                students: {
                    some: {
                        id: session.user.id
                    }
                }
            }
        }) : false;
        return {
            success: true,
            classroom,
            isEnrolled: !!isEnrolled
        };
    } catch (error) {
        console.error("Failed to fetch classroom by code:", error);
        return {
            success: false,
            error: "Failed to fetch classroom"
        };
    }
}
async function getTeacherClassrooms() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const userId = session.user.id;
    const fetchClassrooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findMany({
            where: {
                teacherId: userId
            },
            include: {
                _count: {
                    select: {
                        students: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }, [
        `teacher-classrooms-${userId}`
    ], {
        tags: [
            `teacher-classrooms-${userId}`
        ],
        revalidate: 120
    });
    try {
        const classrooms = await fetchClassrooms();
        return {
            success: true,
            classrooms
        };
    } catch (error) {
        console.error("Failed to fetch teacher classrooms:", error);
        return {
            success: false,
            error: "Failed to fetch classrooms"
        };
    }
}
async function getStudentClassrooms() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const userId = session.user.id;
    const fetchClassrooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            },
            include: {
                enrolledClassrooms: {
                    include: {
                        teacher: {
                            select: {
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });
        return user?.enrolledClassrooms || [];
    }, [
        `student-classrooms-${userId}`
    ], {
        tags: [
            `student-classrooms-${userId}`
        ],
        revalidate: 120
    });
    try {
        const classrooms = await fetchClassrooms();
        return {
            success: true,
            classrooms
        };
    } catch (error) {
        console.error("Failed to fetch student classrooms:", error);
        return {
            success: false,
            error: "Failed to fetch classrooms"
        };
    }
}
async function getClassroomWithStudents(id, page = 1, limit = 50) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const skip = (page - 1) * limit;
    const fetchClassroom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        const [classroom, totalStudents] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    subject: true,
                    section: true,
                    joinCode: true,
                    isTrackingActive: true,
                    trackingStartedAt: true,
                    teacher: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    students: {
                        select: {
                            id: true,
                            name: true,
                            totalScore: true,
                            image: true
                        },
                        orderBy: {
                            totalScore: "desc"
                        },
                        skip,
                        take: limit
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.count({
                where: {
                    enrolledClassrooms: {
                        some: {
                            id
                        }
                    }
                }
            })
        ]);
        return {
            classroom,
            totalStudents
        };
    }, [
        `classroom-${id}-page-${page}`
    ], {
        tags: [
            `classroom-${id}`
        ],
        revalidate: 60
    });
    try {
        const { classroom, totalStudents } = await fetchClassroom();
        if (!classroom) {
            return {
                success: false,
                error: "Classroom not found"
            };
        }
        return {
            success: true,
            classroom,
            pagination: {
                total: totalStudents,
                pages: Math.ceil(totalStudents / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch classroom detail:", error);
        return {
            success: false,
            error: "Failed to fetch classroom"
        };
    }
}
async function toggleClassroomTracking(classroomId, active) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
        where: {
            id: classroomId
        },
        select: {
            teacherId: true
        }
    });
    if (!classroom || classroom.teacherId !== session.user.id && session.user.role !== "ADMIN") {
        return {
            success: false,
            error: "Access denied"
        };
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.update({
        where: {
            id: classroomId
        },
        data: {
            isTrackingActive: active,
            trackingStartedAt: active ? new Date() : null
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteFromCache"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheKey"])("live-tracking", classroomId));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`classroom-${classroomId}`, "max");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/classrooms/${classroomId}`);
    return {
        success: true
    };
}
async function getClassroomLiveTracking(classroomId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    // Use Redis cache for live tracking data (short TTL)
    const cacheKeyName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheKey"])("live-tracking", classroomId);
    const fetchTracking = async ()=>{
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                id: classroomId
            },
            select: {
                isTrackingActive: true,
                trackingStartedAt: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        submissions: {
                            where: {
                                mode: "SUBMIT"
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            take: 20,
                            include: {
                                problem: {
                                    select: {
                                        title: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!classroom) return null;
        // Filter submissions if tracking is active
        const studentsData = classroom.students.map((student)=>{
            const filteredSubmissions = student.submissions.filter((sub)=>classroom.isTrackingActive && classroom.trackingStartedAt && new Date(sub.createdAt) >= new Date(classroom.trackingStartedAt)).map((sub)=>({
                    id: sub.id,
                    code: sub.code,
                    status: sub.status,
                    problemTitle: sub.problem.title,
                    createdAt: sub.createdAt
                }));
            return {
                id: student.id,
                name: student.name,
                image: student.image,
                submissions: filteredSubmissions
            };
        });
        return {
            isTrackingActive: classroom.isTrackingActive,
            trackingStartedAt: classroom.trackingStartedAt,
            students: studentsData
        };
    };
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cachedFetch"])(cacheKeyName, fetchTracking, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].SHORT.ttl);
        if (!data) {
            return {
                success: false,
                error: "Classroom not found"
            };
        }
        return {
            success: true,
            ...data
        };
    } catch (error) {
        console.error("Failed to fetch live tracking:", error);
        return {
            success: false,
            error: "Failed to fetch tracking data"
        };
    }
}
async function getInstitutionClassrooms(page = 1, limit = 20) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    if (currentUser.role !== "ADMIN" && currentUser.role !== "INSTITUTION_MANAGER") {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const institutionId = currentUser.institutionId;
    const skip = (page - 1) * limit;
    const fetchClassrooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        const [classrooms, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findMany({
                where: {
                    institutionId
                },
                include: {
                    teacher: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    _count: {
                        select: {
                            students: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: limit
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.count({
                where: {
                    institutionId
                }
            })
        ]);
        return {
            classrooms,
            total
        };
    }, [
        `institution-classrooms-${institutionId}-page-${page}`
    ], {
        tags: [
            `institution-classrooms-${institutionId}`
        ],
        revalidate: 120
    });
    try {
        const { classrooms, total } = await fetchClassrooms();
        return {
            success: true,
            classrooms,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch institution classrooms:", error);
        return {
            success: false,
            error: "Failed to fetch classrooms"
        };
    }
}
async function removeStudentFromClassroom(classroomId, studentId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    const isPowerful = [
        "ADMIN",
        "INSTITUTION_MANAGER"
    ].includes(currentUser.role);
    try {
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                id: classroomId
            },
            select: {
                teacherId: true,
                institutionId: true
            }
        });
        if (!classroom) {
            return {
                success: false,
                error: "Classroom not found"
            };
        }
        // Only allow if powerful role OR if current user is the teacher
        if (!isPowerful && classroom.teacherId !== currentUser.id) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.update({
            where: {
                id: classroomId
            },
            data: {
                students: {
                    disconnect: {
                        id: studentId
                    }
                }
            }
        });
        // Remove from Redis set
        const redisKey = `classroom:students:${classroomId}`;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].srem(redisKey, studentId);
        // Invalidate caches
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`classroom-${classroomId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`student-classrooms-${studentId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/classrooms/${classroomId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to remove student:", error);
        return {
            success: false,
            error: "Failed to remove student"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createClassroom,
    joinClassroom,
    getClassroomByCode,
    getTeacherClassrooms,
    getStudentClassrooms,
    getClassroomWithStudents,
    toggleClassroomTracking,
    getClassroomLiveTracking,
    getInstitutionClassrooms,
    removeStudentFromClassroom
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createClassroom, "403750cd613b34ea87612c7694cf246e6b79128ea4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(joinClassroom, "402b2dfd9102ab55714da1b45943219de73e571e8e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassroomByCode, "4062742210455aba21be245a7b93cd6f55cbfccfbb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeacherClassrooms, "00d1b81d9172745f1e621bc00389a4047839aa9a65", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentClassrooms, "000ec191d293cb8cc90e57828e017864626cb92ee5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassroomWithStudents, "7088643fe9948b5d44e935d70bd04124cc9fb572ff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleClassroomTracking, "60edb317f160a76e4bb511111cff02ad646382fb68", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassroomLiveTracking, "40cf2b7d8360449612784b56c4ebe4adc7f8e41e41", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstitutionClassrooms, "60ba5514d1cabf3d740ffa8f4168ee127042974be0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStudentFromClassroom, "60f68b6b6de74b348b326d1abc2051c2a16b2617c9", null);
}),
"[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ClassroomDashboard",
    ()=>ClassroomDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ClassroomDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ClassroomDashboard() from the server but ClassroomDashboard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/classroom/ClassroomDashboard.tsx <module evaluation>", "ClassroomDashboard");
}),
"[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ClassroomDashboard",
    ()=>ClassroomDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ClassroomDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ClassroomDashboard() from the server but ClassroomDashboard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/classroom/ClassroomDashboard.tsx", "ClassroomDashboard");
}),
"[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"c0aedadb2987fc5c1995746b3ab4b358510ee91b21":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "default",
    ()=>ClassroomDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/classroom.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/ClassroomDashboard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$school$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__School$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/school.js [app-rsc] (ecmascript) <export default as School>");
;
;
;
;
;
;
;
;
;
;
;
;
const $$RSC_SERVER_CACHE_0_INNER = async function ClassroomDetailContent({ params }) {
    const { id } = await params;
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/signin");
    }
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomWithStudents"])(id);
    if (!res.success || !res.classroom) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl mb-6 inline-block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$school$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__School$3e$__["School"], {
                            className: "w-12 h-12 text-gray-300 dark:text-gray-600"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                            lineNumber: 32,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter",
                        children: "Classroom Not Found"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                        lineNumber: 34,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/classrooms",
                        className: "inline-flex items-center gap-2 text-orange-600 dark:text-orange-500 font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                                lineNumber: 36,
                                columnNumber: 25
                            }, this),
                            "Back to Hub"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                        lineNumber: 35,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, this);
    }
    const classroom = res.classroom;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ClassroomDashboard"], {
        classroom: classroom,
        currentUserId: session.user.id
    }, void 0, false, {
        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function ClassroomDetailContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c0aedadb2987fc5c1995746b3ab4b358510ee91b21", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0aedadb2987fc5c1995746b3ab4b358510ee91b21", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "ClassroomDetailContent"
});
var ClassroomDetailContent = $$RSC_SERVER_CACHE_0;
function ClassroomDetailPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                        lineNumber: 59,
                        columnNumber: 21
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600 dark:text-gray-400",
                        children: "Loading classroom..."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                        lineNumber: 60,
                        columnNumber: 21
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ClassroomDetailContent, {
            params: params
        }, void 0, false, {
            fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
            lineNumber: 64,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/assignment.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402d498415f6e7ce5e7b14101bd742a174c034fe89":"refreshClassroomAssignments","40633f0898d1f332fe16478be0d6f967b6ba4e7381":"deleteAssignment","40e471d809bf7114dcf724015755368fdab0ef103b":"getAssignmentDetails","604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe":"createAssignment","6091a52b809a6452039e9aff921f36e5551e76d7f8":"getAssignmentProgress","60bed825b9a6fa3bbf4a6def13537d7d61c2fa396a":"getStudentAssignments","70b22c8ab63d11fc3b25b267ea271300db7487dcaa":"getClassroomAssignments","78073ece8699c8e6f210ef2e8915c5f3d914d87a4a":"getTeacherAssignmentAnalytics"},"",""] */ __turbopack_context__.s([
    "createAssignment",
    ()=>createAssignment,
    "deleteAssignment",
    ()=>deleteAssignment,
    "getAssignmentDetails",
    ()=>getAssignmentDetails,
    "getAssignmentProgress",
    ()=>getAssignmentProgress,
    "getClassroomAssignments",
    ()=>getClassroomAssignments,
    "getStudentAssignments",
    ()=>getStudentAssignments,
    "getTeacherAssignmentAnalytics",
    ()=>getTeacherAssignmentAnalytics,
    "refreshClassroomAssignments",
    ()=>refreshClassroomAssignments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cache-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getClassroomAssignments(classroomId, page = 1, limit = 20) {
    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const skip = (page - 1) * limit;
    const fetchAssignments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        const [assignments, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findMany({
                where: {
                    classroomId,
                    createdAt: {
                        gte: threeWeeksAgo
                    }
                },
                include: {
                    _count: {
                        select: {
                            problems: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: limit
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.count({
                where: {
                    classroomId,
                    createdAt: {
                        gte: threeWeeksAgo
                    }
                }
            })
        ]);
        return {
            assignments,
            total
        };
    }, [
        `classroom-assignments-${classroomId}-page-${page}`
    ], {
        tags: [
            `assignments-classroom-${classroomId}`,
            'assignments-all'
        ],
        revalidate: 60
    });
    const { assignments, total } = await fetchAssignments();
    return {
        assignments,
        pagination: {
            total,
            pages: Math.ceil(total / limit),
            current: page,
            limit
        }
    };
}
async function refreshClassroomAssignments(classroomId) {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findMany({
        where: {
            classroomId,
            createdAt: {
                gte: threeWeeksAgo
            }
        },
        include: {
            _count: {
                select: {
                    problems: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function createAssignment(classroomId, data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user || session.user.role !== "TEACHER") {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        // Verify teacher owns the classroom
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                id: classroomId
            },
            select: {
                teacherId: true
            }
        });
        if (!classroom || classroom.teacherId !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized access to classroom"
            };
        }
        const assignment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.create({
            data: {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                classroomId,
                problems: {
                    create: data.problemIds.map((id, index)=>({
                            problemId: id,
                            order: index
                        }))
                }
            }
        });
        // Revalidate classroom-specific and global assignment caches
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`assignments-classroom-${classroomId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])('assignments-all', "max"); // Invalidate student assignments cache
        return {
            success: true,
            assignmentId: assignment.id
        };
    } catch (error) {
        console.error("Create assignment error:", error);
        return {
            success: false,
            error: "Failed to create assignment"
        };
    }
}
async function getAssignmentDetails(assignmentId) {
    const fetchDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findUnique({
            where: {
                id: assignmentId
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                slug: true,
                                difficulty: true,
                                type: true,
                                domain: true
                            }
                        }
                    },
                    orderBy: {
                        order: "asc"
                    }
                },
                classroom: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });
    }, [
        `assignment-details-${assignmentId}`
    ], {
        tags: [
            `assignment-${assignmentId}`
        ],
        revalidate: 3600
    } // Cache for 1 hour
    );
    return await fetchDetails();
}
async function getStudentAssignments(page = 1, limit = 20) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        assignments: [],
        pagination: null
    };
    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const skip = (page - 1) * limit;
    const userId = session.user.id;
    const fetchStudentAssignments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        // First get enrolled classrooms
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                enrolledClassrooms: {
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!user || user.enrolledClassrooms.length === 0) {
            return {
                assignments: [],
                total: 0
            };
        }
        const classroomIds = user.enrolledClassrooms.map((c)=>c.id);
        // Fetch assignments for these classrooms with count
        const [assignments, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findMany({
                where: {
                    classroomId: {
                        in: classroomIds
                    },
                    createdAt: {
                        gte: threeWeeksAgo
                    }
                },
                include: {
                    classroom: {
                        select: {
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            problems: true
                        }
                    }
                },
                orderBy: {
                    dueDate: "asc"
                },
                skip,
                take: limit
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.count({
                where: {
                    classroomId: {
                        in: classroomIds
                    },
                    createdAt: {
                        gte: threeWeeksAgo
                    }
                }
            })
        ]);
        return {
            assignments,
            total
        };
    }, [
        `student-assignments-${userId}-page-${page}`
    ], {
        tags: [
            `student-assignments-${userId}`,
            'assignments-all'
        ],
        revalidate: 60
    });
    const { assignments, total } = await fetchStudentAssignments();
    return {
        assignments,
        pagination: total > 0 ? {
            total,
            pages: Math.ceil(total / limit),
            current: page,
            limit
        } : null
    };
}
async function getAssignmentProgress(assignmentId, userId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return null;
    // Get assignment problems (cached)
    const assignment = await getAssignmentDetails(assignmentId);
    if (!assignment) return null;
    const problemIds = assignment.problems.map((p)=>p.problemId);
    // Use Redis cache for progress (short TTL since submissions update frequently)
    const progressCacheKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheKey"])("assignment-progress", assignmentId, targetUserId);
    const progress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cachedFetch"])(progressCacheKey, async ()=>{
        // Fetch successful submissions for these problems by the user
        const submissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
            where: {
                userId: targetUserId,
                problemId: {
                    in: problemIds
                },
                status: "ACCEPTED"
            },
            select: {
                problemId: true
            },
            distinct: [
                "problemId"
            ]
        });
        const solvedProblemIds = new Set(submissions.map((s)=>s.problemId));
        const progressMap = {};
        let completedCount = 0;
        assignment.problems.forEach((p)=>{
            const isSolved = solvedProblemIds.has(p.problemId);
            progressMap[p.problemId] = isSolved;
            if (isSolved) completedCount++;
        });
        return {
            total: assignment.problems.length,
            completed: completedCount,
            progressMap
        };
    }, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].SHORT.ttl // 30 seconds cache
    );
    return progress;
}
async function getTeacherAssignmentAnalytics(assignmentId, classroomId, page = 1, limit = 50) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user || session.user.role !== "TEACHER") {
        throw new Error("Unauthorized");
    }
    const skip = (page - 1) * limit;
    const analyticsCacheKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheKey"])("assignment-analytics", assignmentId, classroomId, String(page));
    const analytics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cachedFetch"])(analyticsCacheKey, async ()=>{
        // Parallel fetch for better performance
        const [classroom, assignment, totalStudents] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
                where: {
                    id: classroomId
                },
                select: {
                    students: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            email: true
                        },
                        skip,
                        take: limit
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findUnique({
                where: {
                    id: assignmentId
                },
                include: {
                    problems: {
                        select: {
                            problemId: true
                        }
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.count({
                where: {
                    enrolledClassrooms: {
                        some: {
                            id: classroomId
                        }
                    }
                }
            })
        ]);
        if (!classroom || !assignment) return null;
        const studentIds = classroom.students.map((s)=>s.id);
        const problemIds = assignment.problems.map((p)=>p.problemId);
        // Get all accepted submissions in one query
        const submissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
            where: {
                userId: {
                    in: studentIds
                },
                problemId: {
                    in: problemIds
                },
                status: "ACCEPTED"
            },
            select: {
                userId: true,
                problemId: true
            }
        });
        // Build submission index for O(1) lookup
        const submissionIndex = new Map();
        submissions.forEach((s)=>{
            if (!submissionIndex.has(s.userId)) {
                submissionIndex.set(s.userId, new Set());
            }
            submissionIndex.get(s.userId).add(s.problemId);
        });
        // Build analytics
        const studentAnalytics = classroom.students.map((student)=>{
            const solvedSet = submissionIndex.get(student.id) || new Set();
            return {
                student,
                completedCount: solvedSet.size,
                totalCount: problemIds.length,
                completionPercentage: problemIds.length > 0 ? solvedSet.size / problemIds.length * 100 : 0,
                hasCompletedAll: solvedSet.size === problemIds.length
            };
        });
        return {
            analytics: studentAnalytics,
            pagination: {
                total: totalStudents,
                pages: Math.ceil(totalStudents / limit),
                current: page,
                limit
            }
        };
    }, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cache$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_CONFIG"].MEDIUM.ttl // 2 minutes cache
    );
    return analytics;
}
async function deleteAssignment(assignmentId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user || session.user.role !== "TEACHER") {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const assignment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.findUnique({
            where: {
                id: assignmentId
            },
            include: {
                classroom: {
                    select: {
                        teacherId: true,
                        id: true
                    }
                }
            }
        });
        if (!assignment || assignment.classroom.teacherId !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }
        // Delete assignment problems first, then assignment
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignmentProblem.deleteMany({
                where: {
                    assignmentId
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assignment.delete({
                where: {
                    id: assignmentId
                }
            })
        ]);
        // Invalidate caches
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`assignment-${assignmentId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`assignments-classroom-${assignment.classroom.id}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])('assignments-all', "max");
        return {
            success: true
        };
    } catch (error) {
        console.error("Delete assignment error:", error);
        return {
            success: false,
            error: "Failed to delete assignment"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getClassroomAssignments,
    refreshClassroomAssignments,
    createAssignment,
    getAssignmentDetails,
    getStudentAssignments,
    getAssignmentProgress,
    getTeacherAssignmentAnalytics,
    deleteAssignment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassroomAssignments, "70b22c8ab63d11fc3b25b267ea271300db7487dcaa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshClassroomAssignments, "402d498415f6e7ce5e7b14101bd742a174c034fe89", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAssignment, "604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssignmentDetails, "40e471d809bf7114dcf724015755368fdab0ef103b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentAssignments, "60bed825b9a6fa3bbf4a6def13537d7d61c2fa396a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssignmentProgress, "6091a52b809a6452039e9aff921f36e5551e76d7f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeacherAssignmentAnalytics, "78073ece8699c8e6f210ef2e8915c5f3d914d87a4a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAssignment, "40633f0898d1f332fe16478be0d6f967b6ba4e7381", null);
}),
"[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70a74088e6ae2baef179da5722207b030fb65b8469":"checkExternalParticipation"},"",""] */ __turbopack_context__.s([
    "checkExternalParticipation",
    ()=>checkExternalParticipation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// --- Codeforces ---
async function checkCodeforcesParticipation(contestId, users) {
    const usersWithHandle = users.filter((u)=>u.codeforcesHandle);
    const handleMap = new Map();
    usersWithHandle.forEach((u)=>handleMap.set(u.codeforcesHandle.toLowerCase(), u));
    if (usersWithHandle.length === 0) {
        return users.map((u)=>({
                userId: u.id,
                name: u.name,
                handle: u.codeforcesHandle || null,
                participated: false,
                error: "No Codeforces handle linked"
            }));
    }
    // Codeforces allows multiple handles in one request (up to some limit, usually 10000 characters url length)
    // chunk handles if necessary
    const chunks = [];
    const chunkSize = 100; // conservative batch size
    for(let i = 0; i < usersWithHandle.length; i += chunkSize){
        chunks.push(usersWithHandle.slice(i, i + chunkSize));
    }
    const results = [];
    // Initialize all as not participated
    users.forEach((u)=>{
        if (!u.codeforcesHandle) {
            results.push({
                userId: u.id,
                name: u.name,
                handle: null,
                participated: false,
                error: "No handle"
            });
        }
    });
    for (const chunk of chunks){
        const handles = chunk.map((u)=>u.codeforcesHandle).join(";");
        try {
            const res = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&handles=${handles}&showUnofficial=true`);
            const data = await res.json();
            if (data.status !== "OK") {
                chunk.forEach((u)=>results.push({
                        userId: u.id,
                        name: u.name,
                        handle: u.codeforcesHandle,
                        participated: false,
                        error: data.comment || "Codeforces API Error"
                    }));
                continue;
            }
            // Process rows
            const rows = data.result.rows;
            // Mark those present as participated
            const foundHandles = new Set();
            rows.forEach((row)=>{
                // row.party.members contains the handles
                row.party.members.forEach((member)=>{
                    const handle = member.handle.toLowerCase();
                    const user = handleMap.get(handle);
                    if (user) {
                        foundHandles.add(handle);
                        results.push({
                            userId: user.id,
                            name: user.name,
                            handle: user.codeforcesHandle,
                            participated: true,
                            rank: row.rank,
                            score: row.points,
                            details: {
                                penalty: row.penalty,
                                successfulHackCount: row.successfulHackCount
                            }
                        });
                    }
                });
            });
            // Those in the chunk but not found in rows => did not participate
            chunk.forEach((u)=>{
                if (u.codeforcesHandle && !foundHandles.has(u.codeforcesHandle.toLowerCase())) {
                    results.push({
                        userId: u.id,
                        name: u.name,
                        handle: u.codeforcesHandle,
                        participated: false
                    });
                }
            });
        } catch (e) {
            chunk.forEach((u)=>results.push({
                    userId: u.id,
                    name: u.name,
                    handle: u.codeforcesHandle,
                    participated: false,
                    error: e.message
                }));
        }
    }
    return results;
}
// --- LeetCode ---
async function checkLeetCodeParticipation(contestSlug, users) {
    // LeetCode doesn't have a batch check. We must check each user.
    // We'll run in parallel with concurrency limit.
    const results = [];
    const checkUser = async (user)=>{
        if (!user.leetCodeHandle) {
            return {
                userId: user.id,
                name: user.name,
                handle: null,
                participated: false,
                error: "No handle"
            };
        }
        try {
            // Query user's contest history
            const query = `
        query userContestRankingInfo($username: String!) {
          userContestRankingHistory(username: $username) {
            attended
            contest {
              titleSlug
              startTime
            }
            ranking
            finishTimeInSeconds
          }
        }
      `;
            const res = await fetch("https://leetcode.com/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Referer": `https://leetcode.com/u/${user.leetCodeHandle}/`
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        username: user.leetCodeHandle
                    }
                }),
                cache: "no-store"
            });
            const data = await res.json();
            if (data.errors) {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.leetCodeHandle,
                    participated: false,
                    error: data.errors[0]?.message
                };
            }
            const history = data.data.userContestRankingHistory || [];
            // Find the contest
            const participation = history.find((p)=>p.contest?.titleSlug === contestSlug);
            if (participation && participation.attended) {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.leetCodeHandle,
                    participated: true,
                    rank: participation.ranking,
                    details: {
                        finishTime: participation.finishTimeInSeconds
                    }
                };
            } else {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.leetCodeHandle,
                    participated: false
                };
            }
        } catch (e) {
            return {
                userId: user.id,
                name: user.name,
                handle: user.leetCodeHandle,
                participated: false,
                error: e.message
            };
        }
    };
    // Process in chunks to avoid rate limits
    const chunkSize = 5;
    for(let i = 0; i < users.length; i += chunkSize){
        const chunk = users.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(checkUser));
        results.push(...chunkResults);
    }
    return results;
}
// --- CodeChef ---
async function checkCodeChefParticipation(contestCode, users) {
    const results = [];
    const checkUser = async (user)=>{
        if (!user.codeChefHandle) {
            return {
                userId: user.id,
                name: user.name,
                handle: null,
                participated: false,
                error: "No handle"
            };
        }
        try {
            // Use the ranking search API
            const res = await fetch(`https://www.codechef.com/api/rankings/${contestCode}?itemsPerPage=1&search=${user.codeChefHandle}`, {
                cache: "no-store"
            });
            if (!res.ok) {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.codeChefHandle,
                    participated: false,
                    error: `API Status: ${res.status}`
                };
            }
            const data = await res.json();
            // data.list contains the rows
            // We searched for the specific handle. If it's there and exact match...
            const entry = data.list?.find((item)=>item.user_handle?.toLowerCase() === user.codeChefHandle?.toLowerCase());
            if (entry) {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.codeChefHandle,
                    participated: true,
                    rank: entry.rank,
                    score: parseFloat(entry.score),
                    details: {
                        penalty: entry.penalty
                    }
                };
            } else {
                return {
                    userId: user.id,
                    name: user.name,
                    handle: user.codeChefHandle,
                    participated: false
                };
            }
        } catch (e) {
            return {
                userId: user.id,
                name: user.name,
                handle: user.codeChefHandle,
                participated: false,
                error: e.message
            };
        }
    };
    // Process in chunks
    const chunkSize = 5;
    for(let i = 0; i < users.length; i += chunkSize){
        const chunk = users.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(checkUser));
        results.push(...chunkResults);
    }
    return results;
}
async function checkExternalParticipation(platform, contestIdentifier, userFilters) {
    // 1. Fetch Users
    const where = {
        role: "STUDENT" // Mostly we care about students
    };
    if (userFilters?.institutionId) {
        where.institutionId = userFilters.institutionId;
    }
    // Note: Classroom logic might need recursive fetch if not directly on user,
    // but User model has `enrolledClassrooms`.
    if (userFilters?.classroomId) {
        where.enrolledClassrooms = {
            some: {
                id: userFilters.classroomId
            }
        };
    }
    const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
        where,
        select: {
            id: true,
            name: true,
            email: true,
            codeforcesHandle: true,
            leetCodeHandle: true,
            codeChefHandle: true
        }
    });
    if (users.length === 0) {
        return {
            success: true,
            results: []
        };
    }
    let results = [];
    try {
        if (platform === "CodeForces") {
            results = await checkCodeforcesParticipation(contestIdentifier, users);
        } else if (platform === "LeetCode") {
            results = await checkLeetCodeParticipation(contestIdentifier, users);
        } else if (platform === "CodeChef") {
            results = await checkCodeChefParticipation(contestIdentifier, users);
        }
        return {
            success: true,
            results
        };
    } catch (error) {
        console.error("Check participation error:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkExternalParticipation
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkExternalParticipation, "70a74088e6ae2baef179da5722207b030fb65b8469", null);
}),
"[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/actions/external-contests.action.ts'\n\nExpected ';', '}' or <eof>");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"400d34faa00f51bc854d89b0a782031b730d053dd6":"getRecentContests","60f9d7da12c7611c06fbd706641903809dc9ed6481":"checkInternalContestParticipation","7f4d3b4fef2694276e2c1a870968203aa4939a5b1b":"checkExternalParticipation"},"",""] */ __turbopack_context__.s([
    "checkInternalContestParticipation",
    ()=>checkInternalContestParticipation,
    "getRecentContests",
    ()=>getRecentContests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function checkInternalContestParticipation(contestId, classroomId) {
    try {
        // 1. Verify contest exists
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
            where: {
                id: contestId
            },
            select: {
                id: true,
                title: true
            }
        });
        if (!contest) {
            return {
                success: false,
                error: "Contest not found"
            };
        }
        // 2. Get all students in the classroom
        const classroom = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findUnique({
            where: {
                id: classroomId
            },
            include: {
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }
            }
        });
        if (!classroom) {
            return {
                success: false,
                error: "Classroom not found"
            };
        }
        // 3. Get participation records for this contest and these students
        const participations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findMany({
            where: {
                contestId: contestId,
                userId: {
                    in: classroom.students.map((s)=>s.id)
                }
            },
            include: {
                user: {
                    select: {
                        submissions: {
                            where: {
                                contestId: contestId,
                                status: "ACCEPTED"
                            },
                            select: {
                                problemId: true,
                                problem: {
                                    select: {
                                        score: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        // 4. Map results
        const participationMap = new Map();
        participations.forEach((p)=>{
            // Calculate score based on unique problems solved
            const uniqueSolved = new Set();
            let totalScore = 0;
            p.user.submissions.forEach((sub)=>{
                if (!uniqueSolved.has(sub.problemId)) {
                    uniqueSolved.add(sub.problemId);
                    totalScore += sub.problem.score;
                }
            });
            participationMap.set(p.userId, {
                participated: true,
                finishedAt: p.finishedAt,
                isFinished: p.isFinished,
                score: totalScore,
                problemsSolved: uniqueSolved.size
            });
        });
        const results = classroom.students.map((student)=>{
            const data = participationMap.get(student.id);
            return {
                userId: student.id,
                name: student.name || "Unknown",
                email: student.email,
                participated: !!data,
                score: data?.score || 0,
                problemsSolved: data?.problemsSolved || 0,
                finishedAt: data?.finishedAt || null,
                isFinished: data?.isFinished || false
            };
        });
        // Add ranks for those who participated
        // Rank by Score (desc), then Time (asc) - not implementing complex time penalty logic here for simplicity,
        // just score.
        results.filter((r)=>r.participated).sort((a, b)=>b.score - a.score).forEach((r, idx)=>{
            r.rank = idx + 1;
        });
        return {
            success: true,
            results
        };
    } catch (error) {
        console.error("Internal contest check failed:", error);
        return {
            success: false,
            error: "Failed to fetch participation data"
        };
    }
}
async function getRecentContests(classroomId) {
    try {
        // 1. Fetch Internal Contests (Past 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const internalContests = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findMany({
            where: {
                endTime: {
                    lt: new Date(),
                    gt: thirtyDaysAgo
                },
                OR: [
                    {
                        visibility: "PUBLIC"
                    },
                    {
                        visibility: "CLASSROOM",
                        classroomId: classroomId
                    },
                    {
                        visibility: "INSTITUTION",
                        institution: {
                            classrooms: {
                                some: {
                                    id: classroomId
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                endTime: 'desc'
            },
            take: 10,
            select: {
                id: true,
                title: true,
                endTime: true,
                slug: true
            }
        });
        // 2. Fetch External Contests
        // We reuse the getUpcomingContests which now includes recent past contests
        const { contests: externalContests } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUpcomingContests"])();
        // Filter for only FINISHED external contests
        const recentExternal = externalContests.filter((c)=>c.status === "FINISHED");
        return {
            success: true,
            internal: internalContests,
            external: recentExternal
        };
    } catch (error) {
        console.error("Failed to fetch recent contests:", error);
        return {
            success: false,
            internal: [],
            external: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkExternalParticipation"],
    checkInternalContestParticipation,
    getRecentContests
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkExternalParticipation"], "7f4d3b4fef2694276e2c1a870968203aa4939a5b1b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkInternalContestParticipation, "60f9d7da12c7611c06fbd706641903809dc9ed6481", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentContests, "400d34faa00f51bc854d89b0a782031b730d053dd6", null);
}),
"[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkExternalParticipation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkExternalParticipation"],
    "checkInternalContestParticipation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["checkInternalContestParticipation"],
    "getRecentContests",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRecentContests"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)");
}),
"[project]/core/services/problem.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProblemService",
    ()=>ProblemService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
;
const CACHE_TTL = 300; // 5 minutes
const PROBLEM_CACHE_TTL = 3600; // 1 hour
// CACHE KEY HELPERS
const getProblemsCacheKey = (type, domain, page, diff, tags = [])=>`problems:list:${domain}:${type}:page:${page}:diff:${diff || 'all'}:tags:${tags.sort().join(',')}`;
const getAdminProblemsCacheKey = (domain, page)=>`admin:problems:${domain || 'all'}:page:${page}`;
const getProblemCacheKey = (slug)=>`problem:${slug}`;
class ProblemService {
    // CACHED FETCHER FOR PUBLIC PROBLEM LIST
    static async getCachedProblems(page, pageSize, type, domain = "DSA", diff, tags = [], cursor) {
        // We use page for cache key primarily, but if cursor is used, it's for infinite scroll which often is bypass-cache or unique key
        const cacheKey = cursor ? `problems:list:${domain}:${type}:cursor:${cursor}:pageSize:${pageSize}:diff:${diff || 'all'}:tags:${tags.sort().join(',')}` : getProblemsCacheKey(type, domain, page, diff, tags);
        try {
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }
        const query = {
            where: {
                type,
                domain,
                difficulty: diff,
                hidden: false,
                tags: tags.length > 0 ? {
                    some: {
                        slug: {
                            in: tags
                        }
                    }
                } : undefined
            },
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                score: true,
                solved: true,
                createdAt: true,
                type: true,
                _count: {
                    select: {
                        submissions: true
                    }
                },
                tags: {
                    select: {
                        name: true,
                        slug: true
                    }
                }
            }
        };
        if (cursor) {
            query.cursor = {
                id: cursor
            };
            query.skip = 1; // Skip the item already fetched
        } else {
            query.skip = (page - 1) * pageSize;
        }
        const [problems, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findMany(query),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.count({
                where: {
                    type,
                    domain,
                    difficulty: diff,
                    hidden: false,
                    tags: tags.length > 0 ? {
                        some: {
                            slug: {
                                in: tags
                            }
                        }
                    } : undefined
                }
            })
        ]);
        const result = {
            problems,
            total
        };
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error("Redis set error:", error);
        }
        return result;
    }
    // GETTING PUBLIC PROBLEMS
    static async getProblems(page = 1, pageSize = 10, type = "PRACTICE", domain = "DSA", userId, diff, tags = [], cursor) {
        // FETCHING PUBLIC DATA (CACHED)
        const { problems, total } = await this.getCachedProblems(page, pageSize, type, domain, diff, tags, cursor);
        // IF USER IS LOGGED IN, FETCHING THEIR SOLVED STATUS FOR THESE SPECIFIC PROBLEMS
        let solvedSet = new Set();
        if (userId && problems.length > 0) {
            const problemIds = problems.map((p)=>p.id);
            const solvedSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId,
                    problemId: {
                        in: problemIds
                    },
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: {
                    problemId: true
                },
                distinct: [
                    "problemId"
                ]
            });
            solvedSet = new Set(solvedSubmissions.map((s)=>s.problemId));
        }
        // MERGING DATA
        const problemsWithStats = problems.map((p)=>{
            return {
                ...p,
                isSolved: solvedSet.has(p.id),
                acceptance: p._count.submissions > 0 ? (p.solved || 0) / p._count.submissions * 100 : 0
            };
        });
        return {
            problems: problemsWithStats,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
            total
        };
    }
    // GETTING ADMIN PROBLEMS
    static async getAdminProblems(page = 1, pageSize = 50, domain, excludeDifficulty, type) {
        const cacheKey = getAdminProblemsCacheKey(domain, page);
        // Note: cache key doesn't include excludeDifficulty which could be an issue if we vary it often,
        // but for now only one usage pattern exists per page.
        // Ideally we should append it to cache key but let's keep it simple as per plan.
        try {
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
            // If we have cached data, we might need to filter it manually if the cache key doesn't support variations
            // But for now let's assume cache key strategy needs update if we want perfect caching.
            // However, user just wants filtering. Let's bypass cache if we have specific filter or update cache key.
            // Actually, let's just proceed with fetching fresh if we use filters or rely on the query.
            // Given the current cache implementation is simple, let's just do the query.
            // return JSON.parse(cached); // Disabling cache return for filtered requests for safety or we update key
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }
        const skip = (page - 1) * pageSize;
        const where = domain ? {
            domain
        } : {};
        if (type) {
            where.type = type;
        } else {
            where.type = {
                not: "CONTEST"
            };
        }
        if (excludeDifficulty) {
            where.difficulty = {
                not: excludeDifficulty
            };
        }
        const [problems, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                    hidden: true,
                    score: true,
                    type: true,
                    domain: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.count({
                where
            })
        ]);
        const result = {
            problems,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
            total
        };
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error("Redis set error:", error);
        }
        return result;
    }
    // SEARCHING FOR PROBLEMS
    static async searchProblems(term, type = "PRACTICE", domain = "DSA", userId) {
        const problems = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findMany({
            where: {
                type,
                domain,
                hidden: false,
                title: {
                    contains: term,
                    mode: 'insensitive'
                }
            },
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                score: true,
                solved: true,
                createdAt: true,
                type: true,
                _count: {
                    select: {
                        submissions: true
                    }
                },
                tags: {
                    select: {
                        name: true,
                        slug: true
                    }
                }
            }
        });
        let solvedSet = new Set();
        if (userId && problems.length > 0) {
            const problemIds = problems.map((p)=>p.id);
            const solvedSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId,
                    problemId: {
                        in: problemIds
                    },
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: {
                    problemId: true
                },
                distinct: [
                    "problemId"
                ]
            });
            solvedSet = new Set(solvedSubmissions.map((s)=>s.problemId));
        }
        const problemsWithStats = problems.map((p)=>{
            return {
                ...p,
                isSolved: solvedSet.has(p.id),
                acceptance: p._count.submissions > 0 ? (p.solved || 0) / p._count.submissions * 100 : 0
            };
        });
        return {
            problems: problemsWithStats
        };
    }
    // CACHED FETCHER FOR SINGLE PROBLEM
    static async getCachedProblem(slug) {
        const cacheKey = getProblemCacheKey(slug);
        try {
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }
        const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findUnique({
            where: {
                slug
            },
            include: {
                testCases: true,
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                tags: {
                    select: {
                        name: true,
                        slug: true
                    }
                },
                functionTemplates: true // Include for DSA function template boilerplates
            }
        });
        if (problem) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, PROBLEM_CACHE_TTL, JSON.stringify(problem));
            } catch (error) {
                console.error("Redis set error:", error);
            }
        }
        return problem;
    }
    // GETTING A PROBLEM BY SLUG CACHED
    static async getProblem(slug) {
        const problem = await this.getCachedProblem(slug);
        return problem;
    }
    // GETTING A PROBLEM BY ID
    static async getProblemById(id) {
        try {
            const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findUnique({
                where: {
                    id
                },
                include: {
                    testCases: true,
                    tags: {
                        select: {
                            name: true,
                            slug: true
                        }
                    },
                    functionTemplates: true
                }
            });
            return {
                success: true,
                data: problem
            };
        } catch (error) {
            console.error("Failed to get problem by id:", error);
            return {
                success: false,
                error: "Failed to get problem by id"
            };
        }
    }
    // GETTING NEXT PROBLEM
    static async getNextProblem(currentCreatedAt, domain, type) {
        try {
            const nextProblem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findFirst({
                where: {
                    domain,
                    type,
                    hidden: false,
                    createdAt: {
                        lt: currentCreatedAt
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    slug: true
                }
            });
            return nextProblem?.slug || null;
        } catch (error) {
            console.error("Failed to get next problem:", error);
            return null;
        }
    }
    // GETTING PREVIOUS PROBLEM
    static async getPreviousProblem(currentCreatedAt, domain, type) {
        try {
            const prevProblem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findFirst({
                where: {
                    domain,
                    type,
                    hidden: false,
                    createdAt: {
                        gt: currentCreatedAt
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                },
                select: {
                    slug: true
                }
            });
            return prevProblem?.slug || null;
        } catch (error) {
            console.error("Failed to get previous problem:", error);
            return null;
        }
    }
    // GETTING RANDOM PROBLEM
    static async getRandomProblem(domain, type) {
        try {
            // efficient random selection using raw query or count-based skip
            const count = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.count({
                where: {
                    domain,
                    type,
                    hidden: false
                }
            });
            if (count === 0) return null;
            const skip = Math.floor(Math.random() * count);
            const randomProblem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findFirst({
                where: {
                    domain,
                    type,
                    hidden: false
                },
                skip,
                select: {
                    slug: true
                }
            });
            return randomProblem?.slug || null;
        } catch (error) {
            console.error("Failed to get random problem:", error);
            return null;
        }
    }
    // CREATING A PROBLEM
    static async createProblem(data) {
        try {
            const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.create({
                data: {
                    title: data.title,
                    description: data.description,
                    difficulty: data.difficulty,
                    slug: data.slug,
                    score: 10,
                    hidden: data.hidden,
                    hiddenQuery: data.hiddenQuery || null,
                    domain: data.domain || "DSA",
                    useFunctionTemplate: data.useFunctionTemplate || false,
                    solution: data.solution || null,
                    testCases: {
                        create: data.testCases.map((tc)=>({
                                input: tc.input,
                                output: tc.output,
                                hidden: tc.hidden ?? false
                            }))
                    },
                    tags: data.tags ? {
                        connect: data.tags.map((slug)=>({
                                slug
                            }))
                    } : undefined,
                    // Create function templates if provided and enabled
                    functionTemplates: data.useFunctionTemplate && data.functionTemplates?.length ? {
                        create: data.functionTemplates.map((ft)=>({
                                languageId: ft.languageId,
                                functionTemplate: ft.functionTemplate,
                                driverCode: ft.driverCode
                            }))
                    } : undefined
                }
            });
            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();
            return {
                success: true,
                problem
            };
        } catch (error) {
            console.error("Failed to create problem:", error);
            return {
                success: false,
                error: "Failed to create problem"
            };
        }
    }
    // UPDATING A PROBLEM
    static async updateProblem(id, data) {
        try {
            const { testCases, tags, functionTemplates, ...problemData } = data;
            const updateData = {
                ...problemData
            };
            if (testCases) {
                updateData.testCases = {
                    deleteMany: {},
                    create: testCases.map((tc)=>({
                            input: tc.input,
                            output: tc.output,
                            hidden: tc.hidden ?? false
                        }))
                };
            }
            if (tags) {
                updateData.tags = {
                    set: [],
                    connect: tags.map((slug)=>({
                            slug
                        }))
                };
            }
            // Handle function templates
            if (functionTemplates !== undefined) {
                updateData.functionTemplates = {
                    deleteMany: {},
                    create: functionTemplates.map((ft)=>({
                            languageId: ft.languageId,
                            functionTemplate: ft.functionTemplate,
                            driverCode: ft.driverCode
                        }))
                };
            }
            // UPDATING THE PROBLEM
            const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.update({
                where: {
                    id
                },
                data: updateData
            });
            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getProblemCacheKey(problem.slug));
            // Also invalidate function template cache
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(`problem-templates:${id}`);
            return {
                success: true,
                data: problem
            };
        } catch (error) {
            console.error("Failed to update problem:", error);
            return {
                success: false,
                error: "Failed to update problem"
            };
        }
    }
    // DELETING A PROBLEM
    static async deleteProblem(id) {
        try {
            const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findUnique({
                where: {
                    id
                },
                select: {
                    slug: true
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.delete({
                where: {
                    id
                }
            });
            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();
            if (problem) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getProblemCacheKey(problem.slug));
            }
            // RETURNING THE SUCCESS
            return {
                success: true
            };
        } catch (error) {
            console.error("Failed to delete problem:", error);
            return {
                success: false,
                error: "Failed to delete problem"
            };
        }
    }
    static async invalidateProblemCaches() {
        const cachePattern = "problems:list:*";
        const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(cachePattern);
        if (keys.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
        }
        const adminCachePattern = "admin:problems:*";
        const adminKeys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(adminCachePattern);
        if (adminKeys.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...adminKeys);
        }
    }
}
}),
"[project]/actions/problems.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d9f7e192f4cde9508f832f98d501a5d2bac3b26b":"deleteProblem","40dd2241aa639228d5754da39ff0b8d10a59d75bff":"createProblem","6094ec6e5c7d68eabf2ee86ceb1e87755d9fd33b01":"updateProblem","60ee1ae949348cbb95c6ff1624db0e0167a061c945":"getRandomProblem","c01897e0e33720eec5643ef69ddae234356fd82300":"$$RSC_SERVER_CACHE_3","c05c8fadea7603e1a1f64c8b4dcbe007d8d4fb2c3a":"$$RSC_SERVER_CACHE_4","f0b5bb641795686f7cca1e438a6e0566d735ffcd4e":"$$RSC_SERVER_CACHE_2","f0e393a839ccab97fcb8522876156c6ba741ba3074":"$$RSC_SERVER_CACHE_6","f0eb7ece396ebe935b968e8abfe06e00d6920108af":"$$RSC_SERVER_CACHE_5","fc03c238e4639461fed11dd40d3ecd9287bcb20773":"$$RSC_SERVER_CACHE_1","ff85edbb114d3f01c639e45db77828c9d874750fd9":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "$$RSC_SERVER_CACHE_2",
    ()=>$$RSC_SERVER_CACHE_2,
    "$$RSC_SERVER_CACHE_3",
    ()=>$$RSC_SERVER_CACHE_3,
    "$$RSC_SERVER_CACHE_4",
    ()=>$$RSC_SERVER_CACHE_4,
    "$$RSC_SERVER_CACHE_5",
    ()=>$$RSC_SERVER_CACHE_5,
    "$$RSC_SERVER_CACHE_6",
    ()=>$$RSC_SERVER_CACHE_6,
    "createProblem",
    ()=>createProblem,
    "deleteProblem",
    ()=>deleteProblem,
    "getAdminProblems",
    ()=>getAdminProblems,
    "getNextProblem",
    ()=>getNextProblem,
    "getPreviousProblem",
    ()=>getPreviousProblem,
    "getProblem",
    ()=>getProblem,
    "getProblemById",
    ()=>getProblemById,
    "getProblems",
    ()=>getProblems,
    "getRandomProblem",
    ()=>getRandomProblem,
    "searchProblems",
    ()=>searchProblems,
    "updateProblem",
    ()=>updateProblem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/problem.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const $$RSC_SERVER_CACHE_0_INNER = async function getProblems(page = 1, pageSize = 10, type = "PRACTICE", domain = "DSA", difficulty, tags, cursor) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    // CHECKING IF USER IS AUTHENTICATED
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const userId = session?.user?.id;
    const tagKey = `problems-${domain}-${type}${difficulty ? `-${difficulty}` : ''}${tags && tags.length > 0 ? `-${tags.join('-')}` : ''}${cursor ? `-cursor-${cursor}` : `-page-${page}`}${userId ? `-user-${userId}` : ''}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(tagKey, 'problems-list', `problems-${domain}-${type}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getProblems(page, pageSize, type, domain, userId, difficulty, tags || [], cursor);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getProblems() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "ff85edbb114d3f01c639e45db77828c9d874750fd9", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "ff85edbb114d3f01c639e45db77828c9d874750fd9", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getProblems"
});
var getProblems = $$RSC_SERVER_CACHE_0;
const $$RSC_SERVER_CACHE_1_INNER = async function getAdminProblems(page = 1, pageSize = 50, domain, excludeDifficulty, type) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    // CHECKING IF USER IS AUTHENTICATED
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const tagKey = `admin-problems-${domain || 'all'}${excludeDifficulty ? `-exclude-${excludeDifficulty}` : ''}${type ? `-type-${type}` : ''}-page-${page}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(tagKey, 'admin-problems-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getAdminProblems(page, pageSize, domain, excludeDifficulty, type);
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getAdminProblems() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "fc03c238e4639461fed11dd40d3ecd9287bcb20773", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "fc03c238e4639461fed11dd40d3ecd9287bcb20773", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getAdminProblems"
});
var getAdminProblems = $$RSC_SERVER_CACHE_1;
const $$RSC_SERVER_CACHE_2_INNER = async function searchProblems(term, type = "PRACTICE", domain = "DSA") {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    }); // 5 minutes for search results
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const userId = session?.user?.id;
    const tagKey = `search-${domain}-${type}-${term.toLowerCase().slice(0, 20)}${userId ? `-user-${userId}` : ''}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(tagKey, 'problems-search');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].searchProblems(term, type, domain, userId);
};
var $$RSC_SERVER_CACHE_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function searchProblems() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "f0b5bb641795686f7cca1e438a6e0566d735ffcd4e", 0, $$RSC_SERVER_CACHE_2_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_2, "f0b5bb641795686f7cca1e438a6e0566d735ffcd4e", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_2, "name", {
    value: "searchProblems"
});
var searchProblems = $$RSC_SERVER_CACHE_2;
const $$RSC_SERVER_CACHE_3_INNER = async function getProblem(slug) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`problem-${slug}`, 'problems-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getProblem(slug);
};
var $$RSC_SERVER_CACHE_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getProblem() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c01897e0e33720eec5643ef69ddae234356fd82300", 0, $$RSC_SERVER_CACHE_3_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_3, "c01897e0e33720eec5643ef69ddae234356fd82300", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_3, "name", {
    value: "getProblem"
});
var getProblem = $$RSC_SERVER_CACHE_3;
async function createProblem(data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].createProblem(data);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dsa/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/sql/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('admin-problems-list');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-list');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-SQL-PRACTICE');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-DSA-PRACTICE');
    }
    return result;
}
const $$RSC_SERVER_CACHE_4_INNER = async function getProblemById(id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`problem-id-${id}`, 'problems-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getProblemById(id);
};
var $$RSC_SERVER_CACHE_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getProblemById() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c05c8fadea7603e1a1f64c8b4dcbe007d8d4fb2c3a", 0, $$RSC_SERVER_CACHE_4_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_4, "c05c8fadea7603e1a1f64c8b4dcbe007d8d4fb2c3a", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_4, "name", {
    value: "getProblemById"
});
var getProblemById = $$RSC_SERVER_CACHE_4;
const $$RSC_SERVER_CACHE_5_INNER = async function getNextProblem(currentCreatedAt, domain, type) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getNextProblem(currentCreatedAt, domain, type);
};
var $$RSC_SERVER_CACHE_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getNextProblem() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "f0eb7ece396ebe935b968e8abfe06e00d6920108af", 0, $$RSC_SERVER_CACHE_5_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_5, "f0eb7ece396ebe935b968e8abfe06e00d6920108af", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_5, "name", {
    value: "getNextProblem"
});
var getNextProblem = $$RSC_SERVER_CACHE_5;
const $$RSC_SERVER_CACHE_6_INNER = async function getPreviousProblem(currentCreatedAt, domain, type) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getPreviousProblem(currentCreatedAt, domain, type);
};
var $$RSC_SERVER_CACHE_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getPreviousProblem() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "f0e393a839ccab97fcb8522876156c6ba741ba3074", 0, $$RSC_SERVER_CACHE_6_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_6, "f0e393a839ccab97fcb8522876156c6ba741ba3074", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_6, "name", {
    value: "getPreviousProblem"
});
var getPreviousProblem = $$RSC_SERVER_CACHE_6;
async function getRandomProblem(domain, type) {
    // No cache for random
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].getRandomProblem(domain, type);
}
async function updateProblem(id, data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].updateProblem(id, data);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/problems`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dsa/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/sql/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('admin-problems-list');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-list');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`problems-${result.data?.domain || 'DSA'}-${result.data?.type || 'PRACTICE'}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`problem-${result.data?.slug}`);
    }
    return result;
}
async function deleteProblem(id) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$problem$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProblemService"].deleteProblem(id);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/problems`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dsa/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/sql/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('admin-problems-list');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-list');
    }
    return result;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createProblem,
    getRandomProblem,
    updateProblem,
    deleteProblem
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProblem, "40dd2241aa639228d5754da39ff0b8d10a59d75bff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRandomProblem, "60ee1ae949348cbb95c6ff1624db0e0167a061c945", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProblem, "6094ec6e5c7d68eabf2ee86ceb1e87755d9fd33b01", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProblem, "40d9f7e192f4cde9508f832f98d501a5d2bac3b26b", null);
}),
"[project]/.next-internal/server/app/(main)/dashboard/classrooms/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/classroom.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/assignment.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/problems.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$dashboard$2f$classrooms$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/classroom.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/assignment.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/problems.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(main)/dashboard/classrooms/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/classroom.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/assignment.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/problems.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000ec191d293cb8cc90e57828e017864626cb92ee5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentClassrooms"],
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "00d1b81d9172745f1e621bc00389a4047839aa9a65",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTeacherClassrooms"],
    "400d34faa00f51bc854d89b0a782031b730d053dd6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentContests"],
    "402b2dfd9102ab55714da1b45943219de73e571e8e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["joinClassroom"],
    "402d498415f6e7ce5e7b14101bd742a174c034fe89",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshClassroomAssignments"],
    "403750cd613b34ea87612c7694cf246e6b79128ea4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClassroom"],
    "4062742210455aba21be245a7b93cd6f55cbfccfbb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomByCode"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "40cf2b7d8360449612784b56c4ebe4adc7f8e41e41",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomLiveTracking"],
    "604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAssignment"],
    "60ba5514d1cabf3d740ffa8f4168ee127042974be0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInstitutionClassrooms"],
    "60edb317f160a76e4bb511111cff02ad646382fb68",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleClassroomTracking"],
    "60f68b6b6de74b348b326d1abc2051c2a16b2617c9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStudentFromClassroom"],
    "60f9d7da12c7611c06fbd706641903809dc9ed6481",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkInternalContestParticipation"],
    "7088643fe9948b5d44e935d70bd04124cc9fb572ff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomWithStudents"],
    "70a74088e6ae2baef179da5722207b030fb65b8469",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkExternalParticipation"],
    "70b22c8ab63d11fc3b25b267ea271300db7487dcaa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomAssignments"],
    "78073ece8699c8e6f210ef2e8915c5f3d914d87a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTeacherAssignmentAnalytics"],
    "80b7c88da10d3a194c1170a71124e07c2947bd3a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserScore"],
    "c0aedadb2987fc5c1995746b3ab4b358510ee91b21",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$dashboard$2f$classrooms$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "f01f5ef9ed6223b56ddc1153abce0acfbc57475009",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchProblems"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$dashboard$2f$classrooms$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f28$main$292f$dashboard$2f$classrooms$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/dashboard/classrooms/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/user.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/classroom.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/assignment.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/actions/problems.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$dashboard$2f$classrooms$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/dashboard/classrooms/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/classroom.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/assignment.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$classroom$2d$contest$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/classroom-contest.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2d$checker$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest-checker.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/problems.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__62342a7b._.js.map