import crypto from 'crypto';

export class CryptoUtil {
    public createHash(key: string): string {
        const hash = crypto.createHash('sha256');

        hash.write(key);
        const result = hash.digest('hex');

        hash.end();
        return result;
    }
}
