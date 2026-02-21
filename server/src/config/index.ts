import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

// BullMQ ConnectionOptions — use plain object to avoid bundled ioredis type conflicts
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const url = new URL(redisUrl);
export const connection = {
    host: url.hostname,
    port: Number(url.port) || 6379,
    password: url.password || undefined,
    maxRetriesPerRequest: null as null, // Required by BullMQ
};

// Queue Names
export const PUBLISH_QUEUE_NAME = 'mastodon-publish-queue';
export const SYNC_QUEUE_NAME = 'mastodon-notification-sync-queue';
export const REFRESH_QUEUE_NAME = 'mastodon-token-refresh-queue';

/**
 * The Publish Queue orchestrates outgoing status posts to Mastodon.
 * Exponential backoff handles rate limits gracefully.
 */
export const publishQueue = new Queue(PUBLISH_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: true,
        removeOnFail: false
    }
});

/**
 * The Sync Queue handles incremental polls for new Mastodon notifications.
 */
export const syncQueue = new Queue(SYNC_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'fixed', delay: 30000 },
        removeOnComplete: true,
        removeOnFail: true
    }
});

/**
 * The Refresh Queue manages proactive token renewal before expiry.
 */
export const refreshQueue = new Queue(REFRESH_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 10000 },
        removeOnComplete: true,
        removeOnFail: false
    }
});
