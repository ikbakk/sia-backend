import express, { Application } from 'express';
import connect from './db';
import httpLogger from './core/utils/httpLogger';
import errorHandling from './core/middlewares/errorHandling.middleware';

connect();

const app: Application = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(httpLogger.successResHandler);
app.use(httpLogger.errorResHandler);
app.use(errorHandling);

export default app;
