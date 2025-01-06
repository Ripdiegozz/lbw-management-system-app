import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { Message, UserPublic, UpdatePassword, UserCreate, UsersPublic, UserUpdateMe } from '../models';

export type TDataReadUsers = {
  limit?: number;
  skip?: number;
};
export type TDataCreateUser = {
  requestBody: UserCreate;
};
export type TDataUpdateUserMe = {
  requestBody: UserUpdateMe;
};
export type TDataUpdatePasswordMe = {
  requestBody: UpdatePassword;
};
export type TDataReadUserById = {
  userId: string;
};
export type TDataDeleteUser = {
  userId: string;
};

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(data: TDataReadUsers = {}): CancelablePromise<UsersPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/',
      query: {
        skip,
        limit
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(data: TDataCreateUser): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/me'
    });
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMe(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/me'
    });
  }

  /**
   * Update User Me
   * Update own user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMe(data: TDataUpdateUserMe): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/me',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(data: TDataUpdatePasswordMe): CancelablePromise<Message> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me/password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(data: TDataReadUserById): CancelablePromise<UserPublic> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}
