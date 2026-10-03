import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ArrowUpRight, Pin } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AnnouncementsSection = () => {
  const { announcements } = useData();

  if (!announcements || announcements.length === 0) return null;

  return (
    <section className="relative py-12 border-t border-b border-praxis-border/60 bg-praxis-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-praxis-cyan">
              <Bell size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-praxis-secondary block">
                Official Updates
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                Announcements & Circulars
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-praxis-muted">
            SDES CSE-Allied Board
          </span>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {announcements.slice(0, 3).map((item) => (
            <div
              key={item.id || item._id}
              className={`relative p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                item.isPinned
                  ? 'bg-praxis-card/90 border-praxis-cyan/40 shadow-[0_0_20px_rgba(32,217,255,0.08)]'
                  : 'bg-praxis-card/50 border-praxis-border hover:border-praxis-border-light'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-praxis-elevated text-praxis-secondary border border-praxis-border">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.isPinned && (
                      <span className="text-[10px] flex items-center gap-1 text-praxis-cyan uppercase tracking-wider">
                        <Pin size={11} /> Pinned
                      </span>
                    )}
                    <span className="text-[10px] text-praxis-muted tracking-wider">
                      {item.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-praxis-secondary leading-relaxed line-clamp-3">
                  {item.content}
                </p>
              </div>

              {item.linkUrl && (
                <div className="mt-4 pt-3 border-t border-praxis-border/50">
                  <Link
                    to={item.linkUrl}
                    className="inline-flex items-center gap-1 text-xs text-praxis-cyan hover:underline uppercase tracking-wider font-semibold"
                  >
                    <span>{item.linkText || 'Details'}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
