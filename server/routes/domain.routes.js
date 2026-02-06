import express from 'express';
import { createDomain, getAllDomains, deleteDomain } from '../controllers/domain.controller.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllDomains);

// Protected Admin Routes
router.post('/', verifyAdmin, createDomain);
router.delete('/:id', verifyAdmin, deleteDomain);

export default router;
