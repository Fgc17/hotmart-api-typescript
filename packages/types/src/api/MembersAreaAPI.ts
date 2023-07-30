import { CommonQueryParams, PagedResponse } from "../API";
import { MemberAreaModule, MemberAreaPage, MemberAreaStudent } from "../Entity";

export interface ModulesGetRequest {
  url_params: {
    query: {
      subdomain: string;
      is_extra?: boolean;
    } & CommonQueryParams<ModulesGetRequestResponse[0]>;
  };
}

export type ModulesGetRequestResponse = MemberAreaModule[];

export interface PagesGetRequest {
  url_params: {
    composition: {
      module_id: string;
    };
    query: {
      subdomain: string;
    } & CommonQueryParams<PagesGetRequestResponse[0]>;
  };
}

export type PagesGetRequestResponse = MemberAreaPage[];

export interface StudentsGetRequest {
  subdomain: string;
  email?: string;
}

export type StudentsGetRequestResponse = PagedResponse<MemberAreaStudent[]>;
