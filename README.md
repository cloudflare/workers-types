# Cloudflare Workers Types

## Install

```bash
npm install @cloudflare/workers-types
-- Or
yarn add @cloudflare/workers-types
```

## Usage

The following is a minimal `tsconfig.json` for use alongside this package:

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020", "WebWorker"],
    "types": ["@cloudflare/workers-types"]
  }
}
```

### Using bindings

It's recommended that you create an ambient type file for any bindings your Worker uses. Create a file named `bindings.d.ts` in your src directory:

**`bindings.d.ts`**

```typescript
export {};

declare global {
  const MY_ENV_VAR: string
  const MY_SECRET: string
  const myKVNamespace: KVNamespace
}
```
