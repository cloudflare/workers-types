const init: CfRequestInit = {
  cf: {
    cacheEverything: true,
    // properties from IncomingRequestCfProperties
    // should not be assignable here
    // @ts-expect-error
    colo: 'hi',
  },
}

if (init.cf) {
  // properties on init.cf are known to be RequestInitCfProperties
  init.cf.cacheEverything = false
}

// CfRequestInit works with fetch
fetch('hi', init)

// CfRequestInit works with Request
new Request('hi', init)

// FetchEvent is manually specified and assignable
addEventListener('fetch', (event: FetchEvent) => {
  // RequestInitCfProperties should not be present
  // @ts-expect-error
  event.request.cf.cacheEverything
  // request from FetchEvent is assignable within request
  // constructor as RequestInit
  new Request('hi', event.request)
  // request from FetchEvent works with handle function
  event.respondWith(handle(event.request))
})

function handle(request: Request) {
  if (!request.cf) return new Response('hi')
  return new Response(request.cf.colo)
}

class MyDurableObject implements DurableObject {
  async fetch(request: Request) {
    return new Response("Hello, world!")
  }
}

type MyDurableObjectNamespace = DurableObjectNamespace

const MyDurableObjectNamespace: DurableObjectNamespace = undefined as any
const myDurableObjectStub = MyDurableObjectNamespace.get(MyDurableObjectNamespace.newUniqueId())
myDurableObjectStub.fetch('/', { method: 'POST' })

const myKVNamespace: KVNamespace = undefined as any;
myKVNamespace.get("foo");
myKVNamespace.get("foo", {cacheTtl: 60});
myKVNamespace.get("foo", {cacheTtl: 60, type: "text"});
myKVNamespace.get("foo", {type: "text"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "json"});
myKVNamespace.get("foo", {type: "json"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "arrayBuffer"});
myKVNamespace.get("foo", {type: "arrayBuffer"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "stream"});
myKVNamespace.get("foo", {type: "stream"});

interface Env extends ModuleWorker.Bindings {
  Clients: KVNamespace;
  Workers: DurableObjectNamespace;
  API_TOKEN: string;
}

const worker: ModuleWorker<Env> = {
  async fetch(req, env, ctx) {
    let { cf } = req;

    let userid: string | null = null;
    let ip = req.headers.get('cf-connecting-ip');

    if (ip) {
      userid = await env.Clients.get(`ip:${ip}`, 'text');
    }

    ctx.waitUntil(
      fetch('/logs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          colo: cf.colo,
          country: cf.country,
          userid: userid || '',
          ip: ip || '',
        })
      })
    );

    return new Response('OK');
  },

  scheduled(event, env, ctx) {
    ctx.waitUntil(
      fetch('/cleanup', {
        headers: {
          'Authorization': `Bearer ${env.API_TOKEN}`
        }
      })
    );
  }
};
