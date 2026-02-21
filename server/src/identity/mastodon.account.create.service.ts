import { PrismaClient } from '@prisma/client';
import prisma from '../utils/prisma';
import { encryptToken, decryptToken } from '../utils/encryption';
import { OAuthService } from '../modules/oauth/oauth.service';

/**
 * Silently creates a Mastodon account for a new KOZA user via the Admin API.
 * The user never sees Mastodon — it is invisible infrastructure.
 */
export class MastodonAccountCreateService {
    private oauthService: OAuthService;

    constructor(
        private readonly instanceUrl: string,
        private readonly adminToken: string,
        private readonly clientId: string,
        private readonly clientSecret: string,
        private readonly redirectUri: string
    ) {
        this.oauthService = new OAuthService(clientId, clientSecret, redirectUri, instanceUrl);
    }

    /**
     * Creates a Mastodon account for a new KOZA user.
     * Returns the mastodon username and access token.
     */
    public async createForKozaUser(kozaUserId: string, email: string, kozaUsername: string): Promise<{
        mastodonId: string;
        mastodonUsername: string;
        accessToken: string;
    }> {
        // 1. Generate a secure random password (user will never see it)
        const { randomBytes } = await import('crypto');
        const rawPassword = randomBytes(24).toString('base64url');

        // 2. Create the account via Mastodon Admin API
        // POST /api/v1/admin/accounts  (Mastodon 3.5+)
        const createResponse = await fetch(`${this.instanceUrl}/api/v1/admin/accounts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.sanitizeUsername(kozaUsername),
                email,
                password: rawPassword,
                agreement: true,
                locale: 'en',
                reason: 'KOZA auto-provisioned account'
            })
        });

        if (!createResponse.ok) {
            const err = await createResponse.text();
            throw new Error(`Mastodon account creation failed (${createResponse.status}): ${err}`);
        }

        const account = await createResponse.json();
        const mastodonId: string = account.id;
        const mastodonUsername: string = account.username;

        // 3. Get an access token via Resource Owner Password Credentials flow
        // (appropriate for system-provisioned accounts)
        const tokenResponse = await fetch(`${this.instanceUrl}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'password',
                username: email,
                password: rawPassword,
                scope: 'read write push'
            })
        });

        if (!tokenResponse.ok) {
            throw new Error(`Failed to obtain token for new account: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        const { access_token, refresh_token, created_at, expires_in } = tokenData;
        const expiresAt = expires_in ? new Date((created_at + expires_in) * 1000) : null;

        // 4. Store identity mapping in KOZA database (tokens encrypted)
        await prisma.user.update({
            where: { id: kozaUserId },
            data: {
                mastodonUserId: mastodonId,
                mastodonUsername,
                mastodonInstanceUrl: this.instanceUrl,
                mastodonAccessToken: encryptToken(access_token),
                mastodonRefreshToken: refresh_token ? encryptToken(refresh_token) : null,
                mastodonTokenExpiresAt: expiresAt,
                // Store encrypted password for potential re-auth
                mastodonPassword: encryptToken(rawPassword)
            }
        });

        console.log(`[AccountCreate] Created Mastodon account @${mastodonUsername} for KOZA user ${kozaUserId}`);
        return { mastodonId, mastodonUsername, accessToken: access_token };
    }

    /**
     * Sanitizes a KOZA username into a valid Mastodon username.
     * Mastodon usernames: alphanumeric and underscores only, max 30 chars.
     */
    private sanitizeUsername(username: string): string {
        return username
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, '_')
            .slice(0, 30);
    }
}
