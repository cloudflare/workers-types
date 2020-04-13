# Cloudflare Workers Types

**Install**

```bash
npm install --save-dev @cloudflare/workers-types
-- Or
yarn add -D @cloudflare/workers-types
```

**Usage**

Just supply an empty import in one of your source files to receive the workers types

```typescript
import {} from '@cloudflare/workers-types'
```

Make sure that the `DOM`, `DOM.Iterable` and `WebWorker` [libraries][tsconfig-lib] are included in your [`tsconfig.json`]. e.g.: 
```json
"lib": ["DOM", "DOM.Iterable", "WebWorker"] // As well as "ESNext", etc. as your project requires
```
`@cloudflare/workers-types` definitions are merged with `WebWorker` while `DOM` and `DOM.Iterable` are used in the [`Request`], [`Response`] and [`Headers`] interfaces.


### Using a KV namespace

It's recommended that you create an ambient type file for your KV namespace bindings. Create a file named `types.d.ts` in your src directory:

**`types.d.ts`**

```typescript
import { KVNamespace } from '@cloudflare/workers-types'

declare global {
  const myKVNamespace: KVNamespace
}
```

Now `myKVNamespace` is available to all of your source files.


[tsconfig-lib]: https://www.typescriptlang.org/tsconfig#lib
[`tsconfig.json`]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[`Request`]: https://developers.cloudflare.com/workers/reference/apis/request/
[`Response`]: https://developers.cloudflare.com/workers/reference/apis/response/
[`Headers`]: https://developer.mozilla.org/en-US/docs/Web/API/Headers