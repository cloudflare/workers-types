interface KVNamespace {
  get(key: string): KVValue<string>
  get(key: string, type: 'text'): KVValue<string>
  get<ExpectedValue = unknown>(key: string, type: 'json'): KVValue<ExpectedValue>
  get(key: string, type: 'arrayBuffer'): KVValue<ArrayBuffer>
  get(key: string, type: 'stream'): KVValue<ReadableStream>

  getWithMetadata<Metadata = unknown>(key: string): KVValueWithMetadata<string, Metadata>
  getWithMetadata<Metadata = unknown>(key: string, type: 'text'): KVValueWithMetadata<string, Metadata>
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(key: string, type: 'json'): KVValueWithMetadata<ExpectedValue, Metadata>
  getWithMetadata<Metadata = unknown>(key: string, type: 'arrayBuffer'): KVValueWithMetadata<ArrayBuffer, Metadata>
  getWithMetadata<Metadata = unknown>(key: string, type: 'stream'): KVValueWithMetadata<ReadableStream, Metadata>

  put(
    key: string,
    value: string | ReadableStream | ArrayBuffer | FormData,
    options?: {
      expiration?: string | number
      expirationTtl?: string | number
      metadata?: any
    },
  ): Promise<void>

  delete(key: string): Promise<void>

  list(options?: {
    prefix?: string
    limit?: number
    cursor?: string
  }): Promise<{
    keys: { name: string; expiration?: number; metadata?: unknown }[]
    list_complete: boolean
    cursor?: string
  }>
}

type KVValue<Value> = Promise<Value | null>
type KVValueWithMetadata<Value, Metadata> = Promise<{
  value: Value | null
  metadata: Metadata | null
}>
