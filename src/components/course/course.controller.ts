import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, deleteById, read, readAll, update } from './course.service';
import { Course } from './course.type';

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = req.body as Course;
    const newCourse = await create(course);
    res
      .status(httpStatus.CREATED)
      .json({ message: 'Course created', data: newCourse });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const course = await read(id);
    res.status(httpStatus.OK).json({ message: 'Course found', data: course });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courses = await readAll();
    res.status(httpStatus.OK).json({ message: 'Courses found', data: courses });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const course = req.body as Partial<Course>;
    const updatedCourse = await update(course, id);
    res
      .status(httpStatus.OK)
      .json({ message: 'Course updated', data: updatedCourse });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(httpStatus.OK).json({ message: 'Course deleted', data: id });
  } catch (error) {
    next(error);
  }
};
