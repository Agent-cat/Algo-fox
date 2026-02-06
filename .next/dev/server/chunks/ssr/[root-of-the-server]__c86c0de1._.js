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
"[project]/components/contest/ContestDetails.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/contest/ContestDetails.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/contest/ContestDetails.tsx <module evaluation>", "default");
}),
"[project]/components/contest/ContestDetails.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/contest/ContestDetails.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/contest/ContestDetails.tsx", "default");
}),
"[project]/components/contest/ContestDetails.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestDetails$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/contest/ContestDetails.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestDetails$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/contest/ContestDetails.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestDetails$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/BackButton.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/BackButton.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/BackButton.tsx <module evaluation>", "default");
}),
"[project]/components/BackButton.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/BackButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/BackButton.tsx", "default");
}),
"[project]/components/BackButton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/BackButton.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/BackButton.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"c09f4ce10ded3e048806b8cd0760a73ac35e9a70dd":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "default",
    ()=>ContestDetailPage
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestDetails$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/contest/ContestDetails.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BackButton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
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
const $$RSC_SERVER_CACHE_0_INNER = async function ContestDetailContent({ params }) {
    const { id } = await params;
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session?.user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/signin");
    }
    const userRole = session.user.role;
    const allowedRoles = [
        "ADMIN",
        "INSTITUTION_MANAGER",
        "CONTEST_MANAGER",
        "TEACHER"
    ];
    const isAdminOrInstructor = allowedRoles.includes(userRole);
    const backLink = isAdminOrInstructor ? "/dashboard/contests" : "/contests";
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContestDetail"])(id);
    if (!res.success) {
        if (res.error === "Contest not found") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto py-20 px-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2",
                    children: "Access Denied"
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-8",
                    children: res.error
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: backLink,
                    className: "text-orange-600 font-bold hover:underline",
                    children: "Back to Contests"
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto py-10 px-4 min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BackButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    children: isAdminOrInstructor ? "All Arenas" : "Back to Contests"
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestDetails$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                contest: res.contest,
                user: session.user
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function ContestDetailContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c09f4ce10ded3e048806b8cd0760a73ac35e9a70dd", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c09f4ce10ded3e048806b8cd0760a73ac35e9a70dd", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "ContestDetailContent"
});
var ContestDetailContent = $$RSC_SERVER_CACHE_0;
function ContestDetailPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto py-20 px-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Loading contest details..."
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
            lineNumber: 70,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ContestDetailContent, {
            params: params
        }, void 0, false, {
            fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
            lineNumber: 75,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(workspace)/contest/[id]/page.tsx",
        lineNumber: 69,
        columnNumber: 9
    }, this);
}
}),
"[project]/.next-internal/server/app/(workspace)/contest/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$contest$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
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
"[project]/.next-internal/server/app/(workspace)/contest/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/contest.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
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
    "c00d8131bc66d78bc8131eec8f6d3c30fe0c4f51bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"],
    "c08c3a89f87d0fda2e2465be36519f53224c7bbfb3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_2"],
    "c09f4ce10ded3e048806b8cd0760a73ac35e9a70dd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$contest$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$workspace$292f$contest$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f28$workspace$292f$contest$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(workspace)/contest/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/contest.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$contest$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(workspace)/contest/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$contest$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/contest.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c86c0de1._.js.map