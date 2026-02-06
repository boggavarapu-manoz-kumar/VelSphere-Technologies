import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model.js';
import { Student } from '../models/Student.model.js';

// Verify Student/Intern Token
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const student = await Student.findById(decodedToken?._id).select("-password").populate("domain");

        if (!student) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = student;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const admin = await Admin.findById(decodedToken?._id).select("-password");

        if (!admin) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
