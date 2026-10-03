import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Play, Shield } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';
import { useData } from '../context/DataContext';

export const Footer = ({ onReplayIntro }) => {
  const { settings } = useData();

  return (
    <footer className="relative bg-[#07090D] border-t border-praxis-border/80 pt-16 pb-12 overflow-hidden text-praxis-secondary text-sm">
      {/* Background glow highlights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-praxis-glow/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Institutional & Ecosystem Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={settings.collegeLogoUrl}
                alt="SDES College Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="h-6 w-[1px] bg-praxis-border" />
              <img
                src={settings.praxisLogoUrl}
                alt="PRAXIS Logo"
                className="h-9 w-auto object-contain"
              />
            </div>

            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              {settings.collegeName}
            </h4>
            <p className="text-xs text-praxis-muted leading-relaxed">
              PRAXIS is the student club platform of CSE-Allied, fostering a collaborative ecosystem of engineering creativity, technology, and leadership.
            </p>

            <a
              href={settings.collegeWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-praxis-cyan hover:underline tracking-wider uppercase font-semibold"
            >
              Official College Website <ExternalLink size={12} />
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              <li>
                <Link to="/" className="hover:text-praxis-cyan transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-praxis-cyan transition-colors">About PRAXIS</Link>
              </li>
              <li>
                <Link to="/clubs" className="hover:text-praxis-cyan transition-colors">All Clubs</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-praxis-cyan transition-colors">Events & Schedules</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-praxis-cyan transition-colors">Media Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-praxis-cyan transition-colors">Contact Campus</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clubs Ecosystem */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Official Clubs
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-2">
                <span className="text-[10px] text-praxis-muted tracking-widest uppercase block font-semibold">Technical</span>
                <Link to="/clubs/genesis" className="block hover:text-white transition-colors">Genesis</Link>
                <Link to="/clubs/tech-vertex" className="block hover:text-white transition-colors">Tech Vertex</Link>
                <Link to="/clubs/innovex" className="block hover:text-white transition-colors">Innovex</Link>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-praxis-muted tracking-widest uppercase block font-semibold">Non-Technical</span>
                <Link to="/clubs/d-talks" className="block hover:text-white transition-colors">D-Talks</Link>
                <Link to="/clubs/visual-vibes" className="block hover:text-white transition-colors">Visual Vibes</Link>
                <Link to="/clubs/lakshya" className="block hover:text-white transition-colors">Lakshya</Link>
              </div>
            </div>
          </div>

          {/* Col 4: Campus & Social Media */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Connect
            </h5>
            <p className="text-xs text-praxis-muted mb-4 leading-relaxed">
              Sheriguda, Ibrahimpatnam, Greater Hyderabad, Telangana - 501510
            </p>
            <div className="flex items-center gap-3">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-praxis-secondary hover:text-praxis-accent hover:border-praxis-accent/50 transition-all"
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
                  className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-praxis-secondary hover:text-praxis-cyan hover:border-praxis-cyan/50 transition-all"
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
                  className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-praxis-secondary hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
                >
                  <WhatsAppIcon size={16} />
                </a>
              )}
            </div>

            {/* Replay intro action */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="mt-6 flex items-center gap-2 text-xs text-praxis-muted hover:text-praxis-cyan transition-colors tracking-wider uppercase font-medium"
              >
                <Play size={12} /> Replay Cinematic Intro
              </button>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-praxis-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-praxis-muted">
          <div>
            &copy; {new Date().getFullYear()} PRAXIS &bull; SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] tracking-wider uppercase">CSE-ALLIED STUDENT ECOSYSTEM</span>
            <Link
              to="/admin/login"
              className="text-praxis-muted/60 hover:text-praxis-secondary flex items-center gap-1 transition-colors"
              title="Staff & Admin Portal"
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
