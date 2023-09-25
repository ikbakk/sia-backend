import { Router } from 'express';
import {
  createLecturer,
  deleteLecturer,
  readLecturer,
  updateLecturer,
} from './lecturer.controller';

const lecturerRouter: Router = Router();

lecturerRouter.get('/lecturers', readLecturer);
lecturerRouter.get('/lecturers/:id', readLecturer);
lecturerRouter.post('/lecturers', createLecturer);
lecturerRouter.put('/lecturers/:id', updateLecturer);
lecturerRouter.delete('/lecturers/:id', deleteLecturer);

export default lecturerRouter;
