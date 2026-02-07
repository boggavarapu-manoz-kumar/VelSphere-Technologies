import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import { Student } from './models/Student.model.js';
import { Domain } from './models/domain.model.js';
import connectDB from './config/database.js';

dotenv.config();

const seedStudents = async () => {
    console.log("Starting seedStudents...");
    try {
        console.log("Connecting to DB...");
        await connectDB();
        console.log("Connected to MongoDB.");

        console.log("Checking for 'Web Development' domain...");
        let domain = await Domain.findOne({ name: 'Web Development' });
        console.log("Domain query result:", domain);

        if (!domain) {
            console.log("Creating new domain...");
            domain = await Domain.create({ name: 'Web Development', icon: 'Code' });
            console.log("Created Web Development Domain:", domain);
        }

        const email = 'intern@velsphere.com';
        console.log(`Checking for student: ${email}`);
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            console.log(`Student ${email} already exists.`);
            existingStudent.password = 'internpassword123';
            existingStudent.isIntern = true;
            await existingStudent.save();
            console.log("Updated existing student password.");
        } else {
            console.log("Creating new student...");
            const student = new Student({
                name: 'Test Intern',
                email: email,
                password: 'internpassword123',
                isIntern: true,
                isFirstLogin: true,
                domain: domain._id,
                batch: 'Winter-2024',
                internshipStatus: 'selected'
            });

            await student.save();
            console.log("Created new Student/Intern.");
        }

        console.log("✅ Student Seeding Complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed!");
        console.error("Error Message:", error.message);
        if (error.errors) {
            console.error("Validation Errors:", JSON.stringify(error.errors, null, 2));
            fs.writeFileSync('last_error.txt', error.message + '\n' + JSON.stringify(error.errors, null, 2));
        } else {
            fs.writeFileSync('last_error.txt', error.stack || error.message);
        }
        process.exit(1);
    }
};

seedStudents();
