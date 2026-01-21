import webpush from 'web-push';

// 1. VAPID Keys (Generated previously)
const publicVapidKey = 'BCjWQQeDjgsX_G01LB37TzhAeB9ctflVYFuf_0WcVa34QrZnkIbbk0JXnXQa5gTm1rnT8QiOqBkoNXS9mNNho9s';
const privateVapidKey = 'ZkeOC-x5mYtrw31kR6giqsvDuAR98CKZCymJQceSWr0';

webpush.setVapidDetails(
    'mailto:admin@dentalstudio.com',
    publicVapidKey,
    privateVapidKey
);

// 2. PASTE YOUR SUBSCRIPTION OBJECT HERE
// Get this from the browser console log "User is subscribed:"
const subscription = {
    endpoint: 'PASTE_YOUR_ENDPOINT_HERE',
    keys: {
        p256dh: 'PASTE_YOUR_P256DH_KEY_HERE',
        auth: 'PASTE_YOUR_AUTH_KEY_HERE'
    }
};

// Check if subscription is populated
if (subscription.endpoint === 'PASTE_YOUR_ENDPOINT_HERE') {
    console.error('❌ ERROR: You must paste your subscription object into this script!');
    console.log('1. Open the app in your browser (http://localhost:5173)');
    console.log('2. Open DevTools Console');
    console.log('3. Click "Enable Notifications"');
    console.log('4. Copy the JSON object after "User is subscribed:"');
    console.log('5. Paste it into scripts/send-notification.js const subscription = ...');
    process.exit(1);
}

// 3. Payload
const payload = JSON.stringify({
    title: 'Appointment Reminder',
    body: 'Your wisdom teeth removal is scheduled for tomorrow at 10:00 AM.',
    url: '/appointments'
});

// 4. Send Notification
webpush.sendNotification(subscription, payload)
    .then(response => console.log('✅ Push Notification sent successfully!', response.statusCode))
    .catch(error => console.error('❌ Error sending notification:', error));
