import { Router } from 'express';
import { submitFeedback, getFeedbackList } from '../controllers/feedback.controller';

const router = Router();

router.post('/', submitFeedback);
router.get('/list', getFeedbackList);

export default router;
