module.exports = [
"[project]/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time truthy", 1) {
        // Import the worker to ensure it starts processing the queue
        await __turbopack_context__.A("[project]/core/queues/submission.queue.ts [instrumentation] (ecmascript, async loader)");
    }
}
}),
];

//# sourceMappingURL=instrumentation_ts_cf8be71b._.js.map