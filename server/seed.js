import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from './models/admin.model.js';
import connectDB from './config/database.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email: 'admin@velsphere.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        // Create Admin
        const admin = new Admin({
            email: 'admin@velsphere.com',
            password: 'adminpassword123', // This will be hashed by the pre-save hook
            role: 'admin'
        });

        await admin.save();
        console.log('Admin created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
