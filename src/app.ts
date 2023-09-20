import express, { Application } from 'express';
import connect from './db';
import httpLogger from './core/utils/httpLogger';
import errorHandling from './core/middlewares/errorHandling.middleware';
import notFound from './components/404/404.router';
import api from './api';

connect();

const app: Application = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(httpLogger.successResHandler);
app.use(httpLogger.errorResHandler);
app.use('/api', api);

app.use(notFound);

app.use(errorHandling);

export default app;
