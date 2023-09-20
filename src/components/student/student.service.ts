import httpStatus from 'http-status';
import AppError from '../../core/utils/appError';
import logger from '../../core/utils/logger';
import prisma from '../../core/utils/prismaClient';
import { Student } from './student.type';

export const create = async (student: Student): Promise<Student> => {
  try {
    const newUser = await prisma.student.create({ data: student });
    return newUser;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not created');
  }
};

export const read = async (id: string): Promise<Student> => {
  logger.debug(`Sent user.id ${id}`);
  const user = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const readAll = async (): Promise<Student[]> => {
  const users = await prisma.student.findMany();
  return users;
};

export const update = async (student: Student): Promise<Student> => {
  try {
    const updatedUser = await prisma.student.update({
      where: {
        id: student.id,
      },
      data: student,
    });
    return updatedUser;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not updated');
  }
};

export const deleteById = async (id: string): Promise<boolean> => {
  try {
    const deletedUser = await prisma.student.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not deleted');
  }
};
