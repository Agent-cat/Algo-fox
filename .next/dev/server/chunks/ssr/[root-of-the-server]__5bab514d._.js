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
"[project]/.next-internal/server/app/my-assignments/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/assignment.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/assignment.ts [app-rsc] (ecmascript)");
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
"[project]/.next-internal/server/app/my-assignments/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/assignment.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "402d498415f6e7ce5e7b14101bd742a174c034fe89",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshClassroomAssignments"],
    "40633f0898d1f332fe16478be0d6f967b6ba4e7381",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAssignment"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "40e471d809bf7114dcf724015755368fdab0ef103b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAssignmentDetails"],
    "604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAssignment"],
    "6091a52b809a6452039e9aff921f36e5551e76d7f8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAssignmentProgress"],
    "60bed825b9a6fa3bbf4a6def13537d7d61c2fa396a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentAssignments"],
    "70b22c8ab63d11fc3b25b267ea271300db7487dcaa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassroomAssignments"],
    "78073ece8699c8e6f210ef2e8915c5f3d914d87a4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTeacherAssignmentAnalytics"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$my$2d$assignments$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/my-assignments/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/assignment.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$assignment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/assignment.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5bab514d._.js.map