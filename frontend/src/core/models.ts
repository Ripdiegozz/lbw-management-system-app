export type LoginRequestBody = {
  identifier: string;
  password: string;
};

export type LoginResponseBody = {
  jwt: string;
  user: UserPublic;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

// Books

export type BookCreate = {
  titulo: string;
  author: string;
  fecha_de_publicacion: string;
  ejemplares: number;
  publisher: string;
  collection: string;
};

export type BookPublic = {
  id: number;
  documentId: string;
  titulo: string;
  fecha_de_publicacion: string;
  ejemplares: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type BookUpdate = {
  titulo?: string;
  author?: string;
  fecha_de_publicacion?: string;
  ejemplares?: number;
  publisher?: string;
  collection?: string;
};

export type BooksPublic = {
  data: Array<BookPublic>;
  count: number;
};

// Authors

export type AuthorCreate = {
  nombre: string;
};

export type AuthorPublic = {
  id: number;
  documentId: string;
  nombre: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type AuthorUpdate = {
  nombre: string;
};

export type AuthorsPublic = {
  data: Array<AuthorPublic>;
  count: number;
};

// Publishers

export type PublisherCreate = {
  nombre: string;
};

export type PublisherPublic = {
  id: number;
  documentId: string;
  nombre: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type PublisherUpdate = {
  nombre?: string;
};

export type PublishersPublic = {
  data: Array<PublisherPublic>;
  count: number;
};

// Collections
export type CollectionCreate = {
  nombre: string;
};

export type CollectionPublic = {
  id: number;
  documentId: string;
  nombre: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CollectionUpdate = {
  nombre?: string;
};

export type CollectionsPublic = {
  data: Array<CollectionPublic>;
  count: number;
};

// Users
export type Message = {
  message: string;
};

export type NewPassword = {
  code: string;
  password: string;
  passwordConfirmation: string;
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
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
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
