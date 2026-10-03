import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sparkles } from 'lucide-react';
import { COLLEGE_BRAND } from '../data/initialData';

export const Navbar = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-praxis-bg/85 backdrop-blur-xl border-b border-praxis-border/70 py-3 shadow-glass-card'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* College & PRAXIS Brand Lockup */}
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
              {/* College Logo */}
              <img
                src={COLLEGE_BRAND.logoUrl}
                alt="SDES College Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Vertical divider */}
              <div className="h-7 w-[1px] bg-praxis-border" />

              {/* PRAXIS Logo */}
              <img
                src={COLLEGE_BRAND.praxisLogoUrl}
                alt="PRAXIS"
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:rotate-6"
              />

              {/* Typography lockup */}
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-praxis-secondary leading-tight">
                  Sree Dattha Inst. of Eng & Sci
                </span>
                <span className="text-sm font-extrabold tracking-wider text-white font-cinematic uppercase">
                  PRAXIS <span className="text-praxis-cyan font-normal text-xs">/ CSE-ALLIED</span>
                </span>
              </div>
            </Link>

            {/* Desktop Minimal Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-praxis-secondary hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-praxis-cyan to-praxis-accent shadow-[0_0_8px_rgba(32,217,255,0.8)]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Action Area: Search button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search clubs and events"
                className="p-2 text-praxis-secondary hover:text-white hover:bg-praxis-elevated/60 rounded-full border border-transparent hover:border-praxis-border transition-all duration-200"
                title="Search (Ctrl + K)"
              >
                <Search size={18} />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-praxis-secondary hover:text-white hover:bg-praxis-elevated/60 rounded-lg border border-praxis-border/50"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Cinematic Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-praxis-bg/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-praxis-muted border-b border-praxis-border pb-2">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg uppercase tracking-[0.2em] font-semibold py-2 transition-colors ${
                  isActive(link.path) ? 'text-praxis-cyan' : 'text-praxis-text hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-praxis-border/60">
            <p className="text-xs text-praxis-muted uppercase tracking-wider">
              {COLLEGE_BRAND.name}
            </p>
            <p className="text-[11px] text-praxis-secondary mt-1">
              SDES CSE-Allied Student Platform
            </p>
          </div>
        </div>
      )}
    </>
  );
};
