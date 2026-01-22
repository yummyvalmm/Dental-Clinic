import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Hooks
import { useMobileView } from './hooks/useMobileView';
import { useMobileSwipe } from './hooks/useMobileSwipe';

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
import { Toaster } from 'sonner';

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

function AppRoutes() {
  const location = useLocation();
  const isMobileView = useMobileView();
  const bindSwipe = useMobileSwipe(isMobileView);

  return (
    <div {...bindSwipe()} className="relative w-full min-h-screen overflow-x-hidden touch-pan-y">
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
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Toaster richColors closeButton />
            <ScrollToTop />
            <SmoothScroll>
              <ConditionalMobileAppBar isMenuOpen={isMobileMenuOpen} />
              <div className="min-h-screen bg-bg-body font-sans antialiased text-primary selection:bg-accent/20">
                <ConditionalNavbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                <AppRoutes />
                <InstallPrompt />
                <OfflineStatus />
                <ConditionalFooter />
              </div>
            </SmoothScroll>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
