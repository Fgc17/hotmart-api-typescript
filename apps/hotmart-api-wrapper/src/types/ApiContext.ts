// Hotmart API Packages
import { Environment, Secret } from "../../../../packages/utils/types/dist/main";

export interface APIContext {
  environment: Environment;
  secret: Secret;
}
