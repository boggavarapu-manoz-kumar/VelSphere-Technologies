import { Router } from 'express';
import { submitTask, getMySubmissions, getAllSubmissions, updateSubmissionStatus, getSubmissionAnalytics } from '../controllers/submission.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create', verifyJWT, submitTask);
router.get('/my', verifyJWT, getMySubmissions);

// Admin Routes
router.get('/all', verifyAdmin, getAllSubmissions);
router.get('/analytics', verifyAdmin, getSubmissionAnalytics);
router.patch('/:id/status', verifyAdmin, updateSubmissionStatus);

export default router;
