import express, { Application } from 'express';
import connect from './db';

connect();

const app: Application = express();

app.use(express.json());

export default app;
