// Flat Cache
import * as flatCache from "flat-cache";

// Types
import { APIContext } from "./types/ApiContext";
import { EndpointsService } from "./EndpointsService";
import { AccessTokenPostRequestResponse } from "./types/resources/authentication/auth.dto";
import { AccessTokenObject } from "./types/resources/authentication/auth.entities";
import { Secret } from "./types/resources/authentication/auth.models";

export class AuthenticationService {
  private cache: flatCache.Cache;
  private endpointsService: EndpointsService;

  constructor(private apiContext: APIContext) {
    this.cache = flatCache.load("hotmartCache");
    this.endpointsService = new EndpointsService(this.apiContext);
  }

  public async getValidTokenObject(): Promise<AccessTokenObject> {
    const currentAccessTokenObject = this.getTokenObject();

    const isCurrentAccessTokenObjectValid = this.validateTokenObject(currentAccessTokenObject);

    const currentSecret = this.getSecret();

    const compareSecrets = JSON.stringify(currentSecret) === JSON.stringify(this.apiContext.secret);

    if (!isCurrentAccessTokenObjectValid || !compareSecrets) {
      const newAccessToken = await this.generateTokenObject();
      this.setTokenObject(newAccessToken);
      this.setSecret(this.apiContext.secret);
      return newAccessToken;
    }

    return currentAccessTokenObject;
  }

  private async generateTokenObject(): Promise<AccessTokenObject> {
    const { basic, ...tokenUrlParams } = this.apiContext.secret;

    const accessTokenObject = await this.endpointsService.consume("authentication", "getAccessObject", {
      authKey: basic,
      url_params: {
        query: {
          grant_type: "client_credentials",
          ...tokenUrlParams,
        },
      },
    });

    const expiryDate = new Date().getTime() + accessTokenObject.expires_in;

    accessTokenObject.access_token = "Bearer" + " " + accessTokenObject.access_token;

    return {
      ...accessTokenObject,
      expiryDate: expiryDate,
    };
  }

  private validateTokenObject(accessTokenObject: AccessTokenObject) {
    if (!accessTokenObject) return false;

    const currentDate = new Date().getTime();

    if (currentDate > accessTokenObject.expiryDate) return false;

    return true;
  }

  private setSecret(secret: Secret) {
    this.cache.setKey("secret", secret);
    this.cache.save(true);
  }

  private getSecret(): Secret {
    return this.cache.getKey("secret");
  }

  private setTokenObject(accessTokenObject: AccessTokenObject) {
    this.cache.setKey("accessTokenObject", {
      ...accessTokenObject,
      expiryDate: accessTokenObject.expires_in + new Date().getTime(),
    });
    this.cache.save(true);
  }

  private getTokenObject(): AccessTokenObject {
    return this.cache.getKey("accessTokenObject");
  }
}
