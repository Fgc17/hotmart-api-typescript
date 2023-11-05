### A Typesafe NodeJS Hotmart API wrapper built with typescript.

As written in the README of the types package:

```
While developing a NodeJS backend integration with Hotmart, using TypeScript, I encountered several instances of type ambiguity with excessive use of any. It became abundantly clear that this API could use some typification for a more predictable and safer coding experience.
```

But what became even clearer after ten minutes of coding was that a types package alone would not be enough. I needed a wrapper that would handle the authentication and the requests to the API.

This package is about **safer coding experience**.

## Installation

```bash
npm install @ferstack/hotmart-api-wrapper
```

For now, you can figure out how to use it by the examples under /apps folder or using the autocompletion provided. I will write a proper documentation soon. Hotmart also has a [documentation](https://developers.hotmart.com/docs/en/-API) for their API.
