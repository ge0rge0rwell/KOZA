import { Worker, Job } from 'bullmq';
import { REFRESH_QUEUE_NAME, connection } from '../../config';
import { encryptToken, decryptToken } from '../../utils/encryption';
import prisma from '../../utils/prisma';
import dotenv from 'dotenv';
dotenv.config();

export interface RefreshJobPayload {
    kozaUserId: string;
}

/**
 * Token Refresh Worker
 * 
 * Proactively rotates expiring Mastodon access tokens before they expire.
 * By convention, this worker should be scheduled to run periodically (e.g., every hour)
 * for users whose mastodon_token_expires_at < NOW() + 24 hours.
 */
export const tokenRefreshWorker = new Worker<RefreshJobPayload>(
    REFRESH_QUEUE_NAME,
    async (job: Job<RefreshJobPayload>) => {
        const { kozaUserId } = job.data;

        const user = await prisma.user.findUnique({
            where: { id: kozaUserId },
            select: {
                mastodonRefreshToken: true,
                mastodonInstanceUrl: true,
            }
        });

        if (!user || !user.mastodonRefreshToken || !user.mastodonInstanceUrl) {
            console.warn(`[TokenRefreshWorker] No refresh token for user ${kozaUserId}. Skipping.`);
            return { status: 'skipped' };
        }

        const refreshToken = decryptToken(user.mastodonRefreshToken);
        if (!refreshToken) {
            throw new Error(`Failed to decrypt refresh token for user ${kozaUserId}`);
        }

        const clientId = process.env.MASTODON_CLIENT_ID;
        const clientSecret = process.env.MASTODON_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error('Missing MASTODON_CLIENT_ID or MASTODON_CLIENT_SECRET env vars.');
        }

        // Exchange the refresh token for a new access token
        const response = await fetch(`${user.mastodonInstanceUrl}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                scope: 'read write push'
            })
        });

        if (!response.ok) {
            throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
        }

        const tokenData = await response.json();
        const { access_token, refresh_token: new_refresh_token, created_at, expires_in } = tokenData;

        const expiresAt = expires_in ? new Date((created_at + expires_in) * 1000) : null;

        await prisma.user.update({
            where: { id: kozaUserId },
            data: {
                mastodonAccessToken: encryptToken(access_token),
                mastodonRefreshToken: new_refresh_token ? encryptToken(new_refresh_token) : undefined,
                mastodonTokenExpiresAt: expiresAt
            }
        });

        console.log(`[TokenRefreshWorker] Successfully refreshed token for user ${kozaUserId}`);
        return { status: 'refreshed' };
    },
    {
        connection,
        concurrency: 3
    }
);

tokenRefreshWorker.on('completed', (job) => {
    console.log(`[TokenRefreshWorker] Job ${job.id} completed.`);
});

tokenRefreshWorker.on('failed', (job, err) => {
    console.error(`[TokenRefreshWorker] Job ${job?.id} failed: ${err.message}`);
});

if (require.main === module) {
    console.log('[TokenRefreshWorker] Standalone Token Refresh Worker process started...');
}
