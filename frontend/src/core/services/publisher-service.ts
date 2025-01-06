import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { PublisherCreate, PublisherPublic, PublishersPublic, PublisherUpdate } from '../models';

export type TDataReadPublishers = {
  limit?: number;
  skip?: number;
};
export type TDataCreatePublisher = {
  requestBody: PublisherCreate;
};
export type TDataReadPublisher = {
  id: string;
};
export type TDataUpdatePublisher = {
  id: string;
  requestBody: PublisherUpdate;
};
export type TDataDeletePublisher = {
  id: string;
};

export class PublisherService {
  /**
   * Read Publishers
   * Retrieve publishers.
   * @returns PublishersPublic Successful Response
   * @throws ApiError
   */
  public static readPublishers(data: TDataReadPublishers = {}): CancelablePromise<PublishersPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/publishers/',
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
   * Create Publisher
   * Create new publisher.
   * @returns PublisherPublic Successful Response
   * @throws ApiError
   */
  public static createPublisher(data: TDataCreatePublisher): CancelablePromise<PublisherPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/publishers/',
      body: { data: requestBody },
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read Publisher
   * Get publisher by ID.
   * @returns PublisherPublic Successful Response
   * @throws ApiError
   */
  public static readPublisher(data: TDataReadPublisher): CancelablePromise<PublisherPublic> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/publishers/{id}',
      path: {
        id
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Update Publisher
   * Update a publisher.
   * @returns PublisherPublic Successful Response
   * @throws ApiError
   */
  public static updatePublisher(data: TDataUpdatePublisher): CancelablePromise<PublisherPublic> {
    const { id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/publishers/{id}',
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
