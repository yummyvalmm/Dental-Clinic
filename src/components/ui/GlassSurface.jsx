import React from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced GlassSurface Component
 * Premium glassmorphism with advanced features inspired by modern UI libraries
 * Optimized for PWA performance with adaptive blur and effects
 */
const GlassSurface = ({
    children,
    className = '',
    variant = 'card',
    blur = 'lg',
    tint = 'neutral',
    border = 'subtle',
    shadow = 'medium',
    shimmer = false,
    noise = 0,
    hoverEffect = false,
    onClick,
    animated = false,
    ...props
}) => {
    // Variant presets - optimized configurations for common use cases
    const variantPresets = {
        card: {
            blur: 'lg',
            border: 'subtle',
            shadow: 'medium',
            defaultClass: 'p-6'  // No rounding for cards
        },
        panel: {
            blur: 'xl',
            border: 'medium',
            shadow: 'low',
            defaultClass: 'p-8'  // No rounding for panels
        },
        overlay: {
            blur: '2xl',
            border: 'subtle',
            shadow: 'floating',
            defaultClass: 'p-6'  // No rounding for overlays
        },
        navbar: {
            blur: 'xl',
            border: 'glow',
            shadow: 'medium',
            defaultClass: 'rounded-full px-6 py-3'  // Keep navbar rounded
        },
        modal: {
            blur: '2xl',
            border: 'prominent',
            shadow: 'floating',
            defaultClass: 'p-8'  // No rounding for modals
        }
    };

    // Get preset values or use custom
    const preset = variantPresets[variant] || variantPresets.card;
    const finalBlur = blur || preset.blur;
    const finalBorder = border || preset.border;
    const finalShadow = shadow || preset.shadow;

    // Blur intensity classes
    const blurClasses = {
        none: '',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
        '2xl': 'backdrop-blur-2xl',
        '3xl': 'backdrop-blur-3xl'
    };

    // Tint overlay classes (adaptive for light/dark mode)
    const tintClasses = {
        neutral: 'bg-[var(--glass-bg-medium)]',
        primary: 'bg-gradient-to-br from-[var(--glass-bg-medium)] to-blue-500/10',
        accent: 'bg-gradient-to-br from-[var(--glass-bg-medium)] to-accent/10',
        success: 'bg-gradient-to-br from-[var(--glass-bg-medium)] to-green-500/10',
        warning: 'bg-gradient-to-br from-[var(--glass-bg-medium)] to-yellow-500/10',
        error: 'bg-gradient-to-br from-[var(--glass-bg-medium)] to-red-500/10'
    };

    // Border style classes
    const borderClasses = {
        none: '',
        subtle: 'border border-[var(--glass-border)]',
        medium: 'border-2 border-[var(--glass-border)]',
        prominent: 'border-2 border-[var(--glass-border)] ring-1 ring-[var(--glass-border)]',
        glow: 'border border-[var(--glass-border)] shadow-[0_0_20px_rgba(59,130,246,0.1)]'
    };

    // Shadow depth classes
    const shadowClasses = {
        flat: '',
        low: 'shadow-sm',
        medium: 'shadow-[var(--glass-shadow)]',
        high: 'shadow-xl shadow-black/10',
        floating: 'shadow-2xl shadow-black/20'
    };

    // Hover effect classes - improved for better visual feedback
    const hoverClasses = hoverEffect
        ? 'hover:bg-[var(--glass-bg-high)] hover:border-[var(--glass-border-hover)] hover:shadow-[var(--glass-shadow-hover)] hover:brightness-110 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]'
        : '';

    // Extract layout classes (flex, grid, and all related utilities) from className to apply to inner wrapper
    // This ensures flex/grid layouts work correctly even with the inner wrapper structure
    const layoutRegex = /(flex|grid|inline-flex|inline-grid|items-|justify-|gap-|content-|self-|place-|space-|divide-)[\w-\/\[\]()]*/g;
    const layoutClasses = className.match(layoutRegex)?.join(' ') || '';

    // Remove layout classes from outer className to avoid duplication
    const outerClassName = className.replace(layoutRegex, '').trim();

    // Combine all classes for outer container
    const combinedClasses = `
        ${blurClasses[finalBlur]}
        ${tintClasses[tint]}
        ${borderClasses[finalBorder]}
        ${shadowClasses[finalShadow]}
        ${hoverClasses}
        backdrop-saturate-[180%]
        text-[var(--color-text-main)]
        transition-all duration-300 ease-out
        relative overflow-hidden
        ${preset.defaultClass}
        ${outerClassName}
    `.trim().replace(/\s+/g, ' ');

    const Component = animated ? motion.div : 'div';

    return (
        <Component
            className={combinedClasses}
            onClick={onClick}
            {...props}
        >
            {/* Shimmer effect overlay */}
            {shimmer && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
            )}

            {/* Noise texture overlay */}
            {noise > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{
                        opacity: noise,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                    }}
                />
            )}

            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent opacity-50" />

            {/* Content - apply layout classes here to preserve flex/grid behavior */}
            <div className={`relative z-10 ${layoutClasses}`}>
                {children}
            </div>
        </Component>
    );
};

export default GlassSurface;
