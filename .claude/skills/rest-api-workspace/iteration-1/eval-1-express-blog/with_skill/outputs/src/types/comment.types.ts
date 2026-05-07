export interface Comment {
  id: string;
  body: string;
  author: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentInput {
  body: string;
  author: string;
  postId: string;
}

export interface UpdateCommentInput {
  body: string;
  author: string;
  postId: string;
}

export interface PatchCommentInput {
  body?: string;
  author?: string;
  postId?: string;
}
