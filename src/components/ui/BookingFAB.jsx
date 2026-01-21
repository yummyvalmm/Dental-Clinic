import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const BookingFAB = () => {
    const location = useLocation();
    // Hide FAB on Booking page to avoid clutter
    if (location.pathname === '/book') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                className="fixed bottom-24 right-4 z-40 lg:hidden"
            >
                <Link
                    to="/book"
                    aria-label="Book Appointment"
                    className="flex items-center gap-2 bg-accent text-white px-5 py-4 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] active:scale-95 transition-transform backdrop-blur-md border border-white/20"
                >
                    <Calendar size={20} fill="currentColor" className="text-white/90" />
                    <span className="font-bold text-sm uppercase tracking-wider">Book Now</span>
                </Link>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingFAB;
