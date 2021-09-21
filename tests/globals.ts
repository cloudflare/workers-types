addEventListener("fetch", (event: FetchEvent) => {});
addEventListener("scheduled", (event: ScheduledEvent) => {});
// @ts-expect-error
addEventListener("close", () => {});

removeEventListener("fetch", (event: FetchEvent) => {});
removeEventListener("scheduled", (event: ScheduledEvent) => {});
// @ts-expect-error
removeEventListener("close", (event) => {});

self.addEventListener("fetch", (event: FetchEvent) => {});

dispatchEvent(new FetchEvent("fetch"));
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

const digest1: Promise<ArrayBuffer> = crypto.subtle.digest("SHA-256", new Uint8Array());

export {};
