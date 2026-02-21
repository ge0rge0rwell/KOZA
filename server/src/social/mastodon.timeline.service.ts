import { cacheGet, cacheSet } from '../utils/cache';

/** Normalized KOZA post format — decoupled from Mastodon's response shape */
export interface KozaPostDTO {
    id: string;               // mastodon status ID (used as cursor)
    kozaPostId?: string;      // KOZA DB id if persisted
    content: string;          // HTML stripped to plain text
    htmlContent: string;      // Raw HTML for rendering
    visibility: string;
    createdAt: string;
    likesCount: number;
    boostsCount: number;
    repliesCount: number;
    media: { url: string; type: string; alt: string }[];
    author: {
        id: string;
        username: string;
        displayName: string;
        avatarUrl: string;
        mastodonUrl: string;
    };
}

function normalizeStatus(status: any): KozaPostDTO {
    const account = status.account || {};
    return {
        id: status.id,
        content: status.content?.replace(/<[^>]+>/g, '') ?? '',
        htmlContent: status.content ?? '',
        visibility: status.visibility ?? 'public',
        createdAt: status.created_at,
        likesCount: status.favourites_count ?? 0,
        boostsCount: status.reblogs_count ?? 0,
        repliesCount: status.replies_count ?? 0,
        media: (status.media_attachments ?? []).map((m: any) => ({
            url: m.url,
            type: m.type,
            alt: m.description ?? ''
        })),
        author: {
            id: account.id,
            username: account.acct,
            displayName: account.display_name || account.username,
            avatarUrl: account.avatar,
            mastodonUrl: account.url
        }
    };
}

export class MastodonTimelineService {
    constructor(
        private readonly instanceUrl: string,
        private readonly accessToken: string
    ) { }

    /**
     * Fetches the local public timeline with Redis caching (15s TTL).
     * Supports cursor-based pagination via `maxId` for infinite scroll.
     */
    public async getLocalTimeline(
        maxId?: string,
        limit = 20
    ): Promise<KozaPostDTO[]> {
        const cacheKey = `timeline:local:${maxId ?? 'top'}:${limit}`;

        const cached = await cacheGet<KozaPostDTO[]>(cacheKey);
        if (cached) return cached;

        let endpoint = `/api/v1/timelines/public?local=true&limit=${limit}`;
        if (maxId) endpoint += `&max_id=${maxId}`;

        const response = await fetch(`${this.instanceUrl}${endpoint}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });

        if (!response.ok) {
            throw new Error(`Timeline fetch failed: ${response.status} ${response.statusText}`);
        }

        const statuses: any[] = await response.json();
        const posts = statuses.map(normalizeStatus);

        await cacheSet(cacheKey, posts, 15);
        return posts;
    }

    /**
     * Fetches a hashtag timeline (e.g. #koza).
     */
    public async getHashtagTimeline(
        hashtag: string,
        maxId?: string,
        limit = 20
    ): Promise<KozaPostDTO[]> {
        const cacheKey = `timeline:tag:${hashtag}:${maxId ?? 'top'}`;

        const cached = await cacheGet<KozaPostDTO[]>(cacheKey);
        if (cached) return cached;

        let endpoint = `/api/v1/timelines/tag/${encodeURIComponent(hashtag)}?limit=${limit}`;
        if (maxId) endpoint += `&max_id=${maxId}`;

        const response = await fetch(`${this.instanceUrl}${endpoint}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });

        if (!response.ok) {
            throw new Error(`Hashtag timeline fetch failed: ${response.statusText}`);
        }

        const statuses: any[] = await response.json();
        const posts = statuses.map(normalizeStatus);

        await cacheSet(cacheKey, posts, 30);
        return posts;
    }
}
