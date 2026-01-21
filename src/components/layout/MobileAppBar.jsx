import { useState } from 'react';
import { Phone, Calendar, MapPin, Home, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

    return (
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 lg:hidden pointer-events-none">
            <GlassSurface
                initial={{ y: 100 }}
                animate={{ y: shouldHide ? 200 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="rounded-full px-6 py-4 flex justify-between items-center w-full pointer-events-auto min-h-[80px]"
                intensity="medium"
            >
                {/* Home */}
                <NavLink to="/" aria-label="Home" className="relative flex-1 flex flex-col items-center gap-1 group z-10 min-h-[44px] min-w-[44px] justify-center">
                    {({ isActive }) => (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onTapStart={handleTap}
                            className="flex flex-col items-center"
                        >
                            <div className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent/80 rounded-full blur-[8px]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-accent text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                                    <Home size={18} />
                                </div>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>Home</span>
                        </motion.div>
                    )}
                </NavLink>

                {/* Visit */}
                <NavLink to="/visit" aria-label="Visit Clinic" className="relative flex-1 flex flex-col items-center gap-1 group z-10 min-h-[44px] min-w-[44px] justify-center">
                    {({ isActive }) => (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onTapStart={handleTap}
                            className="flex flex-col items-center"
                        >
                            <div className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent/80 rounded-full blur-[8px]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-accent text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                                    <MapPin size={18} />
                                </div>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>Visit</span>
                        </motion.div>
                    )}
                </NavLink>

                {/* Hotline (Now a Page) */}
                <NavLink to="/hotline" aria-label="Emergency Hotline" className="relative flex-1 flex flex-col items-center gap-1 group z-10 min-h-[44px] min-w-[44px] justify-center">
                    {({ isActive }) => (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onTapStart={handleTap}
                            className="flex flex-col items-center"
                        >
                            <div className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent/80 rounded-full blur-[8px]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-accent text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                                    <Phone size={18} />
                                </div>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>Hotline</span>
                        </motion.div>
                    )}
                </NavLink>



            </GlassSurface>
        </div>
    );
};

export default MobileAppBar;
