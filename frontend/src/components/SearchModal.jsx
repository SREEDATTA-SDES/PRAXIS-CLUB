import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, Users, Image, Bell, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { clubs, events, gallery, announcements } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredClubs = q
    ? clubs.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : [];

  const filteredEvents = q
    ? events.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q))
    : [];

  const filteredGallery = q
    ? gallery.filter(g => g.title.toLowerCase().includes(q) || g.caption?.toLowerCase().includes(q) || g.albumName?.toLowerCase().includes(q))
    : [];

  const filteredAnnouncements = q
    ? announcements.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q))
    : [];

  const totalResults = filteredClubs.length + filteredEvents.length + filteredGallery.length + filteredAnnouncements.length;

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-praxis-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-praxis-border bg-praxis-card">
          <Search size={20} className="text-praxis-cyan mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clubs, hackathons, seminars, albums, announcements..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-praxis-muted focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-praxis-muted hover:text-white mr-2">
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase tracking-wider text-praxis-secondary border border-praxis-border rounded hover:bg-praxis-elevated"
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query && (
            <div className="py-10 text-center text-praxis-muted text-xs uppercase tracking-widest">
              Type to explore clubs, events, gallery, and official updates
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-praxis-text font-medium">No results found for "{query}"</p>
              <p className="text-xs text-praxis-muted">Try searching for Genesis, Tech Vertex, debate, hackathon, or workshops.</p>
            </div>
          )}

          {/* Clubs results */}
          {filteredClubs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-praxis-cyan flex items-center gap-1.5 mb-2.5">
                <Users size={14} /> Clubs ({filteredClubs.length})
              </span>
              <div className="space-y-2">
                {filteredClubs.map(c => (
                  <div
                    key={c.id || c.slug}
                    onClick={() => handleSelect(`/clubs/${c.slug}`)}
                    className="flex items-center justify-between p-3 rounded-lg bg-praxis-card hover:bg-praxis-elevated border border-praxis-border/60 hover:border-praxis-cyan/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.logoUrl} alt={c.name} className="w-8 h-8 object-contain" />
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-praxis-cyan transition-colors">
                          {c.name}
                        </h4>
                        <p className="text-xs text-praxis-muted line-clamp-1">{c.tagline || c.description}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-praxis-muted group-hover:text-praxis-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events results */}
          {filteredEvents.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-praxis-accent flex items-center gap-1.5 mb-2.5">
                <Calendar size={14} /> Events ({filteredEvents.length})
              </span>
              <div className="space-y-2">
                {filteredEvents.map(e => (
                  <div
                    key={e.id || e.slug}
                    onClick={() => handleSelect(`/events`)}
                    className="flex items-center justify-between p-3 rounded-lg bg-praxis-card hover:bg-praxis-elevated border border-praxis-border/60 hover:border-praxis-accent/50 cursor-pointer transition-all group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-praxis-accent transition-colors">
                        {e.title}
                      </h4>
                      <p className="text-xs text-praxis-muted">{e.date} &bull; {e.venue}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-praxis-border text-praxis-secondary uppercase">
                      {e.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery results */}
          {filteredGallery.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <Image size={14} /> Gallery Photos ({filteredGallery.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {filteredGallery.map(g => (
                  <div
                    key={g.id}
                    onClick={() => handleSelect('/gallery')}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-praxis-card hover:bg-praxis-elevated border border-praxis-border/50 cursor-pointer transition-all"
                  >
                    <img src={g.imageUrl} alt={g.title} className="w-10 h-10 object-cover rounded" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-white truncate">{g.title}</p>
                      <p className="text-[10px] text-praxis-muted uppercase">{g.albumName || g.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements results */}
          {filteredAnnouncements.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-400 flex items-center gap-1.5 mb-2.5">
                <Bell size={14} /> Announcements ({filteredAnnouncements.length})
              </span>
              <div className="space-y-2">
                {filteredAnnouncements.map(a => (
                  <div
                    key={a.id}
                    onClick={() => handleSelect(a.linkUrl || '/')}
                    className="p-3 rounded-lg bg-praxis-card hover:bg-praxis-elevated border border-praxis-border/60 cursor-pointer transition-all"
                  >
                    <h5 className="text-xs font-bold text-white mb-1">{a.title}</h5>
                    <p className="text-xs text-praxis-secondary line-clamp-1">{a.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
