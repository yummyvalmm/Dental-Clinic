import React from 'react';
import { motion } from 'framer-motion';

const BounceWrapper = ({ children, tension = 0.15 }) => {
    return (
        <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={tension}
            className="w-full h-full"
            style={{ touchAction: 'none' }} // Prevent browser handling to allow custom drag
        >
            {children}
        </motion.div>
    );
};

export default BounceWrapper;
