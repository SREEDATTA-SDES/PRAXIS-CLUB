import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        return prev + (Math.random() * 6 + 2);
      });
    }, 120);

    // Sequence Timing
    // 1. Initial State: Deep Blue (0 - 400ms)
    // 2. Show College Logo & Name (400ms - 2600ms)
    const t1 = setTimeout(() => setStep(2), 400);  
    // 3. Clear College details, prepare for PRAXIS (2600ms - 3000ms)
    const t2 = setTimeout(() => setStep(3), 2600); 
    // 4. Reveal PRAXIS logo & text (3000ms - 5000ms)
    const t3 = setTimeout(() => setStep(4), 3000); 
    
    // 5. Loading completes, fade out sequence (5000ms)
    const t4 = setTimeout(() => {
      setProgress(100);
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700); 
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1, scale: isFadingOut ? 1.03 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-praxis-bg select-none overflow-hidden ${
        isFadingOut ? 'pointer-events-none' : ''
      }`}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/mb7zqdf5/image/upload/v1791138156/Midnight_Blue_Textured_Stone_Surface.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-praxis-glow/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 text-[10px] sm:text-xs uppercase font-cinematic tracking-[0.25em] text-praxis-secondary/70 hover:text-white border border-praxis-border/60 hover:border-praxis-cyan/60 px-4 py-2 rounded-full backdrop-blur-md bg-praxis-card/40 transition-all duration-300"
      >
        SKIP INTRO &rarr;
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[380px] md:min-h-[440px] w-full px-4">
        <AnimatePresence mode="wait">
          {/* Step 2: College Identity Animation */}
          {step === 2 && (
            <motion.div 
              key="college-identity"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="scale-100 sm:scale-105 md:scale-115 lg:scale-120 origin-center drop-shadow-2xl">
                <CollegeBrand layout="vertical" />
              </div>
            </motion.div>
          )}

          {/* Step 4: PRAXIS Reveal Animation - Clean, no background shine */}
          {step >= 4 && (
            <motion.div 
              key="praxis-reveal"
              initial={{ opacity: 0, scale: 0.85, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative">
                <img
                  src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png"
                  alt="PRAXIS"
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 translate-x-4 sm:translate-x-6 md:translate-x-8"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* High Quality Loading Bar */}
      <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 flex flex-col items-center gap-3">
        <div className="w-full h-1.5 bg-praxis-surface border border-praxis-border rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div 
            className="h-full bg-gradient-to-r from-praxis-cyan via-praxis-glow to-praxis-accent transition-all duration-150 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/50 blur-[4px] animate-[pulse_1s_infinite]" />
          </motion.div>
        </div>
        <div className="flex justify-between w-full px-1">
          <span className="text-[9px] uppercase tracking-[0.3em] text-praxis-muted font-cinematic font-bold">
            {step < 4 ? 'Authenticating SDES...' : 'Initializing PRAXIS Ecosystem...'}
          </span>
          <span className="text-[9px] text-praxis-cyan font-bold tracking-widest font-mono">
            {Math.floor(Math.min(progress, 100))}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
