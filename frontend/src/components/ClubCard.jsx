import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ClubCard = ({ club }) => {
  const isTech = club.category === 'TECHNICAL';

  return (
    <Link to={`/clubs/${club.slug}`} className="block w-full h-[400px]">
      <motion.div
        whileHover="hover"
        initial="initial"
        className="relative w-full h-full liquid-glass-card rounded-[2.5rem] overflow-hidden group cursor-pointer"
      >
        {/* Animated Gradient Aura */}
        <motion.div 
          className="absolute -inset-20 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${club.accentPrimary}40, transparent 60%)`
          }}
          variants={{
            hover: { scale: 1.2, rotate: 90 },
            initial: { scale: 1, rotate: 0 }
          }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />

        {/* Floating Logo */}
        <div className="absolute top-1/4 left-0 right-0 flex justify-center items-center h-28 pointer-events-none z-20">
          <motion.img
            src={club.logoUrl}
            alt={`${club.name} Logo`}
            className="h-full w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            variants={{
              hover: { y: -15, scale: 1.1, filter: `drop-shadow(0 20px 30px ${club.accentPrimary}40)` },
              initial: { y: 0, scale: 1, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>

        {/* Typography & Details Layer */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
             <span className={`text-[9px] uppercase font-bold tracking-[0.3em] font-cinematic ${isTech ? 'text-praxis-cyan' : 'text-praxis-accent'}`}>
               {club.category}
             </span>
             <span className="text-[9px] text-white/30 tracking-widest uppercase">0{club.order}</span>
          </div>
          
          <div className="mt-auto relative">
             <div className="overflow-hidden mb-2">
                <motion.h3 
                  className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-widest font-display uppercase"
                  variants={{ hover: { x: 10, color: '#fff' }, initial: { x: 0 } }}
                >
                  {club.name}
                </motion.h3>
             </div>
             
             <motion.p 
               className="text-xs text-white/50 font-cinematic line-clamp-2"
               variants={{
                 hover: { opacity: 1, y: 0 },
                 initial: { opacity: 0, y: 20 }
               }}
               transition={{ delay: 0.1 }}
             >
                {club.tagline}
             </motion.p>
             
             {/* Read More Indicator */}
             <motion.div 
               className="absolute right-0 bottom-0 flex items-center justify-center w-10 h-10 border border-white/10 rounded-full"
               variants={{
                 hover: { opacity: 1, rotate: 0, backgroundColor: 'rgba(255,255,255,0.1)' },
                 initial: { opacity: 0, rotate: -45, backgroundColor: 'transparent' }
               }}
             >
                <ArrowRight size={14} className="text-white" />
             </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
