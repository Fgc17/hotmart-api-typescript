
// Flat Cache 
import * as flatCache from 'flat-cache'

// Axios
import axios from "axios";

// Types
import { APIContext } from '../types/ApiContext';

// Hotmart API Packages
import HotmartTypes from "@glypho-hotmart-api/types";
import { HotmartEndpointsService } from '@glypho-hotmart-api/endpoints';

export class AccessTokenObjectService {

    private cache: flatCache.Cache
    private endpointsService: HotmartEndpointsService

    constructor(
        private apiContext: APIContext
    ) {
        this.cache = flatCache.load('hotmartAccessToken')
        this.endpointsService = new HotmartEndpointsService(this.apiContext.environment)
    }

    public async getValid(): Promise<HotmartTypes.Entity.AccessTokenObject> {

        const currentAccessTokenObject = this.get()

        const isCurrentAccessTokenObjectValid = this.validate(currentAccessTokenObject)

        if (!isCurrentAccessTokenObjectValid) {
            const newAccessToken = await this.generate()
            this.set(newAccessToken)
            return newAccessToken
        }

        return currentAccessTokenObject
    }

    private async generate(): Promise<HotmartTypes.Entity.AccessTokenObject> {
        const { basic, ...tokenUrlParams } = this.apiContext.secret

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': basic
        }

        const params = {
            grant_type: "client_credentials",
            ...tokenUrlParams
        }

        const endpoint = this.endpointsService.getEndpoint('authentication', "getAccessObject")

        const accessTokenObject: HotmartTypes.API.Authentication.AccessTokenGetRequestResponseData | void = await axios({
            ...endpoint,
            headers: headers,
            params: params
        })
            .then(({ data }): HotmartTypes.API.Authentication.AccessTokenGetRequestResponseData => data)
            .catch(err => {
                throw err
            })

        const expiryDate = new Date().getTime() + accessTokenObject.expires_in

        return {
            ...accessTokenObject,
            expiryDate: expiryDate
        }
    }

    private validate(accessTokenObject: HotmartTypes.Entity.AccessTokenObject) {

        if (!accessTokenObject) return false

        const currentDate = new Date().getTime()

        if (currentDate > accessTokenObject.expiryDate) return false

        return true
    }

    private set(accessTokenObject: HotmartTypes.Entity.AccessTokenObject) {
        this.cache.setKey('accessTokenObject', {
            ...accessTokenObject,
            expiryDate: accessTokenObject.expires_in + new Date().getTime()
        })
        this.cache.save(true)
    }

    private get() {
        return this.cache.getKey('accessTokenObject')
    }

}