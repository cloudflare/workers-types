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
  asn: number
  botManagement?: {
    score: number
    staticResource: boolean
    verifiedBot: boolean
  }
  city?: string
  clientTcpRtt: number
  clientTrustScore?: number
  /**
   * The three-letter airport code of the data center that the request
   * hit. (e.g. "DFW")
   */
  colo: string
  continent?: string
  /**
   * The two-letter country code in the request. This is the same value
   * as that provided in the CF-IPCountry header. (e.g. "US")
   */
  country: string
  httpProtocol: string
  latitude?: string
  longitude?: string
  /**
   * DMA metro code from which the request was issued, e.g. "635"
   */
  metroCode?: number
  postalCode?: string
  /**
   * e.g. "Texas"
   */
  region?: string
  /**
   * e.g. "TX"
   */
  regionCode?: string
  /**
   * e.g. "weight=256;exclusive=1"
   */
  requestPriority: string
  /**
   * e.g. "America/Chicago"
   */
  timezone?: string
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

interface CfRequestInit extends Omit<RequestInit, 'cf'> {
  cf?: RequestInitCfProperties
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
  cf?: IncomingRequestCfProperties | RequestInitCfProperties
}

interface Request {
  cf: IncomingRequestCfProperties
}

interface FormData {
  [Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]>
  /**
   * Returns an array of key, value pairs for every entry in the list.
   */
  entries(): IterableIterator<[string, FormDataEntryValue]>
  /**
   * Returns a list of keys in the list.
   */
  keys(): IterableIterator<string>
  /**
   * Returns a list of values in the list.
   */
  values(): IterableIterator<FormDataEntryValue>
}

interface Headers {
  [Symbol.iterator](): IterableIterator<[string, string]>
  /**
   * Returns an iterator allowing to go through all key/value pairs contained in this object.
   */
  entries(): IterableIterator<[string, string]>
  /**
   * Returns an iterator allowing to go through all keys of the key/value pairs contained in this object.
   */
  keys(): IterableIterator<string>
  /**
   * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
   */
  values(): IterableIterator<string>
}

interface URLSearchParams {
  [Symbol.iterator](): IterableIterator<[string, string]>
  /**
   * Returns an array of key, value pairs for every entry in the search params.
   */
  entries(): IterableIterator<[string, string]>
  /**
   * Returns a list of keys in the search params.
   */
  keys(): IterableIterator<string>
  /**
   * Returns a list of values in the search params.
   */
  values(): IterableIterator<string>
}
