const init: WorkerRequestInit = {
  cf: {
    resolveOverride: 'hi',
    cacheEverything: true,
  }
}

if (init.cf) {
  init.cf.cacheKey = "lol"
}

fetch('hi', init)

addEventListener('fetch', (e) => {
  // request from event listener is assignable within request constructor
  new Request('hi', e.request)
  return new Response(e.request.cf.colo, { status: 200 })
})
