import { getLogger } from 'log4js';
import mung from 'express-mung';

import { NextFunction, Response, Request } from 'express-serve-static-core';
import { SessionController } from '../../modules/session/controller';
import { SessionModel } from '../../modules/session/model';

export class Interceptor {
    private nonAuthUrls = ['login', 'register', 'validateOtp', 'resendOtp', 'password'];
    private sessionValidator = new SessionController();
    public logger = getLogger();

    public async interceptReq(req: Request, res: Response, next: NextFunction): Promise<void> {

        this.logger.debug('*********************************** Start of request ***********************************');
        this.logger.debug('Request ', req.url);
        this.logger.debug('Request body ', JSON.stringify(req.body));
        this.logger.debug('Request headers ', JSON.stringify(req.headers));

        const isAuthRoute = this.checkIfAuthRoute(req);
        let sessionInfo = new SessionModel();
        if (isAuthRoute) {
            try {
                sessionInfo = await this.sessionValidator.validateSession(req.cookies.nSessionId);
            } catch (ex) {
                this.logger.error(ex);
            }
        }
        if ((sessionInfo !== null) || !isAuthRoute) {
            req.body.sessionInfo = sessionInfo;
            next();
        } else {
            const resBody = { isSuccess: false };
            res.statusCode = 401;
            this.logResponse(resBody, res);
            res.status(401).send(resBody);
        }

    }

    public interceptResponse(app: any): void {

        const self = this;
        app.use(mung.json(
            function transform(body, _req, res) {
                return self.logResponse.bind(self)(body, res);
            }
        ));

    }

    private logResponse(body: object, res: Response): object {

        try {
            this.logger.debug(`Response status ${res.statusCode}`);
            this.logger.debug('Response body',  body, res.statusCode);
            this.logger.debug('*********************************** End of request ***********************************\n\n');
        } catch (ex) {
            console.log('1234567890-');
            console.error('something went wrong while logging response');
            console.error('*********************************** End of request ***********************************\n\n');
        }
        return body;

    }

    public checkIfAuthRoute(req: Request): boolean {

        let isAuthRoute = false;

        this.nonAuthUrls.forEach((url) => {
            if (!isAuthRoute) {
                isAuthRoute = req.url.indexOf(url) >= 0;
            }
        });
        return !isAuthRoute;

    }
}
