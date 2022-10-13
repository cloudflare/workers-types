declare abstract class Body {
  json<T>(): Promise<T>;
}

declare class FormData {
  append(name: string, value: string): void;
  append(name: string, value: Blob, filename?: string): void;

  set(name: string, value: string): void;
  set(name: string, value: Blob, filename?: string): void;

  entries(): IterableIterator<[key: string, value: File | string]>;
  [Symbol.iterator](): IterableIterator<[key: string, value: File | string]>;

  keys(): IterableIterator<string>;
  values(): IterableIterator<string | File>;

  forEach<This = unknown>(
    callback: (
      this: This,
      value: File | string,
      key: string,
      parent: FormData
    ) => void,
    thisArg?: This
  ): void;
}

declare class Headers {
  entries(): IterableIterator<[key: string, value: string]>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;

  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;

  forEach<This = unknown>(
    callback: (this: This, value: string, key: string, parent: Headers) => void,
    thisArg?: This
  ): void;
}

// This override provides the typing over the tuples as a nicety.
// The inner array is required to have exactly two elements.
declare type HeadersInit =
  | Headers
  | Record<string, string>
  | [key: string, value: string][];

declare class URLSearchParams {
  entries(): IterableIterator<[key: string, value: string]>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;

  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;

  forEach<This = unknown>(
    callback: (
      this: This,
      value: string,
      key: string,
      parent: URLSearchParams
    ) => void,
    thisArg?: This
  ): void;
}

// This override provides the typing over the tuples as a nicety.
// The inner array is required to have exactly two elements.
declare type URLSearchParamsInit =
  | URLSearchParams
  | string
  | Record<string, string>
  | [key: string, value: string][];

declare class FetchEvent extends ExtendableEvent {
  respondWith(promise: Response | Promise<Response>): void;
}

export {};
