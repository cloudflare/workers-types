declare abstract class DurableObjectState {
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
}

declare abstract class DurableObjectStorage {
  get<T = unknown>(key: string): Promise<T>;
  get<T = unknown>(keys: string[]): Promise<Map<string, T>>;

  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;

  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;

  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;

  transaction<T>(closure: (txn: DurableObjectTransaction) => Promise<T>): Promise<T>;
}

declare abstract class DurableObjectTransaction {
  get<T = unknown>(key: string): Promise<T>;
  get<T = unknown>(keys: string[]): Promise<Map<string, T>>;

  list<T = unknown>(options?: DurableObjectStorageOperationsListOptions): Promise<Map<string, T>>;

  put<T>(key: string, value: T, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;
  put<T>(entries: Record<string, T>, options?: DurableObjectStorageOperationsPutOptions): Promise<void>;

  delete(key: string, options?: DurableObjectStorageOperationsPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectStorageOperationsPutOptions): Promise<number>;

  deleteAll: never;

  rollback(): void;
}

export {};
