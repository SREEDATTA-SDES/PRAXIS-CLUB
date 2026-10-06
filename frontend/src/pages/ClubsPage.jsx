import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ClubCard } from '../components/ClubCard';
import { useData } from '../context/DataContext';

export const ClubsPage = () => {
  const { clubs } = useData();
  const [filter, setFilter] = useState('ALL');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const filteredClubs = filter === 'ALL'
    ? clubs
    : clubs.filter(c => c.category === filter);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-16 overflow-hidden">

      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen opacity-20 bg-praxis-cyan/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-accent/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-12">



        {/* Filter Tabs - Liquid UI (Matching EventsPage exact size and styling) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 flex justify-center"
        >
          <div className="flex items-center p-1 liquid-glass rounded-full border border-white/10">
            {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                  filter === tab
                    ? 'bg-white text-praxis-bg shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Clubs Grid */}
        <section className="relative z-20">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClubs.map((club, i) => (
                <motion.div
                  key={club.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
                >
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};
