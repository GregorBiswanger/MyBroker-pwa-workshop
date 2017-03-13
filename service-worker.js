/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/style.css","6b8bc262b07aaf500c62ae5b9959075d"],["index.html","561c2989a2fe0f0197be0b933de77243"],["js/app.js","1f8a80fae6e23e2fe89a2b97d500c33b"],["js/init.js","fc5e19d29eeac1218c6eb0113f9a1454"],["js/toolbox-script.js","499d1375438f6decb47af54a6032034c"],["node_modules/jquery/dist/jquery.min.js","2f6b11a7e914718e0290410e85366fe9"],["node_modules/materialize-css/dist/css/materialize.min.css","afa86d80cdca6b442d574883b5e885f4"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Bold.eot","ecdd509cadbf1ea78b8d2e31ec52328c"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Bold.ttf","e31fcf1885e371e19f5786c2bdfeae1b"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Bold.woff","dc81817def276b4f21395f7ea5e88dcd"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Bold.woff2","39b2c3031be6b4ea96e2e3e95d307814"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Light.eot","a990f611f2305dc12965f186c2ef2690"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Light.ttf","46e48ce0628835f68a7369d0254e4283"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Light.woff","3b813c2ae0d04909a33a18d792912ee7"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Light.woff2","69f8a0617ac472f78e45841323a3df9e"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Medium.eot","4d9f3f9e5195e7b074bb63ba4ce42208"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Medium.ttf","894a2ede85a483bf9bedefd4db45cdb9"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Medium.woff","fc78759e93a6cac50458610e3d9d63a0"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Medium.woff2","574fd0b50367f886d359e8264938fc37"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.eot","30799efa5bf74129468ad4e257551dc3"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.ttf","df7b648ce5356ea1ebce435b3459fd60"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff","ba3dcd8903e3d0af5de7792777f8ae0d"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff2","2751ee43015f9884c3642f103b7f70c9"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Thin.eot","dfe56a876d0282555d1e2458e278060f"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Thin.ttf","94998475f6aea65f558494802416c1cf"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Thin.woff","7500519de3d82e33d1587f8042e2afcb"],["node_modules/materialize-css/dist/fonts/roboto/Roboto-Thin.woff2","954bbdeb86483e4ffea00c4591530ece"],["node_modules/materialize-css/dist/js/materialize.min.js","8e727a037b7e48a2d87c52e3c69fe307"],["node_modules/pouchdb/dist/pouchdb.min.js","8f694cb54cbde94e91b47cf7c33b75c2"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







importScripts("node_modules/sw-toolbox/sw-toolbox.js","js/toolbox-script.js","sw-push-notification.js");

