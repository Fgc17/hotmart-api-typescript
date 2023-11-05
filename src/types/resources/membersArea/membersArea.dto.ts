import { CommonQueryParams, PagedResponse } from "../api/api.models";
import { MemberAreaModule, MemberAreaPage, MemberAreaStudent } from "./membersArea.entities";

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
    } & CommonQueryParams<MemberAreaPage>;
  };
}

export type PagesGetRequestResponse = MemberAreaPage[];

export interface StudentsGetRequest {
  url_params: {
    query: {
      subdomain: string;
      email?: string;
    } & CommonQueryParams<MemberAreaStudent>;
  };
}

export type StudentsGetRequestResponse = PagedResponse<MemberAreaStudent[]>;
