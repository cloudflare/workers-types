class MyDurableObject implements DurableObject {
  async fetch(request: Request) {
    return new Response("Hello, world!");
  }
}

type MyDurableObjectNamespace = DurableObjectNamespace;

const MyDurableObjectNamespace: DurableObjectNamespace = undefined as any;
const myDurableObjectStub = MyDurableObjectNamespace.get(
  MyDurableObjectNamespace.newUniqueId()
);
myDurableObjectStub.fetch("/", { method: "POST" });

const myDurableObjectLocationHintedStub = MyDurableObjectNamespace.get(
  MyDurableObjectNamespace.newUniqueId(),
  { locationHint: "enam" }
);
myDurableObjectLocationHintedStub.fetch("/", { method: "POST" });

export {};
