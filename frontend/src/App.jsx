import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AtmosphericBackground } from './components/AtmosphericBackground';
import { IntroSequence } from './components/IntroSequence';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LightboxModal } from './components/LightboxModal';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransitionLoader } from './components/PageTransitionLoader';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ClubsPage } from './pages/ClubsPage';
import { ClubDetailPage } from './pages/ClubDetailPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminClubs } from './pages/admin/AdminClubs';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminLeadership } from './pages/admin/AdminLeadership';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  const [showIntro, setShowIntro] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const location = useLocation();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowIntro(true);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen text-praxis-text cinematic-grain selection:bg-praxis-glow selection:text-white">
      <ScrollToTop />

      {/* 1. Cinematic Opening Intro Sequence (Skippable & stored in session) */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* 2. Global Atmospheric Canvas Background */}
      <AtmosphericBackground />

      {/* 3. Global Modals & Transitions */}
      <PageTransitionLoader />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <LightboxModal item={activeLightboxItem} onClose={() => setActiveLightboxItem(null)} />

      {/* 4. Public Navigation (hidden on admin pages) */}
      {!isAdminRoute && <Navbar onOpenSearch={() => setSearchOpen(true)} />}

      {/* 5. Main Application Routing */}
      <div className="relative z-10">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage onOpenLightbox={(img) => setActiveLightboxItem(img)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:clubSlug" element={<ClubDetailPage onOpenLightbox={(img) => setActiveLightboxItem(img)} />} />
          <Route path="/events" element={<EventsPage onOpenLightbox={(img) => setActiveLightboxItem(img)} />} />
          <Route path="/gallery" element={<GalleryPage onOpenLightbox={(img) => setActiveLightboxItem(img)} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clubs" element={<AdminClubs />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="leadership" element={<AdminLeadership />} />
            <Route path="administrators" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="pt-40 pb-28 text-center space-y-4 max-w-lg mx-auto px-4">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-accent block">
                  Error 404
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase text-white font-display">
                  Page Not Found
                </h1>
                <p className="text-xs sm:text-sm text-praxis-secondary leading-relaxed">
                  The page you requested could not be located in the PRAXIS ecosystem.
                </p>
                <div className="pt-4">
                  <a
                    href="/"
                    className="inline-block px-6 py-2.5 rounded-lg bg-praxis-glow hover:bg-blue-600 text-white text-xs uppercase font-bold tracking-widest transition-all"
                  >
                    Return to Homepage
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>

      {/* 6. Public Footer (hidden on admin pages) */}
      {!isAdminRoute && <Footer onReplayIntro={handleReplayIntro} />}
    </div>
  );
}

export default App;
