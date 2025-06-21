const cacheName = "voice-table-cache-v1";
const filesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./favicon.ico"
];

// Установка
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(filesToCache))
      .catch((err) => console.error("Cache error:", err))
  );
});

// Обновление и замена старого кэша
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Перехват запросов
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
