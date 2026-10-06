import React, { useRef, useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { GOVERNING_BODY } from '../data/initialData';

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
 * Gold-Framed Circular Portrait Card Matching Institutional Branding
 */
export const GoldPortraitCard = ({ person, index = 0 }) => {
  const fallbackPhoto = DEFAULT_AVATARS[index % DEFAULT_AVATARS.length];

  return (
    <div className="flex flex-col items-center text-center px-4 py-3 shrink-0 w-60 sm:w-68 select-none group">
      {/* 1. Circular Portrait with Gilded Gold Double-Ring Border */}
      <div className="relative mb-3 flex items-center justify-center">
        {/* Ambient Gold Glow Behind */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#D4AF37]/40 via-[#F59E0B]/25 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Outer Gold Ring */}
        <div className="relative w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 rounded-full p-[2.5px] bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#854D0E] shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
          {/* Inner Dark Gap Ring */}
          <div className="w-full h-full rounded-full p-[2px] bg-[#07090D]">
            {/* Image Container with Inner Gold Border */}
            <div className="w-full h-full rounded-full overflow-hidden border border-[#D4AF37]/60">
              <img
                src={person.photoUrl || fallbackPhoto}
                alt={person.name}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackPhoto;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Designation / Role Title in Golden Accent */}
      <span className="text-[#D4AF37] font-cinematic uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-1 leading-snug drop-shadow-sm">
        {person.designation || (person.position ? `${person.position} :` : 'Coordinator :')}
      </span>

      {/* 3. Official Name in Bold White/Ivory */}
      <h4 className="text-white font-bold text-base sm:text-lg tracking-wide mb-1 font-serif sm:font-sans leading-tight">
        {person.name}
      </h4>

      {/* 4. Qualifications / Subtitle in Subtle Gold / Cream */}
      <span className="text-white/65 text-xs sm:text-sm tracking-wider font-normal leading-relaxed">
        {person.qualifications || person.department || person.yearClass || ''}
      </span>

      {person.clubSlug && (
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-praxis-cyan mt-1 block">
          {person.clubSlug}
        </span>
      )}
    </div>
  );
};

/**
 * Auto-Moving Horizontal Scroll Row
 * Smoothly auto-scrolls using requestAnimationFrame, pauses instantly when hovered or touched,
 * supports natural drag/swipe, and has NO black color shades on edges.
 */
export const HorizontalAutoScrollRow = ({ items, speed = 0.8, centerIfFits = false }) => {
  const scrollRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Check if content overflows container
    const checkOverflow = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 5);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    let animId;
    let lastTime = performance.now();
    let scrollPos = el.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50); // Cap frame delta to prevent jumps
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
      {/* Scrollable Container - NO black edge shades */}
      <div 
        ref={scrollRef}
        className={`w-full overflow-x-auto scrollbar-none flex items-center py-2 cursor-grab active:cursor-grabbing ${
          centerIfFits && !canScroll ? 'justify-center' : 'justify-start'
        }`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex items-start shrink-0 space-x-2 sm:space-x-4">
          {items.map((person, idx) => (
            <GoldPortraitCard 
              key={`${person.id || person._id || idx}-${idx}`} 
              person={person} 
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LeadershipSection = ({ filterClubSlug = null }) => {
  const { leadership } = useData();

  // Filter based on context
  const facultyMembers = leadership.filter(l => l.roleType === 'FACULTY_HEAD' || l.roleType === 'FACULTY_COORDINATOR');
  const praxisLeads = leadership.filter(l => l.roleType === 'PRAXIS_LEAD');
  
  const clubLeads = filterClubSlug 
    ? leadership.filter(l => l.clubSlug === filterClubSlug && l.roleType === 'CLUB_LEAD')
    : leadership.filter(l => l.roleType === 'CLUB_LEAD');

  const coordinators = filterClubSlug
    ? leadership.filter(l => l.clubSlug === filterClubSlug && l.roleType === 'COORDINATOR')
    : leadership.filter(l => l.roleType === 'COORDINATOR');

  // Combined Student Coordinators & Leads for global view
  const allStudentCoordinators = [...praxisLeads, ...clubLeads, ...coordinators];

  // If viewing specific club details
  if (filterClubSlug) {
    const clubTeam = [...clubLeads, ...coordinators];

    return (
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#D4AF37] block mb-1">
            Chapter Governance
          </span>
          <h3 className="text-2xl font-bold uppercase text-white font-display">
            Club Leads & Coordinators
          </h3>
          <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
            Auto-scrolling &bull; Hover cursor to pause &bull; Drag to inspect
          </p>
        </div>

        <HorizontalAutoScrollRow items={clubTeam} speed={0.9} />
      </div>
    );
  }

  // Global Institutional View (About Page)
  return (
    <div className="space-y-16">
      
      {/* 1. Governing Body / Management Dignitaries - 3 Distinct Leaders, No Duplicates */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-1 font-cinematic">
            Institutional Leadership
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display">
            Governing Council
          </h3>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
        </div>

        {/* Displays the 3 dignitaries centered on desktop, auto-scrolls on mobile */}
        <HorizontalAutoScrollRow items={GOVERNING_BODY} speed={0.8} centerIfFits={true} />
      </div>

      {/* 2. Head of Department (HOD) & Faculty Coordinators */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <div className="text-center">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan block mb-1 font-cinematic">
            Academic & Advisory Steering
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display">
            HOD & Faculty Coordinators
          </h3>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-praxis-cyan to-transparent mx-auto mt-2" />
        </div>

        <HorizontalAutoScrollRow items={facultyMembers} speed={0.8} centerIfFits={true} />
      </div>

      {/* 3. Central Student Council, Club Leads & Student Coordinators */}
      {allStudentCoordinators.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-accent block mb-1 font-cinematic">
              Student Operational Steering
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display">
              Student Coordinators & Chapter Leads
            </h3>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-praxis-accent to-transparent mx-auto mt-2" />
          </div>

          <HorizontalAutoScrollRow items={allStudentCoordinators} speed={1.0} />
        </div>
      )}

    </div>
  );
};
