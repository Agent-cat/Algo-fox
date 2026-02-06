module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

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
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[project]/lib/redis.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ioredis/built/index.js [instrumentation] (ecmascript)");
;
const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"]({
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
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/languages.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/points.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/core/services/submission.service.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionService",
    ()=>SubmissionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/languages.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/points.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [instrumentation] (ecmascript)");
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
        const langInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["getLanguageById"])(judge0Id);
        const languageName = langInfo?.name || `Language_${judge0Id}`;
        // Check cache first
        let language = this.languageCache.get(judge0Id);
        if (!language) {
            // Try to find existing language by judge0Id first (primary lookup)
            const dbLanguage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
                where: {
                    judge0Id: judge0Id
                }
            });
            if (dbLanguage) {
                language = dbLanguage;
            } else {
                // If not found, try to create it
                try {
                    language = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].language.create({
                        data: {
                            name: languageName,
                            judge0Id: judge0Id
                        }
                    });
                } catch (error) {
                    // If creation fails due to name conflict, try to find by name
                    // This handles the case where a language with this name exists but different judge0Id
                    if (error.code === 'P2002') {
                        const existingByName = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
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
                            const existingByJudge0Id = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].language.findUnique({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].submission.create({
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].submission.update({
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["revalidateTag"])(`submission-${submissionId}`, "max");
        } catch (error) {
        // Silently fail in worker context
        }
    }
    static async createTestCases(submissionId, testCases) {
        // Create DB records for tracking individual test case results
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].$transaction(testCases.map((tc)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].testCase.create({
                data: {
                    submissionId,
                    index: tc.index,
                    judge0TrackingId: tc.judge0TrackingId,
                    status: "PENDING"
                }
            })));
    }
    static async updateTestCaseResult(judge0TrackingId, status, time, memory, errorMessage, stdout) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].testCase.update({
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].$transaction(updates.map((update)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].testCase.update({
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
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
                const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["getPointsForDifficulty"])(problem.difficulty);
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
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].del(`user-score-${userId}`);
                    // Invalidate leaderboard cache so new users appear
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].del('leaderboard:global');
                    // Invalidate Next.js cache tags for categories
                    try {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])('categories-list');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])(`categories-DSA-user-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])(`categories-SQL-user-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])(`user-submissions-${userId}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])('problems-list');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["updateTag"])('problems-search');
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].submission.findUnique({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].submission.findMany(query);
    }
    static async invalidateClassroomTracking(userId) {
        try {
            // Find all classrooms the user is enrolled in where tracking is active
            const classrooms = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["prisma"].classroom.findMany({
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].del(...keys);
                // Also invalidate Next.js cache tags for good measure
                classrooms.forEach((c)=>{
                    // Since we are in a service/worker context, revalidateTag might be tricky if not in a server action/request
                    // But we can try just in case this service is called from a server action
                    try {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["revalidateTag"])(`classroom-${c.id}`, "max");
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
"[project]/core/queues/submission.queue.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSubmissionJob",
    ()=>addSubmissionJob,
    "submissionQueue",
    ()=>submissionQueue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bullmq$2f$dist$2f$esm$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/bullmq/dist/esm/index.js [instrumentation] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bullmq$2f$dist$2f$esm$2f$classes$2f$queue$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bullmq/dist/esm/classes/queue.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bullmq$2f$dist$2f$esm$2f$classes$2f$worker$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bullmq/dist/esm/classes/worker.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/services/submission.service.ts [instrumentation] (ecmascript)");
;
;
;
const QUEUE_NAME = "submission-queue";
const submissionQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bullmq$2f$dist$2f$esm$2f$classes$2f$queue$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["Queue"](QUEUE_NAME, {
    connection: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"]
});
const addSubmissionJob = async (submissionId)=>{
    await submissionQueue.add("process-submission", {
        submissionId
    });
};
// Worker Implementation
// Note: In Next.js (serverless), workers are tricky. Ideally, this runs in a separate process.
// For this 'demo' / 'integrated' setup, we might initialize it differently, but here we define it.
// If this file is imported in the API route, the worker might start multiple times in dev.
// We'll use a global check or just simple instantiation for now, assuming a long-running server or dedicated worker process.
const workerName = "submission-worker";
// Judge0 Status IDs
const JUDGE0_STATUS = {
    IN_QUEUE: 1,
    PROCESSING: 2,
    ACCEPTED: 3,
    WRONG_ANSWER: 4,
    TIME_LIMIT_EXCEEDED: 5,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR_SIGSEGV: 7,
    RUNTIME_ERROR_SIGXFSZ: 8,
    RUNTIME_ERROR_SIGFPE: 9,
    RUNTIME_ERROR_SIGABRT: 10,
    RUNTIME_ERROR_NZEC: 11,
    RUNTIME_ERROR_OTHER: 12,
    INTERNAL_ERROR: 13
};
const mapJudge0StatusToDb = (statusId)=>{
    if (statusId === JUDGE0_STATUS.ACCEPTED) return "ACCEPTED";
    if (statusId === JUDGE0_STATUS.WRONG_ANSWER) return "WRONG_ANSWER";
    if (statusId === JUDGE0_STATUS.TIME_LIMIT_EXCEEDED) return "TIME_LIMIT_EXCEEDED";
    if (statusId === JUDGE0_STATUS.COMPILATION_ERROR) return "COMPILE_ERROR";
    if (statusId >= 7 && statusId <= 12) return "RUNTIME_ERROR";
    return null; // Pending or Processing
};
const worker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bullmq$2f$dist$2f$esm$2f$classes$2f$worker$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["Worker"](QUEUE_NAME, async (job)=>{
    const { submissionId } = job.data;
    try {
        // 1. Fetch Submission Data
        // To avoid circular dep if we construct full object here, we might need a getter in service
        // For now, let's use the service to get it conceptually or direct prisma if needed.
        // But we have SubmissionService.
        const { prisma } = await __turbopack_context__.A("[project]/lib/prisma.ts [instrumentation] (ecmascript, async loader)"); // Lazy import to avoid init issues
        const submission = await prisma.submission.findUnique({
            where: {
                id: submissionId
            },
            include: {
                problem: {
                    include: {
                        testCases: true,
                        functionTemplates: true // Include function templates for DSA
                    }
                },
                language: true
            }
        });
        if (!submission) throw new Error("Submission not found");
        if (!submission.problem) throw new Error("Problem not found");
        const { code, language, problem, mode } = submission;
        const allTestCases = problem.testCases;
        // Filter test cases based on mode:
        // RUN mode: only public (non-hidden) test cases
        // SUBMIT mode: all test cases (public + hidden)
        let testCasesToEvaluate;
        if (mode === "RUN") {
            testCasesToEvaluate = allTestCases.filter((tc)=>!tc.hidden);
        } else {
            testCasesToEvaluate = allTestCases;
        }
        if (testCasesToEvaluate.length === 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].updateSubmissionStatus(submissionId, "ACCEPTED", 0, 0);
            return;
        }
        // Build the code to execute
        let codeToExecute = code;
        // For SQL problems, prepend hiddenQuery and convert to SQLite
        if (problem.domain === "SQL") {
            // Prepend hiddenQuery if exists
            if (problem.hiddenQuery) {
                codeToExecute = problem.hiddenQuery.trim() + "\n" + code;
            }
            // Convert SQL to SQLite-compatible syntax
            const { convertBatchToSQLite } = await __turbopack_context__.A("[project]/lib/sql-converter.ts [instrumentation] (ecmascript, async loader)");
            codeToExecute = convertBatchToSQLite(codeToExecute);
        } else if (problem.domain === "DSA" && problem.useFunctionTemplate && problem.functionTemplates?.length) {
            const template = problem.functionTemplates.find((t)=>t.languageId === language.judge0Id);
            if (template?.driverCode) {
                const langId = language.judge0Id;
                // Check if driver code uses placeholder for user code insertion
                if (template.driverCode.includes("{{USER_CODE}}")) {
                    // Replace placeholder with user's code
                    codeToExecute = template.driverCode.replace("{{USER_CODE}}", code);
                } else if (langId === 60 || langId === 73) {
                    codeToExecute = template.driverCode + "\n\n" + code;
                } else if (langId === 63 || langId === 71) {
                    codeToExecute = code + "\n\n" + template.driverCode;
                } else if (langId === 62 || langId === 50 || langId === 54) {
                    // For structured languages, assume user code goes inside class/before main
                    // If no placeholder, try driver first (for cases where main is at end)
                    codeToExecute = template.driverCode.replace(/}\s*$/, code + "\n}");
                } else {
                    codeToExecute = code + "\n\n" + template.driverCode;
                }
            }
        }
        // 2. Send Batch to Judge0
        const judge0Tokens = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].sendToJudge0(language.judge0Id, codeToExecute, testCasesToEvaluate.map((tc)=>({
                input: tc.input,
                output: tc.output
            })));
        // 3. Store Tokens in DB (TestCase records)
        const testCaseRecords = testCasesToEvaluate.map((tc, idx)=>({
                index: allTestCases.findIndex((orig)=>orig.id === tc.id),
                judge0TrackingId: judge0Tokens[idx].token,
                processed: false,
                processingUpdateSent: false // Track if we've already broadcasted the "Processing" state
            }));
        await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].createTestCases(submissionId, testCaseRecords);
        // 4. Poll and Incremental Update
        let isComplete = false;
        let attempts = 0;
        // Adaptive Polling:
        // First 5 seconds: Poll every 100ms (fast feedback)
        // Next 25 seconds: Poll every 500ms
        // Remaining time: Poll every 1000ms
        const MAX_TOTAL_TIME_MS = 60000; // 60 seconds hard timeout
        const START_TIME = Date.now();
        // Track overall stats
        let totalTime = 0;
        let maxMemory = 0;
        let finalStatus = "ACCEPTED";
        let globalErrorMessage = null;
        let compilationError = false;
        while(!isComplete && Date.now() - START_TIME < MAX_TOTAL_TIME_MS){
            const elapsedMs = Date.now() - START_TIME;
            let pollInterval = 1000;
            if (elapsedMs < 5000) pollInterval = 150;
            else if (elapsedMs < 30000) pollInterval = 500;
            await new Promise((r)=>setTimeout(r, pollInterval));
            attempts++;
            const pendingRecords = testCaseRecords.filter((tc)=>!tc.processed);
            if (pendingRecords.length === 0) {
                isComplete = true;
                break;
            }
            const pendingTokens = pendingRecords.map((tc)=>tc.judge0TrackingId);
            const batchResults = await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].getBatchResults(pendingTokens);
            // Check for global compilation error (only once)
            if (!compilationError && batchResults.length > 0) {
                const firstResult = batchResults[0];
                const firstStatus = mapJudge0StatusToDb(firstResult.status.id);
                if (firstStatus === "COMPILE_ERROR") {
                    compilationError = true;
                    finalStatus = "COMPILE_ERROR";
                    globalErrorMessage = firstResult.compile_output || firstResult.stderr || "Compilation Error";
                }
            }
            let pendingCount = 0;
            const updatesToApply = [];
            const publishedUpdates = [];
            for(let i = 0; i < batchResults.length; i++){
                const result = batchResults[i];
                // Match result back to the correct record by token
                const localRecord = pendingRecords.find((r)=>r.judge0TrackingId === result.token);
                if (!localRecord) continue;
                // Identify completion (not In Queue and not Processing)
                const isFinished = result.status.id !== JUDGE0_STATUS.IN_QUEUE && result.status.id !== JUDGE0_STATUS.PROCESSING;
                if (!isFinished) {
                    // If it's processing, broadcast this to the user (once)
                    if (result.status.id === JUDGE0_STATUS.PROCESSING && !localRecord.processingUpdateSent) {
                        localRecord.processingUpdateSent = true;
                        publishedUpdates.push({
                            index: localRecord.index,
                            status: "PROCESSING",
                            judge0TrackingId: result.token
                        });
                    }
                    pendingCount++;
                    continue;
                }
                // If finished but not yet marked processed, update DB
                if (!localRecord.processed) {
                    localRecord.processed = true;
                    const time = parseFloat(result.time || "0");
                    const memory = result.memory || 0;
                    const status = mapJudge0StatusToDb(result.status.id);
                    let errorMessage = null;
                    if (compilationError) {
                        errorMessage = globalErrorMessage;
                    } else if (status === "COMPILE_ERROR") {
                        errorMessage = result.compile_output || result.stderr || "Compilation Error";
                    } else if (status === "RUNTIME_ERROR") {
                        const description = result.status.description || "Runtime Error";
                        const stderr = result.stderr?.trim();
                        errorMessage = stderr ? `${description}\n\n${stderr}` : description;
                        if (description.includes("SIGSEGV")) errorMessage += "\n\nPossible causes:\n- Accessing array out of bounds\n- Null pointer";
                        if (description.includes("SIGFPE")) errorMessage += "\n\nPossible causes:\n- Division by zero";
                    } else if (status === "TIME_LIMIT_EXCEEDED") {
                        errorMessage = "Time Limit Exceeded";
                    } else if (status === "MEMORY_LIMIT_EXCEEDED") {
                        errorMessage = "Memory Limit Exceeded";
                    } else if (result.stderr && status !== "ACCEPTED") {
                        errorMessage = result.stderr;
                    }
                    if (!errorMessage && result.compile_output && status !== "ACCEPTED") {
                        errorMessage = result.compile_output;
                    }
                    if ((status === "RUNTIME_ERROR" || status === "COMPILE_ERROR") && !errorMessage) {
                        errorMessage = "Unknown Error Occurred";
                    }
                    const statusToUse = compilationError ? "COMPILE_ERROR" : status || "RUNTIME_ERROR";
                    // Add to batch
                    const updateData = {
                        judge0TrackingId: result.token,
                        status: statusToUse,
                        time,
                        memory,
                        errorMessage,
                        stdout: result.stdout
                    };
                    updatesToApply.push(updateData);
                    // Prepare for Redis Publish
                    publishedUpdates.push({
                        ...updateData,
                        index: localRecord.index
                    });
                    // Accumulate stats
                    totalTime += time;
                    maxMemory = Math.max(maxMemory, memory);
                    // Determine Submission Status
                    if (!compilationError && status !== "ACCEPTED") {
                        if (finalStatus === "ACCEPTED") {
                            if (status === "WRONG_ANSWER") finalStatus = "WRONG_ANSWER";
                            else if (status === "TIME_LIMIT_EXCEEDED") finalStatus = "TIME_LIMIT_EXCEEDED";
                            else finalStatus = "RUNTIME_ERROR";
                        }
                    }
                }
            }
            if (updatesToApply.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].updateTestCasesBatch(updatesToApply);
                // Publish incremental updates to Redis
                // Using connection (ioredis) from imports
                // We publish the entire list of new updates
                if (publishedUpdates.length > 0) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].publish(`submission:${submissionId}`, JSON.stringify({
                        type: "CASE_UPDATE",
                        data: publishedUpdates
                    }));
                }
            }
            if (pendingCount === 0) {
                isComplete = true;
            }
        }
        if (isComplete) {
            const avgTime = totalTime / testCaseRecords.length;
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].updateSubmissionStatus(submissionId, finalStatus, avgTime, maxMemory);
            // Publish Completion Event
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].publish(`submission:${submissionId}`, JSON.stringify({
                type: "COMPLETE",
                data: {
                    status: finalStatus,
                    time: avgTime,
                    memory: maxMemory
                }
            }));
            if (finalStatus === "ACCEPTED" && submission.mode === "SUBMIT") {
                await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].incrementProblemSolved(problem.id, submission.userId);
            }
            // Invalidate Live Tracking Cache
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].invalidateClassroomTracking(submission.userId);
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].updateSubmissionStatus(submissionId, "TIME_LIMIT_EXCEEDED");
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].publish(`submission:${submissionId}`, JSON.stringify({
                type: "COMPLETE",
                data: {
                    status: "TIME_LIMIT_EXCEEDED",
                    time: 0,
                    memory: 0
                }
            }));
            // Invalidate Live Tracking Cache (Timeout)
            await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].invalidateClassroomTracking(submission.userId);
        }
    } catch (error) {
        console.error(`Error processing submission ${submissionId}`, error);
        await __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$services$2f$submission$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubmissionService"].updateSubmissionStatus(submissionId, "RUNTIME_ERROR");
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].publish(`submission:${submissionId}`, JSON.stringify({
            type: "COMPLETE",
            data: {
                status: "RUNTIME_ERROR",
                time: 0,
                memory: 0
            }
        }));
    }
}, {
    connection: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"],
    concurrency: 10,
    limiter: {
        max: 50,
        duration: 1000
    }
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f2f37d4._.js.map