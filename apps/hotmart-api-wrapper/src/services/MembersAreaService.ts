import { APIContext } from "../types/ApiContext";
import { AccessTokenObjectService } from "./AccessTokenObjectService";
import axios from "axios";

// Hotmart API Packages
import HotmartTypes from "@glypho/hotmart-api-types";
import { HotmartEndpointsService } from "@glypho/hotmart-api-endpoints";

export class MembersAreaService {

    private accessTokenObjectService: AccessTokenObjectService
    private endpointsService: HotmartEndpointsService

    constructor(
        private apiContext: APIContext
    ) {
        this.accessTokenObjectService = new AccessTokenObjectService(this.apiContext)
        this.endpointsService = new HotmartEndpointsService(this.apiContext.environment)
    }

    async getModules(params: Partial<HotmartTypes.API.Subscription.SubscriptionsGetRequestParameters>) {

        const accessTokenObject = await this.accessTokenObjectService.getValid()

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessTokenObject.access_token
        }

        const endpoint = this.endpointsService.getEndpoint('membersArea', 'getModules')

        const getSubscriptionResData: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponseData = await axios({
            ...endpoint,
            headers: headers,
            params: params
        }
        )
            .then(({ data }) => {
                const typedData: HotmartTypes.API.Subscription.SubscriptionsGetRequestResponseData = data
                return typedData
            })
            .catch(err => {
                throw err
            })

        return getSubscriptionResData
    }

    async getPages(params: HotmartTypes.API.MembersArea.MemberAreaPagesGetRequestParameters) {

        const accessTokenObject = await this.accessTokenObjectService.getValid()

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessTokenObject.access_token
        }

        const { module_id, subdomain } = params

        const endpoint = this.endpointsService.getEndpoint('membersArea', 'getPages', {
            module_id: module_id
        })

        const getPagesResData: HotmartTypes.API.MembersArea.MemberAreaPagesGetRequestResponseData = await axios({
            ...endpoint,
            headers: headers,
            params: { subdomain: subdomain }
        }
        )
            .then(({ data }) => {
                const typedData: HotmartTypes.API.MembersArea.MemberAreaPagesGetRequestResponseData = data
                return typedData
            })
            .catch(err => {
                throw err
            })

        return getPagesResData
    }

}