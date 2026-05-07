import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface TokenPayload {
  sub: string;
  role: UserRole;
  type: 'access' | 'refresh';
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export interface RegisterBody {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  refreshToken: string | null;
}
