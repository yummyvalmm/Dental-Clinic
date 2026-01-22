import { useEffect } from 'react';
import { useNotificationContext } from '../../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, BellRing, Settings } from 'lucide-react';
import GlassSurface from './GlassSurface';
import NotificationItem from './NotificationItem';

const NotificationCenter = ({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    // Use the custom hook context
    const { permission, isRequesting, fcmToken, requestPermission } = useNotificationContext();

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
                            <div className="px-6 pb-6 pt-28 border-b border-[var(--glass-border)]">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Bell size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[var(--color-text-main)]">Notifications</h2>
                                            {unreadCount > 0 && (
                                                <p className="text-xs text-[var(--color-text-muted)]">{unreadCount} unread</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] flex items-center justify-center transition-colors"
                                    >
                                        <X size={18} className="text-[var(--color-text-main)]" />
                                    </button>
                                </div>

                                {/* Actions */}
                                {notifications.length > 0 && (
                                    <div className="flex gap-2">
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={onMarkAllAsRead}
                                                className="flex-1 px-3 py-2 rounded-xl bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] text-xs font-semibold text-[var(--color-text-main)] transition-colors flex items-center justify-center gap-2"
                                            >
                                                <CheckCheck size={14} />
                                                Mark all read
                                            </button>
                                        )}
                                        <button
                                            onClick={onClearAll}
                                            className="flex-1 px-3 py-2 rounded-xl bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] text-xs font-semibold text-[var(--color-text-main)] transition-colors"
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
                                            onClick={requestPermission}
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
                                        <div className="w-16 h-16 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center mb-4">
                                            <Bell size={24} className="text-[var(--color-text-muted)]" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">No notifications</h3>
                                        <p className="text-sm text-[var(--color-text-muted)]">You're all caught up!</p>
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
