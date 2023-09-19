import { Server } from 'http';
import app from './app';
import logger from './core/utils/logger';
import config from './config/config';

const { port } = config;

app.listen(port, (): void => {
  logger.info(`Server running on port ${port}`);
});
