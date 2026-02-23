module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/hooks/useLocalStorage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return initialValue;
        //TURBOPACK unreachable
        ;
    });
    const setValue = (value)=>{
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.log(error);
        }
    };
    return [
        storedValue,
        setValue
    ];
}
}),
"[project]/src/config.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANALYTICS_CONFIG",
    ()=>ANALYTICS_CONFIG,
    "API_CONFIG",
    ()=>API_CONFIG,
    "APP_CONFIG",
    ()=>APP_CONFIG,
    "FIREBASE_CONFIG",
    ()=>FIREBASE_CONFIG
]);
const APP_CONFIG = {
    NAME: "KOZA",
    VERSION: "2.0.0"
};
const API_CONFIG = {
    OPENROUTER_API_KEY: ("TURBOPACK compile-time value", "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") || ""
};
const FIREBASE_CONFIG = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAYlSWX7JxHwXJyMm-NQ27pmHYoG1ZF8sI") || "",
    authDomain: ("TURBOPACK compile-time value", "koza-empathy.firebaseapp.com") || "",
    projectId: ("TURBOPACK compile-time value", "koza-empathy") || "",
    storageBucket: ("TURBOPACK compile-time value", "koza-empathy.firebasestorage.app") || "",
    messagingSenderId: ("TURBOPACK compile-time value", "156512542192") || "",
    appId: ("TURBOPACK compile-time value", "1:156512542192:web:747afd03244122fbc75135") || ""
};
const ANALYTICS_CONFIG = {
    measurementId: ("TURBOPACK compile-time value", "G-V0PXH3NLY5") || ""
};
}),
"[project]/src/utils/userPresence.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userPresenceTracker",
    ()=>userPresenceTracker
]);
/**
 * User Presence Tracker
 * Tracks active users for admin analytics
 */ class UserPresenceTracker {
    constructor(){
        this.activeUsers = new Set();
        this.sessionId = this.generateSessionId();
        this.startTracking();
    }
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    startTracking() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    getActiveUserCount() {
        // In production, this would query Firebase Realtime Database
        // For now, return 1 (current user)
        return this.activeUsers.size;
    }
    cleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.activeUsers.delete(this.sessionId);
    }
}
const userPresenceTracker = new UserPresenceTracker();
}),
"[project]/src/utils/localAnalytics.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "localAnalytics",
    ()=>localAnalytics
]);
/**
 * Local Analytics Tracker
 * Stores analytics data locally for admin panel display
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPresence$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/userPresence.js [app-ssr] (ecmascript)");
;
class LocalAnalytics {
    constructor(){
        this.sessionStart = Date.now();
        this.pageViews = [];
        this.events = [];
        this.maxItems = 100;
    }
    trackPageView(path) {
        this.pageViews.push({
            path,
            timestamp: Date.now()
        });
        if (this.pageViews.length > this.maxItems) {
            this.pageViews.shift();
        }
    }
    trackEvent(category, action, label) {
        this.events.push({
            category,
            action,
            label,
            timestamp: Date.now()
        });
        if (this.events.length > this.maxItems) {
            this.events.shift();
        }
    }
    getStats() {
        const now = Date.now();
        const sessionDuration = now - this.sessionStart;
        // Calculate average session time (simplified)
        const avgSessionMinutes = Math.floor(sessionDuration / 60000);
        const avgSessionSeconds = Math.floor(sessionDuration % 60000 / 1000);
        // Count unique paths
        const uniquePaths = new Set(this.pageViews.map((pv)=>pv.path));
        // Event breakdown
        const eventsByCategory = {};
        this.events.forEach((event)=>{
            eventsByCategory[event.category] = (eventsByCategory[event.category] || 0) + 1;
        });
        return {
            totalPageViews: this.pageViews.length,
            uniquePages: uniquePaths.size,
            totalEvents: this.events.length,
            sessionDuration: `${avgSessionMinutes}m ${avgSessionSeconds}s`,
            activeUsers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPresence$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userPresenceTracker"].getActiveUserCount(),
            eventsByCategory,
            recentPageViews: this.pageViews.slice(-10).reverse(),
            recentEvents: this.events.slice(-10).reverse()
        };
    }
    clearData() {
        this.pageViews = [];
        this.events = [];
        this.sessionStart = Date.now();
    }
}
const localAnalytics = new LocalAnalytics();
}),
"[project]/src/utils/googleAnalytics.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "googleAnalytics",
    ()=>googleAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$ga4$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-ga4/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/localAnalytics.js [app-ssr] (ecmascript)");
;
;
;
class GoogleAnalytics {
    constructor(){
        this.initialized = false;
        this.queue = [];
    }
    initialize() {
        if (this.initialized || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANALYTICS_CONFIG"].measurementId || ("TURBOPACK compile-time value", "undefined") === 'undefined') {
            return;
        }
        //TURBOPACK unreachable
        ;
        // Use requestIdleCallback or setTimeout to initialize without blocking LCP
        const init = undefined;
    }
    trackPageView(path) {
        // Always track locally for admin panel
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localAnalytics"].trackPageView(path);
        if (!this.initialized) {
            this.queue.push({
                type: 'trackPageView',
                args: [
                    path
                ]
            });
            return;
        }
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$ga4$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].send({
                hitType: 'pageview',
                page: path
            });
        } catch (error) {
            console.error('Failed to track page view:', error);
        }
    }
    trackEvent(category, action, label, value) {
        // Always track locally for admin panel
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localAnalytics"].trackEvent(category, action, label);
        if (!this.initialized) {
            this.queue.push({
                type: 'trackEvent',
                args: [
                    category,
                    action,
                    label,
                    value
                ]
            });
            return;
        }
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$ga4$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].event({
                category,
                action,
                label,
                value
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }
    setUserProperties(properties) {
        if (!this.initialized) {
            this.queue.push({
                type: 'setUserProperties',
                args: [
                    properties
                ]
            });
            return;
        }
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$ga4$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(properties);
        } catch (error) {
            console.error('Failed to set user properties:', error);
        }
    }
    trackTiming(category, variable, value, label) {
        if (!this.initialized) return;
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$ga4$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].event({
                category,
                action: variable,
                label,
                value,
                nonInteraction: true
            });
        } catch (error) {
            console.error('Failed to track timing:', error);
        }
    }
}
const googleAnalytics = new GoogleAnalytics();
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/services/firebase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analytics",
    ()=>analytics,
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAYlSWX7JxHwXJyMm-NQ27pmHYoG1ZF8sI"),
    authDomain: ("TURBOPACK compile-time value", "koza-empathy.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "koza-empathy"),
    storageBucket: ("TURBOPACK compile-time value", "koza-empathy.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "156512542192"),
    appId: ("TURBOPACK compile-time value", "1:156512542192:web:747afd03244122fbc75135"),
    measurementId: ("TURBOPACK compile-time value", "G-V0PXH3NLY5")
};
// Initialize Firebase
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
let analytics = null;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
;
}),
"[project]/src/machines/authMachine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authMachine",
    ()=>authMachine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/xstate.development.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/assign-2343d091.development.esm.js [app-ssr] (ecmascript) <export a as assign>");
;
const authMachine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setup"])({
    types: {
        context: {},
        events: {}
    },
    actions: {
        assignUser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            user: ({ event })=>event.user
        }),
        clearUser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            user: null
        }),
        assignError: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            error: ({ event })=>event.error
        })
    }
}).createMachine({
    id: 'auth',
    initial: 'checking',
    context: {
        user: null,
        error: null
    },
    states: {
        checking: {
            on: {
                'AUTH.CHECK_COMPLETE': [
                    {
                        guard: ({ event })=>!!event.user,
                        target: 'authenticated',
                        actions: 'assignUser'
                    },
                    {
                        target: 'unauthenticated'
                    }
                ]
            }
        },
        unauthenticated: {
            on: {
                'AUTH.LOGIN_START': {
                    target: 'authenticating',
                    actions: 'clearUser' // Clear specific error if needed
                }
            }
        },
        authenticating: {
            on: {
                'AUTH.LOGIN_SUCCESS': {
                    target: 'authenticated',
                    actions: 'assignUser'
                },
                'AUTH.LOGIN_FAILURE': {
                    target: 'unauthenticated',
                    actions: 'assignError'
                }
            }
        },
        authenticated: {
            on: {
                'AUTH.LOGOUT_START': {
                    target: 'unauthenticated',
                    actions: 'clearUser'
                },
                'AUTH.UPDATE_USER': {
                    actions: 'assignUser'
                }
            }
        }
    }
});
}),
"[project]/src/utils/achievements.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Achievement system
 */ __turbopack_context__.s([
    "ACHIEVEMENTS",
    ()=>ACHIEVEMENTS,
    "checkAchievements",
    ()=>checkAchievements,
    "getAchievementProgress",
    ()=>getAchievementProgress
]);
const ACHIEVEMENTS = [
    {
        id: 'first_story',
        name: 'İlk Hikaye',
        description: 'İlk hikayeni oluştur',
        icon: '📖',
        xp: 100,
        condition: (stats)=>stats.storiesCreated >= 1
    },
    {
        id: 'story_master',
        name: 'Hikaye Ustası',
        description: '10 hikaye oluştur',
        icon: '✨',
        xp: 500,
        condition: (stats)=>stats.storiesCreated >= 10
    },
    {
        id: 'first_game',
        name: 'İlk Oyun',
        description: 'İlk oyununu oluştur',
        icon: '🎮',
        xp: 100,
        condition: (stats)=>stats.gamesCreated >= 1
    },
    {
        id: 'game_master',
        name: 'Oyun Ustası',
        description: '10 oyun oluştur',
        icon: '🏆',
        xp: 500,
        condition: (stats)=>stats.gamesCreated >= 10
    },
    {
        id: 'level_5',
        name: 'Yükselen Yıldız',
        description: 'Seviye 5\'e ulaş',
        icon: '⭐',
        xp: 200,
        condition: (stats)=>stats.level >= 5
    },
    {
        id: 'level_10',
        name: 'Dönüşüm Şampiyonu',
        description: 'Seviye 10\'a ulaş',
        icon: '🌟',
        xp: 500,
        condition: (stats)=>stats.level >= 10
    },
    {
        id: 'xp_1000',
        name: 'XP Avcısı',
        description: 'Toplam 1000 XP kazan',
        icon: '💎',
        xp: 250,
        condition: (stats)=>stats.totalXP >= 1000
    },
    {
        id: 'daily_streak_7',
        name: 'Kararlı Kullanıcı',
        description: '7 gün üst üste giriş yap',
        icon: '🔥',
        xp: 300,
        condition: (stats)=>stats.dailyStreak >= 7
    }
];
const checkAchievements = (stats, unlockedAchievements = [])=>{
    const newAchievements = [];
    for (const achievement of ACHIEVEMENTS){
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
            newAchievements.push(achievement);
        }
    }
    return newAchievements;
};
const getAchievementProgress = (achievementId, stats)=>{
    const achievement = ACHIEVEMENTS.find((a)=>a.id === achievementId);
    if (!achievement) return 0;
    // Calculate progress based on achievement type
    if (achievementId.includes('story')) {
        const target = achievementId === 'first_story' ? 1 : 10;
        return Math.min(stats.storiesCreated / target * 100, 100);
    }
    if (achievementId.includes('game')) {
        const target = achievementId === 'first_game' ? 1 : 10;
        return Math.min(stats.gamesCreated / target * 100, 100);
    }
    if (achievementId.includes('level')) {
        const target = parseInt(achievementId.split('_')[1]);
        return Math.min(stats.level / target * 100, 100);
    }
    if (achievementId.includes('xp')) {
        const target = parseInt(achievementId.split('_')[1]);
        return Math.min(stats.totalXP / target * 100, 100);
    }
    if (achievementId.includes('streak')) {
        const target = parseInt(achievementId.split('_')[2]);
        return Math.min(stats.dailyStreak / target * 100, 100);
    }
    return 0;
};
}),
"[project]/src/machines/userMachine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userMachine",
    ()=>userMachine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/xstate.development.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/assign-2343d091.development.esm.js [app-ssr] (ecmascript) <export a as assign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$achievements$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/achievements.js [app-ssr] (ecmascript)");
;
;
const userMachine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setup"])({
    types: {
        context: {},
        events: {}
    },
    actions: {
        updateLocalUser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            user: ({ context, event })=>{
                return {
                    ...context.user,
                    ...event.data
                };
            }
        }),
        calculateXP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            user: ({ context, event })=>{
                const { amount } = event;
                const prev = context.user;
                const newXP = prev.xp + amount;
                const newTotalXP = prev.totalXP + amount;
                // This machine handles the *logic*, ensuring it's decoupled from UI
                // We can emit a 'LEVEL_UP' event if needed, or just update state
                if (newXP >= prev.nextLevelXp) {
                    return {
                        ...prev,
                        xp: newXP - prev.nextLevelXp,
                        level: prev.level + 1,
                        nextLevelXp: Math.floor(prev.nextLevelXp * 1.5),
                        totalXP: newTotalXP
                    };
                }
                return {
                    ...prev,
                    xp: newXP,
                    totalXP: newTotalXP
                };
            }
        }),
        checkAchievements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            user: ({ context })=>{
                // Wrapper around utility logic
                const newAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$achievements$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkAchievements"])({
                    storiesCreated: context.user.storiesCreated,
                    gamesCreated: context.user.gamesCreated,
                    level: context.user.level,
                    totalXP: context.user.totalXP,
                    dailyStreak: context.user.dailyStreak
                }, context.user.achievements);
                if (newAchievements.length > 0) {
                    return {
                        ...context.user,
                        achievements: [
                            ...context.user.achievements,
                            ...newAchievements.map((a)=>a.id)
                        ]
                    };
                }
                return context.user;
            }
        })
    }
}).createMachine({
    id: 'user',
    initial: 'idle',
    context: {
        user: null,
        syncStatus: 'idle',
        lastError: null
    },
    states: {
        idle: {
            on: {
                'USER.LOAD_DATA': {
                    target: 'loading',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        user: ({ event })=>event.data
                    })
                }
            }
        },
        loading: {
            always: 'ready'
        },
        ready: {
            on: {
                'USER.AWARD_XP': {
                    actions: [
                        'calculateXP',
                        'checkAchievements'
                    ] // Chained actions
                },
                'USER.SYNC_START': {
                    target: 'syncing'
                },
                'USER.UPDATE_PROFILE': {
                    actions: 'updateLocalUser'
                }
            }
        },
        syncing: {
            on: {
                'USER.SYNC_SUCCESS': {
                    target: 'ready',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        syncStatus: 'synced'
                    })
                },
                'USER.SYNC_FAILURE': {
                    target: 'ready',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        syncStatus: 'error',
                        lastError: ({ event })=>event.error
                    })
                }
            }
        }
    }
});
}),
"[project]/src/machines/storyMachine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storyMachine",
    ()=>storyMachine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/xstate.development.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/assign-2343d091.development.esm.js [app-ssr] (ecmascript) <export a as assign>");
;
const storyMachine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setup"])({
    types: {
        context: {},
        events: {}
    },
    actions: {
        setStories: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            stories: ({ event })=>event.stories
        }),
        addStory: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            stories: ({ context, event })=>[
                    event.story,
                    ...context.stories
                ]
        }),
        removeStory: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            stories: ({ context, event })=>context.stories.filter((s)=>s.id !== event.id)
        }),
        updateStory: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
            stories: ({ context, event })=>context.stories.map((s)=>s.id === event.story.id ? event.story : s)
        })
    }
}).createMachine({
    id: 'story',
    initial: 'idle',
    context: {
        stories: [],
        activeStoryId: null,
        error: null
    },
    states: {
        idle: {
            on: {
                'STORY.FETCH_START': 'fetching',
                'STORY.CREATE_START': 'creating',
                'STORY.DELETE': {
                    actions: 'removeStory' // Optimistic update
                },
                'STORY.SET_ACTIVE': {
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        activeStoryId: ({ event })=>event.id
                    })
                },
                'STORY.REFINE_START': 'refining'
            }
        },
        fetching: {
            on: {
                'STORY.FETCH_SUCCESS': {
                    target: 'idle',
                    actions: 'setStories'
                },
                'STORY.FETCH_FAILURE': {
                    target: 'idle',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        error: ({ event })=>event.error
                    })
                }
            }
        },
        creating: {
            on: {
                'STORY.CREATE_SUCCESS': {
                    target: 'idle',
                    actions: 'addStory'
                },
                'STORY.CREATE_FAILURE': {
                    target: 'idle',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        error: ({ event })=>event.error
                    })
                }
            }
        },
        refining: {
            on: {
                'STORY.REFINE_SUCCESS': {
                    target: 'idle',
                    actions: 'updateStory'
                },
                'STORY.REFINE_FAILURE': {
                    target: 'idle',
                    actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$assign$2d$2343d091$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a__as__assign$3e$__["assign"])({
                        error: ({ event })=>event.error
                    })
                }
            }
        }
    }
});
}),
"[project]/src/machines/appMachine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appMachine",
    ()=>appMachine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/xstate/dist/xstate.development.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$authMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/machines/authMachine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$userMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/machines/userMachine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$storyMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/machines/storyMachine.js [app-ssr] (ecmascript)");
;
;
;
;
const appMachine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xstate$2f$dist$2f$xstate$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setup"])({
    actors: {
        authMachine: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$authMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authMachine"],
        userMachine: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$userMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userMachine"],
        storyMachine: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$storyMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storyMachine"]
    }
}).createMachine({
    id: 'app',
    type: 'parallel',
    states: {
        auth: {
            invoke: {
                id: 'auth',
                src: 'authMachine'
            }
        },
        user: {
            invoke: {
                id: 'user',
                src: 'userMachine'
            }
        },
        story: {
            invoke: {
                id: 'story',
                src: 'storyMachine'
            }
        }
    }
});
}),
"[project]/src/context/GlobalStateMachineContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalStateMachineProvider",
    ()=>GlobalStateMachineProvider,
    "useAuthActor",
    ()=>useAuthActor,
    "useGlobalMachine",
    ()=>useGlobalMachine,
    "useStoryActor",
    ()=>useStoryActor,
    "useUserActor",
    ()=>useUserActor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xstate/react/dist/xstate-react.development.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$appMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/machines/appMachine.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const GlobalStateMachineContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const GlobalStateMachineProvider = ({ children })=>{
    const [state, send, actor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMachine"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$machines$2f$appMachine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appMachine"]);
    // We expose the main actor. Components can subscribe to specific child actors using
    // actor.getSnapshot().children.get('auth') etc., or we can provide helper hooks.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalStateMachineContext.Provider, {
        value: {
            actor
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/GlobalStateMachineContext.jsx",
        lineNumber: 15,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const useGlobalMachine = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(GlobalStateMachineContext);
    if (!context) {
        throw new Error('useGlobalMachine must be used within GlobalStateMachineProvider');
    }
    return context;
};
const useAuthActor = ()=>{
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.auth;
};
const useUserActor = ()=>{
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.user; // Note: 'user' is the invoke ID
};
const useStoryActor = ()=>{
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.story;
};
}),
"[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/googleAnalytics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/firebase.js [app-ssr] (ecmascript)");
// XState Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalStateMachineContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xstate/react/dist/xstate-react.development.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
// Initialize Providers
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
const githubProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GithubAuthProvider"]();
const microsoftProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OAuthProvider"]('microsoft.com');
;
;
const AuthProvider = ({ children })=>{
    // Connect to the Auth Machine
    const authActor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthActor"])();
    // Selectors to get data from the machine
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(authActor, (snapshot)=>snapshot.context.user);
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(authActor, (snapshot)=>snapshot.value);
    const loading = status === 'checking' || status === 'authenticating';
    const [firebaseEnabled, setFirebaseEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const enabled = !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["app"];
        setFirebaseEnabled(enabled);
        if (!enabled) {
            // If Firebase is not enabled, we tell the machine we are done checking (with no user)
            authActor.send({
                type: 'AUTH.CHECK_COMPLETE',
                user: null
            });
            return;
        }
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], (firebaseUser)=>{
            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                };
                // Send event to machine
                authActor.send({
                    type: 'AUTH.CHECK_COMPLETE',
                    user: userData
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].setUserProperties({
                    user_id: firebaseUser.uid,
                    user_email: firebaseUser.email
                });
            } else {
                authActor.send({
                    type: 'AUTH.CHECK_COMPLETE',
                    user: null
                });
            }
        });
        return ()=>unsubscribe();
    }, [
        authActor
    ]);
    const signInWithGoogle = async ()=>{
        if (!firebaseEnabled) return {
            success: false,
            error: 'Authentication not configured'
        };
        authActor.send({
            type: 'AUTH.LOGIN_START'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], googleProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            authActor.send({
                type: 'AUTH.LOGIN_SUCCESS',
                user: userData
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'sign_in', 'google');
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            console.error('Google sign in failed:', error);
            authActor.send({
                type: 'AUTH.LOGIN_FAILURE',
                error: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    const signInWithGithub = async ()=>{
        if (!firebaseEnabled) return {
            success: false,
            error: 'Authentication not configured'
        };
        authActor.send({
            type: 'AUTH.LOGIN_START'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], githubProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            authActor.send({
                type: 'AUTH.LOGIN_SUCCESS',
                user: userData
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'sign_in', 'github');
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            console.error('Github sign in failed:', error);
            authActor.send({
                type: 'AUTH.LOGIN_FAILURE',
                error: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    const signInWithMicrosoft = async ()=>{
        if (!firebaseEnabled) return {
            success: false,
            error: 'Authentication not configured'
        };
        authActor.send({
            type: 'AUTH.LOGIN_START'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], microsoftProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            authActor.send({
                type: 'AUTH.LOGIN_SUCCESS',
                user: userData
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'sign_in', 'microsoft');
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            console.error('Microsoft sign in failed:', error);
            authActor.send({
                type: 'AUTH.LOGIN_FAILURE',
                error: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    const registerWithEmail = async (email, password)=>{
        if (!firebaseEnabled) return {
            success: false,
            error: 'Authentication not configured'
        };
        authActor.send({
            type: 'AUTH.LOGIN_START'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            authActor.send({
                type: 'AUTH.LOGIN_SUCCESS',
                user: userData
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'register', 'email');
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            console.error('Registration failed:', error);
            authActor.send({
                type: 'AUTH.LOGIN_FAILURE',
                error: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    const signInWithEmail = async (email, password)=>{
        if (!firebaseEnabled) return {
            success: false,
            error: 'Authentication not configured'
        };
        authActor.send({
            type: 'AUTH.LOGIN_START'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            authActor.send({
                type: 'AUTH.LOGIN_SUCCESS',
                user: userData
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'sign_in', 'email');
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            console.error('Login failed:', error);
            authActor.send({
                type: 'AUTH.LOGIN_FAILURE',
                error: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    const signOut = async ()=>{
        if (!firebaseEnabled) return;
        authActor.send({
            type: 'AUTH.LOGOUT_START'
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]);
            // The onAuthStateChanged listener will fire and handle the rest (AUTH.CHECK_COMPLETE -> user: null)
            // But we can also be explicit if we want:
            // authActor.send({ type: 'AUTH.CHECK_COMPLETE', user: null });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('user', 'sign_out', 'manual');
            return {
                success: true
            };
        } catch (error) {
            console.error('Sign out failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    };
    const ADMIN_EMAIL = 'oguzhanacar.bt@gmail.com';
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            user,
            isAdmin: user?.email === ADMIN_EMAIL,
            loading,
            firebaseEnabled,
            firestoreEnabled: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"],
            signInWithGoogle,
            signInWithGithub,
            signInWithMicrosoft,
            registerWithEmail,
            signInWithEmail,
            signOut
        }), [
        user,
        loading,
        firebaseEnabled,
        signInWithGoogle,
        signInWithGithub,
        signInWithMicrosoft,
        registerWithEmail,
        signInWithEmail,
        signOut
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.jsx",
        lineNumber: 238,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
}),
"[project]/src/services/firestoreService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "batchSaveStories",
    ()=>batchSaveStories,
    "createPublicPost",
    ()=>createPublicPost,
    "createUserProfile",
    ()=>createUserProfile,
    "deleteStory",
    ()=>deleteStory,
    "getPublicFeed",
    ()=>getPublicFeed,
    "getUserProfile",
    ()=>getUserProfile,
    "getUserStories",
    ()=>getUserStories,
    "likePost",
    ()=>likePost,
    "saveStory",
    ()=>saveStory,
    "subscribeToNotifications",
    ()=>subscribeToNotifications,
    "subscribeToProfile",
    ()=>subscribeToProfile,
    "subscribeToStories",
    ()=>subscribeToStories,
    "syncLocalToCloud",
    ()=>syncLocalToCloud,
    "updateUserProfile",
    ()=>updateUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/firebase.js [app-ssr] (ecmascript)");
;
;
// Remove the initialize function as we now import db directly
// export const initializeFirestore = (app) => { ... } is no longer needed
const DEFAULT_USER = {
    xp: 0,
    level: 1,
    nextLevelXp: 1000,
    title: "Empati Çırağı"
};
const getUserProfile = async (userId)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'data', 'profile');
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};
const createUserProfile = async (userId, profileData)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'data', 'profile');
        const data = {
            ...profileData,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(docRef, data);
        return data;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};
// ==================== WRITE BUFFERING (SCALE HARDENING) ====================
const profileBuffer = new Map();
let syncTimeout = null;
const SYNC_DEBOUNCE_MS = 2000;
const commitProfileSync = async (userId)=>{
    if (!profileBuffer.has(userId) || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) return;
    const data = profileBuffer.get(userId);
    profileBuffer.delete(userId);
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'data', 'profile');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
            ...data,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        console.log(`☁️ Cloud Sync: Profile updated for ${userId}`);
    } catch (error) {
        console.error('Buffer Sync Error:', error);
        // Put back in buffer on failure to retry
        profileBuffer.set(userId, {
            ...data,
            ...profileBuffer.get(userId)
        });
    }
};
const updateUserProfile = async (userId, updates)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    // Add to buffer
    const current = profileBuffer.get(userId) || {};
    profileBuffer.set(userId, {
        ...current,
        ...updates
    });
    // Debounce commit
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(()=>commitProfileSync(userId), SYNC_DEBOUNCE_MS);
    return {
        ...current,
        ...updates,
        buffered: true
    };
};
const getUserStories = async (userId)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const storiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'stories');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(storiesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        return new Promise((resolve, reject)=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
                const stories = [];
                snapshot.forEach((doc)=>{
                    stories.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                unsubscribe();
                resolve(stories);
            }, (error)=>{
                unsubscribe();
                reject(error);
            });
        });
    } catch (error) {
        console.error('Error getting user stories:', error);
        throw error;
    }
};
const saveStory = async (userId, story)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const storyId = String(story.id || Date.now());
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'stories', storyId);
        const data = {
            ...story,
            id: storyId,
            createdAt: story.createdAt || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(docRef, data);
        return {
            ...data,
            id: storyId
        };
    } catch (error) {
        console.error('Error saving story:', error);
        throw error;
    }
};
const deleteStory = async (userId, storyId)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'stories', String(storyId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])(docRef);
    } catch (error) {
        console.error('Error deleting story:', error);
        throw error;
    }
};
const subscribeToProfile = (userId, callback)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
        console.warn('Firestore not initialized, skipping subscription');
        return ()=>{};
    }
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'data', 'profile');
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(docRef, (doc)=>{
            if (doc.exists()) {
                callback(doc.data());
            }
        }, (error)=>{
            console.error('Error in profile subscription:', error);
        });
        return unsubscribe;
    } catch (error) {
        console.error('Error subscribing to profile:', error);
        return ()=>{};
    }
};
const subscribeToStories = (userId, callback)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
        console.warn('Firestore not initialized, skipping subscription');
        return ()=>{};
    }
    try {
        const storiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'stories');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(storiesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const stories = [];
            snapshot.forEach((doc)=>{
                stories.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(stories);
        }, (error)=>{
            console.error('Error in stories subscription:', error);
        });
        return unsubscribe;
    } catch (error) {
        console.error('Error subscribing to stories:', error);
        return ()=>{};
    }
};
const batchSaveStories = async (userId, stories)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        stories.forEach((story)=>{
            const storyId = String(story.id || Date.now() + Math.random());
            const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'stories', storyId);
            batch.set(docRef, {
                ...story,
                id: storyId,
                createdAt: story.createdAt || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
        });
        await batch.commit();
        console.log(`✅ Batch saved ${stories.length} stories to cloud`);
    } catch (error) {
        console.error('Error batch saving stories:', error);
        throw error;
    }
};
const createPublicPost = async (userId, authorData, content, type = 'text', additionalData = null)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const postsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'community');
        const newPostRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(postsRef);
        const postData = {
            id: newPostRef.id,
            authorId: userId,
            authorName: authorData.displayName || 'Anonim Koza',
            authorAvatar: authorData.avatarUrl || '',
            content,
            type,
            data: additionalData,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            likesCount: 0,
            repliesCount: 0,
            tags: extractTags(content)
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(newPostRef, postData);
        return postData;
    } catch (error) {
        console.error('Error creating public post:', error);
        throw error;
    }
};
const getPublicFeed = async (activeTab = 'local', lastDoc = null, limitCount = 20)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const postsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'community');
        let q;
        if (activeTab === 'local' || activeTab === 'all') {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(postsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        } else {
            const tag = activeTab.startsWith('#') ? activeTab : `#${activeTab}`;
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(postsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        // Note: In Firestore, filtering by tags usually requires array-contains or a separate structure.
        // For now, we'll do basic global feed or specific tag if we implement it.
        // Let's assume tags are handled via array-contains.
        // q = query(postsRef, where('tags', 'array-contains', tag), orderBy('createdAt', 'desc'), limit(limitCount));
        }
        if (lastDoc) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(q, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startAfter"])(lastDoc));
        }
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const posts = [];
        snapshot.forEach((doc)=>{
            posts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return {
            posts,
            lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
        };
    } catch (error) {
        console.error('Error getting public feed:', error);
        throw error;
    }
};
const likePost = async (postId)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore not initialized');
    try {
        const postRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'community', postId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(postRef, {
            likesCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["increment"])(1)
        });
    } catch (error) {
        console.error('Error liking post:', error);
    }
};
const subscribeToNotifications = (userId, callback)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) return ()=>{};
    try {
        const notifsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'notifications');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(notifsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(20));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const notifs = [];
            snapshot.forEach((doc)=>{
                notifs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(notifs);
        });
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
        return ()=>{};
    }
};
const extractTags = (text)=>{
    if (!text) return [];
    const tags = text.match(/#\w+/g);
    return tags ? tags.map((t)=>t.toLowerCase()) : [];
};
const syncLocalToCloud = async (userId, localData)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
        console.warn('Firestore not initialized, skipping cloud sync');
        return null;
    }
    try {
        // 1. Get existing cloud profile
        const cloudProfile = await getUserProfile(userId);
        let profileToUse = cloudProfile;
        // 2. Migration Gap Fix: Always attempt to push local stories to cloud
        // Using batchSaveStories is safe because it uses setDoc which is idempotent
        if (localData.stories && localData.stories.length > 0) {
            console.log(`📤 Syncing ${localData.stories.length} local stories to cloud...`);
            await batchSaveStories(userId, localData.stories);
        }
        if (!cloudProfile) {
            // First time sign in - Create profile from local stats
            console.log('📤 Creating initial cloud profile for user:', userId);
            profileToUse = {
                xp: localData.user?.xp || DEFAULT_USER.xp,
                level: localData.user?.level || DEFAULT_USER.level,
                nextLevelXp: localData.user?.nextLevelXp || DEFAULT_USER.nextLevelXp,
                totalXP: localData.user?.totalXP || localData.user?.xp || DEFAULT_USER.xp,
                storiesCreated: localData.user?.storiesCreated || 0,
                gamesCreated: localData.user?.gamesCreated || 0,
                storiesRead: localData.user?.storiesRead || 0,
                gamesPlayed: localData.user?.gamesPlayed || 0,
                dailyStreak: localData.user?.dailyStreak || 0,
                lastVisit: localData.user?.lastVisit || new Date().toISOString(),
                title: localData.user?.title || DEFAULT_USER.title,
                achievements: localData.user?.achievements || [],
                badges: localData.user?.badges || []
            };
            await createUserProfile(userId, profileToUse);
            console.log('✅ Migration complete');
            return {
                migrated: true,
                profile: profileToUse
            };
        } else {
            // Merging: For now Cloud Profile wins on stats, but stories were merged above
            console.log('🔄 Profile exists in cloud, prioritizing cloud stats');
            return {
                migrated: false,
                profile: cloudProfile
            };
        }
    } catch (error) {
        console.error('Error in syncLocalToCloud:', error);
        throw error;
    }
};
}),
"[project]/src/utils/analytics.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analytics",
    ()=>analytics
]);
/**
 * Analytics and tracking utilities
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/googleAnalytics.js [app-ssr] (ecmascript)");
;
class Analytics {
    constructor(){
        this.events = [];
        this.sessionStart = Date.now();
    }
    track(eventName, properties = {}) {
        const event = {
            name: eventName,
            timestamp: Date.now(),
            sessionDuration: Date.now() - this.sessionStart,
            ...properties
        };
        this.events.push(event);
        // Store in localStorage for persistence
        this.saveToStorage();
        // Send to Google Analytics
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$googleAnalytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleAnalytics"].trackEvent('app_interaction', eventName, properties.label || '', properties.value || undefined);
        console.log('📊 Analytics:', eventName, properties);
    }
    saveToStorage() {
        try {
            const stored = JSON.parse(localStorage.getItem('koza-analytics') || '[]');
            const combined = [
                ...stored,
                ...this.events
            ].slice(-100); // Keep last 100 events
            localStorage.setItem('koza-analytics', JSON.stringify(combined));
            this.events = [];
        } catch (e) {
            console.error('Failed to save analytics:', e);
        }
    }
    getStats() {
        try {
            const events = JSON.parse(localStorage.getItem('koza-analytics') || '[]');
            return {
                totalEvents: events.length,
                storiesCreated: events.filter((e)=>e.name === 'story_created').length,
                gamesCreated: events.filter((e)=>e.name === 'game_created').length,
                xpEarned: events.filter((e)=>e.name === 'xp_awarded').reduce((sum, e)=>sum + (e.amount || 0), 0),
                lastActivity: events.length > 0 ? events[events.length - 1].timestamp : null
            };
        } catch  {
            return null;
        }
    }
}
const analytics = new Analytics();
}),
"[project]/src/context/UserContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserProvider",
    ()=>UserProvider,
    "useUser",
    ()=>useUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLocalStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/firestoreService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/analytics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$achievements$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/achievements.js [app-ssr] (ecmascript)");
// XState Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalStateMachineContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xstate/react/dist/xstate-react.development.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const DEFAULT_USER = {
    xp: 850,
    level: 1,
    nextLevelXp: 1000,
    storiesRead: 3,
    gamesPlayed: 1,
    storiesCreated: 0,
    gamesCreated: 0,
    totalXP: 850,
    dailyStreak: 0,
    lastVisit: null,
    title: "Empathy Apprentice",
    badges: [
        {
            id: 1,
            name: "First Step",
            unlocked: true
        },
        {
            id: 2,
            name: "Storyteller",
            unlocked: false
        },
        {
            id: 3,
            name: "Transformation Specialist",
            unlocked: false
        }
    ],
    achievements: []
};
;
;
const UserProvider = ({ children })=>{
    const { user: authUser, firestoreEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Connect to User Machine
    const userActor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserActor"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(userActor, (snapshot)=>snapshot.context.user);
    const syncStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(userActor, (snapshot)=>snapshot.context.syncStatus);
    const isSyncing = syncStatus === 'syncing';
    const cloudSynced = syncStatus === 'synced'; // or check specific state matching
    // Local Storage Sync (Manual implementation to replace useLocalStorage hook's auto-write)
    const [storedUser, setStoredUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('koza-user', DEFAULT_USER);
    // Initial Load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (storedUser) {
            userActor.send({
                type: 'USER.LOAD_DATA',
                data: storedUser
            });
        }
    }, []); // Run once on mount
    // Persist machine state to local storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            setStoredUser(user);
        }
    }, [
        user,
        setStoredUser
    ]);
    // We keep lastUserEvent for the AppContextBridge to pick up (Toast notifications)
    // We can detect changes in user.level or user.achievements to set this.
    // However, the machine handles the logic. 
    // Optimization: logic from 'userMachine' is pure, but we need to know *when* an event happened.
    // We can listen to the actor's event stream.
    const [lastUserEvent, setLastUserEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const subscription = userActor.on('USER.AWARD_XP', (event)=>{
        // This listener might not be supported on the actor ref directly in all versions, 
        // but 'actor.subscribe' gives us state changes. 
        // Inspection API is better. For now, let's use the diffing approach for simplicity and robustness.
        });
        return ()=>{
            if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe();
        };
    }, [
        userActor
    ]);
    // Simple Diffing for Notifications (Robust fallback)
    const [prevUser, setPrevUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(user);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user || !prevUser) {
            setPrevUser(user);
            return;
        }
        if (user.level > prevUser.level) {
            setLastUserEvent({
                type: 'levelup',
                level: user.level
            });
        } else if (user.xp > prevUser.xp) {
            const diff = user.xp - prevUser.xp;
            if (diff > 0) {
                // We don't have the 'reason' here easily unless we store it in machine context 
                // or listen to the event. For now, generic reason or passed via a side-channel?
                // Actually, we can just say "XP Kazanıldı".
                setLastUserEvent({
                    type: 'xp',
                    amount: diff,
                    reason: "Achievement"
                });
            }
        }
        if (user.achievements.length > prevUser.achievements.length) {
            // Find new achievements
            const newIds = user.achievements.filter((id)=>!prevUser.achievements.includes(id));
            // We need to map IDs to objects. We'll need the checkAchievements utility or specific list.
            // For now, let's assume we can fetch metadata elsewhere or just notify generic.
            // But AppContextBridge expects 'achievements' array.
            // Let's reload achievements metadata? 
            // Ideally the machine event `USER.AWARD_XP` could carry the result, but machines are pure.
            // Quick fix: allow LastUserEvent to be set by the awardXP wrapper too?
            // No, let's stick to state diffing.
            const newAch = newIds.map((id)=>({
                    id,
                    name: "New Achievement",
                    icon: "🏆"
                })); // Placeholder
            setLastUserEvent({
                type: 'achievement',
                achievements: newAch
            });
        }
        setPrevUser(user);
    }, [
        user
    ]);
    // Track daily streak
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const today = new Date().toDateString();
        // Safety check: if user is null (cleared storage but not context), skip
        if (!user) return;
        const lastVisit = user.lastVisit;
        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            const newStreak = lastVisit === yesterdayStr ? user.dailyStreak + 1 : 1;
            userActor.send({
                type: 'USER.UPDATE_PROFILE',
                data: {
                    lastVisit: today,
                    dailyStreak: newStreak
                }
            });
        }
    }, [
        user?.lastVisit,
        userActor
    ]); // Depend on lastVisit to avoid loops, but need to be careful.
    // Actually, if we update user, user changes, effect runs again?
    // user.lastVisit will be today after update. 'today' will be same. Condition `lastVisit !== today` will be false. Safe.
    // Sync with Firestore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authUser || !firestoreEnabled || cloudSynced) return;
        // Trigger Sync in machine
        userActor.send({
            type: 'USER.SYNC_START'
        });
        const syncData = async ()=>{
            try {
                console.log('🔄 User: Initiating full cloud synchronization...');
                const localStories = JSON.parse(localStorage.getItem('koza-stories') || '[]');
                // We pass 'user' from the machine state (which is loaded from localStorage initially)
                const currentLocalUser = user || storedUser;
                const syncResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncLocalToCloud"](authUser.uid, {
                    user: currentLocalUser,
                    stories: localStories
                });
                if (syncResult && syncResult.profile) {
                    // Update machine with cloud data
                    userActor.send({
                        type: 'USER.UPDATE_PROFILE',
                        data: syncResult.profile
                    });
                    userActor.send({
                        type: 'USER.SYNC_SUCCESS'
                    });
                    if (syncResult.migrated) {
                        console.log('✅ Local data successfully migrated to cloud');
                    }
                } else {
                    userActor.send({
                        type: 'USER.SYNC_SUCCESS'
                    }); // Even if no changes, we synced.
                }
            } catch (error) {
                console.error('User Sync error:', error);
                userActor.send({
                    type: 'USER.SYNC_FAILURE',
                    error: error.message
                });
            }
        };
        syncData();
    }, [
        authUser,
        firestoreEnabled,
        cloudSynced,
        userActor
    ]);
    // Real-time Updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authUser || !firestoreEnabled || !cloudSynced) return;
        const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeToProfile"](authUser.uid, (data)=>{
            if (data) {
                userActor.send({
                    type: 'USER.UPDATE_PROFILE',
                    data
                });
            }
        });
        return ()=>unsubscribe();
    }, [
        authUser,
        firestoreEnabled,
        cloudSynced,
        userActor
    ]);
    // Debounced Sync to Firestore (Background Save)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authUser || !firestoreEnabled || !cloudSynced || !user) return;
        const syncTimer = setTimeout(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUserProfile"](authUser.uid, {
                xp: user.xp,
                level: user.level,
                nextLevelXp: user.nextLevelXp,
                totalXP: user.totalXP,
                storiesCreated: user.storiesCreated,
                gamesCreated: user.gamesCreated,
                storiesRead: user.storiesRead,
                gamesPlayed: user.gamesPlayed,
                dailyStreak: user.dailyStreak,
                lastVisit: user.lastVisit,
                title: user.title,
                achievements: user.achievements,
                badges: user.badges
            }).catch((e)=>console.error("Background sync error:", e));
        }, 2000);
        return ()=>clearTimeout(syncTimer);
    }, [
        user,
        authUser,
        firestoreEnabled,
        cloudSynced
    ]);
    const awardXP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((amount, reason)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analytics"].track('xp_awarded', {
            amount,
            reason
        });
        // Store reason temporarily for the diff effect? 
        // Or just fire and forget. The diff effect will catch the XP change.
        userActor.send({
            type: 'USER.AWARD_XP',
            amount
        });
        // Manual override for reason tracking if needed for toast
        // We could set a short-lived state here?
        // But AppContextBridge relies on 'lastUserEvent'. 
        // Let's set it here explicitly for the 'reason' context.
        // But wait, if we set it here, and also the diff effect sets it...
        // Let's trust the diff effect for now, or improve it later.
        // Actually, to get the "Reason" into the Toast, we need it.
        // Simple hack: 
        setLastUserEvent({
            type: 'xp',
            amount,
            reason
        });
    }, [
        userActor
    ]);
    /* 
       Direct setter replacement. 
       components calling setUser(newData) or setUser(prev => ...)
       We need to support functional updates if we want full compatibility.
    */ const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((update)=>{
        let newData;
        if (typeof update === 'function') {
            // This is dangerous if we don't have current 'user'. 
            // We can read 'user' from the closure, but it might be stale?
            // useSelector 'user' is the latest render value.
            // XState doesn't support "updater functions" in events directly usually.
            // We'll calculate it here.
            // CAUTION: 'user' dependency might cause re-creation of setUser, 
            // but that's standard React.
            // We can use actor.getSnapshot().context.user to be safe?
            const currentUser = userActor.getSnapshot().context.user || DEFAULT_USER;
            newData = update(currentUser);
        } else {
            newData = update;
        }
        userActor.send({
            type: 'USER.UPDATE_PROFILE',
            data: newData
        });
    }, [
        userActor
    ]);
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            user,
            setUser,
            awardXP,
            isSyncing,
            cloudSynced,
            lastUserEvent,
            setLastUserEvent
        }), [
        user,
        setUser,
        awardXP,
        isSyncing,
        cloudSynced,
        lastUserEvent,
        setLastUserEvent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/UserContext.jsx",
        lineNumber: 280,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
// Note: The original returned children wrapped in provider. 
// We are doing the same.
};
const useUser = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
}),
"[project]/src/context/StoryContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoryProvider",
    ()=>StoryProvider,
    "useStory",
    ()=>useStory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLocalStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UserContext.jsx [app-ssr] (ecmascript)"); // We might need to update user stats on story save
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/firestoreService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/analytics.js [app-ssr] (ecmascript)");
// XState Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalStateMachineContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xstate/react/dist/xstate-react.development.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const StoryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
;
;
const StoryProvider = ({ children })=>{
    const { user: authUser, firestoreEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { cloudSynced } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])(); // We might depend on user being synced?
    // Connect to Story Machine
    const storyActor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalStateMachineContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStoryActor"])();
    const savedStories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xstate$2f$react$2f$dist$2f$xstate$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])(storyActor, (snapshot)=>snapshot.context.stories);
    // We keep 'activeStory' (the draft) in local state for performance (avoiding machine transition on every keystroke)
    const [activeStory, setActiveStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [analysisResult, setAnalysisResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastSavedStory, setLastSavedStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Local Storage Sync (Manual implementation)
    const [localStories, setLocalStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('koza-stories', []);
    // Initial Load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (localStories && localStories.length > 0) {
            // If machine is empty, load from local
            // We can check if machine has stories? 
            // Ideally machine is SOT. 
            storyActor.send({
                type: 'STORY.FETCH_SUCCESS',
                stories: localStories
            });
        }
    }, []); // Run once
    // Persist machine state to local storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLocalStories(savedStories);
    }, [
        savedStories,
        setLocalStories
    ]);
    // Load/Sync Stories from Cloud
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authUser || !firestoreEnabled || !cloudSynced) return;
        storyActor.send({
            type: 'STORY.FETCH_START'
        });
        const loadStories = async ()=>{
            try {
                const cloudStories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserStories"](authUser.uid);
                if (cloudStories) {
                    // Merge strategy?
                    // Current strategy in old Context was: map merge.
                    // We should prob do the merge here and send SET matches.
                    // Or just trust cloud? 
                    // Let's do the merge to be safe and robust.
                    const mergedMap = new Map();
                    savedStories.forEach((s)=>mergedMap.set(String(s.id), s));
                    cloudStories.forEach((s)=>mergedMap.set(String(s.id), s));
                    const merged = Array.from(mergedMap.values()).sort((a, b)=>new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 50);
                    storyActor.send({
                        type: 'STORY.FETCH_SUCCESS',
                        stories: merged
                    });
                } else {
                    storyActor.send({
                        type: 'STORY.FETCH_SUCCESS',
                        stories: savedStories
                    });
                }
            } catch (error) {
                console.error("Story load error:", error);
                storyActor.send({
                    type: 'STORY.FETCH_FAILURE',
                    error: error.message
                });
            }
        };
        loadStories();
        const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeToStories"](authUser.uid, (data)=>{
            if (!data) return;
            // Real-time update from cloud
            // We again need to merge or just replace?
            // If data is the *full list* from Firestore listener, we can merge.
            const mergedMap = new Map();
            // We use the actor's current snapshot content or just what we have in scope?
            // 'savedStories' is from selector, so it updates.
            // CAUTION: This effect depends on savedStories? If so it loops?
            // firestoreService.subscribeToStories usually returns the full collection or changes.
            // If straightforward subscription:
            // Let's assume data is the full list.
            storyActor.send({
                type: 'STORY.FETCH_SUCCESS',
                stories: data
            });
        });
        return ()=>unsubscribe();
    }, [
        authUser,
        firestoreEnabled,
        cloudSynced,
        storyActor
    ]); // data deps removed to avoid loops, relying on remote events
    const saveStory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (story)=>{
        const storyId = String(Date.now());
        const newStory = {
            id: storyId,
            ...story,
            createdAt: new Date().toISOString()
        };
        storyActor.send({
            type: 'STORY.CREATE_START'
        });
        // Optimistic update via machine
        storyActor.send({
            type: 'STORY.CREATE_SUCCESS',
            story: newStory
        });
        setLastSavedStory(newStory); // Emit event for UserContext/Bridge
        const eventType = story.type === 'story' ? 'story_created' : 'game_created';
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analytics"].track(eventType, {
            title: story.title
        });
        if (authUser && firestoreEnabled) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveStory"](authUser.uid, newStory);
            // Machine already updated theoretically.
            } catch (e) {
                console.error("Save story failed", e);
                storyActor.send({
                    type: 'STORY.CREATE_FAILURE',
                    error: e.message
                });
            // If failed, we might want to rollback?
            // For now, simple error state.
            }
        }
    }, [
        authUser,
        firestoreEnabled,
        storyActor
    ]);
    const deleteStory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        const stringId = String(id);
        storyActor.send({
            type: 'STORY.DELETE',
            id: stringId
        });
        if (authUser && firestoreEnabled) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteStory"](authUser.uid, stringId);
            } catch (e) {
                console.error("Delete story failed", e);
                // Rollback? state is already updated optimistically.
                // Re-fetch?
                storyActor.send({
                    type: 'STORY.FETCH_START'
                }); // Trigger re-sync as fallback
            }
        }
    }, [
        authUser,
        firestoreEnabled,
        storyActor
    ]);
    const refineStory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (existingStory, feedback)=>{
        storyActor.send({
            type: 'STORY.REFINE_START'
        });
        setIsProcessing(true);
        try {
            const { NarrativeDomain } = await __turbopack_context__.A("[project]/src/domain/narrativeDomain.js [app-ssr] (ecmascript, async loader)");
            const result = await NarrativeDomain.processRefinementRequest(existingStory, feedback);
            if (result.isSafetyTriggered) {
                storyActor.send({
                    type: 'STORY.REFINE_FAILURE',
                    error: result.message
                });
                return {
                    success: false,
                    message: result.message
                };
            }
            const updatedStory = result.data;
            storyActor.send({
                type: 'STORY.REFINE_SUCCESS',
                story: updatedStory
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analytics"].track('story_refined', {
                title: updatedStory.title
            });
            if (authUser && firestoreEnabled) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$firestoreService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveStory"](authUser.uid, updatedStory);
            }
            return {
                success: true,
                story: updatedStory
            };
        } catch (error) {
            console.error("Refinement failed:", error);
            storyActor.send({
                type: 'STORY.REFINE_FAILURE',
                error: error.message
            });
            return {
                success: false,
                message: error.message
            };
        } finally{
            setIsProcessing(false);
        }
    }, [
        authUser,
        firestoreEnabled,
        storyActor
    ]);
    // EXTREME OPTIMIZATION: Memoized Context Value
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            savedStories,
            activeStory,
            setActiveStory,
            isProcessing,
            setIsProcessing,
            analysisResult,
            setAnalysisResult,
            lastSavedStory,
            setLastSavedStory,
            saveStory,
            deleteStory,
            refineStory
        }), [
        savedStories,
        activeStory,
        isProcessing,
        analysisResult,
        lastSavedStory,
        saveStory,
        deleteStory,
        refineStory
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/StoryContext.jsx",
        lineNumber: 206,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
const useStory = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(StoryContext);
    if (!context) throw new Error('useStory must be used within StoryProvider');
    return context;
};
}),
"[project]/src/context/UIContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIProvider",
    ()=>UIProvider,
    "useUI",
    ()=>useUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const UIContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const UIProvider = ({ children })=>{
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('create');
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const complete = localStorage.getItem('koza-onboarding-complete');
        if (!complete) {
            setShowOnboarding(true);
        }
    }, []);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, title, message)=>{
        const id = Date.now();
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    type,
                    title,
                    message
                }
            ]);
        setTimeout(()=>{
            setToasts((prev)=>prev.filter((t)=>t.id !== id));
        }, 3000);
    }, []);
    // Helper to trigger notifications
    const triggerNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, title, message)=>{
        setNotification({
            type,
            title,
            message
        });
        setTimeout(()=>setNotification(null), 3000);
    }, []);
    const value = {
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        notification,
        setNotification,
        triggerNotification,
        toasts,
        setToasts,
        addToast,
        showOnboarding,
        setShowOnboarding
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UIContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/UIContext.jsx",
        lineNumber: 51,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
const useUI = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UIContext);
    if (!context) throw new Error('useUI must be used within UIProvider');
    return context;
};
}),
"[project]/src/context/AppContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UserContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/StoryContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UIContext.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// Legacy AppContext not strictly needed if we export the hook, but good for safety
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
;
;
;
const AppProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StoryProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContextBridge, {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/context/AppContext.jsx",
                    lineNumber: 22,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/context/AppContext.jsx",
                lineNumber: 21,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/context/AppContext.jsx",
            lineNumber: 20,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.jsx",
        lineNumber: 19,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
// Internal bridge to handle side-effects between contexts (like User Level Up -> UI Notification)
const AppContextBridge = ({ children })=>{
    const { lastUserEvent, setLastUserEvent, setUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const { lastSavedStory, setLastSavedStory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStory"])();
    const { triggerNotification, addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    // Listen to Story events to update User stats
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lastSavedStory) return;
        setUser((prev)=>({
                ...prev,
                storiesCreated: lastSavedStory.type === 'story' ? prev.storiesCreated + 1 : prev.storiesCreated,
                gamesCreated: lastSavedStory.type === 'game' ? prev.gamesCreated + 1 : prev.gamesCreated
            }));
        setLastSavedStory(null); // Clear event
    }, [
        lastSavedStory,
        setUser,
        setLastSavedStory
    ]);
    // Listen to User events and trigger UI
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lastUserEvent) return;
        if (lastUserEvent.type === 'levelup') {
            triggerNotification('levelup', 'Seviye Atladın!', `Yeni seviye: ${lastUserEvent.level}`);
        } else if (lastUserEvent.type === 'xp') {
            triggerNotification('xp', `+${lastUserEvent.amount} XP`, lastUserEvent.reason);
        } else if (lastUserEvent.type === 'achievement') {
            lastUserEvent.achievements.forEach((ach)=>{
                addToast('success', 'Başarı Kazanıldı!', `${ach.icon} ${ach.name}`);
            });
        }
        setLastUserEvent(null); // Clear event
    }, [
        lastUserEvent,
        triggerNotification,
        addToast,
        setLastUserEvent
    ]);
    return children;
};
const useApp = ()=>{
    // We can't simply use useContext(AppContext) because we aren't passing a value to it anymore.
    // Instead, we just call the individual hooks and merge them.
    const userContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const storyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStory"])();
    const uiContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    return {
        ...userContext,
        ...storyContext,
        ...uiContext
    };
};
}),
"[project]/src/components/ErrorBoundary.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)"); // Import context
'use client';
;
;
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
        this.setState({
            errorInfo
        });
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-md w-full bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 32,
                                    className: "text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ErrorBoundary.jsx",
                                    lineNumber: 27,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorBoundary.jsx",
                                lineNumber: 26,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold mb-2",
                                children: "Bir Hata Oluştu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorBoundary.jsx",
                                lineNumber: 29,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-neutral-600 mb-6",
                                children: "Üzgünüz, beklenmeyen bir sorun oluştu. Lütfen sayfayı yenileyin."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorBoundary.jsx",
                                lineNumber: 30,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.location.reload(),
                                className: "px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:scale-105 transition-all shadow-lg active:scale-95",
                                children: "Sayfayı Yenile"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorBoundary.jsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ErrorBoundary.jsx",
                        lineNumber: 25,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminErrorDetails, {
                        error: this.state.error,
                        errorInfo: this.state.errorInfo
                    }, void 0, false, {
                        fileName: "[project]/src/components/ErrorBoundary.jsx",
                        lineNumber: 42,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ErrorBoundary.jsx",
                lineNumber: 24,
                columnNumber: 17
            }, this);
        }
        return this.props.children;
    }
}
;
const AdminErrorDetails = ({ error, errorInfo })=>{
    try {
        const { isAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
        if (!isAdmin || !error) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 max-w-2xl w-full p-6 bg-red-50 rounded-2xl border border-red-100 text-left overflow-auto animate-fade-in shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-mono text-sm text-red-700 whitespace-pre-wrap font-bold mb-2 border-b border-red-100 pb-2",
                    children: "Admin View: Error Details"
                }, void 0, false, {
                    fileName: "[project]/src/components/ErrorBoundary.jsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-mono text-sm text-red-700 whitespace-pre-wrap",
                    children: error.toString()
                }, void 0, false, {
                    fileName: "[project]/src/components/ErrorBoundary.jsx",
                    lineNumber: 63,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                errorInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                    className: "mt-4 font-mono text-xs text-red-600 whitespace-pre-wrap p-3 bg-white/50 rounded-xl",
                    children: errorInfo.componentStack
                }, void 0, false, {
                    fileName: "[project]/src/components/ErrorBoundary.jsx",
                    lineNumber: 67,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ErrorBoundary.jsx",
            lineNumber: 59,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    } catch (e) {
        // If AuthContext isn't available (e.g. error happened during provider init)
        return null;
    }
};
const __TURBOPACK__default__export__ = ErrorBoundary;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e48be825._.js.map