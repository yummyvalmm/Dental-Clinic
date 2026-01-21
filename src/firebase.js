import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "REPLACE_WITH_YOUR_API_KEY",
    authDomain: "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
    storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
    appId: "REPLACE_WITH_YOUR_APP_ID"
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
