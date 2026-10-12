import { Router } from 'express';
import { getLeadership, getLeadershipCollections, createLeader, updateLeader, reorderLeaders, deleteLeader } from '../controllers/leadershipController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/collections', getLeadershipCollections);
router.get('/', getLeadership);
router.post('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), createLeader);
router.put('/reorder', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), reorderLeaders);
router.put('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), updateLeader);
router.delete('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN', 'CLUB_ADMIN']), deleteLeader);

export default router;
