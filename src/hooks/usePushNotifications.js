import { useState, useEffect } from 'react';
import { requestForToken, onMessageListener } from '../lib/firebase';
import { toast } from 'sonner';

/**
 * Custom hook to manage Push Notifications
 * Handles: Permission state, Token retrieval, and Foreground listeners
 */
export const usePushNotifications = () => {
    const [permission, setPermission] = useState('default'); // 'default', 'granted', 'denied'
    const [isRequesting, setIsRequesting] = useState(false);
    const [fcmToken, setFcmToken] = useState(null);

    // VAPID Key should theoretically be in an env var, but keeping it here for continuity
    const VAPID_KEY = "BK3XYkH9i6fTttyp9jRNv0khvF5W5dakjIzGlbkW9B7VQPrtr8VauY6IdBcSNeq2aoaMqFT6uHAOXnYjkRhWb-0";

    // 1. Check initial permission status and fetch token if already granted
    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);

            if (Notification.permission === 'granted') {
                fetchToken();
            }
        }
    }, []);

    // 2. Listen for Foreground Messages
    useEffect(() => {
        onMessageListener().then((payload) => {
            toast.info(payload.notification.title || 'New Notification', {
                description: payload.notification.body,
                duration: 5000,
                position: 'top-center' // Or 'bottom-center' for mobile friendliness
            });
        }).catch(() => { });

        // Note: The current onMessageListener implementation returns a Promise, 
        // effectively a one-time listener. ideally it should return an unsubscribe 
        // function, but for this refactor we keep the behavior consistent.
    }, []);


    // Helper: Logic to fetch the token
    const fetchToken = async () => {
        try {
            const token = await requestForToken(VAPID_KEY);
            if (token) {
                setFcmToken(token);
            }
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    // 3. Handle User Interaction (Click "Enable")
    const requestPermission = async () => {
        if (!('Notification' in window)) return;

        setIsRequesting(true);
        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            if (result === 'granted') {
                await fetchToken();
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        } finally {
            setIsRequesting(false);
        }
    };

    // 4. Manual Notification Trigger (e.g. for local actions)
    const addNotification = (type, title, message) => {
        console.log("Local Notification Triggered:", { type, title, message });
        // Future: Persist to Firestore 'notifications' collection
    };

    return {
        permission,
        isRequesting,
        fcmToken,
        requestPermission,
        addNotification
    };
};
