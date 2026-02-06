import express from 'express';
import { createInternship, getAllInternships, deleteInternship } from '../controllers/internship.controller.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllInternships);

// Protected Admin Routes
router.post('/', verifyAdmin, createInternship);
router.delete('/:id', verifyAdmin, deleteInternship);

export default router;
