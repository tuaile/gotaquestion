 if ('serviceWorker' in navigator) {
   window.addEventListener('load', function() {
     navigator.serviceWorker.register('client/sw.js').then(function(registration) {
       // Registration was successful
       console.log('ServiceWorker registration successful with scope: ', registration.scope);
     }, function(err) {
       // registration failed :(
       console.log('ServiceWorker registration failed: ', err);
     });
   });
 }
 var CACHE_NAME = 'GAQ Cache';
 var filecache = [
   'style.css',
   '/',
   'js.js',
   '../index.html'
 ];
 self.addEventListener('install', function(event) {
 	event.waitUntil(
     caches.open(CACHE_NAME)
       .then(function(cache) {
         return cache.addAll(filecache);
       })
   );
 });
 self.addEventListener('fetch', function(event) {
   event.respondWith(
     caches.match(event.request)
       .then(function(response) {
         // Cache hit - return response
         if (response) {
           return response;
         }
         return fetch(event.request);
       }
     )
   );
 });