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

// --- FIREBASE MESSAGING & NOTIFICATIONS ---

// Import Firebase Compat Scripts (Standard for Service Workers)
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD-d1G_3ts544fPuOYrqviGNZttiDhJmAQ",
    authDomain: "dental-notification-17c35.firebaseapp.com",
    projectId: "dental-notification-17c35",
    storageBucket: "dental-notification-17c35.firebasestorage.app",
    messagingSenderId: "506732300361",
    appId: "1:506732300361:web:4c491545eea9ef39b19798",
    measurementId: "G-MY3Z2XX5FV"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // Handle Background Messages
    messaging.onBackgroundMessage((payload) => {
        console.log('[Service Worker] Received background message ', payload);
        const notificationTitle = payload.notification?.title || 'Dental Studio';
        const notificationOptions = {
            body: payload.notification?.body || 'New update available',
            icon: '/pwa-192x192.png',
            badge: '/pwa-192x192.png',
            data: { url: payload.data?.url || '/' }
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
} catch (error) {
    console.error("Firebase init failed in SW:", error);
}

/**
 * Listener for 'notificationclick' events.
 * Triggered when a user clicks on a displayed system notification.
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification immediately

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open for this URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes(urlToOpen) && 'focus' in client) {
                    return client.focus();
                }
            }
            // If no window is open, open a new one
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
