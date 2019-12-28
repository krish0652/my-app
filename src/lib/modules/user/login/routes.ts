import { Router } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Logger, getLogger } from 'log4js';

import { LoginController } from './controller';
import { UserModel } from '../userModel';

const router = Router();
const loginController = new LoginController();
const logger: Logger = getLogger();


/**
 * login to application, does the following
 * 1. validates the user information like empty condition
 * 2. login to the application if login successful with new authKey then authKey will be added to cookies else existing authkey should be good.
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const validationResult = loginController.validateUser((new UserModel().create(req.body)));

        if (validationResult && validationResult.length === 0) {
            next();
        } else {
            res.status(400).send(validationResult);
        }

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

}, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const loginSuccessResult = await loginController.login((new UserModel().create(req.body)));
        if (loginSuccessResult.errors.length === 0) {
            if (loginSuccessResult.authKey) {
                res.cookie('nSessionId', loginSuccessResult.authKey, { httpOnly: true });
            }
            res.status(201).send({ isSuccess: true });
        } else {
            res.status(400).send(loginSuccessResult);
        }

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

});

/**
 * logout of application, does the following
 * 1. invalidates the authkey so that the session is cleared out.
 */
router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionInfo = req.body.sessionInfo;
        await loginController.logout(sessionInfo.authKey);

        res.clearCookie('nSessionId');
        res.status(200).send({ isSuccess: true });

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

});

// tslint:disable-next-line: no-default-export
export default router;
