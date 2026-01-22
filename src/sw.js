/* eslint-env serviceworker */
/* global clients */

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

/**
 * Service Worker for Dental Clinic PWA
 * 
 * Handles:
 * 1. Precaching of static assets (JS, CSS, HTML).
 * 2. Runtime caching strategies for external fonts and images.
 * 3. Handling Push Notifications via Firebase/Web Push.
 * 4. Offline support.
 */

// Force the waiting service worker to become the active service worker
self.skipWaiting()
// Claim any clients immediately, so that the page is controlled by the SW immediately
clientsClaim()

// Clean up old caches from previous versions of the service worker
cleanupOutdatedCaches()

// Precache assets defined in the build manifest
// This ensures core app files are available offline immediately after install
precacheAndRoute(self.__WB_MANIFEST)

// --- RUNTIME CACHING (Moved from vite.config.js) ---

/**
 * Cache Strategy: Google Fonts Stylesheets
 * Uses CacheFirst strategy because font definitions rarely change.
 */
registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/,
    new CacheFirst({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }), // 1 Year
        ],
    })
)

/**
 * Cache Strategy: Google Fonts Webfonts (WOFF2, etc.)
 * Uses CacheFirst strategy as font files are immutable.
 */
registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/.*/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }), // 1 Year
        ],
    })
)

/**
 * Cache Strategy: Unsplash Images
 * Uses StaleWhileRevalidate strategy.
 * - Serve cached image immediately (fast).
 * - Update cache in the background (fresh).
 * Ideal for content that needs to be fast but can accept slight delays in updates.
 */
registerRoute(
    /^https:\/\/images\.unsplash\.com\/.*/,
    new StaleWhileRevalidate({
        cacheName: 'unsplash-images',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }), // 30 Days
        ],
    })
)

// --- PUSH NOTIFICATION & NOTIFICATION CLICK (User Requested Step 3) ---

/**
 * Listener for 'push' events.
 * Triggered when the server sends a push notification to this client.
 * 
 * @param {PushEvent} event - The push event containing the data payload.
 */
self.addEventListener('push', (event) => {
    let data = { title: 'Dental Studio', body: 'New update available!', url: '/' };

    // Parse Payload
    if (event.data) {
        try {
            data = event.data.json();
        } catch (err) {
            console.warn('Push data is not JSON, falling back to text.', err);
            // Fallback for text-only payloads
            data = { ...data, body: event.data.text() };
        }
    }

    const options = {
        body: data.body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        data: { url: data.url || '/' } // Pass URL in data to handle click
    };

    // Keep the service worker alive until the notification is shown
    event.waitUntil(
        self.registration.showNotification(data.title || 'Dental Studio', options)
    );
});

/**
 * Listener for 'notificationclick' events.
 * Triggered when a user clicks on a displayed system notification.
 * 
 * Handles opening the app or focusing an existing window.
 * 
 * @param {NotificationEvent} event - The notification click event.
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification immediately

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open for this URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus(); // Focus existing window
                }
            }
            // If no window is open, open a new one
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
