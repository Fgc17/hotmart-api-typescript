// Services
import { SubscriptionService } from "./services/SubscriptionService";

// Authentication
import { HotmartClientConfig } from "./types/ClientConfig";
import { APIContext } from "./types/ApiContext";
import { MembersAreaService } from "./services/MembersAreaService";

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
  subscriptionService: SubscriptionService;
  membersAreaService: MembersAreaService;

  constructor(private clientConfig: HotmartClientConfig) {
    const _clientConfig = this.clientConfig;

    const apiContext: APIContext = {
      environment: _clientConfig.environment,
      secret: _clientConfig.secret,
    };

    this.subscriptionService = new SubscriptionService(apiContext);
    this.membersAreaService = new MembersAreaService(apiContext);
  }
}
