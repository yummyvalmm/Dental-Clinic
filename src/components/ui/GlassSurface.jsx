import React from 'react';

/**
 * GlassSurface - A reusable glassmorphism surface component
 * Provides a modern glass effect with customizable intensity and hover effects
 */
const GlassSurface = ({
    children,
    className = '',
    intensity = 'medium',
    hoverEffect = false,
    onClick,
    ...props
}) => {
    // Define intensity levels for the glass effect
    const intensityClasses = {
        low: 'bg-white/5 backdrop-blur-sm border border-white/5',
        medium: 'bg-white/10 backdrop-blur-md border border-white/10',
        high: 'bg-white/15 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]',
    };

    // Hover effect classes
    const hoverClasses = hoverEffect
        ? 'hover:bg-white/20 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
        : '';

    return (
        <div
            className={`${intensityClasses[intensity]} ${hoverClasses} ${className} transition-all duration-300`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassSurface;
