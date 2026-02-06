import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Domain } from './models/domain.model.js';
import { Internship } from './models/internship.model.js';

dotenv.config();

const seedInternships = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");

        // 1. Clear existing data
        await Internship.deleteMany({});
        await Domain.deleteMany({});
        console.log("Cleared existing internships and domains.");

        // 2. Create Domains
        const webDomain = await Domain.create({ name: 'Web Development', icon: 'Code' });
        const appDomain = await Domain.create({ name: 'App Development', icon: 'Monitor' });
        const designDomain = await Domain.create({ name: 'UI/UX Design', icon: 'PenTool' });
        const dataDomain = await Domain.create({ name: 'Data Science', icon: 'Database' });

        console.log("Created 4 Domains.");

        // 3. Create Internships
        const internships = [
            {
                title: "Frontend Developer Intern",
                domain: webDomain._id,
                description: "Build beautiful interfaces with React and Tailwind. You will work on real client projects.",
                applicationLink: "https://forms.google.com/example-frontend",
                postedDate: new Date() // Just now (should show as NEW)
            },
            {
                title: "Backend Developer Intern",
                domain: webDomain._id,
                description: "Work on scalable APIs using Node.js and MongoDB. Experience with Express is a plus.",
                applicationLink: "https://forms.google.com/example-backend",
                postedDate: new Date() // Just now (should show as NEW)
            },
            {
                title: "Flutter Developer Intern",
                domain: appDomain._id,
                description: "Develop cross-platform mobile apps using Flutter. Learn state management and native integration.",
                applicationLink: "https://forms.google.com/example-flutter",
                postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago (should show as NEW)
            },
            {
                title: "UI/UX Designer",
                domain: designDomain._id,
                description: "Design intuitive user journeys and high-fidelity mockups using Figma.",
                applicationLink: "https://forms.google.com/example-design",
                postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago (Old, no NEW tag)
            }
        ];

        await Internship.insertMany(internships);
        console.log(`Created ${internships.length} Internships.`);

        console.log("✅ Seeding Complete! The system is ready for verification.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedInternships();
