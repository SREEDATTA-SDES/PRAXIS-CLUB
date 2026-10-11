import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  Calendar, 
  Image as ImageIcon, 
  Bell, 
  Users, 
  UserCheck, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_BRAND } from '../../data/initialData';

export const AdminLayout = () => {
  const { user, logout, isSuperAdmin, isFacultyAdmin, isClubAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Navigation items (removed Administrators as requested)
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, show: true },
    { name: 'Clubs', path: '/admin/clubs', icon: Compass, show: true },
    { name: 'Events', path: '/admin/events', icon: Calendar, show: true },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon, show: true },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell, show: true },
    { name: 'Leadership', path: '/admin/leadership', icon: Users, show: true },
    { name: 'Settings', path: '/admin/settings', icon: Settings, show: true }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-praxis-bg text-praxis-text flex flex-col md:flex-row antialiased">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-praxis-surface border-b border-praxis-border shrink-0">
        <div className="flex items-center gap-2">
          <img src={COLLEGE_BRAND.praxisLogoUrl} alt="PRAXIS" className="h-7 w-auto" />
          <span className="text-xs font-bold text-white uppercase font-cinematic">Admin Console</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-praxis-secondary hover:text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Admin Sidebar Navigation - CONSTANT viewport height, never stretches */}
      <aside 
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 h-full shrink-0 bg-praxis-surface border-r border-praxis-border flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-praxis-border">
            <img src={COLLEGE_BRAND.praxisLogoUrl} alt="PRAXIS" className="h-8 w-auto object-contain" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase font-cinematic">PRAXIS CONSOLE</h2>
              <span className="text-[10px] text-praxis-muted uppercase tracking-wider block">
                SDES CSE-Allied
              </span>
            </div>
          </div>

          {/* User Profile Mini Bar - Clean ID only without administrator / superadmin text */}
          <div className="p-2.5 rounded-lg bg-praxis-card border border-praxis-border/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono truncate">praxis_admin</span>
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                Active
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.filter(item => item.show).map(item => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    active
                      ? 'bg-praxis-glow text-white shadow-md font-semibold'
                      : 'text-praxis-secondary hover:text-white hover:bg-praxis-elevated'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Anchored at the bottom of the sidebar */}
        <div className="p-5 border-t border-praxis-border space-y-2 shrink-0 bg-praxis-surface">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-praxis-muted hover:text-white hover:bg-praxis-card transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Independently scrollable, never affects sidebar height */}
      <main className="flex-1 h-full overflow-y-auto bg-praxis-bg p-4 sm:p-8">
        <Outlet />
      </main>

    </div>
  );
};
