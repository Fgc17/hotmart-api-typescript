import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";
import axios from "axios";

// Hotmart API Packages
import HotmartTypes from "@glypho/hotmart-api-types";
import { HotmartEndpointsService } from "@glypho/hotmart-api-endpoints";

export class SubscriptionService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async get(params: Partial<HotmartTypes.API.Subscription.SubscriptionsGetRequestParameters>) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessTokenObject.access_token,
    };

    const endpoint = this.endpointsService.getEndpoint("subscriptions", "get");

    const getSubscriptionResData: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponseData = await axios({
      ...endpoint,
      headers: headers,
      params: params,
    })
      .then(({ data }) => {
        const typedData: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponseData = data;
        return typedData;
      })
      .catch((err) => {
        throw err;
      });

    return getSubscriptionResData;
  }
}
