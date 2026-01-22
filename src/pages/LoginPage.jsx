import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, ArrowRight, ArrowLeft, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page they were trying to visit, or default to home
    const from = location.state?.from?.pathname || "/";

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);

        try {
            if (isSignUp) {
                await signup(email, password);
                toast.success('Account created successfully!');
            } else {
                await login(email, password);
                toast.success('Welcome back!');
            }
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            // Friendly error messages
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') setError('Incorrect password.');
            else if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') setError('Account not found. Please sign up or check your email.');
            else if (err.code === 'auth/email-already-in-use') setError('Email already in use.');
            else if (err.code === 'auth/weak-password') setError('Password should be at least 6 characters.');
            else setError('Failed to authenticate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await loginWithGoogle();
            toast.success('Signed in with Google');
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Google sign-in failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] w-full bg-bg-body relative flex flex-col items-center justify-center p-6 overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Back Button */}
            <Link to="/" className="absolute top-8 left-6 w-10 h-10 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-medium)] hover:text-[var(--color-text-main)] transition-all z-20 border border-[var(--glass-border)]">
                <ArrowLeft size={20} />
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-3xl font-serif font-bold text-white shadow-xl shadow-blue-500/20 mb-6">
                        D
                    </div>
                    <h1 className="text-3xl font-serif text-[var(--color-text-main)] mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-[var(--color-text-muted)]">
                        {isSignUp ? 'Sign up to get started' : 'Login to manage your appointments'}
                    </p>
                </div>

                {/* Glass Card */}
                <GlassSurface
                    className="rounded-[2.5rem] p-8 relative overflow-hidden"
                    intensity="high"
                    shimmer={true}
                >
                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 flex items-center gap-2 text-red-200 text-sm"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form Fields */}
                    <form onSubmit={handleAuth} className="space-y-6">

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2 pl-4">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(''); // Clear error on change
                                    }}
                                    placeholder="hello@example.com"
                                    required
                                    className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] rounded-2xl px-6 py-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium pl-12"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-accent transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="group">
                            <label className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2 pl-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] rounded-2xl px-6 py-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium pl-12 pr-12"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-accent transition-colors" size={20} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full btn-liquid rounded-2xl py-4 text-[var(--color-primary-inverse)] font-bold tracking-wide flex items-center justify-center gap-2 group mt-4 text-blue-900 border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>{isSignUp ? 'Sign Up' : 'Continue'}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[var(--color-text-muted)]/60 text-sm">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            {' '}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-accent hover:text-[var(--color-text-main)] transition-colors font-bold"
                            >
                                {isSignUp ? 'Login' : 'Sign up'}
                            </button>
                        </p>
                    </div>

                    <div className="relative my-8 flex items-center gap-4">
                        <div className="h-px bg-[var(--glass-border)] flex-1" />
                        <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-medium">Or continue with</span>
                        <div className="h-px bg-[var(--glass-border)] flex-1" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] border border-[var(--glass-border)] rounded-xl text-[var(--color-text-main)] font-medium transition-all group disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{ fill: "#4285F4" }} />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: "#34A853" }} />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" style={{ fill: "#FBBC05" }} />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{ fill: "#EA4335" }} />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </GlassSurface>
            </motion.div>
        </div>
    );
};

export default LoginPage;
