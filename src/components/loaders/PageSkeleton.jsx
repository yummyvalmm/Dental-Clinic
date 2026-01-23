import React from 'react';
import Skeleton from '../ui/Skeleton';

/**
 * PageSkeleton Component
 * A generic full-page loading state that mimics the structure of standard pages
 * (Title, Hero area, Grid/Content).
 */
const PageSkeleton = () => {
    return (
        <div className="w-full min-h-screen pt-24 px-4 md:px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="space-y-4 max-w-2xl">
                <Skeleton className="h-12 w-3/4 md:w-1/2" />
                <Skeleton className="h-6 w-1/2 md:w-1/3 opacity-70" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
                {/* Primary Content Column */}
                <div className="md:col-span-8 space-y-6">
                    {/* Hero/Featured Card Placeholder */}
                    <Skeleton className="h-64 w-full rounded-2xl" />

                    {/* List Items / Text Blocks */}
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>

                {/* Sidebar / Secondary Info Column */}
                <div className="hidden md:block md:col-span-4 space-y-6">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default PageSkeleton;
