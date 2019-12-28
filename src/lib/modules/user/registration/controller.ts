import Validator from 'validatorjs';
import fs from 'fs';

import { UserModel } from '../userModel';
import { RegDB } from './db';
import { LoginDB } from '../login/db';
import { EmailDB } from '../../email/db';
import { EmailModel } from '../../email/model';

export class RegController {

    private rules = {
        mobileNumber: 'required',
        emailId: 'required|email',
        firstName: 'required',
        lastName: 'required'
    };
    private customMessage = {
        'required.emailId': '{ "description": "Enter valid email id", "errorCode": "Invalid_EMAIL" }',
        'email.emailId': '{ "description": "Enter valid email id", "errorCode": "Invalid_EMAIL" }',
        'required.firstName': '{ "description": "Enter valid first name", "errorCode": "Invalid_FirstName" }',
        'required.lastName': '{ "description": "Enter valid last name", "errorCode": "Invalie_LastName" }',
        'required.mobileNumber': '{ "description": "Enter valid mobile number", "errorCode": "Invalid_Mobile" }'
    };

    public validateUser(userData: UserModel): object[] {

        const validation = new Validator(userData, this.rules, this.customMessage);

        if (!validation.passes()) {
            const errors = [];
            Object.keys(validation.errors.errors).forEach((key) => {
                errors.push(JSON.parse(validation.errors.errors[key][0]));
            });
            return errors;
        }

        return null;

    }

    public async registerUser(userData: UserModel): Promise<UserModel> {

        const regDb = new RegDB();
        let user = await regDb.createUser(userData);
        if (user) {
            this.sendOtpEmail(userData, user);
        } else {
            user = new UserModel();
            user.setErrors(['Reg_User_AlreadyExists']);
        }
        return user;
    }

    public async validateOtp(otp: string, mobileNumber: string): Promise<UserModel> {
        const userModel = new UserModel();
        userModel.mobileNumber = mobileNumber;
        userModel.password = otp;

        return await new LoginDB().checkUser(userModel);
    }

    public async resendOtp(mobile: string): Promise<UserModel> {
        const user = await new RegDB().findUser(mobile);
        if (user) {
            const emailModel = new EmailDB();
            emailModel.resendEmail(user.userId);
        }

        return user;
    }

    private sendOtpEmail(userData: UserModel, user: UserModel): void {
        const otpEmailTemplate = fs.readFileSync(`${process.cwd()}\\src\\templates\\complied\\reg_otp_template.html`);

        let otpEmailContent = otpEmailTemplate.toString();
        otpEmailContent = otpEmailContent.replace('{{firstName}} {{lastName}}', `${userData.firstName} ${userData.lastName}`);
        otpEmailContent = otpEmailContent.replace('{{otp}}', user.otp);

        const emailModel = new EmailModel();
        emailModel.subject = 'OTP from My App';
        emailModel.body = otpEmailContent;
        emailModel.to = userData.emailId;
        emailModel.userId = user.userId;
        new EmailDB().sendEmail(emailModel);

    }
}
