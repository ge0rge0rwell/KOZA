module.exports = [
"[project]/src/domain/narrativeDomain.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_services_geminiService_8babea58.js",
  "server/chunks/ssr/src_651e6657._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/domain/narrativeDomain.js [app-ssr] (ecmascript)");
    });
});
}),
];