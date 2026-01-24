import React, { useState } from 'react';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileAppBar from './MobileAppBar';
import SmoothScroll from './SmoothScroll';
import InstallPrompt from '../ui/InstallPrompt';
import OfflineStatus from '../ui/OfflineStatus';

import ScrollToTop from './ScrollToTop';
import { Toaster } from 'sonner';

const MainLayout = () => {
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const element = useOutlet();

    // Logic extracted exactly from App.jsx's conditional components
    // Navbar only visible on Profile page
    const visibleNavbarRoutes = ['/profile'];
    // Combined list from ConditionalFooter: '/', '/book', '/history', '/hotline', '/login', '/profile', '/settings'
    const hiddenFooterRoutes = ['/', '/book', '/history', '/hotline', '/login', '/profile', '/settings'];
    const hiddenMobileHeaders = ['/login'];

    const showNavbar = visibleNavbarRoutes.includes(pathname) && !pathname.startsWith('/admin');
    const showFooter = !hiddenFooterRoutes.includes(pathname) && !pathname.startsWith('/admin');
    const isAdmin = pathname.startsWith('/admin');
    const showMobileAppBar = !hiddenMobileHeaders.includes(pathname) && !isAdmin;

    return (
        <div className={isAdmin ? 'dark' : ''}>
            <Toaster richColors closeButton />
            <ScrollToTop />

            <SmoothScroll>
                {showMobileAppBar && (
                    <MobileAppBar isMenuOpen={isMobileMenuOpen} />
                )}

                <div
                    id="scroll-container"
                    className={`min-h-screen bg-bg-body font-sans antialiased text-primary selection:bg-accent/20 ${showMobileAppBar ? 'pb-[calc(120px+env(safe-area-inset-bottom))]' : ''}`}
                >
                    {showNavbar && (
                        <Navbar
                            isMobileMenuOpen={isMobileMenuOpen}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                        />
                    )}

                    <AnimatePresence mode="wait">
                        {element && React.cloneElement(element, { key: pathname })}
                    </AnimatePresence>

                    <InstallPrompt />
                    <OfflineStatus />

                    {showFooter && <Footer />}
                </div>
            </SmoothScroll>
        </div>
    );
};

export default MainLayout;
