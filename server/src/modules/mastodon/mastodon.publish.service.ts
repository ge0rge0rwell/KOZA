import { MastodonClient, MastodonRateLimitError } from './mastodon.client';
import { decryptToken } from '../../utils/encryption';
import prisma from '../../utils/prisma';

export class MastodonPublishService {
    /**
     * Orchestrates the publishing of a post to Mastodon for a specific KOZA user.
     */
    public async publishForUser(kozaUserId: string, content: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id: kozaUserId },
            select: { mastodonAccessToken: true, mastodonInstanceUrl: true }
        });

        if (!user || !user.mastodonAccessToken || !user.mastodonInstanceUrl) {
            throw new Error('User has not linked a Mastodon account or is missing instance URL.');
        }

        const decryptedToken = decryptToken(user.mastodonAccessToken);
        if (!decryptedToken) {
            throw new Error('Failed to decrypt Mastodon token.');
        }

        const client = new MastodonClient(user.mastodonInstanceUrl);

        try {
            // By default publish as unlisted for KOZA integrations unless configured otherwise
            await client.publishStatus(decryptedToken, content, 'unlisted');
            console.log(`Successfully published status to Mastodon for user ${kozaUserId}`);
            return true;
        } catch (error) {
            if (error instanceof MastodonRateLimitError) {
                // BullMQ Worker catching this will know exactly when to retry
                throw error;
            }

            console.error(`Failed to publish status for user ${kozaUserId}:`, error);

            // Log failed job in DB for Dead Letter analysis
            await prisma.failedPublishJob.create({
                data: {
                    userId: kozaUserId,
                    payload: { content },
                    errorReason: (error as Error).message
                }
            });

            throw error; // Rethrow to fail the BullMQ job
        }
    }
}
