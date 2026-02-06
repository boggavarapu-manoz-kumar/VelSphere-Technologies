import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    submissionLink: {
        type: String,
        required: true,
        trim: true
    },
    comments: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Prevent duplicate submissions for the same task by the same student
submissionSchema.index({ student: 1, task: 1 }, { unique: true });

export const Submission = mongoose.model('Submission', submissionSchema);
