import React, { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // Lazy initialization for iOS check to avoid setState in useEffect (performance)
    const [isIOS] = useState(() => {
        const checkIOS = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        return checkIOS() && !isStandalone;
    });

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

        if (isIOS) {
            // Show iOS prompt after a short delay to let site load
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, [isIOS]);

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
                <div className="p-6 rounded-3xl border border-[var(--glass-border)] shadow-2xl relative overflow-hidden backdrop-blur-xl bg-[var(--glass-bg-high)] backdrop-saturate-[180%]">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                            <Download className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-1">Install App</h3>
                            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                {isIOS
                                    ? "Install on your home screen for the best full-screen experience."
                                    : "Add to Home Screen for instant access and a better experience."}
                            </p>
                        </div>
                    </div>

                    {isIOS ? (
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-[var(--color-text-main)] bg-[var(--glass-bg-low)] p-3 rounded-xl border border-[var(--glass-border)]">
                                <span className="w-8 h-8 rounded-full bg-[var(--glass-bg-medium)] flex items-center justify-center shrink-0">
                                    <Share size={16} />
                                </span>
                                <span>Tap the <strong>Share</strong> button below</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[var(--color-text-main)] bg-[var(--glass-bg-low)] p-3 rounded-xl border border-[var(--glass-border)]">
                                <span className="w-8 h-8 rounded-full bg-[var(--glass-bg-medium)] flex items-center justify-center shrink-0">
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
