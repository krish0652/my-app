import { getLogger, Logger } from 'log4js';

import { DBConn, SessionSchema } from '../../db';
import Env from '../../../config/env.json';
import { SessionModel } from './model';

export class SessionDB {
    private logger: Logger = getLogger();
    async validateSession(authKey: string): Promise<SessionModel> {
        try {

            await new DBConn().getConnection();
            const result = new SessionModel();
            const currentTime = Date.now();
            let existingSession = await SessionSchema.find({ authKey, isActive: 1 });
            let sessionTime = 0;
            let whereCondition = null;

            whereCondition = { authKey, isActive: 1 };
            if (existingSession.length > 0) {
                existingSession = existingSession[0];
                sessionTime = (parseInt(existingSession.lastAccessTime, 10) + Env.sessionTimeOut);
            } else {
                existingSession = await SessionSchema.find({ authKey });
                existingSession = existingSession[0];
                if (existingSession) {
                    whereCondition = { userId: existingSession.userId };
                }
            }

            const isSuccess = sessionTime > currentTime;
            let updateObj = { lastAccessTime: currentTime, isActive: 0 };

            if (isSuccess) {
                updateObj = { lastAccessTime: currentTime, isActive: 1 };
                result.userId = existingSession.userId;
            } else {
                return null;
            }

            await SessionSchema.updateOne(whereCondition, updateObj);
            return result;
        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }
}
