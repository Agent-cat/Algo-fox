(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/classroom/TeacherClassroomList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeacherClassroomList",
    ()=>TeacherClassroomList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TeacherClassroomList({ classrooms }) {
    _s();
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const copyLink = (code, id)=>{
        const url = `${window.location.origin}/join-classroom/${code}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Join link copied!");
        setTimeout(()=>setCopiedId(null), 2000);
    };
    if (classrooms.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-20 bg-gray-50/50 dark:bg-[#141414] rounded-2xl border border-dashed border-gray-200 dark:border-[#262626]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2",
                    children: "No Active Classrooms"
                }, void 0, false, {
                    fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                    lineNumber: 37,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 dark:text-gray-400 font-medium",
                    children: "Create your first learning environment above."
                }, void 0, false, {
                    fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        children: classrooms.map((classroom)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "group flex flex-col bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] p-6 rounded-md hover:border-orange-500 dark:hover:border-orange-500 shadow-sm dark:shadow-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1",
                                        children: "Classroom"
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                        lineNumber: 52,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-black dark:text-white group-hover:text-orange-600 transition-colors",
                                        children: classroom.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                        lineNumber: 55,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 51,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase rounded",
                                children: [
                                    classroom._count.students,
                                    " Students"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                        lineNumber: 50,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow flex flex-wrap gap-2 mb-6",
                        children: [
                            classroom.subject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] rounded",
                                children: classroom.subject
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 66,
                                columnNumber: 29
                            }, this),
                            classroom.section && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] rounded",
                                children: [
                                    "Sec ",
                                    classroom.section
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 71,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                        lineNumber: 64,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 pt-4 border-t border-gray-50 dark:border-[#262626]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase block",
                                            children: "Join Link"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                            lineNumber: 80,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>copyLink(classroom.joinCode, classroom.id),
                                            className: "text-lg font-bold font-mono text-black dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors",
                                            children: [
                                                classroom.joinCode,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-[8px] font-bold text-orange-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity",
                                                    children: copiedId === classroom.id ? "Copied" : "Copy Link"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                            lineNumber: 81,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                    lineNumber: 79,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 78,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/dashboard/classrooms/${classroom.id}`,
                                className: "w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-center font-bold text-xs uppercase rounded-md hover:bg-orange-600 dark:hover:bg-gray-200 transition-all",
                                children: "Open"
                            }, void 0, false, {
                                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this)
                ]
            }, classroom.id, true, {
                fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
                lineNumber: 46,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/classroom/TeacherClassroomList.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_s(TeacherClassroomList, "CRg2u1n5hA3yKxdjOouDlqFGZY4=");
_c = TeacherClassroomList;
var _c;
__turbopack_context__.k.register(_c, "TeacherClassroomList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:f46ad5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"403750cd613b34ea87612c7694cf246e6b79128ea4":"createClassroom"},"actions/classroom.ts",""] */ __turbopack_context__.s([
    "createClassroom",
    ()=>createClassroom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var createClassroom = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("403750cd613b34ea87612c7694cf246e6b79128ea4", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createClassroom"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2xhc3Nyb29tLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgcmVkaXMgZnJvbSBcIkAvbGliL3JlZGlzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGgsIHJldmFsaWRhdGVUYWcsIHVuc3RhYmxlX2NhY2hlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcbmltcG9ydCB7IGNhY2hlS2V5LCBjYWNoZWRGZXRjaCwgQ0FDSEVfQ09ORklHLCBkZWxldGVGcm9tQ2FjaGUgfSBmcm9tIFwiQC9saWIvY2FjaGUtdXRpbHNcIjtcblxuY29uc3QgY2xhc3Nyb29tU2NoZW1hID0gei5vYmplY3Qoe1xuICAgIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiKSxcbiAgICBzZWN0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBzdWJqZWN0OiB6LnN0cmluZygpLm9wdGlvbmFsKCkub3Ioei5saXRlcmFsKFwiXCIpKSxcbiAgICBpbnN0aXR1dGlvbklkOiB6LnN0cmluZygpLFxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSm9pbkNvZGUoKSB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OVwiO1xuICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjbGFzc3Jvb20uXG4gKiBPbmx5IEFETUlOLCBJTlNUSVRVVElPTl9NQU5BR0VSLCBvciBURUFDSEVSIHJvbGVzIGNhbiBjcmVhdGUgY2xhc3Nyb29tcy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzcm9vbShkYXRhOiB6LmluZmVyPHR5cGVvZiBjbGFzc3Jvb21TY2hlbWE+KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSBzZXNzaW9uLnVzZXIgYXMgYW55O1xuXG4gICAgLy8gU2VjdXJpdHkgY2hlY2tcbiAgICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiLCBcIlRFQUNIRVJcIl0uaW5jbHVkZXMoY3VycmVudFVzZXIucm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZC4gT25seSB0ZWFjaGVycyBvciBtYW5hZ2VycyBjYW4gY3JlYXRlIGNsYXNzcm9vbXMuXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWREYXRhID0gY2xhc3Nyb29tU2NoZW1hLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSA2LWNoYXJhY3RlciBqb2luIGNvZGVcbiAgICAgICAgbGV0IGpvaW5Db2RlID0gXCJcIjtcbiAgICAgICAgbGV0IGlzVW5pcXVlID0gZmFsc2U7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlICghaXNVbmlxdWUgJiYgYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgam9pbkNvZGUgPSBnZW5lcmF0ZUpvaW5Db2RlKCk7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgam9pbkNvZGUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFleGlzdGluZykgaXNVbmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNVbmlxdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgam9pbiBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGFzc3Jvb20gPSBhd2FpdCBwcmlzbWEuY2xhc3Nyb29tLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsaWRhdGVkRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNlY3Rpb246IHZhbGlkYXRlZERhdGEuc2VjdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IHZhbGlkYXRlZERhdGEuc3ViamVjdCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIGpvaW5Db2RlLFxuICAgICAgICAgICAgICAgIGluc3RpdHV0aW9uSWQ6IHZhbGlkYXRlZERhdGEuaW5zdGl0dXRpb25JZCxcbiAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW52YWxpZGF0ZSByZWxldmFudCBjYWNoZXNcbiAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdGVhY2hlci1jbGFzc3Jvb21zLSR7Y3VycmVudFVzZXIuaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGluc3RpdHV0aW9uLWNsYXNzcm9vbXMtJHt2YWxpZGF0ZWREYXRhLmluc3RpdHV0aW9uSWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9pbnN0aXR1dGlvbi9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYXNzcm9vbSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuaXNzdWVzWzBdLm1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogQWxsb3dzIGEgc3R1ZGVudCB0byBqb2luIGEgY2xhc3Nyb29tIHVzaW5nIGEgNi1jaGFyYWN0ZXIgY29kZS5cbiAqIEFsc28gb25ib2FyZHMgdGhlIHN0dWRlbnQgdG8gdGhlIGluc3RpdHV0aW9uIGlmIHRoZXkgYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2luQ2xhc3Nyb29tKGNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogY3VycmVudFVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnZhbGlkIGpvaW4gY29kZS5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiWW91IGFyZSBhbHJlYWR5IGVucm9sbGVkIGluIHRoaXMgY2xhc3Nyb29tLlwiIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluc3RpdHV0aW9uIENoZWNrOlxuICAgICAgICAvLyAxLiBJZiB1c2VyIGJlbG9uZ3MgdG8gYW4gaW5zdGl0dXRpb24sIHRoZXkgY2FuIG9ubHkgam9pbiBjbGFzc3Jvb21zIGZyb20gVEhBVCBpbnN0aXR1dGlvbi5cbiAgICAgICAgLy8gMi4gSWYgdXNlciBoYXMgTk8gaW5zdGl0dXRpb24sIHRoZXkgYXJlIGFzc2lnbmVkIHRvIHRoaXMgY2xhc3Nyb29tJ3MgaW5zdGl0dXRpb24uXG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyLmluc3RpdHV0aW9uSWQgJiYgY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCAhPT0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQpIHtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIllvdSBjYW5ub3Qgam9pbiB0aGlzIGNsYXNzcm9vbSBiZWNhdXNlIGl0IGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgaW5zdGl0dXRpb24uXCJcbiAgICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHN0dWRlbnQgdG8gY2xhc3Nyb29tXG4gICAgICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb20uaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7IGlkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmJvYXJkIHN0dWRlbnQgdG8gaW5zdGl0dXRpb24gaWYgbnVsbFxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBvbmJvYXJkaW5nQ29tcGxldGVkOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghY3VycmVudFVzZXIuaW5zdGl0dXRpb25JZCkge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5pbnN0aXR1dGlvbklkID0gY2xhc3Nyb29tLmluc3RpdHV0aW9uSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGN1cnJlbnRVc2VyLmlkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWRpcyBJbnRlZ3JhdGlvbjogQ2FjaGUgc3R1ZGVudCBJRHMgcGVyIGNsYXNzcm9vbVxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb20uaWR9YDtcbiAgICAgICAgYXdhaXQgcmVkaXMuc2FkZChyZWRpc0tleSwgY3VycmVudFVzZXIuaWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYHN0dWRlbnQtY2xhc3Nyb29tcy0ke2N1cnJlbnRVc2VyLmlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBjbGFzc3Jvb20tJHtjbGFzc3Jvb20uaWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9jbGFzc3Jvb21zXCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBTdWNjZXNzZnVsbHkgam9pbmVkICR7Y2xhc3Nyb29tLm5hbWV9YCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gam9pbiBjbGFzc3Jvb206XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBqb2luIGNsYXNzcm9vbVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYmFzaWMgZGV0YWlscyBvZiBhIGNsYXNzcm9vbSBieSBpdHMgam9pbiBjb2RlLlxuICogVXNlZCBmb3IgdGhlIGpvaW4gY2xhc3Nyb29tIHBhZ2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDbGFzc3Jvb21CeUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGpvaW5Db2RlOiBjb2RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogeyBzdHVkZW50czogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0Vucm9sbGVkID0gc2Vzc2lvbj8udXNlciA/IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZEZpcnN0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNsYXNzcm9vbS5pZCxcbiAgICAgICAgICAgICAgICBzdHVkZW50czogeyBzb21lOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBpc0Vucm9sbGVkOiAhIWlzRW5yb2xsZWRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBieSBjb2RlOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2xhc3Nyb29tXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIGNyZWF0ZWQgYnkgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdGVhY2hlciAoQ0FDSEVEKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlYWNoZXJDbGFzc3Jvb21zKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNvbnN0IGZldGNoQ2xhc3Nyb29tcyA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgdGVhY2hlcklkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IHN0dWRlbnRzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSxcbiAgICAgICAgeyB0YWdzOiBbYHRlYWNoZXItY2xhc3Nyb29tcy0ke3VzZXJJZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tcyA9IGF3YWl0IGZldGNoQ2xhc3Nyb29tcygpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjbGFzc3Jvb21zIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB0ZWFjaGVyIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRmV0Y2hlcyBjbGFzc3Jvb21zIHdoZXJlIHRoZSBjdXJyZW50bHkgbG9nZ2VkLWluIHN0dWRlbnQgaXMgZW5yb2xsZWQgKENBQ0hFRCkuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50Q2xhc3Nyb29tcygpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyPy5lbnJvbGxlZENsYXNzcm9vbXMgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLFxuICAgICAgICB7IHRhZ3M6IFtgc3R1ZGVudC1jbGFzc3Jvb21zLSR7dXNlcklkfWBdLCByZXZhbGlkYXRlOiAxMjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjbGFzc3Jvb21zID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNsYXNzcm9vbXMgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHN0dWRlbnQgY2xhc3Nyb29tczpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbXNcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBGZXRjaGVzIGRldGFpbHMgb2YgYSBzcGVjaWZpYyBjbGFzc3Jvb20sIGluY2x1ZGluZyB0aGUgc3R1ZGVudCBsaXN0IGZvciB0aGUgbGVhZGVyYm9hcmQgKENBQ0hFRCkuXG4gKiBTdXBwb3J0cyBwYWdpbmF0aW9uIGZvciBsYXJnZSBzdHVkZW50IGxpc3RzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2xhc3Nyb29tV2l0aFN0dWRlbnRzKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBsaW1pdDogbnVtYmVyID0gNTBcbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbSA9IHVuc3RhYmxlX2NhY2hlKFxuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbY2xhc3Nyb29tLCB0b3RhbFN0dWRlbnRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgam9pbkNvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tpbmdTdGFydGVkQXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGlkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2NvcmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyB0b3RhbFNjb3JlOiBcImRlc2NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByaXNtYS51c2VyLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucm9sbGVkQ2xhc3Nyb29tczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6IHsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBjbGFzc3Jvb20sIHRvdGFsU3R1ZGVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BjbGFzc3Jvb20tJHtpZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BjbGFzc3Jvb20tJHtpZH1gXSwgcmV2YWxpZGF0ZTogNjAgfVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsYXNzcm9vbSwgdG90YWxTdHVkZW50cyB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb20oKTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBjbGFzc3Jvb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsU3R1ZGVudHMsXG4gICAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbFN0dWRlbnRzIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGNsYXNzcm9vbSBkZXRhaWw6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21cIiB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzcm9vbVRyYWNraW5nKGNsYXNzcm9vbUlkOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcblxuICAgIGNvbnN0IGNsYXNzcm9vbSA9IGF3YWl0IHByaXNtYS5jbGFzc3Jvb20uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICBzZWxlY3Q6IHsgdGVhY2hlcklkOiB0cnVlIH1cbiAgICB9KTtcblxuICAgIGlmICghY2xhc3Nyb29tIHx8IChjbGFzc3Jvb20udGVhY2hlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQgJiYgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgIT09IFwiQURNSU5cIikpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkFjY2VzcyBkZW5pZWRcIiB9O1xuICAgIH1cblxuICAgIGF3YWl0IHByaXNtYS5jbGFzc3Jvb20udXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmdBY3RpdmU6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBhY3RpdmUgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBkZWxldGVGcm9tQ2FjaGUoY2FjaGVLZXkoXCJsaXZlLXRyYWNraW5nXCIsIGNsYXNzcm9vbUlkKSk7XG4gICAgcmV2YWxpZGF0ZVRhZyhgY2xhc3Nyb29tLSR7Y2xhc3Nyb29tSWR9YCwgXCJtYXhcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY2xhc3Nyb29tcy8ke2NsYXNzcm9vbUlkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENsYXNzcm9vbUxpdmVUcmFja2luZyhjbGFzc3Jvb21JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuXG4gICAgLy8gVXNlIFJlZGlzIGNhY2hlIGZvciBsaXZlIHRyYWNraW5nIGRhdGEgKHNob3J0IFRUTClcbiAgICBjb25zdCBjYWNoZUtleU5hbWUgPSBjYWNoZUtleShcImxpdmUtdHJhY2tpbmdcIiwgY2xhc3Nyb29tSWQpO1xuXG4gICAgY29uc3QgZmV0Y2hUcmFja2luZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaXNUcmFja2luZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja2luZ1N0YXJ0ZWRBdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHVkZW50czoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIlNVQk1JVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmxlbTogeyBzZWxlY3Q6IHsgdGl0bGU6IHRydWUgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gRmlsdGVyIHN1Ym1pc3Npb25zIGlmIHRyYWNraW5nIGlzIGFjdGl2ZVxuICAgICAgICBjb25zdCBzdHVkZW50c0RhdGEgPSBjbGFzc3Jvb20uc3R1ZGVudHMubWFwKHN0dWRlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTdWJtaXNzaW9ucyA9IHN0dWRlbnQuc3VibWlzc2lvbnMuZmlsdGVyKHN1YiA9PlxuICAgICAgICAgICAgICAgIGNsYXNzcm9vbS5pc1RyYWNraW5nQWN0aXZlICYmXG4gICAgICAgICAgICAgICAgY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgICAgbmV3IERhdGUoc3ViLmNyZWF0ZWRBdCkgPj0gbmV3IERhdGUoY2xhc3Nyb29tLnRyYWNraW5nU3RhcnRlZEF0KVxuICAgICAgICAgICAgKS5tYXAoc3ViID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICAgICAgICBjb2RlOiBzdWIuY29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN1Yi5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcHJvYmxlbVRpdGxlOiBzdWIucHJvYmxlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHN1Yi5jcmVhdGVkQXRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHN0dWRlbnQuaW1hZ2UsXG4gICAgICAgICAgICAgICAgc3VibWlzc2lvbnM6IGZpbHRlcmVkU3VibWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1RyYWNraW5nQWN0aXZlOiBjbGFzc3Jvb20uaXNUcmFja2luZ0FjdGl2ZSxcbiAgICAgICAgICAgIHRyYWNraW5nU3RhcnRlZEF0OiBjbGFzc3Jvb20udHJhY2tpbmdTdGFydGVkQXQsXG4gICAgICAgICAgICBzdHVkZW50czogc3R1ZGVudHNEYXRhXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjYWNoZWRGZXRjaChjYWNoZUtleU5hbWUsIGZldGNoVHJhY2tpbmcsIENBQ0hFX0NPTkZJRy5TSE9SVC50dGwpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBsaXZlIHRyYWNraW5nOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdHJhY2tpbmcgZGF0YVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEZldGNoZXMgYWxsIGNsYXNzcm9vbXMgZm9yIGFuIGluc3RpdHV0aW9uIChDQUNIRUQgd2l0aCBwYWdpbmF0aW9uKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluc3RpdHV0aW9uQ2xhc3Nyb29tcyhwYWdlOiBudW1iZXIgPSAxLCBsaW1pdDogbnVtYmVyID0gMjApIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VXNlciA9IHNlc3Npb24udXNlciBhcyBhbnk7XG5cbiAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gXCJBRE1JTlwiICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09IFwiSU5TVElUVVRJT05fTUFOQUdFUlwiKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RpdHV0aW9uSWQgPSBjdXJyZW50VXNlci5pbnN0aXR1dGlvbklkO1xuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXQ7XG5cbiAgICBjb25zdCBmZXRjaENsYXNzcm9vbXMgPSB1bnN0YWJsZV9jYWNoZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2NsYXNzcm9vbXMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwcmlzbWEuY2xhc3Nyb29tLmZpbmRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaW5zdGl0dXRpb25JZCB9LFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgc3R1ZGVudHM6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZTogbGltaXQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHJpc21hLmNsYXNzcm9vbS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGluc3RpdHV0aW9uSWQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgY2xhc3Nyb29tcywgdG90YWwgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH0tcGFnZS0ke3BhZ2V9YF0sXG4gICAgICAgIHsgdGFnczogW2BpbnN0aXR1dGlvbi1jbGFzc3Jvb21zLSR7aW5zdGl0dXRpb25JZH1gXSwgcmV2YWxpZGF0ZTogMTIwIH1cbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc3Jvb21zLCB0b3RhbCB9ID0gYXdhaXQgZmV0Y2hDbGFzc3Jvb21zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgY2xhc3Nyb29tcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsIC8gbGltaXQpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHBhZ2UsXG4gICAgICAgICAgICAgICAgbGltaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluc3RpdHV0aW9uIGNsYXNzcm9vbXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBjbGFzc3Jvb21zXCIgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTdHVkZW50RnJvbUNsYXNzcm9vbShjbGFzc3Jvb21JZDogc3RyaW5nLCBzdHVkZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gc2Vzc2lvbi51c2VyIGFzIGFueTtcbiAgICBjb25zdCBpc1Bvd2VyZnVsID0gW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2xhc3Nyb29tID0gYXdhaXQgcHJpc21hLmNsYXNzcm9vbS5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBjbGFzc3Jvb21JZCB9LFxuICAgICAgICAgICAgc2VsZWN0OiB7IHRlYWNoZXJJZDogdHJ1ZSwgaW5zdGl0dXRpb25JZDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkNsYXNzcm9vbSBub3QgZm91bmRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBhbGxvdyBpZiBwb3dlcmZ1bCByb2xlIE9SIGlmIGN1cnJlbnQgdXNlciBpcyB0aGUgdGVhY2hlclxuICAgICAgICBpZiAoIWlzUG93ZXJmdWwgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCAhPT0gY3VycmVudFVzZXIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmNsYXNzcm9vbS51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGNsYXNzcm9vbUlkIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogeyBpZDogc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIFJlZGlzIHNldFxuICAgICAgICBjb25zdCByZWRpc0tleSA9IGBjbGFzc3Jvb206c3R1ZGVudHM6JHtjbGFzc3Jvb21JZH1gO1xuICAgICAgICBhd2FpdCByZWRpcy5zcmVtKHJlZGlzS2V5LCBzdHVkZW50SWQpO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgY2FjaGVzXG4gICAgICAgIHJldmFsaWRhdGVUYWcoYGNsYXNzcm9vbS0ke2NsYXNzcm9vbUlkfWAsIFwibWF4XCIpO1xuICAgICAgICByZXZhbGlkYXRlVGFnKGBzdHVkZW50LWNsYXNzcm9vbXMtJHtzdHVkZW50SWR9YCwgXCJtYXhcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NsYXNzcm9vbXMvJHtjbGFzc3Jvb21JZH1gKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW1vdmUgc3R1ZGVudDpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHJlbW92ZSBzdHVkZW50XCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjZSQThCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/classroom/CreateClassroomDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateClassroomDialog",
    ()=>CreateClassroomDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f46ad5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f46ad5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/schemas.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const classroomSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(2, "Name must be at least 2 characters"),
    section: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]("")),
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]("")),
    institutionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Institution is required")
});
function CreateClassroomDialog({ isOpen, onClose, institutionId }) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { register, handleSubmit, formState: { errors }, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(classroomSchema),
        defaultValues: {
            name: "",
            section: "",
            subject: "",
            institutionId: institutionId
        }
    });
    const onSubmit = async (data)=>{
        setIsLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f46ad5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createClassroom"])(data);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Classroom created successfully!");
                reset();
                onClose();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to create classroom");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-[#141414] w-full max-w-lg overflow-hidden border border-gray-100 dark:border-[#262626] rounded-md shadow-2xl dark:shadow-black/50 animate-in fade-in zoom-in-95 duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-8 py-6 border-b border-gray-50 dark:border-[#262626] flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-black dark:text-white tracking-tight",
                                    children: "New Classroom"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 63,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-400 dark:text-gray-500 font-medium mt-1",
                                    children: "Setup your learning environment."
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-[10px] font-bold text-gray-300 dark:text-gray-600 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                            lineNumber: 66,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit(onSubmit),
                    className: "p-8 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-black dark:text-gray-300 uppercase tracking-widest block",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ...register("name"),
                                    className: "w-full px-4 py-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-md focus:border-orange-500 focus:outline-none font-bold text-sm placeholder:text-gray-200 dark:placeholder:text-gray-700 text-black dark:text-white",
                                    placeholder: "e.g. Data Structures"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this),
                                errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-orange-600 uppercase tracking-wider",
                                    children: errors.name.message
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 85,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-black dark:text-gray-300 uppercase tracking-widest block",
                                            children: "Subject"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                            lineNumber: 91,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("subject"),
                                            className: "w-full px-4 py-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-md focus:border-orange-500 focus:outline-none font-bold text-sm placeholder:text-gray-200 dark:placeholder:text-gray-700 text-black dark:text-white",
                                            placeholder: "e.g. CS-101"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                            lineNumber: 94,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-black dark:text-gray-300 uppercase tracking-widest block",
                                            children: "Section"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                            lineNumber: 103,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("section"),
                                            className: "w-full px-4 py-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-md focus:border-orange-500 focus:outline-none font-bold text-sm placeholder:text-gray-200 dark:placeholder:text-gray-700 text-black dark:text-white",
                                            placeholder: "e.g. A"
                                        }, void 0, false, {
                                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                            lineNumber: 106,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 flex items-center justify-end gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "text-[10px] font-bold text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: isLoading ? "Creating..." : "Confirm"
                                }, void 0, false, {
                                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                                    lineNumber: 122,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
            lineNumber: 60,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/classroom/CreateClassroomDialog.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
_s(CreateClassroomDialog, "u9+Tiyg+sdOQZ7AafdiUBF3v6Gc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = CreateClassroomDialog;
var _c;
__turbopack_context__.k.register(_c, "CreateClassroomDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeacherDashboardContent",
    ()=>TeacherDashboardContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$TeacherClassroomList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/TeacherClassroomList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$CreateClassroomDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/classroom/CreateClassroomDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function TeacherDashboardContent({ classrooms, institutionId }) {
    _s();
    const [isDialogOpen, setIsDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#FFFFFF] dark:bg-[#0a0a0a]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 dark:border-[#262626] pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: "text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors",
                                    children: "← Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2",
                                            children: "Classrooms"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                                            lineNumber: 29,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 dark:text-gray-400 font-medium text-lg max-w-lg",
                                            children: "Manage your learning environments and track student performance."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                                            lineNumber: 32,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                                    lineNumber: 28,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                            lineNumber: 21,
                            columnNumber: 21
                        }, this),
                        institutionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsDialogOpen(true),
                            className: "inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:bg-orange-600 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]",
                            children: "Create Classroom"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                            lineNumber: 39,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$TeacherClassroomList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeacherClassroomList"], {
                    classrooms: classrooms
                }, void 0, false, {
                    fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, this),
                institutionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$classroom$2f$CreateClassroomDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateClassroomDialog"], {
                    isOpen: isDialogOpen,
                    onClose: ()=>setIsDialogOpen(false),
                    institutionId: institutionId
                }, void 0, false, {
                    fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
                    lineNumber: 53,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
            lineNumber: 18,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/dashboard/teacher/classrooms/TeacherDashboardContent.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_s(TeacherDashboardContent, "kdxLf4O7tSmiZi3F0AsxHZT3Vao=");
_c = TeacherDashboardContent;
var _c;
__turbopack_context__.k.register(_c, "TeacherDashboardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_17dd759c._.js.map