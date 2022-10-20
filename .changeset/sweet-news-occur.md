---
"@cloudflare/workers-types": patch
---

Improve the `IncomingRequestCfProperties` type.

Previously, this type was based on our docs, which didn't include some fields. Now we've gone through the code that generates these fields and ensured that every property matches up.

Additionally, we added examples and documentation for almost everything, so it should be more clear exactly what a certain property is or isn't.
