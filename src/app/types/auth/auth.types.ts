/**
 * Auth Types & Interfaces
 */

export interface IUser {
  id: string;
  email: string;
  name?: string | null;
  roles: string[];
}

export interface IProfile {
  id: string;
  userId: string;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  avatar?: string | null;
  user: IUser & {
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface IProfileResponse {
  id: string;
  userId: string;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  avatar?: string | null;
  user: IUser & {
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
}

export interface IUserWithProfile {
  id: string;
  email: string;
  password: string;
  profile: {
    id: string;
    name?: string | null;
    phone?: string | null;
    address?: string | null;
    bio?: string | null;
    avatar?: string | null;
  } | null;
  userRoles: Array<{
    id: string;
    roleId: string;
    role: {
      id: string;
      name: string;
    };
  }>;
  createdAt: Date;
  updatedAt: Date;
}
