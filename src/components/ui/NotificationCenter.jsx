import { useState, useEffect } from 'react';
import { requestForToken } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, BellRing, Settings } from 'lucide-react';
import GlassSurface from './GlassSurface';
import NotificationItem from './NotificationItem';

const NotificationCenter = ({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    // Notification Permission State
    const [permission, setPermission] = useState('default'); // 'default', 'granted', 'denied'
    const [isRequesting, setIsRequesting] = useState(false);

    const [fcmToken, setFcmToken] = useState(null);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);

            // If already granted, fetch token immediately so user can test
            if (Notification.permission === 'granted') {
                const VAPID_KEY = "BK3XYkH9i6fTttyp9jRNv0khvF5W5dakjIzGlbkW9B7VQPrtr8VauY6IdBcSNeq2aoaMqFT6uHAOXnYjkRhWb-0";
                requestForToken(VAPID_KEY).then(token => {
                    if (token) {
                        setFcmToken(token);
                        console.log("%c FCM Token:", "color: #00ff00; font-weight: bold; font-size: 14px;", token);
                        console.log("%c (Copy the token string above)", "color: #888;");
                    }
                });
            }
        }
    }, []);

    const handleRequestPermission = async () => {
        if (!('Notification' in window)) return;

        setIsRequesting(true);
        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            if (result === 'granted') {
                // REPLACE WITH YOUR FIREBASE VAPID KEY
                const VAPID_KEY = "BK3XYkH9i6fTttyp9jRNv0khvF5W5dakjIzGlbkW9B7VQPrtr8VauY6IdBcSNeq2aoaMqFT6uHAOXnYjkRhWb-0";
                const token = await requestForToken(VAPID_KEY);
                if (token) {
                    setFcmToken(token);
                    console.log("%c FCM Token:", "color: #00ff00; font-weight: bold; font-size: 14px;", token);
                }
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        } finally {
            setIsRequesting(false);
        }
    };



    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Notification Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50"
                    >
                        <GlassSurface
                            className="h-full flex flex-col"
                            intensity="high"
                        >
                            {/* Header */}
                            <div className="px-6 pb-6 pt-28 border-b border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Bell size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Notifications</h2>
                                            {unreadCount > 0 && (
                                                <p className="text-xs text-white/60">{unreadCount} unread</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <X size={18} className="text-white" />
                                    </button>
                                </div>

                                {/* Actions */}
                                {notifications.length > 0 && (
                                    <div className="flex gap-2">
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={onMarkAllAsRead}
                                                className="flex-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <CheckCheck size={14} />
                                                Mark all read
                                            </button>
                                        )}
                                        <button
                                            onClick={onClearAll}
                                            className="flex-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Notifications List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {/* Permission Request Banner */}
                                {permission === 'default' && (
                                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4 mb-4 flex flex-col gap-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                <BellRing size={16} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">Enable Notifications</h4>
                                                <p className="text-xs text-white/60 leading-relaxed">
                                                    Get instant updates about your appointments and test results.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleRequestPermission}
                                            disabled={isRequesting}
                                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isRequesting ? 'Enabling...' : 'Turn On Notifications'}
                                        </button>
                                    </div>
                                )}

                                {/* Permission Denied Banner */}
                                {permission === 'denied' && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-4 flex flex-col gap-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                                <Settings size={16} className="text-red-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">Notifications Blocked</h4>
                                                <p className="text-xs text-white/60 leading-relaxed">
                                                    You previously blocked notifications. Please reset permissions in your browser settings to enable them.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Debugging: Display Token for Mobile Users */}
                                {permission === 'granted' && fcmToken && (
                                    <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-[10px] text-white/40 mb-2 font-mono">Device Token (Debug):</p>
                                        <div className="flex gap-2">
                                            <code className="text-[10px] text-white/60 bg-black/20 p-2 rounded flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                                {fcmToken.slice(0, 20)}...
                                            </code>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(fcmToken);
                                                    alert('Token copied!');
                                                }}
                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-colors"
                                            >
                                                COPY
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                            <Bell size={24} className="text-white/40" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white/80 mb-2">No notifications</h3>
                                        <p className="text-sm text-white/50">You're all caught up!</p>
                                    </div>
                                ) : (
                                    <AnimatePresence>
                                        {notifications.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={onMarkAsRead}
                                            />
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        </GlassSurface>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
};

export default NotificationCenter;
