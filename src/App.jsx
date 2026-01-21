import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDrag } from 'react-use-gesture';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import MobileAppBar from './components/layout/MobileAppBar';
import PageTransition from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';

// UI Components
import LoadingSpinner from './components/ui/LoadingSpinner';
import InstallPrompt from './components/ui/InstallPrompt';
import OfflineStatus from './components/ui/OfflineStatus';

// Pages - Direct Imports for Performance
import HomePage from './pages/HomePage';
import MobileDashboard from './pages/MobileDashboard';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';
import BookingPage from './pages/BookingPage';
import HistoryPage from './pages/HistoryPage';
import HotlinePage from './pages/HotlinePage';
import ProfilePage from './pages/ProfilePage';

// Lazy Load Non-Critical Pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

// Helper to detect mobile
const isMobile = () => window.innerWidth < 1024;

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = React.useState(isMobile());

  React.useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Swipe Logic for Mobile
  const swipeOrder = ['/', '/book', '/history', '/profile'];

  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (!isMobileView) return;

    const currentIndex = swipeOrder.indexOf(location.pathname);
    if (currentIndex === -1) return;

    if (swipeX === -1 && currentIndex < swipeOrder.length - 1) {
      navigate(swipeOrder[currentIndex + 1]);
    } else if (swipeX === 1 && currentIndex > 0) {
      navigate(swipeOrder[currentIndex - 1]);
    }
  }, {
    axis: 'x',
    filterTaps: true,
  });

  return (
    <div {...bind()} className="relative w-full min-h-screen overflow-x-hidden touch-pan-y">
      <Routes location={location} key={location.pathname}>
        {/* Mobile gets Dashboard, Desktop gets HomePage */}
        <Route path="/" element={
          <PageTransition>
            {isMobileView ? <MobileDashboard /> : <HomePage />}
          </PageTransition>
        } />

        {/* Utility Routes (Mobile + Desktop) */}
        <Route path="/book" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/history" element={<PageTransition><HistoryPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/hotline" element={<PageTransition><HotlinePage /></PageTransition>} />
        <Route path="/login" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition><LoginPage /></PageTransition>
          </React.Suspense>
        } />

        {/* Desktop-Only Routes */}
        <Route path="/services" element={
          <PageTransition>
            {isMobileView ? <MobileDashboard /> : <ServicesPage />}
          </PageTransition>
        } />
        <Route path="/studio" element={
          <PageTransition>
            {isMobileView ? <MobileDashboard /> : <StudioPage />}
          </PageTransition>
        } />
      </Routes>
    </div>
  );
}

const ConditionalFooter = () => {
  const { pathname } = useLocation();
  const hiddenRoutes = ['/', '/book', '/history', '/hotline', '/login', '/profile'];

  if (hiddenRoutes.includes(pathname)) return null;

  return <Footer />;
};

const ConditionalNavbar = (props) => {
  const { pathname } = useLocation();
  const hiddenRoutes = ['/login'];
  if (hiddenRoutes.includes(pathname)) return null;
  return <Navbar {...props} />;
};

const ConditionalMobileAppBar = (props) => {
  const { pathname } = useLocation();
  const hiddenRoutes = ['/login'];
  if (hiddenRoutes.includes(pathname)) return null;
  return <MobileAppBar {...props} />;
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll>
          <ConditionalMobileAppBar isMenuOpen={isMobileMenuOpen} />
          <div className="min-h-screen bg-bg-body font-sans antialiased text-primary selection:bg-accent/20">
            <ConditionalNavbar isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} />
            <AppRoutes />
            <InstallPrompt />
            <OfflineStatus />
            <ConditionalFooter />
          </div>
        </SmoothScroll>
      </Router>
    </HelmetProvider>
  );
}

export default App;
