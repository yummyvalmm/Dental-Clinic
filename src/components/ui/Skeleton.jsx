import React from 'react';

/**
 * Skeleton Component
 * A "Performance First" loading placeholder that mimics the shape of content.
 * Uses a glass-like shimmer effect to match the app's aesthetic.
 * 
 * Props:
 * - className: Additional classes for sizing/positioning (e.g., 'w-full h-32')
 * - variant: 'default' | 'circle' | 'text'
 */
const Skeleton = ({ className = '', variant = 'default', ...props }) => {
    const baseStyles = "relative overflow-hidden bg-white/10 backdrop-blur-sm before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";


    const variants = {
        default: "rounded-lg",
        circle: "rounded-full",
        text: "rounded h-4 w-full"
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
            {...props}
        />
    );
};

export default Skeleton;
