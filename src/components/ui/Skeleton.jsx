import React from 'react';
import GlassSurface from './GlassSurface';

/**
 * SkeletonLoader Component
 * 
 * Replaces generic spinners with a shimmering "skeleton" UI.
 * Used for loading states in lists, cards, and details.
 */
const Skeleton = ({ count = 3, className = '' }) => {
    return (
        <div className={`w-full space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <GlassSurface
                    key={i}
                    blur="low"
                    className="h-24 w-full rounded-2xl relative overflow-hidden"
                >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

                    {/* Skeleton Content Structure */}
                    <div className="p-4 flex flex-col justify-center h-full gap-3 opacity-50">
                        <div className="h-4 w-1/3 bg-white/20 rounded-full" />
                        <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                    </div>
                </GlassSurface>
            ))}
        </div>
    );
};

export default Skeleton;
