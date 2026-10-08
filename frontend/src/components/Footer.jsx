import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Play, Shield, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';
import { useData } from '../context/DataContext';
import { COLLEGE_BRAND } from '../data/initialData';

export const Footer = ({ onReplayIntro }) => {
  const { settings } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-praxis-bg border-t border-praxis-border-light/30 pt-32 pb-12 overflow-hidden text-praxis-secondary text-sm font-cinematic">
      {/* Deep Spatial Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-praxis-glow/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://res.cloudinary.com/mb7zqdf5/image/upload/v1791138156/Midnight_Blue_Textured_Stone_Surface.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Massive Editorial Closing */}
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.5em] text-praxis-cyan font-bold mb-6">
            Explore. Learn. Build. Together.
          </span>
            <img 
              src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png" 
              alt="PRAXIS"
              className="w-full max-w-[800px] h-auto object-contain cursor-pointer drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-80 hover:opacity-100 transition-opacity duration-700 translate-x-6 md:translate-x-16"
              onClick={scrollToTop}
              title="Back to Top"
            />
          <div className="flex items-center gap-6 mt-6">
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-praxis-border-light" />
             <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-praxis-secondary font-bold">
               SDES CSE-ALLIED
             </span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-praxis-border-light" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16 border-t border-praxis-border-light/30 pt-16">
          
          {/* Col 1: Institutional & Ecosystem Brand */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img
                src={COLLEGE_BRAND.bannerLogoUrl}
                alt="Sree Dattha Institute of Engineering & Science"
                className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-md"
              />
            </Link>
            
            <p className="text-[11px] md:text-xs text-praxis-muted leading-loose max-w-sm tracking-widest uppercase font-medium">
              A collaborative spatial ecosystem of engineering creativity, technology, and leadership.
            </p>

            <a
              href={settings.collegeWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[10px] text-white uppercase tracking-[0.3em] font-bold border border-praxis-border hover:border-praxis-glow px-6 py-3 transition-colors"
            >
              <span>Official College Website</span>
              <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Col 2: Navigation */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h5 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">
              Explore
            </h5>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
              <li><Link to="/" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">About</Link></li>
              <li><Link to="/clubs" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">Clubs</Link></li>
              <li><Link to="/events" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-praxis-secondary hover:text-praxis-cyan transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Clubs Ecosystem */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h5 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">
              Clubs
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="text-[9px] text-praxis-cyan tracking-[0.4em] block mb-1">Technical</span>
                <Link to="/clubs/genesis" className="block text-praxis-secondary hover:text-white transition-colors">Genesis</Link>
                <Link to="/clubs/innovex" className="block text-praxis-secondary hover:text-white transition-colors">Innovex</Link>
                <Link to="/clubs/ai-club" className="block text-praxis-secondary hover:text-white transition-colors">AI Club</Link>
                <Link to="/clubs/visual-vibes" className="block text-praxis-secondary hover:text-white transition-colors">Visual Vibes</Link>
              </div>
              <div className="space-y-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="text-[9px] text-praxis-accent tracking-[0.4em] block mb-1">Non-Technical</span>
                <Link to="/clubs/d-talks" className="block text-praxis-secondary hover:text-white transition-colors">D-Talks</Link>
                <Link to="/clubs/lakshya" className="block text-praxis-secondary hover:text-white transition-colors">Lakshya</Link>
                <Link to="/clubs/creative-art" className="block text-praxis-secondary hover:text-white transition-colors">Creative Art</Link>
                <Link to="/clubs/swara" className="block text-praxis-secondary hover:text-white transition-colors">Swara</Link>
              </div>
            </div>
          </div>

          {/* Col 4: Campus & Social Media */}
          <div className="col-span-1 md:col-span-12 lg:col-span-2">
            <h5 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">
              Network
            </h5>
            <div className="flex flex-row lg:flex-col gap-4">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full border border-praxis-border hover:border-praxis-accent flex items-center justify-center text-praxis-secondary hover:text-praxis-accent hover:bg-praxis-accent/10 transition-all"
                >
                  <InstagramIcon size={16} />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 rounded-full border border-praxis-border hover:border-praxis-cyan flex items-center justify-center text-praxis-secondary hover:text-praxis-cyan hover:bg-praxis-cyan/10 transition-all"
                >
                  <FacebookIcon size={16} />
                </a>
              )}
              {settings.whatsappUrl && (
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-12 h-12 rounded-full border border-praxis-border hover:border-emerald-400 flex items-center justify-center text-praxis-secondary hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
                >
                  <WhatsAppIcon size={16} />
                </a>
              )}
            </div>

            {/* Replay intro action */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-praxis-muted hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-praxis-border flex items-center justify-center">
                  <Play size={10} className="ml-0.5" /> 
                </div>
                Replay Intro
              </button>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-praxis-border-light/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-[9px] uppercase tracking-[0.3em] font-bold text-praxis-muted">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} PRAXIS &bull; SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE.
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline">CSE-ALLIED ECOSYSTEM</span>
            <Link
              to="/admin/login"
              className="hover:text-white flex items-center gap-2 transition-colors border-l border-praxis-border-light pl-6"
            >
              <Shield size={12} />
              <span>Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
