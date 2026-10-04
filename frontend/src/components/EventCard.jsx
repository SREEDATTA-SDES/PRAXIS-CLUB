import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export const EventCard = ({ event }) => {
  const isUpcoming = event.status === 'UPCOMING';

  const handleRegister = () => {
    if (event.googleFormUrl) {
      window.open(event.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Registration details will be published shortly.');
    }
  };

  const handleSchedule = () => {
    if (event.scheduleUrl) {
      window.open(event.scheduleUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Event schedule will be posted soon.');
    }
  };

  const eventDateObj = new Date(event.date);
  const day = eventDateObj.getDate();
  const month = eventDateObj.toLocaleString('default', { month: 'short' });
  const year = eventDateObj.getFullYear();

  return (
    <motion.div 
      whileHover="hover"
      initial="initial"
      className="relative w-full h-[450px] liquid-glass-card rounded-[2.5rem] overflow-hidden group border border-white/10 flex flex-col justify-between"
    >
      {/* Animated Gradient Aura */}
      <motion.div 
        className="absolute -inset-20 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, rgba(6,182,212,0.3), transparent 60%)`
        }}
        variants={{
          hover: { scale: 1.2, rotate: 90 },
          initial: { scale: 1, rotate: 0 }
        }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />

      {/* Background Event Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={event.posterUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover filter grayscale mix-blend-luminosity opacity-20"
          variants={{
            hover: { scale: 1.1, grayscale: "0%", opacity: 0.6, mixBlendMode: "normal" },
            initial: { scale: 1, grayscale: "100%", opacity: 0.2, mixBlendMode: "luminosity" }
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Layers */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        
        {/* Header row: Large Date Typography */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col border-l-2 border-praxis-cyan pl-4">
            <span className="text-4xl font-display font-black text-white leading-none tracking-tighter">{day}</span>
            <span className="text-[10px] font-bold text-praxis-cyan uppercase tracking-widest mt-1">{month} {year}</span>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className={`text-[8px] uppercase font-bold tracking-[0.3em] px-3 py-1.5 rounded-full liquid-glass border ${
              isUpcoming ? 'border-praxis-cyan text-praxis-cyan' : 'border-white/20 text-white/40'
            }`}>
              {event.status}
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-white/50">
              {event.clubSlug}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-[10px] text-praxis-accent tracking-[0.3em] uppercase font-bold mb-3 block">
              {event.category}
            </span>
            <motion.h3 
              className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-widest font-display uppercase leading-tight"
              variants={{ hover: { x: 5, color: '#fff' }, initial: { x: 0 } }}
            >
              {event.title}
            </motion.h3>
          </div>

          <motion.p 
            className="text-xs text-white/60 leading-relaxed line-clamp-2 mb-6 font-cinematic"
            variants={{ hover: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 10 } }}
            transition={{ delay: 0.1 }}
          >
            {event.description}
          </motion.p>

          <div className="flex items-center gap-3 text-[10px] text-white/40 font-cinematic tracking-[0.2em] uppercase mb-6">
             <MapPin size={12} className="text-praxis-cyan" />
             <span className="truncate">{event.venue}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full border-t border-white/10 pt-6">
            {isUpcoming ? (
              <button
                onClick={handleRegister}
                className="flex-1 py-4 px-4 bg-praxis-cyan/10 hover:bg-praxis-cyan/20 border border-praxis-cyan/50 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors duration-300"
              >
                <span>REGISTER</span>
                <ExternalLink size={12} />
              </button>
            ) : (
              <span className="flex-1 py-4 px-4 liquid-glass border border-white/10 rounded-full text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] text-center flex items-center justify-center gap-3">
                <CheckCircle2 size={12} />
                <span>CONCLUDED</span>
              </span>
            )}

            {event.scheduleUrl && (
              <button
                onClick={handleSchedule}
                className="w-12 h-12 liquid-glass border border-white/10 hover:border-white/30 rounded-full text-white/50 hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0"
                title="Download Timetable / Schedule PDF"
              >
                <FileText size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
