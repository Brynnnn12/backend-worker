import { PrismaClient } from '@prisma/client';
import { IUpdateProfileData, IUserWithProfile } from '../../types/auth';

const prisma = new PrismaClient();

export class AuthRepository {
  /**
   * Create a new user with profile
   */
  async createUser(email: string, password: string, name: string): Promise<IUserWithProfile> {
    return await prisma.user.create({
      data: {
        email,
        password,
        profile: {
          create: {
            name,
          },
        },
      },
      include: {
        profile: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email: string): Promise<IUserWithProfile | null> {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<IUserWithProfile | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, data: IUpdateProfileData) {
    return await prisma.profile.update({
      where: { userId },
      data,
      include: {
        user: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get user profile by user ID
   */
  async getUserProfile(userId: string) {
    return await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userRoles: {
              include: {
                role: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}

export default new AuthRepository();
