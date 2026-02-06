import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            default: 'admin',
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

export const Admin = mongoose.model('Admin', adminSchema);
