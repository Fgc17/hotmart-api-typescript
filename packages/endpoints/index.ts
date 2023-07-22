// Hotmart API Packages
import HotmartTypes from "@glypho/hotmart-api-types";

type HttpMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface Endpoint<Params extends string | undefined = undefined> {
  params?: Params[];
  baseURL?: string;
  url: string;
  method: HttpMethods;
}

interface Resources {
  authentication: {
    getAccessObject: Endpoint
  },
  subscriptions: {
    get: Endpoint
  },
  membersArea: {
    getModules: Endpoint
    getPages: Endpoint<'module_id'>
    getStudents: Endpoint
  }
}

type ParamObject<T extends Endpoint<any>> = T extends Endpoint<infer Params> ? {
  [K in NonNullable<Params>]: string;
} : object


export class HotmartEndpointsService {

  private authenticationEndpoints: Resources['authentication'] = {
    getAccessObject: {
      baseURL: 'https://api-sec-vlc.hotmart.com',
      url: 'security/oauth/token',
      method: "post",
    }
  };

  private subscriptionEndpoints: Resources['subscriptions'] = {
    get: {
      url: "payments/api/v1/subscriptions",
      method: "get",
    }
  };

  private membersAreaEndpoints: Resources['membersArea'] = {
    getModules: {
      url: 'club/api/v1/modules/',
      method: "get",
    },
    getPages: {
      url: `club/api/v1/modules/:module_id/pages`,
      method: "get",
    },
    getStudents: {
      url: "/students",
      method: "get",
    }
  };

  private hotmartEndpoints: Resources = {
    authentication: this.authenticationEndpoints,
    subscriptions: this.subscriptionEndpoints,
    membersArea: this.membersAreaEndpoints
  };

  private baseURL: HotmartTypes.API.EnvironmentUrl

  constructor(private environment: HotmartTypes.API.Environment) {
    this.environment === 'production' ? this.baseURL = 'https://developers.hotmart.com' : this.baseURL = 'https://sandbox.hotmart.com'
  }

  getEndpoint<T extends keyof Resources, P extends keyof Resources[T], K extends ParamObject<Resources[T][P]>>(
    resource: T,
    endpoint: P,
    params?: K
  ) {
    const _resource: Resources[T] = this.hotmartEndpoints[resource]
    const _endpoint: Endpoint = _resource[endpoint]

    if (!_endpoint.baseURL) _endpoint.baseURL = this.baseURL

    if (params) _endpoint.url = this.applyEndpointParams(_endpoint, params)

    return _endpoint
  }


  private applyEndpointParams<E extends Endpoint, P extends ParamObject<E>>(
    endpoint: E, params: P
  ) {
    const endpointParams = Object.keys(params) as Array<keyof P>;

    if (endpointParams.length > 0) {
      endpointParams.forEach((key) => {
        const paramValue = params[key]
        if (paramValue !== undefined) {
          endpoint.url = endpoint.url.replace(`:${String(key)}`, paramValue)
        }
      });
    }

    return endpoint.url;
  }
}