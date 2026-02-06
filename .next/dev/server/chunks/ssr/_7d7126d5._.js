module.exports = [
"[project]/components/classroom/ClassroomSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClassroomSidebar",
    ()=>ClassroomSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
"use client";
;
;
function ClassroomSidebar({ activeTab, onTabChange, onDownload, showDownload, isTeacher, classroomName }) {
    const menuItems = [
        {
            id: 'leaderboard',
            label: 'Leaderboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
        },
        {
            id: 'assignments',
            label: 'Assignments',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        ...isTeacher ? [
            {
                id: 'contests',
                label: 'Contest Verification',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
            },
            {
                id: 'tracking',
                label: 'Live Tracking',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
            }
        ] : []
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white/80 dark:bg-[#141414]/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-[#262626] shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2",
                        children: "Classroom"
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-gray-900 dark:text-white truncate",
                        title: classroomName,
                        children: classroomName
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "px-4 space-y-1",
                children: menuItems.map((item)=>{
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onTabChange(item.id),
                        className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 group transition-all ${isActive ? "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-gray-200"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-1.5 rounded-lg transition-colors ${isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-[#262626] group-hover:shadow-sm"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                                    lineNumber: 58,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                                lineNumber: 51,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                                lineNumber: 60,
                                columnNumber: 29
                            }, this),
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4 ml-auto text-white/50"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                                lineNumber: 61,
                                columnNumber: 42
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                        lineNumber: 42,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 left-0 right-0 px-4 space-y-2",
                children: showDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onDownload,
                    className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] hover:text-orange-600 dark:hover:text-orange-500 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                            lineNumber: 73,
                            columnNumber: 25
                        }, this),
                        "Export Data"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                    lineNumber: 69,
                    columnNumber: 22
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#141414] to-transparent pointer-events-none -z-10"
            }, void 0, false, {
                fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/ClassroomSidebar.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:37d78e [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60f68b6b6de74b348b326d1abc2051c2a16b2617c9":"removeStudentFromClassroom"},"actions/classroom.ts",""] */ __turbopack_context__.s([
    "removeStudentFromClassroom",
    ()=>removeStudentFromClassroom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var removeStudentFromClassroom = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("60f68b6b6de74b348b326d1abc2051c2a16b2617c9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeStudentFromClassroom"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgcmVkaXMgZnJvbSBcIkAvbGliL3JlZGlzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGgsIHJldmFsaWRhdGVUYWcsIHVuc3RhYmxlX2NhY2hlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IGNhY2hlS2V5LCBjYWNoZWRGZXRjaCwgQ0FDSEVfQ09ORklHLCBkZWxldGVGcm9tQ2FjaGUgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuY29uc3QgY2xhc3Nyb29tU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiKSxcbiAgICBzZWN0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBzdWJqZWN0OiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLFxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSm9pbkNvZGUoKSB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OVwiO1xuICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjbGFzc3Jvb20uXG4gKiBPbmx5IEFETUlOLCBJTlNUSVRVVElPTl9NQU5BR0VSLCBvciBURUFDSEVSIHJvbGVzIGNhbiBjcmVhdGUgY2xhc3Nyb29tcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzcm9vbShkYXRhOiB6LmluZmVyPHR5cGVvZiBjbGFzc3Jvb21TY2hlbWE+KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gU2VjdXJpdHkgY2hlY2tcbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZC4gT25seSB0ZWFjaGVycyBvciBtYW5hZ2VycyBjYW4gY3JlYXRlIGNsYXNzcm9vbXMuXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWREYXRhID0gY2xhc3Nyb29tU2NoZW1hLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSA2LWNoYXJhY3RlciBqb2luIGNvZGVcbiAgICAgICAgbGV0IGpvaW5Db2RlID0gXCJcIjtcbiAgICAgICAgbGV0IGlzVW5pcXVlID0gZmFsc2U7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlICghaXNVbmlxdWUgJiYgYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgam9pbkNvZGUgPSBnZW5lcmF0ZUpvaW5Db2RlKCk7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgam9pbkNvZGUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZykgaXNVbmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNVbmlxdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgam9pbiBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc3Jvb20gPSBhd2FpdCBwcmlzbWEuY2xhc3Nyb29tLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsaWRhdGVkRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IHZhbGlkYXRlZERhdGEuc2VjdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHZhbGlkYXRlZERhdGEuc3ViamVjdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGpvaW5Db2RlLFxuICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEuaW5zdGl0dXRpb25JZCxcbiAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSByZWxldmFudCBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdGVhY2hlci1jbGFzc3Jvb21zLSR7Y3VycmVudFVzZXIuaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGluc3RpdHV0aW9uLWNsYXNzcm9vbXMtJHt2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9pbnN0aXR1dGlvbi9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYXNzcm9vbSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQWxsb3dzIGEgc3R1ZGVudCB0byBqb2luIGEgY2xhc3Nyb29tIHVzaW5nIGEgNi1jaGFyYWN0ZXIgY29kZS5cbiAqIEFsc28gb25ib2FyZHMgdGhlIHN0dWRlbnQgdG8gdGhlIGluc3RpdHV0aW9uIGlmIHRoZXkgYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luQ2xhc3Nyb29tKGNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnZhbGlkIGpvaW4gY29kZS5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGVucm9sbGVkIGluIHRoaXMgY2xhc3Nyb29tLlwiIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluc3RpdHV0aW9uIENoZWNrOlxuICAgICAgICAvLyAxLiBJZiB1c2VyIGJlbG9uZ3MgdG8gYW4gaW5zdGl0dXRpb24sIHRoZXkgY2FuIG9ubHkgam9pbiBjbGFzc3Jvb21zIGZyb20gVEhBVCBpbnN0aXR1dGlvbi5cbiAgICAgICAgLy8gMi4gSWYgdXNlciBoYXMgTk8gaW5zdGl0dXRpb24sIHRoZXkgYXJlIGFzc2lnbmVkIHRvIHRoaXMgY2xhc3Nyb29tJ3MgaW5zdGl0dXRpb24uXG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgJiYgY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCAhPT0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQpIHtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIllvdSBjYW5ub3Qgam9pbiB0aGlzIGNsYXNzcm9vbSBiZWNhdXNlIGl0IGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgaW5zdGl0dXRpb24uXCJcbiAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHN0dWRlbnQgdG8gY2xhc3Nyb29tXG4gICAgICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb20uaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7IGlkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmJvYXJkIHN0dWRlbnQgdG8gaW5zdGl0dXRpb24gaWYgbnVsbFxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCkge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5pbnN0aXR1dGlvbklkID0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWRpcyBJbnRlZ3JhdGlvbjogQ2FjaGUgc3R1ZGVudCBJRHMgcGVyIGNsYXNzcm9vbVxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb20uaWR9YDtcbiAgICAgICAgYXdhaXQgcmVkaXMuc2FkZChyZWRpc0tleSwgY3VycmVudFVzZXIuaWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYHN0dWRlbnQtY2xhc3Nyb29tcy0ke2N1cnJlbnRVc2VyLmlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjbGFzc3Jvb20tJHtjbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBTdWNjZXNzZnVsbHkgam9pbmVkICR7Y2xhc3Nyb29tLm5hbWV9YCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gam9pbiBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBqb2luIGNsYXNzcm9vbVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYmFzaWMgZGV0YWlscyBvZiBhIGNsYXNzcm9vbSBieSBpdHMgam9pbiBjb2RlLlxuICogVXNlZCBmb3IgdGhlIGpvaW4gY2xhc3Nyb29tIHBhZ2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDbGFzc3Jvb21CeUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBzdHVkZW50czogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0Vucm9sbGVkID0gc2Vzc2lvbj8udXNlciA/IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNsYXNzcm9vbS5pZCxcbiAgICAgICAgICAgICAgICBzdHVkZW50czogeyBzb21lOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBpc0Vucm9sbGVkOiAhIWlzRW5yb2xsZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBieSBjb2RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIGNyZWF0ZWQgYnkgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdGVhY2hlciAoQ0FDSEVEKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYWNoZXJDbGFzc3Jvb21zKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNvbnN0IGZldGNoQ2xhc3Nyb29tcyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgdGVhY2hlcklkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0dWRlbnRzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSxcbiAgICAgICAgeyB0YWdzOiBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IGZldGNoQ2xhc3Nyb29tcygpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0ZWFjaGVyIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIHdoZXJlIHRoZSBjdXJyZW50bHkgbG9nZ2VkLWluIHN0dWRlbnQgaXMgZW5yb2xsZWQgKENBQ0hFRCkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50Q2xhc3Nyb29tcygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyPy5lbnJvbGxlZENsYXNzcm9vbXMgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLCByZXZhbGlkYXRlOiAxMjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjbGFzc3Jvb21zID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNsYXNzcm9vbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHN0dWRlbnQgY2xhc3Nyb29tczpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbXNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRldGFpbHMgb2YgYSBzcGVjaWZpYyBjbGFzc3Jvb20sIGluY2x1ZGluZyB0aGUgc3R1ZGVudCBsaXN0IGZvciB0aGUgbGVhZGVyYm9hcmQgKENBQ0hFRCkuXG4gKiBTdXBwb3J0cyBwYWdpbmF0aW9uIGZvciBsYXJnZSBzdHVkZW50IGxpc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2xhc3Nyb29tV2l0aFN0dWRlbnRzKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gNTBcbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbSA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbY2xhc3Nyb29tLCB0b3RhbFN0dWRlbnRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgam9pbkNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdTdGFydGVkQXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGlkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2NvcmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyB0b3RhbFNjb3JlOiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS51c2VyLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6IHsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBjbGFzc3Jvb20sIHRvdGFsU3R1ZGVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tJHtpZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BjbGFzc3Jvb20tJHtpZH1gXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsYXNzcm9vbSwgdG90YWxTdHVkZW50cyB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb20oKTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsU3R1ZGVudHMsXG4gICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBkZXRhaWw6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21cIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzcm9vbVRyYWNraW5nKGNsYXNzcm9vbUlkOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGNsYXNzcm9vbSA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY2xhc3Nyb29tIHx8IChjbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQgJiYgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkFjY2VzcyBkZW5pZWRcIiB9O1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmdBY3RpdmU6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBhY3RpdmUgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBkZWxldGVGcm9tQ2FjaGUoY2FjaGVLZXkoXCJsaXZlLXRyYWNraW5nXCIsIGNsYXNzcm9vbUlkKSk7XG4gICAgcmV2YWxpZGF0ZVRhZyhgY2xhc3Nyb29tLSR7Y2xhc3Nyb29tSWR9YCwgXCJtYXhcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY2xhc3Nyb29tcy8ke2NsYXNzcm9vbUlkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUxpdmVUcmFja2luZyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBsaXZlIHRyYWNraW5nIGRhdGEgKHNob3J0IFRUTClcbiAgICBjb25zdCBjYWNoZUtleU5hbWUgPSBjYWNoZUtleShcImxpdmUtdHJhY2tpbmdcIiwgY2xhc3Nyb29tSWQpO1xuXG4gICAgY29uc3QgZmV0Y2hUcmFja2luZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaXNUcmFja2luZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja2luZ1N0YXJ0ZWRBdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIlNVQk1JVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbTogeyBzZWxlY3Q6IHsgdGl0bGU6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gRmlsdGVyIHN1Ym1pc3Npb25zIGlmIHRyYWNraW5nIGlzIGFjdGl2ZVxuICAgICAgICBjb25zdCBzdHVkZW50c0RhdGEgPSBjbGFzc3Jvb20uc3R1ZGVudHMubWFwKHN0dWRlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTdWJtaXNzaW9ucyA9IHN0dWRlbnQuc3VibWlzc2lvbnMuZmlsdGVyKHN1YiA9PlxuICAgICAgICAgICAgICAgIGNsYXNzcm9vbS5pc1RyYWNraW5nQWN0aXZlICYmXG4gICAgICAgICAgICAgICAgY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoc3ViLmNyZWF0ZWRBdCkgPj0gbmV3IERhdGUoY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0KVxuICAgICAgICAgICAgKS5tYXAoc3ViID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICAgICAgICBjb2RlOiBzdWIuY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN1Yi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbVRpdGxlOiBzdWIucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHN1Yi5jcmVhdGVkQXRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHN0dWRlbnQuaW1hZ2UsXG4gICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IGZpbHRlcmVkU3VibWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiBjbGFzc3Jvb20uaXNUcmFja2luZ0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBjbGFzc3Jvb20udHJhY2tpbmdTdGFydGVkQXQsXG4gICAgICAgICAgICBzdHVkZW50czogc3R1ZGVudHNEYXRhXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjYWNoZWRGZXRjaChjYWNoZUtleU5hbWUsIGZldGNoVHJhY2tpbmcsIENBQ0hFX0NPTkZJRy5TSE9SVC50dGwpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBsaXZlIHRyYWNraW5nOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdHJhY2tpbmcgZGF0YVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYWxsIGNsYXNzcm9vbXMgZm9yIGFuIGluc3RpdHV0aW9uIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluc3RpdHV0aW9uQ2xhc3Nyb29tcyhwYWdlOiBudW1iZXIgPSAxLCBsaW1pdDogbnVtYmVyID0gMjApIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gXCJBRE1JTlwiICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09IFwiSU5TVElUVVRJT05fTUFOQUdFUlwiKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RpdHV0aW9uSWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbXMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3R1ZGVudHM6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGluc3RpdHV0aW9uSWQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgY2xhc3Nyb29tcywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc3Jvb21zLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3Nyb29tcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluc3RpdHV0aW9uIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTdHVkZW50RnJvbUNsYXNzcm9vbShjbGFzc3Jvb21JZDogc3RyaW5nLCBzdHVkZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcbiAgICBjb25zdCBpc1Bvd2VyZnVsID0gW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSwgaW5zdGl0dXRpb25JZDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBhbGxvdyBpZiBwb3dlcmZ1bCByb2xlIE9SIGlmIGN1cnJlbnQgdXNlciBpcyB0aGUgdGVhY2hlclxuICAgICAgICBpZiAoIWlzUG93ZXJmdWwgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCAhPT0gY3VycmVudFVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNsYXNzcm9vbS51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogeyBpZDogc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIFJlZGlzIHNldFxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb21JZH1gO1xuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJlZGlzS2V5LCBzdHVkZW50SWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBzdHVkZW50LWNsYXNzcm9vbXMtJHtzdHVkZW50SWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NsYXNzcm9vbXMvJHtjbGFzc3Jvb21JZH1gKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW1vdmUgc3R1ZGVudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHJlbW92ZSBzdHVkZW50XCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IndTQW9rQnNCIn0=
}),
"[project]/components/classroom/ClassroomLeaderboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClassroomLeaderboard",
    ()=>ClassroomLeaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$37d78e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:37d78e [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const ITEMS_PER_PAGE = 20;
function ClassroomLeaderboard({ students, isTeacher, classroomId }) {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('score_desc');
    const [minScore, setMinScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [removingId, setRemovingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const filteredStudents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const filtered = students.filter((student)=>(student.name || "Anonymous User").toLowerCase().includes(searchQuery.toLowerCase()) && student.totalScore >= minScore);
        return filtered.sort((a, b)=>{
            if (sortBy === 'score_desc') return b.totalScore - a.totalScore;
            if (sortBy === 'score_asc') return a.totalScore - b.totalScore;
            const nameA = a.name || "Anonymous";
            const nameB = b.name || "Anonymous";
            if (sortBy === 'name_asc') return nameA.localeCompare(nameB);
            if (sortBy === 'name_desc') return nameB.localeCompare(nameA);
            return 0;
        });
    }, [
        students,
        searchQuery,
        sortBy,
        minScore
    ]);
    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
    const paginatedStudents = filteredStudents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handleRemoveStudent = async (studentId, studentName)=>{
        if (!classroomId) return;
        if (!confirm(`Are you sure you want to remove ${studentName || "this student"} from the classroom?`)) {
            return;
        }
        setRemovingId(studentId);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$37d78e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeStudentFromClassroom"])(classroomId, studentId);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Student removed successfully");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to remove student");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        } finally{
            setRemovingId(null);
        }
    };
    if (students.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-[#141414] p-16 text-center border-t border-gray-100 dark:border-[#262626]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-black text-gray-900 dark:text-white mb-1",
                    children: "Leaderboard Empty"
                }, void 0, false, {
                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 dark:text-gray-500 font-medium text-sm",
                    children: "Waiting for students to start solving ranking problems."
                }, void 0, false, {
                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                    lineNumber: 85,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
            lineNumber: 82,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-100 dark:border-[#262626] flex flex-col xl:flex-row gap-6 justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-5 h-5 text-orange-500"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight",
                                children: "Leaderboard"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black text-gray-300 dark:text-gray-600 ml-2 uppercase tracking-[0.2em]",
                                children: [
                                    students.length,
                                    " Total"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 w-full xl:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group flex-1 md:w-80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-orange-500 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 103,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search student name...",
                                        value: searchQuery,
                                        onChange: (e)=>{
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1);
                                        },
                                        className: "w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600 text-black dark:text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 102,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortBy,
                                        onChange: (e)=>setSortBy(e.target.value),
                                        className: "px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 focus:border-orange-500 focus:outline-none outline-none appearance-none cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "score_desc",
                                                children: "Highest Score"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 123,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "score_asc",
                                                children: "Lowest Score"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 124,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "name_asc",
                                                children: "Name (A-Z)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 125,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "name_desc",
                                                children: "Name (Z-A)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 126,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 118,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: minScore,
                                        onChange: (e)=>setMinScore(Number(e.target.value)),
                                        className: "px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 focus:border-orange-500 focus:outline-none outline-none appearance-none cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 0,
                                                children: "All Scores"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 134,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 100,
                                                children: "> 100 Points"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 135,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 500,
                                                children: "> 500 Points"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 136,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 1000,
                                                children: "> 1000 Points"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 137,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 129,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 117,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-left border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-gray-50/50 dark:bg-[#1a1a1a]/50 border-b border-gray-100 dark:border-[#262626]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] w-20 text-center",
                                        children: "Rank"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]",
                                        children: "Student"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 149,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-right",
                                        children: "Points"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 150,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-center w-32",
                                        children: "Action"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 151,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 147,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                            lineNumber: 146,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-gray-100 dark:divide-[#262626]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "popLayout",
                                children: paginatedStudents.map((student, index)=>{
                                    const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].tr, {
                                        layout: true,
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        className: "hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50 transition-colors group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-lg font-black ${actualIndex === 0 ? "text-orange-500" : "text-gray-300 dark:text-gray-600"} group-hover:text-orange-600 transition-colors`,
                                                    children: [
                                                        "#",
                                                        actualIndex + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 167,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-10 h-10 rounded overflow-hidden bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] group-hover:border-orange-200 dark:group-hover:border-orange-900 transition-all",
                                                            children: student.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: student.image,
                                                                alt: student.name || "Student",
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 57
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 font-bold text-sm",
                                                                children: student.name?.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900 dark:text-gray-200 group-hover:text-orange-600 transition-colors",
                                                                    children: student.name || "Anonymous User"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                    lineNumber: 189,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest leading-none mt-1",
                                                                    children: "Enrolled Student"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 172,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-black text-gray-950 dark:text-white tabular-nums group-hover:text-orange-600 transition-colors",
                                                    children: student.totalScore.toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 198,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/profile/${student.id}`,
                                                            className: "inline-flex items-center justify-center p-2 text-gray-400 dark:text-gray-600 hover:text-orange-600 dark:hover:text-orange-500 transition-colors",
                                                            title: "View Profile",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 49
                                                        }, this),
                                                        isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleRemoveStudent(student.id, student.name || ""),
                                                            disabled: removingId === student.id,
                                                            className: "inline-flex items-center justify-center p-2 text-gray-400 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition-colors disabled:opacity-50",
                                                            title: "Remove Student",
                                                            children: removingId === student.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "w-4 h-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 61
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 61
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                                lineNumber: 203,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, student.id, true, {
                                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                        lineNumber: 159,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 155,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                            lineNumber: 154,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                    lineNumber: 145,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                lineNumber: 144,
                columnNumber: 13
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest",
                        children: [
                            "Page ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-900 dark:text-white",
                                children: currentPage
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 240,
                                columnNumber: 30
                            }, this),
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                        lineNumber: 239,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setCurrentPage((prev)=>Math.max(1, prev - 1));
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                },
                                disabled: currentPage === 1,
                                className: "px-4 py-2 border border-gray-100 dark:border-[#333] text-xs font-black uppercase tracking-widest text-black dark:text-white hover:text-orange-600 dark:hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 disabled:opacity-30 transition-all",
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 243,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setCurrentPage((prev)=>Math.min(totalPages, prev + 1));
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                },
                                disabled: currentPage === totalPages,
                                className: "px-4 py-2 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 hover:border-orange-600 dark:hover:border-gray-200 disabled:opacity-30 transition-all",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                                lineNumber: 253,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                        lineNumber: 242,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
                lineNumber: 238,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/ClassroomLeaderboard.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:f21b40 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40cf2b7d8360449612784b56c4ebe4adc7f8e41e41":"getClassroomLiveTracking"},"actions/classroom.ts",""] */ __turbopack_context__.s([
    "getClassroomLiveTracking",
    ()=>getClassroomLiveTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getClassroomLiveTracking = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40cf2b7d8360449612784b56c4ebe4adc7f8e41e41", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getClassroomLiveTracking"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgcmVkaXMgZnJvbSBcIkAvbGliL3JlZGlzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGgsIHJldmFsaWRhdGVUYWcsIHVuc3RhYmxlX2NhY2hlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IGNhY2hlS2V5LCBjYWNoZWRGZXRjaCwgQ0FDSEVfQ09ORklHLCBkZWxldGVGcm9tQ2FjaGUgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuY29uc3QgY2xhc3Nyb29tU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiKSxcbiAgICBzZWN0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBzdWJqZWN0OiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLFxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSm9pbkNvZGUoKSB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OVwiO1xuICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjbGFzc3Jvb20uXG4gKiBPbmx5IEFETUlOLCBJTlNUSVRVVElPTl9NQU5BR0VSLCBvciBURUFDSEVSIHJvbGVzIGNhbiBjcmVhdGUgY2xhc3Nyb29tcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzcm9vbShkYXRhOiB6LmluZmVyPHR5cGVvZiBjbGFzc3Jvb21TY2hlbWE+KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gU2VjdXJpdHkgY2hlY2tcbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZC4gT25seSB0ZWFjaGVycyBvciBtYW5hZ2VycyBjYW4gY3JlYXRlIGNsYXNzcm9vbXMuXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWREYXRhID0gY2xhc3Nyb29tU2NoZW1hLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSA2LWNoYXJhY3RlciBqb2luIGNvZGVcbiAgICAgICAgbGV0IGpvaW5Db2RlID0gXCJcIjtcbiAgICAgICAgbGV0IGlzVW5pcXVlID0gZmFsc2U7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlICghaXNVbmlxdWUgJiYgYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgam9pbkNvZGUgPSBnZW5lcmF0ZUpvaW5Db2RlKCk7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgam9pbkNvZGUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZykgaXNVbmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNVbmlxdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgam9pbiBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc3Jvb20gPSBhd2FpdCBwcmlzbWEuY2xhc3Nyb29tLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsaWRhdGVkRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IHZhbGlkYXRlZERhdGEuc2VjdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHZhbGlkYXRlZERhdGEuc3ViamVjdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGpvaW5Db2RlLFxuICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEuaW5zdGl0dXRpb25JZCxcbiAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSByZWxldmFudCBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdGVhY2hlci1jbGFzc3Jvb21zLSR7Y3VycmVudFVzZXIuaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGluc3RpdHV0aW9uLWNsYXNzcm9vbXMtJHt2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9pbnN0aXR1dGlvbi9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYXNzcm9vbSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQWxsb3dzIGEgc3R1ZGVudCB0byBqb2luIGEgY2xhc3Nyb29tIHVzaW5nIGEgNi1jaGFyYWN0ZXIgY29kZS5cbiAqIEFsc28gb25ib2FyZHMgdGhlIHN0dWRlbnQgdG8gdGhlIGluc3RpdHV0aW9uIGlmIHRoZXkgYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luQ2xhc3Nyb29tKGNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnZhbGlkIGpvaW4gY29kZS5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGVucm9sbGVkIGluIHRoaXMgY2xhc3Nyb29tLlwiIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluc3RpdHV0aW9uIENoZWNrOlxuICAgICAgICAvLyAxLiBJZiB1c2VyIGJlbG9uZ3MgdG8gYW4gaW5zdGl0dXRpb24sIHRoZXkgY2FuIG9ubHkgam9pbiBjbGFzc3Jvb21zIGZyb20gVEhBVCBpbnN0aXR1dGlvbi5cbiAgICAgICAgLy8gMi4gSWYgdXNlciBoYXMgTk8gaW5zdGl0dXRpb24sIHRoZXkgYXJlIGFzc2lnbmVkIHRvIHRoaXMgY2xhc3Nyb29tJ3MgaW5zdGl0dXRpb24uXG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgJiYgY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCAhPT0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQpIHtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIllvdSBjYW5ub3Qgam9pbiB0aGlzIGNsYXNzcm9vbSBiZWNhdXNlIGl0IGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgaW5zdGl0dXRpb24uXCJcbiAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHN0dWRlbnQgdG8gY2xhc3Nyb29tXG4gICAgICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb20uaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7IGlkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmJvYXJkIHN0dWRlbnQgdG8gaW5zdGl0dXRpb24gaWYgbnVsbFxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCkge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5pbnN0aXR1dGlvbklkID0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWRpcyBJbnRlZ3JhdGlvbjogQ2FjaGUgc3R1ZGVudCBJRHMgcGVyIGNsYXNzcm9vbVxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb20uaWR9YDtcbiAgICAgICAgYXdhaXQgcmVkaXMuc2FkZChyZWRpc0tleSwgY3VycmVudFVzZXIuaWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYHN0dWRlbnQtY2xhc3Nyb29tcy0ke2N1cnJlbnRVc2VyLmlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjbGFzc3Jvb20tJHtjbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBTdWNjZXNzZnVsbHkgam9pbmVkICR7Y2xhc3Nyb29tLm5hbWV9YCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gam9pbiBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBqb2luIGNsYXNzcm9vbVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYmFzaWMgZGV0YWlscyBvZiBhIGNsYXNzcm9vbSBieSBpdHMgam9pbiBjb2RlLlxuICogVXNlZCBmb3IgdGhlIGpvaW4gY2xhc3Nyb29tIHBhZ2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDbGFzc3Jvb21CeUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBzdHVkZW50czogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0Vucm9sbGVkID0gc2Vzc2lvbj8udXNlciA/IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNsYXNzcm9vbS5pZCxcbiAgICAgICAgICAgICAgICBzdHVkZW50czogeyBzb21lOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBpc0Vucm9sbGVkOiAhIWlzRW5yb2xsZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBieSBjb2RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIGNyZWF0ZWQgYnkgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdGVhY2hlciAoQ0FDSEVEKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYWNoZXJDbGFzc3Jvb21zKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNvbnN0IGZldGNoQ2xhc3Nyb29tcyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgdGVhY2hlcklkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0dWRlbnRzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSxcbiAgICAgICAgeyB0YWdzOiBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IGZldGNoQ2xhc3Nyb29tcygpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0ZWFjaGVyIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIHdoZXJlIHRoZSBjdXJyZW50bHkgbG9nZ2VkLWluIHN0dWRlbnQgaXMgZW5yb2xsZWQgKENBQ0hFRCkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50Q2xhc3Nyb29tcygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyPy5lbnJvbGxlZENsYXNzcm9vbXMgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLCByZXZhbGlkYXRlOiAxMjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjbGFzc3Jvb21zID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNsYXNzcm9vbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHN0dWRlbnQgY2xhc3Nyb29tczpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbXNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRldGFpbHMgb2YgYSBzcGVjaWZpYyBjbGFzc3Jvb20sIGluY2x1ZGluZyB0aGUgc3R1ZGVudCBsaXN0IGZvciB0aGUgbGVhZGVyYm9hcmQgKENBQ0hFRCkuXG4gKiBTdXBwb3J0cyBwYWdpbmF0aW9uIGZvciBsYXJnZSBzdHVkZW50IGxpc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2xhc3Nyb29tV2l0aFN0dWRlbnRzKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gNTBcbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbSA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbY2xhc3Nyb29tLCB0b3RhbFN0dWRlbnRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgam9pbkNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdTdGFydGVkQXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGlkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2NvcmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyB0b3RhbFNjb3JlOiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS51c2VyLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6IHsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBjbGFzc3Jvb20sIHRvdGFsU3R1ZGVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tJHtpZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BjbGFzc3Jvb20tJHtpZH1gXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsYXNzcm9vbSwgdG90YWxTdHVkZW50cyB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb20oKTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsU3R1ZGVudHMsXG4gICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBkZXRhaWw6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21cIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzcm9vbVRyYWNraW5nKGNsYXNzcm9vbUlkOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGNsYXNzcm9vbSA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY2xhc3Nyb29tIHx8IChjbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQgJiYgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkFjY2VzcyBkZW5pZWRcIiB9O1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmdBY3RpdmU6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBhY3RpdmUgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBkZWxldGVGcm9tQ2FjaGUoY2FjaGVLZXkoXCJsaXZlLXRyYWNraW5nXCIsIGNsYXNzcm9vbUlkKSk7XG4gICAgcmV2YWxpZGF0ZVRhZyhgY2xhc3Nyb29tLSR7Y2xhc3Nyb29tSWR9YCwgXCJtYXhcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY2xhc3Nyb29tcy8ke2NsYXNzcm9vbUlkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUxpdmVUcmFja2luZyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBsaXZlIHRyYWNraW5nIGRhdGEgKHNob3J0IFRUTClcbiAgICBjb25zdCBjYWNoZUtleU5hbWUgPSBjYWNoZUtleShcImxpdmUtdHJhY2tpbmdcIiwgY2xhc3Nyb29tSWQpO1xuXG4gICAgY29uc3QgZmV0Y2hUcmFja2luZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaXNUcmFja2luZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja2luZ1N0YXJ0ZWRBdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIlNVQk1JVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbTogeyBzZWxlY3Q6IHsgdGl0bGU6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gRmlsdGVyIHN1Ym1pc3Npb25zIGlmIHRyYWNraW5nIGlzIGFjdGl2ZVxuICAgICAgICBjb25zdCBzdHVkZW50c0RhdGEgPSBjbGFzc3Jvb20uc3R1ZGVudHMubWFwKHN0dWRlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTdWJtaXNzaW9ucyA9IHN0dWRlbnQuc3VibWlzc2lvbnMuZmlsdGVyKHN1YiA9PlxuICAgICAgICAgICAgICAgIGNsYXNzcm9vbS5pc1RyYWNraW5nQWN0aXZlICYmXG4gICAgICAgICAgICAgICAgY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoc3ViLmNyZWF0ZWRBdCkgPj0gbmV3IERhdGUoY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0KVxuICAgICAgICAgICAgKS5tYXAoc3ViID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICAgICAgICBjb2RlOiBzdWIuY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN1Yi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbVRpdGxlOiBzdWIucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHN1Yi5jcmVhdGVkQXRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHN0dWRlbnQuaW1hZ2UsXG4gICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IGZpbHRlcmVkU3VibWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiBjbGFzc3Jvb20uaXNUcmFja2luZ0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBjbGFzc3Jvb20udHJhY2tpbmdTdGFydGVkQXQsXG4gICAgICAgICAgICBzdHVkZW50czogc3R1ZGVudHNEYXRhXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjYWNoZWRGZXRjaChjYWNoZUtleU5hbWUsIGZldGNoVHJhY2tpbmcsIENBQ0hFX0NPTkZJRy5TSE9SVC50dGwpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBsaXZlIHRyYWNraW5nOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdHJhY2tpbmcgZGF0YVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYWxsIGNsYXNzcm9vbXMgZm9yIGFuIGluc3RpdHV0aW9uIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluc3RpdHV0aW9uQ2xhc3Nyb29tcyhwYWdlOiBudW1iZXIgPSAxLCBsaW1pdDogbnVtYmVyID0gMjApIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gXCJBRE1JTlwiICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09IFwiSU5TVElUVVRJT05fTUFOQUdFUlwiKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RpdHV0aW9uSWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbXMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3R1ZGVudHM6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGluc3RpdHV0aW9uSWQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgY2xhc3Nyb29tcywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc3Jvb21zLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3Nyb29tcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluc3RpdHV0aW9uIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTdHVkZW50RnJvbUNsYXNzcm9vbShjbGFzc3Jvb21JZDogc3RyaW5nLCBzdHVkZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcbiAgICBjb25zdCBpc1Bvd2VyZnVsID0gW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSwgaW5zdGl0dXRpb25JZDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBhbGxvdyBpZiBwb3dlcmZ1bCByb2xlIE9SIGlmIGN1cnJlbnQgdXNlciBpcyB0aGUgdGVhY2hlclxuICAgICAgICBpZiAoIWlzUG93ZXJmdWwgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCAhPT0gY3VycmVudFVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNsYXNzcm9vbS51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogeyBpZDogc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIFJlZGlzIHNldFxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb21JZH1gO1xuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJlZGlzS2V5LCBzdHVkZW50SWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBzdHVkZW50LWNsYXNzcm9vbXMtJHtzdHVkZW50SWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NsYXNzcm9vbXMvJHtjbGFzc3Jvb21JZH1gKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW1vdmUgc3R1ZGVudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHJlbW92ZSBzdHVkZW50XCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InNTQTZhc0IifQ==
}),
"[project]/actions/data:a3be38 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60edb317f160a76e4bb511111cff02ad646382fb68":"toggleClassroomTracking"},"actions/classroom.ts",""] */ __turbopack_context__.s([
    "toggleClassroomTracking",
    ()=>toggleClassroomTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var toggleClassroomTracking = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("60edb317f160a76e4bb511111cff02ad646382fb68", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "toggleClassroomTracking"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgcmVkaXMgZnJvbSBcIkAvbGliL3JlZGlzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGgsIHJldmFsaWRhdGVUYWcsIHVuc3RhYmxlX2NhY2hlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IGNhY2hlS2V5LCBjYWNoZWRGZXRjaCwgQ0FDSEVfQ09ORklHLCBkZWxldGVGcm9tQ2FjaGUgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuY29uc3QgY2xhc3Nyb29tU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiKSxcbiAgICBzZWN0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBzdWJqZWN0OiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLFxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSm9pbkNvZGUoKSB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OVwiO1xuICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjbGFzc3Jvb20uXG4gKiBPbmx5IEFETUlOLCBJTlNUSVRVVElPTl9NQU5BR0VSLCBvciBURUFDSEVSIHJvbGVzIGNhbiBjcmVhdGUgY2xhc3Nyb29tcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzcm9vbShkYXRhOiB6LmluZmVyPHR5cGVvZiBjbGFzc3Jvb21TY2hlbWE+KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gU2VjdXJpdHkgY2hlY2tcbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZC4gT25seSB0ZWFjaGVycyBvciBtYW5hZ2VycyBjYW4gY3JlYXRlIGNsYXNzcm9vbXMuXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWREYXRhID0gY2xhc3Nyb29tU2NoZW1hLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSA2LWNoYXJhY3RlciBqb2luIGNvZGVcbiAgICAgICAgbGV0IGpvaW5Db2RlID0gXCJcIjtcbiAgICAgICAgbGV0IGlzVW5pcXVlID0gZmFsc2U7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlICghaXNVbmlxdWUgJiYgYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgam9pbkNvZGUgPSBnZW5lcmF0ZUpvaW5Db2RlKCk7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgam9pbkNvZGUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZykgaXNVbmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNVbmlxdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgam9pbiBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc3Jvb20gPSBhd2FpdCBwcmlzbWEuY2xhc3Nyb29tLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsaWRhdGVkRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IHZhbGlkYXRlZERhdGEuc2VjdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHZhbGlkYXRlZERhdGEuc3ViamVjdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGpvaW5Db2RlLFxuICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEuaW5zdGl0dXRpb25JZCxcbiAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSByZWxldmFudCBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdGVhY2hlci1jbGFzc3Jvb21zLSR7Y3VycmVudFVzZXIuaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGluc3RpdHV0aW9uLWNsYXNzcm9vbXMtJHt2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9pbnN0aXR1dGlvbi9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYXNzcm9vbSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQWxsb3dzIGEgc3R1ZGVudCB0byBqb2luIGEgY2xhc3Nyb29tIHVzaW5nIGEgNi1jaGFyYWN0ZXIgY29kZS5cbiAqIEFsc28gb25ib2FyZHMgdGhlIHN0dWRlbnQgdG8gdGhlIGluc3RpdHV0aW9uIGlmIHRoZXkgYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luQ2xhc3Nyb29tKGNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnZhbGlkIGpvaW4gY29kZS5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGVucm9sbGVkIGluIHRoaXMgY2xhc3Nyb29tLlwiIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluc3RpdHV0aW9uIENoZWNrOlxuICAgICAgICAvLyAxLiBJZiB1c2VyIGJlbG9uZ3MgdG8gYW4gaW5zdGl0dXRpb24sIHRoZXkgY2FuIG9ubHkgam9pbiBjbGFzc3Jvb21zIGZyb20gVEhBVCBpbnN0aXR1dGlvbi5cbiAgICAgICAgLy8gMi4gSWYgdXNlciBoYXMgTk8gaW5zdGl0dXRpb24sIHRoZXkgYXJlIGFzc2lnbmVkIHRvIHRoaXMgY2xhc3Nyb29tJ3MgaW5zdGl0dXRpb24uXG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgJiYgY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCAhPT0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQpIHtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIllvdSBjYW5ub3Qgam9pbiB0aGlzIGNsYXNzcm9vbSBiZWNhdXNlIGl0IGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgaW5zdGl0dXRpb24uXCJcbiAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHN0dWRlbnQgdG8gY2xhc3Nyb29tXG4gICAgICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb20uaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7IGlkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmJvYXJkIHN0dWRlbnQgdG8gaW5zdGl0dXRpb24gaWYgbnVsbFxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCkge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5pbnN0aXR1dGlvbklkID0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWRpcyBJbnRlZ3JhdGlvbjogQ2FjaGUgc3R1ZGVudCBJRHMgcGVyIGNsYXNzcm9vbVxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb20uaWR9YDtcbiAgICAgICAgYXdhaXQgcmVkaXMuc2FkZChyZWRpc0tleSwgY3VycmVudFVzZXIuaWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYHN0dWRlbnQtY2xhc3Nyb29tcy0ke2N1cnJlbnRVc2VyLmlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjbGFzc3Jvb20tJHtjbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBTdWNjZXNzZnVsbHkgam9pbmVkICR7Y2xhc3Nyb29tLm5hbWV9YCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gam9pbiBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBqb2luIGNsYXNzcm9vbVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYmFzaWMgZGV0YWlscyBvZiBhIGNsYXNzcm9vbSBieSBpdHMgam9pbiBjb2RlLlxuICogVXNlZCBmb3IgdGhlIGpvaW4gY2xhc3Nyb29tIHBhZ2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDbGFzc3Jvb21CeUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBzdHVkZW50czogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0Vucm9sbGVkID0gc2Vzc2lvbj8udXNlciA/IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNsYXNzcm9vbS5pZCxcbiAgICAgICAgICAgICAgICBzdHVkZW50czogeyBzb21lOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBpc0Vucm9sbGVkOiAhIWlzRW5yb2xsZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBieSBjb2RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIGNyZWF0ZWQgYnkgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdGVhY2hlciAoQ0FDSEVEKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYWNoZXJDbGFzc3Jvb21zKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNvbnN0IGZldGNoQ2xhc3Nyb29tcyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgdGVhY2hlcklkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0dWRlbnRzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSxcbiAgICAgICAgeyB0YWdzOiBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IGZldGNoQ2xhc3Nyb29tcygpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0ZWFjaGVyIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIHdoZXJlIHRoZSBjdXJyZW50bHkgbG9nZ2VkLWluIHN0dWRlbnQgaXMgZW5yb2xsZWQgKENBQ0hFRCkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50Q2xhc3Nyb29tcygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyPy5lbnJvbGxlZENsYXNzcm9vbXMgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLCByZXZhbGlkYXRlOiAxMjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjbGFzc3Jvb21zID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNsYXNzcm9vbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHN0dWRlbnQgY2xhc3Nyb29tczpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbXNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRldGFpbHMgb2YgYSBzcGVjaWZpYyBjbGFzc3Jvb20sIGluY2x1ZGluZyB0aGUgc3R1ZGVudCBsaXN0IGZvciB0aGUgbGVhZGVyYm9hcmQgKENBQ0hFRCkuXG4gKiBTdXBwb3J0cyBwYWdpbmF0aW9uIGZvciBsYXJnZSBzdHVkZW50IGxpc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2xhc3Nyb29tV2l0aFN0dWRlbnRzKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gNTBcbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbSA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbY2xhc3Nyb29tLCB0b3RhbFN0dWRlbnRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgam9pbkNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdTdGFydGVkQXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGlkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2NvcmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyB0b3RhbFNjb3JlOiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS51c2VyLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6IHsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBjbGFzc3Jvb20sIHRvdGFsU3R1ZGVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tJHtpZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BjbGFzc3Jvb20tJHtpZH1gXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsYXNzcm9vbSwgdG90YWxTdHVkZW50cyB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb20oKTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsU3R1ZGVudHMsXG4gICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBkZXRhaWw6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21cIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzcm9vbVRyYWNraW5nKGNsYXNzcm9vbUlkOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGNsYXNzcm9vbSA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY2xhc3Nyb29tIHx8IChjbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQgJiYgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkFjY2VzcyBkZW5pZWRcIiB9O1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmdBY3RpdmU6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBhY3RpdmUgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBkZWxldGVGcm9tQ2FjaGUoY2FjaGVLZXkoXCJsaXZlLXRyYWNraW5nXCIsIGNsYXNzcm9vbUlkKSk7XG4gICAgcmV2YWxpZGF0ZVRhZyhgY2xhc3Nyb29tLSR7Y2xhc3Nyb29tSWR9YCwgXCJtYXhcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY2xhc3Nyb29tcy8ke2NsYXNzcm9vbUlkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUxpdmVUcmFja2luZyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBsaXZlIHRyYWNraW5nIGRhdGEgKHNob3J0IFRUTClcbiAgICBjb25zdCBjYWNoZUtleU5hbWUgPSBjYWNoZUtleShcImxpdmUtdHJhY2tpbmdcIiwgY2xhc3Nyb29tSWQpO1xuXG4gICAgY29uc3QgZmV0Y2hUcmFja2luZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaXNUcmFja2luZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja2luZ1N0YXJ0ZWRBdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIlNVQk1JVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbTogeyBzZWxlY3Q6IHsgdGl0bGU6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gRmlsdGVyIHN1Ym1pc3Npb25zIGlmIHRyYWNraW5nIGlzIGFjdGl2ZVxuICAgICAgICBjb25zdCBzdHVkZW50c0RhdGEgPSBjbGFzc3Jvb20uc3R1ZGVudHMubWFwKHN0dWRlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTdWJtaXNzaW9ucyA9IHN0dWRlbnQuc3VibWlzc2lvbnMuZmlsdGVyKHN1YiA9PlxuICAgICAgICAgICAgICAgIGNsYXNzcm9vbS5pc1RyYWNraW5nQWN0aXZlICYmXG4gICAgICAgICAgICAgICAgY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoc3ViLmNyZWF0ZWRBdCkgPj0gbmV3IERhdGUoY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0KVxuICAgICAgICAgICAgKS5tYXAoc3ViID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICAgICAgICBjb2RlOiBzdWIuY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN1Yi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbVRpdGxlOiBzdWIucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHN1Yi5jcmVhdGVkQXRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHN0dWRlbnQuaW1hZ2UsXG4gICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IGZpbHRlcmVkU3VibWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiBjbGFzc3Jvb20uaXNUcmFja2luZ0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBjbGFzc3Jvb20udHJhY2tpbmdTdGFydGVkQXQsXG4gICAgICAgICAgICBzdHVkZW50czogc3R1ZGVudHNEYXRhXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjYWNoZWRGZXRjaChjYWNoZUtleU5hbWUsIGZldGNoVHJhY2tpbmcsIENBQ0hFX0NPTkZJRy5TSE9SVC50dGwpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBsaXZlIHRyYWNraW5nOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdHJhY2tpbmcgZGF0YVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYWxsIGNsYXNzcm9vbXMgZm9yIGFuIGluc3RpdHV0aW9uIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluc3RpdHV0aW9uQ2xhc3Nyb29tcyhwYWdlOiBudW1iZXIgPSAxLCBsaW1pdDogbnVtYmVyID0gMjApIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gXCJBRE1JTlwiICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09IFwiSU5TVElUVVRJT05fTUFOQUdFUlwiKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RpdHV0aW9uSWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbXMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3R1ZGVudHM6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGluc3RpdHV0aW9uSWQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgY2xhc3Nyb29tcywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc3Jvb21zLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3Nyb29tcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluc3RpdHV0aW9uIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTdHVkZW50RnJvbUNsYXNzcm9vbShjbGFzc3Jvb21JZDogc3RyaW5nLCBzdHVkZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcbiAgICBjb25zdCBpc1Bvd2VyZnVsID0gW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSwgaW5zdGl0dXRpb25JZDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBhbGxvdyBpZiBwb3dlcmZ1bCByb2xlIE9SIGlmIGN1cnJlbnQgdXNlciBpcyB0aGUgdGVhY2hlclxuICAgICAgICBpZiAoIWlzUG93ZXJmdWwgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCAhPT0gY3VycmVudFVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNsYXNzcm9vbS51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogeyBpZDogc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIFJlZGlzIHNldFxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb21JZH1gO1xuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJlZGlzS2V5LCBzdHVkZW50SWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBzdHVkZW50LWNsYXNzcm9vbXMtJHtzdHVkZW50SWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NsYXNzcm9vbXMvJHtjbGFzc3Jvb21JZH1gKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW1vdmUgc3R1ZGVudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHJlbW92ZSBzdHVkZW50XCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFTQStZc0IifQ==
}),
"[project]/components/classroom/LiveTracking.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveTracking",
    ()=>LiveTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f21b40__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f21b40 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$a3be38__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:a3be38 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function LiveTracking({ classroomId }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isToggling, setIsToggling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSubmission, setSelectedSubmission] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filters
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [minSubmissions, setMinSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const fetchTrackingData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f21b40__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getClassroomLiveTracking"])(classroomId);
        if (res.success) {
            setData(res);
        }
        setIsLoading(false);
    }, [
        classroomId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchTrackingData();
        const interval = setInterval(fetchTrackingData, 2000);
        return ()=>clearInterval(interval);
    }, [
        fetchTrackingData
    ]);
    const handleToggle = async (active)=>{
        setIsToggling(true);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$a3be38__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["toggleClassroomTracking"])(classroomId, active);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(active ? "Tracking session started" : "Tracking session ended");
            fetchTrackingData();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Operation failed");
        }
        setIsToggling(false);
    };
    // Derived Statistics & Filtered Data
    const { stats, filteredStudents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data?.students) return {
            stats: null,
            filteredStudents: []
        };
        let activeCount = 0;
        let totalSubs = 0;
        let acceptedSubs = 0;
        const allStudents = data.students;
        // Calculate Global Stats
        allStudents.forEach((s)=>{
            if (s.submissions.length > 0) {
                activeCount++;
                totalSubs += s.submissions.length;
                acceptedSubs += s.submissions.filter((sub)=>sub.status === 'ACCEPTED').length;
            }
        });
        const acceptanceRate = totalSubs > 0 ? Math.round(acceptedSubs / totalSubs * 100) : 0;
        // Filter Students
        const filtered = allStudents.filter((student)=>{
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMinSubs = student.submissions.length >= minSubmissions;
            return matchesSearch && matchesMinSubs;
        });
        return {
            stats: {
                activeStudents: activeCount,
                totalSubmissions: totalSubs,
                acceptanceRate,
                totalStudents: allStudents.length
            },
            filteredStudents: filtered
        };
    }, [
        data,
        searchTerm,
        minSubmissions
    ]);
    if (isLoading && !data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center p-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-8 h-8 text-orange-600 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/classroom/LiveTracking.tsx",
                lineNumber: 92,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/classroom/LiveTracking.tsx",
            lineNumber: 91,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 max-w-[1600px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col xl:flex-row xl:items-center justify-between gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex items-center justify-center w-8 h-8 rounded-lg ${data?.isTrackingActive ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-gray-100 dark:bg-[#1a1a1a]'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    className: `w-4 h-4 ${data?.isTrackingActive ? 'text-orange-600 animate-pulse' : 'text-gray-400'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 104,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest",
                                                children: "Live Session Hub"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 107,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 103,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight",
                                        children: "Real-Time Monitor"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 109,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium",
                                        children: data?.isTrackingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 37
                                                }, this),
                                                "Monitoring activity since ",
                                                new Date(data.trackingStartedAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 bg-gray-300 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 37
                                                }, this),
                                                "Session inactive. Start tracking to collect data."
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 110,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 102,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    data?.isTrackingActive && stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-1 gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5",
                                                        children: "Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-black text-gray-900 dark:text-white leading-none",
                                                        children: [
                                                            stats.activeStudents,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-300 text-xs font-normal",
                                                                children: [
                                                                    "/",
                                                                    stats.totalStudents
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                lineNumber: 131,
                                                                columnNumber: 138
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 129,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5",
                                                        children: "Submitted"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-black text-gray-900 dark:text-white leading-none",
                                                        children: stats.totalSubmissions
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 133,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5",
                                                        children: "Success Rate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-black text-emerald-500 leading-none",
                                                        children: [
                                                            stats.acceptanceRate,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 137,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleToggle(!data?.isTrackingActive),
                                        disabled: isToggling,
                                        className: `h-14 px-8 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${data?.isTrackingActive ? "bg-white text-red-600 border-2 border-red-50 hover:bg-red-50 hover:border-red-100 shadow-red-100/50" : "bg-orange-600 text-white hover:bg-orange-500 shadow-orange-200 dark:shadow-none border-2 border-transparent"}`,
                                        children: [
                                            isToggling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 154,
                                                columnNumber: 33
                                            }, this) : data?.isTrackingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                className: "w-4 h-4 fill-current"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 156,
                                                columnNumber: 58
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "w-4 h-4 fill-current"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 156,
                                                columnNumber: 104
                                            }, this),
                                            data?.isTrackingActive ? "Stop Session" : "Start Session"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this),
                    data?.isTrackingActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 pt-6 border-t border-gray-100 dark:border-[#262626] flex flex-col md:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 167,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search by student name...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        className: "w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 168,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 166,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                className: "w-4 h-4 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 179,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: minSubmissions,
                                            onChange: (e)=>setMinSubmissions(Number(e.target.value)),
                                            className: "h-12 pl-11 pr-8 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 border-none outline-none appearance-none cursor-pointer transition-all min-w-[200px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: 0,
                                                    children: "All Submissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: 1,
                                                    children: "At least 1 submission"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: 3,
                                                    children: "At least 3 submissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: 5,
                                                    children: "More than 5 submissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: 10,
                                                    children: "More than 10 submissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 181,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-3 h-3 text-gray-400 rotate-90"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 193,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 192,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                    lineNumber: 177,
                                    columnNumber: 30
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                        lineNumber: 165,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/LiveTracking.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6",
                children: filteredStudents.length > 0 ? filteredStudents.map((student)=>{
                    const total = student.submissions.length;
                    const accepted = student.submissions.filter((s)=>s.status === 'ACCEPTED').length;
                    const rate = total > 0 ? Math.round(accepted / total * 100) : 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-non hover:border-orange-100 dark:hover:border-orange-900/30 transition-all duration-300 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 pb-4 flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#333] relative overflow-hidden",
                                                children: student.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: student.image,
                                                    alt: student.name,
                                                    fill: true,
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 49
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-xl bg-orange-50 dark:bg-orange-900/10",
                                                    children: student.name?.charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 217,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900 dark:text-white mb-1 line-clamp-1",
                                                        children: student.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-[#1a1a1a] px-2 py-0.5 rounded-full",
                                                            children: [
                                                                "#",
                                                                student.id.slice(-4)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 226,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 216,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black text-gray-900 dark:text-white leading-none mb-1",
                                                children: total
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 236,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[9px] font-black text-gray-400 uppercase tracking-widest",
                                                children: "Total Subs"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 239,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 235,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 215,
                                columnNumber: 33
                            }, this),
                            total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-600",
                                                children: [
                                                    accepted,
                                                    " Accepted"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 247,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: [
                                                    total - accepted,
                                                    " Errors"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 248,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 246,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 w-full bg-gray-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-emerald-500",
                                                style: {
                                                    width: `${rate}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 251,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-red-400",
                                                style: {
                                                    width: `${100 - rate}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 252,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 250,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 245,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-100 dark:border-[#262626] bg-gray-50/30 dark:bg-black/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-[220px] overflow-y-auto custom-scrollbar p-2",
                                    children: student.submissions.length > 0 ? student.submissions.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedSubmission({
                                                    ...sub,
                                                    student
                                                }),
                                            className: "w-full flex items-center justify-between p-3 rounded-lg hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-sm transition-all group/item text-left mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `mt-0.5 ${sub.status === 'ACCEPTED' ? 'text-emerald-500' : sub.status === 'PENDING' ? 'text-orange-500' : 'text-red-500'}`,
                                                            children: sub.status === 'ACCEPTED' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 90
                                                            }, this) : sub.status === 'PENDING' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "w-4 h-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 89
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 62
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-xs text-gray-700 dark:text-gray-300 truncate group-hover/item:text-orange-600 transition-colors",
                                                                    children: sub.problemTitle
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                    lineNumber: 277,
                                                                    columnNumber: 61
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[9px] font-medium text-gray-400 mt-0.5",
                                                                    children: new Date(sub.createdAt).toLocaleTimeString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                    lineNumber: 280,
                                                                    columnNumber: 61
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    className: "w-3 h-3 text-gray-300 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, sub.id, true, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 262,
                                            columnNumber: 49
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-8 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-5 h-5 text-gray-300 dark:text-gray-700 mx-auto mb-2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 290,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest",
                                                children: "No Activity Yet"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 291,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 289,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                    lineNumber: 259,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                lineNumber: 258,
                                columnNumber: 33
                            }, this)
                        ]
                    }, student.id, true, {
                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                        lineNumber: 210,
                        columnNumber: 29
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full py-20 text-center bg-gray-50/50 dark:bg-[#141414] border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-3xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                            lineNumber: 301,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-gray-900 dark:text-white mb-1",
                            children: "No Students Found"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                            lineNumber: 302,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-sm",
                            children: "Adjust filters or search criteria to see results."
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                            lineNumber: 303,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                    lineNumber: 300,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/classroom/LiveTracking.tsx",
                lineNumber: 202,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: selectedSubmission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>setSelectedSubmission(null),
                            className: "absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                            lineNumber: 312,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.95,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                y: 20
                            },
                            className: "relative w-full max-w-4xl bg-white dark:bg-[#141414] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] border border-gray-100 dark:border-[#333]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between bg-white dark:bg-[#141414]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-lg flex items-center justify-center font-black text-lg",
                                                    children: selectedSubmission.student.name?.charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight",
                                                                    children: selectedSubmission.student.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${selectedSubmission.status === 'ACCEPTED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500'}`,
                                                                    children: selectedSubmission.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5",
                                                            children: [
                                                                selectedSubmission.problemTitle,
                                                                " • ",
                                                                new Date(selectedSubmission.createdAt).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 327,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedSubmission(null),
                                            className: "h-8 px-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-gray-200 transition-colors uppercase text-[9px] font-black tracking-widest rounded-lg",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 347,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                    lineNumber: 326,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-auto bg-gray-50 dark:bg-[#0c0c0c] p-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            className: "font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-[#141414] p-6 rounded-xl border border-gray-100 dark:border-[#262626]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                children: selectedSubmission.code
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/LiveTracking.tsx",
                                                lineNumber: 359,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                                            lineNumber: 358,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/LiveTracking.tsx",
                                        lineNumber: 357,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                                    lineNumber: 356,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/LiveTracking.tsx",
                            lineNumber: 319,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/LiveTracking.tsx",
                    lineNumber: 311,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/classroom/LiveTracking.tsx",
                lineNumber: 309,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/LiveTracking.tsx",
        lineNumber: 98,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/actions/data:3ce15c [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe":"createAssignment"},"actions/assignment.ts",""] */ __turbopack_context__.s([
    "createAssignment",
    ()=>createAssignment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var createAssignment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("604eabe0422d89d8eae28e459c0dae2ed6d7bab8fe", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createAssignment"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXNzaWdubWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVLZXksIGNhY2hlZEZldGNoLCBDQUNIRV9DT05GSUcgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuLyoqXG4gKiBHZXQgYWxsIGFzc2lnbm1lbnRzIGZvciBhIHNwZWNpZmljIGNsYXNzcm9vbSAoQ0FDSEVEIHdpdGggcGFnaW5hdGlvbilcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUFzc2lnbm1lbnRzKFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gMjBcbikge1xuICAgIC8vIEZpbHRlciBvdXQgYXNzaWdubWVudHMgb2xkZXIgdGhhbiAzIHdlZWtzXG4gICAgY29uc3QgdGhyZWVXZWVrc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgdGhyZWVXZWVrc0Fnby5zZXREYXRlKHRocmVlV2Vla3NBZ28uZ2V0RGF0ZSgpIC0gMjEpO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaEFzc2lnbm1lbnRzID0gdW5zdGFibGVfY2FjaGUoXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFthc3NpZ25tZW50cywgdG90YWxdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7IGd0ZTogdGhyZWVXZWVrc0FnbyB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50cywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tYXNzaWdubWVudHMtJHtjbGFzc3Jvb21JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2Bhc3NpZ25tZW50cy1jbGFzc3Jvb20tJHtjbGFzc3Jvb21JZH1gLCAnYXNzaWdubWVudHMtYWxsJ10sIHJldmFsaWRhdGU6IDYwIH1cbiAgICApO1xuXG4gICAgY29uc3QgeyBhc3NpZ25tZW50cywgdG90YWwgfSA9IGF3YWl0IGZldGNoQXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IGFsbCBhc3NpZ25tZW50cyBmb3IgYSBzcGVjaWZpYyBjbGFzc3Jvb20gKFVOQ0FDSEVEKVxuICogVXNlIHRoaXMgZm9yIHJlZmV0Y2hpbmcgYWZ0ZXIgbXV0YXRpb25zIHRvIGdldCBmcmVzaCBkYXRhXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoQ2xhc3Nyb29tQXNzaWdubWVudHMoY2xhc3Nyb29tSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRocmVlV2Vla3NBZ28gPSBuZXcgRGF0ZSgpO1xuICAgIHRocmVlV2Vla3NBZ28uc2V0RGF0ZSh0aHJlZVdlZWtzQWdvLmdldERhdGUoKSAtIDIxKTtcblxuICAgIHJldHVybiBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBhc3NpZ25tZW50IGZvciBhIGNsYXNzcm9vbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXNzaWdubWVudChcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICAgIGR1ZURhdGU/OiBEYXRlO1xuICAgICAgICBwcm9ibGVtSWRzOiBzdHJpbmdbXTtcbiAgICB9XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBWZXJpZnkgdGVhY2hlciBvd25zIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY2xhc3Nyb29tIHx8IGNsYXNzcm9vbS50ZWFjaGVySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gY2xhc3Nyb29tXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGRhdGEuZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGRhdGEucHJvYmxlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXZhbGlkYXRlIGNsYXNzcm9vbS1zcGVjaWZpYyBhbmQgZ2xvYmFsIGFzc2lnbm1lbnQgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGFzc2lnbm1lbnRzLWNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKCdhc3NpZ25tZW50cy1hbGwnLCBcIm1heFwiKTsgLy8gSW52YWxpZGF0ZSBzdHVkZW50IGFzc2lnbm1lbnRzIGNhY2hlXG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYXNzaWdubWVudElkOiBhc3NpZ25tZW50LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNyZWF0ZSBhc3NpZ25tZW50IGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGFzc2lnbm1lbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlscyBvZiBhIHNwZWNpZmljIGFzc2lnbm1lbnQsIGluY2x1ZGluZyBwcm9ibGVtcyAoQ0FDSEVEKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmZXRjaERldGFpbHMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBvcmRlcjogXCJhc2NcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtgYXNzaWdubWVudC1kZXRhaWxzLSR7YXNzaWdubWVudElkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gXSwgcmV2YWxpZGF0ZTogMzYwMCB9IC8vIENhY2hlIGZvciAxIGhvdXJcbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoRGV0YWlscygpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgYXNzaWdubWVudHMgZm9yIHRoZSBjdXJyZW50IHN0dWRlbnQgYWNyb3NzIGFsbCBlbnJvbGxlZCBjbGFzc3Jvb21zIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3R1ZGVudEFzc2lnbm1lbnRzKHBhZ2U6IG51bWJlciA9IDEsIGxpbWl0OiBudW1iZXIgPSAyMCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IGFzc2lnbm1lbnRzOiBbXSwgcGFnaW5hdGlvbjogbnVsbCB9O1xuXG4gICAgLy8gRmlsdGVyIG91dCBhc3NpZ25tZW50cyBvbGRlciB0aGFuIDMgd2Vla3NcbiAgICBjb25zdCB0aHJlZVdlZWtzQWdvID0gbmV3IERhdGUoKTtcbiAgICB0aHJlZVdlZWtzQWdvLnNldERhdGUodGhyZWVXZWVrc0Fnby5nZXREYXRlKCkgLSAyMSk7XG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaFN0dWRlbnRBc3NpZ25tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJzdCBnZXQgZW5yb2xsZWQgY2xhc3Nyb29tc1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5yb2xsZWRDbGFzc3Jvb21zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdXNlciB8fCB1c2VyLmVucm9sbGVkQ2xhc3Nyb29tcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50czogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzcm9vbUlkcyA9IHVzZXIuZW5yb2xsZWRDbGFzc3Jvb21zLm1hcChjID0+IGMuaWQpO1xuXG4gICAgICAgICAgICAvLyBGZXRjaCBhc3NpZ25tZW50cyBmb3IgdGhlc2UgY2xhc3Nyb29tcyB3aXRoIGNvdW50XG4gICAgICAgICAgICBjb25zdCBbYXNzaWdubWVudHMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgZHVlRGF0ZTogXCJhc2NcIiB9LCAvLyBEdWUgc29vbmVzdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgYXNzaWdubWVudHMsIHRvdGFsIH07XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1hc3NpZ25tZW50cy0ke3VzZXJJZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BzdHVkZW50LWFzc2lnbm1lbnRzLSR7dXNlcklkfWAsICdhc3NpZ25tZW50cy1hbGwnXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICBjb25zdCB7IGFzc2lnbm1lbnRzLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hTdHVkZW50QXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB0b3RhbCA+IDAgPyB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfSA6IG51bGxcbiAgICB9O1xufVxuXG4vKipcbiAqIENoZWNrIGNvbXBsZXRpb24gc3RhdHVzIG9mIHByb2JsZW1zIGluIGFuIGFzc2lnbm1lbnQgZm9yIGEgc3BlY2lmaWMgdXNlciAoQ0FDSEVEIHNob3J0LXRlcm0pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBc3NpZ25tZW50UHJvZ3Jlc3MoYXNzaWdubWVudElkOiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXRVc2VySWQgPSB1c2VySWQgfHwgc2Vzc2lvbj8udXNlcj8uaWQ7XG4gICAgaWYgKCF0YXJnZXRVc2VySWQpIHJldHVybiBudWxsO1xuXG4gICAgLy8gR2V0IGFzc2lnbm1lbnQgcHJvYmxlbXMgKGNhY2hlZClcbiAgICBjb25zdCBhc3NpZ25tZW50ID0gYXdhaXQgZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkKTtcbiAgICBpZiAoIWFzc2lnbm1lbnQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcHJvYmxlbUlkcyA9IGFzc2lnbm1lbnQucHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtSWQpO1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBwcm9ncmVzcyAoc2hvcnQgVFRMIHNpbmNlIHN1Ym1pc3Npb25zIHVwZGF0ZSBmcmVxdWVudGx5KVxuICAgIGNvbnN0IHByb2dyZXNzQ2FjaGVLZXkgPSBjYWNoZUtleShcImFzc2lnbm1lbnQtcHJvZ3Jlc3NcIiwgYXNzaWdubWVudElkLCB0YXJnZXRVc2VySWQpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBhd2FpdCBjYWNoZWRGZXRjaChcbiAgICAgICAgcHJvZ3Jlc3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRmV0Y2ggc3VjY2Vzc2Z1bCBzdWJtaXNzaW9ucyBmb3IgdGhlc2UgcHJvYmxlbXMgYnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0OiBbXCJwcm9ibGVtSWRcIl1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldChzdWJtaXNzaW9ucy5tYXAocyA9PiBzLnByb2JsZW1JZCkpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc01hcDogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvYmxlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NvbHZlZCA9IHNvbHZlZFByb2JsZW1JZHMuaGFzKHAucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFtwLnByb2JsZW1JZF0gPSBpc1NvbHZlZDtcbiAgICAgICAgICAgICAgICBpZiAoaXNTb2x2ZWQpIGNvbXBsZXRlZENvdW50Kys7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3RhbDogYXNzaWdubWVudC5wcm9ibGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBjb21wbGV0ZWRDb3VudCxcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgQ0FDSEVfQ09ORklHLlNIT1JULnR0bCAvLyAzMCBzZWNvbmRzIGNhY2hlXG4gICAgKTtcblxuICAgIHJldHVybiBwcm9ncmVzcztcbn1cblxuLyoqXG4gKiBUZWFjaGVyIEFuYWx5dGljczogR2V0IHByb2dyZXNzIG9mIGFsbCBzdHVkZW50cyBpbiBhIGNsYXNzcm9vbSBmb3IgYSBzcGVjaWZpYyBhc3NpZ25tZW50IChDQUNIRUQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUZWFjaGVyQXNzaWdubWVudEFuYWx5dGljcyhcbiAgICBhc3NpZ25tZW50SWQ6IHN0cmluZyxcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgbGltaXQ6IG51bWJlciA9IDUwXG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCBhbmFseXRpY3NDYWNoZUtleSA9IGNhY2hlS2V5KFwiYXNzaWdubWVudC1hbmFseXRpY3NcIiwgYXNzaWdubWVudElkLCBjbGFzc3Jvb21JZCwgU3RyaW5nKHBhZ2UpKTtcblxuICAgIGNvbnN0IGFuYWx5dGljcyA9IGF3YWl0IGNhY2hlZEZldGNoKFxuICAgICAgICBhbmFseXRpY3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyYWxsZWwgZmV0Y2ggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbSwgYXNzaWdubWVudCwgdG90YWxTdHVkZW50c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogYXNzaWdubWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEudXNlci5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnJvbGxlZENsYXNzcm9vbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGlmICghY2xhc3Nyb29tIHx8ICFhc3NpZ25tZW50KSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudElkcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAocyA9PiBzLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZHMgPSBhc3NpZ25tZW50LnByb2JsZW1zLm1hcChwID0+IHAucHJvYmxlbUlkKTtcblxuICAgICAgICAgICAgLy8gR2V0IGFsbCBhY2NlcHRlZCBzdWJtaXNzaW9ucyBpbiBvbmUgcXVlcnlcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogeyBpbjogc3R1ZGVudElkcyB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBCdWlsZCBzdWJtaXNzaW9uIGluZGV4IGZvciBPKDEpIGxvb2t1cFxuICAgICAgICAgICAgY29uc3Qgc3VibWlzc2lvbkluZGV4ID0gbmV3IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PigpO1xuICAgICAgICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Ym1pc3Npb25JbmRleC5oYXMocy51c2VySWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5zZXQocy51c2VySWQsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5nZXQocy51c2VySWQpIS5hZGQocy5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIGFuYWx5dGljc1xuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudEFuYWx5dGljcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdmVkU2V0ID0gc3VibWlzc2lvbkluZGV4LmdldChzdHVkZW50LmlkKSB8fCBuZXcgU2V0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRDb3VudDogc29sdmVkU2V0LnNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ6IHByb2JsZW1JZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uUGVyY2VudGFnZTogcHJvYmxlbUlkcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChzb2x2ZWRTZXQuc2l6ZSAvIHByb2JsZW1JZHMubGVuZ3RoKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBoYXNDb21wbGV0ZWRBbGw6IHNvbHZlZFNldC5zaXplID09PSBwcm9ibGVtSWRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3M6IHN0dWRlbnRBbmFseXRpY3MsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWxTdHVkZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIENBQ0hFX0NPTkZJRy5NRURJVU0udHRsIC8vIDIgbWludXRlcyBjYWNoZVxuICAgICk7XG5cbiAgICByZXR1cm4gYW5hbHl0aWNzO1xufVxuXG4vKipcbiAqIERlbGV0ZSBhbiBhc3NpZ25tZW50XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBc3NpZ25tZW50KGFzc2lnbm1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJURUFDSEVSXCIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGFzc2lnbm1lbnRJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlLCBpZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFzc2lnbm1lbnQgfHwgYXNzaWdubWVudC5jbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIGFzc2lnbm1lbnQgcHJvYmxlbXMgZmlyc3QsIHRoZW4gYXNzaWdubWVudFxuICAgICAgICBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKFtcbiAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50UHJvYmxlbS5kZWxldGVNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudHMtY2xhc3Nyb29tLSR7YXNzaWdubWVudC5jbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoJ2Fzc2lnbm1lbnRzLWFsbCcsIFwibWF4XCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVsZXRlIGFzc2lnbm1lbnQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgYXNzaWdubWVudFwiIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIrUkEwRnNCIn0=
}),
"[project]/actions/data:9441a3 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"f01f5ef9ed6223b56ddc1153abce0acfbc57475009":"searchProblems"},"actions/problems.ts",""] */ __turbopack_context__.s([
    "searchProblems",
    ()=>searchProblems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var searchProblems = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("f01f5ef9ed6223b56ddc1153abce0acfbc57475009", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "searchProblems"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvYmxlbXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFByb2JsZW1TZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy9wcm9ibGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IERpZmZpY3VsdHksIFByb2JsZW1UeXBlLCBQcm9ibGVtRG9tYWluIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgdXBkYXRlVGFnLCBjYWNoZVRhZywgY2FjaGVMaWZlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcblxuLy8gR0VUVElORyBQVUJMSUMgUFJPQkxFTVNcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDEwLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCIsXG4gICAgZGlmZmljdWx0eT86IERpZmZpY3VsdHksXG4gICAgdGFncz86IHN0cmluZ1tdLFxuICAgIGN1cnNvcj86IHN0cmluZ1xuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gICAgY29uc3QgdGFnS2V5ID0gYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9JHtkaWZmaWN1bHR5ID8gYC0ke2RpZmZpY3VsdHl9YCA6ICcnfSR7dGFncyAmJiB0YWdzLmxlbmd0aCA+IDAgPyBgLSR7dGFncy5qb2luKCctJyl9YCA6ICcnfSR7Y3Vyc29yID8gYC1jdXJzb3ItJHtjdXJzb3J9YCA6IGAtcGFnZS0ke3BhZ2V9YH0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1saXN0JywgYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9YCk7XG5cbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJvYmxlbXMocGFnZSwgcGFnZVNpemUsIHR5cGUsIGRvbWFpbiwgdXNlcklkLCBkaWZmaWN1bHR5LCB0YWdzIHx8IFtdLCBjdXJzb3IpO1xufVxuXG4vLyBHRVRUSU5HIEFETUlOIFBST0JMRU1TXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZG1pblByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDUwLFxuICAgIGRvbWFpbj86IFByb2JsZW1Eb21haW4sXG4gICAgZXhjbHVkZURpZmZpY3VsdHk/OiBEaWZmaWN1bHR5LFxuICAgIHR5cGU/OiBQcm9ibGVtVHlwZVxuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZ0tleSA9IGBhZG1pbi1wcm9ibGVtcy0ke2RvbWFpbiB8fCAnYWxsJ30ke2V4Y2x1ZGVEaWZmaWN1bHR5ID8gYC1leGNsdWRlLSR7ZXhjbHVkZURpZmZpY3VsdHl9YCA6ICcnfSR7dHlwZSA/IGAtdHlwZS0ke3R5cGV9YCA6ICcnfS1wYWdlLSR7cGFnZX1gO1xuICAgIGNhY2hlVGFnKHRhZ0tleSwgJ2FkbWluLXByb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRBZG1pblByb2JsZW1zKHBhZ2UsIHBhZ2VTaXplLCBkb21haW4sIGV4Y2x1ZGVEaWZmaWN1bHR5LCB0eXBlKTtcbn1cblxuLy8gU0VBUkNISU5HIEZPUiBQUk9CTEVNU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoUHJvYmxlbXMoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCJcbikge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7IC8vIE11c3QgYmUgYXQgdG9wIC0gYWxsb3dzIGhlYWRlcnMoKSBpbnNpZGVcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7IC8vIDUgbWludXRlcyBmb3Igc2VhcmNoIHJlc3VsdHNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbj8udXNlcj8uaWQ7XG5cbiAgICBjb25zdCB0YWdLZXkgPSBgc2VhcmNoLSR7ZG9tYWlufS0ke3R5cGV9LSR7dGVybS50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDIwKX0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1zZWFyY2gnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5zZWFyY2hQcm9ibGVtcyh0ZXJtLCB0eXBlLCBkb21haW4sIHVzZXJJZCk7XG59XG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIFNMVUcgQ0FDSEVEXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9ibGVtKHNsdWc6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLSR7c2x1Z31gLCAncHJvYmxlbXMtbGlzdCcpO1xuXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFByb2JsZW0oc2x1Zyk7XG59XG5cblxuLy8gQ1JFQVRJTkcgQSBQUk9CTEVNIC0tPiBBRE1JTiBPTkxZXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQcm9ibGVtKGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGlmZmljdWx0eTogRGlmZmljdWx0eTtcbiAgICBzbHVnOiBzdHJpbmc7XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIGhpZGRlblF1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcbiAgICBkb21haW4/OiBQcm9ibGVtRG9tYWluO1xuICAgIHRlc3RDYXNlczogeyBpbnB1dDogc3RyaW5nOyBvdXRwdXQ6IHN0cmluZzsgaGlkZGVuPzogYm9vbGVhbiB9W107XG4gICAgdGFncz86IHN0cmluZ1tdO1xuICAgIHVzZUZ1bmN0aW9uVGVtcGxhdGU/OiBib29sZWFuO1xuICAgIGZ1bmN0aW9uVGVtcGxhdGVzPzogeyBsYW5ndWFnZUlkOiBudW1iZXI7IGZ1bmN0aW9uVGVtcGxhdGU6IHN0cmluZzsgZHJpdmVyQ29kZTogc3RyaW5nIH1bXTtcbiAgICBzb2x1dGlvbj86IHN0cmluZyB8IG51bGw7XG59KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5jcmVhdGVQcm9ibGVtKGRhdGEpO1xuXG4gICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL3NxbFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vcHJvYmxlbXNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2RzYS9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vc3FsL3Byb2JsZW1zXCIpO1xuXG4gICAgICAgIHVwZGF0ZVRhZygnYWRtaW4tcHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoJ3Byb2JsZW1zLWxpc3QnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1TUUwtUFJBQ1RJQ0UnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1EU0EtUFJBQ1RJQ0UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIElEXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUJ5SWQoaWQ6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLWlkLSR7aWR9YCwgJ3Byb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRQcm9ibGVtQnlJZChpZCk7XG59XG5cbi8vIE5BVklHQVRJT04gQUNUSU9OU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dFByb2JsZW0oY3VycmVudENyZWF0ZWRBdDogRGF0ZSwgZG9tYWluOiBQcm9ibGVtRG9tYWluLCB0eXBlOiBQcm9ibGVtVHlwZSkge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pO1xuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXROZXh0UHJvYmxlbShjdXJyZW50Q3JlYXRlZEF0LCBkb21haW4sIHR5cGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQ6IERhdGUsIGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiO1xuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiAzMDAsIHJldmFsaWRhdGU6IDMwMCB9KTtcbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQsIGRvbWFpbiwgdHlwZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSYW5kb21Qcm9ibGVtKGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICAvLyBObyBjYWNoZSBmb3IgcmFuZG9tXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFJhbmRvbVByb2JsZW0oZG9tYWluLCB0eXBlKTtcbn1cblxuXG4vLyBVUERBVElORyBBIFBST0JMRU0gLS0+IEFETUlOIE9OTFlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9ibGVtKGlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS51cGRhdGVQcm9ibGVtKGlkLCBkYXRhKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW1zLSR7cmVzdWx0LmRhdGE/LmRvbWFpbiB8fCAnRFNBJ30tJHtyZXN1bHQuZGF0YT8udHlwZSB8fCAnUFJBQ1RJQ0UnfWApO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW0tJHtyZXN1bHQuZGF0YT8uc2x1Z31gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIERFTEVUSU5HIEEgUFJPQkxFTSAtLT4gQURNSU4gT05MWVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2JsZW0oaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5kZWxldGVQcm9ibGVtKGlkKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJSQStEc0IifQ==
}),
"[project]/components/classroom/assignments/CreateAssignmentModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateAssignmentModal",
    ()=>CreateAssignmentModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3ce15c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:3ce15c [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9441a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:9441a3 [app-ssr] (ecmascript) <text/javascript>");
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
function CreateAssignmentModal({ isOpen, onClose, classroomId, onSuccess }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [dueDate, setDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Problem Selection
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedProblems, setSelectedProblems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleSearch = async (term)=>{
        setSearchQuery(term);
        if (term.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9441a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchProblems"])(term);
            const problems = results.problems || [];
            // Filter out already selected
            const selectedIds = new Set(selectedProblems.map((p)=>p.id));
            setSearchResults(problems.filter((p)=>!selectedIds.has(p.id)));
        } catch (error) {
            console.error("Search failed", error);
        } finally{
            setIsSearching(false);
        }
    };
    const addProblem = (problem)=>{
        if (selectedProblems.some((p)=>p.id === problem.id)) return;
        setSelectedProblems([
            ...selectedProblems,
            problem
        ]);
        setSearchResults(searchResults.filter((p)=>p.id !== problem.id));
        setSearchQuery("");
    };
    const removeProblem = (problemId)=>{
        setSelectedProblems(selectedProblems.filter((p)=>p.id !== problemId));
    };
    const handleSubmit = async ()=>{
        if (!title.trim()) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Title is required");
        if (selectedProblems.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Select at least one problem");
        setIsSubmitting(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3ce15c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createAssignment"])(classroomId, {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                problemIds: selectedProblems.map((p)=>p.id)
            });
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Assignment created!");
                // Reset form
                setTitle("");
                setDescription("");
                setDueDate("");
                setSelectedProblems([]);
                router.refresh(); // Force refresh to update cache
                onSuccess();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to create assignment");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: (open)=>!open && onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: "Create Assignment"
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                        lineNumber: 102,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "Assignment Title"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 109,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: title,
                                            onChange: (e)=>setTitle(e.target.value),
                                            placeholder: "e.g. Week 1: Array Basics"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "Description (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 118,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: description,
                                            onChange: (e)=>setDescription(e.target.value),
                                            placeholder: "Instructions for students...",
                                            className: "flex min-h-[80px] w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 119,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "Due Date & Time (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 128,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "datetime-local",
                                                    value: dueDate,
                                                    onChange: (e)=>setDueDate(e.target.value),
                                                    className: "flex h-10 w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] pl-10 pr-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 129,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                            lineNumber: 107,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                    children: [
                                        "Problems (",
                                        selectedProblems.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-3 top-3 h-4 w-4 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 146,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: searchQuery,
                                            onChange: (e)=>handleSearch(e.target.value),
                                            placeholder: "Search for problems to add...",
                                            className: "pl-9"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 147,
                                            columnNumber: 29
                                        }, this),
                                        isSearching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-3 top-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-4 w-4 animate-spin text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                lineNumber: 155,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 154,
                                            columnNumber: 33
                                        }, this),
                                        searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute z-10 w-full mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-lg shadow-lg max-h-60 overflow-y-auto",
                                            children: searchResults.map((problem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addProblem(problem),
                                                    className: "w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#262626] flex items-center justify-between group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-medium text-gray-900 dark:text-gray-100",
                                                                    children: problem.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: [
                                                                        problem.difficulty,
                                                                        " • ",
                                                                        problem.domain
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "w-4 h-4 text-gray-400 group-hover:text-orange-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, problem.id, true, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 145,
                                    columnNumber: 25
                                }, this),
                                selectedProblems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 max-h-60 overflow-y-auto pr-2",
                                    children: selectedProblems.map((problem, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1f1f1f] rounded-lg border border-gray-100 dark:border-[#333] group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-bold text-gray-400 w-6",
                                                    children: [
                                                        "#",
                                                        index + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-bold text-gray-900 dark:text-gray-100",
                                                            children: problem.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mt-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${problem.difficulty === "EASY" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : problem.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`,
                                                                    children: problem.difficulty
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-gray-500",
                                                                    children: problem.domain
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                                    lineNumber: 198,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeProblem(problem.id),
                                                    className: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, problem.id, true, {
                                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                            lineNumber: 183,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 181,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl text-gray-500 text-sm",
                                    children: "No problems selected yet"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                            lineNumber: 142,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                    lineNumber: 105,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            disabled: isSubmitting,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                            lineNumber: 219,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            disabled: isSubmitting || selectedProblems.length === 0,
                            className: "bg-orange-600 hover:bg-orange-700 text-white",
                            children: [
                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                                    lineNumber: 221,
                                    columnNumber: 42
                                }, this),
                                "Create Assignment"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                            lineNumber: 220,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
            lineNumber: 100,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/classroom/assignments/CreateAssignmentModal.tsx",
        lineNumber: 99,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:e77ea9 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70b22c8ab63d11fc3b25b267ea271300db7487dcaa":"getClassroomAssignments"},"actions/assignment.ts",""] */ __turbopack_context__.s([
    "getClassroomAssignments",
    ()=>getClassroomAssignments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getClassroomAssignments = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("70b22c8ab63d11fc3b25b267ea271300db7487dcaa", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getClassroomAssignments"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXNzaWdubWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVLZXksIGNhY2hlZEZldGNoLCBDQUNIRV9DT05GSUcgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuLyoqXG4gKiBHZXQgYWxsIGFzc2lnbm1lbnRzIGZvciBhIHNwZWNpZmljIGNsYXNzcm9vbSAoQ0FDSEVEIHdpdGggcGFnaW5hdGlvbilcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUFzc2lnbm1lbnRzKFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gMjBcbikge1xuICAgIC8vIEZpbHRlciBvdXQgYXNzaWdubWVudHMgb2xkZXIgdGhhbiAzIHdlZWtzXG4gICAgY29uc3QgdGhyZWVXZWVrc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgdGhyZWVXZWVrc0Fnby5zZXREYXRlKHRocmVlV2Vla3NBZ28uZ2V0RGF0ZSgpIC0gMjEpO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaEFzc2lnbm1lbnRzID0gdW5zdGFibGVfY2FjaGUoXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFthc3NpZ25tZW50cywgdG90YWxdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7IGd0ZTogdGhyZWVXZWVrc0FnbyB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50cywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tYXNzaWdubWVudHMtJHtjbGFzc3Jvb21JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2Bhc3NpZ25tZW50cy1jbGFzc3Jvb20tJHtjbGFzc3Jvb21JZH1gLCAnYXNzaWdubWVudHMtYWxsJ10sIHJldmFsaWRhdGU6IDYwIH1cbiAgICApO1xuXG4gICAgY29uc3QgeyBhc3NpZ25tZW50cywgdG90YWwgfSA9IGF3YWl0IGZldGNoQXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IGFsbCBhc3NpZ25tZW50cyBmb3IgYSBzcGVjaWZpYyBjbGFzc3Jvb20gKFVOQ0FDSEVEKVxuICogVXNlIHRoaXMgZm9yIHJlZmV0Y2hpbmcgYWZ0ZXIgbXV0YXRpb25zIHRvIGdldCBmcmVzaCBkYXRhXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoQ2xhc3Nyb29tQXNzaWdubWVudHMoY2xhc3Nyb29tSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRocmVlV2Vla3NBZ28gPSBuZXcgRGF0ZSgpO1xuICAgIHRocmVlV2Vla3NBZ28uc2V0RGF0ZSh0aHJlZVdlZWtzQWdvLmdldERhdGUoKSAtIDIxKTtcblxuICAgIHJldHVybiBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBhc3NpZ25tZW50IGZvciBhIGNsYXNzcm9vbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXNzaWdubWVudChcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICAgIGR1ZURhdGU/OiBEYXRlO1xuICAgICAgICBwcm9ibGVtSWRzOiBzdHJpbmdbXTtcbiAgICB9XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBWZXJpZnkgdGVhY2hlciBvd25zIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY2xhc3Nyb29tIHx8IGNsYXNzcm9vbS50ZWFjaGVySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gY2xhc3Nyb29tXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGRhdGEuZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGRhdGEucHJvYmxlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXZhbGlkYXRlIGNsYXNzcm9vbS1zcGVjaWZpYyBhbmQgZ2xvYmFsIGFzc2lnbm1lbnQgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGFzc2lnbm1lbnRzLWNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKCdhc3NpZ25tZW50cy1hbGwnLCBcIm1heFwiKTsgLy8gSW52YWxpZGF0ZSBzdHVkZW50IGFzc2lnbm1lbnRzIGNhY2hlXG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYXNzaWdubWVudElkOiBhc3NpZ25tZW50LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNyZWF0ZSBhc3NpZ25tZW50IGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGFzc2lnbm1lbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlscyBvZiBhIHNwZWNpZmljIGFzc2lnbm1lbnQsIGluY2x1ZGluZyBwcm9ibGVtcyAoQ0FDSEVEKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmZXRjaERldGFpbHMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBvcmRlcjogXCJhc2NcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtgYXNzaWdubWVudC1kZXRhaWxzLSR7YXNzaWdubWVudElkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gXSwgcmV2YWxpZGF0ZTogMzYwMCB9IC8vIENhY2hlIGZvciAxIGhvdXJcbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoRGV0YWlscygpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgYXNzaWdubWVudHMgZm9yIHRoZSBjdXJyZW50IHN0dWRlbnQgYWNyb3NzIGFsbCBlbnJvbGxlZCBjbGFzc3Jvb21zIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3R1ZGVudEFzc2lnbm1lbnRzKHBhZ2U6IG51bWJlciA9IDEsIGxpbWl0OiBudW1iZXIgPSAyMCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IGFzc2lnbm1lbnRzOiBbXSwgcGFnaW5hdGlvbjogbnVsbCB9O1xuXG4gICAgLy8gRmlsdGVyIG91dCBhc3NpZ25tZW50cyBvbGRlciB0aGFuIDMgd2Vla3NcbiAgICBjb25zdCB0aHJlZVdlZWtzQWdvID0gbmV3IERhdGUoKTtcbiAgICB0aHJlZVdlZWtzQWdvLnNldERhdGUodGhyZWVXZWVrc0Fnby5nZXREYXRlKCkgLSAyMSk7XG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaFN0dWRlbnRBc3NpZ25tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJzdCBnZXQgZW5yb2xsZWQgY2xhc3Nyb29tc1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5yb2xsZWRDbGFzc3Jvb21zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdXNlciB8fCB1c2VyLmVucm9sbGVkQ2xhc3Nyb29tcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50czogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzcm9vbUlkcyA9IHVzZXIuZW5yb2xsZWRDbGFzc3Jvb21zLm1hcChjID0+IGMuaWQpO1xuXG4gICAgICAgICAgICAvLyBGZXRjaCBhc3NpZ25tZW50cyBmb3IgdGhlc2UgY2xhc3Nyb29tcyB3aXRoIGNvdW50XG4gICAgICAgICAgICBjb25zdCBbYXNzaWdubWVudHMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgZHVlRGF0ZTogXCJhc2NcIiB9LCAvLyBEdWUgc29vbmVzdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgYXNzaWdubWVudHMsIHRvdGFsIH07XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1hc3NpZ25tZW50cy0ke3VzZXJJZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BzdHVkZW50LWFzc2lnbm1lbnRzLSR7dXNlcklkfWAsICdhc3NpZ25tZW50cy1hbGwnXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICBjb25zdCB7IGFzc2lnbm1lbnRzLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hTdHVkZW50QXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB0b3RhbCA+IDAgPyB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfSA6IG51bGxcbiAgICB9O1xufVxuXG4vKipcbiAqIENoZWNrIGNvbXBsZXRpb24gc3RhdHVzIG9mIHByb2JsZW1zIGluIGFuIGFzc2lnbm1lbnQgZm9yIGEgc3BlY2lmaWMgdXNlciAoQ0FDSEVEIHNob3J0LXRlcm0pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBc3NpZ25tZW50UHJvZ3Jlc3MoYXNzaWdubWVudElkOiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXRVc2VySWQgPSB1c2VySWQgfHwgc2Vzc2lvbj8udXNlcj8uaWQ7XG4gICAgaWYgKCF0YXJnZXRVc2VySWQpIHJldHVybiBudWxsO1xuXG4gICAgLy8gR2V0IGFzc2lnbm1lbnQgcHJvYmxlbXMgKGNhY2hlZClcbiAgICBjb25zdCBhc3NpZ25tZW50ID0gYXdhaXQgZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkKTtcbiAgICBpZiAoIWFzc2lnbm1lbnQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcHJvYmxlbUlkcyA9IGFzc2lnbm1lbnQucHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtSWQpO1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBwcm9ncmVzcyAoc2hvcnQgVFRMIHNpbmNlIHN1Ym1pc3Npb25zIHVwZGF0ZSBmcmVxdWVudGx5KVxuICAgIGNvbnN0IHByb2dyZXNzQ2FjaGVLZXkgPSBjYWNoZUtleShcImFzc2lnbm1lbnQtcHJvZ3Jlc3NcIiwgYXNzaWdubWVudElkLCB0YXJnZXRVc2VySWQpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBhd2FpdCBjYWNoZWRGZXRjaChcbiAgICAgICAgcHJvZ3Jlc3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRmV0Y2ggc3VjY2Vzc2Z1bCBzdWJtaXNzaW9ucyBmb3IgdGhlc2UgcHJvYmxlbXMgYnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0OiBbXCJwcm9ibGVtSWRcIl1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldChzdWJtaXNzaW9ucy5tYXAocyA9PiBzLnByb2JsZW1JZCkpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc01hcDogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvYmxlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NvbHZlZCA9IHNvbHZlZFByb2JsZW1JZHMuaGFzKHAucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFtwLnByb2JsZW1JZF0gPSBpc1NvbHZlZDtcbiAgICAgICAgICAgICAgICBpZiAoaXNTb2x2ZWQpIGNvbXBsZXRlZENvdW50Kys7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3RhbDogYXNzaWdubWVudC5wcm9ibGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBjb21wbGV0ZWRDb3VudCxcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgQ0FDSEVfQ09ORklHLlNIT1JULnR0bCAvLyAzMCBzZWNvbmRzIGNhY2hlXG4gICAgKTtcblxuICAgIHJldHVybiBwcm9ncmVzcztcbn1cblxuLyoqXG4gKiBUZWFjaGVyIEFuYWx5dGljczogR2V0IHByb2dyZXNzIG9mIGFsbCBzdHVkZW50cyBpbiBhIGNsYXNzcm9vbSBmb3IgYSBzcGVjaWZpYyBhc3NpZ25tZW50IChDQUNIRUQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUZWFjaGVyQXNzaWdubWVudEFuYWx5dGljcyhcbiAgICBhc3NpZ25tZW50SWQ6IHN0cmluZyxcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgbGltaXQ6IG51bWJlciA9IDUwXG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCBhbmFseXRpY3NDYWNoZUtleSA9IGNhY2hlS2V5KFwiYXNzaWdubWVudC1hbmFseXRpY3NcIiwgYXNzaWdubWVudElkLCBjbGFzc3Jvb21JZCwgU3RyaW5nKHBhZ2UpKTtcblxuICAgIGNvbnN0IGFuYWx5dGljcyA9IGF3YWl0IGNhY2hlZEZldGNoKFxuICAgICAgICBhbmFseXRpY3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyYWxsZWwgZmV0Y2ggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbSwgYXNzaWdubWVudCwgdG90YWxTdHVkZW50c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogYXNzaWdubWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEudXNlci5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnJvbGxlZENsYXNzcm9vbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGlmICghY2xhc3Nyb29tIHx8ICFhc3NpZ25tZW50KSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudElkcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAocyA9PiBzLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZHMgPSBhc3NpZ25tZW50LnByb2JsZW1zLm1hcChwID0+IHAucHJvYmxlbUlkKTtcblxuICAgICAgICAgICAgLy8gR2V0IGFsbCBhY2NlcHRlZCBzdWJtaXNzaW9ucyBpbiBvbmUgcXVlcnlcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogeyBpbjogc3R1ZGVudElkcyB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBCdWlsZCBzdWJtaXNzaW9uIGluZGV4IGZvciBPKDEpIGxvb2t1cFxuICAgICAgICAgICAgY29uc3Qgc3VibWlzc2lvbkluZGV4ID0gbmV3IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PigpO1xuICAgICAgICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Ym1pc3Npb25JbmRleC5oYXMocy51c2VySWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5zZXQocy51c2VySWQsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5nZXQocy51c2VySWQpIS5hZGQocy5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIGFuYWx5dGljc1xuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudEFuYWx5dGljcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdmVkU2V0ID0gc3VibWlzc2lvbkluZGV4LmdldChzdHVkZW50LmlkKSB8fCBuZXcgU2V0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRDb3VudDogc29sdmVkU2V0LnNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ6IHByb2JsZW1JZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uUGVyY2VudGFnZTogcHJvYmxlbUlkcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChzb2x2ZWRTZXQuc2l6ZSAvIHByb2JsZW1JZHMubGVuZ3RoKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBoYXNDb21wbGV0ZWRBbGw6IHNvbHZlZFNldC5zaXplID09PSBwcm9ibGVtSWRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3M6IHN0dWRlbnRBbmFseXRpY3MsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWxTdHVkZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIENBQ0hFX0NPTkZJRy5NRURJVU0udHRsIC8vIDIgbWludXRlcyBjYWNoZVxuICAgICk7XG5cbiAgICByZXR1cm4gYW5hbHl0aWNzO1xufVxuXG4vKipcbiAqIERlbGV0ZSBhbiBhc3NpZ25tZW50XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBc3NpZ25tZW50KGFzc2lnbm1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJURUFDSEVSXCIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGFzc2lnbm1lbnRJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlLCBpZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFzc2lnbm1lbnQgfHwgYXNzaWdubWVudC5jbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIGFzc2lnbm1lbnQgcHJvYmxlbXMgZmlyc3QsIHRoZW4gYXNzaWdubWVudFxuICAgICAgICBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKFtcbiAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50UHJvYmxlbS5kZWxldGVNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudHMtY2xhc3Nyb29tLSR7YXNzaWdubWVudC5jbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoJ2Fzc2lnbm1lbnRzLWFsbCcsIFwibWF4XCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVsZXRlIGFzc2lnbm1lbnQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgYXNzaWdubWVudFwiIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJzU0FXc0IifQ==
}),
"[project]/actions/data:6c2209 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402d498415f6e7ce5e7b14101bd742a174c034fe89":"refreshClassroomAssignments"},"actions/assignment.ts",""] */ __turbopack_context__.s([
    "refreshClassroomAssignments",
    ()=>refreshClassroomAssignments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var refreshClassroomAssignments = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("402d498415f6e7ce5e7b14101bd742a174c034fe89", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "refreshClassroomAssignments"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXNzaWdubWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVLZXksIGNhY2hlZEZldGNoLCBDQUNIRV9DT05GSUcgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuLyoqXG4gKiBHZXQgYWxsIGFzc2lnbm1lbnRzIGZvciBhIHNwZWNpZmljIGNsYXNzcm9vbSAoQ0FDSEVEIHdpdGggcGFnaW5hdGlvbilcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUFzc2lnbm1lbnRzKFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gMjBcbikge1xuICAgIC8vIEZpbHRlciBvdXQgYXNzaWdubWVudHMgb2xkZXIgdGhhbiAzIHdlZWtzXG4gICAgY29uc3QgdGhyZWVXZWVrc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgdGhyZWVXZWVrc0Fnby5zZXREYXRlKHRocmVlV2Vla3NBZ28uZ2V0RGF0ZSgpIC0gMjEpO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaEFzc2lnbm1lbnRzID0gdW5zdGFibGVfY2FjaGUoXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFthc3NpZ25tZW50cywgdG90YWxdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7IGd0ZTogdGhyZWVXZWVrc0FnbyB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50cywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tYXNzaWdubWVudHMtJHtjbGFzc3Jvb21JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2Bhc3NpZ25tZW50cy1jbGFzc3Jvb20tJHtjbGFzc3Jvb21JZH1gLCAnYXNzaWdubWVudHMtYWxsJ10sIHJldmFsaWRhdGU6IDYwIH1cbiAgICApO1xuXG4gICAgY29uc3QgeyBhc3NpZ25tZW50cywgdG90YWwgfSA9IGF3YWl0IGZldGNoQXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IGFsbCBhc3NpZ25tZW50cyBmb3IgYSBzcGVjaWZpYyBjbGFzc3Jvb20gKFVOQ0FDSEVEKVxuICogVXNlIHRoaXMgZm9yIHJlZmV0Y2hpbmcgYWZ0ZXIgbXV0YXRpb25zIHRvIGdldCBmcmVzaCBkYXRhXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoQ2xhc3Nyb29tQXNzaWdubWVudHMoY2xhc3Nyb29tSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRocmVlV2Vla3NBZ28gPSBuZXcgRGF0ZSgpO1xuICAgIHRocmVlV2Vla3NBZ28uc2V0RGF0ZSh0aHJlZVdlZWtzQWdvLmdldERhdGUoKSAtIDIxKTtcblxuICAgIHJldHVybiBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBhc3NpZ25tZW50IGZvciBhIGNsYXNzcm9vbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXNzaWdubWVudChcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICAgIGR1ZURhdGU/OiBEYXRlO1xuICAgICAgICBwcm9ibGVtSWRzOiBzdHJpbmdbXTtcbiAgICB9XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBWZXJpZnkgdGVhY2hlciBvd25zIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY2xhc3Nyb29tIHx8IGNsYXNzcm9vbS50ZWFjaGVySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gY2xhc3Nyb29tXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGRhdGEuZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGRhdGEucHJvYmxlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXZhbGlkYXRlIGNsYXNzcm9vbS1zcGVjaWZpYyBhbmQgZ2xvYmFsIGFzc2lnbm1lbnQgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGFzc2lnbm1lbnRzLWNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKCdhc3NpZ25tZW50cy1hbGwnLCBcIm1heFwiKTsgLy8gSW52YWxpZGF0ZSBzdHVkZW50IGFzc2lnbm1lbnRzIGNhY2hlXG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYXNzaWdubWVudElkOiBhc3NpZ25tZW50LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNyZWF0ZSBhc3NpZ25tZW50IGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGFzc2lnbm1lbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlscyBvZiBhIHNwZWNpZmljIGFzc2lnbm1lbnQsIGluY2x1ZGluZyBwcm9ibGVtcyAoQ0FDSEVEKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmZXRjaERldGFpbHMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBvcmRlcjogXCJhc2NcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtgYXNzaWdubWVudC1kZXRhaWxzLSR7YXNzaWdubWVudElkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gXSwgcmV2YWxpZGF0ZTogMzYwMCB9IC8vIENhY2hlIGZvciAxIGhvdXJcbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoRGV0YWlscygpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgYXNzaWdubWVudHMgZm9yIHRoZSBjdXJyZW50IHN0dWRlbnQgYWNyb3NzIGFsbCBlbnJvbGxlZCBjbGFzc3Jvb21zIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3R1ZGVudEFzc2lnbm1lbnRzKHBhZ2U6IG51bWJlciA9IDEsIGxpbWl0OiBudW1iZXIgPSAyMCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IGFzc2lnbm1lbnRzOiBbXSwgcGFnaW5hdGlvbjogbnVsbCB9O1xuXG4gICAgLy8gRmlsdGVyIG91dCBhc3NpZ25tZW50cyBvbGRlciB0aGFuIDMgd2Vla3NcbiAgICBjb25zdCB0aHJlZVdlZWtzQWdvID0gbmV3IERhdGUoKTtcbiAgICB0aHJlZVdlZWtzQWdvLnNldERhdGUodGhyZWVXZWVrc0Fnby5nZXREYXRlKCkgLSAyMSk7XG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaFN0dWRlbnRBc3NpZ25tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJzdCBnZXQgZW5yb2xsZWQgY2xhc3Nyb29tc1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5yb2xsZWRDbGFzc3Jvb21zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdXNlciB8fCB1c2VyLmVucm9sbGVkQ2xhc3Nyb29tcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50czogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzcm9vbUlkcyA9IHVzZXIuZW5yb2xsZWRDbGFzc3Jvb21zLm1hcChjID0+IGMuaWQpO1xuXG4gICAgICAgICAgICAvLyBGZXRjaCBhc3NpZ25tZW50cyBmb3IgdGhlc2UgY2xhc3Nyb29tcyB3aXRoIGNvdW50XG4gICAgICAgICAgICBjb25zdCBbYXNzaWdubWVudHMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgZHVlRGF0ZTogXCJhc2NcIiB9LCAvLyBEdWUgc29vbmVzdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgYXNzaWdubWVudHMsIHRvdGFsIH07XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1hc3NpZ25tZW50cy0ke3VzZXJJZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BzdHVkZW50LWFzc2lnbm1lbnRzLSR7dXNlcklkfWAsICdhc3NpZ25tZW50cy1hbGwnXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICBjb25zdCB7IGFzc2lnbm1lbnRzLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hTdHVkZW50QXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB0b3RhbCA+IDAgPyB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfSA6IG51bGxcbiAgICB9O1xufVxuXG4vKipcbiAqIENoZWNrIGNvbXBsZXRpb24gc3RhdHVzIG9mIHByb2JsZW1zIGluIGFuIGFzc2lnbm1lbnQgZm9yIGEgc3BlY2lmaWMgdXNlciAoQ0FDSEVEIHNob3J0LXRlcm0pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBc3NpZ25tZW50UHJvZ3Jlc3MoYXNzaWdubWVudElkOiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXRVc2VySWQgPSB1c2VySWQgfHwgc2Vzc2lvbj8udXNlcj8uaWQ7XG4gICAgaWYgKCF0YXJnZXRVc2VySWQpIHJldHVybiBudWxsO1xuXG4gICAgLy8gR2V0IGFzc2lnbm1lbnQgcHJvYmxlbXMgKGNhY2hlZClcbiAgICBjb25zdCBhc3NpZ25tZW50ID0gYXdhaXQgZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkKTtcbiAgICBpZiAoIWFzc2lnbm1lbnQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcHJvYmxlbUlkcyA9IGFzc2lnbm1lbnQucHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtSWQpO1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBwcm9ncmVzcyAoc2hvcnQgVFRMIHNpbmNlIHN1Ym1pc3Npb25zIHVwZGF0ZSBmcmVxdWVudGx5KVxuICAgIGNvbnN0IHByb2dyZXNzQ2FjaGVLZXkgPSBjYWNoZUtleShcImFzc2lnbm1lbnQtcHJvZ3Jlc3NcIiwgYXNzaWdubWVudElkLCB0YXJnZXRVc2VySWQpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBhd2FpdCBjYWNoZWRGZXRjaChcbiAgICAgICAgcHJvZ3Jlc3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRmV0Y2ggc3VjY2Vzc2Z1bCBzdWJtaXNzaW9ucyBmb3IgdGhlc2UgcHJvYmxlbXMgYnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0OiBbXCJwcm9ibGVtSWRcIl1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldChzdWJtaXNzaW9ucy5tYXAocyA9PiBzLnByb2JsZW1JZCkpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc01hcDogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvYmxlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NvbHZlZCA9IHNvbHZlZFByb2JsZW1JZHMuaGFzKHAucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFtwLnByb2JsZW1JZF0gPSBpc1NvbHZlZDtcbiAgICAgICAgICAgICAgICBpZiAoaXNTb2x2ZWQpIGNvbXBsZXRlZENvdW50Kys7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3RhbDogYXNzaWdubWVudC5wcm9ibGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBjb21wbGV0ZWRDb3VudCxcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgQ0FDSEVfQ09ORklHLlNIT1JULnR0bCAvLyAzMCBzZWNvbmRzIGNhY2hlXG4gICAgKTtcblxuICAgIHJldHVybiBwcm9ncmVzcztcbn1cblxuLyoqXG4gKiBUZWFjaGVyIEFuYWx5dGljczogR2V0IHByb2dyZXNzIG9mIGFsbCBzdHVkZW50cyBpbiBhIGNsYXNzcm9vbSBmb3IgYSBzcGVjaWZpYyBhc3NpZ25tZW50IChDQUNIRUQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUZWFjaGVyQXNzaWdubWVudEFuYWx5dGljcyhcbiAgICBhc3NpZ25tZW50SWQ6IHN0cmluZyxcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgbGltaXQ6IG51bWJlciA9IDUwXG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCBhbmFseXRpY3NDYWNoZUtleSA9IGNhY2hlS2V5KFwiYXNzaWdubWVudC1hbmFseXRpY3NcIiwgYXNzaWdubWVudElkLCBjbGFzc3Jvb21JZCwgU3RyaW5nKHBhZ2UpKTtcblxuICAgIGNvbnN0IGFuYWx5dGljcyA9IGF3YWl0IGNhY2hlZEZldGNoKFxuICAgICAgICBhbmFseXRpY3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyYWxsZWwgZmV0Y2ggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbSwgYXNzaWdubWVudCwgdG90YWxTdHVkZW50c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogYXNzaWdubWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEudXNlci5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnJvbGxlZENsYXNzcm9vbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGlmICghY2xhc3Nyb29tIHx8ICFhc3NpZ25tZW50KSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudElkcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAocyA9PiBzLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZHMgPSBhc3NpZ25tZW50LnByb2JsZW1zLm1hcChwID0+IHAucHJvYmxlbUlkKTtcblxuICAgICAgICAgICAgLy8gR2V0IGFsbCBhY2NlcHRlZCBzdWJtaXNzaW9ucyBpbiBvbmUgcXVlcnlcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogeyBpbjogc3R1ZGVudElkcyB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBCdWlsZCBzdWJtaXNzaW9uIGluZGV4IGZvciBPKDEpIGxvb2t1cFxuICAgICAgICAgICAgY29uc3Qgc3VibWlzc2lvbkluZGV4ID0gbmV3IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PigpO1xuICAgICAgICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Ym1pc3Npb25JbmRleC5oYXMocy51c2VySWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5zZXQocy51c2VySWQsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5nZXQocy51c2VySWQpIS5hZGQocy5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIGFuYWx5dGljc1xuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudEFuYWx5dGljcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdmVkU2V0ID0gc3VibWlzc2lvbkluZGV4LmdldChzdHVkZW50LmlkKSB8fCBuZXcgU2V0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRDb3VudDogc29sdmVkU2V0LnNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ6IHByb2JsZW1JZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uUGVyY2VudGFnZTogcHJvYmxlbUlkcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChzb2x2ZWRTZXQuc2l6ZSAvIHByb2JsZW1JZHMubGVuZ3RoKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBoYXNDb21wbGV0ZWRBbGw6IHNvbHZlZFNldC5zaXplID09PSBwcm9ibGVtSWRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3M6IHN0dWRlbnRBbmFseXRpY3MsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWxTdHVkZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIENBQ0hFX0NPTkZJRy5NRURJVU0udHRsIC8vIDIgbWludXRlcyBjYWNoZVxuICAgICk7XG5cbiAgICByZXR1cm4gYW5hbHl0aWNzO1xufVxuXG4vKipcbiAqIERlbGV0ZSBhbiBhc3NpZ25tZW50XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBc3NpZ25tZW50KGFzc2lnbm1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJURUFDSEVSXCIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGFzc2lnbm1lbnRJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlLCBpZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFzc2lnbm1lbnQgfHwgYXNzaWdubWVudC5jbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIGFzc2lnbm1lbnQgcHJvYmxlbXMgZmlyc3QsIHRoZW4gYXNzaWdubWVudFxuICAgICAgICBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKFtcbiAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50UHJvYmxlbS5kZWxldGVNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudHMtY2xhc3Nyb29tLSR7YXNzaWdubWVudC5jbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoJ2Fzc2lnbm1lbnRzLWFsbCcsIFwibWF4XCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVsZXRlIGFzc2lnbm1lbnQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgYXNzaWdubWVudFwiIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIwU0FxRXNCIn0=
}),
"[project]/actions/data:b9c749 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"78073ece8699c8e6f210ef2e8915c5f3d914d87a4a":"getTeacherAssignmentAnalytics"},"actions/assignment.ts",""] */ __turbopack_context__.s([
    "getTeacherAssignmentAnalytics",
    ()=>getTeacherAssignmentAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getTeacherAssignmentAnalytics = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78073ece8699c8e6f210ef2e8915c5f3d914d87a4a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getTeacherAssignmentAnalytics"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXNzaWdubWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVRhZywgdW5zdGFibGVfY2FjaGUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgY2FjaGVLZXksIGNhY2hlZEZldGNoLCBDQUNIRV9DT05GSUcgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuLyoqXG4gKiBHZXQgYWxsIGFzc2lnbm1lbnRzIGZvciBhIHNwZWNpZmljIGNsYXNzcm9vbSAoQ0FDSEVEIHdpdGggcGFnaW5hdGlvbilcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUFzc2lnbm1lbnRzKFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gMjBcbikge1xuICAgIC8vIEZpbHRlciBvdXQgYXNzaWdubWVudHMgb2xkZXIgdGhhbiAzIHdlZWtzXG4gICAgY29uc3QgdGhyZWVXZWVrc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgdGhyZWVXZWVrc0Fnby5zZXREYXRlKHRocmVlV2Vla3NBZ28uZ2V0RGF0ZSgpIC0gMjEpO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaEFzc2lnbm1lbnRzID0gdW5zdGFibGVfY2FjaGUoXG4gICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFthc3NpZ25tZW50cywgdG90YWxdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiB7IGd0ZTogdGhyZWVXZWVrc0FnbyB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50cywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tYXNzaWdubWVudHMtJHtjbGFzc3Jvb21JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2Bhc3NpZ25tZW50cy1jbGFzc3Jvb20tJHtjbGFzc3Jvb21JZH1gLCAnYXNzaWdubWVudHMtYWxsJ10sIHJldmFsaWRhdGU6IDYwIH1cbiAgICApO1xuXG4gICAgY29uc3QgeyBhc3NpZ25tZW50cywgdG90YWwgfSA9IGF3YWl0IGZldGNoQXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IGFsbCBhc3NpZ25tZW50cyBmb3IgYSBzcGVjaWZpYyBjbGFzc3Jvb20gKFVOQ0FDSEVEKVxuICogVXNlIHRoaXMgZm9yIHJlZmV0Y2hpbmcgYWZ0ZXIgbXV0YXRpb25zIHRvIGdldCBmcmVzaCBkYXRhXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoQ2xhc3Nyb29tQXNzaWdubWVudHMoY2xhc3Nyb29tSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRocmVlV2Vla3NBZ28gPSBuZXcgRGF0ZSgpO1xuICAgIHRocmVlV2Vla3NBZ28uc2V0RGF0ZSh0aHJlZVdlZWtzQWdvLmdldERhdGUoKSAtIDIxKTtcblxuICAgIHJldHVybiBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogeyBndGU6IHRocmVlV2Vla3NBZ28gfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgcHJvYmxlbXM6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBhc3NpZ25tZW50IGZvciBhIGNsYXNzcm9vbVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXNzaWdubWVudChcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICAgIGR1ZURhdGU/OiBEYXRlO1xuICAgICAgICBwcm9ibGVtSWRzOiBzdHJpbmdbXTtcbiAgICB9XG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBWZXJpZnkgdGVhY2hlciBvd25zIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY2xhc3Nyb29tIHx8IGNsYXNzcm9vbS50ZWFjaGVySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZCBhY2Nlc3MgdG8gY2xhc3Nyb29tXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGRhdGEuZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZCxcbiAgICAgICAgICAgICAgICBwcm9ibGVtczoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGRhdGEucHJvYmxlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXZhbGlkYXRlIGNsYXNzcm9vbS1zcGVjaWZpYyBhbmQgZ2xvYmFsIGFzc2lnbm1lbnQgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGFzc2lnbm1lbnRzLWNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKCdhc3NpZ25tZW50cy1hbGwnLCBcIm1heFwiKTsgLy8gSW52YWxpZGF0ZSBzdHVkZW50IGFzc2lnbm1lbnRzIGNhY2hlXG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYXNzaWdubWVudElkOiBhc3NpZ25tZW50LmlkIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNyZWF0ZSBhc3NpZ25tZW50IGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGFzc2lnbm1lbnRcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgZGV0YWlscyBvZiBhIHNwZWNpZmljIGFzc2lnbm1lbnQsIGluY2x1ZGluZyBwcm9ibGVtcyAoQ0FDSEVEKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmZXRjaERldGFpbHMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBvcmRlcjogXCJhc2NcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtgYXNzaWdubWVudC1kZXRhaWxzLSR7YXNzaWdubWVudElkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gXSwgcmV2YWxpZGF0ZTogMzYwMCB9IC8vIENhY2hlIGZvciAxIGhvdXJcbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoRGV0YWlscygpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgYXNzaWdubWVudHMgZm9yIHRoZSBjdXJyZW50IHN0dWRlbnQgYWNyb3NzIGFsbCBlbnJvbGxlZCBjbGFzc3Jvb21zIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3R1ZGVudEFzc2lnbm1lbnRzKHBhZ2U6IG51bWJlciA9IDEsIGxpbWl0OiBudW1iZXIgPSAyMCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IGFzc2lnbm1lbnRzOiBbXSwgcGFnaW5hdGlvbjogbnVsbCB9O1xuXG4gICAgLy8gRmlsdGVyIG91dCBhc3NpZ25tZW50cyBvbGRlciB0aGFuIDMgd2Vla3NcbiAgICBjb25zdCB0aHJlZVdlZWtzQWdvID0gbmV3IERhdGUoKTtcbiAgICB0aHJlZVdlZWtzQWdvLnNldERhdGUodGhyZWVXZWVrc0Fnby5nZXREYXRlKCkgLSAyMSk7XG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaFN0dWRlbnRBc3NpZ25tZW50cyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJzdCBnZXQgZW5yb2xsZWQgY2xhc3Nyb29tc1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5yb2xsZWRDbGFzc3Jvb21zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdXNlciB8fCB1c2VyLmVucm9sbGVkQ2xhc3Nyb29tcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhc3NpZ25tZW50czogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzcm9vbUlkcyA9IHVzZXIuZW5yb2xsZWRDbGFzc3Jvb21zLm1hcChjID0+IGMuaWQpO1xuXG4gICAgICAgICAgICAvLyBGZXRjaCBhc3NpZ25tZW50cyBmb3IgdGhlc2UgY2xhc3Nyb29tcyB3aXRoIGNvdW50XG4gICAgICAgICAgICBjb25zdCBbYXNzaWdubWVudHMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBwcm9ibGVtczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgZHVlRGF0ZTogXCJhc2NcIiB9LCAvLyBEdWUgc29vbmVzdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc3Jvb21JZDogeyBpbjogY2xhc3Nyb29tSWRzIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgZ3RlOiB0aHJlZVdlZWtzQWdvIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgYXNzaWdubWVudHMsIHRvdGFsIH07XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1hc3NpZ25tZW50cy0ke3VzZXJJZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BzdHVkZW50LWFzc2lnbm1lbnRzLSR7dXNlcklkfWAsICdhc3NpZ25tZW50cy1hbGwnXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICBjb25zdCB7IGFzc2lnbm1lbnRzLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hTdHVkZW50QXNzaWdubWVudHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzc2lnbm1lbnRzLFxuICAgICAgICBwYWdpbmF0aW9uOiB0b3RhbCA+IDAgPyB7XG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCksXG4gICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfSA6IG51bGxcbiAgICB9O1xufVxuXG4vKipcbiAqIENoZWNrIGNvbXBsZXRpb24gc3RhdHVzIG9mIHByb2JsZW1zIGluIGFuIGFzc2lnbm1lbnQgZm9yIGEgc3BlY2lmaWMgdXNlciAoQ0FDSEVEIHNob3J0LXRlcm0pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBc3NpZ25tZW50UHJvZ3Jlc3MoYXNzaWdubWVudElkOiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXRVc2VySWQgPSB1c2VySWQgfHwgc2Vzc2lvbj8udXNlcj8uaWQ7XG4gICAgaWYgKCF0YXJnZXRVc2VySWQpIHJldHVybiBudWxsO1xuXG4gICAgLy8gR2V0IGFzc2lnbm1lbnQgcHJvYmxlbXMgKGNhY2hlZClcbiAgICBjb25zdCBhc3NpZ25tZW50ID0gYXdhaXQgZ2V0QXNzaWdubWVudERldGFpbHMoYXNzaWdubWVudElkKTtcbiAgICBpZiAoIWFzc2lnbm1lbnQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcHJvYmxlbUlkcyA9IGFzc2lnbm1lbnQucHJvYmxlbXMubWFwKHAgPT4gcC5wcm9ibGVtSWQpO1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBwcm9ncmVzcyAoc2hvcnQgVFRMIHNpbmNlIHN1Ym1pc3Npb25zIHVwZGF0ZSBmcmVxdWVudGx5KVxuICAgIGNvbnN0IHByb2dyZXNzQ2FjaGVLZXkgPSBjYWNoZUtleShcImFzc2lnbm1lbnQtcHJvZ3Jlc3NcIiwgYXNzaWdubWVudElkLCB0YXJnZXRVc2VySWQpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBhd2FpdCBjYWNoZWRGZXRjaChcbiAgICAgICAgcHJvZ3Jlc3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRmV0Y2ggc3VjY2Vzc2Z1bCBzdWJtaXNzaW9ucyBmb3IgdGhlc2UgcHJvYmxlbXMgYnkgdGhlIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0OiBbXCJwcm9ibGVtSWRcIl1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzb2x2ZWRQcm9ibGVtSWRzID0gbmV3IFNldChzdWJtaXNzaW9ucy5tYXAocyA9PiBzLnByb2JsZW1JZCkpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc01hcDogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZWRDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvYmxlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NvbHZlZCA9IHNvbHZlZFByb2JsZW1JZHMuaGFzKHAucHJvYmxlbUlkKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFtwLnByb2JsZW1JZF0gPSBpc1NvbHZlZDtcbiAgICAgICAgICAgICAgICBpZiAoaXNTb2x2ZWQpIGNvbXBsZXRlZENvdW50Kys7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3RhbDogYXNzaWdubWVudC5wcm9ibGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBjb21wbGV0ZWRDb3VudCxcbiAgICAgICAgICAgICAgICBwcm9ncmVzc01hcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgQ0FDSEVfQ09ORklHLlNIT1JULnR0bCAvLyAzMCBzZWNvbmRzIGNhY2hlXG4gICAgKTtcblxuICAgIHJldHVybiBwcm9ncmVzcztcbn1cblxuLyoqXG4gKiBUZWFjaGVyIEFuYWx5dGljczogR2V0IHByb2dyZXNzIG9mIGFsbCBzdHVkZW50cyBpbiBhIGNsYXNzcm9vbSBmb3IgYSBzcGVjaWZpYyBhc3NpZ25tZW50IChDQUNIRUQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUZWFjaGVyQXNzaWdubWVudEFuYWx5dGljcyhcbiAgICBhc3NpZ25tZW50SWQ6IHN0cmluZyxcbiAgICBjbGFzc3Jvb21JZDogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgbGltaXQ6IG51bWJlciA9IDUwXG4pIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIlRFQUNIRVJcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcbiAgICBjb25zdCBhbmFseXRpY3NDYWNoZUtleSA9IGNhY2hlS2V5KFwiYXNzaWdubWVudC1hbmFseXRpY3NcIiwgYXNzaWdubWVudElkLCBjbGFzc3Jvb21JZCwgU3RyaW5nKHBhZ2UpKTtcblxuICAgIGNvbnN0IGFuYWx5dGljcyA9IGF3YWl0IGNhY2hlZEZldGNoKFxuICAgICAgICBhbmFseXRpY3NDYWNoZUtleSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyYWxsZWwgZmV0Y2ggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbSwgYXNzaWdubWVudCwgdG90YWxTdHVkZW50c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogYXNzaWdubWVudElkIH0sXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2JsZW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwcmlzbWEudXNlci5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnJvbGxlZENsYXNzcm9vbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGlmICghY2xhc3Nyb29tIHx8ICFhc3NpZ25tZW50KSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudElkcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAocyA9PiBzLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZHMgPSBhc3NpZ25tZW50LnByb2JsZW1zLm1hcChwID0+IHAucHJvYmxlbUlkKTtcblxuICAgICAgICAgICAgLy8gR2V0IGFsbCBhY2NlcHRlZCBzdWJtaXNzaW9ucyBpbiBvbmUgcXVlcnlcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgcHJpc21hLnN1Ym1pc3Npb24uZmluZE1hbnkoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogeyBpbjogc3R1ZGVudElkcyB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtSWQ6IHsgaW46IHByb2JsZW1JZHMgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcIkFDQ0VQVEVEXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1JZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBCdWlsZCBzdWJtaXNzaW9uIGluZGV4IGZvciBPKDEpIGxvb2t1cFxuICAgICAgICAgICAgY29uc3Qgc3VibWlzc2lvbkluZGV4ID0gbmV3IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PigpO1xuICAgICAgICAgICAgc3VibWlzc2lvbnMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Ym1pc3Npb25JbmRleC5oYXMocy51c2VySWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5zZXQocy51c2VySWQsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25JbmRleC5nZXQocy51c2VySWQpIS5hZGQocy5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIGFuYWx5dGljc1xuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudEFuYWx5dGljcyA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdmVkU2V0ID0gc3VibWlzc2lvbkluZGV4LmdldChzdHVkZW50LmlkKSB8fCBuZXcgU2V0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRDb3VudDogc29sdmVkU2V0LnNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ6IHByb2JsZW1JZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uUGVyY2VudGFnZTogcHJvYmxlbUlkcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChzb2x2ZWRTZXQuc2l6ZSAvIHByb2JsZW1JZHMubGVuZ3RoKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBoYXNDb21wbGV0ZWRBbGw6IHNvbHZlZFNldC5zaXplID09PSBwcm9ibGVtSWRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3M6IHN0dWRlbnRBbmFseXRpY3MsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWxTdHVkZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIENBQ0hFX0NPTkZJRy5NRURJVU0udHRsIC8vIDIgbWludXRlcyBjYWNoZVxuICAgICk7XG5cbiAgICByZXR1cm4gYW5hbHl0aWNzO1xufVxuXG4vKipcbiAqIERlbGV0ZSBhbiBhc3NpZ25tZW50XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBc3NpZ25tZW50KGFzc2lnbm1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlciB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJURUFDSEVSXCIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGF3YWl0IHByaXNtYS5hc3NpZ25tZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGFzc2lnbm1lbnRJZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIGNsYXNzcm9vbToge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlLCBpZDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFzc2lnbm1lbnQgfHwgYXNzaWdubWVudC5jbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIGFzc2lnbm1lbnQgcHJvYmxlbXMgZmlyc3QsIHRoZW4gYXNzaWdubWVudFxuICAgICAgICBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKFtcbiAgICAgICAgICAgIHByaXNtYS5hc3NpZ25tZW50UHJvYmxlbS5kZWxldGVNYW55KHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwcmlzbWEuYXNzaWdubWVudC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBhc3NpZ25tZW50SWQgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudC0ke2Fzc2lnbm1lbnRJZH1gLCBcIm1heFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgYXNzaWdubWVudHMtY2xhc3Nyb29tLSR7YXNzaWdubWVudC5jbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoJ2Fzc2lnbm1lbnRzLWFsbCcsIFwibWF4XCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVsZXRlIGFzc2lnbm1lbnQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgYXNzaWdubWVudFwiIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI0U0FzVXNCIn0=
}),
"[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssignmentAnalyticsView",
    ()=>AssignmentAnalyticsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$b9c749__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:b9c749 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AssignmentAnalyticsView({ assignmentId, classroomId, onBack }) {
    const [analytics, setAnalytics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchAnalytics = async ()=>{
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$b9c749__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTeacherAssignmentAnalytics"])(assignmentId, classroomId);
                // Handle new paginated return type
                if (result && 'analytics' in result) {
                    setAnalytics(result.analytics || []);
                } else if (Array.isArray(result)) {
                    setAnalytics(result);
                } else {
                    setAnalytics([]);
                }
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally{
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, [
        assignmentId,
        classroomId
    ]);
    const filteredAnalytics = analytics.filter((item)=>item.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) || item.student.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    const exportToExcel = ()=>{
        const headers = [
            "Student Name",
            "Email",
            "Completed Problems",
            "Total Problems",
            "Completion %",
            "Status"
        ];
        const rows = analytics.map((item)=>[
                item.student.name || "Unknown",
                item.student.email,
                item.completedCount,
                item.totalCount,
                `${item.completionPercentage.toFixed(1)}%`,
                item.hasCompletedAll ? "Completed" : "In Progress"
            ]);
        const csvContent = [
            headers.join(","),
            ...rows.map((r)=>r.join(","))
        ].join("\n");
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "assignment_report.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center text-gray-500",
            children: "Loading analytics..."
        }, void 0, false, {
            fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
            lineNumber: 76,
            columnNumber: 16
        }, this);
    }
    // Calculate Summary Stats
    const totalStudents = analytics.length;
    const fullyCompleted = analytics.filter((a)=>a.hasCompletedAll).length;
    const avgProgress = totalStudents > 0 ? analytics.reduce((acc, curr)=>acc + curr.completionPercentage, 0) / totalStudents : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                onClick: onBack,
                                className: "rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-gray-900 dark:text-white",
                                        children: "Assignment Analytics"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: "Track student progress and submissions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                        lineNumber: 96,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 94,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: exportToExcel,
                        variant: "outline",
                        className: "gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this),
                            "Export CSV"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 99,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                lineNumber: 89,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500 mb-1 font-medium",
                                children: "Completion Rate"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 108,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-black text-gray-900 dark:text-white",
                                children: [
                                    Math.round(fullyCompleted / totalStudents * 100) || 0,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 mt-2",
                                children: [
                                    fullyCompleted,
                                    " of ",
                                    totalStudents,
                                    " students completed all problems"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500 mb-1 font-medium",
                                children: "Avg. Progress"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 117,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-black text-gray-900 dark:text-white",
                                children: [
                                    Math.round(avgProgress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 mt-3 bg-gray-100 dark:bg-[#333] rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-orange-500 rounded-full transition-all",
                                    style: {
                                        width: `${avgProgress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                    lineNumber: 122,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 121,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500 mb-1 font-medium",
                                children: "Pending"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-black text-orange-600 dark:text-orange-500",
                                children: totalStudents - fullyCompleted
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 127,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 mt-2",
                                children: "Students still working"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 130,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 125,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-50 dark:border-[#262626] flex items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-gray-900 dark:text-white",
                                children: [
                                    "Student Progress (",
                                    filteredAnalytics.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 137,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-64",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "Search students...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "pl-9 h-9"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                        lineNumber: 140,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-[#202020]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 font-medium",
                                                children: "Student"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                lineNumber: 153,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 font-medium",
                                                children: "Progress"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                lineNumber: 154,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 font-medium text-center",
                                                children: "Solved"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                lineNumber: 155,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 font-medium text-right",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                lineNumber: 156,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-50 dark:divide-[#262626]",
                                    children: filteredAnalytics.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50/50 dark:hover:bg-[#1f1f1f] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-gray-100 dark:bg-[#333] overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-500",
                                                                children: item.student.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: item.student.image,
                                                                    alt: item.student.name || '',
                                                                    width: 32,
                                                                    height: 32,
                                                                    className: "object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 53
                                                                }, this) : item.student.name?.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold text-gray-900 dark:text-white",
                                                                        children: item.student.name || "Unknown"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-gray-400 flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                                className: "w-3 h-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            item.student.email
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                        lineNumber: 173,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 w-1/3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-2 flex-1 rounded-full overflow-hidden ${item.hasCompletedAll ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-[#333]'}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `h-full rounded-full transition-all ${item.hasCompletedAll ? 'bg-green-500' : 'bg-orange-500'}`,
                                                                    style: {
                                                                        width: `${item.completionPercentage}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                    lineNumber: 183,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold w-9 text-right",
                                                                children: [
                                                                    Math.round(item.completionPercentage),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-[#333] dark:text-gray-300",
                                                        children: [
                                                            item.completedCount,
                                                            " / ",
                                                            item.totalCount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 text-right",
                                                    children: item.hasCompletedAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 49
                                                            }, this),
                                                            "Done"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                                lineNumber: 201,
                                                                columnNumber: 49
                                                            }, this),
                                                            "Pending"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, item.student.id, true, {
                                            fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                            lineNumber: 161,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                                    lineNumber: 159,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                            lineNumber: 150,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                        lineNumber: 149,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx",
        lineNumber: 87,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/classroom/assignments/AssignmentsTab.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssignmentsTab",
    ()=>AssignmentsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$CreateAssignmentModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/assignments/CreateAssignmentModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$e77ea9__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:e77ea9 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$6c2209__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:6c2209 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$AssignmentAnalyticsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/assignments/AssignmentAnalyticsView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
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
function AssignmentsTab({ classroomId, isTeacher }) {
    const [assignments, setAssignments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initial load uses cached version
    const fetchAssignments = async ()=>{
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$e77ea9__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getClassroomAssignments"])(classroomId);
            // Handle new paginated return type
            setAssignments(result.assignments || []);
        } catch (error) {
            console.error("Failed to fetch assignments", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to load assignments");
        } finally{
            setIsLoading(false);
        }
    };
    // Refresh uses uncached version for fresh data
    const refreshAssignments = async ()=>{
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$6c2209__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["refreshClassroomAssignments"])(classroomId);
            setAssignments(data);
        } catch (error) {
            console.error("Failed to refresh assignments", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchAssignments();
    }, [
        classroomId
    ]);
    if (selectedAssignmentId && isTeacher) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$AssignmentAnalyticsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssignmentAnalyticsView"], {
            assignmentId: selectedAssignmentId,
            classroomId: classroomId,
            onBack: ()=>setSelectedAssignmentId(null)
        }, void 0, false, {
            fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
            lineNumber: 53,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-900 dark:text-gray-100",
                        children: "Assignments"
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsCreateModalOpen(true),
                        className: "px-4 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this),
                            "Create Assignment"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 66,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12 text-gray-500",
                children: "Loading assignments..."
            }, void 0, false, {
                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                lineNumber: 77,
                columnNumber: 17
            }, this) : assignments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-16 bg-gray-50 border border-gray-100 dark:bg-[#1a1a1a] dark:border-[#262626] rounded-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-orange-100 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            className: "w-8 h-8"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                            lineNumber: 81,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-gray-900 dark:text-white mb-2",
                        children: "No assignments yet"
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 max-w-md mx-auto mb-6",
                        children: isTeacher ? "Create your first assignment to track student progress on specific problems." : "Your teacher hasn't posted any assignments yet."
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 84,
                        columnNumber: 21
                    }, this),
                    isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsCreateModalOpen(true),
                        className: "px-6 py-3 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 text-sm font-bold rounded-lg transition-colors",
                        children: "Create Assignment"
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 90,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: assignments.map((assignment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl p-6 hover:shadow-lg transition-all group relative cursor-pointer",
                        onClick: ()=>{
                            if (isTeacher) {
                                setSelectedAssignmentId(assignment.id);
                            } else {
                            // Navigate to student assignment view (needs implementation)
                            // For now, let's just use a Link
                            }
                        },
                        children: [
                            !isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/my-assignments/${assignment.id}`,
                                className: "absolute inset-0 z-10"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 115,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                            lineNumber: 123,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                        lineNumber: 122,
                                        columnNumber: 33
                                    }, this),
                                    assignment.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-gray-400 bg-gray-50 dark:bg-[#262626] px-2 py-1 rounded",
                                        children: [
                                            "Due ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(assignment.dueDate), "MMM d")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                        lineNumber: 126,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 121,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors",
                                children: assignment.title
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 132,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]",
                                children: assignment.description || "No description provided"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pt-4 border-t border-gray-50 dark:border-[#262626]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-gray-500",
                                        children: [
                                            assignment._count.problems,
                                            " Problems"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                        lineNumber: 141,
                                        columnNumber: 33
                                    }, this),
                                    isTeacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                                lineNumber: 147,
                                                columnNumber: 41
                                            }, this),
                                            "View Analytics"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                        lineNumber: 146,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform",
                                        children: [
                                            "Start",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                                lineNumber: 153,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                        lineNumber: 151,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                                lineNumber: 140,
                                columnNumber: 29
                            }, this)
                        ]
                    }, assignment.id, true, {
                        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                        lineNumber: 101,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                lineNumber: 99,
                columnNumber: 17
            }, this),
            isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$CreateAssignmentModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateAssignmentModal"], {
                isOpen: isCreateModalOpen,
                onClose: ()=>setIsCreateModalOpen(false),
                classroomId: classroomId,
                onSuccess: ()=>{
                    setIsCreateModalOpen(false);
                    refreshAssignments(); // Use uncached fetch for immediate fresh data
                }
            }, void 0, false, {
                fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
                lineNumber: 163,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/assignments/AssignmentsTab.tsx",
        lineNumber: 62,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:237b10 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60f9d7da12c7611c06fbd706641903809dc9ed6481":"checkInternalContestParticipation"},"actions/classroom-contest.action.ts",""] */ __turbopack_context__.s([
    "checkInternalContestParticipation",
    ()=>checkInternalContestParticipation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var checkInternalContestParticipation = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("60f9d7da12c7611c06fbd706641903809dc9ed6481", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkInternalContestParticipation"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLWNvbnRlc3QuYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBjaGVja0V4dGVybmFsUGFydGljaXBhdGlvbiB9IGZyb20gXCIuL2NvbnRlc3QtY2hlY2tlci5hY3Rpb25cIjtcbmltcG9ydCB7IGdldFVwY29taW5nQ29udGVzdHMsIENvbnRlc3QgYXMgRXh0ZXJuYWxDb250ZXN0IH0gZnJvbSBcIi4vZXh0ZXJuYWwtY29udGVzdHMuYWN0aW9uXCI7XG5cbi8vIFJlLWV4cG9ydCBleHRlcm5hbCBjaGVja2VyIGZvciBlYXNlIG9mIHVzZSBpbiBjbGllbnQgY29tcG9uZW50c1xuZXhwb3J0IHsgY2hlY2tFeHRlcm5hbFBhcnRpY2lwYXRpb24gfTtcblxuZXhwb3J0IHR5cGUgSW50ZXJuYWxDb250ZXN0UGFydGljaXBhdGlvbiA9IHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwYXJ0aWNpcGF0ZWQ6IGJvb2xlYW47XG4gICAgc2NvcmU6IG51bWJlcjtcbiAgICByYW5rPzogbnVtYmVyO1xuICAgIHByb2JsZW1zU29sdmVkOiBudW1iZXI7XG4gICAgZmluaXNoZWRBdD86IERhdGUgfCBudWxsO1xuICAgIGlzRmluaXNoZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tJbnRlcm5hbENvbnRlc3RQYXJ0aWNpcGF0aW9uKFxuICAgIGNvbnRlc3RJZDogc3RyaW5nLFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmdcbik6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyByZXN1bHRzPzogSW50ZXJuYWxDb250ZXN0UGFydGljaXBhdGlvbltdOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gMS4gVmVyaWZ5IGNvbnRlc3QgZXhpc3RzXG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgdGl0bGU6IHRydWUgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBHZXQgYWxsIHN0dWRlbnRzIGluIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBuYW1lOiAnYXNjJyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gR2V0IHBhcnRpY2lwYXRpb24gcmVjb3JkcyBmb3IgdGhpcyBjb250ZXN0IGFuZCB0aGVzZSBzdHVkZW50c1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9ucyA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHVzZXJJZDoge1xuICAgICAgICAgICAgICAgICAgICBpbjogY2xhc3Nyb29tLnN0dWRlbnRzLm1hcChzID0+IHMuaWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgY29udGVzdElkOiBjb250ZXN0SWQsIHN0YXR1czogXCJBQ0NFUFRFRFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSwgcHJvYmxlbTogeyBzZWxlY3Q6IHsgc2NvcmU6IHRydWUgfSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIDQuIE1hcCByZXN1bHRzXG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb25NYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHBhcnRpY2lwYXRpb25zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgc2NvcmUgYmFzZWQgb24gdW5pcXVlIHByb2JsZW1zIHNvbHZlZFxuICAgICAgICAgICAgY29uc3QgdW5pcXVlU29sdmVkID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgbGV0IHRvdGFsU2NvcmUgPSAwO1xuXG4gICAgICAgICAgICBwLnVzZXIuc3VibWlzc2lvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdW5pcXVlU29sdmVkLmhhcyhzdWIucHJvYmxlbUlkKSkge1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVTb2x2ZWQuYWRkKHN1Yi5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHN1Yi5wcm9ibGVtLnNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uTWFwLnNldChwLnVzZXJJZCwge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZEF0OiBwLmZpbmlzaGVkQXQsXG4gICAgICAgICAgICAgICAgaXNGaW5pc2hlZDogcC5pc0ZpbmlzaGVkLFxuICAgICAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlLFxuICAgICAgICAgICAgICAgIHByb2JsZW1zU29sdmVkOiB1bmlxdWVTb2x2ZWQuc2l6ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEludGVybmFsQ29udGVzdFBhcnRpY2lwYXRpb25bXSA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gcGFydGljaXBhdGlvbk1hcC5nZXQoc3R1ZGVudC5pZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUgfHwgXCJVbmtub3duXCIsXG4gICAgICAgICAgICAgICAgZW1haWw6IHN0dWRlbnQuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVkOiAhIWRhdGEsXG4gICAgICAgICAgICAgICAgc2NvcmU6IGRhdGE/LnNjb3JlIHx8IDAsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXNTb2x2ZWQ6IGRhdGE/LnByb2JsZW1zU29sdmVkIHx8IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRBdDogZGF0YT8uZmluaXNoZWRBdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGlzRmluaXNoZWQ6IGRhdGE/LmlzRmluaXNoZWQgfHwgZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCByYW5rcyBmb3IgdGhvc2Ugd2hvIHBhcnRpY2lwYXRlZFxuICAgICAgICAvLyBSYW5rIGJ5IFNjb3JlIChkZXNjKSwgdGhlbiBUaW1lIChhc2MpIC0gbm90IGltcGxlbWVudGluZyBjb21wbGV4IHRpbWUgcGVuYWx0eSBsb2dpYyBoZXJlIGZvciBzaW1wbGljaXR5LFxuICAgICAgICAvLyBqdXN0IHNjb3JlLlxuICAgICAgICByZXN1bHRzXG4gICAgICAgICAgICAuZmlsdGVyKHIgPT4gci5wYXJ0aWNpcGF0ZWQpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpXG4gICAgICAgICAgICAuZm9yRWFjaCgociwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgci5yYW5rID0gaWR4ICsgMTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHJlc3VsdHMgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkludGVybmFsIGNvbnRlc3QgY2hlY2sgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcGFydGljaXBhdGlvbiBkYXRhXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRDb250ZXN0cyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gMS4gRmV0Y2ggSW50ZXJuYWwgQ29udGVzdHMgKFBhc3QgMzAgZGF5cylcbiAgICAgICAgY29uc3QgdGhpcnR5RGF5c0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXJ0eURheXNBZ28uc2V0RGF0ZSh0aGlydHlEYXlzQWdvLmdldERhdGUoKSAtIDMwKTtcblxuICAgICAgICBjb25zdCBpbnRlcm5hbENvbnRlc3RzID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIGx0OiBuZXcgRGF0ZSgpLCAvLyBDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgZ3Q6IHRoaXJ0eURheXNBZ29cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJQVUJMSUNcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcIkNMQVNTUk9PTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tSWQ6IGNsYXNzcm9vbUlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiSU5TVElUVVRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiAnZGVzYydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWtlOiAxMCxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2x1ZzogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyAyLiBGZXRjaCBFeHRlcm5hbCBDb250ZXN0c1xuICAgICAgICAvLyBXZSByZXVzZSB0aGUgZ2V0VXBjb21pbmdDb250ZXN0cyB3aGljaCBub3cgaW5jbHVkZXMgcmVjZW50IHBhc3QgY29udGVzdHNcbiAgICAgICAgY29uc3QgeyBjb250ZXN0czogZXh0ZXJuYWxDb250ZXN0cyB9ID0gYXdhaXQgZ2V0VXBjb21pbmdDb250ZXN0cygpO1xuXG4gICAgICAgIC8vIEZpbHRlciBmb3Igb25seSBGSU5JU0hFRCBleHRlcm5hbCBjb250ZXN0c1xuICAgICAgICBjb25zdCByZWNlbnRFeHRlcm5hbCA9IGV4dGVybmFsQ29udGVzdHMuZmlsdGVyKChjOiBFeHRlcm5hbENvbnRlc3QpID0+IGMuc3RhdHVzID09PSBcIkZJTklTSEVEXCIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgaW50ZXJuYWw6IGludGVybmFsQ29udGVzdHMsXG4gICAgICAgICAgICBleHRlcm5hbDogcmVjZW50RXh0ZXJuYWxcbiAgICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggcmVjZW50IGNvbnRlc3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBpbnRlcm5hbDogW10sIGV4dGVybmFsOiBbXSB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFRBcUJzQiJ9
}),
"[project]/actions/data:9821a3 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"400d34faa00f51bc854d89b0a782031b730d053dd6":"getRecentContests"},"actions/classroom-contest.action.ts",""] */ __turbopack_context__.s([
    "getRecentContests",
    ()=>getRecentContests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getRecentContests = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("400d34faa00f51bc854d89b0a782031b730d053dd6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRecentContests"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLWNvbnRlc3QuYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBjaGVja0V4dGVybmFsUGFydGljaXBhdGlvbiB9IGZyb20gXCIuL2NvbnRlc3QtY2hlY2tlci5hY3Rpb25cIjtcbmltcG9ydCB7IGdldFVwY29taW5nQ29udGVzdHMsIENvbnRlc3QgYXMgRXh0ZXJuYWxDb250ZXN0IH0gZnJvbSBcIi4vZXh0ZXJuYWwtY29udGVzdHMuYWN0aW9uXCI7XG5cbi8vIFJlLWV4cG9ydCBleHRlcm5hbCBjaGVja2VyIGZvciBlYXNlIG9mIHVzZSBpbiBjbGllbnQgY29tcG9uZW50c1xuZXhwb3J0IHsgY2hlY2tFeHRlcm5hbFBhcnRpY2lwYXRpb24gfTtcblxuZXhwb3J0IHR5cGUgSW50ZXJuYWxDb250ZXN0UGFydGljaXBhdGlvbiA9IHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwYXJ0aWNpcGF0ZWQ6IGJvb2xlYW47XG4gICAgc2NvcmU6IG51bWJlcjtcbiAgICByYW5rPzogbnVtYmVyO1xuICAgIHByb2JsZW1zU29sdmVkOiBudW1iZXI7XG4gICAgZmluaXNoZWRBdD86IERhdGUgfCBudWxsO1xuICAgIGlzRmluaXNoZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tJbnRlcm5hbENvbnRlc3RQYXJ0aWNpcGF0aW9uKFxuICAgIGNvbnRlc3RJZDogc3RyaW5nLFxuICAgIGNsYXNzcm9vbUlkOiBzdHJpbmdcbik6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyByZXN1bHRzPzogSW50ZXJuYWxDb250ZXN0UGFydGljaXBhdGlvbltdOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gMS4gVmVyaWZ5IGNvbnRlc3QgZXhpc3RzXG4gICAgICAgIGNvbnN0IGNvbnRlc3QgPSBhd2FpdCBwcmlzbWEuY29udGVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjb250ZXN0SWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgdGl0bGU6IHRydWUgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNvbnRlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb250ZXN0IG5vdCBmb3VuZFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBHZXQgYWxsIHN0dWRlbnRzIGluIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBuYW1lOiAnYXNjJyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gR2V0IHBhcnRpY2lwYXRpb24gcmVjb3JkcyBmb3IgdGhpcyBjb250ZXN0IGFuZCB0aGVzZSBzdHVkZW50c1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGF0aW9ucyA9IGF3YWl0IHByaXNtYS5jb250ZXN0UGFydGljaXBhdGlvbi5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGNvbnRlc3RJZDogY29udGVzdElkLFxuICAgICAgICAgICAgICAgIHVzZXJJZDoge1xuICAgICAgICAgICAgICAgICAgICBpbjogY2xhc3Nyb29tLnN0dWRlbnRzLm1hcChzID0+IHMuaWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgY29udGVzdElkOiBjb250ZXN0SWQsIHN0YXR1czogXCJBQ0NFUFRFRFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHByb2JsZW1JZDogdHJ1ZSwgcHJvYmxlbTogeyBzZWxlY3Q6IHsgc2NvcmU6IHRydWUgfSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIDQuIE1hcCByZXN1bHRzXG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb25NYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHBhcnRpY2lwYXRpb25zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgc2NvcmUgYmFzZWQgb24gdW5pcXVlIHByb2JsZW1zIHNvbHZlZFxuICAgICAgICAgICAgY29uc3QgdW5pcXVlU29sdmVkID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgbGV0IHRvdGFsU2NvcmUgPSAwO1xuXG4gICAgICAgICAgICBwLnVzZXIuc3VibWlzc2lvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdW5pcXVlU29sdmVkLmhhcyhzdWIucHJvYmxlbUlkKSkge1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVTb2x2ZWQuYWRkKHN1Yi5wcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHN1Yi5wcm9ibGVtLnNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYXJ0aWNpcGF0aW9uTWFwLnNldChwLnVzZXJJZCwge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZEF0OiBwLmZpbmlzaGVkQXQsXG4gICAgICAgICAgICAgICAgaXNGaW5pc2hlZDogcC5pc0ZpbmlzaGVkLFxuICAgICAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlLFxuICAgICAgICAgICAgICAgIHByb2JsZW1zU29sdmVkOiB1bmlxdWVTb2x2ZWQuc2l6ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEludGVybmFsQ29udGVzdFBhcnRpY2lwYXRpb25bXSA9IGNsYXNzcm9vbS5zdHVkZW50cy5tYXAoc3R1ZGVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gcGFydGljaXBhdGlvbk1hcC5nZXQoc3R1ZGVudC5pZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUgfHwgXCJVbmtub3duXCIsXG4gICAgICAgICAgICAgICAgZW1haWw6IHN0dWRlbnQuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVkOiAhIWRhdGEsXG4gICAgICAgICAgICAgICAgc2NvcmU6IGRhdGE/LnNjb3JlIHx8IDAsXG4gICAgICAgICAgICAgICAgcHJvYmxlbXNTb2x2ZWQ6IGRhdGE/LnByb2JsZW1zU29sdmVkIHx8IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRBdDogZGF0YT8uZmluaXNoZWRBdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGlzRmluaXNoZWQ6IGRhdGE/LmlzRmluaXNoZWQgfHwgZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCByYW5rcyBmb3IgdGhvc2Ugd2hvIHBhcnRpY2lwYXRlZFxuICAgICAgICAvLyBSYW5rIGJ5IFNjb3JlIChkZXNjKSwgdGhlbiBUaW1lIChhc2MpIC0gbm90IGltcGxlbWVudGluZyBjb21wbGV4IHRpbWUgcGVuYWx0eSBsb2dpYyBoZXJlIGZvciBzaW1wbGljaXR5LFxuICAgICAgICAvLyBqdXN0IHNjb3JlLlxuICAgICAgICByZXN1bHRzXG4gICAgICAgICAgICAuZmlsdGVyKHIgPT4gci5wYXJ0aWNpcGF0ZWQpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpXG4gICAgICAgICAgICAuZm9yRWFjaCgociwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgci5yYW5rID0gaWR4ICsgMTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHJlc3VsdHMgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkludGVybmFsIGNvbnRlc3QgY2hlY2sgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcGFydGljaXBhdGlvbiBkYXRhXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRDb250ZXN0cyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gMS4gRmV0Y2ggSW50ZXJuYWwgQ29udGVzdHMgKFBhc3QgMzAgZGF5cylcbiAgICAgICAgY29uc3QgdGhpcnR5RGF5c0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXJ0eURheXNBZ28uc2V0RGF0ZSh0aGlydHlEYXlzQWdvLmdldERhdGUoKSAtIDMwKTtcblxuICAgICAgICBjb25zdCBpbnRlcm5hbENvbnRlc3RzID0gYXdhaXQgcHJpc21hLmNvbnRlc3QuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIGx0OiBuZXcgRGF0ZSgpLCAvLyBDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgZ3Q6IHRoaXJ0eURheXNBZ29cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJQVUJMSUNcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcIkNMQVNTUk9PTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tSWQ6IGNsYXNzcm9vbUlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiSU5TVElUVVRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lOiB7IGlkOiBjbGFzc3Jvb21JZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiAnZGVzYydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWtlOiAxMCxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2x1ZzogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyAyLiBGZXRjaCBFeHRlcm5hbCBDb250ZXN0c1xuICAgICAgICAvLyBXZSByZXVzZSB0aGUgZ2V0VXBjb21pbmdDb250ZXN0cyB3aGljaCBub3cgaW5jbHVkZXMgcmVjZW50IHBhc3QgY29udGVzdHNcbiAgICAgICAgY29uc3QgeyBjb250ZXN0czogZXh0ZXJuYWxDb250ZXN0cyB9ID0gYXdhaXQgZ2V0VXBjb21pbmdDb250ZXN0cygpO1xuXG4gICAgICAgIC8vIEZpbHRlciBmb3Igb25seSBGSU5JU0hFRCBleHRlcm5hbCBjb250ZXN0c1xuICAgICAgICBjb25zdCByZWNlbnRFeHRlcm5hbCA9IGV4dGVybmFsQ29udGVzdHMuZmlsdGVyKChjOiBFeHRlcm5hbENvbnRlc3QpID0+IGMuc3RhdHVzID09PSBcIkZJTklTSEVEXCIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgaW50ZXJuYWw6IGludGVybmFsQ29udGVzdHMsXG4gICAgICAgICAgICBleHRlcm5hbDogcmVjZW50RXh0ZXJuYWxcbiAgICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggcmVjZW50IGNvbnRlc3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBpbnRlcm5hbDogW10sIGV4dGVybmFsOiBbXSB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFNBOEhzQiJ9
}),
"[project]/actions/data:4ee4dd [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70a74088e6ae2baef179da5722207b030fb65b8469":"checkExternalParticipation"},"actions/contest-checker.action.ts",""] */ __turbopack_context__.s([
    "checkExternalParticipation",
    ()=>checkExternalParticipation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var checkExternalParticipation = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("70a74088e6ae2baef179da5722207b030fb65b8469", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkExternalParticipation"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29udGVzdC1jaGVja2VyLmFjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5leHBvcnQgdHlwZSBQYXJ0aWNpcGF0aW9uU3RhdHVzID0ge1xuICB1c2VySWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBoYW5kbGU6IHN0cmluZyB8IG51bGw7XG4gIHBhcnRpY2lwYXRlZDogYm9vbGVhbjtcbiAgcmFuaz86IG51bWJlcjtcbiAgc2NvcmU/OiBudW1iZXI7XG4gIGRldGFpbHM/OiBhbnk7XG4gIGVycm9yPzogc3RyaW5nO1xufTtcblxuLy8gLS0tIENvZGVmb3JjZXMgLS0tXG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQ29kZWZvcmNlc1BhcnRpY2lwYXRpb24oY29udGVzdElkOiBzdHJpbmcsIHVzZXJzOiBVc2VyW10pOiBQcm9taXNlPFBhcnRpY2lwYXRpb25TdGF0dXNbXT4ge1xuICBjb25zdCB1c2Vyc1dpdGhIYW5kbGUgPSB1c2Vycy5maWx0ZXIodSA9PiB1LmNvZGVmb3JjZXNIYW5kbGUpO1xuICBjb25zdCBoYW5kbGVNYXAgPSBuZXcgTWFwPHN0cmluZywgVXNlcj4oKTtcbiAgdXNlcnNXaXRoSGFuZGxlLmZvckVhY2godSA9PiBoYW5kbGVNYXAuc2V0KHUuY29kZWZvcmNlc0hhbmRsZSEudG9Mb3dlckNhc2UoKSwgdSkpO1xuXG4gIGlmICh1c2Vyc1dpdGhIYW5kbGUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVzZXJzLm1hcCh1ID0+ICh7XG4gICAgICB1c2VySWQ6IHUuaWQsXG4gICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICBoYW5kbGU6IHUuY29kZWZvcmNlc0hhbmRsZSB8fCBudWxsLFxuICAgICAgcGFydGljaXBhdGVkOiBmYWxzZSxcbiAgICAgIGVycm9yOiBcIk5vIENvZGVmb3JjZXMgaGFuZGxlIGxpbmtlZFwiXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gQ29kZWZvcmNlcyBhbGxvd3MgbXVsdGlwbGUgaGFuZGxlcyBpbiBvbmUgcmVxdWVzdCAodXAgdG8gc29tZSBsaW1pdCwgdXN1YWxseSAxMDAwMCBjaGFyYWN0ZXJzIHVybCBsZW5ndGgpXG4gIC8vIGNodW5rIGhhbmRsZXMgaWYgbmVjZXNzYXJ5XG4gIGNvbnN0IGNodW5rcyA9IFtdO1xuICBjb25zdCBjaHVua1NpemUgPSAxMDA7IC8vIGNvbnNlcnZhdGl2ZSBiYXRjaCBzaXplXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXNlcnNXaXRoSGFuZGxlLmxlbmd0aDsgaSArPSBjaHVua1NpemUpIHtcbiAgICBjaHVua3MucHVzaCh1c2Vyc1dpdGhIYW5kbGUuc2xpY2UoaSwgaSArIGNodW5rU2l6ZSkpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0czogUGFydGljaXBhdGlvblN0YXR1c1tdID0gW107XG4gIC8vIEluaXRpYWxpemUgYWxsIGFzIG5vdCBwYXJ0aWNpcGF0ZWRcbiAgdXNlcnMuZm9yRWFjaCh1ID0+IHtcbiAgICAgIGlmICghdS5jb2RlZm9yY2VzSGFuZGxlKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgdXNlcklkOiB1LmlkLFxuICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICAgIGhhbmRsZTogbnVsbCxcbiAgICAgICAgICAgICAgcGFydGljaXBhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IFwiTm8gaGFuZGxlXCJcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICBjb25zdCBoYW5kbGVzID0gY2h1bmsubWFwKHUgPT4gdS5jb2RlZm9yY2VzSGFuZGxlKS5qb2luKFwiO1wiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vY29kZWZvcmNlcy5jb20vYXBpL2NvbnRlc3Quc3RhbmRpbmdzP2NvbnRlc3RJZD0ke2NvbnRlc3RJZH0maGFuZGxlcz0ke2hhbmRsZXN9JnNob3dVbm9mZmljaWFsPXRydWVgKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuXG4gICAgICBpZiAoZGF0YS5zdGF0dXMgIT09IFwiT0tcIikge1xuICAgICAgICBjaHVuay5mb3JFYWNoKHUgPT4gcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICB1c2VySWQ6IHUuaWQsXG4gICAgICAgICAgbmFtZTogdS5uYW1lLFxuICAgICAgICAgIGhhbmRsZTogdS5jb2RlZm9yY2VzSGFuZGxlLFxuICAgICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGRhdGEuY29tbWVudCB8fCBcIkNvZGVmb3JjZXMgQVBJIEVycm9yXCJcbiAgICAgICAgfSkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyByb3dzXG4gICAgICBjb25zdCByb3dzID0gZGF0YS5yZXN1bHQucm93cztcbiAgICAgIC8vIE1hcmsgdGhvc2UgcHJlc2VudCBhcyBwYXJ0aWNpcGF0ZWRcbiAgICAgIGNvbnN0IGZvdW5kSGFuZGxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICByb3dzLmZvckVhY2goKHJvdzogYW55KSA9PiB7XG4gICAgICAgIC8vIHJvdy5wYXJ0eS5tZW1iZXJzIGNvbnRhaW5zIHRoZSBoYW5kbGVzXG4gICAgICAgIHJvdy5wYXJ0eS5tZW1iZXJzLmZvckVhY2goKG1lbWJlcjogYW55KSA9PiB7XG4gICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IG1lbWJlci5oYW5kbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgY29uc3QgdXNlciA9IGhhbmRsZU1hcC5nZXQoaGFuZGxlKTtcbiAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICBmb3VuZEhhbmRsZXMuYWRkKGhhbmRsZSk7XG4gICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgIGhhbmRsZTogdXNlci5jb2RlZm9yY2VzSGFuZGxlLFxuICAgICAgICAgICAgICAgcGFydGljaXBhdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgcmFuazogcm93LnJhbmssXG4gICAgICAgICAgICAgICBzY29yZTogcm93LnBvaW50cyxcbiAgICAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICAgcGVuYWx0eTogcm93LnBlbmFsdHksXG4gICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWxIYWNrQ291bnQ6IHJvdy5zdWNjZXNzZnVsSGFja0NvdW50XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gVGhvc2UgaW4gdGhlIGNodW5rIGJ1dCBub3QgZm91bmQgaW4gcm93cyA9PiBkaWQgbm90IHBhcnRpY2lwYXRlXG4gICAgICBjaHVuay5mb3JFYWNoKHUgPT4ge1xuICAgICAgICBpZiAodS5jb2RlZm9yY2VzSGFuZGxlICYmICFmb3VuZEhhbmRsZXMuaGFzKHUuY29kZWZvcmNlc0hhbmRsZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICB1c2VySWQ6IHUuaWQsXG4gICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICBoYW5kbGU6IHUuY29kZWZvcmNlc0hhbmRsZSxcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIGNodW5rLmZvckVhY2godSA9PiByZXN1bHRzLnB1c2goe1xuICAgICAgICB1c2VySWQ6IHUuaWQsXG4gICAgICAgIG5hbWU6IHUubmFtZSxcbiAgICAgICAgaGFuZGxlOiB1LmNvZGVmb3JjZXNIYW5kbGUsXG4gICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlLm1lc3NhZ2VcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuLy8gLS0tIExlZXRDb2RlIC0tLVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0xlZXRDb2RlUGFydGljaXBhdGlvbihjb250ZXN0U2x1Zzogc3RyaW5nLCB1c2VyczogVXNlcltdKTogUHJvbWlzZTxQYXJ0aWNpcGF0aW9uU3RhdHVzW10+IHtcbiAgLy8gTGVldENvZGUgZG9lc24ndCBoYXZlIGEgYmF0Y2ggY2hlY2suIFdlIG11c3QgY2hlY2sgZWFjaCB1c2VyLlxuICAvLyBXZSdsbCBydW4gaW4gcGFyYWxsZWwgd2l0aCBjb25jdXJyZW5jeSBsaW1pdC5cblxuICBjb25zdCByZXN1bHRzOiBQYXJ0aWNpcGF0aW9uU3RhdHVzW10gPSBbXTtcblxuICBjb25zdCBjaGVja1VzZXIgPSBhc3luYyAodXNlcjogVXNlcikgPT4ge1xuICAgIGlmICghdXNlci5sZWV0Q29kZUhhbmRsZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIGhhbmRsZTogbnVsbCxcbiAgICAgICAgcGFydGljaXBhdGVkOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiTm8gaGFuZGxlXCJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFF1ZXJ5IHVzZXIncyBjb250ZXN0IGhpc3RvcnlcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYFxuICAgICAgICBxdWVyeSB1c2VyQ29udGVzdFJhbmtpbmdJbmZvKCR1c2VybmFtZTogU3RyaW5nISkge1xuICAgICAgICAgIHVzZXJDb250ZXN0UmFua2luZ0hpc3RvcnkodXNlcm5hbWU6ICR1c2VybmFtZSkge1xuICAgICAgICAgICAgYXR0ZW5kZWRcbiAgICAgICAgICAgIGNvbnRlc3Qge1xuICAgICAgICAgICAgICB0aXRsZVNsdWdcbiAgICAgICAgICAgICAgc3RhcnRUaW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYW5raW5nXG4gICAgICAgICAgICBmaW5pc2hUaW1lSW5TZWNvbmRzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBgO1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vbGVldGNvZGUuY29tL2dyYXBocWxcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgXCJSZWZlcmVyXCI6IGBodHRwczovL2xlZXRjb2RlLmNvbS91LyR7dXNlci5sZWV0Q29kZUhhbmRsZX0vYFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgdmFyaWFibGVzOiB7IHVzZXJuYW1lOiB1c2VyLmxlZXRDb2RlSGFuZGxlIH1cbiAgICAgICAgfSksXG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCJcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGlmIChkYXRhLmVycm9ycykge1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIGhhbmRsZTogdXNlci5sZWV0Q29kZUhhbmRsZSxcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZGF0YS5lcnJvcnNbMF0/Lm1lc3NhZ2VcbiAgICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhpc3RvcnkgPSBkYXRhLmRhdGEudXNlckNvbnRlc3RSYW5raW5nSGlzdG9yeSB8fCBbXTtcbiAgICAgIC8vIEZpbmQgdGhlIGNvbnRlc3RcbiAgICAgIGNvbnN0IHBhcnRpY2lwYXRpb24gPSBoaXN0b3J5LmZpbmQoKHA6IGFueSkgPT4gcC5jb250ZXN0Py50aXRsZVNsdWcgPT09IGNvbnRlc3RTbHVnKTtcblxuICAgICAgaWYgKHBhcnRpY2lwYXRpb24gJiYgcGFydGljaXBhdGlvbi5hdHRlbmRlZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgaGFuZGxlOiB1c2VyLmxlZXRDb2RlSGFuZGxlLFxuICAgICAgICAgIHBhcnRpY2lwYXRlZDogdHJ1ZSxcbiAgICAgICAgICByYW5rOiBwYXJ0aWNpcGF0aW9uLnJhbmtpbmcsXG4gICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgZmluaXNoVGltZTogcGFydGljaXBhdGlvbi5maW5pc2hUaW1lSW5TZWNvbmRzXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGhhbmRsZTogdXNlci5sZWV0Q29kZUhhbmRsZSxcbiAgICAgICAgICBwYXJ0aWNpcGF0ZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBoYW5kbGU6IHVzZXIubGVldENvZGVIYW5kbGUsXG4gICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlLm1lc3NhZ2VcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8vIFByb2Nlc3MgaW4gY2h1bmtzIHRvIGF2b2lkIHJhdGUgbGltaXRzXG4gIGNvbnN0IGNodW5rU2l6ZSA9IDU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpICs9IGNodW5rU2l6ZSkge1xuICAgIGNvbnN0IGNodW5rID0gdXNlcnMuc2xpY2UoaSwgaSArIGNodW5rU2l6ZSk7XG4gICAgY29uc3QgY2h1bmtSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoY2h1bmsubWFwKGNoZWNrVXNlcikpO1xuICAgIHJlc3VsdHMucHVzaCguLi5jaHVua1Jlc3VsdHMpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8vIC0tLSBDb2RlQ2hlZiAtLS1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlBhcnRpY2lwYXRpb24oY29udGVzdENvZGU6IHN0cmluZywgdXNlcnM6IFVzZXJbXSk6IFByb21pc2U8UGFydGljaXBhdGlvblN0YXR1c1tdPiB7XG4gIGNvbnN0IHJlc3VsdHM6IFBhcnRpY2lwYXRpb25TdGF0dXNbXSA9IFtdO1xuXG4gIGNvbnN0IGNoZWNrVXNlciA9IGFzeW5jICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgaWYgKCF1c2VyLmNvZGVDaGVmSGFuZGxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgaGFuZGxlOiBudWxsLFxuICAgICAgICBwYXJ0aWNpcGF0ZWQ6IGZhbHNlLFxuICAgICAgICBlcnJvcjogXCJObyBoYW5kbGVcIlxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gVXNlIHRoZSByYW5raW5nIHNlYXJjaCBBUElcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL3d3dy5jb2RlY2hlZi5jb20vYXBpL3JhbmtpbmdzLyR7Y29udGVzdENvZGV9P2l0ZW1zUGVyUGFnZT0xJnNlYXJjaD0ke3VzZXIuY29kZUNoZWZIYW5kbGV9YCwge1xuICAgICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCJcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlcy5vaykgeyAvLyBDb250ZXN0IG1pZ2h0IGJlIGludmFsaWQgb3Igb3RoZXIgZXJyb3JcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICBoYW5kbGU6IHVzZXIuY29kZUNoZWZIYW5kbGUsXG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGBBUEkgU3RhdHVzOiAke3Jlcy5zdGF0dXN9YFxuICAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICAgIC8vIGRhdGEubGlzdCBjb250YWlucyB0aGUgcm93c1xuICAgICAgLy8gV2Ugc2VhcmNoZWQgZm9yIHRoZSBzcGVjaWZpYyBoYW5kbGUuIElmIGl0J3MgdGhlcmUgYW5kIGV4YWN0IG1hdGNoLi4uXG4gICAgICBjb25zdCBlbnRyeSA9IGRhdGEubGlzdD8uZmluZCgoaXRlbTogYW55KSA9PiBpdGVtLnVzZXJfaGFuZGxlPy50b0xvd2VyQ2FzZSgpID09PSB1c2VyLmNvZGVDaGVmSGFuZGxlPy50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBoYW5kbGU6IHVzZXIuY29kZUNoZWZIYW5kbGUsXG4gICAgICAgICAgcGFydGljaXBhdGVkOiB0cnVlLFxuICAgICAgICAgIHJhbms6IGVudHJ5LnJhbmssXG4gICAgICAgICAgc2NvcmU6IHBhcnNlRmxvYXQoZW50cnkuc2NvcmUpLFxuICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICBwZW5hbHR5OiBlbnRyeS5wZW5hbHR5XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGhhbmRsZTogdXNlci5jb2RlQ2hlZkhhbmRsZSxcbiAgICAgICAgICBwYXJ0aWNpcGF0ZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBoYW5kbGU6IHVzZXIuY29kZUNoZWZIYW5kbGUsXG4gICAgICAgIHBhcnRpY2lwYXRlZDogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlLm1lc3NhZ2VcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gICAvLyBQcm9jZXNzIGluIGNodW5rc1xuICBjb25zdCBjaHVua1NpemUgPSA1O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSArPSBjaHVua1NpemUpIHtcbiAgICBjb25zdCBjaHVuayA9IHVzZXJzLnNsaWNlKGksIGkgKyBjaHVua1NpemUpO1xuICAgIGNvbnN0IGNodW5rUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKGNodW5rLm1hcChjaGVja1VzZXIpKTtcbiAgICByZXN1bHRzLnB1c2goLi4uY2h1bmtSZXN1bHRzKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5cbi8vIC0tLSBNYWluIEFjdGlvbiAtLS1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrRXh0ZXJuYWxQYXJ0aWNpcGF0aW9uKFxuICBwbGF0Zm9ybTogXCJDb2RlRm9yY2VzXCIgfCBcIkxlZXRDb2RlXCIgfCBcIkNvZGVDaGVmXCIsXG4gIGNvbnRlc3RJZGVudGlmaWVyOiBzdHJpbmcsIC8vIElEIGZvciBDRiwgU2x1ZyBmb3IgTEMsIENvZGUgZm9yIENDXG4gIHVzZXJGaWx0ZXJzPzoge1xuICAgICAgaW5zdGl0dXRpb25JZD86IHN0cmluZztcbiAgICAgIGNsYXNzcm9vbUlkPzogc3RyaW5nO1xuICB9XG4pIHtcblxuICAvLyAxLiBGZXRjaCBVc2Vyc1xuICBjb25zdCB3aGVyZTogYW55ID0ge1xuICAgICAgcm9sZTogXCJTVFVERU5UXCIgLy8gTW9zdGx5IHdlIGNhcmUgYWJvdXQgc3R1ZGVudHNcbiAgfTtcblxuICBpZiAodXNlckZpbHRlcnM/Lmluc3RpdHV0aW9uSWQpIHtcbiAgICAgIHdoZXJlLmluc3RpdHV0aW9uSWQgPSB1c2VyRmlsdGVycy5pbnN0aXR1dGlvbklkO1xuICB9XG5cbiAgLy8gTm90ZTogQ2xhc3Nyb29tIGxvZ2ljIG1pZ2h0IG5lZWQgcmVjdXJzaXZlIGZldGNoIGlmIG5vdCBkaXJlY3RseSBvbiB1c2VyLFxuICAvLyBidXQgVXNlciBtb2RlbCBoYXMgYGVucm9sbGVkQ2xhc3Nyb29tc2AuXG4gIGlmICh1c2VyRmlsdGVycz8uY2xhc3Nyb29tSWQpIHtcbiAgICAgIHdoZXJlLmVucm9sbGVkQ2xhc3Nyb29tcyA9IHtcbiAgICAgICAgICBzb21lOiB7XG4gICAgICAgICAgICAgIGlkOiB1c2VyRmlsdGVycy5jbGFzc3Jvb21JZFxuICAgICAgICAgIH1cbiAgICAgIH07XG4gIH1cblxuICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRNYW55KHtcbiAgICB3aGVyZSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgY29kZWZvcmNlc0hhbmRsZTogdHJ1ZSxcbiAgICAgIGxlZXRDb2RlSGFuZGxlOiB0cnVlLFxuICAgICAgY29kZUNoZWZIYW5kbGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHJlc3VsdHM6IFtdIH07XG4gIH1cblxuICBsZXQgcmVzdWx0czogUGFydGljaXBhdGlvblN0YXR1c1tdID0gW107XG5cbiAgdHJ5IHtcbiAgICAgIGlmIChwbGF0Zm9ybSA9PT0gXCJDb2RlRm9yY2VzXCIpIHtcbiAgICAgICAgICByZXN1bHRzID0gYXdhaXQgY2hlY2tDb2RlZm9yY2VzUGFydGljaXBhdGlvbihjb250ZXN0SWRlbnRpZmllciwgdXNlcnMgYXMgVXNlcltdKTtcbiAgICAgIH0gZWxzZSBpZiAocGxhdGZvcm0gPT09IFwiTGVldENvZGVcIikge1xuICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCBjaGVja0xlZXRDb2RlUGFydGljaXBhdGlvbihjb250ZXN0SWRlbnRpZmllciwgdXNlcnMgYXMgVXNlcltdKTtcbiAgICAgIH0gZWxzZSBpZiAocGxhdGZvcm0gPT09IFwiQ29kZUNoZWZcIikge1xuICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCBjaGVja0NvZGVDaGVmUGFydGljaXBhdGlvbihjb250ZXN0SWRlbnRpZmllciwgdXNlcnMgYXMgVXNlcltdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgcmVzdWx0cyB9O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2hlY2sgcGFydGljaXBhdGlvbiBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVRBMlRzQiJ9
}),
"[project]/components/classroom/contests/ContestVerificationTab.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContestVerificationTab",
    ()=>ContestVerificationTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$237b10__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:237b10 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9821a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:9821a3 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$4ee4dd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:4ee4dd [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
"use client";
;
;
;
;
;
function ContestVerificationTab({ classroomId }) {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("internal");
    // Recent Contests Data
    const [recentInternal, setRecentInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recentExternal, setRecentExternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isFetchingRecents, setIsFetchingRecents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Internal State
    const [internalContestId, setInternalContestId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [internalResults, setInternalResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // External State
    const [platform, setPlatform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("CodeForces");
    const [externalContestId, setExternalContestId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [externalResults, setExternalResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchRecents() {
            setIsFetchingRecents(true);
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9821a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentContests"])(classroomId);
            if (res.success) {
                setRecentInternal(res.internal);
                setRecentExternal(res.external);
            }
            setIsFetchingRecents(false);
        }
        fetchRecents();
    }, [
        classroomId
    ]);
    const handleInternalCheck = async ()=>{
        if (!internalContestId) {
            setError("Please enter a Contest ID");
            return;
        }
        setIsLoading(true);
        setError("");
        setInternalResults(null);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$237b10__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkInternalContestParticipation"])(internalContestId, classroomId);
        if (res.success) {
            setInternalResults(res.results);
        } else {
            setError(res.error || "Failed to fetch data");
        }
        setIsLoading(false);
    };
    const handleExternalCheck = async ()=>{
        if (!externalContestId) {
            setError("Please enter a Contest ID/Slug");
            return;
        }
        setIsLoading(true);
        setError("");
        setExternalResults(null);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$4ee4dd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkExternalParticipation"])(platform, externalContestId, {
            classroomId
        });
        if (res.success) {
            setExternalResults(res.results);
        } else {
            setError(res.error || "Failed to fetch data");
        }
        setIsLoading(false);
    };
    const handleSelectRecentInternal = (id)=>{
        setInternalContestId(id);
    };
    const handleSelectRecentExternal = (id, site)=>{
        setExternalContestId(id);
        if (site === "CodeForces") setPlatform("CodeForces");
        if (site === "CodeChef") setPlatform("CodeChef");
        if (site === "LeetCode") setPlatform("LeetCode");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-900 dark:text-white",
                                children: "Contest Participation Verification"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 98,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 dark:text-gray-400",
                                children: "Verify if your students attended internal or external contests."
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 99,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex bg-gray-100 dark:bg-[#1a1a1a] p-1 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode("internal"),
                                className: `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "internal" ? "bg-white dark:bg-[#262626] text-orange-600 dark:text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"}`,
                                children: "Internal"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 103,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode("external"),
                                className: `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "external" ? "bg-white dark:bg-[#262626] text-orange-600 dark:text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"}`,
                                children: "External"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 113,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 102,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm",
                children: [
                    mode === "internal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block",
                                        children: "Recently Completed"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 132,
                                        columnNumber: 30
                                    }, this),
                                    isFetchingRecents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-lg animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 134,
                                        columnNumber: 34
                                    }, this) : recentInternal.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                                        children: recentInternal.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSelectRecentInternal(c.id),
                                                className: `text-left px-3 py-2 rounded-lg border text-sm transition-all ${internalContestId === c.id ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400" : "border-gray-200 dark:border-[#333] hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-[#1a1a1a]"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium truncate",
                                                        children: c.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 46
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500 dark:text-gray-400",
                                                        children: new Date(c.endTime).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 46
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 138,
                                                columnNumber: 42
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 136,
                                        columnNumber: 34
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-400 italic",
                                        children: "No recent contests found."
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 153,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 131,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row gap-4 items-end pt-4 border-t border-gray-100 dark:border-[#262626]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2 w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                                children: "Algo-Fox Contest ID"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: internalContestId,
                                                        onChange: (e)=>setInternalContestId(e.target.value),
                                                        placeholder: "Enter manually or select above...",
                                                        className: "w-full h-10 pl-10 pr-3 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 160,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 158,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleInternalCheck,
                                        disabled: isLoading,
                                        className: "w-full md:w-auto px-6 h-10 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50",
                                        children: [
                                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 176,
                                                columnNumber: 46
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 176,
                                                columnNumber: 93
                                            }, this),
                                            "Check"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 171,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 157,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 129,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block",
                                        children: "Recently Completed (External)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 185,
                                        columnNumber: 30
                                    }, this),
                                    isFetchingRecents ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-full bg-gray-50 dark:bg-[#1a1a1a] rounded-lg animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 187,
                                        columnNumber: 34
                                    }, this) : recentExternal.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto",
                                        children: recentExternal.map((c)=>{
                                            // Parse ID correctly for filling input
                                            // Format returned by API: "leetcode-weekly-contest-390"
                                            const parts = c.id.split('-');
                                            const site = parts[0] === "leetcode" ? "LeetCode" : parts[0] === "codeforces" ? "CodeForces" : "CodeChef";
                                            const realId = parts.slice(1).join('-');
                                            // For Codeforces, realId is contest ID. For LeetCode, slug. For CodeChef, code.
                                            // The API returns normalized IDs.
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSelectRecentExternal(realId, site),
                                                className: `text-left px-3 py-2 rounded-lg border text-sm transition-all ${externalContestId === realId && platform === site ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400" : "border-gray-200 dark:border-[#333] hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-[#1a1a1a]"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${site === "LeetCode" ? "bg-yellow-100 text-yellow-700" : site === "CodeForces" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`,
                                                                children: site
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-400",
                                                                children: new Date(c.end_time).toLocaleDateString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium truncate",
                                                        title: c.name,
                                                        children: c.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 201,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 189,
                                        columnNumber: 34
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-400 italic",
                                        children: "No recent external contests found."
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 226,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 184,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row gap-4 items-end pt-4 border-t border-gray-100 dark:border-[#262626]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 w-full md:w-48",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                                children: "Platform"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 232,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: platform,
                                                onChange: (e)=>setPlatform(e.target.value),
                                                className: "w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "CodeForces",
                                                        children: "CodeForces"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "LeetCode",
                                                        children: "LeetCode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "CodeChef",
                                                        children: "CodeChef"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 233,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 231,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-2 w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                                children: platform === "CodeForces" ? "Contest ID" : platform === "LeetCode" ? "Contest Slug" : "Contest Code"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 244,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: externalContestId,
                                                        onChange: (e)=>setExternalContestId(e.target.value),
                                                        placeholder: platform === "CodeForces" ? "e.g. 1950" : platform === "LeetCode" ? "e.g. weekly-contest-390" : "e.g. START128",
                                                        className: "w-full h-10 pl-10 pr-3 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 247,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 243,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleExternalCheck,
                                        disabled: isLoading,
                                        className: "w-full md:w-auto px-6 h-10 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50",
                                        children: [
                                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-4 h-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 267,
                                                columnNumber: 46
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 267,
                                                columnNumber: 93
                                            }, this),
                                            "Check"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 262,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 230,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 182,
                        columnNumber: 21
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 277,
                                columnNumber: 25
                            }, this),
                            error
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 276,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, this),
            mode === "internal" && internalResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-b border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]/50 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-gray-900 dark:text-white",
                                children: [
                                    "Results (",
                                    internalResults.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 287,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-600 dark:text-green-500 font-medium",
                                        children: [
                                            internalResults.filter((r)=>r.participated).length,
                                            " Present"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 289,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600 dark:text-red-500 font-medium",
                                        children: [
                                            internalResults.filter((r)=>!r.participated).length,
                                            " Absent"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 292,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 288,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 286,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-[#262626]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Student"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 301,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 302,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 303,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Score"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 304,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Solved"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 305,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Finished At"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 306,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 300,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                    lineNumber: 299,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-200 dark:divide-[#262626]",
                                    children: internalResults.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 font-medium text-gray-900 dark:text-white",
                                                    children: r.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 text-gray-500 dark:text-gray-400",
                                                    children: r.email
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3",
                                                    children: r.participated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
                                                        children: "Present"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 49
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
                                                        children: "Absent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 font-mono",
                                                    children: r.score
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 font-mono",
                                                    children: r.problemsSolved
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 text-gray-500 dark:text-gray-400",
                                                    children: r.finishedAt ? new Date(r.finishedAt).toLocaleString() : "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, r.userId, true, {
                                            fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                            lineNumber: 311,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                    lineNumber: 309,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                            lineNumber: 298,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 297,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                lineNumber: 285,
                columnNumber: 17
            }, this),
            mode === "external" && externalResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-b border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]/50 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-gray-900 dark:text-white",
                                children: [
                                    "Results (",
                                    externalResults.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 342,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-600 dark:text-green-500 font-medium",
                                        children: [
                                            externalResults.filter((r)=>r.participated).length,
                                            " Present"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 344,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600 dark:text-red-500 font-medium",
                                        children: [
                                            externalResults.filter((r)=>!r.participated).length,
                                            " Absent"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 347,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                lineNumber: 343,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 341,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-[#262626]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Student"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 356,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Handle"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 357,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 358,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Rank"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 359,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3",
                                                children: "Details"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                lineNumber: 360,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                        lineNumber: 355,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                    lineNumber: 354,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-200 dark:divide-[#262626]",
                                    children: externalResults.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 font-medium text-gray-900 dark:text-white",
                                                    children: r.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 text-gray-500 dark:text-gray-400 font-mono",
                                                    children: r.handle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: platform === "CodeForces" ? `https://codeforces.com/profile/${r.handle}` : platform === "LeetCode" ? `https://leetcode.com/u/${r.handle}` : `https://www.codechef.com/users/${r.handle}`,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "hover:text-orange-500 flex items-center gap-1",
                                                        children: [
                                                            r.handle,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 49
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400 italic",
                                                        children: "Not linked"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3",
                                                    children: r.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
                                                        children: "Error"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 49
                                                    }, this) : r.participated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
                                                        children: "Participated"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 49
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
                                                        children: "Absent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 49
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 42
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 text-gray-600 dark:text-gray-400",
                                                    children: r.rank ? `#${r.rank}` : "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-3 text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate",
                                                    children: r.error ? r.error : JSON.stringify(r.details || {})
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, r.userId, true, {
                                            fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                            lineNumber: 365,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                                    lineNumber: 363,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                            lineNumber: 353,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                        lineNumber: 352,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
                lineNumber: 340,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/contests/ContestVerificationTab.tsx",
        lineNumber: 95,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/classroom/ClassroomDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClassroomDashboard",
    ()=>ClassroomDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/ClassroomSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomLeaderboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/ClassroomLeaderboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$LiveTracking$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/LiveTracking.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$AssignmentsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/assignments/AssignmentsTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$contests$2f$ContestVerificationTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/contests/ContestVerificationTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
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
function ClassroomDashboard({ classroom, currentUserId }) {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('leaderboard');
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isTeacher = classroom.teacher.id === currentUserId;
    const handleCopyLink = ()=>{
        const url = `${window.location.origin}/join-classroom/${classroom.joinCode}`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Invitation link copied to clipboard");
        setTimeout(()=>setIsCopied(false), 2000);
    };
    const handleDownload = ()=>{
        const headers = [
            "Rank",
            "Student ID",
            "Name",
            "Total Score"
        ];
        const rows = classroom.students.map((s, i)=>[
                i + 1,
                s.id,
                s.name || "Anonymous",
                s.totalScore
            ]);
        const csvContent = [
            headers.join(","),
            ...rows.map((r)=>r.join(","))
        ].join("\n");
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${classroom.name.replace(/\s+/g, '_')}_leaderboard.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-h-screen ${isTeacher ? 'pl-0 md:pl-72' : ''}`,
        children: [
            isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClassroomSidebar"], {
                activeTab: activeTab,
                onTabChange: setActiveTab,
                onDownload: handleDownload,
                showDownload: activeTab === 'leaderboard',
                isTeacher: isTeacher,
                classroomName: classroom.name
            }, void 0, false, {
                fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                lineNumber: 78,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `bg-gray-50/30 dark:bg-[#0a0a0a] min-h-screen ${isTeacher ? '' : 'max-w-7xl mx-auto px-6'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `pt-24 pb-8 border-b border-gray-100 dark:border-[#262626] ${isTeacher ? 'px-8 md:px-12' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: isTeacher ? "" : "max-w-7xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/classrooms",
                                            className: "hover:text-orange-600 dark:hover:text-orange-500",
                                            children: "Classrooms"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                            lineNumber: 93,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-900 dark:text-white",
                                            children: classroom.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                            lineNumber: 95,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row md:items-end justify-between gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4",
                                                    children: classroom.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-x-8 gap-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1",
                                                                    children: "Instructor"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 105,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-5 h-5 bg-orange-100 dark:bg-orange-500/10 rounded text-[10px] flex items-center justify-center text-orange-600 dark:text-orange-500",
                                                                            children: classroom.teacher.name?.charAt(0).toUpperCase()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                            lineNumber: 107,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        classroom.teacher.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 106,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1",
                                                                    children: "Subject"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 114,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900 dark:text-gray-200",
                                                                    children: classroom.subject || "Logic & Coding"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 115,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1",
                                                                    children: "Section"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900 dark:text-gray-200",
                                                                    children: classroom.section || "General"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 37
                                                        }, this),
                                                        isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1",
                                                                    children: "Join Link"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleCopyLink,
                                                                    className: "flex items-center gap-2 group",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-mono font-black text-orange-600 tracking-wider",
                                                                            children: classroom.joinCode
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                            lineNumber: 128,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-all",
                                                                            children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                className: "w-3.5 h-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                                lineNumber: 132,
                                                                                columnNumber: 65
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "w-3.5 h-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                                lineNumber: 132,
                                                                                columnNumber: 101
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                            lineNumber: 131,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                                    lineNumber: 124,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/problems",
                                                className: "px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 transition-all shadow-xl shadow-gray-200 dark:shadow-none",
                                                children: "Solve Problems"
                                            }, void 0, false, {
                                                fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                                lineNumber: 141,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                            lineNumber: 140,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 98,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                            lineNumber: 91,
                            columnNumber: 22
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                        lineNumber: 90,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `py-12 ${isTeacher ? 'px-8 md:px-12' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: [
                                activeTab === 'leaderboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.25
                                    },
                                    className: `bg-white dark:bg-[#141414] rounded-2xl ${isTeacher ? "border-2 border-orange-50 dark:border-[#262626]" : "border border-gray-100 dark:border-[#262626] shadow-xl dark:shadow-none"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$ClassroomLeaderboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClassroomLeaderboard"], {
                                        students: classroom.students,
                                        isTeacher: isTeacher,
                                        classroomId: classroom.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                        lineNumber: 166,
                                        columnNumber: 33
                                    }, this)
                                }, "leaderboard", false, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 156,
                                    columnNumber: 29
                                }, this),
                                activeTab === 'assignments' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.25
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$assignments$2f$AssignmentsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssignmentsTab"], {
                                        classroomId: classroom.id,
                                        isTeacher: isTeacher
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                        lineNumber: 181,
                                        columnNumber: 33
                                    }, this)
                                }, "assignments", false, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 174,
                                    columnNumber: 29
                                }, this),
                                activeTab === 'contests' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.25
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$contests$2f$ContestVerificationTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContestVerificationTab"], {
                                        classroomId: classroom.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                        lineNumber: 192,
                                        columnNumber: 33
                                    }, this)
                                }, "contests", false, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 185,
                                    columnNumber: 29
                                }, this),
                                activeTab === 'tracking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.25
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$LiveTracking$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveTracking"], {
                                        classroomId: classroom.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                        lineNumber: 203,
                                        columnNumber: 33
                                    }, this)
                                }, "tracking", false, {
                                    fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                                    lineNumber: 196,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                            lineNumber: 154,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                        lineNumber: 153,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/classroom/ClassroomDashboard.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_7d7126d5._.js.map