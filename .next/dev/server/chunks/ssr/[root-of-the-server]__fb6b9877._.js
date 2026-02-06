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
"[project]/core/services/category.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryService",
    ()=>CategoryService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
;
const CACHE_TTL = 300; // 5 minutes
// CACHE KEY HELPERS
const getCategoriesCacheKey = (domain)=>domain ? `categories:${domain}:all` : "categories:all";
const getCategoryCacheKey = (slug)=>`category:${slug}`;
const getCategoryProblemsCacheKey = (categoryId, page)=>`category:${categoryId}:problems:page:${page}`;
class CategoryService {
    // GETTING ALL CATEGORIES
    static async getCategories(domain = "DSA", userId) {
        try {
            // ONLY CACHING THE BASE CATEGORIES STRUCTURE, NOT USER-SPECIFIC SOLVED COUNTS
            const cacheKey = getCategoriesCacheKey(domain);
            let categories;
            // GETTING CACHE FOR BASE CATEGORIES
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                categories = JSON.parse(cached).categories;
            } else {
                categories = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findMany({
                    where: {
                        domain
                    },
                    orderBy: {
                        order: "asc"
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        slug: true,
                        order: true,
                        domain: true,
                        _count: {
                            select: {
                                categoryProblems: true
                            }
                        }
                    }
                });
                // CACHING THE BASE CATEGORIES STRUCTURE IF NOT CACHED
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify({
                    categories
                }));
            }
            // IF USER IS LOGGED IN, CALCULATING SOLVED COUNT PER CATEGORY
            if (userId) {
                // USING RAW QUERY FOR PERFORMANCE - 30X FASTER THAN FETCHING ALL ROWS
                const solvedCountsRaw = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw`
           SELECT
             cp."categoryId",
             CAST(COUNT(DISTINCT cp."problemId") AS INTEGER) as "count"
           FROM "CategoryProblem" cp
           JOIN "Submission" s ON cp."problemId" = s."problemId"
           WHERE s."userId" = ${userId}
             AND s."status" = 'ACCEPTED'::"SubmissionResult"
             AND s."mode" = 'SUBMIT'::"SubmissionMode"
           GROUP BY cp."categoryId"
         `;
                // CREATING A MAP OF SOLVED COUNT PER CATEGORY
                const solvedMap = new Map();
                solvedCountsRaw.forEach((row)=>{
                    solvedMap.set(row.categoryId, row.count);
                });
                // MERGING INTO CATEGORIES
                categories = categories.map((cat)=>({
                        ...cat,
                        solvedCount: solvedMap.get(cat.id) || 0
                    }));
            } else {
                // IF USER IS NOT LOGGED IN, SETTING SOLVED COUNT TO 0
                categories = categories.map((cat)=>({
                        ...cat,
                        solvedCount: 0
                    }));
            }
            // RETURNING THE CATEGORIES
            return {
                categories
            };
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return {
                categories: []
            };
        }
    }
    // GETTING A CATEGORY BY SLUG
    static async getCategoryBySlug(slug) {
        try {
            const cacheKey = getCategoryCacheKey(slug);
            // GETTING CACHE FOR CATEGORY
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
            if (cached) {
                // RETURNING THE CACHE IF CACHED
                return JSON.parse(cached);
            }
            // GETTING CATEGORY FROM DATABASE IF NOT CACHED
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findUnique({
                where: {
                    slug
                },
                include: {
                    _count: {
                        select: {
                            categoryProblems: true
                        }
                    }
                }
            });
            // IF CATEGORY IS NOT FOUND, RETURNING AN ERROR
            if (!category) {
                return {
                    success: false,
                    error: "Category not found"
                };
            }
            // CACHING THE CATEGORY
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify(category));
            return {
                success: true,
                category: category
            };
        } catch (error) {
            console.error("Failed to fetch category:", error);
            return {
                success: false,
                error: "Failed to fetch category: " + error
            };
        }
    }
    // GETTING A CATEGORY BY ID --> NO CACHING
    static async getCategoryById(id) {
        try {
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findUnique({
                where: {
                    id
                },
                include: {
                    _count: {
                        select: {
                            categoryProblems: true
                        }
                    }
                }
            });
            if (!category) {
                return {
                    success: false,
                    error: "Category not found"
                };
            }
            return {
                success: true,
                category
            };
        } catch (error) {
            console.error("Failed to fetch category:", error);
            return {
                success: false,
                error: "Failed to fetch category"
            };
        }
    }
    // GETTING CATEGORY PROBLEMS
    static async getCategoryProblems(categoryId, page = 1, pageSize = 10, userId, cursor) {
        try {
            const cacheKey = cursor ? `category:${categoryId}:problems:cursor:${cursor}` : getCategoryProblemsCacheKey(categoryId, page);
            // GETTING CACHE FOR CATEGORY PROBLEMS IF NOT CACHED
            if (!userId || page === 1 && !cursor) {
                const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    // IF USER IS AUTHENTICATED, WE NEED TO CHECK SOLVED STATUS
                    if (userId) {
                        const problemIds = parsed.problems.map((p)=>p.id);
                        const solvedProblems = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
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
                        const solvedSet = new Set(solvedProblems.map((s)=>s.problemId));
                        parsed.problems = parsed.problems.map((p)=>({
                                ...p,
                                isSolved: solvedSet.has(p.id)
                            }));
                    }
                    return parsed;
                }
            }
            const [categoryProblems, total] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].categoryProblem.findMany({
                    where: {
                        categoryId
                    },
                    take: pageSize,
                    orderBy: {
                        order: "asc"
                    },
                    skip: cursor ? 1 : (page - 1) * pageSize,
                    ...cursor ? {
                        cursor: {
                            id: cursor
                        }
                    } : {},
                    include: {
                        problem: {
                            include: {
                                _count: {
                                    select: {
                                        submissions: true
                                    }
                                },
                                ...userId ? {
                                    submissions: {
                                        where: {
                                            userId,
                                            status: "ACCEPTED",
                                            mode: "SUBMIT"
                                        },
                                        take: 1,
                                        select: {
                                            id: true
                                        }
                                    }
                                } : {}
                            }
                        }
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].categoryProblem.count({
                    where: {
                        categoryId
                    }
                })
            ]);
            const problems = categoryProblems.map((cp)=>{
                const p = cp.problem;
                const isSolved = p.submissions?.length > 0;
                return {
                    ...p,
                    isSolved,
                    acceptance: p._count.submissions > 0 ? (p.solved || 0) / p._count.submissions * 100 : 0,
                    submissions: undefined
                };
            });
            const result = {
                problems,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                total
            };
            // Cache result (only for first page or cursor and non-authenticated)
            if (!userId || page === 1 && !cursor) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].setex(cacheKey, CACHE_TTL, JSON.stringify(result));
            }
            return result;
        } catch (error) {
            console.error("Failed to fetch category problems:", error);
            return {
                problems: [],
                totalPages: 0,
                currentPage: page,
                total: 0
            };
        }
    }
    // CREATING A CATEGORY
    static async createCategory(data) {
        try {
            // CREATING THE CATEGORY
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.create({
                data: {
                    name: data.name,
                    description: data.description,
                    slug: data.slug,
                    order: data.order ?? 0,
                    domain: data.domain || "DSA"
                }
            });
            // INVALIDATING THE CACHE
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey());
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey(category.domain));
            // RETURNING THE SUCCESS AND THE CATEGORY
            return {
                success: true,
                category: category
            };
        } catch (error) {
            console.error("Failed to create category:", error);
            return {
                success: false,
                error: error.code === "P2002" ? "Slug already exists" : "Failed to create category"
            };
        }
    }
    // UPDATING A CATEGORY
    static async updateCategory(id, data) {
        try {
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.update({
                where: {
                    id
                },
                data
            });
            // INVALIDATING THE CACHE
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey());
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoryCacheKey(category.slug));
            return {
                success: true,
                category
            };
        } catch (error) {
            console.error("Failed to update category:", error);
            return {
                success: false,
                error: "Failed to update category"
            };
        }
    }
    // DELETING A CATEGORY
    static async deleteCategory(id) {
        try {
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findUnique({
                where: {
                    id
                },
                select: {
                    slug: true
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.delete({
                where: {
                    id
                }
            });
            // INVALIDATING THE CACHE
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey());
            // INVALIDATING THE CACHE FOR THE CATEGORY IF IT EXISTS
            if (category) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoryCacheKey(category.slug));
            }
            return {
                success: true,
                slug: category?.slug
            };
        } catch (error) {
            console.error("Failed to delete category:", error);
            return {
                success: false,
                error: "Failed to delete category"
            };
        }
    }
    // ADDING A PROBLEM TO A CATEGORY
    static async addProblemToCategory(categoryId, problemId, order) {
        try {
            // GETTING THE CATEGORY TO GET ITS DOMAIN
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findUnique({
                where: {
                    id: categoryId
                },
                select: {
                    domain: true,
                    slug: true
                }
            });
            if (!category) {
                return {
                    success: false,
                    error: "Category not found"
                };
            }
            // UPDATING THE PROBLEM TO BE OF TYPE LEARN AND MATCH CATEGORY DOMAIN
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.update({
                where: {
                    id: problemId
                },
                data: {
                    type: "LEARN",
                    domain: category.domain
                }
            });
            // CREATING THE CATEGORY PROBLEM
            const categoryProblem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].categoryProblem.create({
                data: {
                    categoryId,
                    problemId,
                    order: order ?? 0
                },
                include: {
                    problem: true,
                    category: true
                }
            });
            // INVALIDATING THE CACHE FOR THE CATEGORY PROBLEMS
            const cachePattern = `category:${categoryId}:problems:*`;
            const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(cachePattern);
            if (keys.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoryCacheKey(categoryProblem.category.slug));
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey(category.domain));
            return {
                success: true,
                categoryProblem
            };
        } catch (error) {
            console.error("Failed to add problem to category:", error);
            if (error.code === "P2002") {
                return {
                    success: false,
                    error: "Problem already in category"
                };
            }
            return {
                success: false,
                error: "Failed to add problem to category"
            };
        }
    }
    // REMOVING A PROBLEM FROM A CATEGORY
    static async removeProblemFromCategory(categoryId, problemId) {
        try {
            // DELETING THE CATEGORY PROBLEM
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].categoryProblem.delete({
                where: {
                    categoryId_problemId: {
                        categoryId,
                        problemId
                    }
                }
            });
            // INVALIDATING THE CACHE FOR THE CATEGORY PROBLEMS
            const cachePattern = `category:${categoryId}:problems:*`;
            const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(cachePattern);
            if (keys.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
            }
            return {
                success: true
            };
        } catch (error) {
            console.error("Failed to remove problem from category:", error);
            return {
                success: false,
                error: "Failed to remove problem from category"
            };
        }
    }
    // CREATING A PROBLEM AND ADDING IT TO A CATEGORY
    static async createProblemAndAddToCategory(categoryId, data) {
        try {
            // GETTING THE CATEGORY TO GET ITS DOMAIN
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].category.findUnique({
                where: {
                    id: categoryId
                },
                select: {
                    domain: true,
                    slug: true
                }
            });
            if (!category) {
                return {
                    success: false,
                    error: "Category not found"
                };
            }
            // CREATING THE PROBLEM AS TYPE LEARN WITH CATEGORY DOMAIN
            const problem = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.create({
                data: {
                    title: data.title,
                    description: data.description,
                    difficulty: data.difficulty,
                    slug: data.slug,
                    score: data.difficulty === "CONCEPT" ? 0 : 10,
                    hidden: data.hidden,
                    hiddenQuery: data.hiddenQuery || null,
                    type: "LEARN",
                    domain: category.domain,
                    testCases: {
                        create: data.testCases?.map((tc)=>({
                                input: tc.input,
                                output: tc.output,
                                hidden: tc.hidden ?? false
                            })) || []
                    }
                }
            });
            // ADDING THE PROBLEM TO THE CATEGORY
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].categoryProblem.create({
                data: {
                    categoryId,
                    problemId: problem.id,
                    order: 0
                }
            });
            // INVALIDATING THE CACHE
            const cachePattern = `category:${categoryId}:problems:*`;
            const keys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(cachePattern);
            if (keys.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoryCacheKey(category.slug));
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(getCategoriesCacheKey(category.domain));
            // INVALIDATING PROBLEM CACHES
            const problemCachePattern = "problems:*";
            const problemKeys = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].keys(problemCachePattern);
            if (problemKeys.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...problemKeys);
            }
            return {
                success: true,
                problem
            };
        } catch (error) {
            console.error("Failed to create problem and add to category:", error);
            if (error.code === "P2002") {
                return {
                    success: false,
                    error: "Problem slug already exists"
                };
            }
            return {
                success: false,
                error: error.message || "Failed to create problem and add to category"
            };
        }
    }
}
}),
"[project]/actions/category.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4036f51ab12dc29ebcd7f1ebc4f2f7af023bf3de7d":"deleteCategory","403eb3bc9aea3dcf45bb95c52ceaca0a531010fb54":"getCategoryById","40f55327fde4a128f29652ecff550f2fd348fcafd7":"createCategory","602797f3c244652526241c2aa33fe584ee738b1840":"createProblemAndAddToCategory","607f577dab8934db5f4e4e7801195ec96d7d899a06":"updateCategory","60aa586633f1cbc2041b0193a93bb600920b2310e7":"removeProblemFromCategory","70fd3287efed50e9b085c32cb97bc74ed6789ab668":"addProblemToCategory","c0b43c719f7e1e3ac377eebe4b53d06321f3c9e766":"$$RSC_SERVER_CACHE_1","c0c0da63b143a88033965c404ada6f17691ee17fc4":"$$RSC_SERVER_CACHE_0","f8b1635aa638ffabff5018e245009271ec8a56ec23":"$$RSC_SERVER_CACHE_2"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "$$RSC_SERVER_CACHE_2",
    ()=>$$RSC_SERVER_CACHE_2,
    "addProblemToCategory",
    ()=>addProblemToCategory,
    "createCategory",
    ()=>createCategory,
    "createProblemAndAddToCategory",
    ()=>createProblemAndAddToCategory,
    "deleteCategory",
    ()=>deleteCategory,
    "getCategories",
    ()=>getCategories,
    "getCategory",
    ()=>getCategory,
    "getCategoryById",
    ()=>getCategoryById,
    "getCategoryProblems",
    ()=>getCategoryProblems,
    "removeProblemFromCategory",
    ()=>removeProblemFromCategory,
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/category.service.ts [app-rsc] (ecmascript)");
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
const $$RSC_SERVER_CACHE_0_INNER = async function getCategories(domain = "DSA") {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const userId = session?.user?.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`categories-${domain}${userId ? `-user-${userId}` : ''}`, 'categories-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].getCategories(domain, userId);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c0c0da63b143a88033965c404ada6f17691ee17fc4", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0c0da63b143a88033965c404ada6f17691ee17fc4", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getCategories"
});
var getCategories = $$RSC_SERVER_CACHE_0;
const $$RSC_SERVER_CACHE_1_INNER = async function getCategory(slug) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`category-${slug}`, 'categories-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].getCategoryBySlug(slug);
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getCategory() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0b43c719f7e1e3ac377eebe4b53d06321f3c9e766", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "c0b43c719f7e1e3ac377eebe4b53d06321f3c9e766", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getCategory"
});
var getCategory = $$RSC_SERVER_CACHE_1;
async function getCategoryById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].getCategoryById(id);
}
const $$RSC_SERVER_CACHE_2_INNER = async function getCategoryProblems(categoryId, page = 1, pageSize = 10, cursor) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 900,
        revalidate: 900
    }); // 15 minutes default
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const userId = session?.user?.id;
    const tagKey = `category-problems-${categoryId}${cursor ? `-cursor-${cursor}` : `-page-${page}`}${userId ? `-user-${userId}` : ''}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(tagKey, `category-${categoryId}`, 'categories-list');
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].getCategoryProblems(categoryId, page, pageSize, userId, cursor);
};
var $$RSC_SERVER_CACHE_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getCategoryProblems() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "f8b1635aa638ffabff5018e245009271ec8a56ec23", 0, $$RSC_SERVER_CACHE_2_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_2, "f8b1635aa638ffabff5018e245009271ec8a56ec23", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_2, "name", {
    value: "getCategoryProblems"
});
var getCategoryProblems = $$RSC_SERVER_CACHE_2;
async function createCategory(data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].createCategory(data);
    if (result.success) {
        // REVALIDATING THE PATHS
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/categories");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
    }
    return result;
}
async function updateCategory(id, data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].updateCategory(id, data);
    if (result.success) {
        // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/categories");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
        if (data.slug) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`category-${data.slug}`);
        }
    }
    return result;
}
async function deleteCategory(id) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].deleteCategory(id);
    if (result.success) {
        // REVALIDATING THE PATHS --> PROBLEMS AND ADMIN CATEGORIES
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/categories");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
        if (result.slug) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`category-${result.slug}`);
        }
    }
    return result;
}
async function addProblemToCategory(categoryId, problemId, order) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].addProblemToCategory(categoryId, problemId, order);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/dsa/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/sql/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`category-${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
    }
    return result;
}
async function removeProblemFromCategory(categoryId, problemId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].removeProblemFromCategory(categoryId, problemId);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/categories/${categoryId}`);
    }
    return result;
}
async function createProblemAndAddToCategory(categoryId, data) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryService"].createProblemAndAddToCategory(categoryId, data);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/dsa/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/sql/categories/${categoryId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dsa/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/sql/problems");
    }
    return result;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    addProblemToCategory,
    removeProblemFromCategory,
    createProblemAndAddToCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategoryById, "403eb3bc9aea3dcf45bb95c52ceaca0a531010fb54", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "40f55327fde4a128f29652ecff550f2fd348fcafd7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "607f577dab8934db5f4e4e7801195ec96d7d899a06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "4036f51ab12dc29ebcd7f1ebc4f2f7af023bf3de7d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addProblemToCategory, "70fd3287efed50e9b085c32cb97bc74ed6789ab668", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeProblemFromCategory, "60aa586633f1cbc2041b0193a93bb600920b2310e7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProblemAndAddToCategory, "602797f3c244652526241c2aa33fe584ee738b1840", null);
}),
"[project]/.next-internal/server/app/(main)/admin/dsa/categories/[id]/edit/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/category.action.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(main)/admin/dsa/categories/[id]/edit/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "403eb3bc9aea3dcf45bb95c52ceaca0a531010fb54",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryById"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "607f577dab8934db5f4e4e7801195ec96d7d899a06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "80b7c88da10d3a194c1170a71124e07c2947bd3a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserScore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$admin$2f$dsa$2f$categories$2f5b$id$5d2f$edit$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/admin/dsa/categories/[id]/edit/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/user.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/category.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/category.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fb6b9877._.js.map