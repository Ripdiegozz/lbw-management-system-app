import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { AuthorCreate, AuthorPublic, AuthorsPublic, AuthorUpdate } from '../models';

export type TDataReadAuthors = {
  limit?: number;
  skip?: number;
};
export type TDataCreateAuthor = {
  requestBody: AuthorCreate;
};
export type TDataReadAuthor = {
  id: string;
};
export type TDataUpdateAuthor = {
  id: string;
  requestBody: AuthorUpdate;
};
export type TDataDeleteAuthor = {
  id: string;
};

export class AuthorService {
  /**
   * Read Authors
   * Retrieve authors.
   * @returns AuthorsPublic Successful Response
   * @throws ApiError
   */
  public static readAuthors(data: TDataReadAuthors = {}): CancelablePromise<AuthorsPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/autors/',
      query: {
        skip,
        limit,
        populate: '*'
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Create Author
   * Create new author.
   * @returns AuthorPublic Successful Response
   * @throws ApiError
   */
  public static createAuthor(data: TDataCreateAuthor): CancelablePromise<AuthorPublic> {
    const { requestBody } = data;
    console.log('REQUEST BODY', requestBody);
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/autors/',
      body: { data: requestBody },
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read Author
   * Get author by ID.
   * @returns AuthorPublic Successful Response
   * @throws ApiError
   */
  public static readAuthor(data: TDataReadAuthor): CancelablePromise<AuthorPublic> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/authors/{id}',
      path: {
        id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Update Author
   * Update an author.
   * @returns AuthorPublic Successful Response
   * @throws ApiError
   */
  public static updateAuthor(data: TDataUpdateAuthor): CancelablePromise<AuthorPublic> {
    const { id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/books/{id}',
      path: {
        id
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}
