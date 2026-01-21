importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD-d1G_3ts544fPuOYrqviGNZttiDhJmAQ",
    authDomain: "dental-notification-17c35.firebaseapp.com",
    projectId: "dental-notification-17c35",
    storageBucket: "dental-notification-17c35.firebasestorage.app",
    messagingSenderId: "506732300361",
    appId: "1:506732300361:web:4c491545eea9ef39b19798",
    measurementId: "G-MY3Z2XX5FV"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification ? payload.notification.title : 'Dental Studio';
    const notificationOptions = {
        body: payload.notification ? payload.notification.body : 'New update',
        icon: '/pwa-192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
