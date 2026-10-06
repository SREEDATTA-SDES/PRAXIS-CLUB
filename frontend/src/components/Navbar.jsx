import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { COLLEGE_BRAND } from '../data/initialData';

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
            ? 'bg-praxis-bg/60 backdrop-blur-xl border-b border-praxis-border/50 py-2.5 sm:py-3.5 md:py-4'
            : 'bg-transparent py-3 sm:py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Official College Banner Logo - Responsive, No hover effect */}
            <Link to="/" className="flex items-center shrink-0 py-1">
              <img
                src={COLLEGE_BRAND.bannerLogoUrl}
                alt="Sree Dattha Institute of Engineering & Science"
                className={`w-auto object-contain transition-all duration-300 max-w-[190px] sm:max-w-none ${
                  scrolled
                    ? 'h-9 sm:h-12 md:h-14 lg:h-16'
                    : 'h-11 sm:h-14 md:h-16 lg:h-20'
                }`}
              />
            </Link>

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
        className={`fixed inset-0 z-30 flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#07090D]/90 backdrop-blur-3xl" />
        
        {/* Dynamic Abstract Shapes */}
        <div className={`absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-praxis-cyan/10 blur-[120px] rounded-full mix-blend-screen transition-transform duration-[2s] ${mobileMenuOpen ? 'scale-100' : 'scale-50'}`} />
        <div className={`absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-praxis-accent/10 blur-[120px] rounded-full mix-blend-screen transition-transform duration-[2s] ${mobileMenuOpen ? 'scale-100' : 'scale-50'}`} />
        
        {/* Network Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/mb7zqdf5/image/upload/v1791138156/Midnight_Blue_Textured_Stone_Surface.png')] opacity-[0.03] bg-cover mix-blend-overlay" />
        
        <nav className="flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-sm px-6">
          <div className={`transition-all duration-1000 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-praxis-cyan block mb-8 text-center bg-praxis-cyan/10 py-1.5 px-4 rounded-full border border-praxis-cyan/20">
              Navigation Menu
            </span>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
                className={`group relative liquid-glass-elevated p-6 w-full rounded-3xl transition-all duration-500 transform overflow-hidden ${
                  mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                } ${
                  isActive(link.path) 
                    ? 'border-praxis-cyan/50 shadow-[0_0_30px_rgba(0,242,254,0.15)]' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-praxis-cyan/10 to-transparent transition-opacity duration-300 ${isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-2xl font-display uppercase tracking-widest ${isActive(link.path) ? 'text-praxis-cyan' : 'text-white'}`}>
                    {link.name}
                  </span>
                  <span className={`text-xs font-cinematic uppercase tracking-[0.2em] ${isActive(link.path) ? 'text-praxis-cyan' : 'text-white/30'}`}>
                    0{index + 1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div 
            style={{ transitionDelay: `${100 + navLinks.length * 100 + 100}ms` }}
            className={`mt-10 w-full transition-all duration-700 transform ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <Link
              to="/contact"
              className="w-full py-5 liquid-glass rounded-3xl border border-praxis-accent/50 text-praxis-accent hover:bg-praxis-accent hover:text-white text-xs uppercase font-bold tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
            >
              <span>Join The Ecosystem</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
