import { AuthenticationService } from "./AuthenticationService";
import { endpoints } from "./constants/endpoints";
import { APIContext } from "./types/ApiContext";
import { ResourcesKeys, EndpointKeys, Params, Endpoint, IRequest } from "./types/Endpoints";

export class EndpointsService {
  constructor(private context: APIContext, private authenticationService?: AuthenticationService) {}

  async consume<R extends ResourcesKeys, E extends EndpointKeys<R>>(
    resourceKey: R,
    endpointKey: E,
    params: Partial<Params<R, E>> & {
      authKey?: string;
    }
  ) {
    const resource = endpoints[resourceKey];
    const endpoint = { ...resource[endpointKey] } as Endpoint;

    if (!endpoint?.baseURL) endpoint.baseURL = this.context.baseURL;

    const request = await this.generateRequest(endpoint, params);

    return await this.fetchData(request);
  }

  private async fetchData(request: IRequest) {
    return await fetch(request.url, request.init)
      .then(async (res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw {
          text: res.statusText,
          request: request,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private async generateRequest(endpoint: Endpoint, params: any) {
    const compositionParams = params.url_params?.composition;
    const queryParams = params.url_params?.query;

    let authorizationObject = { Authorization: params.authKey };
    if (this.authenticationService) {
      authorizationObject = {
        Authorization: await this.authenticationService.getValidTokenObject().then((object) => object.access_token),
      };
    }

    const headers = {
      "Content-Type": "application/json",
      ...authorizationObject,
    };
    const body = params.body;

    if (compositionParams) {
      Object.keys(compositionParams).forEach((key) => {
        endpoint.url = endpoint.url.replace(`:${key}`, compositionParams[key]);
      });
    }

    if (queryParams) {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");
      endpoint.url = `${endpoint.url}?${queryString}`;
    }

    const request = {
      init: {
        method: endpoint.method,
        headers: headers,
        ...(body && { body }),
      },
      url: `${endpoint.baseURL}/${endpoint.url}`,
    };

    return request;
  }
}
