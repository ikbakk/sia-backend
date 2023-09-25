import httpStatus from 'http-status';
import AppError from '../../core/utils/appError';
import logger from '../../core/utils/logger';
import prisma from '../../core/utils/prismaClient';
import { Course } from './course.type';

export const create = async (course: Course): Promise<Course> => {
  try {
    const newCourse = await prisma.course.create({ data: course });
    return newCourse;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Course was not created');
  }
};

export const update = async (
  newData: Partial<Course>,
  id: string,
): Promise<Course> => {
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return updatedCourse;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Course was not updated');
  }
};

export const read = async (id: string): Promise<Course> => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });
    return course;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Course was not found');
  }
};

export const readAll = async (): Promise<Course[]> => {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Courses were not found');
  }
};

export const deleteById = async (id: string): Promise<boolean> => {
  try {
    await prisma.course.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Course was not deleted');
  }
};
