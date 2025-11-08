import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ApiResponse } from '../../utils/apiResponse';
import { ApiError } from '../../utils/apiError';
import AuthService from '../services/auth.service';

export class AuthController {
  private authService = AuthService;

  /**
   * Register new user
   * POST /api/auth/register
   */
  async register(req: AuthRequest, res: Response) {
    try {
      // Data sudah tervalidasi oleh validate middleware
      const { email, password, name } = req.body;

      // Register user
      const result = await this.authService.register(email, password, name);

      return ApiResponse.success(res, result, 'User registered successfully', 201);
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      return ApiResponse.error(res, (error as Error).message, 400);
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  async login(req: AuthRequest, res: Response) {
    try {
      // Data sudah tervalidasi oleh validate middleware
      const { email, password } = req.body;

      // Login user
      const result = await this.authService.login(email, password);

      return ApiResponse.success(res, result, 'Login successful', 200);
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      return ApiResponse.error(res, (error as Error).message, 400);
    }
  }

  /**
   * Get user profile
   * GET /api/auth/profile
   */
  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw new ApiError(401, 'Unauthorized');
      }

      const profile = await this.authService.getProfile(req.user.id);

      return ApiResponse.success(res, profile, 'Profile retrieved successfully', 200);
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      return ApiResponse.error(res, (error as Error).message, 400);
    }
  }

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw new ApiError(401, 'Unauthorized');
      }

      // Data sudah tervalidasi oleh validate middleware
      const data = req.body;

      const profile = await this.authService.updateProfile(req.user.id, data);

      return ApiResponse.success(res, profile, 'Profile updated successfully', 200);
    } catch (error) {
      if (error instanceof ApiError) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      return ApiResponse.error(res, (error as Error).message, 400);
    }
  }
}

export default new AuthController();
