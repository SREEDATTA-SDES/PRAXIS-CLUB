import React, { useState, useEffect } from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { CollegeBrand } from './CollegeBrand';

export const IntroSequence = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // High-quality loading bar progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (Math.random() * 5 + 1);
      });
    }, 150);

    // Sequence Timing
    // 1. Initial State: Deep Blue
    // 2. Show College Logo & Name (0.5s)
    const t1 = setTimeout(() => setStep(2), 500);  
    // 3. Hide College details, prepare for PRAXIS (2.5s)
    const t2 = setTimeout(() => setStep(3), 2500); 
    // 4. Reveal PRAXIS logo & text (3.0s)
    const t3 = setTimeout(() => setStep(4), 3000); 
    
    // 5. Loading completes, fade out sequence (5.0s)
    const t4 = setTimeout(() => {
      setProgress(100);
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 800); 
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-praxis-bg transition-opacity duration-1000 ease-in-out select-none overflow-hidden perspective-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/mb7zqdf5/image/upload/v1791138156/Midnight_Blue_Textured_Stone_Surface.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-praxis-glow/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[380px] md:min-h-[420px] w-full px-4">
        
        {/* Step 2: College Identity */}
        <div 
          className={`absolute flex items-center justify-center transition-all duration-700 transform ${
            step === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'
          }`}
        >
          <div className="scale-100 sm:scale-105 md:scale-115 origin-center drop-shadow-2xl">
            <CollegeBrand layout="vertical" />
          </div>
        </div>

        {/* Step 4: PRAXIS Reveal */}
        <div 
          className={`absolute flex flex-col items-center justify-center transition-all duration-1000 transform ${
            step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-105 pointer-events-none'
          }`}
        >
          <img
            src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png"
            alt="PRAXIS"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl translate-x-4 md:translate-x-8"
          />
        </div>
      </div>

      {/* High Quality Loading Bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 md:w-96 flex flex-col items-center gap-3">
        <div className="w-full h-1.5 bg-praxis-surface border border-praxis-border rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div 
            className="h-full bg-gradient-to-r from-praxis-cyan to-praxis-glow transition-all duration-200 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/40 blur-[4px] animate-[pulse_1s_infinite]" />
          </div>
        </div>
        <div className="flex justify-between w-full px-1">
          <span className="text-[9px] uppercase tracking-[0.3em] text-praxis-muted font-cinematic font-bold">
            {step < 4 ? 'Authenticating...' : 'Initializing Ecosystem...'}
          </span>
          <span className="text-[9px] text-praxis-cyan font-bold tracking-widest">
            {Math.floor(Math.min(progress, 100))}%
          </span>
        </div>
      </div>
    </div>
  );
};
