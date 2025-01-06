export type Body_login_login_access_token = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type BookCreate = {
  title: string;
  description?: string | null;
  author: string;
  genre: string;
  isbn: string;
  quantity: number;
  publication_year: number;
  publisher: string;
  status: boolean;
};

export type BookPublic = {
  id: string;
  title: string;
  description?: string | null;
  author: string;
  genre: string;
  isbn: string;
  quantity: number;
  publication_year: number;
  publisher: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  owner_id: string;
};

export type BookUpdate = {
  title?: string | null;
  description?: string | null;
  author?: string | null;
  genre?: string | null;
  isbn?: string | null;
  quantity?: number | null;
  publication_year?: number | null;
  publisher?: string | null;
  status?: boolean | null;
};

export type BooksPublic = {
  data: Array<BookPublic>;
  count: number;
};

export type Message = {
  message: string;
};

export type NewPassword = {
  token: string;
  new_password: string;
};

export type Token = {
  access_token: string;
  token_type?: string;
};

export type UpdatePassword = {
  current_password: string;
  new_password: string;
};

export type UserCreate = {
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  password: string;
};

export type UserPublic = {
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  id: string;
};

export type UserRegister = {
  email: string;
  password: string;
  full_name?: string | null;
};

export type UserUpdate = {
  email?: string | null;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  password?: string | null;
};

export type UserUpdateMe = {
  full_name?: string | null;
  email?: string | null;
};

export type UsersPublic = {
  data: Array<UserPublic>;
  count: number;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};