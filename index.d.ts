/**
 * An event context.
 */
interface Context {
  /**
   * Extends the event lifetime with a background task. This is useful for
   * asynchronous tasks such as logging, analytics, and error-reporting that
   * do not block the completion of the event. This can be invoked on multiple
   * promises, all of which will be awaited.
   *
   * These tasks cannot last more than 30 seconds after the event has completed.
   *
   * @example
   * async function handleRequest(request, env, ctx) {
   *   // Instead of blocking the execution of the event,
   *   // this will await a logging task in the background.
   *   ctx.waitUntil(logRequest(request))
   *
   *   return fetch(request)
   * }
   */
  waitUntil(task: Promise<any>): void;
}

/**
 * An event context, for `fetch` events.
 */
interface RequestContext extends Context {
  /**
   * If an uncaught error is thrown, this instructs the runtime to proxy the
   * `Request` to its original destination, as if the Worker didn't exist. This
   * should be invoked as early as possible in the event handler.
   *
   * If the request body is consumed (e.g. `request.text()`) before the error
   * is thrown, the request will be proxied without its body. This is because
   * bodies are streamed and not buffered.
   */
  passThroughOnException(): void;
}

interface FetchEvent extends RequestContext {
  readonly type: 'fetch';
}

/**
 * Registers an event listener for the `FetchEvent`.
 *
 * @example
 * addEventListener('fetch', (event) => {
 *   event.respondWith(handleEvent(event))
 * })
 *
 * async function handleEvent(event) {
 *   const { request } = event
 *   return new Response('Ok')
 * }
 */
declare function addEventListener(type: 'fetch', handler: (event: FetchEvent) => void): void;

/**
 * A controller for scheduled tasks. (aka. cron jobs)
 */
interface ScheduledController {
  /**
   * The scheduled execution time, in milliseconds since UNIX epoch.
   *
   * This may not equal the current time. If you need to check the
   * time skew, you can compare this value to `Date.now()`.
   *
   * @example
   * let date = new Date(scheduledTime)
   */
  readonly scheduledTime: number;
  /**
   * The cron string that represents the schedule.
   *
   * @link https://crontab.guru
   */
  readonly cron: string;
  /**
   * If an uncaught error is thrown, this instructs the runtime to skip
   * this scheduled execution and not to retry.
   */
  noRetry(): void;
}

/**
 * A scheduled event, which is fired on a recurring schedule.
 */
interface ScheduledEvent extends Context, ScheduledController {
  readonly type: 'scheduled';
}

/**
 * Registers an event listener for the `ScheduledEvent`.
 *
 * @example
 * addEventListener('scheduled', (event) => {
 *   event.waitUntil(handleEvent(event))
 * })
 *
 * async function handleEvent(event) {
 *   const { scheduledTime, cron } = event
 *   console.log('Event:', cron, new Date(scheduledTime))
 * }
 */
declare function addEventListener(type: 'scheduled', handler: (event: ScheduledEvent) => void): void;

/**
 * A trace when `console.log()` is invoked.
 *
 * @private
 */
interface TraceLog {
  /**
   * The timestamp, in milliseconds since UNIX epoch.
   */
  readonly timestamp: number;
  /**
   * The log level.
   *
   * @example
   * 'debug'
   * 'info'
   */
  readonly level: string;
  /**
   * The log message.
   *
   * @example
   * console.debug('Hi')           // ['Hi']
   * console.log('Hello', 'World') // ['Hello', 'World']
   */
  readonly message: any;
}

/**
 * A trace when an uncaught `Error` is thrown.
 *
 * @private
 */
interface TraceError {
  /**
   * The timestamp, in milliseconds since UNIX epoch.
   */
  readonly timestamp: number;
  /**
   * The class name of the error.
   *
   * @example
   * 'TypeError'
   */
  readonly name: string;
  /**
   * The error message.
   */
  readonly message: string;
}

/**
 * A trace when a `Request` is received.
 *
 * @private
 */
interface TraceRequest {
  /**
   * The request URL.
   */
  readonly url: string;
  /**
   * The request method.
   */
  readonly method: string;
  /**
   * The request headers.
   */
  readonly headers: Headers;
  /**
   * The request metadata.
   */
  readonly cf: RequestCf;
  /**
   * Gets an unredacted version of the trace request.
   *
   * By default, the runtime redacts sensitive information from the trace
   * request such as the `Authorization` and `Set-Cookie` headers. This will
   * undo that.
   */
  getUnredacted(): TraceRequest;
}

/**
 * A trace.
 *
 * @private
 */
interface TraceItem {
  /**
   * The event outcome.
   *
   *  * `ok`: The outcome was successful.
   *  * `canceled`: The client canceled the event before it could be finished.
   *  * `exception`: An uncaught `Error` was thrown. This includes any errors
   *    that are thrown inside a `ctx.waitUntil()`.
   *  * `exceededCpu`: When the CPU limit is exceeded.
   *  * `scriptNotFound`: A system error when the script contents do not exist
   *    when requested at the edge.
   *  * `unknown`: An unknown fatal error occured.
   */
  readonly outcome: string;
  /**
   * The event timestamp, in milliseconds since UNIX epoch.
   */
  readonly eventTimestamp: number;
  /**
   * The event.
   */
  readonly event: {
    // fetch
    readonly request?: TraceRequest;
    // scheduled
    readonly cron?: string;
    readonly scheduledTime?: number;
  };
  /**
   * The list of logs.
   */
  readonly logs: TraceLog[];
  /**
   * The list of uncaught errors. 
   */
  readonly exceptions: TraceError[];
}

/**
 * A trace event, which is fired when another event has completed.
 *
 * @private
 */
interface TraceEvent extends Context {
  readonly type: 'trace';
  /**
   * The list of traces.
   */
  readonly traces: TraceItem[];
}

/**
 * Registers an event listener for the `TraceEvent`.
 *
 * @private The tracing API is not available to the public, if you try it,
 * it will not work. We define it here because a few internal services at
 * Cloudflare use it and we like to dogfood.
 */
declare function addEventListener(type: 'trace', handler: (event: TraceEvent) => void): void;

/**
 * Metadata about whether a `Request` is from a bot.
 *
 * @link https://developers.cloudflare.com/bots/
 */
interface BotMetadata {
  /**
   * A score between 1 and 99, inclusive, that indicates the likelyhood a
   * request is originating from a bot. 1 is bot and 99 is human. Scores below
   * 30 are very likely bots.
   */
  readonly score: number;
  /**
   * If the request is originating from a verified, trusted bot.
   *
   * @link https://developers.cloudflare.com/firewall/known-issues-and-faq#bots-currently-detected 
   */
  readonly verifiedBot: boolean;
  readonly staticResource: boolean; // TODO(detail)
}

interface TLSMetadata { // TODO(detail)
  readonly certIssuerDNLegacy: string;
  readonly certIssuerSKI: string;
  readonly certIssuerDN: string;
  readonly certIssuerSerial: string;
  readonly certIssuerDNRFC2253: string;
  readonly certSubjectDNRFC2253: string;
  readonly certSubjectDNLegacy: string;
  readonly certSubjectDN: string;
  readonly certFingerprintSHA256: string;
  readonly certFingerprintSHA1: string;
  /**
   * @example
   * 'Dec 22 19:39:00 2018 GMT'
   */
  readonly certNotBefore: string;
  /**
   * @example
   * 'Dec 22 19:39:00 2018 GMT'
   */
  readonly certNotAfter: string;
  readonly certSKI: string;
  readonly certSerial: string;
  /**
   * @example
   * 'SUCCESS'
   * 'FAILED:reason'
   * 'NONE'
   */
  readonly certVerified: string;
  readonly certPresented: '0' | '1';
  readonly certRevoked: '0' | '1';
}

/**
 * @link https://datatracker.ietf.org/doc/html/draft-ietf-tls-exported-authenticator
 */
interface TLSExportedAuthenticator { // TODO(detail)
  readonly clientFinished: string;
  readonly clientHandshake: string;
  readonly serverHandshake: string;
  readonly serverFinished: string;
}

/**
 * @deprecated Use `RequestCf` instead.
 */
type IncomingRequestCfProperties = RequestCf;

/**
 * Extra metadata about a `Request`, provided by Cloudflare.
 */
interface RequestCf {
  /**
   * The HTTP protocol.
   *
   * @example
   * 'HTTP/1.1'
   * 'HTTP/2'
   */
  readonly httpProtocol: string;
  /**
   * The TLS version.
   *
   * @example
   * 'TLSv1.3'
   */
  readonly tlsVersion: string;
  /**
   * The TLS cipher.
   *
   * @example
   * 'ECDHE-ECDSA-CHACHA20-POLY1305'
   */
  readonly tlsCipher: string;
  readonly tlsClientAuth: TLSMetadata; // TODO(detail)
  readonly tlsExportedAuthenticator: TLSExportedAuthenticator; // TODO(detail)
  /**
   * The HTTP/2 prioritization preferences.
   *
   * If the protocol is not HTTP/2, this value will be an empty string.
   *
   * @link https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/
   * @example
   * 'weight=192;exclusive=0;group=3;group-weight=127'
   */
  readonly requestPriority: string;
  /**
   * The round-trip time, in milliseconds, from the client to Cloudflare.
   */
  readonly clientTcpRtt: number;
  readonly edgeRequestKeepAliveStatus: 0 | 1; // TODO(detail)
  /**
   * The unmodified value of the 'Accept-Encoding' header.
   *
   * @example
   * 'gzip, deflate, br'
   */
  readonly clientAcceptEncoding: string;
  /**
   * The autonomous system number of the request's IP address.
   *
   * @link https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/
   * @example
   * 13335 // Cloudflare
   */
  readonly asn: number;
  /**
   * The three-letter IATA airport code of the datacenter where the
   * request was received.
   *
   * @link https://www.iata.org/en/publications/directories/code-search/
   * @example
   * 'IAD' // Washington Dulles Airport (represents Ashburn, VA)
   */ 
  readonly colo: string;
  /**
   * The two-letter ISO continent code of the request IP address.
   *
   * @example
   * 'NA' // North America
   */
  readonly continent?: string;
  /**
   * The two-letter ISO country code of the request IP address. This will match
   * the value of the `CF-IPCountry` header.
   *
   * @link https://www.iban.com/country-codes
   * @example
   * 'US' // United States
   */
  readonly country?: string;
  /**
   * The two-letter ISO region code of the request IP address.
   *
   * If the `country` is `US`, these represent state abbreviations.
   *
   * @example
   * 'CA' // California
   */
  readonly regionCode?: string;
  /**
   * The region name of the request IP address.
   *
   * @example
   * 'California'
   */
  readonly region?: string;
  /**
   * The city name of the request IP address.
   *
   * @example
   * 'Los Angeles'
   */
  readonly city?: string;
  /**
   * The postal code of the request IP address.
   *
   * This value is not guaranteed to be strictly numerical.
   *
   * @example
   * '90210' // American zipcode
   * 'K1A' // Canadian postal code
   */
  readonly postalCode?: string;
  /**
   * The timezone of the request IP address.
   *
   * @link https://timezonedb.com/time-zones
   * @example
   * let timeZone = timezone
   * let date = new Date().toLocaleString('en-US', { timeZone })
   *
   * console.log(timeZone, date)
   * // ['America/Chicago', '8/1/2021, 2:20:02 PM']
   */
  readonly timezone?: string;
  /**
   * The approximate latitude of the request IP address.
   */
  readonly latitude?: string;
  /**
   * The approximate longitude of the request IP address.
   */
  readonly longitude?: string;
  /**
   * A code that represents the metro region of the request IP address.
   *
   * This value may only be present if `country` is `US`.
   *
   * @link https://help-ooyala.brightcove.com/sites/all/libraries/dita/en/video-platform/reference/dma_codes.html
   * @example
   * if (parseInt(metroCode) === 803) {
   *   // Los Angeles
   * }
   */
  readonly metroCode?: string;
  /**
   * The bot metadata.
   *
   * @requires Enterprise
   */
  readonly botManagement?: BotMetadata;
  /**
   * A score between 1 and 99, inclusive, that indicates the likelyhood a
   * request is originating from a bot. 1 is bot and 99 is human. Scores below
   * 30 are very likely bots.
   *
   * @requires Enterprise
   * @deprecated Use `botManagement.score` instead.
   */
  readonly clientTrustScore?: number;
}

interface Request {
  /**
   * Extra metadata about the request, provided by Cloudflare.
   *
   * If this value is `null`, you are likely using the "playground" editor.
   * Instead, we recommend testing with a free `workers.dev` account which
   * contains this metadata.
   */
  cf: RequestCf;
}

declare function fetch(input: RequestInfo, init?: RequestInit | Request): Promise<Response>;

/**
 * @deprecated Use `ImageTransform` instead.
 */
type BasicImageTransformations = ImageTransform;

/**
 * Options to transform an image.
 */
interface ImageTransform {
  /**
   * Maximum image width in pixels, as an integer.
   */
  width?: number;
  /**
   * Maximum image height in pixels, as an integer.
   */
  height?: number;
  /**
   * Sets the image resizing mode.
   *
   *  * `contain`: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  * `scale-down`: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  * `cover`: Shrinks or enlarges to fill the entire area of width and
   *    height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  * `crop`: Shrinks and crops to fit within the area specified by width
   *    and height. The image won’t be enlarged. For images smaller than the
   *    given dimensions it’s the same as scale-down. For images larger than
   *    the given dimensions, it’s the same as cover.
   *  * `pad`: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is *not* recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   */
  fit?: 'contain' | 'scale-down' | 'cover' | 'crop' | 'pad';
  /**
   * Sets the gravity bias for image resizing. 
   *
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
  gravity?: 'auto' | 'left' | 'right' | 'top' | 'bottom' | 'center' | { x: number; y: number }; // TODO(reword)
  /**
   * Sets the background CSS color behind the image.
   *
   * This only applies to images that suport transparency, like PNG.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @example
   * '#c0c0c0'
   * 'rgb(255,0,153)'
   * 'hsl(270,60%,70%)'
   */
  background?: string;
  /**
   * Sets the degrees to rotate the image.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
  /**
   * Sets the device pixel ratio.
   *
   * By default, is 1.
   */
  dpr?: number;
  /**
   * Sets the image quality, between 1 (lowest, but fast) and 100
   * (best, but slower). This only applies to JPEG and WebP images.
   *
   * By default, is 85.
   */
  quality?: number;
  /**
   * Sets the image format.
   *
   *  * `avif`: Generate images in AVIF format.
   *  * `webp`: Generate images in Google's WebP format. Set quality to 100 to
   *    get the WebP-lossless format.
   *  * `json`: Generate information about the image, in JSON format.
   *    The object will contain image size before and after resizing,
   *    image’s MIME type, file size, etc.
   */
  format?: 'avif' | 'webp' | 'json';
  /**
   * Sets the EXIF metadata to be preserved.
   *
   * Rotation and embedded color profiles are always applied
   * ("baked in" into the image) and aren't affected by this option.
   *
   * If polish is enabled, the metadata may have already been removed, so
   * this option will have no effect.
   *
   *  * `keep`: Preserve most of EXIF metadata, including any GPS location.
   *  * `copyright`: Only keep the copyright tag and discard everything else.
   *    This is the default behavior for JPEG files.
   *  * `none`: Discard all invisible EXIF metadata. Currently WebP and PNG
   *    output formats always discard metadata.
   */
  metadata?: 'keep' | 'copyright' | 'none';
  /**
   * Overlays additional images onto the transformed image. The last overlay
   * is the top-most layer.
   */
  draw?: ImageOverlay[];
}

/**
 * Options to overlay an image onto another image.
 */
interface ImageOverlay extends Omit<ImageTransform, 'qpr' | 'quality' | 'format' | 'metadata'> {
  /**
   * Sets the absolute URL of the image overlay.
   *
   * For watermarks and non-rectangular images, PNG or WebP have the best
   * performance.
   */
  url: string;
  /**
   * Sets the opacity, between 0.0 (transparent) and 1.0 (opaque).
   */
  opacity?: number;
  /**
   * Sets whether the overlay should repeat in a pattern.
   *
   *  * `true`: the overlay is tiled to cover the entire image,
   *    similar to a stock-photo watermark.
   *  * `x`: the overlay is tiled in a horizontal line.
   *  * `y`: the overlay is tiled in a vertical line.
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
  top?: number; // TODO(wording)
  left?: number;
  bottom?: number;
  right?: number;
}

/**
 * @deprecated Use `RequestInitCf` instead.
 */
type RequestInitCfProperties = RequestInitCf;

/**
 * Extra options for how Cloudflare should handle a `Request`.
 */
interface RequestInitCf {
  /**
   * Sets the request to be cached regardless of the `Cache-Control`,
   * `Expires`, or `Vary` headers.
   */
  cacheEverything?: boolean;
  /**
   * Sets the time-to-live to cache the request, in seconds.
   */
  cacheTtl?: number;
  /**
   * Sets the time-to-live to cache the request based on the status code
   * of the response, in seconds.
   *
   * @requires Enterprise
   * @example
   * {
   *   '200-299': 3600, // if status is 2xx, cache for 1 hour
   *   '404': 60,       // if status is 404, cache for 1 minute
   *   '500-599': -1    // if status is 5xx, do not cache
   * }
   */
  cacheTtlByStatus?: { [key: string]: number };
  /**
   * Sets the cache key.
   *
   * A cache key is what determines whether two requests are "the same" for
   * caching purposes. If a request has the same cache key as a previous
   * request, that is cached, a new request will not be made.
   *
   * By default, the cache key is set to the request URL. Overriding this value
   * is useful for use-cases where identical data is requested from multiple
   * hostnames.
   *
   * @requires Enterprise
   */
  cacheKey?: string;
  /**
   * Redirects the request to an alternate origin server.
   *
   * If used, the request will be sent with a `Host` header matching
   * the original URL.
   *
   * For security reasons, the new hostname must be from the same Cloudflare
   * zone as the original hostname. If you need to resolve to an external
   * hostname, you must declare a CNAME record and ensure it proxies through
   * Cloudflare.
   */
  resolveOverride?: string;
  /**
   * Sets whether the request is processed by the Scrape Shield.
   *
   * @link https://support.cloudflare.com/hc/en-us/articles/200171036-What-does-Scrape-Shield-do-
   */
  scrapeShield?: boolean;
  /**
   * Sets whether the request is processed by Cloudflare Apps.
   *
   * @link https://www.cloudflare.com/apps/
   */
  apps?: boolean;
  /**
   * Sets whether certain assets should be automatically minified.
   *
   * @link https://blog.cloudflare.com/an-all-new-and-improved-autominify/
   */
  minify?: {
    javascript?: boolean;
    css?: boolean;
    html?: boolean;
  };
  /**
   * Sets whether to optimize images using client-side JavaScript.
   *
   * @link https://support.cloudflare.com/hc/en-us/articles/219178057-Configuring-Cloudflare-Mirage#overview
   */ 
  mirage?: boolean;
  /**
   * Sets the optimization level when processing images.
   *
   * @link https://developers.cloudflare.com/cache/best-practices/activate-polish
   */ 
  polish?: 'lossless' | 'lossy' | 'webp' | 'off';
  /**
   * Sets the image transformation options.
   */
  image?: ImageTransform;
}

/**
 * @deprecated Use `RequestInit` instead.
 */
interface CfRequestInit extends Omit<RequestInit, 'cf'> {
  cf?: RequestInitCf;
}

interface RequestInit {
  /**
   * Extra options for the request, handled by Cloudflare.
   */
  cf?: RequestInitCf;
}

interface WebSocket {
  /**
   * Notifies the runtime that this `WebSocket` will be handled by the
   * current Worker, instead of being proxied to another server. This is
   * nessecary because the Worker needs be pinned in-memory to respond to
   * incoming messages.
   */
  accept(): void;
}

interface Response {
  /**
   * If present, the response is a `WebSocket`.
   *
   * @example
   * async function connectToWebSocket(url) {
   *   const headers = { 'Upgrade': 'websocket' }
   *   const { webSocket } = await fetch(url, { headers })
   *
   *   if (webSocket) {
   *     // At this point, the handshake was successful.
   *     // To send/receive messages, invoke:
   *     webSocket.accept()
   *     webSocket.addEventListener('message', (event) => {
   *       console.log('Received data:', event.data)
   *     })
   *   }
   * }
   */
  webSocket?: WebSocket;
}

/**
 * A mechanism to create a `WebSocket` server.
 *
 * @example
 * async function receiveWebSocket(request) {
 *   if (request.headers.get('Upgrade') !== 'websocket') {
 *     return new Response('Expected upgrade', { status: 426 })
 *   }
 *
 *   const [serverWs, clientWs] = Object.values(new WebSocketPair())
 *   serverWs.accept()
 *   serverWs.addEventListener('message', (event) => {
 *     console.log('Received data from client:', event.data)
 *   })
 *
 *   return new Response(null, {
 *     status: 101,
 *     statusText: 'Switching Protocols'
 *     webSocket: clientWs
 *   })
 * }
 */
declare class WebSocketPair {
  /**
   * The first `WebSocket`.
   */
  0: WebSocket;
  /**
   * The second `WebSocket`.
   */
  1: WebSocket;
}

interface ContentOptions {
  /**
   * Sets the parsing method for inserted content.
   *
   *  * `true`: Inserted content is in raw HTML form.
   *  * `false`: By default, inserted content is escaped.
   */
  html: boolean;
}

interface Element {
  /**
   * The namespace URI of the element.
   *
   * @link https://infra.spec.whatwg.org/#namespaces
   * @example
   * 'http://www.w3.org/1999/xhtml' // HTML
   */
  namespaceURI: string;
  /**
   * The tag name.
   *
   * @example
   * 'div'
   */
  tagName: string;
  /**
   * The key-value attribute pairs.
   */
  readonly attributes: IterableIterator<[string, string]>;
  /**
   * If true, the element was either removed or replaced by a previous handler.
   */
  readonly removed: boolean;
  /**
   * Gets the value for a given attribute name on the element, 
   * or null if not found.
   */
  getAttribute(name: string): string | null;
  /**
   * Tests whether an attribute exists on the element.
   */
  hasAttribute(name: string): boolean;
  /**
   * Sets an attribute to a provided value, creating the attribute if it
   * doesn't exist.
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
   * Inserts content after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content after the start tag of the element.
   */
  prepend(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content before the end tag of the element.
   */
  append(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in its place.
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
   * Removes the start tag and end tag of the element,
   * but keeps its inner content intact.
   */
  removeAndKeepContent(): Element;
}

interface Text {
  /**
   * The text contents of the chunk.
   *
   * If `lastInTextNode` is true, this value could be empty.
   */
  readonly text: string;
  /**
   * Indicates whether the chunk is the last chunk in the text node.
   */
  readonly lastInTextNode: boolean;
  /**
   * Indicates whether the text was removed or replaced by a previous handler.
   */
  readonly removed: boolean;
  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in its place.
   */
  replace(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element with all its content.
   */
  remove(): Element;
}

interface Comment {
  /**
   * The text of the comment, which can be modified.
   */
  text: string;
  /**
   * Indicates whether the element was removed or replaced by a previous handler.
   */
  readonly removed: boolean;
  /**
   * Inserts content before the element.
   */
  before(content: string, options?: ContentOptions): Element;
  /**
   * Inserts content after the element.
   */
  after(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element and inserts content in its place.
   */
  replace(content: string, options?: ContentOptions): Element;
  /**
   * Removes the element with all its content.
   */
  remove(): Element;
}

/**
 * @deprecated Use `DocType` instead.
 */
type Doctype = DocType;

interface DocType {
  readonly name?: string; // TODO(detail)
  /**
   * The quoted string in the doctype after the PUBLIC atom.
   */
  readonly publicId?: string;
  /**
   * The quoted string in the doctype after the SYSTEM atom or
   * immediately after the `publicId`.
   */
  readonly systemId?: string;
}

interface DocumentEnd {
  /**
   * Inserts content after the end of the document.
   */
  append(content: string, options?: ContentOptions): DocumentEnd;
}

interface PartialElementHandler {
  /**
   * An incoming element, such as `div`.
   */
  element?(element: Element): void | Promise<void>;
  /**
   * An incoming comment.
   */
  comments?(comment: Comment): void | Promise<void>;
  /**
   * An incoming piece of text.
   */
  text?(text: Text): void | Promise<void>;
}

interface PartialDocumentHandler {
  /**
   * An incoming doctype, such as <!DOCTYPE html>.
   */
  doctype(doctype: DocType): void | Promise<void>;
  /**
   * An incoming comment.
   */
  comments(comment: Comment): void | Promise<void>;
  /**
   * An incoming piece of text.
   */
  text(text: Text): void | Promise<void>;
  /**
   * The ending of the document.
   */
  end(end: DocumentEnd): void | Promise<void>;
}

// See https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type ElementHandler = RequireAtLeastOne<PartialElementHandler, 'element' | 'comments' | 'text'>;
type DocumentHandler = RequireAtLeastOne<PartialDocumentHandler, 'doctype' | 'comments' | 'text' | 'end'>;

/**
 * A streaming HTML rewriter.
 *
 * @link https://blog.cloudflare.com/introducing-htmlrewriter/
 * @link https://github.com/cloudflare/lol-html
 */
declare class HTMLRewriter {
  /**
   * Creates a new HTML rewriter.
   */
  constructor();
  /**
   * Binds a CSS selector to an element handler.
   *
   * @param selector a CSS selector
   * @param handler an element handler
   * @link https://developers.cloudflare.com/workers/runtime-apis/html-rewriter#selectors
   */
  public on(selector: string, handler: ElementHandler): HTMLRewriter;
  /**
   * Binds a CSS selector to a document handler.
   *
   * @param selector a CSS selector
   * @param handler a document handler
   * @link https://developers.cloudflare.com/workers/runtime-apis/html-rewriter#selectors
   */
  public onDocument(handler: DocumentHandler): HTMLRewriter;
  /**
   * Rewrites the HTML response through the rewriter.
   *
   * @param response a response
   * @example
   * let rewriter = new HTMLRewriter()
   * let html = ```
   * <!DOCTYPE html>
   * <html>
   * <body><h1>Hello!</h1></body>
   * </html>```
   * let resp = new Response(html)
   * let transformed = rewriter.transfom(resp)
   */
  public transform(response: Response): Response;
}

declare interface CacheStorage {
  /**
   * The default `Cache` namespace.
   */
  default: Cache;
}

type KVValue<Value> = Promise<Value | null>;
type KVValueWithMetadata<Value, Metadata> = Promise<{
  value: Value | null;
  metadata: Metadata | null;
}>;

// TODO(refactor): use named interfaces instead of anonymous ones
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
    value: string | ReadableStream | ArrayBuffer,
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

/**
 * A Durable Object ID.
 */
 interface DurableObjectId {
  /**
   * The object name, if created using `idFromName`.
   */
  readonly name?: string;
  /**
   * Formats as a 64-digit hex ID.
   */
  toString(): string;
}

/**
 * A stub that can send a `Request` to a remote Durable Object.
 */
 interface DurableObjectStub {
  /**
   * The object ID.
   */
  readonly id: DurableObjectId;
  /**
   * The object name, if created using `idFromName`.
   */
  readonly name?: string;
  /**
   * Sends a request to the Durable Object.
   *
   * @param input the request input
   * @param init the request init
   */
  fetch(input: RequestInfo, init?: RequestInit | Request): Promise<Response>;
}

// TODO(detail)
interface DurableObjectEntries<T> {
  [key: string]: T;
}

// TODO(detail)
interface DurableObjectListOptions {
  start?: string;
  end?: string;
  reverse?: boolean;
  limit?: number;
  prefix?: string;
}

// TODO(detail)
// TODO(new): https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
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

// TODO(detail)
interface DurableObjectTransaction extends DurableObjectOperator {
  rollback(): void;
}

// TODO(detail)
interface DurableObjectStorage extends DurableObjectOperator {
  transaction(
    closure: (txn: DurableObjectTransaction) => Promise<void>
  ): Promise<void>;
}

/**
 * @deprecated Use `DurableObjectContext` instead.
 */
type DurableObjectState = DurableObjectContext;

/**
 * The Durable Object context.
 */
interface DurableObjectContext extends Context {
  /**
   * The object ID.
   */
  readonly id: DurableObjectId;
  /**
   * The persistent object storage.
   */
  readonly storage: DurableObjectStorage;
}

/**
 * A `DurableObject` is a class that defines the template for each
 * Durable Object.
 */
declare abstract class DurableObject<Environment = unknown> {
  /**
   * Creates the object.
   *
   * @param ctx the object context
   * @param env the object environment (user-defined)
   */
  constructor(ctx: DurableObjectContext, env: Environment);
  /**
   * Responds to a request sent to the object.
   *
   * @param request a request
   */
  fetch(request: Request): Response | Promise<Response>;
}

/**
 * Options when creating a Durable Object.
 */
interface DurableObjectCreateOptions {
  /**
   * Sets a regional jurisdiction, which restricts the Durable Object to only
   * exist in datacenters that match the jurisdiction.
   *
   * Currently, only `eu` (European Union) is supported.
   *
   * @link https://blog.cloudflare.com/supporting-jurisdictional-restrictions-for-durable-objects/
   */
  jurisdiction?: string;
}

/**
 * A Durable Object namespace.
 *
 * @link https://blog.cloudflare.com/introducing-workers-durable-objects/
 */
interface DurableObjectNamespace {
  /**
   * Creates a new, globally-unique Durable Object ID.
   *
   * This is the fastest way to create an ID and is recommended
   * over using `idFromName`.
   *
   * @param options the creation options
   */
  newUniqueId(options?: DurableObjectCreateOptions): DurableObjectId;
  /**
   * Gets or creates a Durable Object ID, based on a given name.
   *
   * This is useful when you need to get or create a Durable Object that is
   * based on another unique ID or foreign key. For example, if you have an
   * existing application that stores a UUID for each user, you would likely
   * want to invoke `idFromName(UUID)`. This operation is automatically cached
   * by the runtime, so you should not implement your own cache.
   *
   * @param name the name
   */
  idFromName(name: string): DurableObjectId;
  /**
   * Gets a durable object ID from its hex ID.
   *
   * @param hexId the 64-digit hex ID
   * @throws if the object ID does not exist
   */
  idFromString(hexId: string): DurableObjectId;
  /**
   * Gets a stub to send requests to the Durable Object.
   * 
   * @param id a durable object ID
   * @throws if the object ID does not exist
   */
  get(id: DurableObjectId): DurableObjectStub;
}

interface ToIterable<K, V> {
  [Symbol.iterator](): IterableIterator<[K, V]>;
  /**
   * Returns an array of key, value pairs for every entry in the list.
   */
  entries(): IterableIterator<[K, V]>;
  /**
   * Returns a list of keys in the list.
   */
  keys(): IterableIterator<K>;
  /**
   * Returns a list of values in the list.
   */
  values(): IterableIterator<V>;
}

interface FormData extends ToIterable<string, FormDataEntryValue> {}

interface Headers extends ToIterable<string, string> {}

interface URLSearchParams extends ToIterable<string, string> {}
