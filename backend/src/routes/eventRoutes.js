import { Router } from 'express';
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getCalendarPdf,
  uploadCalendarPdf
} from '../controllers/eventController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Semester Event Calendar PDF routes (must be before /:id)
router.get('/calendar-pdf', getCalendarPdf);
router.post('/calendar-pdf', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN']), uploadCalendarPdf);

router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected mutation routes
router.post('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), createEvent);
router.put('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), updateEvent);
router.delete('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), deleteEvent);

export default router;
