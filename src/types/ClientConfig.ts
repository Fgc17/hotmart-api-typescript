// Hotmart API Packages

import { Environment } from "./resources/api/api.models";
import { Secret } from "./resources/authentication/auth.models";

export interface HotmartClientConfig {
  environment: Environment;
  secret: Secret;
  treatErrors?: boolean;
}
