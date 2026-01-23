import { Calendar, Clock, CheckCircle, Info } from 'lucide-react';
import { notificationTypes, formatNotificationTime } from '../../data/notifications';

const NotificationItem = ({ notification, onMarkAsRead }) => {
    const getIcon = () => {
        switch (notification.type) {
            case notificationTypes.APPOINTMENT:
                return <Calendar size={16} className="text-blue-400" />;
            case notificationTypes.REMINDER:
                return <Clock size={16} className="text-orange-400" />;
            case notificationTypes.CONFIRMATION:
                return <CheckCircle size={16} className="text-green-400" />;
            case notificationTypes.UPDATE:
                return <Info size={16} className="text-purple-400" />;
            default:
                return <Info size={16} className="text-[var(--color-text-muted)]" />;
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
                return 'bg-[var(--glass-bg-low)]';
        }
    };

    return (
        <div
            onClick={() => !notification.read && onMarkAsRead(notification.id)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${notification.read
                ? 'bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)]'
                : 'bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] border border-accent/30'
                }`}
        >
            <div className="flex gap-2.5">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg ${getIconBg()} flex items-center justify-center shrink-0`}>
                    {getIcon()}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h4 className={`font-semibold text-xs ${notification.read ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-main)]'}`}>
                            {notification.title}
                        </h4>
                        {!notification.read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1" />
                        )}
                    </div>
                    <p className={`text-[11px] leading-relaxed mb-1.5 ${notification.read ? 'text-[var(--color-text-muted)]/50' : 'text-[var(--color-text-muted)]'}`}>
                        {notification.message}
                    </p>
                    <span className="text-[10px] text-[var(--color-text-muted)]/40">
                        {formatNotificationTime(notification.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
