import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Calendar, Sparkles } from 'lucide-react';
import { COLLEGE_BRAND } from '../data/initialData';

export const Hero = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background cinematic lighting streaks */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-praxis-glow/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-praxis-cyan/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtle Institutional Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-praxis-cyan/30 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-praxis-cyan animate-ping" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-praxis-cyan">
            SDES CSE-ALLIED ECOSYSTEM
          </span>
        </div>

        {/* Interactive 3D Coin-flip PRAXIS Logo */}
        <div 
          className="perspective-1000 my-2 cursor-pointer group"
          onClick={() => setFlipped(!flipped)}
          title="Click to spin the PRAXIS emblem"
        >
          <div 
            className={`relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center rounded-2xl glass-panel-elevated p-3 border border-praxis-border group-hover:border-praxis-glow/70 shadow-cinematic-blue transition-transform duration-700 transform-style-3d ${
              flipped ? 'rotate-y-180 scale-105' : 'group-hover:scale-105'
            }`}
          >
            <img
              src={COLLEGE_BRAND.praxisLogoUrl}
              alt="PRAXIS Master Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(40,118,184,0.35)]"
            />
          </div>
        </div>

        {/* High-Contrast Editorial Display Typography */}
        <div className="mt-6 space-y-3">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-praxis-secondary block">
            SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-white display-title leading-none">
            PRAXIS
          </h1>
        </div>

        {/* Primary Statement */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-praxis-text/90 max-w-2xl font-light leading-relaxed tracking-wide">
          "{COLLEGE_BRAND.praxisStatement}"
        </p>

        {/* Context subtitle */}
        <p className="mt-3 text-xs sm:text-sm text-praxis-muted uppercase tracking-[0.2em] max-w-xl">
          Unifying 6 premier technical & creative student chapters under one unified college canopy
        </p>

        {/* Hero Action Buttons (Notice: NO 'Join Praxis' button as requested) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <Link
            to="/clubs"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-[0.25em] shadow-cinematic-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Compass size={16} />
            <span>EXPLORE CLUBS</span>
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg glass-panel hover:glass-panel-elevated border border-praxis-border hover:border-praxis-cyan/50 text-praxis-text hover:text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            <span>UPCOMING EVENTS</span>
          </Link>
        </div>

        {/* Subtle quick metrics ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 border-t border-praxis-border/50 pt-8 w-full max-w-4xl text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-display">6</span>
            <span className="text-[10px] text-praxis-muted tracking-widest uppercase block mt-1">Official Clubs</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-praxis-cyan font-display">TECHNICAL</span>
            <span className="text-[10px] text-praxis-muted tracking-widest uppercase block mt-1">Software & Hardware</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-praxis-accent font-display">NON-TECHNICAL</span>
            <span className="text-[10px] text-praxis-muted tracking-widest uppercase block mt-1">Debate, Media & Impact</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">CSE-ALLIED</span>
            <span className="text-[10px] text-praxis-muted tracking-widest uppercase block mt-1">SDES Department</span>
          </div>
        </div>

      </div>
    </section>
  );
};
