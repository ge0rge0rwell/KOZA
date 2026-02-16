/**
 * User Presence Tracker
 * Tracks active users for admin analytics
 */

class UserPresenceTracker {
    constructor() {
        this.activeUsers = new Set();
        this.sessionId = this.generateSessionId();
        this.startTracking();
    }

    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    startTracking() {
        // Add current session
        this.activeUsers.add(this.sessionId);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.activeUsers.delete(this.sessionId);
        });

        // Simulate presence updates (in production, this would sync with Firebase)
        // For now, track local sessions
        this.cleanupInterval = setInterval(() => {
            // Cleanup expired sessions (optional)
            // In a real system, this would query Firebase
        }, 60000);
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

export const userPresenceTracker = new UserPresenceTracker();
