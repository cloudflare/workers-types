interface DurableObjectEntries<T> {
  [key: string]: T
}

interface DurableObjectListOptions {
  start?: string
  end?: string
  reverse?: boolean
  limit?: number
  prefix?: string
}

interface DurableObjectOperator {
  get<T = unknown>(key: string): Promise<T>
  get<T = unknown>(keys: Array<string>): Promise<Map<string, T>>
  put<T = unknown>(key: string, value: T): Promise<void>
  put<T = unknown>(entries: DurableObjectEntries<T>): Promise<void>
  delete(key: string): Promise<boolean>
  delete(keys: Array<string>): Promise<number>
  deleteAll(): Promise<void>
  list<T = unknown>(options?: DurableObjectListOptions): Promise<Map<string, T>>
}

interface DurableObjectTransaction extends DurableObjectOperator {
  rollback(): void
}

interface DurableObjectStorage extends DurableObjectOperator {
  transaction(closure: (txn: DurableObjectStorage) => Promise<void>): Promise<void>
}

interface DurableObjectState {
  id: DurableObjectId
  storage: DurableObjectStorage
  /**
   * Use this method to notify the runtime to wait for asynchronous tasks
   * (e.g. logging, analytics to third-party services, streaming and caching).
   */
  waitUntil(promise: Promise<any>): void
}

/**
 * DurableObject is a class that defines a template for creating Durable Objects
 */
interface DurableObject {
  fetch: (request: Request) => Promise<Response>
}

/**
 * DurableObjectStub is a client object used to send requests to a remote Durable Object
 */
interface DurableObjectStub {
  name?: string
  id: DurableObjectId
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}

interface DurableObjectId {
  name?: string
  toString: () => string
}

interface DurableObjectNamespace {
  newUniqueId: () => DurableObjectId
  idFromName: (name: string) => DurableObjectId
  idFromString: (hexId: string) => DurableObjectId

  get: (id: DurableObjectId) => DurableObjectStub
}
