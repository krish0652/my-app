import { Router } from 'express';
import { Logger, getLogger } from 'log4js';

import { RegController } from './controller';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { UserModel } from '../userModel';

const router = Router();
const regController = new RegController();
const logger: Logger = getLogger();

// contains all the routes required for the registration to complete
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const validationResult = regController.validateUser(req.body);
        if (validationResult === null) {
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
        const regSuccessResult = await regController.registerUser(req.body);
        if (regSuccessResult.errors.length === 0) {
            res.status(201).send({ isSuccess: true });
        } else {
            res.status(400).send(regSuccessResult);
        }

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

});

// contains all the routes required for the registration to complete
router.post('/validateOtp', async (req: Request, res: Response, next: NextFunction) => {
    try {

        let otpValidationResult = await regController.validateOtp(req.body.otp, req.body.mobile);
        if (otpValidationResult.errors.length === 0) {
            if (otpValidationResult.authKey) {
                res.cookie('nSessionId', otpValidationResult.authKey, { httpOnly: true });
            }
            res.status(201).send({ isSuccess: true });
        } else {
            otpValidationResult = new UserModel();
            otpValidationResult.setErrors(['Invalid_OTP']);
            res.status(400).send(otpValidationResult);
        }

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

});

// contains all the routes required for the registration to complete
router.post('/resendOtp', async (req: Request, res: Response, next: NextFunction) => {
    try {

        await regController.resendOtp(req.body.mobile);
        res.status(200).send({ isSuccess: true });
    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }

});

// tslint:disable-next-line: no-default-export
export default router;
