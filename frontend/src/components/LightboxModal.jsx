import React, { useEffect } from 'react';
import { X, Tag, Calendar, ExternalLink } from 'lucide-react';

export const LightboxModal = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-praxis-surface border border-praxis-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
        >
          <X size={20} />
        </button>

        {/* High-res Image preview */}
        <div className="md:w-3/5 bg-black/60 flex items-center justify-center min-h-[350px] max-h-[70vh] overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Metadata Details */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-praxis-elevated text-praxis-cyan border border-praxis-cyan/30">
                {item.category}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-praxis-muted">
                {item.albumName || 'General Album'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
              {item.title}
            </h3>

            {item.caption && (
              <p className="text-sm text-praxis-secondary leading-relaxed">
                {item.caption}
              </p>
            )}

            <div className="space-y-2 text-xs text-praxis-muted pt-2 border-t border-praxis-border/50">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-praxis-cyan" />
                <span>Club: <strong className="text-white capitalize">{item.clubSlug || 'Ecosystem'}</strong></span>
              </div>
              {item.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-praxis-accent" />
                  <span>Archived on {item.date}</span>
                </div>
              )}
            </div>
          </div>

          <a
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-praxis-border hover:border-praxis-cyan text-xs uppercase tracking-widest text-white hover:bg-praxis-elevated transition-all"
          >
            <span>Open Original Image</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};
