import { HotmartEndpointsService } from "@ferstack/hotmart-api-endpoints";
import { SubscriptionsGetRequest, SubscriptionsGetRequestResponse } from "@ferstack/hotmart-api-types";
import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";

// Hotmart API Packages

export class SubscriptionService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async get(params: SubscriptionsGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("subscriptions", "get", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const subscriptions: SubscriptionsGetRequestResponse = await fetch(request.url, request.init)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });

    return subscriptions;
  }
}
