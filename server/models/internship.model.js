import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    applicationLink: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Internship = mongoose.model('Internship', internshipSchema);
