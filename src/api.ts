import { Router } from 'express';
import studentRouter from './components/student/student.router';
import gradeRouter from './components/grade/grade.router';
import courseRouter from './components/course/course.router';
import lecturerRouter from './components/lecturer/lecturer.router';

const router: Router = Router();

router.use(studentRouter);
router.use(gradeRouter);
router.use(courseRouter);
router.use(lecturerRouter);

export default router;
