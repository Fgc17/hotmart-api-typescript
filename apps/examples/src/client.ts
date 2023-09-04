import { HotmartClient, HotmartClientConfig } from "@ferstack/hotmart-api-wrapper";

const clientConfig: HotmartClientConfig = {
  environment: "development",
  secret: {
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    basic: process.env.BASIC!,
  },
};

const hotmartClient = new HotmartClient(clientConfig);

export { hotmartClient };
