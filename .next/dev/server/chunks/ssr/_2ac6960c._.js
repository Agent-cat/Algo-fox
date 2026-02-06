module.exports = [
"[project]/components/problems/ModeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ModeToggle({ mode, onModeChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative inline-flex items-center bg-gray-100 dark:bg-[#1a1a1a] rounded-lg p-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onModeChange("practice"),
                    className: `relative z-10 px-8 py-2 hover:cursor-pointer rounded-md font-medium text-sm ${mode === "practice" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`,
                    children: [
                        mode === "practice" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            layoutId: "active-pill",
                            className: "absolute inset-0 bg-white dark:bg-[#262626] rounded-md shadow-sm border border-gray-200 dark:border-[#333333]",
                            transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                            },
                            style: {
                                zIndex: -1
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/problems/ModeToggle.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this),
                        "Practice"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/problems/ModeToggle.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onModeChange("learn"),
                    className: `relative z-10 px-8 py-2 hover:cursor-pointer rounded-md font-medium text-sm ${mode === "learn" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`,
                    children: [
                        mode === "learn" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            layoutId: "active-pill",
                            className: "absolute inset-0 bg-white dark:bg-[#262626] hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md shadow-sm border border-gray-200 dark:border-[#333333]",
                            transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                            },
                            style: {
                                zIndex: -1
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/problems/ModeToggle.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this),
                        "Learn"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/problems/ModeToggle.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/problems/ModeToggle.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/problems/ModeToggle.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
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
"[project]/actions/data:f29403 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"ffb6064b0a0a619152cef9d1130640ca662759362c":"getProblems"},"actions/problems.ts",""] */ __turbopack_context__.s([
    "getProblems",
    ()=>getProblems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getProblems = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("ffb6064b0a0a619152cef9d1130640ca662759362c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getProblems"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvYmxlbXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IFByb2JsZW1TZXJ2aWNlIH0gZnJvbSBcIkAvY29yZS9zZXJ2aWNlcy9wcm9ibGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IERpZmZpY3VsdHksIFByb2JsZW1UeXBlLCBQcm9ibGVtRG9tYWluIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCwgdXBkYXRlVGFnLCBjYWNoZVRhZywgY2FjaGVMaWZlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcblxuLy8gR0VUVElORyBQVUJMSUMgUFJPQkxFTVNcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDEwLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCIsXG4gICAgZGlmZmljdWx0eT86IERpZmZpY3VsdHksXG4gICAgdGFncz86IHN0cmluZ1tdLFxuICAgIGN1cnNvcj86IHN0cmluZ1xuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gICAgY29uc3QgdGFnS2V5ID0gYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9JHtkaWZmaWN1bHR5ID8gYC0ke2RpZmZpY3VsdHl9YCA6ICcnfSR7dGFncyAmJiB0YWdzLmxlbmd0aCA+IDAgPyBgLSR7dGFncy5qb2luKCctJyl9YCA6ICcnfSR7Y3Vyc29yID8gYC1jdXJzb3ItJHtjdXJzb3J9YCA6IGAtcGFnZS0ke3BhZ2V9YH0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1saXN0JywgYHByb2JsZW1zLSR7ZG9tYWlufS0ke3R5cGV9YCk7XG5cbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJvYmxlbXMocGFnZSwgcGFnZVNpemUsIHR5cGUsIGRvbWFpbiwgdXNlcklkLCBkaWZmaWN1bHR5LCB0YWdzIHx8IFtdLCBjdXJzb3IpO1xufVxuXG4vLyBHRVRUSU5HIEFETUlOIFBST0JMRU1TXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZG1pblByb2JsZW1zKFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDUwLFxuICAgIGRvbWFpbj86IFByb2JsZW1Eb21haW4sXG4gICAgZXhjbHVkZURpZmZpY3VsdHk/OiBEaWZmaWN1bHR5LFxuICAgIHR5cGU/OiBQcm9ibGVtVHlwZVxuKSB7XG4gICAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiA5MDAsIHJldmFsaWRhdGU6IDkwMCB9KTsgLy8gMTUgbWludXRlcyBkZWZhdWx0XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFVVEhFTlRJQ0FURURcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICAgIH0pO1xuXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZ0tleSA9IGBhZG1pbi1wcm9ibGVtcy0ke2RvbWFpbiB8fCAnYWxsJ30ke2V4Y2x1ZGVEaWZmaWN1bHR5ID8gYC1leGNsdWRlLSR7ZXhjbHVkZURpZmZpY3VsdHl9YCA6ICcnfSR7dHlwZSA/IGAtdHlwZS0ke3R5cGV9YCA6ICcnfS1wYWdlLSR7cGFnZX1gO1xuICAgIGNhY2hlVGFnKHRhZ0tleSwgJ2FkbWluLXByb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRBZG1pblByb2JsZW1zKHBhZ2UsIHBhZ2VTaXplLCBkb21haW4sIGV4Y2x1ZGVEaWZmaWN1bHR5LCB0eXBlKTtcbn1cblxuLy8gU0VBUkNISU5HIEZPUiBQUk9CTEVNU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoUHJvYmxlbXMoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHR5cGU6IFByb2JsZW1UeXBlID0gXCJQUkFDVElDRVwiLFxuICAgIGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCJcbikge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7IC8vIE11c3QgYmUgYXQgdG9wIC0gYWxsb3dzIGhlYWRlcnMoKSBpbnNpZGVcbiAgICBjYWNoZUxpZmUoeyBzdGFsZTogMzAwLCByZXZhbGlkYXRlOiAzMDAgfSk7IC8vIDUgbWludXRlcyBmb3Igc2VhcmNoIHJlc3VsdHNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG4gICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbj8udXNlcj8uaWQ7XG5cbiAgICBjb25zdCB0YWdLZXkgPSBgc2VhcmNoLSR7ZG9tYWlufS0ke3R5cGV9LSR7dGVybS50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDIwKX0ke3VzZXJJZCA/IGAtdXNlci0ke3VzZXJJZH1gIDogJyd9YDtcbiAgICBjYWNoZVRhZyh0YWdLZXksICdwcm9ibGVtcy1zZWFyY2gnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5zZWFyY2hQcm9ibGVtcyh0ZXJtLCB0eXBlLCBkb21haW4sIHVzZXJJZCk7XG59XG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIFNMVUcgQ0FDSEVEXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9ibGVtKHNsdWc6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLSR7c2x1Z31gLCAncHJvYmxlbXMtbGlzdCcpO1xuXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFByb2JsZW0oc2x1Zyk7XG59XG5cblxuLy8gQ1JFQVRJTkcgQSBQUk9CTEVNIC0tPiBBRE1JTiBPTkxZXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQcm9ibGVtKGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGlmZmljdWx0eTogRGlmZmljdWx0eTtcbiAgICBzbHVnOiBzdHJpbmc7XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIGhpZGRlblF1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcbiAgICBkb21haW4/OiBQcm9ibGVtRG9tYWluO1xuICAgIHRlc3RDYXNlczogeyBpbnB1dDogc3RyaW5nOyBvdXRwdXQ6IHN0cmluZzsgaGlkZGVuPzogYm9vbGVhbiB9W107XG4gICAgdGFncz86IHN0cmluZ1tdO1xuICAgIHVzZUZ1bmN0aW9uVGVtcGxhdGU/OiBib29sZWFuO1xuICAgIGZ1bmN0aW9uVGVtcGxhdGVzPzogeyBsYW5ndWFnZUlkOiBudW1iZXI7IGZ1bmN0aW9uVGVtcGxhdGU6IHN0cmluZzsgZHJpdmVyQ29kZTogc3RyaW5nIH1bXTtcbiAgICBzb2x1dGlvbj86IHN0cmluZyB8IG51bGw7XG59KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgICAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgICB9KTtcblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5jcmVhdGVQcm9ibGVtKGRhdGEpO1xuXG4gICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL3NxbFwiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vcHJvYmxlbXNcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2RzYS9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vc3FsL3Byb2JsZW1zXCIpO1xuXG4gICAgICAgIHVwZGF0ZVRhZygnYWRtaW4tcHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoJ3Byb2JsZW1zLWxpc3QnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1TUUwtUFJBQ1RJQ0UnKTtcbiAgICAgICAgdXBkYXRlVGFnKCdwcm9ibGVtcy1EU0EtUFJBQ1RJQ0UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIEdFVFRJTkcgQSBQUk9CTEVNIEJZIElEXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUJ5SWQoaWQ6IHN0cmluZykge1xuICAgIFwidXNlIGNhY2hlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzIGRlZmF1bHRcblxuICAgIGNhY2hlVGFnKGBwcm9ibGVtLWlkLSR7aWR9YCwgJ3Byb2JsZW1zLWxpc3QnKTtcblxuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXRQcm9ibGVtQnlJZChpZCk7XG59XG5cbi8vIE5BVklHQVRJT04gQUNUSU9OU1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dFByb2JsZW0oY3VycmVudENyZWF0ZWRBdDogRGF0ZSwgZG9tYWluOiBQcm9ibGVtRG9tYWluLCB0eXBlOiBQcm9ibGVtVHlwZSkge1xuICAgIFwidXNlIGNhY2hlOiBwcml2YXRlXCI7XG4gICAgY2FjaGVMaWZlKHsgc3RhbGU6IDMwMCwgcmV2YWxpZGF0ZTogMzAwIH0pO1xuICAgIHJldHVybiBQcm9ibGVtU2VydmljZS5nZXROZXh0UHJvYmxlbShjdXJyZW50Q3JlYXRlZEF0LCBkb21haW4sIHR5cGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQ6IERhdGUsIGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICBcInVzZSBjYWNoZTogcHJpdmF0ZVwiO1xuICAgIGNhY2hlTGlmZSh7IHN0YWxlOiAzMDAsIHJldmFsaWRhdGU6IDMwMCB9KTtcbiAgICByZXR1cm4gUHJvYmxlbVNlcnZpY2UuZ2V0UHJldmlvdXNQcm9ibGVtKGN1cnJlbnRDcmVhdGVkQXQsIGRvbWFpbiwgdHlwZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSYW5kb21Qcm9ibGVtKGRvbWFpbjogUHJvYmxlbURvbWFpbiwgdHlwZTogUHJvYmxlbVR5cGUpIHtcbiAgICAvLyBObyBjYWNoZSBmb3IgcmFuZG9tXG4gICAgcmV0dXJuIFByb2JsZW1TZXJ2aWNlLmdldFJhbmRvbVByb2JsZW0oZG9tYWluLCB0eXBlKTtcbn1cblxuXG4vLyBVUERBVElORyBBIFBST0JMRU0gLS0+IEFETUlOIE9OTFlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9ibGVtKGlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS51cGRhdGVQcm9ibGVtKGlkLCBkYXRhKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW1zLSR7cmVzdWx0LmRhdGE/LmRvbWFpbiB8fCAnRFNBJ30tJHtyZXN1bHQuZGF0YT8udHlwZSB8fCAnUFJBQ1RJQ0UnfWApO1xuICAgICAgICB1cGRhdGVUYWcoYHByb2JsZW0tJHtyZXN1bHQuZGF0YT8uc2x1Z31gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIERFTEVUSU5HIEEgUFJPQkxFTSAtLT4gQURNSU4gT05MWVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2JsZW0oaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICAgICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gICAgfSk7XG5cbiAgICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9ibGVtU2VydmljZS5kZWxldGVQcm9ibGVtKGlkKTtcblxuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtc1wiKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vcHJvYmxlbXNgKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vZHNhL3Byb2JsZW1zXCIpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG5cbiAgICAgICAgdXBkYXRlVGFnKCdhZG1pbi1wcm9ibGVtcy1saXN0Jyk7XG4gICAgICAgIHVwZGF0ZVRhZygncHJvYmxlbXMtbGlzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IndSQVVzQiJ9
}),
"[project]/app/(main)/problems/dsa/_components/shared/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared constants for DSA problems section
__turbopack_context__.s([
    "ANIMATION_CONFIG",
    ()=>ANIMATION_CONFIG,
    "CACHE_TTL",
    ()=>CACHE_TTL,
    "DIFFICULTY_COLORS",
    ()=>DIFFICULTY_COLORS,
    "INTERSECTION_THRESHOLD",
    ()=>INTERSECTION_THRESHOLD,
    "PROBLEMS_PAGE_SIZE",
    ()=>PROBLEMS_PAGE_SIZE,
    "SEARCH_DEBOUNCE_DELAY",
    ()=>SEARCH_DEBOUNCE_DELAY
]);
const PROBLEMS_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_DELAY = 300; // ms
const CACHE_TTL = 300; // 5 minutes in seconds
const INTERSECTION_THRESHOLD = 0.1;
const DIFFICULTY_COLORS = {
    EASY: "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10",
    MEDIUM: "text-amber-500 bg-amber-50/50 dark:bg-amber-500/10",
    HARD: "text-rose-500 bg-rose-50/50 dark:bg-rose-500/10",
    CONCEPT: "text-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10"
};
const ANIMATION_CONFIG = {
    spring: {
        type: "spring",
        stiffness: 400,
        damping: 25
    },
    duration: {
        duration: 0.3
    }
};
}),
"[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProblemRow",
    ()=>ProblemRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function getDifficultyColor(difficulty) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIFFICULTY_COLORS"][difficulty] || "text-gray-500";
}
function getDifficultyLabel(difficulty) {
    if (difficulty === "MEDIUM") return "Med.";
    return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}
function ProblemRowComponent({ slug, title, difficulty, acceptance, isSolved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/problems/${slug}`,
        className: "grid grid-cols-12 gap-4 px-6 py-4 rounded-xl items-center transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-8 md:col-span-6 font-medium text-gray-900 dark:text-gray-100 hover:text-orange-600 transition-colors flex items-center gap-2",
                children: [
                    isSolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "w-4 h-4 text-green-500 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                        lineNumber: 40,
                        columnNumber: 30
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-2 md:col-span-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`,
                    children: getDifficultyLabel(difficulty)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-span-2 md:col-span-3 text-sm text-gray-500 dark:text-gray-400",
                children: [
                    acceptance.toFixed(1),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
const ProblemRow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(ProblemRowComponent);
ProblemRow.displayName = "ProblemRow";
}),
"[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingSpinner",
    ()=>LoadingSpinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
};
function LoadingSpinnerComponent({ size = "md", message, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center justify-center gap-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${sizeClasses[size]} border-2 border-orange-500 border-t-transparent rounded-full animate-spin`,
                "aria-label": "Loading"
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-gray-500 dark:text-gray-400",
                children: message
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx",
                lineNumber: 28,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
const LoadingSpinner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(LoadingSpinnerComponent);
LoadingSpinner.displayName = "LoadingSpinner";
}),
"[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PracticeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9441a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:9441a3 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f29403__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f29403 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$ProblemRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/ProblemRow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function PracticeClient({ initialProblems, initialTotalPages, type = "PRACTICE", domain = "DSA", searchTerm }) {
    const [problems, setProblems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialProblems);
    // Reset problems when initialProblems changes (e.g. filter change)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setProblems(initialProblems);
        setPage(1);
        setHasMore(page < initialTotalPages);
    }, [
        initialProblems,
        initialTotalPages
    ]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(page < initialTotalPages);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localSearchTerm, setLocalSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(""); // Internal for debouncing if needed, but here we just rely on parent or direct effect?
    // Actually parent passes debounced term if SearchBar handles it, or raw term?
    // SearchBar in parent handles input. DsaProblemsClient state updates.
    // We should debounce in parent or here? SearchBar has internal debounce. DsaProblemsClient receives value *after* debounce?
    // Let's check SearchBar.tsx. It calls onSearch with debounced value.
    // So searchTerm prop here is already debounced.
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const observerTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Effect to handle search changes from prop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const performSearch = async ()=>{
            if (!searchTerm || searchTerm.length < 2) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$9441a3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchProblems"])(searchTerm, type, domain);
                setSearchResults(result.problems);
            } catch (error) {
                console.error("Search failed:", error);
                setSearchResults([]);
            } finally{
                setIsSearching(false);
            }
        };
        performSearch();
    }, [
        searchTerm,
        type,
        domain
    ]);
    // Memoize displayed problems
    const displayedProblems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return searchTerm ? searchResults : problems;
    }, [
        searchTerm,
        searchResults,
        problems
    ]);
    // Load more problems (pagination)
    const loadMore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isLoading || !hasMore || searchTerm || problems.length === 0) return;
        setIsLoading(true);
        try {
            const lastProblem = problems[problems.length - 1];
            const nextPage = page + 1;
            // Using lastProblem.id as the cursor for the next set of problems
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f29403__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getProblems"])(nextPage, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROBLEMS_PAGE_SIZE"], type, domain, undefined, undefined, lastProblem.id);
            if (res.problems.length > 0) {
                setProblems((prev)=>[
                        ...prev,
                        ...res.problems
                    ]);
                setPage(nextPage);
                setHasMore(nextPage < res.totalPages);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to load more problems", error);
        } finally{
            setIsLoading(false);
        }
    }, [
        isLoading,
        hasMore,
        page,
        type,
        domain,
        searchTerm,
        problems
    ]);
    // Intersection Observer for infinite scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (searchTerm) return; // Disable infinite scroll during search
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0]?.isIntersecting && hasMore && !isLoading) {
                loadMore();
            }
        }, {
            threshold: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTERSECTION_THRESHOLD"]
        });
        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return ()=>{
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [
        hasMore,
        isLoading,
        searchTerm,
        loadMore
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-[#262626] text-[11px] font-bold text-gray-400 uppercase tracking-widest",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-8 md:col-span-6",
                        children: "Title"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                        lineNumber: 144,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 md:col-span-3",
                        children: "Difficulty"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 md:col-span-3",
                        children: "Acceptance"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                    size: "lg",
                    message: "Searching...",
                    className: "py-20"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                    lineNumber: 152,
                    columnNumber: 21
                }, this) : displayedProblems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: displayedProblems.map((problem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$ProblemRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProblemRow"], {
                            id: problem.id,
                            slug: problem.slug,
                            title: problem.title,
                            difficulty: problem.difficulty,
                            acceptance: problem.acceptance,
                            isSolved: problem.isSolved
                        }, problem.id, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                            lineNumber: 156,
                            columnNumber: 29
                        }, this))
                }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-400",
                            children: "No problems found"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                            lineNumber: 169,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 dark:text-gray-400 mt-2",
                            children: searchTerm ? "Try adjusting your search terms." : "No problems available."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                            lineNumber: 170,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                    lineNumber: 168,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this),
            hasMore && !searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: observerTarget,
                className: "flex justify-center mt-12 mb-8 min-h-[60px]",
                children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                    size: "md",
                    message: "Loading more problems..."
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                    lineNumber: 180,
                    columnNumber: 35
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                lineNumber: 179,
                columnNumber: 17
            }, this),
            !hasMore && !searchTerm && displayedProblems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-12 text-sm text-gray-400",
                children: "You've reached the end of the list."
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
                lineNumber: 185,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx",
        lineNumber: 141,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:f411ed [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"f83292b4960e88e737718c29cfe55ecaedb6ed3165":"getCategoryProblems"},"actions/category.action.ts",""] */ __turbopack_context__.s([
    "getCategoryProblems",
    ()=>getCategoryProblems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getCategoryProblems = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("f83292b4960e88e737718c29cfe55ecaedb6ed3165", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getCategoryProblems"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2F0ZWdvcnkuYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeVNlcnZpY2UgfSBmcm9tIFwiQC9jb3JlL3NlcnZpY2VzL2NhdGVnb3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2JsZW1Eb21haW4sIERpZmZpY3VsdHkgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBHRVRUSU5HIEFMTCBDQVRFR09SSUVTXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXRlZ29yaWVzKGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCIpIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG4gIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGNhY2hlVGFnKGBjYXRlZ29yaWVzLSR7ZG9tYWlufSR7dXNlcklkID8gYC11c2VyLSR7dXNlcklkfWAgOiAnJ31gLCAnY2F0ZWdvcmllcy1saXN0Jyk7XG5cbiAgcmV0dXJuIENhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yaWVzKGRvbWFpbiwgdXNlcklkKTtcbn1cblxuLy8gR0VUVElORyBBIENBVEVHT1JZIEJZIFNMVUdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENhdGVnb3J5KHNsdWc6IHN0cmluZykge1xuICBcInVzZSBjYWNoZVwiO1xuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNhY2hlVGFnKGBjYXRlZ29yeS0ke3NsdWd9YCwgJ2NhdGVnb3JpZXMtbGlzdCcpO1xuXG4gIHJldHVybiBDYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlCeVNsdWcoc2x1Zyk7XG59XG5cbi8vIEdFVFRJTkcgQSBDQVRFR09SWSBCWSBJRCAtLT4gTk8gQ0FDSElOR1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2F0ZWdvcnlCeUlkKGlkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIENhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeUJ5SWQoaWQpO1xufVxuXG4vLyBHRVRUSU5HIENBVEVHT1JZIFBST0JMRU1TXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXRlZ29yeVByb2JsZW1zKFxuICBjYXRlZ29yeUlkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlciA9IDEsXG4gIHBhZ2VTaXplOiBudW1iZXIgPSAxMCxcbiAgY3Vyc29yPzogc3RyaW5nXG4pIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG4gIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGNvbnN0IHRhZ0tleSA9IGBjYXRlZ29yeS1wcm9ibGVtcy0ke2NhdGVnb3J5SWR9JHtjdXJzb3IgPyBgLWN1cnNvci0ke2N1cnNvcn1gIDogYC1wYWdlLSR7cGFnZX1gfSR7dXNlcklkID8gYC11c2VyLSR7dXNlcklkfWAgOiAnJ31gO1xuICBjYWNoZVRhZyh0YWdLZXksIGBjYXRlZ29yeS0ke2NhdGVnb3J5SWR9YCwgJ2NhdGVnb3JpZXMtbGlzdCcpO1xuXG4gIHJldHVybiBDYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlQcm9ibGVtcyhjYXRlZ29yeUlkLCBwYWdlLCBwYWdlU2l6ZSwgdXNlcklkLCBjdXJzb3IpO1xufVxuXG5cbi8vIENSRUFUSU5HIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5KGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBvcmRlcj86IG51bWJlcjtcbiAgZG9tYWluPzogUHJvYmxlbURvbWFpbjtcbn0pIHtcblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuXG4gIC8vIENIRUNLSU5HIElGIFVTRVIgSVMgQURNSU4gLS0+IFRIUk9XSU5HIEFOIEVSUk9SIElGIE5PVCBBRE1JTlxuXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLmNyZWF0ZUNhdGVnb3J5KGRhdGEpO1xuXG4gIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgIC8vIFJFVkFMSURBVElORyBUSEUgUEFUSFNcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvc3FsXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2NhdGVnb3JpZXNcIik7XG4gICAgdXBkYXRlVGFnKCdjYXRlZ29yaWVzLWxpc3QnKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIFVQREFUSU5HIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNhdGVnb3J5KGlkOiBzdHJpbmcsIGRhdGE6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IHNsdWc/OiBzdHJpbmc7IG9yZGVyPzogbnVtYmVyOyB9KSB7XG5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICB9KTtcbiAgLy8gQ0hFQ0tJTkcgSUYgVVNFUiBJUyBBRE1JTiAtLT4gVEhST1dJTkcgQU4gRVJST1IgSUYgTk9UIEFETUlOXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLnVwZGF0ZUNhdGVnb3J5KGlkLCBkYXRhKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAvLyBSRVZBTElEQVRJTkcgVEhFIFBBVEhTIC0tPiBQUk9CTEVNUyBBTkQgQURNSU4gQ0FURUdPUklFU1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY2F0ZWdvcmllc1wiKTtcbiAgICB1cGRhdGVUYWcoJ2NhdGVnb3JpZXMtbGlzdCcpO1xuICAgIGlmIChkYXRhLnNsdWcpIHtcbiAgICAgIHVwZGF0ZVRhZyhgY2F0ZWdvcnktJHtkYXRhLnNsdWd9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gREVMRVRJTkcgQSBDQVRFR09SWSAtLT4gQURNSU4gT05MWVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2F0ZWdvcnkoaWQ6IHN0cmluZykge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuXG4gIC8vIENIRUNLSU5HIElGIFVTRVIgSVMgQURNSU4gLS0+IFRIUk9XSU5HIEFOIEVSUk9SIElGIE5PVCBBRE1JTlxuXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLmRlbGV0ZUNhdGVnb3J5KGlkKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAvLyBSRVZBTElEQVRJTkcgVEhFIFBBVEhTIC0tPiBQUk9CTEVNUyBBTkQgQURNSU4gQ0FURUdPUklFU1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY2F0ZWdvcmllc1wiKTtcbiAgICB1cGRhdGVUYWcoJ2NhdGVnb3JpZXMtbGlzdCcpO1xuICAgIGlmIChyZXN1bHQuc2x1Zykge1xuICAgICAgdXBkYXRlVGFnKGBjYXRlZ29yeS0ke3Jlc3VsdC5zbHVnfWApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuLy8gQURESU5HIEEgUFJPQkxFTSBUTyBBIENBVEVHT1JZIC0tPiBBRE1JTiBPTkxZXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRQcm9ibGVtVG9DYXRlZ29yeShcbiAgY2F0ZWdvcnlJZDogc3RyaW5nLFxuICBwcm9ibGVtSWQ6IHN0cmluZyxcbiAgb3JkZXI/OiBudW1iZXJcbikge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IENhdGVnb3J5U2VydmljZS5hZGRQcm9ibGVtVG9DYXRlZ29yeShjYXRlZ29yeUlkLCBwcm9ibGVtSWQsIG9yZGVyKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvc3FsXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9kc2EvY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9zcWwvY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgdXBkYXRlVGFnKGBjYXRlZ29yeS0ke2NhdGVnb3J5SWR9YCk7XG4gICAgdXBkYXRlVGFnKCdjYXRlZ29yaWVzLWxpc3QnKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuLy8gUkVNT1ZJTkcgQSBQUk9CTEVNIEZST00gQSBDQVRFR09SWSAtLT4gQURNSU4gT05MWVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlUHJvYmxlbUZyb21DYXRlZ29yeShcbiAgY2F0ZWdvcnlJZDogc3RyaW5nLFxuICBwcm9ibGVtSWQ6IHN0cmluZ1xuKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG5cbiAgLy8gQ0hFQ0tJTkcgSUYgVVNFUiBJUyBBRE1JTiAtLT4gVEhST1dJTkcgQU4gRVJST1IgSUYgTk9UIEFETUlOXG5cbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBDYXRlZ29yeVNlcnZpY2UucmVtb3ZlUHJvYmxlbUZyb21DYXRlZ29yeShjYXRlZ29yeUlkLCBwcm9ibGVtSWQpO1xuXG4gIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9jYXRlZ29yaWVzLyR7Y2F0ZWdvcnlJZH1gKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIENSRUFUSU5HIEEgUFJPQkxFTSBBTkQgQURESU5HIElUIFRPIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVByb2JsZW1BbmRBZGRUb0NhdGVnb3J5KFxuICBjYXRlZ29yeUlkOiBzdHJpbmcsXG4gIGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGlmZmljdWx0eTogRGlmZmljdWx0eTtcbiAgICBzbHVnOiBzdHJpbmc7XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIGhpZGRlblF1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcbiAgICB0ZXN0Q2FzZXM/OiB7IGlucHV0OiBzdHJpbmc7IG91dHB1dDogc3RyaW5nOyBoaWRkZW4/OiBib29sZWFuIH1bXTtcbiAgfVxuKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBDYXRlZ29yeVNlcnZpY2UuY3JlYXRlUHJvYmxlbUFuZEFkZFRvQ2F0ZWdvcnkoY2F0ZWdvcnlJZCwgZGF0YSk7XG5cbiAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL3NxbFwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChgL2FkbWluL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vZHNhL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vc3FsL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3Byb2JsZW1zXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2RzYS9wcm9ibGVtc1wiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1U0EyQ3NCIn0=
}),
"[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f411ed__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:f411ed [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/constants.ts [app-ssr] (ecmascript)");
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
function CategoryCard({ id, name, description, problemCount, solvedCount }) {
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [problems, setProblems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInitialLoad, setIsInitialLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const observerTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressPercentage = problemCount > 0 ? solvedCount / problemCount * 100 : 0;
    const isCompleted = problemCount > 0 && solvedCount === problemCount;
    const loadProblems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (pageNum = 1, append = false)=>{
        if (isLoading) return;
        setIsLoading(true);
        try {
            const cursor = append && problems.length > 0 ? problems[problems.length - 1].id : undefined;
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$f411ed__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getCategoryProblems"])(id, pageNum, 10, cursor);
            if (append) {
                setProblems((prev)=>[
                        ...prev,
                        ...res.problems
                    ]);
            } else {
                setProblems(res.problems);
            }
            setPage(pageNum);
            setHasMore(res.problems.length > 0 && pageNum < res.totalPages);
        } catch (error) {
            console.error("Failed to load category problems:", error);
        } finally{
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    }, [
        id,
        isLoading,
        problems
    ]);
    const handleToggle = ()=>{
        if (!isExpanded && problems.length === 0) {
            setIsInitialLoad(true);
            loadProblems(1, false);
        }
        setIsExpanded(!isExpanded);
    };
    const loadMore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isLoading || !hasMore) return;
        loadProblems(page + 1, true);
    }, [
        isLoading,
        hasMore,
        page,
        loadProblems
    ]);
    // Intersection Observer for infinite scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isExpanded || !hasMore) return;
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0]?.isIntersecting && hasMore && !isLoading) {
                loadMore();
            }
        }, {
            threshold: 0.1
        });
        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return ()=>{
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [
        isExpanded,
        hasMore,
        isLoading,
        loadMore
    ]);
    const getDifficultyColor = (difficulty)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIFFICULTY_COLORS"][difficulty] || "text-gray-500";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "w-full mb-3",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: handleToggle,
                className: "w-full bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl p-4 hover:border-gray-300 dark:hover:border-[#333333] transition-all text-left hover:shadow-md",
                whileHover: {
                    scale: 1.005,
                    y: -1
                },
                whileTap: {
                    scale: 0.998
                },
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-base font-semibold text-gray-900 dark:text-gray-100",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                scale: 0
                                            },
                                            animate: {
                                                scale: 1
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 20
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-4 h-4 text-green-500 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 bg-white/40 dark:bg-[#1a1a1a] backdrop-blur-sm rounded-full h-2 overflow-hidden border border-gray-200/50 dark:border-[#333333] shadow-inner relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "h-full bg-gradient-to-r from-orange-500/90 to-orange-600/90 rounded-full relative overflow-hidden",
                                                    initial: {
                                                        width: 0
                                                    },
                                                    animate: {
                                                        width: `${progressPercentage}%`
                                                    },
                                                    transition: {
                                                        duration: 0.8,
                                                        ease: "easeOut"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600 dark:text-gray-400 font-medium min-w-[40px] text-right",
                                                children: [
                                                    Math.round(progressPercentage),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-700 dark:text-gray-300 text-xs font-medium",
                                            children: [
                                                solvedCount,
                                                "/",
                                                problemCount
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 dark:text-gray-400 text-xs",
                                            children: "problems solved"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            animate: {
                                rotate: isExpanded ? 180 : 0
                            },
                            transition: {
                                duration: 0.3,
                                ease: "easeInOut"
                            },
                            className: "ml-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-5 h-5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        height: 0,
                        opacity: 0
                    },
                    animate: {
                        height: "auto",
                        opacity: 1
                    },
                    exit: {
                        height: 0,
                        opacity: 0
                    },
                    transition: {
                        height: {
                            duration: 0.3,
                            ease: "easeInOut"
                        },
                        opacity: {
                            duration: 0.2
                        }
                    },
                    className: "overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 bg-gradient-to-b from-gray-50 dark:from-[#1a1a1a] to-white dark:to-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626] shadow-sm",
                        children: isInitialLoad ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                            size: "md",
                            className: "py-6"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                            lineNumber: 176,
                            columnNumber: 17
                        }, this) : problems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-6 text-gray-500 dark:text-gray-400 text-sm",
                            children: "No problems in this category yet."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                            lineNumber: 178,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: problems.map((problem, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                delay: index * 0.05,
                                                duration: 0.3
                                            },
                                            className: "group",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/problems/${problem.slug}`,
                                                className: "flex items-center justify-between p-3 bg-white dark:bg-[#141414] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all border border-gray-100 dark:border-[#262626] hover:border-gray-200 dark:hover:border-[#333333] hover:shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2.5 flex-1",
                                                        children: [
                                                            problem.isSolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-4 h-4 text-green-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors",
                                                                children: problem.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`,
                                                                children: problem.difficulty === "MEDIUM" ? "Med." : problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                                lineNumber: 205,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-500 dark:text-gray-400 min-w-[50px] text-right",
                                                                children: [
                                                                    problem.acceptance.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                                lineNumber: 192,
                                                columnNumber: 25
                                            }, this)
                                        }, problem.id, false, {
                                            fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                            lineNumber: 185,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                    lineNumber: 183,
                                    columnNumber: 19
                                }, this),
                                hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: observerTarget,
                                    className: "flex justify-center mt-4 min-h-[30px]",
                                    children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                                        size: "sm",
                                        message: "Loading more..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                        lineNumber: 230,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                                    lineNumber: 226,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LearnMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$learn$2f$CategoryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/learn/CategoryCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/LoadingSpinner.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function LearnMode({ searchTerm = "", categories, isLoading }) {
    // Internal state removed, using props
    const filteredCategories = categories.filter((category)=>category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (isLoading && categories.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
            size: "lg",
            message: "Loading categories...",
            className: "min-h-[400px]"
        }, void 0, false, {
            fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, this);
    }
    if (categories.length === 0 && !isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-lg",
                    children: "No categories available yet."
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm mt-2",
                    children: "Categories will appear here once they are created."
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: filteredCategories.length > 0 ? filteredCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$learn$2f$CategoryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    problemCount: category._count.categoryProblems,
                    solvedCount: category.solvedCount || 0
                }, category.id, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 mb-2",
                        children: "No categories found"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Try adjusting your search terms."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
                lineNumber: 62,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/hooks/useDebounce.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebounce",
    ()=>useDebounce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
}
}),
"[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchBar",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDebounce.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SearchBarComponent({ onSearch, placeholder = "Search problems", className = "" }) {
    const [localSearch, setLocalSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const debouncedSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDebounce"])(localSearch, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEARCH_DEBOUNCE_DELAY"]);
    // Call onSearch when debounced value changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onSearch(debouncedSearch);
    }, [
        debouncedSearch,
        onSearch
    ]);
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        setLocalSearch(e.target.value);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "h-5 w-5 text-gray-400",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: placeholder,
                className: "block w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl leading-5 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 focus:border-orange-400 sm:text-sm shadow-sm text-gray-900 dark:text-gray-100",
                value: localSearch,
                onChange: handleChange,
                autoComplete: "off"
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            localSearch && localSearch !== debouncedSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                    lineNumber: 56,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
                lineNumber: 55,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
const SearchBar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(SearchBarComponent);
SearchBar.displayName = "SearchBar";
}),
"[project]/actions/data:02e9ef [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"404ed62a51a9b4b84de964bc5449fd85585859195d":"searchTags"},"actions/tag.action.ts",""] */ __turbopack_context__.s([
    "searchTags",
    ()=>searchTags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var searchTags = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("404ed62a51a9b4b84de964bc5449fd85585859195d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "searchTags"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdGFnLmFjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoVGFncyhxdWVyeTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGFncyA9IGF3YWl0IHByaXNtYS50YWcuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJpbnNlbnNpdGl2ZVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFrZTogMTAsXG4gICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FzYydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdGFncyB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VhcmNoIHRhZ3M6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzZWFyY2ggdGFnc1wiIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKG5hbWU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNsdWcgPSBuYW1lXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1teXFx3XFxzLV0vZywgXCJcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFxzXy1dKy9nLCBcIi1cIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLSt8LSskL2csIFwiXCIpO1xuXG4gICAgICAgIGNvbnN0IHRhZyA9IGF3YWl0IHByaXNtYS50YWcudXBzZXJ0KHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHNsdWcgfSxcbiAgICAgICAgICAgIHVwZGF0ZToge30sXG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIHNsdWcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB0YWcgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSB0YWc6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgdGFnXCIgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlSQUlzQiJ9
}),
"[project]/components/problems/FilterBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterBar",
    ()=>FilterBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$02e9ef__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:02e9ef [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
;
function FilterBar() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [tagSuggestions, setTagSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showTagSuggestions, setShowTagSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const difficulty = searchParams.get("difficulty");
    const tags = searchParams.getAll("tags");
    const updateFilters = (key, value)=>{
        const params = new URLSearchParams(searchParams.toString());
        if (value === null || Array.isArray(value) && value.length === 0) {
            params.delete(key);
        } else if (Array.isArray(value)) {
            params.delete(key);
            value.forEach((v)=>params.append(key, v));
        } else {
            params.set(key, value);
        }
        // Reset page on filter change
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (tagInput.trim()) {
            const timer = setTimeout(async ()=>{
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$02e9ef__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchTags"])(tagInput);
                if (res.success && res.tags) {
                    setTagSuggestions(res.tags);
                }
            }, 300);
            return ()=>clearTimeout(timer);
        } else {
            setTagSuggestions([]);
        }
    }, [
        tagInput
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-4 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: difficulty || "",
                onChange: (e)=>updateFilters("difficulty", e.target.value || null),
                className: "px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "All Difficulties"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "EASY",
                        children: "Easy"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "MEDIUM",
                        children: "Medium"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "HARD",
                        children: "Hard"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/problems/FilterBar.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Filter by tags...",
                        value: tagInput,
                        onChange: (e)=>{
                            setTagInput(e.target.value);
                            setShowTagSuggestions(true);
                        },
                        onFocus: ()=>setShowTagSuggestions(true),
                        onBlur: ()=>setTimeout(()=>setShowTagSuggestions(false), 200),
                        className: "px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    showTagSuggestions && tagSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 mt-1 w-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto",
                        children: tagSuggestions.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (!tags.includes(tag.slug)) {
                                        updateFilters("tags", [
                                            ...tags,
                                            tag.slug
                                        ]);
                                    }
                                    setTagInput("");
                                },
                                className: "w-full text-left px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 flex items-center justify-between",
                                children: [
                                    tag.name,
                                    tags.includes(tag.slug) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-3 h-3 text-orange-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/problems/FilterBar.tsx",
                                        lineNumber: 95,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, tag.slug, true, {
                                fileName: "[project]/components/problems/FilterBar.tsx",
                                lineNumber: 84,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 82,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/problems/FilterBar.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: tags.map((slug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1 px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-100 dark:border-orange-500/30",
                        children: [
                            slug,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>updateFilters("tags", tags.filter((t)=>t !== slug)),
                                className: "hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded-full p-0.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/problems/FilterBar.tsx",
                                    lineNumber: 111,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/problems/FilterBar.tsx",
                                lineNumber: 107,
                                columnNumber: 25
                            }, this)
                        ]
                    }, slug, true, {
                        fileName: "[project]/components/problems/FilterBar.tsx",
                        lineNumber: 105,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/problems/FilterBar.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            (difficulty || tags.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("difficulty");
                    params.delete("tags");
                    params.set("page", "1");
                    router.push(`${pathname}?${params.toString()}`);
                },
                className: "text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-100 transition-colors",
                children: "Clear filters"
            }, void 0, false, {
                fileName: "[project]/components/problems/FilterBar.tsx",
                lineNumber: 118,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/problems/FilterBar.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
}),
"[project]/actions/data:db2b2e [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"c0c61a0961c7e53f3af018ebf0d1ccd5c094778117":"getCategories"},"actions/category.action.ts",""] */ __turbopack_context__.s([
    "getCategories",
    ()=>getCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getCategories = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("c0c61a0961c7e53f3af018ebf0d1ccd5c094778117", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getCategories"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2F0ZWdvcnkuYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeVNlcnZpY2UgfSBmcm9tIFwiQC9jb3JlL3NlcnZpY2VzL2NhdGVnb3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2JsZW1Eb21haW4sIERpZmZpY3VsdHkgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCB1cGRhdGVUYWcsIGNhY2hlVGFnLCBjYWNoZUxpZmUgfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBHRVRUSU5HIEFMTCBDQVRFR09SSUVTXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXRlZ29yaWVzKGRvbWFpbjogUHJvYmxlbURvbWFpbiA9IFwiRFNBXCIpIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG4gIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGNhY2hlVGFnKGBjYXRlZ29yaWVzLSR7ZG9tYWlufSR7dXNlcklkID8gYC11c2VyLSR7dXNlcklkfWAgOiAnJ31gLCAnY2F0ZWdvcmllcy1saXN0Jyk7XG5cbiAgcmV0dXJuIENhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yaWVzKGRvbWFpbiwgdXNlcklkKTtcbn1cblxuLy8gR0VUVElORyBBIENBVEVHT1JZIEJZIFNMVUdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENhdGVnb3J5KHNsdWc6IHN0cmluZykge1xuICBcInVzZSBjYWNoZVwiO1xuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNhY2hlVGFnKGBjYXRlZ29yeS0ke3NsdWd9YCwgJ2NhdGVnb3JpZXMtbGlzdCcpO1xuXG4gIHJldHVybiBDYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlCeVNsdWcoc2x1Zyk7XG59XG5cbi8vIEdFVFRJTkcgQSBDQVRFR09SWSBCWSBJRCAtLT4gTk8gQ0FDSElOR1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q2F0ZWdvcnlCeUlkKGlkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIENhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeUJ5SWQoaWQpO1xufVxuXG4vLyBHRVRUSU5HIENBVEVHT1JZIFBST0JMRU1TXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXRlZ29yeVByb2JsZW1zKFxuICBjYXRlZ29yeUlkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlciA9IDEsXG4gIHBhZ2VTaXplOiBudW1iZXIgPSAxMCxcbiAgY3Vyc29yPzogc3RyaW5nXG4pIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjsgLy8gTXVzdCBiZSBhdCB0b3AgLSBhbGxvd3MgaGVhZGVycygpIGluc2lkZVxuICBjYWNoZUxpZmUoeyBzdGFsZTogOTAwLCByZXZhbGlkYXRlOiA5MDAgfSk7IC8vIDE1IG1pbnV0ZXMgZGVmYXVsdFxuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG4gIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24/LnVzZXI/LmlkO1xuXG4gIGNvbnN0IHRhZ0tleSA9IGBjYXRlZ29yeS1wcm9ibGVtcy0ke2NhdGVnb3J5SWR9JHtjdXJzb3IgPyBgLWN1cnNvci0ke2N1cnNvcn1gIDogYC1wYWdlLSR7cGFnZX1gfSR7dXNlcklkID8gYC11c2VyLSR7dXNlcklkfWAgOiAnJ31gO1xuICBjYWNoZVRhZyh0YWdLZXksIGBjYXRlZ29yeS0ke2NhdGVnb3J5SWR9YCwgJ2NhdGVnb3JpZXMtbGlzdCcpO1xuXG4gIHJldHVybiBDYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlQcm9ibGVtcyhjYXRlZ29yeUlkLCBwYWdlLCBwYWdlU2l6ZSwgdXNlcklkLCBjdXJzb3IpO1xufVxuXG5cbi8vIENSRUFUSU5HIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5KGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBvcmRlcj86IG51bWJlcjtcbiAgZG9tYWluPzogUHJvYmxlbURvbWFpbjtcbn0pIHtcblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuXG4gIC8vIENIRUNLSU5HIElGIFVTRVIgSVMgQURNSU4gLS0+IFRIUk9XSU5HIEFOIEVSUk9SIElGIE5PVCBBRE1JTlxuXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLmNyZWF0ZUNhdGVnb3J5KGRhdGEpO1xuXG4gIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgIC8vIFJFVkFMSURBVElORyBUSEUgUEFUSFNcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvc3FsXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2NhdGVnb3JpZXNcIik7XG4gICAgdXBkYXRlVGFnKCdjYXRlZ29yaWVzLWxpc3QnKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIFVQREFUSU5HIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNhdGVnb3J5KGlkOiBzdHJpbmcsIGRhdGE6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IHNsdWc/OiBzdHJpbmc7IG9yZGVyPzogbnVtYmVyOyB9KSB7XG5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKVxuICB9KTtcbiAgLy8gQ0hFQ0tJTkcgSUYgVVNFUiBJUyBBRE1JTiAtLT4gVEhST1dJTkcgQU4gRVJST1IgSUYgTk9UIEFETUlOXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLnVwZGF0ZUNhdGVnb3J5KGlkLCBkYXRhKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAvLyBSRVZBTElEQVRJTkcgVEhFIFBBVEhTIC0tPiBQUk9CTEVNUyBBTkQgQURNSU4gQ0FURUdPUklFU1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY2F0ZWdvcmllc1wiKTtcbiAgICB1cGRhdGVUYWcoJ2NhdGVnb3JpZXMtbGlzdCcpO1xuICAgIGlmIChkYXRhLnNsdWcpIHtcbiAgICAgIHVwZGF0ZVRhZyhgY2F0ZWdvcnktJHtkYXRhLnNsdWd9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gREVMRVRJTkcgQSBDQVRFR09SWSAtLT4gQURNSU4gT05MWVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2F0ZWdvcnkoaWQ6IHN0cmluZykge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuXG4gIC8vIENIRUNLSU5HIElGIFVTRVIgSVMgQURNSU4gLS0+IFRIUk9XSU5HIEFOIEVSUk9SIElGIE5PVCBBRE1JTlxuXG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2F0ZWdvcnlTZXJ2aWNlLmRlbGV0ZUNhdGVnb3J5KGlkKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAvLyBSRVZBTElEQVRJTkcgVEhFIFBBVEhTIC0tPiBQUk9CTEVNUyBBTkQgQURNSU4gQ0FURUdPUklFU1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY2F0ZWdvcmllc1wiKTtcbiAgICB1cGRhdGVUYWcoJ2NhdGVnb3JpZXMtbGlzdCcpO1xuICAgIGlmIChyZXN1bHQuc2x1Zykge1xuICAgICAgdXBkYXRlVGFnKGBjYXRlZ29yeS0ke3Jlc3VsdC5zbHVnfWApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuLy8gQURESU5HIEEgUFJPQkxFTSBUTyBBIENBVEVHT1JZIC0tPiBBRE1JTiBPTkxZXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRQcm9ibGVtVG9DYXRlZ29yeShcbiAgY2F0ZWdvcnlJZDogc3RyaW5nLFxuICBwcm9ibGVtSWQ6IHN0cmluZyxcbiAgb3JkZXI/OiBudW1iZXJcbikge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpXG4gIH0pO1xuICAvLyBDSEVDS0lORyBJRiBVU0VSIElTIEFETUlOIC0tPiBUSFJPV0lORyBBTiBFUlJPUiBJRiBOT1QgQURNSU5cblxuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IENhdGVnb3J5U2VydmljZS5hZGRQcm9ibGVtVG9DYXRlZ29yeShjYXRlZ29yeUlkLCBwcm9ibGVtSWQsIG9yZGVyKTtcblxuICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9kc2FcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvc3FsXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9kc2EvY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9zcWwvY2F0ZWdvcmllcy8ke2NhdGVnb3J5SWR9YCk7XG4gICAgdXBkYXRlVGFnKGBjYXRlZ29yeS0ke2NhdGVnb3J5SWR9YCk7XG4gICAgdXBkYXRlVGFnKCdjYXRlZ29yaWVzLWxpc3QnKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuLy8gUkVNT1ZJTkcgQSBQUk9CTEVNIEZST00gQSBDQVRFR09SWSAtLT4gQURNSU4gT05MWVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlUHJvYmxlbUZyb21DYXRlZ29yeShcbiAgY2F0ZWdvcnlJZDogc3RyaW5nLFxuICBwcm9ibGVtSWQ6IHN0cmluZ1xuKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG5cbiAgLy8gQ0hFQ0tJTkcgSUYgVVNFUiBJUyBBRE1JTiAtLT4gVEhST1dJTkcgQU4gRVJST1IgSUYgTk9UIEFETUlOXG5cbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBDYXRlZ29yeVNlcnZpY2UucmVtb3ZlUHJvYmxlbUZyb21DYXRlZ29yeShjYXRlZ29yeUlkLCBwcm9ibGVtSWQpO1xuXG4gIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL2RzYVwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9wcm9ibGVtcy9zcWxcIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9hZG1pbi9jYXRlZ29yaWVzLyR7Y2F0ZWdvcnlJZH1gKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIENSRUFUSU5HIEEgUFJPQkxFTSBBTkQgQURESU5HIElUIFRPIEEgQ0FURUdPUlkgLS0+IEFETUlOIE9OTFlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVByb2JsZW1BbmRBZGRUb0NhdGVnb3J5KFxuICBjYXRlZ29yeUlkOiBzdHJpbmcsXG4gIGRhdGE6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGlmZmljdWx0eTogRGlmZmljdWx0eTtcbiAgICBzbHVnOiBzdHJpbmc7XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIGhpZGRlblF1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcbiAgICB0ZXN0Q2FzZXM/OiB7IGlucHV0OiBzdHJpbmc7IG91dHB1dDogc3RyaW5nOyBoaWRkZW4/OiBib29sZWFuIH1bXTtcbiAgfVxuKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKClcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBDYXRlZ29yeVNlcnZpY2UuY3JlYXRlUHJvYmxlbUFuZEFkZFRvQ2F0ZWdvcnkoY2F0ZWdvcnlJZCwgZGF0YSk7XG5cbiAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXMvZHNhXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zL3NxbFwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChgL2FkbWluL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vZHNhL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vc3FsL2NhdGVnb3JpZXMvJHtjYXRlZ29yeUlkfWApO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3Byb2JsZW1zXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL2RzYS9wcm9ibGVtc1wiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9zcWwvcHJvYmxlbXNcIik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJpU0FVc0IifQ==
}),
"[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SqlProblemsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ModeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/ModeToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$practice$2f$PracticeClient$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/practice/PracticeClient.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$learn$2f$LearnMode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/learn/LearnMode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$SearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/problems/dsa/_components/shared/SearchBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$FilterBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/problems/FilterBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$db2b2e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:db2b2e [app-ssr] (ecmascript) <text/javascript>");
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
function SqlProblemsClient({ initialProblems, initialTotalPages, initialCategories = [] }) {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // DERIVED STATE FROM URL, DEFAULT TO 'PRACTICE'
    const mode = searchParams.get("mode") || "practice";
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // LIFTED STATE FOR LEARN MODE CACHING
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCategories);
    const [isCategoriesLoading, setIsCategoriesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasFetchedCategories, setHasFetchedCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCategories.length > 0);
    // Sync categories from props (for router.refresh())
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialCategories.length > 0) {
            setCategories(initialCategories);
            setHasFetchedCategories(true);
        }
    }, [
        initialCategories
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode === "learn" && !hasFetchedCategories && !isCategoriesLoading) {
            const fetchCategories = async ()=>{
                setIsCategoriesLoading(true);
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$db2b2e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getCategories"])("SQL");
                    setCategories(res.categories);
                    setHasFetchedCategories(true);
                } catch (error) {
                    console.error("Failed to fetch categories:", error);
                } finally{
                    setIsCategoriesLoading(false);
                }
            };
            fetchCategories();
        }
    }, [
        mode,
        hasFetchedCategories,
        isCategoriesLoading
    ]);
    const setMode = (newMode)=>{
        const params = new URLSearchParams(searchParams.toString());
        if (newMode === "practice") {
            params.delete("mode");
        } else {
            params.set("mode", newMode);
        }
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    };
    const handleSearch = (term)=>{
        setSearchTerm(term);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white dark:bg-[#0a0a0a] py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-7xl mx-auto px-4 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-center justify-between gap-4 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$shared$2f$SearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchBar"], {
                            onSearch: handleSearch,
                            placeholder: mode === "practice" ? "Search problems" : "Search categories",
                            className: "w-full md:flex-1"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$ModeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            mode: mode,
                            onModeChange: setMode
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                    lineNumber: 95,
                    columnNumber: 17
                }, this),
                mode === "practice" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$problems$2f$FilterBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBar"], {}, void 0, false, {
                            fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                            lineNumber: 106,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$practice$2f$PracticeClient$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            initialProblems: initialProblems,
                            initialTotalPages: initialTotalPages,
                            searchTerm: searchTerm,
                            domain: "SQL"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                            lineNumber: 107,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$problems$2f$dsa$2f$_components$2f$learn$2f$LearnMode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    searchTerm: searchTerm,
                    categories: categories,
                    isLoading: isCategoriesLoading
                }, void 0, false, {
                    fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
                    lineNumber: 115,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
            lineNumber: 93,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/problems/sql/_components/SqlProblemsClient.tsx",
        lineNumber: 92,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_2ac6960c._.js.map