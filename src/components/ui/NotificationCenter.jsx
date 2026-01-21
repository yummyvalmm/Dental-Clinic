import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck } from 'lucide-react';
import GlassSurface from './GlassSurface';
import NotificationItem from './NotificationItem';

const NotificationCenter = ({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

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
                            <div className="p-6 border-b border-white/10">
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
            )}
        </AnimatePresence>
    );
};

export default NotificationCenter;
