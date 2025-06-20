const CACHE_NAME = "voice-table-pwa-v1";
const FILES_TO_CACHE = [
  "./",              // əsas kök
  "./index.html",    // əsas HTML faylı
  "./manifest.json"  // manifest (əgər mövcuddursa)
];

// Quraşdırma zamanı keş faylları əlavə olunur
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .catch(err => console.error("Keş xətası:", err))
  );
});

// Sorğular zamanı əvvəlcə keşdən cavab ver
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Köhnə keşləri təmizləmək
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});
