import { Router } from 'express';
import { 
  getAnnouncements, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcementController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getAnnouncements);
router.post('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN']), createAnnouncement);
router.put('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN']), updateAnnouncement);
router.delete('/:id', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN']), deleteAnnouncement);

export default router;
