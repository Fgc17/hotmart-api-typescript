import { HotmartAccessTokenObject } from "./auth.entities";
import { Secret } from "./auth.models";

export interface AccessTokenObjectPostRequest {
  url_params: {
    query: {
      grant_type: "client_credentials";
    } & Omit<Secret, "basic">;
  };
}

export type AccessTokenPostRequestResponse = HotmartAccessTokenObject;
