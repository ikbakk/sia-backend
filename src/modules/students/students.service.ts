import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Student } from '@prisma/client';

export type User = any;

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async student(whereInput: Prisma.StudentWhereUniqueInput): Promise<Student> {
    return this.prisma.student.findUnique({
      where: whereInput,
    });
  }
}
