// Mock notification data
export const notificationTypes = {
    APPOINTMENT: 'appointment',
    REMINDER: 'reminder',
    CONFIRMATION: 'confirmation',
    UPDATE: 'update'
};

export const mockNotifications = [
    {
        id: '1',
        type: notificationTypes.CONFIRMATION,
        title: 'Appointment Confirmed',
        message: 'Your appointment with Dr. Sarah Johnson on Jan 15, 2026 at 10:00 AM has been confirmed.',
        timestamp: new Date('2026-01-14T14:30:00'),
        read: false
    },
    {
        id: '2',
        type: notificationTypes.REMINDER,
        title: 'Upcoming Appointment',
        message: 'Reminder: You have an appointment tomorrow at 10:00 AM.',
        timestamp: new Date('2026-01-14T09:00:00'),
        read: false
    },
    {
        id: '3',
        type: notificationTypes.UPDATE,
        title: 'New Service Available',
        message: 'We now offer Invisalign treatment! Book a consultation today.',
        timestamp: new Date('2026-01-13T16:00:00'),
        read: true
    },
    {
        id: '4',
        type: notificationTypes.APPOINTMENT,
        title: 'Appointment Rescheduled',
        message: 'Your teeth cleaning appointment has been moved to Dec 12, 2025 at 3:00 PM.',
        timestamp: new Date('2026-01-10T11:20:00'),
        read: true
    },
    {
        id: '5',
        type: notificationTypes.REMINDER,
        title: 'Payment Due',
        message: 'Your payment for the last visit is due. Please settle your account.',
        timestamp: new Date('2026-01-08T10:00:00'),
        read: true
    },
    {
        id: '6',
        type: notificationTypes.CONFIRMATION,
        title: 'Test Results Ready',
        message: 'Your dental X-ray results are now available. Please check your patient portal.',
        timestamp: new Date('2026-01-07T15:30:00'),
        read: true
    },
    {
        id: '7',
        type: notificationTypes.REMINDER,
        title: 'Annual Checkup Due',
        message: 'It\'s time for your annual dental checkup. Schedule your appointment today!',
        timestamp: new Date('2026-01-06T09:00:00'),
        read: false
    },
    {
        id: '8',
        type: notificationTypes.UPDATE,
        title: 'New Office Hours',
        message: 'We\'re now open on Saturdays from 9 AM to 2 PM for your convenience.',
        timestamp: new Date('2026-01-05T12:00:00'),
        read: true
    },
    {
        id: '9',
        type: notificationTypes.APPOINTMENT,
        title: 'Follow-up Required',
        message: 'Dr. Johnson recommends a follow-up visit in 2 weeks. Please schedule soon.',
        timestamp: new Date('2026-01-04T14:20:00'),
        read: false
    },
    {
        id: '10',
        type: notificationTypes.REMINDER,
        title: 'Prescription Ready',
        message: 'Your prescribed mouthwash is ready for pickup at the front desk.',
        timestamp: new Date('2026-01-03T11:00:00'),
        read: true
    },
    {
        id: '11',
        type: notificationTypes.UPDATE,
        title: 'Insurance Update',
        message: 'We now accept Delta Dental insurance. Update your profile if applicable.',
        timestamp: new Date('2026-01-02T10:30:00'),
        read: true
    },
    {
        id: '12',
        type: notificationTypes.CONFIRMATION,
        title: 'Payment Received',
        message: 'Thank you! Your payment of $150 has been successfully processed.',
        timestamp: new Date('2026-01-01T16:45:00'),
        read: true
    }
];

// Helper function to format timestamp
export const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
