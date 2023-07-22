import { CommonRequest, PagedResponse } from "../API";
import { MemberAreaModule, MemberAreaPage, MemberAreaStudent } from "../Entity";

export interface MemberAreaModulesGetRequestParameters extends CommonRequest<MemberAreaModulesGetRequestParameters> {
  subdomain: string;
  is_extra?: boolean;
}

export type MemberAreaModulesGetRequestResponseData = MemberAreaModule[];

export interface MemberAreaPagesGetRequestParameters extends CommonRequest<MemberAreaPagesGetRequestParameters> {
  subdomain: string;
  module_id: string;
}

export type MemberAreaPagesGetRequestResponseData = MemberAreaPage[];

export interface MemberAreaStudentsGetRequestParameters extends CommonRequest<MemberAreaStudentsGetRequestParameters> {
  subdomain: string;
  email?: string;
}

export type MemberAreaStudentsGetRequestResponseData = PagedResponse<MemberAreaStudent[]>;
