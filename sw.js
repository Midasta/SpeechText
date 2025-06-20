const CACHE_NAME = "voice-table-pwa-v1";
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "manifest.json"
];

// Quraşdırma zamanı keş fayllarını əlavə et
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Sorğu zamanı keşə bax, tapılmasa şəbəkədən yüklə
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Köhnə keşləri sil
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
