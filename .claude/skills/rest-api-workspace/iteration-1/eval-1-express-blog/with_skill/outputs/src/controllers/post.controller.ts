import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '../types/post.types';
import { PaginatedResponse } from '../types/user.types';
import { NotFoundError } from '../middleware/errorHandler';

// In-memory store (replace with database in production)
const posts: Map<string, Post> = new Map();

export const postController = {
  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 20;

      const allPosts = Array.from(posts.values());
      const total = allPosts.length;
      const totalPages = Math.ceil(total / perPage);
      const start = (page - 1) * perPage;
      const data = allPosts.slice(start, start + perPage);

      const response: PaginatedResponse<Post> = {
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
      const post = posts.get(req.params.id);
      if (!post) {
        throw new NotFoundError('Post', req.params.id);
      }
      res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { title, body, status, userId } = req.body;

      const now = new Date();
      const post: Post = {
        id: uuidv4(),
        title,
        body,
        status: status || 'draft',
        userId,
        createdAt: now,
        updatedAt: now,
      };

      posts.set(post.id, post);
      res.status(201).json({ data: post });
    } catch (err) {
      next(err);
    }
  },

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = posts.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Post', req.params.id);
      }

      const { title, body, status, userId } = req.body;

      const updated: Post = {
        ...existing,
        title,
        body,
        status,
        userId,
        updatedAt: new Date(),
      };

      posts.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  patch(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = posts.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Post', req.params.id);
      }

      const updated: Post = {
        ...existing,
        ...req.body,
        id: existing.id,
        createdAt: existing.createdAt,
        updatedAt: new Date(),
      };

      posts.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = posts.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Post', req.params.id);
      }

      posts.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
