import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Edit, Save, X, ExternalLink, Shield } from 'lucide-react';

export const AdminClubs = () => {
  const { clubs, updateClub } = useData();
  const { user, canManageClub } = useAuth();
  const [editingClub, setEditingClub] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (c) => {
    setEditingClub(c.slug);
    setForm({
      tagline: c.tagline || '',
      description: c.description || '',
      purpose: c.purpose || '',
      vision: c.vision || '',
      mission: c.mission || '',
      contactEmail: c.contactEmail || ''
    });
  };

  const handleSave = async (slug) => {
    await updateClub(slug, form);
    setEditingClub(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Clubs & Chapters Management
          </h1>
          <p className="text-xs text-praxis-secondary">
            Manage vision, mission, statements, and operational details for the 6 official clubs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map(c => {
          const isAllowed = canManageClub(c.slug);
          const isCurrentEditing = editingClub === c.slug;

          return (
            <div 
              key={c.slug} 
              className={`p-6 rounded-xl bg-praxis-card border transition-all ${
                isAllowed ? 'border-praxis-border hover:border-praxis-border-light' : 'border-praxis-border/40 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 p-1.5 rounded-lg bg-black/40 border border-praxis-border flex items-center justify-center shrink-0">
                    <img src={c.logoUrl} alt={c.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display uppercase">{c.name}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-praxis-cyan">
                      {c.category}
                    </span>
                  </div>
                </div>

                {isAllowed ? (
                  !isCurrentEditing ? (
                    <button
                      onClick={() => startEdit(c)}
                      className="px-3 py-1.5 rounded bg-praxis-elevated hover:bg-praxis-cyan/20 border border-praxis-border text-praxis-cyan text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Edit size={13} /> Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingClub(null)}
                      className="p-1.5 rounded bg-praxis-surface text-praxis-muted hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )
                ) : (
                  <span className="text-[10px] text-praxis-muted uppercase flex items-center gap-1">
                    <Shield size={12} /> Restricted
                  </span>
                )}
              </div>

              {isCurrentEditing ? (
                <div className="space-y-3 text-xs pt-2 border-t border-praxis-border/60">
                  <div>
                    <label className="block text-praxis-muted uppercase tracking-wider font-semibold mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={form.tagline}
                      onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-praxis-muted uppercase tracking-wider font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-praxis-muted uppercase tracking-wider font-semibold mb-1">
                      Purpose
                    </label>
                    <textarea
                      rows={2}
                      value={form.purpose}
                      onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-praxis-muted uppercase tracking-wider font-semibold mb-1">
                        Vision
                      </label>
                      <textarea
                        rows={2}
                        value={form.vision}
                        onChange={(e) => setForm({ ...form, vision: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-praxis-muted uppercase tracking-wider font-semibold mb-1">
                        Mission
                      </label>
                      <textarea
                        rows={2}
                        value={form.mission}
                        onChange={(e) => setForm({ ...form, mission: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingClub(null)}
                      className="px-3 py-1.5 rounded bg-praxis-surface text-praxis-secondary text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(c.slug)}
                      className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-bold flex items-center gap-1"
                    >
                      <Save size={13} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-praxis-secondary">
                  <p className="italic text-praxis-muted">"{c.tagline}"</p>
                  <p className="line-clamp-2">{c.description}</p>
                  <div className="pt-2 border-t border-praxis-border/40 flex items-center justify-between text-[11px] text-praxis-muted">
                    <span>Slug: <code>{c.slug}</code></span>
                    <a href={`/clubs/${c.slug}`} target="_blank" rel="noreferrer" className="text-praxis-cyan hover:underline flex items-center gap-1">
                      Preview <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
