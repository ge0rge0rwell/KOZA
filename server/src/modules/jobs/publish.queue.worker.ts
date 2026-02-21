import { Worker, Job } from 'bullmq';
import { PUBLISH_QUEUE_NAME, connection } from '../../config';
import { MastodonPublishService } from '../mastodon/mastodon.publish.service';
import { MastodonRateLimitError } from '../mastodon/mastodon.client';
import dotenv from 'dotenv';
dotenv.config();

const publishService = new MastodonPublishService();

export interface PublishJobPayload {
    kozaUserId: string;
    content: string;
}

/**
 * BullMQ Worker for processing Mastodon publish events.
 * Executes independently of the main API loop to ensure high throughput
 * and resilience against remote API latencies or rate limits.
 */
export const publishWorker = new Worker<PublishJobPayload>(
    PUBLISH_QUEUE_NAME,
    async (job: Job<PublishJobPayload>) => {
        const { kozaUserId, content } = job.data;

        console.log(`[PublishWorker] Starting job ${job.id} for user ${kozaUserId}`);

        try {
            await publishService.publishForUser(kozaUserId, content);
            return { status: 'success' };
        } catch (error) {
            if (error instanceof MastodonRateLimitError) {
                console.warn(`[PublishWorker] Rate limit hit for user ${kozaUserId}. BullMQ will retry exponentially. Context: ${error.message}`);

                // BullMQ's RateLimit functionality requires throwing an error with the delay
                // We calculate the MS until reset. But BullMQ handles generic backoffs
                // better via standard throws when configured with 'exponential'.
                throw error;
            }

            console.error(`[PublishWorker] Fatal error for job ${job.id}:`, error);
            // Re-throw so BullMQ marks the attempt as failed
            throw error;
        }
    },
    {
        connection,
        concurrency: 5 // Process up to 5 publishes concurrently
    }
);

publishWorker.on('completed', (job) => {
    console.log(`[PublishWorker] Job ${job.id} has completed successfully!`);
});

publishWorker.on('failed', (job, err) => {
    console.log(`[PublishWorker] Job ${job?.id} failed strongly with error: ${err.message}`);
});

// To run as a standalone process (e.g. node dist/modules/jobs/publish.queue.worker.js):
if (require.main === module) {
    console.log('[PublishWorker] Standalone Worker process started and listening for new publish jobs...');
}
