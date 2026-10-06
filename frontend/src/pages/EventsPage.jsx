import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { EventCard } from '../components/EventCard';
import { useData } from '../context/DataContext';
import { Search } from 'lucide-react';

export const EventsPage = () => {
  const { events } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const filteredEvents = events.filter(e => {
    if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
    if (statusFilter !== 'ALL' && e.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchVenue = e.venue.toLowerCase().includes(q);
      const matchClub = e.clubSlug?.toLowerCase().includes(q);
      if (!matchTitle && !matchVenue && !matchClub) return false;
    }
    return true;
  });

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-16 overflow-hidden">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div 
          className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen opacity-20 bg-praxis-accent/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-cyan/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-12">
        


        {/* Filter & Search Bar - Liquid UI */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 max-w-4xl mx-auto"
        >
          <div className="liquid-glass-elevated p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 border-white/20">
            
            {/* Search Box */}
            <div className="relative w-full md:w-1/2">
              <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event, venue, or club..."
                className="w-full pl-14 pr-6 py-4 rounded-full liquid-glass border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors bg-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Category Tabs */}
              <div className="flex items-center p-1 liquid-glass rounded-full border border-white/10">
                {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                      categoryFilter === cat
                        ? 'bg-white text-praxis-bg shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status Tabs */}
              <div className="flex items-center p-1 liquid-glass rounded-full border border-white/10">
                {['ALL', 'UPCOMING', 'COMPLETED'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-5 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                      statusFilter === st
                        ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Events Grid */}
        <section className="relative z-20">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id || event.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
                    whileHover={{ y: -10 }}
                  >
                    <EventCard event={event} />
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
                <p className="text-2xl text-white font-cinematic uppercase tracking-widest">No matching operations found.</p>
                <p className="text-sm text-white/40 mt-4 tracking-widest uppercase">Try adjusting your filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};
