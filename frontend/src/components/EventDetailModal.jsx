import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, CheckCircle2, ExternalLink, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';

export const EventDetailModal = ({ event, onClose, onOpenLightbox }) => {
  const [activePhoto, setActivePhoto] = useState(null);

  if (!event) return null;

  const isCompleted = event.status === 'COMPLETED';
  const eventDateObj = new Date(event.date);
  const formattedDate = !isNaN(eventDateObj) 
    ? eventDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : event.date;

  const photos = Array.isArray(event.photos) && event.photos.length > 0
    ? event.photos
    : (event.posterUrl ? [event.posterUrl] : []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl liquid-glass-elevated rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar with Hero Banner */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden shrink-0 bg-black">
            <img
              src={event.posterUrl || photos[0] || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'}
              alt={event.title}
              className="w-full h-full object-cover opacity-60 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full liquid-glass border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-20"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-[0.25em] px-3.5 py-1.5 rounded-full liquid-glass border ${
                  isCompleted 
                    ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/40' 
                    : 'border-praxis-cyan text-praxis-cyan bg-praxis-cyan/10'
                }`}>
                  {isCompleted ? 'CONCLUDED EVENT' : 'UPCOMING EVENT'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 text-white/80">
                  {event.category}
                </span>
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-praxis-cyan">
                {event.clubSlug}
              </span>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 font-cinematic text-praxis-secondary">
            
            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wider leading-tight">
                {event.title}
              </h2>
            </div>

            {/* Metadata Card: Date & Venue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl liquid-glass border border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-praxis-cyan/10 text-praxis-cyan flex items-center justify-center shrink-0 border border-praxis-cyan/30">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/40 block font-bold">
                    {isCompleted ? 'Conducted On' : 'Event Date'}
                  </span>
                  <span className="text-white font-semibold">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-praxis-accent/10 text-praxis-accent flex items-center justify-center shrink-0 border border-praxis-accent/30">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/40 block font-bold">Venue / Campus Location</span>
                  <span className="text-white font-semibold truncate">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-praxis-cyan">
                Event Overview & Highlights
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-sans sm:font-cinematic">
                {event.description}
              </p>
            </div>

            {/* Conducted / Recap Photos */}
            {photos.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white flex items-center gap-2">
                    <ImageIcon size={13} className="text-praxis-cyan" />
                    <span>Conducted Event Recap Photos ({photos.length})</span>
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Click to expand</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((photoUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenLightbox ? onOpenLightbox({ imageUrl: photoUrl, title: `${event.title} - Photo ${idx + 1}` }) : setActivePhoto(photoUrl)}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-black/40 hover:border-praxis-cyan transition-all"
                    >
                      <img
                        src={photoUrl}
                        alt={`${event.title} capture ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Sparkles size={16} className="text-praxis-cyan" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              {event.scheduleUrl && (
                <a
                  href={event.scheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full liquid-glass border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 hover:border-praxis-cyan transition-all"
                >
                  <FileText size={14} />
                  <span>Download Schedule / Agenda</span>
                </a>
              )}

              {!isCompleted && event.googleFormUrl && (
                <a
                  href={event.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-praxis-cyan hover:bg-cyan-400 text-praxis-bg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all ml-auto"
                >
                  <span>Register on Google Forms</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {isCompleted && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider ml-auto">
                  <CheckCircle2 size={16} />
                  <span>Operation Successfully Completed</span>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
