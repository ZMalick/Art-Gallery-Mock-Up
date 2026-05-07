export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  bio?: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  bio?: string;
}

export interface PatchUserInput {
  name?: string;
  email?: string;
  bio?: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
