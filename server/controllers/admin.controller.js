import { Admin } from '../models/admin.model.js';

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        const isPasswordValid = await admin.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        const accessToken = admin.generateAccessToken();

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            admin: {
                _id: admin._id,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { loginAdmin };
