import React from 'react';

/**
 * BackgroundGradient Component
 * 
 * Creates vibrant, organic gradient backgrounds that make glassmorphism work.
 * Multiple animated gradient orbs provide rich visual depth for blur effects.
 */
const BackgroundGradient = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Animated gradient orb 1 - Blue to Purple */}
            <div
                className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '4s' }}
            />

            {/* Animated gradient orb 2 - Pink to Orange */}
            <div
                className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-tl from-pink-500 to-orange-500 rounded-full blur-3xl opacity-25 animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '1s' }}
            />

            {/* Animated gradient orb 3 - Cyan to Blue */}
            <div
                className="absolute top-[40%] left-[30%] w-[35%] h-[35%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{ animationDuration: '6s', animationDelay: '2s' }}
            />

            {/* Additional subtle orb for depth */}
            <div
                className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-gradient-to-bl from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-15 animate-pulse"
                style={{ animationDuration: '7s', animationDelay: '3s' }}
            />
        </div>
    );
};

export default BackgroundGradient;
