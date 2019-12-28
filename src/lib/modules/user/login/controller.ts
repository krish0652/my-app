import Validator from 'validatorjs';

import { UserModel } from '../userModel';
import { LoginDB } from './db';

export class LoginController {
    private loginDb = new LoginDB();
    private rules = {
        mobileNumber: 'required',
        password: 'required'
    };
    private customMessage = {
        'required.mobileNumber': '{ "description": "Enter valid mobile number", "errorCode": "Invalid_Mobile" }',
        'required.password': '{ "description": "Enter valid password", "errorCode": "Invalid_Password" }'
    };

    public validateUser(userData: UserModel): object[] {

        const validation = new Validator(userData, this.rules, this.customMessage);

        if (validation.passes()) {
            const errors = [];
            Object.keys(validation.errors.errors).forEach((key) => {
                errors.push(JSON.parse(errors[key][0]));
            });
            return errors;
        }

        return null;
    }

    public async login(userData: UserModel): Promise<UserModel> {

        let exisitinUser = await this.loginDb.checkUser(userData);

        if (exisitinUser) {
            const existingSession = await this.loginDb.checkSession(exisitinUser);
            if (!existingSession) {
                return this.loginDb.createSession(exisitinUser);
            }
            return existingSession;
        } else {
            exisitinUser = new UserModel();
            exisitinUser.setErrors(['Invalid_User']);
        }

        return exisitinUser;
    }

    public async logout(authKey: string): Promise<UserModel> {
        return this.loginDb.logout(authKey);
    }
}
