import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";

// Hotmart API Packages
import HotmartTypes from "@glypho/hotmart-api-types";
import { HotmartEndpointsService } from "@glypho/hotmart-api-endpoints";

export class MembersAreaService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async getModules(params: HotmartTypes.API.MembersArea.ModulesGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const endpoint = this.endpointsService.requestBuilder("membersArea", "getModules", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const modules: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponse = await fetch(
      endpoint.url,
      endpoint.init
    )
      .then((res) => res.json())
      .catch((err) => {
        throw err;
      });

    return modules;
  }

  async getPages(params: HotmartTypes.API.MembersArea.PagesGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const endpoint = this.endpointsService.requestBuilder("membersArea", "getPages", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const pages: HotmartTypes.API.MembersArea.PagesGetRequest = await fetch(endpoint.url, endpoint.init)
      .then((res) => res.json())
      .catch((err) => {
        throw err;
      });

    return pages;
  }
}
