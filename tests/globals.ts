const init: CfRequestInitializerDict = {
  cf: {
    cacheEverything: true,
    // properties from IncomingRequestCfProperties
    // should not be assignable here
    // @ts-expect-error
    colo: "hi",
  },
};

if (init.cf) {
  // properties on init.cf are known to be RequestInitCfProperties
  init.cf.cacheEverything = false;
}

// CfRequestInit works with fetch
fetch("hi", init);

// CfRequestInit works with Request
new Request("hi", init);

// FetchEvent is manually specified and assignable
addEventListener("fetch", (event: FetchEvent) => {
  // RequestInitCfProperties should not be present
  // @ts-expect-error
  event.request.cf.cacheEverything;
  // request from FetchEvent is assignable within request
  // constructor as RequestInit
  new Request("hi", event.request);
  // request from FetchEvent works with handle function
  event.respondWith(handle(event.request));
});
function handle(request: Request) {
  if (!request.cf) return new Response("hi");
  return new Response(request.cf.colo);
}

addEventListener("scheduled", (event: ScheduledEvent) => {});
// @ts-expect-error
addEventListener("close", () => {});

removeEventListener("fetch", (event: FetchEvent) => {});
removeEventListener("scheduled", (event: ScheduledEvent) => {});
// @ts-expect-error
removeEventListener("close", (event) => {});

self.addEventListener("fetch", (event: FetchEvent) => {});

// @ts-expect-error
dispatchEvent(new FetchEvent("fetch"));
// @ts-expect-error
dispatchEvent(new ScheduledEvent("scheduled"));
// @ts-expect-error
dispatchEvent(new CloseEvent("close"));

const default1: Cache = caches.default;
const open1: Promise<Cache> = caches.open("");

setTimeout((a: number, b: string) => {}, 1000, 1, "hello");
// @ts-expect-error
setTimeout((a: number) => {}, 1000, "hello");
// @ts-expect-error
setInterval((a: number, b: string) => {}, 1000, 1, "hello", true);

const digest1: Promise<ArrayBuffer> = crypto.subtle.digest(
  "SHA-256",
  new Uint8Array()
);

export {};
