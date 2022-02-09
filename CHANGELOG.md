# Changelog

## 3.4.0

### Minor Changes

- [#186](https://github.com/cloudflare/workers-types/pull/186) [`c117b5a`](https://github.com/cloudflare/workers-types/commit/c117b5a4874bcd7effdba0bc57fc74878f5faaa1) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-01-19

* [#194](https://github.com/cloudflare/workers-types/pull/194) [`74c94f8`](https://github.com/cloudflare/workers-types/commit/74c94f8f96fa427353acd60ebc00d910f8e7cdfe) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-02-08

### Patch Changes

- [#175](https://github.com/cloudflare/workers-types/pull/175) [`17d21e9`](https://github.com/cloudflare/workers-types/commit/17d21e9ae7cfee0c5d6ca4bf247978e5618c0386) Thanks [@threepointone](https://github.com/threepointone)! - fix: FormData::entries(), FormData::[Symbol.iterator]()

* [#184](https://github.com/cloudflare/workers-types/pull/184) [`f1c3c40`](https://github.com/cloudflare/workers-types/commit/f1c3c40f4050b7d5b5c74c93ac2b583afc44f350) Thanks [@threepointone](https://github.com/threepointone)! - chore: update marked to 4.0.10

## 3.3.1

### Patch Changes

- [`d7c4f73`](https://github.com/cloudflare/workers-types/commit/d7c4f7399594775863454609dffd4aa6349b4c39) Thanks [@threepointone](https://github.com/threepointone)! - via #178, thanks @kulla: Add possibility to narrow down key space of KVNamespace

* [#170](https://github.com/cloudflare/workers-types/pull/170) [`771ce75`](https://github.com/cloudflare/workers-types/commit/771ce7591e63bf47f36b39d60afb86e1fe8d404b) Thanks [@JacobMGEvans](https://github.com/JacobMGEvans)! - CI/CD Improvements:

  - Added Changeset PR creation & publish Workflows
  - Added Typechecking workflow
  - Consolidated old workflows as jobs in new workflows
  - Added configuration for Changeset CLI
  - Installing Changeset bot for non-blocking PR support

- [#181](https://github.com/cloudflare/workers-types/pull/181) [`0dc3fe4`](https://github.com/cloudflare/workers-types/commit/0dc3fe4def04e4127be065c5d88fd45865caeb64) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-01-15

## 3.3.0

- **Updated types for 2021-12-14 [vlovich]**
- **Updated types for 2021.12.300 [vlovich]**
- **Updated types for 2021.12.100 [vlovich]**
- **Adds env.ASSETS.fetch typings [@GregBrimble][pull/157]**
- **Adding missing types in RequestInitCfPropertiesImage [@itsmatteomanf][pull/156]**

## 3.2.0

- **Add 'error' WebSocket event types overrides [@bretthoerner], [pull/143] & [pull/150]**
- **Add PagesFunction type [@GregBrimble], [pull/154]**
- **Updated types for 2021.11.400 [@autodecl-bot], [pull/145]**
- **Updated types for 2021.11.700 [@autodecl-bot], [pull/149]**

## 3.1.1

- **Add `polish` key to `RequestInitCfProperties` - [@threepointone], [pull/131]**
- **Added support for gravity: 'auto' to BasicImageTransformations - [@threepointone], [@@jonnedeprez], [pull/132]**
- **Fixup DurableObject options names - [@vlovich], [pull/136]**
- **Fixes for some crypto APIs - [@vlovich], [pull/137]**

## 3.1.0

### Features

- **Updated types for 2021.10.800 - [@autodecl-bot], [pull/120]**
- **Preserve the `@deprecated` tag when generating types - [@vlovich], [pull/123]**
- **Cleanup unneeded overrides and replace with standard names - [@vlovich], [pull/123]**
- **Support merging overrides automatically - [@vlovich], [pull/126]**
- **Updated types for 2021.11.0 - [@autodecl-bot], [pull/128]**

### Bugfixes

- **DurableObjectState storage should not be undefined in practice - [@koeninger], [pull/118]**
- **Add `asOrganization` to `IncomingRequestCfProperties` - [@mrkldshv], [pull/111]**

## 3.0.0

### Features

- **Types are automatically generated from the runtime - [@mrbbot], [pull/112]**
  Types now match exactly what's defined in the runtime source code, meaning `webworker` should be removed from users' `tsconfig.json`s

  [@mrbbot]: https://github.com/mrbbot
  [pull/112]: https://github.com/cloudflare/workers-types/pull/112

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

  [@gregbrimble]: https://github.com/GregBrimble
  [pull/59]: https://github.com/cloudflare/workers-types/pull/59

- **Add metadata typings for KV - [@GregBrimble], [pull/54]**
  Adds the [new metadata](https://developers.cloudflare.com/workers/runtime-apis/kv#metadata) types to the getWithMetadata, put and list methods on a KV namespace.

  [@gregbrimble]: https://github.com/GregBrimble
  [pull/54]: https://github.com/cloudflare/workers-types/pull/54

- **Complete Image Resizing properties - [@GregBrimble], [pull/50]**
  Adds missing options for the Image Resizing API.

  [@gregbrimble]: https://github.com/GregBrimble
  [pull/50]: https://github.com/cloudflare/workers-types/pull/50

- **Add API for async handlers and end handler - [@ObsidianMinor], [pull/48]**
  Types for [HTML Rewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter#end) end of document append method

  [@obsidianminor]: https://github.com/ObsidianMinor
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
  import {} from "@cloudflare/workers-types";
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
  fetch(event.request, { cf: { cacheTtl: 300 } });

  // Force response to be cached for 86400 seconds for 200 status codes, 1 second for 404, and do not cache 500 errors
  fetch(request, {
    cf: { cacheTtlByStatus: { "200-299": 86400, "404": 1, "500-599": 0 } }
  });
  ```

  Read more about these properties in the [`Request` docs](https://developers.cloudflare.com/workers/reference/apis/request/).

  [@trjstewart]: https://github.com/trjstewart
  [pull/17]: https://github.com/cloudflare/workers-types/pull/17
  [issue/22]: https://github.com/cloudflare/workers-types/issues/22

- **Add support for `caches.default` - [@ispivey], [@ashnewmanjones], [issue/8], [pull/21]**

  The Workers runtime exposes a default global cache as `caches.default`, accessed like:

  ```typescript
  let cache = caches.default;
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
  new Request(parsedUrl.toString(), request);
  ```

  This is because the `cf` object on inbound Request objects, and that expected in the `init` dictionary arg to the Request constructor, have a different shape.

  This change creates explicit `IncomingRequestCfProperties` (inbound) and `RequestInitCfProperties` (outbound) interfaces, and updates the `Request` constructor to accept either type:

  ```typescript
  interface RequestInit {
    cf?: RequestInitCfProperties | IncomingRequestCfProperties;
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
  await NAMESPACE.list({});
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
