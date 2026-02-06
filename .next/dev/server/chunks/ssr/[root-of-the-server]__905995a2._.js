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
"[project]/core/services/dashboard.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardService",
    ()=>DashboardService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
;
class DashboardService {
    // GETTING DASHBOARD STATS
    static async getDashboardStats(userId) {
        const cacheKey = `dashboard:stats:${userId}`;
        const CACHE_TTL = 5 * 60; // 5 minutes
        try {
            // GETTING CACHE FROM REDIS
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                // RETURNING THE CACHE IF CACHED
                return JSON.parse(cached);
            }
        } catch (error) {
            // REDIS ERROR --> CONTINUE WITHOUT CACHE
            console.error('Redis get error:', error);
        }
        // FETCHING USER DATA (LITE)
        // We still fetch the user and their *recent* submissions (e.g. last 5) for the UI Activity Feed
        // But we do NOT fetch ALL submissions for stats calculation anymore.
        const userPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                institution: {
                    select: {
                        name: true
                    }
                },
                problemsSolved: true,
                totalScore: true,
                bio: true,
                goldBadges: true,
                silverBadges: true,
                bronzeBadges: true,
                leetCodeHandle: true,
                leetCodeVerified: true,
                codeChefHandle: true,
                codeChefVerified: true,
                codeforcesHandle: true,
                codeforcesVerified: true,
                githubHandle: true,
                submissions: {
                    where: {
                        mode: "SUBMIT"
                    },
                    select: {
                        id: true,
                        createdAt: true,
                        status: true,
                        code: true,
                        language: {
                            select: {
                                name: true
                            }
                        },
                        problem: {
                            select: {
                                id: true,
                                difficulty: true,
                                slug: true,
                                title: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 20 // Recent activity only
                }
            }
        });
        // --- OPTIMIZED RAW QUERIES ---
        // 1. SOLVED BY DIFFICULTY
        const difficultyStatsPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw`
            SELECT
                p."difficulty",
                CAST(COUNT(DISTINCT s."problemId") AS INTEGER) as "count"
            FROM "Submission" s
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY p."difficulty"
        `;
        // 2. LANGUAGE COUNTS
        const languageStatsPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw`
            SELECT
                l."name",
                CAST(COUNT(DISTINCT s."problemId") AS INTEGER) as "count"
            FROM "Submission" s
            JOIN "Language" l ON s."languageId" = l."id"
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY l."name"
        `;
        // 3. ACTIVITY DATES (For Streaks)
        // We only need the dates, sorted.
        const activityDatesPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw`
            SELECT DISTINCT
                DATE(s."createdAt") as "date"
            FROM "Submission" s
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            ORDER BY "date" ASC
        `;
        // 4. TOTAL PROBLEMS COUNT (METADATA)
        const totalByDifficultyPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.groupBy({
            by: [
                'difficulty'
            ],
            where: {
                hidden: false,
                difficulty: {
                    not: 'CONCEPT'
                }
            },
            _count: {
                id: true
            }
        });
        const [user, difficultyStats, languageStats, activityDates, totalByDifficulty] = await Promise.all([
            userPromise,
            difficultyStatsPromise,
            languageStatsPromise,
            activityDatesPromise,
            totalByDifficultyPromise
        ]);
        if (!user) {
            return null;
        }
        // --- PROCESS DATA ---
        // SOLVED BY DIFFICULTY
        const solvedByDifficulty = {
            EASY: 0,
            MEDIUM: 0,
            HARD: 0
        };
        difficultyStats.forEach((row)=>{
            if (row.difficulty in solvedByDifficulty) {
                solvedByDifficulty[row.difficulty] = row.count;
            }
        });
        // TOTAL PROBLEMS
        const totalProblems = {
            EASY: 0,
            MEDIUM: 0,
            HARD: 0,
            TOTAL: 0
        };
        totalByDifficulty.forEach((group)=>{
            const count = group._count.id;
            if (group.difficulty in totalProblems) {
                totalProblems[group.difficulty] = count;
            }
            totalProblems.TOTAL += count;
        });
        // LANGUAGE COUNTS
        const languageCounts = {};
        languageStats.forEach((row)=>{
            const langName = row.name;
            let normalizedName = langName;
            if (langName.toLowerCase().includes('cpp') || langName.toLowerCase().includes('c++')) normalizedName = 'Cpp';
            else if (langName.toLowerCase().includes('java')) normalizedName = 'Java';
            else if (langName.toLowerCase().includes('javascript')) normalizedName = 'JavaScript';
            if (!languageCounts[normalizedName]) languageCounts[normalizedName] = 0;
            languageCounts[normalizedName] += row.count;
        });
        // STREAKS CALCULATION
        let currentStreak = 0;
        let bestStreak = 0;
        // activityDates is array of { date: Date }
        if (activityDates.length > 0) {
            const sortedDates = activityDates.map((d)=>new Date(d.date));
            // BEST STREAK
            let streak = 1;
            bestStreak = 1;
            for(let i = 1; i < sortedDates.length; i++){
                // Check diff in days
                const diffTime = Math.abs(sortedDates[i].getTime() - sortedDates[i - 1].getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // Note: With DATE() cast, time is 00:00:00. consecutive days have diffDays = 1.
                // However, timezone issues might make 'date' string parsing tricky.
                // Prisma returns Date object.
                if (diffDays === 1) {
                    streak++;
                    bestStreak = Math.max(bestStreak, streak);
                } else if (diffDays > 1) {
                    streak = 1;
                }
            // if diffDays == 0 (same day), ignore
            }
            // CURRENT STREAK
            // Check if last activity was today or yesterday
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const lastActivity = sortedDates[sortedDates.length - 1];
            const lastActivityTime = new Date(lastActivity);
            lastActivityTime.setHours(0, 0, 0, 0);
            const diffToLast = (today.getTime() - lastActivityTime.getTime()) / (1000 * 60 * 60 * 24);
            if (diffToLast <= 1) {
                // Users is active today or yesterday -> streak is alive.
                // Re-calculate strictly from end
                currentStreak = 1;
                for(let i = sortedDates.length - 1; i > 0; i--){
                    const curr = sortedDates[i];
                    const prev = sortedDates[i - 1];
                    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
                    if (diff <= 1) {
                        if (diff === 1) currentStreak++;
                    } else {
                        break;
                    }
                }
            } else {
                currentStreak = 0;
            }
        }
        const result = {
            ...user,
            solvedByDifficulty,
            totalProblems,
            languageCounts,
            currentStreak,
            bestStreak: Math.max(bestStreak, currentStreak) // simple fallback
        };
        // CACHING THE RESULT IN REDIS
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error('Redis set error:', error);
        }
        // RETURNING THE RESULT
        return result;
    }
}
}),
"[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"80c021ad7166c82138a01abbe5518c7829e01e6c67":"$$RSC_SERVER_CACHE_0","c059702a0f335f168476ac392628be76b67819c5d0":"$$RSC_SERVER_CACHE_1"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "getDashboardStats",
    ()=>getDashboardStats,
    "getUserProfile",
    ()=>getUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$dashboard$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/dashboard.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const $$RSC_SERVER_CACHE_0_INNER = async function getDashboardStats() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    }); // 5 minutes for dashboard stats
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS AUTHENTICATED --> RETURNING NULL IF NOT AUTHENTICATED
    if (!session?.user) {
        return null;
    }
    const userId = session.user.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`dashboard-${userId}`, 'dashboard-stats');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$dashboard$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DashboardService"].getDashboardStats(userId);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getDashboardStats() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "80c021ad7166c82138a01abbe5518c7829e01e6c67", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "80c021ad7166c82138a01abbe5518c7829e01e6c67", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getDashboardStats"
});
var getDashboardStats = $$RSC_SERVER_CACHE_0;
const $$RSC_SERVER_CACHE_1_INNER = async function getUserProfile(userId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 300,
        revalidate: 300
    });
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // Still require authentication to view profiles
    if (!session?.user) {
        return null;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`dashboard-${userId}`, 'dashboard-stats');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$dashboard$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DashboardService"].getDashboardStats(userId);
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getUserProfile() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c059702a0f335f168476ac392628be76b67819c5d0", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "c059702a0f335f168476ac392628be76b67819c5d0", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getUserProfile"
});
var getUserProfile = $$RSC_SERVER_CACHE_1;
}),
"[project]/.next-internal/server/app/(main)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$dashboard$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(main)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncUserProfile"],
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "80b7c88da10d3a194c1170a71124e07c2947bd3a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserScore"],
    "80c021ad7166c82138a01abbe5518c7829e01e6c67",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$dashboard$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "c059702a0f335f168476ac392628be76b67819c5d0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$dashboard$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$dashboard$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/user.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$dashboard$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/dashboard.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__905995a2._.js.map