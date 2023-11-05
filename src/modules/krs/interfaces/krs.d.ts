import { Prisma } from '@prisma/client';

export interface CreateKrsBody extends Prisma.KRSCreateInput {
  studentID: string;
}
