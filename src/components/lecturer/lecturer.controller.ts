import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { create, deleteById, read, readAll, update } from './lecturer.service';
import { Lecturer } from './lecturer.type';

export const createLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lecturer = req.body as Lecturer;
    const newLecturer = await create(lecturer);
    res
      .status(httpStatus.CREATED)
      .json({ message: 'Lecturer created', data: newLecturer });
  } catch (error) {
    next(error);
  }
};

export const readLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const lecturer = await read(id);
    res
      .status(httpStatus.OK)
      .json({ message: 'Lecturer found', data: lecturer });
  } catch (error) {
    next(error);
  }
};

export const updateLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const lecturer = req.body as Partial<Lecturer>;
    const updatedLecturer = await update(lecturer, id);
    res
      .status(httpStatus.OK)
      .json({ message: 'Lecturer updated', data: updatedLecturer });
  } catch (error) {
    next(error);
  }
};

export const deleteLecturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(httpStatus.OK).json({ message: 'Lecturer deleted', data: id });
  } catch (error) {
    next(error);
  }
};
