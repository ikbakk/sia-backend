import { Request, Response } from 'express';
import morgan from 'morgan';

import config from '../../config/config';
import logger from './logger';

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || '',
);

const clientRemoteAddress = (): string =>
  config.env === 'production' ? ':remote-addr - ' : '';

const successResponseFormat = `${clientRemoteAddress()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${clientRemoteAddress()}:method :url :status - :response-time ms - message: :message`;

const successResHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: {
    write: (message: string) => logger.info(message),
  },
});

const errorResHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message: string) => logger.error(message),
  },
});

export default { successResHandler, errorResHandler };
