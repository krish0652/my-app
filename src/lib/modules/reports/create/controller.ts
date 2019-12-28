import { ReportModel } from '../model';
import { ReportCreateDB } from './db';

export class ReportCreateController {
    public async createReport(reportData: ReportModel): Promise<ReportModel> {
        return new ReportCreateDB().create(reportData);
    }
}
