import { useCallback } from 'react';

/**
 * useHaptic Hook
 * 
 * Provides a method to trigger haptic feedback on supported devices.
 * Respects 'prefers-reduced-motion' media query.
 */
export const useHaptic = () => {
    const trigger = useCallback(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Check if navigator.vibrate is supported
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            // Light impact feedback (10ms)
            navigator.vibrate(10);
        }
    }, []);

    return { trigger };
};
