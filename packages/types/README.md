# Typifying the Hotmart API

---

> Why?

While developing a NodeJS backend integration with Hotmart, using TypeScript, I encountered several instances of type ambiguity with excessive use of `any`. It became abundantly clear that this API could use some typification for a more predictable and safer coding experience.

> How?

This package was conceived with the idea of being system-agnostic. As such, you have the freedom to choose between using my wrapper or exclusively working with the types - the choice is entirely yours!

Simply install it using npm i @ferstack/hotmart-api/types and begin using the array of types provided.

In an effort to enhance usability, every type provides examples and descriptions when you hover over them.

> The structure

The package is organized into two primary sections: API types and Entity types.

In the API branch, you'll find the types used for request handling. These help ensure that your requests are correctly structured and avoid any potential issues arising from invalid data types or formats.

Meanwhile, the Entity branch is home to the types returned by the API. These will aid in understanding the structure of the data returned by the API and ensure that your application can effectively process and utilize this data.

> How to import the types

This package maintains its agnostic stance in terms of import as well. Though the structure might undergo changes in the future, as of now I favor importing the HotmartTypes top module and then using the dot notation to find what I need. Here's an example:

```ts
import { HotmartTypes } from "@ferstack/hotmart-api/types";

// ...

await axios({
  // calling endpoint
}): Promise<HotmartTypes.API.SubscriptionGetRequestParameters[]>;
```

I acknowledge that this import method might not be the most effective from an intellisense perspective, but the inherent organization makes it viable in my view.

> Bug reporting

If you've found something that you think needs to be corrected, please don't hesitate to create a pull request. Given the size of the package, reviewing and approving/rejecting changes should be swift.

---
