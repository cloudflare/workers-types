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

  forEach<This = unknown>(
    callback: (
      this: This,
      key: string,
      value: File | string,
      parent: FormData
    ) => void,
    thisArg?: This
  ): void;
}

declare class Headers {
  entries(): IterableIterator<[key: string, value: string]>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;

  forEach<This = unknown>(
    callback: (this: This, key: string, value: string, parent: Headers) => void,
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

  forEach<This = unknown>(
    callback: (
      this: This,
      key: string,
      value: string,
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
