import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async course(whereInput: Prisma.CourseWhereUniqueInput) {
    return this.prisma.course.findUnique({
      where: whereInput,
    });
  }

  async courses() {
    return this.prisma.course.findMany();
  }

  async newCourse(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({
      data,
    });
  }

  async updateCourse(courseID: string, data: Prisma.CourseUpdateInput) {
    return this.prisma.course.update({
      where: { id: courseID },
      data,
    });
  }

  async deleteCourse(courseID: string) {
    return this.prisma.course.delete({
      where: { id: courseID },
    });
  }
}
