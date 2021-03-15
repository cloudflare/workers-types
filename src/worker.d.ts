interface FetchEvent {
  readonly request: Request
  passThroughOnException: () => void
  respondWith(r: Response | Promise<Response>): void
  waitUntil(promise: Promise<any>): void
}

interface ScheduledEvent {
  /**
   * The type of event. This will always return `"scheduled"`.
   */
  type: string
  /**
   * The time the `ScheduledEvent` was scheduled to be executed in
   * milliseconds since January 1, 1970, UTC.
   * It can be parsed as `new Date(event.scheduledTime)`
   */
  scheduledTime: number
  /**
   * Use this method to notify the runtime to wait for asynchronous tasks
   * (e.g. logging, analytics to third-party services, streaming and caching).
   * The first `event.waitUntil` to fail will be observed and recorded as the
   * status in the Cron Trigger Past Events table. Otherwise, it will be
   * reported as a Success.
   */
  waitUntil(promise: Promise<any>): void
}

declare function addEventListener(type: 'fetch', handler: (event: FetchEvent) => void): void
declare function addEventListener(type: 'scheduled', handler: (event: ScheduledEvent) => void): void
