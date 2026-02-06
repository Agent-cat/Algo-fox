module.exports = [
"[project]/lib/prisma.ts [instrumentation] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/lib/prisma.ts [instrumentation] (ecmascript)");
    });
});
}),
"[project]/lib/sql-converter.ts [instrumentation] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/lib_sql-converter_ts_2714d7bc._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/sql-converter.ts [instrumentation] (ecmascript)");
    });
});
}),
];