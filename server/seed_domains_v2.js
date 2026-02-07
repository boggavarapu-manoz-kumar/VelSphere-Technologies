import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Domain } from './models/domain.model.js';
import connectDB from './config/database.js';

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        const count = await Domain.countDocuments();
        if (count > 0) {
            console.log(`✅ Domains exist: ${count}`);
            process.exit(0);
        }

        console.log("Seeding domains...");
        const domains = [
            { name: "Web Development", description: "Full Stack MERN", icon: "Code" },
            { name: "App Development", description: "Flutter & React Native", icon: "Smartphone" },
            { name: "Data Science", description: "Python & ML", icon: "Database" },
            { name: "Cyber Security", description: "Network Security", icon: "Shield" },
            { name: "UI/UX Design", description: "Figma & Research", icon: "PenTool" }
        ];

        await Domain.insertMany(domains);
        console.log("✅ Seeded domains successfully.");
        process.exit(0);

    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
};

seed();
