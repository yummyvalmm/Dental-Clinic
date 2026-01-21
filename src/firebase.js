import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://console.firebase.google.com/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request permission and get token
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

export { messaging };
