import { Domain } from '../models/domain.model.js';

// Public: Get all active domains
export const getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find({ isActive: true }).select('name icon');
        res.status(200).json(domains);
    } catch (error) {
        res.status(500).json({ message: "Error fetching domains", error: error.message });
    }
};

// Admin: Create a new domain
export const createDomain = async (req, res) => {
    try {
        const { name, icon } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Domain name is required" });
        }

        const existingDomain = await Domain.findOne({ name });
        if (existingDomain) {
            return res.status(400).json({ message: "Domain already exists" });
        }

        const newDomain = await Domain.create({ name, icon });
        res.status(201).json({ message: "Domain created successfully", domain: newDomain });
    } catch (error) {
        res.status(500).json({ message: "Error creating domain", error: error.message });
    }
};

// Admin: Delete a domain
export const deleteDomain = async (req, res) => {
    try {
        const { id } = req.params;
        await Domain.findByIdAndDelete(id);
        res.status(200).json({ message: "Domain deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting domain", error: error.message });
    }
};
