import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/auth.types';

/**
 * Role-based access control middleware.
 *
 * Usage:
 *   authorize('admin')                  -- single role
 *   authorize(['admin', 'editor'])      -- multiple roles (OR)
 *
 * Must be used AFTER the authenticate middleware so that req.user is populated.
 */
export function authorize(roles: UserRole | UserRole[]) {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
}
