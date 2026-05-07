import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  logout,
  refresh,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types/auth.types';

const router = Router();

/**
 * Rate limiter for auth endpoints.
 * 5 attempts per minute per IP to mitigate brute-force attacks.
 */
const authRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: 'Too many attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public auth routes (rate-limited)
router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);

// Authenticated routes
router.post('/logout', authenticate, logout);
router.post('/refresh', refresh);

// Example protected route: admin-only
router.get(
  '/admin/users',
  authenticate,
  authorize(UserRole.ADMIN),
  (_req, res) => {
    res.json({ message: 'Admin access granted' });
  }
);

export default router;
