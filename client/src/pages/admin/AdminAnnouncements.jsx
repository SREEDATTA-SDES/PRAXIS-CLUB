import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, Bell, Pin, X, AlertTriangle } from 'lucide-react';

export const AdminAnnouncements = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    title: '',
    content: '',
    category: 'GENERAL',
    linkUrl: '',
    linkText: 'View Link',
    isPinned: false
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
      title: item.title,
      content: item.content,
      category: item.category,
      linkUrl: item.linkUrl || '',
      linkText: item.linkText || 'View Details',
      isPinned: !!item.isPinned
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateAnnouncement(editingId, form);
    } else {
      await addAnnouncement(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteAnnouncement(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Announcements & Bulletins
          </h1>
          <p className="text-xs text-praxis-secondary">
            Publish official department circulars, timetable updates, and recruitment calls.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Pinned</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {announcements.map(a => (
                <tr key={a.id || a._id} className="hover:bg-praxis-elevated/30">
                  <td className="p-3.5">
                    <span className="font-bold text-white block">{a.title}</span>
                    <span className="text-[11px] text-praxis-secondary line-clamp-1">{a.content}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase text-praxis-cyan bg-praxis-elevated">
                      {a.category}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {a.isPinned ? (
                      <span className="text-[10px] text-praxis-cyan font-bold uppercase flex items-center gap-1">
                        <Pin size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-[10px] text-praxis-muted">No</span>
                    )}
                  </td>
                  <td className="p-3.5 text-praxis-muted">{a.date}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(a)}
                        className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(a.id || a._id)}
                        className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Schedule for Annual Tech Symposium Released"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    <option value="GENERAL">GENERAL</option>
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="NON-TECHNICAL">NON-TECHNICAL</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="pinned"
                    checked={form.isPinned}
                    onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                    className="rounded border-praxis-border text-praxis-cyan focus:ring-0"
                  />
                  <label htmlFor="pinned" className="uppercase text-praxis-secondary font-bold tracking-wider text-[11px] cursor-pointer">
                    Pin Announcement
                  </label>
                </div>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Content / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Detailed circular text..."
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Action Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.linkUrl}
                    onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                    placeholder="/events or external URL"
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Link Button Text
                  </label>
                  <input
                    type="text"
                    value={form.linkText}
                    onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                    placeholder="e.g. View Schedule"
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  />
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
                  {editingId ? 'Save Updates' : 'Publish Circular'}
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
              Are you sure you want to remove this announcement bulletin?
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
                Delete Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
