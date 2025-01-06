import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { CollectionCreate, CollectionPublic, CollectionsPublic, CollectionUpdate } from '../models';

export type TDataReadCollections = {
  limit?: number;
  skip?: number;
};
export type TDataCreateCollection = {
  requestBody: CollectionCreate;
};
export type TDataReadCollection = {
  id: string;
};
export type TDataUpdateCollection = {
  id: string;
  requestBody: CollectionUpdate;
};
export type TDataDeleteCollection = {
  id: string;
};

export class CollectionService {
  /**
   * Read Collections
   * Retrieve collections.
   * @returns CollectionsPublic Successful Response
   * @throws ApiError
   */
  public static readCollections(data: TDataReadCollections = {}): CancelablePromise<CollectionsPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/collections/',
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
   * Create Collection
   * Create new collection.
   * @returns CollectionPublic Successful Response
   * @throws ApiError
   */
  public static createCollection(data: TDataCreateCollection): CancelablePromise<CollectionPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/collections/',
      body: { data: requestBody },
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read Collection
   * Get collection by ID.
   * @returns CollectionPublic Successful Response
   * @throws ApiError
   */
  public static readCollection(data: TDataReadCollection): CancelablePromise<CollectionPublic> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/collections/{id}',
      path: {
        id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Update Collection
   * Update a collection.
   * @returns CollectionPublic Successful Response
   * @throws ApiError
   */
  public static updateCollection(data: TDataUpdateCollection): CancelablePromise<CollectionPublic> {
    const { id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/collections/{id}',
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
