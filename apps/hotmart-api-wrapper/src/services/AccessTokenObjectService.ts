// Flat Cache
import * as flatCache from "flat-cache";

// Types
import { APIContext } from "../types/ApiContext";
import { HotmartEndpointsService } from "@ferstack/hotmart-api-endpoints";
import { AccessTokenObject, AccessTokenPostRequestResponse, Secret } from "@ferstack/hotmart-api-types";

// Hotmart API Packages

export class AccessTokenObjectService {
  private cache: flatCache.Cache;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.cache = flatCache.load("hotmartCache");
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  public async getValid(): Promise<AccessTokenObject> {
    const currentAccessTokenObject = this.get();

    const isCurrentAccessTokenObjectValid = this.validate(currentAccessTokenObject);

    const currentSecret = this.getSecret();

    const compareSecrets = JSON.stringify(currentSecret) === JSON.stringify(this.apiContext.secret);

    if (!isCurrentAccessTokenObjectValid || !compareSecrets) {
      const newAccessToken = await this.generate();
      this.set(newAccessToken);
      this.setSecret(this.apiContext.secret);
      return newAccessToken;
    }

    return currentAccessTokenObject;
  }

  private async generate(): Promise<AccessTokenObject> {
    const { basic, ...tokenUrlParams } = this.apiContext.secret;

    const endpoint = this.endpointsService.requestBuilder("authentication", "getAccessObject", {
      authKey: basic,
      url_params: {
        query: {
          grant_type: "client_credentials",
          ...tokenUrlParams,
        },
      },
    });

    const accessTokenObject: AccessTokenPostRequestResponse = await fetch(endpoint.url, endpoint.init)
      .then((res) => res.json())
      .catch(() => {
        throw new Error("Confira suas credenciais de acesso. Erro 401.");
      });

    const expiryDate = new Date().getTime() + accessTokenObject.expires_in;

    accessTokenObject.access_token = "Bearer" + " " + accessTokenObject.access_token;

    return {
      ...accessTokenObject,
      expiryDate: expiryDate,
    };
  }

  private validate(accessTokenObject: AccessTokenObject) {
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

  private set(accessTokenObject: AccessTokenObject) {
    this.cache.setKey("accessTokenObject", {
      ...accessTokenObject,
      expiryDate: accessTokenObject.expires_in + new Date().getTime(),
    });
    this.cache.save(true);
  }

  private get(): AccessTokenObject {
    return this.cache.getKey("accessTokenObject");
  }
}
