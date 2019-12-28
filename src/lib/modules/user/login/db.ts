import { getLogger, Logger } from 'log4js';

import { UserSchema, SessionSchema } from '../../../db/index';
import { UserModel } from '../userModel';
import { CryptoUtil } from '../../../common/utils/crypto';
import { StringUtils } from '../../../common/utils/strings';
import Env from '../../../../config/env.json';

export class LoginDB {
    private cryptUtil = new CryptoUtil();
    private stringUtil = new StringUtils();
    private logger: Logger = getLogger();

    public async checkUser(userData: UserModel): Promise<UserModel> {
        try {

            const userModel = new UserModel();
            const a = { mobile: userData.mobileNumber, password: this.cryptUtil.createHash(userData.password) };
            const query = UserSchema.find();
            query.setOptions({ password: this.cryptUtil.createHash(userData.password) });
            const existingUser = await query.or([{ mobile: userData.mobileNumber }, { emailId: userData.mobileNumber }]).exec();

            if (existingUser.length <= 0) {
                return null;
            }

            userModel.userId = existingUser[0].userId;
            return userModel;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    public async checkSession(userData: UserModel): Promise<UserModel> {
        try {

            const sessionInfo = new UserModel();
            const currentTime = Date.now();
            let existingSession = await SessionSchema.find({ userId: userData.userId, isActive: 1 });
            let sessionTime = currentTime - 10;

            if (existingSession.length > 0) {
                existingSession = existingSession[0];
                sessionTime = (parseInt(existingSession.lastAccessTime, 10) + Env.sessionTimeOut);
            } else {
                await SessionSchema.update({ userId: userData.userId }, { isActive: 0 });
            }

            if (sessionTime > currentTime) {
                sessionInfo.authKey = existingSession.authKey;
                await SessionSchema.update({ userId: userData.userId, isActive: 1 }, { lastAccessTime: currentTime });
                return sessionInfo;
            }
            return null;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    public async logout(authKey: string): Promise<UserModel> {
        try {

            await SessionSchema.update({ authKey }, { isActive: 0 });

            return new UserModel();

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    public async createSession(userData: UserModel): Promise<UserModel> {
        try {
            const userModel = new UserModel();
            const currentTime = Date.now();
            const authKey = this.stringUtil.createGUID();
            const sessionSchema = new SessionSchema({ userId: userData.userId, authKey, lastAccessTime: currentTime, isActive: 1 });

            await sessionSchema.save();
            userModel.authKey = authKey;

            return userModel;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }
}
