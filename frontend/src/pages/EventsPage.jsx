import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { EventCard } from '../components/EventCard';
import { EventDetailModal } from '../components/EventDetailModal';
import { EventCalendarModal } from '../components/EventCalendarModal';
import { useData } from '../context/DataContext';
import { Search, Calendar, Download } from 'lucide-react';

export const EventsPage = ({ onOpenLightbox }) => {
  const { events, settings } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  
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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Filter & Search Bar - Liquid UI */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 max-w-5xl mx-auto space-y-4"
        >
          {/* Semester Event Calendar Action Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl liquid-glass border border-praxis-cyan/30 shadow-lg">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-praxis-cyan/20 border border-praxis-cyan/40 text-praxis-cyan flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  <span>Official Semester Event Calendar (2026)</span>
                  {settings?.eventCalendarPdfUrl && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                      PDF VERIFIED
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-praxis-secondary">
                  {settings?.eventCalendarPdfUrl 
                    ? 'Official PDF calendar uploaded by administration. Download or sync with Google/Apple Calendar.'
                    : 'Download the complete semester schedule for Google Calendar, Apple Calendar, or export as PDF.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
              {settings?.eventCalendarPdfUrl ? (
                <>
                  <a
                    href={settings.eventCalendarPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full bg-gradient-to-r from-praxis-cyan to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-praxis-bg font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all shrink-0 hover:scale-105"
                  >
                    <Download size={14} />
                    <span>Download Official PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(true)}
                    className="px-3.5 py-2.5 rounded-full liquid-glass border border-white/20 hover:border-praxis-cyan/50 text-white/90 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all hover:bg-white/5"
                    title="Export to iCal / Google Calendar / CSV"
                  >
                    <Calendar size={13} />
                    <span>Sync / More</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCalendarModal(true)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-praxis-cyan to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-praxis-bg font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all shrink-0 hover:scale-105"
                >
                  <Calendar size={14} />
                  <Download size={13} />
                  <span>Download Event Calendar</span>
                </button>
              )}
            </div>
          </div>

          <div className="liquid-glass-elevated p-4 sm:p-6 md:p-8 rounded-3xl sm:rounded-[2.5rem] flex flex-col lg:flex-row items-center gap-4 sm:gap-6 border-white/20">
            
            {/* Search Box */}
            <div className="relative w-full lg:w-2/5">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, venues, or clubs..."
                className="w-full pl-12 pr-6 py-3.5 rounded-full liquid-glass border border-white/10 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-3/5 justify-end">
              {/* Category Tabs */}
              <div className="flex items-center justify-between sm:justify-center p-1 liquid-glass rounded-full border border-white/10 w-full sm:w-auto overflow-hidden">
                {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all whitespace-nowrap text-center ${
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
              <div className="flex items-center justify-between sm:justify-center p-1 liquid-glass rounded-full border border-white/10 w-full sm:w-auto overflow-hidden">
                {['ALL', 'UPCOMING', 'COMPLETED'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all whitespace-nowrap text-center ${
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
                    <EventCard 
                      event={event} 
                      onSelectEvent={(evt) => setSelectedEvent(evt)}
                    />
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

      {/* Event Detail / Recap Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenLightbox={onOpenLightbox}
        />
      )}

      {/* Semester Event Calendar Download Modal */}
      {showCalendarModal && (
        <EventCalendarModal
          events={events}
          eventCalendarPdfUrl={settings?.eventCalendarPdfUrl}
          onClose={() => setShowCalendarModal(false)}
        />
      )}
    </div>
  );
};
