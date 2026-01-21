import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

self.skipWaiting()
clientsClaim()

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

// --- RUNTIME CACHING (Moved from vite.config.js) ---

// Google Fonts Stylesheets
registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/,
    new CacheFirst({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }),
        ],
    })
)

// Google Fonts Webfonts
registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/.*/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }),
        ],
    })
)

// Unsplash Images (StaleWhileRevalidate for fast loading + updates)
registerRoute(
    /^https:\/\/images\.unsplash\.com\/.*/,
    new StaleWhileRevalidate({
        cacheName: 'unsplash-images',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }),
        ],
    })
)

// --- PUSH NOTIFICATION & NOTIFICATION CLICK (User Requested Step 3) ---

// Handle incoming push event
self.addEventListener('push', (event) => {
    let data = { title: 'Dental Studio', body: 'New update available!', url: '/' };

    // Parse Payload
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            // Fallback for text payloads
            data = { ...data, body: event.data.text() };
        }
    }

    const options = {
        body: data.body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        data: { url: data.url || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Dental Studio', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window for this URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
