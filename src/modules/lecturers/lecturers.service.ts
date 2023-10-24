import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.lecturer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
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
