import { useState } from 'react';
import { Phone, Calendar, FileText, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import GlassSurface from '../ui/GlassSurface';
import Surface from '../ui/Surface';
import { useLayout } from '../../context/LayoutContext';

const MobileAppBar = ({ isMenuOpen }) => {
    const location = useLocation();
    const { isNavbarHidden } = useLayout();
    const hideOnRoutes = ['/login', '/settings'];
    const shouldHide = isMenuOpen || hideOnRoutes.includes(location.pathname) || isNavbarHidden;

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
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50 lg:hidden pointer-events-none">
            {/* Clean menu bar with blur effect */}
            {!shouldHide && (
                <Surface
                    elevation="low"
                    background="subtle"
                    animated={true}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="px-6 py-2 flex flex-row justify-between items-center w-full pointer-events-auto min-h-[60px] rounded-full backdrop-blur-xl"
                >
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
                                    {/* Glass pill background - NO layoutId to prevent persistence */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute -inset-x-6 -inset-y-0.5 bg-gradient-to-b from-white/15 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-3xl border border-white/20 dark:border-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_20px_rgba(0,0,0,0.4)] z-0"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon only - no text label */}
                                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--glass-bg-low)]'}`}>
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                </motion.div>
                            )}
                        </NavLink>
                    ))}
                </Surface>
            )}
        </div>
    );
};

export default MobileAppBar;
