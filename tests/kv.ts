const myKVNamespace: KVNamespace = undefined as any;
myKVNamespace.get("foo");
myKVNamespace.get("foo", {cacheTtl: 60});

myKVNamespace.get("foo", "text");
myKVNamespace.get("foo", {type: "text"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "text"});

myKVNamespace.get("foo", "json");
myKVNamespace.get("foo", {type: "json"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "json"});

myKVNamespace.get("foo", "arrayBuffer");
myKVNamespace.get("foo", {type: "arrayBuffer"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "arrayBuffer"});

myKVNamespace.get("foo", "stream");
myKVNamespace.get("foo", {type: "stream"});
myKVNamespace.get("foo", {cacheTtl: 60, type: "stream"});

export {}