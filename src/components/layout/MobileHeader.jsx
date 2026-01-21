import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockNotifications } from '../../data/notifications';
import NotificationCenter from '../ui/NotificationCenter';

const MobileHeader = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    return (
        <>
            {/* Mobile Header - Fixed at top */}
            <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
                <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                                D
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-lg tracking-tight text-white leading-none">DentalStudio</span>
                                <span className="text-[8px] uppercase tracking-[0.2em] font-sans font-bold text-white/40 leading-none mt-0.5">London</span>
                            </div>
                        </Link>

                        {/* Notification Bell */}
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            aria-label="Notifications"
                            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-bg-body">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Center */}
            <NotificationCenter
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
            />
        </>
    );
};

export default MobileHeader;
