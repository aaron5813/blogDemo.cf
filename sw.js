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

var cacheStorageKey = 'cachesName'
var cacheList = [
  '/',
  'index.html',
  'css/circle.css',
  'css/bootstrap.css',
  'css/common.css',
  'appIcon.png'
]

// 当浏览器解析完sw文件时触发install事件
self.addEventListener('install', function(e) {
  // install事件中一般会将cacheList中要换存的内容通过addAll方法，拉一遍放入caches中
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    })
  )
})

// 激活时触发activate事件
self.addEventListener('activate', function(e) {
  // active事件中通常做一些过期资源释放的工作，匹配到就从caches中删除
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) {
        return caches.delete(name);
      } else {
        return Promise.resolve();
      }
    }));
  });

  e.waitUntil(
    Promise.all([cacheDeletePromises])
  )
})

self.addEventListener('fetch', function(e) {
  // 在此编写缓存策略, 需要根据不同文件的扩展名把不同的资源通过不同的策略缓存在caches中，各种css，js，html，图片，都需要单独搞一套缓存策略

  e.respondWith(
    // 可以通过匹配缓存中的资源返回
    caches.match(e.request).
    // 也可以从远端拉取
    fetch(e.request.url)
    // 也可以自己造
    // new Response('自己造')
    // 也可以通过吧fetch拿到的响应通过caches.put方法放进chches
  )
})