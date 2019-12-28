import { getLogger, Logger } from 'log4js';

import { UserSchema } from '../../../db/index';
import { UserModel } from '../userModel';
import { CryptoUtil } from '../../../common/utils/crypto';
import { StringUtils } from '../../../common/utils/strings';
import { LoginDB } from '../login/db';


export class RegDB {

    private cryptUtil = new CryptoUtil();
    private logger: Logger = getLogger();

    public async createUser(userData: UserModel): Promise<UserModel> {
        try {

            const existingUser = await new LoginDB().checkUser(userData);

            if (!existingUser) {
                return null;
            }

            const stringUtils = new StringUtils();
            const userId = stringUtils.createGUID();
            const otp = stringUtils.createOTP();
            const userSchema = new UserSchema({
                mobile: userData.mobileNumber,
                password: this.cryptUtil.createHash(otp),
                emailId: userData.emailId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userId
            });

            userData = new UserModel();
            userData.otp = otp;
            userData.userId = userId;
            await userSchema.save();

            return userData;

        } catch (ex) {
            this.logger.fatal(ex);
            throw ex;
        }
    }

    public async findUser(mobile: string): Promise<UserModel> {

        try {

            const existingUser = await UserSchema.find({ mobile });

            if (existingUser.length > 0) {
                return existingUser[0];
            }
            return null;
        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }

    }
}
