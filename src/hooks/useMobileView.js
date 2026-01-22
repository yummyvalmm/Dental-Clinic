import { useState, useEffect } from 'react';

const isMobileCheck = () => window.innerWidth < 1024;

export const useMobileView = () => {
    const [isMobile, setIsMobile] = useState(isMobileCheck());

    useEffect(() => {
        const handleResize = () => setIsMobile(isMobileCheck());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};
