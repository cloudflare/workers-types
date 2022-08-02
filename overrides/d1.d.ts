declare type D1Result<T = unknown> = {
  results?: T[];
  lastRowId: number | null;
  changes: number;
  duration: number;
  error?: string;
};

declare abstract class D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec<T = unknown>(query: string): Promise<D1Result<T>>;
}

declare abstract class D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T[]>>;
  raw<T = unknown>(): Promise<T[]>;
}
