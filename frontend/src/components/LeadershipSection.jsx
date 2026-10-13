import React, { useRef, useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { Shield, Sparkles, Award, Cpu, Palette, ExternalLink } from 'lucide-react';
import { DignitaryProfileModal } from './DignitaryProfileModal';

// No longer using default stock photos as per user request

/**
 * Gilded / Themed Circular Portrait Card Matching Institutional & Tier Branding
 */
export const GoldPortraitCard = ({ person, index = 0, theme = 'gold', size = 'md', onSelectPerson }) => {
  // Use UI-Avatars to generate a fallback image with the first letter of the name
  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'Member')}&background=random&color=fff&size=400&font-size=0.4`;

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
    // Tier 1 & 2: Governing Council & Academic Leadership (Wide cards, spacious layout, non-wrapping names)
    executive: {
      ringSize: 'w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56',
      wrapperWidth: 'w-72 sm:w-96 md:w-[420px] max-w-[440px]',
      titleSize: 'text-xs sm:text-sm md:text-base font-semibold whitespace-normal sm:whitespace-nowrap',
      nameSize: 'text-lg sm:text-2xl md:text-2xl font-bold font-serif whitespace-normal sm:whitespace-nowrap'
    },
    // Tier 4 & 5: Presidents & Vice Presidents (Prominent apex student leaders - guaranteed 1:1 perfect circle)
    presidential: {
      ringSize: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
      wrapperWidth: 'w-64 sm:w-76 md:w-84',
      titleSize: 'text-xs sm:text-sm md:text-base font-semibold',
      nameSize: 'text-base sm:text-xl md:text-2xl font-bold font-serif'
    },
    // Tier 6 & 7: Head Coordinators (Technical & Non-Technical Domain Leads)
    headLead: {
      ringSize: 'w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44',
      wrapperWidth: 'w-64 sm:w-72 md:w-80',
      titleSize: 'text-xs sm:text-sm font-semibold',
      nameSize: 'text-base sm:text-lg md:text-xl font-bold'
    },
    // Tier 3: Faculty Advisors (Larger than student coordinators)
    faculty: {
      ringSize: 'w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44',
      wrapperWidth: 'w-60 sm:w-72 md:w-76',
      titleSize: 'text-xs sm:text-sm font-semibold',
      nameSize: 'text-base sm:text-lg md:text-xl font-bold'
    },
    // Tier 8: Student Coordinators & Chapter Leads
    student: {
      ringSize: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36',
      wrapperWidth: 'w-56 sm:w-64 md:w-68',
      titleSize: 'text-xs sm:text-sm font-medium',
      nameSize: 'text-sm sm:text-base md:text-lg font-bold'
    },
    // Backward compatibility aliases
    xl: {
      ringSize: 'w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56',
      wrapperWidth: 'w-72 sm:w-96 md:w-[420px] max-w-[440px]',
      titleSize: 'text-xs sm:text-sm md:text-base font-semibold whitespace-normal sm:whitespace-nowrap',
      nameSize: 'text-lg sm:text-2xl md:text-2xl font-bold font-serif whitespace-normal sm:whitespace-nowrap'
    },
    lg: {
      ringSize: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
      wrapperWidth: 'w-64 sm:w-76 md:w-84',
      titleSize: 'text-xs sm:text-sm font-semibold',
      nameSize: 'text-base sm:text-lg md:text-xl font-bold'
    },
    md: {
      ringSize: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36',
      wrapperWidth: 'w-56 sm:w-64 md:w-68',
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
      className={`flex flex-col items-center text-center px-3 py-3 shrink-0 ${currentSize.wrapperWidth} select-none group transition-all duration-300 ${onSelectPerson ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* 1. Circular Portrait with Themed Double-Ring Border & Frame Lift Effect (Forced 1:1 Aspect Ratio) */}
      <div className="relative mb-3 flex items-center justify-center shrink-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105">
        {/* Ambient Glow Behind */}
        <div className={`absolute -inset-2 rounded-full bg-gradient-to-tr ${currentTheme.glow} blur-lg opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300 pointer-events-none`} />
        
        {/* Outer Ring - Forced aspect-square to guarantee 100% perfect round circle */}
        <div className={`relative ${currentSize.ringSize} aspect-square shrink-0 rounded-full p-[3px] bg-gradient-to-b ${currentTheme.ring} shadow-[0_10px_30px_rgba(0,0,0,0.85)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.95)] transition-shadow duration-300`}>
          {/* Inner Dark Gap Ring */}
          <div className="w-full h-full aspect-square rounded-full p-[2px] bg-[#07090D] shrink-0">
            {/* Image Container with Inner Border */}
            <div className={`w-full h-full aspect-square rounded-full overflow-hidden border ${currentTheme.innerBorder} shrink-0`}>
              <img
                src={person.photoUrl || fallbackPhoto}
                alt={person.name}
                referrerPolicy="no-referrer"
                draggable="false"
                className="w-full h-full aspect-square object-cover object-center rounded-full block pointer-events-none select-none"
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
        {(() => {
          const isGovOrAcademic = ['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR', 'ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(person.roleType) ||
            person.collectionName === 'leaders_governing_council' ||
            person.collectionName === 'leaders_academic_leadership';

          const isFacultyRole = ['FACULTY_COORDINATOR', 'FACULTY_HEAD', 'FACULTY_ADVISOR', 'FACULTY'].includes(person.roleType) ||
            person.collectionName === 'leaders_faculty';

          let displayDept = person.department;

          // 1. Remove "Governing Council, SDES" / "Governing Council" from Dean, Principal, Department Head, and Governing Council
          if (isGovOrAcademic || displayDept?.includes('Governing Council') || displayDept?.includes('Academic Leadership')) {
            displayDept = null;
          }

          // 2. For faculty coordinator, in place of "CSE-Allied", keep "Asst. Prof."
          if (isFacultyRole) {
            if (!displayDept || displayDept === 'CSE-Allied' || displayDept?.includes('CSE-Allied')) {
              displayDept = 'Asst. Prof.';
            }
          }

          const details = [person.yearClass, person.section && `Sec: ${person.section}`, displayDept].filter(Boolean);
          if (details.length === 0) return null;
          return (
            <span className="text-white/55 text-[11px] sm:text-xs tracking-wider block font-cinematic">
              {details.join(' • ')}
            </span>
          );
        })()}
        {person.rollNumber && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-praxis-cyan/70 block">
            ID: {person.rollNumber}
          </span>
        )}
      </div>

      {person.clubSlug && person.clubSlug !== 'none' && !onSelectPerson && (
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40 mt-1 block font-cinematic">
          {person.clubSlug}
        </span>
      )}
    </div>
  );
};

/**
 * Shimmer Loading Skeleton for Leadership Directory
 */
export const LeadershipLoadingSkeleton = () => (
  <div className="space-y-16 animate-pulse">
    {/* Tier 1 Skeleton */}
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-32 h-3 bg-[#D4AF37]/30 rounded-full mx-auto" />
        <div className="w-64 h-8 bg-white/10 rounded-lg mx-auto" />
        <div className="w-48 h-3 bg-white/5 rounded-full mx-auto" />
      </div>
      <div className="flex justify-center gap-8 py-4 overflow-hidden">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center space-y-3 w-64 shrink-0">
            <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-white/5 to-transparent border border-[#D4AF37]/30 p-2">
              <div className="w-full h-full rounded-full bg-praxis-surface/80" />
            </div>
            <div className="w-28 h-3 bg-[#D4AF37]/30 rounded-full" />
            <div className="w-36 h-5 bg-white/20 rounded" />
            <div className="w-24 h-3 bg-white/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>

    {/* Tier 2 Skeleton */}
    <div className="space-y-6 pt-10 border-t border-white/5">
      <div className="text-center space-y-2">
        <div className="w-32 h-3 bg-emerald-400/30 rounded-full mx-auto" />
        <div className="w-72 h-8 bg-white/10 rounded-lg mx-auto" />
      </div>
      <div className="flex justify-center gap-6 py-4 overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex flex-col items-center space-y-3 w-56 shrink-0">
            <div className="w-32 h-32 rounded-full bg-emerald-950/40 border border-emerald-400/30 p-2">
              <div className="w-full h-full rounded-full bg-praxis-surface/80" />
            </div>
            <div className="w-24 h-3 bg-emerald-400/30 rounded-full" />
            <div className="w-32 h-4 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Auto-Moving Horizontal Scroll Row with Seamless Infinite Loop (No Jump / No Snap)
 */
export const HorizontalAutoScrollRow = ({ 
  items, 
  speed = 0.8, 
  centerIfFits = false, 
  theme = 'gold', 
  size = 'md', 
  spacing = 'space-x-3 sm:space-x-6',
  onSelectPerson 
}) => {
  const scrollRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const [canScroll, setCanScroll] = useState(false);

  // If items length is small, repeat more times so buffer is wide enough on 4K/widescreens
  const repeatCount = (!items || items.length === 0) ? 1 : items.length <= 2 ? 4 : items.length <= 4 ? 3 : 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !items || items.length === 0) return;

    let singleSetWidth = 0;

    const checkOverflow = () => {
      // Calculate width of one logical set
      singleSetWidth = el.scrollWidth / (canScroll ? repeatCount : 1);
      const overflows = singleSetWidth > el.clientWidth + 5;
      setCanScroll(overflows || !centerIfFits);
      singleSetWidth = el.scrollWidth / repeatCount;
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    let animId;
    let lastTime = performance.now();
    let scrollPos = el.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Only scroll if content is wide enough to scroll
      if (!isHoveredRef.current && !isInteractingRef.current && canScroll && singleSetWidth > 0) {
        scrollPos += (speed * (dt / 16.67));

        // Seamless wrap-around modulo reset (0 visual jump)
        if (scrollPos >= singleSetWidth) {
          scrollPos -= singleSetWidth;
        }

        el.scrollLeft = scrollPos;
      } else {
        // Track manual user drag or touch scroll
        if (canScroll && singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * (repeatCount - 1)) {
            el.scrollLeft -= singleSetWidth;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += singleSetWidth;
          }
        }
        scrollPos = el.scrollLeft;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      cancelAnimationFrame(animId);
    };
  }, [items, speed, canScroll, repeatCount, centerIfFits]);

  if (!items || items.length === 0) return null;

  // Duplicate items array to create seamless ribbon when scrolling
  const displayItems = canScroll
    ? Array.from({ length: repeatCount }).flatMap((_, setIdx) => 
        items.map((person, origIdx) => ({
          ...person,
          _displayKey: `set-${setIdx}-${person.id || person._id || origIdx}-${origIdx}`,
          _origIdx: origIdx
        }))
      )
    : items.map((person, idx) => ({
        ...person,
        _displayKey: `single-${person.id || person._id || idx}-${idx}`,
        _origIdx: idx
      }));

  return (
    <div 
      className="relative w-full py-2 group select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onTouchStart={() => { isInteractingRef.current = true; }}
      onTouchEnd={() => { 
        setTimeout(() => { isInteractingRef.current = false; }, 1000); 
      }}
    >
      <div 
        ref={scrollRef}
        className={`w-full overflow-x-auto scrollbar-none flex items-center py-2 ${
          onSelectPerson ? 'cursor-grab active:cursor-grabbing' : ''
        } ${centerIfFits && !canScroll ? 'justify-center' : 'justify-start'}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className={`flex items-start shrink-0 ${spacing}`}>
          {displayItems.map((person) => (
            <GoldPortraitCard 
              key={person._displayKey} 
              person={person} 
              index={person._origIdx}
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
  const { leadership, loading, refreshData } = useData();
  const [selectedDignitary, setSelectedDignitary] = useState(null);

  // If loading and leadership is empty, show glowing shimmer skeleton
  if (loading && (!leadership || leadership.length === 0)) {
    return <LeadershipLoadingSkeleton />;
  }

  // If not loading but leadership list is completely empty, show informative card
  if (!loading && (!leadership || leadership.length === 0)) {
    return (
      <div className="p-12 rounded-3xl liquid-glass border border-white/10 text-center space-y-4 max-w-xl mx-auto">
        <Sparkles className="w-10 h-10 text-praxis-cyan mx-auto animate-pulse" />
        <h4 className="text-lg font-bold uppercase text-white font-display">Leadership Directory Syncing</h4>
        <p className="text-xs text-white/60 font-cinematic uppercase tracking-widest leading-relaxed">
          Loading institutional council members and student coordinators.
        </p>
        <button
          onClick={() => refreshData && refreshData()}
          className="px-4 py-2 rounded-xl bg-praxis-cyan/20 border border-praxis-cyan/40 text-praxis-cyan text-xs font-bold uppercase tracking-wider hover:bg-praxis-cyan hover:text-black transition-all"
        >
          Refresh Directory
        </button>
      </div>
    );
  }

  // If viewing specific club details page: Divide clearly into Faculty Coordinators & Student Coordinators (No modal)
  if (filterClubSlug) {
    const clubFaculty = leadership.filter(
      l => l.clubSlug === filterClubSlug && (
        l.collectionName === 'leaders_faculty' ||
        l.roleType === 'FACULTY_HEAD' || 
        l.roleType === 'FACULTY_COORDINATOR'
      )
    ).sort((a, b) => (a.order || 0) - (b.order || 0));

    const clubStudents = leadership.filter(
      l => l.clubSlug === filterClubSlug && (
        l.collectionName === 'leaders_student_coordinators' ||
        l.roleType === 'CLUB_LEAD' || 
        l.roleType === 'COORDINATOR' || 
        l.roleType === 'STUDENT_LEAD'
      )
    ).sort((a, b) => (a.order || 0) - (b.order || 0));

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
            <HorizontalAutoScrollRow items={clubFaculty} speed={0.8} centerIfFits={true} theme="emerald" size="faculty" spacing="space-x-4 sm:space-x-6" onSelectPerson={null} />
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
            <HorizontalAutoScrollRow items={clubStudents} speed={0.9} centerIfFits={true} theme="cyan" size="student" spacing="space-x-4 sm:space-x-6" onSelectPerson={null} />
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

  // Global Institutional View (About Page) with the 6 Dedicated MongoDB Atlas Collections
  const liveGovMembers = leadership.filter(l => 
    l.collectionName === 'leaders_governing_council' ||
    ['GOVERNING_BODY', 'MANAGEMENT', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(l.roleType)
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const govMembers = liveGovMembers;

  const liveAcadMembers = leadership.filter(l => 
    l.collectionName === 'leaders_academic_leadership' ||
    ['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(l.roleType)
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const acadMembers = liveAcadMembers;

  const facultyMembers = leadership.filter(l => 
    l.collectionName === 'leaders_faculty' ||
    l.roleType === 'FACULTY_HEAD' || 
    l.roleType === 'FACULTY_COORDINATOR'
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  const livePresidents = leadership.filter(l => 
    l.roleType === 'PRAXIS_PRESIDENT' || 
    (l.collectionName === 'leaders_presidents' && !l.roleType?.includes('VICE'))
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const presidents = livePresidents;

  const liveVicePresidents = leadership.filter(l => 
    l.roleType === 'PRAXIS_VICE_PRESIDENT' || 
    (l.collectionName === 'leaders_presidents' && l.roleType?.includes('VICE'))
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const vicePresidents = liveVicePresidents;

  const liveTechDomain = leadership.filter(l => 
    l.roleType === 'TECHNICAL_LEAD' || 
    (l.collectionName === 'leaders_domain_leads' && (l.roleType === 'TECHNICAL_LEAD' || !l.roleType?.includes('NON')))
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const techDomain = liveTechDomain;

  const liveCreativeDomain = leadership.filter(l => 
    l.roleType === 'NON_TECHNICAL_LEAD' || 
    (l.collectionName === 'leaders_domain_leads' && l.roleType?.includes('NON'))
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const creativeDomain = liveCreativeDomain;

  const clubLeads = leadership.filter(l => l.roleType === 'CLUB_LEAD').sort((a, b) => (a.order || 0) - (b.order || 0));
  const coordinators = leadership.filter(l => 
    l.collectionName === 'leaders_student_coordinators' ||
    l.roleType === 'COORDINATOR' || 
    l.roleType === 'STUDENT_LEAD'
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-20">
      
      {/* Tier 01: Governing Council (Vice-Chairman on Left, Chairman in Center, Managing Director on Right) - PROMINENT EXECUTIVE SIZE & GOLD THEME (CLICKABLE DETAIL MODAL) */}
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

          <HorizontalAutoScrollRow items={govMembers} speed={0.6} centerIfFits={true} theme="gold" size="executive" spacing="space-x-8 sm:space-x-12 md:space-x-16" onSelectPerson={setSelectedDignitary} />
        </div>
      )}

      {/* Tier 02: Academic Leadership (Dean, Principal, HOD) - PROMINENT EXECUTIVE SIZE & GOLD THEME (CLICKABLE DETAIL MODAL) */}
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

          <HorizontalAutoScrollRow items={acadMembers} speed={0.7} centerIfFits={true} theme="gold" size="executive" spacing="space-x-8 sm:space-x-12 md:space-x-16" onSelectPerson={setSelectedDignitary} />
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

          <HorizontalAutoScrollRow items={facultyMembers} speed={0.8} theme="emerald" size="faculty" spacing="space-x-4 sm:space-x-6" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 04: PRAXIS Main Club Student Presidents - PROMINENT PRESIDENTIAL SIZE & GOLD THEME (DISPLAY ONLY) */}
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

          <HorizontalAutoScrollRow items={presidents} speed={0.8} centerIfFits={true} theme="gold" size="presidential" spacing="space-x-6 sm:space-x-8" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 05: PRAXIS Main Club Student Vice Presidents - PROMINENT PRESIDENTIAL SIZE & CYAN THEME (DISPLAY ONLY) */}
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

          <HorizontalAutoScrollRow items={vicePresidents} speed={0.8} centerIfFits={true} theme="cyan" size="presidential" spacing="space-x-6 sm:space-x-8" onSelectPerson={null} />
        </div>
      )}

      {/* Tier 06 & Tier 07: Head Coordinators (Overall Technical Coordinators & Overall Non-Technical Coordinators) */}
      {(techDomain.length > 0 || creativeDomain.length > 0) && (
        <div className="space-y-10 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan block mb-1 font-cinematic flex items-center justify-center gap-2">
              <Cpu size={15} className="text-praxis-cyan" /> Central Student Command &bull; Domain Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              Head Coordinators
            </h3>
            <p className="text-xs text-praxis-cyan/80 font-cinematic uppercase tracking-widest mt-1">
              Central Technical & Non-Technical Operational Oversight
            </p>
            <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-praxis-cyan to-transparent mx-auto mt-3" />
          </div>

          {/* Tier 06: Overall Technical Domain Leads */}
          {techDomain.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-cyan-400 block mb-1 font-cinematic flex items-center justify-center gap-2">
                  <Cpu size={14} className="text-cyan-400" /> Tier 06 &bull; Central Technical Command
                </span>
                <h4 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  Overall Technical Coordinators
                </h4>
                <p className="text-xs text-cyan-400/70 font-cinematic uppercase tracking-widest mt-1">
                  Overseeing Technical Chapters & Inter-Club Engineering Projects
                </p>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2" />
              </div>

              <HorizontalAutoScrollRow items={techDomain} speed={0.8} centerIfFits={true} theme="cyan" size="headLead" spacing="space-x-6 sm:space-x-8" onSelectPerson={null} />
            </div>
          )}

          {/* Tier 07: Creative / Non-Technical Domain Leads */}
          {creativeDomain.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="text-center">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-purple-400 block mb-1 font-cinematic flex items-center justify-center gap-2">
                  <Palette size={14} className="text-purple-400" /> Tier 07 &bull; Central Creative & Operations Command
                </span>
                <h4 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  Overall Non-Technical Coordinators
                </h4>
                <p className="text-xs text-purple-400/70 font-cinematic uppercase tracking-widest mt-1">
                  Overseeing Cultural, Sports, Arts, Media & Stage Management
                </p>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-2" />
              </div>

              <HorizontalAutoScrollRow items={creativeDomain} speed={0.8} centerIfFits={true} theme="purple" size="headLead" spacing="space-x-6 sm:space-x-8" onSelectPerson={null} />
            </div>
          )}
        </div>
      )}

      {/* Tier 08: Chapter Leads & Student Coordinators (Sub-Coordinators) */}
      {(clubLeads.length > 0 || coordinators.length > 0) && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-secondary block mb-1 font-cinematic">
              Tier 08 &bull; Chapter Operations & Sub-Coordinators
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wider">
              Student Coordinators & Chapter Leads
            </h3>
            <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest mt-1">
              Execution teams and sub-coordinators across all 8 special-interest chapters
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-3" />
          </div>

          <HorizontalAutoScrollRow items={[...clubLeads, ...coordinators]} speed={1.0} theme="cyan" size="student" spacing="space-x-4 sm:space-x-6" onSelectPerson={null} />
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


