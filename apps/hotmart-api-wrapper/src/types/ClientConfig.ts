// Hotmart API Packages
import HotmartTypes from "@ferstack/hotmart-api-types";

export interface HotmartClientConfig {
  environment: HotmartTypes.API.Environment;
  secret: HotmartTypes.Entity.Secret;
  treatErrors?: boolean;
}
