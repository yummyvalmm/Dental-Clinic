# Dental Clinic PWA 🦷

A premium, high-performance Progressive Web App (PWA) for a modern dental clinic. Built with React, Vite, and Tailwind CSS, featuring glassmorphism UI, smooth animations, and offline capabilities.

## 🚀 Features

- **Progressive Web App**: Installable on mobile and desktop, works offline.
- **Push Notifications**: Integrated with Firebase Cloud Messaging (FCM) for appointment updates.
- **Glassmorphism UI**: Modern, premium aesthetic with `GlassSurface` components.
- **Online Booking**: Multi-step wizard for seamless appointment scheduling.
- **Mobile First**: Optimized touch interactions and responsive layout.

## 🛠️ Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/dental-pwa.git
    cd dental-pwa
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🔔 Firebase Push Notifications Setup

This project uses Firebase Cloud Messaging (FCM) for push notifications.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/).
2.  **Add a Web App**: Register a new web app in your project settings.
3.  **Get Configuration**: Copy the `firebaseConfig` object.
4.  **Update Config**: Open `src/firebase.js` and replace the `firebaseConfig` object with your own.
    ```javascript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        // ...
    };
    ```
5.  **Get VAPID Key**:
    - Go to Project Settings > Cloud Messaging.
    - Generate a new key pair under "Web Configuration".
    - Use this key when calling `requestForToken(vapidKey)`.

## 📅 Online Booking Logic

The booking system is handled by the `BookingWizard` component (`src/components/features/BookingWizard.jsx`).

- **Step 1**: User selects a service (Checkup, Whitening, etc.).
- **Step 2**: User chooses a date (mock calendar) and time slot.
- **Step 3**: User enters personal details (Name, Phone).
- **Step 4**: Confirmation screen is shown.

*Note: Currently, the booking data is handled locally. Integrate with a backend API in `BookingWizard.jsx` to persist appointments.*

## 📱 Service Worker & Offline Support

The service worker (`src/sw.js`) handles:

- **Precaching**: Core assets (HTML, CSS, JS) are cached on install.
- **Runtime Caching**:
    - **Google Fonts**: CacheFirst strategy (1 year expiry).
    - **Images (Unsplash)**: StaleWhileRevalidate strategy for fast loading.
- **Push Events**: Listens for background push notifications and displays them.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
