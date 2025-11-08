import * as bcryptjs from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import { ApiError } from '../../utils/apiError';
import AuthRepository from '../repositories/auth/auth.repository';
import { IAuthResponse, IProfileResponse, IUpdateProfileData } from '../types/auth/auth.types';

export class AuthService {
  private authRepository = AuthRepository;

  /**
   * Register new user
   */
  async register(email: string, password: string, name: string): Promise<IAuthResponse> {
    // Check if user already exists
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(409, 'Email already registered');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await this.authRepository.createUser(email, hashedPassword, name);

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      roles: user.userRoles.map((ur) => ur.role.name),
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.name,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
      token,
    };
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<IAuthResponse> {
    // Find user by email
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      roles: user.userRoles.map((ur) => ur.role.name),
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.name,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
      token,
    };
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<IProfileResponse> {
    const profile = await this.authRepository.getUserProfile(userId);
    if (!profile) {
      throw new ApiError(404, 'Profile not found');
    }

    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
      bio: profile.bio,
      avatar: profile.avatar,
      user: {
        id: profile.user.id,
        email: profile.user.email,
        roles: profile.user.userRoles.map((ur) => ur.role.name),
        createdAt: profile.user.createdAt,
        updatedAt: profile.user.updatedAt,
      },
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: IUpdateProfileData): Promise<IProfileResponse> {
    const profile = await this.authRepository.updateUserProfile(userId, data);

    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
      bio: profile.bio,
      avatar: profile.avatar,
      user: {
        id: profile.user.id,
        email: profile.user.email,
        roles: profile.user.userRoles.map((ur) => ur.role.name),
        createdAt: profile.user.createdAt,
        updatedAt: profile.user.updatedAt,
      },
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}

export default new AuthService();
