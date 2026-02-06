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
"[project]/actions/data:572fcd [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40dcf2b262cc87e0478a9f114239bdf2ac94b94b3c":"updateUserInfo"},"actions/user.action.ts",""] */ __turbopack_context__.s([
    "updateUserInfo",
    ()=>updateUserInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updateUserInfo = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40dcf2b262cc87e0478a9f114239bdf2ac94b94b3c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateUserInfo"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlci5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vKipcbiAqIEdldCB1c2VyJ3MgdG90YWwgc2NvcmUgKGNhY2hlZCBmb3IgNSBtaW51dGVzKVxuICogQ2FjaGUgaXMgaW52YWxpZGF0ZWQgd2hlbiB1c2VyIHNvbHZlcyBhIHByb2JsZW0gdmlhIHVwZGF0ZVRhZ1xuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2NvcmUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiOyAvLyBNdXN0IGJlIGF0IHRvcCAtIGFsbG93cyBoZWFkZXJzKCkgaW5zaWRlXG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pOyAvLyA1IG1pbnV0ZXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNhY2hlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWAsIGB1c2VyLSR7dXNlcklkfWApO1xuXG4gICAgcmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIFJlY2FsY3VsYXRlIHVzZXIncyB0b3RhbCBzY29yZSBiYXNlZCBvbiB0aGVpciBzb2x2ZWQgcHJvYmxlbXNcbiAqIFRoaXMgZml4ZXMgYW55IGluY29ycmVjdCBzY29yZXMgaW4gdGhlIGRhdGFiYXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNhbGN1bGF0ZVVzZXJTY29yZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbmV3U2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHJldHVybiBVc2VyU2VydmljZS5yZWNhbGN1bGF0ZVVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIENvbXBsZXRlIHVzZXIgb25ib2FyZGluZyBwcm9jZXNzXG4gKiBVcGRhdGVzIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvbiBhbmQgbWFya3Mgb25ib2FyZGluZyBhcyBjb21wbGV0ZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKGRhdGE6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGJpbz86IHN0cmluZztcbiAgICBjb2xsZWdlSWQ6IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgZ2l0aHViSGFuZGxlPzogc3RyaW5nO1xufSk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgVXNlclNlcnZpY2UuY29tcGxldGVPbmJvYXJkaW5nKHVzZXJJZCwgZGF0YSk7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBSZWRpcyBjYWNoZSAocmVkdW5kYW50IGJ1dCBnb29kIHRvIGhhdmUgaGVyZSB0b28pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgZGFzaGJvYXJkLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogVXBkYXRlIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluZm8oZGF0YToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgYmlvPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgY29kZWZvcmNlc0hhbmRsZT86IHN0cmluZztcbiAgICBnaXRodWJIYW5kbGU/OiBzdHJpbmc7XG59KTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBiaW86IGRhdGEuYmlvLFxuICAgICAgICAgICAgICAgIGxlZXRDb2RlSGFuZGxlOiBkYXRhLmxlZXRDb2RlSGFuZGxlLFxuICAgICAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiBkYXRhLmNvZGVDaGVmSGFuZGxlLFxuICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGRhdGEuY29kZWZvcmNlc0hhbmRsZSxcbiAgICAgICAgICAgICAgICBnaXRodWJIYW5kbGU6IGRhdGEuZ2l0aHViSGFuZGxlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbnZhbGlkYXRlIFJlZGlzIGNhY2hlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci1zY29yZS0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGBkYXNoYm9hcmQtJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZygnZGFzaGJvYXJkLXN0YXRzJyk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSB1c2VyIGluZm86XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFN5bmMgdXNlciBwcm9maWxlIGFuZCBzdGF0c1xuICogQ2xlYXJzIGFsbCBjYWNoZXMgcmVsYXRlZCB0byB0aGUgdXNlciBhbmQgcmV2YWxpZGF0ZXMgZGFzaGJvYXJkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jVXNlclByb2ZpbGUoKTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBJbnZhbGlkYXRlIFJlZGlzIGNhY2hlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIHJlZGlzIGNhY2hlIGR1cmluZyBzeW5jOlwiLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXZhbGlkYXRlIE5leHQuanMgY2FjaGVcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci1zY29yZS0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKCdkYXNoYm9hcmQtc3RhdHMnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN5bmMgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3luYyBwcm9maWxlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhSQWlHc0IifQ==
}),
"[project]/components/dashboard/EditProfileModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditProfileModal",
    ()=>EditProfileModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$572fcd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:572fcd [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
;
;
function EditProfileModal({ isOpen, onClose, user }) {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        defaultValues: {
            name: user.name || "",
            bio: user.bio || "",
            leetCodeHandle: user.leetCodeHandle || "",
            codeChefHandle: user.codeChefHandle || "",
            codeforcesHandle: user.codeforcesHandle || "",
            githubHandle: user.githubHandle || ""
        }
    });
    const onSubmit = async (data)=>{
        setIsLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$572fcd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateUserInfo"])(data);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Profile updated successfully");
                onClose();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Failed to update profile");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-[#141414] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 border border-gray-200 dark:border-[#262626]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
                            children: "Edit Profile"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-full transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5 text-gray-500 dark:text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit(onSubmit),
                    className: "p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                    children: "Display Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 78,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ...register("name", {
                                        required: "Name is required"
                                    }),
                                    className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors",
                                    placeholder: "Your Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 79,
                                    columnNumber: 25
                                }, this),
                                errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-500",
                                    children: errors.name.message
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                    children: "Bio"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register("bio"),
                                    rows: 3,
                                    className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors resize-none",
                                    placeholder: "Tell us about yourself..."
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-2",
                            children: "Social Handles"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 98,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "LeetCode"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 102,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("leetCodeHandle"),
                                            className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors",
                                            placeholder: "username"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 103,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 101,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "CodeChef"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("codeChefHandle"),
                                            className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors",
                                            placeholder: "username"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 111,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "GitHub"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 118,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("githubHandle"),
                                            className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors",
                                            placeholder: "username"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 119,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: "Codeforces"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 126,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ...register("codeforcesHandle"),
                                            className: "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors",
                                            placeholder: "username"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 127,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 125,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 100,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 136,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
                                    children: [
                                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-4 h-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                            lineNumber: 148,
                                            columnNumber: 43
                                        }, this),
                                        "Save Changes"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                            lineNumber: 135,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/EditProfileModal.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/EditProfileModal.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/EditProfileModal.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:3d1fad [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09":"syncUserProfile"},"actions/user.action.ts",""] */ __turbopack_context__.s([
    "syncUserProfile",
    ()=>syncUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var syncUserProfile = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("002aa3dda4f25040a3c6010d4b8c2ac1d87451eb09", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "syncUserProfile"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlci5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vKipcbiAqIEdldCB1c2VyJ3MgdG90YWwgc2NvcmUgKGNhY2hlZCBmb3IgNSBtaW51dGVzKVxuICogQ2FjaGUgaXMgaW52YWxpZGF0ZWQgd2hlbiB1c2VyIHNvbHZlcyBhIHByb2JsZW0gdmlhIHVwZGF0ZVRhZ1xuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyU2NvcmUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiOyAvLyBNdXN0IGJlIGF0IHRvcCAtIGFsbG93cyBoZWFkZXJzKCkgaW5zaWRlXG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pOyAvLyA1IG1pbnV0ZXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIGNhY2hlVGFnKGB1c2VyLXNjb3JlLSR7dXNlcklkfWAsIGB1c2VyLSR7dXNlcklkfWApO1xuXG4gICAgcmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIFJlY2FsY3VsYXRlIHVzZXIncyB0b3RhbCBzY29yZSBiYXNlZCBvbiB0aGVpciBzb2x2ZWQgcHJvYmxlbXNcbiAqIFRoaXMgZml4ZXMgYW55IGluY29ycmVjdCBzY29yZXMgaW4gdGhlIGRhdGFiYXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNhbGN1bGF0ZVVzZXJTY29yZSgpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbmV3U2NvcmU6IG51bWJlciB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24udXNlci5pZDtcblxuICAgIHJldHVybiBVc2VyU2VydmljZS5yZWNhbGN1bGF0ZVVzZXJTY29yZSh1c2VySWQpO1xufVxuXG4vKipcbiAqIENvbXBsZXRlIHVzZXIgb25ib2FyZGluZyBwcm9jZXNzXG4gKiBVcGRhdGVzIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvbiBhbmQgbWFya3Mgb25ib2FyZGluZyBhcyBjb21wbGV0ZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKGRhdGE6IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGJpbz86IHN0cmluZztcbiAgICBjb2xsZWdlSWQ6IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgZ2l0aHViSGFuZGxlPzogc3RyaW5nO1xufSk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgVXNlclNlcnZpY2UuY29tcGxldGVPbmJvYXJkaW5nKHVzZXJJZCwgZGF0YSk7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBSZWRpcyBjYWNoZSAocmVkdW5kYW50IGJ1dCBnb29kIHRvIGhhdmUgaGVyZSB0b28pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgZGFzaGJvYXJkLSR7dXNlcklkfWApO1xuICAgICAgICB1cGRhdGVUYWcoJ2Rhc2hib2FyZC1zdGF0cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogVXBkYXRlIHVzZXIgcHJvZmlsZSBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluZm8oZGF0YToge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgYmlvPzogc3RyaW5nO1xuICAgIGxlZXRDb2RlSGFuZGxlPzogc3RyaW5nO1xuICAgIGNvZGVDaGVmSGFuZGxlPzogc3RyaW5nO1xuICAgIGhhY2tlcnJhbmtIYW5kbGU/OiBzdHJpbmc7XG4gICAgY29kZWZvcmNlc0hhbmRsZT86IHN0cmluZztcbiAgICBnaXRodWJIYW5kbGU/OiBzdHJpbmc7XG59KTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBiaW86IGRhdGEuYmlvLFxuICAgICAgICAgICAgICAgIGxlZXRDb2RlSGFuZGxlOiBkYXRhLmxlZXRDb2RlSGFuZGxlLFxuICAgICAgICAgICAgICAgIGNvZGVDaGVmSGFuZGxlOiBkYXRhLmNvZGVDaGVmSGFuZGxlLFxuICAgICAgICAgICAgICAgIGNvZGVmb3JjZXNIYW5kbGU6IGRhdGEuY29kZWZvcmNlc0hhbmRsZSxcbiAgICAgICAgICAgICAgICBnaXRodWJIYW5kbGU6IGRhdGEuZ2l0aHViSGFuZGxlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbnZhbGlkYXRlIFJlZGlzIGNhY2hlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIGRhc2hib2FyZCByZWRpcyBjYWNoZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci1zY29yZS0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKGBkYXNoYm9hcmQtJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZygnZGFzaGJvYXJkLXN0YXRzJyk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSB1c2VyIGluZm86XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZVwiIH07XG4gICAgfVxufVxuXG4vKipcbiAqIFN5bmMgdXNlciBwcm9maWxlIGFuZCBzdGF0c1xuICogQ2xlYXJzIGFsbCBjYWNoZXMgcmVsYXRlZCB0byB0aGUgdXNlciBhbmQgcmV2YWxpZGF0ZXMgZGFzaGJvYXJkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jVXNlclByb2ZpbGUoKTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IGVycm9yPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBJbnZhbGlkYXRlIFJlZGlzIGNhY2hlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWRpcyA9IChhd2FpdCBpbXBvcnQoXCJAL2xpYi9yZWRpc1wiKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGF3YWl0IHJlZGlzLmRlbChgZGFzaGJvYXJkOnN0YXRzOiR7dXNlcklkfWApO1xuICAgICAgICAgICAgYXdhaXQgcmVkaXMuZGVsKGB1c2VyLXNjb3JlLSR7dXNlcklkfWApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBpbnZhbGlkYXRlIHJlZGlzIGNhY2hlIGR1cmluZyBzeW5jOlwiLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXZhbGlkYXRlIE5leHQuanMgY2FjaGVcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkXCIpO1xuICAgICAgICB1cGRhdGVUYWcoYHVzZXItJHt1c2VySWR9YCk7XG4gICAgICAgIHVwZGF0ZVRhZyhgdXNlci1zY29yZS0ke3VzZXJJZH1gKTtcbiAgICAgICAgdXBkYXRlVGFnKCdkYXNoYm9hcmQtc3RhdHMnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN5bmMgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3luYyBwcm9maWxlXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitSQXlKc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$EditProfileModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/EditProfileModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3d1fad__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:3d1fad [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ProfileActions({ user, readonly }) {
    const [isEditModalOpen, setIsEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSyncing, setIsSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    if (readonly) return null;
    const handleSync = async ()=>{
        setIsSyncing(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$3d1fad__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["syncUserProfile"])();
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 w-full mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsEditModalOpen(true),
                        className: "flex-1 py-2 px-4 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors",
                        children: "Edit Profile"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProfileActions.tsx",
                        lineNumber: 51,
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
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/ProfileActions.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/ProfileActions.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$EditProfileModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditProfileModal"], {
                isOpen: isEditModalOpen,
                onClose: ()=>setIsEditModalOpen(false),
                user: user
            }, void 0, false, {
                fileName: "[project]/components/dashboard/ProfileActions.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
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
];

//# sourceMappingURL=_7b774aab._.js.map