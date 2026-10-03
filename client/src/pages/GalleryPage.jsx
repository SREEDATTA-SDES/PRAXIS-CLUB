import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Image as ImageIcon, Filter, Layers, Maximize2 } from 'lucide-react';

export const GalleryPage = ({ onOpenLightbox }) => {
  const { gallery, clubs } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [clubFilter, setClubFilter] = useState('ALL');

  const filteredGallery = gallery.filter(item => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (clubFilter !== 'ALL' && item.clubSlug !== clubFilter) return false;
    return true;
  });

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-cyan">
          Visual Archive
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-wider">
          GALLERY & MEDIA
        </h1>
        <p className="text-xs sm:text-sm text-praxis-secondary max-w-2xl mx-auto leading-relaxed">
          Documenting hackathon sprints, technical symposiums, leadership debates, and campus moments across the PRAXIS ecosystem.
        </p>

        {/* Filter Controls */}
        <div className="pt-6 space-y-3">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2">
            {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider transition-all ${
                  categoryFilter === cat
                    ? 'bg-praxis-glow text-white shadow-cinematic-blue'
                    : 'glass-panel text-praxis-secondary hover:text-white border-praxis-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Club Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            <button
              onClick={() => setClubFilter('ALL')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                clubFilter === 'ALL'
                  ? 'bg-praxis-cyan text-praxis-bg font-bold'
                  : 'bg-praxis-card text-praxis-muted hover:text-white border border-praxis-border'
              }`}
            >
              All Clubs
            </button>
            {clubs.map(c => (
              <button
                key={c.slug}
                onClick={() => setClubFilter(c.slug)}
                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                  clubFilter === c.slug
                    ? 'bg-praxis-cyan text-praxis-bg font-bold'
                    : 'bg-praxis-card text-praxis-muted hover:text-white border border-praxis-border'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox && onOpenLightbox(item)}
                className="group relative rounded-xl overflow-hidden border border-praxis-border bg-praxis-card cursor-pointer hover:border-praxis-cyan/50 hover:shadow-cinematic-blue transition-all duration-300"
              >
                {/* Image */}
                <div className="h-64 w-full overflow-hidden bg-black/40">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-praxis-cyan px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-praxis-cyan/30">
                      {item.albumName || item.category}
                    </span>
                    <span className="text-[10px] text-praxis-muted uppercase tracking-wider">
                      {item.clubSlug}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-praxis-cyan transition-colors">
                    {item.title}
                  </h3>

                  {item.caption && (
                    <p className="text-xs text-praxis-secondary line-clamp-2 mt-1">
                      {item.caption}
                    </p>
                  )}

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-praxis-muted">
                    <span>{item.date}</span>
                    <span className="flex items-center gap-1 text-praxis-secondary group-hover:text-white">
                      <Maximize2 size={12} /> Expand
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl glass-panel border border-praxis-border space-y-2">
            <p className="text-white font-bold">No gallery photographs found for this filter.</p>
            <p className="text-xs text-praxis-muted">Try selecting 'All Clubs' or another category.</p>
          </div>
        )}
      </section>

    </div>
  );
};
