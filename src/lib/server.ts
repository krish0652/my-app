import App from './loaders/app';
import ENV from '../config/env.json';
import Routes from './loaders/routes';
import { TemplateProcess } from './loaders/template-processor';

/**
 * server listens on a port configured in the environment config file.
 */
App.listen(ENV.port, () => {
    Routes.defineRoutes();
    new TemplateProcess().processTemplates();
});
