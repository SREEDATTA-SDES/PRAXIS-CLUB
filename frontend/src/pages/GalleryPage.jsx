import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Maximize2, Filter } from 'lucide-react';

export const GalleryPage = ({ onOpenLightbox }) => {
  const { gallery, clubs } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [clubFilter, setClubFilter] = useState('ALL');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const filteredGallery = gallery.filter(item => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (clubFilter !== 'ALL' && item.clubSlug !== clubFilter) return false;
    return true;
  });

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-24 pb-16 overflow-hidden">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-cyan/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-accent/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-12">
        


        {/* Filter Controls - Liquid UI */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20"
        >
          <div className="liquid-glass-elevated p-8 rounded-[2.5rem] flex flex-col items-center gap-8 border-white/20 max-w-4xl mx-auto">
            
            {/* Category Tabs */}
            <div className="flex items-center p-1 liquid-glass rounded-full border border-white/10 overflow-hidden">
              {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`relative px-8 py-4 rounded-full text-[10px] uppercase font-bold tracking-[0.3em] transition-colors duration-500 z-10 ${
                    categoryFilter === cat
                      ? 'text-praxis-bg'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {categoryFilter === cat && (
                    <motion.div
                      layoutId="cat-tab"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] z-[-1]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>

            {/* Club Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setClubFilter('ALL')}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all ${
                  clubFilter === 'ALL'
                    ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'liquid-glass border-white/10 text-white/40 hover:text-white'
                }`}
              >
                All Clubs
              </button>
              {clubs.map(c => (
                <button
                  key={c.slug}
                  onClick={() => setClubFilter(c.slug)}
                  className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all ${
                    clubFilter === c.slug
                      ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'liquid-glass border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

          </div>
        </motion.section>

        {/* Gallery Grid - Liquid Tiles */}
        <section className="relative z-20">
          <AnimatePresence mode="popLayout">
            {filteredGallery.length > 0 ? (
              <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {filteredGallery.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: (i % 3) * 0.05 }}
                    onClick={() => onOpenLightbox && onOpenLightbox(item)}
                    className="relative overflow-hidden rounded-[2rem] cursor-pointer liquid-glass-card group break-inside-avoid"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                      <div className="flex items-center justify-between mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-praxis-cyan px-3 py-1 rounded-full liquid-glass border-white/20">
                          {item.albumName || item.category}
                        </span>
                        <span className="text-[10px] text-white/50 uppercase tracking-widest">
                          {item.clubSlug}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white font-display uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p className="text-xs text-white/70 font-cinematic mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 line-clamp-2">
                          {item.caption}
                        </p>
                      )}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full liquid-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Maximize2 size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="py-24 text-center rounded-[3rem] liquid-glass-elevated border-white/10"
              >
                <p className="text-2xl text-white font-cinematic uppercase tracking-widest">No visual archives found.</p>
                <p className="text-sm text-white/40 mt-4 tracking-widest uppercase">Try adjusting your filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};
