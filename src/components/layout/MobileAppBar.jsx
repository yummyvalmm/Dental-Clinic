import { useState } from 'react';
import { Phone, Calendar, FileText, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import GlassSurface from '../ui/GlassSurface';

const MobileAppBar = ({ isMenuOpen }) => {
    const location = useLocation();
    const hideOnRoutes = ['/login', '/settings'];
    const shouldHide = isMenuOpen || hideOnRoutes.includes(location.pathname);

    // Haptic feedback helper
    const handleTap = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10); // Light tap
        }
    };

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/book', icon: Calendar, label: 'Book' },
        { path: '/history', icon: FileText, label: 'History' },
        { path: '/profile', icon: User, label: 'Profile' }
    ];

    return (
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 lg:hidden pointer-events-none">
            <div className="relative">
                {/* Ambient glow behind menu bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 via-indigo-500/20 to-purple-500/10 rounded-full blur-2xl opacity-60" />

                <GlassSurface
                    initial={{ y: 100 }}
                    animate={{ y: shouldHide ? 200 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative rounded-full px-6 py-4 flex justify-between items-center w-full pointer-events-auto min-h-[80px] shadow-[0_-8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:shadow-[0_-12px_48px_rgba(0,0,0,0.5),0_0_80px_rgba(59,130,246,0.3)] transition-all duration-300"
                    intensity="high"
                >
                    {/* Top glossy highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />

                    {/* Shine gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-white/10 to-transparent rounded-full pointer-events-none" />
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            aria-label={item.label}
                            className="relative flex-1 flex flex-col items-center gap-1 group z-10 min-h-[44px] min-w-[44px] justify-center"
                        >
                            {({ isActive }) => (
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    onTapStart={handleTap}
                                    className="relative flex items-center justify-center"
                                >
                                    {/* Glass pill background - elongated pill shape (length > width) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -inset-x-5 -inset-y-3 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.3)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon only - no text label */}
                                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                </motion.div>
                            )}
                        </NavLink>
                    ))}
                </GlassSurface>
            </div>
        </div>
    );
};

export default MobileAppBar;
