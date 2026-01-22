import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassSurface Component - Proper Glassmorphism
 * 
 * Implements true glassmorphism with:
 * 1. Blur hierarchy (10px, 20px, 30px) for depth
 * 2. Legibility tint layers to prevent text bleeding
 * 3. Works with vibrant background gradients
 */
const GlassSurface = ({
    children,
    className = '',
    blur = 'medium',  // 'low' (10px), 'medium' (20px), 'high' (30px)
    tint = true,      // Legibility layer
    onClick,
    animated = false,
    ...props
}) => {
    // Blur levels for hierarchy
    const blurLevels = {
        low: 'backdrop-blur-[10px]',      // Background cards
        medium: 'backdrop-blur-[20px]',   // Primary surfaces
        high: 'backdrop-blur-[30px]'      // Modals/overlays
    };

    // Base glass styling - Mobile UI Standards 2026
    const baseClasses = `
        ${blurLevels[blur]}
        bg-white/15
        border border-white/20
        shadow-xl
        relative
        overflow-hidden
        transition-all
        duration-300
        transform
        translate-z-0
        will-change-transform
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const Component = animated ? motion.div : 'div';

    return (
        <Component
            className={baseClasses}
            onClick={onClick}
            {...props}
        >
            {/* Legibility tint layer - 5% white per Mobile UI Standards */}
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
