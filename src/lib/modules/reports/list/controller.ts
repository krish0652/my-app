import { ReportModel } from '../model';
import { ReportListDB } from './db';

export class ReportListController {
    public async getReportList(userId: string): Promise<ReportModel[]> {
        return new ReportListDB().getReports(userId);
    }
}
