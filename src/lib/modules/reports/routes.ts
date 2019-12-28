import { Router } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { Logger, getLogger } from 'log4js';

import { ReportListController } from './list/controller';
import { ReportCreateController } from './create/controller';
import { ReportModel } from './model';

const router = Router();
const logger: Logger = getLogger();


router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionInfo = req.body.sessionInfo;
        const response = await new ReportListController().getReportList(sessionInfo.userId);
        res.status(200).send({ reports: response });

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const sessionInfo = req.body.sessionInfo;
        const reportModel = new ReportModel();
        reportModel.userId = sessionInfo.userId;
        reportModel.name = req.body.name;
        reportModel.type = req.body.type;
        reportModel.project = req.body.project;

        const createResult = await new ReportCreateController().createReport(reportModel);
        if (createResult) {
            res.status(201).send({ isSuccess: true });
        } else {
            res.status(400).send({ errors: [{ description: 'Unable to create report.' }] });
        }

    } catch (ex) {
        logger.fatal(ex);
        next(ex);
    }
});

export default router;
