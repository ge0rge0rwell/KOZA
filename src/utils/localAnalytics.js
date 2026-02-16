/**
 * Local Analytics Tracker
 * Stores analytics data locally for admin panel display
 */

import { userPresenceTracker } from './userPresence';

class LocalAnalytics {
    constructor() {
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
        const avgSessionSeconds = Math.floor((sessionDuration % 60000) / 1000);

        // Count unique paths
        const uniquePaths = new Set(this.pageViews.map(pv => pv.path));

        // Event breakdown
        const eventsByCategory = {};
        this.events.forEach(event => {
            eventsByCategory[event.category] = (eventsByCategory[event.category] || 0) + 1;
        });

        return {
            totalPageViews: this.pageViews.length,
            uniquePages: uniquePaths.size,
            totalEvents: this.events.length,
            sessionDuration: `${avgSessionMinutes}m ${avgSessionSeconds}s`,
            activeUsers: userPresenceTracker.getActiveUserCount(),
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

export const localAnalytics = new LocalAnalytics();
