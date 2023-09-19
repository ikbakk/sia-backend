import logger from './logger';
import AppError from './appError';

class ErrorHandler {
  public handleError(error: Error): void {
    logger.error(error);
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }
}

export default new ErrorHandler();
