import { Router } from 'express';
import { loginStudent, logoutStudent, getStudentProfile, changePassword, createStudent, getAllStudents, deleteStudent } from '../controllers/student.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public / Intern Routes
router.post('/login', loginStudent);
router.post('/logout', verifyJWT, logoutStudent);
router.get('/me', verifyJWT, getStudentProfile);
router.post('/change-password', verifyJWT, changePassword);

// Admin Routes
router.post('/create', verifyAdmin, createStudent);
router.get('/all', verifyAdmin, getAllStudents);
router.delete('/:id', verifyAdmin, deleteStudent);

export default router;
