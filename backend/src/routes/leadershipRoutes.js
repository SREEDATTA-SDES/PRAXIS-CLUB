import { Router } from 'express';
import { getLeadership, createLeader, updateLeader, deleteLeader } from '../controllers/leadershipController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getLeadership);
router.post('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), createLeader);
router.put('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), updateLeader);
router.delete('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), deleteLeader);

export default router;
