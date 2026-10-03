import React from 'react';
import { ShieldCheck, Award, GraduationCap, Users } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LeadershipSection = ({ filterClubSlug = null }) => {
  const { leadership } = useData();

  // Filter based on context
  const facultyMembers = leadership.filter(l => l.roleType === 'FACULTY_HEAD' || l.roleType === 'FACULTY_COORDINATOR');
  const praxisLeads = leadership.filter(l => l.roleType === 'PRAXIS_LEAD');
  
  const clubLeads = filterClubSlug 
    ? leadership.filter(l => l.clubSlug === filterClubSlug && l.roleType === 'CLUB_LEAD')
    : leadership.filter(l => l.roleType === 'CLUB_LEAD');

  const coordinators = filterClubSlug
    ? leadership.filter(l => l.clubSlug === filterClubSlug && l.roleType === 'COORDINATOR')
    : leadership.filter(l => l.roleType === 'COORDINATOR');

  return (
    <div className="space-y-12">
      
      {/* If global view: Show Institutional Faculty & Student Leads */}
      {!filterClubSlug && (
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-praxis-cyan block mb-1">
              Academic & Advisory Oversight
            </span>
            <h3 className="text-2xl font-bold uppercase text-white font-display">
              Faculty Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facultyMembers.map((fac) => (
              <div 
                key={fac.id || fac._id}
                className="flex items-center gap-5 p-5 rounded-xl bg-praxis-card border border-praxis-border"
              >
                <img
                  src={fac.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={fac.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-praxis-cyan/40 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-praxis-cyan px-2 py-0.5 rounded bg-praxis-elevated">
                    {fac.position}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{fac.name}</h4>
                  <p className="text-xs text-praxis-secondary">{fac.department}</p>
                  {fac.bio && (
                    <p className="text-xs text-praxis-muted mt-2 italic leading-relaxed">
                      "{fac.bio}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Praxis Student Council Leads */}
          {praxisLeads.length > 0 && (
            <div className="pt-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-praxis-accent block mb-3">
                Central Student Steering
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {praxisLeads.map((st) => (
                  <div key={st.id || st._id} className="p-5 rounded-xl bg-praxis-card border border-praxis-border flex items-center gap-4">
                    <img
                      src={st.photoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'}
                      alt={st.name}
                      className="w-14 h-14 rounded-full object-cover border border-praxis-accent shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{st.name}</h4>
                      <p className="text-xs text-praxis-accent font-medium">{st.position}</p>
                      <p className="text-[11px] text-praxis-muted">{st.department} &bull; {st.yearClass}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Club Leader(s) Section */}
      {clubLeads.length > 0 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-praxis-secondary block mb-1">
              Chapter Governance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
              {filterClubSlug ? 'Club Leadership' : 'Club Presidents & Leads'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubLeads.map((lead) => (
              <div
                key={lead.id || lead._id}
                className="group relative p-5 rounded-xl bg-praxis-card border border-praxis-border hover:border-praxis-cyan/50 transition-all flex items-center gap-4"
              >
                <img
                  src={lead.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                  alt={lead.name}
                  className="w-16 h-16 rounded-xl object-cover border border-praxis-border shrink-0 group-hover:border-praxis-cyan/50 transition-colors"
                />
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-praxis-cyan block">
                    {lead.position} {lead.clubSlug && !filterClubSlug ? `(${lead.clubSlug})` : ''}
                  </span>
                  <h4 className="text-base font-bold text-white truncate">{lead.name}</h4>
                  <p className="text-xs text-praxis-secondary truncate">{lead.department}</p>
                  <p className="text-[11px] text-praxis-muted">{lead.yearClass}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Normal Coordinators Section: Minimal Name & Role list */}
      {coordinators.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-praxis-border/50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-praxis-muted block mb-1">
              Core Operations
            </span>
            <h4 className="text-lg font-bold uppercase text-white font-display">
              Coordinators
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {coordinators.map((c) => (
              <div 
                key={c.id || c._id}
                className="p-3 rounded-lg bg-praxis-surface border border-praxis-border/70 flex flex-col justify-center"
              >
                <span className="text-xs font-bold text-white truncate">{c.name}</span>
                <span className="text-[10px] text-praxis-secondary uppercase tracking-wider truncate">
                  {c.position || 'Coordinator'}
                </span>
                {c.clubSlug && !filterClubSlug && (
                  <span className="text-[9px] text-praxis-muted uppercase tracking-widest mt-0.5">
                    {c.clubSlug}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
