---
"@cloudflare/workers-types": patch
---

Add 'origin-auth' to RequestInitCfPropertiesImage interface. This changes fixes types for users attempting to fetch images from authenticated sources. Before this fix, users had to manually extend the fetch interface to satisfy the TS compiler.
