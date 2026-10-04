import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COLLEGE_BRAND } from '../data/initialData';
import { LeadershipSection } from '../components/LeadershipSection';
import { CollegeBrand } from '../components/CollegeBrand';

export const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-32 pb-16 overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen opacity-20 bg-praxis-cyan/40" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-10 bg-praxis-accent/40" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-24">
        
        {/* Page Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.5em] text-praxis-cyan font-cinematic block">
            The Manifesto
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-display tracking-widest">
            Identity & Origins
          </h1>
          <p className="text-sm md:text-base text-white/50 leading-loose font-cinematic uppercase tracking-widest max-w-2xl mx-auto">
            Understanding the architecture of the Sree Dattha Institute's premier CSE-Allied ecosystem.
          </p>
        </motion.div>

        {/* Institutional Foundation */}
        <section className="relative z-20 liquid-glass-elevated rounded-[3rem] p-12 md:p-24 border-white/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-praxis-cyan/10 blur-[100px] mix-blend-screen pointer-events-none" />
          
          <div className="flex flex-col items-center relative z-10 space-y-16">
            <div className="flex justify-center scale-110 md:scale-125 lg:scale-[1.6] origin-center drop-shadow-2xl">
              <CollegeBrand />
            </div>
            
            <div className="space-y-8 max-w-4xl text-center">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan font-cinematic block">
                Institutional Foundation
              </span>
              <div className="space-y-6 text-white/70 font-cinematic leading-relaxed text-lg">
                <p>
                  Established with a profound commitment to engineering distinction and academic rigor, Sree Dattha Institute of Engineering & Science (SDES) stands as a premier autonomous institution in Greater Hyderabad.
                </p>
                <p>
                  We are driven by a singular mission: cultivating tech-ready graduates equipped to solve real-world industrial and societal problems. With advanced computing centers, world-class laboratories, and a high-impact learning culture, SDES champions technical curiosity and multidisciplinary exploration across all domains of engineering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The PRAXIS Vision */}
        <section className="relative z-20 liquid-glass rounded-[3rem] p-12 md:p-24 border-white/10 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-praxis-accent/10 blur-[100px] mix-blend-screen pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-accent font-cinematic">
                The Ecosystem
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-display tracking-widest leading-tight">
                PRAXIS CSE-Allied Platform
              </h2>
              <div className="space-y-6 text-white/70 font-cinematic leading-relaxed text-lg">
                <p>
                  PRAXIS emerged from a strategic realization: true engineering excellence demands more than classroom theory. It requires hands-on practice, peer collaboration, public communication, and creative confidence.
                </p>
                <p>
                  Acting as the unifying student club ecosystem for SDES, PRAXIS provides an open runway for ambitious students. By structuring both Technical Guilds (Algorithms, AI, Cloud) and Creative Guilds (Media, Debate, Arts), we provide an all-inclusive platform for student builders, innovators, and leaders to operate autonomously while sharing a unified vision of excellence.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <img 
                src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png" 
                alt="PRAXIS Master Typography" 
                className="w-full max-w-sm object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] translate-x-4" 
              />
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="relative z-20">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/50 font-cinematic">
              Guiding Principles
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "CREATIVITY", desc: "Visual arts, storytelling, and digital cinematography.", color: "text-white" },
              { title: "TECHNOLOGY", desc: "Algorithms, modern cloud stacks, AI, and embedded hardware.", color: "text-praxis-cyan" },
              { title: "COMMUNITY", desc: "Peer mentorship, social outreach, and debate discourse.", color: "text-praxis-accent" },
              { title: "INNOVATION", desc: "Patentable prototypes and competitive hackathon projects.", color: "text-emerald-400" }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="liquid-glass-card p-12 rounded-[2rem] text-center space-y-6 hover:-translate-y-2 transition-transform duration-500"
              >
                <h3 className={`text-xl md:text-2xl font-black font-display tracking-widest ${pillar.color}`}>{pillar.title}</h3>
                <p className="text-sm text-white/60 font-cinematic leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership & Governance */}
        <section className="relative z-20 pt-20 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan font-cinematic">
              Ecosystem Governance
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-display tracking-widest">
              Core Command
            </h2>
            <p className="text-sm md:text-lg text-white/50 font-cinematic tracking-widest leading-loose">
              Experienced faculty steering combined with energetic student chapter presidents and operational coordinators.
            </p>
          </div>

          <LeadershipSection />
        </section>

      </div>
    </div>
  );
};
