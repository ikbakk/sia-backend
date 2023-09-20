import { Router } from 'express';
import studentRouter from './components/student/student.router';
import gradeRouter from './components/grade/grade.router';

const router: Router = Router();

router.use(studentRouter);
router.use(gradeRouter);

export default router;
