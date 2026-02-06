import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        // Password is only required if the student is an intern
        required: function () { return this.isIntern; }
    },
    isIntern: {
        type: Boolean,
        default: false
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain'
    },
    // Batch/Cohort (e.g., "Winter-2024", "Summer-2025")
    batch: {
        type: String,
        trim: true
    },
    internshipStatus: {
        type: String,
        enum: ['applied', 'interviewing', 'selected', 'rejected', 'completed'],
        default: 'applied'
    },
    // We will link tasks here later when we create the Task model
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
}, { timestamps: true });

// Pre-save hook to hash password
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password
studentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate Access Token
studentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            _id: this._id,
            email: this.email,
            isIntern: this.isIntern,
            isFirstLogin: this.isFirstLogin
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

export const Student = mongoose.model('Student', studentSchema);
