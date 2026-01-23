import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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

    // Logic extracted exactly from App.jsx's conditional components
    const hiddenNavbarRoutes = ['/login'];
    // Combined list from ConditionalFooter: '/', '/book', '/history', '/hotline', '/login', '/profile', '/settings'
    const hiddenFooterRoutes = ['/', '/book', '/history', '/hotline', '/login', '/profile', '/settings'];
    const hiddenMobileHeaders = ['/login'];

    const showNavbar = !hiddenNavbarRoutes.includes(pathname);
    const showFooter = !hiddenFooterRoutes.includes(pathname);
    const showMobileAppBar = !hiddenMobileHeaders.includes(pathname);

    return (
        <>
            <Toaster richColors closeButton />
            <ScrollToTop />



            <SmoothScroll>
                {showMobileAppBar && (
                    <MobileAppBar isMenuOpen={isMobileMenuOpen} />
                )}

                <div className={`min-h-[calc(100vh+1px)] bg-bg-body font-sans antialiased text-primary selection:bg-accent/20 ${showMobileAppBar ? 'pb-[calc(80px+env(safe-area-inset-bottom))]' : ''}`}>
                    {showNavbar && (
                        <Navbar
                            isMobileMenuOpen={isMobileMenuOpen}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                        />
                    )}

                    <Outlet />

                    <InstallPrompt />
                    <OfflineStatus />

                    {showFooter && <Footer />}
                </div>
            </SmoothScroll>
        </>
    );
};

export default MainLayout;
