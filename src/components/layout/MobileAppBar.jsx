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
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="glass-dense px-6 py-3 flex flex-row justify-between items-center w-full pointer-events-auto min-h-[68px] rounded-[2.5rem]"
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
                                    className="relative flex flex-col items-center justify-center gap-1"
                                >
                                    {/* Icon */}
                                    <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                                        {/* Active Glow Effect behind icon */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navGlow"
                                                className="absolute inset-0 bg-white/20 rounded-xl blur-md -z-10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </div>

                                    {/* Active Indicator Dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navDot"
                                            className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </NavLink>
                    ))}
                </motion.nav>
            )}
        </div>
    );
};

export default MobileAppBar;
