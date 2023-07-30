import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";

// Hotmart API Packages
import HotmartTypes from "@ferstack/hotmart-api-types";
import { HotmartEndpointsService } from "@ferstack/hotmart-api-endpoints";

export class SubscriptionService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async get(params: HotmartTypes.API.Subscription.SubscriptionsGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("subscriptions", "get", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const subscriptions: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponse = await fetch(
      request.url,
      request.init
    )
      .then((res) => res.json())
      .catch((err) => {
        throw err;
      });

    return subscriptions;
  }
}
