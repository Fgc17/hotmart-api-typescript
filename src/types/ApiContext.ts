// Hotmart API Packages
import { EnvironmentUrl } from "./resources/api/api.models";
import { Secret } from "./resources/authentication/auth.models";

export interface APIContext {
  baseURL: EnvironmentUrl;
  secret: Secret;
}
