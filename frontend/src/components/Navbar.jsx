import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { CollegeBrand } from './CollegeBrand';

export const Navbar = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CLUBS', path: '/clubs' },
    { name: 'EVENTS', path: '/events' },
    { name: 'CONTACT', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out ${
          scrolled
            ? 'bg-praxis-bg/60 backdrop-blur-xl border-b border-praxis-border/50 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            <CollegeBrand />

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-xs tracking-[0.25em] font-medium transition-all duration-300 font-cinematic ${
                      isActive(link.path)
                        ? 'text-white'
                        : 'text-praxis-secondary hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-praxis-glow shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                    )}
                  </Link>
                ))}
              </nav>

              <div className="w-[1px] h-6 bg-praxis-border" />

              <div className="flex items-center space-x-6">
                <button
                  onClick={onOpenSearch}
                  className="text-praxis-secondary hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                <Link
                  to="/contact" // Assuming join redirects to contact for now
                  className="px-6 py-2 border border-praxis-border hover:border-praxis-glow rounded-full text-xs font-bold tracking-[0.2em] uppercase text-white transition-all hover:bg-praxis-glow/10 hover:shadow-cinematic-cyan flex items-center gap-2"
                >
                  JOIN PRAXIS <span className="text-praxis-glow">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Mobile / Tablet Toggle & Search */}
            <div className="flex xl:hidden items-center gap-4">
              <button
                onClick={onOpenSearch}
                className="text-praxis-secondary hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-praxis-secondary hover:text-white transition-colors relative z-50"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Cinematic Full-screen Mobile Menu */}
      <div 
        className={`fixed inset-0 z-30 bg-praxis-bg/95 backdrop-blur-2xl flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-praxis-glow/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-praxis-navy/50 blur-[150px] rounded-full" />
        
        <nav className="flex flex-col items-center space-y-6 relative z-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`text-3xl md:text-5xl uppercase tracking-[0.3em] font-cinematic transition-all duration-500 transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                isActive(link.path) ? 'text-praxis-cyan drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]' : 'text-praxis-text hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            style={{ transitionDelay: '300ms' }}
            className={`mt-12 transition-all duration-500 transform ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Link
              to="/contact"
              className="px-8 py-3 border border-praxis-cyan text-praxis-cyan hover:bg-praxis-cyan hover:text-praxis-bg text-sm uppercase tracking-[0.3em] transition-all flex items-center gap-2"
            >
              JOIN PRAXIS
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
