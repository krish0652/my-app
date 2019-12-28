import app from './app';

import RegRoutes from '../modules/user/registration/routes';
import LoginRoutes from '../modules/user/login/routes';
import ReportRoutes from '../modules/reports/routes';
import ProfileRoutes from '../modules/user/profile/routes';
/**
 * holds the functions that are required to load the api routes
 */
export class Routes {
        /**
         * responsible for configuring all the api routes
         * will be invoked by server.ts
         */
        public defineRoutes(): void {
                app.use('/api/users', RegRoutes);
                app.use('/api/users', ProfileRoutes);
                app.use('/api/users', LoginRoutes);
                app.use('/api/reports', ReportRoutes);
        }
}

// tslint:disable-next-line: no-default-export
export default new Routes();
