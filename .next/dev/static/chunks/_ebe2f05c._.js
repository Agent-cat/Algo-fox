(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/dashboard/ActivityHeatmap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ActivityHeatmap({ submissions }) {
    _s();
    // Utilities
    const formatDateKey = (date)=>{
        return date.toISOString().split('T')[0];
    };
    // 1. Generate the calendar grid data (last 365 days approx, aligned to weeks)
    const { weeks, monthLabels } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ActivityHeatmap.useMemo": ()=>{
            const today = new Date();
            const endDate = new Date(today);
            // Start date: 1 year ago
            const startDate = new Date(today);
            startDate.setFullYear(startDate.getFullYear() - 1);
            // Adjust start date to the previous Sunday to align the grid
            // Day 0 is Sunday
            const dayOfWeek = startDate.getDay();
            startDate.setDate(startDate.getDate() - dayOfWeek);
            const weeksArr = [];
            const monthsArr = [];
            const currentDate = new Date(startDate);
            let currentWeek = [];
            let weekIndex = 0;
            while(currentDate <= endDate){
                // Add day to current week
                currentWeek.push(new Date(currentDate));
                // If week is full (7 days), push to weeks and reset
                if (currentWeek.length === 7) {
                    weeksArr.push(currentWeek);
                    // check for month label
                    const firstDayOfWeek = currentWeek[0];
                    const month = firstDayOfWeek.toLocaleString('default', {
                        month: 'short'
                    });
                    // Logic: Show label if it's the first week of the month visible in this row
                    // Or simply every ~4 weeks, but let's try to be accurate
                    // A simplified standard github-like approach:
                    // If the first day of the week is roughly the start of the month (1st-7th)
                    if (firstDayOfWeek.getDate() <= 7) {
                        monthsArr.push({
                            month,
                            weekIndex
                        });
                    }
                    currentWeek = [];
                    weekIndex++;
                }
                // Next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
            // Handle partial last week if needed (though loop usually finishes on a boundary if we align precisely)
            if (currentWeek.length > 0) {
                weeksArr.push(currentWeek);
            }
            return {
                weeks: weeksArr,
                monthLabels: monthsArr
            };
        }
    }["ActivityHeatmap.useMemo"], []);
    // 2. Map submissions to dates
    const submissionMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ActivityHeatmap.useMemo[submissionMap]": ()=>{
            const map = new Map();
            submissions.forEach({
                "ActivityHeatmap.useMemo[submissionMap]": (sub)=>{
                    const dateKey = formatDateKey(new Date(sub.createdAt));
                    map.set(dateKey, (map.get(dateKey) || 0) + 1);
                }
            }["ActivityHeatmap.useMemo[submissionMap]"]);
            return map;
        }
    }["ActivityHeatmap.useMemo[submissionMap]"], [
        submissions
    ]);
    // 3. Color scale
    const getIntensityClass = (count)=>{
        if (count === 0) return "bg-gray-100 dark:bg-[#262626]";
        if (count <= 2) return "bg-orange-200 dark:bg-orange-900/50";
        if (count <= 5) return "bg-orange-300 dark:bg-orange-700";
        if (count <= 8) return "bg-orange-400 dark:bg-orange-600";
        return "bg-orange-500 dark:bg-orange-500";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full overflow-x-auto overflow-y-hidden pb-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-fit",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex text-xs text-gray-400 dark:text-gray-500 mb-2 relative h-4",
                    children: monthLabels.map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-0 pointer-events-none",
                            style: {
                                left: `${label.weekIndex * 15}px` // 12px (w-3) + 3px (gap-[3px]) = 15px per column
                            },
                            children: label.month
                        }, `${label.month}-${i}`, false, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 100,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                    lineNumber: 98,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[3px] text-[10px] text-gray-500 dark:text-gray-400 mt-[1px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Sun"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 116,
                                    columnNumber: 25
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Mon"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Tue"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Wed"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Thu"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Fri"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Sat"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 122,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[3px]",
                            children: weeks.map((week, wIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-[3px]",
                                    children: week.map((date, dIndex)=>{
                                        const dateKey = formatDateKey(date);
                                        const count = submissionMap.get(dateKey) || 0;
                                        const titleDate = date.toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        });
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.5
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            transition: {
                                                delay: (wIndex * 7 + dIndex) * 0.0005
                                            },
                                            className: `w-3 h-3 rounded-[2px] ${getIntensityClass(count)} hover:ring-2 ring-offset-1 ring-orange-300 cursor-pointer relative group`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-gray-900 dark:bg-white text-white dark:text-black text-xs py-1 px-2 rounded shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                count,
                                                                " contributions"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 53
                                                        }, this),
                                                        " on ",
                                                        titleDate
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                                lineNumber: 148,
                                                columnNumber: 45
                                            }, this)
                                        }, dateKey, false, {
                                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                            lineNumber: 140,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, wIndex, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 128,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 126,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500 justify-end mr-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Less"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 163,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[3px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-gray-100 dark:bg-[#262626]"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 165,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-200 dark:bg-orange-900/50"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 166,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-300 dark:bg-orange-700"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 167,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-400 dark:bg-orange-600"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 168,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-500 dark:bg-orange-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 169,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 164,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "More"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 171,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                    lineNumber: 162,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
            lineNumber: 97,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
        lineNumber: 96,
        columnNumber: 9
    }, this);
}
_s(ActivityHeatmap, "GSbq9v9hM5aRZ9lovOTjCKjh2K8=");
_c = ActivityHeatmap;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ActivityHeatmap);
var _c, _c1;
__turbopack_context__.k.register(_c, "ActivityHeatmap");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:f30afd [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09":"syncUserProfile"},"actions/user.action.ts",""] */ __turbopack_context__.s([
    "syncUserProfile",
    ()=>syncUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var syncUserProfile = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "syncUserProfile"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlci5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vKipcbiAqIEdldCB1c2VyJ3MgdG90YWwgc2NvcmUgKGNhY2hlZCBmb3IgNSBtaW51dGVzKVxuICogQ2FjaGUgaXMgaW52YWxpZGF0ZWQgd2hlbiB1c2VyIHNvbHZlcyBhIHByb2JsZW0gdmlhIHVwZGF0ZVRhZ1xuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2NvcmUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiOyAvLyBNdXN0IGJlIGF0IHRvcCAtIGFsbG93cyBoZWFkZXJzKCkgaW5zaWRlXG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pOyAvLyA1IG1pbnV0ZXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNhY2hlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWAsIGB1c2VyLSR7dXNlcklkfWApO1xuXG4gICAgcmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIFJlY2FsY3VsYXRlIHVzZXIncyB0b3RhbCBzY29yZSBiYXNlZCBvbiB0aGVpciBzb2x2ZWQgcHJvYmxlbXNcbiAqIFRoaXMgZml4ZXMgYW55IGluY29ycmVjdCBzY29yZXMgaW4gdGhlIGRhdGFiYXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNhbGN1bGF0ZVVzZXJTY29yZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbmV3U2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHJldHVybiBVc2VyU2VydmljZS5yZWNhbGN1bGF0ZVVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIENvbXBsZXRlIHVzZXIgb25ib2FyZGluZyBwcm9jZXNzXG4gKiBVcGRhdGVzIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvbiBhbmQgbWFya3Mgb25ib2FyZGluZyBhcyBjb21wbGV0ZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKGRhdGE6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGJpbz86IHN0cmluZztcbiAgICBjb2xsZWdlSWQ6IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgZ2l0aHViSGFuZGxlPzogc3RyaW5nO1xufSk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgVXNlclNlcnZpY2UuY29tcGxldGVPbmJvYXJkaW5nKHVzZXJJZCwgZGF0YSk7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBSZWRpcyBjYWNoZSAocmVkdW5kYW50IGJ1dCBnb29kIHRvIGhhdmUgaGVyZSB0b28pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgZGFzaGJvYXJkLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogVXBkYXRlIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluZm8oZGF0YToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgYmlvPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgY29kZWZvcmNlc0hhbmRsZT86IHN0cmluZztcbiAgICBnaXRodWJIYW5kbGU/OiBzdHJpbmc7XG59KTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBGZXRjaCBjdXJyZW50IHVzZXIgdG8gY2hlY2sgZm9yIGNoYW5nZXNcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgIGJpbzogZGF0YS5iaW8sXG4gICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogZGF0YS5sZWV0Q29kZUhhbmRsZSxcbiAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiBkYXRhLmNvZGVDaGVmSGFuZGxlLFxuICAgICAgICAgICAgY29kZWZvcmNlc0hhbmRsZTogZGF0YS5jb2RlZm9yY2VzSGFuZGxlLFxuICAgICAgICAgICAgZ2l0aHViSGFuZGxlOiBkYXRhLmdpdGh1YkhhbmRsZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZXNldCB2ZXJpZmljYXRpb24gaWYgaGFuZGxlIGNoYW5nZWRcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlQ2hlZkhhbmRsZSAhPT0gdW5kZWZpbmVkICYmIGRhdGEuY29kZUNoZWZIYW5kbGUgIT09IGN1cnJlbnRVc2VyLmNvZGVDaGVmSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlQ2hlZlZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSBjdXJyZW50VXNlci5jb2RlZm9yY2VzSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlZm9yY2VzVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlZXRDb2RlSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5sZWV0Q29kZUhhbmRsZSAhPT0gY3VycmVudFVzZXIubGVldENvZGVIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhLmxlZXRDb2RlVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgZGFzaGJvYXJkIHJlZGlzIGNhY2hlOlwiLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9zZXR0aW5nc1wiKTsgLy8gQWRkZWQgdG8gcmVmcmVzaCBzZXR0aW5ncyBwYWdlXG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoYGRhc2hib2FyZC0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKCdkYXNoYm9hcmQtc3RhdHMnKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdXBkYXRlIHVzZXIgaW5mbzpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogU3luYyB1c2VyIHByb2ZpbGUgYW5kIHN0YXRzXG4gKiBDbGVhcnMgYWxsIGNhY2hlcyByZWxhdGVkIHRvIHRoZSB1c2VyIGFuZCByZXZhbGlkYXRlcyBkYXNoYm9hcmRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNVc2VyUHJvZmlsZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgICAgICBhd2FpdCByZWRpcy5kZWwoYHVzZXItc2NvcmUtJHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgcmVkaXMgY2FjaGUgZHVyaW5nIHN5bmM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldmFsaWRhdGUgTmV4dC5qcyBjYWNoZVxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU3luYyBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzeW5jIHByb2ZpbGVcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgdXNlciBzZXR0aW5ncyBkYXRhIChjYWNoZWQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2V0dGluZ3MoKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjtcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG4gICAgY2FjaGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgaW5zdGl0dXRpb246IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgYmlvOiB1c2VyLmJpbyxcbiAgICAgICAgaW5zdGl0dXRpb25OYW1lOiB1c2VyLmluc3RpdHV0aW9uPy5uYW1lXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1JBbUxzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/ProfileActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileActions",
    ()=>ProfileActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f30afd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f30afd [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ProfileActions({ user, readonly }) {
    _s();
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    if (readonly) return null;
    const handleSync = async ()=>{
        setIsSyncing(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f30afd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["syncUserProfile"])();
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Profile synchronized successfully");
                router.refresh();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to sync profile");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("An error occurred during synchronization");
        } finally{
            setIsSyncing(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 w-full mt-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard/settings/basic-info",
                    className: "flex-1 py-2 px-4 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors text-center",
                    children: "Edit Profile"
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ProfileActions.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSync,
                    disabled: isSyncing,
                    className: "p-2 border border-gray-200 dark:border-[#333] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50",
                    title: "Refresh Stats & Profile",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                        className: `w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProfileActions.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ProfileActions.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/ProfileActions.tsx",
            lineNumber: 49,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_s(ProfileActions, "3rJnDtSXKSUBe0Iky1SIGe60oiM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProfileActions;
var _c;
__turbopack_context__.k.register(_c, "ProfileActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/AchievementsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AchievementsCard",
    ()=>AchievementsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/medal.js [app-client] (ecmascript) <export default as Medal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function AchievementsCard({ badges }) {
    const earnedBadges = [
        {
            type: 'gold',
            count: badges?.gold || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"],
            label: 'Gold',
            color: 'from-yellow-400 to-yellow-600',
            shadow: 'shadow-yellow-500/30',
            bg: 'bg-yellow-50'
        },
        {
            type: 'silver',
            count: badges?.silver || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"],
            label: 'Silver',
            color: 'from-slate-300 to-slate-500',
            shadow: 'shadow-slate-400/30',
            bg: 'bg-slate-50'
        },
        {
            type: 'bronze',
            count: badges?.bronze || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"],
            label: 'Bronze',
            color: 'from-orange-400 to-orange-600',
            shadow: 'shadow-orange-500/30',
            bg: 'bg-orange-50'
        }
    ].filter((b)=>b.count > 0);
    const hasBadges = earnedBadges.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 border-b border-dashed border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                        children: "Achievements"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    hasBadges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200",
                        children: [
                            earnedBadges.reduce((acc, curr)=>acc + curr.count, 0),
                            " Badges"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                        lineNumber: 28,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 flex-1 flex flex-col justify-center",
                children: hasBadges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-4 justify-center",
                    children: earnedBadges.map((badge, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            transition: {
                                delay: index * 0.1,
                                duration: 0.4,
                                type: "spring"
                            },
                            whileHover: {
                                scale: 1.1
                            },
                            className: "relative flex flex-col items-center group cursor-default",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-white shadow-md ${badge.shadow} border-2 border-white dark:border-[#262626] ring-1 ring-gray-100 dark:ring-[#333]`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(badge.icon, {
                                        className: "w-8 h-8 drop-shadow-sm",
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                        lineNumber: 48,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-2 bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 px-2 py-0.5 rounded-full border-2 border-white dark:border-[#262626] shadow-sm text-[10px] font-bold tracking-tight z-10",
                                    children: [
                                        "x",
                                        badge.count
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                    lineNumber: 52,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, badge.type, true, {
                            fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                            lineNumber: 38,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                    lineNumber: 36,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 opacity-70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0.8,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            className: "relative inline-block mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "w-20 h-20 mx-auto text-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-4 h-4 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                        lineNumber: 67,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-900 dark:text-gray-100 font-bold mb-1",
                            children: "Locked"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                            lineNumber: 70,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto",
                            children: "Finish in the Top 3 of a contest to unlock your first badge."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                            lineNumber: 71,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                    lineNumber: 59,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_c = AchievementsCard;
var _c;
__turbopack_context__.k.register(_c, "AchievementsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:b561f7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40497d1d82268f0126da46c6573d5de6f13ad2101a":"checkCodeChefUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkCodeChefUser",
    ()=>checkCodeChefUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkCodeChefUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40497d1d82268f0126da46c6573d5de6f13ad2101a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkCodeChefUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggQ29udGVzdCBEYXRhIG1hbnVhbGx5IHZpYSBHcmFwaFFMXG4gICAgICAgIGNvbnN0IGNvbnRlc3RRdWVyeSA9IGBcbiAgICAgICAgICAgIHF1ZXJ5IHVzZXJDb250ZXN0UmFua2luZ0luZm8oJHVzZXJuYW1lOiBTdHJpbmchKSB7XG4gICAgICAgICAgICAgICAgdXNlckNvbnRlc3RSYW5raW5nKHVzZXJuYW1lOiAkdXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWRDb250ZXN0c0NvdW50XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxSYW5raW5nXG4gICAgICAgICAgICAgICAgICAgIHRvcFBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVzZXJDb250ZXN0UmFua2luZ0hpc3RvcnkodXNlcm5hbWU6ICR1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY29udGVzdFJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2xlZXRjb2RlLmNvbS9ncmFwaHFsJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnUmVmZXJlcic6ICdodHRwczovL2xlZXRjb2RlLmNvbSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcXVlcnk6IGNvbnRlc3RRdWVyeSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHsgdXNlcm5hbWU6IGhhbmRsZSB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tc3RvcmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3REYXRhID0gYXdhaXQgY29udGVzdFJlcy5qc29uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlc3RTdGF0cyA9IGNvbnRlc3REYXRhLmRhdGE/LnVzZXJDb250ZXN0UmFua2luZztcbiAgICAgICAgY29uc3QgY29udGVzdEhpc3RvcnkgPSBjb250ZXN0RGF0YS5kYXRhPy51c2VyQ29udGVzdFJhbmtpbmdIaXN0b3J5Py5maWx0ZXIoKGM6IGFueSkgPT4gYy5hdHRlbmRlZCk7XG5cblxuICAgICAgICBpZiAodXNlciAmJiB1c2VyLm1hdGNoZWRVc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnJlYWxOYW1lLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnVzZXJBdmF0YXIsXG4gICAgICAgICAgICAgICAgc3VibWl0U3RhdHM6IHVzZXIubWF0Y2hlZFVzZXIuc3VibWl0U3RhdHMsXG4gICAgICAgICAgICAgICAgY29udGVzdFN0YXRzOiBjb250ZXN0U3RhdHMgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SGlzdG9yeTogY29udGVzdEhpc3RvcnkgfHwgW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNDA0IH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTGVldENvZGUgY2hlY2sgZXJyb3I6XCIsIGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbi8vIFZlcmlmeSBMZWV0Q29kZSBPd25lcnNoaXBcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlMZWV0Q29kZU93bmVyc2hpcChoYW5kbGU6IHN0cmluZywgdmVyaWZpY2F0aW9uQ29kZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGVja0xlZXRDb2RlVXNlcihoYW5kbGUpO1xuXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQubmFtZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdmVyaWZpY2F0aW9uIGNvZGUgaXMgaW4gdGhlIG5hbWVcbiAgICAgICAgICAgIGlmIChyZXN1bHQubmFtZS5pbmNsdWRlcyh2ZXJpZmljYXRpb25Db2RlKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVUYWcoYHVzZXItJHtzZXNzaW9uLnVzZXIuaWR9YCxcIm1heFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIExlZXRDb2RlIE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUuXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHZlcmlmeSBMZWV0Q29kZSBwcm9maWxlXCIgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIExlZXRDb2RlIHByb2ZpbGUgb3IgbmFtZSBpcyBlbXB0eVwiIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFTQVFzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:a2855d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"408e4143fe9ddd7a52705074750d983c1ea8affb8f":"checkCodeforcesUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkCodeforcesUser",
    ()=>checkCodeforcesUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkCodeforcesUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("408e4143fe9ddd7a52705074750d983c1ea8affb8f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkCodeforcesUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggQ29udGVzdCBEYXRhIG1hbnVhbGx5IHZpYSBHcmFwaFFMXG4gICAgICAgIGNvbnN0IGNvbnRlc3RRdWVyeSA9IGBcbiAgICAgICAgICAgIHF1ZXJ5IHVzZXJDb250ZXN0UmFua2luZ0luZm8oJHVzZXJuYW1lOiBTdHJpbmchKSB7XG4gICAgICAgICAgICAgICAgdXNlckNvbnRlc3RSYW5raW5nKHVzZXJuYW1lOiAkdXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWRDb250ZXN0c0NvdW50XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxSYW5raW5nXG4gICAgICAgICAgICAgICAgICAgIHRvcFBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVzZXJDb250ZXN0UmFua2luZ0hpc3RvcnkodXNlcm5hbWU6ICR1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY29udGVzdFJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2xlZXRjb2RlLmNvbS9ncmFwaHFsJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnUmVmZXJlcic6ICdodHRwczovL2xlZXRjb2RlLmNvbSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcXVlcnk6IGNvbnRlc3RRdWVyeSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHsgdXNlcm5hbWU6IGhhbmRsZSB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tc3RvcmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3REYXRhID0gYXdhaXQgY29udGVzdFJlcy5qc29uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlc3RTdGF0cyA9IGNvbnRlc3REYXRhLmRhdGE/LnVzZXJDb250ZXN0UmFua2luZztcbiAgICAgICAgY29uc3QgY29udGVzdEhpc3RvcnkgPSBjb250ZXN0RGF0YS5kYXRhPy51c2VyQ29udGVzdFJhbmtpbmdIaXN0b3J5Py5maWx0ZXIoKGM6IGFueSkgPT4gYy5hdHRlbmRlZCk7XG5cblxuICAgICAgICBpZiAodXNlciAmJiB1c2VyLm1hdGNoZWRVc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnJlYWxOYW1lLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnVzZXJBdmF0YXIsXG4gICAgICAgICAgICAgICAgc3VibWl0U3RhdHM6IHVzZXIubWF0Y2hlZFVzZXIuc3VibWl0U3RhdHMsXG4gICAgICAgICAgICAgICAgY29udGVzdFN0YXRzOiBjb250ZXN0U3RhdHMgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SGlzdG9yeTogY29udGVzdEhpc3RvcnkgfHwgW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNDA0IH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTGVldENvZGUgY2hlY2sgZXJyb3I6XCIsIGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbi8vIFZlcmlmeSBMZWV0Q29kZSBPd25lcnNoaXBcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlMZWV0Q29kZU93bmVyc2hpcChoYW5kbGU6IHN0cmluZywgdmVyaWZpY2F0aW9uQ29kZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGVja0xlZXRDb2RlVXNlcihoYW5kbGUpO1xuXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQubmFtZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdmVyaWZpY2F0aW9uIGNvZGUgaXMgaW4gdGhlIG5hbWVcbiAgICAgICAgICAgIGlmIChyZXN1bHQubmFtZS5pbmNsdWRlcyh2ZXJpZmljYXRpb25Db2RlKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVUYWcoYHVzZXItJHtzZXNzaW9uLnVzZXIuaWR9YCxcIm1heFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIExlZXRDb2RlIE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUuXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHZlcmlmeSBMZWV0Q29kZSBwcm9maWxlXCIgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIExlZXRDb2RlIHByb2ZpbGUgb3IgbmFtZSBpcyBlbXB0eVwiIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InVTQTRKc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:bae456 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d44136a03ab3229f6d1299e2144e1828f063d7fd":"checkLeetCodeUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkLeetCodeUser",
    ()=>checkLeetCodeUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkLeetCodeUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40d44136a03ab3229f6d1299e2144e1828f063d7fd", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkLeetCodeUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggQ29udGVzdCBEYXRhIG1hbnVhbGx5IHZpYSBHcmFwaFFMXG4gICAgICAgIGNvbnN0IGNvbnRlc3RRdWVyeSA9IGBcbiAgICAgICAgICAgIHF1ZXJ5IHVzZXJDb250ZXN0UmFua2luZ0luZm8oJHVzZXJuYW1lOiBTdHJpbmchKSB7XG4gICAgICAgICAgICAgICAgdXNlckNvbnRlc3RSYW5raW5nKHVzZXJuYW1lOiAkdXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWRDb250ZXN0c0NvdW50XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxSYW5raW5nXG4gICAgICAgICAgICAgICAgICAgIHRvcFBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVzZXJDb250ZXN0UmFua2luZ0hpc3RvcnkodXNlcm5hbWU6ICR1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29udGVzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY29udGVzdFJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2xlZXRjb2RlLmNvbS9ncmFwaHFsJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnUmVmZXJlcic6ICdodHRwczovL2xlZXRjb2RlLmNvbSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcXVlcnk6IGNvbnRlc3RRdWVyeSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHsgdXNlcm5hbWU6IGhhbmRsZSB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tc3RvcmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlc3REYXRhID0gYXdhaXQgY29udGVzdFJlcy5qc29uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlc3RTdGF0cyA9IGNvbnRlc3REYXRhLmRhdGE/LnVzZXJDb250ZXN0UmFua2luZztcbiAgICAgICAgY29uc3QgY29udGVzdEhpc3RvcnkgPSBjb250ZXN0RGF0YS5kYXRhPy51c2VyQ29udGVzdFJhbmtpbmdIaXN0b3J5Py5maWx0ZXIoKGM6IGFueSkgPT4gYy5hdHRlbmRlZCk7XG5cblxuICAgICAgICBpZiAodXNlciAmJiB1c2VyLm1hdGNoZWRVc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnJlYWxOYW1lLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogdXNlci5tYXRjaGVkVXNlci5wcm9maWxlLnVzZXJBdmF0YXIsXG4gICAgICAgICAgICAgICAgc3VibWl0U3RhdHM6IHVzZXIubWF0Y2hlZFVzZXIuc3VibWl0U3RhdHMsXG4gICAgICAgICAgICAgICAgY29udGVzdFN0YXRzOiBjb250ZXN0U3RhdHMgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBjb250ZXN0SGlzdG9yeTogY29udGVzdEhpc3RvcnkgfHwgW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNDA0IH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTGVldENvZGUgY2hlY2sgZXJyb3I6XCIsIGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbi8vIFZlcmlmeSBMZWV0Q29kZSBPd25lcnNoaXBcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlMZWV0Q29kZU93bmVyc2hpcChoYW5kbGU6IHN0cmluZywgdmVyaWZpY2F0aW9uQ29kZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGVja0xlZXRDb2RlVXNlcihoYW5kbGUpO1xuXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQubmFtZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdmVyaWZpY2F0aW9uIGNvZGUgaXMgaW4gdGhlIG5hbWVcbiAgICAgICAgICAgIGlmIChyZXN1bHQubmFtZS5pbmNsdWRlcyh2ZXJpZmljYXRpb25Db2RlKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVUYWcoYHVzZXItJHtzZXNzaW9uLnVzZXIuaWR9YCxcIm1heFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIExlZXRDb2RlIE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUuXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHZlcmlmeSBMZWV0Q29kZSBwcm9maWxlXCIgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIExlZXRDb2RlIHByb2ZpbGUgb3IgbmFtZSBpcyBlbXB0eVwiIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFTQW9Rc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/ProblemOverviewCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProblemOverviewCard",
    ()=>ProblemOverviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$b561f7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:b561f7 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$a2855d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:a2855d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$bae456__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:bae456 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ProblemOverviewCard({ solvedByDifficulty, totalProblems, problemsSolved, leetCodeHandle, codeChefHandle, codeforcesHandle }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414] rounded-3xl border border-gray-200 dark:border-[#262626] p-6 hover:shadow-lg transition-all flex flex-col h-[500px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                                    children: "Performance"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 dark:text-gray-400 font-medium",
                                    children: "Analytics & Problem Solving"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 58,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 56,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex bg-gray-100 dark:bg-[#1a1a1a] p-1.5 rounded-full relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                active: activeTab === "overview",
                                onClick: ()=>setActiveTab("overview"),
                                children: "Overview"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 64,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                active: activeTab === "leetcode",
                                onClick: ()=>setActiveTab("leetcode"),
                                children: "LeetCode"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 65,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                active: activeTab === "codechef",
                                onClick: ()=>setActiveTab("codechef"),
                                children: "CodeChef"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 66,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                active: activeTab === "codeforces",
                                onClick: ()=>setActiveTab("codeforces"),
                                children: "CodeForces"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 67,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 w-full min-h-0 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OverviewView, {
                                solvedByDifficulty: solvedByDifficulty,
                                totalProblems: totalProblems
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 82,
                                columnNumber: 29
                            }, this)
                        }, "overview", false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 74,
                            columnNumber: 25
                        }, this),
                        activeTab === "leetcode" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeetCodeView, {
                                handle: leetCodeHandle
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 95,
                                columnNumber: 29
                            }, this)
                        }, "leetcode", false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 87,
                            columnNumber: 26
                        }, this),
                        activeTab === "codechef" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeChefView, {
                                handle: codeChefHandle
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 108,
                                columnNumber: 30
                            }, this)
                        }, "codechef", false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 100,
                            columnNumber: 25
                        }, this),
                        activeTab === "codeforces" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -10
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeForcesView, {
                                handle: codeforcesHandle
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 121,
                                columnNumber: 29
                            }, this)
                        }, "codeforces", false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 113,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 72,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s(ProblemOverviewCard, "0RhE9c0qkQp+3CR2mJOCewxRmMU=");
_c = ProblemOverviewCard;
function TabButton({ active, onClick, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "relative px-4 py-1.5 text-xs font-semibold z-10 transition-colors duration-200",
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                layoutId: "activeTab",
                className: "absolute inset-0 bg-white dark:bg-[#262626] shadow-sm rounded-full",
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 137,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `relative z-20 ${active ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 132,
        columnNumber: 9
    }, this);
}
_c1 = TabButton;
// --- Views ---
function OverviewView({ solvedByDifficulty, totalProblems }) {
    const calculatedSolved = solvedByDifficulty.EASY + solvedByDifficulty.MEDIUM + solvedByDifficulty.HARD;
    const total = Math.max(totalProblems.TOTAL || 1, 1);
    const percentage = Math.round(calculatedSolved / total * 100);
    const easyPct = solvedByDifficulty.EASY / total * 100;
    const medPct = solvedByDifficulty.MEDIUM / total * 100;
    const hardPct = solvedByDifficulty.HARD / total * 100;
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const easyArc = easyPct / 100 * circumference;
    const medArc = medPct / 100 * circumference;
    const hardArc = hardPct / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col-reverse md:flex-row items-center justify-between gap-8 h-full pb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full md:w-1/3 space-y-4 self-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatRow, {
                        color: "bg-green-500",
                        label: "Easy",
                        value: solvedByDifficulty.EASY,
                        total: totalProblems.EASY
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 168,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatRow, {
                        color: "bg-orange-500",
                        label: "Medium",
                        value: solvedByDifficulty.MEDIUM,
                        total: totalProblems.MEDIUM
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 169,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatRow, {
                        color: "bg-red-500",
                        label: "Hard",
                        value: solvedByDifficulty.HARD,
                        total: totalProblems.HARD
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-gray-100 dark:border-[#262626] mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium text-gray-500",
                                    children: "Total Solved"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 174,
                                    columnNumber: 26
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                                    children: calculatedSolved
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 175,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 173,
                            columnNumber: 22
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 172,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 167,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-56 h-56 md:w-64 md:h-64",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-full h-full transform -rotate-90 drop-shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "50%",
                                    cy: "50%",
                                    r: radius,
                                    fill: "none",
                                    className: "stroke-gray-100 dark:stroke-[#262626]",
                                    strokeWidth: "16"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "50%",
                                    cy: "50%",
                                    r: radius,
                                    fill: "none",
                                    stroke: "#22c55e",
                                    strokeWidth: "16",
                                    strokeDasharray: circumference,
                                    strokeDashoffset: circumference - easyArc,
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "50%",
                                    cy: "50%",
                                    r: radius,
                                    fill: "none",
                                    stroke: "#f97316",
                                    strokeWidth: "16",
                                    strokeDasharray: circumference,
                                    strokeDashoffset: circumference - medArc,
                                    strokeLinecap: "round",
                                    style: {
                                        transform: `rotate(${easyPct / 100 * 360}deg)`,
                                        transformOrigin: "50% 50%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 185,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "50%",
                                    cy: "50%",
                                    r: radius,
                                    fill: "none",
                                    stroke: "#ef4444",
                                    strokeWidth: "16",
                                    strokeDasharray: circumference,
                                    strokeDashoffset: circumference - hardArc,
                                    strokeLinecap: "round",
                                    style: {
                                        transform: `rotate(${(easyPct + medPct) / 100 * 360}deg)`,
                                        transformOrigin: "50% 50%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 186,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 182,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter",
                                    children: [
                                        percentage,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 189,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1",
                                    children: "Platform"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 188,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 181,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 180,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 166,
        columnNumber: 9
    }, this);
}
_c2 = OverviewView;
function LeetCodeView({ handle }) {
    _s1();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeetCodeView.useEffect": ()=>{
            if (handle) {
                setLoading(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$bae456__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkLeetCodeUser"])(handle).then({
                    "LeetCodeView.useEffect": (res)=>{
                        if (res.success) setData(res);
                        setLoading(false);
                    }
                }["LeetCodeView.useEffect"]);
            }
        }
    }["LeetCodeView.useEffect"], [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
        PlatformIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
            className: "w-8 h-8 text-yellow-500"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 213,
            columnNumber: 51
        }, void 0),
        message: "Connect LeetCode",
        subMessage: "Link your account in settings"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 213,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 214,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 215,
        columnNumber: 23
    }, this);
    const easy = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Easy")?.count || 0;
    const medium = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Medium")?.count || 0;
    const hard = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Hard")?.count || 0;
    // Process Contest History for Graph
    const contestHistory = data.contestHistory?.map((c)=>({
            date: new Date(c.contest.startTime * 1000).toLocaleDateString(),
            rating: Math.round(c.rating),
            title: c.contest.title
        })) || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Contest Rating",
                        value: data.contestStats?.rating ? Math.round(data.contestStats.rating) : "N/A",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "w-4 h-4 text-orange-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 235,
                            columnNumber: 27
                        }, void 0),
                        trend: data.contestStats?.topPercentage ? `Top ${data.contestStats.topPercentage}%` : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 232,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Global Ranking",
                        value: data.contestStats?.globalRanking?.toLocaleString() || "N/A",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                            className: "w-4 h-4 text-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 241,
                            columnNumber: 27
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 238,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Attended",
                        value: data.contestStats?.attendedContestsCount || 0,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                            className: "w-4 h-4 text-purple-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 246,
                            columnNumber: 27
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 243,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Problems Solved",
                        value: easy + medium + hard,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-4 h-4 text-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 251,
                            columnNumber: 27
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 248,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 231,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col md:flex-row gap-6 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] relative flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4",
                                children: "Rating History"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this),
                            contestHistory.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 w-full min-h-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                        data: contestHistory,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "colorRating",
                                                    x1: "0",
                                                    y1: "0",
                                                    x2: "0",
                                                    y2: "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "5%",
                                                            stopColor: "#f59e0b",
                                                            stopOpacity: 0.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "95%",
                                                            stopColor: "#f59e0b",
                                                            stopOpacity: 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 263,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: {
                                                    backgroundColor: '#1f2937',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#fff',
                                                    fontSize: '12px'
                                                },
                                                itemStyle: {
                                                    color: '#fff'
                                                },
                                                labelStyle: {
                                                    display: 'none'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 269,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "rating",
                                                stroke: "#f59e0b",
                                                fillOpacity: 1,
                                                fill: "url(#colorRating)",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 274,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 262,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 261,
                                    columnNumber: 30
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 260,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex items-center justify-center text-gray-400 text-sm",
                                children: "No contest history"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 279,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 257,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full md:w-1/3 flex flex-col justify-center space-y-4 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#262626]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-600",
                                                children: "Easy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 286,
                                                columnNumber: 83
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: easy
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 286,
                                                columnNumber: 128
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 286,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-500 h-full rounded-full",
                                            style: {
                                                width: `${easy / (easy + medium + hard) * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 288,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 287,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-orange-600",
                                                children: "Medium"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 292,
                                                columnNumber: 83
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: medium
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 292,
                                                columnNumber: 131
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 292,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-orange-500 h-full rounded-full",
                                            style: {
                                                width: `${medium / (easy + medium + hard) * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 294,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 293,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 291,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "Hard"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 298,
                                                columnNumber: 83
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: hard
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                lineNumber: 298,
                                                columnNumber: 126
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 298,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-red-500 h-full rounded-full",
                                            style: {
                                                width: `${hard / (easy + medium + hard) * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 300,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 299,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 297,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 284,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 255,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 229,
        columnNumber: 9
    }, this);
}
_s1(LeetCodeView, "zRvvAK96aYqko2QYrTyuOCE8lvM=");
_c3 = LeetCodeView;
function CodeChefView({ handle }) {
    _s2();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeChefView.useEffect": ()=>{
            if (handle) {
                setLoading(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$b561f7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkCodeChefUser"])(handle).then({
                    "CodeChefView.useEffect": (res)=>{
                        if (res.success) setData(res);
                        setLoading(false);
                    }
                }["CodeChefView.useEffect"]);
            }
        }
    }["CodeChefView.useEffect"], [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
        PlatformIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
            className: "w-8 h-8 text-orange-700"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 323,
            columnNumber: 51
        }, void 0),
        message: "Connect CodeChef",
        subMessage: "Link your account in settings"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 323,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 324,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 325,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Rating",
                        value: data.currentRating,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-4 h-4 text-yellow-600"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 330,
                            columnNumber: 76
                        }, void 0),
                        trend: data.stars
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 330,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Global Rank",
                        value: data.globalRank,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                            className: "w-4 h-4 text-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 331,
                            columnNumber: 78
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 331,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Fully Solved",
                        value: data.fullySolvedCount,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                            className: "w-4 h-4 text-green-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 332,
                            columnNumber: 85
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 332,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Contests",
                        value: data.ratingData?.length || 0,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                            className: "w-4 h-4 text-purple-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 333,
                            columnNumber: 88
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 333,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 329,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] relative flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4",
                        children: "Rating History"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 337,
                        columnNumber: 18
                    }, this),
                    data.ratingData && data.ratingData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 w-full min-h-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                data: data.ratingData,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "colorCCRating",
                                            x1: "0",
                                            y1: "0",
                                            x2: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "5%",
                                                    stopColor: "#8b4513",
                                                    stopOpacity: 0.3
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "95%",
                                                    stopColor: "#8b4513",
                                                    stopOpacity: 0
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 343,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 342,
                                        columnNumber: 38
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '12px'
                                        },
                                        itemStyle: {
                                            color: '#fff'
                                        },
                                        labelStyle: {
                                            display: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 348,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "rating",
                                        stroke: "#8b4513",
                                        fillOpacity: 1,
                                        fill: "url(#colorCCRating)",
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 353,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 341,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 340,
                            columnNumber: 30
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 339,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center justify-center text-gray-400 text-sm",
                        children: "No contest history"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 358,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 336,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 328,
        columnNumber: 9
    }, this);
}
_s2(CodeChefView, "zRvvAK96aYqko2QYrTyuOCE8lvM=");
_c4 = CodeChefView;
function CodeForcesView({ handle }) {
    _s3();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeForcesView.useEffect": ()=>{
            if (handle) {
                setLoading(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$a2855d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkCodeforcesUser"])(handle).then({
                    "CodeForcesView.useEffect": (res)=>{
                        if (res.success) setData(res);
                        setLoading(false);
                    }
                }["CodeForcesView.useEffect"]);
            }
        }
    }["CodeForcesView.useEffect"], [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
        PlatformIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
            className: "w-8 h-8 text-blue-500"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 379,
            columnNumber: 51
        }, void 0),
        message: "Connect CodeForces",
        subMessage: "Link your account in settings"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 379,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 380,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {}, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 381,
        columnNumber: 23
    }, this);
    const solved = data.solvedByDifficulty || {
        EASY: 0,
        MEDIUM: 0,
        HARD: 0,
        TOTAL: 0
    };
    const chartData = [
        {
            name: 'Easy',
            value: solved.EASY,
            color: '#22c55e'
        },
        {
            name: 'Medium',
            value: solved.MEDIUM,
            color: '#f97316'
        },
        {
            name: 'Hard',
            value: solved.HARD,
            color: '#ef4444'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Rating",
                        value: data.rating || "Unrated",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-4 h-4 text-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 393,
                            columnNumber: 82
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 393,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Max Rating",
                        value: data.maxRating || "Unrated",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "w-4 h-4 text-purple-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 394,
                            columnNumber: 89
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 394,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Rank",
                        value: data.rank || "-",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                            className: "w-4 h-4 text-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 395,
                            columnNumber: 72
                        }, void 0),
                        className: "capitalize"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 395,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Total Solved",
                        value: solved.TOTAL,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                            className: "w-4 h-4 text-green-500"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 396,
                            columnNumber: 76
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 396,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 392,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col md:flex-row gap-6 min-h-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] flex flex-col justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4",
                            children: "Tags Distribution"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 401,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-48",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: "100%",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                    data: chartData,
                                    layout: "vertical",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                            type: "number",
                                            hide: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 406,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                            dataKey: "name",
                                            type: "category",
                                            width: 60,
                                            tick: {
                                                fontSize: 12,
                                                fill: '#888'
                                            },
                                            axisLine: false,
                                            tickLine: false
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 407,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            cursor: {
                                                fill: 'transparent'
                                            },
                                            contentStyle: {
                                                borderRadius: '8px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 408,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                            dataKey: "value",
                                            barSize: 20,
                                            radius: [
                                                0,
                                                4,
                                                4,
                                                0
                                            ],
                                            children: chartData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                    fill: entry.color
                                                }, `cell-${index}`, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 409,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 405,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 404,
                                columnNumber: 26
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 403,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 400,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 399,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 391,
        columnNumber: 9
    }, this);
}
_s3(CodeForcesView, "zRvvAK96aYqko2QYrTyuOCE8lvM=");
_c5 = CodeForcesView;
// --- Shared Components ---
function StatRow({ color, label, value, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-2 h-2 rounded-full ${color}`
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 429,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-gray-600 dark:text-gray-300",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 430,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 428,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-gray-900 dark:text-gray-100",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 433,
                        columnNumber: 17
                    }, this),
                    total !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400",
                        children: [
                            "/ ",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 434,
                        columnNumber: 41
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 432,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 427,
        columnNumber: 9
    }, this);
}
_c6 = StatRow;
function StatCard({ label, value, icon, trend, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-[#262626] flex flex-col justify-between ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-gray-500 dark:text-gray-400",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 444,
                        columnNumber: 18
                    }, this),
                    icon
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 443,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 448,
                        columnNumber: 17
                    }, this),
                    trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] font-medium text-green-600 dark:text-green-500 mt-1",
                        children: trend
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 449,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 447,
                columnNumber: 14
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 442,
        columnNumber: 9
    }, this);
}
_c7 = StatCard;
function EmptyState({ PlatformIcon, message, subMessage }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col items-center justify-center text-center space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-full",
                children: PlatformIcon
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 458,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 462,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 max-w-[150px] mx-auto",
                        children: subMessage
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 463,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 461,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 457,
        columnNumber: 9
    }, this);
}
_c8 = EmptyState;
function LoadingState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            className: "w-8 h-8 animate-spin text-gray-300"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 470,
            columnNumber: 70
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 470,
        columnNumber: 13
    }, this);
}
_c9 = LoadingState;
function ErrorState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-sm text-red-500",
        children: "Failed to load data"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 474,
        columnNumber: 13
    }, this);
}
_c10 = ErrorState;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "ProblemOverviewCard");
__turbopack_context__.k.register(_c1, "TabButton");
__turbopack_context__.k.register(_c2, "OverviewView");
__turbopack_context__.k.register(_c3, "LeetCodeView");
__turbopack_context__.k.register(_c4, "CodeChefView");
__turbopack_context__.k.register(_c5, "CodeForcesView");
__turbopack_context__.k.register(_c6, "StatRow");
__turbopack_context__.k.register(_c7, "StatCard");
__turbopack_context__.k.register(_c8, "EmptyState");
__turbopack_context__.k.register(_c9, "LoadingState");
__turbopack_context__.k.register(_c10, "ErrorState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ebe2f05c._.js.map