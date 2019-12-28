import nodemailer from 'nodemailer';
import { getLogger, Logger } from 'log4js';

import Users from '../../../config/users.json';
import { EmailModel } from './model';
import { EmailSchema } from '../../db/index';
import { StringUtils } from '../../common/utils/strings';

export class EmailDB {
    private logger: Logger = getLogger();
    private stringUtil: StringUtils = new StringUtils();

    public async sendEmail(emailObj: EmailModel, create = true): Promise<EmailModel> {
        try {

            const transporter = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                user: Users.email.adminEmail,
                pass: Users.email.adminPwd
                }
            });
            let status = 1;

            const mailOptions = {
                from: 'My App Admin<support@myapp.com>',
                to: emailObj.to,
                subject: emailObj.subject,
                text: emailObj.body
            };

            try {
                const resp = await transporter.sendMail(mailOptions);
                emailObj.emailSentId = this.stringUtil.createGUID();
                emailObj.messageId = resp.messageId;
            } catch (ex) {
                this.logger.fatal(ex);
                status = 2;
            }

            emailObj.status = status;
            if (create) {
                this.create(emailObj);
            }
            return emailObj;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }

    private async create(emailObj): Promise<void> {
        try {

            const emailSchema = new EmailSchema(emailObj);
            await emailSchema.save();

        } catch (ex) {
            this.logger.fatal(ex);
        }
    }

    public async resendEmail(userId: string): Promise<void> {
        try {

            let email = await EmailSchema.find({ userId });
            if (email.length > 0) {
                email = email[0];
                const emailObj = new EmailModel();
                emailObj.to = email.to;
                emailObj.subject = email.subject;
                emailObj.body = email.body;
                emailObj.status = email.status;
                const resp = await this.sendEmail(emailObj, false);
                await EmailSchema.update({ userId }, { status: resp.status, messageId: resp.messageId });
            }
            return null;

        } catch (ex) {
            this.logger.fatal(ex);
            return null;
        }
    }
}
