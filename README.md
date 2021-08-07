# Cloudflare Workers Types

## Install

```bash
npm install @cloudflare/workers-types
```
```
yarn add @cloudflare/workers-types
```

## Usage

The following is a minimal `tsconfig.json` for use alongside this package:

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["esnext", "webworker"],
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
  const MY_ENV: string
  const MY_SECRET: string
  const KV_NAMESPACE: KVNamespace
  const DO_NAMESPACE: DurableObjectNamespace
}
```

### Known issues

Due to limitations in TypeScript, there are a few known issues that don't have an easy fix.

```typescript
let request: Request

// Does not work.
new Request('https://example.com', request)

// Works.
new Request('https://example.com', request as RequestInit)
```
