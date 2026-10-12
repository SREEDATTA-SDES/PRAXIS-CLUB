import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Download, FileText, Printer, X, CheckCircle2, 
  Clock, MapPin, Tag, ExternalLink, Sparkles 
} from 'lucide-react';

export const EventCalendarModal = ({ events = [], eventCalendarPdfUrl = '', onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Sort events chronologically (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  // 1. Download iCalendar (.ics) format
  const handleDownloadICS = () => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const formatICSDate = (dateStr) => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '20260301T090000Z';
      return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        '00Z'
      );
    };

    let lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PRAXIS Club SDES//Semester Event Calendar 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:PRAXIS Club Semester Events Calendar',
      'X-WR-TIMEZONE:Asia/Kolkata'
    ];

    sortedEvents.forEach((evt, idx) => {
      const start = formatICSDate(evt.date);
      const startDate = new Date(evt.date);
      const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
      const end = formatICSDate(endDate);
      const uid = `praxis-cal-${evt.id || evt._id || idx}-${Date.now()}@sreedattha.ac.in`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${formatICSDate(new Date())}`);
      lines.push(`DTSTART:${start}`);
      lines.push(`DTEND:${end}`);
      lines.push(`SUMMARY:${(evt.title || 'PRAXIS Event').replace(/[,;]/g, ' ')}`);
      lines.push(`DESCRIPTION:${((evt.description || evt.shortDescription || '') + ' - Organized by PRAXIS Club SDES').replace(/(\r\n|\n|\r)/gm, ' ').replace(/[,;]/g, ' ')}`);
      lines.push(`LOCATION:${(evt.venue || 'SDES Campus Auditorium').replace(/[,;]/g, ' ')}`);
      lines.push(`CATEGORIES:${evt.category || 'TECHNICAL'}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');

    const icsContent = lines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'PRAXIS_Club_Semester_Event_Calendar_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('iCalendar (.ics) downloaded! Ready to import into Google Calendar or Apple Calendar.');
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  // 2. Download CSV Schedule
  const handleDownloadCSV = () => {
    const headers = ['Sl No', 'Event Title', 'Date', 'Time', 'Venue', 'Category', 'Club Chapter', 'Status', 'Description'];
    const rows = sortedEvents.map((e, idx) => [
      idx + 1,
      `"${(e.title || '').replace(/"/g, '""')}"`,
      `"${e.date || ''}"`,
      `"${e.time || '10:00 AM'}"`,
      `"${(e.venue || '').replace(/"/g, '""')}"`,
      `"${e.category || ''}"`,
      `"${(e.clubSlug || '').toUpperCase()}"`,
      `"${e.status || ''}"`,
      `"${(e.description || e.shortDescription || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'PRAXIS_Semester_Events_Schedule_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('Event Schedule CSV downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  // 3. Print / Save as PDF Calendar with Official Institution Letterhead
  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open the printable Event Calendar.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PRAXIS Club - Official Semester Event Calendar</title>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 30px;
            color: #111827;
            background: #ffffff;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #1E3A8A;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }
          .institution-name {
            font-size: 20px;
            font-weight: 800;
            color: #1E3A8A;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin: 0 0 5px 0;
          }
          .sub-title {
            font-size: 13px;
            color: #4B5563;
            margin: 0 0 10px 0;
          }
          .calendar-title {
            font-size: 17px;
            font-weight: 700;
            color: #0F172A;
            letter-spacing: 1px;
            text-transform: uppercase;
            background: #EFF6FF;
            display: inline-block;
            padding: 6px 16px;
            border-radius: 6px;
            border: 1px solid #BFDBFE;
            margin-top: 5px;
          }
          .meta-bar {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #6B7280;
            margin-bottom: 15px;
            padding: 0 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th {
            background-color: #1E3A8A;
            color: #ffffff;
            text-align: left;
            padding: 10px 12px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #E5E7EB;
            vertical-align: top;
          }
          tr:nth-child(even) td {
            background-color: #F9FAFB;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .badge-tech {
            background-color: #DBEAFE;
            color: #1E40AF;
          }
          .badge-nontech {
            background-color: #FCE7F3;
            color: #9D174D;
          }
          .badge-status {
            background-color: #ECFDF5;
            color: #065F46;
          }
          .footer {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #4B5563;
            border-top: 1px solid #E5E7EB;
            padding-top: 20px;
          }
          .sig-box {
            text-align: center;
          }
          .sig-line {
            width: 160px;
            border-bottom: 1px solid #9CA3AF;
            margin-bottom: 5px;
          }
          @media print {
            body { padding: 15px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="institution-name">Sree Dattha Institute of Engineering and Science</h1>
          <p class="sub-title">Department of Computer Science & Engineering (Allied Branches) • Hyderabad, Telangana</p>
          <div class="calendar-title">PRAXIS CLUB • OFFICIAL SEMESTER EVENT CALENDAR (2026)</div>
        </div>

        <div class="meta-bar">
          <span><strong>Total Events:</strong> ${sortedEvents.length}</span>
          <span><strong>Generated:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span><strong>Academic Year:</strong> 2025–2026</span>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>Event Title</th>
              <th style="width: 100px;">Date & Time</th>
              <th style="width: 120px;">Venue</th>
              <th style="width: 100px;">Chapter</th>
              <th style="width: 100px;">Category</th>
              <th style="width: 80px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${sortedEvents.map((e, idx) => `
              <tr>
                <td><strong>${idx + 1}</strong></td>
                <td>
                  <strong>${e.title}</strong>
                  <div style="font-size: 10px; color: #6B7280; margin-top: 2px;">${e.shortDescription || e.description || ''}</div>
                </td>
                <td><strong>${e.date}</strong><br/><span style="color: #6B7280; font-size: 11px;">${e.time || '10:00 AM'}</span></td>
                <td>${e.venue || 'SDES Campus'}</td>
                <td><strong>${(e.clubSlug || 'PRAXIS').toUpperCase()}</strong></td>
                <td>
                  <span class="badge ${e.category === 'TECHNICAL' ? 'badge-tech' : 'badge-nontech'}">
                    ${e.category || 'EVENT'}
                  </span>
                </td>
                <td>
                  <span class="badge badge-status">${e.status || 'SCHEDULED'}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div class="sig-box">
            <div class="sig-line"></div>
            <strong>Student Secretary / Leads</strong><br/>
            PRAXIS Core Committee
          </div>
          <div class="sig-box">
            <div class="sig-line"></div>
            <strong>Faculty Coordinator</strong><br/>
            CSE (AIML & Allied)
          </div>
          <div class="sig-box">
            <div class="sig-line"></div>
            <strong>Dean / Principal</strong><br/>
            SDES Hyderabad
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

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
                  Official Schedule • Academic Semester 2026
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

          {/* Success Banner */}
          {downloadSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/20 border-b border-emerald-500/40 px-6 py-2.5 flex items-center gap-2 text-xs text-emerald-300 font-semibold"
            >
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{downloadSuccess}</span>
            </motion.div>
          )}

          {/* Body Content */}
          <div className="p-6 space-y-6 overflow-y-auto">

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: .ICS */}
              <button
                type="button"
                onClick={handleDownloadICS}
                className="group p-4 rounded-2xl liquid-glass border border-praxis-cyan/40 hover:border-praxis-cyan hover:bg-praxis-cyan/10 transition-all text-left flex flex-col justify-between shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-praxis-cyan/20 text-praxis-cyan flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    iCalendar (.ics)
                  </h4>
                  <p className="text-[10px] text-praxis-secondary mt-1 leading-snug">
                    Google Calendar, Apple, Outlook format
                  </p>
                </div>
                <div className="mt-3 text-[10px] uppercase font-bold text-praxis-cyan flex items-center gap-1">
                  <Download size={11} /> Download .ics
                </div>
              </button>

              {/* Option 2: PDF / Print */}
              <div
                className="group p-4 rounded-2xl liquid-glass border border-white/20 hover:border-blue-400 hover:bg-blue-500/10 transition-all text-left flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Printer size={18} />
                  </div>
                  {eventCalendarPdfUrl && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      OFFICIAL PDF
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    {eventCalendarPdfUrl ? 'Official PDF Calendar' : 'Official PDF / Print'}
                  </h4>
                  <p className="text-[10px] text-praxis-secondary mt-1 leading-snug">
                    {eventCalendarPdfUrl 
                      ? 'Administration official calendar document' 
                      : 'Printable schedule with SDES letterhead'}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {eventCalendarPdfUrl ? (
                    <>
                      <a
                        href={eventCalendarPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase font-bold text-praxis-cyan hover:underline flex items-center gap-1"
                      >
                        <Download size={11} /> Download PDF
                      </a>
                      <span className="text-white/20 text-[10px]">•</span>
                      <button
                        type="button"
                        onClick={handlePrintPDF}
                        className="text-[10px] uppercase font-bold text-white/50 hover:text-white flex items-center gap-1"
                        title="Print dynamically generated schedule"
                      >
                        <Printer size={10} /> Print
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePrintPDF}
                      className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1"
                    >
                      <Printer size={11} /> Print / Save PDF
                    </button>
                  )}
                </div>
              </div>

              {/* Option 3: CSV Schedule */}
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="group p-4 rounded-2xl liquid-glass border border-white/20 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all text-left flex flex-col justify-between shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Schedule (CSV)
                  </h4>
                  <p className="text-[10px] text-praxis-secondary mt-1 leading-snug">
                    Open in Excel, Sheets, or Numbers
                  </p>
                </div>
                <div className="mt-3 text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <Download size={11} /> Export CSV
                </div>
              </button>
            </div>

            {/* Calendar Event Schedule List Preview */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-widest text-praxis-cyan font-cinematic">
                  Schedule Overview ({sortedEvents.length} Events)
                </span>
                <span className="text-[10px] text-praxis-muted font-mono">
                  Semester 2026
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {sortedEvents.map((evt, idx) => (
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
                ))}
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
