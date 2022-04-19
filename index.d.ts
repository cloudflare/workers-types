declare class AbortController {
  constructor();
  readonly signal: AbortSignal;
  abort(reason?: any): void;
}

declare class AbortSignal extends EventTarget {
  constructor();
  static abort(reason?: any): AbortSignal;
  static timeout(delay: number): AbortSignal;
  readonly aborted: boolean;
  readonly reason: any;
  throwIfAborted(): void;
}

declare class Blob {
  constructor(bits?: BlobBits, options?: BlobOptions);
  readonly size: number;
  readonly type: string;
  slice(start?: number, end?: number, type?: string): Blob;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  stream(): ReadableStream;
}

declare type BlobBits = (ArrayBuffer | string | Blob)[];

interface BlobOptions {
  type?: string;
}

declare abstract class Body {
  readonly body: ReadableStream | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
  formData(): Promise<FormData>;
  blob(): Promise<Blob>;
}

declare type BodyInit =
  | ReadableStream
  | string
  | ArrayBuffer
  | Blob
  | URLSearchParams
  | FormData;

/**
 * Back compat for code migrating to older definitions.
 * @deprecated Use BodyInit instead.
 */
declare type BodyInitializer = BodyInit;

declare abstract class Cache {
  delete(
    request: Request | string,
    options?: CacheQueryOptions
  ): Promise<boolean>;
  match(
    request: Request | string,
    options?: CacheQueryOptions
  ): Promise<Response | undefined>;
  put(request: Request | string, response: Response): Promise<void>;
}

interface CacheQueryOptions {
  ignoreMethod?: boolean;
}

declare abstract class CacheStorage {
  open(cacheName: string): Promise<Cache>;
}

declare class CloseEvent extends Event {
  constructor(type: string, initializer: CloseEventInit);
  readonly code: number;
  readonly reason: string;
  readonly wasClean: boolean;
}

interface CloseEventInit {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}

/**
 * Back compat for code migrating from older definitions.
 * @deprecated Use CloseEventInit instead.
 */
declare type CloseEventInitializer = CloseEventInit;

interface Comment {
  text: string;
  readonly removed: boolean;
  before(content: Content, options?: ContentOptions): Comment;
  after(content: Content, options?: ContentOptions): Comment;
  replace(content: Content, options?: ContentOptions): Comment;
  remove(): Comment;
}

interface Console {
  debug(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  warn(...data: any[]): void;
}

declare type Content = string | ReadableStream | Response;

interface ContentOptions {
  html?: boolean;
}

declare abstract class Crypto {
  readonly subtle: SubtleCrypto;
  getRandomValues<
    T extends
      | Int8Array
      | Uint8Array
      | Int16Array
      | Uint16Array
      | Int32Array
      | Uint32Array
      | BigInt64Array
      | BigUint64Array
  >(buffer: T): T;
  randomUUID(): string;
}

declare abstract class CryptoKey {
  readonly type: string;
  readonly extractable: boolean;
  readonly algorithm: CryptoKeyAlgorithmVariant;
  readonly usages: string[];
}

interface CryptoKeyAesKeyAlgorithm {
  name: string;
  length: number;
}

declare type CryptoKeyAlgorithmVariant =
  | CryptoKeyKeyAlgorithm
  | CryptoKeyAesKeyAlgorithm
  | CryptoKeyHmacKeyAlgorithm
  | CryptoKeyRsaKeyAlgorithm
  | CryptoKeyEllipticKeyAlgorithm
  | CryptoKeyVoprfKeyAlgorithm
  | CryptoKeyOprfKeyAlgorithm;

interface CryptoKeyEllipticKeyAlgorithm {
  name: string;
  namedCurve: string;
}

interface CryptoKeyHmacKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  length: number;
}

interface CryptoKeyKeyAlgorithm {
  name: string;
}

interface CryptoKeyOprfKeyAlgorithm {
  name: string;
  namedCurve: string;
}

interface CryptoKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

interface CryptoKeyRsaKeyAlgorithm {
  name: string;
  modulusLength: number;
  publicExponent: ArrayBuffer;
  hash?: CryptoKeyKeyAlgorithm;
}

interface CryptoKeyVoprfKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  namedCurve: string;
}

declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  readonly code: number;
  static readonly INDEX_SIZE_ERR: number;
  static readonly DOMSTRING_SIZE_ERR: number;
  static readonly HIERARCHY_REQUEST_ERR: number;
  static readonly WRONG_DOCUMENT_ERR: number;
  static readonly INVALID_CHARACTER_ERR: number;
  static readonly NO_DATA_ALLOWED_ERR: number;
  static readonly NO_MODIFICATION_ALLOWED_ERR: number;
  static readonly NOT_FOUND_ERR: number;
  static readonly NOT_SUPPORTED_ERR: number;
  static readonly INUSE_ATTRIBUTE_ERR: number;
  static readonly INVALID_STATE_ERR: number;
  static readonly SYNTAX_ERR: number;
  static readonly INVALID_MODIFICATION_ERR: number;
  static readonly NAMESPACE_ERR: number;
  static readonly INVALID_ACCESS_ERR: number;
  static readonly VALIDATION_ERR: number;
  static readonly TYPE_MISMATCH_ERR: number;
  static readonly SECURITY_ERR: number;
  static readonly NETWORK_ERR: number;
  static readonly ABORT_ERR: number;
  static readonly URL_MISMATCH_ERR: number;
  static readonly QUOTA_EXCEEDED_ERR: number;
  static readonly TIMEOUT_ERR: number;
  static readonly INVALID_NODE_TYPE_ERR: number;
  static readonly DATA_CLONE_ERR: number;
}

declare class DigestStream extends WritableStream {
  constructor(algorithm: string | SubtleCryptoHashAlgorithm);
  readonly digest: Promise<ArrayBuffer>;
}

interface Doctype {
  readonly name: string | null;
  readonly publicId: string | null;
  readonly systemId: string | null;
}

interface DocumentEnd {
  append(content: Content, options?: ContentOptions): DocumentEnd;
}

interface Element {
  tagName: string;
  readonly attributes: IterableIterator<string[]>;
  readonly removed: boolean;
  readonly namespaceURI: string;
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): Element;
  removeAttribute(name: string): Element;
  before(content: Content, options?: ContentOptions): Element;
  after(content: Content, options?: ContentOptions): Element;
  prepend(content: Content, options?: ContentOptions): Element;
  append(content: Content, options?: ContentOptions): Element;
  replace(content: Content, options?: ContentOptions): Element;
  remove(): Element;
  removeAndKeepContent(): Element;
  setInnerContent(content: Content, options?: ContentOptions): Element;
  onEndTag(handler: (tag: EndTag) => void | Promise<void>): void;
}

interface EndTag {
  name: string;
  before(content: Content, options?: ContentOptions): EndTag;
  after(content: Content, options?: ContentOptions): EndTag;
  remove(): EndTag;
}

interface ErrorEvent extends Event {
  readonly filename: string;
  readonly message: string;
  readonly lineno: number;
  readonly colno: number;
  readonly error: any;
}

declare class Event {
  constructor(type: string, init?: EventInit);
  readonly type: string;
  readonly eventPhase: number;
  readonly composed: boolean;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly defaultPrevented: boolean;
  readonly returnValue: boolean;
  readonly currentTarget?: EventTarget;
  readonly srcElement?: EventTarget;
  readonly timeStamp: number;
  readonly isTrusted: boolean;
  cancelBubble: boolean;
  stopImmediatePropagation(): void;
  preventDefault(): void;
  stopPropagation(): void;
  composedPath(): EventTarget[];
  static readonly NONE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
}

interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

declare type EventListener<EventType extends Event = Event> = (
  event: EventType
) => void;

interface EventListenerObject<EventType extends Event = Event> {
  handleEvent(event: EventType): void;
}

declare type EventListenerOrEventListenerObject<
  EventType extends Event = Event
> = EventListener<EventType> | EventListenerObject<EventType>;

declare class EventTarget<
  EventMap extends Record<string, Event> = Record<string, Event>
> {
  constructor();
  addEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetAddEventListenerOptions | boolean
  ): void;
  removeEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetEventListenerOptions | boolean
  ): void;
  dispatchEvent(event: EventMap[keyof EventMap]): boolean;
}

interface EventTargetAddEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
  signal?: AbortSignal;
}

interface EventTargetEventListenerOptions {
  capture?: boolean;
}

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

interface ExportedHandler<Env = unknown> {
  fetch?: ExportedHandlerFetchHandler<Env>;
  scheduled?: ExportedHandlerScheduledHandler<Env>;
}

declare type ExportedHandlerFetchHandler<Env = unknown> = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => Response | Promise<Response>;

declare type ExportedHandlerScheduledHandler<Env = unknown> = (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext
) => void | Promise<void>;

declare abstract class FetchEvent extends Event {
  readonly request: Request;
  respondWith(promise: Response | Promise<Response>): void;
  passThroughOnException(): void;
  waitUntil(promise: Promise<any>): void;
}

declare abstract class Fetcher {
  fetch(
    requestOrUrl: Request | string,
    requestInit?: RequestInit | Request
  ): Promise<Response>;
}

declare class File extends Blob {
  constructor(bits?: BlobBits, name?: string, options?: FileOptions);
  readonly name: string;
  readonly lastModified: number;
}

interface FileOptions {
  type?: string;
  lastModified?: number;
}

declare class FixedLengthStream extends TransformStream {
  constructor(expectedLength: number);
}

declare class FormData {
  constructor();
  append(name: string, value: string): void;
  append(name: string, value: Blob, filename?: string): void;
  delete(name: string): void;
  get(name: string): File | string | null;
  getAll(name: string): (File | string)[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  set(name: string, value: Blob, filename?: string): void;
  entries(): IterableIterator<[key: string, value: File | string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<File | string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      key: string,
      value: File | string,
      parent: FormData
    ) => void,
    thisArg?: This
  ): void;
  [Symbol.iterator](): IterableIterator<[key: string, value: File | string]>;
}

declare class HTMLRewriter {
  constructor();
  on(
    selector: string,
    handlers: HTMLRewriterElementContentHandlers
  ): HTMLRewriter;
  onDocument(handlers: HTMLRewriterDocumentContentHandlers): HTMLRewriter;
  transform(response: Response): Response;
}

interface HTMLRewriterDocumentContentHandlers {
  doctype?(doctype: Doctype): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
  end?(end: DocumentEnd): void | Promise<void>;
}

interface HTMLRewriterElementContentHandlers {
  element?(element: Element): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
}

declare class Headers {
  constructor(init?: HeadersInit);
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  forEach<This = unknown>(
    callback: (this: This, key: string, value: string, parent: Headers) => void,
    thisArg?: This
  ): void;
  entries(): IterableIterator<[key: string, value: string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}

declare type HeadersInit =
  | Headers
  | Record<string, string>
  | [key: string, value: string][];

interface JsonWebKey {
  kty: string;
  use?: string;
  key_ops?: string[];
  alg?: string;
  ext?: boolean;
  crv?: string;
  x?: string;
  y?: string;
  d?: string;
  n?: string;
  e?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
  oth?: RsaOtherPrimesInfo[];
  k?: string;
}

/**
 * Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency,
 * making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.
 */
interface KVNamespace<K extends string = string> {
  get(
    key: K,
    options?: Partial<KVNamespaceGetOptions<undefined>>
  ): Promise<string | null>;
  get(key: K, type: "text"): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: K,
    type: "json"
  ): Promise<ExpectedValue | null>;
  get(key: K, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
  get(key: K, type: "stream"): Promise<ReadableStream | null>;
  get(key: K, options: KVNamespaceGetOptions<"text">): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: string,
    options: KVNamespaceGetOptions<"json">
  ): Promise<ExpectedValue | null>;
  get(
    key: K,
    options: KVNamespaceGetOptions<"arrayBuffer">
  ): Promise<ArrayBuffer | null>;
  get(
    key: K,
    options: KVNamespaceGetOptions<"stream">
  ): Promise<ReadableStream | null>;
  list<Metadata = unknown>(
    options?: KVNamespaceListOptions
  ): Promise<KVNamespaceListResult<Metadata>>;
  /**
   * Creates a new key-value pair, or updates the value for a particular key.
   * @param key key to associate with the value. A key cannot be empty, `.` or `..`. All other keys are valid.
   * @param value value to store. The type is inferred. The maximum size of a value is 25MB.
   * @returns Returns a `Promise` that you should `await` on in order to verify a successful update.
   * @example
   * await NAMESPACE.put(key, value);
   */
  put(
    key: K,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions
  ): Promise<void>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    options?: Partial<KVNamespaceGetOptions<undefined>>
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    type: "text"
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: K,
    type: "json"
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    type: "arrayBuffer"
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    type: "stream"
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    options: KVNamespaceGetOptions<"text">
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: K,
    options: KVNamespaceGetOptions<"json">
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    options: KVNamespaceGetOptions<"arrayBuffer">
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: K,
    options: KVNamespaceGetOptions<"stream">
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  delete(name: string): Promise<void>;
}

interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}

interface KVNamespaceGetWithMetadataResult<Value, Metadata> {
  value: Value | null;
  metadata: Metadata | null;
}

interface KVNamespaceListKey<Metadata> {
  name: string;
  expiration?: number;
  metadata?: Metadata;
}

interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string | null;
  cursor?: string | null;
}

interface KVNamespaceListResult<Metadata> {
  keys: KVNamespaceListKey<Metadata>[];
  list_complete: boolean;
  cursor?: string;
}

interface KVNamespacePutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any | null;
}

declare class MessageEvent extends Event {
  constructor(type: string, initializer: MessageEventInit);
  readonly data: ArrayBuffer | string;
}

interface MessageEventInit {
  data: ArrayBuffer | string;
}

declare abstract class Navigator {
  readonly userAgent: string;
}

/**
 * Transitionary name.
 * @deprecated Use StreamPipeOptions
 */
interface PipeToOptions {
  preventClose?: boolean;
  preventAbort?: boolean;
  preventCancel?: boolean;
}

declare abstract class PromiseRejectionEvent extends Event {
  readonly promise: Promise<any>;
  readonly reason: any;
}

declare abstract class ReadableByteStreamController {
  readonly byobRequest: ReadableStreamBYOBRequest | null;
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: ArrayBufferView): void;
  error(reason: any): void;
}

declare class ReadableStream {
  constructor(underlyingSource?: Object, queuingStrategy?: Object);
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(options: ReadableStreamGetReaderOptions): ReadableStreamBYOBReader;
  getReader(): ReadableStreamDefaultReader;
  pipeThrough(
    transform: ReadableStreamTransform,
    options?: PipeToOptions
  ): ReadableStream;
  pipeTo(destination: WritableStream, options?: PipeToOptions): Promise<void>;
  tee(): [ReadableStream, ReadableStream];
  values(
    options?: ReadableStreamValuesOptions
  ): AsyncIterableIterator<ReadableStreamReadResult>;
  [Symbol.asyncIterator](
    options?: ReadableStreamValuesOptions
  ): AsyncIterableIterator<ReadableStreamReadResult>;
}

declare class ReadableStreamBYOBReader {
  constructor(stream: ReadableStream);
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
  read<T extends ArrayBufferView>(
    view: T
  ): Promise<ReadableStreamReadResult<T>>;
  releaseLock(): void;
  readAtLeast(
    minBytes: number,
    view: Uint8Array
  ): Promise<ReadableStreamReadResult<Uint8Array>>;
}

declare abstract class ReadableStreamBYOBRequest {
  readonly view: Uint8Array | null;
  respond(bytesWritten: number): void;
  respondWithNewView(view: ArrayBufferView): void;
  readonly atLeast: number | null;
}

declare abstract class ReadableStreamDefaultController {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk?: any): void;
  error(reason: any): void;
}

declare class ReadableStreamDefaultReader {
  constructor(stream: ReadableStream);
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
  read(): Promise<ReadableStreamReadResult<any>>;
  releaseLock(): void;
}

interface ReadableStreamGetReaderOptions {
  mode: string;
}

/**
 * Back-compat alias.
 * @deprecated Use StreamPipeOptions
 */
declare type ReadableStreamPipeToOptions = PipeToOptions;

declare type ReadableStreamReadResult<T = any> =
  | { done: true; value: undefined }
  | { done: false; value: T };

interface ReadableStreamTransform {
  writable: WritableStream;
  readable: ReadableStream;
}

interface ReadableStreamValuesOptions {
  preventCancel?: boolean;
}

declare class Request extends Body {
  constructor(input: Request | string, init?: RequestInit | Request);
  clone(): Request;
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  readonly redirect: string;
  readonly fetcher: Fetcher | null;
  readonly signal: AbortSignal;
}

interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  redirect?: string;
  fetcher?: Fetcher | null;
  signal?: AbortSignal | null;
}

declare class Response extends Body {
  constructor(bodyInit?: BodyInit | null, maybeInit?: ResponseInit | Response);
  static redirect(url: string, status?: number): Response;
  clone(): Response;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly url: string;
  readonly webSocket: WebSocket | null;
}

interface ResponseInit {
  status?: number;
  statusText?: string;
  headers?: HeadersInit;
  webSocket?: WebSocket | null;
  encodeBody?: string;
}

interface RsaOtherPrimesInfo {
  r?: string;
  d?: string;
  t?: string;
}

interface ScheduledController {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}

declare abstract class ScheduledEvent extends Event {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
  waitUntil(promise: Promise<any>): void;
}

interface Scheduler {
  wait(delay: number, maybeOptions?: SchedulerWaitOptions): Promise<void>;
}

interface SchedulerWaitOptions {
  signal?: AbortSignal;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  btoa(data: string): string;
  atob(data: string): string;
  setTimeout<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearTimeout(timeoutId: number | null): void;
  setInterval<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearInterval(timeoutId: number | null): void;
  queueMicrotask(task: Function): void;
  structuredClone(
    value: any,
    options?: ServiceWorkerGlobalScopeStructuredCloneOptions
  ): any;
  fetch(
    request: Request | string,
    requestInitr?: RequestInit | Request
  ): Promise<Response>;
  self: ServiceWorkerGlobalScope;
  crypto: Crypto;
  caches: CacheStorage;
  scheduler: Scheduler;
  navigator: Navigator;
  readonly console: Console;
  origin: void;
}

interface ServiceWorkerGlobalScopeStructuredCloneOptions {
  transfer?: any[];
}

declare type StreamPipeOptions = PipeToOptions;

interface StreamQueuingStrategy {
  highWaterMark?: number;
  size(chunk: ArrayBuffer): number;
}

declare abstract class SubtleCrypto {
  encrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    plainText: ArrayBuffer
  ): Promise<ArrayBuffer>;
  decrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    cipherText: ArrayBuffer
  ): Promise<ArrayBuffer>;
  sign(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    data: ArrayBuffer
  ): Promise<ArrayBuffer>;
  verify(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    signature: ArrayBuffer,
    data: ArrayBuffer
  ): Promise<boolean>;
  digest(
    algorithm: string | SubtleCryptoHashAlgorithm,
    data: ArrayBuffer
  ): Promise<ArrayBuffer>;
  generateKey(
    algorithm: string | SubtleCryptoGenerateKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey | CryptoKeyPair>;
  deriveKey(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    derivedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
  deriveBits(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    length: number | null
  ): Promise<ArrayBuffer>;
  importKey(
    format: string,
    keyData: ArrayBuffer | JsonWebKey,
    algorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;
  wrapKey(
    format: string,
    key: CryptoKey,
    wrappingKey: CryptoKey,
    wrapAlgorithm: string | SubtleCryptoEncryptAlgorithm
  ): Promise<ArrayBuffer>;
  unwrapKey(
    format: string,
    wrappedKey: ArrayBuffer,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm: string | SubtleCryptoEncryptAlgorithm,
    unwrappedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
}

interface SubtleCryptoDeriveKeyAlgorithm {
  name: string;
  salt?: ArrayBuffer;
  iterations?: number;
  hash?: string | SubtleCryptoHashAlgorithm;
  public?: CryptoKey;
  info?: ArrayBuffer;
}

interface SubtleCryptoEncryptAlgorithm {
  name: string;
  iv?: ArrayBuffer;
  additionalData?: ArrayBuffer;
  tagLength?: number;
  counter?: ArrayBuffer;
  length?: number;
  label?: ArrayBuffer;
}

interface SubtleCryptoGenerateKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  modulusLength?: number;
  publicExponent?: ArrayBuffer;
  length?: number;
  namedCurve?: string;
}

interface SubtleCryptoHashAlgorithm {
  name: string;
}

interface SubtleCryptoImportKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  length?: number;
  namedCurve?: string;
  compressed?: boolean;
}

/**
 *
 * @deprecated Don't use. Introduced incidentally in 3.x. Scheduled for removal.
 */
declare type SubtleCryptoJsonWebKeyRsaOtherPrimesInfo = RsaOtherPrimesInfo;

interface SubtleCryptoSignAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  dataLength?: number;
  saltLength?: number;
}

interface Text {
  readonly text: string;
  readonly lastInTextNode: boolean;
  readonly removed: boolean;
  before(content: Content, options?: ContentOptions): Text;
  after(content: Content, options?: ContentOptions): Text;
  replace(content: Content, options?: ContentOptions): Text;
  remove(): Text;
}

declare class TextDecoder {
  constructor(
    label?: "utf-8" | "utf8" | "unicode-1-1-utf-8",
    options?: TextDecoderConstructorOptions
  );
  decode(input?: ArrayBuffer, options?: TextDecoderDecodeOptions): string;
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;
}

interface TextDecoderConstructorOptions {
  fatal: boolean;
  ignoreBOM: boolean;
}

interface TextDecoderDecodeOptions {
  stream: boolean;
}

declare class TextEncoder {
  constructor();
  encode(input?: string): Uint8Array;
  encodeInto(input: string, buffer: Uint8Array): TextEncoderEncodeIntoResult;
  readonly encoding: string;
}

interface TextEncoderEncodeIntoResult {
  read: number;
  written: number;
}

declare class TransformStream {
  constructor();
  readonly readable: ReadableStream;
  readonly writable: WritableStream;
}

declare class URL {
  constructor(url: string, base?: string);
  href: string;
  readonly origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  readonly searchParams: URLSearchParams;
  hash: string;
  toString(): string;
  toJSON(): string;
}

declare class URLPattern {
  constructor(input?: string | URLPatternURLPatternInit, baseURL?: string);
  readonly protocol: string;
  readonly username: string;
  readonly password: string;
  readonly hostname: string;
  readonly port: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  test(input?: string | URLPatternURLPatternInit, baseURL?: string): boolean;
  exec(
    input?: string | URLPatternURLPatternInit,
    baseURL?: string
  ): URLPatternURLPatternResult | null;
}

interface URLPatternURLPatternComponentResult {
  input: string;
  groups: Record<string, string>;
}

interface URLPatternURLPatternInit {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  baseURL?: string;
}

interface URLPatternURLPatternResult {
  inputs: (string | URLPatternURLPatternInit)[];
  protocol: URLPatternURLPatternComponentResult;
  username: URLPatternURLPatternComponentResult;
  password: URLPatternURLPatternComponentResult;
  hostname: URLPatternURLPatternComponentResult;
  port: URLPatternURLPatternComponentResult;
  pathname: URLPatternURLPatternComponentResult;
  search: URLPatternURLPatternComponentResult;
  hash: URLPatternURLPatternComponentResult;
}

declare class URLSearchParams {
  constructor(init?: URLSearchParamsInit);
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  entries(): IterableIterator<[key: string, value: string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      key: string,
      value: string,
      parent: URLSearchParams
    ) => void,
    thisArg?: This
  ): void;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
  toString(): string;
}

declare type URLSearchParamsInit =
  | URLSearchParams
  | string
  | Record<string, string>
  | [key: string, value: string][];

/**
 * Back compat for code migrating to older definitions.
 * This technically isn't part of a standard either way, but the naming
 * is more consistent.
 * @deprecated Use URLSearchParamsInit instead.
 */
declare type URLSearchParamsInitializer = URLSearchParamsInit;

declare abstract class WebSocket extends EventTarget<WebSocketEventMap> {}

declare type WebSocketEventMap = {
  close: CloseEvent;
  message: MessageEvent;
  error: Event;
};

declare const WebSocketPair: { new (): { 0: WebSocket; 1: WebSocket } };

declare abstract class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {}

declare type WorkerGlobalScopeEventMap = {
  fetch: FetchEvent;
  scheduled: ScheduledEvent;
  unhandledrejection: PromiseRejectionEvent;
  rejectionhandled: PromiseRejectionEvent;
};

declare class WritableStream {
  constructor(underlyingSink?: Object, queuingStrategy?: Object);
  readonly locked: boolean;
  abort(reason: any): Promise<void>;
  close(): Promise<void>;
  getWriter(): WritableStreamDefaultWriter;
}

declare abstract class WritableStreamDefaultController {
  readonly signal: AbortSignal;
  error(reason?: any): void;
}

declare class WritableStreamDefaultWriter {
  constructor(stream: WritableStream);
  readonly closed: Promise<void>;
  readonly ready: Promise<void>;
  readonly desiredSize: number | null;
  abort(reason: any): Promise<void>;
  close(): Promise<void>;
  write(chunk: any): Promise<void>;
  releaseLock(): void;
}

/**
 * Back-compat alias.
 * @deprecated Use WritableStreamDefaultWriter
 */
declare type WritableStreamWritableStreamDefaultWriter =
  WritableStreamDefaultWriter;

declare function addEventListener<Type extends keyof WorkerGlobalScopeEventMap>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetAddEventListenerOptions | boolean
): void;

declare function atob(data: string): string;

declare function btoa(data: string): string;

declare const caches: CacheStorage;

declare function clearInterval(timeoutId: number | null): void;

declare function clearTimeout(timeoutId: number | null): void;

declare const console: Console;

declare const crypto: Crypto;

declare function dispatchEvent(
  event: WorkerGlobalScopeEventMap[keyof WorkerGlobalScopeEventMap]
): boolean;

declare function fetch(
  request: Request | string,
  requestInitr?: RequestInit | Request
): Promise<Response>;

declare const navigator: Navigator;

declare const origin: void;

declare function queueMicrotask(task: Function): void;

declare function removeEventListener<
  Type extends keyof WorkerGlobalScopeEventMap
>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetEventListenerOptions | boolean
): void;

declare const scheduler: Scheduler;

declare const self: ServiceWorkerGlobalScope;

declare function setInterval<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;

declare function setTimeout<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;

declare function structuredClone(
  value: any,
  options?: ServiceWorkerGlobalScopeStructuredCloneOptions
): any;
