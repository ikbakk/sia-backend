import { Router } from 'express';
import {
  createGrade,
  getStudentGrades,
  updateStudentGrade,
} from './grade.controller';

const gradeRouter: Router = Router();

gradeRouter.post('/students/:studentID/grades/', createGrade);
gradeRouter.get('/students/:studentID/grades/', getStudentGrades);
gradeRouter.put('/students/:studentID/grades/', updateStudentGrade);

export default gradeRouter;
