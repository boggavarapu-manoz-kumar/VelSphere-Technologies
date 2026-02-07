import { Internship } from '../models/internship.model.js';

// Public: Get all active internships (with Domain populated)
export const getAllInternships = async (req, res) => {
    try {
        const query = {}; // Return all internships to ensure visibility on Home Page

        // Optional: Filter by specific domain ID if passed in query
        if (req.query.domainId && req.query.domainId !== 'all') {
            query.domain = req.query.domainId;
        }

        const internships = await Internship.find(query)
            .populate('domain', 'name') // Populate domain name for the frontend
            .sort({ postedDate: -1 }); // Newest first

        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ message: "Error fetching internships", error: error.message });
    }
};

// Admin: Create a new internship
export const createInternship = async (req, res) => {
    try {
        const { title, domain, description, applicationLink } = req.body;

        if (!title || !domain || !description || !applicationLink) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newInternship = await Internship.create({
            title,
            domain,
            description,
            applicationLink,
            isActive: true // Explicitly set to active
        });

        res.status(201).json({ message: "Internship posted successfully", internship: newInternship });
    } catch (error) {
        res.status(500).json({ message: "Error posting internship", error: error.message });
    }
};

// Admin: Delete an internship
export const deleteInternship = async (req, res) => {
    try {
        const { id } = req.params;
        await Internship.findByIdAndDelete(id);
        res.status(200).json({ message: "Internship deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting internship", error: error.message });
    }
};
