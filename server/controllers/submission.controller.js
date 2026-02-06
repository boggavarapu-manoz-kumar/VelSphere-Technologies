import { Submission } from '../models/Submission.model.js';
import { Student } from '../models/Student.model.js';
import { Task } from '../models/Task.model.js';

// Submit a Task
export const submitTask = async (req, res) => {
    try {
        const { taskId, submissionLink, comments } = req.body;
        const studentId = req.user._id;

        if (!taskId || !submissionLink) {
            return res.status(400).json({ message: "Task ID and Submission Link are required" });
        }

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check strict deadline
        if (new Date(task.deadline) < new Date()) {
            return res.status(400).json({ message: "Task deadline has passed. Submissions are closed." });
        }

        // Check if already submitted
        const existingSubmission = await Submission.findOne({ student: studentId, task: taskId });
        if (existingSubmission) {
            return res.status(400).json({ message: "You have already submitted this task" });
        }

        const submission = new Submission({
            student: studentId,
            task: taskId,
            submissionLink,
            comments
        });

        await submission.save();

        // Optional: Update student record with submission reference
        await Student.findByIdAndUpdate(studentId, {
            $push: { submissions: submission._id }
        });

        return res.status(201).json({ message: "Task submitted successfully", submission });

    } catch (error) {
        console.error("Submission Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get My Submissions
export const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ student: req.user._id })
            .populate('task', 'title deadline')
            .sort({ createdAt: -1 });

        return res.status(200).json({ submissions });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Submissions (Admin)
export const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate('student', 'name email')
            .populate('task', 'title')
            .sort({ createdAt: -1 });

        return res.status(200).json({ submissions });
    } catch (error) {
        console.error("Error fetching all submissions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update Submission Status (Admin)
export const updateSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const submission = await Submission.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        return res.status(200).json({ message: "Status updated", submission });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get Submission Analytics (Admin)
export const getSubmissionAnalytics = async (req, res) => {
    try {
        // 1. Get all active tasks
        const tasks = await Task.find({ isActive: true }).populate('domain', 'name');

        let report = [];

        // 2. For each task, check eligible students and their submission status
        for (const task of tasks) {
            // Build query for students matching task domain & batch
            const studentQuery = {
                domain: task.domain._id,
                isIntern: true // Only check interns
            };

            // If task has a specific batch, only check students in that batch
            if (task.batch) {
                studentQuery.batch = task.batch;
            }

            const students = await Student.find(studentQuery).select('name email domain batch');

            // 3. Check submission for each eligible student
            for (const student of students) {
                const submission = await Submission.findOne({ task: task._id, student: student._id });

                let status = 'pending';
                if (submission) {
                    status = 'submitted'; // Or use specific status: submission.status
                } else if (new Date(task.deadline) < new Date()) {
                    status = 'missed';
                }

                report.push({
                    studentName: student.name,
                    studentEmail: student.email,
                    domain: task.domain.name,
                    batch: student.batch || 'All',
                    taskTitle: task.title,
                    taskDeadline: task.deadline,
                    status: status, // submitted, pending, missed
                    submissionStatus: submission ? submission.status : null, // approved, rejected, pending
                    submissionLink: submission ? submission.submissionLink : null,
                    submissionId: submission ? submission._id : null
                });
            }
        }

        return res.status(200).json({ analytics: report });
    } catch (error) {
        console.error("Analytics Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
