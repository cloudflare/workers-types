---
"@cloudflare/workers-types": minor
---

Allow for cacheTags to be passed on fetch requests

Allowing cacheTags within the workers process to be processed as part of a standard fetch has been a highly requested feature. This new object within the request initialization will allow for supplemental Cache-Tag headers to be returned so that they can be stored with the relevant content. This will allow for better control over Purge by Tag mechanisms within the workers processes.

Implementation:

- Adds a new object to the `cf.d.ts` declaration.
