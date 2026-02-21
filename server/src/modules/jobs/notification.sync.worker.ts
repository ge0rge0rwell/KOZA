import { Worker, Job } from 'bullmq';
import { SYNC_QUEUE_NAME, connection, syncQueue } from '../../config';
import { MastodonSyncService } from '../mastodon/mastodon.sync.service';
import { MastodonRateLimitError } from '../mastodon/mastodon.client';
import dotenv from 'dotenv';
dotenv.config();

const syncService = new MastodonSyncService();

export interface SyncJobPayload {
    kozaUserId: string;
}

/**
 * BullMQ Worker for polling Mastodon notifications.
 * It is distinct from the Publish Worker because syncs are generally
 * non-urgent background tasks with a different retry mechanism.
 */
export const syncWorker = new Worker<SyncJobPayload>(
    SYNC_QUEUE_NAME,
    async (job: Job<SyncJobPayload>) => {
        const { kozaUserId } = job.data;

        console.log(`[SyncWorker] Starting incremental sync for user ${kozaUserId}`);

        try {
            const newNotificationCount = await syncService.syncNotifications(kozaUserId);

            // If we'd like to maintain continuous polling for active users,
            // we can automatically enqueue the next check here with a delay:
            // await syncQueue.add('sync', { kozaUserId }, { delay: 60000 }); // Poll every 60s

            return { status: 'success', synced: newNotificationCount };
        } catch (error) {
            if (error instanceof MastodonRateLimitError) {
                console.warn(`[SyncWorker] Rate limit exceeded during polling. Backing off.`);
                // Sync tasks can easily be deferred for longer periods safely
                throw error;
            }

            console.error(`[SyncWorker] Fatal polling error for ${kozaUserId}:`, error);
            throw error;
        }
    },
    {
        connection,
        concurrency: 2 // Polling is low priority, restrict concurrency
    }
);

if (require.main === module) {
    console.log('[SyncWorker] Standalone Sync process started and listening for polling jobs...');
}
