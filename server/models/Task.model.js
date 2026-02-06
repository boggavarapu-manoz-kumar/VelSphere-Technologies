import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    },
    // Target Batch (Optional: if set, only visible to that batch)
    batch: {
        type: String,
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
