import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SpatialHero = () => {
  return (
    <section className="relative w-full bg-transparent overflow-hidden pt-24 pb-12 flex flex-col items-center justify-center">
      {/* Layer 1: Deep Atmosphere & Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-praxis-glow/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-praxis-navy/40 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Layer 2: Massive PRAXIS Typography Artwork (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex justify-center mb-10"
        >
          <img 
            src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png"
            alt="PRAXIS Master Typography"
            className="w-full max-w-5xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] translate-x-6 md:translate-x-16"
            fetchPriority="high"
          />
        </motion.div>

        {/* Layer 3: Clean, aligned secondary elements grouped below */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          
          {/* Left Side: Statements */}
          <div className="flex flex-col gap-8">
            <div className="text-praxis-text font-cinematic text-sm md:text-base tracking-[0.3em] uppercase leading-loose opacity-80 mix-blend-overlay border-l border-white/20 pl-6">
              <p>Ideas <span className="inline-block w-2"></span> That Build</p>
              <p>People <span className="inline-block w-2"></span> That Create</p>
              <p>Community <span className="inline-block w-2"></span> That Grow</p>
            </div>
          </div>

          {/* Right Side: CTA and Dept */}
          <div className="flex flex-col md:items-end gap-6 text-left md:text-right">
            <div className="flex items-center md:justify-end gap-4 w-full">
              <div className="h-[1px] flex-grow md:max-w-[100px] bg-gradient-to-r md:bg-gradient-to-l from-praxis-text/50 to-transparent" />
              <span className="text-praxis-text font-display text-xl md:text-2xl tracking-[0.2em] whitespace-nowrap">SDES CSE-ALLIED</span>
            </div>
            
            <Link 
              to="/clubs"
              className="group relative px-8 py-4 bg-transparent border border-praxis-border hover:border-praxis-glow overflow-hidden transition-all duration-500 rounded-sm inline-flex items-center justify-center w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-praxis-glow/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative text-praxis-text text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                Explore Clubs <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
              </span>
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
