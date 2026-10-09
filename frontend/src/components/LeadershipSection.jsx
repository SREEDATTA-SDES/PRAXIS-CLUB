import React, { useRef, useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { GOVERNING_BODY, ACADEMIC_LEADERSHIP, PRAXIS_STUDENT_LEADERSHIP, PRAXIS_DOMAIN_LEADERSHIP } from '../data/initialData';
import { Shield, Sparkles, Award, Cpu, Palette, ExternalLink } from 'lucide-react';
import { DignitaryProfileModal } from './DignitaryProfileModal';

// Fallback high-resolution portraits
const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
];

/**
 * Gilded / Themed Circular Portrait Card Matching Institutional & Tier Branding
 */
export const GoldPortraitCard = ({ person, index = 0, theme = 'gold', size = 'md', onSelectPerson }) => {
  const fallbackPhoto = DEFAULT_AVATARS[index % DEFAULT_AVATARS.length];

  // Theme styling configurations
  const themeStyles = {
    gold: {
      glow: 'from-[#D4AF37]/50 via-[#F59E0B]/30 to-transparent',
      ring: 'from-[#FEF08A] via-[#D4AF37] to-[#854D0E]',
      innerBorder: 'border-[#D4AF37]/60',
      tagColor: 'text-[#D4AF37]',
      accentBg: 'bg-[#D4AF37]/10'
    },
    cyan: {
      glow: 'from-cyan-400/50 via-sky-500/30 to-transparent',
      ring: 'from-cyan-200 via-sky-400 to-blue-700',
      innerBorder: 'border-cyan-400/60',
      tagColor: 'text-praxis-cyan',
      accentBg: 'bg-cyan-950/40'
    },
    emerald: {
      glow: 'from-emerald-400/50 via-teal-500/30 to-transparent',
      ring: 'from-emerald-200 via-emerald-500 to-teal-800',
      innerBorder: 'border-emerald-400/60',
      tagColor: 'text-emerald-400',
      accentBg: 'bg-emerald-950/40'
    },
    purple: {
      glow: 'from-purple-400/50 via-pink-500/30 to-transparent',
      ring: 'from-purple-200 via-purple-500 to-pink-700',
      innerBorder: 'border-purple-400/60',
      tagColor: 'text-purple-300',
      accentBg: 'bg-purple-950/40'
    },
    amber: {
      glow: 'from-amber-400/50 via-orange-500/30 to-transparent',
      ring: 'from-amber-200 via-amber-500 to-orange-700',
      innerBorder: 'border-amber-400/60',
      tagColor: 'text-amber-400',
      accentBg: 'bg-amber-950/40'
    }
  };

  const sizeStyles = {
    xl: {
      ringSize: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
      wrapperWidth: 'w-64 sm:w-76 md:w-84',
      titleSize: 'text-xs sm:text-sm md:text-base font-semibold',
      nameSize: 'text-base sm:text-xl md:text-2xl font-bold font-serif'
    },
    lg: {
      ringSize: 'w-32 h-32 sm:w-38 sm:h-38 md:w-42 md:h-42',
      wrapperWidth: 'w-60 sm:w-72',
      titleSize: 'text-xs sm:text-sm font-semibold',
      nameSize: 'text-base sm:text-lg md:text-xl font-bold'
    },
    md: {
      ringSize: 'w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38',
      wrapperWidth: 'w-56 sm:w-64',
      titleSize: 'text-xs sm:text-sm font-medium',
      nameSize: 'text-sm sm:text-base md:text-lg font-bold'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.gold;
  const currentSize = sizeStyles[size] || sizeStyles.md;

  const handleClick = () => {
    if (onSelectPerson) {
      onSelectPerson(person);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`flex flex-col items-center text-center px-3 py-3 shrink-0 ${currentSize.wrapperWidth} select-none group transition-all duration-300 ${onSelectPerson ? 'cursor-pointer hover:-translate-y-1.5' : 'cursor-default'}`}
    >
      {/* 1. Circular Portrait with Themed Double-Ring Border */}
      <div className="relative mb-3 flex items-center justify-center">
        {/* Ambient Glow Behind */}
        <div className={`absolute -inset-2 rounded-full bg-gradient-to-tr ${currentTheme.glow} blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Outer Ring */}
        <div className={`relative ${currentSize.ringSize} rounded-full p-[3px] bg-gradient-to-b ${currentTheme.ring} shadow-[0_10px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500`}>
          {/* Inner Dark Gap Ring */}
          <div className="w-full h-full rounded-full p-[2px] bg-[#07090D]">
            {/* Image Container with Inner Border */}
            <div className={`w-full h-full rounded-full overflow-hidden border ${currentTheme.innerBorder}`}>
              <img
                src={person.photoUrl || fallbackPhoto}
                alt={person.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackPhoto;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Designation / Role Title in Themed Accent */}
      <span className={`${currentTheme.tagColor} font-cinematic uppercase tracking-[0.2em] ${currentSize.titleSize} mb-1 leading-snug drop-shadow-sm`}>
        {person.designation || (person.position ? `${person.position}` : 'Coordinator')}
      </span>

      {/* 3. Official Name in Bold White/Ivory */}
      <h4 className={`text-white tracking-wide mb-1 leading-tight ${currentSize.nameSize}`}>
        {person.name}
      </h4>

      {/* 4. Details / Qualifications / Year / Section */}
      <div className="space-y-0.5">
        {person.qualifications && (
          <span className="text-white/75 text-xs sm:text-sm tracking-wider font-normal block leading-relaxed font-mono">
            {person.qualifications}
          </span>
        )}
        {(person.yearClass || person.section || person.department) && (
          <span className="text-white/55 text-[11px] sm:text-xs tracking-wider block font-cinematic">
            {[person.yearClass, person.section && `Sec: ${person.section}`, person.department].filter(Boolean).join(' • ')}
          </span>
        )}
        {person.rollNumber && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-praxis-cyan/70 block">
            ID: {person.rollNumber}
          </span>
        )}
      </div>

      {/* Detail Page CTA Button for Dignitaries */}
      {onSelectPerson && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="mt-2.5 text-[9px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] hover:text-black bg-[#D4AF37]/10 hover:bg-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full transition-all duration-300 shadow-sm flex items-center gap-1 font-cinematic"
        >
          <Sparkles size={10} /> View Profile & Vision
        </button>
      )}

      {person.clubSlug && !onSelectPerson && (
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40 mt-1 block font-cinematic">
          {person.clubSlug}
        </span>
      )}
    </div>
  );
};

/**
 * Auto-Moving Horizontal Scroll Row
 */
export const HorizontalAutoScrollRow = ({ items, speed = 0.8, centerIfFits = false, theme = 'gold', size = 'md', onSelectPerson }) => {
  const scrollRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 5);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    let animId;
    let lastTime = performance.now();
    let scrollPos = el.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      if (!isHoveredRef.current && !isInteractingRef.current && el.scrollWidth > el.clientWidth + 5) {
        scrollPos += (speed * (dt / 16.67));

        if (scrollPos >= el.scrollWidth - el.clientWidth - 1) {
          scrollPos = 0;
        }

        el.scrollLeft = scrollPos;
      } else {
        scrollPos = el.scrollLeft;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      cancelAnimationFrame(animId);
    };
  }, [items, speed]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="relative w-full py-2 group select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onTouchStart={() => { isInteractingRef.current = true; }}
      onTouchEnd={() => { 
        setTimeout(() => { isInteractingRef.current = false; }, 1200); 
      }}
    >
      <div 
        ref={scrollRef}
        className={`w-full overflow-x-auto scrollbar-none flex items-center py-2 ${
          onSelectPerson ? 'cursor-grab active:cursor-grabbing' : ''
        } ${centerIfFits && !canScroll ? 'justify-center' : 'justify-start'}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex items-start shrink-0 space-x-2 sm:space-x-4">
          {items.map((person, idx) => (
            <GoldPortraitCard 
              key={`${person.id || person._id || idx}-${idx}`} 
              person={person} 
              index={idx}
              theme={theme}
              size={size}
              onSelectPerson={onSelectPerson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LeadershipSection = ({ filterClubSlug = null }) => {
  const { leadership } = useData();
  const [selectedDignitary, setSelectedDignitary] = useState(null);

  // If viewing specific club details page: Divide clearly into Faculty Coordinators & Student Coordinators (No modal)
  if (filterClubSlug) {
    const clubFaculty = leadership.filter(
      l => l.clubSlug === filterClubSlug && (l.roleType === 'FACULTY_HEAD' || l.roleType === 'FACULTY_COORDINATOR')
    );

    const clubStudents = leadership.filter(
      l => l.clubSlug === filterClubSlug && (l.roleType === 'CLUB_LEAD' || l.roleType === 'COORDINATOR' || l.roleType === 'STUDENT_LEAD')
    );

    return (
      <div className="space-y-16">
        
        {/* Section 1: Faculty In-Charge / Advisors */}
        <div className="space-y-6">
          <div className="text-center sm:text-left border-l-2 border-emerald-400/80 pl-4 sm:pl-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-emerald-400 flex items-center gap-2 mb-1 font-cinematic">
              <Shield size={14} /> Faculty In-Charge & Guidance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display">
              Faculty Coordinators
            </h3>
            <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
              Academic mentorship & chapter oversight
            </p>
          </div>

          {clubFaculty.length > 0 ? (
            <HorizontalAutoScrollRow items={clubFaculty} speed={0.8} centerIfFits={true} theme="emerald" size="lg" onSelectPerson={null} />
          ) : (
            <div className="p-8 rounded-2xl liquid-glass border border-white/10 text-center">
              <p className="text-xs text-white/50 uppercase tracking-widest font-cinematic">
                Faculty Advisor appointment in progress.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Student Chapter Leadership & Coordinators */}
        <div className="space-y-6 pt-8 border-t border-white/5">
          <div className="text-center sm:text-left border-l-2 border-praxis-cyan/80 pl-4 sm:pl-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-praxis-cyan flex items-center gap-2 mb-1 font-cinematic">
              <Sparkles size={14} /> Student Chapter Command
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display">
              Club Leads & Coordinators
            </h3>
            <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
              Operational execution, technical lead & event management &bull; Hover to pause
            </p>
          </div>

          {clubStudents.length > 0 ? (
            <HorizontalAutoScrollRow items={clubStudents} speed={0.9} centerIfFits={true} theme="cyan" size="md" onSelectPerson={null} />
          ) : (
            <div className="p-8 rounded-2xl liquid-glass border border-white/10 text-center">
              <p className="text-xs text-white/50 uppercase tracking-widest font-cinematic">
                Student coordinators list being updated.
              </p>
            </div>
          )}
        </div>

      </div>
    );
  }

  // Global Institutional View (About Page) with the 6 Key Dignitaries Clickable
  const liveGovMembers = leadership.filter(l => ['GOVERNING_BODY', 'MANAGEMENT', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(l.roleType));
  const govMembers = liveGovMembers.length > 0 ? liveGovMembers : GOVERNING_BODY;

  const liveAcadMembers = leadership.filter(l => ['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(l.roleType));
  const acadMembers = liveAcadMembers.length > 0 ? liveAcadMembers : ACADEMIC_LEADERSHIP;

  const facultyMembers = leadership.filter(l => l.roleType === 'FACULTY_HEAD' || l.roleType === 'FACULTY_COORDINATOR');

  const livePresidents = leadership.filter(l => l.roleType === 'PRAXIS_PRESIDENT');
  const presidents = livePresidents.length > 0 ? livePresidents : (PRAXIS_STUDENT_LEADERSHIP?.presidents || []);

  const liveVicePresidents = leadership.filter(l => l.roleType === 'PRAXIS_VICE_PRESIDENT');
  const vicePresidents = liveVicePresidents.length > 0 ? liveVicePresidents : (PRAXIS_STUDENT_LEADERSHIP?.vicePresidents || []);

  const liveTechDomain = leadership.filter(l => l.roleType === 'TECHNICAL_LEAD');
  const techDomain = liveTechDomain.length > 0 ? liveTechDomain : (PRAXIS_DOMAIN_LEADERSHIP?.technical || []);

  const liveCreativeDomain = leadership.filter(l => l.roleType === 'NON_TECHNICAL_LEAD');
  const creativeDomain = liveCreativeDomain.length > 0 ? liveCreativeDomain : (PRAXIS_DOMAIN_LEADERSHIP?.creative || PRAXIS_DOMAIN_LEADERSHIP?.nonTechnical || []);

  const clubLeads = leadership.filter(l => l.roleType === 'CLUB_LEAD');
  const coordinators = leadership.filter(l => l.roleType === 'COORDINATOR' || l.roleType === 'STUDENT_LEAD');

  return (
    <div className="space-y-20">
      
      {/* Tier 01: Governing Council (Vice-Chairman on Left, Chairman in Center, Managing Director on Right) - PROMINENT XL SIZE & GOLD THEME (CLICKABLE DETAIL MODAL) */}
      {govMembers.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-1 font-cinematic">
              Tier 01 &bull; Institutional Governance
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold uppercase text-white font-display tracking-wider">
              Governing Council
            </h3>
            <p className="text-xs text-[#D4AF37]/80 font-cinematic uppercase tracking-widest mt-1">
              Visionary Patrons & Institutional Leadership &bull; Click card to view full visionary address
            </p>
            <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={govMembers} speed={0.6} centerIfFits={true} theme="gold" size="xl" onSelectPerson={setSelectedDignitary} />
        </div>
      )}

      {/* Tier 02: Academic Leadership (Dean, Principal, HOD) - PROMINENT XL SIZE & GOLD THEME (CLICKABLE DETAIL MODAL) */}
      {acadMembers.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-white/80 block mb-1 font-cinematic">
              Tier 02 &bull; Academic Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              Dean, Principal & Department Head
            </h3>
            <p className="text-xs text-[#D4AF37]/80 font-cinematic uppercase tracking-widest mt-1">
              Academic Governance & Institutional Pillars &bull; Click card to view profile & vision
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={acadMembers} speed={0.7} centerIfFits={true} theme="gold" size="xl" onSelectPerson={setSelectedDignitary} />
        </div>
      )}

      {/* Tier 03: Faculty In-Charges & Coordinators Across All 8 Clubs - EMERALD THEME (DISPLAY ONLY - NO MODAL) */}
      {facultyMembers.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-emerald-400 block mb-1 font-cinematic">
              Tier 03 &bull; Faculty Mentorship & Advisors
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              Faculty Advisors & Coordinators (All Chapters)
            </h3>
            <p className="text-xs text-emerald-400/70 font-cinematic uppercase tracking-widest mt-1">
              Continuous steering & departmental coordination &bull; Hover to pause
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={facultyMembers} speed={0.8} theme="emerald" size="lg" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 04: PRAXIS Main Club Student Presidents - PROMINENT LG SIZE & GOLD THEME (DISPLAY ONLY) */}
      {presidents.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-1 font-cinematic flex items-center justify-center gap-2">
              <Award size={15} className="text-[#D4AF37]" /> Tier 04 &bull; Student Command
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              PRAXIS Student Presidents
            </h3>
            <p className="text-xs text-[#D4AF37]/80 font-cinematic uppercase tracking-widest mt-1">
              Executive Apex Council &bull; Male & Female Representation
            </p>
            <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={presidents} speed={0.8} centerIfFits={true} theme="gold" size="lg" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 05: PRAXIS Main Club Student Vice Presidents - PROMINENT LG SIZE & CYAN THEME (DISPLAY ONLY) */}
      {vicePresidents.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan block mb-1 font-cinematic flex items-center justify-center gap-2">
              <Shield size={15} className="text-praxis-cyan" /> Tier 05 &bull; Operational Council
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              PRAXIS Student Vice Presidents
            </h3>
            <p className="text-xs text-praxis-cyan/80 font-cinematic uppercase tracking-widest mt-1">
              Vice Executive Council &bull; Male & Female Representation
            </p>
            <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-praxis-cyan to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={vicePresidents} speed={0.8} centerIfFits={true} theme="cyan" size="lg" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 06: Overall Technical Domain Leads & Creative/Non-Technical Domain Leads (DISPLAY ONLY) */}
      {(techDomain.length > 0 || creativeDomain.length > 0) && (
        <div className="space-y-12 pt-10 border-t border-white/10">
          {/* Technical Domain Leads */}
          {techDomain.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-cyan-400 block mb-1 font-cinematic flex items-center justify-center gap-2">
                  <Cpu size={15} className="text-cyan-400" /> Tier 06A &bull; Overall Technical Domain Leads
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  Overall Technical Coordinators
                </h3>
                <p className="text-xs text-cyan-400/70 font-cinematic uppercase tracking-widest mt-1">
                  Overseeing Technical Chapters & Inter-Club Engineering Projects
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2" />
              </div>

              <HorizontalAutoScrollRow items={techDomain} speed={0.8} centerIfFits={true} theme="cyan" size="lg" onSelectPerson={null} />
            </div>
          )}

          {/* Creative / Non-Technical Domain Leads */}
          {creativeDomain.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-purple-400 block mb-1 font-cinematic flex items-center justify-center gap-2">
                  <Palette size={15} className="text-purple-400" /> Tier 06B &bull; Overall Creative & Operations Leads
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  Overall Non-Technical Coordinators
                </h3>
                <p className="text-xs text-purple-400/70 font-cinematic uppercase tracking-widest mt-1">
                  Overseeing Cultural, Sports, Arts, Media & Stage Management
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-2" />
              </div>

              <HorizontalAutoScrollRow items={creativeDomain} speed={0.8} centerIfFits={true} theme="purple" size="lg" onSelectPerson={null} />
            </div>
          )}
        </div>
      )}

      {/* Tier 07: Chapter Leads & Student Coordinators (DISPLAY ONLY) */}
      {(clubLeads.length > 0 || coordinators.length > 0) && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-secondary block mb-1 font-cinematic">
              Tier 07 &bull; Chapter Operations
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              Club Chapter Leads & Student Coordinators
            </h3>
            <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
              Execution team across all 8 special-interest chapters
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={[...clubLeads, ...coordinators]} speed={1.0} theme="cyan" size="md" onSelectPerson={null} />
        </div>
      )}

      {/* Dignitary Profile Modal - Rendered only when a Dignitary is clicked */}
      {selectedDignitary && (
        <DignitaryProfileModal 
          person={selectedDignitary} 
          onClose={() => setSelectedDignitary(null)} 
        />
      )}

    </div>
  );
};


