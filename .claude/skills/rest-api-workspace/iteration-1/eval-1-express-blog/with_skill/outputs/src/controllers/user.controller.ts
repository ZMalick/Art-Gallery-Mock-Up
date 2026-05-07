import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User, PaginatedResponse } from '../types/user.types';
import { NotFoundError, ConflictError } from '../middleware/errorHandler';

// In-memory store (replace with database in production)
const users: Map<string, User> = new Map();

export const userController = {
  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 20;

      const allUsers = Array.from(users.values());
      const total = allUsers.length;
      const totalPages = Math.ceil(total / perPage);
      const start = (page - 1) * perPage;
      const data = allUsers.slice(start, start + perPage);

      const response: PaginatedResponse<User> = {
        data,
        meta: { page, perPage, total, totalPages },
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const user = users.get(req.params.id);
      if (!user) {
        throw new NotFoundError('User', req.params.id);
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { name, email, bio } = req.body;

      // Check for duplicate email
      const existingUser = Array.from(users.values()).find(
        (u) => u.email === email
      );
      if (existingUser) {
        throw new ConflictError(`User with email '${email}' already exists`);
      }

      const now = new Date();
      const user: User = {
        id: uuidv4(),
        name,
        email,
        bio,
        createdAt: now,
        updatedAt: now,
      };

      users.set(user.id, user);
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = users.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('User', req.params.id);
      }

      const { name, email, bio } = req.body;

      // Check for duplicate email (excluding current user)
      const duplicateEmail = Array.from(users.values()).find(
        (u) => u.email === email && u.id !== req.params.id
      );
      if (duplicateEmail) {
        throw new ConflictError(`User with email '${email}' already exists`);
      }

      const updated: User = {
        ...existing,
        name,
        email,
        bio,
        updatedAt: new Date(),
      };

      users.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  patch(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = users.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('User', req.params.id);
      }

      if (req.body.email) {
        const duplicateEmail = Array.from(users.values()).find(
          (u) => u.email === req.body.email && u.id !== req.params.id
        );
        if (duplicateEmail) {
          throw new ConflictError(
            `User with email '${req.body.email}' already exists`
          );
        }
      }

      const updated: User = {
        ...existing,
        ...req.body,
        id: existing.id,
        createdAt: existing.createdAt,
        updatedAt: new Date(),
      };

      users.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = users.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('User', req.params.id);
      }

      users.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
