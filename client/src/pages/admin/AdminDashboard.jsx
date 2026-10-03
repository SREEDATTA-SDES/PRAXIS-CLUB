import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  Image as ImageIcon, 
  Bell, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = () => {
  const { clubs, events, gallery, announcements } = useData();
  const { user, isClubAdmin } = useAuth();

  const technicalCount = clubs.filter(c => c.category === 'TECHNICAL').length;
  const nonTechCount = clubs.filter(c => c.category === 'NON-TECHNICAL').length;
  const upcomingCount = events.filter(e => e.status === 'UPCOMING').length;
  const completedCount = events.filter(e => e.status === 'COMPLETED').length;

  const stats = [
    { label: 'Total Clubs', value: clubs.length, sub: `${technicalCount} Tech / ${nonTechCount} Non-Tech`, icon: Compass, color: 'text-praxis-cyan' },
    { label: 'Upcoming Events', value: upcomingCount, sub: `${completedCount} completed`, icon: Calendar, color: 'text-praxis-accent' },
    { label: 'Gallery Archive', value: gallery.length, sub: 'Archived photos', icon: ImageIcon, color: 'text-emerald-400' },
    { label: 'Announcements', value: announcements.length, sub: 'Official bulletins', icon: Bell, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-praxis-card border border-praxis-border">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-praxis-cyan block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="text-2xl font-bold uppercase text-white font-display">
            Welcome back, {user?.fullName || user?.username}
          </h1>
          <p className="text-xs text-praxis-secondary mt-1">
            Role: <strong className="text-white">{user?.role?.replace('_', ' ')}</strong>
            {isClubAdmin && (
              <span> &bull; Chapter: <strong className="capitalize text-praxis-cyan">{user?.assignedClubId}</strong></span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/events"
            className="px-4 py-2 rounded-lg bg-praxis-glow hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} />
            <span>New Event</span>
          </Link>
          <Link
            to="/admin/gallery"
            className="px-4 py-2 rounded-lg bg-praxis-elevated hover:bg-praxis-card border border-praxis-border text-praxis-text text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} />
            <span>Add Photo</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-5 rounded-xl bg-praxis-card border border-praxis-border flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-praxis-muted font-semibold block mb-1">
                  {s.label}
                </span>
                <span className="text-3xl font-black text-white font-display">
                  {s.value}
                </span>
                <span className="text-[10px] text-praxis-secondary block mt-1">
                  {s.sub}
                </span>
              </div>
              <div className={`p-3 rounded-lg bg-praxis-surface ${s.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Events & Rapid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Events Table (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-praxis-card border border-praxis-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-white font-display tracking-wider">
              Recent Events In Database
            </h3>
            <Link to="/admin/events" className="text-xs text-praxis-cyan hover:underline uppercase tracking-wider">
              Manage All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-praxis-border/60 text-praxis-muted uppercase tracking-wider">
                  <th className="pb-2">Title</th>
                  <th className="pb-2">Club</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-praxis-border/40">
                {events.slice(0, 5).map(e => (
                  <tr key={e.id || e.slug} className="hover:bg-praxis-elevated/40">
                    <td className="py-2.5 font-medium text-white max-w-[200px] truncate">{e.title}</td>
                    <td className="py-2.5 text-praxis-secondary capitalize">{e.clubSlug}</td>
                    <td className="py-2.5 text-praxis-muted">{e.date}</td>
                    <td className="py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        e.status === 'UPCOMING' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Chapters Status (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-praxis-card border border-praxis-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-white font-display tracking-wider">
              Active Chapters
            </h3>
            <Link to="/admin/clubs" className="text-xs text-praxis-cyan hover:underline uppercase tracking-wider">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {clubs.map(c => (
              <div key={c.slug} className="p-2.5 rounded-lg bg-praxis-surface border border-praxis-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={c.logoUrl} alt={c.name} className="w-6 h-6 object-contain" />
                  <div>
                    <span className="text-xs font-bold text-white block">{c.name}</span>
                    <span className="text-[9px] text-praxis-muted uppercase tracking-wider">{c.category}</span>
                  </div>
                </div>
                <Link
                  to={`/clubs/${c.slug}`}
                  target="_blank"
                  className="text-praxis-muted hover:text-white"
                  title="View Public Page"
                >
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
