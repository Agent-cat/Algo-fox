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
"[project]/components/workspace/CodeEditor.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/workspace/CodeEditor.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/workspace/CodeEditor.tsx <module evaluation>", "default");
}),
"[project]/components/workspace/CodeEditor.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/workspace/CodeEditor.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/workspace/CodeEditor.tsx", "default");
}),
"[project]/components/workspace/CodeEditor.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/workspace/CodeEditor.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/workspace/CodeEditor.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"c0e480813910f7d5fb3c4f803050573a64bd815288":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "default",
    ()=>SubmissionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/submission.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-rsc] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-rsc] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-rsc] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-rsc] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-rsc] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/CodeEditor.tsx [app-rsc] (ecmascript)");
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
const $$RSC_SERVER_CACHE_0_INNER = async function SubmissionContent({ params }) {
    const { id } = await params;
    const submission = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSubmission"])(id);
    if (!submission) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const { status, time, memory, createdAt, language, problem, code, testCases } = submission;
    const getStatusColor = (status)=>{
        switch(status){
            case 'ACCEPTED':
                return 'text-green-500';
            case 'WRONG_ANSWER':
                return 'text-red-500';
            case 'TIME_LIMIT_EXCEEDED':
                return 'text-orange-500';
            case 'MEMORY_LIMIT_EXCEEDED':
                return 'text-purple-500';
            default:
                return 'text-gray-500';
        }
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case 'ACCEPTED':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-12 h-12"
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 35,
                    columnNumber: 37
                }, this);
            case 'WRONG_ANSWER':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "w-12 h-12"
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 36,
                    columnNumber: 41
                }, this);
            case 'TIME_LIMIT_EXCEEDED':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-12 h-12"
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 37,
                    columnNumber: 48
                }, this);
            case 'MEMORY_LIMIT_EXCEEDED':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                    className: "w-12 h-12"
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 38,
                    columnNumber: 50
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "w-12 h-12"
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 39,
                    columnNumber: 29
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white dark:bg-[#050505] py-8 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1400px] mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-gray-100 dark:border-[#1a1a1a] pb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/problems/${problem.slug}`,
                                className: "group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4 group-hover:-translate-x-1 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium uppercase tracking-widest",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                lineNumber: 49,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-6 w-[1px] bg-gray-200 dark:bg-[#1a1a1a]"
                            }, void 0, false, {
                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-black text-gray-900 dark:text-white zf uppercase ",
                                        children: problem.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 58,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-gray-400 font-mono mt-0.5 tracking-tighter uppercase",
                                        children: [
                                            "Submission Reference: ",
                                            id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                lineNumber: 57,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/submissions/[id]/page.tsx",
                        lineNumber: 48,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 47,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-8 space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-container relative bg-white/5 dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl shadow-black/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                                        className: "w-3.5 h-3.5 text-orange-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 37
                                                    }, this),
                                                    "Source Code"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-none border border-orange-500/20 uppercase tracking-widest",
                                                    children: language.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[600px] lg:h-[calc(100vh-300px)] w-full antialiased font-mono",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            value: code,
                                            languageId: language.id,
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 80,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                lineNumber: 67,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/submissions/[id]/page.tsx",
                            lineNumber: 66,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-4 space-y-2 lg:sticky lg:top-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center text-center py-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `mb-4 ${getStatusColor(status).replace('text-', 'text- opacity-80 ')} animate-pulse`,
                                            children: getStatusIcon(status)
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: `text-4xl font-black uppercase tracking-tighter italic ${getStatusColor(status)} line-height-1`,
                                            children: status.replace(/_/g, " ")
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold text-gray-400 dark:text-gray-600 mt-2 uppercase tracking-[0.3em]",
                                            children: "Status Result"
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[1px] bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent w-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/5 rounded-xl dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 p-8 rounded-none shadow-xl shadow-black/5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4",
                                            children: "Metrics Detail"
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-x-8 gap-y-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 112,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[9px] font-black uppercase tracking-widest",
                                                                    children: "Runtime"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 113,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter",
                                                            children: time ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    time,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs ml-1 font-medium text-gray-400",
                                                                        children: "ms"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                        lineNumber: 116,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 dark:text-gray-800",
                                                                children: "--"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 129
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[9px] font-black uppercase tracking-widest",
                                                                    children: "Memory"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 122,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter",
                                                            children: memory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    memory,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs ml-1 font-medium text-gray-400",
                                                                        children: "KB"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                        lineNumber: 125,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 dark:text-gray-800",
                                                                children: "--"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 133
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-10 pt-6 border-t  border-gray-50 dark:border-white/5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] font-black text-gray-400 uppercase tracking-widest",
                                                            children: "Submitted"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] font-bold text-gray-900 dark:text-gray-300 uppercase tracking-tighter flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "w-3 h-3 text-orange-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 135,
                                                                    columnNumber: 45
                                                                }, this),
                                                                new Date(createdAt).toLocaleString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/submissions/[id]/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                testCases.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/5 rounded-xl dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-none shadow-xl shadow-black/5 overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]",
                                                    children: "Test Scenarios"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-black text-green-500",
                                                            children: testCases.filter((t)=>t.status === 'ACCEPTED').length
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-black text-gray-300 italic",
                                                            children: "PASS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "divide-y divide-gray-100 dark:divide-white/5 max-h-[300px] overflow-y-auto custom-scrollbar",
                                            children: testCases.map((tc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-6 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-1 h-4 rounded-none ${tc.status === 'ACCEPTED' ? 'bg-green-500' : 'bg-red-500'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest",
                                                                    children: [
                                                                        "Case ",
                                                                        tc.index + 1
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[9px] font-black uppercase tracking-[0.1em] ${tc.status === 'ACCEPTED' ? 'text-green-500' : 'text-red-500'}`,
                                                            children: tc.status === 'ACCEPTED' ? 'OK' : 'FAIL'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, tc.id, true, {
                                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/submissions/[id]/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/submissions/[id]/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/submissions/[id]/page.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/submissions/[id]/page.tsx",
                    lineNumber: 64,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/submissions/[id]/page.tsx",
            lineNumber: 45,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/submissions/[id]/page.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function SubmissionContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("private", "c0e480813910f7d5fb3c4f803050573a64bd815288", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0e480813910f7d5fb3c4f803050573a64bd815288", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "SubmissionContent"
});
var SubmissionContent = $$RSC_SERVER_CACHE_0;
function SubmissionPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen pt-24 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/app/submissions/[id]/page.tsx",
                lineNumber: 181,
                columnNumber: 17
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/submissions/[id]/page.tsx",
            lineNumber: 180,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionContent, {
            params: params
        }, void 0, false, {
            fileName: "[project]/app/submissions/[id]/page.tsx",
            lineNumber: 184,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/submissions/[id]/page.tsx",
        lineNumber: 179,
        columnNumber: 9
    }, this);
}
}),
"[project]/.next-internal/server/app/submissions/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/submission.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$submissions$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/submission.action.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/submissions/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/submission.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00424ba432501922f40bb512e30bdbd7d1847d3c3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkSessionConflict"],
    "40a37009f3d89fa942e11725f8853c3d127638cb39",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markConceptAsCompleted"],
    "40acca00133b06cb19d5be722d10fe520a25103a8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSessionConflict"],
    "40f3732208c79da0b2b65a5118279fb4de68977ef7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSubmission"],
    "c0e480813910f7d5fb3c4f803050573a64bd815288",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$submissions$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "c0f6768c60a2a7ca7ca0e72e9a870514874cb5a6d4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"],
    "f01eedd733ad152101ce62211207b02999e4266a89",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_1"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$submissions$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$submissions$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/submissions/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/submission.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$submissions$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/submissions/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$submission$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/submission.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c69d95b9._.js.map