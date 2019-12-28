import { Router } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Logger, getLogger } from 'log4js';

const router = Router();
const logger: Logger = getLogger();


router.get('/resendEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(200).send({ reports: [] });

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});
