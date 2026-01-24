import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Admin Seed Service
 * Utility to grant admin status to a specific UID.
 */
export const adminSeedService = {
    /**
     * Grant admin role to a user UID.
     * @param {string} uid - The user's Firebase UID
     */
    grantAdminRole: async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, {
                role: 'admin',
                updatedAt: serverTimestamp()
            }, { merge: true });
            console.log(`Successfully granted admin role to UID: ${uid}`);
            return true;
        } catch (error) {
            console.error("Error granting admin role:", error);
            throw error;
        }
    }
};
