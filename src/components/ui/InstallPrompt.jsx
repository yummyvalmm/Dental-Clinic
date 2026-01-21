import React, { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Prevent default install prompt on Android
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Check if app is not already installed
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                setShowPrompt(true);
            }
        };

        // Detect iOS
        const checkIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        };

        // Check standalone mode (is already installed?)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        if (checkIOS() && !isStandalone) {
            setIsIOS(true);
            // Show iOS prompt after a short delay to let site load
            setTimeout(() => setShowPrompt(true), 3000);
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!isIOS && deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
            }
        } else {
            // For iOS, just dismiss valid modal (user has to do it manually)
            // We keep the detailed instructions visible
        }
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 left-4 right-4 z-50 md:bottom-8 md:right-8 md:left-auto md:w-96"
            >
                <div className="glass-liquid-dark p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-slate-900/80">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                            <Download className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Install App</h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {isIOS
                                    ? "Install on your home screen for the best full-screen experience."
                                    : "Add to Home Screen for instant access and a better experience."}
                            </p>
                        </div>
                    </div>

                    {isIOS ? (
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-white/80 bg-white/5 p-3 rounded-xl">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Share size={16} />
                                </span>
                                <span>Tap the <strong>Share</strong> button below</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80 bg-white/5 p-3 rounded-xl">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <span className="font-bold text-xs">＋</span>
                                </span>
                                <span>Select <strong>Add to Home Screen</strong></span>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstallClick}
                            className="mt-6 w-full btn-liquid py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
                        >
                            Install Now
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InstallPrompt;
