// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "encostai-offline-page";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// var cacheName = 'encostAi+-v1.0';

// self.addEventListener('install', event => {

//   self.skipWaiting();

//   event.waitUntil(
//     caches.open(cacheName)
//       .then(cache => cache.addAll([

//         './abrigos.html',
//         './cadastro.html',
//         './contatos-emergencia.html',
//         './editar-perfil.html',
//         './form-solicitacao.html',
//         './index.html',
//         './menu.html',
//         './perfil.html',
//         './solicitacao.html',

//         './assets/css/index.css',
//         './assets/css/cadastro.css',
//         './assets/css/menu.css',
//         './assets/css/solicitacao.css',
//         './assets/css/form-solicitacao.css',
//         './assets/css/contatos-emergencia.css',
//         './assets/css/perfil.css',
//         './assets/css/abrigos.css',

//         './assets/img/logo1-mobile.png',
//         './assets/img/logo2-mobile.png',
//         './assets/img/logo.svg',
//         './assets/img/abrigo1.png',
//         './assets/img/abrigo2.png',

//         './assets/img/128.png',
//         './assets/img/144.png',
//         './assets/img/152.png',
//         './assets/img/167.png',
//         './assets/img/180.png',
//         './assets/img/192.png',
//         './assets/img/256.png',
//         './assets/img/512.png',

//         './assets/img/btn-1.png',
//         './assets/img/btn-2.png',
//         './assets/img/btn-3.png',
//         './assets/img/btn-4.png',
//         './assets/img/btn-5.png',
//         './assets/img/btn-6.png',

//         './assets/img/user.svg',
//         './assets/img/email.svg',
//         './assets/img/cpf.svg',
//         './assets/img/password.svg',
//         './assets/img/phone.svg',

//         './assets/img/seta.svg',
//         './assets/img/seta-emergencia.svg',
//         './assets/img/seta-abrigos.svg',
//         './assets/img/seta-user.svg',

//         './assets/img/search-contatos.png',
//         './assets/img/search-abrigos.png',

//         './assets/img/x-contatos.png',
//         './assets/img/x-abrigos.png',
//       ]))
//   );
// });

// self.addEventListener('message', function (event) {
//   if (event.data.action === 'skipWaiting') {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('fetch', function (event) {
//   //Atualizacao internet
//   event.respondWith(async function () {
//      try {
//        return await fetch(event.request);
//      } catch (err) {
//        return caches.match(event.request);
//      }
//    }());

//   //Atualizacao cache
//   /*event.respondWith(
//     caches.match(event.request)
//       .then(function (response) {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   );*/

// });