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
"[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/workspace/WorkspaceClientWrapper.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/workspace/WorkspaceClientWrapper.tsx <module evaluation>", "default");
}),
"[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/workspace/WorkspaceClientWrapper.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/workspace/WorkspaceClientWrapper.tsx", "default");
}),
"[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceClientWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceClientWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceClientWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/problems/ConceptViewer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/problems/ConceptViewer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/problems/ConceptViewer.tsx <module evaluation>", "default");
}),
"[project]/components/problems/ConceptViewer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/problems/ConceptViewer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/problems/ConceptViewer.tsx", "default");
}),
"[project]/components/problems/ConceptViewer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ConceptViewer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/problems/ConceptViewer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ConceptViewer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/problems/ConceptViewer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ConceptViewer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"c022638cd1b7725d97d4bfa30584aaa4676ba6a139":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "default",
    ()=>ProblemPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/problems.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceClientWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/WorkspaceClientWrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$laptop$2d$minimal$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Laptop2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/laptop-minimal.js [app-rsc] (ecmascript) <export default as Laptop2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ConceptViewer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/ConceptViewer.tsx [app-rsc] (ecmascript)");
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
async function generateMetadata({ params }) {
    const { slug } = await params;
    const problem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblem"])(slug);
    if (!problem) {
        return {
            title: "Problem Not Found"
        };
    }
    return {
        title: `${problem.title} | Algofox`,
        description: problem.description.slice(0, 160)
    };
}
// Component that handles searchParams AND params access (wrapped in Suspense)
const $$RSC_SERVER_CACHE_0_INNER = async function ProblemContentWithParams({ params, searchParams }) {
    const { slug } = await params;
    const { contestId } = await searchParams;
    const problem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblem"])(slug);
    if (!problem) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    let isSolved = false;
    let contestData = null;
    let solvedProblemIds = [];
    if (session?.user) {
        if (contestId) {
            const contestResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestDetail"])(contestId);
            if (contestResponse.success) {
                if (contestResponse.contest.isFinished) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/contest/${contestId}`);
                }
                contestData = contestResponse.contest;
                // Contextual Check: Is this problem solved IN THIS SPECIFIC CONTEST?
                if (session.user.role === "ADMIN") {
                    isSolved = true;
                } else {
                    const contestSubmission = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findFirst({
                        where: {
                            problemId: problem.id,
                            userId: session.user.id,
                            status: "ACCEPTED",
                            mode: "SUBMIT",
                            contestId: contestId
                        }
                    });
                    isSolved = !!contestSubmission;
                }
                // Fetch all solved problems in this contest for the user
                const contestSolvedSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                    where: {
                        userId: session.user.id,
                        status: "ACCEPTED",
                        mode: "SUBMIT",
                        contestId: contestId,
                        problemId: {
                            in: contestResponse.contest.problems.map((p)=>p.problem.id)
                        }
                    },
                    select: {
                        problemId: true
                    }
                });
                solvedProblemIds = contestSolvedSubmissions.map((s)=>s.problemId);
            } else {
                // Fallback if contest not found
                if (session.user.role === "ADMIN") {
                    isSolved = true;
                } else {
                    const submission = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findFirst({
                        where: {
                            problemId: problem.id,
                            userId: session.user.id,
                            status: "ACCEPTED",
                            mode: "SUBMIT"
                        }
                    });
                    isSolved = !!submission;
                }
            }
        } else {
            // Global Check (Not in a contest context)
            if (session.user.role === "ADMIN") {
                isSolved = true;
            } else {
                const submission = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findFirst({
                    where: {
                        problemId: problem.id,
                        userId: session.user.id,
                        status: "ACCEPTED",
                        mode: "SUBMIT"
                    }
                });
                isSolved = !!submission;
            }
            // Fetch all solved problems for the user (Global)
            const allSolved = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
                where: {
                    userId: session.user.id,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: {
                    problemId: true
                },
                distinct: [
                    'problemId'
                ]
            });
            solvedProblemIds = allSolved.map((s)=>s.problemId);
        }
    }
    if (problem.difficulty === "CONCEPT") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ConceptViewer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            problem: problem,
            isSolved: isSolved
        }, void 0, false, {
            fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-[#0a0a0a]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$laptop$2d$minimal$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Laptop2$3e$__["Laptop2"], {
                            className: "w-8 h-8 text-orange-600 dark:text-orange-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2",
                        children: "Desktop Required"
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 dark:text-gray-400 max-w-sm mx-auto",
                        children: "For the best coding experience, please open this problem on a desktop or laptop device."
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceClientWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    problem: problem,
                    isSolved: isSolved,
                    contestId: contestId,
                    contest: contestData,
                    solvedProblemIds: solvedProblemIds,
                    nextProblemSlug: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNextProblem"])(problem.createdAt, problem.domain, problem.type),
                    prevProblemSlug: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPreviousProblem"])(problem.createdAt, problem.domain, problem.type)
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function ProblemContentWithParams() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c022638cd1b7725d97d4bfa30584aaa4676ba6a139", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c022638cd1b7725d97d4bfa30584aaa4676ba6a139", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "ProblemContentWithParams"
});
var ProblemContentWithParams = $$RSC_SERVER_CACHE_0;
function ProblemPage({ params, searchParams }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600 dark:text-gray-400",
                        children: "Loading problem..."
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
            lineNumber: 182,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ProblemContentWithParams, {
            params: params,
            searchParams: searchParams
        }, void 0, false, {
            fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
            lineNumber: 189,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(workspace)/problems/[slug]/page.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
async function generateStaticParams() {
    try {
        const problems = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].problem.findMany({
            where: {
                hidden: false
            },
            select: {
                slug: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50
        });
        // Next.js 16 requires at least one result for Cache Components
        // If no problems exist, return a placeholder that will be handled by the dynamic route
        if (problems.length === 0) {
            return [
                {
                    slug: 'placeholder'
                }
            ];
        }
        return problems.map((p)=>({
                slug: p.slug
            }));
    } catch (error) {
        // Fallback to ensure we always return at least one result
        console.error("Error generating static params for problems:", error);
        return [
            {
                slug: 'placeholder'
            }
        ];
    }
}
}),
"[project]/lib/languages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LANGUAGE_ID",
    ()=>DEFAULT_LANGUAGE_ID,
    "LANGUAGES",
    ()=>LANGUAGES,
    "getLanguageById",
    ()=>getLanguageById,
    "getLanguageByName",
    ()=>getLanguageByName
]);
const LANGUAGES = [
    {
        id: 63,
        name: "JavaScript",
        monacoLanguage: "javascript",
        boilerplate: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);

// write your code here

console.log();`
    },
    {
        id: 62,
        name: "Java",
        monacoLanguage: "java",
        boilerplate: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // write your code here

        
    }
}`
    },
    {
        id: 71,
        name: "Python",
        monacoLanguage: "python",
        boilerplate: `import sys

data = sys.stdin.read().split()

# write your code here

print()`
    },
    {
        id: 50,
        name: "C",
        monacoLanguage: "c",
        boilerplate: `#include <stdio.h>

int main() {

    // write your code here

    return 0;
}`
    },
    {
        id: 54,
        name: "C++",
        monacoLanguage: "cpp",
        boilerplate: `#include <bits/stdc++.h>
using namespace std;

int main() {

    // write your code here

    return 0;
}`
    },
    {
        id: 73,
        name: "Rust",
        monacoLanguage: "rust",
        boilerplate: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    // write your code here
}`
    },
    {
        id: 60,
        name: "Go",
        monacoLanguage: "go",
        boilerplate: `package main

import (
    "bufio"
    "os"
)

func main() {
    in := bufio.NewReader(os.Stdin)

    // write your code here

}`
    },
    {
        id: 82,
        name: "SQL",
        monacoLanguage: "sql",
        boilerplate: `` // Empty boilerplate for SQL
    }
];
function getLanguageById(id) {
    return LANGUAGES.find((lang)=>lang.id === id);
}
function getLanguageByName(name) {
    return LANGUAGES.find((lang)=>lang.name === name);
}
const DEFAULT_LANGUAGE_ID = 63;
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
"[project]/core/services/submission.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionService",
    ()=>SubmissionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/languages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/points.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";
class SubmissionService {
    static languageCache = new Map();
    static async createSubmission(userId, problemId, judge0Id, code, mode = "SUBMIT", contestId) {
        // Get language info from our language mapping
        const langInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLanguageById"])(judge0Id);
        const languageName = langInfo?.name || `Language_${judge0Id}`;
        // Check cache first
        let language = this.languageCache.get(judge0Id);
        if (!language) {
            // Try to find existing language by judge0Id first (primary lookup)
            const dbLanguage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
                where: {
                    judge0Id: judge0Id
                }
            });
            if (dbLanguage) {
                language = dbLanguage;
            } else {
                // If not found, try to create it
                try {
                    language = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].language.create({
                        data: {
                            name: languageName,
                            judge0Id: judge0Id
                        }
                    });
                } catch (error) {
                    // If creation fails due to name conflict, try to find by name
                    // This handles the case where a language with this name exists but different judge0Id
                    if (error.code === 'P2002') {
                        const existingByName = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
                            where: {
                                name: languageName
                            }
                        });
                        if (existingByName) {
                            // Use the existing language even if judge0Id doesn't match
                            // In production, languages should be pre-seeded to avoid this
                            language = existingByName;
                        } else {
                            // If it's a judge0Id conflict, find by judge0Id
                            const existingByJudge0Id = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
                                where: {
                                    judge0Id: judge0Id
                                }
                            });
                            if (!existingByJudge0Id) {
                                throw new Error(`Could not create or find language with judge0Id ${judge0Id}`);
                            }
                            language = existingByJudge0Id;
                        }
                    } else {
                        throw error;
                    }
                }
            }
            // Update cache
            if (language) {
                this.languageCache.set(judge0Id, language);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.create({
            data: {
                userId,
                problemId,
                languageId: language.id,
                code,
                status: "PENDING",
                mode,
                contestId
            },
            include: {
                problem: {
                    include: {
                        testCases: true
                    }
                },
                language: true
            }
        });
    }
    static async updateSubmissionStatus(submissionId, status, time, memory) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.update({
            where: {
                id: submissionId
            },
            data: {
                status,
                time,
                memory
            }
        });
        try {
            // Only attempt invalidation, don't crash if it fails (e.g. in worker)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`submission-${submissionId}`, "max");
        } catch (error) {
        // Silently fail in worker context
        }
    }
    static async createTestCases(submissionId, testCases) {
        // Create DB records for tracking individual test case results
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(testCases.map((tc)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].testCase.create({
                data: {
                    submissionId,
                    index: tc.index,
                    judge0TrackingId: tc.judge0TrackingId,
                    status: "PENDING"
                }
            })));
    }
    static async updateTestCaseResult(judge0TrackingId, status, time, memory, errorMessage, stdout) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].testCase.update({
            where: {
                judge0TrackingId
            },
            data: {
                status,
                time,
                memory,
                errorMessage: errorMessage || null,
                stdout: stdout || null
            }
        });
    }
    static async updateTestCasesBatch(updates) {
        if (updates.length === 0) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(updates.map((update)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].testCase.update({
                where: {
                    judge0TrackingId: update.judge0TrackingId
                },
                data: {
                    status: update.status,
                    time: update.time,
                    memory: update.memory,
                    errorMessage: update.errorMessage || null,
                    stdout: update.stdout || null
                }
            })));
    }
    static async sendToJudge0(languageId, code, testCases) {
        // Determine Judge0 Language ID from our DB Language ID (assuming mapping exists or is direct)
        // For now assuming the passed languageId is the Judge0 ID.
        const encodedCode = Buffer.from(code).toString('base64');
        const submissions = testCases.map((tc)=>({
                language_id: languageId,
                source_code: encodedCode,
                stdin: Buffer.from(tc.input).toString('base64'),
                expected_output: Buffer.from(tc.output).toString('base64')
            }));
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 5000); // 5s timeout
        try {
            const response = await fetch(`${JUDGE0_URL}/submissions/batch?base64_encoded=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    submissions
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`Judge0 Error: ${response.statusText}`);
            }
            const data = await response.json();
            // data type: { token: string }[] (if params say so, but usually it returns tokens)
            return data;
        } catch (error) {
            console.error("Failed to send to Judge0", error);
            throw error;
        } finally{
            clearTimeout(timeoutId);
        }
    }
    static async getBatchResults(tokens) {
        if (tokens.length === 0) return [];
        const tokensStr = tokens.join(",");
        // Include compile_output, stderr for error messages, and stdout for user output
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 5000); // 5s timeout
        try {
            const response = await fetch(`${JUDGE0_URL}/submissions/batch?tokens=${tokensStr}&base64_encoded=true&fields=token,status,time,memory,compile_output,stderr,stdout`, {
                method: "GET",
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Judge0 Batch Fetch Failed: Status ${response.status}`, errorText);
                throw new Error(`Failed to fetch batch results: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            return data.submissions.map((sub)=>({
                    ...sub,
                    stdout: sub.stdout ? Buffer.from(sub.stdout, 'base64').toString('utf-8') : null,
                    stderr: sub.stderr ? Buffer.from(sub.stderr, 'base64').toString('utf-8') : null,
                    compile_output: sub.compile_output ? Buffer.from(sub.compile_output, 'base64').toString('utf-8') : null
                }));
        } catch (error) {
            throw error;
        } finally{
            clearTimeout(timeoutId);
        }
    }
    static async incrementProblemSolved(problemId, userId) {
        // Use a transaction to atomically check and update
        // This helps prevent race conditions when multiple submissions are processed concurrently
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Check if this is the first time the user has solved this problem
            // Only count SUBMIT mode submissions to avoid double-counting from RUN mode
            const acceptedCount = await tx.submission.count({
                where: {
                    problemId,
                    userId,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                }
            });
            // Only increment if this is the first accepted solution (count should be exactly 1, which is the current one)
            if (acceptedCount === 1) {
                // Fetch the problem to get its difficulty
                const problem = await tx.problem.findUnique({
                    where: {
                        id: problemId
                    },
                    select: {
                        difficulty: true
                    }
                });
                if (!problem) {
                    throw new Error("Problem not found");
                }
                // Calculate points based on difficulty
                const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPointsForDifficulty"])(problem.difficulty);
                // Increment problem's solved count
                await tx.problem.update({
                    where: {
                        id: problemId
                    },
                    data: {
                        solved: {
                            increment: 1
                        }
                    }
                });
                // Increment user's problemsSolved count and add points based on difficulty
                // SKIP IF CONCEPT
                if (problem.difficulty !== "CONCEPT") {
                    await tx.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            problemsSolved: {
                                increment: 1
                            },
                            totalScore: {
                                increment: points
                            }
                        }
                    });
                }
                // Invalidate user score cache and leaderboard cache
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(`user-score-${userId}`);
                    // Invalidate leaderboard cache so new users appear
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del('leaderboard:global');
                    // Invalidate Next.js cache tags for categories
                    try {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`categories-DSA-user-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`categories-SQL-user-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(`user-submissions-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-list');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])('problems-search');
                    } catch (e) {
                    // Ignore if updateTag is not available or fails
                    }
                } catch (error) {
                    // Cache invalidation might fail in worker context, but that's okay
                    // The cache will expire naturally after 30 seconds (user score) and 10 minutes (leaderboard)
                    console.error("Failed to invalidate cache:", error);
                }
            }
        });
    }
    static async getSubmissionById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findUnique({
            where: {
                id
            },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        difficulty: true
                    }
                },
                language: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                testCases: {
                    orderBy: {
                        index: 'asc'
                    }
                }
            }
        });
    }
    static async getProblemSubmissions(problemId, userId, take = 20, cursor) {
        const query = {
            where: {
                problemId,
                userId,
                mode: "SUBMIT" // Only show actual submissions, not runs
            },
            include: {
                language: {
                    select: {
                        name: true
                    }
                }
            },
            take,
            orderBy: {
                createdAt: 'desc'
            }
        };
        if (cursor) {
            query.cursor = {
                id: cursor
            };
            query.skip = 1;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany(query);
    }
    static async invalidateClassroomTracking(userId) {
        try {
            // Find all classrooms the user is enrolled in where tracking is active
            const classrooms = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].classroom.findMany({
                where: {
                    students: {
                        some: {
                            id: userId
                        }
                    },
                    isTrackingActive: true
                },
                select: {
                    id: true
                }
            });
            if (classrooms.length > 0) {
                // Invalidate live tracking cache for each classroom
                const keys = classrooms.map((c)=>`algofox:live-tracking:${c.id}`);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].del(...keys);
                // Also invalidate Next.js cache tags for good measure
                classrooms.forEach((c)=>{
                    // Since we are in a service/worker context, revalidateTag might be tricky if not in a server action/request
                    // But we can try just in case this service is called from a server action
                    try {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`classroom-${c.id}`, "max");
                    } catch (e) {
                    // Ignore error if outside request context
                    }
                });
            }
        } catch (error) {
            console.error("Failed to invalidate classroom tracking cache:", error);
        }
    }
}
}),
"[project]/actions/submission.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a37009f3d89fa942e11725f8853c3d127638cb39":"markConceptAsCompleted","40f3732208c79da0b2b65a5118279fb4de68977ef7":"getSubmission","c0f6768c60a2a7ca7ca0e72e9a870514874cb5a6d4":"$$RSC_SERVER_CACHE_0","f01eedd733ad152101ce62211207b02999e4266a89":"$$RSC_SERVER_CACHE_1"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "getProblemSubmissionsAction",
    ()=>getProblemSubmissionsAction,
    "getSubmission",
    ()=>getSubmission,
    "markConceptAsCompleted",
    ()=>markConceptAsCompleted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/submission.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)"); // For background tasks
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
const $$RSC_SERVER_CACHE_0_INNER = async function getCachedSubmissionInternal(id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(`submission-${id}`);
    // @ts-ignore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])("default"); // or "submission" if defined
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SubmissionService"].getSubmissionById(id);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getCachedSubmissionInternal() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0f6768c60a2a7ca7ca0e72e9a870514874cb5a6d4", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0f6768c60a2a7ca7ca0e72e9a870514874cb5a6d4", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getCachedSubmissionInternal"
});
var getCachedSubmissionInternal = $$RSC_SERVER_CACHE_0;
async function getSubmission(id) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || !session.user) {
        return null;
    }
    const submission = await getCachedSubmissionInternal(id);
    // Security check
    if (submission && submission.userId !== session.user.id) {
        return null;
    }
    return submission;
}
const $$RSC_SERVER_CACHE_1_INNER = async function getProblemSubmissionsAction(problemId, take = 20, cursor) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheLife"])({
        stale: 60,
        revalidate: 60
    }); // 1 minute default, but we rely on on-demand revalidation ideally
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || !session.user) {
        return [];
    }
    const userId = session.user.id;
    const tagKey = `problem-submissions-${userId}-${problemId}${cursor ? `-cursor-${cursor}` : ""}-take-${take}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(tagKey, `user-submissions-${userId}`, `problem-${problemId}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SubmissionService"].getProblemSubmissions(problemId, userId, take, cursor);
};
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getProblemSubmissionsAction() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "f01eedd733ad152101ce62211207b02999e4266a89", 0, $$RSC_SERVER_CACHE_1_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "f01eedd733ad152101ce62211207b02999e4266a89", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getProblemSubmissionsAction"
});
var getProblemSubmissionsAction = $$RSC_SERVER_CACHE_1;
async function markConceptAsCompleted(problemId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    const userId = session.user.id;
    // Use a default language (e.g., JavaScript ID 63) for concept submissions since language doesn't matter
    const DEFAULT_CONCEPT_LANG_ID = 63;
    try {
        // Create a submission with ACCEPTED status
        const submission = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SubmissionService"].createSubmission(userId, problemId, DEFAULT_CONCEPT_LANG_ID, "// CONCEPT COMPLETED", "SUBMIT");
        // Update status to ACCEPTED
        await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SubmissionService"].updateSubmissionStatus(submission.id, "ACCEPTED", 0, 0);
        // Move heavy stats updates to background
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["after"])(async ()=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SubmissionService"].incrementProblemSolved(problemId, userId);
            // Revalidating paths/tags inside after() ensures the next request is fresh,
            // but current UI might need revalidatePath synchronous if it relies on server reload.
            // However, separating side-effects is key.
            // Using revalidateTag inside after works for ISR.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`problem-${problemId}`, "max");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`user-submissions-${userId}`, "max");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`problem-submissions-${userId}-${problemId}`, "max");
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/dsa");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/problems/sql");
        // These might fail in standard runtime if cache tags aren't updated synchronously?
        // Actually, revalidating path is enough for UI. Tags are for cached data.
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to mark concept as completed:", error);
        return {
            success: false,
            error: "Failed to mark as completed"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSubmission,
    markConceptAsCompleted
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSubmission, "40f3732208c79da0b2b65a5118279fb4de68977ef7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markConceptAsCompleted, "40a37009f3d89fa942e11725f8853c3d127638cb39", null);
}),
"[project]/actions/discussion.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6044ed3755352d7fd254632d39462abd6795a1aba3":"getProblemComments","60af00e80ae9125d962d6768a3c5e918095efad8c2":"pinComment","60b9c01d983b07f0a2a8b264f93f4f77235a94ded3":"deleteComment","707d926e4a11493fbc786e4dafc801cd9fea5119a5":"voteComment","708aa5eaf1ed268262e98ff2f597d9df9f5c649439":"postComment"},"",""] */ __turbopack_context__.s([
    "deleteComment",
    ()=>deleteComment,
    "getProblemComments",
    ()=>getProblemComments,
    "pinComment",
    ()=>pinComment,
    "postComment",
    ()=>postComment,
    "voteComment",
    ()=>voteComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getProblemComments(problemId, currentUserId) {
    const fetchComments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cache"])(async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.findMany({
            where: {
                problemId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true
                    }
                },
                votes: true // Fetch votes to calculate userVote manually if needed, or use separate query
            },
            orderBy: [
                {
                    isPinned: "desc"
                },
                {
                    upvoteCount: "desc"
                },
                {
                    createdAt: "desc"
                }
            ]
        });
    }, [
        `problem-comments-${problemId}`
    ], {
        tags: [
            `comments-${problemId}`
        ]
    } // Cache tag for invalidation
    );
    const rawComments = await fetchComments();
    // Process comments to add userVote status and organize into tree
    const commentsWithVoteState = rawComments.map((comment)=>{
        let userVote = null;
        if (currentUserId) {
            const vote = comment.votes.find((v)=>v.userId === currentUserId);
            if (vote) userVote = vote.type;
        }
        // Remove votes array from result to reduce payload
        const { votes: _, ...rest } = comment;
        return {
            ...rest,
            userVote
        };
    });
    // Build Tree Structure
    const commentMap = new Map();
    const rootComments = [];
    // Initialize map
    commentsWithVoteState.forEach((comment)=>{
        commentMap.set(comment.id, {
            ...comment,
            replies: []
        });
    });
    // Link children to parents
    commentsWithVoteState.forEach((comment)=>{
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies.push(commentMap.get(comment.id));
            }
        } else {
            rootComments.push(commentMap.get(comment.id));
        }
    });
    return rootComments;
}
async function postComment(problemId, content, parentId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const newComment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.create({
            data: {
                content,
                problemId,
                userId: session.user.id,
                parentId: parentId || null
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true
                    }
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`comments-${problemId}`, "max");
        // Return the formatted comment to allow optimistic updates on client
        return {
            success: true,
            comment: {
                ...newComment,
                votes: [],
                userVote: null,
                replies: []
            }
        };
    } catch (error) {
        console.error("Failed to post comment:", error);
        return {
            success: false,
            error: "Failed to post comment"
        };
    }
}
async function voteComment(commentId, problemId, type) {
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
    try {
        // Check existing vote
        const existingVote = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].commentVote.findUnique({
            where: {
                userId_commentId: {
                    userId,
                    commentId
                }
            }
        });
        // Use transaction to update vote and count atomically
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            if (existingVote) {
                if (existingVote.type === type) {
                    // Remove vote (toggle off)
                    await tx.commentVote.delete({
                        where: {
                            id: existingVote.id
                        }
                    });
                    // Update count (reverse the vote)
                    await tx.comment.update({
                        where: {
                            id: commentId
                        },
                        data: {
                            upvoteCount: {
                                decrement: type === "UP" ? 1 : -1 // wait, actually upvoteCount logic usually just counts upvotes - downvotes
                            }
                        }
                    });
                } else {
                    // Change vote
                    await tx.commentVote.update({
                        where: {
                            id: existingVote.id
                        },
                        data: {
                            type
                        }
                    });
                    // Update count (+2 or -2 because we are swinging from one side to other)
                    await tx.comment.update({
                        where: {
                            id: commentId
                        },
                        data: {
                            upvoteCount: {
                                increment: type === "UP" ? 2 : -2
                            }
                        }
                    });
                }
            } else {
                // New vote
                await tx.commentVote.create({
                    data: {
                        userId,
                        commentId,
                        type
                    }
                });
                await tx.comment.update({
                    where: {
                        id: commentId
                    },
                    data: {
                        upvoteCount: {
                            increment: type === "UP" ? 1 : -1
                        }
                    }
                });
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`comments-${problemId}`, "max");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to vote:", error);
        return {
            success: false,
            error: "Failed to vote"
        };
    }
}
async function pinComment(commentId, problemId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user || session.user.role !== "ADMIN") {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        // Toggle pin status
        const comment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.findUnique({
            where: {
                id: commentId
            }
        });
        if (!comment) return {
            success: false,
            error: "Comment not found"
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.update({
            where: {
                id: commentId
            },
            data: {
                isPinned: !comment.isPinned
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`comments-${problemId}`, "max");
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to pin comment"
        };
    }
}
async function deleteComment(commentId, problemId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const comment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.findUnique({
            where: {
                id: commentId
            }
        });
        if (!comment) return {
            success: false,
            error: "Not found"
        };
        const canDelete = session.user.role === "ADMIN" || comment.userId === session.user.id;
        if (!canDelete) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].comment.delete({
            where: {
                id: commentId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(`comments-${problemId}`, "max");
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to delete"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProblemComments,
    postComment,
    voteComment,
    pinComment,
    deleteComment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProblemComments, "6044ed3755352d7fd254632d39462abd6795a1aba3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(postComment, "708aa5eaf1ed268262e98ff2f597d9df9f5c649439", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(voteComment, "707d926e4a11493fbc786e4dafc801cd9fea5119a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(pinComment, "60af00e80ae9125d962d6768a3c5e918095efad8c2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteComment, "60b9c01d983b07f0a2a8b264f93f4f77235a94ded3", null);
}),
"[project]/actions/analytics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a9b600f3728229fa40069be9f56b300034577fba":"getUserTopicStats","40bc546d0fb170edcb5da28c9705becdbcda2d73c2":"getUserProgressHistory","7047c436e22e056715bf68b1900859a27784c3ce69":"getProblemStats"},"",""] */ __turbopack_context__.s([
    "getProblemStats",
    ()=>getProblemStats,
    "getUserProgressHistory",
    ()=>getUserProgressHistory,
    "getUserTopicStats",
    ()=>getUserTopicStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getUserTopicStats(userId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return null;
    // Fetch all accepted submissions with problem tags
    const submissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
        where: {
            userId: targetUserId,
            status: "ACCEPTED"
        },
        include: {
            problem: {
                include: {
                    tags: true
                }
            }
        }
    });
    // Aggregate by tag
    const tagCounts = {};
    const totalSolved = submissions.length;
    submissions.forEach((sub)=>{
        sub.problem.tags.forEach((tag)=>{
            tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
        });
    });
    // Convert to array and take top 6
    const data = Object.entries(tagCounts).map(([subject, count])=>({
            subject,
            A: count,
            fullMark: Math.max(count * 1.5, 10)
        })).sort((a, b)=>b.A - a.A).slice(0, 6); // Top 6 tags
    return data;
}
async function getUserProgressHistory(userId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return null;
    const submissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.findMany({
        where: {
            userId: targetUserId,
            status: "ACCEPTED"
        },
        orderBy: {
            createdAt: "asc"
        },
        select: {
            createdAt: true
        }
    });
    // Group by date (cumulative)
    const history = [];
    let cumulative = 0;
    const map = new Map();
    submissions.forEach((sub)=>{
        const date = sub.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
        map.set(date, (map.get(date) || 0) + 1);
    });
    // Create cumulative data points
    // We can just pick every accepted submission as a point, or group by day
    // Grouping by day is cleaner
    const sortedDates = Array.from(map.keys()).sort();
    for (const date of sortedDates){
        const dailyCount = map.get(date) || 0;
        cumulative += dailyCount;
        history.push({
            date: new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            }),
            count: cumulative
        });
    }
    // Return last 30 data points to avoid clutter, or sample them if huge
    return history.slice(-30);
}
async function getProblemStats(problemId, runtime, memory) {
    const totalSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.count({
        where: {
            problemId,
            status: "ACCEPTED"
        }
    });
    if (totalSubmissions <= 1) return {
        runtimePercentile: 100,
        memoryPercentile: 100
    };
    // Runtime Percentile (Higher is better)
    const slowerSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.count({
        where: {
            problemId,
            status: "ACCEPTED",
            time: {
                gt: runtime
            }
        }
    });
    // Memory Percentile (Higher is better)
    const heavierSubmissions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].submission.count({
        where: {
            problemId,
            status: "ACCEPTED",
            memory: {
                gt: memory
            }
        }
    });
    const runtimePercentile = Math.round(slowerSubmissions / totalSubmissions * 100);
    const memoryPercentile = Math.round(heavierSubmissions / totalSubmissions * 100);
    return {
        runtimePercentile,
        memoryPercentile
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUserTopicStats,
    getUserProgressHistory,
    getProblemStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserTopicStats, "40a9b600f3728229fa40069be9f56b300034577fba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserProgressHistory, "40bc546d0fb170edcb5da28c9705becdbcda2d73c2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProblemStats, "7047c436e22e056715bf68b1900859a27784c3ce69", null);
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
"[project]/.next-internal/server/app/(workspace)/problems/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/problems.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/submission.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/discussion.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/analytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$problems$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/problems.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/submission.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/discussion.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/category.action.ts [app-rsc] (ecmascript)");
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
"[project]/.next-internal/server/app/(workspace)/problems/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/problems.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/submission.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/discussion.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/analytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/user.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "00eefbb253a85123f8c3c600ca19869a5101d8c0d1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVisibleContests"],
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
    "40a37009f3d89fa942e11725f8853c3d127638cb39",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markConceptAsCompleted"],
    "40a47fbc0ae4e927cabd5fae0ee2325db6de07014c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalizeContest"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finishContestAction"],
    "40d9f7e192f4cde9508f832f98d501a5d2bac3b26b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProblem"],
    "40dd2241aa639228d5754da39ff0b8d10a59d75bff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProblem"],
    "40edfea29c94aa36a1a52aa93c92827398e407c1c2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestRanking"],
    "40f3732208c79da0b2b65a5118279fb4de68977ef7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSubmission"],
    "40f7fe5a39b9ff511e9db90ca5a169ae86d7660b65",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSubmissionEligibility"],
    "40fcf50c7b1ee991289ef809f621af905c86ec6963",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestParticipants"],
    "602cf4435ac48b07adb33a52140ca1f4538d93b7d6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateContestSession"],
    "6044ed3755352d7fd254632d39462abd6795a1aba3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblemComments"],
    "604a0bcc1451e81e233f48280ac746b33b2aa18f12",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyContestPassword"],
    "607d884db8652712b1888554802e08210ff48e297a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getParticipantViolations"],
    "6094ec6e5c7d68eabf2ee86ceb1e87755d9fd33b01",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProblem"],
    "60995be1625901022cd2485061fb5f529d27001da0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unblockParticipant"],
    "60ab32f1cc26748b4afce6a433ca3e6dc394836698",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startContestSession"],
    "60af00e80ae9125d962d6768a3c5e918095efad8c2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pinComment"],
    "60b9c01d983b07f0a2a8b264f93f4f77235a94ded3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteComment"],
    "60ee1ae949348cbb95c6ff1624db0e0167a061c945",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRandomProblem"],
    "7047c436e22e056715bf68b1900859a27784c3ce69",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblemStats"],
    "707d926e4a11493fbc786e4dafc801cd9fea5119a5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["voteComment"],
    "708aa5eaf1ed268262e98ff2f597d9df9f5c649439",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["postComment"],
    "78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logContestViolation"],
    "803cf50d552ccc152ed46f078e0fb03c1767a05eb9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "80b7c88da10d3a194c1170a71124e07c2947bd3a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserScore"],
    "c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"],
    "c01897e0e33720eec5643ef69ddae234356fd82300",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_3"],
    "c022638cd1b7725d97d4bfa30584aaa4676ba6a139",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$problems$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "c05c8fadea7603e1a1f64c8b4dcbe007d8d4fb2c3a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_4"],
    "c08c3a89f87d0fda2e2465be36519f53224c7bbfb3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_2"],
    "c0c61a0961c7e53f3af018ebf0d1ccd5c094778117",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "f01f5ef9ed6223b56ddc1153abce0acfbc57475009",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchProblems"],
    "f043464bd06d6501259988d6e64f4460c054895b9b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblemSubmissionsAction"],
    "f0b5bb641795686f7cca1e438a6e0566d735ffcd4e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_2"],
    "f0e393a839ccab97fcb8522876156c6ba741ba3074",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_6"],
    "f0eb7ece396ebe935b968e8abfe06e00d6920108af",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_5"],
    "f83292b4960e88e737718c29cfe55ecaedb6ed3165",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryProblems"],
    "fc03c238e4639461fed11dd40d3ecd9287bcb20773",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"],
    "ff85edbb114d3f01c639e45db77828c9d874750fd9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "ffb6064b0a0a619152cef9d1130640ca662759362c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProblems"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$workspace$292f$problems$2f5b$slug$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f28$workspace$292f$problems$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE8__$3d3e$__$225b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(workspace)/problems/[slug]/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/problems.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/contest.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/submission.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/actions/discussion.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/actions/analytics.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/actions/user.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE8 => "[project]/actions/category.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$problems$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(workspace)/problems/[slug]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$problems$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/problems.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/submission.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$discussion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/discussion.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/category.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4c8d36e4._.js.map