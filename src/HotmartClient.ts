import { HotmartClientConfig } from "./types/ClientConfig";
import { APIContext } from "./types/ApiContext";
import { EndpointsService } from "./EndpointsService";
import { AuthenticationService } from "./AuthenticationService";

/**
 * The main wrapper class. You need to initialize it with the following object:
 * 
 * @param clientInitializer 
 * 
 * ```ts
 *  {
     apiEnvironment: 'production' | 'development'
     secret: {
        clientId: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
        clientSecret: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
        basic: 'Basic XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=='
     }
    }
 * ```
 */
export class HotmartClient {
  private authenticationService: AuthenticationService;
  public endpointsService: EndpointsService;

  constructor(private clientConfig: HotmartClientConfig) {
    const _clientConfig = this.clientConfig;

    const apiContext: APIContext = {
      baseURL:
        _clientConfig.environment === "production" ? "https://developers.hotmart.com" : "https://sandbox.hotmart.com",
      secret: _clientConfig.secret,
    };

    this.authenticationService = new AuthenticationService(apiContext);

    this.endpointsService = new EndpointsService(apiContext, this.authenticationService);
  }
}
