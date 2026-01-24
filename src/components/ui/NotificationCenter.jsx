import { useEffect } from 'react';
import { useNotificationContext } from '../../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, BellRing, Settings } from 'lucide-react';
import GlassSurface from './GlassSurface';
import NotificationItem from './NotificationItem';

const NotificationCenter = ({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    // Use the custom hook context
    const { permission, isRequesting, requestPermission } = useNotificationContext();

    // Close on escape key
    // Close on escape key & Lock Body Scroll
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                    />

                    {/* Notification Panel - iOS Style */}
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-screen z-[80] rounded-b-3xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GlassSurface
                            className="h-full flex flex-col rounded-b-3xl overflow-hidden"
                            intensity="high"
                            allowOverflow={true}
                        >
                            {/* Pull Handle - iOS Style */}
                            <div className="pt-2 pb-4 flex justify-center">
                                <div className="w-10 h-1 bg-white/30 rounded-full" />
                            </div>

                            {/* Header */}
                            <div className="px-6 pb-6 border-b border-[var(--glass-border)]">
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

                            </div>

                            {/* Notifications List */}
                            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
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

                            {/* Sticky Mark All Read Button */}
                            {notifications.length > 0 && unreadCount > 0 && (
                                <div className="sticky bottom-0 p-4 bg-[var(--glass-bg-medium)] backdrop-blur-xl border-t border-[var(--glass-border)]">
                                    <button
                                        onClick={onMarkAllAsRead}
                                        className="w-full px-4 py-3 rounded-xl bg-accent/20 hover:bg-accent/30 text-sm font-semibold text-accent transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <CheckCheck size={18} />
                                        Mark all as read
                                    </button>
                                </div>
                            )}
                        </GlassSurface>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
};

export default NotificationCenter;
