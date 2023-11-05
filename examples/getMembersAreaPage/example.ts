/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "dotenv/config";
import { hotmartClient } from "../client";

(async () => {
  const pages = await hotmartClient.endpointsService.consume("membersArea", "getPages", {
    url_params: {
      query: {
        subdomain: "my_subdomain",
      },
      composition: {
        module_id: "2Z7RAMXEJW",
      },
    },
  });

  console.log(pages);
})();
