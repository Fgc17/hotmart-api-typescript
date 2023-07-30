# A Versatile Utility Package for Enhancing Hotmart API

---

> Why?

Making any kind of HTTP requests can be painful, it is easy to make mistakes. This package aims to make the process of making requests to the Hotmart API easier and safer with autocompletion and type checking.

> How does it work?

Below is a quick example to show you how easy and efficient your coding experience can be using the package:

```ts
import { hotmartApiEndpoints } from "hotmart-api-endpoints";

const endpointsService = new HotmartEndpointsService("development");

const endpoint = endpointsService.requestBuilder("membersArea", "getPages", {});

await fetch(endpoint.url, endpoint.init);
```

With this code, you can ensure you're using the right endpoint, method, params and headers.

> Bug reporting

If you've found something that you think needs to be corrected, please don't hesitate to create a pull request. Given the size of the package, reviewing and approving/rejecting changes should be swift.
