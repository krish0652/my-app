import basicAuth from 'express-basic-auth';
import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import { getLogger } from 'log4js';
import helmet from 'helmet';

import { Interceptor } from '../common/utils/interceptor';
import users from '../../config/users.json';
import env from '../../config/env.json';
import { DBConn } from '../db';

/**
 * default call which has all the configurations that are required to run the application
 * initializes the logger, basic auth & misc.
 */

class App {

    public app: express.Application;
    // private myLogger = new MyLogger();

    constructor() {
        const app = express();
        const authUser = {};
        const logger4j = getLogger();

        logger4j.level = env.logLevel;
        authUser[users.basicAuth.userName] = users.basicAuth.password;

        app.use(json());
        app.use(urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(basicAuth({ users: authUser }));
        app.use(helmet());
        app.disable('x-powered-by');
        const interceptor = new Interceptor();

        interceptor.interceptResponse(app);
        app.use(interceptor.interceptReq.bind(interceptor));
        (new DBConn()).getConnection();

        this.app = app;
    }

}


// tslint:disable-next-line: no-default-export
export default new App().app;

