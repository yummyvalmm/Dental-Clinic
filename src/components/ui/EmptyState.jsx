import React from 'react';
import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';

/**
 * EmptyState Component
 * Displays a consistent "No Data" message with an icon and optional action.
 */
const EmptyState = ({
    icon: Icon,
    title = "Nothing here yet",
    description = "No records found.",
    action
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <GlassSurface className="p-8 text-center flex flex-col items-center justify-center min-h-[250px]" intensity="low">
                {Icon && (
                    <div className="w-16 h-16 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center mb-4 text-[var(--color-text-muted)]/50">
                        <Icon size={32} />
                    </div>
                )}
                <h3 className="text-[var(--color-text-main)] font-bold mb-2">{title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm max-w-[200px] mb-6 leading-relaxed">
                    {description}
                </p>

                {action && (
                    <div className="mt-2">
                        {action}
                    </div>
                )}
            </GlassSurface>
        </motion.div>
    );
};

export default EmptyState;
