/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "dotenv/config";
import { hotmartClient } from "../client";

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
