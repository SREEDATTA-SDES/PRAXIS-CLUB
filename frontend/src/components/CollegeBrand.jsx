import React from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { Link } from 'react-router-dom';

export const CollegeBrand = () => {
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
      {/* College Logo */}
      <img
        src={COLLEGE_BRAND.logoUrl}
        alt="SDES College Logo"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />

      {/* College Text Hierarchy */}
      <div className="flex flex-col text-left justify-center pt-1">
        {/* Main College Name - Exact Red Matching the Reference Image */}
        <span className="text-[#E52329] font-sans uppercase tracking-widest text-[11px] sm:text-[13px] md:text-[15px] font-black leading-tight">
          SREE DATTHA INSTITUTE
        </span>
        <span className="text-[#E52329] font-sans uppercase tracking-widest text-[11px] sm:text-[13px] md:text-[15px] font-black leading-none pb-0.5">
          OF ENGINEERING & SCIENCE
        </span>
        
        {/* Supporting text - collapsable on mobile */}
        <span className="hidden lg:block text-praxis-secondary text-[6px] md:text-[7px] uppercase tracking-wider font-semibold leading-tight pt-0.5">
          (Approved by AICTE, New Delhi, Accredited by NAAC, Affiliated to JNTUH, College Code: SDES)
        </span>
        
        {/* Bottom divider line & Autonomous Institution */}
        <div className="w-full h-[1px] bg-praxis-border-light my-1" />
        <span className="text-white text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-semibold leading-tight">
          An Autonomous Institution
        </span>
      </div>
    </Link>
  );
};
