import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    body: z
      .string()
      .min(1, 'Comment body is required')
      .max(5000, 'Comment body must be at most 5000 characters'),
    author: z
      .string()
      .min(1, 'Author is required')
      .max(255, 'Author must be at most 255 characters'),
    postId: z.string().min(1, 'Post ID is required'),
  }),
});

export const updateCommentSchema = z.object({
  body: z.object({
    body: z
      .string()
      .min(1, 'Comment body is required')
      .max(5000, 'Comment body must be at most 5000 characters'),
    author: z
      .string()
      .min(1, 'Author is required')
      .max(255, 'Author must be at most 255 characters'),
    postId: z.string().min(1, 'Post ID is required'),
  }),
});

export const patchCommentSchema = z.object({
  body: z.object({
    body: z
      .string()
      .min(1, 'Comment body is required')
      .max(5000, 'Comment body must be at most 5000 characters')
      .optional(),
    author: z
      .string()
      .min(1, 'Author is required')
      .max(255, 'Author must be at most 255 characters')
      .optional(),
    postId: z.string().min(1, 'Post ID is required').optional(),
  }),
});

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    perPage: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});
