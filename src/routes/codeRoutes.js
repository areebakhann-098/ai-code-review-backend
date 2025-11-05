import express from 'express';
import { handleReview, handleFormat, handleFeedback } from '../controllers/codeController.js';

const router = express.Router();

router.post('/review', handleReview);
router.post('/format', handleFormat);
router.post('/feedback', handleFeedback);

export default router;
