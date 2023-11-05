import { HotmartClient, HotmartClientConfig } from "..";

const clientConfig: HotmartClientConfig = {
  environment: "development",
  secret: {
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    basic: process.env.CLIENT_BASIC!,
  },
};

const hotmartClient = new HotmartClient(clientConfig);

export { hotmartClient };
