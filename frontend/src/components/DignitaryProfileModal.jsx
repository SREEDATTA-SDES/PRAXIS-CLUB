import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Award, Sparkles, Building2, Quote, CheckCircle } from 'lucide-react';
import { COLLEGE_BRAND } from '../data/initialData';

export const DignitaryProfileModal = ({ person, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!person) return null;

  const isGoverningCouncil = ['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(person.roleType) || 
    person.position?.toLowerCase().includes('chairman') || 
    person.position?.toLowerCase().includes('director');

  const themeColors = isGoverningCouncil ? {
    glow: 'from-[#D4AF37]/30 via-[#F59E0B]/15 to-transparent',
    ring: 'from-[#FEF08A] via-[#D4AF37] to-[#854D0E]',
    badgeBg: 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]',
    accentText: 'text-[#D4AF37]',
    quoteBorder: 'border-[#D4AF37]/60'
  } : {
    glow: 'from-cyan-400/30 via-blue-500/15 to-transparent',
    ring: 'from-cyan-200 via-sky-400 to-blue-700',
    badgeBg: 'bg-cyan-950/60 border-cyan-500/40 text-praxis-cyan',
    accentText: 'text-praxis-cyan',
    quoteBorder: 'border-cyan-400/60'
  };

  // Format bio into paragraphs if it has newlines
  const bioParagraphs = person.bio 
    ? person.bio.split('\n').filter(p => p.trim().length > 0)
    : [];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#080B11]/95 border border-white/15 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-white select-none max-h-[90vh] flex flex-col"
        >
          {/* Ambient Lighting Gradient */}
          <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b ${themeColors.glow} rounded-full blur-[100px] pointer-events-none`} />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] relative z-10">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-[0.25em] px-3 py-1 rounded-full border ${themeColors.badgeBg} font-cinematic flex items-center gap-1.5`}>
                <Shield size={12} />
                {isGoverningCouncil ? 'Institutional Governance' : 'Academic Leadership'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              aria-label="Close profile"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto scrollbar-thin relative z-10">
            
            {/* Top Identity Block */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              
              {/* Circular Gilded Portrait */}
              <div className="relative shrink-0">
                <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-b ${themeColors.ring} shadow-[0_12px_35px_rgba(0,0,0,0.9)]`}>
                  <div className="w-full h-full rounded-full p-[2px] bg-[#07090D] overflow-hidden">
                    <img
                      src={person.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'Dignitary')}&background=random&color=fff&size=400&font-size=0.4`}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'Dignitary')}&background=0D1117&color=fff&size=400&font-size=0.4`;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Title & Institutional Rank */}
              <div className="space-y-1.5 flex-1">
                <span className={`text-xs uppercase tracking-[0.25em] font-bold ${themeColors.accentText} font-cinematic block`}>
                  {person.position || person.designation}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
                  {person.name}
                </h2>

                {person.qualifications && (
                  <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wide font-mono">
                    {person.qualifications}
                  </p>
                )}

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-white/50 text-xs font-cinematic">
                  <Building2 size={13} className="text-white/40" />
                  <span>{person.department || COLLEGE_BRAND.name}</span>
                </div>
              </div>
            </div>

            {/* Visionary Message Quote Card */}
            {person.message && (
              <div className={`p-5 rounded-2xl bg-white/[0.03] border-l-4 ${themeColors.quoteBorder} border-y border-r border-white/5 relative overflow-hidden`}>
                <Quote size={24} className="text-white/10 absolute top-3 right-3" />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40 block mb-2 font-cinematic">
                  Leadership Vision & Mandate
                </span>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-serif italic">
                  "{person.message}"
                </p>
              </div>
            )}

            {/* Profile Overview & Detailed Matter */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-white/50 font-cinematic block">
                Executive Profile & Information
              </span>
              
              {bioParagraphs.length > 0 ? (
                <div className="space-y-3">
                  {bioParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-white/80 leading-relaxed font-cinematic tracking-wide">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-cinematic tracking-wide">
                  {person.name} serves as the {person.position || 'Institutional Leader'} at {COLLEGE_BRAND.name}, providing strategic guidance, academic mentorship, and infrastructural empowerment to the student body and PRAXIS chapters.
                </p>
              )}
            </div>

            {/* Institutional Seal Footnote */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 text-[11px] text-white/40 font-cinematic">
                <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                <span>SDES CSE-Allied Governing Board Verification</span>
              </div>

              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                Autonomous Institution
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

