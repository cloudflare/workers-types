// @ts-expect-error
const [client1, server1] = new WebSocketPair();

const { 0: client2, 1: server2 } = new WebSocketPair();
const [client3, server3] = Object.values(new WebSocketPair());
const webSockets: WebSocket[] = Object.values(new WebSocketPair());

export {};
