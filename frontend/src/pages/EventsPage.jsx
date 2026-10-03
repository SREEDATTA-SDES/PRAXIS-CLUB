import React, { useState } from 'react';
import { EventCard } from '../components/EventCard';
import { useData } from '../context/DataContext';
import { Calendar, Search, Filter } from 'lucide-react';

export const EventsPage = () => {
  const { events, clubs } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-accent">
          Campus Calendar & Sprints
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-wider">
          EVENTS & HACKATHONS
        </h1>
        <p className="text-xs sm:text-sm text-praxis-secondary max-w-2xl mx-auto leading-relaxed">
          From high-stakes algorithmic hackathons to parliamentary debates and digital media exhibitions across Sree Dattha Institute of Engineering & Science.
        </p>

        {/* Filter & Search Bar */}
        <div className="pt-6 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-1/2">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-praxis-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event, venue, or club..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-xs sm:text-sm text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-all ${
                  categoryFilter === cat
                    ? 'bg-praxis-glow text-white shadow-cinematic-blue'
                    : 'glass-panel text-praxis-secondary hover:text-white border-praxis-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            {['ALL', 'UPCOMING', 'COMPLETED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-2.5 rounded-lg text-[11px] uppercase font-bold tracking-wider transition-all ${
                  statusFilter === st
                    ? 'bg-praxis-elevated text-praxis-cyan border border-praxis-cyan/50'
                    : 'glass-panel text-praxis-muted hover:text-white border-praxis-border'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id || event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl glass-panel border border-praxis-border space-y-2">
            <p className="text-white font-bold">No events matched your filter criteria.</p>
            <p className="text-xs text-praxis-muted">Try clearing the search query or changing category filters.</p>
          </div>
        )}
      </section>

    </div>
  );
};
