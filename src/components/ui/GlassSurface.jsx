import React from 'react';
import { motion } from 'framer-motion';
import { useHaptic } from '../../hooks/useHaptic';
import { useMobileView } from '../../hooks/useMobileView';

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
const GlassSurface = React.memo(({
    children,
    className = '',
    blur = 'medium',  // 'low' (12px), 'medium' (20px), 'high' (30px)
    elevation = 1,    // 0 = Transparent, 1 = Card (Opaque), 2 = Modal (Glassy)
    tint = true,      // Legibility layer
    allowOverflow = false,  // Allow children to scroll
    onClick,
    animated = false,
    ...props
}) => {
    const { trigger } = useHaptic();
    const isMobile = useMobileView();

    // Blur levels using CSS variables for responsiveness
    const blurLevels = {
        low: 'backdrop-blur-[var(--glass-blur-sm)]',
        medium: 'backdrop-blur-[var(--glass-blur-md)]',
        high: 'backdrop-blur-[var(--glass-blur-lg)]'
    };

    // Background levels based on Elevation (Visual Hierarchy)
    const bgLevels = {
        0: 'bg-transparent',
        1: 'bg-[var(--glass-bg-low)]',   // High Contrast / Grounded
        1.5: 'bg-[var(--glass-bg-medium)]',
        2: 'bg-[var(--glass-bg-high)]'   // Glassy / Floating
    };

    // Base glass styling - Mobile UI Standards 2026
    const blurClass = blurLevels[blur] || blurLevels['medium'];
    const bgClass = bgLevels[elevation] || bgLevels[1];

    // Memoize styles to prevent re-calculations
    const style = React.useMemo(() => ({
        boxShadow: `var(--glass-shadow-deep), inset 0 1px 0 0 var(--glass-highlight)`
    }), []);

    const handleInteraction = (e) => {
        if (onClick) {
            trigger();
            onClick(e);
        }
    };

    const Component = animated ? motion.div : 'div';

    return (
        <Component
            className={`
                ${blurClass}
                ${bgClass}
                border border-[var(--glass-border)]
                group relative
                ${allowOverflow ? '' : 'overflow-hidden'}
                transition-all duration-300 ease-out
                translate-z-0 will-change-transform
                ${onClick ? 'cursor-pointer active:scale-95' : ''}
                ${className} // User classes last to override
            `.trim().replace(/\s+/g, ' ')}
            style={style}
            onClick={handleInteraction}
            {...props}
        >
            {/* 1. Noise Texture for Tactile Feel - Desktop Only */}
            {!isMobile && <div className="bg-noise" />}

            {/* 2. Shine Gradient (Liquid Light) - Hover only on non-touch devices */}
            {!isMobile && (
                <div
                    className="absolute inset-0 bg-[image:var(--glass-shine)] opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]"
                />
            )}

            {/* 3. Legibility tint layer - 5% white per Mobile UI Standards */}
            {tint && (
                <div className="absolute inset-0 bg-white/5 pointer-events-none z-[1]" />
            )}

            {/* Content layer above tint */}
            <div className="relative z-10 flex flex-col flex-1 min-h-0">
                {children}
            </div>
        </Component>
    );
});

export default GlassSurface;
