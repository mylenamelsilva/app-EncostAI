var cacheName = 'encostAi+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        './cadastro.html',
        './menu.html',

        './assets/css/index.css',
        './assets/css/cadastro.css',
        './assets/css/menu.css',

        './assets/img/logo1-mobile.png',
        './assets/img/logo2-mobile.png',
        './assets/img/icon.png',

        './assets/img/128.png',
        './assets/img/144.png',
        './assets/img/152.png',
        './assets/img/167.png',
        './assets/img/180.png',
        './assets/img/192.png',
        './assets/img/256.png',
        './assets/img/512.png',
        './assets/img/btn-1.png',
        './assets/img/btn-2.png',
        './assets/img/btn-3.png',
        './assets/img/btn-4.png',
        './assets/img/btn-5.png',
        './assets/img/btn-6.png',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});