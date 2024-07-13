// Imports the necessary modules for webpack configuration and caching
const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaches the assets in the manifest and defines the routes for them
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for caching pages with specified plugins
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Uses warmStrategyCache to preload the given URL
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigation requests to use the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implements asset caching
registerRoute(
({request}) => ['style', 'script', 'worker'].includes(request.destination),

new StaleWhileRevalidate({
  cacheName: 'assets-cache',

  plugins: [ new CacheableResponsePlugin({ statuses: [0, 200]})]
}) 
);
