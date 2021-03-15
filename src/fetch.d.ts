/** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
declare class Blob {
  constructor(blobParts?: BlobPart[], options?: BlobPropertyBag)
  readonly size: number
  readonly type: string
  arrayBuffer(): Promise<ArrayBuffer>
  slice(start?: number, end?: number, contentType?: string): Blob
  stream(): ReadableStream
  text(): Promise<string>
}

interface BlobPropertyBag {
  endings?: EndingType
  type?: string
}

interface Body {
  readonly body: ReadableStream<Uint8Array> | null
  readonly bodyUsed: boolean
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<any>
  text(): Promise<string>
}

/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
declare class FormData {
  constructor()
  append(name: string, value: string | Blob, fileName?: string): void
  delete(name: string): void
  get(name: string): FormDataEntryValue | null
  getAll(name: string): FormDataEntryValue[]
  has(name: string): boolean
  set(name: string, value: string | Blob, fileName?: string): void
  forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void
}

/** Provides information about files and allows JavaScript in a web page to access their content. */
interface File extends Blob {
  readonly lastModified: number
  readonly name: string
}

declare var File: {
  prototype: File
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File
}

interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number
}

/** This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence. */
declare class Headers {
  constructor(init?: HeadersInit)
  append(name: string, value: string): void
  delete(name: string): void
  get(name: string): string | null
  has(name: string): boolean
  set(name: string, value: string): void
  forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void
}

/** This Fetch API interface represents a resource request. */
interface Request extends Body {
  /**
   * Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
   */
  readonly cache: RequestCache
  /**
   * Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
   */
  readonly credentials: RequestCredentials
  /**
   * Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.
   */
  readonly headers: Headers
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]
   */
  readonly integrity: string
  /**
   * Returns a boolean indicating whether or not request can outlive the global in which it was created.
   */
  readonly keepalive: boolean
  /**
   * Returns request's HTTP method, which is "GET" by default.
   */
  readonly method: string
  /**
   * Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs.
   */
  readonly mode: RequestMode
  /**
   * Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
   */
  readonly redirect: RequestRedirect
  /**
   * Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made.
   */
  readonly referrer: string
  /**
   * Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer.
   */
  readonly referrerPolicy: ReferrerPolicy
  /**
   * Returns the URL of request as a string.
   */
  readonly url: string
  clone(): Request
}

declare var Request: {
  prototype: Request
  new (input: RequestInfo, init?: RequestInit): Request
}

interface RequestInit {
  /**
   * A BodyInit object or null to set request's body.
   */
  body?: BodyInit | null
  /**
   * A string indicating how the request will interact with the browser's cache to set request's cache.
   */
  cache?: RequestCache
  /**
   * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
   */
  credentials?: RequestCredentials
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  headers?: HeadersInit
  /**
   * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
   */
  integrity?: string
  /**
   * A boolean to set request's keepalive.
   */
  keepalive?: boolean
  /**
   * A string to set request's method.
   */
  method?: string
  /**
   * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
   */
  mode?: RequestMode
  /**
   * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
   */
  redirect?: RequestRedirect
  /**
   * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
   */
  referrer?: string
  /**
   * A referrer policy to set request's referrerPolicy.
   */
  referrerPolicy?: ReferrerPolicy
  /**
   * Can only be null. Used to disassociate request from any Window.
   */
  window?: any
}

interface Response extends Body {
  readonly headers: Headers
  readonly ok: boolean
  readonly redirected: boolean
  readonly status: number
  readonly statusText: string
  readonly trailer: Promise<Headers>
  readonly type: ResponseType
  readonly url: string
  clone(): Response
}

declare var Response: {
  prototype: Response
  new (body?: BodyInit | null, init?: ResponseInit): Response
  error(): Response
  redirect(url: string, status?: number): Response
}

interface ResponseInit {
  headers?: HeadersInit
  status?: number
  statusText?: string
}

declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
type BlobPart = BufferSource | Blob | string
type BodyInit = Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string
type FormDataEntryValue = File | string
type HeadersInit = Headers | string[][] | Record<string, string>
type ReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
type RequestCache = 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload'
type RequestCredentials = 'include' | 'omit' | 'same-origin'
type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin'
type RequestInfo = Request | string
type RequestRedirect = 'error' | 'follow' | 'manual'
type ResponseType = 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect'
