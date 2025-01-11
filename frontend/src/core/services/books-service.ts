import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { Message, BookCreate, BookPublic, BooksPublic, BookUpdate } from '../models';

export type TDataReadBooks = {
  limit?: number;
  skip?: number;
};
export type TDataCreateBook = {
  requestBody: BookCreate;
};
export type TDataReadBook = {
  id: string;
};
export type TDataUpdateBook = {
  id: string;
  requestBody: BookUpdate;
};
export type TDataDeleteBook = {
  id: string;
};

export class BooksService {
  /**
   * Read Books
   * Retrieve books.
   * @returns BooksPublic Successful Response
   * @throws ApiError
   */
  public static readBooks(data: TDataReadBooks = {}): CancelablePromise<BooksPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/books/',
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
   * Create Book
   * Create new book.
   * @returns BookPublic Successful Response
   * @throws ApiError
   */
  public static createBook(data: TDataCreateBook): CancelablePromise<BookPublic> {
    const { requestBody } = data;
    // Parse date in yyyy-mm-dd format
    requestBody.fecha_de_publicacion = new Date(requestBody.fecha_de_publicacion).toISOString().split('T')[0];

    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/books/',
      body: { data: requestBody },
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read Book
   * Get book by ID.
   * @returns BookPublic Successful Response
   * @throws ApiError
   */
  public static readBook(data: TDataReadBook): CancelablePromise<BookPublic> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/books/{id}',
      path: {
        id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Update Book
   * Update an book.
   * @returns BookPublic Successful Response
   * @throws ApiError
   */
  public static updateBook(data: TDataUpdateBook): CancelablePromise<BookPublic> {
    const { id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/books/{id}',
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

  /**
   * Delete Book
   * Delete an book.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteBook(data: TDataDeleteBook): CancelablePromise<Message> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/books/{id}',
      path: {
        id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  public static readXlsx(data: { file: File }): CancelablePromise<Message> {
    const { file } = data;
    const formData = new FormData();
    formData.append('file', file);

    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/books/import',
      body: formData,
      errors: {
        422: `Validation Error`
      }
    });
  }
}
