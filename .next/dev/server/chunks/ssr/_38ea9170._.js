module.exports = [
"[project]/lib/redis.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/lib/redis.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/node_modules/leetcode-query/lib/index.js [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_d66ac324._.js",
  "server/chunks/ssr/[root-of-the-server]__64c4685f._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/leetcode-query/lib/index.js [app-rsc] (ecmascript)");
    });
});
}),
];