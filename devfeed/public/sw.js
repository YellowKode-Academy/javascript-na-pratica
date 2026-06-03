// public/sw.js — Service Worker (cap-14)
const CACHE_NOME = 'devfeed-v1'
const ASSETS = ['/', '/index.html', '/style.css', '/main.js']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NOME).then(cache => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NOME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  )
})
