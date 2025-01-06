import { CancelablePromise } from '../models/CancelablePromise';
import { OpenAPI } from '../models/OpenAPI';
import { request as __request } from '../models/request';
import type { Body_login_login_access_token, Message, NewPassword, Token, UserPublic } from '../models';

export type TDataLoginAccessToken = {
  formData: Body_login_login_access_token;
};
export type TDataRecoverPassword = {
  email: string;
};
export type TDataResetPassword = {
  requestBody: NewPassword;
};
export type TDataRecoverPasswordHtmlContent = {
  email: string;
};

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(data: TDataLoginAccessToken): CancelablePromise<Token> {
    const { formData } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/access-token',
      formData: formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/test-token'
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
      url: '/api/v1/password-recovery/{email}',
      path: {
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
      url: '/api/v1/reset-password/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    });
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(data: TDataRecoverPasswordHtmlContent): CancelablePromise<string> {
    const { email } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/password-recovery-html-content/{email}',
      path: {
        email
      },
      errors: {
        422: `Validation Error`
      }
    });
  }
}
