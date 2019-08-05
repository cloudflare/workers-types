interface FetchEvent {
  passThroughOnException: () => void
}

interface RequestInit {
  cf?: {
    cacheEverything?: boolean
    scrapeShield?: boolean
    apps?: boolean
    minify?: boolean
    mirage?: boolean
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
    resolveOverride?: string
  }
}

declare function addEventListener(
  type: 'fetch',
  handler: (event: FetchEvent) => void,
): undefined | null | Response | Promise<Response>

interface Request {
  /**
   * In addition to the properties on the standard Request object,
   * you can use a request.cf object to control how Cloudflare
   * features are applied as well as other custom information provided
   * by Cloudflare.
   *
   * Note: Currently, settings in the cf object cannot be tested in the
   * playground.
   */
  cf: {
    /**
     *  (e.g. 395747)
     */
    asn: string
    city: string
    clientTrustScore: number
    /**
     * The three-letter airport code of the data center that the request
     * hit. (e.g. "DFW")
     */
    colo: string
    continent: string
    /**
     * The two-letter country code in the request. This is the same value
     * as that provided in the CF-IPCountry header. (e.g. "US")
     */
    country: string
    httpProtocol: string
    latitude: number
    longitude: number
    postalCode: string
    /**
     * e.g. "Texas"
     */
    region: string
    /**
     * e.g. "TX"
     */
    regionCode: string
    /**
     * e.g. "weight=256;exclusive=1"
     */
    requestPriority: string
    /**
     * e.g. "America/Chicago"
     */
    timezone: string
    tlsVersion: string
    tlsCipher: string
    tlsClientAuth: {
      certIssuerDNLegacy: string
      certIssuerDN: string
      certPresented: '0' | '1'
      certSubjectDNLegacy: string
      certSubjectDN: string
      certNotBefore: string // In format "Dec 22 19:39:00 2018 GMT"
      certNotAfter: string // In format "Dec 22 19:39:00 2018 GMT"
      certSerial: string
      certFingerprintSHA1: string
      certVerified: string // “SUCCESS”, “FAILED:reason”, “NONE”
    }
  }
}

declare module '@cloudflare/workers-types' {
  export interface KVNamespace {
    get(key: string, type?: 'text'): Promise<string>
    get(key: string, type?: 'json'): Promise<object>
    get(key: string, type?: 'arrayBuffer'): Promise<ArrayBuffer>
    get(key: string, type?: 'stream'): Promise<ReadableStream>
    get(key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream'): Promise<any>

    put(key: string, value: string | ReadableStream | ArrayBuffer | FormData): Promise<void>

    delete(key: string): Promise<void>

    list(options: {prefix?: string, limit?: number, cursor?: string}): Promise<{
      keys: { name: string; expiration?: number }[];
      list_complete: boolean;
      cursor: string;
    }>
  }
}
