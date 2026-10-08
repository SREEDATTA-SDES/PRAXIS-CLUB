import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { apiRequest } from '../services/api';

/**
 * Cloudinary-powered Image Upload Component
 * Allows uploading directly via file picker, drag & drop, or pasting direct URL.
 * Automatically displays thumbnail preview after upload.
 */
export const ImageUpload = ({
  value,
  onChange,
  label = 'Upload Image',
  folder = 'praxis_sdes',
  className = '',
  placeholder = 'Select an image file or enter URL'
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file is too large (max 10MB).');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result;
        try {
          // Attempt backend upload to Cloudinary
          const res = await apiRequest('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
              image: base64Data,
              folder
            })
          });

          if (res.url) {
            onChange(res.url);
          } else {
            // Fallback to data URL if backend didn't return url
            onChange(base64Data);
          }
        } catch (apiErr) {
          console.warn('Backend Cloudinary upload failed, falling back to data URL:', apiErr);
          onChange(base64Data);
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file.');
        setLoading(false);
      };
    } catch (err) {
      setError(err.message || 'Upload failed');
      setLoading(false);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block uppercase text-praxis-muted font-bold tracking-wider text-[10px]">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'upload' ? 'bg-praxis-glow/20 text-praxis-cyan font-bold' : 'text-praxis-muted hover:text-white'
            }`}
          >
            File Upload
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'url' ? 'bg-praxis-glow/20 text-praxis-cyan font-bold' : 'text-praxis-muted hover:text-white'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            <div className="relative group rounded-xl overflow-hidden border border-praxis-border bg-black/40 flex items-center p-2 gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black/60 border border-white/10">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[11px] text-white font-mono truncate">{value}</p>
                <p className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Check size={10} /> Image Ready
                </p>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => !loading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                loading
                  ? 'border-praxis-cyan/50 bg-praxis-cyan/5 cursor-wait'
                  : 'border-praxis-border hover:border-praxis-glow bg-praxis-card/60 hover:bg-praxis-card'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="text-praxis-cyan animate-spin" />
                  <span className="text-[11px] text-praxis-cyan font-bold tracking-wider uppercase">
                    Uploading to Cloudinary...
                  </span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-praxis-glow/10 text-praxis-cyan flex items-center justify-center">
                    <Upload size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Click to Browse & Upload Image
                    </p>
                    <p className="text-[10px] text-praxis-muted">
                      Supports JPG, PNG, WEBP, SVG up to 10MB
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-praxis-muted" />
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-8 p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs placeholder-praxis-muted focus:outline-none focus:border-praxis-glow"
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-praxis-muted hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {value && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-praxis-border bg-black/40">
              <img
                src={value}
                alt="URL Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-400 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

/**
 * Multi Image Upload Component for Event Recap Photos & Galleries
 */
export const MultiImageUpload = ({
  values = [],
  onChange,
  label = 'Event Recap / Conducted Photos (1-4 Images)',
  folder = 'praxis_events',
  maxImages = 6
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (values.length + files.length > maxImages) {
      setError(`You can upload at most ${maxImages} images.`);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const uploadedUrls = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

        try {
          const res = await apiRequest('/api/upload', {
            method: 'POST',
            body: JSON.stringify({ image: base64Data, folder })
          });
          if (res.url) {
            uploadedUrls.push(res.url);
          } else {
            uploadedUrls.push(base64Data);
          }
        } catch {
          uploadedUrls.push(base64Data);
        }
      }

      onChange([...values, ...uploadedUrls]);
    } catch (err) {
      setError('Failed to upload some images.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove) => {
    onChange(values.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block uppercase text-praxis-muted font-bold tracking-wider text-[10px]">
            {label}
          </label>
          <span className="text-[10px] text-praxis-muted">
            {values.length} / {maxImages}
          </span>
        </div>
      )}

      {/* Grid of existing photos */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {values.map((url, idx) => (
          <div key={idx} className="relative group rounded-lg overflow-hidden border border-praxis-border aspect-video bg-black/60">
            <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {values.length < maxImages && (
          <div
            onClick={() => !loading && fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer aspect-video transition-colors ${
              loading 
                ? 'border-praxis-cyan bg-praxis-cyan/5' 
                : 'border-praxis-border hover:border-praxis-glow bg-praxis-card/40 hover:bg-praxis-card'
            }`}
          >
            {loading ? (
              <Loader2 size={16} className="text-praxis-cyan animate-spin" />
            ) : (
              <>
                <Upload size={14} className="text-praxis-cyan mb-0.5" />
                <span className="text-[9px] text-white/70 font-semibold uppercase tracking-wider">+ Add Image</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
        className="hidden"
      />

      {error && <p className="text-[10px] text-red-400 font-medium">{error}</p>}
    </div>
  );
};
