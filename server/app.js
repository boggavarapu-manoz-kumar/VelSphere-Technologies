import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Import Routes
import adminRouter from './routes/admin.routes.js';
import domainRouter from './routes/domain.routes.js';
import internshipRouter from './routes/internship.routes.js';
import studentRouter from './routes/student.routes.js';
import taskRouter from './routes/task.routes.js';
import submissionRouter from './routes/submission.routes.js';

// Routes Declaration
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/domains', domainRouter);
app.use('/api/v1/internships', internshipRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/submissions', submissionRouter);

export { app };
