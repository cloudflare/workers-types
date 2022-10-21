// TODO: add Response cf object too

declare class Request extends Body {
  /**
   * In addition to the properties on the standard `Request` object,
   * the `cf` object contains extra information about the request provided
   * by Cloudflare's edge.
   *
   * Returns undefined when accessed in the playground.
   */
  readonly cf?: IncomingRequestCfProperties;
}

interface RequestInit {
  /**
   * cf is a union of these two types because there are multiple
   * scenarios in which it might be one or the other.
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

interface CfRequestInit extends Omit<RequestInit, "cf"> {
  cf?: RequestInitCfProperties;
}

/**
 * Back compat support with older types.
 * @deprecated Use CfRequestInit instead.
 */
type CfRequestInitializerDict = CfRequestInit;

export {};
