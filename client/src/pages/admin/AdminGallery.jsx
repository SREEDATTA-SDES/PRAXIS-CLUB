import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Image as ImageIcon, X, AlertTriangle, ExternalLink } from 'lucide-react';

export const AdminGallery = () => {
  const { gallery, clubs, addGalleryItem, deleteGalleryItem } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    caption: '',
    category: 'TECHNICAL',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'genesis',
    albumName: 'Hackathons'
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      alert('Title and Image URL are required.');
      return;
    }
    await addGalleryItem(form);
    setModalOpen(false);
    setForm({
      title: '',
      imageUrl: '',
      caption: '',
      category: 'TECHNICAL',
      clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'genesis',
      albumName: 'Hackathons'
    });
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteGalleryItem(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const visibleGallery = isClubAdmin
    ? gallery.filter(g => g.clubSlug === user.assignedClubId)
    : gallery;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Media Gallery Management
          </h1>
          <p className="text-xs text-praxis-secondary">
            Upload and organize albums, competition moments, and activity captures.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Upload / Add Photo</span>
        </button>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleGallery.map(img => {
          const canDelete = canManageClub(img.clubSlug);
          return (
            <div key={img.id || img._id} className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden flex flex-col justify-between group">
              <div className="relative h-44 w-full bg-black/50">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-praxis-cyan">
                  {img.albumName || img.category}
                </span>
                <span className="absolute bottom-2 right-2 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-praxis-secondary capitalize">
                  {img.clubSlug}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-white truncate">{img.title}</h4>
                {img.caption && (
                  <p className="text-[11px] text-praxis-muted line-clamp-2">{img.caption}</p>
                )}

                <div className="pt-2 border-t border-praxis-border/50 flex items-center justify-between text-[10px] text-praxis-muted">
                  <span>{img.date || 'Recent'}</span>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteConfirmId(img.id || img._id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-xs">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <h3 className="text-sm font-bold uppercase text-white font-display">
                Add Image to Gallery Archive
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5">
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Code Sprint Finalists"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Image URL (Direct or Cloudinary) *
                </label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Club Chapter
                  </label>
                  <select
                    disabled={isClubAdmin}
                    value={form.clubSlug}
                    onChange={(e) => setForm({ ...form, clubSlug: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    {clubs.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

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
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Album Name
                </label>
                <input
                  type="text"
                  value={form.albumName}
                  onChange={(e) => setForm({ ...form, albumName: e.target.value })}
                  placeholder="Hackathons / Workshops / Competitions / Outreach"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Brief descriptive note of the occasion..."
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
                  Add Image
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
              Are you sure you want to permanently remove this photo from the public gallery?
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
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
