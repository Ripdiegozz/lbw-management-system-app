import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { LoginRequestBody, Message, NewPassword, LoginResponseBody } from '../models';

export type TDataLoginAccessToken = {
  requestBody: LoginRequestBody;
};
export type TDataRecoverPassword = {
  email: string;
};
export type TDataResetPassword = {
  requestBody: NewPassword;
};

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(data: TDataLoginAccessToken): CancelablePromise<LoginResponseBody> {
    const { requestBody } = data;

    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/local',
      body: requestBody,
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Recover Password
   * Password Recovery
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(data: TDataRecoverPassword): CancelablePromise<Message> {
    const { email } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/forgot-password',
      body: {
        email
      },
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Reset Password
   * Reset password
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(data: TDataResetPassword): CancelablePromise<Message> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/reset-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }
}
