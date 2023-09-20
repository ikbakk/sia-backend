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

export const read = async (studentID: string): Promise<Student> => {
  logger.debug(`Sent user.id ${studentID}`);
  const user = await prisma.student.findUnique({
    where: {
      studentID,
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
        studentID: student.studentID,
      },
      data: student,
    });
    return updatedUser;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not updated');
  }
};

export const updateGrade = async (studentID: string, gradeId: string) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        studentID,
      },
    });

    const updatedStudent = await prisma.student.update({
      where: {
        studentID,
      },
      data: {
        gradesIDs: [...student.gradesIDs, gradeId],
      },
    });

    return updatedStudent;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not updated');
  }
};

export const deleteById = async (studentID: string): Promise<boolean> => {
  try {
    await prisma.student.delete({
      where: {
        studentID,
      },
    });
    return true;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Student was not deleted');
  }
};
