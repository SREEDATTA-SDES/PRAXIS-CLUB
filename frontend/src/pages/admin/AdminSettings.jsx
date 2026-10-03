import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Settings, MapPin, Mail, Phone, Globe, Shield } from 'lucide-react';

export const AdminSettings = () => {
  const { settings, updateSettings, showToast } = useData();
  const [form, setForm] = useState({
    collegeName: settings.collegeName || '',
    collegeWebsiteUrl: settings.collegeWebsiteUrl || '',
    praxisTagline: settings.praxisTagline || '',
    address: settings.address || '',
    officialEmail: settings.officialEmail || '',
    officialPhone: settings.officialPhone || '',
    instagramUrl: settings.instagramUrl || '',
    facebookUrl: settings.facebookUrl || '',
    whatsappUrl: settings.whatsappUrl || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSettings(form);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
          Platform & Institution Configuration
        </h1>
        <p className="text-xs text-praxis-secondary">
          Configure official contact information, social links, and institutional attributes.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-praxis-card border border-praxis-border">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-praxis-cyan pb-2 border-b border-praxis-border">
              Institutional Master Brand
            </h3>

            <div>
              <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                College Official Name
              </label>
              <input
                type="text"
                value={form.collegeName}
                onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
                className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                Official College Website URL
              </label>
              <input
                type="url"
                value={form.collegeWebsiteUrl}
                onChange={(e) => setForm({ ...form, collegeWebsiteUrl: e.target.value })}
                className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                PRAXIS Tagline / Manifesto Statement
              </label>
              <input
                type="text"
                value={form.praxisTagline}
                onChange={(e) => setForm({ ...form, praxisTagline: e.target.value })}
                className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-praxis-accent pb-2 border-b border-praxis-border">
              Contact & Location
            </h3>

            <div>
              <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                Campus Physical Address
              </label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={form.officialEmail}
                  onChange={(e) => setForm({ ...form, officialEmail: e.target.value })}
                  className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                  Official Phone Contact
                </label>
                <input
                  type="text"
                  value={form.officialPhone}
                  onChange={(e) => setForm({ ...form, officialPhone: e.target.value })}
                  className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-praxis-border">
              Social Media Handles (Instagram, Facebook, WhatsApp)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                  Instagram Handle URL
                </label>
                <input
                  type="url"
                  value={form.instagramUrl}
                  onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={form.facebookUrl}
                  onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-praxis-muted uppercase font-bold tracking-wider mb-1">
                  WhatsApp Community URL
                </label>
                <input
                  type="url"
                  value={form.whatsappUrl}
                  onChange={(e) => setForm({ ...form, whatsappUrl: e.target.value })}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full p-2.5 rounded bg-praxis-surface border border-praxis-border text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-praxis-border flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white uppercase font-bold tracking-[0.2em] shadow-cinematic-blue transition-all flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>Save Institutional Settings</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
