import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../types/comment.types';
import { PaginatedResponse } from '../types/user.types';
import { NotFoundError } from '../middleware/errorHandler';

// In-memory store (replace with database in production)
const comments: Map<string, Comment> = new Map();

export const commentController = {
  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 20;

      const allComments = Array.from(comments.values());
      const total = allComments.length;
      const totalPages = Math.ceil(total / perPage);
      const start = (page - 1) * perPage;
      const data = allComments.slice(start, start + perPage);

      const response: PaginatedResponse<Comment> = {
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
      const comment = comments.get(req.params.id);
      if (!comment) {
        throw new NotFoundError('Comment', req.params.id);
      }
      res.status(200).json({ data: comment });
    } catch (err) {
      next(err);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { body, author, postId } = req.body;

      const now = new Date();
      const comment: Comment = {
        id: uuidv4(),
        body,
        author,
        postId,
        createdAt: now,
        updatedAt: now,
      };

      comments.set(comment.id, comment);
      res.status(201).json({ data: comment });
    } catch (err) {
      next(err);
    }
  },

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = comments.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Comment', req.params.id);
      }

      const { body, author, postId } = req.body;

      const updated: Comment = {
        ...existing,
        body,
        author,
        postId,
        updatedAt: new Date(),
      };

      comments.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  patch(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = comments.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Comment', req.params.id);
      }

      const updated: Comment = {
        ...existing,
        ...req.body,
        id: existing.id,
        createdAt: existing.createdAt,
        updatedAt: new Date(),
      };

      comments.set(req.params.id, updated);
      res.status(200).json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const existing = comments.get(req.params.id);
      if (!existing) {
        throw new NotFoundError('Comment', req.params.id);
      }

      comments.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
