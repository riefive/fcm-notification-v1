var CACHE_NAME = 'pasarin-cache'

self.addEventListener('install', (event) => {
  var preCache = async () => {
    var cache = await caches.open(CACHE_NAME)
    return cache.addAll(['/config.json'])
  }
	event.waitUntil(preCache())
})

self.addEventListener('activate', (event) => {
  var preCache = async () => {
    var cacheNames = await caches.keys()
    if (!Array.isArray(cacheNames)) { return false }
    cacheNames.forEach(name => { 
      if (name !== CACHE_NAME) { return caches.delete(name) } 
    })
  }
	event.waitUntil(preCache())
})
