import { Router } from 'express';
import { getStats, getAdmins, createAdmin, deleteAdmin } from '../controllers/adminController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/stats', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), getStats);
router.get('/users', verifyToken, requireRole(['SUPER_ADMIN']), getAdmins);
router.post('/users', verifyToken, requireRole(['SUPER_ADMIN']), createAdmin);
router.delete('/users/:id', verifyToken, requireRole(['SUPER_ADMIN']), deleteAdmin);

export default router;
