import { encryptToken, decryptToken } from '../../utils/encryption';
import prisma from '../../utils/prisma';

export class OAuthService {
    constructor(
        private readonly clientId: string,
        private readonly clientSecret: string,
        private readonly redirectUri: string,
        private readonly mastodonInstanceUrl: string // e.g., 'http://localhost:3000'
    ) { }

    /**
     * Generates the OAuth authorization URL for the user to grant access.
     */
    public getAuthorizationUrl(scopes: string[] = ['read', 'write', 'push']): string {
        const params = new URLSearchParams({
            client_id: this.clientId,
            response_type: 'code',
            redirect_uri: this.redirectUri,
            scope: scopes.join(' '),
            force_login: 'true'
        });

        return `${this.mastodonInstanceUrl}/oauth/authorize?${params.toString()}`;
    }

    /**
     * Exchanges the OAuth authorization code for an access token.
     */
    public async handleCallback(code: string, kozaUserId: string): Promise<boolean> {
        try {
            // 1. Exchange code for token
            const tokenResponse = await fetch(`${this.mastodonInstanceUrl}/oauth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    redirect_uri: this.redirectUri,
                    grant_type: 'authorization_code',
                    code: code
                })
            });

            if (!tokenResponse.ok) {
                throw new Error(`Failed to fetch token: ${tokenResponse.statusText}`);
            }

            const tokenData = await tokenResponse.json();
            const { access_token, refresh_token, created_at, expires_in } = tokenData;

            // 2. Fetch Mastodon User Identity
            const verifyResponse = await fetch(`${this.mastodonInstanceUrl}/api/v1/accounts/verify_credentials`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            if (!verifyResponse.ok) {
                throw new Error(`Failed to verify credentials: ${verifyResponse.statusText}`);
            }

            const accountData = await verifyResponse.json();

            // Calculate token expiry (if Mastodon provides expires_in, usually it's null unless configured)
            const expiresAt = expires_in ? new Date((created_at + expires_in) * 1000) : null;

            // 3. Encrypt Tokens and Store Mapping
            await prisma.user.update({
                where: { id: kozaUserId },
                data: {
                    mastodonUserId: accountData.id,
                    mastodonUsername: accountData.username,
                    mastodonInstanceUrl: this.mastodonInstanceUrl,
                    mastodonAccessToken: encryptToken(access_token),
                    mastodonRefreshToken: refresh_token ? encryptToken(refresh_token) : null,
                    mastodonTokenExpiresAt: expiresAt
                }
            });

            console.log(`Successfully linked Mastodon account @${accountData.username} to user ${kozaUserId}`);
            return true;
        } catch (error) {
            console.error('OAuth Callback Error:', error);
            throw error;
        }
    }

    /**
     * Retrieves a decrypted access token for a specific KOZA user.
     */
    public async getAccessTokenForUser(kozaUserId: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { id: kozaUserId },
            select: { mastodonAccessToken: true, mastodonTokenExpiresAt: true }
        });

        if (!user || !user.mastodonAccessToken) {
            return null;
        }

        // Optional: Add logic here to enqueue a refresh job if token is expiring soon
        // if (user.mastodonTokenExpiresAt && user.mastodonTokenExpiresAt < new Date()) { ... }

        return decryptToken(user.mastodonAccessToken);
    }
}
