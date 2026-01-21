import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

const LoginPage = () => {
    const [method, setMethod] = useState('email'); // 'email' or 'phone'
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="min-h-[100dvh] w-full bg-bg-body relative flex flex-col items-center justify-center p-6 overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Back Button */}
            <Link to="/" className="absolute top-8 left-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all z-20 border border-white/5">
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
                    <h1 className="text-3xl font-serif text-white mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-white/50">
                        {isSignUp ? 'Sign up to get started' : 'Login to manage your appointments'}
                    </p>
                </div>

                {/* Glass Card */}
                <GlassSurface
                    className="rounded-[2.5rem] p-8 relative overflow-hidden"
                    intensity="high"
                    shimmer={true}
                >

                    {/* Method Toggle */}
                    <div className="flex p-1 bg-white/5 rounded-2xl mb-8 relative">
                        {/* Sliding Background */}
                        <motion.div
                            className="absolute top-1 bottom-1 bg-white/10 rounded-xl shadow-sm"
                            layoutId="activeTab"
                            initial={false}
                            animate={{
                                left: method === 'email' ? '4px' : '50%',
                                width: 'calc(50% - 4px)'
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />

                        <button
                            onClick={() => setMethod('email')}
                            className={`flex-1 relative z-10 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${method === 'email' ? 'text-white' : 'text-white/40'}`}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => setMethod('phone')}
                            className={`flex-1 relative z-10 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${method === 'phone' ? 'text-white' : 'text-white/40'}`}
                        >
                            Phone
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={method}
                                initial={{ opacity: 0, x: method === 'email' ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: method === 'email' ? 20 : -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {method === 'email' ? (
                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 pl-4">Email Address</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder="hello@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-medium"
                                                />
                                                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 pl-4">Phone Number</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    placeholder="+44 7700 900000"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-medium"
                                                />
                                                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <button className="w-full btn-liquid rounded-2xl py-4 text-white font-bold tracking-wide flex items-center justify-center gap-2 group mt-4">
                            <span>{isSignUp ? 'Sign Up' : 'Continue'}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-white/40 text-sm">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                                {' '}
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-accent hover:text-white transition-colors font-bold"
                                >
                                    {isSignUp ? 'Login' : 'Sign up'}
                                </button>
                            </p>
                        </div>

                        <div className="relative my-8 flex items-center gap-4">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Or continue with</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all group">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{ fill: "#4285F4" }} />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: "#34A853" }} />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" style={{ fill: "#FBBC05" }} />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{ fill: "#EA4335" }} />
                                </svg>
                                <span>Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all group">
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>Facebook</span>
                            </button>
                        </div>
                    </div>
                </GlassSurface>
            </motion.div>
        </div>
    );
};

export default LoginPage;
