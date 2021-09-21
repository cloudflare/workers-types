declare type EventListener<EventType extends Event> = (event: EventType) => void;

declare abstract class EventTarget<EventMap extends Record<string, Event> = Record<string, Event>> {
  addEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListener<EventMap[Type]>,
    options?: boolean
  ): void;
  removeEventListener<Type extends keyof EventMap>(type: Type, handler: EventListener<EventMap[Type]>): void;
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
) => Promise<Response>;

declare type ExportedHandlerScheduledHandler<Env = unknown> = (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext
) => Promise<void>;

declare type WorkerGlobalScopeEventMap = {
  fetch: FetchEvent;
  scheduled: ScheduledEvent;
};

declare abstract class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {}

export {};
