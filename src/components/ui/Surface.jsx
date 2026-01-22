import React from 'react';
import { motion } from 'framer-motion';

/**
 * Surface Component - Clarity & Deference Philosophy
 * 
 * A subtle, content-focused surface component that recedes to let content shine.
 * Uses minimal backgrounds and soft shadows instead of heavy glass effects.
 */
const Surface = ({
    children,
    className = '',
    elevation = 'low',
    background = 'subtle',
    border = false,
    interactive = false,
    onClick,
    animated = false,
    ...props
}) => {
    // Elevation levels - soft shadows for depth
    const elevationClasses = {
        none: '',
        low: 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        medium: 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
        high: 'shadow-[0_4px_16px_rgba(0,0,0,0.10)]'
    };

    // Background opacity levels
    const backgroundClasses = {
        none: '',
        subtle: 'bg-[var(--surface-bg)]',
        medium: 'bg-[var(--surface-bg-medium)]',
        solid: 'bg-[var(--surface-bg-solid)]'
    };

    // Border styling
    const borderClass = border ? 'border border-[var(--border-subtle)]' : '';

    // Interactive states - gentle feedback
    const interactiveClasses = interactive
        ? 'hover:bg-[var(--surface-bg-hover)] active:bg-[var(--surface-bg-active)] cursor-pointer transition-all duration-200 ease-out'
        : '';

    // Combine all classes
    const combinedClasses = `
        ${elevationClasses[elevation]}
        ${backgroundClasses[background]}
        ${borderClass}
        ${interactiveClasses}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const Component = animated ? motion.div : 'div';

    return (
        <Component
            className={combinedClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Surface;
