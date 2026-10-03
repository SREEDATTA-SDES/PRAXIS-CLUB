import React, { useState, useEffect } from 'react';
import { COLLEGE_BRAND } from '../data/initialData';

export const IntroSequence = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Timeline sequence lasting ~4.5 seconds
    const t1 = setTimeout(() => setStep(2), 500);  // Step 2: College logo reveals
    const t2 = setTimeout(() => setStep(3), 1100); // Step 3: College name appears
    const t3 = setTimeout(() => setStep(4), 1800); // Step 4: College branding lingers
    const t4 = setTimeout(() => setStep(5), 2300); // Step 5: Transition to PRAXIS
    const t5 = setTimeout(() => setStep(6), 2800); // Step 6: PRAXIS logo appears with glow
    const t6 = setTimeout(() => setStep(7), 3300); // Step 7: Refined rotating/coin flip
    const t7 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700); // Step 8: Reveal homepage
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07090D] transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Cinematic moody background illumination */}
      <div className="absolute inset-0 bg-radial-glow opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-transparent to-[#07090D]" />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-50 text-xs cinematic-label text-praxis-secondary/70 hover:text-white border border-praxis-border/60 hover:border-praxis-cyan/60 px-4 py-2 rounded-full backdrop-blur-md bg-praxis-card/40 transition-all duration-300"
      >
        SKIP INTRO &rarr;
      </button>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto">
        
        {/* PHASE 1: College Identity (Steps 1 to 4) */}
        {step < 5 && (
          <div className="flex flex-col items-center justify-center transition-all duration-700">
            {/* Step 2: College Logo */}
            <div 
              className={`transition-all duration-800 transform ${
                step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <img
                src={COLLEGE_BRAND.logoUrl}
                alt="Sree Dattha Institute of Engineering & Science"
                className="h-24 md:h-28 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(40,118,184,0.4)]"
              />
            </div>

            {/* Step 3 & 4: College Name */}
            <div 
              className={`mt-6 transition-all duration-800 delay-100 transform ${
                step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-praxis-cyan font-medium block mb-2">
                ESTABLISHED INSTITUTION OF EXCELLENCE
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-wider text-praxis-text uppercase font-display max-w-lg leading-snug">
                {COLLEGE_BRAND.name}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-praxis-secondary tracking-widest uppercase">
                Department of Computer Science & Engineering (Allied Branches)
              </p>
            </div>
          </div>
        )}

        {/* PHASE 2: PRAXIS Transition (Steps 5 to 7) */}
        {step >= 5 && (
          <div className="flex flex-col items-center justify-center transition-all duration-700 animate-fade-in">
            {/* Step 6 & 7: PRAXIS Logo with controlled glow and coin-like flip */}
            <div className="perspective-1000 my-4">
              <div 
                className={`relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl glass-panel-elevated p-4 shadow-cinematic-blue transition-all duration-1000 ${
                  step >= 7 ? 'animate-coin' : 'scale-100'
                }`}
              >
                <img
                  src={COLLEGE_BRAND.praxisLogoUrl}
                  alt="PRAXIS Ecosystem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,157,36,0.35)]"
                />
              </div>
            </div>

            {/* Typography Reveal */}
            <div className="mt-4">
              <span className="text-xs uppercase tracking-[0.35em] text-praxis-accent font-semibold block mb-1">
                STUDENT CLUB PLATFORM
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-widest text-white display-title">
                PRAXIS
              </h1>
              <p className="mt-3 text-xs md:text-sm text-praxis-secondary tracking-wider max-w-md italic">
                "{COLLEGE_BRAND.praxisStatement}"
              </p>
            </div>

            {/* Subtle progress indicator */}
            <div className="mt-8 w-36 h-[2px] bg-praxis-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-praxis-cyan to-praxis-accent animate-pulse" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
