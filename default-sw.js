const CACHE_NAME = 'pasarin-cache'

self.addEventListener('install', (event) => {
  const preCache = async () => {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(['/config.json'])
  }
	event.waitUntil(preCache())
})

self.addEventListener('activate', (event) => {
  const preCache = async () => {
    const cacheNames = await caches.keys()
    if (!Array.isArray(cacheNames)) { return false }
    cacheNames.forEach(name => { 
      if (name !== CACHE_NAME) { return caches.delete(name) } 
    })
  }
	event.waitUntil(preCache())
})
