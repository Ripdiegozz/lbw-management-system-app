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

export type ResponseMetadata = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

// Books

export type BookCreate = {
  titulo: string;
  author: string;
  fecha_de_publicacion: string;
  ejemplares: number;
  publisher: string;
  slug: string;
  collection: string;
  tipo: string;
};

export type BookPublic = {
  id: number;
  documentId: string;
  titulo: string;
  fecha_de_publicacion: string;
  ejemplares: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  publishedAt: string;
};

export type BookPublicWithRelations = {
  id: number;
  documentId: string;
  titulo: string;
  fecha_de_publicacion: string;
  ejemplares: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: AuthorPublic;
  publisher: PublisherPublic;
  slug: string;
  collection: CollectionPublic;
};

export type BookUpdate = {
  titulo?: string;
  author?: string;
  fecha_de_publicacion?: string;
  ejemplares?: number;
  tipo?: string;
  publisher?: string;
  slug: string;
  collection?: string;
};

export type BooksPublic = {
  data: Array<BookPublicWithRelations>;
  meta: ResponseMetadata;
};

// BookTypes

export type BookTypeCreate = {
  nombre: string;
};

export type BookTypePublic = {
  id: number;
  documentId: string;
  nombre: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type BookTypesPublic = {
  data: Array<BookTypePublic>;
  meta: ResponseMetadata;
};

// Authors

export type AuthorCreate = {
  nombre: string;
  slug: string;
};

export type AuthorPublic = {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type AuthorUpdate = {
  nombre: string;
  slug: string;
};

export type AuthorsPublic = {
  data: Array<AuthorPublic>;
  meta: ResponseMetadata;
};

// Publishers

export type PublisherCreate = {
  nombre: string;
  slug: string;
};

export type PublisherPublic = {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type PublisherUpdate = {
  nombre?: string;
  slug: string;
};

export type PublishersPublic = {
  data: Array<PublisherPublic>;
  meta: ResponseMetadata;
};

// Collections
export type CollectionCreate = {
  nombre: string;
  slug: string;
};

export type CollectionPublic = {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CollectionUpdate = {
  nombre?: string;
  slug: string;
};

export type CollectionsPublic = {
  data: Array<CollectionPublic>;
  meta: ResponseMetadata;
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
  meta: ResponseMetadata;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};
