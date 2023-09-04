/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "dotenv/config";
import { hotmartClient } from "../client";

(async () => {
  console.log("Getting members area members...");

  const students = await hotmartClient.membersAreaService.getMembers({
    url_params: {
      query: {
        subdomain: "matematicadozero-laojae",
        max_results: 100,
      },
    },
  });

  console.log(students);
})();
