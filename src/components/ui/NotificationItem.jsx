import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, Info } from 'lucide-react';
import { notificationTypes, formatNotificationTime } from '../../data/notifications';

const NotificationItem = ({ notification, onMarkAsRead }) => {
    const getIcon = () => {
        switch (notification.type) {
            case notificationTypes.APPOINTMENT:
                return <Calendar size={20} className="text-blue-400" />;
            case notificationTypes.REMINDER:
                return <Clock size={20} className="text-orange-400" />;
            case notificationTypes.CONFIRMATION:
                return <CheckCircle size={20} className="text-green-400" />;
            case notificationTypes.UPDATE:
                return <Info size={20} className="text-purple-400" />;
            default:
                return <Info size={20} className="text-white/60" />;
        }
    };

    const getIconBg = () => {
        switch (notification.type) {
            case notificationTypes.APPOINTMENT:
                return 'bg-blue-500/20';
            case notificationTypes.REMINDER:
                return 'bg-orange-500/20';
            case notificationTypes.CONFIRMATION:
                return 'bg-green-500/20';
            case notificationTypes.UPDATE:
                return 'bg-purple-500/20';
            default:
                return 'bg-white/10';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => !notification.read && onMarkAsRead(notification.id)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${notification.read
                    ? 'bg-white/5 hover:bg-white/10'
                    : 'bg-white/10 hover:bg-white/15 border border-accent/30'
                }`}
        >
            <div className="flex gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${getIconBg()} flex items-center justify-center shrink-0`}>
                    {getIcon()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-semibold text-sm ${notification.read ? 'text-white/80' : 'text-white'}`}>
                            {notification.title}
                        </h4>
                        {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1" />
                        )}
                    </div>
                    <p className={`text-xs leading-relaxed mb-2 ${notification.read ? 'text-white/50' : 'text-white/70'}`}>
                        {notification.message}
                    </p>
                    <span className="text-xs text-white/40">
                        {formatNotificationTime(notification.timestamp)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default NotificationItem;
