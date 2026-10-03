import React from 'react';
import { Calendar, MapPin, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

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

  return (
    <div className="group relative rounded-xl bg-praxis-card border border-praxis-border hover:border-praxis-glow/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-cinematic-blue hover:-translate-y-1">
      
      {/* Event Poster Header */}
      <div className="relative h-48 w-full overflow-hidden bg-black/40">
        <img
          src={event.posterUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-praxis-card via-transparent to-black/50" />

        {/* Status & Category Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded backdrop-blur-md ${
            isUpcoming ? 'bg-emerald-500/80 text-white' : 'bg-gray-800/80 text-praxis-secondary'
          }`}>
            {event.status}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-praxis-cyan border border-praxis-cyan/30">
            {event.category}
          </span>
        </div>

        {/* Organizing Club Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-praxis-surface/90 text-praxis-text border border-praxis-border">
            Club: {event.clubSlug}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide font-display uppercase group-hover:text-praxis-cyan transition-colors leading-snug">
            {event.title}
          </h3>

          <div className="mt-3 space-y-1.5 text-xs text-praxis-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-praxis-accent shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-praxis-cyan shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-praxis-muted leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Action Buttons: Register (Google Form) & Schedule PDF */}
        <div className="mt-6 pt-4 border-t border-praxis-border/60 flex items-center gap-2">
          {isUpcoming ? (
            <button
              onClick={handleRegister}
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>REGISTER</span>
              <ExternalLink size={12} />
            </button>
          ) : (
            <span className="flex-1 py-2 px-3 rounded-lg bg-praxis-elevated text-praxis-muted text-xs font-medium uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>CONCLUDED</span>
            </span>
          )}

          {event.scheduleUrl && (
            <button
              onClick={handleSchedule}
              className="py-2 px-3 rounded-lg border border-praxis-border hover:border-praxis-cyan/50 text-praxis-secondary hover:text-white text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
              title="Download Timetable / Schedule PDF"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">SCHEDULE</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
