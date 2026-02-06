(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/actions/data:52ad87 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"80553ec9ce31ee2059740b41a8d22c285684cbfdfa":"getCourseAllocations"},"actions/courseAllocation.action.ts",""] */ __turbopack_context__.s([
    "getCourseAllocations",
    ()=>getCourseAllocations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getCourseAllocations = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("80553ec9ce31ee2059740b41a8d22c285684cbfdfa", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getCourseAllocations"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY291cnNlQWxsb2NhdGlvbi5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IFByb2JsZW1Eb21haW4gfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCBjYWNoZVRhZywgY2FjaGVMaWZlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcblxuLy8gR2V0IGFsbCBjb3Vyc2UgYWxsb2NhdGlvbnMgKGNhY2hlZClcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb3Vyc2VBbGxvY2F0aW9ucygpIHtcbiAgXCJ1c2UgY2FjaGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzXG4gIGNhY2hlVGFnKFwiY291cnNlLWFsbG9jYXRpb25zXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICBvcmRlckJ5OiBbeyB5ZWFyOiBcImFzY1wiIH0sIHsgZG9tYWluOiBcImFzY1wiIH1dLFxuICAgIH0pO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFsbG9jYXRpb25zIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNvdXJzZSBhbGxvY2F0aW9uczpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY291cnNlIGFsbG9jYXRpb25zXCIgfTtcbiAgfVxufVxuXG4vLyBHZXQgY291cnNlcyBhbGxvY2F0ZWQgdG8gYSBzcGVjaWZpYyB5ZWFyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q291cnNlc0J5WWVhcih5ZWFyOiBudW1iZXIpIHtcbiAgXCJ1c2UgY2FjaGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pO1xuICBjYWNoZVRhZyhcImNvdXJzZS1hbGxvY2F0aW9uc1wiLCBgY291cnNlLXllYXItJHt5ZWFyfWApO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyB5ZWFyIH0sXG4gICAgICBzZWxlY3Q6IHsgZG9tYWluOiB0cnVlIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkb21haW5zOiBhbGxvY2F0aW9ucy5tYXAoKGEpID0+IGEuZG9tYWluKSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjb3Vyc2VzIGJ5IHllYXI6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvdXJzZXNcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cbn1cblxuLy8gR2V0IHVzZXIncyBhbGxvY2F0ZWQgY291cnNlcyAoYmFzZWQgb24gdGhlaXIgeWVhcilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQWxsb2NhdGVkQ291cnNlcygpIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pO1xuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cblxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG4gIGNhY2hlVGFnKGB1c2VyLWNvdXJzZXMtJHt1c2VySWR9YCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBHZXQgdXNlciBkZXRhaWxzIHdpdGggeWVhclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgIHNlbGVjdDogeyB5ZWFyOiB0cnVlLCByb2xlOiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVc2VyIG5vdCBmb3VuZFwiLCBkb21haW5zOiBbXSBhcyBQcm9ibGVtRG9tYWluW10gfTtcbiAgICB9XG5cbiAgICAvLyBBZG1pbnMsIHRlYWNoZXJzLCBpbnN0aXR1dGlvbiBtYW5hZ2VycywgYW5kIGNvbnRlc3QgbWFuYWdlcnMgY2FuIHNlZSBhbGwgY291cnNlc1xuICAgIGNvbnN0IHByaXZpbGVnZWRSb2xlcyA9IFtcIkFETUlOXCIsIFwiVEVBQ0hFUlwiLCBcIklOU1RJVFVUSU9OX01BTkFHRVJcIiwgXCJDT05URVNUX01BTkFHRVJcIl07XG4gICAgaWYgKHByaXZpbGVnZWRSb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkb21haW5zOiBPYmplY3QudmFsdWVzKFByb2JsZW1Eb21haW4pLFxuICAgICAgICBpc1ByaXZpbGVnZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN0dWRlbnQgZG9lc24ndCBoYXZlIGEgeWVhciBzZXQsIHJldHVybiBlbXB0eSAob3IgYWxsIGNvdXJzZXMgYmFzZWQgb24geW91ciBwcmVmZXJlbmNlKVxuICAgIGlmICghdXNlci55ZWFyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkb21haW5zOiBbXSBhcyBQcm9ibGVtRG9tYWluW10sIC8vIE5vIGNvdXJzZXMgdW50aWwgeWVhciBpcyBzZXRcbiAgICAgICAgaXNQcml2aWxlZ2VkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gR2V0IGNvdXJzZXMgYWxsb2NhdGVkIHRvIHVzZXIncyB5ZWFyXG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyB5ZWFyOiB1c2VyLnllYXIgfSxcbiAgICAgIHNlbGVjdDogeyBkb21haW46IHRydWUgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZG9tYWluczogYWxsb2NhdGlvbnMubWFwKChhKSA9PiBhLmRvbWFpbiksXG4gICAgICBpc1ByaXZpbGVnZWQ6IGZhbHNlLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXIgYWxsb2NhdGVkIGNvdXJzZXM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvdXJzZXNcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cbn1cblxuLy8gQWxsb2NhdGUgYSBjb3Vyc2UgdG8gYSB5ZWFyIChBZG1pbi9JbnN0aXR1dGlvbiBNYW5hZ2VyIG9ubHkpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWxsb2NhdGVDb3Vyc2UoeWVhcjogbnVtYmVyLCBkb21haW46IFByb2JsZW1Eb21haW4pIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gIH1cblxuICBjb25zdCB1c2VyUm9sZSA9IChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlO1xuICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiXS5pbmNsdWRlcyh1c2VyUm9sZSkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW5zdWZmaWNpZW50IHBlcm1pc3Npb25zXCIgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgcHJpc21hLmNvdXJzZUFsbG9jYXRpb24uY3JlYXRlKHtcbiAgICAgIGRhdGE6IHsgeWVhciwgZG9tYWluIH0sXG4gICAgfSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9jb3Vyc2UtYWxsb2NhdGlvblwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvaW5zdGl0dXRpb24vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXNcIik7XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWxsb2NhdGluZyBjb3Vyc2U6XCIsIGVycm9yKTtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gXCJQMjAwMlwiKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ291cnNlIGFscmVhZHkgYWxsb2NhdGVkIHRvIHRoaXMgeWVhclwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gYWxsb2NhdGUgY291cnNlXCIgfTtcbiAgfVxufVxuXG4vLyBSZW1vdmUgY291cnNlIGFsbG9jYXRpb24gKEFkbWluL0luc3RpdHV0aW9uIE1hbmFnZXIgb25seSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVDb3Vyc2VBbGxvY2F0aW9uKHllYXI6IG51bWJlciwgZG9tYWluOiBQcm9ibGVtRG9tYWluKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICB9XG5cbiAgY29uc3QgdXNlclJvbGUgPSAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZTtcbiAgaWYgKCFbXCJBRE1JTlwiLCBcIklOU1RJVFVUSU9OX01BTkFHRVJcIl0uaW5jbHVkZXModXNlclJvbGUpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkluc3VmZmljaWVudCBwZXJtaXNzaW9uc1wiIH07XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmRlbGV0ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB5ZWFyX2RvbWFpbjogeyB5ZWFyLCBkb21haW4gfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9jb3Vyc2UtYWxsb2NhdGlvblwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvaW5zdGl0dXRpb24vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXNcIik7XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlbW92aW5nIGNvdXJzZSBhbGxvY2F0aW9uOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byByZW1vdmUgYWxsb2NhdGlvblwiIH07XG4gIH1cbn1cblxuLy8gQnVsayB1cGRhdGUgYWxsb2NhdGlvbnMgZm9yIGEgeWVhclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVllYXJBbGxvY2F0aW9ucyh5ZWFyOiBudW1iZXIsIGRvbWFpbnM6IFByb2JsZW1Eb21haW5bXSkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICB9KTtcblxuICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgfVxuXG4gIGNvbnN0IHVzZXJSb2xlID0gKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGU7XG4gIGlmICghW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKHVzZXJSb2xlKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnN1ZmZpY2llbnQgcGVybWlzc2lvbnNcIiB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBEZWxldGUgZXhpc3RpbmcgYWxsb2NhdGlvbnMgZm9yIHRoaXMgeWVhclxuICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmRlbGV0ZU1hbnkoe1xuICAgICAgd2hlcmU6IHsgeWVhciB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIG5ldyBhbGxvY2F0aW9uc1xuICAgIGlmIChkb21haW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmNyZWF0ZU1hbnkoe1xuICAgICAgICBkYXRhOiBkb21haW5zLm1hcCgoZG9tYWluKSA9PiAoeyB5ZWFyLCBkb21haW4gfSkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2luc3RpdHV0aW9uL2NvdXJzZS1hbGxvY2F0aW9uXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zXCIpO1xuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyB5ZWFyIGFsbG9jYXRpb25zOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgYWxsb2NhdGlvbnNcIiB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImdUQVNzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:e4498b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"606f99b2f318fad1bf69fea59e0e0ac2fdb9e6c5cb":"updateYearAllocations"},"actions/courseAllocation.action.ts",""] */ __turbopack_context__.s([
    "updateYearAllocations",
    ()=>updateYearAllocations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var updateYearAllocations = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("606f99b2f318fad1bf69fea59e0e0ac2fdb9e6c5cb", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateYearAllocations"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY291cnNlQWxsb2NhdGlvbi5hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IFByb2JsZW1Eb21haW4gfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoLCBjYWNoZVRhZywgY2FjaGVMaWZlIH0gZnJvbSBcIm5leHQvY2FjaGVcIjtcblxuLy8gR2V0IGFsbCBjb3Vyc2UgYWxsb2NhdGlvbnMgKGNhY2hlZClcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb3Vyc2VBbGxvY2F0aW9ucygpIHtcbiAgXCJ1c2UgY2FjaGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pOyAvLyAxNSBtaW51dGVzXG4gIGNhY2hlVGFnKFwiY291cnNlLWFsbG9jYXRpb25zXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICBvcmRlckJ5OiBbeyB5ZWFyOiBcImFzY1wiIH0sIHsgZG9tYWluOiBcImFzY1wiIH1dLFxuICAgIH0pO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFsbG9jYXRpb25zIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGNvdXJzZSBhbGxvY2F0aW9uczpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY291cnNlIGFsbG9jYXRpb25zXCIgfTtcbiAgfVxufVxuXG4vLyBHZXQgY291cnNlcyBhbGxvY2F0ZWQgdG8gYSBzcGVjaWZpYyB5ZWFyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q291cnNlc0J5WWVhcih5ZWFyOiBudW1iZXIpIHtcbiAgXCJ1c2UgY2FjaGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pO1xuICBjYWNoZVRhZyhcImNvdXJzZS1hbGxvY2F0aW9uc1wiLCBgY291cnNlLXllYXItJHt5ZWFyfWApO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyB5ZWFyIH0sXG4gICAgICBzZWxlY3Q6IHsgZG9tYWluOiB0cnVlIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkb21haW5zOiBhbGxvY2F0aW9ucy5tYXAoKGEpID0+IGEuZG9tYWluKSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjb3Vyc2VzIGJ5IHllYXI6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvdXJzZXNcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cbn1cblxuLy8gR2V0IHVzZXIncyBhbGxvY2F0ZWQgY291cnNlcyAoYmFzZWQgb24gdGhlaXIgeWVhcilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQWxsb2NhdGVkQ291cnNlcygpIHtcbiAgXCJ1c2UgY2FjaGU6IHByaXZhdGVcIjtcbiAgY2FjaGVMaWZlKHsgc3RhbGU6IDkwMCwgcmV2YWxpZGF0ZTogOTAwIH0pO1xuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cblxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XG4gIGNhY2hlVGFnKGB1c2VyLWNvdXJzZXMtJHt1c2VySWR9YCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBHZXQgdXNlciBkZXRhaWxzIHdpdGggeWVhclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcbiAgICAgIHNlbGVjdDogeyB5ZWFyOiB0cnVlLCByb2xlOiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVc2VyIG5vdCBmb3VuZFwiLCBkb21haW5zOiBbXSBhcyBQcm9ibGVtRG9tYWluW10gfTtcbiAgICB9XG5cbiAgICAvLyBBZG1pbnMsIHRlYWNoZXJzLCBpbnN0aXR1dGlvbiBtYW5hZ2VycywgYW5kIGNvbnRlc3QgbWFuYWdlcnMgY2FuIHNlZSBhbGwgY291cnNlc1xuICAgIGNvbnN0IHByaXZpbGVnZWRSb2xlcyA9IFtcIkFETUlOXCIsIFwiVEVBQ0hFUlwiLCBcIklOU1RJVFVUSU9OX01BTkFHRVJcIiwgXCJDT05URVNUX01BTkFHRVJcIl07XG4gICAgaWYgKHByaXZpbGVnZWRSb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkb21haW5zOiBPYmplY3QudmFsdWVzKFByb2JsZW1Eb21haW4pLFxuICAgICAgICBpc1ByaXZpbGVnZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN0dWRlbnQgZG9lc24ndCBoYXZlIGEgeWVhciBzZXQsIHJldHVybiBlbXB0eSAob3IgYWxsIGNvdXJzZXMgYmFzZWQgb24geW91ciBwcmVmZXJlbmNlKVxuICAgIGlmICghdXNlci55ZWFyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkb21haW5zOiBbXSBhcyBQcm9ibGVtRG9tYWluW10sIC8vIE5vIGNvdXJzZXMgdW50aWwgeWVhciBpcyBzZXRcbiAgICAgICAgaXNQcml2aWxlZ2VkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gR2V0IGNvdXJzZXMgYWxsb2NhdGVkIHRvIHVzZXIncyB5ZWFyXG4gICAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBwcmlzbWEuY291cnNlQWxsb2NhdGlvbi5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyB5ZWFyOiB1c2VyLnllYXIgfSxcbiAgICAgIHNlbGVjdDogeyBkb21haW46IHRydWUgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZG9tYWluczogYWxsb2NhdGlvbnMubWFwKChhKSA9PiBhLmRvbWFpbiksXG4gICAgICBpc1ByaXZpbGVnZWQ6IGZhbHNlLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXIgYWxsb2NhdGVkIGNvdXJzZXM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNvdXJzZXNcIiwgZG9tYWluczogW10gYXMgUHJvYmxlbURvbWFpbltdIH07XG4gIH1cbn1cblxuLy8gQWxsb2NhdGUgYSBjb3Vyc2UgdG8gYSB5ZWFyIChBZG1pbi9JbnN0aXR1dGlvbiBNYW5hZ2VyIG9ubHkpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWxsb2NhdGVDb3Vyc2UoeWVhcjogbnVtYmVyLCBkb21haW46IFByb2JsZW1Eb21haW4pIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGguYXBpLmdldFNlc3Npb24oe1xuICAgIGhlYWRlcnM6IGF3YWl0IGhlYWRlcnMoKSxcbiAgfSk7XG5cbiAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH07XG4gIH1cblxuICBjb25zdCB1c2VyUm9sZSA9IChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlO1xuICBpZiAoIVtcIkFETUlOXCIsIFwiSU5TVElUVVRJT05fTUFOQUdFUlwiXS5pbmNsdWRlcyh1c2VyUm9sZSkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW5zdWZmaWNpZW50IHBlcm1pc3Npb25zXCIgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgcHJpc21hLmNvdXJzZUFsbG9jYXRpb24uY3JlYXRlKHtcbiAgICAgIGRhdGE6IHsgeWVhciwgZG9tYWluIH0sXG4gICAgfSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9jb3Vyc2UtYWxsb2NhdGlvblwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvaW5zdGl0dXRpb24vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXNcIik7XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWxsb2NhdGluZyBjb3Vyc2U6XCIsIGVycm9yKTtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gXCJQMjAwMlwiKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ291cnNlIGFscmVhZHkgYWxsb2NhdGVkIHRvIHRoaXMgeWVhclwiIH07XG4gICAgfVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gYWxsb2NhdGUgY291cnNlXCIgfTtcbiAgfVxufVxuXG4vLyBSZW1vdmUgY291cnNlIGFsbG9jYXRpb24gKEFkbWluL0luc3RpdHV0aW9uIE1hbmFnZXIgb25seSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVDb3Vyc2VBbGxvY2F0aW9uKHllYXI6IG51bWJlciwgZG9tYWluOiBQcm9ibGVtRG9tYWluKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoLmFwaS5nZXRTZXNzaW9uKHtcbiAgICBoZWFkZXJzOiBhd2FpdCBoZWFkZXJzKCksXG4gIH0pO1xuXG4gIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9O1xuICB9XG5cbiAgY29uc3QgdXNlclJvbGUgPSAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZTtcbiAgaWYgKCFbXCJBRE1JTlwiLCBcIklOU1RJVFVUSU9OX01BTkFHRVJcIl0uaW5jbHVkZXModXNlclJvbGUpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkluc3VmZmljaWVudCBwZXJtaXNzaW9uc1wiIH07XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmRlbGV0ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB5ZWFyX2RvbWFpbjogeyB5ZWFyLCBkb21haW4gfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pbi9jb3Vyc2UtYWxsb2NhdGlvblwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChcIi9kYXNoYm9hcmQvaW5zdGl0dXRpb24vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvYmxlbXNcIik7XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlbW92aW5nIGNvdXJzZSBhbGxvY2F0aW9uOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byByZW1vdmUgYWxsb2NhdGlvblwiIH07XG4gIH1cbn1cblxuLy8gQnVsayB1cGRhdGUgYWxsb2NhdGlvbnMgZm9yIGEgeWVhclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVllYXJBbGxvY2F0aW9ucyh5ZWFyOiBudW1iZXIsIGRvbWFpbnM6IFByb2JsZW1Eb21haW5bXSkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgYXV0aC5hcGkuZ2V0U2Vzc2lvbih7XG4gICAgaGVhZGVyczogYXdhaXQgaGVhZGVycygpLFxuICB9KTtcblxuICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfTtcbiAgfVxuXG4gIGNvbnN0IHVzZXJSb2xlID0gKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGU7XG4gIGlmICghW1wiQURNSU5cIiwgXCJJTlNUSVRVVElPTl9NQU5BR0VSXCJdLmluY2x1ZGVzKHVzZXJSb2xlKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnN1ZmZpY2llbnQgcGVybWlzc2lvbnNcIiB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBEZWxldGUgZXhpc3RpbmcgYWxsb2NhdGlvbnMgZm9yIHRoaXMgeWVhclxuICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmRlbGV0ZU1hbnkoe1xuICAgICAgd2hlcmU6IHsgeWVhciB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIG5ldyBhbGxvY2F0aW9uc1xuICAgIGlmIChkb21haW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IHByaXNtYS5jb3Vyc2VBbGxvY2F0aW9uLmNyZWF0ZU1hbnkoe1xuICAgICAgICBkYXRhOiBkb21haW5zLm1hcCgoZG9tYWluKSA9PiAoeyB5ZWFyLCBkb21haW4gfSkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vY291cnNlLWFsbG9jYXRpb25cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvZGFzaGJvYXJkL2luc3RpdHV0aW9uL2NvdXJzZS1hbGxvY2F0aW9uXCIpO1xuICAgIHJldmFsaWRhdGVQYXRoKFwiL3Byb2JsZW1zXCIpO1xuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyB5ZWFyIGFsbG9jYXRpb25zOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byB1cGRhdGUgYWxsb2NhdGlvbnNcIiB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlUQWlMc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(main)/admin/course-allocation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseAllocationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$52ad87__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:52ad87 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$e4498b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:e4498b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CourseAllocationPage() {
    _s();
    const [allocations, setAllocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // State for year selections
    const [yearAllocations, setYearAllocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const availableDomains = [
        "DSA",
        "SQL"
    ];
    const years = [
        1,
        2,
        3,
        4
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourseAllocationPage.useEffect": ()=>{
            loadAllocations();
        }
    }["CourseAllocationPage.useEffect"], []);
    async function loadAllocations() {
        setLoading(true);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$52ad87__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getCourseAllocations"])();
        if (result.success && result.allocations) {
            setAllocations(result.allocations);
            // Build year allocations map
            const yearMap = {};
            years.forEach((year)=>{
                yearMap[year] = result.allocations.filter((a)=>a.year === year).map((a)=>a.domain);
            });
            setYearAllocations(yearMap);
        }
        setLoading(false);
    }
    const toggleDomain = (year, domain)=>{
        setYearAllocations((prev)=>{
            const current = prev[year] || [];
            const updated = current.includes(domain) ? current.filter((d)=>d !== domain) : [
                ...current,
                domain
            ];
            return {
                ...prev,
                [year]: updated
            };
        });
    };
    const saveAllocations = async (year)=>{
        setSaving(true);
        const domains = yearAllocations[year] || [];
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$e4498b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateYearAllocations"])(year, domains);
        if (result.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Year ${year} allocations updated successfully`);
            await loadAllocations(); // Reload to sync
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(result.error || "Failed to update allocations");
        }
        setSaving(false);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600 dark:text-gray-400",
                        children: "Loading allocations..."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8 transition-colors",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 dark:text-white",
                            children: "Course Allocation Management"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-gray-600 dark:text-gray-400",
                            children: "Allocate courses to different academic years. Students will only see courses allocated to their year."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: years.map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-[#141414] rounded-lg shadow-sm border border-gray-200 dark:border-[#262626] p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-gray-900 dark:text-white",
                                            children: [
                                                "Year ",
                                                year
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>saveAllocations(year),
                                            disabled: saving,
                                            className: "px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: saving ? "Saving..." : "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                                    children: availableDomains.map((domain)=>{
                                        const isSelected = (yearAllocations[year] || []).includes(domain);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleDomain(year, domain),
                                            className: `p-4 rounded-lg border-2 transition-all text-left ${isSelected ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10" : "border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#444]"}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-900 dark:text-gray-100",
                                                        children: domain
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 25
                                                    }, this),
                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-5 h-5 text-orange-500",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 23
                                            }, this)
                                        }, domain, false, {
                                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, year, true, {
                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-blue-700 dark:text-blue-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Note:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this),
                                        " Students will only see courses allocated to their academic year. Admins, teachers, institution managers, and contest managers can view all courses regardless of allocations."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/admin/course-allocation/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(CourseAllocationPage, "Yj+KzcPmPbcQFkKFv/0TCNs+Jpg=");
_c = CourseAllocationPage;
var _c;
__turbopack_context__.k.register(_c, "CourseAllocationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_be62ff8c._.js.map