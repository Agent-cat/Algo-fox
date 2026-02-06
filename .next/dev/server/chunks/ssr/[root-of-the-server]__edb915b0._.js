module.exports = [
"[externals]/next/dist/server/app-render/module-loading/track-module-loading.external.js [external] (next/dist/server/app-render/module-loading/track-module-loading.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/module-loading/track-module-loading.external.js", () => require("next/dist/server/app-render/module-loading/track-module-loading.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
        log: ("TURBOPACK compile-time truthy", 1) ? [
            'error',
            'warn'
        ] : "TURBOPACK unreachable"
    }).$extends({
        query: {
            $allModels: {
                async $allOperations ({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const end = performance.now();
                    // Warn about slow queries (>1 second)
                    if (end - start > 1000) {
                        console.warn(`Slow query: ${model}.${operation} took ${(end - start).toFixed(2)}ms`);
                    }
                    return result;
                }
            }
        }
    });
};
const prisma = globalThis.prisma_fox ?? prismaClientSingleton();
;
if ("TURBOPACK compile-time truthy", 1) globalThis.prisma_fox = prisma;
}),
"[project]/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$auth$2f$auth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/auth/auth.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/plugins/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$admin$2f$admin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/plugins/admin/admin.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$prisma$2d$adapter$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/adapters/prisma-adapter/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$prisma$2d$adapter$2f$prisma$2d$adapter$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/adapters/prisma-adapter/prisma-adapter.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
;
;
;
;
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$auth$2f$auth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterAuth"])({
    database: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$prisma$2d$adapter$2f$prisma$2d$adapter$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"], {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: true
    },
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        microsoft: {
            enabled: true,
            clientId: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "STUDENT"
            },
            institutionId: {
                type: "string",
                required: false
            },
            onboardingCompleted: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false
            }
        }
    },
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$admin$2f$admin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["admin"])({
            adminRoles: [
                "ADMIN"
            ],
            defaultRole: "STUDENT",
            adminUserIds: [
                "jvp0LDpaCm0Y2VpUVP75vCNQnDioEdpm"
            ]
        })
    ]
});
}),
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
"[project]/actions/contest.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00eefbb253a85123f8c3c600ca19869a5101d8c0d1":"getVisibleContests","40224e3fe672716e149c2c2793410ece7e7ff96034":"getInstitutionalClassrooms","4041a53321b8a41efa0515551dc3e636f81f59f7d7":"getParticipationStatus","407bfdebdef8125e9da675e434ddabed8c0d83ff51":"acceptContestRules","407d6b79375f2016b6861524ddee55c2e99ceb5e5b":"createContestWithProblems","407ff7fc9ba70fda023756de206f185bb7683b86bd":"createContest","409d0a0373926b8940e890b689a1cac3144677e167":"getContestDetail","409f563bec9a985442cff8b7b83d7546b8276a02e1":"getSelectableProblems","40a47fbc0ae4e927cabd5fae0ee2325db6de07014c":"finalizeContest","40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab":"finishContestAction","40edfea29c94aa36a1a52aa93c92827398e407c1c2":"getContestRanking","40f7fe5a39b9ff511e9db90ca5a169ae86d7660b65":"checkSubmissionEligibility","40fcf50c7b1ee991289ef809f621af905c86ec6963":"getContestParticipants","602cf4435ac48b07adb33a52140ca1f4538d93b7d6":"validateContestSession","604a0bcc1451e81e233f48280ac746b33b2aa18f12":"verifyContestPassword","607d884db8652712b1888554802e08210ff48e297a":"getParticipantViolations","60995be1625901022cd2485061fb5f529d27001da0":"unblockParticipant","60ab32f1cc26748b4afce6a433ca3e6dc394836698":"startContestSession","78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f":"logContestViolation","803cf50d552ccc152ed46f078e0fb03c1767a05eb9":"$$RSC_SERVER_CACHE_0","c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb":"$$RSC_SERVER_CACHE_1","c08c3a89f87d0fda2e2465be36519f53224c7bbfb3":"$$RSC_SERVER_CACHE_2"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "$$RSC_SERVER_CACHE_2",
    ()=>$$RSC_SERVER_CACHE_2,
    "acceptContestRules",
    ()=>acceptContestRules,
    "checkSubmissionEligibility",
    ()=>checkSubmissionEligibility,
    "createContest",
    ()=>createContest,
    "createContestWithProblems",
    ()=>createContestWithProblems,
    "finalizeContest",
    ()=>finalizeContest,
    "finishContestAction",
    ()=>finishContestAction,
    "getContestDetail",
    ()=>getContestDetail,
    "getContestLeaderboard",
    ()=>getContestLeaderboard,
    "getContestParticipants",
    ()=>getContestParticipants,
    "getContestRanking",
    ()=>getContestRanking,
    "getInstitutionalClassrooms",
    ()=>getInstitutionalClassrooms,
    "getParticipantViolations",
    ()=>getParticipantViolations,
    "getParticipationStatus",
    ()=>getParticipationStatus,
    "getSelectableProblems",
    ()=>getSelectableProblems,
    "getVisibleContests",
    ()=>getVisibleContests,
    "logContestViolation",
    ()=>logContestViolation,
    "startContestSession",
    ()=>startContestSession,
    "unblockParticipant",
    ()=>unblockParticipant,
    "validateContestSession",
    ()=>validateContestSession,
    "verifyContestPassword",
    ()=>verifyContestPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
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
const contestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3, "Title must be at least 3 characters"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    startTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.date(),
    endTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.date(),
    visibility: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "PUBLIC",
        "INSTITUTION",
        "CLASSROOM"
    ]),
    classroomId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    institutionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    problems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).min(1, "Select at least one problem"),
    contestPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    randomizeQuestions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false)
});
const contestWithProblemsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3, "Title must be at least 3 characters"),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3, "Slug must be at least 3 characters"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    startTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date(),
    endTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date(),
    visibility: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "PUBLIC",
        "INSTITUTION",
        "CLASSROOM"
    ]),
    hidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    classroomId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    institutionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    backgroundImage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    prizes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    rules: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    problems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()),
    contestPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    randomizeQuestions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false)
});
/**
 * Fetches contests visible to the current user.
 */ /**
 * Cached fetch for public contests
 */ const $$RSC_SERVER_CACHE_0_INNER = async function getPublicContests() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])("contests-public");
    // @ts-ignore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])("contests");
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findMany({
        where: {
            visibility: "PUBLIC",
            hidden: false
        },
        include: {
            _count: {
                select: {
                    problems: true
                }
            }
        },
        orderBy: {
            startTime: "desc"
        }
    });
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getPublicContests() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "803cf50d552ccc152ed46f078e0fb03c1767a05eb9", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "803cf50d552ccc152ed46f078e0fb03c1767a05eb9", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getPublicContests"
});
var getPublicContests = $$RSC_SERVER_CACHE_0;
async function getVisibleContests() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    try {
        if (!session?.user) {
            const contests = await getPublicContests();
            return {
                success: true,
                contests
            };
        }
        const currentUser = session.user;
        if (currentUser.role === "ADMIN") {
            const contests = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findMany({
                include: {
                    _count: {
                        select: {
                            problems: true
                        }
                    }
                },
                orderBy: {
                    startTime: "desc"
                }
            });
            return {
                success: true,
                contests
            };
        }
        const contests = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findMany({
            where: {
                OR: [
                    {
                        visibility: "PUBLIC"
                    },
                    {
                        AND: [
                            {
                                visibility: "INSTITUTION"
                            },
                            {
                                institutionId: currentUser.institutionId
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                visibility: "CLASSROOM"
                            },
                            {
                                OR: [
                                    {
                                        classroom: {
                                            students: {
                                                some: {
                                                    id: currentUser.id
                                                }
                                            }
                                        }
                                    },
                                    {
                                        creatorId: currentUser.id
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        creatorId: currentUser.id
                    }
                ]
            },
            include: {
                _count: {
                    select: {
                        problems: true
                    }
                }
            },
            orderBy: {
                startTime: "desc"
            }
        });
        return {
            success: true,
            contests
        };
    } catch (error) {
        console.error("Failed to fetch contests:", error);
        return {
            success: false,
            error: "Failed to fetch contests"
        };
    }
}
/**
 * Fetches a single contest's details with authorization.
 */ /**
 * Fetches a single contest's details with authorization.
 */ /**
 * Cached contest detail fetcher
 * Returns contest data without user-specific context
 */ const $$RSC_SERVER_CACHE_1_INNER = async function getCachedContest(contestId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`contest-${contestId}`);
    // @ts-ignore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])("contest-detail");
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
        where: {
            id: contestId
        },
        include: {
            _count: {
                select: {
                    problems: true
                }
            },
            problems: {
                include: {
                    problem: {
                        select: {
                            id: true,
                            title: true,
                            difficulty: true,
                            slug: true
                        }
                    }
                },
                orderBy: {
                    order: "asc"
                }
            }
        }
    });
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getCachedContest() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getCachedContest"
});
var getCachedContest = $$RSC_SERVER_CACHE_1;
async function getContestDetail(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    try {
        const contest = await getCachedContest(contestId);
        if (!contest) {
            return {
                success: false,
                error: "Contest not found"
            };
        }
        const currentUser = session?.user;
        const participation = currentUser ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: currentUser.id,
                    contestId: contestId
                }
            }
        }) : null;
        const now = new Date();
        const hasStarted = now >= contest.startTime;
        const isCreator = currentUser?.id === contest.creatorId;
        const isAdmin = currentUser?.role === "ADMIN";
        // Visibility Check
        let isAuthorized = false;
        if (contest.visibility === "PUBLIC") {
            isAuthorized = true;
        } else if (isAdmin) {
            isAuthorized = true;
        } else if (currentUser) {
            if (isCreator) {
                isAuthorized = true;
            } else if (contest.visibility === "INSTITUTION") {
                // Use == for null/undefined loose equality check
                isAuthorized = currentUser.institutionId == contest.institutionId;
            } else if (contest.visibility === "CLASSROOM") {
                const enrollment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findFirst({
                    where: {
                        id: contest.classroomId,
                        students: {
                            some: {
                                id: currentUser.id
                            }
                        }
                    }
                });
                isAuthorized = !!enrollment;
            }
        }
        if (!isAuthorized) {
            return {
                success: false,
                error: "Unauthorized access to this contest."
            };
        }
        const canSeeProblems = (hasStarted || isAdmin || isCreator) && (participation?.acceptedRules || isCreator || isAdmin);
        // Fix: If the contest is over, allowed roles should check participation properly,
        // but typically allows viewing if public/authorized.
        // But for "Live" contests, the current logic is correct.
        const requiresPassword = !!contest.contestPassword;
        // Shuffle problems if randomizeQuestions is enabled
        // Use a simple seeded shuffle based on userId + contestId for consistency
        let visibleProblems = canSeeProblems ? contest.problems : [];
        if (contest.randomizeQuestions && currentUser && visibleProblems.length > 0 && !isAdmin && !isCreator) {
            // Simple string hash function for seeding
            const seedStr = `${currentUser.id}-${contestId}`;
            let seed = 0;
            for(let i = 0; i < seedStr.length; i++){
                seed = (seed << 5) - seed + seedStr.charCodeAt(i);
                seed |= 0;
            }
            // Deterministic shuffle
            visibleProblems = [
                ...visibleProblems
            ].sort((a, b)=>{
                const x = Math.sin(seed++) * 10000;
                return x - Math.floor(x) - 0.5;
            });
        }
        // Fetch user's solved problems for this contest
        const solvedProblemIds = new Set();
        if (currentUser) {
            const solvedSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId: currentUser.id,
                    contestId: contestId,
                    status: "ACCEPTED",
                    problemId: {
                        in: visibleProblems.map((p)=>p.problem.id)
                    }
                },
                select: {
                    problemId: true
                }
            });
            solvedSubmissions.forEach((s)=>solvedProblemIds.add(s.problemId));
        }
        return {
            success: true,
            contest: {
                ...contest,
                problems: visibleProblems.map((vp)=>({
                        ...vp,
                        isSolved: solvedProblemIds.has(vp.problem.id)
                    })),
                hasStarted,
                hasEnded: now > contest.endTime,
                canManage: isAdmin || isCreator,
                hasAcceptedRules: participation?.acceptedRules || false,
                isFinished: participation?.isFinished || false,
                requiresPassword,
                contestPassword: null,
                sessionId: participation?.sessionId // Return sessionId for protection
            }
        };
    } catch (error) {
        console.error("Failed to fetch contest detail:", error);
        return {
            success: false,
            error: "Failed to fetch contest"
        };
    }
}
async function createContest(data) {
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
    if (![
        "ADMIN",
        "INSTITUTION_MANAGER",
        "CONTEST_MANAGER",
        "TEACHER"
    ].includes(currentUser.role)) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const validatedData = contestSchema.parse(data);
        // Generate a more robust unique slug
        const baseSlug = validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const uniqueSlug = `${baseSlug}-${Date.now()}`;
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.create({
            data: {
                title: validatedData.title,
                slug: uniqueSlug,
                description: validatedData.description,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                visibility: validatedData.visibility,
                institutionId: validatedData.visibility !== "PUBLIC" ? validatedData.institutionId || null : null,
                classroomId: validatedData.visibility === "CLASSROOM" ? validatedData.classroomId || null : null,
                creatorId: currentUser.id,
                contestPassword: validatedData.contestPassword || null,
                randomizeQuestions: validatedData.randomizeQuestions || false,
                problems: {
                    create: validatedData.problems.map((problemId, index)=>({
                            problemId,
                            order: index
                        }))
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/contests");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/contest");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("contests", "max");
        return {
            success: true,
            contestId: contest.id
        };
    } catch (error) {
        console.error("Failed to create contest:", error);
        // Return clearer error messages
        let errorMessage = "Failed to create contest";
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            errorMessage = error.errors.map((e)=>e.message).join(", ");
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function createContestWithProblems(data) {
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
    if (![
        "ADMIN",
        "INSTITUTION_MANAGER",
        "CONTEST_MANAGER",
        "TEACHER"
    ].includes(currentUser.role)) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const validatedData = contestWithProblemsSchema.parse(data);
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            const contest = await tx.contest.create({
                data: {
                    title: validatedData.title,
                    slug: validatedData.slug,
                    description: validatedData.description,
                    startTime: validatedData.startTime,
                    endTime: validatedData.endTime,
                    visibility: validatedData.visibility,
                    hidden: validatedData.hidden,
                    backgroundImage: validatedData.backgroundImage,
                    prizes: validatedData.prizes,
                    rules: validatedData.rules,
                    institutionId: validatedData.visibility !== "PUBLIC" ? validatedData.institutionId || null : null,
                    classroomId: validatedData.visibility === "CLASSROOM" ? validatedData.classroomId || null : null,
                    creatorId: currentUser.id,
                    contestPassword: validatedData.contestPassword || null,
                    randomizeQuestions: validatedData.randomizeQuestions || false
                }
            });
            for(let i = 0; i < validatedData.problems.length; i++){
                const p = validatedData.problems[i];
                // Generate unique slug by appending contest slug and index
                const uniqueSlug = `${validatedData.slug}-${p.slug || p.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
                const problem = await tx.problem.create({
                    data: {
                        title: p.title,
                        description: p.description,
                        difficulty: p.difficulty,
                        slug: uniqueSlug,
                        score: p.score || 10,
                        domain: p.domain,
                        type: "CONTEST",
                        hidden: true,
                        testCases: {
                            create: p.testCases
                        },
                        tags: {
                            connect: p.tags?.map((t)=>({
                                    name: t
                                })) || []
                        }
                    }
                });
                await tx.contestProblem.create({
                    data: {
                        contestId: contest.id,
                        problemId: problem.id,
                        order: i
                    }
                });
            }
            return contest;
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/contests");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/contests");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/contest");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("contests", "max");
        return {
            success: true,
            contestId: contest.id
        };
    } catch (error) {
        console.error("Failed to create contest with problems:", error);
        return {
            success: false,
            error: "Failed to create contest"
        };
    }
}
async function getInstitutionalClassrooms(institutionId) {
    try {
        const classrooms = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findMany({
            where: {
                institutionId
            },
            select: {
                id: true,
                name: true,
                section: true
            }
        });
        return {
            success: true,
            classrooms
        };
    } catch (error) {
        console.error("Failed to fetch classrooms:", error);
        return {
            success: false,
            error: "Failed to fetch classrooms"
        };
    }
}
async function getSelectableProblems(search) {
    try {
        const problems = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        slug: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ],
                hidden: false
            },
            select: {
                id: true,
                title: true,
                difficulty: true,
                slug: true
            },
            take: 10
        });
        return {
            success: true,
            problems
        };
    } catch (error) {
        console.error("Failed to fetch problems:", error);
        return {
            success: false,
            error: "Failed to fetch problems"
        };
    }
}
async function acceptContestRules(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.upsert({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            update: {
                acceptedRules: true
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                acceptedRules: true
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/contest/${contestId}`);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to accept rules"
        };
    }
}
async function finishContestAction(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.upsert({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            update: {
                isFinished: true,
                finishedAt: new Date()
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                acceptedRules: true,
                isFinished: true,
                finishedAt: new Date()
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/contest/${contestId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/problems`);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to finish contest"
        };
    }
}
async function finalizeContest(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    // Only admins or contest managers can finalize
    const currentUser = session.user;
    if (![
        "ADMIN",
        "CONTEST_MANAGER",
        "INSTITUTION_MANAGER",
        "TEACHER"
    ].includes(currentUser.role)) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
            where: {
                id: contestId
            },
            select: {
                isFinalized: true,
                title: true
            }
        });
        if (!contest) return {
            success: false,
            error: "Contest not found"
        };
        if (contest.isFinalized) return {
            success: false,
            error: "Contest is already finalized"
        };
        // Reuse leaderboard logic to get rankings
        const leaderboard = await getContestLeaderboard(contestId);
        if (!leaderboard.success || !leaderboard.students) {
            return {
                success: false,
                error: "Failed to fetch leaderboard"
            };
        }
        const students = leaderboard.students;
        // At least 1 student needed
        if (students.length === 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.update({
                where: {
                    id: contestId
                },
                data: {
                    isFinalized: true
                }
            });
            return {
                success: true,
                message: "Contest finalized (no participants)"
            };
        }
        // Top 3 IDs
        const goldUserId = students[0]?.id;
        const silverUserId = students[1]?.id;
        const bronzeUserId = students[2]?.id;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Award Gold
            if (goldUserId) {
                await tx.user.update({
                    where: {
                        id: goldUserId
                    },
                    data: {
                        goldBadges: {
                            increment: 1
                        }
                    }
                });
            }
            // Award Silver
            if (silverUserId) {
                await tx.user.update({
                    where: {
                        id: silverUserId
                    },
                    data: {
                        silverBadges: {
                            increment: 1
                        }
                    }
                });
            }
            // Award Bronze
            if (bronzeUserId) {
                await tx.user.update({
                    where: {
                        id: bronzeUserId
                    },
                    data: {
                        bronzeBadges: {
                            increment: 1
                        }
                    }
                });
            }
            // Mark Finalized
            await tx.contest.update({
                where: {
                    id: contestId
                },
                data: {
                    isFinalized: true
                }
            });
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/profile/${goldUserId}`);
        if (silverUserId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/profile/${silverUserId}`);
        if (bronzeUserId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/profile/${bronzeUserId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/contest/${contestId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`contest-${contestId}`, "max");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`leaderboard-${contestId}`, "max");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to finalize contest:", error);
        return {
            success: false,
            error: "Failed to finalize contest"
        };
    }
}
async function verifyContestPassword(contestId, password) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
            where: {
                id: contestId
            },
            select: {
                contestPassword: true
            }
        });
        if (!contest) return {
            success: false,
            error: "Contest not found"
        };
        if (contest.contestPassword && contest.contestPassword !== password) {
            return {
                success: false,
                error: "Invalid contest password"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to verify contest password:", error);
        return {
            success: false,
            error: "Failed to verify password"
        };
    }
}
async function startContestSession(contestId, password) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
            where: {
                id: contestId
            },
            select: {
                startTime: true,
                endTime: true,
                contestPassword: true
            }
        });
        if (!contest) return {
            success: false,
            error: "Contest not found"
        };
        if (contest.contestPassword && contest.contestPassword !== password) {
            return {
                success: false,
                error: "Invalid contest password"
            };
        }
        const now = new Date();
        // Time bounds check
        if (now < contest.startTime) {
            return {
                success: false,
                error: "Contest has not started yet"
            };
        }
        if (now > contest.endTime) {
            return {
                success: false,
                error: "Contest has already ended"
            };
        }
        // Generate unique session ID
        const sessionId = `${session.user.id}-${contestId}-${Date.now()}`;
        // Check for existing active session (multi-tab detection)
        const existingParticipation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            }
        });
        if (existingParticipation?.isBlocked) {
            return {
                success: false,
                error: "You have been blocked from this contest due to violations"
            };
        }
        if (existingParticipation?.isFinished) {
            return {
                success: false,
                error: "You have already finished this contest"
            };
        }
        // Update or create participation with new session
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.upsert({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            update: {
                sessionId,
                sessionStartedAt: now,
                acceptedRules: true
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                sessionId,
                sessionStartedAt: now,
                acceptedRules: true
            }
        });
        return {
            success: true,
            sessionId,
            participationId: participation.id,
            totalViolations: participation.totalViolations,
            isFlagged: participation.isFlagged
        };
    } catch (error) {
        console.error("Failed to start contest session:", error);
        return {
            success: false,
            error: "Failed to start contest session"
        };
    }
}
async function logContestViolation(contestId, type, message, metadata) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            }
        });
        if (!participation) {
            return {
                success: false,
                error: "No active participation found"
            };
        }
        // Determine which counter to increment
        const counterField = {
            TAB_SWITCH: "tabSwitchCount",
            FULLSCREEN_EXIT: "fullscreenExitCount",
            COPY_PASTE: "copyPasteCount",
            DEVTOOLS_OPEN: "devToolsCount",
            KEYBOARD_SHORTCUT: "keyboardCount",
            NAVIGATION_ATTEMPT: "navigationCount",
            MULTI_TAB: "tabSwitchCount",
            SUSPICIOUS_INPUT: "copyPasteCount"
        }[type];
        // Use transaction to ensure atomic update
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Check last violation time to prevent rapid-fire duplicates (Server-side debounce)
            const lastViolation = await tx.contestViolation.findFirst({
                where: {
                    participationId: participation.id
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            if (lastViolation) {
                const timeDiff = Date.now() - lastViolation.createdAt.getTime();
                // If less than 2 seconds since last violation, ignore this one
                if (timeDiff < 2000) {
                    return {
                        ...participation,
                        isFlagged: participation.isFlagged,
                        isBlocked: participation.isBlocked,
                        totalViolations: participation.totalViolations,
                        permanentlyBlocked: participation.permanentlyBlocked,
                        tempBlockedUntil: participation.tempBlockedUntil
                    };
                }
            }
            // Create violation record
            await tx.contestViolation.create({
                data: {
                    participationId: participation.id,
                    type: type,
                    message,
                    metadata: metadata ?? undefined
                }
            });
            // Calculate new total and determine blocking tier
            const newTotalViolations = participation.totalViolations + 1;
            const shouldFlag = newTotalViolations >= 3;
            // Tiered blocking logic
            let tempBlockedUntil = null;
            let permanentlyBlocked = false;
            let isBlocked = false;
            if (newTotalViolations >= 6) {
                // 6+ violations = permanent block
                permanentlyBlocked = true;
                isBlocked = true;
            } else if (newTotalViolations >= 4) {
                // 4-5 violations = 5 minute temp block
                tempBlockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
                isBlocked = true;
            }
            const updated = await tx.contestParticipation.update({
                where: {
                    id: participation.id
                },
                data: {
                    [counterField]: {
                        increment: 1
                    },
                    totalViolations: {
                        increment: 1
                    },
                    isFlagged: shouldFlag || participation.isFlagged,
                    isBlocked,
                    tempBlockedUntil,
                    permanentlyBlocked
                }
            });
            return updated;
        });
        return {
            success: true,
            totalViolations: result.totalViolations,
            isFlagged: result.isFlagged,
            isBlocked: result.isBlocked,
            tempBlockedUntil: result.tempBlockedUntil?.toISOString() || null,
            permanentlyBlocked: result.permanentlyBlocked
        };
    } catch (error) {
        console.error("Failed to log violation:", error);
        return {
            success: false,
            error: "Failed to log violation"
        };
    }
}
async function validateContestSession(contestId, sessionId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        valid: false,
        error: "Unauthorized"
    };
    try {
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            include: {
                contest: {
                    select: {
                        startTime: true,
                        endTime: true
                    }
                }
            }
        });
        if (!participation) {
            return {
                success: true,
                valid: false,
                reason: "No participation found"
            };
        }
        // Check if blocked
        if (participation.isBlocked) {
            return {
                success: true,
                valid: false,
                reason: "Blocked due to violations"
            };
        }
        // Check if finished
        if (participation.isFinished) {
            return {
                success: true,
                valid: false,
                reason: "Contest already finished"
            };
        }
        // Check session ID (multi-tab detection)
        if (participation.sessionId !== sessionId) {
            // Log multi-tab violation
            await logContestViolation(contestId, "MULTI_TAB", "Multiple tabs detected");
            return {
                success: true,
                valid: false,
                reason: "Session mismatch - possible multiple tabs"
            };
        }
        // Check time bounds
        const now = new Date();
        if (now > participation.contest.endTime) {
            return {
                success: true,
                valid: false,
                reason: "Contest has ended"
            };
        }
        return {
            success: true,
            valid: true,
            totalViolations: participation.totalViolations,
            isFlagged: participation.isFlagged
        };
    } catch (error) {
        console.error("Failed to validate session:", error);
        return {
            success: false,
            valid: false,
            error: "Failed to validate session"
        };
    }
}
async function checkSubmissionEligibility(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        eligible: false,
        error: "Unauthorized"
    };
    try {
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            include: {
                contest: {
                    select: {
                        startTime: true,
                        endTime: true
                    }
                }
            }
        });
        if (!participation) {
            return {
                eligible: false,
                reason: "No participation found"
            };
        }
        // Check various conditions
        if (participation.isBlocked) {
            return {
                eligible: false,
                reason: "Blocked due to excessive violations"
            };
        }
        if (participation.isFinished) {
            return {
                eligible: false,
                reason: "You have already finished this contest"
            };
        }
        const now = new Date();
        if (now < participation.contest.startTime) {
            return {
                eligible: false,
                reason: "Contest has not started"
            };
        }
        if (now > participation.contest.endTime) {
            return {
                eligible: false,
                reason: "Contest has ended"
            };
        }
        return {
            eligible: true,
            warnings: participation.isFlagged ? [
                "Your session has been flagged for review"
            ] : []
        };
    } catch (error) {
        console.error("Failed to check eligibility:", error);
        return {
            eligible: false,
            error: "Failed to check eligibility"
        };
    }
}
async function getParticipationStatus(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            select: {
                acceptedRules: true,
                isFinished: true,
                isFlagged: true,
                isBlocked: true,
                totalViolations: true,
                sessionId: true,
                tempBlockedUntil: true,
                permanentlyBlocked: true
            }
        });
        // Check if temp block has expired
        if (participation?.tempBlockedUntil && new Date() > participation.tempBlockedUntil) {
            // Temp block expired - unblock
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.update({
                where: {
                    userId_contestId: {
                        userId: session.user.id,
                        contestId: contestId
                    }
                },
                data: {
                    isBlocked: false,
                    tempBlockedUntil: null
                }
            });
            return {
                success: true,
                participation: {
                    ...participation,
                    isBlocked: false,
                    tempBlockedUntil: null
                }
            };
        }
        return {
            success: true,
            participation: participation || null
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to get participation status"
        };
    }
}
async function getContestParticipants(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    const currentUser = session.user;
    // Check if user is contest manager/creator
    const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
        where: {
            id: contestId
        },
        select: {
            creatorId: true
        }
    });
    if (!contest) return {
        success: false,
        error: "Contest not found"
    };
    const isAuthorized = currentUser.role === "ADMIN" || currentUser.role === "CONTEST_MANAGER" || currentUser.role === "TEACHER" || contest.creatorId === currentUser.id;
    if (!isAuthorized) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const participants = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findMany({
            where: {
                contestId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                violations: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 10
                }
            },
            orderBy: [
                {
                    permanentlyBlocked: "desc"
                },
                {
                    isBlocked: "desc"
                },
                {
                    totalViolations: "desc"
                }
            ]
        });
        return {
            success: true,
            participants
        };
    } catch (error) {
        console.error("Failed to get participants:", error);
        return {
            success: false,
            error: "Failed to get participants"
        };
    }
}
async function unblockParticipant(contestId, userId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    const currentUser = session.user;
    // Check authorization
    const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
        where: {
            id: contestId
        },
        select: {
            creatorId: true
        }
    });
    if (!contest) return {
        success: false,
        error: "Contest not found"
    };
    const isAuthorized = currentUser.role === "ADMIN" || currentUser.role === "CONTEST_MANAGER" || currentUser.role === "TEACHER" || contest.creatorId === currentUser.id;
    if (!isAuthorized) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.update({
            where: {
                userId_contestId: {
                    userId,
                    contestId
                }
            },
            data: {
                isBlocked: false,
                tempBlockedUntil: null,
                permanentlyBlocked: false,
                totalViolations: 0,
                tabSwitchCount: 0,
                fullscreenExitCount: 0,
                copyPasteCount: 0,
                devToolsCount: 0,
                keyboardCount: 0,
                navigationCount: 0,
                isFlagged: false,
                unblockedBy: currentUser.id,
                unblockedAt: new Date()
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/contests/${contestId}/participants`);
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to unblock participant:", error);
        return {
            success: false,
            error: "Failed to unblock participant"
        };
    }
}
async function getParticipantViolations(contestId, userId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    const currentUser = session.user;
    // Check authorization
    const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
        where: {
            id: contestId
        },
        select: {
            creatorId: true
        }
    });
    if (!contest) return {
        success: false,
        error: "Contest not found"
    };
    const isAuthorized = currentUser.role === "ADMIN" || currentUser.role === "CONTEST_MANAGER" || currentUser.role === "TEACHER" || contest.creatorId === currentUser.id;
    if (!isAuthorized) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const participation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId,
                    contestId
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                violations: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });
        return {
            success: true,
            participation
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to get violations"
        };
    }
}
const $$RSC_SERVER_CACHE_2_INNER = async function getContestLeaderboard(contestId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`leaderboard-${contestId}`);
    // @ts-ignore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])("leaderboard");
    try {
        const participations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contestParticipation.findMany({
            where: {
                contestId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        const contest = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].contest.findUnique({
            where: {
                id: contestId
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                                slug: true,
                                score: true
                            }
                        }
                    },
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        });
        if (!contest) return {
            success: false,
            error: "Contest not found"
        };
        const leaderboard = await Promise.all(participations.map(async (p)=>{
            // Get valid submissions for this user in this contest
            const submissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId: p.userId,
                    contestId: contestId,
                    createdAt: {
                        gte: contest.startTime,
                        lte: contest.endTime
                    }
                },
                select: {
                    id: true,
                    status: true,
                    problemId: true,
                    createdAt: true,
                    language: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            // Calculate total score
            // Logic: Best submission per problem counts
            const problemScores = new Map();
            const problemSolveTimes = new Map();
            const problemSubmissionCounts = new Map();
            const problemBestSubmissions = new Map();
            submissions.forEach((sub)=>{
                const currentCount = problemSubmissionCounts.get(sub.problemId) || 0;
                problemSubmissionCounts.set(sub.problemId, currentCount + 1);
                if (sub.status === "ACCEPTED") {
                    const currentBest = problemScores.get(sub.problemId) || 0;
                    const problemDef = contest.problems.find((cp)=>cp.problemId === sub.problemId);
                    const maxScore = problemDef?.problem.score || 0;
                    if (maxScore > currentBest) {
                        problemScores.set(sub.problemId, maxScore);
                        const currentBestTime = problemSolveTimes.get(sub.problemId);
                        if (!currentBestTime || sub.createdAt < currentBestTime) {
                            problemSolveTimes.set(sub.problemId, sub.createdAt);
                            problemBestSubmissions.set(sub.problemId, sub);
                        }
                    }
                }
            });
            let totalScore = 0;
            let totalTimeMs = 0;
            problemScores.forEach((score, problemId)=>{
                totalScore += score;
                const solventTime = problemSolveTimes.get(problemId);
                if (solventTime) {
                    totalTimeMs += solventTime.getTime() - contest.startTime.getTime();
                }
            });
            // Map stats for each problem in the contest
            const problemStats = contest.problems.map((cp)=>{
                const bestSub = problemBestSubmissions.get(cp.problemId);
                return {
                    problemId: cp.problemId,
                    title: cp.problem.title,
                    slug: cp.problem.slug,
                    score: problemScores.get(cp.problemId) || 0,
                    maxScore: cp.problem.score,
                    submissions: problemSubmissionCounts.get(cp.problemId) || 0,
                    solved: problemScores.has(cp.problemId),
                    solvedAt: problemSolveTimes.get(cp.problemId),
                    language: bestSub?.language?.name || null,
                    languageId: bestSub?.language?.id || null
                };
            });
            return {
                ...p.user,
                score: totalScore,
                timeTaken: totalTimeMs,
                problemsSolved: problemScores.size,
                problemStats
            };
        }));
        // Sort: High score first, then low time taken
        leaderboard.sort((a, b)=>{
            if (b.score !== a.score) return b.score - a.score;
            return a.timeTaken - b.timeTaken;
        });
        return {
            success: true,
            students: leaderboard,
            isFinalized: contest.isFinalized,
            problems: contest.problems.map((cp)=>({
                    id: cp.problemId,
                    title: cp.problem.title,
                    slug: cp.problem.slug,
                    maxScore: cp.problem.score
                }))
        };
    } catch (error) {
        console.error("Leaderboard error:", error);
        return {
            success: false,
            error: "Failed to generate leaderboard"
        };
    }
};
var $$RSC_SERVER_CACHE_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getContestLeaderboard() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c08c3a89f87d0fda2e2465be36519f53224c7bbfb3", 0, $$RSC_SERVER_CACHE_2_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_2, "c08c3a89f87d0fda2e2465be36519f53224c7bbfb3", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_2, "name", {
    value: "getContestLeaderboard"
});
var getContestLeaderboard = $$RSC_SERVER_CACHE_2;
async function getContestRanking(contestId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) return {
        success: false,
        error: "Unauthorized"
    };
    try {
        const result = await getContestLeaderboard(contestId);
        if (!result.success || !result.students) {
            return {
                success: false,
                error: "Failed to get ranking"
            };
        }
        const rank = result.students.findIndex((s)=>s.id === session.user.id) + 1;
        return {
            success: true,
            rank: rank > 0 ? rank : null
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to get ranking"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getVisibleContests,
    getContestDetail,
    createContest,
    createContestWithProblems,
    getInstitutionalClassrooms,
    getSelectableProblems,
    acceptContestRules,
    finishContestAction,
    finalizeContest,
    verifyContestPassword,
    startContestSession,
    logContestViolation,
    validateContestSession,
    checkSubmissionEligibility,
    getParticipationStatus,
    getContestParticipants,
    unblockParticipant,
    getParticipantViolations,
    getContestRanking
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVisibleContests, "00eefbb253a85123f8c3c600ca19869a5101d8c0d1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getContestDetail, "409d0a0373926b8940e890b689a1cac3144677e167", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createContest, "407ff7fc9ba70fda023756de206f185bb7683b86bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createContestWithProblems, "407d6b79375f2016b6861524ddee55c2e99ceb5e5b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstitutionalClassrooms, "40224e3fe672716e149c2c2793410ece7e7ff96034", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSelectableProblems, "409f563bec9a985442cff8b7b83d7546b8276a02e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(acceptContestRules, "407bfdebdef8125e9da675e434ddabed8c0d83ff51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(finishContestAction, "40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(finalizeContest, "40a47fbc0ae4e927cabd5fae0ee2325db6de07014c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyContestPassword, "604a0bcc1451e81e233f48280ac746b33b2aa18f12", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startContestSession, "60ab32f1cc26748b4afce6a433ca3e6dc394836698", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logContestViolation, "78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateContestSession, "602cf4435ac48b07adb33a52140ca1f4538d93b7d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkSubmissionEligibility, "40f7fe5a39b9ff511e9db90ca5a169ae86d7660b65", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getParticipationStatus, "4041a53321b8a41efa0515551dc3e636f81f59f7d7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getContestParticipants, "40fcf50c7b1ee991289ef809f621af905c86ec6963", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unblockParticipant, "60995be1625901022cd2485061fb5f529d27001da0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getParticipantViolations, "607d884db8652712b1888554802e08210ff48e297a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getContestRanking, "40edfea29c94aa36a1a52aa93c92827398e407c1c2", null);
}),
"[project]/lib/contest-fetcher.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchExternalContests",
    ()=>fetchExternalContests
]);
const CACHE_DURATION = 3600; // 1 hour
// --- Fetchers ---
async function fetchCodeForces(options) {
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
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const contests = data.result.filter((c)=>{
            const startTime = c.startTimeSeconds * 1000;
            // Keep upcoming OR past contests within last 30 days
            return c.phase === "BEFORE" || c.phase === "FINISHED" && startTime > thirtyDaysAgo;
        }).map((c)=>({
                id: `codeforces-${c.id}`,
                name: c.name,
                url: `https://codeforces.com/contest/${c.id}`,
                start_time: new Date(c.startTimeSeconds * 1000).toISOString(),
                end_time: new Date((c.startTimeSeconds + c.durationSeconds) * 1000).toISOString(),
                duration: c.durationSeconds.toString(),
                site: "CodeForces",
                in_24_hours: c.startTimeSeconds * 1000 - Date.now() < 86400000 && c.phase === "BEFORE" ? "Yes" : "No",
                status: c.phase === "BEFORE" ? "UPCOMING" : "FINISHED"
            }));
        return contests;
    } catch (e) {
        console.warn("CodeForces fetch failed:", e);
        return [];
    }
}
async function fetchLeetCode(options) {
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
            body: JSON.stringify({
                query
            }),
            ...options
        });
        if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`);
        const data = await res.json();
        if (data.errors) {
            throw new Error(`LeetCode GraphQL error: ${data.errors[0]?.message}`);
        }
        return data.data.upcomingContests.map((c)=>{
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
                in_24_hours: start.getTime() - Date.now() < 86400000 ? "Yes" : "No",
                status: "UPCOMING"
            };
        });
    } catch (e) {
        console.warn("LeetCode fetch failed:", e);
        return [];
    }
}
async function fetchCodeChef(options) {
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
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        // CodeChef returns { present_contests: [], future_contests: [], past_contests: [] }
        const future = data.future_contests || [];
        const past = (data.past_contests || []).filter((c)=>{
            const start = new Date(c.contest_start_date_iso).getTime();
            return start > thirtyDaysAgo;
        });
        const present = data.present_contests || [];
        const all = [
            ...present,
            ...future,
            ...past
        ];
        return all.map((c)=>{
            const status = present.some((p)=>p.code === c.code) ? "ONGOING" : future.some((f)=>f.code === c.code) ? "UPCOMING" : "FINISHED";
            return {
                id: `codechef-${c.contest_code}`.toLowerCase(),
                name: c.contest_name,
                url: `https://www.codechef.com/${c.contest_code}`,
                start_time: c.contest_start_date_iso,
                end_time: c.contest_end_date_iso,
                duration: (parseInt(c.contest_duration) * 60).toString(),
                site: "CodeChef",
                in_24_hours: status === "ONGOING" || status === "UPCOMING" && new Date(c.contest_start_date_iso).getTime() - Date.now() < 86400000 ? "Yes" : "No",
                status: status
            };
        });
    } catch (e) {
        console.warn("CodeChef fetch failed:", e);
        return [];
    }
}
async function fetchExternalContests(options) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 15000); // 15 second total timeout
        // Run all fetches in parallel
        const results = await Promise.allSettled([
            fetchCodeForces({
                ...options,
                signal: controller.signal
            }),
            fetchLeetCode({
                ...options,
                signal: controller.signal
            }),
            fetchCodeChef({
                ...options,
                signal: controller.signal
            })
        ]);
        clearTimeout(timeoutId);
        const contests = [];
        results.forEach((result)=>{
            if (result.status === "fulfilled") {
                contests.push(...result.value);
            }
        });
        // Sort by start time
        contests.sort((a, b)=>new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
        return contests;
    } catch (error) {
        console.error("Unexpected error in fetchExternalContests:", error);
        return [];
    }
}
}),
"[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"001658537d68d7bc6bcb9fccb827a16e52650bfe99":"refreshContests","40185845dff856417383e739807aa392a64473b8bd":"getUpcomingContests"},"",""] */ __turbopack_context__.s([
    "getUpcomingContests",
    ()=>getUpcomingContests,
    "refreshContests",
    ()=>refreshContests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contest$2d$fetcher$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contest-fetcher.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getUpcomingContests(ignoreCache = false) {
    // Note: ignoreCache parameter is kept for interface compatibility but we rely on revalidateTag
    // or just fetch fresh in SWR/React Server Components if configured.
    // The lib function does standard fetch.
    // Since we want Next.js caching behavior here, we might need to wrap it if fetchExternalContests uses standard fetch,
    // but Next.js monkeypatches fetch globally. So if the lib uses fetch, it uses Next.js fetch.
    // However, the lib function doesn't include the `next: { revalidate: ... }` options passed to fetch.
    // I should probably pass those options or just accept that the lib function is "pure".
    // Wait, the lib function I wrote has no `next` options.
    // If I want caching in Next.js, I should probably keep the original action logic or modify the lib to accept options.
    // BUT, for the bot, I want FRESH data always.
    // For the web app, I want CACHED data.
    // Compromise: I will NOT change the server action for now to minimize risk of breaking the web app caching.
    // I will simply duplicate the logic in the lib for the bot, OR I will modify the lib to accept fetch options.
    // Actually, looking at my previous step, I already created the lib WITHOUT generic next options.
    // The prompt asked me to "make a telegram bot".
    // Code duplication is better than breaking existing app behavior if I'm not 100% sure about specific Next.js 15 cache semantics with shared libs.
    // I already wrote the lib file. I can just use the lib file for the BOT.
    // And leave the action as is? No, checking the file interaction - if I don't change the action, I have two copies.
    // The user prefers optimized code.
    // Let's modify the LIB to accept fetch options?
    // Or just use the lib in the action and add `unstable_cache` around it?
    // Next.js 15 `unstable_cache` is good.
    // Let's stick to the safest path: leave the action alone for now to avoid breaking the production app caching.
    // Use the lib/contest-fetcher.ts for the BOT script.
    // Wait, I already overwrote `lib/contest-fetcher.ts`? No, I created it.
    // I will NOT modify `actions/external-contests.action.ts`.
    // I'll just return with an empty edit or skip this step?
    // I selected "Replace server action" in my thought process, but now I'm reconsidering.
    // It's safer to leave the original file alone if I don't perfectly understand the side effects on caching.
    // However, the user might want a single source of truth.
    // Given the task is "make a telegram bot", not "refactor the app", I'll prioritize the bot working.
    // I will skip editing `actions/external-contests.action.ts`.
    const contests = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contest$2d$fetcher$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchExternalContests"])({
        next: {
            revalidate: 3600,
            tags: [
                "external-contests"
            ]
        }
    });
    return {
        success: true,
        contests
    };
}
async function refreshContests() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("external-contests", "max");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUpcomingContests,
    refreshContests
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUpcomingContests, "40185845dff856417383e739807aa392a64473b8bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshContests, "001658537d68d7bc6bcb9fccb827a16e52650bfe99", null);
}),
"[project]/components/contest/ContestPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ContestPageClient",
    ()=>ContestPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ContestPageClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ContestPageClient() from the server but ContestPageClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/contest/ContestPageClient.tsx <module evaluation>", "ContestPageClient");
}),
"[project]/components/contest/ContestPageClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ContestPageClient",
    ()=>ContestPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ContestPageClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ContestPageClient() from the server but ContestPageClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/contest/ContestPageClient.tsx", "ContestPageClient");
}),
"[project]/components/contest/ContestPageClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/contest/ContestPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/contest/ContestPageClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"8075ac0c0824d29940a3c69c2ca921b0044e96f1a4":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "default",
    ()=>StudentContestsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/contest/ContestPageClient.tsx [app-rsc] (ecmascript)");
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
const $$RSC_SERVER_CACHE_0_INNER = async function ContestsDataWrapper() {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/signin");
    }
    // Fetch both internal and external contests in parallel
    const [internalRes, externalRes] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVisibleContests"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUpcomingContests"])()
    ]);
    const internalContests = internalRes.success ? internalRes.contests || [] : [];
    const externalContests = externalRes.success ? externalRes.contests || [] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ContestPageClient"], {
        internalContests: internalContests,
        externalContests: externalContests
    }, void 0, false, {
        fileName: "[project]/app/(main)/contests/page.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function ContestsDataWrapper() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "8075ac0c0824d29940a3c69c2ca921b0044e96f1a4", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "8075ac0c0824d29940a3c69c2ca921b0044e96f1a4", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "ContestsDataWrapper"
});
var ContestsDataWrapper = $$RSC_SERVER_CACHE_0;
async function StudentContestsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"
            }, void 0, false, {
                fileName: "[project]/app/(main)/contests/page.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/(main)/contests/page.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ContestsDataWrapper, {}, void 0, false, {
            fileName: "[project]/app/(main)/contests/page.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/contests/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/.next-internal/server/app/(main)/contests/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$contests$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)");
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
;
;
;
}),
"[project]/.next-internal/server/app/(main)/contests/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "001658537d68d7bc6bcb9fccb827a16e52650bfe99",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshContests"],
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "00eefbb253a85123f8c3c600ca19869a5101d8c0d1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVisibleContests"],
    "40185845dff856417383e739807aa392a64473b8bd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUpcomingContests"],
    "40224e3fe672716e149c2c2793410ece7e7ff96034",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInstitutionalClassrooms"],
    "4041a53321b8a41efa0515551dc3e636f81f59f7d7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getParticipationStatus"],
    "407bfdebdef8125e9da675e434ddabed8c0d83ff51",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["acceptContestRules"],
    "407d6b79375f2016b6861524ddee55c2e99ceb5e5b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContestWithProblems"],
    "407ff7fc9ba70fda023756de206f185bb7683b86bd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContest"],
    "409d0a0373926b8940e890b689a1cac3144677e167",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestDetail"],
    "409f563bec9a985442cff8b7b83d7546b8276a02e1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSelectableProblems"],
    "40a47fbc0ae4e927cabd5fae0ee2325db6de07014c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalizeContest"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finishContestAction"],
    "40edfea29c94aa36a1a52aa93c92827398e407c1c2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestRanking"],
    "40f7fe5a39b9ff511e9db90ca5a169ae86d7660b65",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSubmissionEligibility"],
    "40fcf50c7b1ee991289ef809f621af905c86ec6963",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestParticipants"],
    "602cf4435ac48b07adb33a52140ca1f4538d93b7d6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateContestSession"],
    "604a0bcc1451e81e233f48280ac746b33b2aa18f12",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyContestPassword"],
    "607d884db8652712b1888554802e08210ff48e297a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getParticipantViolations"],
    "60995be1625901022cd2485061fb5f529d27001da0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unblockParticipant"],
    "60ab32f1cc26748b4afce6a433ca3e6dc394836698",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startContestSession"],
    "78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logContestViolation"],
    "803cf50d552ccc152ed46f078e0fb03c1767a05eb9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "8075ac0c0824d29940a3c69c2ca921b0044e96f1a4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$contests$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "80b7c88da10d3a194c1170a71124e07c2947bd3a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserScore"],
    "c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"],
    "c08c3a89f87d0fda2e2465be36519f53224c7bbfb3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_2"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$contests$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f28$main$292f$contests$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/contests/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/user.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/contest.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$contests$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/contests/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$external$2d$contests$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/external-contests.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__edb915b0._.js.map