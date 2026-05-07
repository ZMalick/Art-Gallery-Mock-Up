export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  title: string;
  body: string;
  status: PostStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostInput {
  title: string;
  body: string;
  status: PostStatus;
  userId: string;
}

export interface UpdatePostInput {
  title: string;
  body: string;
  status: PostStatus;
  userId: string;
}

export interface PatchPostInput {
  title?: string;
  body?: string;
  status?: PostStatus;
  userId?: string;
}
