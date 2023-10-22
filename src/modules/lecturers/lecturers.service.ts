import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LecturersService {
  constructor(private prisma: PrismaService) {}

  async lecturer(lecturerID: string) {
    return this.prisma.lecturer.findUnique({
      where: { lecturerID },
    });
  }

  async lecturers() {
    return this.prisma.lecturer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        lecturerID: true,
      },
    });
  }

  async newLecturer(data: Prisma.LecturerCreateInput) {
    return this.prisma.lecturer.create({
      data,
    });
  }

  async updateLecturer(lecturerID: string, data: Prisma.LecturerUpdateInput) {
    return this.prisma.lecturer.update({
      where: { lecturerID },
      data,
    });
  }

  async deleteLecturer(lecturerID: string) {
    return this.prisma.lecturer.delete({
      where: { lecturerID },
    });
  }
}
