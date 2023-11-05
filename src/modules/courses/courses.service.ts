import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async course(whereInput: Prisma.CourseWhereUniqueInput) {
    return this.prisma.course.findUnique({
      where: whereInput,
      select: {
        id: true,
        name: true,
        credit: true,
        onYear: true,
        type: true,
        enrolledByStudent: {
          select: {
            id: true,
            studentID: true,
            firstName: true,
            lastName: true,
            semester: true,
          },
        },
      },
    });
  }

  async courses() {
    return this.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        credit: true,
        onYear: true,
        type: true,
        semester: true,
        code: true,
        available: true,
      },
    });
  }

  async newCourse(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({
      data,
      select: {
        id: true,
        name: true,
        credit: true,
        onYear: true,
        type: true,
      },
    });
  }

  async updateCourse(courseID: string, data: Prisma.CourseUpdateInput) {
    return this.prisma.course.update({
      where: { id: courseID },
      data,
    });
  }

  async updateEnrolledStudents(courseID: string, studentID: string) {
    return this.prisma.course.update({
      where: { id: courseID },
      data: {
        enrolledByStudent: {
          connect: {
            id: studentID,
          },
        },
      },
    });
  }

  async deleteCourse(courseID: string) {
    return this.prisma.course.delete({
      where: { id: courseID },
    });
  }

  async findCourses(coursesIDs: string[]) {
    return this.prisma.course.findMany({
      where: {
        id: {
          in: coursesIDs,
        },
      },
      select: {
        id: true,
        name: true,
        credit: true,
        onYear: true,
        type: true,
        available: true,
        code: true,
      },
    });
  }
}
