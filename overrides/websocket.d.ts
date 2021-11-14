declare class MessageEvent extends Event {
  readonly data: ArrayBuffer | string;
}

interface MessageEventInit {
  data: ArrayBuffer | string;
}

declare type WebSocketEventMap = {
  close: CloseEvent;
  message: MessageEvent;
  open: Event;
  error: Event;
};

declare abstract class WebSocket extends EventTarget<WebSocketEventMap> {}

declare const WebSocketPair: {
  new (): [WebSocket, WebSocket];
};

export {};
