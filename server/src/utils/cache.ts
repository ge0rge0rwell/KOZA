import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Shared Redis client for caching (distinct from the BullMQ connection)
const client = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.error('[Redis Cache] Client error:', err));

(async () => { await client.connect(); })();

export default client;

/** Internal cache helpers */
export async function cacheGet<T>(key: string): Promise<T | null> {
    const raw = await client.get(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 15): Promise<void> {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
}
