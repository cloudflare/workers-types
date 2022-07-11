---
"@cloudflare/workers-types": patch
---

Fix DurableObject transaction `get` to properly return `Promise<T | undefined>` instead of `Promise<T>`
