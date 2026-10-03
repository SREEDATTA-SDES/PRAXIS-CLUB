import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected mutation routes
router.post('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), createEvent);
router.put('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), updateEvent);
router.delete('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), deleteEvent);

export default router;
