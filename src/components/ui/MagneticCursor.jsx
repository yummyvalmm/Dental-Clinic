import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the main cursor (follower)
    const cursorX = useSpring(mouseX, { damping: 25, stiffness: 150, mass: 0.5 });
    const cursorY = useSpring(mouseY, { damping: 25, stiffness: 150, mass: 0.5 });

    // Slightly delayed physics for the outer ring (magnetic effect)
    const ringX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.8 });
    const ringY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 0.8 });

    useEffect(() => {
        const mouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Add listeners for hoverable elements
        const addListeners = () => {
            document.querySelectorAll('a, button, input, textarea, .cursor-hover').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        const removeListeners = () => {
            document.querySelectorAll('a, button, input, textarea, .cursor-hover').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };

        window.addEventListener('mousemove', mouseMove);
        addListeners();

        // Re-add listeners on DOM changes (simple implementation)
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            removeListeners();
            observer.disconnect();
        };
    }, []);

    // Initial check for non-hover supported devices
    // Initial check for non-hover supported devices, initialized lazily to avoid effect update
    const [isTouch] = useState(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

    if (isTouch) return null;

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 0 : 1,
                }}
            />

            {/* Magnetic Ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
                    mixBlendMode: 'difference'
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};

export default MagneticCursor;
