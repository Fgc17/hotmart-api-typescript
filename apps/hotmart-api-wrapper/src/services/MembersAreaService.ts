import { HotmartEndpointsService } from "@ferstack/hotmart-api-endpoints";
import {
  ModulesGetRequest,
  ModulesGetRequestResponse,
  PagesGetRequest,
  PagesGetRequestResponse,
  StudentsGetRequest,
  StudentsGetRequestResponse,
} from "@ferstack/hotmart-api-types";
import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";

// Hotmart API Packages

export class MembersAreaService {
  private accessTokenObjectService: AccessTokenObjectService;
  private endpointsService: HotmartEndpointsService;

  constructor(private apiContext: APIContext) {
    this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext);
    this.endpointsService = new HotmartEndpointsService(this.apiContext.environment);
  }

  async getModules(params: ModulesGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("membersArea", "getModules", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const modules: ModulesGetRequestResponse = await this.endpointsService.fetchData(request);

    return modules;
  }

  async getPages(params: PagesGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("membersArea", "getPages", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const pages: PagesGetRequestResponse = await this.endpointsService.fetchData(request);

    return pages;
  }

  async getMembers(params: StudentsGetRequest) {
    const accessTokenObject = await this.accessTokenObjectService.getValid();

    const request = this.endpointsService.requestBuilder("membersArea", "getStudents", {
      ...params,
      authKey: accessTokenObject.access_token,
    });

    const students: StudentsGetRequestResponse = await this.endpointsService.fetchData(request);

    return students;
  }
}
