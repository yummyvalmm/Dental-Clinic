import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Cloud Messaging (FCM) service
const messaging = getMessaging(app);

// Initialize Firestore
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
const db = getFirestore(app);

/**
 * Saves the FCM token to Firestore "user_push_tokens" collection.
 * Uses the token string as the document ID to prevent duplicates.
 * 
 * @param {string} token - The FCM registration token
 */
export const saveTokenToFirestore = async (token) => {
    if (!token) return;

    const tokenRef = doc(db, "user_push_tokens", token);

    try {
        console.log("🔥 [DEBUG] Attempting to save token to Firestore:", token);
        await setDoc(tokenRef, {
            token: token,
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            lastSeen: serverTimestamp(),
            createdAt: serverTimestamp()
        }, { merge: true });
        console.log("✅ [DEBUG] SUCCESS: Token saved to Firestore!");
    } catch (error) {
        console.error("❌ [DEBUG] FAILED to save token to Firestore:", error);
    }
};

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
    console.log("🚀 [DEBUG] requestForToken called with VAPID:", vapidKey);
    try {
        let currentToken = null;
        if ('serviceWorker' in navigator) {
            console.log("🔍 [DEBUG] Waiting for Service Worker ready...");

            // Helper to timeout a promise
            const timeout = (ms) => new Promise(resolve => setTimeout(() => resolve('TIMEOUT'), ms));

            // Race between SW ready and 3s timeout
            const registration = await Promise.race([
                navigator.serviceWorker.ready,
                timeout(3000)
            ]);

            if (registration === 'TIMEOUT') {
                console.warn("⚠️ [DEBUG] Service Worker ready timed out. Trying fallback...");
                // Fallback: Try getting token without visible SW registration 
                currentToken = await getToken(messaging, { vapidKey });
            } else {
                console.log("✅ [DEBUG] Service Worker ready:", registration.scope);
                console.log("⏳ [DEBUG] Calling getToken...");
                currentToken = await getToken(messaging, {
                    vapidKey,
                    serviceWorkerRegistration: registration
                });
            }

            console.log("🎟️ [DEBUG] getToken Result:", currentToken ? "Token Found" : "Token is NULL");
        } else {
            console.log("⚠️ [DEBUG] No Service Worker found in navigator");
            currentToken = await getToken(messaging, { vapidKey });
        }

        if (currentToken) {
            console.log("💾 [DEBUG] Saving to Firestore...");
            await saveTokenToFirestore(currentToken);
            return currentToken;
        } else {
            console.warn("⚠️ [DEBUG] No registration token available. Request permission to generate one.");
            return null;
        }

    } catch (err) {
        console.error('❌ [DEBUG] An error occurred while retrieving token: ', err);
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
            resolve(payload);
        });
    });

export { messaging, auth, googleProvider, db };
