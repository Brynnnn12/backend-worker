import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt';
import { ApiError } from '../../utils/apiError';
import { ApiResponse } from '../../utils/apiResponse';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}

/**
 * Middleware untuk verifikasi JWT token
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    const decoded = verifyToken(token);
    if (typeof decoded === 'string') {
      throw new ApiError(401, 'Invalid token');
    }

    req.user = decoded as { id: string; email: string; roles: string[] };
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      ApiResponse.error(res, error.message, error.statusCode);
    } else {
      ApiResponse.error(res, 'Unauthorized', 401);
    }
  }
};

/**
 * Middleware untuk check specific role
 */
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ApiResponse.error(res, 'Unauthorized', 401);
      return;
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      ApiResponse.error(res, 'Forbidden - insufficient permissions', 403);
      return;
    }

    next();
  };
};
