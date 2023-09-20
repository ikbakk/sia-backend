import { Router } from 'express';
import studentRouter from './components/student/student.router';

const router: Router = Router();

router.use(studentRouter);

export default router;
