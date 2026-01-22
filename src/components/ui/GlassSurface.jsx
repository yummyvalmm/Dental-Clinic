import React from 'react';
import { motion } from 'framer-motion';
import { useHaptic } from '../../hooks/useHaptic';

/**
 * GlassSurface Component - Proper Glassmorphism
 * 
 * Implements true glassmorphism with:
 * 1. Blur hierarchy (12px, 20px, 30px) for depth
 * 2. Legibility tint layers to prevent text bleeding
 * 3. Works with vibrant background gradients
 * 4. Haptic feedback on interaction
 * 5. Active state scaling
 */
const GlassSurface = ({
    children,
    className = '',
    blur = 'medium',  // 'low' (12px), 'medium' (20px), 'high' (30px)
    tint = true,      // Legibility layer
    onClick,
    animated = false,
    ...props
}) => {
    const { trigger } = useHaptic();

    // Blur levels for hierarchy - Updated to 2026 Standards (Min 12px)
    const blurLevels = {
        low: 'backdrop-blur-[12px]',      // Background cards
        medium: 'backdrop-blur-[20px]',   // Primary surfaces
        high: 'backdrop-blur-[30px]'      // Modals/overlays
    };

    // Base glass styling - Mobile UI Standards 2026
    const baseClasses = `
        ${blurLevels[blur]}
        bg-[var(--glass-bg-low)]
        border border-[var(--glass-border)]
        group
        relative
        overflow-hidden
        transition-all
        duration-500
        ease-out
        transform
        translate-z-0
        will-change-transform
        ${onClick ? 'cursor-pointer active:scale-95 hover:border-[var(--glass-border-hover)] hover:-translate-y-0.5' : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const handleInteraction = (e) => {
        if (onClick) {
            trigger();
            onClick(e);
        }
    };

    const Component = animated ? motion.div : 'div';

    return (
        <Component
            className={baseClasses}
            style={{
                boxShadow: `var(--glass-shadow-deep), inset 0 1px 0 0 var(--glass-highlight)` // Depth shadows + Top Rim Light
            }}
            onClick={handleInteraction}
            {...props}
        >
            {/* 1. Noise Texture for Tactile Feel */}
            <div className="bg-noise" />

            {/* 2. Shine Gradient (Liquid Light) */}
            <div
                className="absolute inset-0 bg-[image:var(--glass-shine)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
            />

            {/* 3. Legibility tint layer - 5% white per Mobile UI Standards */}
            {tint && (
                <div className="absolute inset-0 bg-white/5 pointer-events-none z-[1]" />
            )}

            {/* Content layer above tint */}
            <div className="relative z-10">
                {children}
            </div>
        </Component>
    );
};

export default GlassSurface;
