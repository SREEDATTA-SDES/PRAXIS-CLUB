import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Calendar, Image as ImageIcon, Award, Shield, CheckCircle } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ClubCard } from '../components/ClubCard';
import { EventCard } from '../components/EventCard';
import { AnnouncementsSection } from '../components/AnnouncementsSection';
import { useData } from '../context/DataContext';

export const HomePage = ({ onOpenLightbox }) => {
  const { clubs, events, gallery, settings } = useData();

  const technicalClubs = clubs.filter(c => c.category === 'TECHNICAL');
  const nonTechnicalClubs = clubs.filter(c => c.category === 'NON-TECHNICAL');
  const upcomingEvents = events.filter(e => e.status === 'UPCOMING').slice(0, 3);
  const previewGallery = gallery.slice(0, 6);

  return (
    <div className="space-y-24">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Praxis Introduction / Manifesto */}
      <section className="relative py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl glass-panel-elevated p-8 sm:p-12 border border-praxis-border/80 overflow-hidden">
            {/* Subtle atmospheric glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-praxis-glow/15 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan block">
                  The CSE-Allied Catalyst
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-display tracking-wide">
                  Where Pure Engineering Meets Student Expression
                </h2>
                <p className="text-sm sm:text-base text-praxis-secondary leading-relaxed">
                  PRAXIS is the unifying student club ecosystem of <strong className="text-white">Sree Dattha Institute of Engineering & Science</strong> (CSE-Allied). 
                  It provides an open runway for ambitious students to transition beyond classroom theory into competitive coding, systems engineering, hardware invention, parliamentary debate, cinematography, and civic leadership.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-praxis-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-praxis-cyan" />
                    <span>Peer-to-Peer Technical Guilds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-praxis-accent" />
                    <span>State & National Level Competitions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span>Interdisciplinary Maker Culture</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-lg border border-praxis-cyan/50 hover:bg-praxis-cyan/10 text-praxis-cyan text-xs uppercase font-bold tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <span>Read Manifesto</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Clubs Section (Split into TECHNICAL and NON-TECHNICAL) */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main section header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-cyan">
              Autonomous Chapters
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase text-white font-display tracking-wide">
              OUR CLUBS
            </h2>
            <p className="text-xs sm:text-sm text-praxis-secondary tracking-wider">
              Six specialized student bodies engineering excellence across algorithmic problem solving, cloud systems, IoT hardware, debating, cinematography, and social leadership.
            </p>
          </div>

          {/* Sub-group 1: TECHNICAL CLUBS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-praxis-border pb-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-praxis-cyan" />
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  TECHNICAL CLUBS
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-praxis-muted">
                Software &bull; Cloud &bull; Embedded Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalClubs.map(club => (
                <ClubCard key={club.slug} club={club} />
              ))}
            </div>
          </div>

          {/* Sub-group 2: NON-TECHNICAL CLUBS */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-praxis-border pb-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-praxis-accent" />
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider">
                  NON-TECHNICAL CLUBS
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-praxis-muted">
                Debating &bull; Media &bull; Social Responsibility
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonTechnicalClubs.map(club => (
                <ClubCard key={club.slug} club={club} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Upcoming Events */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-praxis-border pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-accent">
                Calendar & Timetable
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-display tracking-wide mt-1">
                Upcoming Events & Hackathons
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs uppercase tracking-[0.2em] text-praxis-cyan hover:underline font-bold flex items-center gap-1.5"
            >
              <span>View All Events</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id || event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-xl glass-panel border border-praxis-border">
              <p className="text-praxis-secondary">New event registrations will open shortly.</p>
            </div>
          )}

        </div>
      </section>

      {/* 5. Activities & Achievements Showcase */}
      <section className="relative py-10 bg-praxis-navy/40 border-y border-praxis-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-praxis-cyan/10 text-praxis-cyan flex items-center justify-center">
                <Award size={22} />
              </div>
              <h4 className="text-lg font-bold uppercase text-white font-display">
                Competitive Hackathons
              </h4>
              <p className="text-xs text-praxis-secondary leading-relaxed">
                Over 12 annual hackathons, code sprints, and robotics maker challenges conducted with industry mentors.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-praxis-accent/10 text-praxis-accent flex items-center justify-center">
                <Compass size={22} />
              </div>
              <h4 className="text-lg font-bold uppercase text-white font-display">
                Interdisciplinary Synergy
              </h4>
              <p className="text-xs text-praxis-secondary leading-relaxed">
                Seamless collaboration between software coders, embedded hardware makers, and creative media cinematographers.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-panel border border-praxis-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Shield size={22} />
              </div>
              <h4 className="text-lg font-bold uppercase text-white font-display">
                Institutional Backing
              </h4>
              <p className="text-xs text-praxis-secondary leading-relaxed">
                Fully recognized and governed by the Sree Dattha Institute of Engineering & Science CSE-Allied Department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Preview */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-praxis-border pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan">
                Visual Archives
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-display tracking-wide mt-1">
                Campus Moments & Highlights
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-[0.2em] text-praxis-cyan hover:underline font-bold flex items-center gap-1.5"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox && onOpenLightbox(item)}
                className="group relative h-48 sm:h-64 rounded-xl overflow-hidden cursor-pointer border border-praxis-border bg-praxis-card"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-praxis-cyan tracking-widest">
                    {item.albumName || item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Announcements Bulletin */}
      <AnnouncementsSection />

      {/* 8. Contact Teaser */}
      <section className="relative py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl glass-panel p-8 sm:p-10 border border-praxis-border text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-accent">
              Connect With The Platform
            </span>
            <h2 className="text-3xl font-extrabold uppercase text-white font-display">
              Have Questions or Proposal For PRAXIS?
            </h2>
            <p className="text-xs sm:text-sm text-praxis-secondary max-w-xl mx-auto">
              Get in touch with the faculty coordinators, student club presidents, or visit our campus at Sheriguda, Greater Hyderabad.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs uppercase font-bold tracking-[0.25em] shadow-cinematic-blue transition-all"
              >
                <span>VISIT CONTACT PAGE</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
