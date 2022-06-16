interface DurableObject {
  fetch(request: Request): Promise<Response>;
  alarm?(): Promise<void>;
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
  get<T = unknown>(
    key: string,
    options?: DurableObjectGetOptions
  ): Promise<T | undefined>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions
  ): Promise<Map<string, T>>;

  list<T = unknown>(
    options?: DurableObjectListOptions
  ): Promise<Map<string, T>>;

  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions
  ): Promise<void>;

  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;

  transaction<T>(
    closure: (txn: DurableObjectTransaction) => Promise<T>
  ): Promise<T>;
}

declare abstract class DurableObjectTransaction {
  get<T = unknown>(key: string, options?: DurableObjectGetOptions): Promise<T>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions
  ): Promise<Map<string, T>>;

  list<T = unknown>(
    options?: DurableObjectListOptions
  ): Promise<Map<string, T>>;

  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions
  ): Promise<void>;

  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;

  deleteAll: never;

  rollback(): void;
}

export {};
