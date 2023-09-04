/* eslint-disable @typescript-eslint/no-unused-vars */
// Hotmart API Packages
import HotmartTypes, {
  AccessTokenObjectPostRequest,
  Environment,
  EnvironmentUrl,
  ModulesGetRequest,
  PagesGetRequest,
  SalesGetRequest,
  StudentsGetRequest,
  SubscriptionsGetRequest,
} from "@ferstack/hotmart-api-types";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

type ResourcesKeys = keyof Endpoints;
type EndpointKeys<T extends ResourcesKeys> = keyof Endpoints[T];
type Params<T extends ResourcesKeys, U extends EndpointKeys<T>> = "params" extends keyof Endpoints[T][U]
  ? Endpoints[T][U]["params"]
  : never;

interface Request {
  init: {
    method: HttpMethod;
    headers: {
      "Content-Type": string;
      Authorization: any;
    };
    body: any;
  };
  url: string;
}

type Endpoint = {
  baseURL?: EnvironmentUrl;
  url: string;
  method: HttpMethod;
};

type Endpoints = {
  membersArea: {
    getModules: {
      url: "club/api/v1/modules?subdomain=:subdomain&is_extra=:is_extra";
      method: "get";
      params?: ModulesGetRequest;
    };
    getPages: {
      url: `club/api/v1/modules/:module_id/pages`;
      method: "get";
      params?: PagesGetRequest;
    };
    getStudents: {
      url: "club/api/v1/users";
      method: "get";
      params?: StudentsGetRequest;
    };
  };
  authentication: {
    getAccessObject: {
      baseURL: "https://api-sec-vlc.hotmart.com";
      url: "security/oauth/token";
      method: "post";
      params?: AccessTokenObjectPostRequest;
    };
  };
  subscriptions: {
    get: {
      url: "payments/api/v1/subscriptions";
      method: "get";
      params?: SubscriptionsGetRequest;
    };
  };
  sales: {
    get: {
      url: "payments/api/v1/sales/history";
      method: "get";
      params?: SalesGetRequest;
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
        url: "club/api/v1/users",
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
    sales: {
      get: {
        url: "payments/api/v1/sales/history",
        method: "get",
      },
    },
  };

  private baseURL: EnvironmentUrl;

  constructor(private environment: Environment) {
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
    const endpoint = { ...resource[endpointKey] } as Endpoint;

    if (!endpoint?.baseURL) endpoint.baseURL = this.baseURL;

    const request = this.generateRequest(endpoint, params);

    return request;
  }

  async fetchData(request: Request) {
    return await fetch(request.url, request.init)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .catch((err) => {
        throw err;
      });
  }

  private generateRequest(endpoint: Endpoint, params: any): Request {
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
