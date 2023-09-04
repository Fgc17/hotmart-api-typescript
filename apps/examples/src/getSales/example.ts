/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "dotenv/config";
import { hotmartClient } from "../client";

(async () => {
  console.log("Getting sales...");

  const students = await hotmartClient.salesService.get({
    url_params: {
      query: {},
    },
  });

  console.log(students);
})();
