import httpStatus from 'http-status';
import AppError from '../../core/utils/appError';
import logger from '../../core/utils/logger';
import prisma from '../../core/utils/prismaClient';
import { Lecturer } from './lecturer.type';

export const create = async (lecturer: Lecturer): Promise<Lecturer> => {
  try {
    const newLecturer = await prisma.lecturer.create({ data: lecturer });
    return newLecturer;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Lecturer was not created');
  }
};

export const read = async (id: string): Promise<Lecturer> => {
  try {
    const lecturer = await prisma.lecturer.findUnique({
      where: {
        id,
      },
    });
    return lecturer;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Lecturer was not found');
  }
};

export const readAll = async (): Promise<Lecturer[]> => {
  try {
    const lecturers = await prisma.lecturer.findMany();
    return lecturers;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Lecturers were not found');
  }
};

export const update = async (
  newData: Partial<Lecturer>,
  id: string,
): Promise<Lecturer> => {
  try {
    const updatedLecturer = await prisma.lecturer.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return updatedLecturer;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Lecturer was not updated');
  }
};

export const deleteById = async (id: string): Promise<boolean> => {
  try {
    await prisma.lecturer.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Lecturer was not deleted');
  }
};
