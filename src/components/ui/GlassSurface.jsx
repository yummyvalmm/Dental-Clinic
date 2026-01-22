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
    // Define intensity using new adaptive CSS variables
    // Added 'backdrop-saturate-[180%]' for that premium Apple liquid glass feel
    const intensityClasses = {
        low: 'bg-[var(--glass-bg-low)] backdrop-blur-xl backdrop-saturate-[180%] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]',
        medium: 'bg-[var(--glass-bg-medium)] backdrop-blur-2xl backdrop-saturate-[180%] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]',
        high: 'bg-[var(--glass-bg-high)] backdrop-blur-3xl backdrop-saturate-[180%] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]',
    };

    // Hover effect classes
    const hoverClasses = hoverEffect
        ? 'hover:bg-[var(--glass-bg-medium)] hover:border-[var(--glass-border-hover)] hover:shadow-[var(--glass-shadow-hover)] cursor-pointer'
        : '';

    return (
        <div
            className={`${intensityClasses[intensity]} ${hoverClasses} ${className} transition-all duration-300 text-[var(--color-text-main)]`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassSurface;
