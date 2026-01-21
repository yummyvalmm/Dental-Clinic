import React from 'react';
import { motion } from 'framer-motion';

/*
  Glass Surface Component - Inspired by ReactBits
  
  Props:
  - intensity: 'low' | 'medium' | 'high' (Blur strength)
  - transparency: number (0-1)
  - border: boolean
  - shimmer: boolean (Adds subtle noise/liquid effect)
*/

const GlassSurface = ({
    children,
    className = "",
    intensity = "medium",
    shimmer = false,
    hoverEffect = false,
    onClick,
    ...props
}) => {
    // Intensity Config
    const blurMap = {
        low: "blur-md",
        medium: "blur-xl",
        high: "blur-3xl"
    };

    // Base Glass Styles (Core Liquid Glass)
    const baseStyles = "relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg transition-all duration-300";

    // Hover Effects
    const hoverStyles = hoverEffect
        ? "hover:from-white/15 hover:to-white/10 hover:border-white/30 hover:shadow-glow hover:-translate-y-0.5 active:scale-[0.99]"
        : "";

    // Blur Class
    const blurClass = "backdrop-blur-[12px] md:backdrop-blur-[24px]"; // Responsive blur

    return (
        <motion.div
            className={`
                ${baseStyles}
                ${blurClass}
                ${hoverStyles}
                ${className}
            `}
            onClick={onClick}
            {...props}
        >
            {/* Optional Liquid Shimmer Layer */}
            {shimmer && (
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            )}

            {children}

            {/* Top Shine (Rim Light) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 pointer-events-none" />
        </motion.div>
    );
};

export default GlassSurface;
