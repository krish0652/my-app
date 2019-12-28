import { getLogger, Logger } from 'log4js';

import { ReportModel } from '../model';
import { ReportSchema } from '../../../db';
import moment from 'moment';

export class ReportCreateDB {
    private logger: Logger = getLogger();

    public async create(reportData: ReportModel): Promise<ReportModel> {
        try {

            const reportModel = new ReportModel();
            const createObj = new ReportSchema({
                userId: reportData.userId,
                name: reportData.name,
                owner: reportData.owner,
                type: reportData.type,
                project: reportData.project,
                createdOn: moment().format('DD-MMM-YYYY'),
                status: 'New'
            });
            const createResult = await createObj.save();
            if (createResult.userId) {
                return reportModel;
            }
            return null;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }
}
