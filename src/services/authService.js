import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

/**
 * Auth Service
 * Encapsulates all authentication-related business logic.
 */
export const authService = {
    /**
     * Subscribe to authentication state changes.
     * @param {function} callback - Function to call when auth state changes
     * @returns {function} Unsubscribe function
     */
    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    },

    /**
     * Create a new user with email and password.
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}
     */
    signup: (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    },

    /**
     * Sign in an existing user with email and password.
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}
     */
    login: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    },

    /**
     * Sign in with Google Popup.
     * @returns {Promise}
     */
    loginWithGoogle: () => {
        return signInWithPopup(auth, googleProvider);
    },

    /**
     * Sign out the current user.
     * @returns {Promise}
     */
    logout: () => {
        return signOut(auth);
    },

    /**
     * Get the current authenticated user instance.
     * @returns {object|null}
     */
    getCurrentUser: () => {
        return auth.currentUser;
    }
};
