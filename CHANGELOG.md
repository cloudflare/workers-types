# Changelog

## 2.2.2

### Features

- **Add KVNamespace.get options parameter, with cacheTtl - [@bretthoerner], [pull/87]**

### Bugfixes

- **fix DurableObjectStorage transaction method signature - [@sbfaulkner], [pull/89]**

## 2.1.0

### Features

- **Add types for Durable Objects - [@mathew-cf], [pull/63], [issue/64]**
  Types for [Durable Objects Beta](https://developers.cloudflare.com/workers/runtime-apis/durable-objects), subject to change.

  [@mathew-cf]: https://github.com/mathew-cf
  [pull/63]: https://github.com/cloudflare/workers-types/pull/63
  [issue/64]: https://github.com/cloudflare/workers-types/issues/64

- **Add ScheduledEvent - [@qwtel], [pull/61]**
  Types for [Scheduled Events](https://developers.cloudflare.com/workers/runtime-apis/scheduled-event)

  [@qwtel]: https://github.com/qwtel
  [pull/61]: https://github.com/cloudflare/workers-types/pull/61

- **Add AVIF Format for Image Resizing - [@GregBrimble], [pull/59]**

  [@GregBrimble]: https://github.com/GregBrimble
  [pull/59]: https://github.com/cloudflare/workers-types/pull/59

- **Add metadata typings for KV - [@GregBrimble], [pull/54]**
  Adds the [new metadata](https://developers.cloudflare.com/workers/runtime-apis/kv#metadata) types to the getWithMetadata, put and list methods on a KV namespace.

  [@GregBrimble]: https://github.com/GregBrimble
  [pull/54]: https://github.com/cloudflare/workers-types/pull/54

- **Complete Image Resizing properties - [@GregBrimble], [pull/50]**
  Adds missing options for the Image Resizing API.

  [@GregBrimble]: https://github.com/GregBrimble
  [pull/50]: https://github.com/cloudflare/workers-types/pull/50

- **Add API for async handlers and end handler - [@ObsidianMinor], [pull/48]**
  Types for [HTML Rewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter#end) end of document append method

  [@ObsidianMinor]: https://github.com/ObsidianMinor
  [pull/48]: https://github.com/cloudflare/workers-types/pull/48

### Bugfixes

- **Make Element.attributes iterable - [@jdanyow], [pull/47]**

  Fixing a bug in the type definitions that prevents writing valid code like this:

  ```typescript
  rewriter.on('bla', {
    element: element => {
      for (const [name, value] of element.attributes) {
  ```

  [@jdanyow]: https://github.com/jdanyow
  [pull/47]: https://github.com/cloudflare/workers-types/pull/47

### Maintenance

- **Update README.md instructions to avoid typescript error - [@jeremistadler], [pull/60]**
  Add empty export to bindings.d.ts example to avoid an typescript error

  [@jeremistadler]: https://github.com/jeremistadler
  [pull/60]: https://github.com/cloudflare/workers-types/pull/60

- **Add a GitHub action to lint the Markdown - [@jbampton],[pull/51]**

  [@jbampton]: https://github.com/jbampton
  [pull/51]: https://github.com/cloudflare/workers-types/pull/51

- **Fix spelling - [@jbampton],[pull/50]**

  [@jbampton]: https://github.com/jbampton
  [pull/50]: https://github.com/cloudflare/workers-types/pull/50

- **Add CODEOWNERS - [@ispivey], [pull/49]**
  This will ensure we have default reviewers.

  [@ispivey]: https://github.com/ispivey
  [pull/48]: https://github.com/cloudflare/workers-types/pull/48

- **Add prettier and typescript as devDependencies - [@1000hz], [pull/46]**
  Automated formatting via prettier

  [@1000hz]: https://github.com/1000hz
  [pull/46]: https://github.com/cloudflare/workers-types/pull/46

## ⌨️ 2.0.0

### Breaking Changes

- **Types now only provided via automatic type inclusion, rather than explicit import - [@jdanyow], [issue/33], [pull/34]**

  Users should no longer use an empty import to include `workers-types`, which used to be the recommendation in the README.

  Remove this from your code:

  ```typescript
  import {} from '@cloudflare/workers-types'
  ```

  And instead include the types explicitly in your TypeScript configuration compiler options:

  ```json
  {
    "compilerOptions": {
      "types": ["@cloudflare/workers-types"]
    }
  }
  ```

  [@jdanyow]: https://github.com/jdanyow
  [pull/34]: https://github.com/cloudflare/workers-types/pull/34
  [issue/33]: https://github.com/cloudflare/workers-types/issues/33

### Features

- **Add Cache behavior modifiers to outbound Requests - [@trjstewart], [issue/22], [pull/17]**

  When constructing a request, you can now include the following cache-manipulating properties in the initializer dictionary:

  ```typescript
  // Force response to be cached for 300 seconds.
  fetch(event.request, { cf: { cacheTtl: 300 } })

  // Force response to be cached for 86400 seconds for 200 status codes, 1 second for 404, and do not cache 500 errors
  fetch(request, { cf: { cacheTtlByStatus: { '200-299': 86400, '404': 1, '500-599': 0 } } })
  ```

  Read more about these properties in the [`Request` docs](https://developers.cloudflare.com/workers/reference/apis/request/).

  [@trjstewart]: https://github.com/trjstewart
  [pull/17]: https://github.com/cloudflare/workers-types/pull/17
  [issue/22]: https://github.com/cloudflare/workers-types/issues/22

- **Add support for `caches.default` - [@ispivey], [@ashnewmanjones], [issue/8], [pull/21]**

  The Workers runtime exposes a default global cache as `caches.default`, accessed like:

  ```typescript
  let cache = caches.default
  ```

  This is an extension to the [Service Workers spec for `CacheStorage`](https://w3c.github.io/ServiceWorker/#cachestorage), and thus needed to be added explicitly to our type definitions.

  [@ispivey]: https://github.com/ispivey
  [@ashnewmanjones]: https://github.com/ashnewmanjones
  [pull/21]: https://github.com/cloudflare/workers-types/pull/21
  [issue/8]: https://github.com/cloudflare/workers-types/issues/8

- **Add missing properties to inbound `Request` `cf` object - [@ispivey], [@brycematheson1234], [issue/23], [pull/24], [pull/35]**

  Adds:

  - `clientTcpRtt`
  - `metroCode`
  - `botManagement.score`
  - `botManagement.staticResource`
  - `botManagement.verifiedBot`

  Makes most geolocation properties optional, because they are not guaranteed to be set on every request.

  Changes the type of `asn` from string to number.

  [@ispivey]: https://github.com/ispivey
  [@brycematheson1234]: https://github.com/brycematheson1234
  [issue/23]: https://github.com/cloudflare/workers-types/issues/23
  [pull/24]: https://github.com/cloudflare/workers-types/pull/24
  [pull/35]: https://github.com/cloudflare/workers-types/pull/35

- **Adds `cf.cacheKey` property to `RequestInit` - [@ispivey], [issue/22], [pull/28]**

  Adds the `cacheKey` property of the `cf` object to the `RequestInit` interface.

  [@ispivey]: https://github.com/ispivey
  [pull/28]: https://github.com/cloudflare/workers-types/pull/28
  [issue/22]: https://github.com/cloudflare/workers-types/issues/22

- **Allow passing another Request as the `init` arg to `Request` constructor - [@ispivey], [issue/15], [pull/18]**

  Previously, this pattern wasn't allowed:

  ```typescript
  new Request(parsedUrl.toString(), request)
  ```

  This is because the `cf` object on inbound Request objects, and that expected in the `init` dictionary arg to the Request constructor, have a different shape.

  This change creates explicit `IncomingRequestCfProperties` (inbound) and `RequestInitCfProperties` (outbound) interfaces, and updates the `Request` constructor to accept either type:

  ```typescript
  interface RequestInit {
    cf?: RequestInitCfProperties | IncomingRequestCfProperties
  }
  ```

  Read more about the `Request` constructor in the [`Request` docs](https://developers.cloudflare.com/workers/reference/apis/request/).

  [@ispivey]: https://github.com/ispivey
  [pull/18]: https://github.com/cloudflare/workers-types/pull/18
  [issue/15]: https://github.com/cloudflare/workers-types/issues/15

- **Add `CfRequestInit` type - [@third774], [issue/37], [pull/44]**

  Because of the union mentioned above, if an object is declared as `RequestInit` and sets the `cf` property, subproperties of `cf` can not later be reassigned. For this scenario, a more specific `CfRequestInit` type has been introduced to use instead of `RequestInit` that doesn't exhibit the same assignability issues.

  [@third774]: https://github.com/third774
  [pull/44]: https://github.com/cloudflare/workers-types/pull/44
  [issue/37]: https://github.com/cloudflare/workers-types/issues/37

- **Add iterable methods to `FormData`, `Headers`, and `URLSearchParams` - [@ispivey], [issue/25], [pull/26]**

  The iterable methods `entries()`, `keys()` and `values()` are not present on these three types in `lib.webworker.d.ts`. They are instead supplied in `lib.dom.iterable.d.ts`.

  However, as discussed in this issue on the TypeScript repo, `lib.dom.d.ts` and `lib.webworker.d.ts` have conflicting type definitions, and the maintainers hope to solve this issue by refactoring shared components into a new `web.iterable.d.ts` lib: [https://github.com/microsoft/TypeScript/issues/32435#issuecomment-624741120](https://github.com/microsoft/TypeScript/issues/32435#issuecomment-624741120)

  Until then, we will include the iterable methods supported by Workers in our own type definitions.

  [@ispivey]: https://github.com/ispivey
  [pull/26]: https://github.com/cloudflare/workers-types/pull/26
  [issue/25]: https://github.com/cloudflare/workers-types/issues/25

### Bugfixes

- **Remove `selector` parameter from `onDocument()` - [@jdanyow], [pull/41]**

  The type signature for HTMLRewriter's `onDocument()` method previously erroneously included a `selector` parameter as its first argument. This has been removed.

  [@jdanyow]: https://github.com/jdanyow
  [pull/41]: https://github.com/cloudflare/workers-types/pull/41

- **Make `KVNamespace.list()` options argument optional - [@motiejunas], [pull/10]**

  Previously, the `KVNamespace` interface required that callers provide an empty options object when listing all the keys in a namespace, like so:

  ```typescript
  await NAMESPACE.list({})
  ```

  However, this argument is not actually required. This change updates the interface to match the runtime.

  [@motiejunas]: https://github.com/motiejunas
  [pull/10]: https://github.com/cloudflare/workers-types/pull/10

### Maintenance

- **Add a Release Checklist - [@ispivey], [issue/20], [pull/27]**

  As we onboard more contributors, we're documenting release procedures.

  [@ispivey]: https://github.com/ispivey
  [pull/27]: https://github.com/cloudflare/workers-types/pull/27
  [issue/20]: https://github.com/cloudflare/workers-types/issues/20

- **Add BSD-3 License - [@ispivey], [issue/31], [pull/30], [pull/40]**

  As we transition this to a project supported by the Cloudflare Workers team, we're releasing the code under a BSD-3 license. Thanks to all the contributors for their help!

  [@ispivey]: https://github.com/ispivey
  [pull/30]: https://github.com/cloudflare/workers-types/pull/30
  [pull/40]: https://github.com/cloudflare/workers-types/pull/40
  [issue/31]: https://github.com/cloudflare/workers-types/issues/31
