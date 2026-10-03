import React from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { LeadershipSection } from '../components/LeadershipSection';
import { Compass, Cpu, Target, Award, Building, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 space-y-20">
      
      {/* Header */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-cyan">
            Institutional Pedigree & Ecosystem
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-wider">
            ABOUT PRAXIS
          </h1>
          <p className="text-sm sm:text-base text-praxis-secondary max-w-3xl mx-auto leading-relaxed">
            The collaborative student canopy of the Department of Computer Science & Engineering (Allied Branches) at Sree Dattha Institute of Engineering & Science.
          </p>
        </div>
      </section>

      {/* Institutional Overview & Praxis Genesis */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* College Overview */}
            <div className="p-8 rounded-2xl glass-panel-elevated border border-praxis-border flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={COLLEGE_BRAND.logoUrl} alt="SDES Logo" className="h-10 w-auto object-contain" />
                  <span className="text-xs uppercase font-bold tracking-widest text-praxis-cyan">
                    The Institution
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white font-display tracking-wide">
                  Sree Dattha Institute of Engineering & Science
                </h3>
                <p className="text-xs sm:text-sm text-praxis-secondary leading-relaxed">
                  Established with a commitment to engineering distinction and academic rigor, Sree Dattha Institute of Engineering & Science (SDES) in Greater Hyderabad is renowned for cultivating tech-ready graduates equipped to solve real-world industrial and societal problems.
                </p>
                <p className="text-xs text-praxis-muted leading-relaxed">
                  With world-class laboratories, an advanced computing center, and dedicated faculty, SDES fosters a high-impact learning culture that champions technical curiosity and multidisciplinary exploration.
                </p>
              </div>

              <div className="pt-4 border-t border-praxis-border/60 text-xs text-praxis-muted">
                Affiliated & Approved &bull; Sheriguda, Ibrahimpatnam, Greater Hyderabad
              </div>
            </div>

            {/* Praxis Mission */}
            <div className="p-8 rounded-2xl glass-panel border border-praxis-border flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={COLLEGE_BRAND.praxisLogoUrl} alt="PRAXIS Logo" className="h-10 w-auto object-contain" />
                  <span className="text-xs uppercase font-bold tracking-widest text-praxis-accent">
                    The Ecosystem
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white font-display tracking-wide">
                  The CSE-Allied Student Platform
                </h3>
                <p className="text-xs sm:text-sm text-praxis-secondary leading-relaxed">
                  PRAXIS emerged from a strategic realization: true engineering excellence demands hands-on practice, peer collaboration, public communication, and creative confidence alongside academic curricula.
                </p>
                <p className="text-xs text-praxis-muted leading-relaxed">
                  By structuring both technical chapters (Genesis, Tech Vertex, Innovex) and non-technical chapters (D-Talks, Visual Vibes, Lakshya), PRAXIS provides an all-inclusive platform for student builders, innovators, speakers, and leaders.
                </p>
              </div>

              <div className="pt-4 border-t border-praxis-border/60 text-xs text-praxis-cyan uppercase tracking-widest font-semibold">
                Autonomous Student Chapters &bull; Unified Institutional Governance
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Ecosystem Pillars */}
      <section className="relative py-8 bg-praxis-navy/30 border-y border-praxis-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-xl glass-panel border border-praxis-border/60 space-y-2">
              <span className="text-xl sm:text-2xl font-black text-white font-display">CREATIVITY</span>
              <p className="text-xs text-praxis-muted">Visual arts, storytelling, and digital cinematography.</p>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-praxis-border/60 space-y-2">
              <span className="text-xl sm:text-2xl font-black text-praxis-cyan font-display">TECHNOLOGY</span>
              <p className="text-xs text-praxis-muted">Algorithms, modern cloud stacks, AI, and embedded hardware.</p>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-praxis-border/60 space-y-2">
              <span className="text-xl sm:text-2xl font-black text-praxis-accent font-display">COMMUNITY</span>
              <p className="text-xs text-praxis-muted">Peer mentorship, social outreach, and debate discourse.</p>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-praxis-border/60 space-y-2">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-display">INNOVATION</span>
              <p className="text-xs text-praxis-muted">Patentable prototypes and competitive hackathon projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Governance Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-praxis-cyan">
              Ecosystem Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display">
              Leadership & Coordination
            </h2>
            <p className="text-xs sm:text-sm text-praxis-secondary">
              Experienced faculty steering combined with energetic student chapter presidents and operational coordinators.
            </p>
          </div>

          <LeadershipSection />
        </div>
      </section>

    </div>
  );
};
