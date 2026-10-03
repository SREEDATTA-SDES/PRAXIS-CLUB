import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, Compass, Calendar, Image as ImageIcon, Mail, ExternalLink, Award } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EventCard } from '../components/EventCard';
import { LeadershipSection } from '../components/LeadershipSection';

export const ClubDetailPage = ({ onOpenLightbox }) => {
  const { clubSlug } = useParams();
  const { clubs, events, gallery, settings } = useData();

  const club = clubs.find(c => c.slug === clubSlug);

  if (!club) {
    return (
      <div className="pt-36 pb-20 text-center space-y-4">
        <h2 className="text-3xl font-bold uppercase text-white font-display">Club Not Found</h2>
        <p className="text-sm text-praxis-secondary">The requested club chapter does not exist in PRAXIS.</p>
        <Link to="/clubs" className="inline-block mt-4 text-xs uppercase tracking-widest text-praxis-cyan underline">
          &larr; Back to all clubs
        </Link>
      </div>
    );
  }

  // Club-specific visual accents
  const clubThemes = {
    genesis: {
      accentColor: '#8B5CF6',
      accentSecondary: '#06B6D4',
      glowStyle: 'rgba(139, 92, 246, 0.2)',
      borderClass: 'border-purple-500/40',
      textAccent: 'text-purple-400',
      badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-800/60'
    },
    'tech-vertex': {
      accentColor: '#00F2FE',
      accentSecondary: '#4FACFE',
      glowStyle: 'rgba(0, 242, 254, 0.2)',
      borderClass: 'border-cyan-400/40',
      textAccent: 'text-cyan-400',
      badgeClass: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
    },
    innovex: {
      accentColor: '#EF4444',
      accentSecondary: '#F87171',
      glowStyle: 'rgba(239, 68, 68, 0.2)',
      borderClass: 'border-red-500/40',
      textAccent: 'text-red-400',
      badgeClass: 'bg-red-950/60 text-red-300 border-red-800/60'
    },
    'd-talks': {
      accentColor: '#EC4899',
      accentSecondary: '#06B6D4',
      glowStyle: 'rgba(236, 72, 153, 0.2)',
      borderClass: 'border-pink-500/40',
      textAccent: 'text-pink-400',
      badgeClass: 'bg-pink-950/60 text-pink-300 border-pink-800/60'
    },
    'visual-vibes': {
      accentColor: '#A855F7',
      accentSecondary: '#22D3EE',
      glowStyle: 'rgba(168, 85, 247, 0.2)',
      borderClass: 'border-purple-400/40',
      textAccent: 'text-purple-300',
      badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-800/60'
    },
    lakshya: {
      accentColor: '#3B82F6',
      accentSecondary: '#F59E0B',
      glowStyle: 'rgba(245, 158, 11, 0.2)',
      borderClass: 'border-amber-400/40',
      textAccent: 'text-amber-400',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800/60'
    }
  };

  const theme = clubThemes[club.slug] || {
    accentColor: '#2876B8',
    glowStyle: 'rgba(40, 118, 184, 0.2)',
    borderClass: 'border-praxis-cyan/40',
    textAccent: 'text-praxis-cyan',
    badgeClass: 'bg-praxis-elevated text-praxis-cyan border-praxis-border'
  };

  // Club events and gallery items
  const clubEvents = events.filter(e => e.clubSlug === club.slug);
  const clubGallery = gallery.filter(g => g.clubSlug === club.slug);

  return (
    <div className="pt-28 pb-20 space-y-20 relative">
      
      {/* Club Ambient Background Aura */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-[350px] blur-[150px] pointer-events-none rounded-full"
        style={{ backgroundColor: theme.glowStyle }}
      />

      {/* Breadcrumb & Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/clubs"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-praxis-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to all clubs
        </Link>
      </div>

      {/* Hero Banner for Individual Club */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 sm:p-12 rounded-2xl glass-panel-elevated border ${theme.borderClass} relative overflow-hidden shadow-2xl`}>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Master Club Logo (Exact Supplied ImageKit Asset, Never recolored) */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 p-4 rounded-2xl bg-black/50 border border-praxis-border flex items-center justify-center shrink-0 shadow-lg">
              <img
                src={club.logoUrl}
                alt={`${club.name} Official Logo`}
                className="max-h-full max-w-full object-contain filter drop-shadow-md"
              />
            </div>

            {/* Club Identity Text */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border ${theme.badgeClass}`}>
                  {club.category} CHAPTER
                </span>
                <span className="text-xs uppercase tracking-widest text-praxis-muted">
                  SDES PRAXIS ECOSYSTEM
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black uppercase text-white font-display tracking-wide">
                {club.name}
              </h1>

              {club.tagline && (
                <p className={`text-sm sm:text-base font-medium italic ${theme.textAccent}`}>
                  "{club.tagline}"
                </p>
              )}

              <p className="text-xs sm:text-sm text-praxis-secondary leading-relaxed max-w-2xl">
                {club.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-praxis-muted">
                <span>Official Chapter &bull; CSE-Allied Department</span>
                {club.contactEmail && (
                  <span className="flex items-center gap-1 text-praxis-cyan">
                    <Mail size={12} /> {club.contactEmail}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Purpose, Vision, and Mission Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-praxis-elevated flex items-center justify-center text-praxis-cyan">
              <Compass size={18} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white font-display">
              Our Purpose
            </h3>
            <p className="text-xs text-praxis-secondary leading-relaxed">
              {club.purpose || 'Fostering deep competencies and collaborative engagement among students.'}
            </p>
          </div>

          <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-praxis-elevated flex items-center justify-center text-praxis-accent">
              <Eye size={18} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white font-display">
              Our Vision
            </h3>
            <p className="text-xs text-praxis-secondary leading-relaxed">
              {club.vision || 'To achieve recognized excellence and cultivate visionary talent.'}
            </p>
          </div>

          <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
            <div className="w-9 h-9 rounded-lg bg-praxis-elevated flex items-center justify-center text-emerald-400">
              <Target size={18} />
            </div>
            <h3 className="text-lg font-bold uppercase text-white font-display">
              Our Mission
            </h3>
            <p className="text-xs text-praxis-secondary leading-relaxed">
              {club.mission || 'Conducting workshops, competitive sprints, and mentorship initiatives.'}
            </p>
          </div>

        </div>
      </section>

      {/* Club Leadership: Main Leader & Coordinators */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadershipSection filterClubSlug={club.slug} />
      </section>

      {/* Club Events */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-praxis-border pb-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className={theme.textAccent} />
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
              {club.name} Events & Activities
            </h3>
          </div>
          <span className="text-xs uppercase tracking-widest text-praxis-muted">
            {clubEvents.length} Recorded
          </span>
        </div>

        {clubEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubEvents.map(evt => (
              <EventCard key={evt.id || evt.slug} event={evt} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl glass-panel text-center text-xs text-praxis-muted">
            No events scheduled currently for {club.name}. Check back soon!
          </div>
        )}
      </section>

      {/* Club Gallery Archive */}
      {clubGallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-praxis-border pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} className={theme.textAccent} />
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
                {club.name} Photo Archives
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clubGallery.map(img => (
              <div
                key={img.id}
                onClick={() => onOpenLightbox && onOpenLightbox(img)}
                className="h-40 rounded-xl overflow-hidden cursor-pointer border border-praxis-border bg-praxis-card group relative"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-xs font-bold text-white truncate">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
