import React, { useState } from 'react';
import { ClubCard } from '../components/ClubCard';
import { useData } from '../context/DataContext';

export const ClubsPage = () => {
  const { clubs } = useData();
  const [filter, setFilter] = useState('ALL');

  const filteredClubs = filter === 'ALL'
    ? clubs
    : clubs.filter(c => c.category === filter);

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Page Header */}
      <section className="relative text-center max-w-4xl mx-auto px-4 space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-cyan">
          Official Student Bodies
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-wider">
          OUR CLUBS
        </h1>
        <p className="text-xs sm:text-sm text-praxis-secondary max-w-2xl mx-auto leading-relaxed">
          Six specialized chapters driving innovation, technical competence, oratory excellence, cinematography, and student civic welfare across SDES CSE-Allied.
        </p>

        {/* Filter Tabs */}
        <div className="pt-6 flex items-center justify-center gap-2">
          {['ALL', 'TECHNICAL', 'NON-TECHNICAL'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-lg text-xs uppercase font-bold tracking-[0.2em] transition-all ${
                filter === tab
                  ? 'bg-praxis-glow text-white shadow-cinematic-blue'
                  : 'glass-panel text-praxis-secondary hover:text-white border-praxis-border'
              }`}
            >
              {tab === 'ALL' ? 'All 6 Clubs' : tab}
            </button>
          ))}
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <ClubCard key={club.slug} club={club} />
          ))}
        </div>
      </section>

    </div>
  );
};
