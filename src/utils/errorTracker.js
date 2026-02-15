/**
 * Error Tracking Utility
 * Captures and stores errors for admin panel display
 */

class ErrorTracker {
    constructor() {
        this.errors = [];
        this.maxErrors = 50; // Keep last 50 errors
        this.setupGlobalHandlers();
    }

    setupGlobalHandlers() {
        // Capture console.error
        const originalError = console.error;
        console.error = (...args) => {
            this.logError({
                type: 'console.error',
                message: args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '),
                timestamp: new Date().toISOString()
            });
            originalError.apply(console, args);
        };

        // Capture window errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'window.error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                timestamp: new Date().toISOString()
            });
        });

        // Capture unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'unhandledrejection',
                message: event.reason?.message || String(event.reason),
                timestamp: new Date().toISOString()
            });
        });
    }

    logError(error) {
        this.errors.unshift(error);
        if (this.errors.length > this.maxErrors) {
            this.errors.pop();
        }
    }

    getErrors() {
        return [...this.errors];
    }

    clearErrors() {
        this.errors = [];
    }

    getErrorStats() {
        const typeCount = {};
        this.errors.forEach(err => {
            typeCount[err.type] = (typeCount[err.type] || 0) + 1;
        });
        return {
            total: this.errors.length,
            byType: typeCount,
            lastError: this.errors[0]
        };
    }
}

export const errorTracker = new ErrorTracker();
