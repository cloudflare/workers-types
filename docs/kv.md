# KV

## `KVNamespace`

Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency,
making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

### `KVNamespace#put`

Creates a new key-value pair, or updates the value for a particular key.

#### Parameters

- `key`: key to associate with the value. A key cannot be empty, `.` or `..`. All other keys are valid.
- `value`: value to store. The type is inferred. The maximum size of a value is 25MB.

#### Returns

Returns a `Promise` that you should `await` on in order to verify a successful update.

#### Examples

```js
await NAMESPACE.put(key, value)
```
