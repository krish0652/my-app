import { getLogger, Logger } from 'log4js';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

import { ProfileController } from './controller';
import { UserModel } from '../userModel';

const router = Router();
const profileController = new ProfileController();
const logger: Logger = getLogger();


router.put('/profile', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionInfo = req.body.sessionInfo;
        const model = new UserModel().create(req.body);
        model.mobileNumber = sessionInfo.mobile;

        const user = profileController.updateUser(model);

        res.status(200).send(user);

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});

router.put('/profile/password', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionInfo = req.body.sessionInfo;
        const userData = new UserModel();
        userData.userId = sessionInfo.userId;
        userData.password = req.body.password;
        const user = profileController.updatePwd(userData);
        res.status(200).send(user);

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});

router.get('/profile', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionInfo = req.body.sessionInfo;
        const user = await profileController.getUserDetails(sessionInfo.userId);
        res.status(200).send(user);

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});

// tslint:disable-next-line: no-default-export
export default router;
