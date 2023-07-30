/* eslint-disable @typescript-eslint/no-unused-vars */
// Hotmart API Packages
import HotmartTypes from "@glypho/hotmart-api-types";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

type ResourcesKeys = keyof Endpoints;
type EndpointKeys<T extends ResourcesKeys> = keyof Endpoints[T];
type Params<T extends ResourcesKeys, U extends EndpointKeys<T>> = "params" extends keyof Endpoints[T][U]
  ? Endpoints[T][U]["params"]
  : never;

type Endpoint = {
  baseURL?: HotmartTypes.API.EnvironmentUrl;
  url: string;
  method: HttpMethod;
};

type Endpoints = {
  membersArea: {
    getModules: {
      url: "club/api/v1/modules?subdomain=:subdomain&is_extra=:is_extra";
      method: "get";
      params?: HotmartTypes.API.MembersArea.ModulesGetRequest;
    };
    getPages: {
      url: `club/api/v1/modules/:module_id/pages`;
      method: "get";
      params?: HotmartTypes.API.MembersArea.PagesGetRequest;
    };
    getStudents: {
      url: "students";
      method: "get";
    };
  };
  authentication: {
    getAccessObject: {
      baseURL: "https://api-sec-vlc.hotmart.com";
      url: "security/oauth/token";
      method: "post";
      params?: HotmartTypes.API.Authentication.AccessTokenObjectPostRequest;
    };
  };
  subscriptions: {
    get: {
      url: "payments/api/v1/subscriptions";
      method: "get";
      params?: HotmartTypes.API.Subscription.SubscriptionsGetRequest;
    };
  };
};

export class HotmartEndpointsService {
  private endpoints: Endpoints = {
    membersArea: {
      getModules: {
        url: "club/api/v1/modules?subdomain=:subdomain&is_extra=:is_extra",
        method: "get",
      },
      getPages: {
        url: `club/api/v1/modules/:module_id/pages`,
        method: "get",
      },
      getStudents: {
        url: "students",
        method: "get",
      },
    },
    authentication: {
      getAccessObject: {
        baseURL: "https://api-sec-vlc.hotmart.com",
        url: "security/oauth/token",
        method: "post",
      },
    },
    subscriptions: {
      get: {
        url: "payments/api/v1/subscriptions",
        method: "get",
      },
    },
  };

  private baseURL: HotmartTypes.API.EnvironmentUrl;

  constructor(private environment: HotmartTypes.API.Environment) {
    this.baseURL = environment === "production" ? "https://developers.hotmart.com" : "https://sandbox.hotmart.com";
  }

  requestBuilder<R extends ResourcesKeys, E extends EndpointKeys<R>>(
    resourceKey: R,
    endpointKey: E,
    params: Partial<Params<R, E>> & {
      authKey: string;
    }
  ) {
    const resource = this.endpoints[resourceKey];
    const endpoint: Endpoint = resource[endpointKey];

    if (!endpoint?.baseURL) endpoint.baseURL = this.baseURL;

    const request = this.generateRequest(endpoint, params);

    return request;
  }

  private generateRequest(endpoint: Endpoint, params: any) {
    const compositionParams = params.url_params?.composition;
    const queryParams = params.url_params?.query;
    const headers = {
      "Content-Type": "application/json",
      Authorization: params?.authKey || "",
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
        body: body,
      },
      url: `${endpoint.baseURL}/${endpoint.url}`,
    };

    return request;
  }
}
