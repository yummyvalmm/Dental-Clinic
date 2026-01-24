import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LayoutProvider } from './context/LayoutContext';
import { ThemeProvider } from './context/ThemeContext';

// Hooks
import { useMobileView } from './hooks/useMobileView';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import PageTransition from './components/layout/PageTransition';

// UI Components
// UI Components
import PageSkeleton from './components/loaders/PageSkeleton';

// Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Pages - Direct Imports for Performance (Core Landing Pages)
import HomePage from './pages/HomePage';
import MobileDashboard from './pages/MobileDashboard';

// Lazy Load Non-Critical Pages
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const HotlinePage = lazy(() => import('./pages/HotlinePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SystemSettingsPage = lazy(() => import('./pages/SystemSettingsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const RoutePage = ({ component: Component }) => (
  <Suspense fallback={<PageSkeleton />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

const AppRoutes = () => {
  const location = useLocation();
  const isMobileView = useMobileView();

  return (
    <div className="relative w-full h-full touch-pan-y">
      <Routes>
        <Route element={<MainLayout />}>
          {/* Mobile gets Dashboard, Desktop gets HomePage */}
          <Route path="/" element={
            <PageTransition>
              {isMobileView ? <MobileDashboard /> : <HomePage />}
            </PageTransition>
          } />

          {/* Utility Routes (Mobile + Desktop) */}
          <Route path="/book" element={<RoutePage component={BookingPage} />} />

          {/* Protected Routes */}
          <Route path="/history" element={
            <ProtectedRoute>
              <RoutePage component={HistoryPage} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<RoutePage component={ProfilePage} />} />

          <Route path="/hotline" element={<RoutePage component={HotlinePage} />} />

          {/* Public Route (Login) */}
          <Route path="/login" element={
            <PublicRoute>
              <RoutePage component={LoginPage} />
            </PublicRoute>
          } />

          {/* Desktop-Only Routes */}
          <Route path="/services" element={
            <Suspense fallback={<PageSkeleton />}>
              <PageTransition>
                {isMobileView ? <MobileDashboard /> : <ServicesPage />}
              </PageTransition>
            </Suspense>
          } />
          <Route path="/studio" element={
            <Suspense fallback={<PageSkeleton />}>
              <PageTransition>
                {isMobileView ? <MobileDashboard /> : <StudioPage />}
              </PageTransition>
            </Suspense>
          } />

          {/* Settings Route */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <RoutePage component={SystemSettingsPage} />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <LayoutProvider>
            <NotificationProvider>
              <Router>
                <AppRoutes />
              </Router>
            </NotificationProvider>
          </LayoutProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
