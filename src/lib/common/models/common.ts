import errorDescription from '../../../config/error_codes.json';

export class CommonModel {
    public errors: object[] = [];

    public setErrors(errorCodes: string[]): void {
        errorCodes.forEach((errorCode) => {
            this.errors.push({ errorCode, description: errorDescription[errorCode] });
        });
    }
}
