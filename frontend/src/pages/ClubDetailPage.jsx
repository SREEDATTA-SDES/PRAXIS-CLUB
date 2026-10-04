import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Target, Eye, Compass, Calendar, Image as ImageIcon, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EventCard } from '../components/EventCard';
import { LeadershipSection } from '../components/LeadershipSection';

export const ClubDetailPage = ({ onOpenLightbox }) => {
  const { clubSlug } = useParams();
  const { clubs, events, gallery } = useData();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const club = clubs.find(c => c.slug === clubSlug);

  if (!club) {
    return (
      <div className="pt-36 pb-20 text-center space-y-4">
        <h2 className="text-3xl font-bold uppercase text-white font-display">Club Not Found</h2>
        <Link to="/clubs" className="inline-block mt-4 text-xs uppercase tracking-widest text-praxis-cyan underline">
          &larr; Back to all clubs
        </Link>
      </div>
    );
  }

  const clubEvents = events.filter(e => e.clubSlug === club.slug);
  const clubGallery = gallery.filter(g => g.clubSlug === club.slug);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const leftSlide = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);
  const rightSlide = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);
  const glassOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden pt-16 bg-transparent pb-20">
      
      {/* Dynamic Liquid Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-40"
          style={{ 
            background: `radial-gradient(circle, ${club.accentPrimary}, transparent 70%)`,
            y: useTransform(scrollYProgress, [0, 1], [0, -300]),
            x: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen opacity-30"
          style={{ 
            background: `radial-gradient(circle, ${club.accentSecondary}, transparent 70%)`,
            y: useTransform(scrollYProgress, [0, 1], [0, 300])
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 inline-block"
        >
          <Link to="/clubs" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Ecosystem Map
          </Link>
        </motion.div>

        {/* Hero Section - Centered & Massive */}
        <motion.section 
          style={{ y: heroY }}
          className="relative min-h-[50vh] flex flex-col justify-center items-center text-center mt-8 mb-20"
        >
          <motion.div style={{ opacity: textOpacity }} className="space-y-8 z-10 max-w-5xl flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full liquid-glass border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: club.accentPrimary, boxShadow: `0 0 10px ${club.accentPrimary}` }} />
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.5em] text-white/80">{club.category} LAYER</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase text-transparent bg-clip-text font-display tracking-widest drop-shadow-2xl" 
                style={{ backgroundImage: `linear-gradient(to bottom right, #ffffff, ${club.accentPrimary})` }}>
              {club.name}
            </h1>
            
            <p className="text-xl md:text-3xl font-cinematic italic text-white/70 max-w-3xl leading-relaxed">
              "{club.tagline}"
            </p>
            
            <div className="pt-8 flex items-center justify-center gap-6 text-sm font-cinematic text-white/50 uppercase tracking-[0.3em]">
              <span>EST. 2026</span>
              <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
              {club.contactEmail && (
                <span className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <Mail size={16} /> {club.contactEmail}
                </span>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Liquid Glass Info Panels */}
        <section className="relative mt-12 z-20 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              style={{ x: leftSlide }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="liquid-glass-elevated p-12 md:p-16 rounded-[3rem] border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${club.accentPrimary}, ${club.accentSecondary})` }} />
              <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-white/50 mb-8 flex items-center gap-4">
                <Compass size={18} /> Architecture & Purpose
              </h2>
              <p className="text-2xl md:text-3xl font-cinematic leading-relaxed text-white/90">
                {club.description}
              </p>
              <p className="mt-8 text-lg text-white/60 leading-loose">
                {club.purpose}
              </p>
            </motion.div>

            <div className="space-y-12">
              <motion.div 
                style={{ x: rightSlide }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="liquid-glass p-10 rounded-[2.5rem] border-white/10"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-4 flex items-center gap-3">
                  <Eye size={16} /> Vision
                </h2>
                <p className="text-lg text-white/80 leading-relaxed font-cinematic">{club.vision}</p>
              </motion.div>

              <motion.div 
                style={{ x: rightSlide }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="liquid-glass p-10 rounded-[2.5rem] border-white/10"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-4 flex items-center gap-3">
                  <Target size={16} /> Mission
                </h2>
                <p className="text-lg text-white/80 leading-relaxed font-cinematic">{club.mission}</p>
              </motion.div>
            </div>
          </div>

          {/* Leadership Section integration with liquid styles */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-16 border-t border-white/5"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-display tracking-widest mb-12 text-center">
              Core <span style={{ color: club.accentPrimary }}>Command</span>
            </h2>
            <LeadershipSection filterClubSlug={club.slug} />
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-16 border-t border-white/5"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-display tracking-widest text-center md:text-left">
                Operations
              </h2>
              <div className="liquid-glass px-6 py-2 rounded-full border-white/10 flex items-center gap-3">
                <Calendar size={16} className="text-white/50" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">{clubEvents.length} Recorded</span>
              </div>
            </div>

            {clubEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubEvents.map(evt => (
                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <EventCard key={evt.id || evt.slug} event={evt} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="liquid-glass p-16 rounded-[3rem] text-center border-white/10">
                <p className="text-lg text-white/50 font-cinematic uppercase tracking-widest">Awaiting deployment of new operations.</p>
              </div>
            )}
          </motion.div>

          {/* Gallery Liquid Tiles */}
          {clubGallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-16 border-t border-white/5"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-display tracking-widest mb-12 text-center">
                Visual <span style={{ color: club.accentSecondary }}>Archives</span>
              </h2>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {clubGallery.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1 }}
                    onClick={() => onOpenLightbox && onOpenLightbox(img)}
                    className="relative overflow-hidden rounded-[2rem] cursor-pointer liquid-glass group break-inside-avoid"
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                      <p className="text-sm font-bold uppercase tracking-widest text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </section>
      </div>
    </div>
  );
};
