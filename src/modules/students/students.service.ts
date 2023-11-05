import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Student } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async studentAuthInfo(studentID: string) {
    return this.prisma.student.findUnique({
      where: {
        studentID,
      },
      select: {
        id: true,
        studentID: true,
        role: true,
        password: true,
      },
    });
  }

  async student(studentID: string) {
    return this.prisma.student.findUnique({
      where: {
        studentID,
      },
      select: {
        id: true,
        studentID: true,
        firstName: true,
        lastName: true,
        semester: true,
        faculty: true,
        major: true,
        role: true,
        enrolledCoursesIDs: true,
        completedCoursesIDs: true,
        krs: {
          select: {
            id: true,
            onYear: true,
            semester: true,
            status: true,
          },
        },
      },
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
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.student.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateStudent(studentID: string, data: Prisma.StudentUpdateInput) {
    return this.prisma.student.update({
      where: { studentID },
      data,
      select: {
        id: true,
        studentID: true,
        firstName: true,
        lastName: true,
        semester: true,
        role: true,
        enrolledCoursesIDs: true,
        faculty: true,
        major: true,
      },
    });
  }

  async studentActiveCourses(studentID: string) {
    const enrolledCourses = await this.prisma.student.findUnique({
      where: {
        studentID,
      },
      select: {
        enrolledCourses: {
          select: {
            id: true,
            name: true,
            onYear: true,
            semester: true,
            type: true,
            credit: true,
            available: true,
            code: true,
          },
        },
      },
    });

    return enrolledCourses;
  }

  async studentCompletedCourses(studentID: string) {
    const enrolledCourses = await this.prisma.student.findUnique({
      where: {
        studentID,
      },
      select: {
        completedCourses: {
          select: {
            id: true,
            name: true,
            onYear: true,
            semester: true,
            type: true,
            credit: true,
            available: true,
            code: true,
          },
        },
      },
    });

    return enrolledCourses;
  }
}
