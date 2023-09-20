import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from './student.controller';

const studentRouter: Router = Router();

studentRouter.get('/students', getStudents);
studentRouter.get('/students/:id', getStudent);
studentRouter.post('/students', createStudent);
studentRouter.put('/students/:id', updateStudent);
studentRouter.delete('/students/:id', deleteStudent);

export default studentRouter;
