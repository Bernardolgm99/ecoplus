const staticDevCoffee = "eco-plus";
const offline_url = 'offline.html'
const assets = [
  "/",
  '/src/*',
  '/src/assets/*',
  '/src/components/*',
  '/src/components/icons/*',
  '/src/router/index.html',
  '/src/stores/*',
  '/src/views/*',
  '/src/App.vue',
  '/src/main.js',
  '/offline.hmtl',
  '/index.html',
  '/vite.config.js'
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
      cache.addAll([offline_url]);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

// OFFLINE PAGE // 
/*self.addEventListener("fetch", fetchEvent => {
    if(fetchEvent.request.method === 'GET' && fetchEvent.request.headers.get('accept').includes('text/html')) {
        fetchEvent.respondWith(
            fetch(fetchEvent.request.url).catch(error => {
                console.log("error");
                return caches.match(offline_url); 
            })
        )
    } else {
        fetchEvent.respondWith(fetch(fetchEvent.request)); 
    }
});*/
