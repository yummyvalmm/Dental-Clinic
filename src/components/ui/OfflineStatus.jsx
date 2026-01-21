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
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-body/80 p-6"
                >
                    <GlassSurface
                        className="max-w-md w-full p-8 text-center flex flex-col items-center gap-6 rounded-3xl border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.2)]"
                        intensity="high"
                    >
                        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-inner">
                            <WifiOff size={32} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-serif text-white mb-2">You are offline</h2>
                            <p className="text-white/60 leading-relaxed">
                                Please checks your internet connection.
                                <br />Some features may be unavailable.
                            </p>
                        </div>

                        <button
                            onClick={handleRetry}
                            className="btn-liquid px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white"
                        >
                            <RefreshCw size={16} />
                            <span>Retry Connection</span>
                        </button>
                    </GlassSurface>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineStatus;
