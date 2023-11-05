import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateKrsBody } from './interfaces/krs';

@Injectable()
export class KrsService {
  constructor(private prisma: PrismaService) {}

  async allKrs(studentID: string) {
    return this.prisma.kRS.findMany({
      where: {
        studentID,
      },
    });
  }

  async krs(studentID: string, semester: number) {
    return this.prisma.kRS.findFirst({
      where: {
        studentID,
        semester,
      },
    });
  }

  async krsByID(krsID: string) {
    return this.prisma.kRS.findUnique({
      where: {
        id: krsID,
      },
    });
  }

  async newKrs(data: CreateKrsBody) {
    const { onYear, semester, courses, studentID } = data;

    return this.prisma.kRS.create({
      data: {
        onYear,
        semester,
        status: 'PENDING',
        courses,
        studentID,
      },
    });
  }

  async updateKrs(krsID: string, data: Prisma.KRSUpdateInput) {
    return this.prisma.kRS.update({
      where: {
        id: krsID,
      },
      data,
    });
  }

  async approvedKrsCourses(krsID: string) {
    return this.prisma.kRS.findUnique({
      where: {
        id: krsID,
        status: 'APPROVED',
      },
      select: {
        courses: true,
      },
    });
  }

  async deleteKrs(krsID: string) {
    return this.prisma.kRS.delete({
      where: {
        id: krsID,
      },
    });
  }
}
