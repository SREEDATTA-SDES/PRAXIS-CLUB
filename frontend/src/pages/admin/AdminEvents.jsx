import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Calendar, MapPin, ExternalLink, X, Save, AlertTriangle } from 'lucide-react';

export const AdminEvents = () => {
  const { events, clubs, addEvent, updateEvent, deleteEvent } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    title: '',
    category: 'TECHNICAL',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'genesis',
    date: new Date().toISOString().split('T')[0],
    venue: 'SDES Campus, Seminar Hall',
    description: '',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    scheduleUrl: '',
    googleFormUrl: '',
    status: 'UPCOMING'
  };

  const [form, setForm] = useState(initialForm);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (evt) => {
    setEditingId(evt.id || evt.slug);
    setForm({
      title: evt.title,
      category: evt.category,
      clubSlug: evt.clubSlug,
      date: evt.date,
      venue: evt.venue,
      description: evt.description,
      posterUrl: evt.posterUrl || '',
      scheduleUrl: evt.scheduleUrl || '',
      googleFormUrl: evt.googleFormUrl || '',
      status: evt.status
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateEvent(editingId, form);
    } else {
      await addEvent(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteEvent(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Filter events viewable for this admin
  const visibleEvents = isClubAdmin
    ? events.filter(e => e.clubSlug === user.assignedClubId)
    : events;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Events & Hackathons Management
          </h1>
          <p className="text-xs text-praxis-secondary">
            Manage registrations (Google Forms), schedule PDFs, timetables, and posters.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Event</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Club</th>
                <th className="p-3.5">Date & Venue</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {visibleEvents.map(evt => {
                const canEdit = canManageClub(evt.clubSlug);
                return (
                  <tr key={evt.id || evt.slug} className="hover:bg-praxis-elevated/30">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.posterUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80'}
                          alt={evt.title}
                          className="w-12 h-12 rounded object-cover border border-praxis-border shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white text-xs block">{evt.title}</span>
                          <span className="text-[10px] text-praxis-muted line-clamp-1">{evt.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold text-praxis-cyan bg-praxis-elevated">
                        {evt.category}
                      </span>
                    </td>
                    <td className="p-3.5 capitalize font-medium text-praxis-secondary">
                      {evt.clubSlug}
                    </td>
                    <td className="p-3.5 text-praxis-muted">
                      <div>{evt.date}</div>
                      <div className="text-[10px] text-praxis-secondary truncate max-w-[150px]">{evt.venue}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        evt.status === 'UPCOMING'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {canEdit ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(evt)}
                            className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white"
                            title="Edit Event"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(evt.id || evt.slug)}
                            className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300"
                            title="Delete Event"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-praxis-muted">View only</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-xs">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <h3 className="text-base font-bold uppercase text-white font-display">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white focus:outline-none focus:border-praxis-cyan text-xs"
                    placeholder="e.g. Algorithmic Grand Prix 2026"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Organizing Club *
                  </label>
                  <select
                    disabled={isClubAdmin}
                    value={form.clubSlug}
                    onChange={(e) => setForm({ ...form, clubSlug: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white focus:outline-none focus:border-praxis-cyan text-xs"
                  >
                    {clubs.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name} ({c.category})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="NON-TECHNICAL">NON-TECHNICAL</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="e.g. SDES Central Auditorium / Advanced Lab 3"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Poster Image URL
                </label>
                <input
                  type="url"
                  value={form.posterUrl}
                  onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Google Form Registration URL
                  </label>
                  <input
                    type="url"
                    value={form.googleFormUrl}
                    onChange={(e) => setForm({ ...form, googleFormUrl: e.target.value })}
                    placeholder="https://forms.gle/..."
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Schedule / Timetable PDF URL
                  </label>
                  <input
                    type="url"
                    value={form.scheduleUrl}
                    onChange={(e) => setForm({ ...form, scheduleUrl: e.target.value })}
                    placeholder="https://.../schedule.pdf"
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Details about challenges, rules, eligibility..."
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
                  className="px-5 py-2 rounded bg-praxis-glow hover:bg-blue-600 text-white uppercase font-bold tracking-wider flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>{editingId ? 'Save Updates' : 'Publish Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-praxis-surface border border-praxis-border rounded-xl p-6 space-y-4 text-center">
            <AlertTriangle size={36} className="text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Deletion</h3>
            <p className="text-xs text-praxis-secondary">
              Are you sure you want to remove this event? This action will permanently remove it from the schedule.
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
