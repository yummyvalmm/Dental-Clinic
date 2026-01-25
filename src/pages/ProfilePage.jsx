import { AnimatePresence, motion } from 'framer-motion';
import { User, LogOut, FileText, Shield, HelpCircle, ChevronRight, Mail, Phone, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, isLoggedIn, role, logout } = useAuth();

    const resources = [
        ...(role === 'admin' ? [{ label: 'Admin Panel', icon: Settings, path: '/admin' }] : []),
        { label: 'Privacy Policy', icon: Shield, path: '#' },
        { label: 'Terms of Service', icon: FileText, path: '#' },
        { label: 'Help & Support', icon: HelpCircle, path: '/hotline' }
    ];

    const menuItems = [
        { label: 'Account Settings', icon: Settings, path: '/settings' },
        { label: 'Notifications', icon: Mail, path: '#' },
    ];

    return (
        <div className="min-h-[100dvh] w-full bg-bg-body relative flex flex-col pt-24 pb-32 px-6 overflow-hidden">

            {/* Ambient Background */}
            {/* Ambient Background - Dynamic Liquid Blobs - Fixed to Viewport */}
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/30 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal z-0" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal z-0" />
            <div className="fixed top-[20%] left-[50%] w-[300px] h-[300px] bg-indigo-300/20 dark:bg-transparent rounded-full blur-[80px] pointer-events-none mix-blend-multiply dark:mix-blend-normal z-0" />

            <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end mb-2"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-1">Profile</h1>
                        <p className="text-[var(--color-text-muted)] text-sm">Manage your account</p>
                    </div>
                </motion.div>

                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <GlassSurface
                        className="rounded-[2rem] p-6 relative overflow-hidden"
                        intensity="high"
                    >
                        {isLoggedIn && user ? (
                            // Logged In View
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-blue-500/20 mb-4 border-4 border-white/10">
                                    {user.avatar}
                                </div>
                                <h2 className="text-xl font-bold text-[var(--color-text-main)] text-center mb-1">{user.name}</h2>
                                <p className="text-[var(--color-text-muted)] text-sm mb-6">{user.email}</p>

                                <button
                                    onClick={logout}
                                    className="px-6 py-2 rounded-xl bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] text-sm font-medium transition-colors border border-[var(--glass-border)] flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            // Guest View
                            <div className="flex flex-col items-center text-center py-4">
                                <div className="w-20 h-20 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center mb-4 text-[var(--color-text-muted)]">
                                    <User size={40} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-2">Welcome</h2>
                                <p className="text-[var(--color-text-muted)] text-sm mb-6 max-w-[200px]">Sign in to manage your appointments and more</p>

                                <div className="w-full">
                                    <Link to="/login" className="block w-full btn-liquid py-3 rounded-xl text-[var(--color-text-main)] font-bold text-sm text-center">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </GlassSurface>
                </motion.div>

                {/* Logged In - Account Menu */}
                {isLoggedIn && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] pl-4 font-bold">Account</h3>
                        {menuItems.map((item, index) => (
                            <Link to={item.path} key={index} className="block">
                                <GlassSurface className="p-4 rounded-[2rem]" intensity="low">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-10 h-10 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors shrink-0">
                                                <item.icon size={18} />
                                            </div>
                                            <span className="text-[var(--color-text-main)]/80 group-hover:text-[var(--color-text-main)] font-medium">{item.label}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors shrink-0" />
                                    </div>
                                </GlassSurface>
                            </Link>
                        ))}
                    </motion.div>
                )}


                {/* Resources Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isLoggedIn ? 0.3 : 0.2 }}
                    className="flex flex-col gap-3"
                >
                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] pl-4 font-bold">Resources</h3>
                    {resources.map((item, index) => (
                        <Link to={item.path} key={index} className="block">
                            <GlassSurface className="p-4 rounded-[2rem]" intensity="low">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors shrink-0">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="text-[var(--color-text-main)]/80 group-hover:text-[var(--color-text-main)] font-medium">{item.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors shrink-0" />
                                </div>
                            </GlassSurface>
                        </Link>
                    ))}
                </motion.div>

                <div className="mt-4 text-center">
                    <p className="text-[var(--color-text-muted)]/50 text-xs">Version 1.0.0 • Build 2026.1</p>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
