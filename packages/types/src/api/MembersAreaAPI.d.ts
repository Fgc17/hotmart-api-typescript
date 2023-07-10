import { MemberAreaModule, MemberAreaPage, MemberAreaStudent } from "../Entity"
import BaseRequest from "./Base/BaseRequest"
import BaseResponse from "./Base/BaseResponse"


export interface MemberAreaModulesGetRequestParameters extends BaseRequest<MemberAreaModulesGetRequestParameters> {
    subdomain: string
    is_extra?: boolean
}

export type MemberAreaModulesGetRequestResponseData = MemberAreaModule[]

export interface MemberAreaPagesGetRequestParameters extends BaseRequest<MemberAreaPagesGetRequestParameters> {
    subdomain: string
    module_id: string
}

export type MemberAreaPagesGetRequestResponseData = MemberAreaPage[]

export interface MemberAreaStudentsGetRequestParameters extends BaseRequest<MemberAreaStudentsGetRequestParameters> {
    subdomain: string
    email?: string
}

export type MemberAreaStudentsGetRequestResponseData = BaseResponse<MemberAreaStudent[]>
