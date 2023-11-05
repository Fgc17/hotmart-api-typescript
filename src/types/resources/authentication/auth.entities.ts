/**
 * This is an extension of the HotmartAccessTokenObject and it is used , use it for validating the token.
 * @example
 * ```js
    {
      "access_token": "wxyz",
      "token_type": "bearer",
      "expires_in": 172799,
      "scope": "read write",
      "jti": "da2eff63-754d-4v76-9b3a-19bdb5cc8f36"
      "expiryDate": 1688010332473
    }

 * ```
 */
export interface AccessTokenObject extends HotmartAccessTokenObject {
  expiryDate: number;
}

export interface HotmartAccessTokenObject {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}
