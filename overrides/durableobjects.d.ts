interface DurableObject {
  fetch(request: Request): Promise<Response>;
}

declare abstract class DurableObjectStub extends Fetcher {
  readonly id: DurableObjectId;
  readonly name?: string;
}

declare abstract class DurableObjectNamespace {
  get(id: DurableObjectId): DurableObjectStub;
}

declare abstract class DurableObjectState {
  readonly storage: DurableObjectStorage;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
}

declare abstract class DurableObjectStorage {
  get<T = unknown>(key: string, options?: DurableObjectStorageOperationsGetOptions): Promise<T | undefined>;
  get<T = unknown>(keys: string[], options?: DurableObjectStorageOperationsGetOptions): Promise<Map<string, T>>;

  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;

  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;

  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;

  transaction<T>(closure: (txn: DurableObjectTransaction) => Promise<T>): Promise<T>;
}

declare abstract class DurableObjectTransaction {
  get<T = unknown>(key: string, options?: DurableObjectStorageOperationsGetOptions): Promise<T>;
  get<T = unknown>(keys: string[], options?: DurableObjectStorageOperationsGetOptions): Promise<Map<string, T>>;

  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;

  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;

  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;

  deleteAll: never;

  rollback(): void;
}

export {};
