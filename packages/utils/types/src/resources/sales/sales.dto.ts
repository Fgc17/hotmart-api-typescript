import { CommonQueryParams, PagedResponse } from "../api/api.models";
import { Sale } from "./sales.entities";

export interface SalesGetRequest {
  url_params: {
    query: {
      subdomain: string;
    } & CommonQueryParams<Sale>;
  };
}

export type SalesGetRequestResponse = PagedResponse<Sale>;
