import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
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
        <AuthContext.Provider value={{ user, isLoggedIn: !!user && !loading, loading, signup, login, loginWithGoogle, logout }}>
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
