import { formatCode } from '../utils/format.js';
import Feedback from '../models/Feedback.js';
import { reviewCode } from '../services/reviewService.js';


export const handleReview = async (req, res) => {
  const { code } = req.body;
  const response = await reviewCode(code);
  res.json(response);
};

export const handleFormat = async (req, res) => {
  const { code } = req.body;
  const formatted = await formatCode(code);
  res.send({ formatted });
};

export const handleFeedback = async (req, res) => {
  const { suggestion, feedback } = req.body;

  try {
    if (!suggestion || !feedback) {
      return res.status(400).json({ message: 'Suggestion and feedback are required.' });
    }

    const newFeedback = new Feedback({ suggestion, feedback });
    await newFeedback.save();

    res.json({ message: 'Feedback saved to MongoDB.' });
  } catch (error) {
    console.error('Feedback Save Error:', error.name, error.message);

    // Optionally include more debugging info
    if (error.name === 'ValidationError') {
      for (let field in error.errors) {
        console.error(`Field: ${field} ➜ ${error.errors[field].message}`);
      }
    }

    res.status(500).json({ message: 'Error saving feedback.', error: error.message });
  }
};


