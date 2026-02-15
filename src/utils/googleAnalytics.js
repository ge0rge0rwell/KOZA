import ReactGA from 'react-ga4';
import { ANALYTICS_CONFIG } from '../config';

class GoogleAnalytics {
    constructor() {
        this.initialized = false;
        this.queue = [];
    }

    initialize() {
        if (this.initialized || !ANALYTICS_CONFIG.measurementId) {
            return;
        }

        // Use requestIdleCallback or setTimeout to initialize without blocking LCP
        const init = () => {
            try {
                ReactGA.initialize(ANALYTICS_CONFIG.measurementId, {
                    gaOptions: {
                        anonymizeIp: true,
                    }
                });
                this.initialized = true;
                console.log('📊 Google Analytics initialized (non-blocking)');

                // Process queued events
                while (this.queue.length > 0) {
                    const { type, args } = this.queue.shift();
                    this[type](...args);
                }
            } catch (error) {
                console.error('Failed to initialize Google Analytics:', error);
            }
        };

        if (window.requestIdleCallback) {
            window.requestIdleCallback(init);
        } else {
            setTimeout(init, 2000);
        }
    }

    trackPageView(path) {
        if (!this.initialized) {
            this.queue.push({ type: 'trackPageView', args: [path] });
            return;
        }

        try {
            ReactGA.send({ hitType: 'pageview', page: path });
        } catch (error) {
            console.error('Failed to track page view:', error);
        }
    }

    trackEvent(category, action, label, value) {
        if (!this.initialized) {
            this.queue.push({ type: 'trackEvent', args: [category, action, label, value] });
            return;
        }

        try {
            ReactGA.event({
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
            this.queue.push({ type: 'setUserProperties', args: [properties] });
            return;
        }

        try {
            ReactGA.set(properties);
        } catch (error) {
            console.error('Failed to set user properties:', error);
        }
    }

    trackTiming(category, variable, value, label) {
        if (!this.initialized) return;

        try {
            ReactGA.event({
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

export const googleAnalytics = new GoogleAnalytics();
