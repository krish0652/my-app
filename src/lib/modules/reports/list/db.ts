import { Document } from 'mongoose';
import { getLogger, Logger } from 'log4js';

import { ReportModel } from '../model';
import { ReportSchema } from '../../../db';

export class ReportListDB {
    private logger: Logger = getLogger();
    public async getReports(userId: string): Promise<ReportModel[]> {
        try {

            const reports = await ReportSchema.find({ userId: userId.toString() });
            const result = [];
            reports.forEach((report: Document) => {
                result.push(report.toJSON());
            });
            return result;

        } catch (ex) {
            this.logger.error(ex);
            return null;
        }
    }
}
