import jwt from 'jsonwebtoken';
import { TokenPayload, UserPayload, UserRole } from '../types/auth.types';

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

function getAccessSecret(): string {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return ACCESS_TOKEN_SECRET;
}

function getRefreshSecret(): string {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set');
  }
  return REFRESH_TOKEN_SECRET;
}

/**
 * Sign a short-lived access token (15 minutes).
 * Payload contains only user ID and role -- no sensitive data.
 */
export function signAccessToken(user: UserPayload): string {
  const payload: TokenPayload = {
    sub: user.id,
    role: user.role,
    type: 'access',
  };
  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

/**
 * Sign a long-lived refresh token (7 days).
 */
export function signRefreshToken(user: UserPayload): string {
  const payload: TokenPayload = {
    sub: user.id,
    role: user.role,
    type: 'refresh',
  };
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

/**
 * Verify and decode an access token.
 */
export function verifyAccessToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getAccessSecret()) as TokenPayload;
  if (decoded.type !== 'access') {
    throw new Error('Invalid token type');
  }
  return decoded;
}

/**
 * Verify and decode a refresh token.
 */
export function verifyRefreshToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, getRefreshSecret()) as TokenPayload;
  if (decoded.type !== 'refresh') {
    throw new Error('Invalid token type');
  }
  return decoded;
}
