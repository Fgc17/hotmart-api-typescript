import { EnvironmentUrl } from "./resources/api/api.models";
import { AccessTokenObjectPostRequest } from "./resources/authentication/auth.dto";
import { ModulesGetRequest, PagesGetRequest, StudentsGetRequest } from "./resources/membersArea/membersArea.dto";
import { SalesGetRequest } from "./resources/sales/sales.dto";
import { SubscriptionsGetRequest } from "./resources/subscription/subscription.dto";
import { GetSubdomainByProductIdRequest } from "./resources/unnoficial/unnoficial.dto";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type ResourcesKeys = keyof Endpoints;
export type EndpointKeys<T extends ResourcesKeys> = keyof Endpoints[T];
export type Params<T extends ResourcesKeys, U extends EndpointKeys<T>> = "params" extends keyof Endpoints[T][U]
  ? Endpoints[T][U]["params"]
  : never;

export interface IRequest {
  init: {
    method: HttpMethod;
    headers: {
      "Content-Type": string;
      Authorization?: string;
    };
    body: any;
  };
  url: string;
}

export type Endpoint = {
  baseURL?: EnvironmentUrl;
  url: string;
  method: HttpMethod;
};

export type Endpoints = {
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
  unnoficial: {
    getSubdomainByProductId: {
      url: "https://club-api.hotmart.com/hot-club-api/rest/v3/membership/subdomain/:productId";
      method: "get";
      params?: GetSubdomainByProductIdRequest;
    };
    getAllProductsByAccount: {
      url: "https://api-content-platform-space-gateway.cp.hotmart.com/rest/public/v1/products/:account_name/sale";
      method: "get";
    };
  };
};
