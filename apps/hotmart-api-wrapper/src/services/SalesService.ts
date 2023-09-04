import { HotmartEndpointsService } from "@ferstack/hotmart-api-endpoints";
import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";
import { SalesGetRequest, SalesGetRequestResponse } from "@ferstack/hotmart-api-types";

// Hotmart API Packages

export class SalesService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async get(params: SalesGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("sales", "get", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const sales: SalesGetRequestResponse = await this.endpointsService.fetchData(request);

    return sales;
  }
}
