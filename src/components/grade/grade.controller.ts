import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, deleteById, read, readAll, update } from './grade.service';
import { Grade } from './grade.type';
import { updateGrade } from '../student/student.service';

export const createGrade = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const grade = req.body as Grade;
    const newGrade = await create(grade);
    const studentID = grade.studentID;
    const updatedStudent = await updateGrade(studentID, newGrade.id);
    res.status(httpStatus.CREATED).json({
      message: `Grade for ${updatedStudent.studentID} created`,
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentGrades = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentID = req.params.studentID;
    const grade = await read(studentID);
    res.status(httpStatus.OK).json({ message: 'grade found', data: grade });
  } catch (error) {
    next(error);
  }
};

export const updateStudentGrade = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const grade = req.body as Grade;
    const updatedGrade = await update(grade);
    res
      .status(httpStatus.OK)
      .json({ message: 'grade updated', data: updatedGrade });
  } catch (error) {
    next(error);
  }
};
