import prisma from '../../utils/prisma';
import { MastodonClient } from './mastodon.client';
import { decryptToken } from '../../utils/encryption';

export class MastodonSyncService {
    /**
     * Fetches the latest notifications for a specific user, using the
     * last stored notification ID to ensure an incremental delta sync.
     */
    public async syncNotifications(kozaUserId: string): Promise<number> {
        const user = await prisma.user.findUnique({
            where: { id: kozaUserId },
            select: { mastodonAccessToken: true, mastodonInstanceUrl: true, syncState: true }
        });

        if (!user || !user.mastodonAccessToken || !user.mastodonInstanceUrl) {
            throw new Error(`User ${kozaUserId} has not configured Mastodon integration.`);
        }

        const decryptedToken = decryptToken(user.mastodonAccessToken);
        if (!decryptedToken) {
            throw new Error('Failed to decrypt local Mastodon token.');
        }

        // 1. Mark status as syncing
        await prisma.mastodonSyncState.upsert({
            where: { userId: kozaUserId },
            update: { syncStatus: 'syncing' },
            create: { userId: kozaUserId, syncStatus: 'syncing' }
        });

        try {
            const client = new MastodonClient(user.mastodonInstanceUrl);

            const lastId = user.syncState?.lastNotificationId || undefined;
            const notifications = await client.getNotifications(decryptedToken, lastId);

            if (!Array.isArray(notifications) || notifications.length === 0) {
                // No new notifications
                await this.markSyncComplete(kozaUserId, lastId);
                return 0;
            }

            // 2. Here you would typically persist these notifications into a KOZA local table.
            // For this architecture phase, we update the bookmark so next polling
            // starts from the newest ID we just received.
            const newestNotification = notifications[0]; // Mastodon returns newest first

            await this.markSyncComplete(kozaUserId, newestNotification.id);

            console.log(`Synced ${notifications.length} new notifications for user ${kozaUserId}`);
            return notifications.length;
        } catch (error) {
            // Revert sync status on failure so it can be attempted again
            await prisma.mastodonSyncState.update({
                where: { userId: kozaUserId },
                data: { syncStatus: 'failed' }
            });
            console.error(`Sync failed for user ${kozaUserId}:`, error);
            throw error;
        }
    }

    private async markSyncComplete(userId: string, latestId?: string) {
        const updateData: any = {
            syncStatus: 'idle',
            lastSyncedAt: new Date()
        };

        if (latestId) {
            updateData.lastNotificationId = latestId;
        }

        await prisma.mastodonSyncState.update({
            where: { userId },
            data: updateData
        });
    }
}
