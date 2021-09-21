declare type EventListener<EventType extends Event = Event> = (event: EventType) => void;

interface EventListenerObject<EventType extends Event = Event> {
  handleEvent(event: EventType): void;
}

declare type EventListenerOrEventListenerObject<EventType extends Event = Event> =
  | EventListener<EventType>
  | EventListenerObject<EventType>;

declare class EventTarget<EventMap extends Record<string, Event> = Record<string, Event>> {
  constructor();
  addEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetAddEventListenerOptions | boolean
  ): void;
  removeEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetEventListenerOptions | boolean
  ): void;
  dispatchEvent(event: EventMap[keyof EventMap]): boolean;
}

interface ExportedHandler<Env = unknown> {
  fetch?: ExportedHandlerFetchHandler<Env>;
  trace?: never;
  scheduled?: ExportedHandlerScheduledHandler<Env>;
  alarm?: never;
}

declare type ExportedHandlerFetchHandler<Env = unknown> = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => Response | Promise<Response>;

declare type ExportedHandlerScheduledHandler<Env = unknown> = (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext
) => void | Promise<void>;

declare type WorkerGlobalScopeEventMap = {
  fetch: FetchEvent;
  scheduled: ScheduledEvent;
};

declare abstract class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {}

export {};
