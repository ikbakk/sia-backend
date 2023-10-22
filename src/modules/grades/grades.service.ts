import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async grade(whereInput: Prisma.CourseGradeWhereUniqueInput) {
    return this.prisma.courseGrade.findUnique({
      where: whereInput,
    });
  }

  async grades() {
    return this.prisma.courseGrade.findMany();
  }

  async newGrade(data: Prisma.CourseGradeCreateInput) {
    return this.prisma.courseGrade.create({
      data,
    });
  }

  async updateGrade(courseID: string, data: Prisma.CourseGradeUpdateInput) {
    return this.prisma.courseGrade.update({
      where: { id: courseID },
      data,
    });
  }

  async deleteGrade(courseID: string) {
    return this.prisma.courseGrade.delete({
      where: { id: courseID },
    });
  }
}
