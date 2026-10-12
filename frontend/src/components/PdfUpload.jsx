import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, FileText, ExternalLink, Link as LinkIcon, Trash2 } from 'lucide-react';
import { apiRequest } from '../services/api';

/**
 * Cloudinary-powered PDF Upload Component
 * Allows uploading official PDF files or specifying a direct link.
 */
export const PdfUpload = ({
  value,
  onChange,
  label = 'Upload Official PDF Calendar',
  folder = 'praxis_sdes/calendar',
  className = '',
  placeholder = 'Select a PDF document or enter URL'
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setError('Please select a valid PDF document (.pdf).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size too large (maximum 25MB).');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result;
        try {
          const res = await apiRequest('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
              file: base64Data,
              folder
            })
          });

          if (res.url) {
            onChange(res.url);
          } else {
            setError('Upload completed but no URL returned.');
          }
        } catch (uploadErr) {
          setError(uploadErr.message || 'Failed to upload PDF.');
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file.');
        setLoading(false);
      };
    } catch (err) {
      setError(err.message || 'Upload error');
      setLoading(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-praxis-secondary">
          {label}
        </label>
        <div className="flex items-center gap-2 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'upload' ? 'bg-praxis-cyan/20 text-praxis-cyan font-bold' : 'text-praxis-muted hover:text-white'
            }`}
          >
            File Upload (.pdf)
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'url' ? 'bg-praxis-cyan/20 text-praxis-cyan font-bold' : 'text-praxis-muted hover:text-white'
            }`}
          >
            Direct Link
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {!value && (
            <div
              onClick={() => !loading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                loading
                  ? 'border-praxis-cyan/40 bg-praxis-cyan/5 cursor-wait'
                  : 'border-praxis-border hover:border-praxis-cyan hover:bg-praxis-card/80 bg-praxis-card/40'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-praxis-elevated flex items-center justify-center text-praxis-cyan border border-praxis-border">
                  {loading ? <Loader2 size={20} className="animate-spin text-praxis-cyan" /> : <Upload size={20} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {loading ? 'Uploading PDF to Cloud Storage...' : 'Click to select Official PDF Document'}
                  </p>
                  <p className="text-[10px] text-praxis-muted mt-0.5">
                    Supports .pdf files up to 25MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {value && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-praxis-card border border-praxis-border hover:border-praxis-cyan/50 transition-colors">
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    Official Semester Event Calendar.pdf
                  </span>
                  <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-praxis-cyan hover:underline flex items-center gap-1 mt-0.5 truncate"
                  >
                    <span>View / Test Download PDF</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded bg-praxis-elevated hover:bg-praxis-card text-praxis-secondary hover:text-white text-[11px] font-medium transition-colors"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                  title="Remove PDF"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-praxis-muted" />
            <input
              type="url"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://.../Official_Calendar.pdf"
              className="w-full pl-9 pr-3 py-2.5 bg-praxis-card border border-praxis-border rounded-lg text-xs text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan"
            />
          </div>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-praxis-muted hover:text-red-400 transition-colors"
              title="Clear URL"
            >
              <X size={15} />
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1 font-medium">
          <X size={12} className="shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
