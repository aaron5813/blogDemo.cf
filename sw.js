// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js");
// var cacheStorageKey = 'minimal-pwa-1'
// var cacheList = [
//   '/',
//   'index.html',
//   'css/circle.css',
//   'css/bootstrap.css',
//   'css/common.css',
//   'appIcon.png'
// ]
// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches.open(cacheStorageKey)
//     .then(cache => cache.addAll(cacheList))
//     .then(() => self.skipWaiting())
//   )
// })

// self.addEventListener('fetch', function (e) {
//   e.respondWith(caches.match(e.request).then(function (response) {
//     if (response != null) {
//       return response
//     }
//     return fetch(e.request.url)
//   }))
// })

// self.addEventListener('activate', function (e) {
//   e.waitUntil( //获取所有cache名称 
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         // 获取所有不同于当前版本名称cache下的内容 
//         cacheNames.filter(cacheNames => {
//           return cacheNames !== cacheStorageKey
//         }).map(cacheNames => {
//           return caches.delete(cacheNames)
//         }))
//     }).then(() => {
//       return self.clients.claim()
//     }))
// })

'use strict'
let cacheName = 'pwa-demo-assets'; // 缓存名字
let imgCacheName = 'pwa-img';
let filesToCache;
filesToCache = [ // 所需缓存的文件
    '/',
    'index.html',
    'css/circle.css',
    'css/bootstrap.css',
    'css/common.css',
    'appIcon.png'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        // 安装服务者时，对需要缓存的文件进行缓存
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    // 判断地址是不是需要实时去请求，是就继续发送请求
    if (e.request.url.indexOf('/api/400/200') > -1) {
        e.respondWith(
            caches.open(imgCacheName).then(function(cache){
                 return fetch(e.request).then(function (response){
                    cache.put(e.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            // 匹配到缓存资源，就从缓存中返回数据
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }

});
