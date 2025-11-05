import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    suggestion: {
      type: String,
      required: true, 
      trim: true,
    },
    feedback: {
      type: String,
      enum: ['up', 'down'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
