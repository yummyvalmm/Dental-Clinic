---
name: pwa-optimizer
description: Audit and optimize PWA features like service worker caching, manifest settings, and installation prompts.
---

# PWA Optimizer Skill

This skill ensures the Dental Clinic app remains a high-performance, native-like Progressive Web App.

## Core Responsibilities

- **Service Worker Check**: Verify `src/sw.js` (or `firebase-messaging-sw.js`) is correctly caching assets for offline use.
- **Manifest Audit**: Review `public/manifest.json` for proper icons, theme colors, and standalone display modes.
- **Installability Check**: Audit the implementation of custom install prompts and "Add to Home Screen" logic.
- **Performance Tuning**: Audit caching strategies (StaleWhileRevalidate vs CacheFirst) for Unsplash images and Google Fonts.

## Standard Caching Strategy

| Resource Type | Strategy | Reason |
|---------------|----------|--------|
| HTML/JS/CSS | CacheFirst | Fastest load, update via SW update |
| Images (Unsplash) | StaleWhileRevalidate | Fast visual with background refresh |
| Fonts (GFonts) | CacheFirst | Fixed assets, cache for 1 year |

## Verification Procedures

1.  **SW Registration**: Check `index.html` or `main.jsx` for registration scripts.
2.  **Asset Pre-caching**: Verify the `precaching` list in the service worker code.
3.  **Prompt Logic**: Simulate standalone mode in the browser and verify the "Install App" banner behavior.
