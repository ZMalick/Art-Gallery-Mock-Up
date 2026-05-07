import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/auth.types';
import { verifyAccessToken } from '../utils/tokens';

/**
 * Middleware that verifies the access token from the Authorization header.
 * Attaches the decoded user payload to req.user on success.
 *
 * Access tokens are expected in the format: Bearer <token>
 * Refresh tokens are stored in httpOnly cookies and handled by the refresh endpoint.
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access token is required' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: '', // email is not stored in the token for security; fetch from DB if needed
      role: payload.role as UserRole,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired access token' });
  }
}
