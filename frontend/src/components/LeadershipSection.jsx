import React from 'react';
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
    <div className="flex flex-col items-center text-center px-6 py-4 shrink-0 w-64 sm:w-72 select-none group">
      {/* 1. Circular Portrait with Gilded Gold Double-Ring Border */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Ambient Gold Glow Behind */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-[#F59E0B]/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Outer Gold Ring */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#854D0E] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Inner Dark Gap Ring */}
          <div className="w-full h-full rounded-full p-[2.5px] bg-[#07090D]">
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
 * Automatically scrolls continuously, pauses when cursor is hovered over it,
 * and allows smooth manual touch/drag scrolling.
 */
export const HorizontalAutoScrollRow = ({ items, speedSeconds = 35 }) => {
  if (!items || items.length === 0) return null;

  // Duplicate items to enable seamless, infinite looping
  // If fewer items, repeat multiple times to comfortably fill and wrap
  const repeatCount = items.length < 5 ? 4 : 3;
  const displayItems = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Left and Right Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-praxis-bg via-praxis-bg/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-praxis-bg via-praxis-bg/80 to-transparent z-10 pointer-events-none" />

      {/* Horizontally scrollable container with auto-marquee animation */}
      <div className="overflow-x-auto scrollbar-none flex cursor-grab active:cursor-grabbing">
        <div 
          className="flex items-start shrink-0 animate-marquee-infinite"
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {displayItems.map((person, idx) => (
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
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#D4AF37] block mb-1">
            Chapter Governance
          </span>
          <h3 className="text-2xl font-bold uppercase text-white font-display">
            Club Leads & Coordinators
          </h3>
          <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
            Hover cursor to pause auto-scroll &bull; Drag to inspect
          </p>
        </div>

        <HorizontalAutoScrollRow items={clubTeam} speedSeconds={25} />
      </div>
    );
  }

  // Global Institutional View (About Page)
  return (
    <div className="space-y-16">
      
      {/* 1. Governing Body / Management Dignitaries */}
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

        <HorizontalAutoScrollRow items={GOVERNING_BODY} speedSeconds={30} />
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

        <HorizontalAutoScrollRow items={facultyMembers} speedSeconds={30} />
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

          <HorizontalAutoScrollRow items={allStudentCoordinators} speedSeconds={45} />
        </div>
      )}

    </div>
  );
};
