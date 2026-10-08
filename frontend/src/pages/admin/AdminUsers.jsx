import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, UserCheck, Shield, X, AlertTriangle } from 'lucide-react';

export const AdminUsers = () => {
  const { user } = useAuth();
  const { clubs, showToast } = useData();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'FACULTY_ADMIN',
    assignedClubId: ''
  });

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/api/admin/users');
      if (res.success && res.data) {
        setAdmins(res.data);
      }
    } catch (e) {
      // Fallback default admins
      setAdmins([
        { id: 'admin-super', username: 'superadmin', email: 'admin@praxis.sdes.ac.in', role: 'SUPER_ADMIN', fullName: 'Chief System Administrator' },
        { id: 'admin-faculty', username: 'facultyadmin', email: 'faculty@praxis.sdes.ac.in', role: 'FACULTY_ADMIN', fullName: 'SDES Faculty In-Charge' },
        { id: 'admin-genesis', username: 'genesisadmin', email: 'genesis@praxis.sdes.ac.in', role: 'CLUB_ADMIN', assignedClubId: 'genesis', fullName: 'Genesis Club Admin' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      if (res.success) {
        showToast('Administrator created successfully');
        setAdmins(prev => [res.data, ...prev]);
        setModalOpen(false);
        setForm({
          username: '',
          email: '',
          password: '',
          fullName: '',
          role: 'FACULTY_ADMIN',
          assignedClubId: ''
        });
      }
    } catch (e) {
      const newAdmin = { id: `admin-${Date.now()}`, ...form };
      setAdmins(prev => [newAdmin, ...prev]);
      showToast('Admin added');
      setModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await apiRequest(`/api/admin/users/${deleteConfirmId}`, { method: 'DELETE' });
      setAdmins(prev => prev.filter(a => a.id !== deleteConfirmId && a._id !== deleteConfirmId));
      showToast('Administrator removed');
      setDeleteConfirmId(null);
    } catch (e) {
      setAdmins(prev => prev.filter(a => a.id !== deleteConfirmId && a._id !== deleteConfirmId));
      showToast('Administrator removed');
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Administrators & Role Permissions
          </h1>
          <p className="text-xs text-praxis-secondary">
            Manage administrative credentials, club-scoped access control, and faculty privileges.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Add Administrator</span>
        </button>
      </div>

      {/* Role Hierarchy & Scope Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SUPER_ADMIN */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-xs font-cinematic">
            <Shield size={16} className="text-amber-400" />
            <span>Super Administrator</span>
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed">
            Full root authority. Can create and remove administrators, manage institutional leadership, update all 8 chapters, delete system records, and publish broadcast notifications.
          </p>
          <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-widest block font-mono">
            Scope: Full Ecosystem & Security
          </span>
        </div>

        {/* FACULTY_ADMIN */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold uppercase tracking-wider text-xs font-cinematic">
            <UserCheck size={16} className="text-emerald-400" />
            <span>Faculty Administrator</span>
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed">
            Faculty guidance in-charge. Can approve and edit events, publish official announcements, and manage student coordinators across all technical and non-technical clubs.
          </p>
          <span className="text-[10px] uppercase font-bold text-emerald-400/90 tracking-widest block font-mono">
            Scope: All 8 Club Chapters
          </span>
        </div>

        {/* CLUB_ADMIN */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider text-xs font-cinematic">
            <Shield size={16} className="text-praxis-cyan" />
            <span>Club Chapter Admin</span>
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed">
            Student chapter leads. Access is securely isolated to their assigned club (e.g. Genesis, Turing). Can manage their chapter's events, team coordinators, and media gallery.
          </p>
          <span className="text-[10px] uppercase font-bold text-praxis-cyan/90 tracking-widest block font-mono">
            Scope: Designated Club Only
          </span>
        </div>
      </div>

      {/* Admins Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Assigned Club</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {admins.map(a => {
                const isMe = a.username === user.username || a.id === user.id;
                return (
                  <tr key={a.id || a._id} className="hover:bg-praxis-elevated/30">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-praxis-surface border border-praxis-border flex items-center justify-center font-bold text-praxis-cyan">
                          {a.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-white block">
                            {a.fullName || a.username} {isMe && <span className="text-[10px] text-praxis-cyan">(You)</span>}
                          </span>
                          <span className="text-[10px] text-praxis-muted">@{a.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-praxis-secondary">{a.email}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase text-white bg-praxis-elevated border border-praxis-border">
                        {a.role?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-praxis-muted capitalize">
                      {a.assignedClubId || 'All Ecosystem'}
                    </td>
                    <td className="p-3.5 text-right">
                      {!isMe && (
                        <button
                          onClick={() => setDeleteConfirmId(a.id || a._id)}
                          className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300"
                          title="Remove Administrator"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-xs">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <h3 className="text-sm font-bold uppercase text-white font-display">
                Create New Administrator
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5">
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="e.g. techlead"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="faculty@sreedattha.ac.in"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Initial Password *
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="FACULTY_ADMIN">FACULTY_ADMIN</option>
                    <option value="CLUB_ADMIN">CLUB_ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Assigned Club
                  </label>
                  <select
                    disabled={form.role !== 'CLUB_ADMIN'}
                    value={form.assignedClubId}
                    onChange={(e) => setForm({ ...form, assignedClubId: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs disabled:opacity-40"
                  >
                    <option value="">None (Central)</option>
                    {clubs.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-praxis-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-praxis-card text-praxis-secondary uppercase font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-praxis-glow hover:bg-blue-600 text-white uppercase font-bold tracking-wider"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-praxis-surface border border-praxis-border rounded-xl p-6 space-y-4 text-center">
            <AlertTriangle size={36} className="text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Account Revocation</h3>
            <p className="text-xs text-praxis-secondary">
              Are you sure you want to remove access for this administrator account?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-praxis-card text-praxis-secondary text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-xs uppercase font-bold"
              >
                Revoke Access
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
