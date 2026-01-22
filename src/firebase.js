import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

/**
 * Firebase Configuration Object
 * Contains the keys and identifiers for your Firebase project.
 * 
 * TODO: Replace the following with your app's actual Firebase project configuration.
 * You can obtain these details from the Firebase Console (https://console.firebase.google.com/)
 * under Project Settings > General > Your apps.
 */
const firebaseConfig = {
    apiKey: "AIzaSyD-d1G_3ts544fPuOYrqviGNZttiDhJmAQ", // API Key for authentication
    authDomain: "dental-notification-17c35.firebaseapp.com", // Domain for Firebase Auth
    projectId: "dental-notification-17c35", // Unique Project ID
    storageBucket: "dental-notification-17c35.firebasestorage.app", // Storage bucket for files
    messagingSenderId: "506732300361", // Sender ID for Cloud Messaging
    appId: "1:506732300361:web:4c491545eea9ef39b19798", // Unique App ID
    measurementId: "G-MY3Z2XX5FV" // Analytics ID (optional)
};

// Initialize the Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging (FCM) service
const messaging = getMessaging(app);

/**
 * Requests permission from the user to receive push notifications and retrieves the FCM token.
 * 
 * This function handles:
 * 1. Requesting notification permission from the browser.
 * 2. If granted, fetching the unique FCM registration token using the provided VAPID key.
 * 3. Logging the token for testing/usage.
 * 
 * @param {string} vapidKey - The Voluntary Application Server Identification (VAPID) public key.
 *                            This key authenticates your server with the push service.
 * @returns {Promise<string|null>} The FCM registration token if successful, or null if denied/failed.
 */
export const requestForToken = async (vapidKey) => {
    try {
        const currentToken = await getToken(messaging, { vapidKey });
        if (currentToken) {
            console.log('Use this token to send notifications:', currentToken);
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
        return null;
    }
};

/**
 * Listens for incoming FCM messages when the app is in the foreground.
 * 
 * The `onMessage` event is triggered when a payload is received while the web app 
 * is open and in focus.
 * 
 * @returns {Promise<object>} A promise that resolves with the message payload.
 */
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);
            resolve(payload);
        });
    });

export { messaging };
