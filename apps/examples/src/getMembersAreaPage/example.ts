/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HotmartClientConfig, HotmartClient } from "@ferstack/hotmart-api-wrapper";
import "dotenv/config";

const clientConfig: HotmartClientConfig = {
  environment: "development",
  secret: {
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    basic: process.env.BASIC!,
  },
};

const hotmartClient = new HotmartClient(clientConfig);

(async () => {
  const pages = await hotmartClient.membersAreaService.getPages({
    url_params: {
      composition: {
        module_id: "2Z7RAMXEJW",
      },
      query: {
        subdomain: "my_subdomain",
      },
    },
  });

  console.log(pages);
})();
