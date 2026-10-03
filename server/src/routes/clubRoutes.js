import { Router } from 'express';
import { getClubs, getClubBySlug, createClub, updateClub, deleteClub } from '../controllers/clubController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getClubs);
router.get('/:slug', getClubBySlug);

// Protected routes
router.post('/', verifyToken, requireRole(['SUPER_ADMIN']), createClub);
router.put('/:slug', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), updateClub);
router.delete('/:slug', verifyToken, requireRole(['SUPER_ADMIN']), deleteClub);

export default router;
