import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getSettings);
router.put('/', verifyToken, requireRole(['SUPER_ADMIN', 'FACULTY_ADMIN']), updateSettings);

export default router;
