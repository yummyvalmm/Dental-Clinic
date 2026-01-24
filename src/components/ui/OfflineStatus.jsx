import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from './GlassSurface';

const OfflineStatus = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleRetry = () => {
        if (navigator.onLine) {
            setIsOffline(false);
        } else {
            // Shake animation or toast could go here
            // For now, just a little visual feedback if it fails
            window.location.reload();
        }
    };

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none"
                >
                    <GlassSurface
                        className="max-w-md w-full p-4 flex items-center justify-between gap-4 rounded-2xl border-orange-500/20 shadow-lg pointer-events-auto bg-orange-500/10 backdrop-blur-xl"
                        intensity="high"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                <WifiOff size={20} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-sm font-bold text-white leading-tight">Working Offline</h2>
                                <p className="text-[10px] text-white/60">Using cached data. Some features limited.</p>
                            </div>
                        </div>

                        <button
                            onClick={handleRetry}
                            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors"
                        >
                            <RefreshCw size={12} />
                            <span>Retry</span>
                        </button>
                    </GlassSurface>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineStatus;
