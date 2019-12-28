import { Request } from 'express-serve-static-core';
import { CommonModel } from '../../common/models/common';

export class UserModel extends CommonModel {
    public mobileNumber: string;
    public password: string;
    public authKey: string;
    public firstName: string;
    public lastName: string;
    public emailId: string;
    public otp: string;
    public userId: string;
    public emailSentId: string;

    public create(body: UserModel): UserModel {

        this.mobileNumber = body.mobileNumber;
        this.password = body.password;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.emailId = body.emailId;

        return this;
    }
}
