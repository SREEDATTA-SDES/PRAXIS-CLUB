import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { 
  Maximize2, Filter, Folder, FolderOpen, ArrowLeft, Play, 
  Sparkles, Image as ImageIcon, LayoutGrid, Calendar, Tag, ChevronRight 
} from 'lucide-react';

export const GalleryPage = ({ onOpenLightbox }) => {
  const { gallery, clubs } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('folders'); // 'folders' | 'all'
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Filter raw gallery items
  const filteredGallery = useMemo(() => {
    return gallery.filter(item => {
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
      if (clubFilter === 'others') {
        if (item.clubSlug !== 'others' && item.clubSlug !== 'general' && item.clubSlug !== 'establishment' && item.clubSlug !== 'praxis') {
          return false;
        }
      } else if (clubFilter !== 'ALL' && item.clubSlug !== clubFilter) {
        return false;
      }
      return true;
    });
  }, [gallery, categoryFilter, clubFilter]);

  // Group filtered gallery items into folders / albums
  const albums = useMemo(() => {
    const groups = {};

    filteredGallery.forEach(item => {
      const albumKey = (item.albumName || 'General Media').trim();
      if (!groups[albumKey]) {
        groups[albumKey] = {
          name: albumKey,
          category: item.category || 'NONE',
          clubSlug: item.clubSlug || 'praxis',
          date: item.date || 'Recent',
          caption: item.caption || '',
          coverImage: item.imageUrl,
          items: []
        };
      }

      // If the item itself contains an array of photos
      if (Array.isArray(item.photos) && item.photos.length > 0) {
        item.photos.forEach((photoUrl, pIdx) => {
          groups[albumKey].items.push({
            ...item,
            id: `${item.id || item._id}_${pIdx}`,
            imageUrl: photoUrl,
            order: item.order !== undefined && item.order !== null ? item.order : (pIdx + 1),
            title: `${item.title} (${pIdx + 1}/${item.photos.length})`
          });
        });
      } else {
        groups[albumKey].items.push(item);
      }
    });

    const albumList = Object.values(groups);
    // Sort items within each album by order ascending so Photo 1 is first
    albumList.forEach(album => {
      album.items.sort((a, b) => {
        const orderA = a.order !== undefined && a.order !== null ? a.order : 9999;
        const orderB = b.order !== undefined && b.order !== null ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return (a.title || '').localeCompare(b.title || '');
      });
      if (album.items.length > 0) {
        album.coverImage = album.items[0].imageUrl;
      }
    });

    return albumList;
  }, [filteredGallery]);

  // Items for the actively opened folder / album
  const currentAlbumData = useMemo(() => {
    if (!selectedAlbum) return null;
    return albums.find(a => a.name.toLowerCase() === selectedAlbum.name.toLowerCase()) || selectedAlbum;
  }, [selectedAlbum, albums]);

  const handleOpenFolder = (album) => {
    setSelectedAlbum(album);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handlePlaySlideshow = () => {
    if (!currentAlbumData || !currentAlbumData.items.length || !onOpenLightbox) return;
    onOpenLightbox({
      items: currentAlbumData.items,
      currentIndex: 0
    });
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20 overflow-hidden">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-cyan/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-accent/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-10">
        
        {/* Filter Controls & View Switcher - Liquid UI */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 max-w-5xl mx-auto"
        >
          <div className="liquid-glass-elevated p-4 sm:p-7 rounded-3xl sm:rounded-[2.5rem] flex flex-col items-center gap-5 sm:gap-6 border-white/20 shadow-2xl">
            
            {/* Top Bar: View Mode Switcher + Category Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              {/* Folder View vs All Photos View Toggle */}
              <div className="flex items-center p-1 liquid-glass rounded-full border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => { setViewMode('folders'); setSelectedAlbum(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                    viewMode === 'folders'
                      ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Folder size={13} />
                  <span>Folder View</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setViewMode('all'); setSelectedAlbum(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                    viewMode === 'all'
                      ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>All Photos Grid</span>
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center justify-between sm:justify-center p-1 liquid-glass rounded-full border border-white/10 w-full sm:w-auto overflow-hidden">
                {['ALL', 'TECHNICAL', 'NON-TECHNICAL', 'NONE'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setCategoryFilter(cat); setSelectedAlbum(null); }}
                    className={`relative flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider sm:tracking-[0.2em] transition-colors duration-300 z-10 text-center whitespace-nowrap ${
                      categoryFilter === cat
                        ? 'text-praxis-bg'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {categoryFilter === cat && (
                      <motion.div
                        layoutId="cat-tab"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] z-[-1]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Club Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full pt-1 border-t border-white/10">
              <button
                onClick={() => { setClubFilter('ALL'); setSelectedAlbum(null); }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${
                  clubFilter === 'ALL'
                    ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'liquid-glass border-white/10 text-white/40 hover:text-white'
                }`}
              >
                All Chapters
              </button>

              <button
                onClick={() => { setClubFilter('others'); setSelectedAlbum(null); }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${
                  clubFilter === 'others'
                    ? 'bg-praxis-accent text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'liquid-glass border-white/10 text-white/40 hover:text-white'
                }`}
              >
                Establishment & Special
              </button>

              {clubs.map(c => (
                <button
                  key={c.slug}
                  onClick={() => { setClubFilter(c.slug); setSelectedAlbum(null); }}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${
                    clubFilter === c.slug
                      ? 'bg-praxis-cyan text-praxis-bg shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'liquid-glass border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

          </div>
        </motion.section>

        {/* View Mode 1: Opened Folder / Album Drilldown View */}
        {viewMode === 'folders' && currentAlbumData && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Folder Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 text-white/70 hover:text-white hover:border-praxis-cyan transition-all text-[10px] font-bold uppercase tracking-wider w-fit"
                >
                  <ArrowLeft size={13} />
                  <span>Back to All Folders</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-praxis-cyan/15 text-praxis-cyan border border-praxis-cyan/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <FolderOpen size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wider">
                      {currentAlbumData.name}
                    </h2>
                    <p className="text-xs text-praxis-secondary mt-0.5">
                      {currentAlbumData.items.length} High-Resolution Photographs in this collection
                    </p>
                    {currentAlbumData.caption && (
                      <p className="text-xs text-white/70 mt-1 max-w-2xl font-cinematic leading-relaxed">
                        {currentAlbumData.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-praxis-cyan px-3 py-1.5 rounded-full bg-praxis-cyan/10 border border-praxis-cyan/30">
                  {currentAlbumData.clubSlug}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60 px-3 py-1.5 rounded-full liquid-glass border border-white/10">
                  {currentAlbumData.category}
                </span>
                <button
                  onClick={handlePlaySlideshow}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-praxis-cyan to-blue-500 hover:from-blue-500 hover:to-praxis-cyan text-praxis-bg font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Play size={14} className="fill-praxis-bg" />
                  <span>View Slideshow</span>
                </button>
              </div>
            </div>

            {/* Folder Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentAlbumData.items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onOpenLightbox && onOpenLightbox({ items: currentAlbumData.items, currentIndex: idx })}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden liquid-glass-card border border-white/15 cursor-pointer hover:border-praxis-cyan transition-all shadow-xl"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-praxis-cyan">
                      Photo {idx + 1} of {currentAlbumData.items.length}
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-1">
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">{item.caption}</p>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full liquid-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* View Mode 2: Folder Type Overview Grid (The Albums) */}
        {viewMode === 'folders' && !currentAlbumData && (
          <section className="relative z-20">
            {albums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {albums.map((album, idx) => {
                  const previewPhotos = album.items.slice(0, 3);
                  const coverPhoto = previewPhotos[0]?.imageUrl || album.coverImage;
                  const secondPhoto = previewPhotos[1]?.imageUrl;
                  const thirdPhoto = previewPhotos[2]?.imageUrl;

                  return (
                    <motion.div
                      key={album.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={() => handleOpenFolder(album)}
                      className="group relative cursor-pointer flex flex-col rounded-[2.2rem] liquid-glass-elevated border border-white/20 p-5 hover:border-praxis-cyan/60 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                    >
                      {/* Realistic Stacked Folder Photos Depth Effect */}
                      <div className="relative aspect-[16/10] w-full mb-4 flex items-center justify-center">
                        {/* Third Stacked Photo Behind */}
                        {thirdPhoto && (
                          <div className="absolute inset-x-4 inset-y-0 rounded-2xl overflow-hidden opacity-40 rotate-4 scale-90 border border-white/20 bg-black shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-95">
                            <img src={thirdPhoto} alt="Back layer" className="w-full h-full object-cover filter brightness-75" />
                          </div>
                        )}

                        {/* Second Stacked Photo Behind */}
                        {secondPhoto && (
                          <div className="absolute inset-x-2 inset-y-0 rounded-2xl overflow-hidden opacity-70 -rotate-2 scale-95 border border-white/20 bg-black shadow-md transition-transform duration-500 group-hover:-rotate-4 group-hover:scale-98">
                            <img src={secondPhoto} alt="Mid layer" className="w-full h-full object-cover filter brightness-90" />
                          </div>
                        )}

                        {/* Top Main Folder Cover Photo */}
                        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/30 bg-black/60 shadow-xl group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                          <img
                            src={coverPhoto}
                            alt={album.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                          {/* Photos Count Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-white/30 text-praxis-cyan font-bold text-[10px] tracking-wider uppercase font-mono shadow-md backdrop-blur-md">
                            <Folder size={12} className="text-praxis-cyan" />
                            <span>{album.items.length} Photos</span>
                          </div>

                          <div className="absolute bottom-3 right-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/70 text-white/80 border border-white/10">
                            {album.category}
                          </div>
                        </div>
                      </div>

                      {/* Folder Title & Metadata */}
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Folder size={16} className="text-praxis-cyan shrink-0" />
                            <h3 className="text-base sm:text-lg font-bold text-white font-display uppercase tracking-wider truncate group-hover:text-praxis-cyan transition-colors">
                              {album.name}
                            </h3>
                          </div>
                          <p className="text-[11px] text-praxis-secondary truncate pl-6">
                            {album.clubSlug.toUpperCase()} Chapter • {album.date}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="w-10 h-10 rounded-full liquid-glass border border-white/20 text-white flex items-center justify-center shrink-0 group-hover:bg-praxis-cyan group-hover:text-black group-hover:border-praxis-cyan transition-all shadow-md"
                          title="Open Folder"
                        >
                          <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-24 text-center rounded-[3rem] liquid-glass-elevated border-white/10">
                <Folder size={40} className="mx-auto text-white/30 mb-3" />
                <p className="text-2xl text-white font-cinematic uppercase tracking-widest">No matching albums or folders.</p>
                <p className="text-sm text-white/40 mt-2 tracking-widest uppercase">Try adjusting your filters.</p>
              </div>
            )}
          </section>
        )}

        {/* View Mode 3: All Photos Unified Grid */}
        {viewMode === 'all' && (
          <section className="relative z-20">
            <AnimatePresence mode="popLayout">
              {filteredGallery.length > 0 ? (
                <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {filteredGallery.map((item, i) => (
                    <motion.div
                      key={item.id || i}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25, delay: (i % 3) * 0.05 }}
                      onClick={() => onOpenLightbox && onOpenLightbox({ items: filteredGallery, currentIndex: i })}
                      className="relative overflow-hidden rounded-[2rem] cursor-pointer liquid-glass-card group break-inside-avoid"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                        <div className="flex items-center justify-between mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-praxis-cyan px-3 py-1 rounded-full liquid-glass border-white/20 flex items-center gap-1.5">
                            <Folder size={11} /> {item.albumName || item.category}
                          </span>
                          <span className="text-[10px] text-white/50 uppercase tracking-widest">
                            {item.clubSlug}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white font-display uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          {item.title}
                        </h3>
                        {item.caption && (
                          <p className="text-xs text-white/70 font-cinematic mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 line-clamp-2">
                            {item.caption}
                          </p>
                        )}
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full liquid-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Maximize2 size={16} className="text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="py-24 text-center rounded-[3rem] liquid-glass-elevated border-white/10"
                >
                  <p className="text-2xl text-white font-cinematic uppercase tracking-widest">No visual archives found.</p>
                  <p className="text-sm text-white/40 mt-4 tracking-widest uppercase">Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

      </div>
    </div>
  );
};
