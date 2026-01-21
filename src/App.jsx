import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import MobileAppBar from './components/layout/MobileAppBar';

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDrag } from 'react-use-gesture';

// Direct Imports for Instant Navigation
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';
import BookingPage from './pages/BookingPage';
import VisitPage from './pages/VisitPage';
import HotlinePage from './pages/HotlinePage';

// Keep Login lazy
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

import PageTransition from './components/layout/PageTransition';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ScrollToTop from './components/layout/ScrollToTop';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  // Swipe Logic for Mobile Menu
  const swipeOrder = ['/', '/visit', '/hotline', '/book'];

  const bind = useDrag(({ swipe: [swipeX] }) => {
    // Only allow swipe on mobile
    if (window.innerWidth >= 1024) return;

    const currentIndex = swipeOrder.indexOf(location.pathname);
    if (currentIndex === -1) return; // Not on a swippable page

    if (swipeX === -1) {
      // Swipe Left -> Next Page
      if (currentIndex < swipeOrder.length - 1) {
        navigate(swipeOrder[currentIndex + 1]);
      }
    } else if (swipeX === 1) {
      // Swipe Right -> Previous Page
      if (currentIndex > 0) {
        navigate(swipeOrder[currentIndex - 1]);
      }
    }
  }, {
    axis: 'x',
    filterTaps: true,
  });

  return (
    <div {...bind()} className="relative w-full min-h-screen overflow-x-hidden touch-pan-y">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/studio" element={<PageTransition><StudioPage /></PageTransition>} />
        <Route path="/hotline" element={<PageTransition><HotlinePage /></PageTransition>} />
        <Route path="/book" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/login" element={<React.Suspense fallback={<LoadingSpinner />}><PageTransition><LoginPage /></PageTransition></React.Suspense>} />
        <Route path="/visit" element={<PageTransition><VisitPage /></PageTransition>} />
      </Routes>
    </div>
  );
}

import InstallPrompt from './components/ui/InstallPrompt';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll>
          <MobileAppBar isMenuOpen={isMobileMenuOpen} />
          import InstallPrompt from './components/ui/InstallPrompt';
          import BookingFAB from './components/ui/BookingFAB';

          function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

          return (
          <HelmetProvider>
            <Router>
              <ScrollToTop />
              <SmoothScroll>
                <MobileAppBar isMenuOpen={isMobileMenuOpen} />
                <div className="min-h-screen bg-bg-body font-sans antialiased text-primary selection:bg-accent/20">
                  <Navbar isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} />
                  <AppRoutes />
                  <InstallPrompt />
                  <BookingFAB />
                  <ConditionalFooter />
                </div>
              </SmoothScroll>
            </Router>
          </HelmetProvider>
          );
}


// Helper to handle Redirects
const DesktopRedirector = () => {
  const {pathname} = useLocation();
          const navigate = useNavigate();

  React.useEffect(() => {
    const checkRedirect = () => {
      // If we are on Desktop (lg breakpoint is usually 1024px)
      if (window.innerWidth >= 1024) {
        // Routes that exist as "Sections" on Desktop Home Page
        const mobileContextRoutes = ['/visit', '/hotline', '/services', '/studio'];
          if (mobileContextRoutes.includes(pathname)) {
            navigate('/');
        }
      }
    };

          checkRedirect(); // Run on mount/path change
          window.addEventListener('resize', checkRedirect);
    return () => window.removeEventListener('resize', checkRedirect);
  }, [pathname, navigate]);

          return null;
};

const ConditionalFooter = () => {
  const {pathname} = useLocation();
          // Hide footer on specific "App-like" pages where native no-scroll is desired
          const hiddenRoutes = ['/visit', '/hotline', '/book', '/login'];

          if (hiddenRoutes.includes(pathname)) return null;

          return <Footer />;
};

          export default App;
