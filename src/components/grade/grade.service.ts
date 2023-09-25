import httpStatus from 'http-status';
import AppError from '../../core/utils/appError';
import logger from '../../core/utils/logger';
import prisma from '../../core/utils/prismaClient';
import { Grade } from './grade.type';

export const create = async (grade: Grade): Promise<Grade> => {
  try {
    const newGrade = await prisma.courseGrade.create({ data: grade });
    return newGrade;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Grade was not created');
  }
};

export const read = async (studentID: string): Promise<Grade[]> => {
  logger.debug(`Sent grade.id ${studentID}`);
  const grade = await prisma.student.findUnique({
    where: {
      studentID,
    },
    select: {
      grades: true,
    },
  });
  return grade.grades;
};

export const readAll = async (): Promise<Grade[]> => {
  const grades = await prisma.courseGrade.findMany();
  return grades;
};

export const update = async (
  newData: Partial<Grade>,
  id: string,
): Promise<Grade> => {
  try {
    const updatedGrade = await prisma.courseGrade.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return updatedGrade;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Grade was not updated');
  }
};

export const deleteById = async (id: string): Promise<boolean> => {
  try {
    await prisma.courseGrade.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    logger.error(error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Grade was not deleted');
  }
};
