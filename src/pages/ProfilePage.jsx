import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, FileText, Shield, HelpCircle, ChevronRight, Mail, Phone, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

const ProfilePage = () => {
    // Mock authentication state - toggle this to test different views
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mock user data
    const user = {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+44 7700 900123",
        avatar: "SJ"
    };

    const resources = [
        { label: 'Privacy Policy', icon: Shield, path: '#' },
        { label: 'Terms of Service', icon: FileText, path: '#' },
        { label: 'Help & Support', icon: HelpCircle, path: '/hotline' }
    ];

    const menuItems = [
        { label: 'Account Settings', icon: Settings, path: '#' },
        { label: 'Notifications', icon: Mail, path: '#' },
    ];

    return (
        <div className="min-h-[100dvh] w-full bg-bg-body relative flex flex-col pt-24 pb-32 px-6 overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end mb-2"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Profile</h1>
                        <p className="text-white/50 text-sm">Manage your account</p>
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
                        {isLoggedIn ? (
                            // Logged In View
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-blue-500/20 mb-4 border-4 border-white/10">
                                    {user.avatar}
                                </div>
                                <h2 className="text-xl font-bold text-white text-center mb-1">{user.name}</h2>
                                <p className="text-white/50 text-sm mb-6">{user.email}</p>

                                <button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors border border-white/5 flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            // Guest View
                            <div className="flex flex-col items-center text-center py-4">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/30">
                                    <User size={40} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">Welcome</h2>
                                <p className="text-white/50 text-sm mb-6 max-w-[200px]">Sign in to manage your appointments and more</p>

                                <div className="flex gap-3 w-full">
                                    <Link to="/login" className="flex-1 btn-liquid py-3 rounded-xl text-white font-bold text-sm text-center">
                                        Login
                                    </Link>
                                    <button
                                        onClick={() => setIsLoggedIn(true)} // Simulate login for demo
                                        className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors border border-white/10"
                                    >
                                        Sign Up
                                    </button>
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
                        className="space-y-3"
                    >
                        <h3 className="text-xs uppercase tracking-widest text-white/40 pl-4 font-bold">Account</h3>
                        {menuItems.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <GlassSurface className="p-4 rounded-2xl flex items-center justify-between group mb-3 last:mb-0 hover:bg-white/5 transition-colors" intensity="low">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white font-medium">{item.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-white/20 group-hover:text-white/50 transition-colors" />
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
                    className="space-y-3"
                >
                    <h3 className="text-xs uppercase tracking-widest text-white/40 pl-4 font-bold">Resources</h3>
                    {resources.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <GlassSurface className="p-4 rounded-2xl flex items-center justify-between group mb-3 last:mb-0 hover:bg-white/5 transition-colors" intensity="low">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="text-white/80 group-hover:text-white font-medium">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-white/20 group-hover:text-white/50 transition-colors" />
                            </GlassSurface>
                        </Link>
                    ))}
                </motion.div>

                <div className="mt-4 text-center">
                    <p className="text-white/20 text-xs">Version 1.0.0 • Build 2026.1</p>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
