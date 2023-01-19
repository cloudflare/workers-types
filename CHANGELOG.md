# Changelog

## 3.19.0

### Minor Changes

- [`0edd92e`](https://github.com/cloudflare/workers-types/commit/0edd92ef75b20bc9869d06d58ac4a190928f3e91) Thanks [@mrbbot](https://github.com/mrbbot)! - Merge and make optional all `IncomingRequestCfPropertiesGeographicInformation` properties

### Patch Changes

- [#314](https://github.com/cloudflare/workers-types/pull/314) [`59b3f55`](https://github.com/cloudflare/workers-types/commit/59b3f5599dd0240b750fbde4abdb7277178af72b) Thanks [@GregBrimble](https://github.com/GregBrimble)! - feat: Add `passThroughOnException()` to Pages Functions

## 3.18.0

### Minor Changes

- [#307](https://github.com/cloudflare/workers-types/pull/307) [`0721beb`](https://github.com/cloudflare/workers-types/commit/0721bebe14bcf4f70e90d24f147dcd805a3f4d5e) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-10-21

### Patch Changes

- [#301](https://github.com/cloudflare/workers-types/pull/301) [`17b6d16`](https://github.com/cloudflare/workers-types/commit/17b6d16e2b7d0e8605ae0ed2e704336ef89c2c47) Thanks [@caass](https://github.com/caass)! - Improve the `IncomingRequestCfProperties` type.

  Previously, this type was based on our docs, which didn't include some fields. Now we've gone through the code that generates these fields and ensured that every property matches up.

  Additionally, we added examples and documentation for almost everything, so it should be more clear exactly what a certain property is or isn't.

## 3.17.0

### Minor Changes

- [#294](https://github.com/cloudflare/workers-types/pull/294) [`fba318b`](https://github.com/cloudflare/workers-types/commit/fba318b33a13be2807e04849aac00b62ca8f0679) Thanks [@Frederik-Baetens](https://github.com/Frederik-Baetens)! - Updated auto-generated types @ 2022-10-13

### Patch Changes

- [#280](https://github.com/cloudflare/workers-types/pull/280) [`6e55069`](https://github.com/cloudflare/workers-types/commit/6e550691955478fac33e960bfafe32738bda6016) Thanks [@WalshyDev](https://github.com/WalshyDev)! - Make clientTcpRtt optional

* [#288](https://github.com/cloudflare/workers-types/pull/288) [`4fe75b2`](https://github.com/cloudflare/workers-types/commit/4fe75b2cfc2b58f1cc7e84923ce8be47ae0a93eb) Thanks [@florianmartens](https://github.com/florianmartens)! - Add 'origin-auth' to RequestInitCfPropertiesImage interface. This changes fixes types for users attempting to fetch images from authenticated sources. Before this fix, users had to manually extend the fetch interface to satisfy the TS compiler.

- [#275](https://github.com/cloudflare/workers-types/pull/275) [`c9e2084`](https://github.com/cloudflare/workers-types/commit/c9e2084294d07fccfbcb33c2da281415204083c9) Thanks [@KianNH](https://github.com/KianNH)! - chore: add corporateProxy to request.cf.botManagement

* [#285](https://github.com/cloudflare/workers-types/pull/285) [`b6a5d1a`](https://github.com/cloudflare/workers-types/commit/b6a5d1a040543ce3a37c3aea71fab30dc8cb90d9) Thanks [@sid405](https://github.com/sid405)! - Fix return type of D1PreparedStatement.all

## 3.16.0

### Minor Changes

- [#273](https://github.com/cloudflare/workers-types/pull/273) [`bc80605`](https://github.com/cloudflare/workers-types/commit/bc8060518241fa858765cf5bff48f4115289d009) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-08-30

## 3.15.0

### Minor Changes

- [#265](https://github.com/cloudflare/workers-types/pull/265) [`6cac151`](https://github.com/cloudflare/workers-types/commit/6cac15126701c53b7d988fd4d3dab76d5755b6ce) Thanks [@geelen](https://github.com/geelen)! - Added D1 binding types

### Patch Changes

- [#259](https://github.com/cloudflare/workers-types/pull/259) [`38b7e0f`](https://github.com/cloudflare/workers-types/commit/38b7e0fba83f01654a00b0d805cd01211a419f3d) Thanks [@vlovich](https://github.com/vlovich)! - Fix DurableObject transaction `get` to properly return `Promise<T | undefined>` instead of `Promise<T>`

## 3.14.1

### Patch Changes

- [#245](https://github.com/cloudflare/workers-types/pull/245) [`bf5d870`](https://github.com/cloudflare/workers-types/commit/bf5d870b4e1466291c3cbdcba3001ab28f3ea400) Thanks [@jacobbednarz](https://github.com/jacobbednarz)! - Added support for `isEUCountry` property on `IncomingRequestCfProperties`

## 3.14.0

### Minor Changes

- [#253](https://github.com/cloudflare/workers-types/pull/253) [`f45703c`](https://github.com/cloudflare/workers-types/commit/f45703cca6996f057c3ab1dceaea53f6f760471c) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-06-20

* [#256](https://github.com/cloudflare/workers-types/pull/256) [`9b4290b`](https://github.com/cloudflare/workers-types/commit/9b4290b30eef9683209afd32ef14ed208554f32f) Thanks [@Kellel](https://github.com/Kellel)! - Update tlsClientAuth properties

## 3.13.0

### Minor Changes

- [#251](https://github.com/cloudflare/workers-types/pull/251) [`e146987`](https://github.com/cloudflare/workers-types/commit/e146987bb996733f67c38313221d71aa47293c76) Thanks [@vlovich](https://github.com/vlovich)! - Updated auto-generated types @ 2022-06-16

## 3.12.0

### Minor Changes

- [#247](https://github.com/cloudflare/workers-types/pull/247) [`2cdc8cf`](https://github.com/cloudflare/workers-types/commit/2cdc8cffd7086941e03125d9d95bd9a869a837a3) Thanks [@iveelsm](https://github.com/iveelsm)! - Allow for cacheTags to be passed on fetch requests

  Allowing cacheTags within the workers process to be processed as part of a standard fetch has been a highly requested feature. This new object within the request initialization will allow for supplemental Cache-Tag headers to be returned so that they can be stored with the relevant content. This will allow for better control over Purge by Tag mechanisms within the workers processes.

  Implementation:

  - Adds a new object to the `cf.d.ts` declaration.

## 3.11.0

### Minor Changes

- [#236](https://github.com/cloudflare/workers-types/pull/236) [`9409be6`](https://github.com/cloudflare/workers-types/commit/9409be6c83e1f93af074ebf4cd9cdcb3af5cff1c) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-05-11

## 3.10.0

### Minor Changes

- [#230](https://github.com/cloudflare/workers-types/pull/230) [`ceec72b`](https://github.com/cloudflare/workers-types/commit/ceec72b6cb5baad74507d613eb3088f6e12778e4) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-05-04

* [#232](https://github.com/cloudflare/workers-types/pull/232) [`97499a2`](https://github.com/cloudflare/workers-types/commit/97499a29c56c345cb92c412bcf03af0f1743293f) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-05-05

- [#234](https://github.com/cloudflare/workers-types/pull/234) [`18ca7fc`](https://github.com/cloudflare/workers-types/commit/18ca7fca0e341ef6a337594207c5a65aac75e2d4) Thanks [@GregBrimble](https://github.com/GregBrimble)! - feat: Adds the Pages Functions asset imports type. More info on [our docs](https://developers.cloudflare.com/pages/platform/functions/plugins/).

### Patch Changes

- [#235](https://github.com/cloudflare/workers-types/pull/235) [`a919734`](https://github.com/cloudflare/workers-types/commit/a919734272fae477e5c0409a43ff1f90755fa396) Thanks [@jasnell](https://github.com/jasnell)! - FetchEvent now extends from ExtendableEvent.

## 3.9.0

### Minor Changes

- [#228](https://github.com/cloudflare/workers-types/pull/228) [`edaac15`](https://github.com/cloudflare/workers-types/commit/edaac154491a2ef93326ddc0b95c830193abb9f8) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-04-29

## 3.8.0

### Minor Changes

- [#226](https://github.com/cloudflare/workers-types/pull/226) [`c2c7c2e`](https://github.com/cloudflare/workers-types/commit/c2c7c2e0d20b7ad6c269a67cc529eb6fd59d9885) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-04-27

## 3.7.1

### Patch Changes

- [#224](https://github.com/cloudflare/workers-types/pull/224) [`a016b11`](https://github.com/cloudflare/workers-types/commit/a016b11e61cccfafaac7b078ee9a285717ebd930) Thanks [@GregBrimble](https://github.com/GregBrimble)! - feature: Adds the `PagesPluginFunction` type and internal `functionPath` to Functions' context.

## 3.7.0

### Minor Changes

- [#222](https://github.com/cloudflare/workers-types/pull/222) [`b96c23c`](https://github.com/cloudflare/workers-types/commit/b96c23cb53502a6a6828efb93266e00d99734264) Thanks [@GregBrimble](https://github.com/GregBrimble)! - feature: Adds the `PagesPluginFunction` type and internal `functionPath` to Functions' context.

## 3.6.0

### Minor Changes

- [#218](https://github.com/cloudflare/workers-types/pull/218) [`402e4cc`](https://github.com/cloudflare/workers-types/commit/402e4cc4faf5b0c99fbcd6ad2ca0c95cbe36fd6b) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-04-15

## 3.5.1

### Patch Changes

- [`f776bc6`](https://github.com/cloudflare/workers-types/commit/f776bc6f0ed1851baf46d63ce7e47c3a10e522d2) Thanks [@threepointone](https://github.com/threepointone)! - Fixes for R2 types via https://github.com/cloudflare/workers-types/pull/216

## 3.5.0

### Minor Changes

- [#202](https://github.com/cloudflare/workers-types/pull/202) [`921f05a`](https://github.com/cloudflare/workers-types/commit/921f05ae0d26c9557a730efeee3796bc572dc51d) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-03-07

* [#210](https://github.com/cloudflare/workers-types/pull/210) [`f498fd9`](https://github.com/cloudflare/workers-types/commit/f498fd94ab13b40e2190f355bfb016e02e6c72a2) Thanks [@autodecl-bot](https://github.com/apps/autodecl-bot)! - Updated auto-generated types @ 2022-04-13

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
