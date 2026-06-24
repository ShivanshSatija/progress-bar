// Minimal service worker: network-first with offline cache fallback so the app
// keeps working (and stays installable as a desktop PWA) even without internet.
const CACHE = 'placement-mission-v1'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET') return
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const fresh = await fetch(request)
        if (fresh && fresh.ok) cache.put(request, fresh.clone())
        return fresh
      } catch (err) {
        const cached = await cache.match(request)
        if (cached) return cached
        if (request.mode === 'navigate') {
          const shell = await cache.match('/')
          if (shell) return shell
        }
        return Response.error()
      }
    }),
  )
})
