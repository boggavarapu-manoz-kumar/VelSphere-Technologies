import { Student } from '../models/Student.model.js';

// Login Student (Intern)
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.isIntern) {
            return res.status(403).json({ message: "Access denied. Not an intern." });
        }

        const isPasswordValid = await student.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = student.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        const loggedInStudent = await Student.findById(student._id).select("-password");

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                message: "Intern logged in successfully",
                user: loggedInStudent,
                accessToken
            });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Logout Student
export const logoutStudent = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json({ message: "Logged out successfully" });
};

// Get Current Student Profile
export const getStudentProfile = async (req, res) => {
    return res.status(200).json({ user: req.user });
};

// Change Password
export const changePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        const studentId = req.user._id;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.password = newPassword;
        student.isFirstLogin = false;
        await student.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Create Student (Admin Only)
export const createStudent = async (req, res) => {
    try {
        const { name, email, password, domainId, batch } = req.body;

        if (!name || !email || !password || !domainId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this email already exists" });
        }

        const student = new Student({
            name,
            email,
            password,
            domain: domainId,
            batch: batch || undefined,
            isIntern: true, // Always true for admin created interns
            isFirstLogin: true
        });

        await student.save();

        // Return student without password
        const createdStudent = await Student.findById(student._id).select('-password');

        return res.status(201).json({ message: "Intern created successfully", student: createdStudent });

    } catch (error) {
        console.error("Create Student Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Students (Admin Only)
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('domain', 'name')
            .select('-password')
            .sort({ createdAt: -1 });

        return res.status(200).json({ students });
    } catch (error) {
        console.error("Get All Students Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Student (Admin Only)
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await Student.findByIdAndDelete(id);

        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Delete Student Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
