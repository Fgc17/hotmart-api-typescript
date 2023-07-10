/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HotmartClient } from "../../HotmartClient";
import { HotmartClientConfig } from "../../types/ClientConfig";
import 'dotenv/config'

const clientConfig: HotmartClientConfig = {
    environment: 'development',
    secret: {
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        basic: process.env.BASIC!
    }
}

const hotmartClient = new HotmartClient(clientConfig);

(async () => {
    const pages = await hotmartClient.membersAreaService.getPages({
        subdomain: 'my_subdomain',
        module_id: '2Z7RAMXEJW'
    })

    console.log(pages)
})()