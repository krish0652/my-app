import basicAuth from 'express-basic-auth';
import cookieParser from 'cookie-parser';
// eslint-disable-next-line sort-imports
import express, { json, urlencoded } from 'express';
import logger from 'morgan';

import usersRouter from './routes/users';
import { validate } from './core/session';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(basicAuth({
  users: {
    'admin': 'supersecret',
  },
}));

app.use('/api/users', validate, usersRouter);

app.listen(3000);

export default app;
