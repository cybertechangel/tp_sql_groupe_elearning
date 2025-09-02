import express from 'express';
import { upsertReview, getCourseReviews, getUserReviews, getCourseSummary, getCourseDistribution, deleteReview} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', upsertReview);
router.get('/course/:courseId', getCourseReviews);
router.get('/user/:userId', getUserReviews);
router.get('/course/:courseId/summary', getCourseSummary);
router.get('/course/:courseId/distribution', getCourseDistribution);
router.delete('/', deleteReview);

export default router;
