import mongoose from 'mongoose';

const eventCalendarPdfSchema = new mongoose.Schema({
  title: { type: String, default: 'Semester Event Calendar 2026' },
  pdfUrl: { type: String, required: true },
  publicId: { type: String, default: '' },
  fileName: { type: String, default: 'Semester_Event_Calendar_2026.pdf' },
  semester: { type: String, default: 'Academic Semester 2026' },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
}, {
  timestamps: true,
  collection: 'event_calendar_pdf'
});

export const EventCalendarPdf = mongoose.models.EventCalendarPdf || mongoose.model('EventCalendarPdf', eventCalendarPdfSchema);
