import { Task } from '../models/Task.model.js';
import { Domain } from '../models/domain.model.js';

// Create Task (Admin Only)
export const createTask = async (req, res) => {
    try {
        const { title, description, domainId, deadline, batch } = req.body;

        if (!title || !description || !domainId || !deadline) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const domain = await Domain.findById(domainId);
        if (!domain) {
            return res.status(404).json({ message: "Domain not found" });
        }

        const task = new Task({
            title,
            description,
            domain: domainId,
            batch: batch || undefined, // Optional
            deadline
        });

        await task.save();

        return res.status(201).json({ message: "Task created successfully", task });

    } catch (error) {
        console.error("Create Task Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get Tasks by Domain (For Interns)
export const getTasksByDomain = async (req, res) => {
    try {
        const { domainId } = req.params;
        const studentBatch = req.user.batch; // From verifyJWT middleware

        // Build Query
        const query = {
            domain: domainId,
            isActive: true
        };

        // If task has a batch, it MUST match the student's batch.
        // If task has NO batch, it shows for everyone in that domain.
        // Batch filtering disabled for stability - showing all domain tasks
        /*
        if (studentBatch) {
            query.$or = [
                { batch: { $exists: false } },
                { batch: null },
                { batch: "" },
                { batch: studentBatch }
            ];
        } else {
            // If student has no batch, show only non-batch specific tasks
            query.$or = [
                { batch: { $exists: false } },
                { batch: null },
                { batch: "" }
            ];
        }
        */

        const tasks = await Task.find(query).sort({ deadline: 1 });

        return res.status(200).json({ tasks });

    } catch (error) {
        console.error("Get Tasks Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Tasks (Admin)
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('domain', 'name').sort({ createdAt: -1 });
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Task (Admin) - Optional utility
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
