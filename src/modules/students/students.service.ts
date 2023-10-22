import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Student } from '@prisma/client';

export type User = any;

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async student(
    whereInput: Prisma.StudentWhereUniqueInput,
  ): Promise<Partial<Student>> {
    return this.prisma.student.findUnique({
      where: whereInput,
    });
  }

  async students(): Promise<Partial<Student>[]> {
    const data = this.prisma.student.findMany({
      select: {
        id: true,
        studentID: true,
        firstName: true,
        lastName: true,
        semester: true,
      },
    });

    return data;
  }

  async newStudent(data: Prisma.StudentCreateInput): Promise<Student> {
    return this.prisma.student.create({
      data,
    });
  }

  async updateStudent(
    studentID: string,
    data: Prisma.StudentUpdateInput,
  ): Promise<Student> {
    return this.prisma.student.update({
      where: { studentID },
      data,
    });
  }
}
