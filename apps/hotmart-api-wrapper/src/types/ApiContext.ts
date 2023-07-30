// Hotmart API Packages
import HotmartTypes from "@ferstack/hotmart-api-types";

export interface APIContext {
  environment: HotmartTypes.API.Environment;
  secret: HotmartTypes.Entity.Secret;
}
