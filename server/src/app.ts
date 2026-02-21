import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { OAuthService } from './modules/oauth/oauth.service';
import { MastodonAccountCreateService } from './identity/mastodon.account.create.service';
import { MastodonTimelineService } from './social/mastodon.timeline.service';
import { MastodonSyncService } from './modules/mastodon/mastodon.sync.service';
import { publishQueue, syncQueue } from './config';

dotenv.config({ path: path.join(__dirname, '../.env') });


const app = express();
const PORT = process.env.PORT || 4000;
const INSTANCE_URL = process.env.MASTODON_INSTANCE_URL!;
const CLIENT_ID = process.env.MASTODON_CLIENT_ID!;
const CLIENT_SECRET = process.env.MASTODON_CLIENT_SECRET!;
const REDIRECT_URI = process.env.MASTODON_REDIRECT_URI!;
const ADMIN_TOKEN = process.env.MASTODON_ADMIN_TOKEN!;
// Service-level read token for fetching public timelines
const SERVICE_TOKEN = process.env.MASTODON_SERVICE_TOKEN || '';

// --- Middleware ---
app.use(cors({
    origin: process.env.KOZA_FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// --- Service Instances ---
const oauthService = new OAuthService(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, INSTANCE_URL);
const accountCreateService = new MastodonAccountCreateService(INSTANCE_URL, ADMIN_TOKEN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const timelineService = new MastodonTimelineService(INSTANCE_URL, SERVICE_TOKEN);
const syncService = new MastodonSyncService();

// ============================
// ROUTES
// ============================

/** Health check */
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Identity ---

/**
 * KOZA Registration: Creates a KOZA user AND a Mastodon account silently.
 * The caller provides kozaUserId (already created by KOZA auth system).
 */
app.post('/api/auth/register', async (req, res) => {
    const { kozaUserId, email, username } = req.body;
    if (!kozaUserId || !email || !username) {
        return res.status(400).json({ error: 'Missing kozaUserId, email, or username.' });
    }
    try {
        const mastodonIdentity = await accountCreateService.createForKozaUser(kozaUserId, email, username);
        res.json({ success: true, mastodon: mastodonIdentity });
    } catch (error) {
        console.error('Account creation error:', error);
        res.status(500).json({ error: 'Failed to provision Mastodon account.' });
    }
});

/** OAuth authorize redirect */
app.get('/api/oauth/mastodon/authorize', (_req, res) => {
    const authUrl = oauthService.getAuthorizationUrl(['read', 'write', 'push']);
    res.redirect(authUrl);
});

/** OAuth callback — exchange code for token */
app.get('/api/oauth/mastodon/callback', async (req, res) => {
    const { code, state } = req.query;
    const kozaUserId = (state as string) || '';
    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Missing OAuth code.' });
    }
    try {
        await oauthService.handleCallback(code, kozaUserId);
        res.redirect(`${process.env.KOZA_FRONTEND_URL || 'http://localhost:5173'}/?tab=community&linked=true`);
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed.' });
    }
});

// --- Community Feed ---

/**
 * GET /api/community/feed
 * Returns normalized KozaPost items from the local Mastodon public timeline.
 * Supports cursor pagination via ?maxId= for infinite scroll.
 */
app.get('/api/community/feed', async (req, res) => {
    const maxId = req.query.maxId as string | undefined;
    const limit = Math.min(Number(req.query.limit ?? 20), 40);
    try {
        const posts = await timelineService.getLocalTimeline(maxId, limit);
        res.json({ posts, nextCursor: posts[posts.length - 1]?.id ?? null });
    } catch (error) {
        console.error('Feed error:', error);
        res.status(500).json({ error: 'Failed to fetch feed.' });
    }
});

/**
 * GET /api/community/feed/tag/:hashtag
 * Returns normalized posts from a Mastodon hashtag timeline.
 */
app.get('/api/community/feed/tag/:hashtag', async (req, res) => {
    const { hashtag } = req.params;
    const maxId = req.query.maxId as string | undefined;
    try {
        const posts = await timelineService.getHashtagTimeline(hashtag, maxId);
        res.json({ posts, nextCursor: posts[posts.length - 1]?.id ?? null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hashtag timeline.' });
    }
});

// --- Publishing ---

/** Enqueue a post for publishing (text content) */
app.post('/api/mastodon/publish', async (req, res) => {
    const { content } = req.body;
    const kozaUserId = req.headers['x-koza-user-id'] as string;
    if (!content || !kozaUserId) {
        return res.status(400).json({ error: 'Missing content or user ID.' });
    }
    try {
        const job = await publishQueue.add('publish-status', { kozaUserId, content });
        res.json({ success: true, jobId: job.id });
    } catch {
        res.status(500).json({ error: 'Failed to enqueue job.' });
    }
});

// --- Notifications ---

/** Trigger a notification sync job for a user */
app.post('/api/mastodon/sync', async (req, res) => {
    const kozaUserId = req.headers['x-koza-user-id'] as string;
    if (!kozaUserId) return res.status(401).json({ error: 'Unauthenticated.' });
    try {
        const job = await syncQueue.add('sync-notifications', { kozaUserId });
        res.json({ success: true, jobId: job.id });
    } catch {
        res.status(500).json({ error: 'Failed to enqueue sync.' });
    }
});

/** Get latest notifications for a user (simple pull endpoint) */
app.get('/api/notifications', async (req, res) => {
    const kozaUserId = req.headers['x-koza-user-id'] as string;
    if (!kozaUserId) return res.status(401).json({ error: 'Unauthenticated.' });
    try {
        const count = await syncService.syncNotifications(kozaUserId);
        res.json({ synchronized: count });
    } catch (error) {
        res.status(500).json({ error: 'Notification sync failed.' });
    }
});

// --- Start ---
app.listen(PORT, () => {
    console.log(`KOZA API Server running on http://localhost:${PORT}`);
});

export default app;
