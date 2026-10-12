import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Image as ImageIcon, X, AlertTriangle, ExternalLink, Folder, FolderOpen, Layers, LayoutGrid } from 'lucide-react';
import { ImageUpload, MultiImageUpload } from '../../components/ImageUpload';

export const AdminGallery = () => {
  const { gallery, clubs, addGalleryItem, deleteGalleryItem } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [uploadMode, setUploadMode] = useState('multi'); // 'single' | 'multi'
  const [multiPhotos, setMultiPhotos] = useState([]);
  const [adminViewMode, setAdminViewMode] = useState('folders'); // 'folders' | 'grid'
  const [selectedAdminAlbum, setSelectedAdminAlbum] = useState(null);

  const initialForm = {
    title: '',
    imageUrl: '',
    caption: '',
    category: 'NONE',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'others',
    albumName: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [form, setForm] = useState(initialForm);

  const albumCloudinaryFolder = `praxis_sdes/gallery/${(form.albumName || 'general').toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title) {
      alert('Title is required.');
      return;
    }

    if (uploadMode === 'single') {
      if (!form.imageUrl) {
        alert('Please provide an image.');
        return;
      }
      const result = await addGalleryItem({
        ...form,
        order: 1,
        date: form.date || new Date().toISOString().split('T')[0]
      });
      if (result?.success) {
        setModalOpen(false);
        setForm(initialForm);
      }
    } else {
      if (!multiPhotos.length && !form.imageUrl) {
        alert('Please upload at least one photo.');
        return;
      }

      const allUrls = multiPhotos.length > 0 ? multiPhotos : [form.imageUrl];
      for (let i = 0; i < allUrls.length; i++) {
        await addGalleryItem({
          ...form,
          title: allUrls.length > 1 ? `${form.title} (Photo ${i + 1})` : form.title,
          imageUrl: allUrls[i],
          order: i + 1,
          date: form.date || new Date().toISOString().split('T')[0]
        });
      }
      setModalOpen(false);
      setForm(initialForm);
      setMultiPhotos([]);
    }
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

  // Group by album / folder
  const groupedAlbums = visibleGallery.reduce((acc, item) => {
    const key = (item.albumName || 'General Media').trim();
    if (!acc[key]) {
      acc[key] = {
        name: key,
        category: item.category,
        clubSlug: item.clubSlug,
        date: item.date,
        items: []
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  const albumList = Object.values(groupedAlbums);
  // Sort items within each album by order ascending so Photo 1 is first
  albumList.forEach(album => {
    album.items.sort((a, b) => {
      const orderA = a.order !== undefined && a.order !== null ? a.order : 9999;
      const orderB = b.order !== undefined && b.order !== null ? b.order : 9999;
      if (orderA !== orderB) return orderA - orderB;
      return (a.title || '').localeCompare(b.title || '');
    });
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider flex items-center gap-2.5">
            <Folder className="text-praxis-cyan" size={24} /> Media Gallery & Album Folders ({visibleGallery.length} Photos)
          </h1>
          <p className="text-xs text-praxis-secondary mt-1">
            Organize albums (e.g. Establishing PRAXIS, Hackathons), multi-photo uploads, and chapter activity archives.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-praxis-card border border-praxis-border rounded-xl">
            <button
              onClick={() => { setAdminViewMode('folders'); setSelectedAdminAlbum(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                adminViewMode === 'folders' ? 'bg-praxis-cyan/20 text-praxis-cyan border border-praxis-cyan/50' : 'text-praxis-muted hover:text-white'
              }`}
            >
              <Folder size={13} /> Folders ({albumList.length})
            </button>
            <button
              onClick={() => { setAdminViewMode('grid'); setSelectedAdminAlbum(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                adminViewMode === 'grid' ? 'bg-praxis-cyan/20 text-praxis-cyan border border-praxis-cyan/50' : 'text-praxis-muted hover:text-white'
              }`}
            >
              <LayoutGrid size={13} /> All Photos
            </button>
          </div>

          <button
            onClick={() => { setModalOpen(true); setMultiPhotos([]); }}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
          >
            <Plus size={15} />
            <span>Upload / Add To Album</span>
          </button>
        </div>
      </div>

      {/* Admin View Mode 1: Folders / Albums View */}
      {adminViewMode === 'folders' && !selectedAdminAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {albumList.map(album => {
            const cover = album.items[0]?.imageUrl;
            return (
              <div
                key={album.name}
                onClick={() => setSelectedAdminAlbum(album)}
                className="group cursor-pointer rounded-2xl bg-praxis-card border border-praxis-border overflow-hidden hover:border-praxis-cyan transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-44 w-full bg-black/60 overflow-hidden">
                  <img
                    src={cover}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-praxis-cyan border border-white/10 flex items-center gap-1 font-mono">
                    <Folder size={11} /> {album.items.length} Photos
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-black/70 text-white/70">
                    {album.clubSlug}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate group-hover:text-praxis-cyan transition-colors">
                      {album.name}
                    </h4>
                    <p className="text-[10px] text-praxis-muted capitalize">{album.category} • Click to manage</p>
                  </div>
                  <FolderOpen size={16} className="text-praxis-cyan shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Admin View Mode 1b: Insides of Selected Folder */}
      {adminViewMode === 'folders' && selectedAdminAlbum && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-praxis-card p-4 rounded-xl border border-praxis-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedAdminAlbum(null)}
                className="px-3 py-1.5 rounded-lg bg-praxis-elevated hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                ← All Folders
              </button>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FolderOpen size={16} className="text-praxis-cyan" /> {selectedAdminAlbum.name} ({selectedAdminAlbum.items.length} Photos)
                </h3>
              </div>
            </div>
            <button
              onClick={() => {
                setForm({ ...initialForm, albumName: selectedAdminAlbum.name, clubSlug: selectedAdminAlbum.clubSlug, category: selectedAdminAlbum.category });
                setModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-praxis-cyan/20 border border-praxis-cyan/40 text-praxis-cyan text-xs font-bold uppercase tracking-wider hover:bg-praxis-cyan hover:text-black transition-all"
            >
              + Add Photos to this Folder
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {selectedAdminAlbum.items.map(img => {
              const canDelete = canManageClub(img.clubSlug);
              return (
                <div key={img.id || img._id} className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-44 w-full bg-black/50">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-xs font-bold text-white truncate">{img.title}</h4>
                    {img.caption && <p className="text-[10px] text-praxis-muted line-clamp-1">{img.caption}</p>}
                    <div className="pt-2 border-t border-praxis-border/50 flex items-center justify-between text-[10px] text-praxis-muted">
                      <span>{img.date || 'Recent'}</span>
                      {canDelete && (
                        <button onClick={() => setDeleteConfirmId(img.id || img._id)} className="text-red-400 hover:text-red-300 flex items-center gap-1">
                          <Trash2 size={12} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Admin View Mode 2: All Photos Grid */}
      {adminViewMode === 'grid' && (
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
      )}

      {/* Add / Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-praxis-surface border border-praxis-border rounded-xl shadow-2xl overflow-hidden text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <h3 className="text-sm font-bold uppercase text-white font-display flex items-center gap-2">
                <Folder size={16} className="text-praxis-cyan" /> Add Photos to Album / Folder
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4 overflow-y-auto">
              
              {/* Album / Folder Name */}
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Folder / Album Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.albumName}
                  onChange={(e) => setForm({ ...form, albumName: e.target.value })}
                  placeholder="e.g. Establishing PRAXIS / Hackathons / Cultural Eve"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs font-semibold"
                />
                <span className="text-[10px] text-praxis-cyan mt-1 block font-mono">
                  Cloudinary Folder: {albumCloudinaryFolder}
                </span>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Occasion / Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Establishing PRAXIS Ceremony Moments"
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                />
              </div>

              {/* Upload Mode Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider text-[10px]">
                    Photo Upload Mode
                  </label>
                  <div className="flex items-center gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setUploadMode('multi')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        uploadMode === 'multi' ? 'bg-praxis-cyan/20 text-praxis-cyan font-bold' : 'text-praxis-muted'
                      }`}
                    >
                      Multi-Photo Album (1-6 Photos)
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                      type="button"
                      onClick={() => setUploadMode('single')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        uploadMode === 'single' ? 'bg-praxis-cyan/20 text-praxis-cyan font-bold' : 'text-praxis-muted'
                      }`}
                    >
                      Single Photo / URL
                    </button>
                  </div>
                </div>

                {uploadMode === 'multi' ? (
                  <MultiImageUpload
                    values={multiPhotos}
                    onChange={(urls) => setMultiPhotos(urls)}
                    label="Upload Album Photos (Select multiple files)"
                    folder={albumCloudinaryFolder}
                    maxImages={8}
                  />
                ) : (
                  <ImageUpload
                    value={form.imageUrl}
                    onChange={(url) => setForm({ ...form, imageUrl: url })}
                    label="Photo Upload"
                    folder={albumCloudinaryFolder}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Club Chapter / Origin
                  </label>
                  <select
                    disabled={isClubAdmin}
                    value={form.clubSlug}
                    onChange={(e) => setForm({ ...form, clubSlug: e.target.value })}
                    className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                  >
                    <option value="others">Others / Establishment</option>
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
                    <option value="NONE">NONE (Institutional / General)</option>
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="NON-TECHNICAL">NON-TECHNICAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Event / Capture Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-2.5 rounded bg-praxis-card border border-praxis-border text-white text-xs font-mono"
                />
                <span className="text-[10px] text-praxis-muted mt-1 block">
                  Defaults to current date. Change this if uploading photos for past events (e.g. Establishment Day).
                </span>
              </div>

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Caption / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Descriptive details of this event moment..."
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
                  Save to Album
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