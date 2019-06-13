# Cloudflare Workers Types

**Install**

```bash
npm install --save-dev @cloudflare/workers-types
-- Or
yarn add -D @cloudflare/workers-types
```

**tsconfig.json**

You'll need to include the types in your tsconfig

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    "target": "esnext",
    "lib": ["esnext", "webworker"],
    "alwaysStrict": true,
    "strict": true,
    "preserveConstEnums": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "esModuleInterop": true
  },
  "include": [
    "./src/*.ts",
    "./src/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./node_modules/@cloudflare/workers-types/index.d.ts"
  ],
  "exclude": ["node_modules/", "dist/"]
}
```

### Using a KV namespace

It's recommended that you create an ambient type file for your KV namespace bindings. Create a file named `types.d.ts` in your src directory:

**`types.d.ts`**

```typescript
import { KVNamespace } from '@cloudflare/workers-types'

declare const myKVNamespace: KVNamespace
```

Now `myKVNamespace` is available to all of your source files.
