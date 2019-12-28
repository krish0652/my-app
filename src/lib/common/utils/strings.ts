import uuid4 from 'uuid4';

export class StringUtils {
    private alphabets = 'abcdefghijklmnopqrtsuvwxyz';

    createGUID(): string {
        return uuid4();
    }

    createOTP(length: number = 6): string {
        let otp = '';
        const totalChars = Date.now().toString() + this.alphabets;
        for (let i = 0; i < length; i++) {
            const charIndex = this.randomNumber(0, totalChars.length - 1);
            otp += totalChars[charIndex];
        }
        return otp;
    }

    randomNumber(min: number, max: number): number {
        const random = Math.random();
        return Math.floor(random * (max - min) + min);
    }
}
