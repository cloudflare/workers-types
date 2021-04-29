interface FetchEvent {
  passThroughOnException: () => void;
}

interface ScheduledEvent {
  /**
   * The type of event. This will always return `"scheduled"`.
   */
  type: string;
  /**
   * The time the `ScheduledEvent` was scheduled to be executed in
   * milliseconds since January 1, 1970, UTC.
   * It can be parsed as `new Date(event.scheduledTime)`
   */
  scheduledTime: number;
  /**
   * Use this method to notify the runtime to wait for asynchronous tasks
   * (e.g. logging, analytics to third-party services, streaming and caching).
   * The first `event.waitUntil` to fail will be observed and recorded as the
   * status in the Cron Trigger Past Events table. Otherwise, it will be
   * reported as a Success.
   */
  waitUntil(promise: Promise<any>): void;
}

interface BasicImageTransformations {
  /**
   * Maximum width in image pixels. The value must be an integer.
   */
  width?: number;
  /**
   * Maximum height in image pixels. The value must be an integer.
   */
  height?: number;
  /**
   * Resizing mode as a string. It affects interpretation of width and height
   * options:
   *  - scale-down: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  - contain: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  - cover: Resizes (shrinks or enlarges) to fill the entire area of width
   *    and height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  - crop: The image will shrunk and cropped to fit within the area
   *    specified by width and height. The image won’t be enlarged. For images
   *    smaller than the given dimensions it’s the same as scale-down. For
   *    images larger than the given dimensions, it’s the same as cover.
   *  - pad: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is not recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   */
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  /**
   * When cropping with fit: "cover", this defines the side or point that should
   * be left uncropped. The value is either a string
   * "left", "right", "top", "bottom" or "center" (the default),
   * or an object {x, y} containing focal point coordinates in the original
   * image expressed as fractions ranging from 0.0 (top or left) to 1.0
   * (bottom or right), 0.5 being the center. {fit: "cover", gravity: "top"} will
   * crop bottom or left and right sides as necessary, but won’t crop anything
   * from the top. {fit: "cover", gravity: {x:0.5, y:0.2}} will crop each side to
   * preserve as much as possible around a point at 20% of the height of the
   * source image.
   */
  gravity?: 'left' | 'right' | 'top' | 'bottom' | 'center' | { x: number; y: number };
  /**
   * Background color to add underneath the image. Applies only to images with
   * transparency (such as PNG). Accepts any CSS color (#RRGGBB, rgba(…),
   * hsl(…), etc.)
   */
  background?: string;
  /**
   * Number of degrees (90, 180, 270) to rotate the image by. width and height
   * options refer to axes after rotation.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
}

interface RequestInitCfProperties {
  /**
   * In addition to the properties you can set in the RequestInit dict
   * that you pass as an argument to the Request constructor, you can
   * set certain properties of a `cf` object to control how Cloudflare
   * features are applied to that new Request.
   *
   * Note: Currently, these properties cannot be tested in the
   * playground.
   */
  cacheEverything?: boolean;
  /**
   * A request's cache key is what determines if two requests are
   * "the same" for caching purposes. If a request has the same cache key
   * as some previous request, then we can serve the same cached response for
   * both. (e.g. 'some-key')
   *
   * Only available for Enterprise customers.
   */
  cacheKey?: string;
  /**
   * Force response to be cached for a given number of seconds. (e.g. 300)
   */
  cacheTtl?: number;
  /**
   * Force response to be cached for a given number of seconds based on the Origin status code.
   * (e.g. { '200-299': 86400, '404': 1, '500-599': 0 })
   */
  cacheTtlByStatus?: { [key: string]: number };
  scrapeShield?: boolean;
  apps?: boolean;
  image?: BasicImageTransformations & {
    /**
     * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it
     * easier to specify higher-DPI sizes in <img srcset>.
     */
    dpr?: number;
    /**
     * Quality setting from 1-100 (useful values are in 60-90 range). Lower values
     * make images look worse, but load faster. The default is 85. It applies only
     * to JPEG and WebP images. It doesn’t have any effect on PNG.
     */
    quality?: number;
    /**
     * Output format to generate. It can be:
     *  - avif: generate images in AVIF format.
     *  - webp: generate images in Google WebP format. Set quality to 100 to get
     *    the WebP-lossless format.
     *  - json: instead of generating an image, outputs information about the
     *    image, in JSON format. The JSON object will contain image size
     *    (before and after resizing), source image’s MIME type, file size, etc.
     */
    format?: 'avif' | 'webp' | 'json';
    /**
     * What EXIF data should be preserved in the output image. Note that EXIF
     * rotation and embedded color profiles are always applied ("baked in" into
     * the image), and aren't affected by this option. Note that if the Polish
     * feature is enabled, all metadata may have been removed already and this
     * option may have no effect.
     *  - keep: Preserve most of EXIF metadata, including GPS location if there's
     *    any.
     *  - copyright: Only keep the copyright tag, and discard everything else.
     *    This is the default behavior for JPEG files.
     *  - none: Discard all invisible EXIF metadata. Currently WebP and PNG
     *    output formats always discard metadata.
     */
    metadata?: 'keep' | 'copyright' | 'none';
    /**
     * Overlays are drawn in the order they appear in the array (last array
     * entry is the topmost layer).
     */
    draw?: (BasicImageTransformations & {
      /**
       * Absolute URL of the image file to use for the drawing. It can be any of
       * the supported file formats. For drawing of watermarks or non-rectangular
       * overlays we recommend using PNG or WebP images.
       */
      url: string;
      /**
       * Floating-point number between 0 (transparent) and 1 (opaque).
       * For example, opacity: 0.5 makes overlay semitransparent.
       */
      opacity?: number;
      /**
       * - If set to true, the overlay image will be tiled to cover the entire
       *   area. This is useful for stock-photo-like watermarks.
       * - If set to "x", the overlay image will be tiled horizontally only
       *   (form a line).
       * - If set to "y", the overlay image will be tiled vertically only
       *   (form a line).
       */
      repeat?: true | 'x' | 'y';
      /**
       * Position of the overlay image relative to a given edge. Each property is
       * an offset in pixels. 0 aligns exactly to the edge. For example, left: 10
       * positions left side of the overlay 10 pixels from the left edge of the
       * image it's drawn over. bottom: 0 aligns bottom of the overlay with bottom
       * of the background image.
       *
       * Setting both left & right, or both top & bottom is an error.
       *
       * If no position is specified, the image will be centered.
       */
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    })[];
  };
  minify?: {
    javascript?: boolean;
    css?: boolean;
    html?: boolean;
  };
  mirage?: boolean;
  /**
   * Redirects the request to an alternate origin server. You can use this,
   * for example, to implement load balancing across several origins.
   * (e.g.us-east.example.com)
   *
   * Note - For security reasons, the hostname set in resolveOverride must
   * be proxied on the same Cloudflare zone of the incoming request.
   * Otherwise, the setting is ignored. CNAME hosts are allowed, so to
   * resolve to a host under a different domain or a DNS only domain first
   * declare a CNAME record within your own zone’s DNS mapping to the
   * external hostname, set proxy on Cloudflare, then set resolveOverride
   * to point to that CNAME record.
   */
  resolveOverride?: string;
}

interface IncomingRequestCfProperties {
  /**
   * In addition to the properties on the standard Request object,
   * the cf object contains extra information about the request provided
   * by Cloudflare's edge.
   *
   * Note: Currently, settings in the cf object cannot be accessed in the
   * playground.
   */
  /**
   *  (e.g. 395747)
   */
  asn: number;
  botManagement?: {
    score: number;
    staticResource: boolean;
    verifiedBot: boolean;
  };
  city?: string;
  clientTcpRtt: number;
  clientTrustScore?: number;
  /**
   * The three-letter airport code of the data center that the request
   * hit. (e.g. "DFW")
   */
  colo: string;
  continent?: string;
  /**
   * The two-letter country code in the request. This is the same value
   * as that provided in the CF-IPCountry header. (e.g. "US")
   */
  country: string;
  httpProtocol: string;
  latitude?: string;
  longitude?: string;
  /**
   * DMA metro code from which the request was issued, e.g. "635"
   */
  metroCode?: string;
  postalCode?: string;
  /**
   * e.g. "Texas"
   */
  region?: string;
  /**
   * e.g. "TX"
   */
  regionCode?: string;
  /**
   * e.g. "weight=256;exclusive=1"
   */
  requestPriority: string;
  /**
   * e.g. "America/Chicago"
   */
  timezone?: string;
  tlsVersion: string;
  tlsCipher: string;
  tlsClientAuth: {
    certIssuerDNLegacy: string;
    certIssuerDN: string;
    certPresented: '0' | '1';
    certSubjectDNLegacy: string;
    certSubjectDN: string;
    certNotBefore: string; // In format "Dec 22 19:39:00 2018 GMT"
    certNotAfter: string; // In format "Dec 22 19:39:00 2018 GMT"
    certSerial: string;
    certFingerprintSHA1: string;
    certVerified: string; // “SUCCESS”, “FAILED:reason”, “NONE”
  };
}

interface CfRequestInit extends Omit<RequestInit, 'cf'> {
  cf?: RequestInitCfProperties;
}

interface RequestInit {
  /**
   * cf is a union of these two types because there are multiple
   * scenarios in which it might be one or the other. If you need
   * a type that only contains RequestInitCfProperties, use the
   * CfRequestInit type.
   *
   * IncomingRequestCfProperties is required to allow
   *   new Request(someUrl, event.request)
   *
   * RequestInitCfProperties is required to allow
   *   new Request(event.request, {cf: { ... } })
   *   fetch(someUrl, {cf: { ... } })
   */
  cf?: IncomingRequestCfProperties | RequestInitCfProperties;
}

declare function addEventListener(type: 'fetch', handler: (event: FetchEvent) => void): void;
declare function addEventListener(type: 'scheduled', handler: (event: ScheduledEvent) => void): void;

interface Request {
  cf: IncomingRequestCfProperties;
}

interface FormData {
  [Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]>;
  /**
   * Returns an array of key, value pairs for every entry in the list.
   */
  entries(): IterableIterator<[string, FormDataEntryValue]>;
  /**
   * Returns a list of keys in the list.
   */
  keys(): IterableIterator<string>;
  /**
   * Returns a list of values in the list.
   */
  values(): IterableIterator<FormDataEntryValue>;
}

interface Headers {
  [Symbol.iterator](): IterableIterator<[string, string]>;
  /**
   * Returns an iterator allowing to go through all key/value pairs contained in this object.
   */
  entries(): IterableIterator<[string, string]>;
  /**
   * Returns an iterator allowing to go through all keys of the key/value pairs contained in this object.
   */
  keys(): IterableIterator<string>;
  /**
   * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
   */
  values(): IterableIterator<string>;
}

interface URLSearchParams {
  [Symbol.iterator](): IterableIterator<[string, string]>;
  /**
   * Returns an array of key, value pairs for every entry in the search params.
   */
  entries(): IterableIterator<[string, string]>;
  /**
   * Returns a list of keys in the search params.
   */
  keys(): IterableIterator<string>;
  /**
   * Returns a list of values in the search params.
   */
  values(): IterableIterator<string>;
}

interface ContentOptions {
  /**
   * Controls the way the HTMLRewriter treats inserted content.
   *
   * - true: Raw HTML
   * - false: (Default) Text and any HTML will be escaped
   */
  html: boolean;
}

interface Element {
  /**
   *  The namespace URI of the element according to Infra Spec
   * (https://infra.spec.whatwg.org/#namespaces).
   */
  namespaceURI: string;
  /**
   * e.g. "div"
   */
  tagName: string;
  /**
   * Read-Only - key/value pairs of attributes.
   */
  readonly attributes: IterableIterator<[string, string]>;
  /**
   * Indicates whether the element was removed/replaced in a previous handler
   */
  removed: boolean;

  /**
   * Returns the value for a given attribute name on the element, or null if it isn’t found.
   */
  getAttribute(name: string): string | null;
  /**
   * Returns a boolean indicating whether an attribute exists on the element.
   */
  hasAttribute(name: string): boolean;
  /**
   * Sets an attribute to a provided value, creating the attribute if it doesn’t exist.
   */
  setAttribute(name: string, value: string): Element;
  /**
   * Removes the attribute.
   */
  removeAttribute(name: string): Element;
  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content right after the start tag of the element.
   */
  prepend(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content right before the end tag of the element.
   */
  append(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element;
  /**
   * Replaces content of the element.
   */
  setInnerContent(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element with all its content.
   */
  remove(): Element;
  /**
   * Removes the start tag and end tag of the element, but keeps its inner content intact.
   */
  removeAndKeepContent(): Element;
}

interface Text {
  /**
   * Indicates whether the element was removed/replaced in a previous handler.
   */
  removed: boolean;
  /**
   * Read-Only - The text contents of the chunk. Could be empty if the chunk
   * is the last chunk of the text node.
   */
  readonly text: string;
  /**
   * Read-Only - indicates whether the chunk is the last chunk of the text node.
   */
  readonly lastInTextNode: boolean;

  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element with all its content.
   */
  remove(): Element;
}

interface Comment {
  /**
   * Indicates whether the element was removed/replaced in a previous handler.
   */
  removed: boolean;
  /**
   * This property can be assigned different values, to modify comment’s text.
   */
  text: string;

  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content right after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in place of it.
   */
  replace(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element with all its content.
   */
  remove(): Element;
}

interface Doctype {
  readonly name: string | null;
  /**
   * Read-Only, The quoted string in the doctype after the PUBLIC atom.
   */
  readonly publicId: string | null;
  /**
   * Read-Only, The quoted string in the doctype after the SYSTEM atom or immediately after the publicId.
   */
  readonly systemId: string | null;
}

interface DocumentEnd {
  /**
   * Inserts content right after the end of the document.
   */
  append(content: string, options?: ContentOptions): DocumentEnd;
}

interface ElementHandlerOptionals {
  /**
   * An incoming element, such as `div`
   */
  element?(element: Element): void | Promise<void>;
  /**
   * An incoming comment
   */
  comments?(comment: Comment): void | Promise<void>;
  /**
   * An incoming piece of text
   */
  text?(text: Text): void | Promise<void>;
}

// See https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type ElementHandler = RequireAtLeastOne<ElementHandlerOptionals, 'element' | 'comments' | 'text'>;

interface DocumentHandler {
  /**
   * An incoming doctype, such as <!DOCTYPE html>
   */
  doctype(doctype: Doctype): void | Promise<void>;
  /**
   * An incoming comment
   */
  comments(comment: Comment): void | Promise<void>;
  /**
   * An incoming piece of text
   */
  text(text: Text): void | Promise<void>;
  /**
   * The ending of the document
   */
  end(end: DocumentEnd): void | Promise<void>;
}

declare class HTMLRewriter {
  constructor();
  public on(selector: string, handlers: ElementHandler): HTMLRewriter;
  public onDocument(handlers: DocumentHandler): HTMLRewriter;
  public transform(response: Response): Response;
}

declare interface CacheStorage {
  default: Cache;
}

type KVValue<Value> = Promise<Value | null>;
type KVValueWithMetadata<Value, Metadata> = Promise<{
  value: Value | null;
  metadata: Metadata | null;
}>;

interface KVNamespace {
  get(key: string, options?: {cacheTtl?: number;}): KVValue<string>;
  get(key: string, type: 'text'): KVValue<string>;
  get<ExpectedValue = unknown>(key: string, type: 'json'): KVValue<ExpectedValue>;
  get(key: string, type: 'arrayBuffer'): KVValue<ArrayBuffer>;
  get(key: string, type: 'stream'): KVValue<ReadableStream>;
  get(key: string, options?: {
    type: 'text',
    cacheTtl?: number;
  }): KVValue<string>;
  get<ExpectedValue = unknown>(key: string, options?: {
    type: 'json',
    cacheTtl?: number;
  }): KVValue<ExpectedValue>;
  get(key: string, options?: {
    type: 'arrayBuffer',
    cacheTtl?: number;
  }): KVValue<ArrayBuffer>;
  get(key: string, options?: {
    type: 'stream',
    cacheTtl?: number;
  }): KVValue<ReadableStream>;

  getWithMetadata<Metadata = unknown>(key: string): KVValueWithMetadata<string, Metadata>;
  getWithMetadata<Metadata = unknown>(
    key: string,
    type: 'text'
  ): KVValueWithMetadata<string, Metadata>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: string,
    type: 'json'
  ): KVValueWithMetadata<ExpectedValue, Metadata>;
  getWithMetadata<Metadata = unknown>(
    key: string,
    type: 'arrayBuffer'
  ): KVValueWithMetadata<ArrayBuffer, Metadata>;
  getWithMetadata<Metadata = unknown>(
    key: string,
    type: 'stream'
  ): KVValueWithMetadata<ReadableStream, Metadata>;

  put(
    key: string,
    value: string | ReadableStream | ArrayBuffer | FormData,
    options?: {
      expiration?: string | number;
      expirationTtl?: string | number;
      metadata?: any;
    }
  ): Promise<void>;

  delete(key: string): Promise<void>;

  list(options?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{
    keys: { name: string; expiration?: number; metadata?: unknown }[];
    list_complete: boolean;
    cursor?: string;
  }>;
}

interface DurableObjectEntries<T> {
  [key: string]: T;
}

interface DurableObjectListOptions {
  start?: string;
  end?: string;
  reverse?: boolean;
  limit?: number;
  prefix?: string;
}

interface DurableObjectOperator {
  get<T = unknown>(key: string): Promise<T>;
  get<T = unknown>(keys: Array<string>): Promise<Map<string, T>>;
  put<T = unknown>(key: string, value: T): Promise<void>;
  put<T = unknown>(entries: DurableObjectEntries<T>): Promise<void>;
  delete(key: string): Promise<boolean>;
  delete(keys: Array<string>): Promise<number>;
  deleteAll(): Promise<void>;
  list<T = unknown>(options?: DurableObjectListOptions): Promise<Map<string, T>>;
}

interface DurableObjectTransaction extends DurableObjectOperator {
  rollback(): void;
}

interface DurableObjectStorage extends DurableObjectOperator {
  transaction(
    closure: (txn: DurableObjectTransaction) => Promise<void>
  ): Promise<void>;
}

interface DurableObjectState {
  id: DurableObjectId;
  storage: DurableObjectStorage;
  /**
   * Use this method to notify the runtime to wait for asynchronous tasks
   * (e.g. logging, analytics to third-party services, streaming and caching).
   */
  waitUntil(promise: Promise<any>): void;
}

/**
 * DurableObject is a class that defines a template for creating Durable Objects
 */
interface DurableObject {
  fetch: (request: Request) => Promise<Response>;
}

/**
 * DurableObjectStub is a client object used to send requests to a remote Durable Object
 */
interface DurableObjectStub {
  name?: string;
  id: DurableObjectId;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface DurableObjectId {
  name?: string;
  toString: () => string;
}

interface DurableObjectNamespace {
  newUniqueId: () => DurableObjectId;
  idFromName: (name: string) => DurableObjectId;
  idFromString: (hexId: string) => DurableObjectId;

  get: (id: DurableObjectId) => DurableObjectStub;
}
