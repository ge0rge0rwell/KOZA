export interface RateLimitInfo {
    limit: number;
    remaining: number;
    reset: Date;
}

export class MastodonRateLimitError extends Error {
    constructor(public resetAt: Date) {
        super(`Mastodon API Rate limit exceeded. Try again after ${resetAt.toISOString()}`);
        this.name = 'MastodonRateLimitError';
    }
}

export class MastodonClient {
    constructor(private readonly instanceUrl: string) { }

    /**
     * Helper to execute requests and throw structured errors on Rate Limit (429)
     * or general failures.
     */
    private async request(endpoint: string, method: string, token: string, body?: any): Promise<any> {
        const url = `${this.instanceUrl}${endpoint}`;

        const headers: Record<string, string> = {
            'Authorization': `Bearer ${token}`
        };

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        if (response.status === 429) {
            const resetHeader = response.headers.get('X-RateLimit-Reset');
            const resetAt = resetHeader ? new Date(resetHeader) : new Date(Date.now() + 5 * 60 * 1000); // Default 5 min fallback
            throw new MastodonRateLimitError(resetAt);
        }

        if (!response.ok) {
            throw new Error(`Mastodon API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Publishes a new status to the user's Mastodon timeline.
     */
    public async publishStatus(token: string, text: string, visibility: 'public' | 'unlisted' | 'private' | 'direct' = 'unlisted') {
        return this.request('/api/v1/statuses', 'POST', token, {
            status: text,
            visibility: visibility
        });
    }

    /**
     * Retrieves mentions and notifications incrementally.
     */
    public async getNotifications(token: string, sinceId?: string) {
        let endpoint = '/api/v1/notifications?limit=30';
        if (sinceId) {
            endpoint += `&since_id=${sinceId}`;
        }
        return this.request(endpoint, 'GET', token);
    }
}
