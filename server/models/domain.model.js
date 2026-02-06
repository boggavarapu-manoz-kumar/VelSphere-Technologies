import mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    icon: {
        type: String, // We'll store the icon name (e.g., "Code", "Briefcase")
        default: 'Briefcase'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Domain = mongoose.model('Domain', domainSchema);
