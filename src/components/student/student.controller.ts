import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, deleteById, read, readAll, update } from './student.service';
import { Student } from './student.type';

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = req.body as Student;
    await create(student);
    res
      .status(httpStatus.CREATED)
      .json({ message: 'student created', data: student });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = req.body as Student;
    await update(student);
    res
      .status(httpStatus.OK)
      .json({ message: 'student updated', data: student });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(httpStatus.OK).json({ message: 'student deleted', data: id });
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const student = await read(id);
    res.status(httpStatus.OK).json({ message: 'student found', data: student });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await readAll();
    res
      .status(httpStatus.OK)
      .json({ message: 'students found', data: students });
  } catch (error) {
    next(error);
  }
};
