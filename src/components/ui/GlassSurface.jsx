import React from 'react';
import { motion } from 'framer-motion';

/*
  Glass Surface Component - Apple-like Liquid Glass Effect
  
  Props:
  - intensity: 'low' | 'medium' | 'high' (Blur strength)
  - shimmer: boolean (Adds subtle noise/liquid effect)
  - hoverEffect: boolean
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
    // Enhanced Intensity Config for Apple-like glass
    const blurMap = {
        low: "backdrop-blur-lg",
        medium: "backdrop-blur-2xl",
        high: "backdrop-blur-3xl"
    };

    const bgMap = {
        low: "bg-white/[0.08]",
        medium: "bg-white/[0.12]",
        high: "bg-white/[0.18]"
    };

    const borderMap = {
        low: "border-white/15",
        medium: "border-white/25",
        high: "border-white/35"
    };

    // Base Glass Styles with enhanced shine
    const baseStyles = `
        relative overflow-hidden 
        bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.05]
        border ${borderMap[intensity]}
        shadow-2xl shadow-black/30
        transition-all duration-300
    `;

    // Hover Effects
    const hoverStyles = hoverEffect
        ? "hover:from-white/20 hover:via-white/12 hover:to-white/8 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:scale-[0.99]"
        : "";

    return (
        <motion.div
            className={`
                ${baseStyles}
                ${blurMap[intensity]}
                ${bgMap[intensity]}
                ${hoverStyles}
                ${className}
            `}
            onClick={onClick}
            {...props}
        >
            {/* Top Specular Highlight - Signature Apple shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Inner Glow for depth */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.12] via-transparent to-transparent pointer-events-none" />

            {/* Bottom subtle shadow line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent" />

            {/* Optional Liquid Shimmer Layer */}
            {shimmer && (
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassSurface;
