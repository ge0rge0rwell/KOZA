export const APP_CONFIG = {
    NAME: "KOZA",
    VERSION: "2.0.0"
};

export const API_CONFIG = {
    GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDITPa_2fG8x6aUjZ8DsA_f9l3AdWA7ToQ"
};

export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
};

export const ANALYTICS_CONFIG = {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
};
