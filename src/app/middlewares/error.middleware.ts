import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/apiError';
import { logger } from '../../utils/logger';
import { config } from '../../config/env';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false);
  }

  const { statusCode, message } = error as ApiError;

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  const response = {
    success: false,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};
