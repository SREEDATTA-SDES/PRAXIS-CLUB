import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

export const ClubCard = ({ club }) => {
  // Determine dynamic subtle accent styles based on club
  const accentBorder = {
    genesis: 'hover:border-purple-500/60 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]',
    'tech-vertex': 'hover:border-cyan-400/60 group-hover:shadow-[0_0_25px_rgba(0,242,254,0.25)]',
    innovex: 'hover:border-red-500/60 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
    'd-talks': 'hover:border-pink-500/60 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
    'visual-vibes': 'hover:border-purple-400/60 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    lakshya: 'hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]'
  }[club.slug] || 'hover:border-praxis-cyan/50';

  const categoryColor = club.category === 'TECHNICAL' ? 'text-praxis-cyan border-praxis-cyan/30' : 'text-praxis-accent border-praxis-accent/30';

  return (
    <div 
      className={`group relative rounded-xl bg-gradient-to-b from-praxis-card to-praxis-surface border border-praxis-border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${accentBorder}`}
    >
      {/* Top row: Category badge & logo */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-praxis-elevated border ${categoryColor}`}>
            {club.category}
          </span>
          <span className="text-[10px] text-praxis-muted tracking-widest uppercase">
            SDES PRAXIS
          </span>
        </div>

        {/* Master Club Logo (Exact official ImageKit URL) */}
        <div className="h-28 w-full flex items-center justify-center py-2 px-4 rounded-lg bg-black/30 border border-praxis-border/40 mb-5 group-hover:border-praxis-border transition-colors">
          <img
            src={club.logoUrl}
            alt={`${club.name} Official Logo`}
            className="max-h-20 max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Club Name & Tagline */}
        <h3 className="text-xl font-bold text-white tracking-wide font-display uppercase group-hover:text-praxis-cyan transition-colors">
          {club.name}
        </h3>

        {club.tagline && (
          <p className="text-xs text-praxis-secondary italic mt-1 mb-2">
            "{club.tagline}"
          </p>
        )}

        {/* Short description */}
        <p className="text-xs text-praxis-muted leading-relaxed line-clamp-3 mt-2">
          {club.description}
        </p>
      </div>

      {/* Card footer: Explore interaction */}
      <div className="mt-6 pt-4 border-t border-praxis-border/50 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-praxis-secondary group-hover:text-white transition-colors">
          Explore Chapter
        </span>
        <Link
          to={`/clubs/${club.slug}`}
          className="w-8 h-8 rounded-full bg-praxis-elevated flex items-center justify-center text-praxis-secondary group-hover:text-praxis-cyan group-hover:bg-praxis-cyan/10 transition-all duration-300 group-hover:translate-x-1"
          aria-label={`View details for ${club.name}`}
        >
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
