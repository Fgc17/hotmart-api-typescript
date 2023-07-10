# A Versatile Utility Package for Enhancing Hotmart API

---

> Why?

Ever had one of those days where APIs just won't play ball? You're thinking it's `PATCH` time when it's actually `POST` o'clock, or the endpoint's just one typo away from perfection. Yeah, we've all been there.

That's why I crafted this utility package. It was designed to integrate seamlessly with the default axios method `axios()`, but it also provides a boost of efficiency when working with other methods/packages.

> How does it work?

Below is a quick example to show you how easy and efficient your coding experience can be using the package:

```ts
import { hotmartApiEndpoints } from "hotmart-api-endpoints";

axios({
  ...hotmartApiEndpoints.subscription.getPurchases,
  // baseURL: sandbox or developers based on your environment
  // Just slip in your body/headers/params and off you go
});
```

With this code, you can ensure you're using the right endpoint and method without having to second guess or verify.

> Bug reporting

If you've found something that you think needs to be corrected, please don't hesitate to create a pull request. Given the size of the package, reviewing and approving/rejecting changes should be swift.
