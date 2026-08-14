import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Please add a job position'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied'
    },
    location: {
      type: String,
      default: 'Remote'
    },
    salary: {
      type: String,
      default: 'N/A'
    },
    appliedDate: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);