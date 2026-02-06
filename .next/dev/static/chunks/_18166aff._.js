(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/NetworkStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NetworkStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.js [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-client] (ecmascript) <export default as WifiOff>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NetworkStatus() {
    _s();
    const [isOnline, setIsOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showBanner, setShowBanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NetworkStatus.useEffect": ()=>{
            // Set initial status
            const initialOnline = navigator.onLine;
            setIsOnline(initialOnline);
            setShowBanner(!initialOnline);
            const handleOnline = {
                "NetworkStatus.useEffect.handleOnline": ()=>{
                    setIsOnline(true);
                    setShowBanner(true); // Show success message
                    setTimeout({
                        "NetworkStatus.useEffect.handleOnline": ()=>setShowBanner(false)
                    }["NetworkStatus.useEffect.handleOnline"], 2000);
                }
            }["NetworkStatus.useEffect.handleOnline"];
            const handleOffline = {
                "NetworkStatus.useEffect.handleOffline": ()=>{
                    setIsOnline(false);
                    setShowBanner(true);
                }
            }["NetworkStatus.useEffect.handleOffline"];
            window.addEventListener("online", handleOnline);
            window.addEventListener("offline", handleOffline);
            // Global fetch interceptor to catch 403 banned
            const originalFetch = window.fetch;
            window.fetch = ({
                "NetworkStatus.useEffect": async (...args)=>{
                    const response = await originalFetch(...args);
                    // Better Auth typically returns 403 or specific JSON for bans
                    if (response.status === 403) {
                        const clone = response.clone();
                        try {
                            const text = await clone.text();
                            // Check if body is banned message
                            if (text.includes("banned")) {
                                window.location.href = "/banned";
                            }
                        } catch (e) {}
                    }
                    return response;
                }
            })["NetworkStatus.useEffect"];
            return ({
                "NetworkStatus.useEffect": ()=>{
                    window.removeEventListener("online", handleOnline);
                    window.removeEventListener("offline", handleOffline);
                    window.fetch = originalFetch; // Restore
                }
            })["NetworkStatus.useEffect"];
        }
    }["NetworkStatus.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: showBanner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: -100,
                opacity: 0
            },
            animate: {
                y: 0,
                opacity: 1
            },
            exit: {
                y: -100,
                opacity: 0
            },
            transition: {
                duration: 0.3
            },
            className: `fixed top-0 left-0 right-0 z-[100] ${isOnline ? "bg-emerald-500 text-white" : "bg-red-500 text-white"} shadow-lg`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3",
                children: isOnline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/NetworkStatus.tsx",
                            lineNumber: 73,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-sm",
                            children: "Connection restored"
                        }, void 0, false, {
                            fileName: "[project]/components/NetworkStatus.tsx",
                            lineNumber: 74,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/NetworkStatus.tsx",
                            lineNumber: 80,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-sm",
                            children: "No internet connection. Please check your network."
                        }, void 0, false, {
                            fileName: "[project]/components/NetworkStatus.tsx",
                            lineNumber: 81,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/NetworkStatus.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/NetworkStatus.tsx",
            lineNumber: 59,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/NetworkStatus.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(NetworkStatus, "LnXAlNhTW33cPyfn3Yb0YBhCeOk=");
_c = NetworkStatus;
var _c;
__turbopack_context__.k.register(_c, "NetworkStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "light",
        enableSystem: false,
        storageKey: "algofox-theme",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ThemeProvider.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:ff8af4 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00424ba432501922f40bb512e30bdbd7d1847d3c3e":"checkSessionConflict"},"actions/auth.ts",""] */ __turbopack_context__.s([
    "checkSessionConflict",
    ()=>checkSessionConflict
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkSessionConflict = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00424ba432501922f40bb512e30bdbd7d1847d3c3e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkSessionConflict"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tTZXNzaW9uQ29uZmxpY3QoKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbikge1xuICAgIHJldHVybiB7IGNvbmZsaWN0OiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc2Vzc2lvbi5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIGV4cGlyZXNBdDogdHJ1ZSxcbiAgICAgIHVzZXJBZ2VudDogdHJ1ZSxcbiAgICAgIGlwQWRkcmVzczogdHJ1ZSxcbiAgICAgIHRva2VuOiB0cnVlLCAvLyBOZWVkIHRva2VuIHRvIGlkZW50aWZ5IGN1cnJlbnQgc2Vzc2lvblxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIEZpbHRlciBvdXQgZXhwaXJlZCBzZXNzaW9ucyBqdXN0IGluIGNhc2UsIHRob3VnaCBiZXR0ZXItYXV0aCBsaWtlbHkgaGFuZGxlcyBjbGVhbnVwIG9yIGFzc3VtZXMgdmFsaWQgaWYgaW4gREJcbiAgY29uc3QgdmFsaWRTZXNzaW9ucyA9IGFjdGl2ZVNlc3Npb25zLmZpbHRlcihzID0+IHMuZXhwaXJlc0F0ID4gbmV3IERhdGUoKSk7XG5cbiAgaWYgKHZhbGlkU2Vzc2lvbnMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb25mbGljdDogdHJ1ZSxcbiAgICAgIGN1cnJlbnRTZXNzaW9uVG9rZW46IHNlc3Npb24uc2Vzc2lvbi50b2tlbixcbiAgICAgIHNlc3Npb25zOiB2YWxpZFNlc3Npb25zLm1hcChzID0+ICh7XG4gICAgICAgIC4uLnMsXG4gICAgICAgIGlzQ3VycmVudDogcy50b2tlbiA9PT0gc2Vzc2lvbi5zZXNzaW9uLnRva2VuXG4gICAgICB9KSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgY29uZmxpY3Q6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNvbHZlU2Vzc2lvbkNvbmZsaWN0KGFjdGlvbjogXCJMT0dPVVRfT1RIRVJTXCIgfCBcIkxPR09VVF9DVVJSRU5UXCIpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYWN0aXZlIHNlc3Npb25cIik7XG4gIH1cblxuICBpZiAoYWN0aW9uID09PSBcIkxPR09VVF9PVEhFUlNcIikge1xuICAgIC8vIERlbGV0ZSBhbGwgc2Vzc2lvbnMgZm9yIHRoaXMgdXNlciBFWENFUFQgdGhlIGN1cnJlbnQgb25lXG4gICAgYXdhaXQgcHJpc21hLnNlc3Npb24uZGVsZXRlTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICBub3Q6IHNlc3Npb24uc2Vzc2lvbi50b2tlblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJPdGhlciBzZXNzaW9ucyB0ZXJtaW5hdGVkXCIgfTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiTE9HT1VUX0NVUlJFTlRcIikge1xuICAgIC8vIFNpZ24gb3V0IHRoZSBjdXJyZW50IHNlc3Npb25cbiAgICAvLyBXZSBjYW4gdXNlIGF1dGguYXBpLnNpZ25PdXQgb3IganVzdCBkZWxldGUgdGhlIHNlc3Npb24gbWFudWFsbHlcbiAgICBhd2FpdCBwcmlzbWEuc2Vzc2lvbi5kZWxldGUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdG9rZW46IHNlc3Npb24uc2Vzc2lvbi50b2tlblxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQ3VycmVudCBzZXNzaW9uIHRlcm1pbmF0ZWRcIiB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjZSQU1zQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:ae3016 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40acca00133b06cb19d5be722d10fe520a25103a8b":"resolveSessionConflict"},"actions/auth.ts",""] */ __turbopack_context__.s([
    "resolveSessionConflict",
    ()=>resolveSessionConflict
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var resolveSessionConflict = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40acca00133b06cb19d5be722d10fe520a25103a8b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resolveSessionConflict"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tTZXNzaW9uQ29uZmxpY3QoKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbikge1xuICAgIHJldHVybiB7IGNvbmZsaWN0OiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBhd2FpdCBwcmlzbWEuc2Vzc2lvbi5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIGV4cGlyZXNBdDogdHJ1ZSxcbiAgICAgIHVzZXJBZ2VudDogdHJ1ZSxcbiAgICAgIGlwQWRkcmVzczogdHJ1ZSxcbiAgICAgIHRva2VuOiB0cnVlLCAvLyBOZWVkIHRva2VuIHRvIGlkZW50aWZ5IGN1cnJlbnQgc2Vzc2lvblxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIEZpbHRlciBvdXQgZXhwaXJlZCBzZXNzaW9ucyBqdXN0IGluIGNhc2UsIHRob3VnaCBiZXR0ZXItYXV0aCBsaWtlbHkgaGFuZGxlcyBjbGVhbnVwIG9yIGFzc3VtZXMgdmFsaWQgaWYgaW4gREJcbiAgY29uc3QgdmFsaWRTZXNzaW9ucyA9IGFjdGl2ZVNlc3Npb25zLmZpbHRlcihzID0+IHMuZXhwaXJlc0F0ID4gbmV3IERhdGUoKSk7XG5cbiAgaWYgKHZhbGlkU2Vzc2lvbnMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb25mbGljdDogdHJ1ZSxcbiAgICAgIGN1cnJlbnRTZXNzaW9uVG9rZW46IHNlc3Npb24uc2Vzc2lvbi50b2tlbixcbiAgICAgIHNlc3Npb25zOiB2YWxpZFNlc3Npb25zLm1hcChzID0+ICh7XG4gICAgICAgIC4uLnMsXG4gICAgICAgIGlzQ3VycmVudDogcy50b2tlbiA9PT0gc2Vzc2lvbi5zZXNzaW9uLnRva2VuXG4gICAgICB9KSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgY29uZmxpY3Q6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNvbHZlU2Vzc2lvbkNvbmZsaWN0KGFjdGlvbjogXCJMT0dPVVRfT1RIRVJTXCIgfCBcIkxPR09VVF9DVVJSRU5UXCIpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYWN0aXZlIHNlc3Npb25cIik7XG4gIH1cblxuICBpZiAoYWN0aW9uID09PSBcIkxPR09VVF9PVEhFUlNcIikge1xuICAgIC8vIERlbGV0ZSBhbGwgc2Vzc2lvbnMgZm9yIHRoaXMgdXNlciBFWENFUFQgdGhlIGN1cnJlbnQgb25lXG4gICAgYXdhaXQgcHJpc21hLnNlc3Npb24uZGVsZXRlTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICBub3Q6IHNlc3Npb24uc2Vzc2lvbi50b2tlblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJPdGhlciBzZXNzaW9ucyB0ZXJtaW5hdGVkXCIgfTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiTE9HT1VUX0NVUlJFTlRcIikge1xuICAgIC8vIFNpZ24gb3V0IHRoZSBjdXJyZW50IHNlc3Npb25cbiAgICAvLyBXZSBjYW4gdXNlIGF1dGguYXBpLnNpZ25PdXQgb3IganVzdCBkZWxldGUgdGhlIHNlc3Npb24gbWFudWFsbHlcbiAgICBhd2FpdCBwcmlzbWEuc2Vzc2lvbi5kZWxldGUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdG9rZW46IHNlc3Npb24uc2Vzc2lvbi50b2tlblxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiQ3VycmVudCBzZXNzaW9uIHRlcm1pbmF0ZWRcIiB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitSQTZDc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogTitle",
    ()=>DialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Dialog({ open, onOpenChange, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>onOpenChange(false),
                    className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                }, void 0, false, {
                    fileName: "[project]/components/ui/dialog.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    className: "z-50 w-full max-w-lg rounded-xl bg-white dark:bg-[#141414] p-6 shadow-xl border border-gray-100 dark:border-[#262626]\\",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/dialog.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/dialog.tsx",
            lineNumber: 19,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = Dialog;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c2 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c3 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c4 = DialogDescription;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogHeader");
__turbopack_context__.k.register(_c2, "DialogFooter");
__turbopack_context__.k.register(_c3, "DialogTitle");
__turbopack_context__.k.register(_c4, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            orange: "bg-orange-500 text-white shadow hover:bg-orange-600"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    // Since we don't have Radix Slot installed, we'll ignore asChild for now or fallback
    // If we installed radix-ui/react-slot, we could use it.
    // For now, let's just use button.
    // If the user expects strict shadcn, I should have installed radix-ui/react-slot.
    // But I'll just use "button" element.
    const Comp = "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 53,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth/SessionConflictModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionConflictModal",
    ()=>SessionConflictModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ff8af4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:ff8af4 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ae3016__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:ae3016 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlertIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOutIcon>");
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
function SessionConflictModal() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionConflictModal.useEffect": ()=>{
            // Initial check
            check();
            // Poll every 30 seconds
            const interval = setInterval({
                "SessionConflictModal.useEffect.interval": ()=>{
                    check();
                }
            }["SessionConflictModal.useEffect.interval"], 30000);
            return ({
                "SessionConflictModal.useEffect": ()=>clearInterval(interval)
            })["SessionConflictModal.useEffect"];
        }
    }["SessionConflictModal.useEffect"], []);
    const check = async ()=>{
        // If modal is already open, no need to check (to avoid overwriting state or flickering)
        // But maybe we want to re-check if user resolved it elsewhere?
        // For now, let's just check.
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ff8af4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkSessionConflict"])();
            if (result.conflict) {
                setIsOpen(true);
            } else {
                // If conflict resolved (e.g. user logged out from other device), we can close
                setIsOpen(false);
            }
        } catch (e) {
            console.error("Failed to check session conflict", e);
        }
    };
    const handleLogoutOthers = async ()=>{
        setLoading(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ae3016__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resolveSessionConflict"])("LOGOUT_OTHERS");
            if (result?.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Other sessions have been logged out.");
                setIsOpen(false);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to logout other sessions.");
        } finally{
            setLoading(false);
        }
    };
    const handleLogoutCurrent = async ()=>{
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ae3016__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resolveSessionConflict"])("LOGOUT_CURRENT");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Logged out successfully.");
            setIsOpen(false);
            router.push("/"); // Redirect to home as requested
            router.refresh(); // Ensure state is cleared
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to logout.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: ()=>{},
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center p-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlertIcon$3e$__["ShieldAlertIcon"], {
                        className: "w-6 h-6 text-orange-600 dark:text-orange-500"
                    }, void 0, false, {
                        fileName: "[project]/components/auth/SessionConflictModal.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth/SessionConflictModal.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-xl font-bold text-center",
                            children: "Active Session Detected"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/SessionConflictModal.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-center pt-2",
                            children: [
                                "You are currently logged in on another device. For security reasons, you can only have one active session at a time.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                    className: "my-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/SessionConflictModal.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                "Do you want to logout from the other session or logout from this device?"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/SessionConflictModal.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/SessionConflictModal.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "w-full gap-2 sm:gap-0 mt-6 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: handleLogoutCurrent,
                            disabled: loading,
                            className: "w-full sm:w-1/2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOutIcon$3e$__["LogOutIcon"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/auth/SessionConflictModal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                "Logout Here"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/auth/SessionConflictModal.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleLogoutOthers,
                            disabled: loading,
                            className: "w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white",
                            children: "Logout Other Session"
                        }, void 0, false, {
                            fileName: "[project]/components/auth/SessionConflictModal.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth/SessionConflictModal.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth/SessionConflictModal.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/auth/SessionConflictModal.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(SessionConflictModal, "B3Ykt9wfxmEvwjx2K4ugnmt6YkA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SessionConflictModal;
var _c;
__turbopack_context__.k.register(_c, "SessionConflictModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/DevToolsBlocker.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/DevToolsBlocker.tsx'\n\nExpected ',', got ';'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
]);

//# sourceMappingURL=_18166aff._.js.map