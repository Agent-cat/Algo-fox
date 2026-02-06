module.exports = [
"[project]/components/dashboard/ActivityHeatmap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function ActivityHeatmap({ submissions }) {
    // Utilities
    const formatDateKey = (date)=>{
        return date.toISOString().split('T')[0];
    };
    // 1. Generate the calendar grid data (last 365 days approx, aligned to weeks)
    const { weeks, monthLabels } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
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
    }, []);
    // 2. Map submissions to dates
    const submissionMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        submissions.forEach((sub)=>{
            const dateKey = formatDateKey(new Date(sub.createdAt));
            map.set(dateKey, (map.get(dateKey) || 0) + 1);
        });
        return map;
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full overflow-x-auto overflow-y-hidden pb-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-fit",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex text-xs text-gray-400 dark:text-gray-500 mb-2 relative h-4",
                    children: monthLabels.map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[3px] text-[10px] text-gray-500 dark:text-gray-400 mt-[1px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Sun"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 116,
                                    columnNumber: 25
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Mon"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Tue"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Wed"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3 invisible",
                                    children: "Thu"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 leading-3",
                                    children: "Fri"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[3px]",
                            children: weeks.map((week, wIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-gray-900 dark:bg-white text-white dark:text-black text-xs py-1 px-2 rounded shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500 justify-end mr-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Less"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                            lineNumber: 163,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[3px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-gray-100 dark:bg-[#262626]"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 165,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-200 dark:bg-orange-900/50"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 166,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-300 dark:bg-orange-700"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 167,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 rounded-[2px] bg-orange-400 dark:bg-orange-600"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ActivityHeatmap.tsx",
                                    lineNumber: 168,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
const __TURBOPACK__default__export__ = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(ActivityHeatmap);
}),
"[project]/actions/data:f30afd [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09":"syncUserProfile"},"actions/user.action.ts",""] */ __turbopack_context__.s([
    "syncUserProfile",
    ()=>syncUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var syncUserProfile = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "syncUserProfile"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlci5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vKipcbiAqIEdldCB1c2VyJ3MgdG90YWwgc2NvcmUgKGNhY2hlZCBmb3IgNSBtaW51dGVzKVxuICogQ2FjaGUgaXMgaW52YWxpZGF0ZWQgd2hlbiB1c2VyIHNvbHZlcyBhIHByb2JsZW0gdmlhIHVwZGF0ZVRhZ1xuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2NvcmUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiOyAvLyBNdXN0IGJlIGF0IHRvcCAtIGFsbG93cyBoZWFkZXJzKCkgaW5zaWRlXG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pOyAvLyA1IG1pbnV0ZXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNhY2hlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWAsIGB1c2VyLSR7dXNlcklkfWApO1xuXG4gICAgcmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIFJlY2FsY3VsYXRlIHVzZXIncyB0b3RhbCBzY29yZSBiYXNlZCBvbiB0aGVpciBzb2x2ZWQgcHJvYmxlbXNcbiAqIFRoaXMgZml4ZXMgYW55IGluY29ycmVjdCBzY29yZXMgaW4gdGhlIGRhdGFiYXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNhbGN1bGF0ZVVzZXJTY29yZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbmV3U2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHJldHVybiBVc2VyU2VydmljZS5yZWNhbGN1bGF0ZVVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIENvbXBsZXRlIHVzZXIgb25ib2FyZGluZyBwcm9jZXNzXG4gKiBVcGRhdGVzIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvbiBhbmQgbWFya3Mgb25ib2FyZGluZyBhcyBjb21wbGV0ZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKGRhdGE6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGJpbz86IHN0cmluZztcbiAgICBjb2xsZWdlSWQ6IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgZ2l0aHViSGFuZGxlPzogc3RyaW5nO1xufSk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgVXNlclNlcnZpY2UuY29tcGxldGVPbmJvYXJkaW5nKHVzZXJJZCwgZGF0YSk7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBSZWRpcyBjYWNoZSAocmVkdW5kYW50IGJ1dCBnb29kIHRvIGhhdmUgaGVyZSB0b28pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgZGFzaGJvYXJkLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogVXBkYXRlIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluZm8oZGF0YToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgYmlvPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgY29kZWZvcmNlc0hhbmRsZT86IHN0cmluZztcbiAgICBnaXRodWJIYW5kbGU/OiBzdHJpbmc7XG59KTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBGZXRjaCBjdXJyZW50IHVzZXIgdG8gY2hlY2sgZm9yIGNoYW5nZXNcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgIGJpbzogZGF0YS5iaW8sXG4gICAgICAgICAgICBsZWV0Q29kZUhhbmRsZTogZGF0YS5sZWV0Q29kZUhhbmRsZSxcbiAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiBkYXRhLmNvZGVDaGVmSGFuZGxlLFxuICAgICAgICAgICAgY29kZWZvcmNlc0hhbmRsZTogZGF0YS5jb2RlZm9yY2VzSGFuZGxlLFxuICAgICAgICAgICAgZ2l0aHViSGFuZGxlOiBkYXRhLmdpdGh1YkhhbmRsZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZXNldCB2ZXJpZmljYXRpb24gaWYgaGFuZGxlIGNoYW5nZWRcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlQ2hlZkhhbmRsZSAhPT0gdW5kZWZpbmVkICYmIGRhdGEuY29kZUNoZWZIYW5kbGUgIT09IGN1cnJlbnRVc2VyLmNvZGVDaGVmSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlQ2hlZlZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5jb2RlZm9yY2VzSGFuZGxlICE9PSBjdXJyZW50VXNlci5jb2RlZm9yY2VzSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jb2RlZm9yY2VzVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlZXRDb2RlSGFuZGxlICE9PSB1bmRlZmluZWQgJiYgZGF0YS5sZWV0Q29kZUhhbmRsZSAhPT0gY3VycmVudFVzZXIubGVldENvZGVIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhLmxlZXRDb2RlVmVyaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXG4gICAgICAgICAgICBkYXRhOiB1cGRhdGVEYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgZGFzaGJvYXJkIHJlZGlzIGNhY2hlOlwiLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2Rhc2hib2FyZC9zZXR0aW5nc1wiKTsgLy8gQWRkZWQgdG8gcmVmcmVzaCBzZXR0aW5ncyBwYWdlXG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoYGRhc2hib2FyZC0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKCdkYXNoYm9hcmQtc3RhdHMnKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdXBkYXRlIHVzZXIgaW5mbzpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlXCIgfTtcbiAgICB9XG59XG5cbi8qKlxuICogU3luYyB1c2VyIHByb2ZpbGUgYW5kIHN0YXRzXG4gKiBDbGVhcnMgYWxsIGNhY2hlcyByZWxhdGVkIHRvIHRoZSB1c2VyIGFuZCByZXZhbGlkYXRlcyBkYXNoYm9hcmRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNVc2VyUHJvZmlsZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgZXJyb3I/OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIEludmFsaWRhdGUgUmVkaXMgY2FjaGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlzID0gKGF3YWl0IGltcG9ydChcIkAvbGliL3JlZGlzXCIpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGBkYXNoYm9hcmQ6c3RhdHM6JHt1c2VySWR9YCk7XG4gICAgICAgICAgICBhd2FpdCByZWRpcy5kZWwoYHVzZXItc2NvcmUtJHt1c2VySWR9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGludmFsaWRhdGUgcmVkaXMgY2FjaGUgZHVyaW5nIHN5bmM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldmFsaWRhdGUgTmV4dC5qcyBjYWNoZVxuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU3luYyBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzeW5jIHByb2ZpbGVcIiB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgdXNlciBzZXR0aW5ncyBkYXRhIChjYWNoZWQpXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2V0dGluZ3MoKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjtcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG4gICAgY2FjaGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgaW5zdGl0dXRpb246IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgYmlvOiB1c2VyLmJpbyxcbiAgICAgICAgaW5zdGl0dXRpb25OYW1lOiB1c2VyLmluc3RpdHV0aW9uPy5uYW1lXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1JBbUxzQiJ9
}),
"[project]/components/dashboard/ProfileActions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileActions",
    ()=>ProfileActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f30afd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f30afd [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ProfileActions({ user, readonly }) {
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    if (readonly) return null;
    const handleSync = async ()=>{
        setIsSyncing(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f30afd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["syncUserProfile"])();
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Profile synchronized successfully");
                router.refresh();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to sync profile");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("An error occurred during synchronization");
        } finally{
            setIsSyncing(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 w-full mt-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard/settings/basic-info",
                    className: "flex-1 py-2 px-4 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors text-center",
                    children: "Edit Profile"
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ProfileActions.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSync,
                    disabled: isSyncing,
                    className: "p-2 border border-gray-200 dark:border-[#333] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50",
                    title: "Refresh Stats & Profile",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
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
}),
"[project]/components/dashboard/AchievementsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AchievementsCard",
    ()=>AchievementsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/medal.js [app-ssr] (ecmascript) <export default as Medal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function AchievementsCard({ badges }) {
    const earnedBadges = [
        {
            type: 'gold',
            count: badges?.gold || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"],
            label: 'Gold',
            color: 'from-yellow-400 to-yellow-600',
            shadow: 'shadow-yellow-500/30',
            bg: 'bg-yellow-50'
        },
        {
            type: 'silver',
            count: badges?.silver || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"],
            label: 'Silver',
            color: 'from-slate-300 to-slate-500',
            shadow: 'shadow-slate-400/30',
            bg: 'bg-slate-50'
        },
        {
            type: 'bronze',
            count: badges?.bronze || 0,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"],
            label: 'Bronze',
            color: 'from-orange-400 to-orange-600',
            shadow: 'shadow-orange-500/30',
            bg: 'bg-orange-50'
        }
    ].filter((b)=>b.count > 0);
    const hasBadges = earnedBadges.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 border-b border-dashed border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                        children: "Achievements"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    hasBadges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 flex-1 flex flex-col justify-center",
                children: hasBadges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-4 justify-center",
                    children: earnedBadges.map((badge, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-white shadow-md ${badge.shadow} border-2 border-white dark:border-[#262626] ring-1 ring-gray-100 dark:ring-[#333]`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(badge.icon, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 opacity-70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "w-20 h-20 mx-auto text-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-900 dark:text-gray-100 font-bold mb-1",
                            children: "Locked"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/AchievementsCard.tsx",
                            lineNumber: 70,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
"[project]/actions/data:6cf207 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40497d1d82268f0126da46c6573d5de6f13ad2101a":"checkCodeChefUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkCodeChefUser",
    ()=>checkCodeChefUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var checkCodeChefUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40497d1d82268f0126da46c6573d5de6f13ad2101a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkCodeChefUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5tYXRjaGVkVXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS5yZWFsTmFtZSxcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS51c2VyQXZhdGFyLFxuICAgICAgICAgICAgICAgIHN1Ym1pdFN0YXRzOiB1c2VyLm1hdGNoZWRVc2VyLnN1Ym1pdFN0YXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBzdGF0dXM6IDQwNCB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkxlZXRDb2RlIGNoZWNrIGVycm9yOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNTAwIH07XG4gICAgfVxufVxuXG4vLyBWZXJpZnkgTGVldENvZGUgT3duZXJzaGlwXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5TGVldENvZGVPd25lcnNoaXAoaGFuZGxlOiBzdHJpbmcsIHZlcmlmaWNhdGlvbkNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2tMZWV0Q29kZVVzZXIoaGFuZGxlKTtcblxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHZlcmlmaWNhdGlvbiBjb2RlIGlzIGluIHRoZSBuYW1lXG4gICAgICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24udXNlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZXRDb2RlVmVyaWZpZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdXBkYXRlIHZlcmlmaWNhdGlvbiBzdGF0dXNcIiB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBMZWV0Q29kZSBOYW1lLiBQbGVhc2UgZW5zdXJlIHlvdSBoYXZlIHVwZGF0ZWQgaXQgaW4geW91ciBwcm9maWxlLlwiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2ZXJpZnkgTGVldENvZGUgcHJvZmlsZVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBMZWV0Q29kZSBwcm9maWxlIG9yIG5hbWUgaXMgZW1wdHlcIiB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxU0FRc0IifQ==
}),
"[project]/actions/data:99cd87 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"408e4143fe9ddd7a52705074750d983c1ea8affb8f":"checkCodeforcesUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkCodeforcesUser",
    ()=>checkCodeforcesUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var checkCodeforcesUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("408e4143fe9ddd7a52705074750d983c1ea8affb8f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkCodeforcesUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5tYXRjaGVkVXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS5yZWFsTmFtZSxcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS51c2VyQXZhdGFyLFxuICAgICAgICAgICAgICAgIHN1Ym1pdFN0YXRzOiB1c2VyLm1hdGNoZWRVc2VyLnN1Ym1pdFN0YXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBzdGF0dXM6IDQwNCB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkxlZXRDb2RlIGNoZWNrIGVycm9yOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNTAwIH07XG4gICAgfVxufVxuXG4vLyBWZXJpZnkgTGVldENvZGUgT3duZXJzaGlwXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5TGVldENvZGVPd25lcnNoaXAoaGFuZGxlOiBzdHJpbmcsIHZlcmlmaWNhdGlvbkNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2tMZWV0Q29kZVVzZXIoaGFuZGxlKTtcblxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHZlcmlmaWNhdGlvbiBjb2RlIGlzIGluIHRoZSBuYW1lXG4gICAgICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24udXNlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZXRDb2RlVmVyaWZpZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdXBkYXRlIHZlcmlmaWNhdGlvbiBzdGF0dXNcIiB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBMZWV0Q29kZSBOYW1lLiBQbGVhc2UgZW5zdXJlIHlvdSBoYXZlIHVwZGF0ZWQgaXQgaW4geW91ciBwcm9maWxlLlwiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2ZXJpZnkgTGVldENvZGUgcHJvZmlsZVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBMZWV0Q29kZSBwcm9maWxlIG9yIG5hbWUgaXMgZW1wdHlcIiB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1U0E0SnNCIn0=
}),
"[project]/actions/data:d082da [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d44136a03ab3229f6d1299e2144e1828f063d7fd":"checkLeetCodeUser"},"actions/platform.action.ts",""] */ __turbopack_context__.s([
    "checkLeetCodeUser",
    ()=>checkLeetCodeUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var checkLeetCodeUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40d44136a03ab3229f6d1299e2144e1828f063d7fd", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkLeetCodeUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGxhdGZvcm0uYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgcmV2YWxpZGF0ZVRhZyB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlQ2hlZlVzZXIoaGFuZGxlOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICBgaHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL3VzZXJzLyR7aGFuZGxlfWAsXG4gICAgICAgICAgICB7IGNhY2hlOiAnbm8tc3RvcmUnIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVzZGF0YS5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgIGxldCBkID0gYXdhaXQgcmVzZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHsgZGF0YTogZCB9O1xuXG4gICAgICAgICAgICAvLyBIZWF0bWFwIGRhdGEgZXh0cmFjdGlvblxuICAgICAgICAgICAgbGV0IGhlYXRNYXBEYXRhQ3Vyc291cjEgPVxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YS5zZWFyY2goXCJ2YXIgdXNlckRhaWx5U3VibWlzc2lvbnNTdGF0cyA9XCIpICtcbiAgICAgICAgICAgICAgICBcInZhciB1c2VyRGFpbHlTdWJtaXNzaW9uc1N0YXRzID1cIi5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaGVhdE1hcERhdGFDdXJzb3VyMiA9IGRhdGEuZGF0YS5zZWFyY2goXCInI2pzLWhlYXRtYXBcIikgLSAzNDtcbiAgICAgICAgICAgIGxldCBoZWF0RGF0YVN0cmluZyA9IGRhdGEuZGF0YS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgaGVhdE1hcERhdGFDdXJzb3VyMSxcbiAgICAgICAgICAgICAgICBoZWF0TWFwRGF0YUN1cnNvdXIyXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgaGVhZE1hcERhdGEgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgaGVhZE1hcERhdGEgPSBKU09OLnBhcnNlKGhlYXREYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgaGVhdG1hcCBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSYXRpbmcgZGF0YSBleHRyYWN0aW9uXG4gICAgICAgICAgICBsZXQgYWxsUmF0aW5nID1cbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGFsbF9yYXRpbmcgPSBcIikgKyBcInZhciBhbGxfcmF0aW5nID0gXCIubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGFsbFJhdGluZzIgPSBkYXRhLmRhdGEuc2VhcmNoKFwidmFyIGN1cnJlbnRfdXNlcl9yYXRpbmcgPVwiKSAtIDY7XG5cbiAgICAgICAgICAgIGxldCByYXRpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgIHJhdGluZ0RhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5zdWJzdHJpbmcoYWxsUmF0aW5nLCBhbGxSYXRpbmcyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwYXJzaW5nIHJhdGluZyBkYXRhXCIsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZG9tID0gbmV3IEpTRE9NKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xuXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMV0/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIFNhZmUgZXh0cmFjdGlvbiB3aXRoIG9wdGlvbmFsIGNoYWluaW5nXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWRldGFpbHMtY29udGFpbmVyXCIpPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gY3VycmVudFJhdGluZ1RleHQgPyBwYXJzZUludChjdXJyZW50UmF0aW5nVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBoaWdoZXN0UmF0aW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmF0aW5nLW51bWJlclwiKT8ucGFyZW50Tm9kZT8uY2hpbGRyZW5bNF0/LnRleHRDb250ZW50Py5zcGxpdChcIlJhdGluZ1wiKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RSYXRpbmcgPSBoaWdoZXN0UmF0aW5nVGV4dCA/IHBhcnNlSW50KGhpZ2hlc3RSYXRpbmdUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlGbGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWNvdW50cnktZmxhZ1wiKT8uZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jb3VudHJ5LW5hbWVcIik/LnRleHRDb250ZW50IHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFJhbmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmctcmFua3NcIik/LmNoaWxkcmVuWzBdPy5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgID8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzBdPy5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxSYW5rID0gZ2xvYmFsUmFua1RleHQgPyBwYXJzZUludChnbG9iYWxSYW5rVGV4dCkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBjb3VudHJ5UmFua1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhdGluZy1yYW5rc1wiKT8uY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdXG4gICAgICAgICAgICAgICAgPy5jaGlsZHJlblswXT8uY2hpbGRyZW5bMF0/LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnlSYW5rID0gY291bnRyeVJhbmtUZXh0ID8gcGFyc2VJbnQoY291bnRyeVJhbmtUZXh0KSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYXRpbmdcIik/LnRleHRDb250ZW50IHx8IFwidW5yYXRlZFwiO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IEZ1bGx5IFNvbHZlZCBDb3VudFxuICAgICAgICAgICAgbGV0IGZ1bGx5U29sdmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgY29uc3QgaDVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoNVwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaDUgb2YgaDVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChoNS50ZXh0Q29udGVudD8uaW5jbHVkZXMoXCJGdWxseSBTb2x2ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBoNS50ZXh0Q29udGVudC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGx5U29sdmVkQ291bnQgPSBwYXJzZUludChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9maWxlLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY3VycmVudFJhdGluZyxcbiAgICAgICAgICAgICAgICBoaWdoZXN0UmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvdW50cnlGbGFnLFxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lLFxuICAgICAgICAgICAgICAgIGdsb2JhbFJhbmssXG4gICAgICAgICAgICAgICAgY291bnRyeVJhbmssXG4gICAgICAgICAgICAgICAgc3RhcnMsXG4gICAgICAgICAgICAgICAgaGVhdE1hcDogaGVhZE1hcERhdGEsXG4gICAgICAgICAgICAgICAgcmF0aW5nRGF0YSxcbiAgICAgICAgICAgICAgICBmdWxseVNvbHZlZENvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogcmVzZGF0YS5zdGF0dXMgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA0MDQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNvZGVDaGVmT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZUNoZWZVc2VyKGhhbmRsZSk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGlzIHByZXNlbnQgaW4gdGhlIG5hbWVcbiAgICAgICAgLy8gVGhlIHVzZXIgZWRpdHMgdGhlaXIgXCJOYW1lXCIgZmllbGQgdG8gaW5jbHVkZSB0aGUgY29kZVxuICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZUNoZWZWZXJpZmllZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdmVyaWZpZWQgaGFuZGxlIGlzIHRoZSBvbmUgc3RvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hlZkhhbmRsZTogaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvc2V0dGluZ3NcIik7IC8vIFJldmFsaWRhdGUgc2V0dGluZ3MgcGFnZXNcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7IC8vIEludmFsaWRhdGUgdXNlciBjYWNoZSB0YWdcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSB1cGRhdGUgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSB2ZXJpZmljYXRpb24gc3RhdHVzXCIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVmVyaWZpY2F0aW9uIGNvZGUgbm90IGZvdW5kIGluIENvZGVDaGVmIG5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCB5b3VyIHByb2ZpbGUgbmFtZS5cIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBDb2RlQ2hlZiBwcm9maWxlXCIgfTtcbn1cbi8vIC4uLiAoZXhpc3RpbmcgaW1wb3J0cyBhbmQgZnVuY3Rpb25zKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tDb2RlZm9yY2VzVXNlcihoYW5kbGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFt1c2VySW5mb1JlcywgdXNlclN0YXR1c1Jlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9hcGkvdXNlci5pbmZvP2hhbmRsZXM9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2NvZGVmb3JjZXMuY29tL2FwaS91c2VyLnN0YXR1cz9oYW5kbGU9JHtoYW5kbGV9YCwgeyBjYWNoZTogJ25vLXN0b3JlJyB9KVxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAodXNlckluZm9SZXMub2sgJiYgdXNlclN0YXR1c1Jlcy5vaykge1xuICAgICAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCB1c2VySW5mb1Jlcy5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNEYXRhID0gYXdhaXQgdXNlclN0YXR1c1Jlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5zdGF0dXMgPT09IFwiT0tcIiAmJiB1c2VyRGF0YS5yZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyRGF0YS5yZXN1bHRbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc29sdmVkIGNvdW50IGFuZCBkaWZmaWN1bHR5IGJyZWFrZG93blxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZVNvbHZlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHZlZEJ5RGlmZmljdWx0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgRUFTWTogMCxcbiAgICAgICAgICAgICAgICAgICAgTUVESVVNOiAwLFxuICAgICAgICAgICAgICAgICAgICBIQVJEOiAwLFxuICAgICAgICAgICAgICAgICAgICBUT1RBTDogMFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRGF0YS5zdGF0dXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1pc3Npb24gb2Ygc3RhdHVzRGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJtaXNzaW9uLnZlcmRpY3QgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JsZW1JZCA9IGAke3N1Ym1pc3Npb24ucHJvYmxlbS5jb250ZXN0SWR9LSR7c3VibWlzc2lvbi5wcm9ibGVtLmluZGV4fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVTb2x2ZWQuaGFzKHByb2JsZW1JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlU29sdmVkLmFkZChwcm9ibGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbmcgPSBzdWJtaXNzaW9uLnByb2JsZW0ucmF0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF0aW5nIDwgMTIwMCkgc29sdmVkQnlEaWZmaWN1bHR5LkVBU1krKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDE2MDApIHNvbHZlZEJ5RGlmZmljdWx0eS5NRURJVU0rKzsgLy8gQWRqdXN0ZWQgdGhyZXNob2xkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBzb2x2ZWRCeURpZmZpY3VsdHkuSEFSRCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgdW5yYXRlZCBhcyBlYXN5IG9yIGlnbm9yZT8gTGV0J3MgYWRkIHRvIEVhc3kgZm9yIG5vdyBvciBqdXN0IFRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZWRCeURpZmZpY3VsdHkuRUFTWSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eS5UT1RBTCA9IHVuaXF1ZVNvbHZlZC5zaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBvdGhlciBmaWVsZHMgaWYgbmVlZGVkIGZvciBleGlzdGVuY2Ugb3IgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6IHVzZXIucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICByYW5rOiB1c2VyLnJhbmssXG4gICAgICAgICAgICAgICAgICAgIG1heFJhdGluZzogdXNlci5tYXhSYXRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG1heFJhbms6IHVzZXIubWF4UmFuayxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLnRpdGxlUGhvdG8gfHwgdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIHNvbHZlZEJ5RGlmZmljdWx0eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogdXNlckluZm9SZXMuc3RhdHVzIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgc3RhdHVzOiA1MDAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlDb2RlZm9yY2VzT3duZXJzaGlwKGhhbmRsZTogc3RyaW5nLCB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrQ29kZWZvcmNlc1VzZXIoaGFuZGxlKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgcHJlc2VudCBpbiB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAvLyBDb2RlZm9yY2VzIGFsbG93cyBjaGFuZ2luZyBGaXJzdCBOYW1lIGluIHNldHRpbmdzXG4gICAgICAgIGlmIChyZXN1bHQuZmlyc3ROYW1lICYmIHJlc3VsdC5maXJzdE5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZWZvcmNlc1ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSB2ZXJpZmllZCBoYW5kbGUgaXMgdGhlIG9uZSBzdG9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpOyAvLyBSZXZhbGlkYXRlIHNldHRpbmdzIHBhZ2VzXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVRhZyhgdXNlci0ke3Nlc3Npb24udXNlci5pZH1gLFwibWF4XCIpOyAvLyBJbnZhbGlkYXRlIHVzZXIgY2FjaGUgdGFnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgdmVyaWZpY2F0aW9uIHN0YXR1c1wiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBDb2RlZm9yY2VzIEZpcnN0IE5hbWUuIFBsZWFzZSBlbnN1cmUgeW91IGhhdmUgdXBkYXRlZCBpdCBpbiB5b3VyIHByb2ZpbGUgc2V0dGluZ3MuXCIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggQ29kZWZvcmNlcyBwcm9maWxlXCIgfTtcbn1cblxuLy8gQ2hlY2sgTGVldENvZGUgVXNlclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTGVldENvZGVVc2VyKGhhbmRsZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBMZWV0Q29kZSB9ID0gYXdhaXQgaW1wb3J0KFwibGVldGNvZGUtcXVlcnlcIik7XG4gICAgICAgIGNvbnN0IGxlZXRjb2RlID0gbmV3IExlZXRDb2RlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBsZWV0Y29kZS51c2VyKGhhbmRsZSk7XG5cbiAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5tYXRjaGVkVXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS5yZWFsTmFtZSxcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHVzZXIubWF0Y2hlZFVzZXIucHJvZmlsZS51c2VyQXZhdGFyLFxuICAgICAgICAgICAgICAgIHN1Ym1pdFN0YXRzOiB1c2VyLm1hdGNoZWRVc2VyLnN1Ym1pdFN0YXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBzdGF0dXM6IDQwNCB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkxlZXRDb2RlIGNoZWNrIGVycm9yOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIHN0YXR1czogNTAwIH07XG4gICAgfVxufVxuXG4vLyBWZXJpZnkgTGVldENvZGUgT3duZXJzaGlwXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5TGVldENvZGVPd25lcnNoaXAoaGFuZGxlOiBzdHJpbmcsIHZlcmlmaWNhdGlvbkNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2tMZWV0Q29kZVVzZXIoaGFuZGxlKTtcblxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0Lm5hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHZlcmlmaWNhdGlvbiBjb2RlIGlzIGluIHRoZSBuYW1lXG4gICAgICAgICAgICBpZiAocmVzdWx0Lm5hbWUuaW5jbHVkZXModmVyaWZpY2F0aW9uQ29kZSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24udXNlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZXRDb2RlVmVyaWZpZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVldENvZGVIYW5kbGU6IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL3NldHRpbmdzXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlVGFnKGB1c2VyLSR7c2Vzc2lvbi51c2VyLmlkfWAsXCJtYXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgdXBkYXRlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gdXBkYXRlIHZlcmlmaWNhdGlvbiBzdGF0dXNcIiB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlZlcmlmaWNhdGlvbiBjb2RlIG5vdCBmb3VuZCBpbiBMZWV0Q29kZSBOYW1lLiBQbGVhc2UgZW5zdXJlIHlvdSBoYXZlIHVwZGF0ZWQgaXQgaW4geW91ciBwcm9maWxlLlwiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB2ZXJpZnkgTGVldENvZGUgcHJvZmlsZVwiIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBMZWV0Q29kZSBwcm9maWxlIG9yIG5hbWUgaXMgZW1wdHlcIiB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxU0FvUXNCIn0=
}),
"[project]/components/dashboard/ProblemOverviewCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProblemOverviewCard",
    ()=>ProblemOverviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$6cf207__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:6cf207 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$99cd87__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:99cd87 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$d082da__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:d082da [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ProblemOverviewCard({ solvedByDifficulty, totalProblems, problemsSolved, leetCodeHandle, codeChefHandle, codeforcesHandle }) {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    // Existing Logic for Internal Overview
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] p-6 hover:shadow-md transition-all h-[400px] flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold text-gray-900 dark:text-gray-100",
                    children: "Problem Solving Overview"
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                        active: activeTab === "overview",
                        onClick: ()=>setActiveTab("overview"),
                        children: "Overview"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 66,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                        active: activeTab === "leetcode",
                        onClick: ()=>setActiveTab("leetcode"),
                        children: "LeetCode"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 67,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                        active: activeTab === "codechef",
                        onClick: ()=>setActiveTab("codechef"),
                        children: "CodeChef"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 68,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                        active: activeTab === "codeforces",
                        onClick: ()=>setActiveTab("codeforces"),
                        children: "CodeForces"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 69,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0",
                children: [
                    activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col-reverse sm:flex-row items-center justify-between gap-8 h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full sm:w-auto min-w-[140px] space-y-3 self-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                        color: "bg-green-500",
                                        label: "Easy",
                                        value: solvedByDifficulty.EASY,
                                        total: totalProblems.EASY
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 76,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                        color: "bg-orange-500",
                                        label: "Med.",
                                        value: solvedByDifficulty.MEDIUM,
                                        total: totalProblems.MEDIUM
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 77,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                        color: "bg-red-500",
                                        label: "Hard",
                                        value: solvedByDifficulty.HARD,
                                        total: totalProblems.HARD
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 75,
                                columnNumber: 26
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1 flex items-center justify-center h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-48 h-48 md:w-56 md:h-56",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-full h-full transform -rotate-90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "50%",
                                                    cy: "50%",
                                                    r: radius,
                                                    fill: "none",
                                                    className: "stroke-gray-100 dark:stroke-[#262626]",
                                                    strokeWidth: "20"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "50%",
                                                    cy: "50%",
                                                    r: radius,
                                                    fill: "none",
                                                    stroke: "#22c55e",
                                                    strokeWidth: "20",
                                                    strokeDasharray: circumference,
                                                    strokeDashoffset: circumference - easyArc,
                                                    strokeLinecap: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "50%",
                                                    cy: "50%",
                                                    r: radius,
                                                    fill: "none",
                                                    stroke: "#f97316",
                                                    strokeWidth: "20",
                                                    strokeDasharray: circumference,
                                                    strokeDashoffset: circumference - medArc,
                                                    strokeLinecap: "round",
                                                    style: {
                                                        transform: `rotate(${easyPct / 100 * 360}deg)`,
                                                        transformOrigin: "50% 50%"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "50%",
                                                    cy: "50%",
                                                    r: radius,
                                                    fill: "none",
                                                    stroke: "#ef4444",
                                                    strokeWidth: "20",
                                                    strokeDasharray: circumference,
                                                    strokeDashoffset: circumference - hardArc,
                                                    strokeLinecap: "round",
                                                    style: {
                                                        transform: `rotate(${(easyPct + medPct) / 100 * 360}deg)`,
                                                        transformOrigin: "50% 50%"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 83,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight",
                                                    children: [
                                                        percentage,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-gray-400 uppercase tracking-wider mt-1",
                                                    children: "Completed"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-gray-500 mt-2",
                                                    children: [
                                                        calculatedSolved,
                                                        " / ",
                                                        total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                            lineNumber: 89,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 82,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 81,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 74,
                        columnNumber: 21
                    }, this),
                    activeTab === "leetcode" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LeetCodeView, {
                        handle: leetCodeHandle
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 99,
                        columnNumber: 46
                    }, this),
                    activeTab === "codechef" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeChefView, {
                        handle: codeChefHandle
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 100,
                        columnNumber: 46
                    }, this),
                    activeTab === "codeforces" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeForcesView, {
                        handle: codeforcesHandle
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 101,
                        columnNumber: 48
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
function TabButton({ active, onClick, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${active ? "bg-black dark:bg-white text-white dark:text-black" : "bg-gray-100 dark:bg-[#262626] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333]"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 109,
        columnNumber: 9
    }, this);
}
function LegendItem({ color, label, value, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-1.5 h-1.5 rounded-full ${color}`
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-semibold ${color.replace("bg-", "text-").replace("500", "600")} dark:${color.replace("bg-", "text-").replace("500", "500")}`,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 127,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-right flex items-baseline gap-1 pl-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-gray-900 dark:text-gray-100",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this),
                    total !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-gray-400",
                        children: [
                            "/ ",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 131,
                        columnNumber: 41
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 129,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 124,
        columnNumber: 9
    }, this);
}
// --- Sub-Views ---
function LeetCodeView({ handle }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (handle) {
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$d082da__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkLeetCodeUser"])(handle).then((res)=>{
                if (res.success) setData(res);
                setLoading(false);
            });
        }
    }, [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "No LeetCode handle linked"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 153,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            className: "w-6 h-6 animate-spin text-gray-400"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 154,
            columnNumber: 82
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 154,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "Failed to load data"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 155,
        columnNumber: 23
    }, this);
    const easy = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Easy")?.count || 0;
    const medium = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Medium")?.count || 0;
    const hard = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "Hard")?.count || 0;
    const total = data.submitStats?.acSubmissionNum?.find((s)=>s.difficulty === "All")?.count || 0;
    // Total available questions (approximate, hardcoded or if API provided)
    // LeetCode API sometimes provides total questions count in `allQuestionsCount` but I didn't fetch it.
    // I'll just show solved counts.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col-reverse sm:flex-row items-center justify-between gap-8 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full sm:w-auto min-w-[140px] space-y-3 self-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                        color: "bg-green-500",
                        label: "Easy",
                        value: easy
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 169,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                        color: "bg-orange-500",
                        label: "Med.",
                        value: medium
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 170,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                        color: "bg-red-500",
                        label: "Hard",
                        value: hard
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 171,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-4xl font-bold text-gray-900 dark:text-white",
                            children: total
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 175,
                            columnNumber: 22
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-500 uppercase tracking-wider",
                            children: "Solved"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 176,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 174,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 173,
                columnNumber: 14
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 167,
        columnNumber: 9
    }, this);
}
function CodeChefView({ handle }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (handle) {
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$6cf207__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkCodeChefUser"])(handle).then((res)=>{
                if (res.success) setData(res);
                setLoading(false);
            });
        }
    }, [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "No CodeChef handle linked"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 197,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            className: "w-6 h-6 animate-spin text-gray-400"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 198,
            columnNumber: 82
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 198,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "Failed to load data"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 199,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Current Rating"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 206,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.currentRating
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 207,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-gray-400",
                                    children: data.stars
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 208,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 205,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Global Rank"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 211,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.globalRank
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 212,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 210,
                            columnNumber: 22
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Problems Solved"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 215,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.fullySolvedCount
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 216,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 214,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Contests"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 219,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.ratingData?.length || 0
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 220,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 218,
                            columnNumber: 23
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 204,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 203,
                columnNumber: 13
            }, this),
            data.ratingData && data.ratingData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 w-full min-h-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: data.ratingData,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    backgroundColor: '#262626',
                                    borderColor: '#333',
                                    borderRadius: '8px',
                                    color: '#fff'
                                },
                                itemStyle: {
                                    color: '#fff'
                                },
                                labelStyle: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 230,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "rating",
                                stroke: "#f97316",
                                strokeWidth: 2,
                                dot: false
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 235,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 229,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 227,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 202,
        columnNumber: 9
    }, this);
}
function CodeForcesView({ handle }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (handle) {
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$99cd87__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkCodeforcesUser"])(handle).then((res)=>{
                if (res.success) setData(res);
                setLoading(false);
            });
        }
    }, [
        handle
    ]);
    if (!handle) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "No CodeForces handle linked"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 258,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            className: "w-6 h-6 animate-spin text-gray-400"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
            lineNumber: 259,
            columnNumber: 82
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 259,
        columnNumber: 25
    }, this);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center text-gray-500 text-sm",
        children: "Failed to load data"
    }, void 0, false, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 260,
        columnNumber: 23
    }, this);
    const solved = data.solvedByDifficulty || {
        EASY: 0,
        MEDIUM: 0,
        HARD: 0,
        TOTAL: 0
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Rating"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 270,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.rating || "Unrated"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 271,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-gray-400",
                                    children: data.rank || "-"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 272,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 269,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: "Max Rating"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 275,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-900 dark:text-white",
                                    children: data.maxRating || "Unrated"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 276,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 274,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                    lineNumber: 268,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 267,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col-reverse sm:flex-row items-center justify-between gap-8 h-full flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full sm:w-auto min-w-[140px] space-y-3 self-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                color: "bg-green-500",
                                label: "Easy (<1200)",
                                value: solved.EASY
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 283,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                color: "bg-orange-500",
                                label: "Med. (1200-1600)",
                                value: solved.MEDIUM
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 284,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendItem, {
                                color: "bg-red-500",
                                label: "Hard (1600+)",
                                value: solved.HARD
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 282,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 flex items-center justify-center h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-4xl font-bold text-gray-900 dark:text-white",
                                    children: solved.TOTAL
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 289,
                                    columnNumber: 26
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-500 uppercase tracking-wider",
                                    children: "Total Solved"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                                    lineNumber: 290,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                            lineNumber: 288,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                        lineNumber: 287,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
                lineNumber: 281,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/ProblemOverviewCard.tsx",
        lineNumber: 266,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_12b56779._.js.map