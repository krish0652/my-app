import { getLogger, Logger } from 'log4js';

import { UserModel } from '../userModel';
import { UserSchema } from '../../../db';
import { CryptoUtil } from '../../../common/utils/crypto';

export class ProfileDB {
    private logger: Logger = getLogger();

    public async getUserDetails(userId: string): Promise<UserModel> {
        try {

            const userInfo = new UserModel();
            let existingUser = await UserSchema.find({ userId: userId.toString() });
            if (existingUser.length > 0) {
                existingUser = existingUser[0];
                userInfo.mobileNumber = existingUser.mobile;
                userInfo.firstName = existingUser.firstName;
                userInfo.lastName = existingUser.lastName;
                userInfo.emailId = existingUser.emailId;
            }
            return userInfo;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    public async updateUser(userData: UserModel): Promise<UserModel> {
        try {

            const userInfo = new UserModel();
            const existingUser = await UserSchema.find({ mobile: userData.mobileNumber });

            if (existingUser.length > 0) {
                await UserSchema.update({ mobile: userData.mobileNumber}, {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    emailId: userData.emailId
                });
            }

            return userInfo;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    public async updatePwd(userData: UserModel): Promise<UserModel> {
        try {

            const userInfo = new UserModel();
            const existingUser = await UserSchema.find({ userId: userData.userId });

            if (existingUser.length > 0) {
                await UserSchema.update({ mobile: userData.mobileNumber}, {
                    password: new CryptoUtil().createHash(userData.password)
                });
            }

            return userInfo;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }
}
