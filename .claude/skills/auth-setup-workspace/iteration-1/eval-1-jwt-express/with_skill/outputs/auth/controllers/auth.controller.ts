import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  AuthenticatedRequest,
  LoginBody,
  RegisterBody,
  StoredUser,
  UserRole,
} from '../types/auth.types';
import { hashPassword, verifyPassword } from '../utils/password';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/tokens';

// ----------------------------------------------------------------
// In-memory user store -- replace with your database in production.
// ----------------------------------------------------------------
const users: Map<string, StoredUser> = new Map();

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/auth/refresh',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * POST /auth/register
 *
 * Creates a new user account. Passwords are hashed with bcrypt (cost 12).
 * Minimum password length: 8 characters.
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name, role }: RegisterBody = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' });
      return;
    }

    // Check for existing user
    for (const user of users.values()) {
      if (user.email === email) {
        res.status(409).json({ error: 'Email already registered' });
        return;
      }
    }

    const hashedPassword = await hashPassword(password);
    const id = uuidv4();

    const newUser: StoredUser = {
      id,
      email,
      name,
      password: hashedPassword,
      role: role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER,
      refreshToken: null,
    };

    users.set(id, newUser);

    const userPayload = { id, email, role: newUser.role };
    const accessToken = signAccessToken(userPayload);
    const refreshToken = signRefreshToken(userPayload);

    // Store hashed refresh token for rotation validation
    newUser.refreshToken = refreshToken;

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      user: { id, email, name, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

/**
 * POST /auth/login
 *
 * Authenticates a user with email + password and returns a token pair.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: LoginBody = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    let foundUser: StoredUser | undefined;
    for (const user of users.values()) {
      if (user.email === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      // Use a generic message to avoid user enumeration
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const passwordValid = await verifyPassword(password, foundUser.password);
    if (!passwordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const userPayload = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };
    const accessToken = signAccessToken(userPayload);
    const refreshToken = signRefreshToken(userPayload);

    // Rotate refresh token
    foundUser.refreshToken = refreshToken;

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

/**
 * POST /auth/logout
 *
 * Invalidates the refresh token and clears the cookie.
 */
export async function logout(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      // Invalidate the stored refresh token
      for (const user of users.values()) {
        if (user.refreshToken === refreshToken) {
          user.refreshToken = null;
          break;
        }
      }
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/auth/refresh',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
}

/**
 * POST /auth/refresh
 *
 * Rotates refresh tokens. The old refresh token is invalidated and a new
 * token pair is issued. This prevents refresh token reuse attacks.
 */
export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token is required' });
      return;
    }

    // Verify the token signature and expiration
    const payload = verifyRefreshToken(refreshToken);

    const user = users.get(payload.sub);

    if (!user || user.refreshToken !== refreshToken) {
      // Token reuse detected or user not found -- invalidate all sessions
      if (user) {
        user.refreshToken = null;
      }
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    const userPayload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = signAccessToken(userPayload);
    const newRefreshToken = signRefreshToken(userPayload);

    // Rotate: store the new refresh token
    user.refreshToken = newRefreshToken;

    res.cookie('refreshToken', newRefreshToken, REFRESH_COOKIE_OPTIONS);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
}
