import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Use a 32-byte key for AES-256
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // For AES, this is always 16
const AUTH_TAG_LENGTH = 16;

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    throw new Error('ENCRYPTION_KEY environment variable is required and must be 32 bytes (characters) long.');
}

/**
 * Encrypts a plain text string using AES-256-GCM.
 * @param text The plain text token to encrypt.
 * @returns A string in the format "iv:authTag:encryptedText"
 */
export function encryptToken(text: string): string | null {
    if (!text) return null;

    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY!), iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        // Output format: iv:authTag:encryptedText
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Encryption failed');
    }
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 * @param encryptedText A string in the format "iv:authTag:encryptedText"
 * @returns The decrypted plain text token.
 */
export function decryptToken(encryptedText: string | null | undefined): string | null {
    if (!encryptedText) return null;

    try {
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted text format. Expected iv:authTag:encryptedData');
        }

        const [ivHex, authTagHex, encryptedDataHex] = parts;
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const encryptedTextBuffer = Buffer.from(encryptedDataHex, 'hex');

        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY!), iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedTextBuffer, undefined, 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed');
    }
}
