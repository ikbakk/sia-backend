import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from './course.controller';

const courseRouter: Router = Router();

courseRouter.get('/courses', getAllCourses);
courseRouter.get('/courses/:id', getCourse);
courseRouter.post('/courses', createCourse);
courseRouter.put('/courses/:id', updateCourse);
courseRouter.delete('/courses/:id', deleteCourse);

export default courseRouter;
