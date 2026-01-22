import admin from 'firebase-admin';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// 1. Initialize Firebase Admin
// You must download a service account key from Firebase Console -> Project Settings -> Service Accounts
// and save it as "service-account.json" in the root directory.
try {
    const serviceAccount = require("../service-account.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    console.error("❌ ERROR: Could not load 'service-account.json'.");
    console.log("👉 Go to Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key");
    console.log("👉 Download the file, rename it to 'service-account.json', and place it in the project root.");
    process.exit(1);
}

const db = admin.firestore();
const messaging = admin.messaging();

async function sendBroadcast() {
    console.log("📢 Starting Broadcast...");

    // 2. Fetch all tokens from Firestore
    const tokensSnapshot = await db.collection('user_push_tokens').get();

    if (tokensSnapshot.empty) {
        console.log("⚠️ No tokens found in 'user_push_tokens' collection.");
        return;
    }

    const tokens = tokensSnapshot.docs.map(doc => doc.id);
    console.log(`✅ Found ${tokens.length} recipients.`);

    // 3. Define the Message
    const message = {
        notification: {
            title: 'Nova Dental Update',
            body: 'This is a broadcast message to all users! 🚀'
        },
        webpush: {
            fcmOptions: {
                link: '/'
            },
            notification: {
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png'
            }
        },
        tokens: tokens // Multicast
    };

    // 4. Send
    try {
        const response = await messaging.sendEachForMulticast(message);
        console.log(`🎉 Successfully sent ${response.successCount} messages.`);

        if (response.failureCount > 0) {
            console.log(`❌ Failed to send ${response.failureCount} messages.`);
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    console.log(`   - Token: ${tokens[idx]}`);
                    console.log(`     Error: ${resp.error.message}`);

                    // Cleanup invalid tokens
                    if (resp.error.code === 'messaging/registration-token-not-registered') {
                        console.log(`     🗑️ Deleting invalid token from DB...`);
                        db.collection('user_push_tokens').doc(tokens[idx]).delete();
                    }
                }
            });
        }
    } catch (error) {
        console.error('❌ Error sending broadcast:', error);
    }
}

sendBroadcast();
