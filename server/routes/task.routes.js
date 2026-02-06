import { Router } from 'express';
import { createTask, getTasksByDomain, getAllTasks, deleteTask } from '../controllers/task.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Admin Routes
router.post('/create', verifyAdmin, createTask);
router.get('/all', verifyAdmin, getAllTasks);
router.delete('/:id', verifyAdmin, deleteTask);

// Intern Routes
// We'll use verifyJWT to ensure only logged-in interns can see tasks
router.get('/domain/:domainId', verifyJWT, getTasksByDomain);

export default router;
