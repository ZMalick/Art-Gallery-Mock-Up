import { z } from 'zod';

const postStatusEnum = z.enum(['draft', 'published']);

export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(500, 'Title must be at most 500 characters'),
    body: z
      .string()
      .min(1, 'Body is required')
      .max(50000, 'Body must be at most 50000 characters'),
    status: postStatusEnum.default('draft'),
    userId: z.string().min(1, 'User ID is required'),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(500, 'Title must be at most 500 characters'),
    body: z
      .string()
      .min(1, 'Body is required')
      .max(50000, 'Body must be at most 50000 characters'),
    status: postStatusEnum,
    userId: z.string().min(1, 'User ID is required'),
  }),
});

export const patchPostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(500, 'Title must be at most 500 characters')
      .optional(),
    body: z
      .string()
      .min(1, 'Body is required')
      .max(50000, 'Body must be at most 50000 characters')
      .optional(),
    status: postStatusEnum.optional(),
    userId: z.string().min(1, 'User ID is required').optional(),
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
