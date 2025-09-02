import * as Enrollment from '../controllers/enrollmentController.js';
import express from 'express';

const router = express.Router();


router.post('/enrollments', Enrollment.enrollUser);


router.get('/enrollments/count', Enrollment.getEnrollmentsCount);


router.get('/enrollments/completion-rate', Enrollment.getCompletionRate);


router.patch('/enrollments/:id/complete', Enrollment.completeEnrollment);

export default router;