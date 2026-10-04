import React from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { Link } from 'react-router-dom';

export const CollegeBrand = ({ className = "", layout = "horizontal", disableLink = false }) => {
  const content = layout === "vertical" ? (
    <div className={`flex flex-col items-center text-center group ${className}`}>
      {/* 1. College Logo at Top */}
      <img
        src={COLLEGE_BRAND.logoUrl}
        alt="SDES College Logo"
        className="h-20 sm:h-24 md:h-28 w-auto object-contain mb-3 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. College Name at bottom of Logo */}
      <div className="flex flex-col items-center text-center max-w-lg">
        <span 
          className="text-[#E52329] uppercase tracking-wider text-sm sm:text-lg md:text-xl lg:text-2xl leading-tight font-bold"
          style={{ fontFamily: '"Copperplate Gothic Bold", "Copperplate", serif' }}
        >
          SREE DATTHA INSTITUTE
        </span>
        <span 
          className="text-[#E52329] uppercase tracking-wider text-sm sm:text-lg md:text-xl lg:text-2xl leading-tight font-bold mb-2"
          style={{ fontFamily: '"Copperplate Gothic Bold", "Copperplate", serif' }}
        >
          OF ENGINEERING & SCIENCE
        </span>
        
        {/* Top Divider */}
        <div className="w-full max-w-md h-[1px] bg-white/40 mb-1.5" />
        
        {/* 3. Supporting Tagline - Reduced size */}
        <span className="text-white/90 text-[7px] sm:text-[8px] md:text-[9.5px] uppercase font-medium tracking-tight leading-none mb-1.5 px-2 text-center">
          ( Approved by AICTE, New Delhi, Accredited by NAAC, Affiliated to JNTUH, College Code: SDES )
        </span>
        
        {/* Bottom Divider */}
        <div className="w-full max-w-md h-[1px] bg-white/40 mb-1.5" />
        
        {/* 4. Autonomous Institution */}
        <span className="text-white text-[9px] sm:text-[11px] md:text-[13px] font-bold tracking-[0.25em] uppercase leading-none text-center">
          An Autonomous Institution
        </span>
      </div>
    </div>
  ) : (
    <div className={`flex items-center gap-2 sm:gap-4 group shrink-0 ${className}`}>
      {/* College Logo */}
      <img
        src={COLLEGE_BRAND.logoUrl}
        alt="SDES College Logo"
        className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />

      {/* Exact Structure */}
      <div className="flex flex-col text-left justify-center">
        {/* Main College Name - Exact Red, Copperplate Gothic Bold */}
        <span 
          className="text-[#E52329] uppercase tracking-wider text-[11px] sm:text-[14px] md:text-[18px] lg:text-[22px] leading-[1.1] pb-0.5"
          style={{ fontFamily: '"Copperplate Gothic Bold", "Copperplate", serif', fontWeight: 'bold' }}
        >
          SREE DATTHA INSTITUTE
        </span>
        <span 
          className="text-[#E52329] uppercase tracking-wider text-[11px] sm:text-[14px] md:text-[18px] lg:text-[22px] leading-[1.1] pb-1"
          style={{ fontFamily: '"Copperplate Gothic Bold", "Copperplate", serif', fontWeight: 'bold' }}
        >
          OF ENGINEERING & SCIENCE
        </span>
        
        {/* Top Divider */}
        <div className="w-full h-[1px] bg-white/60 mb-1" />
        
        {/* Supporting text - White (Reduced size as requested) */}
        <span className="text-white/90 text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] uppercase font-medium tracking-tight leading-none pb-1 text-center sm:text-left">
          ( Approved by AICTE, New Delhi, Accredited by NAAC, Affiliated to JNTUH, College Code: SDES )
        </span>
        
        {/* Bottom Divider */}
        <div className="w-full h-[1px] bg-white/60 mb-1" />
        
        {/* Autonomous Institution */}
        <span className="text-white text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-bold tracking-widest leading-none text-center sm:text-left">
          An Autonomous Institution
        </span>
      </div>
    </div>
  );

  if (disableLink || layout === "vertical") {
    return content;
  }

  return (
    <Link to="/" className="inline-block">
      {content}
    </Link>
  );
};
