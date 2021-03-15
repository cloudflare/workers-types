/// <reference lib="es2020" />

interface Console {
  memory: any
  assert(condition?: boolean, ...data: any[]): void
  clear(): void
  count(label?: string): void
  countReset(label?: string): void
  debug(...data: any[]): void
  dir(item?: any, options?: any): void
  dirxml(...data: any[]): void
  error(...data: any[]): void
  exception(message?: string, ...optionalParams: any[]): void
  group(...data: any[]): void
  groupCollapsed(...data: any[]): void
  groupEnd(): void
  info(...data: any[]): void
  log(...data: any[]): void
  table(tabularData?: any, properties?: string[]): void
  time(label?: string): void
  timeEnd(label?: string): void
  timeLog(label?: string, ...data: any[]): void
  timeStamp(label?: string): void
  trace(...data: any[]): void
  warn(...data: any[]): void
}

/** The URL interface represents an object providing static methods used for creating object URLs. */
interface URL {
  hash: string
  host: string
  hostname: string
  href: string
  toString(): string
  readonly origin: string
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  readonly searchParams: URLSearchParams
  username: string
  toJSON(): string
}

declare var URL: {
  prototype: URL
  new (url: string, base?: string | URL): URL
  createObjectURL(object: any): string
  revokeObjectURL(url: string): void
}

interface URLSearchParams {
  /**
   * Appends a specified key/value pair as a new search parameter.
   */
  append(name: string, value: string): void
  /**
   * Deletes the given search parameter, and its associated value, from the list of all search parameters.
   */
  delete(name: string): void
  /**
   * Returns the first value associated to the given search parameter.
   */
  get(name: string): string | null
  /**
   * Returns all the values association with a given search parameter.
   */
  getAll(name: string): string[]
  /**
   * Returns a Boolean indicating if such a search parameter exists.
   */
  has(name: string): boolean
  /**
   * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
   */
  set(name: string, value: string): void
  sort(): void
  /**
   * Returns a string containing a query string suitable for use in a URL. Does not include the question mark.
   */
  toString(): string
  forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void
}

declare var URLSearchParams: {
  prototype: URLSearchParams
  new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams
  toString(): string
}

declare var console: Console

declare function atob(data: string): string
declare function btoa(data: string): string
declare function clearInterval(handle?: number): void
declare function clearTimeout(handle?: number): void

declare function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number

type BufferSource = ArrayBufferView | ArrayBuffer
type TimerHandler = string | Function
type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
