import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Compass, Shield, Award } from 'lucide-react';
import { SpatialHero } from '../components/SpatialHero';
import { ClubCard } from '../components/ClubCard';
import { EventCard } from '../components/EventCard';
import { AnnouncementsSection } from '../components/AnnouncementsSection';
import { useData } from '../context/DataContext';

export const HomePage = ({ onOpenLightbox }) => {
  const { clubs, events, gallery } = useData();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const technicalClubs = clubs.filter(c => c.category === 'TECHNICAL');
  const nonTechnicalClubs = clubs.filter(c => c.category === 'NON-TECHNICAL');
  const upcomingEvents = events.filter(e => e.status === 'UPCOMING').slice(0, 3);
  const previewGallery = gallery.slice(0, 6);

  // Parallax Values
  const yManifesto = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const opacityManifesto = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const xClubsLeft = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0]);
  const xClubsRight = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  return (
    <div ref={containerRef} className="space-y-0 w-full overflow-hidden bg-transparent">

      {/* 1. Cinematic Hero */}
      <SpatialHero />

      {/* 2. Praxis Introduction / Manifesto - Liquid Glass Redesign */}
      <motion.section
        style={{ y: yManifesto, opacity: opacityManifesto }}
        className="relative flex items-center py-12 z-10"
      >
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative">
          <div className="liquid-glass-elevated rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-praxis-cyan/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-praxis-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-praxis-cyan font-cinematic">
                  The CSE-Allied Catalyst
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 font-display leading-[1.1] tracking-wider">
                  Where <span className="text-praxis-cyan">Engineering</span> Meets Expression
                </h2>
              </div>

              <div className="lg:col-span-6 space-y-8">
                <p className="text-sm md:text-base lg:text-xl text-white/70 leading-relaxed font-cinematic tracking-wide">
                  PRAXIS is the unifying student club ecosystem of <strong className="text-white">Sree Dattha Institute of Engineering & Science</strong>.
                  It provides an open runway for ambitious students to transition beyond classroom theory into competitive coding, systems engineering, hardware invention, parliamentary debate, cinematography, and civic leadership.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-bold">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-praxis-cyan flex items-center justify-center text-praxis-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                      <CheckCircle size={12} />
                    </div>
                    <span>Technical Guilds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-praxis-accent flex items-center justify-center text-praxis-accent shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                      <CheckCircle size={12} />
                    </div>
                    <span>Maker Culture</span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-4 px-8 py-4 liquid-glass rounded-full text-xs font-bold uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Read Manifesto</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Clubs Section - Liquid Glass Layout */}
      <section className="relative py-12 overflow-hidden z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12 border-b border-white/10 pb-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-praxis-cyan font-cinematic">
                Autonomous Chapters
              </span>
              <h2 className="text-5xl sm:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 font-display tracking-widest">
                Our Ecosystem
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs text-white/50 tracking-widest font-cinematic leading-loose uppercase">
                Six specialized student bodies engineering excellence across algorithms, cloud, IoT, debating, media, and leadership.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {/* TECHNICAL CLUBS */}
            <motion.div style={{ x: isMobile ? 0 : xClubsLeft }}>
              <div className="flex items-center gap-6 mb-8">
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-display tracking-widest">
                  Technical Layer
                </h3>
                <div className="h-[1px] flex-grow bg-white/10 relative">
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-praxis-cyan to-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {technicalClubs.map(club => (
                  <ClubCard key={club.slug} club={club} />
                ))}
              </div>
            </motion.div>

            {/* NON-TECHNICAL CLUBS */}
            <motion.div style={{ x: isMobile ? 0 : xClubsRight }}>
              <div className="flex items-center gap-6 mb-8">
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-display tracking-widest">
                  Creative Layer
                </h3>
                <div className="h-[1px] flex-grow bg-white/10 relative">
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-praxis-accent to-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {nonTechnicalClubs.map(club => (
                  <ClubCard key={club.slug} club={club} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Events - Liquid Design */}
      <section className="relative py-12 z-10">
        <div className="absolute inset-0 bg-white/5 skew-y-[-3deg] transform-origin-top-left pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-accent font-cinematic">
                Calendar & Action
              </span>
              <h2 className="text-5xl sm:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 font-display tracking-widest">
                Operations
              </h2>
            </div>
            <Link
              to="/events"
              className="group flex items-center gap-4 px-6 py-3 liquid-glass rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:bg-white/10 transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <EventCard key={event.id || event.slug} event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="liquid-glass-elevated rounded-[2.5rem] py-24 text-center">
              <p className="text-white/50 tracking-widest uppercase text-sm font-cinematic">New event registrations will open shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Gallery Preview - Liquid Tiles */}
      <section className="relative py-12 z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan font-cinematic">
                Visual Archives
              </span>
              <h2 className="text-5xl sm:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 font-display tracking-widest">
                Highlights
              </h2>
            </div>
            <Link
              to="/gallery"
              className="group flex items-center gap-4 px-6 py-3 liquid-glass rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:bg-white/10 transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewGallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                onClick={() => onOpenLightbox && onOpenLightbox(item)}
                className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer liquid-glass-card"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] uppercase font-bold text-praxis-cyan tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.albumName || item.category}
                  </span>
                  <h4 className="text-lg md:text-xl font-black text-white font-display tracking-widest uppercase">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Announcements Bulletin */}
      <div className="relative z-10">
        <AnnouncementsSection />
      </div>

      {/* 8. Contact Teaser - Liquid Glass Call to Action */}
      <section className="relative py-16 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/mb7zqdf5/image/upload/v1791138156/Midnight_Blue_Textured_Stone_Surface.png')] opacity-[0.05] bg-cover bg-center pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 relative z-10"
        >
          <div className="liquid-glass-elevated rounded-[3rem] p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-praxis-cyan/20 to-praxis-accent/20 blur-[100px] mix-blend-screen pointer-events-none" />

            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-praxis-cyan font-cinematic relative z-10">
              Connect
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 font-display tracking-widest relative z-10">
              Join The Ecosystem
            </h2>
            <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto font-cinematic tracking-widest uppercase leading-loose pb-8 relative z-10">
              Get in touch with faculty coordinators, student club presidents, or visit our campus.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 px-12 py-5 liquid-glass rounded-full text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-white/10 transition-colors duration-500 group relative z-10"
            >
              <span>Initiate Contact</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
