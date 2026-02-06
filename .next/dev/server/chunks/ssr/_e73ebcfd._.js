module.exports = [
"[project]/components/classroom/StudentClassroomCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentClassroomCard",
    ()=>StudentClassroomCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
"use client";
;
;
;
;
function StudentClassroomCard({ classroom, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: index * 0.05
        },
        whileHover: {
            y: -4
        },
        className: "group h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: `/dashboard/classrooms/${classroom.id}`,
            className: "flex flex-col h-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors duration-500"
                }, void 0, false, {
                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                    lineNumber: 37,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between mb-6 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                lineNumber: 42,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-3 py-1 bg-gray-50 dark:bg-[#1a1a1a] text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest rounded-full border border-gray-100 dark:border-[#262626]",
                            children: "Active"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors",
                            children: classroom.name
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 51,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 dark:text-gray-400 font-medium mb-6",
                            children: classroom.subject || "General"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full bg-white dark:bg-[#262626] flex items-center justify-center text-xs font-bold text-orange-600 border border-gray-100 dark:border-[#333]",
                                    children: classroom.teacher.name?.charAt(0).toUpperCase() || "T"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                    lineNumber: 59,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider",
                                            children: "Mentor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                            lineNumber: 63,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-gray-900 dark:text-gray-200 line-clamp-1",
                                            children: classroom.teacher.name || "Unknown Teacher"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                            lineNumber: 64,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 pt-6 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5",
                                    children: "Students"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                    lineNumber: 74,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-bold text-gray-900 dark:text-white",
                                    children: [
                                        classroom._count?.students || 0,
                                        " enrolled"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                                lineNumber: 81,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/classroom/StudentClassroomCard.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:26fb5b [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000ec191d293cb8cc90e57828e017864626cb92ee5":"getStudentClassrooms"},"actions/classroom.ts",""] */ __turbopack_context__.s([
    "getStudentClassrooms",
    ()=>getStudentClassrooms
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getStudentClassrooms = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("000ec191d293cb8cc90e57828e017864626cb92ee5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getStudentClassrooms"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgcmVkaXMgZnJvbSBcIkAvbGliL3JlZGlzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGgsIHJldmFsaWRhdGVUYWcsIHVuc3RhYmxlX2NhY2hlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IGNhY2hlS2V5LCBjYWNoZWRGZXRjaCwgQ0FDSEVfQ09ORklHLCBkZWxldGVGcm9tQ2FjaGUgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuY29uc3QgY2xhc3Nyb29tU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiKSxcbiAgICBzZWN0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBzdWJqZWN0OiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLFxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSm9pbkNvZGUoKSB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OVwiO1xuICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjbGFzc3Jvb20uXG4gKiBPbmx5IEFETUlOLCBJTlNUSVRVVElPTl9NQU5BR0VSLCBvciBURUFDSEVSIHJvbGVzIGNhbiBjcmVhdGUgY2xhc3Nyb29tcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzcm9vbShkYXRhOiB6LmluZmVyPHR5cGVvZiBjbGFzc3Jvb21TY2hlbWE+KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gU2VjdXJpdHkgY2hlY2tcbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZC4gT25seSB0ZWFjaGVycyBvciBtYW5hZ2VycyBjYW4gY3JlYXRlIGNsYXNzcm9vbXMuXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWREYXRhID0gY2xhc3Nyb29tU2NoZW1hLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSA2LWNoYXJhY3RlciBqb2luIGNvZGVcbiAgICAgICAgbGV0IGpvaW5Db2RlID0gXCJcIjtcbiAgICAgICAgbGV0IGlzVW5pcXVlID0gZmFsc2U7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlICghaXNVbmlxdWUgJiYgYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgam9pbkNvZGUgPSBnZW5lcmF0ZUpvaW5Db2RlKCk7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgam9pbkNvZGUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZykgaXNVbmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNVbmlxdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgam9pbiBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc3Jvb20gPSBhd2FpdCBwcmlzbWEuY2xhc3Nyb29tLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsaWRhdGVkRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IHZhbGlkYXRlZERhdGEuc2VjdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHZhbGlkYXRlZERhdGEuc3ViamVjdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGpvaW5Db2RlLFxuICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEuaW5zdGl0dXRpb25JZCxcbiAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSByZWxldmFudCBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdGVhY2hlci1jbGFzc3Jvb21zLSR7Y3VycmVudFVzZXIuaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGluc3RpdHV0aW9uLWNsYXNzcm9vbXMtJHt2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9pbnN0aXR1dGlvbi9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYXNzcm9vbSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQWxsb3dzIGEgc3R1ZGVudCB0byBqb2luIGEgY2xhc3Nyb29tIHVzaW5nIGEgNi1jaGFyYWN0ZXIgY29kZS5cbiAqIEFsc28gb25ib2FyZHMgdGhlIHN0dWRlbnQgdG8gdGhlIGluc3RpdHV0aW9uIGlmIHRoZXkgYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luQ2xhc3Nyb29tKGNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnZhbGlkIGpvaW4gY29kZS5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGVucm9sbGVkIGluIHRoaXMgY2xhc3Nyb29tLlwiIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluc3RpdHV0aW9uIENoZWNrOlxuICAgICAgICAvLyAxLiBJZiB1c2VyIGJlbG9uZ3MgdG8gYW4gaW5zdGl0dXRpb24sIHRoZXkgY2FuIG9ubHkgam9pbiBjbGFzc3Jvb21zIGZyb20gVEhBVCBpbnN0aXR1dGlvbi5cbiAgICAgICAgLy8gMi4gSWYgdXNlciBoYXMgTk8gaW5zdGl0dXRpb24sIHRoZXkgYXJlIGFzc2lnbmVkIHRvIHRoaXMgY2xhc3Nyb29tJ3MgaW5zdGl0dXRpb24uXG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgJiYgY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCAhPT0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQpIHtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIllvdSBjYW5ub3Qgam9pbiB0aGlzIGNsYXNzcm9vbSBiZWNhdXNlIGl0IGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgaW5zdGl0dXRpb24uXCJcbiAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHN0dWRlbnQgdG8gY2xhc3Nyb29tXG4gICAgICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb20uaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7IGlkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmJvYXJkIHN0dWRlbnQgdG8gaW5zdGl0dXRpb24gaWYgbnVsbFxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCkge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5pbnN0aXR1dGlvbklkID0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWRpcyBJbnRlZ3JhdGlvbjogQ2FjaGUgc3R1ZGVudCBJRHMgcGVyIGNsYXNzcm9vbVxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb20uaWR9YDtcbiAgICAgICAgYXdhaXQgcmVkaXMuc2FkZChyZWRpc0tleSwgY3VycmVudFVzZXIuaWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYHN0dWRlbnQtY2xhc3Nyb29tcy0ke2N1cnJlbnRVc2VyLmlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjbGFzc3Jvb20tJHtjbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBTdWNjZXNzZnVsbHkgam9pbmVkICR7Y2xhc3Nyb29tLm5hbWV9YCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gam9pbiBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBqb2luIGNsYXNzcm9vbVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYmFzaWMgZGV0YWlscyBvZiBhIGNsYXNzcm9vbSBieSBpdHMgam9pbiBjb2RlLlxuICogVXNlZCBmb3IgdGhlIGpvaW4gY2xhc3Nyb29tIHBhZ2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDbGFzc3Jvb21CeUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBzdHVkZW50czogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0Vucm9sbGVkID0gc2Vzc2lvbj8udXNlciA/IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNsYXNzcm9vbS5pZCxcbiAgICAgICAgICAgICAgICBzdHVkZW50czogeyBzb21lOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBpc0Vucm9sbGVkOiAhIWlzRW5yb2xsZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBieSBjb2RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIGNyZWF0ZWQgYnkgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdGVhY2hlciAoQ0FDSEVEKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYWNoZXJDbGFzc3Jvb21zKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNvbnN0IGZldGNoQ2xhc3Nyb29tcyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgdGVhY2hlcklkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0dWRlbnRzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSxcbiAgICAgICAgeyB0YWdzOiBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IGZldGNoQ2xhc3Nyb29tcygpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0ZWFjaGVyIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIHdoZXJlIHRoZSBjdXJyZW50bHkgbG9nZ2VkLWluIHN0dWRlbnQgaXMgZW5yb2xsZWQgKENBQ0hFRCkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50Q2xhc3Nyb29tcygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyPy5lbnJvbGxlZENsYXNzcm9vbXMgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLCByZXZhbGlkYXRlOiAxMjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjbGFzc3Jvb21zID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNsYXNzcm9vbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHN0dWRlbnQgY2xhc3Nyb29tczpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbXNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRldGFpbHMgb2YgYSBzcGVjaWZpYyBjbGFzc3Jvb20sIGluY2x1ZGluZyB0aGUgc3R1ZGVudCBsaXN0IGZvciB0aGUgbGVhZGVyYm9hcmQgKENBQ0hFRCkuXG4gKiBTdXBwb3J0cyBwYWdpbmF0aW9uIGZvciBsYXJnZSBzdHVkZW50IGxpc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2xhc3Nyb29tV2l0aFN0dWRlbnRzKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gNTBcbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbSA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbY2xhc3Nyb29tLCB0b3RhbFN0dWRlbnRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgam9pbkNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdTdGFydGVkQXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGlkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2NvcmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyB0b3RhbFNjb3JlOiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS51c2VyLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6IHsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBjbGFzc3Jvb20sIHRvdGFsU3R1ZGVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tJHtpZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BjbGFzc3Jvb20tJHtpZH1gXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsYXNzcm9vbSwgdG90YWxTdHVkZW50cyB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb20oKTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsU3R1ZGVudHMsXG4gICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBkZXRhaWw6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21cIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzcm9vbVRyYWNraW5nKGNsYXNzcm9vbUlkOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGNsYXNzcm9vbSA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY2xhc3Nyb29tIHx8IChjbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQgJiYgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkFjY2VzcyBkZW5pZWRcIiB9O1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmdBY3RpdmU6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBhY3RpdmUgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBkZWxldGVGcm9tQ2FjaGUoY2FjaGVLZXkoXCJsaXZlLXRyYWNraW5nXCIsIGNsYXNzcm9vbUlkKSk7XG4gICAgcmV2YWxpZGF0ZVRhZyhgY2xhc3Nyb29tLSR7Y2xhc3Nyb29tSWR9YCwgXCJtYXhcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY2xhc3Nyb29tcy8ke2NsYXNzcm9vbUlkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUxpdmVUcmFja2luZyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBsaXZlIHRyYWNraW5nIGRhdGEgKHNob3J0IFRUTClcbiAgICBjb25zdCBjYWNoZUtleU5hbWUgPSBjYWNoZUtleShcImxpdmUtdHJhY2tpbmdcIiwgY2xhc3Nyb29tSWQpO1xuXG4gICAgY29uc3QgZmV0Y2hUcmFja2luZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaXNUcmFja2luZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja2luZ1N0YXJ0ZWRBdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIlNVQk1JVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbTogeyBzZWxlY3Q6IHsgdGl0bGU6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gRmlsdGVyIHN1Ym1pc3Npb25zIGlmIHRyYWNraW5nIGlzIGFjdGl2ZVxuICAgICAgICBjb25zdCBzdHVkZW50c0RhdGEgPSBjbGFzc3Jvb20uc3R1ZGVudHMubWFwKHN0dWRlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTdWJtaXNzaW9ucyA9IHN0dWRlbnQuc3VibWlzc2lvbnMuZmlsdGVyKHN1YiA9PlxuICAgICAgICAgICAgICAgIGNsYXNzcm9vbS5pc1RyYWNraW5nQWN0aXZlICYmXG4gICAgICAgICAgICAgICAgY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoc3ViLmNyZWF0ZWRBdCkgPj0gbmV3IERhdGUoY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0KVxuICAgICAgICAgICAgKS5tYXAoc3ViID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICAgICAgICBjb2RlOiBzdWIuY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN1Yi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbVRpdGxlOiBzdWIucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHN1Yi5jcmVhdGVkQXRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHN0dWRlbnQuaW1hZ2UsXG4gICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IGZpbHRlcmVkU3VibWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiBjbGFzc3Jvb20uaXNUcmFja2luZ0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBjbGFzc3Jvb20udHJhY2tpbmdTdGFydGVkQXQsXG4gICAgICAgICAgICBzdHVkZW50czogc3R1ZGVudHNEYXRhXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjYWNoZWRGZXRjaChjYWNoZUtleU5hbWUsIGZldGNoVHJhY2tpbmcsIENBQ0hFX0NPTkZJRy5TSE9SVC50dGwpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBsaXZlIHRyYWNraW5nOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdHJhY2tpbmcgZGF0YVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYWxsIGNsYXNzcm9vbXMgZm9yIGFuIGluc3RpdHV0aW9uIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluc3RpdHV0aW9uQ2xhc3Nyb29tcyhwYWdlOiBudW1iZXIgPSAxLCBsaW1pdDogbnVtYmVyID0gMjApIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gXCJBRE1JTlwiICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09IFwiSU5TVElUVVRJT05fTUFOQUdFUlwiKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RpdHV0aW9uSWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbXMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3R1ZGVudHM6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGluc3RpdHV0aW9uSWQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgY2xhc3Nyb29tcywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc3Jvb21zLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3Nyb29tcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluc3RpdHV0aW9uIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTdHVkZW50RnJvbUNsYXNzcm9vbShjbGFzc3Jvb21JZDogc3RyaW5nLCBzdHVkZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcbiAgICBjb25zdCBpc1Bvd2VyZnVsID0gW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSwgaW5zdGl0dXRpb25JZDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBhbGxvdyBpZiBwb3dlcmZ1bCByb2xlIE9SIGlmIGN1cnJlbnQgdXNlciBpcyB0aGUgdGVhY2hlclxuICAgICAgICBpZiAoIWlzUG93ZXJmdWwgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCAhPT0gY3VycmVudFVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNsYXNzcm9vbS51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogeyBpZDogc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIFJlZGlzIHNldFxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb21JZH1gO1xuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJlZGlzS2V5LCBzdHVkZW50SWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBzdHVkZW50LWNsYXNzcm9vbXMtJHtzdHVkZW50SWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NsYXNzcm9vbXMvJHtjbGFzc3Jvb21JZH1gKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW1vdmUgc3R1ZGVudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHJlbW92ZSBzdHVkZW50XCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImtTQWdSc0IifQ==
}),
"[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClassroomsPageContent",
    ()=>ClassroomsPageContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$StudentClassroomCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/StudentClassroomCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$26fb5b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:26fb5b [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ITEMS_PER_PAGE = 8;
function ClassroomsPageContent({ initialClassrooms }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [classrooms, setClassrooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialClassrooms);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const filteredClassrooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return classrooms.filter((c)=>c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.teacher?.name && c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [
        classrooms,
        searchQuery
    ]);
    const totalPages = Math.ceil(filteredClassrooms.length / ITEMS_PER_PAGE);
    const paginatedClassrooms = filteredClassrooms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handleSearchChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }, []);
    const handleJoinSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        // Refresh data after joining
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$26fb5b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getStudentClassrooms"])();
        if (res.success && res.classrooms) {
            setClassrooms(res.classrooms);
        }
        router.refresh();
    }, [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl border border-gray-200 dark:border-[#262626] p-2 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search classrooms or mentors...",
                            value: searchQuery,
                            onChange: handleSearchChange,
                            className: "w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-transparent focus:bg-white dark:focus:bg-[#1a1a1a] focus:border-orange-500/50 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            filteredClassrooms.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                children: paginatedClassrooms.map((classroom, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$StudentClassroomCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StudentClassroomCard"], {
                        classroom: classroom,
                        index: idx
                    }, classroom.id, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] border-dashed",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                            className: "w-8 h-8 text-gray-300 dark:text-gray-600"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-900 dark:text-white mb-2",
                        children: "No classrooms found"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8",
                        children: searchQuery ? "Try adjusting your search terms" : "You haven't joined any classrooms yet. Use a join link provided by your teacher to start!"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 flex items-center justify-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCurrentPage((prev)=>Math.max(1, prev - 1));
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        },
                        disabled: currentPage === 1,
                        className: "p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-gray-600 dark:text-gray-400",
                        children: [
                            "Page",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-900 dark:text-white",
                                children: currentPage
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            " ",
                            "of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCurrentPage((prev)=>Math.min(totalPages, prev + 1));
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        },
                        disabled: currentPage === totalPages,
                        className: "p-3 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl hover:border-orange-500 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/dashboard/classrooms/ClassroomsPageContent.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Layers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
            key: "zw3jo"
        }
    ],
    [
        "path",
        {
            d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
            key: "1wduqc"
        }
    ],
    [
        "path",
        {
            d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
            key: "kqbvx6"
        }
    ]
];
const Layers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("layers", __iconNode);
;
 //# sourceMappingURL=layers.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }
    ]
];
const ArrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-right", __iconNode);
;
 //# sourceMappingURL=arrow-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>BookOpen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 7v14",
            key: "1akyts"
        }
    ],
    [
        "path",
        {
            d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
            key: "ruj8y"
        }
    ]
];
const BookOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("book-open", __iconNode);
;
 //# sourceMappingURL=book-open.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookOpen",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_e73ebcfd._.js.map