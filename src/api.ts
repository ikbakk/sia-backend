import { Router } from 'express';
import studentRouter from './components/student/student.router';
import gradeRouter from './components/grade/grade.router';
import courseRouter from './components/course/course.router';

const router: Router = Router();

router.use(studentRouter);
router.use(gradeRouter);
router.use(courseRouter);

export default router;
