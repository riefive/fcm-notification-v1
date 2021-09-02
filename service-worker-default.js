var CACHE_NAME = 'pasarin-cache'
var urlsToCache = ['/config.json']

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => { return cache.addAll(urlsToCache) })
	)
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => { if (name !== cacheStorageKey) { return caches.delete(name) } })
      })
    ).then(() => {
      return self.clients.claim()
    })
	)
})
