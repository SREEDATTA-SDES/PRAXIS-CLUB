import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle } from 'lucide-react';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    name: '',
    roleType: isClubAdmin ? 'COORDINATOR' : 'CLUB_LEAD',
    position: 'Technical Coordinator',
    department: 'CSE-Allied',
    yearClass: 'Third Year',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'genesis',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: ''
  };

  const [form, setForm] = useState(initialForm);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id || item._id);
    setForm({
      name: item.name,
      roleType: item.roleType,
      position: item.position,
      department: item.department || 'CSE-Allied',
      yearClass: item.yearClass || '',
      clubSlug: item.clubSlug || (isClubAdmin ? user.assignedClubId : 'genesis'),
      photoUrl: item.photoUrl || '',
      bio: item.bio || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateLeader(editingId, form);
    } else {
      await addLeader(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteLeader(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const visibleLeadership = isClubAdmin
    ? leadership.filter(l => l.clubSlug === user.assignedClubId)
    : leadership;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Leadership & Coordinators
          </h1>
          <p className="text-xs text-praxis-secondary">
            Manage faculty advisors, student chapter heads, and operational coordinators.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Add Member / Lead</span>
        </button>
      </div>

      {/* Leadership Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Role Type</th>
                <th className="p-3.5">Position</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Club</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {visibleLeadership.map(item => {
                const canEdit = !item.clubSlug || canManageClub(item.clubSlug);
                return (
                  <tr key={item.id || item._id} className="hover:bg-praxis-elevated/30">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        {item.photoUrl ? (
                          <img
                            src={item.photoUrl}
                            alt={item.name}
                            className="w-9 h-9 rounded-full object-cover border border-praxis-border"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-praxis-elevated flex items-center justify-center text-praxis-cyan font-bold">
                            {item.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-praxis-muted">{item.yearClass || 'Coordinator'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase text-praxis-cyan bg-praxis-elevated">
                        {item.roleType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-praxis-secondary font-medium">
                      {item.position}
                    </td>
                    <td className="p-3.5 text-praxis-muted">
                      {item.department}
                    </td>
                    <td className="p-3.5 capitalize font-medium text-praxis-secondary">
                      {item.clubSlug || 'Central SDES'}
                    </td>
                    <td className="p-3.5 text-right">
                      {canEdit ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id || item._id)}
                            className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-praxis-muted">Restricted</span>
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
          <div className="w-full max-w-lg bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-xs">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <h3 className="text-sm font-bold uppercase text-white font-display">
                {editingId ? 'Edit Leadership Member' : 'Add Leadership Member'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Role Type
                  </label>
                  <select
                    value={form.roleType}
                    onChange={(e) => setForm({ ...form, roleType: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    {!isClubAdmin && <option value="FACULTY_HEAD">FACULTY_HEAD</option>}
                    {!isClubAdmin && <option value="FACULTY_COORDINATOR">FACULTY_COORDINATOR</option>}
                    {!isClubAdmin && <option value="PRAXIS_LEAD">PRAXIS_LEAD</option>}
                    <option value="CLUB_LEAD">CLUB_LEAD</option>
                    <option value="COORDINATOR">COORDINATOR</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Club Chapter
                  </label>
                  <select
                    disabled={isClubAdmin}
                    value={form.clubSlug || ''}
                    onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    {!isClubAdmin && <option value="">Institutional / Central</option>}
                    {clubs.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    placeholder="e.g. Lead Coordinator / President"
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Year / Class
                  </label>
                  <input
                    type="text"
                    value={form.yearClass}
                    onChange={(e) => setForm({ ...form, yearClass: e.target.value })}
                    placeholder="e.g. Final Year / Third Year"
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="CSE (AI & ML) / Data Science"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
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
                  Save Member
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
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Removal</h3>
            <p className="text-xs text-praxis-secondary">
              Are you sure you want to remove this coordinator from the roster?
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
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
