// Hotmart API Packages
import { Environment, Secret } from "../../../../packages/utils/types/dist/main";

export interface HotmartClientConfig {
  environment: Environment;
  secret: Secret;
  treatErrors?: boolean;
}
