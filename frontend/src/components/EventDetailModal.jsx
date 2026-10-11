import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, MapPin, CheckCircle2, ExternalLink, FileText, 
  Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react';

export const EventDetailModal = ({ event, onClose, onOpenLightbox }) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  if (!event) return null;

  const isCompleted = event.status === 'COMPLETED';
  const eventDateObj = new Date(event.date);
  const formattedDate = !isNaN(eventDateObj) 
    ? eventDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : event.date;

  const photos = Array.isArray(event.photos) && event.photos.length > 0
    ? event.photos
    : (event.posterUrl ? [event.posterUrl] : []);

  const hasMultiplePhotos = photos.length > 1;

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIdx(prev => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIdx(prev => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const openInLightbox = (idx = currentPhotoIdx) => {
    if (!onOpenLightbox) return;
    onOpenLightbox({
      items: photos.map((p, i) => ({
        imageUrl: p,
        title: `${event.title} - Photo ${i + 1}`,
        albumName: event.title,
        category: event.category,
        clubSlug: event.clubSlug,
        date: event.date,
        caption: `Event capture from ${event.title}`
      })),
      currentIndex: idx
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

            {/* Conducted / Recap Photos - Interactive Carousel & Navigation */}
            {photos.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white flex items-center gap-2">
                    <ImageIcon size={14} className="text-praxis-cyan" />
                    <span>Conducted Event Recap Photos ({photos.length})</span>
                  </h4>
                  {hasMultiplePhotos && (
                    <span className="text-[10px] uppercase tracking-widest text-praxis-cyan font-mono font-bold bg-praxis-cyan/10 px-2.5 py-0.5 rounded-full border border-praxis-cyan/30">
                      Photo {currentPhotoIdx + 1} of {photos.length}
                    </span>
                  )}
                </div>

                {/* Main Carousel Stage */}
                <div className="relative group aspect-video sm:aspect-[16/9] max-h-[360px] rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-xl flex items-center justify-center">
                  <motion.img
                    key={photos[currentPhotoIdx]}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={photos[currentPhotoIdx]}
                    alt={`${event.title} capture ${currentPhotoIdx + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openInLightbox(currentPhotoIdx)}
                  />

                  {/* Left / Right Nav Buttons */}
                  {hasMultiplePhotos && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevPhoto}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full liquid-glass-elevated border border-white/30 text-white hover:text-black hover:bg-praxis-cyan flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 z-10"
                        title="Previous Image (Scroll Left)"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextPhoto}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full liquid-glass-elevated border border-white/30 text-white hover:text-black hover:bg-praxis-cyan flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 z-10"
                        title="Next Image (Scroll Right)"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Expand to Fullscreen Lightbox Button */}
                  <button
                    type="button"
                    onClick={() => openInLightbox(currentPhotoIdx)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full liquid-glass border border-white/20 text-white hover:bg-praxis-cyan hover:text-black flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 z-10"
                    title="Open Fullscreen Lightbox"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* Horizontal Thumbnail Strip */}
                {hasMultiplePhotos && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5">
                    {photos.map((photoUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentPhotoIdx(idx)}
                        className={`relative w-20 sm:w-24 aspect-video rounded-xl overflow-hidden shrink-0 border transition-all ${
                          idx === currentPhotoIdx
                            ? 'border-praxis-cyan ring-2 ring-praxis-cyan/50 scale-105'
                            : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={photoUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
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
