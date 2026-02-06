(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/workspace/Submissions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Submissions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Submissions({ problemId }) {
    _s();
    const { data: session } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    // Use a separate state to handle the list locally if needed, but optimally this should be a client component that receives initial data or fetches via action.
    // Given the requirement to be "nice and optimized", using the server action in useEffect is good,
    // but React Server Components would be better if this was a page. Since it's a tab content,
    // we'll fetch on mount using the action.
    // Actually, to make it truly optimized, we should probably fetch this data in the parent server component
    // and pass it down, but the Tab system is client-side.
    // So client-side fetching via Server Action is the way to go here for SPA-like feel without full reload.
    // Import dynamically to avoid server-only module errors in client component?
    // No, Actions can be imported in Client Components.
    const [submissions, setSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadingMore, setLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const PAGE_SIZE = 15;
    const loadSubmissions = async (cursor)=>{
        if (!problemId) return;
        if (cursor) setLoadingMore(true);
        else setLoading(true);
        try {
            const { getProblemSubmissionsAction } = await __turbopack_context__.A("[project]/actions/submission.action.ts [app-client] (ecmascript, async loader)");
            const data = await getProblemSubmissionsAction(problemId, PAGE_SIZE, cursor);
            if (cursor) {
                setSubmissions((prev)=>[
                        ...prev,
                        ...data
                    ]);
            } else {
                setSubmissions(data);
            }
            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
            console.error("Failed to load submissions", error);
        } finally{
            setLoading(false);
            setLoadingMore(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Submissions.useEffect": ()=>{
            loadSubmissions();
            const handleUpdate = {
                "Submissions.useEffect.handleUpdate": ()=>loadSubmissions()
            }["Submissions.useEffect.handleUpdate"];
            window.addEventListener("pointsUpdated", handleUpdate);
            return ({
                "Submissions.useEffect": ()=>window.removeEventListener("pointsUpdated", handleUpdate)
            })["Submissions.useEffect"];
        }
    }["Submissions.useEffect"], [
        problemId
    ]);
    if (!session?.user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center text-gray-500 dark:text-gray-400",
            children: "Please sign in to view submissions."
        }, void 0, false, {
            fileName: "[project]/components/workspace/Submissions.tsx",
            lineNumber: 76,
            columnNumber: 16
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center p-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin text-orange-500"
            }, void 0, false, {
                fileName: "[project]/components/workspace/Submissions.tsx",
                lineNumber: 80,
                columnNumber: 58
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/workspace/Submissions.tsx",
            lineNumber: 80,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-white dark:bg-[#0a0a0a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-b border-gray-100 dark:border-[#262626] flex justify-between items-center bg-gray-50/50 dark:bg-[#0a0a0a]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1 h-3 bg-orange-500 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/Submissions.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-widest",
                                children: "My Submissions"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/Submissions.tsx",
                                lineNumber: 88,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/Submissions.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>loadSubmissions(),
                        className: "p-1.5 hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-[#333] rounded-lg transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: `w-4 h-4 text-gray-500 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/Submissions.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/Submissions.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/Submissions.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-y-auto flex-1 custom-scrollbar",
                children: submissions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-12 text-center text-gray-500 dark:text-gray-400 text-sm",
                    children: "No submissions recorded yet."
                }, void 0, false, {
                    fileName: "[project]/components/workspace/Submissions.tsx",
                    lineNumber: 99,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full text-sm text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-5 gap-4 px-6 py-4 text-[10px] text-gray-400 dark:text-gray-500 uppercase bg-gray-100/50 dark:bg-[#141414] border-b border-gray-100 dark:border-[#262626] font-black tracking-widest",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 104,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: "Language"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 105,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: "Time"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 106,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: "Memory"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 107,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: "Date"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 108,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/Submissions.tsx",
                            lineNumber: 103,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "divide-y divide-gray-100 dark:divide-[#262626]",
                            children: submissions.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/submissions/${sub.id}`,
                                    className: "grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `
                                            px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight
                                            ${sub.status === 'ACCEPTED' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-500/20' : sub.status === 'PENDING' ? 'text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-500 border border-amber-100 dark:border-amber-500/20' : 'text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-500 border border-rose-100 dark:border-rose-500/20'}
                                        `,
                                                children: sub.status.replace(/_/g, " ")
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/Submissions.tsx",
                                                lineNumber: 119,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 118,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-600 dark:text-gray-300 font-medium",
                                            children: sub.language.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 128,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 dark:text-gray-400 font-mono text-xs",
                                            children: sub.time ? `${Number(sub.time).toFixed(3)}ms` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 129,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 dark:text-gray-400 font-mono text-xs",
                                            children: sub.memory ? `${sub.memory}KB` : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 130,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-400 dark:text-gray-500 text-[10px] font-bold text-right uppercase tracking-tighter",
                                            children: [
                                                new Date(sub.createdAt).toLocaleDateString(),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "opacity-60",
                                                    children: new Date(sub.createdAt).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 131,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, sub.id, true, {
                                    fileName: "[project]/components/workspace/Submissions.tsx",
                                    lineNumber: 113,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/Submissions.tsx",
                            lineNumber: 111,
                            columnNumber: 25
                        }, this),
                        hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 flex justify-center border-t border-gray-50 dark:border-[#262626] bg-gray-50/20 dark:bg-[#141414]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>loadSubmissions(submissions[submissions.length - 1].id),
                                disabled: loadingMore,
                                className: "flex items-center gap-3 px-8 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-sm transition-all disabled:opacity-50",
                                children: loadingMore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-3.5 h-3.5 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Submissions.tsx",
                                            lineNumber: 149,
                                            columnNumber: 45
                                        }, this),
                                        "Loading..."
                                    ]
                                }, void 0, true) : "Load More Activity"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/Submissions.tsx",
                                lineNumber: 142,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/Submissions.tsx",
                            lineNumber: 141,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/workspace/Submissions.tsx",
                    lineNumber: 101,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/workspace/Submissions.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/Submissions.tsx",
        lineNumber: 84,
        columnNumber: 9
    }, this);
}
_s(Submissions, "zm4vdl+WfOh0Of+zaETDf9tVO1c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession
    ];
});
_c = Submissions;
var _c;
__turbopack_context__.k.register(_c, "Submissions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/points.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:ba9b84 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6044ed3755352d7fd254632d39462abd6795a1aba3":"getProblemComments"},"actions/discussion.ts",""] */ __turbopack_context__.s([
    "getProblemComments",
    ()=>getProblemComments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getProblemComments = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6044ed3755352d7fd254632d39462abd6795a1aba3", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getProblemComments"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGlzY3Vzc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5leHBvcnQgdHlwZSBDb21tZW50V2l0aFVzZXIgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIHVwZGF0ZWRBdDogRGF0ZTtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICB1cHZvdGVDb3VudDogbnVtYmVyO1xuICAgIGlzUGlubmVkOiBib29sZWFuO1xuICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgIH07XG4gICAgcmVwbGllcz86IENvbW1lbnRXaXRoVXNlcltdO1xuICAgIHVzZXJWb3RlPzogXCJVUFwiIHwgXCJET1dOXCIgfCBudWxsO1xufTtcblxuLyoqXG4gKiBGZXRjaCBjb21tZW50cyBmb3IgYSBwcm9ibGVtLCBvcmdhbml6ZWQgYXMgYSB0cmVlLlxuICogVXNlcyBOZXh0LmpzIDE2IGNhY2hlVGFnIGZvciBvbi1kZW1hbmQgcmV2YWxpZGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUNvbW1lbnRzKHByb2JsZW1JZDogc3RyaW5nLCBjdXJyZW50VXNlcklkPzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb2JsZW1JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2b3RlczogdHJ1ZSAvLyBGZXRjaCB2b3RlcyB0byBjYWxjdWxhdGUgdXNlclZvdGUgbWFudWFsbHkgaWYgbmVlZGVkLCBvciB1c2Ugc2VwYXJhdGUgcXVlcnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpc1Bpbm5lZDogXCJkZXNjXCIgfSwgLy8gUGlubmVkIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIHsgdXB2b3RlQ291bnQ6IFwiZGVzY1wiIH0sIC8vIFRoZW4gYnkgdm90ZXNcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2Bwcm9ibGVtLWNvbW1lbnRzLSR7cHJvYmxlbUlkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgY29tbWVudHMtJHtwcm9ibGVtSWR9YF0gfSAvLyBDYWNoZSB0YWcgZm9yIGludmFsaWRhdGlvblxuICAgICk7XG5cbiAgICBjb25zdCByYXdDb21tZW50cyA9IGF3YWl0IGZldGNoQ29tbWVudHMoKTtcblxuICAgIC8vIFByb2Nlc3MgY29tbWVudHMgdG8gYWRkIHVzZXJWb3RlIHN0YXR1cyBhbmQgb3JnYW5pemUgaW50byB0cmVlXG4gICAgY29uc3QgY29tbWVudHNXaXRoVm90ZVN0YXRlID0gcmF3Q29tbWVudHMubWFwKGNvbW1lbnQgPT4ge1xuICAgICAgICBsZXQgdXNlclZvdGU6IFwiVVBcIiB8IFwiRE9XTlwiIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICBjb25zdCB2b3RlID0gY29tbWVudC52b3Rlcy5maW5kKHYgPT4gdi51c2VySWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgaWYgKHZvdGUpIHVzZXJWb3RlID0gdm90ZS50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHZvdGVzIGFycmF5IGZyb20gcmVzdWx0IHRvIHJlZHVjZSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHsgdm90ZXM6IF8sIC4uLnJlc3QgfSA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3QsIHVzZXJWb3RlIH07XG4gICAgfSk7XG5cbiAgICAvLyBCdWlsZCBUcmVlIFN0cnVjdHVyZVxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm9vdENvbW1lbnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXBcbiAgICBjb21tZW50c1dpdGhWb3RlU3RhdGUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudE1hcC5zZXQoY29tbWVudC5pZCwgeyAuLi5jb21tZW50LCByZXBsaWVzOiBbXSB9KTtcbiAgICB9KTtcblxuICAgIC8vIExpbmsgY2hpbGRyZW4gdG8gcGFyZW50c1xuICAgIGNvbW1lbnRzV2l0aFZvdGVTdGF0ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5wYXJlbnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudE1hcC5nZXQoY29tbWVudC5wYXJlbnRJZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxpZXMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290Q29tbWVudHMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByb290Q29tbWVudHMgYXMgQ29tbWVudFdpdGhVc2VyW107XG59XG5cbi8qKlxuICogUG9zdCBhIG5ldyBjb21tZW50IG9yIHJlcGx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0Q29tbWVudChwcm9ibGVtSWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBwYXJlbnRJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IHByaXNtYS5jb21tZW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkIHx8IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29tbWVudHMtJHtwcm9ibGVtSWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgY29tbWVudCB0byBhbGxvdyBvcHRpbWlzdGljIHVwZGF0ZXMgb24gY2xpZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgIC4uLm5ld0NvbW1lbnQsXG4gICAgICAgICAgICAgICAgdm90ZXM6IFtdLCAvLyBFbXB0eSB2b3RlcyBmb3IgbmV3IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB1c2VyVm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsaWVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIFZvdGUgKFVwdm90ZS9Eb3dudm90ZSlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZvdGVDb21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZywgdHlwZTogXCJVUFwiIHwgXCJET1dOXCIpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGV4aXN0aW5nIHZvdGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWb3RlID0gYXdhaXQgcHJpc21hLmNvbW1lbnRWb3RlLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29tbWVudElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgdHJhbnNhY3Rpb24gdG8gdXBkYXRlIHZvdGUgYW5kIGNvdW50IGF0b21pY2FsbHlcbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdWb3RlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHZvdGUgKHRvZ2dsZSBvZmYpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHR4LmNvbW1lbnRWb3RlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmdWb3RlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvdW50IChyZXZlcnNlIHRoZSB2b3RlKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50OiB0eXBlID09PSBcIlVQXCIgPyAxIDogLTEgLy8gd2FpdCwgYWN0dWFsbHkgdXB2b3RlQ291bnQgbG9naWMgdXN1YWxseSBqdXN0IGNvdW50cyB1cHZvdGVzIC0gZG93bnZvdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIGFzc3VtZSB1cHZvdGVDb3VudCBpcyBhIGNhY2hlIG9mIFwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIHZvdGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdHlwZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCAoKzIgb3IgLTIgYmVjYXVzZSB3ZSBhcmUgc3dpbmdpbmcgZnJvbSBvbmUgc2lkZSB0byBvdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwdm90ZUNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudDogdHlwZSA9PT0gXCJVUFwiID8gMiA6IC0yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5ldyB2b3RlXG4gICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHR5cGUgPT09IFwiVVBcIiA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2b3RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdm90ZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFBpbiBhIGNvbW1lbnQgKEFkbWluIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwaW5Db21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBUb2dnbGUgcGluIHN0YXR1c1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWVudCBub3QgZm91bmRcIiB9O1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICBkYXRhOiB7IGlzUGlubmVkOiAhY29tbWVudC5pc1Bpbm5lZCB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBwaW4gY29tbWVudFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkOiBzdHJpbmcsIHByb2JsZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBjYW5EZWxldGUgPSBzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8IGNvbW1lbnQudXNlcklkID09PSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNvbW1lbnQuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjb21tZW50cy0ke3Byb2JsZW1JZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlTQStCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:f5d8d1 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"707d926e4a11493fbc786e4dafc801cd9fea5119a5":"voteComment"},"actions/discussion.ts",""] */ __turbopack_context__.s([
    "voteComment",
    ()=>voteComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var voteComment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("707d926e4a11493fbc786e4dafc801cd9fea5119a5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "voteComment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGlzY3Vzc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5leHBvcnQgdHlwZSBDb21tZW50V2l0aFVzZXIgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIHVwZGF0ZWRBdDogRGF0ZTtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICB1cHZvdGVDb3VudDogbnVtYmVyO1xuICAgIGlzUGlubmVkOiBib29sZWFuO1xuICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgIH07XG4gICAgcmVwbGllcz86IENvbW1lbnRXaXRoVXNlcltdO1xuICAgIHVzZXJWb3RlPzogXCJVUFwiIHwgXCJET1dOXCIgfCBudWxsO1xufTtcblxuLyoqXG4gKiBGZXRjaCBjb21tZW50cyBmb3IgYSBwcm9ibGVtLCBvcmdhbml6ZWQgYXMgYSB0cmVlLlxuICogVXNlcyBOZXh0LmpzIDE2IGNhY2hlVGFnIGZvciBvbi1kZW1hbmQgcmV2YWxpZGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUNvbW1lbnRzKHByb2JsZW1JZDogc3RyaW5nLCBjdXJyZW50VXNlcklkPzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb2JsZW1JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2b3RlczogdHJ1ZSAvLyBGZXRjaCB2b3RlcyB0byBjYWxjdWxhdGUgdXNlclZvdGUgbWFudWFsbHkgaWYgbmVlZGVkLCBvciB1c2Ugc2VwYXJhdGUgcXVlcnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpc1Bpbm5lZDogXCJkZXNjXCIgfSwgLy8gUGlubmVkIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIHsgdXB2b3RlQ291bnQ6IFwiZGVzY1wiIH0sIC8vIFRoZW4gYnkgdm90ZXNcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2Bwcm9ibGVtLWNvbW1lbnRzLSR7cHJvYmxlbUlkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgY29tbWVudHMtJHtwcm9ibGVtSWR9YF0gfSAvLyBDYWNoZSB0YWcgZm9yIGludmFsaWRhdGlvblxuICAgICk7XG5cbiAgICBjb25zdCByYXdDb21tZW50cyA9IGF3YWl0IGZldGNoQ29tbWVudHMoKTtcblxuICAgIC8vIFByb2Nlc3MgY29tbWVudHMgdG8gYWRkIHVzZXJWb3RlIHN0YXR1cyBhbmQgb3JnYW5pemUgaW50byB0cmVlXG4gICAgY29uc3QgY29tbWVudHNXaXRoVm90ZVN0YXRlID0gcmF3Q29tbWVudHMubWFwKGNvbW1lbnQgPT4ge1xuICAgICAgICBsZXQgdXNlclZvdGU6IFwiVVBcIiB8IFwiRE9XTlwiIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICBjb25zdCB2b3RlID0gY29tbWVudC52b3Rlcy5maW5kKHYgPT4gdi51c2VySWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgaWYgKHZvdGUpIHVzZXJWb3RlID0gdm90ZS50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHZvdGVzIGFycmF5IGZyb20gcmVzdWx0IHRvIHJlZHVjZSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHsgdm90ZXM6IF8sIC4uLnJlc3QgfSA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3QsIHVzZXJWb3RlIH07XG4gICAgfSk7XG5cbiAgICAvLyBCdWlsZCBUcmVlIFN0cnVjdHVyZVxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm9vdENvbW1lbnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXBcbiAgICBjb21tZW50c1dpdGhWb3RlU3RhdGUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudE1hcC5zZXQoY29tbWVudC5pZCwgeyAuLi5jb21tZW50LCByZXBsaWVzOiBbXSB9KTtcbiAgICB9KTtcblxuICAgIC8vIExpbmsgY2hpbGRyZW4gdG8gcGFyZW50c1xuICAgIGNvbW1lbnRzV2l0aFZvdGVTdGF0ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5wYXJlbnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudE1hcC5nZXQoY29tbWVudC5wYXJlbnRJZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxpZXMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290Q29tbWVudHMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByb290Q29tbWVudHMgYXMgQ29tbWVudFdpdGhVc2VyW107XG59XG5cbi8qKlxuICogUG9zdCBhIG5ldyBjb21tZW50IG9yIHJlcGx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0Q29tbWVudChwcm9ibGVtSWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBwYXJlbnRJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IHByaXNtYS5jb21tZW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkIHx8IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29tbWVudHMtJHtwcm9ibGVtSWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgY29tbWVudCB0byBhbGxvdyBvcHRpbWlzdGljIHVwZGF0ZXMgb24gY2xpZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgIC4uLm5ld0NvbW1lbnQsXG4gICAgICAgICAgICAgICAgdm90ZXM6IFtdLCAvLyBFbXB0eSB2b3RlcyBmb3IgbmV3IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB1c2VyVm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsaWVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIFZvdGUgKFVwdm90ZS9Eb3dudm90ZSlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZvdGVDb21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZywgdHlwZTogXCJVUFwiIHwgXCJET1dOXCIpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGV4aXN0aW5nIHZvdGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWb3RlID0gYXdhaXQgcHJpc21hLmNvbW1lbnRWb3RlLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29tbWVudElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgdHJhbnNhY3Rpb24gdG8gdXBkYXRlIHZvdGUgYW5kIGNvdW50IGF0b21pY2FsbHlcbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdWb3RlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHZvdGUgKHRvZ2dsZSBvZmYpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHR4LmNvbW1lbnRWb3RlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmdWb3RlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvdW50IChyZXZlcnNlIHRoZSB2b3RlKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50OiB0eXBlID09PSBcIlVQXCIgPyAxIDogLTEgLy8gd2FpdCwgYWN0dWFsbHkgdXB2b3RlQ291bnQgbG9naWMgdXN1YWxseSBqdXN0IGNvdW50cyB1cHZvdGVzIC0gZG93bnZvdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIGFzc3VtZSB1cHZvdGVDb3VudCBpcyBhIGNhY2hlIG9mIFwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIHZvdGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdHlwZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCAoKzIgb3IgLTIgYmVjYXVzZSB3ZSBhcmUgc3dpbmdpbmcgZnJvbSBvbmUgc2lkZSB0byBvdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwdm90ZUNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudDogdHlwZSA9PT0gXCJVUFwiID8gMiA6IC0yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5ldyB2b3RlXG4gICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHR5cGUgPT09IFwiVVBcIiA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2b3RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdm90ZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFBpbiBhIGNvbW1lbnQgKEFkbWluIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwaW5Db21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBUb2dnbGUgcGluIHN0YXR1c1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWVudCBub3QgZm91bmRcIiB9O1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICBkYXRhOiB7IGlzUGlubmVkOiAhY29tbWVudC5pc1Bpbm5lZCB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBwaW4gY29tbWVudFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkOiBzdHJpbmcsIHByb2JsZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBjYW5EZWxldGUgPSBzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8IGNvbW1lbnQudXNlcklkID09PSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNvbW1lbnQuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjb21tZW50cy0ke3Byb2JsZW1JZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBSQXNKc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:810399 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60af00e80ae9125d962d6768a3c5e918095efad8c2":"pinComment"},"actions/discussion.ts",""] */ __turbopack_context__.s([
    "pinComment",
    ()=>pinComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var pinComment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60af00e80ae9125d962d6768a3c5e918095efad8c2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "pinComment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGlzY3Vzc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5leHBvcnQgdHlwZSBDb21tZW50V2l0aFVzZXIgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIHVwZGF0ZWRBdDogRGF0ZTtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICB1cHZvdGVDb3VudDogbnVtYmVyO1xuICAgIGlzUGlubmVkOiBib29sZWFuO1xuICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgIH07XG4gICAgcmVwbGllcz86IENvbW1lbnRXaXRoVXNlcltdO1xuICAgIHVzZXJWb3RlPzogXCJVUFwiIHwgXCJET1dOXCIgfCBudWxsO1xufTtcblxuLyoqXG4gKiBGZXRjaCBjb21tZW50cyBmb3IgYSBwcm9ibGVtLCBvcmdhbml6ZWQgYXMgYSB0cmVlLlxuICogVXNlcyBOZXh0LmpzIDE2IGNhY2hlVGFnIGZvciBvbi1kZW1hbmQgcmV2YWxpZGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUNvbW1lbnRzKHByb2JsZW1JZDogc3RyaW5nLCBjdXJyZW50VXNlcklkPzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb2JsZW1JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2b3RlczogdHJ1ZSAvLyBGZXRjaCB2b3RlcyB0byBjYWxjdWxhdGUgdXNlclZvdGUgbWFudWFsbHkgaWYgbmVlZGVkLCBvciB1c2Ugc2VwYXJhdGUgcXVlcnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpc1Bpbm5lZDogXCJkZXNjXCIgfSwgLy8gUGlubmVkIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIHsgdXB2b3RlQ291bnQ6IFwiZGVzY1wiIH0sIC8vIFRoZW4gYnkgdm90ZXNcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2Bwcm9ibGVtLWNvbW1lbnRzLSR7cHJvYmxlbUlkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgY29tbWVudHMtJHtwcm9ibGVtSWR9YF0gfSAvLyBDYWNoZSB0YWcgZm9yIGludmFsaWRhdGlvblxuICAgICk7XG5cbiAgICBjb25zdCByYXdDb21tZW50cyA9IGF3YWl0IGZldGNoQ29tbWVudHMoKTtcblxuICAgIC8vIFByb2Nlc3MgY29tbWVudHMgdG8gYWRkIHVzZXJWb3RlIHN0YXR1cyBhbmQgb3JnYW5pemUgaW50byB0cmVlXG4gICAgY29uc3QgY29tbWVudHNXaXRoVm90ZVN0YXRlID0gcmF3Q29tbWVudHMubWFwKGNvbW1lbnQgPT4ge1xuICAgICAgICBsZXQgdXNlclZvdGU6IFwiVVBcIiB8IFwiRE9XTlwiIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICBjb25zdCB2b3RlID0gY29tbWVudC52b3Rlcy5maW5kKHYgPT4gdi51c2VySWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgaWYgKHZvdGUpIHVzZXJWb3RlID0gdm90ZS50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHZvdGVzIGFycmF5IGZyb20gcmVzdWx0IHRvIHJlZHVjZSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHsgdm90ZXM6IF8sIC4uLnJlc3QgfSA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3QsIHVzZXJWb3RlIH07XG4gICAgfSk7XG5cbiAgICAvLyBCdWlsZCBUcmVlIFN0cnVjdHVyZVxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm9vdENvbW1lbnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXBcbiAgICBjb21tZW50c1dpdGhWb3RlU3RhdGUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudE1hcC5zZXQoY29tbWVudC5pZCwgeyAuLi5jb21tZW50LCByZXBsaWVzOiBbXSB9KTtcbiAgICB9KTtcblxuICAgIC8vIExpbmsgY2hpbGRyZW4gdG8gcGFyZW50c1xuICAgIGNvbW1lbnRzV2l0aFZvdGVTdGF0ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5wYXJlbnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudE1hcC5nZXQoY29tbWVudC5wYXJlbnRJZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxpZXMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290Q29tbWVudHMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByb290Q29tbWVudHMgYXMgQ29tbWVudFdpdGhVc2VyW107XG59XG5cbi8qKlxuICogUG9zdCBhIG5ldyBjb21tZW50IG9yIHJlcGx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0Q29tbWVudChwcm9ibGVtSWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBwYXJlbnRJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IHByaXNtYS5jb21tZW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkIHx8IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29tbWVudHMtJHtwcm9ibGVtSWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgY29tbWVudCB0byBhbGxvdyBvcHRpbWlzdGljIHVwZGF0ZXMgb24gY2xpZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgIC4uLm5ld0NvbW1lbnQsXG4gICAgICAgICAgICAgICAgdm90ZXM6IFtdLCAvLyBFbXB0eSB2b3RlcyBmb3IgbmV3IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB1c2VyVm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsaWVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIFZvdGUgKFVwdm90ZS9Eb3dudm90ZSlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZvdGVDb21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZywgdHlwZTogXCJVUFwiIHwgXCJET1dOXCIpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGV4aXN0aW5nIHZvdGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWb3RlID0gYXdhaXQgcHJpc21hLmNvbW1lbnRWb3RlLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29tbWVudElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgdHJhbnNhY3Rpb24gdG8gdXBkYXRlIHZvdGUgYW5kIGNvdW50IGF0b21pY2FsbHlcbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdWb3RlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHZvdGUgKHRvZ2dsZSBvZmYpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHR4LmNvbW1lbnRWb3RlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmdWb3RlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvdW50IChyZXZlcnNlIHRoZSB2b3RlKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50OiB0eXBlID09PSBcIlVQXCIgPyAxIDogLTEgLy8gd2FpdCwgYWN0dWFsbHkgdXB2b3RlQ291bnQgbG9naWMgdXN1YWxseSBqdXN0IGNvdW50cyB1cHZvdGVzIC0gZG93bnZvdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIGFzc3VtZSB1cHZvdGVDb3VudCBpcyBhIGNhY2hlIG9mIFwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIHZvdGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdHlwZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCAoKzIgb3IgLTIgYmVjYXVzZSB3ZSBhcmUgc3dpbmdpbmcgZnJvbSBvbmUgc2lkZSB0byBvdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwdm90ZUNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudDogdHlwZSA9PT0gXCJVUFwiID8gMiA6IC0yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5ldyB2b3RlXG4gICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHR5cGUgPT09IFwiVVBcIiA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2b3RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdm90ZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFBpbiBhIGNvbW1lbnQgKEFkbWluIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwaW5Db21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBUb2dnbGUgcGluIHN0YXR1c1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWVudCBub3QgZm91bmRcIiB9O1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICBkYXRhOiB7IGlzUGlubmVkOiAhY29tbWVudC5pc1Bpbm5lZCB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBwaW4gY29tbWVudFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkOiBzdHJpbmcsIHByb2JsZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBjYW5EZWxldGUgPSBzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8IGNvbW1lbnQudXNlcklkID09PSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNvbW1lbnQuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjb21tZW50cy0ke3Byb2JsZW1JZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlSQWdQc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:c4e46a [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60b9c01d983b07f0a2a8b264f93f4f77235a94ded3":"deleteComment"},"actions/discussion.ts",""] */ __turbopack_context__.s([
    "deleteComment",
    ()=>deleteComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var deleteComment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60b9c01d983b07f0a2a8b264f93f4f77235a94ded3", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteComment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGlzY3Vzc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5leHBvcnQgdHlwZSBDb21tZW50V2l0aFVzZXIgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIHVwZGF0ZWRBdDogRGF0ZTtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICB1cHZvdGVDb3VudDogbnVtYmVyO1xuICAgIGlzUGlubmVkOiBib29sZWFuO1xuICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgIH07XG4gICAgcmVwbGllcz86IENvbW1lbnRXaXRoVXNlcltdO1xuICAgIHVzZXJWb3RlPzogXCJVUFwiIHwgXCJET1dOXCIgfCBudWxsO1xufTtcblxuLyoqXG4gKiBGZXRjaCBjb21tZW50cyBmb3IgYSBwcm9ibGVtLCBvcmdhbml6ZWQgYXMgYSB0cmVlLlxuICogVXNlcyBOZXh0LmpzIDE2IGNhY2hlVGFnIGZvciBvbi1kZW1hbmQgcmV2YWxpZGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUNvbW1lbnRzKHByb2JsZW1JZDogc3RyaW5nLCBjdXJyZW50VXNlcklkPzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb2JsZW1JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2b3RlczogdHJ1ZSAvLyBGZXRjaCB2b3RlcyB0byBjYWxjdWxhdGUgdXNlclZvdGUgbWFudWFsbHkgaWYgbmVlZGVkLCBvciB1c2Ugc2VwYXJhdGUgcXVlcnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpc1Bpbm5lZDogXCJkZXNjXCIgfSwgLy8gUGlubmVkIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIHsgdXB2b3RlQ291bnQ6IFwiZGVzY1wiIH0sIC8vIFRoZW4gYnkgdm90ZXNcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2Bwcm9ibGVtLWNvbW1lbnRzLSR7cHJvYmxlbUlkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgY29tbWVudHMtJHtwcm9ibGVtSWR9YF0gfSAvLyBDYWNoZSB0YWcgZm9yIGludmFsaWRhdGlvblxuICAgICk7XG5cbiAgICBjb25zdCByYXdDb21tZW50cyA9IGF3YWl0IGZldGNoQ29tbWVudHMoKTtcblxuICAgIC8vIFByb2Nlc3MgY29tbWVudHMgdG8gYWRkIHVzZXJWb3RlIHN0YXR1cyBhbmQgb3JnYW5pemUgaW50byB0cmVlXG4gICAgY29uc3QgY29tbWVudHNXaXRoVm90ZVN0YXRlID0gcmF3Q29tbWVudHMubWFwKGNvbW1lbnQgPT4ge1xuICAgICAgICBsZXQgdXNlclZvdGU6IFwiVVBcIiB8IFwiRE9XTlwiIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICBjb25zdCB2b3RlID0gY29tbWVudC52b3Rlcy5maW5kKHYgPT4gdi51c2VySWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgaWYgKHZvdGUpIHVzZXJWb3RlID0gdm90ZS50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHZvdGVzIGFycmF5IGZyb20gcmVzdWx0IHRvIHJlZHVjZSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHsgdm90ZXM6IF8sIC4uLnJlc3QgfSA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3QsIHVzZXJWb3RlIH07XG4gICAgfSk7XG5cbiAgICAvLyBCdWlsZCBUcmVlIFN0cnVjdHVyZVxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm9vdENvbW1lbnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXBcbiAgICBjb21tZW50c1dpdGhWb3RlU3RhdGUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudE1hcC5zZXQoY29tbWVudC5pZCwgeyAuLi5jb21tZW50LCByZXBsaWVzOiBbXSB9KTtcbiAgICB9KTtcblxuICAgIC8vIExpbmsgY2hpbGRyZW4gdG8gcGFyZW50c1xuICAgIGNvbW1lbnRzV2l0aFZvdGVTdGF0ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5wYXJlbnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudE1hcC5nZXQoY29tbWVudC5wYXJlbnRJZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxpZXMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290Q29tbWVudHMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByb290Q29tbWVudHMgYXMgQ29tbWVudFdpdGhVc2VyW107XG59XG5cbi8qKlxuICogUG9zdCBhIG5ldyBjb21tZW50IG9yIHJlcGx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0Q29tbWVudChwcm9ibGVtSWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBwYXJlbnRJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IHByaXNtYS5jb21tZW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkIHx8IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29tbWVudHMtJHtwcm9ibGVtSWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgY29tbWVudCB0byBhbGxvdyBvcHRpbWlzdGljIHVwZGF0ZXMgb24gY2xpZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgIC4uLm5ld0NvbW1lbnQsXG4gICAgICAgICAgICAgICAgdm90ZXM6IFtdLCAvLyBFbXB0eSB2b3RlcyBmb3IgbmV3IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB1c2VyVm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsaWVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIFZvdGUgKFVwdm90ZS9Eb3dudm90ZSlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZvdGVDb21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZywgdHlwZTogXCJVUFwiIHwgXCJET1dOXCIpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGV4aXN0aW5nIHZvdGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWb3RlID0gYXdhaXQgcHJpc21hLmNvbW1lbnRWb3RlLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29tbWVudElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgdHJhbnNhY3Rpb24gdG8gdXBkYXRlIHZvdGUgYW5kIGNvdW50IGF0b21pY2FsbHlcbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdWb3RlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHZvdGUgKHRvZ2dsZSBvZmYpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHR4LmNvbW1lbnRWb3RlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmdWb3RlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvdW50IChyZXZlcnNlIHRoZSB2b3RlKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50OiB0eXBlID09PSBcIlVQXCIgPyAxIDogLTEgLy8gd2FpdCwgYWN0dWFsbHkgdXB2b3RlQ291bnQgbG9naWMgdXN1YWxseSBqdXN0IGNvdW50cyB1cHZvdGVzIC0gZG93bnZvdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIGFzc3VtZSB1cHZvdGVDb3VudCBpcyBhIGNhY2hlIG9mIFwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIHZvdGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdHlwZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCAoKzIgb3IgLTIgYmVjYXVzZSB3ZSBhcmUgc3dpbmdpbmcgZnJvbSBvbmUgc2lkZSB0byBvdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwdm90ZUNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudDogdHlwZSA9PT0gXCJVUFwiID8gMiA6IC0yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5ldyB2b3RlXG4gICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHR5cGUgPT09IFwiVVBcIiA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2b3RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdm90ZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFBpbiBhIGNvbW1lbnQgKEFkbWluIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwaW5Db21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBUb2dnbGUgcGluIHN0YXR1c1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWVudCBub3QgZm91bmRcIiB9O1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICBkYXRhOiB7IGlzUGlubmVkOiAhY29tbWVudC5pc1Bpbm5lZCB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBwaW4gY29tbWVudFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkOiBzdHJpbmcsIHByb2JsZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBjYW5EZWxldGUgPSBzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8IGNvbW1lbnQudXNlcklkID09PSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNvbW1lbnQuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjb21tZW50cy0ke3Byb2JsZW1JZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRSQTZRc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:3a1ac4 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"708aa5eaf1ed268262e98ff2f597d9df9f5c649439":"postComment"},"actions/discussion.ts",""] */ __turbopack_context__.s([
    "postComment",
    ()=>postComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var postComment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("708aa5eaf1ed268262e98ff2f597d9df9f5c649439", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "postComment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGlzY3Vzc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5leHBvcnQgdHlwZSBDb21tZW50V2l0aFVzZXIgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIHVwZGF0ZWRBdDogRGF0ZTtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICB1cHZvdGVDb3VudDogbnVtYmVyO1xuICAgIGlzUGlubmVkOiBib29sZWFuO1xuICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgIH07XG4gICAgcmVwbGllcz86IENvbW1lbnRXaXRoVXNlcltdO1xuICAgIHVzZXJWb3RlPzogXCJVUFwiIHwgXCJET1dOXCIgfCBudWxsO1xufTtcblxuLyoqXG4gKiBGZXRjaCBjb21tZW50cyBmb3IgYSBwcm9ibGVtLCBvcmdhbml6ZWQgYXMgYSB0cmVlLlxuICogVXNlcyBOZXh0LmpzIDE2IGNhY2hlVGFnIGZvciBvbi1kZW1hbmQgcmV2YWxpZGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUNvbW1lbnRzKHByb2JsZW1JZDogc3RyaW5nLCBjdXJyZW50VXNlcklkPzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb2JsZW1JZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2b3RlczogdHJ1ZSAvLyBGZXRjaCB2b3RlcyB0byBjYWxjdWxhdGUgdXNlclZvdGUgbWFudWFsbHkgaWYgbmVlZGVkLCBvciB1c2Ugc2VwYXJhdGUgcXVlcnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpc1Bpbm5lZDogXCJkZXNjXCIgfSwgLy8gUGlubmVkIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIHsgdXB2b3RlQ291bnQ6IFwiZGVzY1wiIH0sIC8vIFRoZW4gYnkgdm90ZXNcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2Bwcm9ibGVtLWNvbW1lbnRzLSR7cHJvYmxlbUlkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgY29tbWVudHMtJHtwcm9ibGVtSWR9YF0gfSAvLyBDYWNoZSB0YWcgZm9yIGludmFsaWRhdGlvblxuICAgICk7XG5cbiAgICBjb25zdCByYXdDb21tZW50cyA9IGF3YWl0IGZldGNoQ29tbWVudHMoKTtcblxuICAgIC8vIFByb2Nlc3MgY29tbWVudHMgdG8gYWRkIHVzZXJWb3RlIHN0YXR1cyBhbmQgb3JnYW5pemUgaW50byB0cmVlXG4gICAgY29uc3QgY29tbWVudHNXaXRoVm90ZVN0YXRlID0gcmF3Q29tbWVudHMubWFwKGNvbW1lbnQgPT4ge1xuICAgICAgICBsZXQgdXNlclZvdGU6IFwiVVBcIiB8IFwiRE9XTlwiIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICBjb25zdCB2b3RlID0gY29tbWVudC52b3Rlcy5maW5kKHYgPT4gdi51c2VySWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgaWYgKHZvdGUpIHVzZXJWb3RlID0gdm90ZS50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHZvdGVzIGFycmF5IGZyb20gcmVzdWx0IHRvIHJlZHVjZSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHsgdm90ZXM6IF8sIC4uLnJlc3QgfSA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3QsIHVzZXJWb3RlIH07XG4gICAgfSk7XG5cbiAgICAvLyBCdWlsZCBUcmVlIFN0cnVjdHVyZVxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm9vdENvbW1lbnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXBcbiAgICBjb21tZW50c1dpdGhWb3RlU3RhdGUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudE1hcC5zZXQoY29tbWVudC5pZCwgeyAuLi5jb21tZW50LCByZXBsaWVzOiBbXSB9KTtcbiAgICB9KTtcblxuICAgIC8vIExpbmsgY2hpbGRyZW4gdG8gcGFyZW50c1xuICAgIGNvbW1lbnRzV2l0aFZvdGVTdGF0ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5wYXJlbnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudE1hcC5nZXQoY29tbWVudC5wYXJlbnRJZCk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxpZXMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290Q29tbWVudHMucHVzaChjb21tZW50TWFwLmdldChjb21tZW50LmlkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByb290Q29tbWVudHMgYXMgQ29tbWVudFdpdGhVc2VyW107XG59XG5cbi8qKlxuICogUG9zdCBhIG5ldyBjb21tZW50IG9yIHJlcGx5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3N0Q29tbWVudChwcm9ibGVtSWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBwYXJlbnRJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IGF3YWl0IHByaXNtYS5jb21tZW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkIHx8IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29tbWVudHMtJHtwcm9ibGVtSWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgY29tbWVudCB0byBhbGxvdyBvcHRpbWlzdGljIHVwZGF0ZXMgb24gY2xpZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgIC4uLm5ld0NvbW1lbnQsXG4gICAgICAgICAgICAgICAgdm90ZXM6IFtdLCAvLyBFbXB0eSB2b3RlcyBmb3IgbmV3IGNvbW1lbnRcbiAgICAgICAgICAgICAgICB1c2VyVm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsaWVzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gcG9zdCBjb21tZW50XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIFZvdGUgKFVwdm90ZS9Eb3dudm90ZSlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZvdGVDb21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZywgdHlwZTogXCJVUFwiIHwgXCJET1dOXCIpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGV4aXN0aW5nIHZvdGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWb3RlID0gYXdhaXQgcHJpc21hLmNvbW1lbnRWb3RlLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29tbWVudElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgdHJhbnNhY3Rpb24gdG8gdXBkYXRlIHZvdGUgYW5kIGNvdW50IGF0b21pY2FsbHlcbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdWb3RlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHZvdGUgKHRvZ2dsZSBvZmYpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHR4LmNvbW1lbnRWb3RlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmdWb3RlLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvdW50IChyZXZlcnNlIHRoZSB2b3RlKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50OiB0eXBlID09PSBcIlVQXCIgPyAxIDogLTEgLy8gd2FpdCwgYWN0dWFsbHkgdXB2b3RlQ291bnQgbG9naWMgdXN1YWxseSBqdXN0IGNvdW50cyB1cHZvdGVzIC0gZG93bnZvdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIGFzc3VtZSB1cHZvdGVDb3VudCBpcyBhIGNhY2hlIG9mIFwic2NvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIHZvdGVcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdHlwZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCAoKzIgb3IgLTIgYmVjYXVzZSB3ZSBhcmUgc3dpbmdpbmcgZnJvbSBvbmUgc2lkZSB0byBvdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwdm90ZUNvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudDogdHlwZSA9PT0gXCJVUFwiID8gMiA6IC0yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5ldyB2b3RlXG4gICAgICAgICAgICAgICAgYXdhaXQgdHguY29tbWVudFZvdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXB2b3RlQ291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHR5cGUgPT09IFwiVVBcIiA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2b3RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdm90ZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFBpbiBhIGNvbW1lbnQgKEFkbWluIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwaW5Db21tZW50KGNvbW1lbnRJZDogc3RyaW5nLCBwcm9ibGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBUb2dnbGUgcGluIHN0YXR1c1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWVudCBub3QgZm91bmRcIiB9O1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS5jb21tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29tbWVudElkIH0sXG4gICAgICAgICAgICBkYXRhOiB7IGlzUGlubmVkOiAhY29tbWVudC5pc1Bpbm5lZCB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNvbW1lbnRzLSR7cHJvYmxlbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBwaW4gY29tbWVudFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElkOiBzdHJpbmcsIHByb2JsZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJpc21hLmNvbW1lbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBjb21tZW50SWQgfSB9KTtcbiAgICAgICAgaWYgKCFjb21tZW50KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBjYW5EZWxldGUgPSBzZXNzaW9uLnVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8IGNvbW1lbnQudXNlcklkID09PSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNvbW1lbnQuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjb21tZW50cy0ke3Byb2JsZW1JZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBSQW9Hc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/problems/discussion/CommentInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentInput",
    ()=>CommentInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3a1ac4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:3a1ac4 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CommentInput({ problemId, parentId, onSuccess, onCancel, placeholder, autoFocus, compact }) {
    _s();
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!content.trim()) return;
        setIsSubmitting(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3a1ac4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["postComment"])(problemId, content, parentId);
            if (res.success) {
                setContent("");
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment posted!");
                onSuccess?.(res.comment);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to post comment");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    };
    if (compact) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex gap-2 items-center w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: content,
                    onChange: (e)=>setContent(e.target.value),
                    placeholder: placeholder || "Type a comment...",
                    className: "flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all",
                    autoFocus: autoFocus
                }, void 0, false, {
                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: !content.trim() || isSubmitting,
                    className: "p-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm",
                    children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-4 h-4 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                        lineNumber: 58,
                        columnNumber: 37
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                        lineNumber: 58,
                        columnNumber: 84
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/problems/discussion/CommentInput.tsx",
            lineNumber: 45,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: content,
                    onChange: (e)=>setContent(e.target.value),
                    placeholder: placeholder || "Write a comment...",
                    className: "w-full min-h-[100px] p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-y text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400",
                    autoFocus: autoFocus
                }, void 0, false, {
                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-3 right-3 flex items-center gap-2",
                    children: [
                        onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCancel,
                            className: "px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                            lineNumber: 76,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !content.trim() || isSubmitting,
                            className: "px-4 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors",
                            children: [
                                isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-3 h-3 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                                    lineNumber: 89,
                                    columnNumber: 41
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                                    lineNumber: 89,
                                    columnNumber: 88
                                }, this),
                                "Post"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/problems/discussion/CommentInput.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/problems/discussion/CommentInput.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/problems/discussion/CommentInput.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_s(CommentInput, "uweFMCIN8/a1EEK2oz1aLlRu2jU=");
_c = CommentInput;
var _c;
__turbopack_context__.k.register(_c, "CommentInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/problems/discussion/CommentItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentItem",
    ()=>CommentItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$big$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowBigUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-big-up.js [app-client] (ecmascript) <export default as ArrowBigUp>"); // Using ArrowBigUp/Down for voting similar to Reddit
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$big$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowBigDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-big-down.js [app-client] (ecmascript) <export default as ArrowBigDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PinOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin-off.js [app-client] (ecmascript) <export default as PinOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f5d8d1__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f5d8d1 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$810399__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:810399 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$c4e46a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:c4e46a [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/discussion/CommentInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function CommentItem({ comment, problemId, depth = 0, onRefresh }) {
    _s();
    const { data: session } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const [isReplying, setIsReplying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voteState, setVoteState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(comment.userVote || null);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(comment.upvoteCount);
    const [isVoting, setIsVoting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Optimistic Replies State
    const [localReplies, setLocalReplies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(comment.replies || []);
    // Sync local replies if prop changes (e.g. on full refresh)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentItem.useEffect": ()=>{
            if (comment.replies) {
                setLocalReplies(comment.replies);
            }
        }
    }["CommentItem.useEffect"], [
        comment.replies
    ]);
    const isOwner = session?.user?.id === comment.userId;
    const isAdmin = session?.user?.role === "ADMIN";
    const handleVote = async (type)=>{
        if (!session?.user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please login to vote");
        if (isVoting) return;
        // Optimistic update
        const previousVote = voteState;
        const previousScore = score;
        let newScore = score;
        let newVote = type;
        if (voteState === type) {
            // Toggle off
            newVote = null;
            newScore -= type === "UP" ? 1 : -1;
        } else if (voteState) {
            // Flip vote
            newScore += type === "UP" ? 2 : -2;
        } else {
            // New vote
            newScore += type === "UP" ? 1 : -1;
        }
        setVoteState(newVote);
        setScore(newScore);
        setIsVoting(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f5d8d1__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["voteComment"])(comment.id, problemId, type);
            if (!res.success) throw new Error(res.error);
        } catch (error) {
            // Revert
            setVoteState(previousVote);
            setScore(previousScore);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to vote");
        } finally{
            setIsVoting(false);
        }
    };
    const handlePin = async ()=>{
        if (!confirm(comment.isPinned ? "Unpin this comment?" : "Pin this comment?")) return;
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$810399__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["pinComment"])(comment.id, problemId);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Updated pin status");
            onRefresh?.();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update pin status");
        }
    };
    const handleDelete = async ()=>{
        if (!confirm("Delete this comment permanently?")) return;
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$c4e46a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteComment"])(comment.id, problemId);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment deleted");
            onRefresh?.();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to delete comment");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col ${depth > 0 ? "ml-4 md:ml-8 border-l-2 border-gray-100 dark:border-[#262626] pl-4 md:pl-6 pt-2" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative group p-4 rounded-xl transition-all ${comment.isPinned ? "bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10" : "hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50"}`,
                children: [
                    comment.isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                className: "w-3 h-3 fill-current"
                            }, void 0, false, {
                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                lineNumber: 110,
                                columnNumber: 25
                            }, this),
                            "Pinned"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                        lineNumber: 109,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full bg-gray-200 dark:bg-[#333] overflow-hidden",
                                    children: comment.user.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: comment.user.image,
                                        alt: comment.user.name,
                                        width: 32,
                                        height: 32,
                                        className: "object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                        lineNumber: 120,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex items-center justify-center text-xs font-bold text-gray-500",
                                        children: comment.user.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                        lineNumber: 122,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                lineNumber: 117,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-gray-900 dark:text-gray-100",
                                                children: comment.user.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 132,
                                                columnNumber: 29
                                            }, this),
                                            comment.user.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
                                                children: "ADMIN"
                                            }, void 0, false, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 134,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: [
                                                    "• ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(comment.createdAt), {
                                                        addSuffix: true
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 136,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                        lineNumber: 131,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap",
                                        children: comment.content
                                    }, void 0, false, {
                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 bg-gray-100 dark:bg-[#262626] rounded-lg p-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleVote("UP"),
                                                        className: `p-1 rounded hover:bg-gray-200 dark:hover:bg-[#333] transition-colors ${voteState === "UP" ? "text-orange-600 dark:text-orange-500" : "text-gray-500 dark:text-gray-400"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$big$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowBigUp$3e$__["ArrowBigUp"], {
                                                            className: `w-5 h-5 ${voteState === "UP" ? "fill-current" : ""}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs font-bold w-6 text-center ${voteState === "UP" ? "text-orange-600 dark:text-orange-500" : voteState === "DOWN" ? "text-blue-600 dark:text-blue-500" : "text-gray-600 dark:text-gray-400"}`,
                                                        children: score
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleVote("DOWN"),
                                                        className: `p-1 rounded hover:bg-gray-200 dark:hover:bg-[#333] transition-colors ${voteState === "DOWN" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$big$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowBigDown$3e$__["ArrowBigDown"], {
                                                            className: `w-5 h-5 ${voteState === "DOWN" ? "fill-current" : ""}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 146,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsReplying(!isReplying),
                                                className: "flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Reply"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 164,
                                                columnNumber: 29
                                            }, this),
                                            (isOwner || isAdmin) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleDelete,
                                                className: "flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors ml-auto md:ml-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 37
                                                    }, this),
                                                    "Delete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 173,
                                                columnNumber: 33
                                            }, this),
                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handlePin,
                                                className: `flex items-center gap-1.5 text-xs font-medium transition-colors ${comment.isPinned ? "text-orange-600" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`,
                                                children: [
                                                    comment.isPinned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PinOff$3e$__["PinOff"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 57
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 94
                                                    }, this),
                                                    comment.isPinned ? "Unpin" : "Pin"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                                lineNumber: 130,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                        lineNumber: 115,
                        columnNumber: 17
                    }, this),
                    isReplying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pl-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentInput"], {
                            problemId: problemId,
                            parentId: comment.id,
                            onSuccess: (newReply)=>{
                                setIsReplying(false);
                                if (newReply) {
                                    setLocalReplies((prev)=>[
                                            ...prev,
                                            newReply
                                        ]);
                                } else {
                                    onRefresh?.();
                                }
                            },
                            onCancel: ()=>setIsReplying(false),
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                            lineNumber: 197,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                        lineNumber: 196,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this),
            localReplies && localReplies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col mb-4",
                children: localReplies.map((reply)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                        comment: reply,
                        problemId: problemId,
                        depth: depth + 1,
                        onRefresh: onRefresh
                    }, reply.id, false, {
                        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                        lineNumber: 219,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/problems/discussion/CommentItem.tsx",
                lineNumber: 217,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/problems/discussion/CommentItem.tsx",
        lineNumber: 104,
        columnNumber: 9
    }, this);
}
_s(CommentItem, "qGfDrb9gXkgkr4Y0Hs7YXNzhhUU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession
    ];
});
_c = CommentItem;
var _c;
__turbopack_context__.k.register(_c, "CommentItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/problems/discussion/CommentTree.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentTree",
    ()=>CommentTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ba9b84__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:ba9b84 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/discussion/CommentItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/discussion/CommentInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square-off.js [app-client] (ecmascript) <export default as MessageSquareOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)"); // Importing for client usage
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function CommentTree({ problemId }) {
    _s();
    const { data: session } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchComments = async ()=>{
        setIsLoading(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ba9b84__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getProblemComments"])(problemId, session?.user?.id);
            setComments(data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentTree.useEffect": ()=>{
            fetchComments();
        }
    }["CommentTree.useEffect"], [
        problemId,
        session?.user?.id
    ]);
    // Listen for invalidation/refetch if needed via custom events?
    // Actually posting a comment triggers revalidateTag on server,
    // but client needs to re-fetch to see it unless we do optimistic updates.
    // For now, passing an onSuccess callback to inputs to trigger refetch.
    // HOWEVER, in Next.js Server Actions with revalidateTag,
    // if this component was a Server Component it would update automatically.
    // Since it's a Client Component fetching data via Server Action in useEffect,
    // we need to manually refetch.
    // Better approach: Make the `getProblemComments` a data requirement of a wrapper server component?
    // But the prompt asked for "caching nextjs 16 usecache" which we did in the action.
    // Let's stick to client fetching for interactivity or wrap it.
    // Actually, `CommentTree` should probably be a Server Component that fetches initial data,
    // but the user interaction (voting, posting) happens on client.
    // BUT since I am modifying `ProblemDescription` which is a Client Component
    // (it deals with tabs state), I can't easily nest a Server Component inside it
    // unless passed as children.
    // Given the architecture, I'll fetch on client for now or use SWR-like pattern.
    // Since we want to keep it simple, I'll just refetch on success.
    const handleRefetch = (newComment)=>{
        if (newComment) {
            // Optimistic update
            setComments((prev)=>[
                    newComment,
                    ...prev
                ]);
        } else {
            fetchComments();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto pb-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                                children: [
                                    comments.length,
                                    " Comments"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400",
                                children: "Sorted by Best"
                            }, void 0, false, {
                                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-8 h-8 animate-spin text-orange-500"
                        }, void 0, false, {
                            fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                            lineNumber: 82,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this) : comments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-12 text-center opacity-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareOff$3e$__["MessageSquareOff"], {
                                className: "w-12 h-12 text-gray-300 dark:text-gray-600 mb-2"
                            }, void 0, false, {
                                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-500 dark:text-gray-400",
                                children: "No comments yet. Be the first to start the conversation!"
                            }, void 0, false, {
                                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                                lineNumber: 87,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentItem"], {
                                comment: comment,
                                problemId: problemId,
                                onRefresh: fetchComments
                            }, comment.id, false, {
                                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                                lineNumber: 92,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-t border-gray-200 dark:border-[#262626] p-4 -mx-6 -mb-6",
                children: session?.user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentInput"], {
                    problemId: problemId,
                    onSuccess: handleRefetch,
                    compact: true
                }, void 0, false, {
                    fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                    lineNumber: 106,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-dashed border-gray-200 dark:border-[#333]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 dark:text-gray-400",
                        children: "Please sign in to join the discussion."
                    }, void 0, false, {
                        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                        lineNumber: 109,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                    lineNumber: 108,
                    columnNumber: 20
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/problems/discussion/CommentTree.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/problems/discussion/CommentTree.tsx",
        lineNumber: 68,
        columnNumber: 9
    }, this);
}
_s(CommentTree, "tEO1brllCqwFuhGWCjUAI8ZTspM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession
    ];
});
_c = CommentTree;
var _c;
__turbopack_context__.k.register(_c, "CommentTree");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/ProblemDescription.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProblemDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$breaks$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-breaks/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rehype-raw/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$Submissions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/Submissions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/points.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/discussion/CommentTree.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2f$SolutionCodeGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/markdown/SolutionCodeGroup.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$markdown$2d$plugins$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/markdown-plugins.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$markdown$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/markdown-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$directive$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-directive/lib/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function ProblemDescription({ problem, activeTab, onTabChange, isSolved, contestId }) {
    _s();
    const [solutionTab, setSolutionTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("official");
    const getDifficultyColor = (difficulty)=>{
        switch(difficulty){
            case "EASY":
                return "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/30";
            case "MEDIUM":
                return "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/30";
            case "HARD":
                return "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/30";
            default:
                return "text-gray-600 bg-gray-50 dark:bg-gray-500/10 border-gray-100 dark:border-gray-500/30";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-white dark:bg-[#0a0a0a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-1 border-b border-gray-300 dark:border-[#262626] border-dashed px-4 py-2 ${contestId ? 'bg-orange-50/30 dark:bg-orange-500/5' : 'bg-gray-50/50 dark:bg-[#0a0a0a]'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onTabChange("description"),
                        className: `flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "description" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, this),
                            "Description"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    !contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "solutions-tab",
                        onClick: ()=>onTabChange("solutions"),
                        className: `flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "solutions" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"} disabled:opacity-50 disabled:cursor-not-allowed`,
                        disabled: problem.difficulty === "CONCEPT",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this),
                            "Solutions"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 55,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onTabChange("submissions"),
                        className: `flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "submissions" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this),
                            contestId ? "My Verdicts" : "Submissions"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2 px-2 py-1 bg-orange-100 dark:bg-orange-500/20 rounded text-orange-700 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, this),
                            "Secure"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 73,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar",
                children: [
                    activeTab === "description" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4",
                                        children: problem.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 85,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`,
                                                children: problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                lineNumber: 87,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-600 dark:text-gray-400 font-medium",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$points$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsLabel"])(problem.difficulty)
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                lineNumber: 90,
                                                columnNumber: 33
                                            }, this),
                                            problem.tags && problem.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 41
                                                    }, this),
                                                    problem.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#262626]",
                                                            children: tag.name
                                                        }, tag.slug, false, {
                                                            fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 45
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                lineNumber: 95,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prose prose-[1rem] max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 select-none prose-code:rounded prose-code:font-mono prose-pre:bg-gray-50 dark:prose-pre:bg-[#141414] prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-[#262626]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    remarkPlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$breaks$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    rehypePlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    children: problem.description
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                    lineNumber: 108,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 107,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, this),
                    activeTab === "submissions" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$Submissions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        problemId: problem.id
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 118,
                        columnNumber: 49
                    }, this),
                    activeTab === "solutions" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-6 border-b border-gray-100 dark:border-[#262626] bg-gray-50/30 dark:bg-[#141414]/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSolutionTab("official"),
                                        className: `py-3 text-sm font-bold border-b-2 transition-colors ${solutionTab === "official" ? "border-orange-500 text-orange-600 dark:text-orange-500" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`,
                                        children: "Official Solution"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSolutionTab("community"),
                                        className: `py-3 text-sm font-bold border-b-2 transition-colors ${solutionTab === "community" ? "border-orange-500 text-orange-600 dark:text-orange-500" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`,
                                        children: "Community"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto px-6 py-6 custom-scrollbar",
                                children: solutionTab === "official" ? isSolved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "prose max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-pre:bg-white dark:prose-pre:bg-[#0a0a0a] prose-pre:p-0 prose-pre:m-0 prose-pre:border-none prose-pre:shadow-none prose-pre:rounded-lg prose-pre:my-6 prose-img:rounded-lg prose-img:border prose-img:border-gray-100 dark:prose-img:border-[#262626] prose-img:my-6 prose-blockquote:border-l-2 prose-blockquote:border-orange-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#1a1a1a] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:not-italic prose-blockquote:my-6",
                                    children: problem.solution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                        remarkPlugins: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$breaks$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$directive$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$markdown$2d$plugins$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["remarkSolutionDirective"]
                                        ],
                                        rehypePlugins: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                        ],
                                        components: {
                                            // @ts-ignore
                                            'solution-group': __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2f$SolutionCodeGroup$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$markdown$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preprocessMarkdown"])(problem.solution)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 151,
                                        columnNumber: 45
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 dark:text-gray-400 italic text-center py-10",
                                        children: "No official solution has been provided for this problem yet."
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                        lineNumber: 167,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                    lineNumber: 141,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center py-20 px-10 text-center space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-gray-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                className: "w-8 h-8 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                                lineNumber: 175,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                            lineNumber: 174,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-gray-900 dark:text-gray-100",
                                            children: "Solution Locked"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                            lineNumber: 177,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 max-w-xs",
                                            children: "You need to successfully solve this problem to unlock the official solution."
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                            lineNumber: 178,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                    lineNumber: 173,
                                    columnNumber: 37
                                }, this) : // Community Tab
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$discussion$2f$CommentTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentTree"], {
                                    problemId: problem.id
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                    lineNumber: 185,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ProblemDescription.tsx",
                        lineNumber: 121,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/ProblemDescription.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/ProblemDescription.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_s(ProblemDescription, "PHTJKZioxgttY+KpWHcUrS5nYMs=");
_c = ProblemDescription;
var _c;
__turbopack_context__.k.register(_c, "ProblemDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/languages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/DriverCodeModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DriverCodeModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/languages.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Dynamically import Monaco Editor to prevent SSR issues
const Editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.default), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-6 h-6 text-orange-500 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/workspace/DriverCodeModal.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = Editor;
function DriverCodeModal({ isOpen, onClose, driverCode, languageId }) {
    _s();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLanguageById"])(languageId);
    const theme = resolvedTheme === "dark" ? "vs-dark" : "vs-light";
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverCodeModal.useEffect": ()=>{
            const handleClickOutside = {
                "DriverCodeModal.useEffect.handleClickOutside": (event)=>{
                    if (modalRef.current && !modalRef.current.contains(event.target)) {
                        onClose();
                    }
                }
            }["DriverCodeModal.useEffect.handleClickOutside"];
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return ({
                "DriverCodeModal.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["DriverCodeModal.useEffect"];
        }
    }["DriverCodeModal.useEffect"], [
        isOpen,
        onClose
    ]);
    // Prevent body scroll when open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverCodeModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
        }
    }["DriverCodeModal.useEffect"], [
        isOpen
    ]);
    const handleCopy = ()=>{
        navigator.clipboard.writeText(driverCode);
        setIsCopied(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Driver code copied to clipboard", {
            className: "rounded-xl border border-gray-200 dark:border-white/10 shadow-lg"
        });
        setTimeout(()=>setIsCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                ref: modalRef,
                initial: {
                    opacity: 0,
                    scale: 0.95,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    scale: 0.95,
                    y: 10
                },
                transition: {
                    duration: 0.2
                },
                className: "w-full max-w-4xl h-[80vh] bg-white dark:bg-[#141414] rounded-xl shadow-2xl border border-gray-200 dark:border-[#262626] overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                            className: "w-5 h-5 text-orange-600 dark:text-orange-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                            lineNumber: 98,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                                                children: "Driver Code"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 dark:text-gray-400",
                                                children: "This is the code that runs your solution"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                                lineNumber: 104,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCopy,
                                        className: "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors flex items-center gap-2 text-sm font-medium",
                                        children: [
                                            isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                                lineNumber: 114,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                                lineNumber: 114,
                                                columnNumber: 65
                                            }, this),
                                            isCopied ? "Copied" : "Copy"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-6 bg-gray-200 dark:bg-[#333] mx-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                            lineNumber: 122,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative bg-white dark:bg-[#1e1e1e]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Editor, {
                            height: "100%",
                            language: currentLanguage?.monacoLanguage || "plaintext",
                            value: driverCode,
                            theme: theme,
                            options: {
                                readOnly: true,
                                minimap: {
                                    enabled: false
                                },
                                fontSize: 14,
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: {
                                    top: 16,
                                    bottom: 16
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                            lineNumber: 129,
                            columnNumber: 18
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-3 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-[#262626] flex justify-between items-center text-xs text-gray-500 dark:text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Read-only mode"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                lineNumber: 148,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "px-4 py-2 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                                lineNumber: 149,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/DriverCodeModal.tsx",
                lineNumber: 86,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/workspace/DriverCodeModal.tsx",
            lineNumber: 85,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/workspace/DriverCodeModal.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(DriverCodeModal, "Z2qLwOUibEyHaPMAP3lfHmHBHmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c1 = DriverCodeModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "Editor");
__turbopack_context__.k.register(_c1, "DriverCodeModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCodeDraft",
    ()=>getCodeDraft,
    "getDB",
    ()=>getDB,
    "saveCodeDraft",
    ()=>saveCodeDraft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dexie/import-wrapper.mjs [app-client] (ecmascript)");
;
const EXPIRATION_TIME_MS = 6 * 60 * 60 * 1000; // 6 hours
const DB_NAME = 'AlgoFoxDB';
class AlgoFoxDB extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    codeDrafts;
    constructor(){
        super(DB_NAME);
        // Version 2: new schema with id as primary key
        // Start directly at version 2 to avoid primary key migration issues
        this.version(2).stores({
            codeDrafts: 'id, problemId, languageId, updatedAt'
        });
    }
}
// Only create database instance on client side (browser)
let db = null;
function getDB() {
    // Only create database in browser environment
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!db) {
        db = new AlgoFoxDB();
        // Initialize database with error handling for schema migration
        db.open().catch(async (error)=>{
            // If migration fails due to primary key change, delete and recreate
            if (error.name === 'UpgradeError' || error.message?.includes('primary key') || error.message?.includes('Not yet support for changing primary key')) {
                console.warn('Database schema migration failed, recreating database...');
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(DB_NAME);
                    // Reload page to reinitialize with new schema
                    if ("TURBOPACK compile-time truthy", 1) {
                        window.location.reload();
                    }
                } catch (deleteError) {
                    console.error('Failed to recreate database:', deleteError);
                }
            } else {
                console.error('Failed to open database:', error);
            }
        });
    }
    return db;
}
;
async function saveCodeDraft(userId, problemId, languageId, code) {
    // Only save in browser environment
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !userId) {
        return;
    }
    try {
        const db = getDB();
        if (!db.isOpen()) {
            await db.open();
        }
        const now = Date.now();
        const id = `${userId}_${problemId}_${languageId}`;
        // Clean up expired entries (optimistic, don't wait)
        db.codeDrafts.where('updatedAt').below(now - EXPIRATION_TIME_MS).delete();
        // Also verify if we need to migrate/cleanup old format entries (optional but nice)
        // For now, simple key change is sufficient to segregate data.
        await db.codeDrafts.put({
            id,
            problemId,
            languageId,
            code,
            updatedAt: now
        });
    } catch (error) {
        // If still failing, just log and continue (database will be recreated on reload)
        console.error('Failed to save code draft:', error);
    }
}
async function getCodeDraft(userId, problemId, languageId) {
    // Only get in browser environment
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !userId) {
        return null;
    }
    try {
        const db = getDB();
        if (!db.isOpen()) {
            await db.open();
        }
        const id = `${userId}_${problemId}_${languageId}`;
        const draft = await db.codeDrafts.get(id);
        if (!draft) return null;
        const now = Date.now();
        if (now - draft.updatedAt > EXPIRATION_TIME_MS) {
            // Expired
            await db.codeDrafts.delete(id);
            return null;
        }
        return draft.code;
    } catch (error) {
        // Log error but don't throw - return null to allow app to continue
        console.error('Failed to get code draft:', error);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/CodeEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/text-align-start.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$DriverCodeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/DriverCodeModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/languages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Dynamically import Monaco Editor to prevent SSR issues
const Editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.default), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-6 h-6 text-orange-500 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/workspace/CodeEditor.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/workspace/CodeEditor.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = Editor;
const LANGUAGE_STORAGE_KEY = "algofox_selected_language";
const SQL_LANGUAGE_ID = 82; // SQL language ID
const AUTOSAVE_DELAY = 1000; // 1 second
function CodeEditor({ onChange, onLanguageChange, defaultValue, value: controlledValue, languageId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE_ID"], problemId, domain, functionTemplates, readOnly = false, settings, onOpenSettings, userId = "" }) {
    _s();
    // Get system theme
    const { resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    // Determine the effective Monaco theme - use system dark mode if settings.theme not explicitly set
    const effectiveTheme = settings?.theme || (resolvedTheme === "dark" ? "vs-dark" : "vs-light");
    // Filter languages based on domain: SQL problems only show SQL language
    const availableLanguages = domain === "SQL" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGES"].filter((lang)=>lang.id === SQL_LANGUAGE_ID) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGES"].filter((lang)=>lang.id !== SQL_LANGUAGE_ID);
    // For SQL problems, default to SQL language
    const effectiveLanguageId = domain === "SQL" ? languageId === SQL_LANGUAGE_ID ? languageId : SQL_LANGUAGE_ID : languageId;
    // We rely on the parent key={languageId} to remount this component when language changes
    // sc so we can use languageId prop directly.
    const currentLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLanguageById"])(effectiveLanguageId) || availableLanguages[0];
    // Helper: get the boilerplate for the current language
    // If function template exists for this language, use it; otherwise use default
    const getBoilerplate = ()=>{
        if (domain === "SQL") return "";
        // Check if we have a function template for this language
        if (functionTemplates && functionTemplates.length > 0) {
            const template = functionTemplates.find((t)=>t.languageId === effectiveLanguageId);
            if (template && template.functionTemplate) {
                return template.functionTemplate;
            }
        }
        // Fall back to default boilerplate from languages.ts
        return currentLanguage.boilerplate;
    };
    const getDriverCode = ()=>{
        if (domain === "SQL") return null;
        if (functionTemplates && functionTemplates.length > 0) {
            const template = functionTemplates.find((t)=>t.languageId === effectiveLanguageId);
            if (template && template.driverCode) {
                return template.driverCode;
            }
        }
        return null;
    };
    const currentDriverCode = getDriverCode();
    // Initialize code state
    // If readOnly, prioritize controlledValue.
    // Else, use domain/boilerplate logic.
    const initialCode = readOnly && controlledValue !== undefined ? controlledValue : domain === "SQL" ? defaultValue || "" : defaultValue || getBoilerplate();
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCode);
    const [isDropdownOpen, setIsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const editorRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const saveTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isRestoring, setIsRestoring] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editorError, setEditorError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mountRetryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const MAX_RETRIES = 3;
    // Initialize loading state: ALWAYS FALSE for Optimistic UI
    // We want the editor to show up immediately.
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const editorContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isFullScreen, setIsFullScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDriverCodeModalOpen, setIsDriverCodeModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Track component mount state with a small delay to ensure DOM is ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            // Small delay to ensure Monaco services are ready
            const timer = setTimeout({
                "CodeEditor.useEffect.timer": ()=>{
                    setIsMounted(true);
                }
            }["CodeEditor.useEffect.timer"], 50);
            return ({
                "CodeEditor.useEffect": ()=>{
                    clearTimeout(timer);
                    setIsMounted(false);
                    setEditorError(false);
                    mountRetryRef.current = 0;
                    // Clean up editor ref - improved disposal logic
                    if (editorRef.current) {
                        try {
                            const editor = editorRef.current;
                            // Check if editor has a model before attempting disposal
                            if (editor && typeof editor.getModel === "function") {
                                const model = editor.getModel();
                                // Only dispose if model exists and is not already disposed
                                if (model && typeof model.isDisposed === "function" && !model.isDisposed()) {
                                    // Dispose the model first
                                    if (typeof model.dispose === "function") {
                                        try {
                                            model.dispose();
                                        } catch (e) {
                                        // Silently ignore model disposal errors
                                        }
                                    }
                                }
                            }
                            // Then dispose the editor itself
                            if (typeof editor.dispose === "function") {
                                try {
                                    editor.dispose();
                                } catch (e) {
                                // Silently ignore editor disposal errors
                                }
                            }
                        } catch (error) {
                        // Ignore all disposal errors - they're harmless during unmount
                        } finally{
                            editorRef.current = null;
                        }
                    }
                }
            })["CodeEditor.useEffect"];
        }
    }["CodeEditor.useEffect"], []);
    // Suppress Monaco Editor cancellation and disposal errors (they're harmless)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            const handleUnhandledRejection = {
                "CodeEditor.useEffect.handleUnhandledRejection": (event)=>{
                    const reason = event.reason;
                    const reasonStr = reason?.toString() || "";
                    const reasonMsg = reason?.message || "";
                    // Suppress Monaco Editor errors
                    if (reasonMsg === "Canceled" || reasonStr.includes("Canceled") || reasonStr.includes("InstantiationService has been disposed") || reasonMsg.includes("InstantiationService has been disposed") || reasonStr.includes("domNode") || reasonMsg.includes("domNode")) {
                        event.preventDefault();
                        // Retry mounting if component is still mounted
                        if (isMounted && mountRetryRef.current < MAX_RETRIES) {
                            mountRetryRef.current++;
                            setTimeout({
                                "CodeEditor.useEffect.handleUnhandledRejection": ()=>{
                                    if (isMounted) {
                                        setEditorError(false);
                                    }
                                }
                            }["CodeEditor.useEffect.handleUnhandledRejection"], 100 * mountRetryRef.current);
                        }
                        return;
                    }
                }
            }["CodeEditor.useEffect.handleUnhandledRejection"];
            const handleError = {
                "CodeEditor.useEffect.handleError": (event)=>{
                    const message = event.message || "";
                    if (message.includes("InstantiationService") || message.includes("domNode") || message.includes("Monaco")) {
                        event.preventDefault();
                        return true;
                    }
                    return false;
                }
            }["CodeEditor.useEffect.handleError"];
            window.addEventListener("unhandledrejection", handleUnhandledRejection);
            window.addEventListener("error", handleError);
            return ({
                "CodeEditor.useEffect": ()=>{
                    window.removeEventListener("unhandledrejection", handleUnhandledRejection);
                    window.removeEventListener("error", handleError);
                }
            })["CodeEditor.useEffect"];
        }
    }["CodeEditor.useEffect"], [
        isMounted
    ]);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
                }
            }
            if (isDropdownOpen) {
                document.addEventListener("mousedown", handleClickOutside);
                return ({
                    "CodeEditor.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
                })["CodeEditor.useEffect"];
            }
        }
    }["CodeEditor.useEffect"], [
        isDropdownOpen
    ]);
    // Handle full screen change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            const handleFullScreenChange = {
                "CodeEditor.useEffect.handleFullScreenChange": ()=>{
                    setIsFullScreen(document.fullscreenElement === editorContainerRef.current);
                }
            }["CodeEditor.useEffect.handleFullScreenChange"];
            document.addEventListener("fullscreenchange", handleFullScreenChange);
            return ({
                "CodeEditor.useEffect": ()=>document.removeEventListener("fullscreenchange", handleFullScreenChange)
            })["CodeEditor.useEffect"];
        }
    }["CodeEditor.useEffect"], []);
    // LOAD SAVED CODE (Only if NOT readOnly)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            if (readOnly) return; // Skip loading draft if read-only
            let isMounted = true;
            let cancelled = false;
            // If no problemId, we are good with just the initial state (boilerplate)
            if (!problemId) {
                // ... (keeping existing logic for no problemId)
                // If no problemId, set code based on domain
                if (domain === "SQL") {
                    setCode("");
                    if (editorRef.current && isMounted) {
                        try {
                            const editor = editorRef.current;
                            const model = editor.getModel?.();
                            if (model && !model.isDisposed()) {
                                editor.setValue("");
                            }
                        } catch (error) {
                            console.debug("setValue error (safe to ignore):", error);
                        }
                    }
                    if (onChange) onChange("");
                } else {
                    const langBoilerplate = getBoilerplate();
                    setCode(langBoilerplate);
                    if (editorRef.current && isMounted) {
                        try {
                            const editor = editorRef.current;
                            const model = editor.getModel?.();
                            if (model && !model.isDisposed()) {
                                editor.setValue(langBoilerplate);
                            }
                        } catch (error) {
                            console.debug("setValue error (safe to ignore):", error);
                        }
                    }
                    if (onChange) onChange(langBoilerplate);
                }
                return;
            }
            async function loadDraft(retryCount = 0) {
                // For SQL, if no saved code, just set empty and return immediately
                // NOTE: We do NOT set isLoading to true here anymore
                try {
                    if (retryCount === 0) setIsRestoring(true); // Helper spinner can still show
                    // Fetch draft in background
                    const savedCode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCodeDraft"])(userId, problemId, effectiveLanguageId);
                    // Check if component is still mounted and effect hasn't been cancelled
                    if (!isMounted || cancelled) {
                        setIsRestoring(false);
                        return;
                    }
                    // Logic to set code if savedCode exists
                    // If it's a retry and we still don't have it, try again
                    if (!savedCode && retryCount === 0) {
                        await new Promise({
                            "CodeEditor.useEffect.loadDraft": (resolve)=>setTimeout(resolve, 200)
                        }["CodeEditor.useEffect.loadDraft"]);
                        if (!isMounted || cancelled) {
                            setIsRestoring(false);
                            return;
                        }
                        return loadDraft(1);
                    }
                    // If we found saved code, update the editor!
                    if (savedCode) {
                        // Only toast if the saved code is different from what's currently shown (boilerplate)
                        // This prevents annoying toasts if they match
                        //  toast.info("Draft restored");
                        const codeToSet = savedCode;
                        setCode(codeToSet);
                        if (editorRef.current) {
                            try {
                                const editor = editorRef.current;
                                const model = editor.getModel?.();
                                if (model && !model.isDisposed()) {
                                    const currentContent = editor.getValue();
                                    if (currentContent !== codeToSet) {
                                        editor.setValue(codeToSet);
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Saved draft restored");
                                    }
                                }
                            } catch (error) {
                                console.debug("setValue error (safe to ignore):", error);
                            }
                        }
                        if (onChange) onChange(codeToSet);
                    }
                // If NO saved code, we implicitly stick with the boilerplate we already showed.
                // No need to "clear" it unless it's SQL maybe?
                } catch (error) {
                    console.error("Failed to load code draft:", error);
                // On error, we just keep the boilerplate.
                } finally{
                    if (isMounted && !cancelled) {
                        setIsRestoring(false);
                    // setIsLoading(false); // No longer used
                    }
                }
            }
            loadDraft();
            return ({
                "CodeEditor.useEffect": ()=>{
                    isMounted = false;
                    cancelled = true;
                }
            })["CodeEditor.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CodeEditor.useEffect"], [
        problemId,
        effectiveLanguageId,
        readOnly,
        isMounted,
        userId
    ]);
    // HANDLE AUTOSAVE (Only if NOT readOnly)
    const debouncedSave = (value)=>{
        if (!problemId || readOnly) return; // Skip saving logic entirely if readOnly
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(async ()=>{
            setIsSaving(true);
            try {
                // Save to DB and wait for at least 500ms to show the spinner
                await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCodeDraft"])(userId, problemId, effectiveLanguageId, value),
                    new Promise((resolve)=>setTimeout(resolve, 500))
                ]);
            } catch (err) {
                console.error("Autosave failed:", err);
            } finally{
                setIsSaving(false);
            }
        }, AUTOSAVE_DELAY);
    };
    const handleLanguageChange = (newLanguageId)=>{
        // In read-only mode, we likely disable changing lang, but if allowed:
        if (newLanguageId === effectiveLanguageId) {
            setIsDropdownOpen(false);
            return;
        }
        setIsDropdownOpen(false);
        if (onLanguageChange) {
            onLanguageChange(newLanguageId);
        }
    };
    const handleEditorDidMount = (editor, monaco)=>{
        if (!isMounted) return;
        try {
            editorRef.current = editor;
            setEditorError(false);
            mountRetryRef.current = 0;
            // SECURE COPY/PASTE LOGIC
            // We generate a unique session token for this editor instance
            const SESSION_TOKEN_KEY = "algofox_secure_token";
            const instanceToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
            // We attach to the CONTAINER (editorContainerRef) for robust capture.
            // 1. Mark container as allowed for DevToolsBlocker
            if (editorContainerRef.current) {
                const container = editorContainerRef.current;
                container.setAttribute("data-allow-clipboard", "true");
                // Also allow internal domNode just to be safe with traversal logic
                const domNode = editor.getDomNode();
                if (domNode) {
                    domNode.setAttribute("data-allow-clipboard", "true");
                }
                // 2. Attach Capture Phase Listeners
                // We must remove previous listeners to avoid duplicates on re-mounts if any,
                // but since this is a functional component mount, simple addEventListener is fine
                // (closure captures unique instanceToken).
                const handleCopy = (e)=>{
                    if (e.clipboardData) {
                        const selection = editor.getModel()?.getValueInRange(editor.getSelection());
                        if (selection) {
                            e.clipboardData.setData('text/plain', selection);
                            // Inject our secure token
                            e.clipboardData.setData('application/x-algofox-token', instanceToken);
                            e.preventDefault();
                        }
                    }
                };
                const handleCut = (e)=>{
                    if (e.clipboardData) {
                        const selection = editor.getModel()?.getValueInRange(editor.getSelection());
                        if (selection) {
                            e.clipboardData.setData('text/plain', selection);
                            e.clipboardData.setData('application/x-algofox-token', instanceToken);
                            e.preventDefault();
                            editor.trigger('source', 'cut', {});
                        }
                    }
                };
                const handlePaste = (e)=>{
                    // Parse token
                    const token = e.clipboardData?.getData('application/x-algofox-token');
                    if (token === instanceToken) {
                        // Verified! Allow to succeed.
                        return;
                    } else {
                        // External or Invalid
                        e.preventDefault();
                        e.stopPropagation();
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Paste blocked: You can only paste code copied from this editor.");
                    }
                };
                container.addEventListener("copy", handleCopy, true);
                container.addEventListener("cut", handleCut, true);
                container.addEventListener("paste", handlePaste, true);
            // Note: In a production app, we should save these handler refs to remove them in cleanup
            // but for now relying on component unmount and container lifecycle is acceptable
            }
            // In readOnly mode, the editor might strictly follow `value` prop if we passed one,
            // but setting it explicitly ensures it matches state.
            if (code && editor) {
                try {
                    const model = editor.getModel?.();
                    if (model && !model.isDisposed()) {
                        editor.setValue(code);
                    }
                } catch (error) {
                    // Editor might be disposed, ignore
                    console.debug("Editor setValue error (safe to ignore):", error);
                }
            }
        } catch (error) {
            console.debug("Editor mount error (safe to ignore):", error);
            // Retry mounting if we haven't exceeded max retries
            if (mountRetryRef.current < MAX_RETRIES && isMounted) {
                mountRetryRef.current++;
                setTimeout(()=>{
                    if (isMounted) {
                        setEditorError(false);
                    }
                }, 100 * mountRetryRef.current);
            } else {
                setEditorError(true);
            }
        }
    };
    const handleEditorWillMount = (monaco)=>{
        // Ensure Monaco is ready before mounting
        if (!isMounted) return;
    };
    // Cleanup editor on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditor.useEffect": ()=>{
            return ({
                "CodeEditor.useEffect": ()=>{
                    if (editorRef.current) {
                        try {
                            const editor = editorRef.current;
                            // Check if editor has a model before attempting disposal
                            if (editor && typeof editor.getModel === "function") {
                                const model = editor.getModel();
                                // Only dispose if model exists and is not already disposed
                                if (model && typeof model.isDisposed === "function" && !model.isDisposed()) {
                                    // Dispose the model first
                                    if (typeof model.dispose === "function") {
                                        try {
                                            model.dispose();
                                        } catch (e) {
                                        // Silently ignore model disposal errors
                                        }
                                    }
                                }
                            }
                            // Then dispose the editor itself
                            if (typeof editor.dispose === "function") {
                                try {
                                    editor.dispose();
                                } catch (e) {
                                // Silently ignore editor disposal errors
                                }
                            }
                        } catch (error) {
                        // Ignore all disposal errors
                        } finally{
                            editorRef.current = null;
                        }
                    }
                    // Clear any pending save operations
                    if (saveTimeoutRef.current) {
                        clearTimeout(saveTimeoutRef.current);
                        saveTimeoutRef.current = null;
                    }
                }
            })["CodeEditor.useEffect"];
        }
    }["CodeEditor.useEffect"], []);
    const handleFormat = ()=>{
        if (editorRef.current) {
            try {
                const editor = editorRef.current;
                const model = editor.getModel?.();
                // Check if editor and model are still valid
                if (model && !model.isDisposed()) {
                    editor.getAction("editor.action.formatDocument")?.run();
                }
            } catch (error) {
                console.debug("Format error (safe to ignore):", error);
            }
        }
    };
    const handleReset = ()=>{
        if (readOnly) return; // Disable reset in read-only
        const resetCode = domain === "SQL" ? "" : getBoilerplate();
        setCode(resetCode);
        if (onChange) onChange(resetCode);
        if (editorRef.current) {
            try {
                const editor = editorRef.current;
                const model = editor.getModel?.();
                // Check if editor and model are still valid
                if (model && !model.isDisposed()) {
                    editor.setValue(resetCode);
                }
            } catch (error) {
                console.debug("Reset error (safe to ignore):", error);
            }
        }
        if (problemId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCodeDraft"])(userId, problemId, effectiveLanguageId, resetCode).then(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Code reset to default");
            });
        }
    };
    const handleFullScreen = ()=>{
        if (!editorContainerRef.current) return;
        if (!document.fullscreenElement) {
            editorContainerRef.current.requestFullscreen().catch((err)=>{
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: editorContainerRef,
        className: `h-full flex flex-col bg-white dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-[#262626] ${isFullScreen ? "fixed inset-0 z-50" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: dropdownRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "language-dropdown",
                                        onClick: ()=>!readOnly && setIsDropdownOpen(!isDropdownOpen),
                                        disabled: readOnly,
                                        className: `flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors ${readOnly ? "opacity-70 cursor-default" : "hover:bg-gray-200 dark:hover:bg-[#262626]"}`,
                                        children: [
                                            currentLanguage.name,
                                            !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: `w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                                lineNumber: 699,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 687,
                                        columnNumber: 13
                                    }, this),
                                    isDropdownOpen && !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-0 mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-lg shadow-lg z-50 min-w-30",
                                        children: availableLanguages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleLanguageChange(lang.id),
                                                className: `w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors first:rounded-t-lg last:rounded-b-lg ${effectiveLanguageId === lang.id ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300"}`,
                                                children: lang.name
                                            }, lang.id, false, {
                                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                                lineNumber: 709,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 707,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 686,
                                columnNumber: 11
                            }, this),
                            currentDriverCode && !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsDriverCodeModalOpen(true),
                                className: "flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors",
                                title: "View Driver Code",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                        className: "w-3.5 h-3.5 text-orange-600 dark:text-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 732,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "View Driver Code"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 733,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this),
                            isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 text-xs text-orange-500 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-3 h-3 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 739,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Saving..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                                        lineNumber: 740,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 685,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-gray-500",
                        children: [
                            isRestoring && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-3 h-3 animate-spin text-gray-400 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 747,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleFormat,
                                className: "p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400",
                                title: "Format Code",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                                    lineNumber: 754,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 749,
                                columnNumber: 11
                            }, this),
                            !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleReset,
                                className: "p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400",
                                title: "Reset to Default",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                                    lineNumber: 762,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 757,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleFullScreen,
                                className: "p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400",
                                title: isFullScreen ? "Exit Full Screen" : "Full Screen",
                                children: isFullScreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                                    lineNumber: 771,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                                    lineNumber: 773,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 765,
                                columnNumber: 11
                            }, this),
                            !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onOpenSettings,
                                className: "p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400",
                                title: "Editor Settings",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 777,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 745,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/CodeEditor.tsx",
                lineNumber: 684,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-8 h-8 text-orange-500 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 793,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 dark:text-gray-400 font-medium",
                                children: "Loading your code..."
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 794,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 792,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                    lineNumber: 791,
                    columnNumber: 11
                }, this) : editorError && mountRetryRef.current >= MAX_RETRIES ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-3 text-center p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 dark:text-gray-400 font-medium",
                                children: "Editor failed to load. Please refresh the page."
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 802,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setEditorError(false);
                                    mountRetryRef.current = 0;
                                    setIsMounted(true);
                                },
                                className: "px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium",
                                children: "Retry"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 805,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 801,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                    lineNumber: 800,
                    columnNumber: 11
                }, this) : isMounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Editor, {
                    height: "100%",
                    language: currentLanguage.monacoLanguage,
                    value: code,
                    theme: effectiveTheme,
                    onMount: handleEditorDidMount,
                    beforeMount: handleEditorWillMount,
                    onChange: (value)=>{
                        if (!isMounted) return;
                        const newVal = value || "";
                        setCode(newVal);
                        if (onChange) onChange(newVal);
                        debouncedSave(newVal);
                    },
                    options: {
                        minimap: {
                            enabled: false
                        },
                        fontSize: settings?.fontSize || 19,
                        lineNumbers: "on",
                        roundedSelection: true,
                        scrollBeyondLastLine: false,
                        readOnly: readOnly,
                        automaticLayout: true,
                        padding: {
                            top: 16
                        },
                        tabSize: settings?.tabSize || 4
                    },
                    loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 text-orange-500 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/CodeEditor.tsx",
                            lineNumber: 848,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 847,
                        columnNumber: 15
                    }, void 0),
                    onValidate: ()=>{}
                }, `editor-${effectiveLanguageId}-${problemId || "no-problem"}-${mountRetryRef.current}`, false, {
                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                    lineNumber: 818,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-8 h-8 text-orange-500 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 856,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 dark:text-gray-400 font-medium",
                                children: "Initializing editor..."
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/CodeEditor.tsx",
                                lineNumber: 857,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/CodeEditor.tsx",
                        lineNumber: 855,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/workspace/CodeEditor.tsx",
                    lineNumber: 854,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/workspace/CodeEditor.tsx",
                lineNumber: 789,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$DriverCodeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isDriverCodeModalOpen,
                onClose: ()=>setIsDriverCodeModalOpen(false),
                languageId: effectiveLanguageId,
                driverCode: currentDriverCode || ""
            }, void 0, false, {
                fileName: "[project]/components/workspace/CodeEditor.tsx",
                lineNumber: 865,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/CodeEditor.tsx",
        lineNumber: 677,
        columnNumber: 5
    }, this);
}
_s(CodeEditor, "hNDb1GevsVq51HI1FqtbG+sIhgQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c1 = CodeEditor;
var _c, _c1;
__turbopack_context__.k.register(_c, "Editor");
__turbopack_context__.k.register(_c1, "CodeEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:dc4b17 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7047c436e22e056715bf68b1900859a27784c3ce69":"getProblemStats"},"actions/analytics.ts",""] */ __turbopack_context__.s([
    "getProblemStats",
    ()=>getProblemStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getProblemStats = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7047c436e22e056715bf68b1900859a27784c3ce69", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getProblemStats"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYW5hbHl0aWNzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyVG9waWNTdGF0cyh1c2VySWQ/OiBzdHJpbmcpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICB9KTtcbiAgY29uc3QgdGFyZ2V0VXNlcklkID0gdXNlcklkIHx8IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGlmICghdGFyZ2V0VXNlcklkKSByZXR1cm4gbnVsbDtcblxuICAvLyBGZXRjaCBhbGwgYWNjZXB0ZWQgc3VibWlzc2lvbnMgd2l0aCBwcm9ibGVtIHRhZ3NcbiAgY29uc3Qgc3VibWlzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc3VibWlzc2lvbi5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIHVzZXJJZDogdGFyZ2V0VXNlcklkLFxuICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCIsXG4gICAgfSxcbiAgICBpbmNsdWRlOiB7XG4gICAgICBwcm9ibGVtOiB7XG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICB0YWdzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICAvLyBBZ2dyZWdhdGUgYnkgdGFnXG4gIGNvbnN0IHRhZ0NvdW50czogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB0b3RhbFNvbHZlZCA9IHN1Ym1pc3Npb25zLmxlbmd0aDtcblxuICBzdWJtaXNzaW9ucy5mb3JFYWNoKChzdWIpID0+IHtcbiAgICBzdWIucHJvYmxlbS50YWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgdGFnQ291bnRzW3RhZy5uYW1lXSA9ICh0YWdDb3VudHNbdGFnLm5hbWVdIHx8IDApICsgMTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQ29udmVydCB0byBhcnJheSBhbmQgdGFrZSB0b3AgNlxuICBjb25zdCBkYXRhID0gT2JqZWN0LmVudHJpZXModGFnQ291bnRzKVxuICAgIC5tYXAoKFtzdWJqZWN0LCBjb3VudF0pID0+ICh7XG4gICAgICBzdWJqZWN0LCAvLyBUYWcgbmFtZVxuICAgICAgQTogY291bnQsIC8vIFVzZXIncyBjb3VudFxuICAgICAgZnVsbE1hcms6IE1hdGgubWF4KGNvdW50ICogMS41LCAxMCksIC8vIEFyYml0cmFyeSBzY2FsaW5nIGZvciBjaGFydCB2aXN1YWxcbiAgICB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi5BIC0gYS5BKVxuICAgIC5zbGljZSgwLCA2KTsgLy8gVG9wIDYgdGFnc1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclByb2dyZXNzSGlzdG9yeSh1c2VySWQ/OiBzdHJpbmcpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICB9KTtcbiAgY29uc3QgdGFyZ2V0VXNlcklkID0gdXNlcklkIHx8IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGlmICghdGFyZ2V0VXNlcklkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmZpbmRNYW55KHtcbiAgICB3aGVyZToge1xuICAgICAgdXNlcklkOiB0YXJnZXRVc2VySWQsXG4gICAgICBzdGF0dXM6IFwiQUNDRVBURURcIixcbiAgICB9LFxuICAgIG9yZGVyQnk6IHtcbiAgICAgIGNyZWF0ZWRBdDogXCJhc2NcIixcbiAgICB9LFxuICAgIHNlbGVjdDoge1xuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIEdyb3VwIGJ5IGRhdGUgKGN1bXVsYXRpdmUpXG4gIGNvbnN0IGhpc3Rvcnk6IHsgZGF0ZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXSA9IFtdO1xuICBsZXQgY3VtdWxhdGl2ZSA9IDA7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgc3VibWlzc2lvbnMuZm9yRWFjaCgoc3ViKSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IHN1Yi5jcmVhdGVkQXQudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07IC8vIFlZWVktTU0tRERcbiAgICBtYXAuc2V0KGRhdGUsIChtYXAuZ2V0KGRhdGUpIHx8IDApICsgMSk7XG4gIH0pO1xuXG4gIC8vIENyZWF0ZSBjdW11bGF0aXZlIGRhdGEgcG9pbnRzXG4gIC8vIFdlIGNhbiBqdXN0IHBpY2sgZXZlcnkgYWNjZXB0ZWQgc3VibWlzc2lvbiBhcyBhIHBvaW50LCBvciBncm91cCBieSBkYXlcbiAgLy8gR3JvdXBpbmcgYnkgZGF5IGlzIGNsZWFuZXJcbiAgY29uc3Qgc29ydGVkRGF0ZXMgPSBBcnJheS5mcm9tKG1hcC5rZXlzKCkpLnNvcnQoKTtcblxuICBmb3IgKGNvbnN0IGRhdGUgb2Ygc29ydGVkRGF0ZXMpIHtcbiAgICBjb25zdCBkYWlseUNvdW50ID0gbWFwLmdldChkYXRlKSB8fCAwO1xuICAgIGN1bXVsYXRpdmUgKz0gZGFpbHlDb3VudDtcbiAgICBoaXN0b3J5LnB1c2goe1xuICAgICAgICBkYXRlOiBuZXcgRGF0ZShkYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IG1vbnRoOiBcInNob3J0XCIsIGRheTogXCJudW1lcmljXCIgfSksXG4gICAgICAgIGNvdW50OiBjdW11bGF0aXZlXG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXR1cm4gbGFzdCAzMCBkYXRhIHBvaW50cyB0byBhdm9pZCBjbHV0dGVyLCBvciBzYW1wbGUgdGhlbSBpZiBodWdlXG4gIHJldHVybiBoaXN0b3J5LnNsaWNlKC0zMCk7XG59XG5cbi8vIFBlZXIgQ29tcGFyaXNvbiAoUGVyY2VudGlsZXMpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbVN0YXRzKHByb2JsZW1JZDogc3RyaW5nLCBydW50aW1lOiBudW1iZXIsIG1lbW9yeTogbnVtYmVyKSB7XG4gICAgY29uc3QgdG90YWxTdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHsgcHJvYmxlbUlkLCBzdGF0dXM6IFwiQUNDRVBURURcIiB9XG4gICAgfSk7XG5cbiAgICBpZiAodG90YWxTdWJtaXNzaW9ucyA8PSAxKSByZXR1cm4geyBydW50aW1lUGVyY2VudGlsZTogMTAwLCBtZW1vcnlQZXJjZW50aWxlOiAxMDAgfTtcblxuICAgIC8vIFJ1bnRpbWUgUGVyY2VudGlsZSAoSGlnaGVyIGlzIGJldHRlcilcbiAgICBjb25zdCBzbG93ZXJTdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHByb2JsZW1JZCxcbiAgICAgICAgICAgIHN0YXR1czogXCJBQ0NFUFRFRFwiLFxuICAgICAgICAgICAgdGltZTogeyBndDogcnVudGltZSB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE1lbW9yeSBQZXJjZW50aWxlIChIaWdoZXIgaXMgYmV0dGVyKVxuICAgIGNvbnN0IGhlYXZpZXJTdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHByb2JsZW1JZCxcbiAgICAgICAgICAgIHN0YXR1czogXCJBQ0NFUFRFRFwiLFxuICAgICAgICAgICAgbWVtb3J5OiB7IGd0OiBtZW1vcnkgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBydW50aW1lUGVyY2VudGlsZSA9IE1hdGgucm91bmQoKHNsb3dlclN1Ym1pc3Npb25zIC8gdG90YWxTdWJtaXNzaW9ucykgKiAxMDApO1xuICAgIGNvbnN0IG1lbW9yeVBlcmNlbnRpbGUgPSBNYXRoLnJvdW5kKChoZWF2aWVyU3VibWlzc2lvbnMgLyB0b3RhbFN1Ym1pc3Npb25zKSAqIDEwMCk7XG5cbiAgICByZXR1cm4geyBydW50aW1lUGVyY2VudGlsZSwgbWVtb3J5UGVyY2VudGlsZSB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI2UkFzR3NCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analytics/PeerComparisonCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PeerComparisonCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$dc4b17__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:dc4b17 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PeerComparisonCard({ problemId, runtime, memory = 0 }) {
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PeerComparisonCard.useEffect": ()=>{
            if (problemId) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$dc4b17__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getProblemStats"])(problemId, runtime, memory).then(setStats);
            }
        }
    }["PeerComparisonCard.useEffect"], [
        problemId,
        runtime,
        memory
    ]);
    if (!stats) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl p-5 shadow-sm dark:shadow-none space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                        className: "w-4 h-4 text-orange-500"
                    }, void 0, false, {
                        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    "Submission Performance"
                ]
            }, void 0, true, {
                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-gray-600 dark:text-gray-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: [
                                        "Runtime: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-900 dark:text-gray-200",
                                            children: [
                                                runtime.toFixed(2),
                                                "ms"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                            lineNumber: 35,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                    lineNumber: 35,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-900 dark:text-white",
                                    children: [
                                        "Beats ",
                                        stats.runtimePercentile,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out",
                            style: {
                                width: `${stats.runtimePercentile}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-gray-600 dark:text-gray-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: [
                                        "Memory: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-900 dark:text-gray-200",
                                            children: [
                                                memory.toFixed(1),
                                                "KB"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                            lineNumber: 53,
                                            columnNumber: 63
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                    lineNumber: 53,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-900 dark:text-white",
                                    children: [
                                        "Beats ",
                                        stats.memoryPercentile,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out",
                            style: {
                                width: `${stats.memoryPercentile}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            (stats.runtimePercentile > 80 || stats.memoryPercentile > 80) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-dashed border-gray-200 dark:border-[#333]",
                children: "Incredible! Your solution is highly optimized."
            }, void 0, false, {
                fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
                lineNumber: 68,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analytics/PeerComparisonCard.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
_s(PeerComparisonCard, "QHCAg5+sC7SrLiGx+x4h2IICBFk=");
_c = PeerComparisonCard;
var _c;
__turbopack_context__.k.register(_c, "PeerComparisonCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/TestCases.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestCases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$PeerComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analytics/PeerComparisonCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TestCases({ cases, results, mode, status, problemId }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Check if there's any compilation error or error message
    const hasError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TestCases.useMemo[hasError]": ()=>{
            // If overall status implies error, return true
            if (status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") return true;
            if (!results || results.length === 0) return false;
            // Check if any test case has COMPILE_ERROR status, RUNTIME_ERROR status, or error message
            const hasErr = results.some({
                "TestCases.useMemo[hasError].hasErr": (r)=>r.status === "COMPILE_ERROR" || r.status === "RUNTIME_ERROR" || r.errorMessage && r.errorMessage.trim().length > 0
            }["TestCases.useMemo[hasError].hasErr"]);
            return hasErr;
        }
    }["TestCases.useMemo[hasError]"], [
        results,
        status
    ]);
    const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TestCases.useMemo[errorMessage]": ()=>{
            // If system error (status error but no results), can't get specific message from test cases
            if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
                return "Execution failed. The server might be unreachable or the code caused a fatal system error.";
            }
            if (!results || results.length === 0) return null;
            // Find the first error message (prefer COMPILE_ERROR)
            // For compilation errors, all test cases usually have the same error
            const compileError = results.find({
                "TestCases.useMemo[errorMessage].compileError": (r)=>r.status === "COMPILE_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0
            }["TestCases.useMemo[errorMessage].compileError"]);
            if (compileError?.errorMessage) return compileError.errorMessage.trim();
            const runtimeError = results.find({
                "TestCases.useMemo[errorMessage].runtimeError": (r)=>r.status === "RUNTIME_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0
            }["TestCases.useMemo[errorMessage].runtimeError"]);
            if (runtimeError?.errorMessage) return runtimeError.errorMessage.trim();
            // Try to find any error message
            const anyError = results.find({
                "TestCases.useMemo[errorMessage].anyError": (r)=>r.errorMessage && r.errorMessage.trim().length > 0
            }["TestCases.useMemo[errorMessage].anyError"]);
            if (anyError?.errorMessage) return anyError.errorMessage.trim();
            return null;
        }
    }["TestCases.useMemo[errorMessage]"], [
        results,
        status
    ]);
    // Get error details for console (defined before useEffect that uses it)
    const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TestCases.useMemo[errorDetails]": ()=>{
            // Handle system level errors (no results)
            if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
                return {
                    type: status === "COMPILE_ERROR" ? "Compilation Error" : "Runtime Error",
                    status: status,
                    message: "System Error: The execution environment returned an error without test case details. This often indicates a connection issue with the judge server or a fatal crash.",
                    testCaseIndex: undefined,
                    time: undefined,
                    memory: undefined
                };
            }
            if (!results || results.length === 0) return null;
            // Find error with most details - check for COMPILE_ERROR first (even without errorMessage)
            const compileError = results.find({
                "TestCases.useMemo[errorDetails].compileError": (r)=>r.status === "COMPILE_ERROR"
            }["TestCases.useMemo[errorDetails].compileError"]);
            if (compileError) {
                return {
                    type: "Compilation Error",
                    status: "COMPILE_ERROR",
                    message: compileError.errorMessage || "Compilation failed",
                    testCaseIndex: compileError.index,
                    time: undefined,
                    memory: undefined
                };
            }
            // Find RUNTIME_ERROR (even without errorMessage)
            const runtimeError = results.find({
                "TestCases.useMemo[errorDetails].runtimeError": (r)=>r.status === "RUNTIME_ERROR"
            }["TestCases.useMemo[errorDetails].runtimeError"]);
            if (runtimeError) {
                // Provide more descriptive default message if errorMessage is missing
                const errorMsg = runtimeError.errorMessage?.trim();
                const defaultMsg = errorMsg ? errorMsg : "A runtime error occurred. This usually means:\n- Division by zero\n- Array index out of bounds\n- Null pointer exception\n- Stack overflow\n- Other execution-time errors";
                return {
                    type: "Runtime Error",
                    status: "RUNTIME_ERROR",
                    message: defaultMsg,
                    testCaseIndex: runtimeError.index,
                    time: runtimeError.time,
                    memory: runtimeError.memory
                };
            }
            // Find any error with error message
            const anyError = results.find({
                "TestCases.useMemo[errorDetails].anyError": (r)=>r.errorMessage && r.errorMessage.trim().length > 0
            }["TestCases.useMemo[errorDetails].anyError"]);
            if (anyError) {
                return {
                    type: "Error",
                    status: anyError.status,
                    message: anyError.errorMessage,
                    testCaseIndex: anyError.index,
                    time: anyError.time,
                    memory: anyError.memory
                };
            }
            // Find any error status (even without message)
            const anyErrorStatus = results.find({
                "TestCases.useMemo[errorDetails].anyErrorStatus": (r)=>r.status !== "ACCEPTED" && r.status !== "PENDING" && (r.status === "WRONG_ANSWER" || r.status === "TIME_LIMIT_EXCEEDED" || r.status === "MEMORY_LIMIT_EXCEEDED")
            }["TestCases.useMemo[errorDetails].anyErrorStatus"]);
            if (anyErrorStatus) {
                return {
                    type: anyErrorStatus.status.replace(/_/g, " "),
                    status: anyErrorStatus.status,
                    message: anyErrorStatus.errorMessage || `${anyErrorStatus.status.replace(/_/g, " ")} occurred`,
                    testCaseIndex: anyErrorStatus.index,
                    time: anyErrorStatus.time,
                    memory: anyErrorStatus.memory
                };
            }
            return null;
        }
    }["TestCases.useMemo[errorDetails]"], [
        results,
        status
    ]);
    // Auto-switch to console tab when error is first detected
    // Reset to first test case when results are cleared
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestCases.useEffect": ()=>{
            if (!results || results.length === 0) {
                // No results, go back to first test case
                setActiveTab(0);
            } else if (hasError) {
                // Always switch to console when there's an error
                // This ensures runtime errors are visible
                setActiveTab("console");
            }
        }
    }["TestCases.useEffect"], [
        hasError,
        results
    ]);
    // Calculate runtime and memory
    const { submissionRuntime, submissionMemory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TestCases.useMemo": ()=>{
            if (!results || status !== "ACCEPTED") return {
                submissionRuntime: 0,
                submissionMemory: 0
            };
            const time = results.reduce({
                "TestCases.useMemo.time": (acc, curr)=>acc + (curr.time || 0)
            }["TestCases.useMemo.time"], 0);
            const mem = results.reduce({
                "TestCases.useMemo.mem": (max, curr)=>Math.max(max, curr.memory || 0)
            }["TestCases.useMemo.mem"], 0);
            return {
                submissionRuntime: time,
                submissionMemory: mem
            };
        }
    }["TestCases.useMemo"], [
        results,
        status
    ]);
    // Ensure cases is always an array
    const safeCases = cases || [];
    // Filter to show only public (non-hidden) test cases in the UI
    const publicCases = safeCases.filter((tc)=>!tc.hidden);
    // Determine which test cases to display:
    // - If no results: show only public test cases
    // - If results exist and mode is SUBMIT: show all test cases (public + hidden) but hide contents
    // - If results exist and mode is RUN: show only public test cases (map results to public cases)
    let displayCases;
    let totalCount;
    let resultsMap = null;
    if (results && results.length > 0) {
        // Create a map of original index -> result for easier lookup
        resultsMap = new Map(results.map((r)=>[
                r.index,
                r
            ]));
        if (mode === "SUBMIT") {
            // For SUBMIT mode, show all test cases (we'll hide contents for hidden ones)
            displayCases = safeCases;
            totalCount = safeCases.length;
        } else {
            // For RUN mode, show only public test cases
            // Results are stored with original indices, so we need to map them
            displayCases = publicCases;
            totalCount = publicCases.length;
        }
    } else {
        // No results yet, show only public test cases
        displayCases = publicCases;
        totalCount = publicCases.length;
    }
    // Generate indices array [0, 1, 2...]
    const indices = Array.from({
        length: totalCount
    }, (_, i)=>i);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-[#262626]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 px-4 py-2 bg-gray-50/50 dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#1a1a1a]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                            className: "w-4 h-4 text-orange-500"
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/TestCases.tsx",
                            lineNumber: 200,
                            columnNumber: 21
                        }, this),
                        "Test Cases"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/workspace/TestCases.tsx",
                    lineNumber: 199,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/workspace/TestCases.tsx",
                lineNumber: 198,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 flex-1 flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-4 overflow-x-auto pb-1 custom-scrollbar",
                        children: [
                            hasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("console"),
                                className: `
                                flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border
                                ${activeTab === "console" ? 'bg-red-100 text-red-900 border-red-300 shadow-sm font-semibold' : 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700 font-medium'}
                            `,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                        lineNumber: 220,
                                        columnNumber: 29
                                    }, this),
                                    "Console"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/TestCases.tsx",
                                lineNumber: 210,
                                columnNumber: 25
                            }, this),
                            indices.map((displayIndex)=>{
                                const testCase = displayCases[displayIndex];
                                // Find the original index of this test case in safeCases
                                const originalIndex = safeCases.findIndex((tc)=>tc.id === testCase.id);
                                // Get result using original index
                                const result = resultsMap?.get(originalIndex);
                                const isHidden = testCase.hidden;
                                const status = result?.status;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(displayIndex),
                                    className: `
                                    flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border
                                    ${activeTab === displayIndex ? 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 border-gray-200 dark:border-[#262626] shadow-sm' : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-[#141414] hover:text-gray-700 dark:hover:text-gray-300'}
                                    ${status === 'ACCEPTED' ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : ''}
                                    ${status === 'PROCESSING' ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30' : ''}
                                    ${status && status !== 'ACCEPTED' && status !== 'PENDING' && status !== 'PROCESSING' ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30' : ''}
                                `,
                                    children: [
                                        status === 'ACCEPTED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "w-3.5 h-3.5 text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 248,
                                            columnNumber: 59
                                        }, this),
                                        status && status !== 'ACCEPTED' && status !== 'PENDING' && status !== 'PROCESSING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            className: "w-3.5 h-3.5 text-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 249,
                                            columnNumber: 120
                                        }, this),
                                        status === 'PENDING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "w-3.5 h-3.5 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 250,
                                            columnNumber: 58
                                        }, this),
                                        status === 'PROCESSING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 251,
                                            columnNumber: 61
                                        }, this),
                                        mode === "SUBMIT" && isHidden ? `Case ${originalIndex + 1}` : isHidden ? "Hidden Case" : `Case ${originalIndex + 1}`
                                    ]
                                }, displayIndex, true, {
                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                    lineNumber: 234,
                                    columnNumber: 29
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/TestCases.tsx",
                        lineNumber: 207,
                        columnNumber: 17
                    }, this),
                    status === "ACCEPTED" && mode === "SUBMIT" && problemId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analytics$2f$PeerComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            problemId: problemId,
                            runtime: submissionRuntime,
                            memory: submissionMemory
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/TestCases.tsx",
                            lineNumber: 262,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/TestCases.tsx",
                        lineNumber: 261,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-hidden",
                        children: activeTab === "console" && hasError ? errorDetails ? /* Console Content - Full error details */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full flex flex-col bg-white dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-[#262626] overflow-hidden shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#141414] border-b border-gray-200 dark:border-[#262626]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                            className: "w-4 h-4 text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 278,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-gray-700 dark:text-gray-300",
                                            children: "Console Output"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 279,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-auto flex items-center gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `px-2 py-0.5 rounded text-xs font-medium ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`,
                                                children: errorDetails.type
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 281,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 280,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                    lineNumber: 277,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-auto p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: `w-4 h-4 ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-500" : "text-amber-500"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-sm font-semibold ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-700" : "text-amber-700"}`,
                                                        children: errorDetails.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 294,
                                                columnNumber: 41
                                            }, this),
                                            errorDetails.testCaseIndex !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-gray-700",
                                                        children: "Test Case:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 49
                                                    }, this),
                                                    " ",
                                                    errorDetails.testCaseIndex + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 305,
                                                columnNumber: 45
                                            }, this),
                                            (errorDetails.time !== null && errorDetails.time !== undefined || errorDetails.memory !== null && errorDetails.memory !== undefined) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-xs text-gray-500",
                                                children: [
                                                    errorDetails.time !== null && errorDetails.time !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                lineNumber: 315,
                                                                columnNumber: 57
                                                            }, this),
                                                            "Time: ",
                                                            errorDetails.time,
                                                            "s"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 53
                                                    }, this),
                                                    errorDetails.memory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Memory: ",
                                                            errorDetails.memory,
                                                            "KB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 312,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-semibold",
                                                        children: "Error Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-red-50/50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 rounded-lg p-4 font-mono text-sm text-red-900 dark:text-red-300 whitespace-pre-wrap overflow-x-auto",
                                                        children: errorDetails.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 326,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-gray-700",
                                                        children: "Status:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 45
                                                    }, this),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-gray-600",
                                                        children: errorDetails.status.replace(/_/g, " ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 334,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                        lineNumber: 292,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                    lineNumber: 291,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/TestCases.tsx",
                            lineNumber: 275,
                            columnNumber: 29
                        }, this) : /* Fallback: Show error info even when errorDetails is null */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                            className: "w-4 h-4 text-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 347,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-gray-700",
                                            children: "Console"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 348,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200",
                                                children: "Error Detected"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 350,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                            lineNumber: 349,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                    lineNumber: 346,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-auto p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-4 h-4 text-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-amber-700",
                                                        children: "Runtime or Compilation Error"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 357,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 border border-gray-200 rounded-lg p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold",
                                                        children: "Error Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm space-y-2",
                                                        children: results && results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                results.some((r)=>r.status === "RUNTIME_ERROR") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-500",
                                                                            children: "Status: "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                                                            lineNumber: 368,
                                                                            columnNumber: 65
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-600 font-mono font-medium",
                                                                            children: "RUNTIME_ERROR"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                                                            lineNumber: 369,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                                                    lineNumber: 367,
                                                                    columnNumber: 61
                                                                }, this),
                                                                results.some((r)=>r.status === "COMPILE_ERROR") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-500",
                                                                            children: "Status: "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                                                            lineNumber: 374,
                                                                            columnNumber: 65
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-600 font-mono font-medium",
                                                                            children: "COMPILE_ERROR"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                                                            lineNumber: 375,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 61
                                                                }, this),
                                                                results.filter((r)=>(r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage).map((errorResult, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-3 p-3 bg-red-50 border border-red-100 rounded",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-gray-500 mb-1",
                                                                                children: [
                                                                                    "Test Case ",
                                                                                    errorResult.index + 1,
                                                                                    ":"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                                lineNumber: 381,
                                                                                columnNumber: 65
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-sm text-red-700 font-mono whitespace-pre-wrap",
                                                                                children: errorResult.errorMessage
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                                lineNumber: 382,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                                        lineNumber: 380,
                                                                        columnNumber: 61
                                                                    }, this)),
                                                                !results.some((r)=>(r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 text-xs text-gray-500",
                                                                    children: "No detailed error message available. Check the test case tabs above for more information."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 361,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                        lineNumber: 356,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                    lineNumber: 355,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/TestCases.tsx",
                            lineNumber: 345,
                            columnNumber: 29
                        }, this) : (()=>{
                            if (typeof activeTab !== "number") return null;
                            const displayIndex = activeTab;
                            if (displayIndex >= totalCount) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-400 text-sm",
                                children: "Select a case"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/TestCases.tsx",
                                lineNumber: 401,
                                columnNumber: 64
                            }, this);
                            const testCase = displayCases[displayIndex];
                            // Find the original index of this test case in safeCases
                            const originalIndex = safeCases.findIndex((tc)=>tc.id === testCase.id);
                            // Get result using original index
                            const result = resultsMap?.get(originalIndex);
                            const isHidden = testCase.hidden;
                            // In SUBMIT mode, hide contents for all test cases (public and hidden)
                            const hideContents = mode === "SUBMIT";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `
                                        p-3 rounded-lg border text-sm font-medium flex items-center justify-between
                                        ${result.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' : result.status === 'PENDING' ? 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700' : result.status === 'PROCESSING' ? 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}
                                    `,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: result.status === 'PENDING' ? 'IN QUEUE' : result.status === 'PROCESSING' ? 'EXECUTING...' : result.status.replace(/_/g, " ")
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 424,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-xs opacity-80",
                                                children: result.time !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/workspace/TestCases.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 53
                                                        }, this),
                                                        result.time,
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/workspace/TestCases.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 429,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                        lineNumber: 417,
                                        columnNumber: 37
                                    }, this),
                                    isHidden || hideContents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center p-8 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-100 dark:border-[#262626] rounded-xl bg-gray-50/50 dark:bg-[#141414]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "w-8 h-8 mb-2 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 442,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: hideContents ? "Test case contents are hidden" : "This test case is hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 443,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                        lineNumber: 441,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide",
                                                        children: "Input"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-lg p-3 font-mono text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap",
                                                        children: testCase.input
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 449,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide",
                                                                children: "Expected Output"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-lg p-3 font-mono text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap h-full",
                                                                children: testCase.output
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide",
                                                                children: "Your Output"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `
                                                    border rounded-lg p-3 font-mono text-sm whitespace-pre-wrap h-full
                                                    ${result?.status === 'ACCEPTED' ? 'bg-green-50/50 dark:bg-green-500/10 border-green-100 dark:border-green-500/30 text-green-900 dark:text-green-300' : result?.status === 'WRONG_ANSWER' ? 'bg-red-50/50 dark:bg-red-500/10 border-red-100 dark:border-red-500/30 text-red-900 dark:text-red-300' : 'bg-gray-50 dark:bg-[#141414] border-gray-100 dark:border-[#262626] text-gray-800 dark:text-gray-300'}
                                                `,
                                                                children: result?.stdout || (result?.status === 'PENDING' ? '...' : 'No output')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/workspace/TestCases.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/TestCases.tsx",
                                                lineNumber: 457,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/TestCases.tsx",
                                lineNumber: 414,
                                columnNumber: 29
                            }, this);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/TestCases.tsx",
                        lineNumber: 271,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/TestCases.tsx",
                lineNumber: 206,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/TestCases.tsx",
        lineNumber: 196,
        columnNumber: 9
    }, this);
}
_s(TestCases, "4X0m+rdNxkRdoRHgLEFRNAiGL5Q=");
_c = TestCases;
var _c;
__turbopack_context__.k.register(_c, "TestCases");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:26a4e0 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60ee1ae949348cbb95c6ff1624db0e0167a061c945":"getRandomProblem"},"actions/problems.ts",""] */ __turbopack_context__.s([
    "getRandomProblem",
    ()=>getRandomProblem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getRandomProblem = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60ee1ae949348cbb95c6ff1624db0e0167a061c945", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRandomProblem"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvYmxlbXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFByb2JsZW1TZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy9wcm9ibGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IERpZmZpY3VsdHksIFByb2JsZW1UeXBlLCBQcm9ibGVtRG9tYWluIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgdXBkYXRlVGFnLCBjYWNoZVRhZywgY2FjaGVMaWZlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcblxuLy8gR0VUVElORyBQVUJMSUMgUFJPQkxFTVNcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDEwLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCIsXG4gICAgZGlmZmljdWx0eT86IERpZmZpY3VsdHksXG4gICAgdGFncz86IHN0cmluZ1tdLFxuICAgIGN1cnNvcj86IHN0cmluZ1xuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gICAgY29uc3QgdGFnS2V5ID0gYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9JHtkaWZmaWN1bHR5ID8gYC0ke2RpZmZpY3VsdHl9YCA6ICcnfSR7dGFncyAmJiB0YWdzLmxlbmd0aCA+IDAgPyBgLSR7dGFncy5qb2luKCctJyl9YCA6ICcnfSR7Y3Vyc29yID8gYC1jdXJzb3ItJHtjdXJzb3J9YCA6IGAtcGFnZS0ke3BhZ2V9YH0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1saXN0JywgYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9YCk7XG5cbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJvYmxlbXMocGFnZSwgcGFnZVNpemUsIHR5cGUsIGRvbWFpbiwgdXNlcklkLCBkaWZmaWN1bHR5LCB0YWdzIHx8IFtdLCBjdXJzb3IpO1xufVxuXG4vLyBHRVRUSU5HIEFETUlOIFBST0JMRU1TXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZG1pblByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDUwLFxuICAgIGRvbWFpbj86IFByb2JsZW1Eb21haW4sXG4gICAgZXhjbHVkZURpZmZpY3VsdHk/OiBEaWZmaWN1bHR5LFxuICAgIHR5cGU/OiBQcm9ibGVtVHlwZVxuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZ0tleSA9IGBhZG1pbi1wcm9ibGVtcy0ke2RvbWFpbiB8fCAnYWxsJ30ke2V4Y2x1ZGVEaWZmaWN1bHR5ID8gYC1leGNsdWRlLSR7ZXhjbHVkZURpZmZpY3VsdHl9YCA6ICcnfSR7dHlwZSA/IGAtdHlwZS0ke3R5cGV9YCA6ICcnfS1wYWdlLSR7cGFnZX1gO1xuICAgIGNhY2hlVGFnKHRhZ0tleSwgJ2FkbWluLXByb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRBZG1pblByb2JsZW1zKHBhZ2UsIHBhZ2VTaXplLCBkb21haW4sIGV4Y2x1ZGVEaWZmaWN1bHR5LCB0eXBlKTtcbn1cblxuLy8gU0VBUkNISU5HIEZPUiBQUk9CTEVNU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoUHJvYmxlbXMoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCJcbikge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7IC8vIE11c3QgYmUgYXQgdG9wIC0gYWxsb3dzIGhlYWRlcnMoKSBpbnNpZGVcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7IC8vIDUgbWludXRlcyBmb3Igc2VhcmNoIHJlc3VsdHNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbj8udXNlcj8uaWQ7XG5cbiAgICBjb25zdCB0YWdLZXkgPSBgc2VhcmNoLSR7ZG9tYWlufS0ke3R5cGV9LSR7dGVybS50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDIwKX0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1zZWFyY2gnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5zZWFyY2hQcm9ibGVtcyh0ZXJtLCB0eXBlLCBkb21haW4sIHVzZXJJZCk7XG59XG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIFNMVUcgQ0FDSEVEXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9ibGVtKHNsdWc6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLSR7c2x1Z31gLCAncHJvYmxlbXMtbGlzdCcpO1xuXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFByb2JsZW0oc2x1Zyk7XG59XG5cblxuLy8gQ1JFQVRJTkcgQSBQUk9CTEVNIC0tPiBBRE1JTiBPTkxZXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQcm9ibGVtKGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGlmZmljdWx0eTogRGlmZmljdWx0eTtcbiAgICBzbHVnOiBzdHJpbmc7XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIGhpZGRlblF1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcbiAgICBkb21haW4/OiBQcm9ibGVtRG9tYWluO1xuICAgIHRlc3RDYXNlczogeyBpbnB1dDogc3RyaW5nOyBvdXRwdXQ6IHN0cmluZzsgaGlkZGVuPzogYm9vbGVhbiB9W107XG4gICAgdGFncz86IHN0cmluZ1tdO1xuICAgIHVzZUZ1bmN0aW9uVGVtcGxhdGU/OiBib29sZWFuO1xuICAgIGZ1bmN0aW9uVGVtcGxhdGVzPzogeyBsYW5ndWFnZUlkOiBudW1iZXI7IGZ1bmN0aW9uVGVtcGxhdGU6IHN0cmluZzsgZHJpdmVyQ29kZTogc3RyaW5nIH1bXTtcbiAgICBzb2x1dGlvbj86IHN0cmluZyB8IG51bGw7XG59KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5jcmVhdGVQcm9ibGVtKGRhdGEpO1xuXG4gICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL3NxbFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vcHJvYmxlbXNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2RzYS9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vc3FsL3Byb2JsZW1zXCIpO1xuXG4gICAgICAgIHVwZGF0ZVRhZygnYWRtaW4tcHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoJ3Byb2JsZW1zLWxpc3QnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1TUUwtUFJBQ1RJQ0UnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1EU0EtUFJBQ1RJQ0UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIElEXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUJ5SWQoaWQ6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLWlkLSR7aWR9YCwgJ3Byb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRQcm9ibGVtQnlJZChpZCk7XG59XG5cbi8vIE5BVklHQVRJT04gQUNUSU9OU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dFByb2JsZW0oY3VycmVudENyZWF0ZWRBdDogRGF0ZSwgZG9tYWluOiBQcm9ibGVtRG9tYWluLCB0eXBlOiBQcm9ibGVtVHlwZSkge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pO1xuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXROZXh0UHJvYmxlbShjdXJyZW50Q3JlYXRlZEF0LCBkb21haW4sIHR5cGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQ6IERhdGUsIGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiO1xuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiAzMDAsIHJldmFsaWRhdGU6IDMwMCB9KTtcbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQsIGRvbWFpbiwgdHlwZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSYW5kb21Qcm9ibGVtKGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICAvLyBObyBjYWNoZSBmb3IgcmFuZG9tXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFJhbmRvbVByb2JsZW0oZG9tYWluLCB0eXBlKTtcbn1cblxuXG4vLyBVUERBVElORyBBIFBST0JMRU0gLS0+IEFETUlOIE9OTFlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9ibGVtKGlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS51cGRhdGVQcm9ibGVtKGlkLCBkYXRhKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW1zLSR7cmVzdWx0LmRhdGE/LmRvbWFpbiB8fCAnRFNBJ30tJHtyZXN1bHQuZGF0YT8udHlwZSB8fCAnUFJBQ1RJQ0UnfWApO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW0tJHtyZXN1bHQuZGF0YT8uc2x1Z31gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIERFTEVUSU5HIEEgUFJPQkxFTSAtLT4gQURNSU4gT05MWVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2JsZW0oaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5kZWxldGVQcm9ibGVtKGlkKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjZSQWtLc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:1e8ee8 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"80b7c88da10d3a194c1170a71124e07c2947bd3a4a":"getUserScore"},"actions/user.action.ts",""] */ __turbopack_context__.s([
    "getUserScore",
    ()=>getUserScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getUserScore = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("80b7c88da10d3a194c1170a71124e07c2947bd3a4a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserScore"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlci5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vKipcbiAqIEdldCB1c2VyJ3MgdG90YWwgc2NvcmUgKGNhY2hlZCBmb3IgNSBtaW51dGVzKVxuICogQ2FjaGUgaXMgaW52YWxpZGF0ZWQgd2hlbiB1c2VyIHNvbHZlcyBhIHByb2JsZW0gdmlhIHVwZGF0ZVRhZ1xuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2NvcmUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiOyAvLyBNdXN0IGJlIGF0IHRvcCAtIGFsbG93cyBoZWFkZXJzKCkgaW5zaWRlXG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pOyAvLyA1IG1pbnV0ZXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNhY2hlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWAsIGB1c2VyLSR7dXNlcklkfWApO1xuXG4gICAgcmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIFJlY2FsY3VsYXRlIHVzZXIncyB0b3RhbCBzY29yZSBiYXNlZCBvbiB0aGVpciBzb2x2ZWQgcHJvYmxlbXNcbiAqIFRoaXMgZml4ZXMgYW55IGluY29ycmVjdCBzY29yZXMgaW4gdGhlIGRhdGFiYXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNhbGN1bGF0ZVVzZXJTY29yZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbmV3U2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHJldHVybiBVc2VyU2VydmljZS5yZWNhbGN1bGF0ZVVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIENvbXBsZXRlIHVzZXIgb25ib2FyZGluZyBwcm9jZXNzXG4gKiBVcGRhdGVzIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvbiBhbmQgbWFya3Mgb25ib2FyZGluZyBhcyBjb21wbGV0ZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKGRhdGE6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGJpbz86IHN0cmluZztcbiAgICBjb2xsZWdlSWQ6IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgZ2l0aHViSGFuZGxlPzogc3RyaW5nO1xufSk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgVXNlclNlcnZpY2UuY29tcGxldGVPbmJvYXJkaW5nKHVzZXJJZCwgZGF0YSk7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBSZWRpcyBjYWNoZSAocmVkdW5kYW50IGJ1dCBnb29kIHRvIGhhdmUgaGVyZSB0b28pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgZGFzaGJvYXJkLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogVXBkYXRlIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluZm8oZGF0YToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgYmlvPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgY29kZWZvcmNlc0hhbmRsZT86IHN0cmluZztcbiAgICBnaXRodWJIYW5kbGU/OiBzdHJpbmc7XG59KTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBGZXRjaCBjdXJyZW50IHVzZXIgdG8gY2hlY2sgZm9yIGNoYW5nZXNcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgIGJpbzogZGF0YS5iaW8sXG4gICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogZGF0YS5sZWV0Q29kZUhhbmRsZSxcbiAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiBkYXRhLmNvZGVDaGVmSGFuZGxlLFxuICAgICAgICAgICAgY29kZWZvcmNlc0hhbmRsZTogZGF0YS5jb2RlZm9yY2VzSGFuZGxlLFxuICAgICAgICAgICAgZ2l0aHViSGFuZGxlOiBkYXRhLmdpdGh1YkhhbmRsZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZXNldCB2ZXJpZmljYXRpb24gaWYgaGFuZGxlIGNoYW5nZWRcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlQ2hlZkhhbmRsZSAhPT0gdW5kZWZpbmVkICYmIGRhdGEuY29kZUNoZWZIYW5kbGUgIT09IGN1cnJlbnRVc2VyLmNvZGVDaGVmSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlQ2hlZlZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSBjdXJyZW50VXNlci5jb2RlZm9yY2VzSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlZm9yY2VzVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlZXRDb2RlSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5sZWV0Q29kZUhhbmRsZSAhPT0gY3VycmVudFVzZXIubGVldENvZGVIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhLmxlZXRDb2RlVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgZGFzaGJvYXJkIHJlZGlzIGNhY2hlOlwiLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9zZXR0aW5nc1wiKTsgLy8gQWRkZWQgdG8gcmVmcmVzaCBzZXR0aW5ncyBwYWdlXG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoYGRhc2hib2FyZC0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKCdkYXNoYm9hcmQtc3RhdHMnKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdXBkYXRlIHVzZXIgaW5mbzpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogU3luYyB1c2VyIHByb2ZpbGUgYW5kIHN0YXRzXG4gKiBDbGVhcnMgYWxsIGNhY2hlcyByZWxhdGVkIHRvIHRoZSB1c2VyIGFuZCByZXZhbGlkYXRlcyBkYXNoYm9hcmRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNVc2VyUHJvZmlsZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgICAgICBhd2FpdCByZWRpcy5kZWwoYHVzZXItc2NvcmUtJHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgcmVkaXMgY2FjaGUgZHVyaW5nIHN5bmM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldmFsaWRhdGUgTmV4dC5qcyBjYWNoZVxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU3luYyBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzeW5jIHByb2ZpbGVcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgdXNlciBzZXR0aW5ncyBkYXRhIChjYWNoZWQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2V0dGluZ3MoKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjtcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG4gICAgY2FjaGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgaW5zdGl0dXRpb246IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgYmlvOiB1c2VyLmJpbyxcbiAgICAgICAgaW5zdGl0dXRpb25OYW1lOiB1c2VyLmluc3RpdHV0aW9uPy5uYW1lXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFJBYXNCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/UserPoints.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// TODO : MAKE IT SERVER COMPONENT AND OPTIMIZE
__turbopack_context__.s([
    "default",
    ()=>UserPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$1e8ee8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:1e8ee8 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function UserPoints({ className = "" }) {
    _s();
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserPoints.useEffect": ()=>{
            async function fetchPoints() {
                try {
                    const score = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$1e8ee8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserScore"])();
                    setPoints(score);
                } catch (error) {
                    console.error("Failed to fetch user points:", error);
                    setPoints(0);
                } finally{
                    setIsLoading(false);
                }
            }
            fetchPoints();
        }
    }["UserPoints.useEffect"], []);
    // Refresh points when window gains focus or when points are updated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserPoints.useEffect": ()=>{
            const handleFocus = {
                "UserPoints.useEffect.handleFocus": async ()=>{
                    try {
                        const score = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$1e8ee8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserScore"])();
                        setPoints(score);
                    } catch (error) {
                        console.error("Failed to refresh user points:", error);
                    }
                }
            }["UserPoints.useEffect.handleFocus"];
            const handlePointsUpdated = {
                "UserPoints.useEffect.handlePointsUpdated": async ()=>{
                    try {
                        const score = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$1e8ee8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserScore"])();
                        setPoints(score);
                    } catch (error) {
                        console.error("Failed to refresh user points:", error);
                    }
                }
            }["UserPoints.useEffect.handlePointsUpdated"];
            window.addEventListener("focus", handleFocus);
            window.addEventListener("pointsUpdated", handlePointsUpdated);
            return ({
                "UserPoints.useEffect": ()=>{
                    window.removeEventListener("focus", handleFocus);
                    window.removeEventListener("pointsUpdated", handlePointsUpdated);
                }
            })["UserPoints.useEffect"];
        }
    }["UserPoints.useEffect"], []);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center gap-2 ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                    className: "w-4 h-4 text-amber-500"
                }, void 0, false, {
                    fileName: "[project]/components/UserPoints.tsx",
                    lineNumber: 66,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-semibold text-gray-600 dark:text-gray-400",
                    children: "..."
                }, void 0, false, {
                    fileName: "[project]/components/UserPoints.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/UserPoints.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                className: "w-4 h-4 text-amber-500"
            }, void 0, false, {
                fileName: "[project]/components/UserPoints.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-gray-700 dark:text-gray-300",
                children: points?.toLocaleString() || 0
            }, void 0, false, {
                fileName: "[project]/components/UserPoints.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-500 dark:text-gray-400",
                children: "pts"
            }, void 0, false, {
                fileName: "[project]/components/UserPoints.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserPoints.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, this);
}
_s(UserPoints, "cCijsxpemeIWKwdCICEQ/mr0aUY=");
_c = UserPoints;
var _c;
__turbopack_context__.k.register(_c, "UserPoints");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/WorkspaceHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkspaceHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$26a4e0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:26a4e0 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shuffle.js [app-client] (ecmascript) <export default as Shuffle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserPoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserPoints.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
// Theme toggle button component
function ThemeToggleButton() {
    _s();
    const { theme, setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggleButton.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeToggleButton.useEffect"], []);
    // Prevent hydration mismatch
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "p-2 text-gray-500 opacity-50 cursor-default",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "w-5 h-5"
            }, void 0, false, {
                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                lineNumber: 41,
                columnNumber: 10
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    const isDark = resolvedTheme === 'dark';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>setTheme(isDark ? 'light' : 'dark'),
        className: "p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
        title: isDark ? "Switch to light mode" : "Switch to dark mode",
        children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
            lineNumber: 54,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
            lineNumber: 54,
            columnNumber: 47
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ThemeToggleButton, "OPO4/Bwn/B3wErFIC5J6lGmQcgg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggleButton;
function WorkspaceHeader({ onSubmit, onRun, isSubmitting, isRunning, contestId, endTime, nextProblemSlug, prevProblemSlug, domain, type, onToggleSidebar }) {
    _s1();
    const { data: session, isPending } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isProfileOpen, setProfileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRandomizing, startRandomizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const notifiedMins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceHeader.useEffect": ()=>{
            function handleClickOutside(event) {
                if (profileRef.current && !profileRef.current.contains(event.target)) {
                    setProfileOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "WorkspaceHeader.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["WorkspaceHeader.useEffect"];
        }
    }["WorkspaceHeader.useEffect"], []);
    // CONTEST TIMER & NOTIFICATIONS
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceHeader.useEffect": ()=>{
            if (!contestId || !endTime) return;
            const targetDate = new Date(endTime);
            const updateTimer = {
                "WorkspaceHeader.useEffect.updateTimer": ()=>{
                    const now = new Date();
                    const diff = targetDate.getTime() - now.getTime();
                    if (diff <= 0) {
                        setTimeLeft("00:00:00");
                        return;
                    }
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const mins = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
                    const secs = Math.floor(diff % (1000 * 60) / 1000);
                    setTimeLeft(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
                    // Sonner notifications for 30m, 10m, 5m, 1m
                    const totalMinutes = Math.floor(diff / (1000 * 60));
                    if ([
                        30,
                        10,
                        5,
                        1
                    ].includes(totalMinutes) && !notifiedMins.current.has(totalMinutes)) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(`${totalMinutes} minute${totalMinutes > 1 ? 's' : ''} remaining!`, {
                            description: "Make sure to submit your work before the time expires.",
                            duration: 10000
                        });
                        notifiedMins.current.add(totalMinutes);
                    }
                }
            }["WorkspaceHeader.useEffect.updateTimer"];
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return ({
                "WorkspaceHeader.useEffect": ()=>clearInterval(interval)
            })["WorkspaceHeader.useEffect"];
        }
    }["WorkspaceHeader.useEffect"], [
        contestId,
        endTime
    ]);
    const handleSignOut = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signOut({
            fetchOptions: {
                onSuccess: ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Logged out successfully");
                    router.push("/");
                }
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-16 bg-white dark:bg-[#0a0a0a] border-b border-dashed border-gray-200 dark:border-[#262626] flex items-center justify-between px-4 z-10 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-4 ${contestId ? 'w-1/3' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: contestId ? `/contest/${contestId}` : "/",
                        className: "flex items-center gap-2 group mr-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-sm font-bold",
                                children: "A"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-black uppercase tracking-widest text-orange-600 leading-none",
                                        children: "Contest"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight",
                                        children: "Arena Active"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    !contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2",
                        children: [
                            onToggleSidebar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "problem-list-toggle",
                                onClick: onToggleSidebar,
                                className: "p-1.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors mr-1",
                                title: "Toggle Problem List",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: domain === "SQL" ? "/problems/sql" : "/problems/dsa",
                                className: "text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: "List"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    "Problem List"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300 dark:text-gray-600",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `p-1 rounded-lg transition-colors ${prevProblemSlug ? 'hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`,
                                disabled: !prevProblemSlug,
                                onClick: ()=>prevProblemSlug && router.push(`/problems/${prevProblemSlug}`),
                                title: "Previous Problem",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `p-1 rounded-lg transition-colors ${nextProblemSlug ? 'hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`,
                                disabled: !nextProblemSlug,
                                onClick: ()=>nextProblemSlug && router.push(`/problems/${nextProblemSlug}`),
                                title: "Next Problem",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300 dark:text-gray-600",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (domain && type) {
                                        startRandomizing(async ()=>{
                                            const slug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$26a4e0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRandomProblem"])(domain, type);
                                            if (slug) router.push(`/problems/${slug}`);
                                            else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("No other problems found");
                                        });
                                    }
                                },
                                disabled: isRandomizing,
                                className: `p-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors ${isRandomizing ? 'opacity-50' : ''}`,
                                title: "Random Problem",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
                                    className: `w-4 h-4 ${isRandomizing ? 'animate-spin' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-2 ${contestId ? 'flex-1 justify-center' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "run-button",
                        className: `flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg transition-all disabled:opacity-50 ${contestId ? 'border border-gray-200 dark:border-[#262626] shadow-sm' : ''}`,
                        onClick: onRun,
                        disabled: isRunning || isSubmitting,
                        children: [
                            isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 border-2 border-gray-500/30 border-t-gray-600 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "w-4 h-4 fill-current"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            isRunning ? 'Running...' : 'Run'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "submit-button",
                        onClick: onSubmit,
                        disabled: isSubmitting,
                        className: `flex items-center gap-2 px-8 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-black uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95`,
                        children: [
                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this),
                            isSubmitting ? 'Submitting...' : 'Submit Now'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    contestId && timeLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center px-4 py-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/30 ml-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mb-0.5",
                                children: "Time Left"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-mono font-bold text-gray-900 dark:text-gray-100 leading-none",
                                children: timeLeft
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-4 ${contestId ? 'w-1/3 justify-end' : ''}`,
                children: [
                    !contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeToggleButton, {}, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this),
                            session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: profileRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setProfileOpen(!isProfileOpen),
                                                className: "flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:block",
                                                        children: session.user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-[#0a0a0a] bg-orange-50 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-xs ring-offset-1",
                                                        children: session.user.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: session.user.image,
                                                            alt: session.user.name || "User",
                                                            className: "w-full h-full object-cover",
                                                            referrerPolicy: "no-referrer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 25
                                                        }, this) : session.user.name?.charAt(0).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: isProfileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95
                                                    },
                                                    transition: {
                                                        duration: 0.2
                                                    },
                                                    className: "absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl shadow-lg p-1 z-50 origin-top-right",
                                                    children: [
                                                        session.user.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/admin",
                                                            className: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg",
                                                            onClick: ()=>setProfileOpen(false),
                                                            children: "Admin Panel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/dashboard",
                                                            className: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg",
                                                            onClick: ()=>setProfileOpen(false),
                                                            children: "Dashboard"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleSignOut,
                                                            className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg",
                                                            children: "Sign Out"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserPoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "hidden md:flex"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 280,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/signin",
                                className: "text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-600",
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 341,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                className: "w-4 h-4 text-orange-600"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black text-orange-700 dark:text-orange-400 uppercase tracking-tighter",
                                children: "Proctored Mode"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/WorkspaceHeader.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s1(WorkspaceHeader, "qmFyb/Q63W4V+pjDs9Z/ebaMMLA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c1 = WorkspaceHeader;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThemeToggleButton");
__turbopack_context__.k.register(_c1, "WorkspaceHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:705715 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f":"logContestViolation"},"actions/contest.ts",""] */ __turbopack_context__.s([
    "logContestViolation",
    ()=>logContestViolation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var logContestViolation = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("78bac990ae89cd8ae87b5bbd328ef9aee3e1937b8f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "logContestViolation"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29udGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCByZXZhbGlkYXRlVGFnIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IHVuc3RhYmxlX2NhY2hlIGFzIGNhY2hlLCB1bnN0YWJsZV9ub1N0b3JlIGFzIG5vU3RvcmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVUYWcsIGNhY2hlTGlmZSB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBhZnRlciB9IGZyb20gXCJuZXh0L3NlcnZlclwiOyAvLyBGb3IgYmFja2dyb3VuZCB0YXNrc1xuXG5jb25zdCBjb250ZXN0U2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgc3RhcnRUaW1lOiB6LmNvZXJjZS5kYXRlKCksXG4gICAgZW5kVGltZTogei5jb2VyY2UuZGF0ZSgpLFxuICAgIHZpc2liaWxpdHk6IHouZW51bShbXCJQVUJMSUNcIiwgXCJJTlNUSVRVVElPTlwiLCBcIkNMQVNTUk9PTVwiXSksXG4gICAgY2xhc3Nyb29tSWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LnN0cmluZygpKS5taW4oMSwgXCJTZWxlY3QgYXQgbGVhc3Qgb25lIHByb2JsZW1cIiksXG4gICAgY29udGVzdFBhc3N3b3JkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcmFuZG9taXplUXVlc3Rpb25zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KGZhbHNlKSxcbn0pO1xuXG5jb25zdCBjb250ZXN0V2l0aFByb2JsZW1zU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIHNsdWc6IHouc3RyaW5nKCkubWluKDMsIFwiU2x1ZyBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVyc1wiKSxcbiAgICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHN0YXJ0VGltZTogei5kYXRlKCksXG4gICAgZW5kVGltZTogei5kYXRlKCksXG4gICAgdmlzaWJpbGl0eTogei5lbnVtKFtcIlBVQkxJQ1wiLCBcIklOU1RJVFVUSU9OXCIsIFwiQ0xBU1NST09NXCJdKSxcbiAgICBoaWRkZW46IHouYm9vbGVhbigpLmRlZmF1bHQoZmFsc2UpLFxuICAgIGNsYXNzcm9vbUlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgaW5zdGl0dXRpb25JZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gICAgYmFja2dyb3VuZEltYWdlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcHJpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcnVsZXM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LmFueSgpKSwgLy8gRnVsbCBwcm9ibGVtIGRhdGEgb2JqZWN0c1xuICAgIGNvbnRlc3RQYXNzd29yZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogei5ib29sZWFuKCkuZGVmYXVsdChmYWxzZSksXG59KTtcblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuLyoqXG4gKiBDYWNoZWQgZmV0Y2ggZm9yIHB1YmxpYyBjb250ZXN0c1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRQdWJsaWNDb250ZXN0cygpIHtcbiAgICBcInVzZSBjYWNoZVwiXG4gICAgY2FjaGVUYWcoXCJjb250ZXN0cy1wdWJsaWNcIik7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhY2hlTGlmZShcImNvbnRlc3RzXCIpO1xuXG4gICAgcmV0dXJuIHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiUFVCTElDXCIsXG4gICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHsgc2VsZWN0OiB7IHByb2JsZW1zOiB0cnVlIH0gfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZpc2libGVDb250ZXN0cygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICAgICAgY29uc3QgY29udGVzdHMgPSBhd2FpdCBnZXRQdWJsaWNDb250ZXN0cygpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0cyA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDogeyBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlc3RzID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBPUjogW1xuICAgICAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwiUFVCTElDXCIgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgQU5EOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIklOU1RJVFVUSU9OXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGluc3RpdHV0aW9uSWQ6IGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFORDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJDTEFTU1JPT01cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT1I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3Nyb29tOiB7IHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgX2NvdW50OiB7IHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9IH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY29udGVzdHNcIiB9O1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIENhY2hlZCBjb250ZXN0IGRldGFpbCBmZXRjaGVyXG4gKiBSZXR1cm5zIGNvbnRlc3QgZGF0YSB3aXRob3V0IHVzZXItc3BlY2lmaWMgY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDYWNoZWRDb250ZXN0KGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBjb250ZXN0LSR7Y29udGVzdElkfWApO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJjb250ZXN0LWRldGFpbFwiKTtcblxuICAgIHJldHVybiBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgb3JkZXI6IFwiYXNjXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbi8qKlxuICogRmV0Y2hlcyBhIHNpbmdsZSBjb250ZXN0J3MgZGV0YWlscyB3aXRoIGF1dGhvcml6YXRpb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0RGV0YWlsKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgZ2V0Q2FjaGVkQ29udGVzdChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghY29udGVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbj8udXNlciBhcyBhbnk7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb24gPSBjdXJyZW50VXNlciA/IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0ZWQgPSBub3cgPj0gY29udGVzdC5zdGFydFRpbWU7XG4gICAgICAgIGNvbnN0IGlzQ3JlYXRvciA9IGN1cnJlbnRVc2VyPy5pZCA9PT0gY29udGVzdC5jcmVhdG9ySWQ7XG4gICAgICAgIGNvbnN0IGlzQWRtaW4gPSBjdXJyZW50VXNlcj8ucm9sZSA9PT0gXCJBRE1JTlwiO1xuXG4gICAgICAgIC8vIFZpc2liaWxpdHkgQ2hlY2tcbiAgICAgICAgbGV0IGlzQXV0aG9yaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIlBVQkxJQ1wiKSB7XG4gICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQWRtaW4pIHtcbiAgICAgICAgICAgIGlzQXV0aG9yaXplZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXN0LnZpc2liaWxpdHkgPT09IFwiSU5TVElUVVRJT05cIikge1xuICAgICAgICAgICAgICAgIC8vIFVzZSA9PSBmb3IgbnVsbC91bmRlZmluZWQgbG9vc2UgZXF1YWxpdHkgY2hlY2tcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkID09IGNvbnRlc3QuaW5zdGl0dXRpb25JZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5yb2xsbWVudCA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZXN0LmNsYXNzcm9vbUlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSAhIWVucm9sbG1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gdGhpcyBjb250ZXN0LlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYW5TZWVQcm9ibGVtcyA9IChoYXNTdGFydGVkIHx8IGlzQWRtaW4gfHwgaXNDcmVhdG9yKSAmJiAocGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBpc0NyZWF0b3IgfHwgaXNBZG1pbik7XG5cbiAgICAgICAgLy8gRml4OiBJZiB0aGUgY29udGVzdCBpcyBvdmVyLCBhbGxvd2VkIHJvbGVzIHNob3VsZCBjaGVjayBwYXJ0aWNpcGF0aW9uIHByb3Blcmx5LFxuICAgICAgICAvLyBidXQgdHlwaWNhbGx5IGFsbG93cyB2aWV3aW5nIGlmIHB1YmxpYy9hdXRob3JpemVkLlxuICAgICAgICAvLyBCdXQgZm9yIFwiTGl2ZVwiIGNvbnRlc3RzLCB0aGUgY3VycmVudCBsb2dpYyBpcyBjb3JyZWN0LlxuXG4gICAgICAgIGNvbnN0IHJlcXVpcmVzUGFzc3dvcmQgPSAhIWNvbnRlc3QuY29udGVzdFBhc3N3b3JkO1xuXG4gICAgICAgIC8vIFNodWZmbGUgcHJvYmxlbXMgaWYgcmFuZG9taXplUXVlc3Rpb25zIGlzIGVuYWJsZWRcbiAgICAgICAgLy8gVXNlIGEgc2ltcGxlIHNlZWRlZCBzaHVmZmxlIGJhc2VkIG9uIHVzZXJJZCArIGNvbnRlc3RJZCBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgbGV0IHZpc2libGVQcm9ibGVtcyA9IGNhblNlZVByb2JsZW1zID8gY29udGVzdC5wcm9ibGVtcyA6IFtdO1xuXG4gICAgICAgIGlmIChjb250ZXN0LnJhbmRvbWl6ZVF1ZXN0aW9ucyAmJiBjdXJyZW50VXNlciAmJiB2aXNpYmxlUHJvYmxlbXMubGVuZ3RoID4gMCAmJiAhaXNBZG1pbiAmJiAhaXNDcmVhdG9yKSB7XG4gICAgICAgICAgICAvLyBTaW1wbGUgc3RyaW5nIGhhc2ggZnVuY3Rpb24gZm9yIHNlZWRpbmdcbiAgICAgICAgICAgIGNvbnN0IHNlZWRTdHIgPSBgJHtjdXJyZW50VXNlci5pZH0tJHtjb250ZXN0SWR9YDtcbiAgICAgICAgICAgIGxldCBzZWVkID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZFN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNlZWQgPSAoKHNlZWQgPDwgNSkgLSBzZWVkKSArIHNlZWRTdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBzZWVkIHw9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERldGVybWluaXN0aWMgc2h1ZmZsZVxuICAgICAgICAgICAgdmlzaWJsZVByb2JsZW1zID0gWy4uLnZpc2libGVQcm9ibGVtc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLnNpbihzZWVkKyspICogMTAwMDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh4IC0gTWF0aC5mbG9vcih4KSkgLSAwLjU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIHVzZXIncyBzb2x2ZWQgcHJvYmxlbXMgZm9yIHRoaXMgY29udGVzdFxuICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3Qgc29sdmVkU3VibWlzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc3VibWlzc2lvbi5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJBQ0NFUFRFRFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluOiB2aXNpYmxlUHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbUlkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29sdmVkU3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHNvbHZlZFByb2JsZW1JZHMuYWRkKHMucHJvYmxlbUlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5jb250ZXN0LFxuICAgICAgICAgICAgICAgIHByb2JsZW1zOiB2aXNpYmxlUHJvYmxlbXMubWFwKHZwID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnZwLFxuICAgICAgICAgICAgICAgICAgICBpc1NvbHZlZDogc29sdmVkUHJvYmxlbUlkcy5oYXModnAucHJvYmxlbS5pZClcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgaGFzU3RhcnRlZCxcbiAgICAgICAgICAgICAgICBoYXNFbmRlZDogbm93ID4gY29udGVzdC5lbmRUaW1lLFxuICAgICAgICAgICAgICAgIGNhbk1hbmFnZTogaXNBZG1pbiB8fCBpc0NyZWF0b3IsXG4gICAgICAgICAgICAgICAgaGFzQWNjZXB0ZWRSdWxlczogcGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBwYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkIHx8IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiBudWxsLCAvLyBOZXZlciByZXR1cm4gcGxhaW4gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHBhcnRpY2lwYXRpb24/LnNlc3Npb25JZCAvLyBSZXR1cm4gc2Vzc2lvbklkIGZvciBwcm90ZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb250ZXN0IGRldGFpbDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLy8gLi4uIGV4aXN0aW5nIGNvZGUgLi4uXG5cbi8vIC4uLiBleGlzdGluZyBjb2RlIC4uLlxuXG4vLyAuLi4gZXhpc3RpbmcgY29kZSAuLi5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3QoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFNjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgYSBtb3JlIHJvYnVzdCB1bmlxdWUgc2x1Z1xuICAgICAgICBjb25zdCBiYXNlU2x1ZyA9IHZhbGlkYXRlZERhdGEudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiLVwiKS5yZXBsYWNlKC8oXi18LSQpL2csIFwiXCIpO1xuICAgICAgICBjb25zdCB1bmlxdWVTbHVnID0gYCR7YmFzZVNsdWd9LSR7RGF0ZS5ub3coKX1gO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB2YWxpZGF0ZWREYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIHNsdWc6IHVuaXF1ZVNsdWcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiB2YWxpZGF0ZWREYXRhLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB2YWxpZGF0ZWREYXRhLmVuZFRpbWUsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICBpbnN0aXR1dGlvbklkOiB2YWxpZGF0ZWREYXRhLnZpc2liaWxpdHkgIT09IFwiUFVCTElDXCIgPyAodmFsaWRhdGVkRGF0YS5pbnN0aXR1dGlvbklkIHx8IG51bGwpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiB2YWxpZGF0ZWREYXRhLmNvbnRlc3RQYXNzd29yZCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiB2YWxpZGF0ZWREYXRhLnByb2JsZW1zLm1hcCgocHJvYmxlbUlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvY29udGVzdHNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2NvbnRlc3RcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoXCJjb250ZXN0c1wiLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdElkOiBjb250ZXN0LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0OlwiLCBlcnJvcik7XG4gICAgICAgIC8vIFJldHVybiBjbGVhcmVyIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gKGVycm9yIGFzIGFueSkuZXJyb3JzLm1hcCgoZTogYW55KSA9PiBlLm1lc3NhZ2UpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICAgIH1cbiAgICB9XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3RXaXRoUHJvYmxlbXMoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFdpdGhQcm9ibGVtc1NjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RXaXRoUHJvYmxlbXNTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgdHguY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZhbGlkYXRlZERhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHNsdWc6IHZhbGlkYXRlZERhdGEuc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogdmFsaWRhdGVkRGF0YS5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHZhbGlkYXRlZERhdGEuZW5kVGltZSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB2YWxpZGF0ZWREYXRhLmhpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiB2YWxpZGF0ZWREYXRhLmJhY2tncm91bmRJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpemVzOiB2YWxpZGF0ZWREYXRhLnByaXplcyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHZhbGlkYXRlZERhdGEucnVsZXMsXG4gICAgICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEudmlzaWJpbGl0eSAhPT0gXCJQVUJMSUNcIiA/ICh2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0UGFzc3dvcmQ6IHZhbGlkYXRlZERhdGEuY29udGVzdFBhc3N3b3JkIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsaWRhdGVkRGF0YS5wcm9ibGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSB2YWxpZGF0ZWREYXRhLnByb2JsZW1zW2ldO1xuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBzbHVnIGJ5IGFwcGVuZGluZyBjb250ZXN0IHNsdWcgYW5kIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlU2x1ZyA9IGAke3ZhbGlkYXRlZERhdGEuc2x1Z30tJHtwLnNsdWcgfHwgcC50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKX0tJHtEYXRlLm5vdygpfS0ke2l9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ibGVtID0gYXdhaXQgdHgucHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogcC5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2x1ZzogdW5pcXVlU2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBwLnNjb3JlIHx8IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBwLmRvbWFpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiQ09OVEVTVFwiLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBtYXJrZWQgc2VwYXJhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBoaWRkZW4gZnJvbSBtYWluIGJhbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RDYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogcC50ZXN0Q2FzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Q6IHAudGFncz8ubWFwKCh0OiBzdHJpbmcpID0+ICh7IG5hbWU6IHQgfSkpIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb250ZXN0UHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHByb2JsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29udGVzdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2NvbnRlc3RzXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9jb250ZXN0c1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvY29udGVzdFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhcImNvbnRlc3RzXCIsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb250ZXN0SWQ6IGNvbnRlc3QuaWQgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0IHdpdGggcHJvYmxlbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW5zdGl0dXRpb25hbENsYXNzcm9vbXMoaW5zdGl0dXRpb25JZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlLCBzZWN0aW9uOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tc1wiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZVByb2JsZW1zKHNlYXJjaDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBhd2FpdCBwcmlzbWEucHJvYmxlbS5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IHsgY29udGFpbnM6IHNlYXJjaCwgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBzbHVnOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6IFwiaW5zZW5zaXRpdmVcIiB9IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgdGl0bGU6IHRydWUsIGRpZmZpY3VsdHk6IHRydWUsIHNsdWc6IHRydWUgfSxcbiAgICAgICAgICAgIHRha2U6IDEwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcHJvYmxlbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHByb2JsZW1zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcHJvYmxlbXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjY2VwdENvbnRlc3RSdWxlcyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHsgYWNjZXB0ZWRSdWxlczogdHJ1ZSB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9jb250ZXN0LyR7Y29udGVzdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBhY2NlcHQgcnVsZXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmlzaENvbnRlc3RBY3Rpb24oY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24udXBzZXJ0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgaXNGaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkQXQ6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wcm9ibGVtc2ApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmaW5pc2ggY29udGVzdFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZpbmFsaXplIENvbnRlc3QgJiBBd2FyZCBCYWRnZXNcbiAqIC0gQ2FsY3VsYXRlcyBsZWFkZXJib2FyZFxuICogLSBBd2FyZHMgR29sZCwgU2lsdmVyLCBCcm9uemUgdG8gVG9wIDNcbiAqIC0gTWFya3MgY29udGVzdCBhcyBmaW5hbGl6ZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplQ29udGVzdChjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIC8vIE9ubHkgYWRtaW5zIG9yIGNvbnRlc3QgbWFuYWdlcnMgY2FuIGZpbmFsaXplXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuICAgIGlmICghW1wiQURNSU5cIiwgXCJDT05URVNUX01BTkFHRVJcIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCIsIFwiVEVBQ0hFUlwiXS5pbmNsdWRlcyhjdXJyZW50VXNlci5yb2xlKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgIHNlbGVjdDogeyBpc0ZpbmFsaXplZDogdHJ1ZSwgdGl0bGU6IHRydWUgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG4gICAgICAgIGlmIChjb250ZXN0LmlzRmluYWxpemVkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBpcyBhbHJlYWR5IGZpbmFsaXplZFwiIH07XG5cbiAgICAgICAgLy8gUmV1c2UgbGVhZGVyYm9hcmQgbG9naWMgdG8gZ2V0IHJhbmtpbmdzXG4gICAgICAgIGNvbnN0IGxlYWRlcmJvYXJkID0gYXdhaXQgZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZCk7XG4gICAgICAgIGlmICghbGVhZGVyYm9hcmQuc3VjY2VzcyB8fCAhbGVhZGVyYm9hcmQuc3R1ZGVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggbGVhZGVyYm9hcmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSBsZWFkZXJib2FyZC5zdHVkZW50cyBhcyBhbnlbXTtcblxuICAgICAgICAvLyBBdCBsZWFzdCAxIHN0dWRlbnQgbmVlZGVkXG4gICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICAgICAgIGRhdGE6IHsgaXNGaW5hbGl6ZWQ6IHRydWUgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQ29udGVzdCBmaW5hbGl6ZWQgKG5vIHBhcnRpY2lwYW50cylcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG9wIDMgSURzXG4gICAgICAgIGNvbnN0IGdvbGRVc2VySWQgPSBzdHVkZW50c1swXT8uaWQ7XG4gICAgICAgIGNvbnN0IHNpbHZlclVzZXJJZCA9IHN0dWRlbnRzWzFdPy5pZDtcbiAgICAgICAgY29uc3QgYnJvbnplVXNlcklkID0gc3R1ZGVudHNbMl0/LmlkO1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICAvLyBBd2FyZCBHb2xkXG4gICAgICAgICAgICBpZiAoZ29sZFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGdvbGRVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBnb2xkQmFkZ2VzOiB7IGluY3JlbWVudDogMSB9IH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEF3YXJkIFNpbHZlclxuICAgICAgICAgICAgaWYgKHNpbHZlclVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNpbHZlclVzZXJJZCB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHNpbHZlckJhZGdlczogeyBpbmNyZW1lbnQ6IDEgfSB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBd2FyZCBCcm9uemVcbiAgICAgICAgICAgIGlmIChicm9uemVVc2VySWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBicm9uemVVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBicm9uemVCYWRnZXM6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYXJrIEZpbmFsaXplZFxuICAgICAgICAgICAgYXdhaXQgdHguY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGlzRmluYWxpemVkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZGApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHtnb2xkVXNlcklkfWApO1xuICAgICAgICBpZihzaWx2ZXJVc2VySWQpIHJldmFsaWRhdGVQYXRoKGAvcHJvZmlsZS8ke3NpbHZlclVzZXJJZH1gKTtcbiAgICAgICAgaWYoYnJvbnplVXNlcklkKSByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHticm9uemVVc2VySWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29udGVzdC0ke2NvbnRlc3RJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgbGVhZGVyYm9hcmQtJHtjb250ZXN0SWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmluYWxpemUgY29udGVzdDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZpbmFsaXplIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBWZXJpZnkgY29udGVzdCBwYXNzd29yZCB3aXRob3V0IHN0YXJ0aW5nIHNlc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb250ZXN0UGFzc3dvcmQoY29udGVzdElkOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHZlcmlmeSBjb250ZXN0IHBhc3N3b3JkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdmVyaWZ5IHBhc3N3b3JkXCIgfTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTdGFydCBhIGNvbnRlc3Qgc2Vzc2lvbiAtIHZhbGlkYXRlcyB0aW1lIGJvdW5kcyBhbmQgY3JlYXRlcyBzZXNzaW9uIElEXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydENvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBzdGFydFRpbWU6IHRydWUsIGVuZFRpbWU6IHRydWUsIGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gVGltZSBib3VuZHMgY2hlY2tcbiAgICAgICAgaWYgKG5vdyA8IGNvbnRlc3Quc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWQgeWV0XCIgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm93ID4gY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgYWxyZWFkeSBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgc2Vzc2lvbiBJRFxuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSBgJHtzZXNzaW9uLnVzZXIuaWR9LSR7Y29udGVzdElkfS0ke0RhdGUubm93KCl9YDtcblxuICAgICAgICAvLyBDaGVjayBmb3IgZXhpc3RpbmcgYWN0aXZlIHNlc3Npb24gKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1BhcnRpY2lwYXRpb24/LmlzQmxvY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIllvdSBoYXZlIGJlZW4gYmxvY2tlZCBmcm9tIHRoaXMgY29udGVzdCBkdWUgdG8gdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXhpc3RpbmdQYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGhhdmUgYWxyZWFkeSBmaW5pc2hlZCB0aGlzIGNvbnRlc3RcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIG9yIGNyZWF0ZSBwYXJ0aWNpcGF0aW9uIHdpdGggbmV3IHNlc3Npb25cbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uSWQ6IHBhcnRpY2lwYXRpb24uaWQsXG4gICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogTG9nIGEgY29udGVzdCB2aW9sYXRpb24gLSByZWNvcmRzIHRvIGRhdGFiYXNlIGFuZCB1cGRhdGVzIGNvdW50ZXJzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dDb250ZXN0VmlvbGF0aW9uKFxuICAgIGNvbnRlc3RJZDogc3RyaW5nLFxuICAgIHR5cGU6IFwiVEFCX1NXSVRDSFwiIHwgXCJGVUxMU0NSRUVOX0VYSVRcIiB8IFwiQ09QWV9QQVNURVwiIHwgXCJERVZUT09MU19PUEVOXCIgfCBcIktFWUJPQVJEX1NIT1JUQ1VUXCIgfCBcIk5BVklHQVRJT05fQVRURU1QVFwiIHwgXCJNVUxUSV9UQUJcIiB8IFwiU1VTUElDSU9VU19JTlBVVFwiLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgbWV0YWRhdGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFwYXJ0aWNpcGF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm8gYWN0aXZlIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNvdW50ZXIgdG8gaW5jcmVtZW50XG4gICAgICAgIGNvbnN0IGNvdW50ZXJGaWVsZCA9IHtcbiAgICAgICAgICAgIFRBQl9TV0lUQ0g6IFwidGFiU3dpdGNoQ291bnRcIixcbiAgICAgICAgICAgIEZVTExTQ1JFRU5fRVhJVDogXCJmdWxsc2NyZWVuRXhpdENvdW50XCIsXG4gICAgICAgICAgICBDT1BZX1BBU1RFOiBcImNvcHlQYXN0ZUNvdW50XCIsXG4gICAgICAgICAgICBERVZUT09MU19PUEVOOiBcImRldlRvb2xzQ291bnRcIixcbiAgICAgICAgICAgIEtFWUJPQVJEX1NIT1JUQ1VUOiBcImtleWJvYXJkQ291bnRcIixcbiAgICAgICAgICAgIE5BVklHQVRJT05fQVRURU1QVDogXCJuYXZpZ2F0aW9uQ291bnRcIixcbiAgICAgICAgICAgIE1VTFRJX1RBQjogXCJ0YWJTd2l0Y2hDb3VudFwiLFxuICAgICAgICAgICAgU1VTUElDSU9VU19JTlBVVDogXCJjb3B5UGFzdGVDb3VudFwiXG4gICAgICAgIH1bdHlwZV0gYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIFVzZSB0cmFuc2FjdGlvbiB0byBlbnN1cmUgYXRvbWljIHVwZGF0ZVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKGFzeW5jICh0eCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgbGFzdCB2aW9sYXRpb24gdGltZSB0byBwcmV2ZW50IHJhcGlkLWZpcmUgZHVwbGljYXRlcyAoU2VydmVyLXNpZGUgZGVib3VuY2UpXG4gICAgICAgICAgICBjb25zdCBsYXN0VmlvbGF0aW9uID0gYXdhaXQgdHguY29udGVzdFZpb2xhdGlvbi5maW5kRmlyc3Qoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0VmlvbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSBEYXRlLm5vdygpIC0gbGFzdFZpb2xhdGlvbi5jcmVhdGVkQXQuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIGxlc3MgdGhhbiAyIHNlY29uZHMgc2luY2UgbGFzdCB2aW9sYXRpb24sIGlnbm9yZSB0aGlzIG9uZVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDIwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sIC8vIFJldHVybiBleGlzdGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogcGFydGljaXBhdGlvbi5pc0Jsb2NrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBwYXJ0aWNpcGF0aW9uLnBlcm1hbmVudGx5QmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHBhcnRpY2lwYXRpb24udGVtcEJsb2NrZWRVbnRpbFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHZpb2xhdGlvbiByZWNvcmRcbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbnRlc3RWaW9sYXRpb24uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSA/PyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB0b3RhbCBhbmQgZGV0ZXJtaW5lIGJsb2NraW5nIHRpZXJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RvdGFsVmlvbGF0aW9ucyA9IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEZsYWcgPSBuZXdUb3RhbFZpb2xhdGlvbnMgPj0gMztcblxuICAgICAgICAgICAgLy8gVGllcmVkIGJsb2NraW5nIGxvZ2ljXG4gICAgICAgICAgICBsZXQgdGVtcEJsb2NrZWRVbnRpbDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHBlcm1hbmVudGx5QmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAobmV3VG90YWxWaW9sYXRpb25zID49IDYpIHtcbiAgICAgICAgICAgICAgICAvLyA2KyB2aW9sYXRpb25zID0gcGVybWFuZW50IGJsb2NrXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdUb3RhbFZpb2xhdGlvbnMgPj0gNCkge1xuICAgICAgICAgICAgICAgIC8vIDQtNSB2aW9sYXRpb25zID0gNSBtaW51dGUgdGVtcCBibG9ja1xuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWwgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgNSAqIDYwICogMTAwMCk7IC8vIDUgbWludXRlc1xuICAgICAgICAgICAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0eC5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBwYXJ0aWNpcGF0aW9uLmlkIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBbY291bnRlckZpZWxkXTogeyBpbmNyZW1lbnQ6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB7IGluY3JlbWVudDogMSB9LFxuICAgICAgICAgICAgICAgICAgICBpc0ZsYWdnZWQ6IHNob3VsZEZsYWcgfHwgcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQsXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcEJsb2NrZWRVbnRpbCxcbiAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcmVzdWx0LnRvdGFsVmlvbGF0aW9ucyxcbiAgICAgICAgICAgIGlzRmxhZ2dlZDogcmVzdWx0LmlzRmxhZ2dlZCxcbiAgICAgICAgICAgIGlzQmxvY2tlZDogcmVzdWx0LmlzQmxvY2tlZCxcbiAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHJlc3VsdC50ZW1wQmxvY2tlZFVudGlsPy50b0lTT1N0cmluZygpIHx8IG51bGwsXG4gICAgICAgICAgICBwZXJtYW5lbnRseUJsb2NrZWQ6IHJlc3VsdC5wZXJtYW5lbnRseUJsb2NrZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvZyB2aW9sYXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBsb2cgdmlvbGF0aW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGUgY29udGVzdCBzZXNzaW9uIC0gY2hlY2tzIGlmIHNlc3Npb24gaXMgdmFsaWQgZm9yIHN1Ym1pc3Npb25zXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgdmFsaWQ6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0YXJ0VGltZTogdHJ1ZSwgZW5kVGltZTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXBhcnRpY2lwYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIk5vIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYmxvY2tlZFxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0Jsb2NrZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIkJsb2NrZWQgZHVlIHRvIHZpb2xhdGlvbnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmluaXNoZWRcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBhbHJlYWR5IGZpbmlzaGVkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHNlc3Npb24gSUQgKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uLnNlc3Npb25JZCAhPT0gc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAvLyBMb2cgbXVsdGktdGFiIHZpb2xhdGlvblxuICAgICAgICAgICAgYXdhaXQgbG9nQ29udGVzdFZpb2xhdGlvbihjb250ZXN0SWQsIFwiTVVMVElfVEFCXCIsIFwiTXVsdGlwbGUgdGFicyBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIlNlc3Npb24gbWlzbWF0Y2ggLSBwb3NzaWJsZSBtdWx0aXBsZSB0YWJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRpbWUgYm91bmRzXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChub3cgPiBwYXJ0aWNpcGF0aW9uLmNvbnRlc3QuZW5kVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgZW5kZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcGFydGljaXBhdGlvbi50b3RhbFZpb2xhdGlvbnMsXG4gICAgICAgICAgICBpc0ZsYWdnZWQ6IHBhcnRpY2lwYXRpb24uaXNGbGFnZ2VkXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCB2YWxpZDogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBlbGlnaWJsZSB0byBzdWJtaXQgLSBwcmUtc3VibWlzc2lvbiB2YWxpZGF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1N1Ym1pc3Npb25FbGlnaWJpbGl0eShjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVzdDoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3RhcnRUaW1lOiB0cnVlLCBlbmRUaW1lOiB0cnVlIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcGFydGljaXBhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiTm8gcGFydGljaXBhdGlvbiBmb3VuZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB2YXJpb3VzIGNvbmRpdGlvbnNcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNCbG9ja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJCbG9ja2VkIGR1ZSB0byBleGNlc3NpdmUgdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJZb3UgaGF2ZSBhbHJlYWR5IGZpbmlzaGVkIHRoaXMgY29udGVzdFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAobm93IDwgcGFydGljaXBhdGlvbi5jb250ZXN0LnN0YXJ0VGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdyA+IHBhcnRpY2lwYXRpb24uY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJDb250ZXN0IGhhcyBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxpZ2libGU6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQgPyBbXCJZb3VyIHNlc3Npb24gaGFzIGJlZW4gZmxhZ2dlZCBmb3IgcmV2aWV3XCJdIDogW11cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IGVsaWdpYmxlOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IHBhcnRpY2lwYXRpb24gc3RhdHVzIC0gZm9yIFVJIHN0YXRlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYXJ0aWNpcGF0aW9uU3RhdHVzKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlc3Npb25JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBlcm1hbmVudGx5QmxvY2tlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0ZW1wIGJsb2NrIGhhcyBleHBpcmVkXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uPy50ZW1wQmxvY2tlZFVudGlsICYmIG5ldyBEYXRlKCkgPiBwYXJ0aWNpcGF0aW9uLnRlbXBCbG9ja2VkVW50aWwpIHtcbiAgICAgICAgICAgIC8vIFRlbXAgYmxvY2sgZXhwaXJlZCAtIHVuYmxvY2tcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZF9jb250ZXN0SWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiBwYXJ0aWNpcGF0aW9uIHx8IG51bGxcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGF0aW9uIHN0YXR1c1wiIH07XG4gICAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09OVEVTVCBNQU5BR0VSIC0gUEFSVElDSVBBTlQgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHZXQgYWxsIHBhcnRpY2lwYW50cyBmb3IgYSBjb250ZXN0IHdpdGggdmlvbGF0aW9uIGRldGFpbHMgKGZvciBtYW5hZ2VycylcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbnRlc3RQYXJ0aWNpcGFudHMoY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGNvbnRlc3QgbWFuYWdlci9jcmVhdG9yXG4gICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgIHNlbGVjdDogeyBjcmVhdG9ySWQ6IHRydWUgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFjb250ZXN0KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3QgaXNBdXRob3JpemVkID1cbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQ09OVEVTVF9NQU5BR0VSXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJURUFDSEVSXCIgfHxcbiAgICAgICAgY29udGVzdC5jcmVhdG9ySWQgPT09IGN1cnJlbnRVc2VyLmlkO1xuXG4gICAgaWYgKCFpc0F1dGhvcml6ZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnRzID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpb2xhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHRha2U6IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICB7IHBlcm1hbmVudGx5QmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IGlzQmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRvdGFsVmlvbGF0aW9uczogXCJkZXNjXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwYXJ0aWNpcGFudHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGFudHM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcGFydGljaXBhbnRzXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVW5ibG9jayBhIHBhcnRpY2lwYW50IChtYW5hZ2VyIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bmJsb2NrUGFydGljaXBhbnQoY29udGVzdElkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gQ2hlY2sgYXV0aG9yaXphdGlvblxuICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgY3JlYXRvcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgIGNvbnN0IGlzQXV0aG9yaXplZCA9XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQURNSU5cIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkNPTlRFU1RfTUFOQUdFUlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiVEVBQ0hFUlwiIHx8XG4gICAgICAgIGNvbnRlc3QuY3JlYXRvcklkID09PSBjdXJyZW50VXNlci5pZDtcblxuICAgIGlmICghaXNBdXRob3JpemVkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGwsXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IDAsXG4gICAgICAgICAgICAgICAgdGFiU3dpdGNoQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkV4aXRDb3VudDogMCxcbiAgICAgICAgICAgICAgICBjb3B5UGFzdGVDb3VudDogMCxcbiAgICAgICAgICAgICAgICBkZXZUb29sc0NvdW50OiAwLFxuICAgICAgICAgICAgICAgIGtleWJvYXJkQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkNvdW50OiAwLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdW5ibG9ja2VkQnk6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgIHVuYmxvY2tlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbnRlc3RzLyR7Y29udGVzdElkfS9wYXJ0aWNpcGFudHNgKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdW5ibG9jayBwYXJ0aWNpcGFudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVuYmxvY2sgcGFydGljaXBhbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlsZWQgdmlvbGF0aW9ucyBmb3IgYSBwYXJ0aWNpcGFudFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnRWaW9sYXRpb25zKGNvbnRlc3RJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIC8vIENoZWNrIGF1dGhvcml6YXRpb25cbiAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgc2VsZWN0OiB7IGNyZWF0b3JJZDogdHJ1ZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG5cbiAgICBjb25zdCBpc0F1dGhvcml6ZWQgPVxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkFETUlOXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJDT05URVNUX01BTkFHRVJcIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIlRFQUNIRVJcIiB8fFxuICAgICAgICBjb250ZXN0LmNyZWF0b3JJZCA9PT0gY3VycmVudFVzZXIuaWQ7XG5cbiAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcGFydGljaXBhdGlvbiB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHZpb2xhdGlvbnNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgY29udGVzdCBsZWFkZXJib2FyZFxuICogLSBGZXRjaGVzIGFsbCBwYXJ0aWNpcGF0aW9uc1xuICogLSBGZXRjaGVzIGFsbCByZWxldmFudCBzdWJtaXNzaW9uc1xuICogLSBDYWxjdWxhdGVzIHNjb3Jlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBsZWFkZXJib2FyZC0ke2NvbnRlc3RJZH1gKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJsZWFkZXJib2FyZFwiKVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgLy8gc3RhcnRlZEF0OiB7IG5vdDogbnVsbCB9IC8vIE9ubHkgc3RhcnRlZCBwYXJ0aWNpcGFudHMgKEZpeCBpZiBmaWVsZCBleGlzdHMsIG90aGVyd2lzZSByZWx5IG9uIGNyZWF0ZWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsdWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IG9yZGVyOiBcImFzY1wiIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBsZWFkZXJib2FyZCA9IGF3YWl0IFByb21pc2UuYWxsKHBhcnRpY2lwYXRpb25zLm1hcChhc3luYyAocCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IHZhbGlkIHN1Ym1pc3Npb25zIGZvciB0aGlzIHVzZXIgaW4gdGhpcyBjb250ZXN0XG4gICAgICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHAudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBndGU6IGNvbnRlc3Quc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbHRlOiBjb250ZXN0LmVuZFRpbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBzY29yZVxuICAgICAgICAgICAgLy8gTG9naWM6IEJlc3Qgc3VibWlzc2lvbiBwZXIgcHJvYmxlbSBjb3VudHNcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TY29yZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVNvbHZlVGltZXMgPSBuZXcgTWFwPHN0cmluZywgRGF0ZT4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1CZXN0U3VibWlzc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENvdW50ID0gcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuc2V0KHN1Yi5wcm9ibGVtSWQsIGN1cnJlbnRDb3VudCArIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5zdGF0dXMgPT09IFwiQUNDRVBURURcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QmVzdCA9IHByb2JsZW1TY29yZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1EZWYgPSBjb250ZXN0LnByb2JsZW1zLmZpbmQoY3AgPT4gY3AucHJvYmxlbUlkID09PSBzdWIucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U2NvcmUgPSBwcm9ibGVtRGVmPy5wcm9ibGVtLnNjb3JlIHx8IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heFNjb3JlID4gY3VycmVudEJlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtU2NvcmVzLnNldChzdWIucHJvYmxlbUlkLCBtYXhTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEJlc3RUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudEJlc3RUaW1lIHx8IHN1Yi5jcmVhdGVkQXQgPCBjdXJyZW50QmVzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbVNvbHZlVGltZXMuc2V0KHN1Yi5wcm9ibGVtSWQsIHN1Yi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLnNldChzdWIucHJvYmxlbUlkLCBzdWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgdG90YWxTY29yZSA9IDA7XG4gICAgICAgICAgICBsZXQgdG90YWxUaW1lTXMgPSAwO1xuXG4gICAgICAgICAgICBwcm9ibGVtU2NvcmVzLmZvckVhY2goKHNjb3JlLCBwcm9ibGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlbnRUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHByb2JsZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvbHZlbnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZU1zICs9IChzb2x2ZW50VGltZS5nZXRUaW1lKCkgLSBjb250ZXN0LnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBNYXAgc3RhdHMgZm9yIGVhY2ggcHJvYmxlbSBpbiB0aGUgY29udGVzdFxuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVN0YXRzID0gY29udGVzdC5wcm9ibGVtcy5tYXAoY3AgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlc3RTdWIgPSBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLmdldChjcC5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogY3AucHJvYmxlbUlkLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY3AucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogcHJvYmxlbVNjb3Jlcy5nZXQoY3AucHJvYmxlbUlkKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhTY29yZTogY3AucHJvYmxlbS5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzLmdldChjcC5wcm9ibGVtSWQpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZDogcHJvYmxlbVNjb3Jlcy5oYXMoY3AucHJvYmxlbUlkKSxcbiAgICAgICAgICAgICAgICAgICAgc29sdmVkQXQ6IHByb2JsZW1Tb2x2ZVRpbWVzLmdldChjcC5wcm9ibGVtSWQpLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogYmVzdFN1Yj8ubGFuZ3VhZ2U/Lm5hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VJZDogYmVzdFN1Yj8ubGFuZ3VhZ2U/LmlkIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucC51c2VyLFxuICAgICAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlLFxuICAgICAgICAgICAgICAgIHRpbWVUYWtlbjogdG90YWxUaW1lTXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXNTb2x2ZWQ6IHByb2JsZW1TY29yZXMuc2l6ZSxcbiAgICAgICAgICAgICAgICBwcm9ibGVtU3RhdHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBTb3J0OiBIaWdoIHNjb3JlIGZpcnN0LCB0aGVuIGxvdyB0aW1lIHRha2VuXG4gICAgICAgIGxlYWRlcmJvYXJkLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgICAgICAgICByZXR1cm4gYS50aW1lVGFrZW4gLSBiLnRpbWVUYWtlbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzdHVkZW50czogbGVhZGVyYm9hcmQsXG4gICAgICAgICAgICBpc0ZpbmFsaXplZDogY29udGVzdC5pc0ZpbmFsaXplZCxcbiAgICAgICAgICAgIHByb2JsZW1zOiBjb250ZXN0LnByb2JsZW1zLm1hcChjcCA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBjcC5wcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNwLnByb2JsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgIG1heFNjb3JlOiBjcC5wcm9ibGVtLnNjb3JlXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMZWFkZXJib2FyZCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIGxlYWRlcmJvYXJkXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgdXNlcidzIHJhbmtpbmcgaW4gYSBjb250ZXN0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0UmFua2luZyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldENvbnRlc3RMZWFkZXJib2FyZChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MgfHwgIXJlc3VsdC5zdHVkZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcmFua2luZ1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5rID0gcmVzdWx0LnN0dWRlbnRzLmZpbmRJbmRleCgoczogYW55KSA9PiBzLmlkID09PSBzZXNzaW9uLnVzZXIuaWQpICsgMTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCByYW5rOiByYW5rID4gMCA/IHJhbmsgOiBudWxsIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHJhbmtpbmdcIiB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1JBeXZCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:316d9e [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4041a53321b8a41efa0515551dc3e636f81f59f7d7":"getParticipationStatus"},"actions/contest.ts",""] */ __turbopack_context__.s([
    "getParticipationStatus",
    ()=>getParticipationStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getParticipationStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4041a53321b8a41efa0515551dc3e636f81f59f7d7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getParticipationStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29udGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCByZXZhbGlkYXRlVGFnIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IHVuc3RhYmxlX2NhY2hlIGFzIGNhY2hlLCB1bnN0YWJsZV9ub1N0b3JlIGFzIG5vU3RvcmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVUYWcsIGNhY2hlTGlmZSB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBhZnRlciB9IGZyb20gXCJuZXh0L3NlcnZlclwiOyAvLyBGb3IgYmFja2dyb3VuZCB0YXNrc1xuXG5jb25zdCBjb250ZXN0U2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgc3RhcnRUaW1lOiB6LmNvZXJjZS5kYXRlKCksXG4gICAgZW5kVGltZTogei5jb2VyY2UuZGF0ZSgpLFxuICAgIHZpc2liaWxpdHk6IHouZW51bShbXCJQVUJMSUNcIiwgXCJJTlNUSVRVVElPTlwiLCBcIkNMQVNTUk9PTVwiXSksXG4gICAgY2xhc3Nyb29tSWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LnN0cmluZygpKS5taW4oMSwgXCJTZWxlY3QgYXQgbGVhc3Qgb25lIHByb2JsZW1cIiksXG4gICAgY29udGVzdFBhc3N3b3JkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcmFuZG9taXplUXVlc3Rpb25zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KGZhbHNlKSxcbn0pO1xuXG5jb25zdCBjb250ZXN0V2l0aFByb2JsZW1zU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIHNsdWc6IHouc3RyaW5nKCkubWluKDMsIFwiU2x1ZyBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVyc1wiKSxcbiAgICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHN0YXJ0VGltZTogei5kYXRlKCksXG4gICAgZW5kVGltZTogei5kYXRlKCksXG4gICAgdmlzaWJpbGl0eTogei5lbnVtKFtcIlBVQkxJQ1wiLCBcIklOU1RJVFVUSU9OXCIsIFwiQ0xBU1NST09NXCJdKSxcbiAgICBoaWRkZW46IHouYm9vbGVhbigpLmRlZmF1bHQoZmFsc2UpLFxuICAgIGNsYXNzcm9vbUlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgaW5zdGl0dXRpb25JZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gICAgYmFja2dyb3VuZEltYWdlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcHJpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcnVsZXM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LmFueSgpKSwgLy8gRnVsbCBwcm9ibGVtIGRhdGEgb2JqZWN0c1xuICAgIGNvbnRlc3RQYXNzd29yZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogei5ib29sZWFuKCkuZGVmYXVsdChmYWxzZSksXG59KTtcblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuLyoqXG4gKiBDYWNoZWQgZmV0Y2ggZm9yIHB1YmxpYyBjb250ZXN0c1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRQdWJsaWNDb250ZXN0cygpIHtcbiAgICBcInVzZSBjYWNoZVwiXG4gICAgY2FjaGVUYWcoXCJjb250ZXN0cy1wdWJsaWNcIik7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhY2hlTGlmZShcImNvbnRlc3RzXCIpO1xuXG4gICAgcmV0dXJuIHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiUFVCTElDXCIsXG4gICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHsgc2VsZWN0OiB7IHByb2JsZW1zOiB0cnVlIH0gfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZpc2libGVDb250ZXN0cygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICAgICAgY29uc3QgY29udGVzdHMgPSBhd2FpdCBnZXRQdWJsaWNDb250ZXN0cygpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0cyA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDogeyBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlc3RzID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBPUjogW1xuICAgICAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwiUFVCTElDXCIgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgQU5EOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIklOU1RJVFVUSU9OXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGluc3RpdHV0aW9uSWQ6IGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFORDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJDTEFTU1JPT01cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT1I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3Nyb29tOiB7IHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgX2NvdW50OiB7IHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9IH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY29udGVzdHNcIiB9O1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIENhY2hlZCBjb250ZXN0IGRldGFpbCBmZXRjaGVyXG4gKiBSZXR1cm5zIGNvbnRlc3QgZGF0YSB3aXRob3V0IHVzZXItc3BlY2lmaWMgY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDYWNoZWRDb250ZXN0KGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBjb250ZXN0LSR7Y29udGVzdElkfWApO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJjb250ZXN0LWRldGFpbFwiKTtcblxuICAgIHJldHVybiBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgb3JkZXI6IFwiYXNjXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbi8qKlxuICogRmV0Y2hlcyBhIHNpbmdsZSBjb250ZXN0J3MgZGV0YWlscyB3aXRoIGF1dGhvcml6YXRpb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0RGV0YWlsKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgZ2V0Q2FjaGVkQ29udGVzdChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghY29udGVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbj8udXNlciBhcyBhbnk7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb24gPSBjdXJyZW50VXNlciA/IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0ZWQgPSBub3cgPj0gY29udGVzdC5zdGFydFRpbWU7XG4gICAgICAgIGNvbnN0IGlzQ3JlYXRvciA9IGN1cnJlbnRVc2VyPy5pZCA9PT0gY29udGVzdC5jcmVhdG9ySWQ7XG4gICAgICAgIGNvbnN0IGlzQWRtaW4gPSBjdXJyZW50VXNlcj8ucm9sZSA9PT0gXCJBRE1JTlwiO1xuXG4gICAgICAgIC8vIFZpc2liaWxpdHkgQ2hlY2tcbiAgICAgICAgbGV0IGlzQXV0aG9yaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIlBVQkxJQ1wiKSB7XG4gICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQWRtaW4pIHtcbiAgICAgICAgICAgIGlzQXV0aG9yaXplZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXN0LnZpc2liaWxpdHkgPT09IFwiSU5TVElUVVRJT05cIikge1xuICAgICAgICAgICAgICAgIC8vIFVzZSA9PSBmb3IgbnVsbC91bmRlZmluZWQgbG9vc2UgZXF1YWxpdHkgY2hlY2tcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkID09IGNvbnRlc3QuaW5zdGl0dXRpb25JZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5yb2xsbWVudCA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZXN0LmNsYXNzcm9vbUlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSAhIWVucm9sbG1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gdGhpcyBjb250ZXN0LlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYW5TZWVQcm9ibGVtcyA9IChoYXNTdGFydGVkIHx8IGlzQWRtaW4gfHwgaXNDcmVhdG9yKSAmJiAocGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBpc0NyZWF0b3IgfHwgaXNBZG1pbik7XG5cbiAgICAgICAgLy8gRml4OiBJZiB0aGUgY29udGVzdCBpcyBvdmVyLCBhbGxvd2VkIHJvbGVzIHNob3VsZCBjaGVjayBwYXJ0aWNpcGF0aW9uIHByb3Blcmx5LFxuICAgICAgICAvLyBidXQgdHlwaWNhbGx5IGFsbG93cyB2aWV3aW5nIGlmIHB1YmxpYy9hdXRob3JpemVkLlxuICAgICAgICAvLyBCdXQgZm9yIFwiTGl2ZVwiIGNvbnRlc3RzLCB0aGUgY3VycmVudCBsb2dpYyBpcyBjb3JyZWN0LlxuXG4gICAgICAgIGNvbnN0IHJlcXVpcmVzUGFzc3dvcmQgPSAhIWNvbnRlc3QuY29udGVzdFBhc3N3b3JkO1xuXG4gICAgICAgIC8vIFNodWZmbGUgcHJvYmxlbXMgaWYgcmFuZG9taXplUXVlc3Rpb25zIGlzIGVuYWJsZWRcbiAgICAgICAgLy8gVXNlIGEgc2ltcGxlIHNlZWRlZCBzaHVmZmxlIGJhc2VkIG9uIHVzZXJJZCArIGNvbnRlc3RJZCBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgbGV0IHZpc2libGVQcm9ibGVtcyA9IGNhblNlZVByb2JsZW1zID8gY29udGVzdC5wcm9ibGVtcyA6IFtdO1xuXG4gICAgICAgIGlmIChjb250ZXN0LnJhbmRvbWl6ZVF1ZXN0aW9ucyAmJiBjdXJyZW50VXNlciAmJiB2aXNpYmxlUHJvYmxlbXMubGVuZ3RoID4gMCAmJiAhaXNBZG1pbiAmJiAhaXNDcmVhdG9yKSB7XG4gICAgICAgICAgICAvLyBTaW1wbGUgc3RyaW5nIGhhc2ggZnVuY3Rpb24gZm9yIHNlZWRpbmdcbiAgICAgICAgICAgIGNvbnN0IHNlZWRTdHIgPSBgJHtjdXJyZW50VXNlci5pZH0tJHtjb250ZXN0SWR9YDtcbiAgICAgICAgICAgIGxldCBzZWVkID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZFN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNlZWQgPSAoKHNlZWQgPDwgNSkgLSBzZWVkKSArIHNlZWRTdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBzZWVkIHw9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERldGVybWluaXN0aWMgc2h1ZmZsZVxuICAgICAgICAgICAgdmlzaWJsZVByb2JsZW1zID0gWy4uLnZpc2libGVQcm9ibGVtc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLnNpbihzZWVkKyspICogMTAwMDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh4IC0gTWF0aC5mbG9vcih4KSkgLSAwLjU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIHVzZXIncyBzb2x2ZWQgcHJvYmxlbXMgZm9yIHRoaXMgY29udGVzdFxuICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3Qgc29sdmVkU3VibWlzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc3VibWlzc2lvbi5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJBQ0NFUFRFRFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluOiB2aXNpYmxlUHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbUlkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29sdmVkU3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHNvbHZlZFByb2JsZW1JZHMuYWRkKHMucHJvYmxlbUlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5jb250ZXN0LFxuICAgICAgICAgICAgICAgIHByb2JsZW1zOiB2aXNpYmxlUHJvYmxlbXMubWFwKHZwID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnZwLFxuICAgICAgICAgICAgICAgICAgICBpc1NvbHZlZDogc29sdmVkUHJvYmxlbUlkcy5oYXModnAucHJvYmxlbS5pZClcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgaGFzU3RhcnRlZCxcbiAgICAgICAgICAgICAgICBoYXNFbmRlZDogbm93ID4gY29udGVzdC5lbmRUaW1lLFxuICAgICAgICAgICAgICAgIGNhbk1hbmFnZTogaXNBZG1pbiB8fCBpc0NyZWF0b3IsXG4gICAgICAgICAgICAgICAgaGFzQWNjZXB0ZWRSdWxlczogcGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBwYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkIHx8IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiBudWxsLCAvLyBOZXZlciByZXR1cm4gcGxhaW4gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHBhcnRpY2lwYXRpb24/LnNlc3Npb25JZCAvLyBSZXR1cm4gc2Vzc2lvbklkIGZvciBwcm90ZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb250ZXN0IGRldGFpbDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLy8gLi4uIGV4aXN0aW5nIGNvZGUgLi4uXG5cbi8vIC4uLiBleGlzdGluZyBjb2RlIC4uLlxuXG4vLyAuLi4gZXhpc3RpbmcgY29kZSAuLi5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3QoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFNjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgYSBtb3JlIHJvYnVzdCB1bmlxdWUgc2x1Z1xuICAgICAgICBjb25zdCBiYXNlU2x1ZyA9IHZhbGlkYXRlZERhdGEudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiLVwiKS5yZXBsYWNlKC8oXi18LSQpL2csIFwiXCIpO1xuICAgICAgICBjb25zdCB1bmlxdWVTbHVnID0gYCR7YmFzZVNsdWd9LSR7RGF0ZS5ub3coKX1gO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB2YWxpZGF0ZWREYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIHNsdWc6IHVuaXF1ZVNsdWcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiB2YWxpZGF0ZWREYXRhLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB2YWxpZGF0ZWREYXRhLmVuZFRpbWUsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICBpbnN0aXR1dGlvbklkOiB2YWxpZGF0ZWREYXRhLnZpc2liaWxpdHkgIT09IFwiUFVCTElDXCIgPyAodmFsaWRhdGVkRGF0YS5pbnN0aXR1dGlvbklkIHx8IG51bGwpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiB2YWxpZGF0ZWREYXRhLmNvbnRlc3RQYXNzd29yZCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiB2YWxpZGF0ZWREYXRhLnByb2JsZW1zLm1hcCgocHJvYmxlbUlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvY29udGVzdHNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2NvbnRlc3RcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoXCJjb250ZXN0c1wiLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdElkOiBjb250ZXN0LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0OlwiLCBlcnJvcik7XG4gICAgICAgIC8vIFJldHVybiBjbGVhcmVyIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gKGVycm9yIGFzIGFueSkuZXJyb3JzLm1hcCgoZTogYW55KSA9PiBlLm1lc3NhZ2UpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICAgIH1cbiAgICB9XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3RXaXRoUHJvYmxlbXMoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFdpdGhQcm9ibGVtc1NjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RXaXRoUHJvYmxlbXNTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgdHguY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZhbGlkYXRlZERhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHNsdWc6IHZhbGlkYXRlZERhdGEuc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogdmFsaWRhdGVkRGF0YS5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHZhbGlkYXRlZERhdGEuZW5kVGltZSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB2YWxpZGF0ZWREYXRhLmhpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiB2YWxpZGF0ZWREYXRhLmJhY2tncm91bmRJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpemVzOiB2YWxpZGF0ZWREYXRhLnByaXplcyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHZhbGlkYXRlZERhdGEucnVsZXMsXG4gICAgICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEudmlzaWJpbGl0eSAhPT0gXCJQVUJMSUNcIiA/ICh2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0UGFzc3dvcmQ6IHZhbGlkYXRlZERhdGEuY29udGVzdFBhc3N3b3JkIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsaWRhdGVkRGF0YS5wcm9ibGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSB2YWxpZGF0ZWREYXRhLnByb2JsZW1zW2ldO1xuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBzbHVnIGJ5IGFwcGVuZGluZyBjb250ZXN0IHNsdWcgYW5kIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlU2x1ZyA9IGAke3ZhbGlkYXRlZERhdGEuc2x1Z30tJHtwLnNsdWcgfHwgcC50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKX0tJHtEYXRlLm5vdygpfS0ke2l9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ibGVtID0gYXdhaXQgdHgucHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogcC5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2x1ZzogdW5pcXVlU2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBwLnNjb3JlIHx8IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBwLmRvbWFpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiQ09OVEVTVFwiLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBtYXJrZWQgc2VwYXJhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBoaWRkZW4gZnJvbSBtYWluIGJhbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RDYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogcC50ZXN0Q2FzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Q6IHAudGFncz8ubWFwKCh0OiBzdHJpbmcpID0+ICh7IG5hbWU6IHQgfSkpIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb250ZXN0UHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHByb2JsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29udGVzdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2NvbnRlc3RzXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9jb250ZXN0c1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvY29udGVzdFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhcImNvbnRlc3RzXCIsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb250ZXN0SWQ6IGNvbnRlc3QuaWQgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0IHdpdGggcHJvYmxlbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW5zdGl0dXRpb25hbENsYXNzcm9vbXMoaW5zdGl0dXRpb25JZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlLCBzZWN0aW9uOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tc1wiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZVByb2JsZW1zKHNlYXJjaDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBhd2FpdCBwcmlzbWEucHJvYmxlbS5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IHsgY29udGFpbnM6IHNlYXJjaCwgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBzbHVnOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6IFwiaW5zZW5zaXRpdmVcIiB9IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgdGl0bGU6IHRydWUsIGRpZmZpY3VsdHk6IHRydWUsIHNsdWc6IHRydWUgfSxcbiAgICAgICAgICAgIHRha2U6IDEwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcHJvYmxlbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHByb2JsZW1zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcHJvYmxlbXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjY2VwdENvbnRlc3RSdWxlcyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHsgYWNjZXB0ZWRSdWxlczogdHJ1ZSB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9jb250ZXN0LyR7Y29udGVzdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBhY2NlcHQgcnVsZXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmlzaENvbnRlc3RBY3Rpb24oY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24udXBzZXJ0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgaXNGaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkQXQ6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wcm9ibGVtc2ApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmaW5pc2ggY29udGVzdFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZpbmFsaXplIENvbnRlc3QgJiBBd2FyZCBCYWRnZXNcbiAqIC0gQ2FsY3VsYXRlcyBsZWFkZXJib2FyZFxuICogLSBBd2FyZHMgR29sZCwgU2lsdmVyLCBCcm9uemUgdG8gVG9wIDNcbiAqIC0gTWFya3MgY29udGVzdCBhcyBmaW5hbGl6ZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplQ29udGVzdChjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIC8vIE9ubHkgYWRtaW5zIG9yIGNvbnRlc3QgbWFuYWdlcnMgY2FuIGZpbmFsaXplXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuICAgIGlmICghW1wiQURNSU5cIiwgXCJDT05URVNUX01BTkFHRVJcIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCIsIFwiVEVBQ0hFUlwiXS5pbmNsdWRlcyhjdXJyZW50VXNlci5yb2xlKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgIHNlbGVjdDogeyBpc0ZpbmFsaXplZDogdHJ1ZSwgdGl0bGU6IHRydWUgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG4gICAgICAgIGlmIChjb250ZXN0LmlzRmluYWxpemVkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBpcyBhbHJlYWR5IGZpbmFsaXplZFwiIH07XG5cbiAgICAgICAgLy8gUmV1c2UgbGVhZGVyYm9hcmQgbG9naWMgdG8gZ2V0IHJhbmtpbmdzXG4gICAgICAgIGNvbnN0IGxlYWRlcmJvYXJkID0gYXdhaXQgZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZCk7XG4gICAgICAgIGlmICghbGVhZGVyYm9hcmQuc3VjY2VzcyB8fCAhbGVhZGVyYm9hcmQuc3R1ZGVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggbGVhZGVyYm9hcmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSBsZWFkZXJib2FyZC5zdHVkZW50cyBhcyBhbnlbXTtcblxuICAgICAgICAvLyBBdCBsZWFzdCAxIHN0dWRlbnQgbmVlZGVkXG4gICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICAgICAgIGRhdGE6IHsgaXNGaW5hbGl6ZWQ6IHRydWUgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQ29udGVzdCBmaW5hbGl6ZWQgKG5vIHBhcnRpY2lwYW50cylcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG9wIDMgSURzXG4gICAgICAgIGNvbnN0IGdvbGRVc2VySWQgPSBzdHVkZW50c1swXT8uaWQ7XG4gICAgICAgIGNvbnN0IHNpbHZlclVzZXJJZCA9IHN0dWRlbnRzWzFdPy5pZDtcbiAgICAgICAgY29uc3QgYnJvbnplVXNlcklkID0gc3R1ZGVudHNbMl0/LmlkO1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICAvLyBBd2FyZCBHb2xkXG4gICAgICAgICAgICBpZiAoZ29sZFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGdvbGRVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBnb2xkQmFkZ2VzOiB7IGluY3JlbWVudDogMSB9IH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEF3YXJkIFNpbHZlclxuICAgICAgICAgICAgaWYgKHNpbHZlclVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNpbHZlclVzZXJJZCB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHNpbHZlckJhZGdlczogeyBpbmNyZW1lbnQ6IDEgfSB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBd2FyZCBCcm9uemVcbiAgICAgICAgICAgIGlmIChicm9uemVVc2VySWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBicm9uemVVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBicm9uemVCYWRnZXM6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYXJrIEZpbmFsaXplZFxuICAgICAgICAgICAgYXdhaXQgdHguY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGlzRmluYWxpemVkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZGApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHtnb2xkVXNlcklkfWApO1xuICAgICAgICBpZihzaWx2ZXJVc2VySWQpIHJldmFsaWRhdGVQYXRoKGAvcHJvZmlsZS8ke3NpbHZlclVzZXJJZH1gKTtcbiAgICAgICAgaWYoYnJvbnplVXNlcklkKSByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHticm9uemVVc2VySWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29udGVzdC0ke2NvbnRlc3RJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgbGVhZGVyYm9hcmQtJHtjb250ZXN0SWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmluYWxpemUgY29udGVzdDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZpbmFsaXplIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBWZXJpZnkgY29udGVzdCBwYXNzd29yZCB3aXRob3V0IHN0YXJ0aW5nIHNlc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb250ZXN0UGFzc3dvcmQoY29udGVzdElkOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHZlcmlmeSBjb250ZXN0IHBhc3N3b3JkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdmVyaWZ5IHBhc3N3b3JkXCIgfTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTdGFydCBhIGNvbnRlc3Qgc2Vzc2lvbiAtIHZhbGlkYXRlcyB0aW1lIGJvdW5kcyBhbmQgY3JlYXRlcyBzZXNzaW9uIElEXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydENvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBzdGFydFRpbWU6IHRydWUsIGVuZFRpbWU6IHRydWUsIGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gVGltZSBib3VuZHMgY2hlY2tcbiAgICAgICAgaWYgKG5vdyA8IGNvbnRlc3Quc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWQgeWV0XCIgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm93ID4gY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgYWxyZWFkeSBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgc2Vzc2lvbiBJRFxuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSBgJHtzZXNzaW9uLnVzZXIuaWR9LSR7Y29udGVzdElkfS0ke0RhdGUubm93KCl9YDtcblxuICAgICAgICAvLyBDaGVjayBmb3IgZXhpc3RpbmcgYWN0aXZlIHNlc3Npb24gKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1BhcnRpY2lwYXRpb24/LmlzQmxvY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIllvdSBoYXZlIGJlZW4gYmxvY2tlZCBmcm9tIHRoaXMgY29udGVzdCBkdWUgdG8gdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXhpc3RpbmdQYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGhhdmUgYWxyZWFkeSBmaW5pc2hlZCB0aGlzIGNvbnRlc3RcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIG9yIGNyZWF0ZSBwYXJ0aWNpcGF0aW9uIHdpdGggbmV3IHNlc3Npb25cbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uSWQ6IHBhcnRpY2lwYXRpb24uaWQsXG4gICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogTG9nIGEgY29udGVzdCB2aW9sYXRpb24gLSByZWNvcmRzIHRvIGRhdGFiYXNlIGFuZCB1cGRhdGVzIGNvdW50ZXJzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dDb250ZXN0VmlvbGF0aW9uKFxuICAgIGNvbnRlc3RJZDogc3RyaW5nLFxuICAgIHR5cGU6IFwiVEFCX1NXSVRDSFwiIHwgXCJGVUxMU0NSRUVOX0VYSVRcIiB8IFwiQ09QWV9QQVNURVwiIHwgXCJERVZUT09MU19PUEVOXCIgfCBcIktFWUJPQVJEX1NIT1JUQ1VUXCIgfCBcIk5BVklHQVRJT05fQVRURU1QVFwiIHwgXCJNVUxUSV9UQUJcIiB8IFwiU1VTUElDSU9VU19JTlBVVFwiLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgbWV0YWRhdGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFwYXJ0aWNpcGF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm8gYWN0aXZlIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNvdW50ZXIgdG8gaW5jcmVtZW50XG4gICAgICAgIGNvbnN0IGNvdW50ZXJGaWVsZCA9IHtcbiAgICAgICAgICAgIFRBQl9TV0lUQ0g6IFwidGFiU3dpdGNoQ291bnRcIixcbiAgICAgICAgICAgIEZVTExTQ1JFRU5fRVhJVDogXCJmdWxsc2NyZWVuRXhpdENvdW50XCIsXG4gICAgICAgICAgICBDT1BZX1BBU1RFOiBcImNvcHlQYXN0ZUNvdW50XCIsXG4gICAgICAgICAgICBERVZUT09MU19PUEVOOiBcImRldlRvb2xzQ291bnRcIixcbiAgICAgICAgICAgIEtFWUJPQVJEX1NIT1JUQ1VUOiBcImtleWJvYXJkQ291bnRcIixcbiAgICAgICAgICAgIE5BVklHQVRJT05fQVRURU1QVDogXCJuYXZpZ2F0aW9uQ291bnRcIixcbiAgICAgICAgICAgIE1VTFRJX1RBQjogXCJ0YWJTd2l0Y2hDb3VudFwiLFxuICAgICAgICAgICAgU1VTUElDSU9VU19JTlBVVDogXCJjb3B5UGFzdGVDb3VudFwiXG4gICAgICAgIH1bdHlwZV0gYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIFVzZSB0cmFuc2FjdGlvbiB0byBlbnN1cmUgYXRvbWljIHVwZGF0ZVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKGFzeW5jICh0eCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgbGFzdCB2aW9sYXRpb24gdGltZSB0byBwcmV2ZW50IHJhcGlkLWZpcmUgZHVwbGljYXRlcyAoU2VydmVyLXNpZGUgZGVib3VuY2UpXG4gICAgICAgICAgICBjb25zdCBsYXN0VmlvbGF0aW9uID0gYXdhaXQgdHguY29udGVzdFZpb2xhdGlvbi5maW5kRmlyc3Qoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0VmlvbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSBEYXRlLm5vdygpIC0gbGFzdFZpb2xhdGlvbi5jcmVhdGVkQXQuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIGxlc3MgdGhhbiAyIHNlY29uZHMgc2luY2UgbGFzdCB2aW9sYXRpb24sIGlnbm9yZSB0aGlzIG9uZVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDIwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sIC8vIFJldHVybiBleGlzdGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogcGFydGljaXBhdGlvbi5pc0Jsb2NrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBwYXJ0aWNpcGF0aW9uLnBlcm1hbmVudGx5QmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHBhcnRpY2lwYXRpb24udGVtcEJsb2NrZWRVbnRpbFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHZpb2xhdGlvbiByZWNvcmRcbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbnRlc3RWaW9sYXRpb24uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSA/PyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB0b3RhbCBhbmQgZGV0ZXJtaW5lIGJsb2NraW5nIHRpZXJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RvdGFsVmlvbGF0aW9ucyA9IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEZsYWcgPSBuZXdUb3RhbFZpb2xhdGlvbnMgPj0gMztcblxuICAgICAgICAgICAgLy8gVGllcmVkIGJsb2NraW5nIGxvZ2ljXG4gICAgICAgICAgICBsZXQgdGVtcEJsb2NrZWRVbnRpbDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHBlcm1hbmVudGx5QmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAobmV3VG90YWxWaW9sYXRpb25zID49IDYpIHtcbiAgICAgICAgICAgICAgICAvLyA2KyB2aW9sYXRpb25zID0gcGVybWFuZW50IGJsb2NrXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdUb3RhbFZpb2xhdGlvbnMgPj0gNCkge1xuICAgICAgICAgICAgICAgIC8vIDQtNSB2aW9sYXRpb25zID0gNSBtaW51dGUgdGVtcCBibG9ja1xuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWwgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgNSAqIDYwICogMTAwMCk7IC8vIDUgbWludXRlc1xuICAgICAgICAgICAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0eC5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBwYXJ0aWNpcGF0aW9uLmlkIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBbY291bnRlckZpZWxkXTogeyBpbmNyZW1lbnQ6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB7IGluY3JlbWVudDogMSB9LFxuICAgICAgICAgICAgICAgICAgICBpc0ZsYWdnZWQ6IHNob3VsZEZsYWcgfHwgcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQsXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcEJsb2NrZWRVbnRpbCxcbiAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcmVzdWx0LnRvdGFsVmlvbGF0aW9ucyxcbiAgICAgICAgICAgIGlzRmxhZ2dlZDogcmVzdWx0LmlzRmxhZ2dlZCxcbiAgICAgICAgICAgIGlzQmxvY2tlZDogcmVzdWx0LmlzQmxvY2tlZCxcbiAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHJlc3VsdC50ZW1wQmxvY2tlZFVudGlsPy50b0lTT1N0cmluZygpIHx8IG51bGwsXG4gICAgICAgICAgICBwZXJtYW5lbnRseUJsb2NrZWQ6IHJlc3VsdC5wZXJtYW5lbnRseUJsb2NrZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvZyB2aW9sYXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBsb2cgdmlvbGF0aW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGUgY29udGVzdCBzZXNzaW9uIC0gY2hlY2tzIGlmIHNlc3Npb24gaXMgdmFsaWQgZm9yIHN1Ym1pc3Npb25zXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgdmFsaWQ6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0YXJ0VGltZTogdHJ1ZSwgZW5kVGltZTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXBhcnRpY2lwYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIk5vIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYmxvY2tlZFxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0Jsb2NrZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIkJsb2NrZWQgZHVlIHRvIHZpb2xhdGlvbnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmluaXNoZWRcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBhbHJlYWR5IGZpbmlzaGVkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHNlc3Npb24gSUQgKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uLnNlc3Npb25JZCAhPT0gc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAvLyBMb2cgbXVsdGktdGFiIHZpb2xhdGlvblxuICAgICAgICAgICAgYXdhaXQgbG9nQ29udGVzdFZpb2xhdGlvbihjb250ZXN0SWQsIFwiTVVMVElfVEFCXCIsIFwiTXVsdGlwbGUgdGFicyBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIlNlc3Npb24gbWlzbWF0Y2ggLSBwb3NzaWJsZSBtdWx0aXBsZSB0YWJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRpbWUgYm91bmRzXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChub3cgPiBwYXJ0aWNpcGF0aW9uLmNvbnRlc3QuZW5kVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgZW5kZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcGFydGljaXBhdGlvbi50b3RhbFZpb2xhdGlvbnMsXG4gICAgICAgICAgICBpc0ZsYWdnZWQ6IHBhcnRpY2lwYXRpb24uaXNGbGFnZ2VkXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCB2YWxpZDogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBlbGlnaWJsZSB0byBzdWJtaXQgLSBwcmUtc3VibWlzc2lvbiB2YWxpZGF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1N1Ym1pc3Npb25FbGlnaWJpbGl0eShjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVzdDoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3RhcnRUaW1lOiB0cnVlLCBlbmRUaW1lOiB0cnVlIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcGFydGljaXBhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiTm8gcGFydGljaXBhdGlvbiBmb3VuZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB2YXJpb3VzIGNvbmRpdGlvbnNcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNCbG9ja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJCbG9ja2VkIGR1ZSB0byBleGNlc3NpdmUgdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJZb3UgaGF2ZSBhbHJlYWR5IGZpbmlzaGVkIHRoaXMgY29udGVzdFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAobm93IDwgcGFydGljaXBhdGlvbi5jb250ZXN0LnN0YXJ0VGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdyA+IHBhcnRpY2lwYXRpb24uY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJDb250ZXN0IGhhcyBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxpZ2libGU6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQgPyBbXCJZb3VyIHNlc3Npb24gaGFzIGJlZW4gZmxhZ2dlZCBmb3IgcmV2aWV3XCJdIDogW11cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IGVsaWdpYmxlOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IHBhcnRpY2lwYXRpb24gc3RhdHVzIC0gZm9yIFVJIHN0YXRlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYXJ0aWNpcGF0aW9uU3RhdHVzKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlc3Npb25JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBlcm1hbmVudGx5QmxvY2tlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0ZW1wIGJsb2NrIGhhcyBleHBpcmVkXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uPy50ZW1wQmxvY2tlZFVudGlsICYmIG5ldyBEYXRlKCkgPiBwYXJ0aWNpcGF0aW9uLnRlbXBCbG9ja2VkVW50aWwpIHtcbiAgICAgICAgICAgIC8vIFRlbXAgYmxvY2sgZXhwaXJlZCAtIHVuYmxvY2tcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZF9jb250ZXN0SWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiBwYXJ0aWNpcGF0aW9uIHx8IG51bGxcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGF0aW9uIHN0YXR1c1wiIH07XG4gICAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09OVEVTVCBNQU5BR0VSIC0gUEFSVElDSVBBTlQgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHZXQgYWxsIHBhcnRpY2lwYW50cyBmb3IgYSBjb250ZXN0IHdpdGggdmlvbGF0aW9uIGRldGFpbHMgKGZvciBtYW5hZ2VycylcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbnRlc3RQYXJ0aWNpcGFudHMoY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGNvbnRlc3QgbWFuYWdlci9jcmVhdG9yXG4gICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgIHNlbGVjdDogeyBjcmVhdG9ySWQ6IHRydWUgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFjb250ZXN0KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3QgaXNBdXRob3JpemVkID1cbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQ09OVEVTVF9NQU5BR0VSXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJURUFDSEVSXCIgfHxcbiAgICAgICAgY29udGVzdC5jcmVhdG9ySWQgPT09IGN1cnJlbnRVc2VyLmlkO1xuXG4gICAgaWYgKCFpc0F1dGhvcml6ZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnRzID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpb2xhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHRha2U6IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICB7IHBlcm1hbmVudGx5QmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IGlzQmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRvdGFsVmlvbGF0aW9uczogXCJkZXNjXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwYXJ0aWNpcGFudHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGFudHM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcGFydGljaXBhbnRzXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVW5ibG9jayBhIHBhcnRpY2lwYW50IChtYW5hZ2VyIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bmJsb2NrUGFydGljaXBhbnQoY29udGVzdElkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gQ2hlY2sgYXV0aG9yaXphdGlvblxuICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgY3JlYXRvcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgIGNvbnN0IGlzQXV0aG9yaXplZCA9XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQURNSU5cIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkNPTlRFU1RfTUFOQUdFUlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiVEVBQ0hFUlwiIHx8XG4gICAgICAgIGNvbnRlc3QuY3JlYXRvcklkID09PSBjdXJyZW50VXNlci5pZDtcblxuICAgIGlmICghaXNBdXRob3JpemVkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGwsXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IDAsXG4gICAgICAgICAgICAgICAgdGFiU3dpdGNoQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkV4aXRDb3VudDogMCxcbiAgICAgICAgICAgICAgICBjb3B5UGFzdGVDb3VudDogMCxcbiAgICAgICAgICAgICAgICBkZXZUb29sc0NvdW50OiAwLFxuICAgICAgICAgICAgICAgIGtleWJvYXJkQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkNvdW50OiAwLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdW5ibG9ja2VkQnk6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgIHVuYmxvY2tlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbnRlc3RzLyR7Y29udGVzdElkfS9wYXJ0aWNpcGFudHNgKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdW5ibG9jayBwYXJ0aWNpcGFudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVuYmxvY2sgcGFydGljaXBhbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlsZWQgdmlvbGF0aW9ucyBmb3IgYSBwYXJ0aWNpcGFudFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnRWaW9sYXRpb25zKGNvbnRlc3RJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIC8vIENoZWNrIGF1dGhvcml6YXRpb25cbiAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgc2VsZWN0OiB7IGNyZWF0b3JJZDogdHJ1ZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG5cbiAgICBjb25zdCBpc0F1dGhvcml6ZWQgPVxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkFETUlOXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJDT05URVNUX01BTkFHRVJcIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIlRFQUNIRVJcIiB8fFxuICAgICAgICBjb250ZXN0LmNyZWF0b3JJZCA9PT0gY3VycmVudFVzZXIuaWQ7XG5cbiAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcGFydGljaXBhdGlvbiB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHZpb2xhdGlvbnNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgY29udGVzdCBsZWFkZXJib2FyZFxuICogLSBGZXRjaGVzIGFsbCBwYXJ0aWNpcGF0aW9uc1xuICogLSBGZXRjaGVzIGFsbCByZWxldmFudCBzdWJtaXNzaW9uc1xuICogLSBDYWxjdWxhdGVzIHNjb3Jlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBsZWFkZXJib2FyZC0ke2NvbnRlc3RJZH1gKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJsZWFkZXJib2FyZFwiKVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgLy8gc3RhcnRlZEF0OiB7IG5vdDogbnVsbCB9IC8vIE9ubHkgc3RhcnRlZCBwYXJ0aWNpcGFudHMgKEZpeCBpZiBmaWVsZCBleGlzdHMsIG90aGVyd2lzZSByZWx5IG9uIGNyZWF0ZWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsdWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IG9yZGVyOiBcImFzY1wiIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBsZWFkZXJib2FyZCA9IGF3YWl0IFByb21pc2UuYWxsKHBhcnRpY2lwYXRpb25zLm1hcChhc3luYyAocCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IHZhbGlkIHN1Ym1pc3Npb25zIGZvciB0aGlzIHVzZXIgaW4gdGhpcyBjb250ZXN0XG4gICAgICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHAudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBndGU6IGNvbnRlc3Quc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbHRlOiBjb250ZXN0LmVuZFRpbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBzY29yZVxuICAgICAgICAgICAgLy8gTG9naWM6IEJlc3Qgc3VibWlzc2lvbiBwZXIgcHJvYmxlbSBjb3VudHNcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TY29yZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVNvbHZlVGltZXMgPSBuZXcgTWFwPHN0cmluZywgRGF0ZT4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1CZXN0U3VibWlzc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENvdW50ID0gcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuc2V0KHN1Yi5wcm9ibGVtSWQsIGN1cnJlbnRDb3VudCArIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5zdGF0dXMgPT09IFwiQUNDRVBURURcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QmVzdCA9IHByb2JsZW1TY29yZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1EZWYgPSBjb250ZXN0LnByb2JsZW1zLmZpbmQoY3AgPT4gY3AucHJvYmxlbUlkID09PSBzdWIucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U2NvcmUgPSBwcm9ibGVtRGVmPy5wcm9ibGVtLnNjb3JlIHx8IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heFNjb3JlID4gY3VycmVudEJlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtU2NvcmVzLnNldChzdWIucHJvYmxlbUlkLCBtYXhTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEJlc3RUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudEJlc3RUaW1lIHx8IHN1Yi5jcmVhdGVkQXQgPCBjdXJyZW50QmVzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbVNvbHZlVGltZXMuc2V0KHN1Yi5wcm9ibGVtSWQsIHN1Yi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLnNldChzdWIucHJvYmxlbUlkLCBzdWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgdG90YWxTY29yZSA9IDA7XG4gICAgICAgICAgICBsZXQgdG90YWxUaW1lTXMgPSAwO1xuXG4gICAgICAgICAgICBwcm9ibGVtU2NvcmVzLmZvckVhY2goKHNjb3JlLCBwcm9ibGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlbnRUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHByb2JsZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvbHZlbnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZU1zICs9IChzb2x2ZW50VGltZS5nZXRUaW1lKCkgLSBjb250ZXN0LnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBNYXAgc3RhdHMgZm9yIGVhY2ggcHJvYmxlbSBpbiB0aGUgY29udGVzdFxuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVN0YXRzID0gY29udGVzdC5wcm9ibGVtcy5tYXAoY3AgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlc3RTdWIgPSBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLmdldChjcC5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogY3AucHJvYmxlbUlkLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY3AucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogcHJvYmxlbVNjb3Jlcy5nZXQoY3AucHJvYmxlbUlkKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhTY29yZTogY3AucHJvYmxlbS5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzLmdldChjcC5wcm9ibGVtSWQpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZDogcHJvYmxlbVNjb3Jlcy5oYXMoY3AucHJvYmxlbUlkKSxcbiAgICAgICAgICAgICAgICAgICAgc29sdmVkQXQ6IHByb2JsZW1Tb2x2ZVRpbWVzLmdldChjcC5wcm9ibGVtSWQpLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogYmVzdFN1Yj8ubGFuZ3VhZ2U/Lm5hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VJZDogYmVzdFN1Yj8ubGFuZ3VhZ2U/LmlkIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucC51c2VyLFxuICAgICAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlLFxuICAgICAgICAgICAgICAgIHRpbWVUYWtlbjogdG90YWxUaW1lTXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXNTb2x2ZWQ6IHByb2JsZW1TY29yZXMuc2l6ZSxcbiAgICAgICAgICAgICAgICBwcm9ibGVtU3RhdHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBTb3J0OiBIaWdoIHNjb3JlIGZpcnN0LCB0aGVuIGxvdyB0aW1lIHRha2VuXG4gICAgICAgIGxlYWRlcmJvYXJkLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgICAgICAgICByZXR1cm4gYS50aW1lVGFrZW4gLSBiLnRpbWVUYWtlbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzdHVkZW50czogbGVhZGVyYm9hcmQsXG4gICAgICAgICAgICBpc0ZpbmFsaXplZDogY29udGVzdC5pc0ZpbmFsaXplZCxcbiAgICAgICAgICAgIHByb2JsZW1zOiBjb250ZXN0LnByb2JsZW1zLm1hcChjcCA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBjcC5wcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNwLnByb2JsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgIG1heFNjb3JlOiBjcC5wcm9ibGVtLnNjb3JlXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMZWFkZXJib2FyZCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIGxlYWRlcmJvYXJkXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgdXNlcidzIHJhbmtpbmcgaW4gYSBjb250ZXN0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0UmFua2luZyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldENvbnRlc3RMZWFkZXJib2FyZChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MgfHwgIXJlc3VsdC5zdHVkZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcmFua2luZ1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5rID0gcmVzdWx0LnN0dWRlbnRzLmZpbmRJbmRleCgoczogYW55KSA9PiBzLmlkID09PSBzZXNzaW9uLnVzZXIuaWQpICsgMTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCByYW5rOiByYW5rID4gMCA/IHJhbmsgOiBudWxsIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHJhbmtpbmdcIiB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoia1NBNCtCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/contest/ContestProtection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContestProtection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-x.js [app-client] (ecmascript) <export default as ShieldX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:705715 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$316d9e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:316d9e [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MAX_WARNINGS = 6;
const FLAG_THRESHOLD = 3;
// Blocked keyboard shortcuts
const BLOCKED_SHORTCUTS = [
    {
        key: "c",
        ctrl: true,
        shift: false
    },
    {
        key: "v",
        ctrl: true,
        shift: false
    },
    {
        key: "x",
        ctrl: true,
        shift: false
    },
    {
        key: "u",
        ctrl: true,
        shift: false
    },
    {
        key: "s",
        ctrl: true,
        shift: false
    },
    {
        key: "p",
        ctrl: true,
        shift: false
    },
    {
        key: "i",
        ctrl: true,
        shift: true
    },
    {
        key: "j",
        ctrl: true,
        shift: true
    },
    {
        key: "c",
        ctrl: true,
        shift: true
    },
    {
        key: "F12",
        ctrl: false,
        shift: false
    }
];
function ContestProtection({ contestId, sessionId, onAutoSubmit, onBlocked, paused = false }) {
    _s();
    const [violations, setViolations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        isFlagged: false,
        isBlocked: false,
        tempBlockedUntil: null,
        permanentlyBlocked: false
    });
    const [showWarningPopup, setShowWarningPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [needsFullscreen, setNeedsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentViolationType, setCurrentViolationType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isEditorLocked, setIsEditorLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tempBlockTimeLeft, setTempBlockTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const isMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const broadcastChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastViolationTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isProcessingViolation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isRefreshing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isNavigating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Track internal navigation to problem pages
    // Ref to track fullscreen needs for event listeners (avoids stale closures)
    const needsFullscreenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestProtection.useEffect": ()=>{
            needsFullscreenRef.current = needsFullscreen;
        }
    }["ContestProtection.useEffect"], [
        needsFullscreen
    ]);
    // Global debounce - only ONE violation allowed every 2 seconds
    const canLogViolation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ContestProtection.useCallback[canLogViolation]": ()=>{
            const now = Date.now();
            if (paused) return false;
            // If already processing or locked - DO NOT log more violations
            if (isProcessingViolation.current) return false;
            if (isEditorLocked) return false;
            // NOTE: We allow logging even if showWarningPopup is true (e.g. for tab switching while popup is open)
            // Violations are logged even during temp block to allow escalation to permanent block
            // 2 second global cooldown to prevent double-logging same event
            if (now - lastViolationTime.current < 2000) return false;
            return true;
        }
    }["ContestProtection.useCallback[canLogViolation]"], [
        isEditorLocked,
        paused
    ]);
    // Log violation to server and update state
    const handleViolation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ContestProtection.useCallback[handleViolation]": async (type, message)=>{
            // Skip if navigating internally (prevents false positives when clicking problems)
            if (!isMounted.current || isRefreshing.current || isNavigating.current) return;
            // Always show popup for user awareness
            setCurrentViolationType(message);
            setShowWarningPopup(true);
            // Keyboard shortcuts and copy/paste ONLY show warning, don't count as violations
            const warningOnlyTypes = [
                "KEYBOARD_SHORTCUT",
                "COPY_PASTE"
            ];
            if (warningOnlyTypes.includes(type)) {
                // Just show warning, don't log to server or increment counter
                return;
            }
            // But only log to server if cooldown passed
            if (!canLogViolation()) {
                return;
            }
            // Lock and update timestamp immediately
            isProcessingViolation.current = true;
            lastViolationTime.current = Date.now();
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logContestViolation"])(contestId, type, message);
                if (result.success) {
                    const newState = {
                        total: result.totalViolations || 0,
                        isFlagged: result.isFlagged || false,
                        isBlocked: result.isBlocked || false,
                        tempBlockedUntil: result.tempBlockedUntil || null,
                        permanentlyBlocked: result.permanentlyBlocked || false
                    };
                    setViolations(newState);
                    // Handle tiered escalation
                    if (result.permanentlyBlocked) {
                        setIsEditorLocked(true);
                        onBlocked?.();
                    } else if (result.tempBlockedUntil) {
                        setIsEditorLocked(true);
                        // Calculate time left
                        const timeLeft = new Date(result.tempBlockedUntil).getTime() - Date.now();
                        setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
                    }
                }
            } catch (error) {
                console.error("Failed to log violation:", error);
            } finally{
                isProcessingViolation.current = false;
            }
        }
    }["ContestProtection.useCallback[handleViolation]"], [
        contestId,
        canLogViolation,
        onAutoSubmit,
        onBlocked
    ]);
    // Check for existing block status on mount (persists across refresh)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestProtection.useEffect": ()=>{
            if (!contestId) return;
            const checkBlockStatus = {
                "ContestProtection.useEffect.checkBlockStatus": async ()=>{
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$316d9e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getParticipationStatus"])(contestId);
                    if (result.success && result.participation) {
                        const p = result.participation;
                        // ALWAYS sync the violation counts and flags
                        const newViolationState = {
                            total: p.totalViolations || 0,
                            isFlagged: p.isFlagged || false,
                            isBlocked: false,
                            tempBlockedUntil: null,
                            permanentlyBlocked: false
                        };
                        if (p.permanentlyBlocked) {
                            newViolationState.isBlocked = true;
                            newViolationState.permanentlyBlocked = true;
                            setIsEditorLocked(true);
                            onBlocked?.();
                        } else if (p.tempBlockedUntil) {
                            const blockEnd = new Date(p.tempBlockedUntil);
                            if (blockEnd > new Date()) {
                                newViolationState.isBlocked = true;
                                newViolationState.tempBlockedUntil = p.tempBlockedUntil;
                                setIsEditorLocked(true);
                                const timeLeft = blockEnd.getTime() - Date.now();
                                setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
                            }
                        } else if (p.isBlocked) {
                            newViolationState.isBlocked = true;
                            setIsEditorLocked(true);
                        }
                        setViolations(newViolationState);
                    }
                }
            }["ContestProtection.useEffect.checkBlockStatus"];
            checkBlockStatus();
        }
    }["ContestProtection.useEffect"], [
        contestId,
        onBlocked
    ]);
    // Countdown timer for temp block
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestProtection.useEffect": ()=>{
            if (tempBlockTimeLeft <= 0) return;
            const interval = setInterval({
                "ContestProtection.useEffect.interval": ()=>{
                    setTempBlockTimeLeft({
                        "ContestProtection.useEffect.interval": (prev)=>{
                            if (prev <= 1) {
                                // Timer expired - unblock
                                setIsEditorLocked(false);
                                setViolations({
                                    "ContestProtection.useEffect.interval": (v)=>({
                                            ...v,
                                            isBlocked: false,
                                            tempBlockedUntil: null
                                        })
                                }["ContestProtection.useEffect.interval"]);
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["ContestProtection.useEffect.interval"]);
                }
            }["ContestProtection.useEffect.interval"], 1000);
            return ({
                "ContestProtection.useEffect": ()=>clearInterval(interval)
            })["ContestProtection.useEffect"];
        }
    }["ContestProtection.useEffect"], [
        tempBlockTimeLeft > 0
    ]); // Keep boolean dependency but ensure it works on reset
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestProtection.useEffect": ()=>{
            if (!contestId || !sessionId) return;
            // Setup delay to prevent false positives
            const mountTimeout = setTimeout({
                "ContestProtection.useEffect.mountTimeout": ()=>{
                    isMounted.current = true;
                    // After refresh, check if we need to re-enter fullscreen
                    if (!document.fullscreenElement && !isRefreshing.current) {
                        setNeedsFullscreen(true);
                        needsFullscreenRef.current = true; // Immediate sync for event listeners
                    }
                }
            }["ContestProtection.useEffect.mountTimeout"], 3000);
            // =============================================
            // 1. MULTI-TAB DETECTION via BroadcastChannel
            // =============================================
            try {
                broadcastChannel.current = new BroadcastChannel(`contest-${contestId}`);
                // Announce presence
                broadcastChannel.current.postMessage({
                    type: "ping",
                    sessionId
                });
                // Listen for other tabs
                broadcastChannel.current.onmessage = ({
                    "ContestProtection.useEffect": (event)=>{
                        if (event.data.type === "ping" && event.data.sessionId !== sessionId) {
                            handleViolation("MULTI_TAB", "Contest opened in multiple tabs");
                            // Respond so the other tab knows
                            broadcastChannel.current?.postMessage({
                                type: "conflict",
                                sessionId
                            });
                        }
                        if (event.data.type === "conflict" && event.data.sessionId !== sessionId) {
                            handleViolation("MULTI_TAB", "Contest opened in multiple tabs");
                        }
                    }
                })["ContestProtection.useEffect"];
            } catch (e) {
                console.warn("BroadcastChannel not supported");
            }
            // =============================================
            // 2. FULLSCREEN ENFORCEMENT
            // =============================================
            const enterFullscreen = {
                "ContestProtection.useEffect.enterFullscreen": ()=>{
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch({
                            "ContestProtection.useEffect.enterFullscreen": ()=>{}
                        }["ContestProtection.useEffect.enterFullscreen"]);
                    }
                }
            }["ContestProtection.useEffect.enterFullscreen"];
            const handleFullscreenChange = {
                "ContestProtection.useEffect.handleFullscreenChange": ()=>{
                    if (!isMounted.current) return;
                    if (!document.fullscreenElement) {
                        handleViolation("FULLSCREEN_EXIT", "You exited fullscreen mode");
                    }
                }
            }["ContestProtection.useEffect.handleFullscreenChange"];
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            // =============================================
            // 3. COPY/PASTE/CUT PREVENTION
            // =============================================
            const preventClipboard = {
                "ContestProtection.useEffect.preventClipboard": (e)=>{
                    if (!isMounted.current) return;
                    e.preventDefault();
                    handleViolation("COPY_PASTE", `${e.type.charAt(0).toUpperCase() + e.type.slice(1)} is not allowed`);
                    return false;
                }
            }["ContestProtection.useEffect.preventClipboard"];
            document.addEventListener("copy", preventClipboard);
            document.addEventListener("cut", preventClipboard);
            document.addEventListener("paste", preventClipboard);
            // =============================================
            // 4. KEYBOARD SHORTCUT BLOCKING
            // =============================================
            const handleKeyDown = {
                "ContestProtection.useEffect.handleKeyDown": (e)=>{
                    if (!isMounted.current) return;
                    // Check against blocked shortcuts
                    const isBlocked = BLOCKED_SHORTCUTS.some({
                        "ContestProtection.useEffect.handleKeyDown.isBlocked": (shortcut)=>{
                            const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
                            const ctrlMatch = e.ctrlKey === shortcut.ctrl || e.metaKey === shortcut.ctrl;
                            const shiftMatch = e.shiftKey === shortcut.shift;
                            return keyMatch && ctrlMatch && shiftMatch;
                        }
                    }["ContestProtection.useEffect.handleKeyDown.isBlocked"]);
                    if (isBlocked) {
                        e.preventDefault();
                        e.stopPropagation();
                        handleViolation("KEYBOARD_SHORTCUT", `Blocked shortcut: ${e.ctrlKey ? "Ctrl+" : ""}${e.shiftKey ? "Shift+" : ""}${e.key}`);
                        return false;
                    }
                    // Detect Refresh to suppress false positives
                    const isRefresh = e.key === "F5" || e.key.toLowerCase() === "r" && (e.ctrlKey || e.metaKey);
                    if (isRefresh) {
                        isRefreshing.current = true;
                    }
                }
            }["ContestProtection.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown, true);
            // =============================================
            // 5. TAB SWITCH / FOCUS DETECTION
            // =============================================
            const handleVisibilityChange = {
                "ContestProtection.useEffect.handleVisibilityChange": ()=>{
                    if (!isMounted.current) return;
                    if (document.hidden) {
                        handleViolation("TAB_SWITCH", "You switched away from the contest tab");
                    }
                }
            }["ContestProtection.useEffect.handleVisibilityChange"];
            const handleWindowBlur = {
                "ContestProtection.useEffect.handleWindowBlur": ()=>{
                    if (!isMounted.current) return;
                    handleViolation("TAB_SWITCH", "Window lost focus");
                }
            }["ContestProtection.useEffect.handleWindowBlur"];
            document.addEventListener("visibilitychange", handleVisibilityChange);
            window.addEventListener("blur", handleWindowBlur);
            // =============================================
            // 5b. INTERACTION-BASED COMPLIANCE (Optimized)
            // =============================================
            // =============================================
            // 5b. INTERACTION-BASED COMPLIANCE (Optimization: Throttled)
            // =============================================
            let lastCheck = 0;
            const checkCompliance = {
                "ContestProtection.useEffect.checkCompliance": ()=>{
                    const now = Date.now();
                    // Throttle: Max once per 2 seconds during active interaction
                    if (now - lastCheck < 2000) return;
                    lastCheck = now;
                    if (!isMounted.current) return;
                    // Skip if already processing/blocked OR if waiting for fullscreen (using Ref for live value) OR PAUSED
                    if (paused || isProcessingViolation.current || isEditorLocked || showWarningPopup || needsFullscreenRef.current) return;
                    // 1. Check Fullscreen
                    if (!document.fullscreenElement && !isRefreshing.current) {
                        handleViolation("FULLSCREEN_EXIT", "You must stay in fullscreen mode");
                        return;
                    }
                }
            }["ContestProtection.useEffect.checkCompliance"];
            // Event-driven checks are sufficient without polling overhead
            document.addEventListener("mousedown", checkCompliance);
            document.addEventListener("keydown", checkCompliance);
            document.addEventListener("touchstart", checkCompliance);
            // No polling heartbeat needed - visibilitychange and fullscreenchange handle the critical events instantly
            // =============================================
            // 6. DEVTOOLS DETECTION (Event-Driven)
            // =============================================
            let resizeTimeout;
            const checkDevTools = {
                "ContestProtection.useEffect.checkDevTools": ()=>{
                    if (!isMounted.current) return;
                    const threshold = 160;
                    const widthDiff = window.outerWidth - window.innerWidth;
                    const heightDiff = window.outerHeight - window.innerHeight;
                    if (widthDiff > threshold || heightDiff > threshold) {
                        handleViolation("DEVTOOLS_OPEN", "Developer tools detected");
                    }
                }
            }["ContestProtection.useEffect.checkDevTools"];
            const handleResize = {
                "ContestProtection.useEffect.handleResize": ()=>{
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(checkDevTools, 500); // Debounce resize check
                }
            }["ContestProtection.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            // =============================================
            // 7. CONTEXT MENU DISABLE
            // =============================================
            const preventContextMenu = {
                "ContestProtection.useEffect.preventContextMenu": (e)=>{
                    e.preventDefault();
                    return false;
                }
            }["ContestProtection.useEffect.preventContextMenu"];
            document.addEventListener("contextmenu", preventContextMenu);
            // =============================================
            // 8. INTERNAL NAVIGATION TRACKING
            // =============================================
            // Track clicks on links to prevent false positives when navigating to problems
            const handleLinkClick = {
                "ContestProtection.useEffect.handleLinkClick": (e)=>{
                    const target = e.target;
                    const link = target.closest("a");
                    if (link) {
                        const href = link.getAttribute("href");
                        // If it's an internal link (same origin or relative path)
                        if (href && (href.startsWith("/") || href.startsWith(window.location.origin))) {
                            isNavigating.current = true;
                            // Reset after a short delay in case navigation is cancelled
                            setTimeout({
                                "ContestProtection.useEffect.handleLinkClick": ()=>{
                                    isNavigating.current = false;
                                }
                            }["ContestProtection.useEffect.handleLinkClick"], 2000);
                        }
                    }
                }
            }["ContestProtection.useEffect.handleLinkClick"];
            document.addEventListener("click", handleLinkClick, true);
            // =============================================
            // 8. BEFOREUNLOAD WARNING
            // =============================================
            const handleBeforeUnload = {
                "ContestProtection.useEffect.handleBeforeUnload": (e)=>{
                    isRefreshing.current = true; // Mark as refreshing/navigating
                // DISABLE LEAVE CONFIRMATION
                // e.preventDefault();
                // e.returnValue = "You are in contest mode. Are you sure you want to leave?";
                // return e.returnValue;
                }
            }["ContestProtection.useEffect.handleBeforeUnload"];
            window.addEventListener("beforeunload", handleBeforeUnload);
            // =============================================
            // 9. DRAG/DROP PREVENTION
            // =============================================
            const preventDragDrop = {
                "ContestProtection.useEffect.preventDragDrop": (e)=>{
                    e.preventDefault();
                    return false;
                }
            }["ContestProtection.useEffect.preventDragDrop"];
            document.addEventListener("dragover", preventDragDrop);
            document.addEventListener("drop", preventDragDrop);
            // Cleanup
            return ({
                "ContestProtection.useEffect": ()=>{
                    clearTimeout(mountTimeout);
                    clearTimeout(resizeTimeout);
                    broadcastChannel.current?.close();
                    document.removeEventListener("fullscreenchange", handleFullscreenChange);
                    document.removeEventListener("copy", preventClipboard);
                    document.removeEventListener("cut", preventClipboard);
                    document.removeEventListener("paste", preventClipboard);
                    document.removeEventListener("keydown", handleKeyDown, true);
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                    window.removeEventListener("blur", handleWindowBlur);
                    window.removeEventListener("resize", handleResize);
                    document.removeEventListener("mousedown", checkCompliance);
                    document.removeEventListener("keydown", checkCompliance);
                    document.removeEventListener("touchstart", checkCompliance);
                    document.removeEventListener("contextmenu", preventContextMenu);
                    document.removeEventListener("click", handleLinkClick, true);
                    window.removeEventListener("beforeunload", handleBeforeUnload);
                    document.removeEventListener("dragover", preventDragDrop);
                    document.removeEventListener("drop", preventDragDrop);
                }
            })["ContestProtection.useEffect"];
        }
    }["ContestProtection.useEffect"], [
        contestId,
        sessionId,
        handleViolation
    ]);
    const handleDismissWarning = ()=>{
        // Only allow dismissing if we successfully enter fullscreen
        const enterFullscreen = async ()=>{
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
                // Only if successful, close popup
                setShowWarningPopup(false);
            } catch (err) {
            // If user denies fullscreen or it fails, keep popup open
            // Maybe show a toast or shake animation in future
            }
        };
        enterFullscreen();
    };
    const handleReEnterFullscreen = ()=>{
        document.documentElement.requestFullscreen().then(()=>setNeedsFullscreen(false)).catch(()=>{
        // If fails, keeps the popup open
        });
    };
    const remainingWarnings = MAX_WARNINGS - violations.total;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            (isEditorLocked || showWarningPopup) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-[#141414] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-orange-100 dark:border-orange-500/20 transform transition-all scale-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-2 w-full ${violations.permanentlyBlocked ? "bg-red-500" : "bg-orange-500"}`
                        }, void 0, false, {
                            fileName: "[project]/components/contest/ContestProtection.tsx",
                            lineNumber: 548,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row gap-6 items-start md:items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${violations.permanentlyBlocked ? "bg-red-50 dark:bg-red-500/10 text-red-500" : "bg-orange-50 dark:bg-orange-500/10 text-orange-500"}`,
                                            children: violations.permanentlyBlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                                className: "w-8 h-8"
                                            }, void 0, false, {
                                                fileName: "[project]/components/contest/ContestProtection.tsx",
                                                lineNumber: 565,
                                                columnNumber: 21
                                            }, this) : tempBlockTimeLeft > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-8 h-8 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/contest/ContestProtection.tsx",
                                                lineNumber: 567,
                                                columnNumber: 21
                                            }, this) : isEditorLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "w-8 h-8"
                                            }, void 0, false, {
                                                fileName: "[project]/components/contest/ContestProtection.tsx",
                                                lineNumber: 569,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "w-8 h-8"
                                            }, void 0, false, {
                                                fileName: "[project]/components/contest/ContestProtection.tsx",
                                                lineNumber: 571,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-gray-900 dark:text-white leading-tight",
                                                    children: violations.permanentlyBlocked ? "Contest Session Terminated" : tempBlockTimeLeft > 0 ? "Temporary Suspension" : "Violation Detected"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 dark:text-gray-400 font-medium text-sm",
                                                    children: violations.permanentlyBlocked ? "Multiple violations detected. Your session has been permanently blocked." : tempBlockTimeLeft > 0 ? "Please wait for the timer to expire before continuing." : currentViolationType || "This action is prohibited during the contest."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 575,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 555,
                                    columnNumber: 15
                                }, this),
                                tempBlockTimeLeft > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20 flex flex-col items-center justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-orange-400 uppercase tracking-widest mb-2",
                                            children: "Access Resumes In"
                                        }, void 0, false, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 597,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-5xl font-black text-orange-500 font-mono tracking-tighter tabular-nums",
                                            children: [
                                                Math.floor(tempBlockTimeLeft / 60),
                                                ":",
                                                String(tempBlockTimeLeft % 60).padStart(2, "0")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 600,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 596,
                                    columnNumber: 17
                                }, this),
                                !violations.permanentlyBlocked && tempBlockTimeLeft <= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-gray-400 uppercase tracking-wider",
                                                    children: "Warning Level"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-gray-900 dark:text-white",
                                                    children: [
                                                        violations.total,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400 font-normal",
                                                            children: [
                                                                "/ ",
                                                                MAX_WARNINGS
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 610,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-full transition-all duration-500 ease-out ${violations.total >= 4 ? "bg-red-500" : "bg-orange-500"}`,
                                                style: {
                                                    width: `${Math.min(violations.total / MAX_WARNINGS * 100, 100)}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/contest/ContestProtection.tsx",
                                                lineNumber: 622,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 621,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-400",
                                                    children: "Low Risk"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 21
                                                }, this),
                                                violations.total >= 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 font-medium",
                                                    children: "Critical Risk"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500 font-medium",
                                                    children: "Caution"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 634,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 609,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8",
                                    children: !violations.permanentlyBlocked && tempBlockTimeLeft <= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDismissWarning,
                                        className: "w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform active:scale-[0.98] shadow-lg shadow-gray-200 dark:shadow-none",
                                        children: "Acknowledge & Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/components/contest/ContestProtection.tsx",
                                        lineNumber: 652,
                                        columnNumber: 19
                                    }, this) : tempBlockTimeLeft > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: true,
                                        className: "w-full py-4 bg-gray-100 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-600 rounded-xl font-bold cursor-not-allowed",
                                        children: "Suspended"
                                    }, void 0, false, {
                                        fileName: "[project]/components/contest/ContestProtection.tsx",
                                        lineNumber: 659,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full py-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 rounded-xl font-bold border border-red-100 dark:border-red-500/20 cursor-not-allowed",
                                        children: "Contact Administrator"
                                    }, void 0, false, {
                                        fileName: "[project]/components/contest/ContestProtection.tsx",
                                        lineNumber: 666,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 650,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/contest/ContestProtection.tsx",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/contest/ContestProtection.tsx",
                    lineNumber: 546,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/contest/ContestProtection.tsx",
                lineNumber: 545,
                columnNumber: 9
            }, this),
            needsFullscreen && !isEditorLocked && !showWarningPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border-2 border-orange-500 animate-in fade-in zoom-in duration-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-orange-600 px-6 py-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                                    className: "w-6 h-6 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 681,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-bold text-white uppercase tracking-wider",
                                    children: "Fullscreen Required"
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 682,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/contest/ContestProtection.tsx",
                            lineNumber: 680,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldX$3e$__["ShieldX"], {
                                        className: "w-10 h-10 text-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/contest/ContestProtection.tsx",
                                        lineNumber: 689,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 688,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 mb-2",
                                    children: "Re-activate Proctoring"
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 691,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-8 text-sm",
                                    children: "To continue your contest session, you must re-enter fullscreen mode. This is required for proctoring accuracy."
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 694,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleReEnterFullscreen,
                                    className: "w-full py-4 bg-orange-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                                            className: "w-5 h-5 group-hover:scale-110 transition-transform"
                                        }, void 0, false, {
                                            fileName: "[project]/components/contest/ContestProtection.tsx",
                                            lineNumber: 703,
                                            columnNumber: 17
                                        }, this),
                                        "Go Full Screen"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 699,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-tighter",
                                    children: "Do not attempt to stay in windowed mode"
                                }, void 0, false, {
                                    fileName: "[project]/components/contest/ContestProtection.tsx",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/contest/ContestProtection.tsx",
                            lineNumber: 687,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/contest/ContestProtection.tsx",
                    lineNumber: 679,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/contest/ContestProtection.tsx",
                lineNumber: 678,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-100 flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/contest/ContestProtection.tsx",
                        lineNumber: 717,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-700 dark:text-gray-300 font-medium",
                        children: "Proctored"
                    }, void 0, false, {
                        fileName: "[project]/components/contest/ContestProtection.tsx",
                        lineNumber: 718,
                        columnNumber: 9
                    }, this),
                    violations.total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2 py-0.5 bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded text-xs font-semibold",
                        children: violations.total
                    }, void 0, false, {
                        fileName: "[project]/components/contest/ContestProtection.tsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/contest/ContestProtection.tsx",
                lineNumber: 716,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ContestProtection, "TVtM+rsBi4sVC+dvWeq5XYlXRGE=");
_c = ContestProtection;
var _c;
__turbopack_context__.k.register(_c, "ContestProtection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/contest/ContestNavigationGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContestNavigationGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:705715 [app-client] (ecmascript) <text/javascript>");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ContestNavigationGuard({ contestId, allowedPaths }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const initialPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(pathname);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestNavigationGuard.useEffect": ()=>{
            if (!contestId) return;
            // =============================================
            // 1. BLOCK BROWSER BACK/FORWARD
            // =============================================
            // Push current state to prevent back navigation
            const pushState = {
                "ContestNavigationGuard.useEffect.pushState": ()=>{
                    window.history.pushState(null, "", window.location.href);
                }
            }["ContestNavigationGuard.useEffect.pushState"];
            pushState();
            const handlePopState = {
                "ContestNavigationGuard.useEffect.handlePopState": (e)=>{
                    e.preventDefault();
                    pushState();
                    // Log navigation attempt
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logContestViolation"])(contestId, "NAVIGATION_ATTEMPT", "Attempted to use browser back/forward");
                }
            }["ContestNavigationGuard.useEffect.handlePopState"];
            window.addEventListener("popstate", handlePopState);
            // =============================================
            // 2. INTERCEPT LINK CLICKS
            // =============================================
            const handleLinkClick = {
                "ContestNavigationGuard.useEffect.handleLinkClick": (e)=>{
                    const target = e.target;
                    const anchor = target.closest("a");
                    if (anchor) {
                        const href = anchor.getAttribute("href");
                        // Check if navigation is to an allowed path
                        // Ignore hash links, empty links, or javascript:void, or disabled links
                        if (href && href !== "#" && href.trim() !== "" && !href.startsWith("javascript:") && !allowedPaths.some({
                            "ContestNavigationGuard.useEffect.handleLinkClick": (path)=>href.startsWith(path)
                        }["ContestNavigationGuard.useEffect.handleLinkClick"])) {
                            e.preventDefault();
                            e.stopPropagation();
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logContestViolation"])(contestId, "NAVIGATION_ATTEMPT", `Attempted to navigate to: ${href}`);
                            return false;
                        }
                    }
                }
            }["ContestNavigationGuard.useEffect.handleLinkClick"];
            document.addEventListener("click", handleLinkClick, true);
            // =============================================
            // 3. MONITOR PATH CHANGES
            // =============================================
            // If path changes unexpectedly, redirect back
            if (pathname !== initialPath.current) {
                const isAllowed = allowedPaths.some({
                    "ContestNavigationGuard.useEffect.isAllowed": (path)=>pathname?.startsWith(path)
                }["ContestNavigationGuard.useEffect.isAllowed"]);
                if (!isAllowed) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$705715__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logContestViolation"])(contestId, "NAVIGATION_ATTEMPT", `Unexpected navigation to: ${pathname}`);
                    // Redirect back to contest
                    router.replace(initialPath.current || "/");
                }
            }
            return ({
                "ContestNavigationGuard.useEffect": ()=>{
                    window.removeEventListener("popstate", handlePopState);
                    document.removeEventListener("click", handleLinkClick, true);
                }
            })["ContestNavigationGuard.useEffect"];
        }
    }["ContestNavigationGuard.useEffect"], [
        contestId,
        pathname,
        allowedPaths,
        router
    ]);
    // This component doesn't render anything
    return null;
}
_s(ContestNavigationGuard, "iPG3cX6oJ0ELxv2WzWdEVpIspDc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ContestNavigationGuard;
var _c;
__turbopack_context__.k.register(_c, "ContestNavigationGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:2e5ad8 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab":"finishContestAction"},"actions/contest.ts",""] */ __turbopack_context__.s([
    "finishContestAction",
    ()=>finishContestAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var finishContestAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40cb9402bcb3cefb68c56b22e13de3a9f637bd31ab", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "finishContestAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29udGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCByZXZhbGlkYXRlVGFnIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IHVuc3RhYmxlX2NhY2hlIGFzIGNhY2hlLCB1bnN0YWJsZV9ub1N0b3JlIGFzIG5vU3RvcmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVUYWcsIGNhY2hlTGlmZSB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBhZnRlciB9IGZyb20gXCJuZXh0L3NlcnZlclwiOyAvLyBGb3IgYmFja2dyb3VuZCB0YXNrc1xuXG5jb25zdCBjb250ZXN0U2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgc3RhcnRUaW1lOiB6LmNvZXJjZS5kYXRlKCksXG4gICAgZW5kVGltZTogei5jb2VyY2UuZGF0ZSgpLFxuICAgIHZpc2liaWxpdHk6IHouZW51bShbXCJQVUJMSUNcIiwgXCJJTlNUSVRVVElPTlwiLCBcIkNMQVNTUk9PTVwiXSksXG4gICAgY2xhc3Nyb29tSWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LnN0cmluZygpKS5taW4oMSwgXCJTZWxlY3QgYXQgbGVhc3Qgb25lIHByb2JsZW1cIiksXG4gICAgY29udGVzdFBhc3N3b3JkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcmFuZG9taXplUXVlc3Rpb25zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KGZhbHNlKSxcbn0pO1xuXG5jb25zdCBjb250ZXN0V2l0aFByb2JsZW1zU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIHRpdGxlOiB6LnN0cmluZygpLm1pbigzLCBcIlRpdGxlIG11c3QgYmUgYXQgbGVhc3QgMyBjaGFyYWN0ZXJzXCIpLFxuICAgIHNsdWc6IHouc3RyaW5nKCkubWluKDMsIFwiU2x1ZyBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVyc1wiKSxcbiAgICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHN0YXJ0VGltZTogei5kYXRlKCksXG4gICAgZW5kVGltZTogei5kYXRlKCksXG4gICAgdmlzaWJpbGl0eTogei5lbnVtKFtcIlBVQkxJQ1wiLCBcIklOU1RJVFVUSU9OXCIsIFwiQ0xBU1NST09NXCJdKSxcbiAgICBoaWRkZW46IHouYm9vbGVhbigpLmRlZmF1bHQoZmFsc2UpLFxuICAgIGNsYXNzcm9vbUlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgaW5zdGl0dXRpb25JZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gICAgYmFja2dyb3VuZEltYWdlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcHJpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcnVsZXM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBwcm9ibGVtczogei5hcnJheSh6LmFueSgpKSwgLy8gRnVsbCBwcm9ibGVtIGRhdGEgb2JqZWN0c1xuICAgIGNvbnRlc3RQYXNzd29yZDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogei5ib29sZWFuKCkuZGVmYXVsdChmYWxzZSksXG59KTtcblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuLyoqXG4gKiBDYWNoZWQgZmV0Y2ggZm9yIHB1YmxpYyBjb250ZXN0c1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRQdWJsaWNDb250ZXN0cygpIHtcbiAgICBcInVzZSBjYWNoZVwiXG4gICAgY2FjaGVUYWcoXCJjb250ZXN0cy1wdWJsaWNcIik7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhY2hlTGlmZShcImNvbnRlc3RzXCIpO1xuXG4gICAgcmV0dXJuIHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiUFVCTElDXCIsXG4gICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHsgc2VsZWN0OiB7IHByb2JsZW1zOiB0cnVlIH0gfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBGZXRjaGVzIGNvbnRlc3RzIHZpc2libGUgdG8gdGhlIGN1cnJlbnQgdXNlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFZpc2libGVDb250ZXN0cygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICAgICAgY29uc3QgY29udGVzdHMgPSBhd2FpdCBnZXRQdWJsaWNDb250ZXN0cygpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0cyA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDogeyBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlc3RzID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBPUjogW1xuICAgICAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwiUFVCTElDXCIgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgQU5EOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIklOU1RJVFVUSU9OXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGluc3RpdHV0aW9uSWQ6IGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFORDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJDTEFTU1JPT01cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT1I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3Nyb29tOiB7IHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgX2NvdW50OiB7IHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9IH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmRlckJ5OiB7IHN0YXJ0VGltZTogXCJkZXNjXCIgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY29udGVzdHNcIiB9O1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIEZldGNoZXMgYSBzaW5nbGUgY29udGVzdCdzIGRldGFpbHMgd2l0aCBhdXRob3JpemF0aW9uLlxuICovXG4vKipcbiAqIENhY2hlZCBjb250ZXN0IGRldGFpbCBmZXRjaGVyXG4gKiBSZXR1cm5zIGNvbnRlc3QgZGF0YSB3aXRob3V0IHVzZXItc3BlY2lmaWMgY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDYWNoZWRDb250ZXN0KGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBjb250ZXN0LSR7Y29udGVzdElkfWApO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJjb250ZXN0LWRldGFpbFwiKTtcblxuICAgIHJldHVybiBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgb3JkZXI6IFwiYXNjXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbi8qKlxuICogRmV0Y2hlcyBhIHNpbmdsZSBjb250ZXN0J3MgZGV0YWlscyB3aXRoIGF1dGhvcml6YXRpb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0RGV0YWlsKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgZ2V0Q2FjaGVkQ29udGVzdChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghY29udGVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbj8udXNlciBhcyBhbnk7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb24gPSBjdXJyZW50VXNlciA/IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGhhc1N0YXJ0ZWQgPSBub3cgPj0gY29udGVzdC5zdGFydFRpbWU7XG4gICAgICAgIGNvbnN0IGlzQ3JlYXRvciA9IGN1cnJlbnRVc2VyPy5pZCA9PT0gY29udGVzdC5jcmVhdG9ySWQ7XG4gICAgICAgIGNvbnN0IGlzQWRtaW4gPSBjdXJyZW50VXNlcj8ucm9sZSA9PT0gXCJBRE1JTlwiO1xuXG4gICAgICAgIC8vIFZpc2liaWxpdHkgQ2hlY2tcbiAgICAgICAgbGV0IGlzQXV0aG9yaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIlBVQkxJQ1wiKSB7XG4gICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQWRtaW4pIHtcbiAgICAgICAgICAgIGlzQXV0aG9yaXplZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGlmIChpc0NyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXN0LnZpc2liaWxpdHkgPT09IFwiSU5TVElUVVRJT05cIikge1xuICAgICAgICAgICAgICAgIC8vIFVzZSA9PSBmb3IgbnVsbC91bmRlZmluZWQgbG9vc2UgZXF1YWxpdHkgY2hlY2tcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkID09IGNvbnRlc3QuaW5zdGl0dXRpb25JZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVzdC52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5yb2xsbWVudCA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZXN0LmNsYXNzcm9vbUlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRzOiB7IHNvbWU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgPSAhIWVucm9sbG1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gdGhpcyBjb250ZXN0LlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYW5TZWVQcm9ibGVtcyA9IChoYXNTdGFydGVkIHx8IGlzQWRtaW4gfHwgaXNDcmVhdG9yKSAmJiAocGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBpc0NyZWF0b3IgfHwgaXNBZG1pbik7XG5cbiAgICAgICAgLy8gRml4OiBJZiB0aGUgY29udGVzdCBpcyBvdmVyLCBhbGxvd2VkIHJvbGVzIHNob3VsZCBjaGVjayBwYXJ0aWNpcGF0aW9uIHByb3Blcmx5LFxuICAgICAgICAvLyBidXQgdHlwaWNhbGx5IGFsbG93cyB2aWV3aW5nIGlmIHB1YmxpYy9hdXRob3JpemVkLlxuICAgICAgICAvLyBCdXQgZm9yIFwiTGl2ZVwiIGNvbnRlc3RzLCB0aGUgY3VycmVudCBsb2dpYyBpcyBjb3JyZWN0LlxuXG4gICAgICAgIGNvbnN0IHJlcXVpcmVzUGFzc3dvcmQgPSAhIWNvbnRlc3QuY29udGVzdFBhc3N3b3JkO1xuXG4gICAgICAgIC8vIFNodWZmbGUgcHJvYmxlbXMgaWYgcmFuZG9taXplUXVlc3Rpb25zIGlzIGVuYWJsZWRcbiAgICAgICAgLy8gVXNlIGEgc2ltcGxlIHNlZWRlZCBzaHVmZmxlIGJhc2VkIG9uIHVzZXJJZCArIGNvbnRlc3RJZCBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgbGV0IHZpc2libGVQcm9ibGVtcyA9IGNhblNlZVByb2JsZW1zID8gY29udGVzdC5wcm9ibGVtcyA6IFtdO1xuXG4gICAgICAgIGlmIChjb250ZXN0LnJhbmRvbWl6ZVF1ZXN0aW9ucyAmJiBjdXJyZW50VXNlciAmJiB2aXNpYmxlUHJvYmxlbXMubGVuZ3RoID4gMCAmJiAhaXNBZG1pbiAmJiAhaXNDcmVhdG9yKSB7XG4gICAgICAgICAgICAvLyBTaW1wbGUgc3RyaW5nIGhhc2ggZnVuY3Rpb24gZm9yIHNlZWRpbmdcbiAgICAgICAgICAgIGNvbnN0IHNlZWRTdHIgPSBgJHtjdXJyZW50VXNlci5pZH0tJHtjb250ZXN0SWR9YDtcbiAgICAgICAgICAgIGxldCBzZWVkID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZFN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNlZWQgPSAoKHNlZWQgPDwgNSkgLSBzZWVkKSArIHNlZWRTdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBzZWVkIHw9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERldGVybWluaXN0aWMgc2h1ZmZsZVxuICAgICAgICAgICAgdmlzaWJsZVByb2JsZW1zID0gWy4uLnZpc2libGVQcm9ibGVtc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLnNpbihzZWVkKyspICogMTAwMDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh4IC0gTWF0aC5mbG9vcih4KSkgLSAwLjU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIHVzZXIncyBzb2x2ZWQgcHJvYmxlbXMgZm9yIHRoaXMgY29udGVzdFxuICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3Qgc29sdmVkU3VibWlzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc3VibWlzc2lvbi5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJBQ0NFUFRFRFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluOiB2aXNpYmxlUHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbUlkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29sdmVkU3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHNvbHZlZFByb2JsZW1JZHMuYWRkKHMucHJvYmxlbUlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5jb250ZXN0LFxuICAgICAgICAgICAgICAgIHByb2JsZW1zOiB2aXNpYmxlUHJvYmxlbXMubWFwKHZwID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnZwLFxuICAgICAgICAgICAgICAgICAgICBpc1NvbHZlZDogc29sdmVkUHJvYmxlbUlkcy5oYXModnAucHJvYmxlbS5pZClcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgaGFzU3RhcnRlZCxcbiAgICAgICAgICAgICAgICBoYXNFbmRlZDogbm93ID4gY29udGVzdC5lbmRUaW1lLFxuICAgICAgICAgICAgICAgIGNhbk1hbmFnZTogaXNBZG1pbiB8fCBpc0NyZWF0b3IsXG4gICAgICAgICAgICAgICAgaGFzQWNjZXB0ZWRSdWxlczogcGFydGljaXBhdGlvbj8uYWNjZXB0ZWRSdWxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiBwYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkIHx8IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiBudWxsLCAvLyBOZXZlciByZXR1cm4gcGxhaW4gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHBhcnRpY2lwYXRpb24/LnNlc3Npb25JZCAvLyBSZXR1cm4gc2Vzc2lvbklkIGZvciBwcm90ZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb250ZXN0IGRldGFpbDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLy8gLi4uIGV4aXN0aW5nIGNvZGUgLi4uXG5cbi8vIC4uLiBleGlzdGluZyBjb2RlIC4uLlxuXG4vLyAuLi4gZXhpc3RpbmcgY29kZSAuLi5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3QoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFNjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgYSBtb3JlIHJvYnVzdCB1bmlxdWUgc2x1Z1xuICAgICAgICBjb25zdCBiYXNlU2x1ZyA9IHZhbGlkYXRlZERhdGEudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiLVwiKS5yZXBsYWNlKC8oXi18LSQpL2csIFwiXCIpO1xuICAgICAgICBjb25zdCB1bmlxdWVTbHVnID0gYCR7YmFzZVNsdWd9LSR7RGF0ZS5ub3coKX1gO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB2YWxpZGF0ZWREYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIHNsdWc6IHVuaXF1ZVNsdWcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiB2YWxpZGF0ZWREYXRhLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB2YWxpZGF0ZWREYXRhLmVuZFRpbWUsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICBpbnN0aXR1dGlvbklkOiB2YWxpZGF0ZWREYXRhLnZpc2liaWxpdHkgIT09IFwiUFVCTElDXCIgPyAodmFsaWRhdGVkRGF0YS5pbnN0aXR1dGlvbklkIHx8IG51bGwpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdFBhc3N3b3JkOiB2YWxpZGF0ZWREYXRhLmNvbnRlc3RQYXNzd29yZCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiB2YWxpZGF0ZWREYXRhLnByb2JsZW1zLm1hcCgocHJvYmxlbUlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvY29udGVzdHNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2NvbnRlc3RcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoXCJjb250ZXN0c1wiLCBcIm1heFwiKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY29udGVzdElkOiBjb250ZXN0LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0OlwiLCBlcnJvcik7XG4gICAgICAgIC8vIFJldHVybiBjbGVhcmVyIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gKGVycm9yIGFzIGFueSkuZXJyb3JzLm1hcCgoZTogYW55KSA9PiBlLm1lc3NhZ2UpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICAgIH1cbiAgICB9XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRlc3RXaXRoUHJvYmxlbXMoZGF0YTogei5pbmZlcjx0eXBlb2YgY29udGVzdFdpdGhQcm9ibGVtc1NjaGVtYT4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIkNPTlRFU1RfTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IGNvbnRlc3RXaXRoUHJvYmxlbXNTY2hlbWEucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgdHguY29udGVzdC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZhbGlkYXRlZERhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHNsdWc6IHZhbGlkYXRlZERhdGEuc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbGlkYXRlZERhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogdmFsaWRhdGVkRGF0YS5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHZhbGlkYXRlZERhdGEuZW5kVGltZSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5IGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB2YWxpZGF0ZWREYXRhLmhpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiB2YWxpZGF0ZWREYXRhLmJhY2tncm91bmRJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpemVzOiB2YWxpZGF0ZWREYXRhLnByaXplcyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHZhbGlkYXRlZERhdGEucnVsZXMsXG4gICAgICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEudmlzaWJpbGl0eSAhPT0gXCJQVUJMSUNcIiA/ICh2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogdmFsaWRhdGVkRGF0YS52aXNpYmlsaXR5ID09PSBcIkNMQVNTUk9PTVwiID8gKHZhbGlkYXRlZERhdGEuY2xhc3Nyb29tSWQgfHwgbnVsbCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0UGFzc3dvcmQ6IHZhbGlkYXRlZERhdGEuY29udGVzdFBhc3N3b3JkIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVF1ZXN0aW9uczogdmFsaWRhdGVkRGF0YS5yYW5kb21pemVRdWVzdGlvbnMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsaWRhdGVkRGF0YS5wcm9ibGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSB2YWxpZGF0ZWREYXRhLnByb2JsZW1zW2ldO1xuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBzbHVnIGJ5IGFwcGVuZGluZyBjb250ZXN0IHNsdWcgYW5kIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlU2x1ZyA9IGAke3ZhbGlkYXRlZERhdGEuc2x1Z30tJHtwLnNsdWcgfHwgcC50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKX0tJHtEYXRlLm5vdygpfS0ke2l9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ibGVtID0gYXdhaXQgdHgucHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogcC5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2x1ZzogdW5pcXVlU2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiBwLnNjb3JlIHx8IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBwLmRvbWFpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiQ09OVEVTVFwiLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBtYXJrZWQgc2VwYXJhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBDb250ZXN0IHByb2JsZW1zIGFyZSBoaWRkZW4gZnJvbSBtYWluIGJhbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RDYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogcC50ZXN0Q2FzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Q6IHAudGFncz8ubWFwKCh0OiBzdHJpbmcpID0+ICh7IG5hbWU6IHQgfSkpIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5jb250ZXN0UHJvYmxlbS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHByb2JsZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29udGVzdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2NvbnRlc3RzXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9jb250ZXN0c1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvY29udGVzdFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhcImNvbnRlc3RzXCIsIFwibWF4XCIpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb250ZXN0SWQ6IGNvbnRlc3QuaWQgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjb250ZXN0IHdpdGggcHJvYmxlbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY29udGVzdFwiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW5zdGl0dXRpb25hbENsYXNzcm9vbXMoaW5zdGl0dXRpb25JZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlLCBzZWN0aW9uOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tc1wiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZVByb2JsZW1zKHNlYXJjaDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBhd2FpdCBwcmlzbWEucHJvYmxlbS5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IHsgY29udGFpbnM6IHNlYXJjaCwgbW9kZTogXCJpbnNlbnNpdGl2ZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBzbHVnOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6IFwiaW5zZW5zaXRpdmVcIiB9IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgdGl0bGU6IHRydWUsIGRpZmZpY3VsdHk6IHRydWUsIHNsdWc6IHRydWUgfSxcbiAgICAgICAgICAgIHRha2U6IDEwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcHJvYmxlbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHByb2JsZW1zOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcHJvYmxlbXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjY2VwdENvbnRlc3RSdWxlcyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHsgYWNjZXB0ZWRSdWxlczogdHJ1ZSB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9jb250ZXN0LyR7Y29udGVzdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBhY2NlcHQgcnVsZXNcIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmlzaENvbnRlc3RBY3Rpb24oY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24udXBzZXJ0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgaXNGaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkQXQ6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wcm9ibGVtc2ApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmaW5pc2ggY29udGVzdFwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZpbmFsaXplIENvbnRlc3QgJiBBd2FyZCBCYWRnZXNcbiAqIC0gQ2FsY3VsYXRlcyBsZWFkZXJib2FyZFxuICogLSBBd2FyZHMgR29sZCwgU2lsdmVyLCBCcm9uemUgdG8gVG9wIDNcbiAqIC0gTWFya3MgY29udGVzdCBhcyBmaW5hbGl6ZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplQ29udGVzdChjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIC8vIE9ubHkgYWRtaW5zIG9yIGNvbnRlc3QgbWFuYWdlcnMgY2FuIGZpbmFsaXplXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuICAgIGlmICghW1wiQURNSU5cIiwgXCJDT05URVNUX01BTkFHRVJcIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCIsIFwiVEVBQ0hFUlwiXS5pbmNsdWRlcyhjdXJyZW50VXNlci5yb2xlKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgIHNlbGVjdDogeyBpc0ZpbmFsaXplZDogdHJ1ZSwgdGl0bGU6IHRydWUgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG4gICAgICAgIGlmIChjb250ZXN0LmlzRmluYWxpemVkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBpcyBhbHJlYWR5IGZpbmFsaXplZFwiIH07XG5cbiAgICAgICAgLy8gUmV1c2UgbGVhZGVyYm9hcmQgbG9naWMgdG8gZ2V0IHJhbmtpbmdzXG4gICAgICAgIGNvbnN0IGxlYWRlcmJvYXJkID0gYXdhaXQgZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZCk7XG4gICAgICAgIGlmICghbGVhZGVyYm9hcmQuc3VjY2VzcyB8fCAhbGVhZGVyYm9hcmQuc3R1ZGVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggbGVhZGVyYm9hcmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSBsZWFkZXJib2FyZC5zdHVkZW50cyBhcyBhbnlbXTtcblxuICAgICAgICAvLyBBdCBsZWFzdCAxIHN0dWRlbnQgbmVlZGVkXG4gICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICBhd2FpdCBwcmlzbWEuY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICAgICAgIGRhdGE6IHsgaXNGaW5hbGl6ZWQ6IHRydWUgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQ29udGVzdCBmaW5hbGl6ZWQgKG5vIHBhcnRpY2lwYW50cylcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVG9wIDMgSURzXG4gICAgICAgIGNvbnN0IGdvbGRVc2VySWQgPSBzdHVkZW50c1swXT8uaWQ7XG4gICAgICAgIGNvbnN0IHNpbHZlclVzZXJJZCA9IHN0dWRlbnRzWzFdPy5pZDtcbiAgICAgICAgY29uc3QgYnJvbnplVXNlcklkID0gc3R1ZGVudHNbMl0/LmlkO1xuXG4gICAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICAgICAgICAvLyBBd2FyZCBHb2xkXG4gICAgICAgICAgICBpZiAoZ29sZFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGdvbGRVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBnb2xkQmFkZ2VzOiB7IGluY3JlbWVudDogMSB9IH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEF3YXJkIFNpbHZlclxuICAgICAgICAgICAgaWYgKHNpbHZlclVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNpbHZlclVzZXJJZCB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHNpbHZlckJhZGdlczogeyBpbmNyZW1lbnQ6IDEgfSB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBd2FyZCBCcm9uemVcbiAgICAgICAgICAgIGlmIChicm9uemVVc2VySWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBicm9uemVVc2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBicm9uemVCYWRnZXM6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYXJrIEZpbmFsaXplZFxuICAgICAgICAgICAgYXdhaXQgdHguY29udGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGlzRmluYWxpemVkOiB0cnVlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZGApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHtnb2xkVXNlcklkfWApO1xuICAgICAgICBpZihzaWx2ZXJVc2VySWQpIHJldmFsaWRhdGVQYXRoKGAvcHJvZmlsZS8ke3NpbHZlclVzZXJJZH1gKTtcbiAgICAgICAgaWYoYnJvbnplVXNlcklkKSByZXZhbGlkYXRlUGF0aChgL3Byb2ZpbGUvJHticm9uemVVc2VySWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvY29udGVzdC8ke2NvbnRlc3RJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgY29udGVzdC0ke2NvbnRlc3RJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgbGVhZGVyYm9hcmQtJHtjb250ZXN0SWR9YCwgXCJtYXhcIik7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmluYWxpemUgY29udGVzdDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZpbmFsaXplIGNvbnRlc3RcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBWZXJpZnkgY29udGVzdCBwYXNzd29yZCB3aXRob3V0IHN0YXJ0aW5nIHNlc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb250ZXN0UGFzc3dvcmQoY29udGVzdElkOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHZlcmlmeSBjb250ZXN0IHBhc3N3b3JkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdmVyaWZ5IHBhc3N3b3JkXCIgfTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTdGFydCBhIGNvbnRlc3Qgc2Vzc2lvbiAtIHZhbGlkYXRlcyB0aW1lIGJvdW5kcyBhbmQgY3JlYXRlcyBzZXNzaW9uIElEXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydENvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBzdGFydFRpbWU6IHRydWUsIGVuZFRpbWU6IHRydWUsIGNvbnRlc3RQYXNzd29yZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBpZiAoY29udGVzdC5jb250ZXN0UGFzc3dvcmQgJiYgY29udGVzdC5jb250ZXN0UGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBjb250ZXN0IHBhc3N3b3JkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gVGltZSBib3VuZHMgY2hlY2tcbiAgICAgICAgaWYgKG5vdyA8IGNvbnRlc3Quc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWQgeWV0XCIgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm93ID4gY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBoYXMgYWxyZWFkeSBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgc2Vzc2lvbiBJRFxuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSBgJHtzZXNzaW9uLnVzZXIuaWR9LSR7Y29udGVzdElkfS0ke0RhdGUubm93KCl9YDtcblxuICAgICAgICAvLyBDaGVjayBmb3IgZXhpc3RpbmcgYWN0aXZlIHNlc3Npb24gKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1BhcnRpY2lwYXRpb24/LmlzQmxvY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIllvdSBoYXZlIGJlZW4gYmxvY2tlZCBmcm9tIHRoaXMgY29udGVzdCBkdWUgdG8gdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXhpc3RpbmdQYXJ0aWNpcGF0aW9uPy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGhhdmUgYWxyZWFkeSBmaW5pc2hlZCB0aGlzIGNvbnRlc3RcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIG9yIGNyZWF0ZSBwYXJ0aWNpcGF0aW9uIHdpdGggbmV3IHNlc3Npb25cbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cHNlcnQoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0ZWRBdDogbm93LFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkUnVsZXM6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uSWQ6IHBhcnRpY2lwYXRpb24uaWQsXG4gICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RhcnQgY29udGVzdCBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogTG9nIGEgY29udGVzdCB2aW9sYXRpb24gLSByZWNvcmRzIHRvIGRhdGFiYXNlIGFuZCB1cGRhdGVzIGNvdW50ZXJzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dDb250ZXN0VmlvbGF0aW9uKFxuICAgIGNvbnRlc3RJZDogc3RyaW5nLFxuICAgIHR5cGU6IFwiVEFCX1NXSVRDSFwiIHwgXCJGVUxMU0NSRUVOX0VYSVRcIiB8IFwiQ09QWV9QQVNURVwiIHwgXCJERVZUT09MU19PUEVOXCIgfCBcIktFWUJPQVJEX1NIT1JUQ1VUXCIgfCBcIk5BVklHQVRJT05fQVRURU1QVFwiIHwgXCJNVUxUSV9UQUJcIiB8IFwiU1VTUElDSU9VU19JTlBVVFwiLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgbWV0YWRhdGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFwYXJ0aWNpcGF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiTm8gYWN0aXZlIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNvdW50ZXIgdG8gaW5jcmVtZW50XG4gICAgICAgIGNvbnN0IGNvdW50ZXJGaWVsZCA9IHtcbiAgICAgICAgICAgIFRBQl9TV0lUQ0g6IFwidGFiU3dpdGNoQ291bnRcIixcbiAgICAgICAgICAgIEZVTExTQ1JFRU5fRVhJVDogXCJmdWxsc2NyZWVuRXhpdENvdW50XCIsXG4gICAgICAgICAgICBDT1BZX1BBU1RFOiBcImNvcHlQYXN0ZUNvdW50XCIsXG4gICAgICAgICAgICBERVZUT09MU19PUEVOOiBcImRldlRvb2xzQ291bnRcIixcbiAgICAgICAgICAgIEtFWUJPQVJEX1NIT1JUQ1VUOiBcImtleWJvYXJkQ291bnRcIixcbiAgICAgICAgICAgIE5BVklHQVRJT05fQVRURU1QVDogXCJuYXZpZ2F0aW9uQ291bnRcIixcbiAgICAgICAgICAgIE1VTFRJX1RBQjogXCJ0YWJTd2l0Y2hDb3VudFwiLFxuICAgICAgICAgICAgU1VTUElDSU9VU19JTlBVVDogXCJjb3B5UGFzdGVDb3VudFwiXG4gICAgICAgIH1bdHlwZV0gYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIFVzZSB0cmFuc2FjdGlvbiB0byBlbnN1cmUgYXRvbWljIHVwZGF0ZVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKGFzeW5jICh0eCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgbGFzdCB2aW9sYXRpb24gdGltZSB0byBwcmV2ZW50IHJhcGlkLWZpcmUgZHVwbGljYXRlcyAoU2VydmVyLXNpZGUgZGVib3VuY2UpXG4gICAgICAgICAgICBjb25zdCBsYXN0VmlvbGF0aW9uID0gYXdhaXQgdHguY29udGVzdFZpb2xhdGlvbi5maW5kRmlyc3Qoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCB9LFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0VmlvbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSBEYXRlLm5vdygpIC0gbGFzdFZpb2xhdGlvbi5jcmVhdGVkQXQuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIGxlc3MgdGhhbiAyIHNlY29uZHMgc2luY2UgbGFzdCB2aW9sYXRpb24sIGlnbm9yZSB0aGlzIG9uZVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDIwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sIC8vIFJldHVybiBleGlzdGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGbGFnZ2VkOiBwYXJ0aWNpcGF0aW9uLmlzRmxhZ2dlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogcGFydGljaXBhdGlvbi5pc0Jsb2NrZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBwYXJ0aWNpcGF0aW9uLnBlcm1hbmVudGx5QmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHBhcnRpY2lwYXRpb24udGVtcEJsb2NrZWRVbnRpbFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHZpb2xhdGlvbiByZWNvcmRcbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbnRlc3RWaW9sYXRpb24uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRpb25JZDogcGFydGljaXBhdGlvbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSA/PyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB0b3RhbCBhbmQgZGV0ZXJtaW5lIGJsb2NraW5nIHRpZXJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RvdGFsVmlvbGF0aW9ucyA9IHBhcnRpY2lwYXRpb24udG90YWxWaW9sYXRpb25zICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEZsYWcgPSBuZXdUb3RhbFZpb2xhdGlvbnMgPj0gMztcblxuICAgICAgICAgICAgLy8gVGllcmVkIGJsb2NraW5nIGxvZ2ljXG4gICAgICAgICAgICBsZXQgdGVtcEJsb2NrZWRVbnRpbDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHBlcm1hbmVudGx5QmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAobmV3VG90YWxWaW9sYXRpb25zID49IDYpIHtcbiAgICAgICAgICAgICAgICAvLyA2KyB2aW9sYXRpb25zID0gcGVybWFuZW50IGJsb2NrXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdUb3RhbFZpb2xhdGlvbnMgPj0gNCkge1xuICAgICAgICAgICAgICAgIC8vIDQtNSB2aW9sYXRpb25zID0gNSBtaW51dGUgdGVtcCBibG9ja1xuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWwgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgNSAqIDYwICogMTAwMCk7IC8vIDUgbWludXRlc1xuICAgICAgICAgICAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0eC5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBwYXJ0aWNpcGF0aW9uLmlkIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBbY291bnRlckZpZWxkXTogeyBpbmNyZW1lbnQ6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB7IGluY3JlbWVudDogMSB9LFxuICAgICAgICAgICAgICAgICAgICBpc0ZsYWdnZWQ6IHNob3VsZEZsYWcgfHwgcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQsXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcEJsb2NrZWRVbnRpbCxcbiAgICAgICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcmVzdWx0LnRvdGFsVmlvbGF0aW9ucyxcbiAgICAgICAgICAgIGlzRmxhZ2dlZDogcmVzdWx0LmlzRmxhZ2dlZCxcbiAgICAgICAgICAgIGlzQmxvY2tlZDogcmVzdWx0LmlzQmxvY2tlZCxcbiAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IHJlc3VsdC50ZW1wQmxvY2tlZFVudGlsPy50b0lTT1N0cmluZygpIHx8IG51bGwsXG4gICAgICAgICAgICBwZXJtYW5lbnRseUJsb2NrZWQ6IHJlc3VsdC5wZXJtYW5lbnRseUJsb2NrZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvZyB2aW9sYXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBsb2cgdmlvbGF0aW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGUgY29udGVzdCBzZXNzaW9uIC0gY2hlY2tzIGlmIHNlc3Npb24gaXMgdmFsaWQgZm9yIHN1Ym1pc3Npb25zXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUNvbnRlc3RTZXNzaW9uKGNvbnRlc3RJZDogc3RyaW5nLCBzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgdmFsaWQ6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNvbnRlc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0YXJ0VGltZTogdHJ1ZSwgZW5kVGltZTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXBhcnRpY2lwYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIk5vIHBhcnRpY2lwYXRpb24gZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYmxvY2tlZFxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0Jsb2NrZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIkJsb2NrZWQgZHVlIHRvIHZpb2xhdGlvbnNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmluaXNoZWRcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBhbHJlYWR5IGZpbmlzaGVkXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHNlc3Npb24gSUQgKG11bHRpLXRhYiBkZXRlY3Rpb24pXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uLnNlc3Npb25JZCAhPT0gc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAvLyBMb2cgbXVsdGktdGFiIHZpb2xhdGlvblxuICAgICAgICAgICAgYXdhaXQgbG9nQ29udGVzdFZpb2xhdGlvbihjb250ZXN0SWQsIFwiTVVMVElfVEFCXCIsIFwiTXVsdGlwbGUgdGFicyBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHZhbGlkOiBmYWxzZSwgcmVhc29uOiBcIlNlc3Npb24gbWlzbWF0Y2ggLSBwb3NzaWJsZSBtdWx0aXBsZSB0YWJzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRpbWUgYm91bmRzXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChub3cgPiBwYXJ0aWNpcGF0aW9uLmNvbnRlc3QuZW5kVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgZW5kZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRvdGFsVmlvbGF0aW9uczogcGFydGljaXBhdGlvbi50b3RhbFZpb2xhdGlvbnMsXG4gICAgICAgICAgICBpc0ZsYWdnZWQ6IHBhcnRpY2lwYXRpb24uaXNGbGFnZ2VkXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCB2YWxpZDogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2YWxpZGF0ZSBzZXNzaW9uXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBlbGlnaWJsZSB0byBzdWJtaXQgLSBwcmUtc3VibWlzc2lvbiB2YWxpZGF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1N1Ym1pc3Npb25FbGlnaWJpbGl0eShjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVzdDoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3RhcnRUaW1lOiB0cnVlLCBlbmRUaW1lOiB0cnVlIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcGFydGljaXBhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiTm8gcGFydGljaXBhdGlvbiBmb3VuZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB2YXJpb3VzIGNvbmRpdGlvbnNcbiAgICAgICAgaWYgKHBhcnRpY2lwYXRpb24uaXNCbG9ja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJCbG9ja2VkIGR1ZSB0byBleGNlc3NpdmUgdmlvbGF0aW9uc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydGljaXBhdGlvbi5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJZb3UgaGF2ZSBhbHJlYWR5IGZpbmlzaGVkIHRoaXMgY29udGVzdFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAobm93IDwgcGFydGljaXBhdGlvbi5jb250ZXN0LnN0YXJ0VGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZWxpZ2libGU6IGZhbHNlLCByZWFzb246IFwiQ29udGVzdCBoYXMgbm90IHN0YXJ0ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdyA+IHBhcnRpY2lwYXRpb24uY29udGVzdC5lbmRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlbGlnaWJsZTogZmFsc2UsIHJlYXNvbjogXCJDb250ZXN0IGhhcyBlbmRlZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxpZ2libGU6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogcGFydGljaXBhdGlvbi5pc0ZsYWdnZWQgPyBbXCJZb3VyIHNlc3Npb24gaGFzIGJlZW4gZmxhZ2dlZCBmb3IgcmV2aWV3XCJdIDogW11cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IGVsaWdpYmxlOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGNoZWNrIGVsaWdpYmlsaXR5XCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IHBhcnRpY2lwYXRpb24gc3RhdHVzIC0gZm9yIFVJIHN0YXRlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYXJ0aWNpcGF0aW9uU3RhdHVzKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbiA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX2NvbnRlc3RJZDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRSdWxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG90YWxWaW9sYXRpb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlc3Npb25JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBlcm1hbmVudGx5QmxvY2tlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0ZW1wIGJsb2NrIGhhcyBleHBpcmVkXG4gICAgICAgIGlmIChwYXJ0aWNpcGF0aW9uPy50ZW1wQmxvY2tlZFVudGlsICYmIG5ldyBEYXRlKCkgPiBwYXJ0aWNpcGF0aW9uLnRlbXBCbG9ja2VkVW50aWwpIHtcbiAgICAgICAgICAgIC8vIFRlbXAgYmxvY2sgZXhwaXJlZCAtIHVuYmxvY2tcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZF9jb250ZXN0SWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdElkOiBjb250ZXN0SWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wQmxvY2tlZFVudGlsOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcnRpY2lwYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uOiBwYXJ0aWNpcGF0aW9uIHx8IG51bGxcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGF0aW9uIHN0YXR1c1wiIH07XG4gICAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09OVEVTVCBNQU5BR0VSIC0gUEFSVElDSVBBTlQgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHZXQgYWxsIHBhcnRpY2lwYW50cyBmb3IgYSBjb250ZXN0IHdpdGggdmlvbGF0aW9uIGRldGFpbHMgKGZvciBtYW5hZ2VycylcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbnRlc3RQYXJ0aWNpcGFudHMoY29udGVzdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGNvbnRlc3QgbWFuYWdlci9jcmVhdG9yXG4gICAgY29uc3QgY29udGVzdCA9IGF3YWl0IHByaXNtYS5jb250ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgIHNlbGVjdDogeyBjcmVhdG9ySWQ6IHRydWUgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFjb250ZXN0KSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29udGVzdCBub3QgZm91bmRcIiB9O1xuXG4gICAgY29uc3QgaXNBdXRob3JpemVkID1cbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJBRE1JTlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQ09OVEVTVF9NQU5BR0VSXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJURUFDSEVSXCIgfHxcbiAgICAgICAgY29udGVzdC5jcmVhdG9ySWQgPT09IGN1cnJlbnRVc2VyLmlkO1xuXG4gICAgaWYgKCFpc0F1dGhvcml6ZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnRzID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGNvbnRlc3RJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpb2xhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHRha2U6IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICB7IHBlcm1hbmVudGx5QmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IGlzQmxvY2tlZDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRvdGFsVmlvbGF0aW9uczogXCJkZXNjXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwYXJ0aWNpcGFudHMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGdldCBwYXJ0aWNpcGFudHM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcGFydGljaXBhbnRzXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogVW5ibG9jayBhIHBhcnRpY2lwYW50IChtYW5hZ2VyIG9ubHkpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bmJsb2NrUGFydGljaXBhbnQoY29udGVzdElkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gQ2hlY2sgYXV0aG9yaXphdGlvblxuICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNvbnRlc3RJZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgY3JlYXRvcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgIGNvbnN0IGlzQXV0aG9yaXplZCA9XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiQURNSU5cIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkNPTlRFU1RfTUFOQUdFUlwiIHx8XG4gICAgICAgIGN1cnJlbnRVc2VyLnJvbGUgPT09IFwiVEVBQ0hFUlwiIHx8XG4gICAgICAgIGNvbnRlc3QuY3JlYXRvcklkID09PSBjdXJyZW50VXNlci5pZDtcblxuICAgIGlmICghaXNBdXRob3JpemVkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRlbXBCbG9ja2VkVW50aWw6IG51bGwsXG4gICAgICAgICAgICAgICAgcGVybWFuZW50bHlCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3RhbFZpb2xhdGlvbnM6IDAsXG4gICAgICAgICAgICAgICAgdGFiU3dpdGNoQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkV4aXRDb3VudDogMCxcbiAgICAgICAgICAgICAgICBjb3B5UGFzdGVDb3VudDogMCxcbiAgICAgICAgICAgICAgICBkZXZUb29sc0NvdW50OiAwLFxuICAgICAgICAgICAgICAgIGtleWJvYXJkQ291bnQ6IDAsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkNvdW50OiAwLFxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdW5ibG9ja2VkQnk6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgICAgIHVuYmxvY2tlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbnRlc3RzLyR7Y29udGVzdElkfS9wYXJ0aWNpcGFudHNgKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdW5ibG9jayBwYXJ0aWNpcGFudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVuYmxvY2sgcGFydGljaXBhbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlsZWQgdmlvbGF0aW9ucyBmb3IgYSBwYXJ0aWNpcGFudFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGFydGljaXBhbnRWaW9sYXRpb25zKGNvbnRlc3RJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIC8vIENoZWNrIGF1dGhvcml6YXRpb25cbiAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgc2VsZWN0OiB7IGNyZWF0b3JJZDogdHJ1ZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbnRlc3QpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG5cbiAgICBjb25zdCBpc0F1dGhvcml6ZWQgPVxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIkFETUlOXCIgfHxcbiAgICAgICAgY3VycmVudFVzZXIucm9sZSA9PT0gXCJDT05URVNUX01BTkFHRVJcIiB8fFxuICAgICAgICBjdXJyZW50VXNlci5yb2xlID09PSBcIlRFQUNIRVJcIiB8fFxuICAgICAgICBjb250ZXN0LmNyZWF0b3JJZCA9PT0gY3VycmVudFVzZXIuaWQ7XG5cbiAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9uID0gYXdhaXQgcHJpc21hLmNvbnRlc3RQYXJ0aWNpcGF0aW9uLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWRfY29udGVzdElkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcGFydGljaXBhdGlvbiB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHZpb2xhdGlvbnNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgY29udGVzdCBsZWFkZXJib2FyZFxuICogLSBGZXRjaGVzIGFsbCBwYXJ0aWNpcGF0aW9uc1xuICogLSBGZXRjaGVzIGFsbCByZWxldmFudCBzdWJtaXNzaW9uc1xuICogLSBDYWxjdWxhdGVzIHNjb3Jlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29udGVzdExlYWRlcmJvYXJkKGNvbnRlc3RJZDogc3RyaW5nKSB7XG4gICAgXCJ1c2UgY2FjaGVcIlxuICAgIGNhY2hlVGFnKGBsZWFkZXJib2FyZC0ke2NvbnRlc3RJZH1gKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjYWNoZUxpZmUoXCJsZWFkZXJib2FyZFwiKVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY29udGVzdFBhcnRpY2lwYXRpb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjb250ZXN0SWQsXG4gICAgICAgICAgICAgICAgLy8gc3RhcnRlZEF0OiB7IG5vdDogbnVsbCB9IC8vIE9ubHkgc3RhcnRlZCBwYXJ0aWNpcGFudHMgKEZpeCBpZiBmaWVsZCBleGlzdHMsIG90aGVyd2lzZSByZWx5IG9uIGNyZWF0ZWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250ZXN0ID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY29udGVzdElkIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcHJvYmxlbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsdWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IG9yZGVyOiBcImFzY1wiIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY29udGVzdCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNvbnRlc3Qgbm90IGZvdW5kXCIgfTtcblxuICAgICAgICBjb25zdCBsZWFkZXJib2FyZCA9IGF3YWl0IFByb21pc2UuYWxsKHBhcnRpY2lwYXRpb25zLm1hcChhc3luYyAocCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IHZhbGlkIHN1Ym1pc3Npb25zIGZvciB0aGlzIHVzZXIgaW4gdGhpcyBjb250ZXN0XG4gICAgICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IGF3YWl0IHByaXNtYS5zdWJtaXNzaW9uLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHAudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXN0SWQ6IGNvbnRlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBndGU6IGNvbnRlc3Quc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbHRlOiBjb250ZXN0LmVuZFRpbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBzY29yZVxuICAgICAgICAgICAgLy8gTG9naWM6IEJlc3Qgc3VibWlzc2lvbiBwZXIgcHJvYmxlbSBjb3VudHNcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TY29yZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVNvbHZlVGltZXMgPSBuZXcgTWFwPHN0cmluZywgRGF0ZT4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1CZXN0U3VibWlzc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgICAgICBzdWJtaXNzaW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENvdW50ID0gcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgcHJvYmxlbVN1Ym1pc3Npb25Db3VudHMuc2V0KHN1Yi5wcm9ibGVtSWQsIGN1cnJlbnRDb3VudCArIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5zdGF0dXMgPT09IFwiQUNDRVBURURcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QmVzdCA9IHByb2JsZW1TY29yZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1EZWYgPSBjb250ZXN0LnByb2JsZW1zLmZpbmQoY3AgPT4gY3AucHJvYmxlbUlkID09PSBzdWIucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U2NvcmUgPSBwcm9ibGVtRGVmPy5wcm9ibGVtLnNjb3JlIHx8IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heFNjb3JlID4gY3VycmVudEJlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtU2NvcmVzLnNldChzdWIucHJvYmxlbUlkLCBtYXhTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEJlc3RUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHN1Yi5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudEJlc3RUaW1lIHx8IHN1Yi5jcmVhdGVkQXQgPCBjdXJyZW50QmVzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbVNvbHZlVGltZXMuc2V0KHN1Yi5wcm9ibGVtSWQsIHN1Yi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLnNldChzdWIucHJvYmxlbUlkLCBzdWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgdG90YWxTY29yZSA9IDA7XG4gICAgICAgICAgICBsZXQgdG90YWxUaW1lTXMgPSAwO1xuXG4gICAgICAgICAgICBwcm9ibGVtU2NvcmVzLmZvckVhY2goKHNjb3JlLCBwcm9ibGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlbnRUaW1lID0gcHJvYmxlbVNvbHZlVGltZXMuZ2V0KHByb2JsZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvbHZlbnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZU1zICs9IChzb2x2ZW50VGltZS5nZXRUaW1lKCkgLSBjb250ZXN0LnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBNYXAgc3RhdHMgZm9yIGVhY2ggcHJvYmxlbSBpbiB0aGUgY29udGVzdFxuICAgICAgICAgICAgY29uc3QgcHJvYmxlbVN0YXRzID0gY29udGVzdC5wcm9ibGVtcy5tYXAoY3AgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlc3RTdWIgPSBwcm9ibGVtQmVzdFN1Ym1pc3Npb25zLmdldChjcC5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogY3AucHJvYmxlbUlkLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY3AucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogcHJvYmxlbVNjb3Jlcy5nZXQoY3AucHJvYmxlbUlkKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhTY29yZTogY3AucHJvYmxlbS5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHByb2JsZW1TdWJtaXNzaW9uQ291bnRzLmdldChjcC5wcm9ibGVtSWQpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZDogcHJvYmxlbVNjb3Jlcy5oYXMoY3AucHJvYmxlbUlkKSxcbiAgICAgICAgICAgICAgICAgICAgc29sdmVkQXQ6IHByb2JsZW1Tb2x2ZVRpbWVzLmdldChjcC5wcm9ibGVtSWQpLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogYmVzdFN1Yj8ubGFuZ3VhZ2U/Lm5hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VJZDogYmVzdFN1Yj8ubGFuZ3VhZ2U/LmlkIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucC51c2VyLFxuICAgICAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlLFxuICAgICAgICAgICAgICAgIHRpbWVUYWtlbjogdG90YWxUaW1lTXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXNTb2x2ZWQ6IHByb2JsZW1TY29yZXMuc2l6ZSxcbiAgICAgICAgICAgICAgICBwcm9ibGVtU3RhdHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBTb3J0OiBIaWdoIHNjb3JlIGZpcnN0LCB0aGVuIGxvdyB0aW1lIHRha2VuXG4gICAgICAgIGxlYWRlcmJvYXJkLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgICAgICAgICByZXR1cm4gYS50aW1lVGFrZW4gLSBiLnRpbWVUYWtlbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzdHVkZW50czogbGVhZGVyYm9hcmQsXG4gICAgICAgICAgICBpc0ZpbmFsaXplZDogY29udGVzdC5pc0ZpbmFsaXplZCxcbiAgICAgICAgICAgIHByb2JsZW1zOiBjb250ZXN0LnByb2JsZW1zLm1hcChjcCA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBjcC5wcm9ibGVtSWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNwLnByb2JsZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgc2x1ZzogY3AucHJvYmxlbS5zbHVnLFxuICAgICAgICAgICAgICAgIG1heFNjb3JlOiBjcC5wcm9ibGVtLnNjb3JlXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMZWFkZXJib2FyZCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIGxlYWRlcmJvYXJkXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgdXNlcidzIHJhbmtpbmcgaW4gYSBjb250ZXN0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb250ZXN0UmFua2luZyhjb250ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldENvbnRlc3RMZWFkZXJib2FyZChjb250ZXN0SWQpO1xuXG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MgfHwgIXJlc3VsdC5zdHVkZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgcmFua2luZ1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5rID0gcmVzdWx0LnN0dWRlbnRzLmZpbmRJbmRleCgoczogYW55KSA9PiBzLmlkID09PSBzZXNzaW9uLnVzZXIuaWQpICsgMTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCByYW5rOiByYW5rID4gMCA/IHJhbmsgOiBudWxsIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IHJhbmtpbmdcIiB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1JBOGZzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/ContestSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContestSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$2e5ad8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:2e5ad8 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ContestSidebar({ contest, currentProblemId, solvedProblemIds }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [visitedProblemIds, setVisitedProblemIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showEndModal, setShowEndModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [endConfirmText, setEndConfirmText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isEnding, setIsEnding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestSidebar.useEffect": ()=>{
            // Persist sidebar state
            const stored = localStorage.getItem("contest-sidebar-open");
            if (stored !== null) {
                setIsOpen(stored === "true");
            }
            setIsMounted(true);
        }
    }["ContestSidebar.useEffect"], []);
    const toggleSidebar = (val)=>{
        setIsOpen(val);
        localStorage.setItem("contest-sidebar-open", val.toString());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContestSidebar.useEffect": ()=>{
            // Track visited problems in localStorage
            const visitedKey = `contest-visited-${contest.id}`;
            const stored = localStorage.getItem(visitedKey);
            const visited = stored ? JSON.parse(stored) : [];
            if (!visited.includes(currentProblemId)) {
                visited.push(currentProblemId);
                localStorage.setItem(visitedKey, JSON.stringify(visited));
            }
            setVisitedProblemIds(visited);
        }
    }["ContestSidebar.useEffect"], [
        currentProblemId,
        contest.id
    ]);
    const getStatusColor = (problemId)=>{
        if (solvedProblemIds.includes(problemId)) return "bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500";
        if (visitedProblemIds.includes(problemId)) return "bg-amber-400 text-white border-amber-500 dark:border-amber-400";
        return "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#333] hover:border-orange-300 dark:hover:border-orange-500/50 hover:bg-white dark:hover:bg-[#262626]";
    };
    const handleEndContest = ()=>{
        setShowEndModal(true);
    };
    const confirmEndContest = async ()=>{
        if (endConfirmText.toLowerCase() !== "end") {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please type 'end' to confirm");
            return;
        }
        setIsEnding(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$2e5ad8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["finishContestAction"])(contest.id);
            if (res.success) {
                // Exit fullscreen if active
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(()=>{});
                }
                router.push(`/contest/${contest.id}`);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Contest ended successfully");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to end contest");
                setIsEnding(false);
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("An error occurred while ending the contest");
            setIsEnding(false);
        }
        setShowEndModal(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-full",
        children: [
            isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: false,
                animate: {
                    width: 280,
                    opacity: 1
                },
                transition: isMounted ? {
                    duration: 0.3
                } : {
                    duration: 0
                },
                className: "h-full bg-white dark:bg-[#0a0a0a] border-r border-dashed border-gray-200 dark:border-[#262626] flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-dashed border-gray-100 dark:border-[#262626] bg-orange-50/50 dark:bg-orange-500/5 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        className: "w-4 h-4 text-orange-600 dark:text-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 101,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-black uppercase tracking-tighter text-gray-900 dark:text-gray-100",
                                        children: "Navigator"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 102,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                lineNumber: 100,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleSidebar(false),
                                className: "p-1 hover:bg-orange-100 dark:hover:bg-orange-500/10 rounded-md text-orange-600 dark:text-orange-500 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 108,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                lineNumber: 104,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 99,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-4 custom-scrollbar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-3",
                            children: contest.problems.map((cp, index)=>{
                                const isCurrent = cp.problem.id === currentProblemId;
                                const isSolved = solvedProblemIds.includes(cp.problem.id);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: isSolved ? "#" : `/problems/${cp.problem.slug}?contestId=${contest.id}`,
                                    onClick: (e)=>{
                                        if (isSolved) {
                                            e.preventDefault();
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Problem Solved!", {
                                                description: "You have already completed this challenge."
                                            });
                                        }
                                    },
                                    className: `
                                            aspect-square flex flex-col items-center justify-center rounded-xl border-2 text-sm font-black transition-all transform active:scale-90 relative
                                            ${isCurrent ? 'ring-2 ring-orange-500 ring-offset-2 scale-105 z-10' : ''}
                                            ${getStatusColor(cp.problem.id)}
                                            ${isSolved ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
                                        `,
                                    children: [
                                        index + 1,
                                        isSolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "w-2.5 h-2.5 absolute bottom-1 right-1"
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                            lineNumber: 136,
                                            columnNumber: 54
                                        }, this)
                                    ]
                                }, cp.problem.id, true, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 119,
                                    columnNumber: 37
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 113,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-4 bg-gray-50 dark:bg-[#111] border-t border-dashed border-gray-200 dark:border-[#262626]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase mb-1 tracking-widest",
                                        children: "Contest Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 145,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-xs font-bold text-gray-900 dark:text-gray-100 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    solvedProblemIds.length,
                                                    " / ",
                                                    contest.problems.length,
                                                    " Solved"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                                lineNumber: 147,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    Math.round(solvedProblemIds.length / contest.problems.length * 100),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                                lineNumber: 148,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 146,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-1.5 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-orange-500 transition-all duration-500",
                                            style: {
                                                width: `${solvedProblemIds.length / contest.problems.length * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                            lineNumber: 151,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 150,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleEndContest,
                                className: "w-full py-2.5 px-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/30 flex items-center justify-center gap-2 transition-all group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        className: "w-4 h-4 group-hover:-translate-x-1 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-black uppercase tracking-tight",
                                        children: "End Contest"
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                        lineNumber: 163,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 143,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                lineNumber: 93,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: false,
                animate: {
                    width: 48
                },
                transition: isMounted ? {
                    duration: 0.3
                } : {
                    duration: 0
                },
                className: "h-full bg-white dark:bg-[#0a0a0a] border-r border-dashed border-gray-200 dark:border-[#262626] flex flex-col items-center py-4 gap-4 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleSidebar(true),
                        className: "p-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 178,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 174,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 180,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleEndContest,
                        className: "p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400 transition-colors mb-2",
                        title: "End Contest",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 186,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/ContestSidebar.tsx",
                        lineNumber: 181,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                lineNumber: 168,
                columnNumber: 17
            }, this),
            showEndModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-[#141414] rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 dark:border-[#262626] transform scale-100 transition-all",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-4 text-red-600 dark:text-red-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 196,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 dark:text-gray-100",
                                    children: "End Contest Session?"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 197,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 195,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 dark:text-gray-300 mb-6",
                            children: [
                                "Are you sure you want to end your session? You will ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "NOT"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 201,
                                    columnNumber: 81
                                }, this),
                                " be able to submit more solutions.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 202,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 202,
                                    columnNumber: 35
                                }, this),
                                "Type ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono font-bold text-red-600 dark:text-red-400",
                                    children: "end"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 203,
                                    columnNumber: 34
                                }, this),
                                " below to confirm."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 200,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Type 'end' to confirm",
                            value: endConfirmText,
                            onChange: (e)=>setEndConfirmText(e.target.value),
                            className: "w-full px-4 py-3 border rounded-lg mb-6 bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#0a0a0a] focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-mono text-center uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 206,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowEndModal(false);
                                        setEndConfirmText("");
                                    },
                                    className: "flex-1 px-4 py-3 border rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border-gray-200 dark:border-[#333] transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 216,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: confirmEndContest,
                                    disabled: endConfirmText.toLowerCase() !== "end" || isEnding,
                                    className: "flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20",
                                    children: isEnding ? "Ending..." : "End Contest"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                                    lineNumber: 222,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/workspace/ContestSidebar.tsx",
                            lineNumber: 215,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/workspace/ContestSidebar.tsx",
                    lineNumber: 194,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/workspace/ContestSidebar.tsx",
                lineNumber: 193,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/ContestSidebar.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
_s(ContestSidebar, "PsgHNxDTMLsGwNeLMscvZKtzPnI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ContestSidebar;
var _c;
__turbopack_context__.k.register(_c, "ContestSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tour/ProblemTour.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProblemTour
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$joyride$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-joyride/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ProblemTour() {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [run, setRun] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProblemTour.useEffect": ()=>{
            // Check if tour has been seen
            const seenTour = localStorage.getItem("algofox_problem_tour_seen");
            if (!seenTour) {
                // Small delay to ensure everything is mounted
                const timer = setTimeout({
                    "ProblemTour.useEffect.timer": ()=>{
                        setRun(true);
                    }
                }["ProblemTour.useEffect.timer"], 1500);
                return ({
                    "ProblemTour.useEffect": ()=>clearTimeout(timer)
                })["ProblemTour.useEffect"];
            }
        }
    }["ProblemTour.useEffect"], []);
    const handleJoyrideCallback = (data)=>{
        const { status } = data;
        if ([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$joyride$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"].FINISHED,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$joyride$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"].SKIPPED
        ].includes(status)) {
            setRun(false);
            localStorage.setItem("algofox_problem_tour_seen", "true");
        }
    };
    const steps = [
        {
            target: "#problem-list-toggle",
            content: "Click here to toggle the problem list and navigate between problems easily.",
            disableBeacon: true
        },
        {
            target: "#problem-description",
            content: "Read the problem statement, examples, and constraints here."
        },
        {
            target: "#solutions-tab",
            content: "Stuck? Check out official and community solutions here (unlocks after solving!)."
        },
        {
            target: "#language-dropdown",
            content: "Choose your preferred programming language from the dropdown."
        },
        {
            target: "#code-editor",
            content: "Write your solution code here. It supports syntax highlighting and auto-completion."
        },
        {
            target: "#run-button",
            content: "Test your code against sample test cases before submitting."
        },
        {
            target: "#test-cases",
            content: "View the results of your test cases here."
        },
        {
            target: "#submit-button",
            content: "Ready? Submit your solution to see if it passes all hidden test cases!"
        }
    ];
    const styles = {
        options: {
            zIndex: 10000,
            primaryColor: '#ea580c',
            textColor: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            arrowColor: theme === 'dark' ? '#1f1f1f' : '#ffffff'
        },
        tooltip: {
            borderRadius: '0.75rem',
            padding: '1rem'
        },
        buttonNext: {
            backgroundColor: '#ea580c',
            borderRadius: '0.5rem',
            color: '#fff',
            fontWeight: 600,
            padding: '0.5rem 1rem'
        },
        buttonBack: {
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            marginRight: '0.5rem'
        },
        buttonSkip: {
            color: theme === 'dark' ? '#ef4444' : '#dc2626'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$joyride$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        steps: steps,
        run: run,
        continuous: true,
        showProgress: true,
        showSkipButton: true,
        callback: handleJoyrideCallback,
        styles: styles,
        floaterProps: {
            disableAnimation: true
        }
    }, void 0, false, {
        fileName: "[project]/components/tour/ProblemTour.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(ProblemTour, "/B1zGFd8INc8cUmgBrp3Ap3yBgM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ProblemTour;
var _c;
__turbopack_context__.k.register(_c, "ProblemTour");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/EditorSettingsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorSettingsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$template$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutTemplate$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-template.js [app-client] (ecmascript) <export default as LayoutTemplate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function EditorSettingsModal({ isOpen, onClose, settings, onSettingsChange }) {
    _s();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorSettingsModal.useEffect": ()=>{
            const handleClickOutside = {
                "EditorSettingsModal.useEffect.handleClickOutside": (event)=>{
                    if (modalRef.current && !modalRef.current.contains(event.target)) {
                        onClose();
                    }
                }
            }["EditorSettingsModal.useEffect.handleClickOutside"];
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return ({
                "EditorSettingsModal.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["EditorSettingsModal.useEffect"];
        }
    }["EditorSettingsModal.useEffect"], [
        isOpen,
        onClose
    ]);
    // Prevent body scroll when open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorSettingsModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
        }
    }["EditorSettingsModal.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                ref: modalRef,
                initial: {
                    opacity: 0,
                    scale: 0.95,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    scale: 0.95,
                    y: 10
                },
                transition: {
                    duration: 0.2
                },
                className: "w-full max-w-md bg-white dark:bg-[#141414] rounded-xl shadow-2xl border border-gray-200 dark:border-[#262626] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                                children: "Editor Settings"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 68,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                    lineNumber: 73,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 69,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                        lineNumber: 67,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm font-semibold text-gray-700",
                                        children: [
                                            settings.theme === "vs-dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                className: "w-4 h-4 text-orange-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 83,
                                                columnNumber: 69
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "w-4 h-4 text-orange-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 83,
                                                columnNumber: 116
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Theme"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 84,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 82,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onSettingsChange({
                                                        ...settings,
                                                        theme: "vs-light"
                                                    }),
                                                className: `px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${settings.theme === "vs-light" || !settings.theme ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm" : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#262626] hover:border-gray-300 dark:hover:border-[#444]"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 41
                                                    }, this),
                                                    " Light"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 87,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onSettingsChange({
                                                        ...settings,
                                                        theme: "vs-dark"
                                                    }),
                                                className: `px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-2 ${settings.theme === "vs-dark" ? "bg-gray-800 dark:bg-[#262626] border-gray-700 dark:border-[#333] text-white shadow-sm" : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#262626] hover:border-gray-300 dark:hover:border-[#444]"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 41
                                                    }, this),
                                                    " Dark"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 97,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 86,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 81,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                className: "border-gray-100 dark:border-[#262626]"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 110,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
                                                className: "w-4 h-4 text-orange-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 115,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Font Size"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 116,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded",
                                                children: [
                                                    settings.fontSize,
                                                    "px"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 117,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: "12px"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 122,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "range",
                                                min: "12",
                                                max: "24",
                                                step: "1",
                                                value: settings.fontSize,
                                                onChange: (e)=>onSettingsChange({
                                                        ...settings,
                                                        fontSize: parseInt(e.target.value)
                                                    }),
                                                className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 123,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: "24px"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 121,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 113,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                className: "border-gray-100"
                            }, void 0, false, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm font-semibold text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$template$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutTemplate$3e$__["LayoutTemplate"], {
                                                className: "w-4 h-4 text-orange-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 141,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Tab Size"
                                            }, void 0, false, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 142,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 140,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            2,
                                            4
                                        ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onSettingsChange({
                                                        ...settings,
                                                        tabSize: size
                                                    }),
                                                className: `px-4 py-2 text-sm font-medium rounded-lg border transition-all ${settings.tabSize === size ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 shadow-sm" : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#262626] hover:border-gray-300 dark:hover:border-[#444]"}`,
                                                children: [
                                                    size,
                                                    " Spaces"
                                                ]
                                            }, size, true, {
                                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                                lineNumber: 146,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                        lineNumber: 144,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                                lineNumber: 139,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                        lineNumber: 78,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-[#262626] flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors",
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                            lineNumber: 183,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                        lineNumber: 182,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
                lineNumber: 58,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
            lineNumber: 57,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/workspace/EditorSettingsModal.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, this);
}
_s(EditorSettingsModal, "Hfgks34jZ8gGGjujuH3DNi1cOoA=");
_c = EditorSettingsModal;
var _c;
__turbopack_context__.k.register(_c, "EditorSettingsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePersistentSplit",
    ()=>usePersistentSplit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function usePersistentSplit(storageKey, defaultSizes) {
    _s();
    // Start with default sizes to avoid hydration mismatch
    const [sizes, setSizes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSizes);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // key to force re-render of Split component when we programmatically change sizes
    // react-split sometimes doesn't update visual drag bars when sizes prop changes drastically
    const [layoutKey, setLayoutKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Load from local storage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePersistentSplit.useEffect": ()=>{
            setIsHydrated(true);
            try {
                const item = localStorage.getItem(storageKey);
                if (item) {
                    const parsed = JSON.parse(item);
                    if (Array.isArray(parsed) && parsed.length === defaultSizes.length) {
                        setSizes(parsed);
                        return;
                    }
                }
            } catch (error) {
                console.error(`Failed to load layout for ${storageKey}:`, error);
            }
        }
    }["usePersistentSplit.useEffect"], [
        storageKey,
        defaultSizes.length
    ]);
    // Save to local storage
    const saveSizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePersistentSplit.useCallback[saveSizes]": (newSizes)=>{
            setSizes(newSizes);
            try {
                localStorage.setItem(storageKey, JSON.stringify(newSizes));
            } catch (error) {
                console.error(`Failed to save layout for ${storageKey}:`, error);
            }
        }
    }["usePersistentSplit.useCallback[saveSizes]"], [
        storageKey
    ]);
    // Programmatic reset/update
    const setSizesProgrammatically = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePersistentSplit.useCallback[setSizesProgrammatically]": (newSizes)=>{
            saveSizes(newSizes);
            // Bump key to force component remount/refresh if needed
            setLayoutKey({
                "usePersistentSplit.useCallback[setSizesProgrammatically]": (prev)=>prev + 1
            }["usePersistentSplit.useCallback[setSizesProgrammatically]"]);
        }
    }["usePersistentSplit.useCallback[setSizesProgrammatically]"], [
        saveSizes
    ]);
    return {
        sizes,
        setSizes: saveSizes,
        setSizesProgrammatically,
        isHydrated,
        layoutKey
    };
}
_s(usePersistentSplit, "2GvgiDBsn6gUGPYf/RqNfgKctYg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/Workspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Workspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$split$2f$dist$2f$react$2d$split$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-split/dist/react-split.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$ProblemDescription$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/ProblemDescription.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/CodeEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$TestCases$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/TestCases.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/WorkspaceHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestProtection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/contest/ContestProtection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestNavigationGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/contest/ContestNavigationGuard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$ContestSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/ContestSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tour$2f$ProblemTour$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tour/ProblemTour.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$316d9e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:316d9e [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$EditorSettingsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/workspace/EditorSettingsModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/languages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-layout.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const ProblemSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/workspace/ProblemSidebar.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/workspace/ProblemSidebar.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>null,
    ssr: false // Client-side specific interaction
});
_c = ProblemSidebar;
;
;
;
;
;
;
;
;
const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';
const SQL_LANGUAGE_ID = 82; // SQL language ID
// Get language from localStorage or use default
function getStoredLanguageId(domain) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored) {
            const id = parseInt(stored, 10);
            if (!isNaN(id)) {
                // For SQL problems, always use SQL language
                if (domain === "SQL") {
                    return SQL_LANGUAGE_ID;
                }
                return id;
            }
        }
    } catch (e) {
        console.error('Failed to read language from localStorage', e);
    }
    // For SQL problems, default to SQL language
    return domain === "SQL" ? SQL_LANGUAGE_ID : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE_ID"];
}
function Workspace({ problem, isSolved, contestId, contest, solvedProblemIds = [], nextProblemSlug, prevProblemSlug }) {
    _s();
    const { data: session } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("// Write your code here");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSolvedState, setIsSolvedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isSolved);
    // Contest session state
    const [showEntryModal, setShowEntryModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contestSessionId, setContestSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contestModeActive, setContestModeActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Start with default language to avoid hydration mismatch, then update from localStorage
    const [languageId, setLanguageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(problem.domain === "SQL" ? SQL_LANGUAGE_ID : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$languages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE_ID"]);
    // Load language from localStorage after hydration (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Workspace.useEffect": ()=>{
            const storedLanguageId = getStoredLanguageId(problem.domain);
            // For SQL problems, always use SQL language
            const finalLanguageId = problem.domain === "SQL" ? SQL_LANGUAGE_ID : storedLanguageId;
            if (finalLanguageId !== languageId) {
                setLanguageId(finalLanguageId);
                // Clear default boilerplate if we are switching languages on load
                setCode("");
            }
        }
    }["Workspace.useEffect"], [
        problem.domain
    ]);
    // Check existing contest participation on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Workspace.useEffect": ()=>{
            if (!contestId) return;
            const checkParticipation = {
                "Workspace.useEffect.checkParticipation": async ()=>{
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$316d9e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getParticipationStatus"])(contestId);
                    if (result.success && result.participation) {
                        if (result.participation.sessionId && result.participation.acceptedRules) {
                            // User has already started - activate contest mode
                            setContestSessionId(result.participation.sessionId);
                            setContestModeActive(true);
                        } else if (!result.participation.isFinished && !result.participation.isBlocked) {
                            // Show entry modal for new participants
                            setShowEntryModal(true);
                        }
                    } else {
                        // No participation yet - show entry modal
                        setShowEntryModal(true);
                    }
                }
            }["Workspace.useEffect.checkParticipation"];
            checkParticipation();
        }
    }["Workspace.useEffect"], [
        contestId
    ]);
    const handleContestStart = (sessionId)=>{
        setContestSessionId(sessionId);
        setContestModeActive(true);
        setShowEntryModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Contest mode activated! Good luck!");
    };
    const handleContestBlocked = ()=>{
    // Just a callback, UI is handled by ContestProtection
    };
    // Handle language change and persist to localStorage
    const handleLanguageChange = (newLanguageId)=>{
        // For SQL problems, always use SQL language - don't allow changes
        if (problem.domain === "SQL") {
            return; // Prevent language changes for SQL problems
        }
        setLanguageId(newLanguageId);
        setCode(""); // Clear code to prevent stale submissions while new draft loads
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguageId.toString());
        } catch (e) {
            console.error('Failed to save language to localStorage', e);
        }
    };
    // Editor Settings State
    const [isSettingsOpen, setIsSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editorSettings, setEditorSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fontSize: 14,
        tabSize: 4,
        theme: "vs-light",
        keybinding: "standard"
    });
    // Load settings from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Workspace.useEffect": ()=>{
            try {
                const stored = localStorage.getItem('algofox_editor_settings');
                if (stored) {
                    setEditorSettings(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Failed to load editor settings', e);
            }
        }
    }["Workspace.useEffect"], []);
    // Save settings to localStorage
    const handleSettingsChange = (newSettings)=>{
        setEditorSettings({
            ...newSettings,
            theme: newSettings.theme || "vs-light"
        });
        try {
            localStorage.setItem('algofox_editor_settings', JSON.stringify(newSettings));
        } catch (e) {
            console.error('Failed to save editor settings', e);
        }
    };
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("description");
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submissionResults, setSubmissionResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [submissionStatus, setSubmissionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submissionMode, setSubmissionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { sizes: mainSizes, setSizes: setMainSizes, isHydrated: mainHydrated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePersistentSplit"])('algofox_workspace_main_split', [
        40,
        60
    ]);
    const { sizes: verticalSizes, setSizes: setVerticalSizes, setSizesProgrammatically: setVerticalSizesProgrammatically, layoutKey: verticalLayoutKey, isHydrated: verticalHydrated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePersistentSplit"])('algofox_workspace_vertical_split', [
        60,
        40
    ]);
    // Solved Problem IDs State (for Sidebar & Optimistic Updates)
    const [solvedIds, setSolvedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(solvedProblemIds);
    // Sync if props change (e.g. navigation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Workspace.useEffect": ()=>{
            setSolvedIds(solvedProblemIds);
        }
    }["Workspace.useEffect"], [
        solvedProblemIds
    ]);
    const handleSubmission = async (mode)=>{
        if (!code) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Code cannot be empty");
            return;
        }
        if (!session?.user?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please sign in to submit");
            return;
        }
        // AUTO-EXPAND: Check if TestCases pane is collapsed (e.g., < 5%)
        // Vertical split sizes are [Editor%, TestCases%]
        // If TestCases is too small, reset to default [60, 40]
        if (verticalSizes[1] < 5) {
            setVerticalSizesProgrammatically([
                60,
                40
            ]);
        }
        try {
            if (mode === "RUN") setIsRunning(true);
            else setIsSubmitting(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(mode === "RUN" ? "Running code..." : "Submitting code...");
            // 1. Create Submission / Run Code
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    problemId: problem.id,
                    languageId: languageId,
                    code: code,
                    mode: mode,
                    contestId: contestId
                })
            });
            if (!res.ok) throw new Error("Submission failed");
            const data = await res.json();
            // HANDLE BOTH RUN & SUBMIT MODES (SSE)
            const { submissionId } = data;
            setSubmissionMode(mode);
            setSubmissionResults(problem.testCases.map((tc, idx)=>({
                    index: idx,
                    status: "PENDING"
                })));
            setSubmissionStatus(null);
            // Connect to SSE
            const eventSource = new EventSource(`/api/sse/submission/${submissionId}`);
            eventSource.onmessage = (event)=>{
                const payload = JSON.parse(event.data);
                if (payload.type === "CASE_UPDATE") {
                    // payload.data is array of updated cases
                    setSubmissionResults((prev)=>{
                        const current = prev ? [
                            ...prev
                        ] : [];
                        const updates = payload.data;
                        updates.forEach((update)=>{
                            // Find if exists
                            const idx = current.findIndex((c)=>c.index === update.index);
                            if (idx >= 0) {
                                current[idx] = update;
                            } else {
                                current.push(update);
                            }
                        });
                        // Sort by index just in case
                        return current.sort((a, b)=>a.index - b.index);
                    });
                } else if (payload.type === "COMPLETE") {
                    eventSource.close();
                    setSubmissionStatus(payload.data.status);
                    if (mode === "RUN") setIsRunning(false);
                    else setIsSubmitting(false);
                    if (payload.data.status === "ACCEPTED") {
                        const desc = `Time: ${payload.data.time?.toFixed(3) || 0}s | Memory: ${payload.data.memory || 0}KB`;
                        if (mode === "SUBMIT") {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Submitted Successfully!", {
                                description: desc
                            });
                            setIsSolvedState(true);
                            setActiveTab("submissions");
                            // Optimistically update solved status in sidebar
                            if (!solvedIds.includes(problem.id)) {
                                setSolvedIds((prev)=>[
                                        ...prev,
                                        problem.id
                                    ]);
                            }
                            // Refresh server components to update lists/cache
                            router.refresh();
                            window.dispatchEvent(new CustomEvent("pointsUpdated"));
                            // If in contest and submitted successfully, redirect back to contest dashboard
                            if (contestId) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Problem Solved! Returning to contest...", {
                                    duration: 2000
                                });
                                setTimeout(()=>{
                                    router.push(`/contest/${contestId}`);
                                }, 1500);
                            }
                        } else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Run Accepted!", {
                                description: desc
                            });
                        }
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Result: ${payload.data.status}`);
                    }
                }
            };
            eventSource.onerror = (err)=>{
                console.error("SSE Error:", err);
                eventSource.close();
                // Fallback polling or simple completion check could go here if needed
                // For now, just stop the spinner
                if (mode === "RUN") setIsRunning(false);
                else setIsSubmitting(false);
            };
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
            if (mode === "RUN") setIsRunning(false);
            else setIsSubmitting(false);
        }
    };
    if (!mainHydrated || !verticalHydrated) {
        return null; // or a loading skeleton
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-full bg-white dark:bg-[#0a0a0a] flex flex-col overflow-hidden",
        children: [
            !contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tour$2f$ProblemTour$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/workspace/Workspace.tsx",
                lineNumber: 369,
                columnNumber: 29
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$EditorSettingsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isSettingsOpen,
                onClose: ()=>setIsSettingsOpen(false),
                settings: editorSettings,
                onSettingsChange: handleSettingsChange
            }, void 0, false, {
                fileName: "[project]/components/workspace/Workspace.tsx",
                lineNumber: 371,
                columnNumber: 13
            }, this),
            contestId && contestModeActive && contestSessionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestProtection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        contestId: contestId,
                        sessionId: contestSessionId,
                        onBlocked: handleContestBlocked
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/Workspace.tsx",
                        lineNumber: 381,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$contest$2f$ContestNavigationGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        contestId: contestId,
                        allowedPaths: [
                            `/problems/`,
                            `/contest/${contestId}`
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/Workspace.tsx",
                        lineNumber: 386,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true),
            !contestId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProblemSidebar, {
                isOpen: isSidebarOpen,
                onClose: ()=>setIsSidebarOpen(false),
                currentProblemId: problem.id,
                domain: problem.domain,
                problemType: problem.type,
                solvedProblemIds: solvedIds
            }, void 0, false, {
                fileName: "[project]/components/workspace/Workspace.tsx",
                lineNumber: 397,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$WorkspaceHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: ()=>handleSubmission("SUBMIT"),
                onRun: ()=>handleSubmission("RUN"),
                isSubmitting: isSubmitting,
                isRunning: isRunning,
                contestId: contestId,
                endTime: contest?.endTime,
                nextProblemSlug: nextProblemSlug,
                prevProblemSlug: prevProblemSlug,
                domain: problem.domain,
                type: problem.type,
                onToggleSidebar: ()=>setIsSidebarOpen(true)
            }, void 0, false, {
                fileName: "[project]/components/workspace/Workspace.tsx",
                lineNumber: 407,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden flex flex-row min-h-0",
                children: [
                    contest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$ContestSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        contest: contest,
                        currentProblemId: problem.id,
                        solvedProblemIds: solvedProblemIds
                    }, void 0, false, {
                        fileName: "[project]/components/workspace/Workspace.tsx",
                        lineNumber: 422,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d6413c438550cab9" + " " + "flex-1 overflow-hidden min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$split$2f$dist$2f$react$2d$split$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "split flex h-full",
                                sizes: mainSizes,
                                minSize: 300,
                                gutterSize: 4,
                                snapOffset: 30,
                                onDragEnd: setMainSizes,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "problem-description",
                                        className: "jsx-d6413c438550cab9" + " " + "h-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$ProblemDescription$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            problem: problem,
                                            activeTab: activeTab,
                                            onTabChange: setActiveTab,
                                            isSolved: isSolvedState,
                                            contestId: contestId
                                        }, void 0, false, {
                                            fileName: "[project]/components/workspace/Workspace.tsx",
                                            lineNumber: 439,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/Workspace.tsx",
                                        lineNumber: 438,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d6413c438550cab9" + " " + "h-full overflow-hidden flex flex-col",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$split$2f$dist$2f$react$2d$split$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "split-vertical flex flex-col h-full",
                                            direction: "vertical",
                                            sizes: verticalSizes,
                                            minSize: 0,
                                            gutterSize: 4,
                                            onDragEnd: setVerticalSizes,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    id: "code-editor",
                                                    className: "jsx-d6413c438550cab9" + " " + "h-full overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        value: code,
                                                        onChange: (value)=>setCode(value || ""),
                                                        languageId: languageId,
                                                        onLanguageChange: handleLanguageChange,
                                                        problemId: problem.id,
                                                        domain: problem.domain,
                                                        functionTemplates: problem.useFunctionTemplate && problem.functionTemplates ? problem.functionTemplates : undefined,
                                                        settings: editorSettings,
                                                        onOpenSettings: ()=>setIsSettingsOpen(true),
                                                        readOnly: isSubmitting,
                                                        userId: session?.user?.id || ""
                                                    }, `${problem.id}-${languageId}`, false, {
                                                        fileName: "[project]/components/workspace/Workspace.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/workspace/Workspace.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    id: "test-cases",
                                                    className: "jsx-d6413c438550cab9" + " " + "h-full overflow-hidden flex flex-col bg-white dark:bg-[#0a0a0a]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$workspace$2f$TestCases$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        cases: problem.testCases,
                                                        results: submissionResults,
                                                        status: submissionStatus,
                                                        mode: submissionMode,
                                                        problemId: problem.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/workspace/Workspace.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/workspace/Workspace.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, verticalLayoutKey, true, {
                                            fileName: "[project]/components/workspace/Workspace.tsx",
                                            lineNumber: 450,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/workspace/Workspace.tsx",
                                        lineNumber: 449,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/workspace/Workspace.tsx",
                                lineNumber: 429,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                id: "d6413c438550cab9",
                                children: ".split{display:flex}.split-vertical{flex-direction:column;display:flex}.gutter{background-color:#f3f4f6;background-position:50%;background-repeat:no-repeat;transition:background-color .2s}.dark .gutter{background-color:#1a1a1a}.gutter:hover{background-color:#e5e7eb}.dark .gutter:hover{background-color:#262626}.gutter.gutter-horizontal{cursor:col-resize;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZgmwIA6Jhouse1DAAAAABJRU5ErkJggg==);border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb}.dark .gutter.gutter-horizontal{border-left:1px solid #262626;border-right:1px solid #262626}.gutter.gutter-vertical{cursor:row-resize;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABoV83XAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjAAIALAAJy8wOmAAAAABJRU5ErkJggg==);border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb}.dark .gutter.gutter-vertical{border-top:1px solid #262626;border-bottom:1px solid #262626}"
                            }, void 0, false, void 0, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/workspace/Workspace.tsx",
                        lineNumber: 428,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/workspace/Workspace.tsx",
                lineNumber: 420,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/workspace/Workspace.tsx",
        lineNumber: 367,
        columnNumber: 9
    }, this);
}
_s(Workspace, "om9YhjS12zN3lcO2UVooxd2c9Hw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePersistentSplit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePersistentSplit"]
    ];
});
_c1 = Workspace;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProblemSidebar");
__turbopack_context__.k.register(_c1, "Workspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/workspace/Workspace.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/workspace/Workspace.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_7553d969._.js.map