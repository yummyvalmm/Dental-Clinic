import React, { createContext, useContext } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const notificationState = usePushNotifications();

    return (
        <NotificationContext.Provider value={notificationState}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext must be used within a NotificationProvider');
    }
    return context;
};
