import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Tag, Calendar, ExternalLink, ZoomIn, ZoomOut, RotateCcw, 
  Download, Maximize2, Sparkles, Image as ImageIcon, Layers 
} from 'lucide-react';

export const LightboxModal = ({ item, onClose }) => {
  const [scale, setScale] = useState(1);
  const [showInfo, setShowInfo] = useState(true);

  // Reset zoom on item change
  useEffect(() => {
    setScale(1);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setScale(1);

  const handleDownload = async () => {
    try {
      const response = await fetch(item.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PRAXIS_${item.title ? item.title.replace(/\s+/g, '_') : 'image'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(item.imageUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl select-none"
        onClick={onClose}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-praxis-glow/15 blur-[120px] pointer-events-none" />

        {/* Floating Top Control Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 sm:top-6 left-4 right-4 sm:left-8 sm:right-8 flex items-center justify-between z-30 pointer-events-none"
        >
          {/* Item Origin / Badge */}
          <div className="flex items-center gap-2 pointer-events-auto liquid-glass px-4 py-2 rounded-full border border-white/15">
            <Sparkles size={14} className="text-praxis-cyan animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-white/90 font-cinematic">
              {item.clubSlug ? `${item.clubSlug} Archive` : 'PRAXIS Visual Repository'}
            </span>
          </div>

          {/* Floating Action Controls Dock */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto liquid-glass-elevated p-1.5 rounded-full border border-white/20 shadow-2xl backdrop-blur-xl">
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
              className="w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
              title="Zoom Out (-)"
            >
              <ZoomOut size={16} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
              className="px-2.5 h-9 rounded-full text-[10px] font-mono text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
              title="Reset Zoom (0)"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
              className="w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
              title="Zoom In (+)"
            >
              <ZoomIn size={16} />
            </button>

            <div className="w-[1px] h-5 bg-white/20 mx-1" />

            <button
              onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                showInfo ? 'text-praxis-cyan bg-praxis-cyan/15 border border-praxis-cyan/40' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Details"
            >
              <Layers size={16} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleDownload(); }}
              className="w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
              title="Download HD Photo"
            >
              <Download size={16} />
            </button>

            <a
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
              title="Open Full Resolution"
            >
              <ExternalLink size={16} />
            </a>

            <div className="w-[1px] h-5 bg-white/20 mx-1" />

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white flex items-center justify-center transition-all border border-rose-500/30"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>

        {/* Main Canvas & Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative max-w-6xl w-full max-h-[88vh] rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col md:flex-row bg-[#080D16]/90 backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Stage Container */}
          <div className={`relative flex-1 bg-black/70 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[480px] max-h-[75vh] md:max-h-[85vh] p-4 sm:p-8 cursor-grab active:cursor-grabbing transition-all duration-300`}>
            {/* Subtle Viewport Grid Backing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0,transparent_70%)] pointer-events-none" />

            <motion.img
              src={item.imageUrl}
              alt={item.title || 'PRAXIS Media Archive'}
              style={{ scale }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform"
            />
          </div>

          {/* Collapsible / Floating Information Sidebar */}
          {showInfo && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full md:w-80 lg:w-96 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t md:border-t-0 md:border-l border-white/10 bg-[#070A11]/95 shrink-0 overflow-y-auto max-h-[40vh] md:max-h-[85vh]"
            >
              <div className="space-y-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] uppercase font-bold tracking-[0.25em] px-3 py-1 rounded-full bg-praxis-cyan/15 text-praxis-cyan border border-praxis-cyan/30">
                    {item.category || 'EXHIBITION'}
                  </span>
                  {item.albumName && (
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10">
                      {item.albumName}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wider leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Caption / Description */}
                {item.caption && (
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-cinematic border-l-2 border-praxis-cyan/50 pl-3">
                    {item.caption}
                  </p>
                )}

                {/* Structured Metadata */}
                <div className="space-y-2.5 text-xs text-white/60 pt-4 border-t border-white/10 font-cinematic">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px]">
                      <Tag size={12} className="text-praxis-cyan" /> Chapter
                    </span>
                    <span className="text-white font-semibold uppercase tracking-wider">
                      {item.clubSlug || 'PRAXIS Core'}
                    </span>
                  </div>

                  {item.date && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px]">
                        <Calendar size={12} className="text-praxis-accent" /> Date Captured
                      </span>
                      <span className="text-white font-semibold">{item.date}</span>
                    </div>
                  )}

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1.5">Tags</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action */}
              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-praxis-cyan hover:text-praxis-bg border border-white/15 hover:border-praxis-cyan text-white text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Download size={14} />
                <span>Save High-Res Media</span>
              </button>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
