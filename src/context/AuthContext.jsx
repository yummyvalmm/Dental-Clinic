import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const profile = await userService.getUserProfile(currentUser.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error("AuthContext: Error fetching profile:", error);
                }
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Auth Actions - Delegated to Service
    const signup = (email, password) => authService.signup(email, password);
    const login = (email, password) => authService.login(email, password);
    const loginWithGoogle = () => authService.loginWithGoogle();
    const logout = () => authService.logout();

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user && !loading,
            loading,
            role: userProfile?.role || 'user',
            userProfile,
            signup,
            login,
            loginWithGoogle,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
