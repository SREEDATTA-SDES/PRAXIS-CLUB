import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, FileText, ExternalLink, X, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const EventCalendarModal = ({ events = [], eventCalendarPdfUrl = '', onClose }) => {
  // Sort events chronologically (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#090C12] border border-praxis-cyan/30 rounded-3xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-white select-none max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-praxis-cyan/20 border border-praxis-cyan/50 flex items-center justify-center text-praxis-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-white font-display tracking-wider">
                  Semester Event Calendar
                </h3>
                <p className="text-xs text-praxis-secondary font-cinematic">
                  Official Academic Schedule • Semester 2026
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full liquid-glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 overflow-y-auto">

            {/* Official PDF Document Card */}
            {eventCalendarPdfUrl ? (
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-praxis-cyan/40 bg-gradient-to-br from-[#0F172A]/90 to-[#0A101D]/90 p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-praxis-cyan/30 to-blue-500/30 border border-praxis-cyan/50 flex items-center justify-center text-praxis-cyan shrink-0 shadow-lg">
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
                          Official Semester Calendar PDF
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                          <ShieldCheck size={11} /> Verified Document
                        </span>
                      </div>
                      <p className="text-xs text-praxis-secondary mt-1 leading-relaxed">
                        Official academic calendar and timetable issued by SDES Department of Computer Science & Allied Branches.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={eventCalendarPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Semester_Event_Calendar_2026.pdf"
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-praxis-cyan via-blue-500 to-praxis-cyan hover:bg-pos-100 bg-size-200 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download Official Calendar (PDF)</span>
                  </a>

                  <a
                    href={eventCalendarPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl liquid-glass border border-white/20 hover:border-praxis-cyan/60 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ExternalLink size={15} />
                    <span>Open in New Tab</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-500/30">
                  <AlertCircle size={20} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
                  Official PDF Calendar Under Release
                </h4>
                <p className="text-[11px] text-praxis-muted max-w-md mx-auto">
                  The official semester calendar PDF is currently being finalized by Department Administration. You can view the scheduled events list below.
                </p>
              </div>
            )}

            {/* Calendar Event Schedule List Preview */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-widest text-praxis-cyan font-cinematic">
                  Schedule Overview ({sortedEvents.length} Events)
                </span>
                <span className="text-[10px] text-praxis-muted font-mono">
                  Academic Year 2025–2026
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {sortedEvents.length === 0 ? (
                  <div className="p-6 text-center text-xs text-praxis-muted bg-praxis-card/40 rounded-xl border border-praxis-border">
                    No events currently scheduled.
                  </div>
                ) : (
                  sortedEvents.map((evt, idx) => (
                    <div 
                      key={evt.id || evt._id || idx}
                      className="p-3 rounded-xl bg-praxis-card border border-praxis-border flex items-center justify-between gap-3 hover:border-praxis-cyan/50 transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-praxis-cyan px-2 py-0.5 rounded bg-praxis-cyan/10 shrink-0">
                            {evt.date}
                          </span>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider truncate">
                            {evt.title}
                          </h5>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-praxis-secondary pl-1 truncate">
                          <span>{evt.venue || 'SDES Campus'}</span>
                          <span>•</span>
                          <span className="uppercase text-white/50">{evt.category}</span>
                        </div>
                      </div>

                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-praxis-muted shrink-0">
                        {(evt.clubSlug || 'PRAXIS').toUpperCase()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-praxis-muted">
            <span className="text-[10px] font-mono text-praxis-cyan">
              PRAXIS SDES • Computer Science & Allied
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
