import * as Authentication from "./api/AuthenticationAPI";
import * as Subscription from "./api/SubscriptionAPI";
import * as MembersArea from "./api/MembersAreaAPI";

/**
 * Pagination information that comes with big API responses
 * 
 * @example 
    ```json
     {
      "total_results": 30,
      "next_page_token": "05b60506b659c1c6e728db93eada6271e3adcfb4edf507b679874458e31577b3",
      "prev_page_token": "cf1fg8bd082e2864069035c057eca0bac7eb5d604719c5a76e80f0933f49c217",
      "results_per_page": 10
     }
    ```
 *
 */
interface PageInfo {
  total_results: number;
  next_page_token: string;
  prev_page_token: string;
  results_per_page: number;
}

/**
 * Describes the environment where the API is being used, either production or development
 */
export type Environment = "production" | "development";

/**
 * Describes the URL where the API is being used, either developers or sandbox
 */
export type EnvironmentUrl = "https://developers.hotmart.com" | "https://sandbox.hotmart.com";

/**
 * Describes common keys along all API requests
 */
export interface CommonQueryParams<T> {
  select?: Array<keyof T>;
  max_results?: number;
  page_token?: string;
}

/**
 * Keys that show up on big API responses
 */
export interface PagedResponse<T> {
  items: T;
  page_info: PageInfo;
}

export { Authentication, Subscription, MembersArea };
