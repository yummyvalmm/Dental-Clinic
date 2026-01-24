import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * User Service
 * Handles Firestore operations related to user profiles and roles.
 */
export const userService = {
    /**
     * Fetch user profile from Firestore.
     * @param {string} uid - User unique ID
     * @returns {Promise<object|null>} User profile data
     */
    getUserProfile: async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data();
            }
            return null;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    },

    /**
     * Create or update user profile.
     * @param {string} uid - User unique ID
     * @param {object} profileData - Profile details
     */
    createUserProfile: async (uid, profileData) => {
        try {
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, {
                ...profileData,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw error;
        }
    }
};
