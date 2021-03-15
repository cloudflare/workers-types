/** Provides a storage mechanism for Request / Response object pairs that are cached, for example as part of the ServiceWorker life cycle. Note that the Cache interface is exposed to windowed scopes as well as workers. You don't have to use it in conjunction with service workers, even though it is defined in the service worker spec. */
interface Cache {
  delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>
  match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>
  put(request: RequestInfo, response: Response): Promise<void>
}

interface CacheQueryOptions {
  ignoreMethod?: boolean
}

//TODO: Can't set this to readonly because it isn't set that way in the @cloudflare/workers-type
interface CacheStorage {
  /*readonly */ default: Cache
}

declare var caches: CacheStorage
