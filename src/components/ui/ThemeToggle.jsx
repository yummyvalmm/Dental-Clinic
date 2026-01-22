import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        // Toggle logic: If light -> dark, otherwise -> light (covers system/dark -> light)
        // This is a simple binary toggle for the navbar
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={`relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] text-[var(--color-text-main)] transition-colors ${className}`}
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme === 'dark' ? 'dark' : 'light'}
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? (
                        <Moon size={18} />
                    ) : (
                        <Sun size={18} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
