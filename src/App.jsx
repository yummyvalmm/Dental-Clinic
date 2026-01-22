import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LayoutProvider } from './context/LayoutContext';
import { ThemeProvider } from './context/ThemeContext';

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
import BackgroundGradient from './components/ui/BackgroundGradient';
import { Toaster } from 'sonner';

// Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Pages - Direct Imports for Performance (Core Landing Pages)
import HomePage from './pages/HomePage';
import MobileDashboard from './pages/MobileDashboard';

// Lazy Load Non-Critical Pages
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const StudioPage = React.lazy(() => import('./pages/StudioPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage'));
const HotlinePage = React.lazy(() => import('./pages/HotlinePage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SystemSettingsPage = React.lazy(() => import('./pages/SystemSettingsPage'));
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
        <Route path="/book" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition><BookingPage /></PageTransition>
          </React.Suspense>
        } />

        {/* Protected Routes */}
        <Route path="/history" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <PageTransition><HistoryPage /></PageTransition>
            </React.Suspense>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition><ProfilePage /></PageTransition>
          </React.Suspense>
        } />

        <Route path="/hotline" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition><HotlinePage /></PageTransition>
          </React.Suspense>
        } />

        {/* Public Route (Login) */}
        <Route path="/login" element={
          <PublicRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <PageTransition><LoginPage /></PageTransition>
            </React.Suspense>
          </PublicRoute>
        } />

        {/* Desktop-Only Routes */}
        <Route path="/services" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition>
              {isMobileView ? <MobileDashboard /> : <ServicesPage />}
            </PageTransition>
          </React.Suspense>
        } />
        <Route path="/studio" element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <PageTransition>
              {isMobileView ? <MobileDashboard /> : <StudioPage />}
            </PageTransition>
          </React.Suspense>
        } />

        {/* Settings Route */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <React.Suspense fallback={<LoadingSpinner />}>
              <PageTransition><SystemSettingsPage /></PageTransition>
            </React.Suspense>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

const ConditionalFooter = () => {
  const { pathname } = useLocation();
  const hiddenRoutes = ['/', '/book', '/history', '/hotline', '/login', '/profile', '/settings'];

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
        <ThemeProvider>
          <LayoutProvider>
            <NotificationProvider>
              <Router>
                <Toaster richColors closeButton />
                <ScrollToTop />
                <BackgroundGradient />
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
          </LayoutProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
